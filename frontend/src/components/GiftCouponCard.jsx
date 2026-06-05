import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useCartStore } from "../stores/useCartStore";
import { Tag, Gift, Sparkles, X, CheckCircle, Ticket, Percent } from "lucide-react";

const GiftCouponCard = () => {
	const [userInputCode, setUserInputCode] = useState("");
	const [isApplying, setIsApplying] = useState(false);
	const { coupon, isCouponApplied, applyCoupon, getMyCoupon, removeCoupon } = useCartStore();

	useEffect(() => {
		getMyCoupon();
	}, [getMyCoupon]);

	useEffect(() => {
		if (coupon) setUserInputCode(coupon.code);
	}, [coupon]);

	const handleApplyCoupon = async () => {
		if (!userInputCode) return;
		setIsApplying(true);
		await applyCoupon(userInputCode);
		setIsApplying(false);
	};

	const handleRemoveCoupon = async () => {
		await removeCoupon();
		setUserInputCode("");
	};

	return (
		<motion.div
			className='rounded-2xl border border-gray-200 bg-white shadow-lg overflow-hidden'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5, delay: 0.2 }}
		>
			<div className='absolute top-0 left-0 w-full h-0.5 bg-gray-900' />
			
			<div className='p-6'>
				{/* Header */}
				<div className='flex items-center gap-2 mb-4 pb-3 border-b border-gray-100'>
					<div className='w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center'>
						<Gift size={16} className='text-gray-700' />
					</div>
					<h3 className='text-base font-bold text-gray-900'>Gift Card & Voucher</h3>
					{isCouponApplied && (
						<span className='ml-auto text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full flex items-center gap-1'>
							<CheckCircle size={10} />
							Applied
						</span>
					)}
				</div>

				{/* Available Coupon */}
				<AnimatePresence>
					{coupon && !isCouponApplied && (
						<motion.div
							initial={{ opacity: 0, height: 0 }}
							animate={{ opacity: 1, height: "auto" }}
							exit={{ opacity: 0, height: 0 }}
							className='mb-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-4 border border-gray-200'
						>
							<div className='flex items-center gap-2 mb-2'>
								<Ticket size={16} className='text-gray-700' />
								<span className='text-xs font-semibold text-gray-500 uppercase tracking-wider'>Available Coupon</span>
							</div>
							<div className='flex items-center justify-between'>
								<div>
									<p className='text-sm font-bold text-gray-900'>{coupon.code}</p>
									<p className='text-xs text-gray-500 mt-0.5'>
										{/* coupon.discountPercentage */}% off your entire purchase
									</p>
								</div>
								<button
									onClick={() => setUserInputCode(coupon.code)}
									className='text-xs font-medium text-gray-700 hover:text-gray-900 transition-colors'
								>
									Apply →
								</button>
							</div>
						</motion.div>
					)}
				</AnimatePresence>

				{/* Input Section */}
				<div className='space-y-3'>
					<div className='relative'>
						<div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
							<Tag size={16} className='text-gray-400' />
						</div>
						<input
							type='text'
							id='voucher'
							className='block w-full rounded-xl border border-gray-200 bg-gray-50 
            pl-10 pr-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-gray-900 
            focus:ring-1 focus:ring-gray-900 focus:outline-none transition duration-200'
							placeholder='Enter gift card or coupon code'
							value={userInputCode}
							onChange={(e) => setUserInputCode(e.target.value)}
							disabled={isCouponApplied}
						/>
					</div>

					<motion.button
						type='button'
						className='w-full bg-gray-900 hover:bg-gray-800 text-white py-2.5 rounded-xl font-medium transition flex items-center justify-center gap-2 shadow-md disabled:opacity-50 disabled:cursor-not-allowed'
						whileHover={{ scale: 1.02 }}
						whileTap={{ scale: 0.98 }}
						onClick={handleApplyCoupon}
						disabled={!userInputCode || isCouponApplied || isApplying}
					>
						{isApplying ? (
							<>
								<div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin' />
								Applying...
							</>
						) : (
							<>
								<Sparkles size={16} />
								Apply Code
							</>
						)}
					</motion.button>
				</div>

				{/* Applied Coupon Section */}
				<AnimatePresence>
					{isCouponApplied && coupon && (
						<motion.div
							initial={{ opacity: 0, y: -10 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -10 }}
							className='mt-4 pt-4 border-t border-gray-100'
						>
							<div className='bg-green-50 rounded-xl p-4 border border-green-200'>
								<div className='flex items-start justify-between'>
									<div>
										<div className='flex items-center gap-2 mb-1'>
											<Percent size={14} className='text-green-600' />
											<h4 className='text-sm font-semibold text-green-900'>Coupon Applied</h4>
										</div>
										<p className='text-sm text-green-700 font-medium'>{coupon.code}</p>
										<p className='text-xs text-green-600 mt-0.5'>
											{coupon.discountPercentage}% discount applied
										</p>
									</div>
									<motion.button
										whileHover={{ scale: 1.05 }}
										whileTap={{ scale: 0.95 }}
										onClick={handleRemoveCoupon}
										className='p-1.5 rounded-lg text-red-500 hover:bg-red-50 transition-colors'
										aria-label="Remove coupon"
									>
										<X size={16} />
									</motion.button>
								</div>
							</div>
						</motion.div>
					)}
				</AnimatePresence>

				{/* Info Text */}
				<div className='mt-4 flex items-center justify-center gap-2 text-xs text-gray-400'>
					<Sparkles size={12} />
					<span>Limited time offer. Terms apply.</span>
				</div>
			</div>
		</motion.div>
	);
};

export default GiftCouponCard;