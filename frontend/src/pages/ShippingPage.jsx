import { Link } from "react-router-dom";
import { Truck, Clock, Globe, Package, MapPin, AlertCircle, Mail, CheckCircle, Zap, Shield } from "lucide-react";
import { motion } from "framer-motion";

const ShippingPage = () => {
	return (
		<div className='min-h-screen bg-gray-50'>
			{/* Hero Section with Background Image */}
			<div className='relative h-[300px] bg-cover bg-center bg-fixed' style={{
				backgroundImage: 'url("https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?q=80&w=2070")'
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
							<span className='text-white'>Shipping Information</span>
						</div>
						<h1 className='text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight'>
							Shipping Information
						</h1>
						<p className='text-white/80 text-lg'>
							Fast, reliable delivery straight to your door. Free shipping on orders over $50.
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
								<Truck size={20} className='text-gray-400' />
								<span className='text-sm text-gray-500'>Last updated: June 1, 2026</span>
							</div>
							<Link to='/contact' className='text-sm text-gray-900 hover:text-gray-600 transition font-medium'>
								Questions? Contact us →
							</Link>
						</div>

						<div className='space-y-8'>
							{/* Section 1 - Free Shipping Highlight */}
							<section className='bg-gray-50 rounded-xl p-6 border border-gray-100'>
								<div className='flex items-center gap-3 mb-3'>
									<div className='w-12 h-12 bg-gray-900 rounded-xl flex items-center justify-center'>
										<Truck size={22} className='text-white' />
									</div>
									<div>
										<h2 className='text-xl font-bold text-gray-900'>Free Shipping</h2>
										<p className='text-gray-600 text-sm'>On all orders over $50</p>
									</div>
								</div>
								<p className='text-gray-600 leading-relaxed'>
									Enjoy <strong className='text-gray-900'>free standard shipping</strong> on all orders over <strong className='text-gray-900'>$50</strong> within
									the continental United States. No code needed — the discount is applied automatically at checkout.
								</p>
							</section>

							{/* Section 2 - Shipping Methods Table */}
							<section>
								<div className='flex items-center gap-3 mb-4'>
									<div className='w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center'>
										<Zap size={18} className='text-gray-700' />
									</div>
									<h2 className='text-xl font-bold text-gray-900'>Shipping Methods & Delivery Times</h2>
								</div>
								<div className='overflow-x-auto'>
									<table className='w-full text-sm border-collapse'>
										<thead>
											<tr className='border-b border-gray-200 bg-gray-50'>
												<th className='text-left py-3 px-4 font-semibold text-gray-800 rounded-l-lg'>Method</th>
												<th className='text-left py-3 px-4 font-semibold text-gray-800'>Cost</th>
												<th className='text-left py-3 px-4 font-semibold text-gray-800 rounded-r-lg'>Estimated Delivery</th>
											</tr>
										</thead>
										<tbody>
											<tr className='border-b border-gray-100 hover:bg-gray-50 transition'>
												<td className='py-3 px-4 font-medium text-gray-800'>Standard</td>
												<td className='py-3 px-4 text-gray-600'>$5.99 <span className='text-green-600 text-xs'>(Free over $50)</span></td>
												<td className='py-3 px-4 text-gray-600'>5–7 business days</td>
											</tr>
											<tr className='border-b border-gray-100 hover:bg-gray-50 transition'>
												<td className='py-3 px-4 font-medium text-gray-800'>Express</td>
												<td className='py-3 px-4 text-gray-600'>$12.99</td>
												<td className='py-3 px-4 text-gray-600'>2–3 business days</td>
											</tr>
											<tr className='hover:bg-gray-50 transition'>
												<td className='py-3 px-4 font-medium text-gray-800'>Overnight</td>
												<td className='py-3 px-4 text-gray-600'>$24.99</td>
												<td className='py-3 px-4 text-gray-600'>Next business day</td>
											</tr>
										</tbody>
									</table>
								</div>
								<p className='text-xs text-gray-400 mt-3'>
									Delivery times are estimates and begin after your order has been processed and shipped.
								</p>
							</section>

							{/* Section 3 - Order Processing */}
							<section>
								<div className='flex items-center gap-3 mb-4'>
									<div className='w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center'>
										<Clock size={18} className='text-gray-700' />
									</div>
									<h2 className='text-xl font-bold text-gray-900'>Order Processing</h2>
								</div>
								<p className='text-gray-600 leading-relaxed'>
									Orders placed before <strong className='text-gray-900'>2:00 PM EST</strong> on business days are typically processed
									the same day. Orders placed after cutoff or on weekends/holidays ship the next business day.
									You will receive a confirmation email with tracking information once your order ships.
								</p>
							</section>

							{/* Section 4 - International Shipping */}
							<section>
								<div className='flex items-center gap-3 mb-4'>
									<div className='w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center'>
										<Globe size={18} className='text-gray-700' />
									</div>
									<h2 className='text-xl font-bold text-gray-900'>International Shipping</h2>
								</div>
								<p className='text-gray-600 leading-relaxed'>
									We currently ship to the United States, Canada, United Kingdom, and select European countries.
									International shipping rates and delivery times vary by destination. Customs duties and import
									taxes may apply and are the responsibility of the recipient.
								</p>
							</section>

							{/* Section 5 - Order Tracking */}
							<section>
								<div className='flex items-center gap-3 mb-4'>
									<div className='w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center'>
										<Package size={18} className='text-gray-700' />
									</div>
									<h2 className='text-xl font-bold text-gray-900'>Order Tracking</h2>
								</div>
								<p className='text-gray-600 leading-relaxed'>
									Track your order anytime from your <Link to='/profile' className='text-gray-900 hover:text-gray-600 transition font-medium'>account profile</Link> or using the
									tracking link in your shipping confirmation email. Tracking updates may take 24 hours to appear
									after your package is picked up by the carrier.
								</p>
							</section>

							{/* Section 6 - Shipping Issues */}
							<section>
								<div className='flex items-center gap-3 mb-4'>
									<div className='w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center'>
										<AlertCircle size={18} className='text-gray-700' />
									</div>
									<h2 className='text-xl font-bold text-gray-900'>Shipping Issues</h2>
								</div>
								<ul className='space-y-2 text-gray-600 ml-6'>
									<li className='list-disc'><strong className='text-gray-900'>Lost packages:</strong> Contact us if your tracking shows delivered but you haven't received it within 48 hours</li>
									<li className='list-disc'><strong className='text-gray-900'>Damaged in transit:</strong> Report within 48 hours with photos — we'll send a replacement at no cost</li>
									<li className='list-disc'><strong className='text-gray-900'>Wrong address:</strong> Contact us immediately if you need to update your shipping address before dispatch</li>
								</ul>
							</section>

							{/* Section 7 - Need Help */}
							<section className='pt-4 border-t border-gray-100'>
								<div className='flex items-center gap-3 mb-4'>
									<div className='w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center'>
										<Mail size={18} className='text-gray-700' />
									</div>
									<h2 className='text-xl font-bold text-gray-900'>Need Help?</h2>
								</div>
								<p className='text-gray-600 leading-relaxed'>
									Questions about your shipment? Visit our <Link to='/faq' className='text-gray-900 hover:text-gray-600 transition font-medium'>FAQ</Link> or{" "}
									<Link to='/contact' className='text-gray-900 hover:text-gray-600 transition font-medium'>Contact us</Link> at{" "}
									<a href='mailto:shipping@stylehub.com' className='text-gray-900 hover:text-gray-600 transition font-medium'>
										shipping@stylehub.com
									</a>.
								</p>
							</section>
						</div>

						{/* Footer Note */}
						<div className='mt-8 pt-6 border-t border-gray-100'>
							<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
								<div className='flex items-center gap-2'>
									<Shield size={16} className='text-green-500' />
									<span className='text-xs text-gray-500'>Secure packaging</span>
								</div>
								<div className='flex items-center gap-2'>
									<MapPin size={16} className='text-green-500' />
									<span className='text-xs text-gray-500'>Real-time tracking</span>
								</div>
								<div className='flex items-center gap-2'>
									<CheckCircle size={16} className='text-green-500' />
									<span className='text-xs text-gray-500'>Insured deliveries</span>
								</div>
							</div>
						</div>
					</div>
				</motion.div>
			</div>
		</div>
	);
};

export default ShippingPage;