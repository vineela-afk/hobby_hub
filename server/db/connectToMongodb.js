import dotenv from 'dotenv';
dotenv.config();

import mongoose from "mongoose";

const connectToMongoDB = async () => {
	try {
		await mongoose.connect("mongodb+srv://ampilivineela:oGhz7KzQW4T8QCZu@cluster0.u99qgkt.mongodb.net/chat-app-db?retryWrites=true&w=majority&appName=Cluster0");
		console.log("Connected to MongoDB");
	} catch (error) {
		console.log("Error connecting to MongoDB", error.message);
	}
};

export default connectToMongoDB;