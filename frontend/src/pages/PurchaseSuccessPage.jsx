import { ArrowRight, CheckCircle, HandHeart, Package, Truck, Mail, Download, Share2, Clock, Gift } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useCartStore } from "../stores/useCartStore";
import axios from "../lib/axios";
import Confetti from "react-confetti";

const PurchaseSuccessPage = () => {
	const [isProcessing, setIsProcessing] = useState(true);
	const [orderId, setOrderId] = useState(null);
	const { clearCart } = useCartStore();
	const [error, setError] = useState(null);

	useEffect(() => {
		const handleCheckoutSuccess = async (sessionId) => {
			try {
				const response = await axios.post("/payments/checkout-success", {
					sessionId,
				});
				setOrderId(response.data.orderId || "STH-" + Math.random().toString(36).substr(2, 8).toUpperCase());
				clearCart();
			} catch (error) {
				console.log(error);
				setError("Failed to process order confirmation");
			} finally {
				setIsProcessing(false);
			}
		};

		const sessionId = new URLSearchParams(window.location.search).get("session_id");
		if (sessionId) {
			handleCheckoutSuccess(sessionId);
		} else {
			setIsProcessing(false);
			setError("No session ID found in the URL");
		}
	}, [clearCart]);

	if (isProcessing) {
		return (
			<div className='min-h-screen bg-gray-50 flex items-center justify-center'>
				<div className='text-center'>
					<div className='relative w-16 h-16 mx-auto mb-4'>
						<div className='absolute inset-0 rounded-full border-2 border-gray-200' />
						<div className='absolute inset-0 rounded-full border-t-2 border-gray-900 animate-spin' />
					</div>
					<p className='text-gray-600'>Processing your order...</p>
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className='min-h-screen bg-gray-50 flex items-center justify-center'>
				<div className='bg-white rounded-2xl p-8 text-center max-w-md border border-gray-200'>
					<div className='w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4'>
						<CheckCircle className='text-red-500 w-8 h-8' />
					</div>
					<h2 className='text-xl font-bold text-gray-900 mb-2'>Something went wrong</h2>
					<p className='text-gray-500 mb-4'>{error}</p>
					<Link to='/' className='inline-block bg-gray-900 text-white px-6 py-2 rounded-lg'>
						Return to Shop
					</Link>
				</div>
			</div>
		);
	}

	return (
		<div className='min-h-screen bg-gray-50'>
			<Confetti
				width={window.innerWidth}
				height={window.innerHeight}
				gravity={0.1}
				style={{ zIndex: 99 }}
				numberOfPieces={700}
				recycle={false}
				colors={['#1a1a1a', '#2d2d2d', '#404040', '#666666', '#888888']}
			/>

			{/* Hero Section with Background Image */}
			<div className='relative h-[250px] bg-cover bg-center bg-fixed' style={{
				backgroundImage: 'url("https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?q=80&w=2070")'
			}}>
				<div className='absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/70' />
				<div className='absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-gray-50' />
				
				<div className='relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center'>
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						className='max-w-2xl'
					>
						<div className='flex items-center gap-2 text-white/80 text-sm mb-4'>
							<span>Checkout</span>
							<span>→</span>
							<span className='text-white'>Success</span>
						</div>
						<h1 className='text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight'>
							Order Confirmed
						</h1>
						<p className='text-white/80 text-lg'>
							Thank you for your purchase. Your order has been successfully placed.
						</p>
					</motion.div>
				</div>
			</div>

			{/* Main Content */}
			<div className='max-w-md mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-10 pb-16'>
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.2 }}
					className='bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden'
				>
					<div className='absolute top-0 left-0 w-full h-1 bg-green-500' />

					<div className='p-8'>
						{/* Success Icon */}
						<div className='flex justify-center mb-6'>
							<div className='w-20 h-20 rounded-full bg-green-50 flex items-center justify-center border border-green-100'>
								<CheckCircle className='text-green-500 w-10 h-10' />
							</div>
						</div>

						{/* Title */}
						<h2 className='text-2xl font-bold text-center text-gray-900 mb-2'>
							Thank You!
						</h2>
						<p className='text-gray-500 text-center mb-2'>
							Your order has been successfully placed and confirmed.
						</p>
						<p className='text-green-600 text-center text-sm font-medium mb-6'>
							Check your email for order details and updates.
						</p>

						{/* Order Details Box */}
						<div className='bg-gray-50 rounded-xl p-5 mb-6 border border-gray-100'>
							<div className='flex items-center justify-between mb-3 pb-3 border-b border-gray-200'>
								<span className='text-xs text-gray-400 uppercase tracking-wider'>Order Number</span>
								<span className='text-sm font-mono font-semibold text-gray-800'>
									{orderId || "#STH-" + Math.random().toString(36).substr(2, 8).toUpperCase()}
								</span>
							</div>
							<div className='flex items-center justify-between'>
								<span className='text-xs text-gray-400 uppercase tracking-wider'>Estimated Delivery</span>
								<span className='text-sm font-medium text-gray-800'>5-7 business days</span>
							</div>
						</div>

						{/* Next Steps */}
						<div className='space-y-3 mb-6'>
							<p className='text-xs text-gray-400 uppercase tracking-wider text-center mb-3'>
								What's next?
							</p>
							<div className='flex items-center gap-3 text-sm text-gray-600'>
								<div className='w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0'>
									<Mail size={14} className='text-gray-600' />
								</div>
								<span>You'll receive a confirmation email shortly</span>
							</div>
							<div className='flex items-center gap-3 text-sm text-gray-600'>
								<div className='w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0'>
									<Truck size={14} className='text-gray-600' />
								</div>
								<span>Track your order from your account dashboard</span>
							</div>
							<div className='flex items-center gap-3 text-sm text-gray-600'>
								<div className='w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0'>
									<Package size={14} className='text-gray-600' />
								</div>
								<span>Expect shipping updates within 24 hours</span>
							</div>
						</div>

						{/* Loyalty Message */}
						<div className='bg-gray-50 rounded-xl p-4 mb-6 text-center border border-gray-100'>
							<div className='flex items-center justify-center gap-2 mb-2'>
								<Gift size={16} className='text-gray-600' />
								<span className='text-sm font-semibold text-gray-800'>You've earned 500 loyalty points!</span>
							</div>
							<p className='text-xs text-gray-500'>Use them on your next purchase</p>
						</div>

						{/* Buttons */}
						<div className='space-y-3'>
							<Link
								to='/profile'
								className='w-full bg-gray-900 hover:bg-gray-800 text-white font-semibold py-3 px-4 rounded-lg transition flex items-center justify-center gap-2'
							>
								<Package size={18} />
								View My Orders
							</Link>
							
							<div className='grid grid-cols-2 gap-3'>
								<Link
									to='/'
									className='bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-4 rounded-lg transition flex items-center justify-center gap-2 border border-gray-200'
								>
									<ArrowRight size={16} />
									Shop More
								</Link>
								
								<button
									onClick={() => window.print()}
									className='bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-4 rounded-lg transition flex items-center justify-center gap-2 border border-gray-200'
								>
									<Download size={16} />
									Receipt
								</button>
							</div>
						</div>

						{/* Support Info */}
						<div className='mt-6 pt-4 border-t border-gray-100 text-center'>
							<p className='text-xs text-gray-400'>
								Need help? Contact our support team at{" "}
								<a href='mailto:support@stylehub.com' className='text-gray-600 hover:text-gray-900'>
									support@stylehub.com
								</a>
							</p>
						</div>
					</div>
				</motion.div>
			</div>
		</div>
	);
};

export default PurchaseSuccessPage;