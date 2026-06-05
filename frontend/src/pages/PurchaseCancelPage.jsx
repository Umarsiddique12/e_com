import { CheckCircle, ArrowLeft, ShoppingBag, Package, Truck, Mail, Download, Share2 } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const PurchaseSuccessPage = () => {
	return (
		<div className='min-h-screen bg-gray-50'>
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
						<p className='text-gray-500 text-center mb-6'>
							Your order has been successfully placed and confirmed.
						</p>

						{/* Order Details Box */}
						<div className='bg-gray-50 rounded-xl p-5 mb-6 border border-gray-100'>
							<div className='flex items-center justify-between mb-4 pb-3 border-b border-gray-200'>
								<span className='text-xs text-gray-400 uppercase tracking-wider'>Order Number</span>
								<span className='text-sm font-mono font-semibold text-gray-800'>#STH-2024-001234</span>
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

						{/* Buttons */}
						<div className='space-y-3'>
							<Link
								to='/profile'
								className='w-full bg-gray-900 hover:bg-gray-800 text-white font-semibold py-3 px-4 rounded-lg transition flex items-center justify-center gap-2'
							>
								<ShoppingBag size={18} />
								View My Orders
							</Link>
							
							<div className='grid grid-cols-2 gap-3'>
								<Link
									to='/'
									className='bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-4 rounded-lg transition flex items-center justify-center gap-2 border border-gray-200'
								>
									<ArrowLeft size={16} />
									Continue Shopping
								</Link>
								
								<button
									onClick={() => window.print()}
									className='bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-4 rounded-lg transition flex items-center justify-center gap-2 border border-gray-200'
								>
									<Download size={16} />
									Download Receipt
								</button>
							</div>
						</div>

						{/* Share Section */}
						<div className='mt-6 pt-4 border-t border-gray-100 text-center'>
							<p className='text-xs text-gray-400 mb-3'>Share your purchase</p>
							<div className='flex gap-3 justify-center'>
								<button className='w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition'>
									<Share2 size={14} className='text-gray-600' />
								</button>
							</div>
						</div>
					</div>
				</motion.div>
			</div>
		</div>
	);
};

export default PurchaseSuccessPage;