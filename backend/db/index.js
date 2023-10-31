const mongoose = require("mongoose");

exports.connect = (mongoURI) => mongoose.connect(mongoURI);

exports.disconnect = () => mongoose.connection.close();
