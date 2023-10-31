const express = require("express");
const { StatusCodes } = require("http-status-codes");

const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const cors = require("cors");
const morgan = require("morgan");

const { expressjwt: jwt } = require("express-jwt");
const jwksRsa = require("jwks-rsa");
const cookieParser = require("cookie-parser");

const {
  ordersRouter,
  mealsRouter,
  mealTypesRouter,
  newsletterRouter,
  hooksRouter,
} = require("./routers");

const AppError = require("./utils/app-error.util");
const globalErrorHandler = require("./controllers/error.controller");

// Creating app instance
const app = express();

// GLOBAL MIDDLEWARES
// CORS
app.use(cors());

// DEVELOPMENT LOGGING
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// SET SECURITY HTTP HEADERS
app.use(helmet());

// LIMIT REQUESTS PER IP ADDRESS
const limiter = rateLimit({
  max: 5000,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again in an hour!",
});
app.use("/", limiter);

// REQUEST BODY PARSER
app.use(express.json({ limit: "10kb" }));

// DATA SANITIZATION AGAINST NOSQL QUERY INJECTION
app.use(mongoSanitize());

// DATA SANITIZATION AGAINS XSS ATTACKS
app.use(xss());

// DEFAULT PATH
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Sushi backend API" });
});

app.use(cookieParser());

// ADDING ROUTERS
app.use("/meal-types", mealTypesRouter);
app.use("/meals", mealsRouter);
app.use("/newsletter", newsletterRouter);
app.use("/hooks", hooksRouter);

// authentication for protected route
const authMiddleware = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 2,
    jwksUri: `${process.env.HANKO_API_URL}/.well-known/jwks.json`,
  }),
  algorithms: ["RS256"],
  getToken: function fromCookieOrHeader(req) {
    if (
      req.headers.authorization &&
      req.headers.authorization.split(" ")[0] === "Bearer"
    )
      return req.headers.authorization.split(" ")[1];

    if (req.cookies && req.cookies.hanko) return req.cookies.hanko;

    return null;
  },
});

app.use("/orders", authMiddleware, ordersRouter);

app.use("*", (req, res, next) =>
  next(new AppError("API path not found", StatusCodes.NOT_FOUND)),
);

app.use(globalErrorHandler);

module.exports = app;
