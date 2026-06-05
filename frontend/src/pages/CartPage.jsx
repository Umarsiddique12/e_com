import { Link } from "react-router-dom";
import { useCartStore } from "../stores/useCartStore";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Sparkles, Crown, ArrowRight, Shield, Truck, RotateCcw, Gift, Star } from "lucide-react";
import CartItem from "../components/CartItem";
import PeopleAlsoBought from "../components/PeopleAlsoBought";
import OrderSummary from "../components/OrderSummary";
import GiftCouponCard from "../components/GiftCouponCard";

const CartPage = () => {
	const { cart } = useCartStore();

	// Calculate cart total for progress bar
	const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
	const freeShippingThreshold = 50;
	const progressToFreeShipping = Math.min((cartTotal / freeShippingThreshold) * 100, 100);
	const remainingForFreeShipping = Math.max(freeShippingThreshold - cartTotal, 0);

	return (
		<div className='min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50/30 py-8 md:py-16 relative overflow-hidden'>
			{/* Animated Background Elements */}
			<div className="absolute inset-0 overflow-hidden pointer-events-none">
				<div className="absolute top-20 right-10 w-72 h-72 bg-amber-300/20 rounded-full blur-3xl animate-pulse" />
				<div className="absolute bottom-20 left-10 w-96 h-96 bg-purple-300/20 rounded-full blur-3xl animate-pulse delay-1000" />
				<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-amber-400/10 rounded-full blur-2xl animate-pulse" />
			</div>

			<div className='mx-auto max-w-screen-xl px-4 2xl:px-0 relative z-10'>
				{/* Header with Animation */}
				<motion.div
					initial={{ opacity: 0, y: -30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					className='text-center mb-8'
				>
					<div className="inline-flex items-center justify-center gap-3 mb-3">
						<motion.div
							animate={{ rotate: 360 }}
							transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
						>
							<Crown size={32} className="text-amber-500" />
						</motion.div>
						<h1 className='text-4xl md:text-5xl font-bold bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 bg-clip-text text-transparent'>
							Shopping Cart
						</h1>
						<motion.div
							animate={{ rotate: -360 }}
							transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
						>
							<Crown size={32} className="text-amber-500" />
						</motion.div>
					</div>
					<p className='text-slate-500 font-light'>
						Review your luxury selections before proceeding to checkout
					</p>
				</motion.div>

				{/* Free Shipping Progress Bar */}
				{cart.length > 0 && (
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.1 }}
						className='mb-8 bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-amber-200/50 shadow-lg'
					>
						<div className='flex items-center justify-between mb-3'>
							<div className='flex items-center gap-2'>
								<Truck size={20} className="text-amber-500" />
								<span className='font-semibold text-slate-700'>Free Express Shipping</span>
							</div>
							{remainingForFreeShipping > 0 ? (
								<span className='text-sm text-amber-600 font-medium'>
									Add ${remainingForFreeShipping.toFixed(2)} more
								</span>
							) : (
								<motion.span
									initial={{ scale: 0 }}
									animate={{ scale: 1 }}
									className='text-sm text-emerald-600 font-semibold flex items-center gap-1'
								>
									<Sparkles size={14} /> You qualify for free shipping! <Sparkles size={14} />
								</motion.span>
							)}
						</div>
						<div className='h-2 bg-slate-100 rounded-full overflow-hidden'>
							<motion.div
								initial={{ width: 0 }}
								animate={{ width: `${progressToFreeShipping}%` }}
								transition={{ duration: 1, ease: "easeOut" }}
								className='h-full bg-gradient-to-r from-amber-500 to-amber-600 rounded-full relative'
							>
								<motion.div
									className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
									animate={{ x: ["-100%", "100%"] }}
									transition={{ duration: 1.5, repeat: Infinity }}
								/>
							</motion.div>
						</div>
						<p className='text-xs text-slate-400 mt-2'>Free express shipping on all orders over $50</p>
					</motion.div>
				)}

				<div className='mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8'>
					<motion.div
						className='mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl'
						initial={{ opacity: 0, x: -30 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.6, type: "spring" }}
					>
						<AnimatePresence mode="wait">
							{cart.length === 0 ? (
								<motion.div
									key="empty"
									initial={{ opacity: 0, scale: 0.9 }}
									animate={{ opacity: 1, scale: 1 }}
									exit={{ opacity: 0, scale: 0.9 }}
									transition={{ duration: 0.5 }}
								>
									<EmptyCartUI />
								</motion.div>
							) : (
								<motion.div
									key="full"
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									exit={{ opacity: 0 }}
									className='space-y-6'
								>
									{/* Cart Items Header */}
									<div className='hidden md:grid grid-cols-12 gap-4 px-6 py-3 bg-white/50 backdrop-blur-sm rounded-xl border border-amber-200/50 text-sm font-semibold text-slate-600'>
										<div className='col-span-5'>Product</div>
										<div className='col-span-2 text-center'>Price</div>
										<div className='col-span-3 text-center'>Quantity</div>
										<div className='col-span-2 text-right'>Total</div>
									</div>
									
									<AnimatePresence>
										{cart.map((item, index) => (
											<motion.div
												key={item._id}
												initial={{ opacity: 0, x: -20 }}
												animate={{ opacity: 1, x: 0 }}
												exit={{ opacity: 0, x: 20 }}
												transition={{ delay: index * 0.05 }}
											>
												<CartItem item={item} />
											</motion.div>
										))}
									</AnimatePresence>
								</motion.div>
							)}
						</AnimatePresence>
						
						{cart.length > 0 && (
							<motion.div
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.3 }}
							>
								<PeopleAlsoBought />
							</motion.div>
						)}
					</motion.div>

					{/* Order Summary Sidebar */}
					<AnimatePresence>
						{cart.length > 0 && (
							<motion.div
								className='mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full'
								initial={{ opacity: 0, x: 30 }}
								animate={{ opacity: 1, x: 0 }}
								exit={{ opacity: 0, x: 30 }}
								transition={{ duration: 0.6, type: "spring", delay: 0.2 }}
							>
								{/* Order Summary Card */}
								<motion.div
									whileHover={{ y: -5 }}
									className='relative group'
								>
									<div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500 to-amber-600 rounded-2xl blur opacity-0 group-hover:opacity-75 transition duration-500" />
									<div className='relative bg-white/90 backdrop-blur-md rounded-2xl shadow-xl border border-amber-200/50 overflow-hidden'>
										<div className='p-6'>
											<h2 className='text-xl font-bold text-slate-800 mb-4 flex items-center gap-2'>
												<Sparkles size={20} className="text-amber-500" />
												Order Summary
												<Sparkles size={20} className="text-amber-500" />
											</h2>
											<OrderSummary />
										</div>
									</div>
								</motion.div>

								<GiftCouponCard />

								{/* Trust Badges */}
								<motion.div
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									transition={{ delay: 0.4 }}
									className='bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-amber-200/50'
								>
									<div className='grid grid-cols-3 gap-4'>
										<div className='text-center'>
											<Shield size={24} className="text-amber-500 mx-auto mb-2" />
											<p className='text-xs text-slate-600'>Secure Checkout</p>
										</div>
										<div className='text-center'>
											<Truck size={24} className="text-amber-500 mx-auto mb-2" />
											<p className='text-xs text-slate-600'>Express Shipping</p>
										</div>
										<div className='text-center'>
											<RotateCcw size={24} className="text-amber-500 mx-auto mb-2" />
											<p className='text-xs text-slate-600'>30-Day Returns</p>
										</div>
									</div>
								</motion.div>

								{/* Special Offer */}
								<motion.div
									initial={{ opacity: 0, scale: 0.9 }}
									animate={{ opacity: 1, scale: 1 }}
									transition={{ delay: 0.5 }}
									className='bg-gradient-to-r from-amber-500/10 to-amber-600/10 rounded-xl p-4 border border-amber-300/30'
								>
									<div className='flex items-center gap-3'>
										<Gift size={32} className="text-amber-500" />
										<div>
											<p className='font-semibold text-slate-800 text-sm'>Special Offer</p>
											<p className='text-xs text-slate-500'>Add items worth $100+ and get a free luxury gift</p>
										</div>
									</div>
								</motion.div>
							</motion.div>
						)}
					</AnimatePresence>
				</div>
			</div>
		</div>
	);
};

export default CartPage;

const EmptyCartUI = () => (
	<motion.div
		className='flex flex-col items-center justify-center space-y-6 py-20 text-center'
		initial={{ opacity: 0, y: 20 }}
		animate={{ opacity: 1, y: 0 }}
		transition={{ duration: 0.5 }}
	>
		{/* Animated Shopping Cart Icon */}
		<motion.div
			animate={{ 
				y: [0, -10, 0],
				rotate: [0, -5, 5, 0]
			}}
			transition={{ 
				duration: 2, 
				repeat: Infinity,
				repeatType: "reverse"
			}}
			className='relative'
		>
			<div className='absolute inset-0 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full blur-2xl opacity-20 animate-pulse' />
			<div className='relative w-32 h-32 bg-gradient-to-br from-amber-100 to-amber-200 rounded-full flex items-center justify-center'>
				<ShoppingCart size={48} className="text-amber-600" />
			</div>
		</motion.div>

		<div>
			<h3 className='text-2xl font-bold text-slate-800 mb-2'>Your cart is empty</h3>
			<p className='text-slate-500 max-w-sm'>
				Looks like you haven't added any luxury items to your cart yet.
			</p>
		</div>

		{/* Featured Categories */}
		<div className='flex flex-wrap justify-center gap-3 mt-4'>
			{["Jeans", "T-shirts", "Shoes", "Jackets"].map((category, index) => (
				<motion.span
					key={category}
					initial={{ opacity: 0, scale: 0 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ delay: index * 0.1 }}
					className='px-3 py-1 bg-white rounded-full text-xs text-slate-600 border border-slate-200'
				>
					{category}
				</motion.span>
			))}
		</div>

		<motion.div
			whileHover={{ scale: 1.05 }}
			whileTap={{ scale: 0.95 }}
		>
			<Link
				className='group relative inline-flex items-center gap-2 bg-gradient-to-r from-amber-600 to-amber-500 text-white px-8 py-3.5 rounded-full font-semibold transition-all duration-300 shadow-xl hover:shadow-2xl overflow-hidden'
				to='/'
			>
				<span className="relative z-10">Start Shopping</span>
				<ArrowRight size={18} className='group-hover:translate-x-1 transition relative z-10' />
				<motion.div 
					className="absolute inset-0 bg-gradient-to-r from-amber-500 to-amber-600"
					initial={{ x: "-100%" }}
					whileHover={{ x: 0 }}
					transition={{ duration: 0.3 }}
				/>
			</Link>
		</motion.div>

		{/* Trust Badges for Empty Cart */}
		<div className='flex gap-6 pt-6'>
			<div className='flex items-center gap-2'>
				<Star size={16} className="text-amber-400 fill-amber-400" />
				<span className='text-xs text-slate-500'>4.9/5 Rating</span>
			</div>
			<div className='flex items-center gap-2'>
				<Shield size={16} className="text-amber-500" />
				<span className='text-xs text-slate-500'>Secure Shopping</span>
			</div>
			<div className='flex items-center gap-2'>
				<Truck size={16} className="text-amber-500" />
				<span className='text-xs text-slate-500'>Free Shipping $50+</span>
			</div>
		</div>
	</motion.div>
);