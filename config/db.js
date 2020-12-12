import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.APP_DB, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`.blue.underline);
    } catch (error) {
        console.log(`Error Connecting to Database: ${error.message}`.red.underline.bold);
        process.exit(1);
    }
}

export default connectDB;