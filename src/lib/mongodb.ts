import mongoose from "mongoose";
const { MONGODB_URI } = process.env;
export const connectDB = async () => {
  try {
    const { connection } = await mongoose.connect('mongodb+srv://mostafasobh33:nuPFTgYtSxhCtkTY@cluster0.6b2nn.mongodb.net/');
    if (connection.readyState === 1) {
      return Promise.resolve(true);
    }
  } catch (error) {
    console.error(error.errorResponse);
    return Promise.reject(error);
  }
};