const mongoose = require("mongoose");

module.exports = async () => {
    try {
        await mongoose.connect(
            `${process.env.MONGODB_URI}/${process.env.DB_NAME}`
            // `mongodb://localhost:27017/aimail`
        );
        console.log("DB CONNECTED SUCCESSFULLY");
    } catch (error) {
        console.log(error);
        console.log("COULD NOT CONNECT TO DB");
    }
}