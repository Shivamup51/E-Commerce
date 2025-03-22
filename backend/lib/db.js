import mongoose from "mongoose";

// Connection options for better performance and reliability
const options = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
	socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
};

// Cache the database connection
let cachedDb = null;

export const connectDB = async () => {
	if (cachedDb) {
		console.log("Using cached database connection");
		return cachedDb;
	}

	try {
		const conn = await mongoose.connect(process.env.MONGO_URI, options);
		console.log('MongoDB connected');
		cachedDb = conn;
		return conn;
	} catch (error) {
		console.log("Error connecting to MongoDB:", error.message);
		// Don't exit process in serverless environment
		if (process.env.NODE_ENV !== 'production') {
			process.exit(1);
		}
		throw error;
	}
};
