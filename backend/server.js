import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "./routes/auth.route.js";
import productRoutes from "./routes/product.route.js";
import cartRoutes from "./routes/cart.route.js";
import couponRoutes from "./routes/coupon.route.js";
import paymentRoutes from "./routes/payment.route.js";
import analyticsRoutes from "./routes/analytics.route.js";

import { connectDB } from "./lib/db.js";

dotenv.config();

// Connect to database first
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Add a simple "Hello World" endpoint
app.get("/", (req, res) => {
	res.json({ 
		message: "Hello World! Vercel deployment successful.",
		status: "ok",
		timestamp: new Date().toISOString()
	});
});

// Fix CORS for production
app.use(cors({
	origin: [process.env.CLIENT_URL, 'https://e-commerce-frontend-one-sepia.vercel.app'],
	credentials: true,
	methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
	allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/coupons", couponRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/analytics", analyticsRoutes);

// For local development only
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log("Server is running on http://localhost:" + PORT);
  });
}

// Export for Vercel serverless functions
export default app;
