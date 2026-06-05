import Coupon from "../models/coupon.model.js";
import User from "../models/user.model.js";

export const getCoupon = async (req, res) => {
	try {
		const coupon = await Coupon.findOne({ userId: req.user._id, isActive: true });
		res.json(coupon || null);
	} catch (error) {
		console.log("Error in getCoupon controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

export const createCoupon = async (req, res) => {
	try {
		const { email, code, discountPercentage, expirationDate } = req.body;

		if (!email || !code || !discountPercentage || !expirationDate) {
			return res.status(400).json({ message: "All fields are required" });
		}

		const user = await User.findOne({ email: email.trim().toLowerCase() });
		if (!user) {
			return res.status(404).json({ message: "Customer not found" });
		}

		const existingCoupon = await Coupon.findOne({ code: code.trim().toUpperCase() });
		if (existingCoupon) {
			return res.status(400).json({ message: "Coupon code already exists" });
		}

		const coupon = new Coupon({
			code: code.trim().toUpperCase(),
			discountPercentage,
			expirationDate,
			userId: user._id,
		});

		await coupon.save();
		res.status(201).json({ message: "Coupon created successfully", coupon });
	} catch (error) {
		console.log("Error in createCoupon controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

export const validateCoupon = async (req, res) => {
	try {
		const { code } = req.body;
		const coupon = await Coupon.findOne({ code: code, userId: req.user._id, isActive: true });

		if (!coupon) {
			return res.status(404).json({ message: "Coupon not found" });
		}

		if (coupon.expirationDate < new Date()) {
			coupon.isActive = false;
			await coupon.save();
			return res.status(404).json({ message: "Coupon expired" });
		}

		res.json({
			message: "Coupon is valid",
			code: coupon.code,
			discountPercentage: coupon.discountPercentage,
		});
	} catch (error) {
		console.log("Error in validateCoupon controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};
