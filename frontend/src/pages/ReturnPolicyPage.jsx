import { Link } from "react-router-dom";
import { RotateCcw, Package, Truck, Clock, Shield, CreditCard, Mail, CheckCircle, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

const ReturnPolicyPage = () => {
	return (
		<div className='min-h-screen bg-gray-50'>
			{/* Hero Section with Background Image */}
			<div className='relative h-[300px] bg-cover bg-center bg-fixed' style={{
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
							<span>Policies</span>
							<span>→</span>
							<span className='text-white'>Return Policy</span>
						</div>
						<h1 className='text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight'>
							Return Policy
						</h1>
						<p className='text-white/80 text-lg'>
							We want you to love every purchase. If something isn't right, we're here to help.
						</p>
					</motion.div>
				</div>
			</div>

			{/* Main Content */}
			<div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10 pb-16'>
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.2 }}
					className='bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden'
				>
					<div className='absolute top-0 left-0 w-full h-1 bg-gray-900' />
					
					<div className='p-8 sm:p-10'>
						{/* Last Updated Badge */}
						<div className='flex items-center justify-between mb-8 pb-4 border-b border-gray-100'>
							<div className='flex items-center gap-2'>
								<RotateCcw size={20} className='text-gray-400' />
								<span className='text-sm text-gray-500'>Last updated: June 1, 2026</span>
							</div>
							<Link to='/contact' className='text-sm text-gray-900 hover:text-gray-600 transition font-medium'>
								Questions? Contact us →
							</Link>
						</div>

						<div className='space-y-8'>
							{/* Section 1 - 30-Day Returns */}
							<section>
								<div className='flex items-center gap-3 mb-4'>
									<div className='w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center'>
										<Clock size={18} className='text-gray-700' />
									</div>
									<h2 className='text-xl font-bold text-gray-900'>30-Day Hassle-Free Returns</h2>
								</div>
								<p className='text-gray-600 leading-relaxed'>
									At StyleHub, your satisfaction is our priority. If you're not completely happy with your order,
									you may return eligible items within <strong className='text-gray-900'>30 days</strong> of delivery for a full refund or exchange.
								</p>
							</section>

							{/* Section 2 - Eligibility */}
							<section>
								<div className='flex items-center gap-3 mb-4'>
									<div className='w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center'>
										<Shield size={18} className='text-gray-700' />
									</div>
									<h2 className='text-xl font-bold text-gray-900'>Eligibility Requirements</h2>
								</div>
								<p className='text-gray-600 mb-4 leading-relaxed'>To qualify for a return, items must meet the following conditions:</p>
								<ul className='space-y-2 text-gray-600 ml-6'>
									<li className='list-disc'>Items must be unworn, unwashed, and in original condition with all tags attached</li>
									<li className='list-disc'>Items must be in original packaging where applicable</li>
									<li className='list-disc'>Proof of purchase (order number or receipt) is required</li>
									<li className='list-disc'>Final sale items, personalized products, and intimate apparel are non-returnable</li>
									<li className='list-disc'>Gift cards and promotional items are not eligible for returns</li>
								</ul>
							</section>

							{/* Section 3 - How to Start */}
							<section>
								<div className='flex items-center gap-3 mb-4'>
									<div className='w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center'>
										<Package size={18} className='text-gray-700' />
									</div>
									<h2 className='text-xl font-bold text-gray-900'>How to Start a Return</h2>
								</div>
								<ol className='space-y-2 text-gray-600 ml-6 list-decimal'>
									<li>Log in to your <Link to='/profile' className='text-gray-900 hover:text-gray-600 transition font-medium'>StyleHub account</Link> and navigate to your order history</li>
									<li>Select the order containing the item(s) you wish to return</li>
									<li>Click "Request Return" and choose your reason from the dropdown</li>
									<li>Print the prepaid return shipping label we provide via email</li>
									<li>Pack items securely and drop off at any authorized shipping location</li>
								</ol>
								<p className='text-gray-600 mt-3'>
									Don't have an account? Contact us at{" "}
									<a href='mailto:returns@stylehub.com' className='text-gray-900 hover:text-gray-600 transition font-medium'>
										returns@stylehub.com
									</a>{" "}
									with your order number.
								</p>
							</section>

							{/* Section 4 - Refund Processing */}
							<section>
								<div className='flex items-center gap-3 mb-4'>
									<div className='w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center'>
										<CreditCard size={18} className='text-gray-700' />
									</div>
									<h2 className='text-xl font-bold text-gray-900'>Refund Processing</h2>
								</div>
								<p className='text-gray-600 leading-relaxed'>
									Once we receive and inspect your return, we'll process your refund within <strong className='text-gray-900'>5–7 business days</strong>.
									Refunds are issued to your original payment method. Please allow an additional 3–5 business days
									for the refund to appear on your statement, depending on your bank or card issuer.
								</p>
							</section>

							{/* Section 5 - Exchanges */}
							<section>
								<div className='flex items-center gap-3 mb-4'>
									<div className='w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center'>
										<RotateCcw size={18} className='text-gray-700' />
									</div>
									<h2 className='text-xl font-bold text-gray-900'>Exchanges</h2>
								</div>
								<p className='text-gray-600 leading-relaxed'>
									Need a different size or color? Select "Exchange" when initiating your return. We'll ship your
									replacement item as soon as we receive the original. Exchanges are subject to availability.
									If your preferred option is out of stock, we'll issue a full refund instead.
								</p>
							</section>

							{/* Section 6 - Return Shipping Costs */}
							<section>
								<div className='flex items-center gap-3 mb-4'>
									<div className='w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center'>
										<Truck size={18} className='text-gray-700' />
									</div>
									<h2 className='text-xl font-bold text-gray-900'>Return Shipping Costs</h2>
								</div>
								<ul className='space-y-2 text-gray-600 ml-6'>
									<li className='list-disc'><strong className='text-gray-900'>Free returns</strong> on orders over $50 within the United States</li>
									<li className='list-disc'>A flat $5.99 return shipping fee applies to orders under $50</li>
									<li className='list-disc'>International return shipping costs are the responsibility of the customer</li>
									<li className='list-disc'>Defective or incorrect items: we cover all return shipping — contact us first</li>
								</ul>
							</section>

							{/* Section 7 - Damaged Items */}
							<section>
								<div className='flex items-center gap-3 mb-4'>
									<div className='w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center'>
										<AlertCircle size={18} className='text-gray-700' />
									</div>
									<h2 className='text-xl font-bold text-gray-900'>Damaged or Defective Items</h2>
								</div>
								<p className='text-gray-600 leading-relaxed'>
									Received a damaged or defective product? Contact us within <strong className='text-gray-900'>48 hours</strong> of delivery
									at <a href='mailto:support@stylehub.com' className='text-gray-900 hover:text-gray-600 transition font-medium'>support@stylehub.com</a> with photos of the issue.
									We'll arrange a free return and send a replacement or full refund immediately.
								</p>
							</section>

							{/* Section 8 - Questions */}
							<section className='pt-4 border-t border-gray-100'>
								<div className='flex items-center gap-3 mb-4'>
									<div className='w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center'>
										<Mail size={18} className='text-gray-700' />
									</div>
									<h2 className='text-xl font-bold text-gray-900'>Questions?</h2>
								</div>
								<p className='text-gray-600 leading-relaxed'>
									Our customer care team is available Monday–Friday, 9 AM – 6 PM EST.
									Visit our <Link to='/contact' className='text-gray-900 hover:text-gray-600 transition font-medium'>Contact page</Link> or email{" "}
									<a href='mailto:returns@stylehub.com' className='text-gray-900 hover:text-gray-600 transition font-medium'>
										returns@stylehub.com
									</a>.
								</p>
							</section>
						</div>

						{/* Footer Note */}
						<div className='mt-8 pt-6 border-t border-gray-100'>
							<div className='bg-gray-50 rounded-xl p-4 flex items-center gap-3'>
								<CheckCircle size={18} className='text-green-500 flex-shrink-0' />
								<p className='text-xs text-gray-600'>
									This Return Policy applies to all purchases made on StyleHub and is subject to our Terms & Conditions.
								</p>
							</div>
						</div>
					</div>
				</motion.div>
			</div>
		</div>
	);
};

export default ReturnPolicyPage;