const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(
            "YOUR_MONGODB_CONNECTION_STRING"
        );

        console.log("MongoDB connected");
    }
    catch(error) {
        console.log(error);
    }
};

module.exports = connectDB;