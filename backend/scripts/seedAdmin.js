import mongoose from "mongoose";
import User from "../models/user.model.js";
import dotenv from "dotenv";

dotenv.config({ path: "./backend/.env" });

const seedAdmin = async () => {
	try {
		console.log("Connecting to MongoDB...");
		await mongoose.connect(process.env.MONGO_URI);
		console.log("MongoDB connected successfully!");

		// Find if user exists
		let admin = await User.findOne({ email: "asadtanweeer@gmail.com" });

		if (admin) {
			console.log("User already exists. Updating role to admin and resetting password to 12345678...");
			admin.role = "admin";
			admin.password = "12345678";
			await admin.save();
			console.log("✅ Admin user updated successfully!");
		} else {
			// Create admin user
			admin = await User.create({
				name: "Admin",
				email: "asadtanweeer@gmail.com",
				password: "12345678",
				role: "admin",
			});
			console.log("✅ Admin user created successfully!");
		}

		console.log(`Email: ${admin.email}`);
		console.log(`Password: 12345678`);
		console.log(`Role: ${admin.role}`);

		process.exit(0);
	} catch (error) {
		console.error("❌ Error creating/updating admin:", error.message);
		process.exit(1);
	}
};

seedAdmin();

