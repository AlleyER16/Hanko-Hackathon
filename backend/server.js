require("dotenv").config();
const { connect } = require("mongoose");

const app = require("./app");

const port = process.env.PORT || 8000;

(async () => {
  try {
    await connect(process.env.MONGO_URI);

    app.listen(port, () => {
      console.log(`App listening on port ${port}. http://localhost:${port}`);
    });
  } catch (error) {
    console.log(`Error starting application: ${error.message}`);
  }
})();
