import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "../stores/useCartStore";
import { Link } from "react-router-dom";
import { MoveRight, Shield, Truck, RotateCcw, CreditCard, Lock, Sparkles, Tag, ShoppingBag } from "lucide-react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "../lib/axios";
import { useState } from "react";
import toast from "react-hot-toast";

const stripePromise = loadStripe(
	"pk_test_51KZYccCoOZF2UhtOwdXQl3vcizup20zqKqT9hVUIsVzsdBrhqbUI2fE0ZdEVLdZfeHjeyFXtqaNsyCJCmZWnjNZa00PzMAjlcL"
);

const OrderSummary = () => {
	const { total, subtotal, coupon, isCouponApplied, cart } = useCartStore();
	const [isProcessing, setIsProcessing] = useState(false);

	const savings = subtotal - total;
	const formattedSubtotal = subtotal.toFixed(2);
	const formattedTotal = total.toFixed(2);
	const formattedSavings = savings.toFixed(2);
	const discountAmount = (subtotal - total).toFixed(2);

	const handlePayment = async () => {
		if (cart.length === 0) {
			toast.error("Your cart is empty");
			return;
		}

		setIsProcessing(true);
		try {
			const stripe = await stripePromise;
			const res = await axios.post("/payments/create-checkout-session", {
				products: cart,
				couponCode: coupon ? coupon.code : null,
			});

			const session = res.data;
			const result = await stripe.redirectToCheckout({
				sessionId: session.id,
			});

			if (result.error) {
				throw new Error(result.error.message);
			}
		} catch (error) {
			toast.error(error.response?.data?.message || "Failed to process payment");
			setIsProcessing(false);
		}
	};

	return (
		<motion.div
			className='space-y-5 rounded-2xl border border-gray-200 bg-white p-6 shadow-lg'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
		>
			{/* Header */}
			<div className='flex items-center gap-2 pb-4 border-b border-gray-100'>
				<div className='w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center'>
					<ShoppingBag size={16} className='text-gray-700' />
				</div>
				<p className='text-lg font-bold text-gray-900'>Order Summary</p>
				<span className='ml-auto text-xs text-gray-400'>{cart.length} items</span>
			</div>

			{/* Price Breakdown */}
			<div className='space-y-3'>
				<div className='flex items-center justify-between'>
					<span className='text-sm text-gray-500'>Subtotal</span>
					<span className='text-sm font-semibold text-gray-900'>${formattedSubtotal}</span>
				</div>

				<AnimatePresence>
					{savings > 0 && (
						<motion.div
							initial={{ opacity: 0, height: 0 }}
							animate={{ opacity: 1, height: "auto" }}
							exit={{ opacity: 0, height: 0 }}
							className='flex items-center justify-between'
						>
							<span className='text-sm text-gray-500 flex items-center gap-1'>
								<Tag size={14} className='text-green-600' />
								Savings
							</span>
							<span className='text-sm font-semibold text-green-600'>-${formattedSavings}</span>
						</motion.div>
					)}
				</AnimatePresence>

				<AnimatePresence>
					{coupon && isCouponApplied && (
						<motion.div
							initial={{ opacity: 0, height: 0 }}
							animate={{ opacity: 1, height: "auto" }}
							exit={{ opacity: 0, height: 0 }}
							className='flex items-center justify-between bg-green-50 p-2 rounded-lg'
						>
							<span className='text-sm text-gray-700 flex items-center gap-1'>
								<Sparkles size={14} className='text-green-600' />
								Coupon ({coupon.code})
							</span>
							<span className='text-sm font-semibold text-green-600'>
								-{coupon.discountPercentage}% (${discountAmount})
							</span>
						</motion.div>
					)}
				</AnimatePresence>

				<div className='flex items-center justify-between pt-3 border-t border-gray-200'>
					<span className='text-base font-bold text-gray-900'>Total</span>
					<span className='text-2xl font-bold text-gray-900'>${formattedTotal}</span>
				</div>
			</div>

			{/* Checkout Button */}
			<motion.button
				className='w-full bg-gray-900 hover:bg-gray-800 text-white py-3.5 rounded-xl font-semibold transition flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed'
				whileHover={{ scale: 1.02 }}
				whileTap={{ scale: 0.98 }}
				onClick={handlePayment}
				disabled={isProcessing || cart.length === 0}
			>
				{isProcessing ? (
					<>
						<div className='w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin' />
						Processing...
					</>
				) : (
					<>
						<Lock size={18} />
						Proceed to Checkout
					</>
				)}
			</motion.button>

			{/* Trust Badges */}
			<div className='space-y-3 pt-2'>
				<div className='flex items-center justify-center gap-4 text-xs text-gray-500'>
					<div className='flex items-center gap-1'>
						<Shield size={14} className='text-gray-400' />
						<span>Secure Payment</span>
					</div>
					<div className='flex items-center gap-1'>
						<Truck size={14} className='text-gray-400' />
						<span>Free Shipping</span>
					</div>
					<div className='flex items-center gap-1'>
						<RotateCcw size={14} className='text-gray-400' />
						<span>30-Day Returns</span>
					</div>
				</div>

				{/* Payment Methods */}
				<div className='flex items-center justify-center gap-3 pt-2'>
					<CreditCard size={20} className='text-gray-400' />
					<span className='text-xs text-gray-400'>Visa • Mastercard • PayPal • Apple Pay</span>
				</div>
			</div>

			{/* Continue Shopping Link */}
			<div className='flex items-center justify-center pt-2'>
				<Link
					to='/'
					className='inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors'
				>
					Continue Shopping
					<MoveRight size={14} />
				</Link>
			</div>
		</motion.div>
	);
};

export default OrderSummary;