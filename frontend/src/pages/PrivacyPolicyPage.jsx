import { Link } from "react-router-dom";
import { FileText, Scale, Clock, CreditCard, Truck, RefreshCw, Shield, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

const TermsPage = () => {
	return (
		<div className='min-h-screen bg-gray-50'>
			{/* Hero Section with Background Image */}
			<div className='relative h-[300px] bg-cover bg-center bg-fixed' style={{
				backgroundImage: 'url("https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070")'
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
							<span>Legal</span>
							<span>→</span>
							<span className='text-white'>Terms & Conditions</span>
						</div>
						<h1 className='text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight'>
							Terms & Conditions
						</h1>
						<p className='text-white/80 text-lg'>
							Please read these terms carefully before using our services.
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
								<FileText size={20} className='text-gray-400' />
								<span className='text-sm text-gray-500'>Effective: June 1, 2026</span>
							</div>
							<Link to='/contact' className='text-sm text-gray-900 hover:text-gray-600 transition font-medium'>
								Questions? Contact us →
							</Link>
						</div>

						<div className='space-y-8'>
							{/* Section 1 */}
							<section>
								<div className='flex items-center gap-3 mb-4'>
									<div className='w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center'>
										<FileText size={18} className='text-gray-700' />
									</div>
									<h2 className='text-xl font-bold text-gray-900'>Agreement to Terms</h2>
								</div>
								<p className='text-gray-600 leading-relaxed'>
									By accessing or using StyleHub, you agree to be bound by these Terms & Conditions. 
									If you disagree with any part of these terms, you may not access our services.
								</p>
							</section>

							{/* Section 2 */}
							<section>
								<div className='flex items-center gap-3 mb-4'>
									<div className='w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center'>
										<ShoppingBag size={18} className='text-gray-700' />
									</div>
									<h2 className='text-xl font-bold text-gray-900'>Orders & Purchases</h2>
								</div>
								<ul className='space-y-2 text-gray-600 ml-6'>
									<li className='list-disc'>All orders are subject to product availability</li>
									<li className='list-disc'>Prices are subject to change without notice</li>
									<li className='list-disc'>We reserve the right to refuse or cancel any order</li>
									<li className='list-disc'>In case of pricing errors, we will notify you before processing</li>
								</ul>
							</section>

							{/* Section 3 */}
							<section>
								<div className='flex items-center gap-3 mb-4'>
									<div className='w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center'>
										<CreditCard size={18} className='text-gray-700' />
									</div>
									<h2 className='text-xl font-bold text-gray-900'>Payments</h2>
								</div>
								<ul className='space-y-2 text-gray-600 ml-6'>
									<li className='list-disc'>We accept major credit cards and digital payments</li>
									<li className='list-disc'>All payments are processed through secure gateways</li>
									<li className='list-disc'>You agree to provide accurate payment information</li>
									<li className='list-disc'>Sales tax may apply based on your location</li>
								</ul>
							</section>

							{/* Section 4 */}
							<section>
								<div className='flex items-center gap-3 mb-4'>
									<div className='w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center'>
										<Truck size={18} className='text-gray-700' />
									</div>
									<h2 className='text-xl font-bold text-gray-900'>Shipping & Delivery</h2>
								</div>
								<ul className='space-y-2 text-gray-600 ml-6'>
									<li className='list-disc'>Delivery estimates are provided but not guaranteed</li>
									<li className='list-disc'>Risk of loss passes to you upon delivery</li>
									<li className='list-disc'>International shipping may incur customs duties</li>
									<li className='list-disc'>We are not responsible for carrier delays</li>
								</ul>
							</section>

							{/* Section 5 */}
							<section>
								<div className='flex items-center gap-3 mb-4'>
									<div className='w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center'>
										<RefreshCw size={18} className='text-gray-700' />
									</div>
									<h2 className='text-xl font-bold text-gray-900'>Returns & Refunds</h2>
								</div>
								<ul className='space-y-2 text-gray-600 ml-6'>
									<li className='list-disc'>30-day return window for eligible items</li>
									<li className='list-disc'>Items must be unworn with original tags</li>
									<li className='list-disc'>Refunds processed within 5-7 business days</li>
									<li className='list-disc'>Return shipping is complimentary for orders over $50</li>
								</ul>
							</section>

							{/* Section 6 */}
							<section>
								<div className='flex items-center gap-3 mb-4'>
									<div className='w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center'>
										<Shield size={18} className='text-gray-700' />
									</div>
									<h2 className='text-xl font-bold text-gray-900'>Intellectual Property</h2>
								</div>
								<p className='text-gray-600 leading-relaxed'>
									All content on StyleHub, including images, logos, text, and designs, 
									is our intellectual property and may not be used without permission.
								</p>
							</section>

							{/* Section 7 */}
							<section>
								<div className='flex items-center gap-3 mb-4'>
									<div className='w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center'>
										<Scale size={18} className='text-gray-700' />
									</div>
									<h2 className='text-xl font-bold text-gray-900'>Account Responsibility</h2>
								</div>
								<ul className='space-y-2 text-gray-600 ml-6'>
									<li className='list-disc'>You are responsible for maintaining account security</li>
									<li className='list-disc'>Notify us immediately of unauthorized access</li>
									<li className='list-disc'>We reserve the right to suspend accounts for violations</li>
									<li className='list-disc'>You must be 18+ to create an account</li>
								</ul>
							</section>

							{/* Section 8 */}
							<section>
								<div className='flex items-center gap-3 mb-4'>
									<div className='w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center'>
										<AlertCircle size={18} className='text-gray-700' />
									</div>
									<h2 className='text-xl font-bold text-gray-900'>Limitation of Liability</h2>
								</div>
								<p className='text-gray-600 leading-relaxed'>
									To the maximum extent permitted by law, StyleHub shall not be liable for any indirect, 
									incidental, or consequential damages arising from your use of our services.
								</p>
							</section>

							{/* Section 9 */}
							<section>
								<div className='flex items-center gap-3 mb-4'>
									<div className='w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center'>
										<Clock size={18} className='text-gray-700' />
									</div>
									<h2 className='text-xl font-bold text-gray-900'>Changes to Terms</h2>
								</div>
								<p className='text-gray-600 leading-relaxed'>
									We may update these Terms & Conditions at any time. Continued use of StyleHub 
									constitutes acceptance of the revised terms.
								</p>
							</section>

							{/* Section 10 */}
							<section className='pt-4 border-t border-gray-100'>
								<h2 className='text-xl font-bold text-gray-900 mb-4'>Governing Law</h2>
								<p className='text-gray-600 leading-relaxed'>
									These terms are governed by the laws of the United States and the State of New York, 
									without regard to conflict of law principles.
								</p>
							</section>
						</div>

						{/* Footer Note */}
						<div className='mt-8 pt-6 border-t border-gray-100 text-center'>
							<p className='text-xs text-gray-400'>
								By using StyleHub, you acknowledge that you have read, understood, and agree to these Terms & Conditions.
							</p>
						</div>
					</div>
				</motion.div>
			</div>
		</div>
	);
};

export default TermsPage;