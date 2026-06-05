import { Link } from "react-router-dom";
import { FileText, Scale, Shield, AlertCircle, CreditCard, Truck, RotateCcw, Lock, Globe, Clock, Mail } from "lucide-react";
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
							Please read these terms carefully before using StyleHub.
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
									<h2 className='text-xl font-bold text-gray-900'>1. Agreement to Terms</h2>
								</div>
								<p className='text-gray-600 leading-relaxed'>
									By accessing or using the StyleHub website and services, you agree to be bound by these
									Terms & Conditions and our <Link to='/privacy' className='text-gray-900 hover:text-gray-600 transition font-medium'>Privacy Policy</Link>. If you do not agree,
									please do not use our services.
								</p>
							</section>

							{/* Section 2 */}
							<section>
								<div className='flex items-center gap-3 mb-4'>
									<div className='w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center'>
										<Shield size={18} className='text-gray-700' />
									</div>
									<h2 className='text-xl font-bold text-gray-900'>2. Eligibility</h2>
								</div>
								<p className='text-gray-600 leading-relaxed'>
									You must be at least 18 years old to create an account and make purchases on StyleHub.
									By using our services, you represent that you meet this age requirement and have the legal
									capacity to enter into a binding agreement.
								</p>
							</section>

							{/* Section 3 */}
							<section>
								<div className='flex items-center gap-3 mb-4'>
									<div className='w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center'>
										<Lock size={18} className='text-gray-700' />
									</div>
									<h2 className='text-xl font-bold text-gray-900'>3. Account Registration</h2>
								</div>
								<p className='text-gray-600 mb-4 leading-relaxed'>When you create an account, you agree to:</p>
								<ul className='space-y-2 text-gray-600 ml-6'>
									<li className='list-disc'>Provide accurate, current, and complete information</li>
									<li className='list-disc'>Maintain and promptly update your account information</li>
									<li className='list-disc'>Keep your password secure and confidential</li>
									<li className='list-disc'>Accept responsibility for all activities under your account</li>
									<li className='list-disc'>Notify us immediately of any unauthorized use of your account</li>
								</ul>
							</section>

							{/* Section 4 */}
							<section>
								<div className='flex items-center gap-3 mb-4'>
									<div className='w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center'>
										<CreditCard size={18} className='text-gray-700' />
									</div>
									<h2 className='text-xl font-bold text-gray-900'>4. Products & Pricing</h2>
								</div>
								<p className='text-gray-600 leading-relaxed'>
									We strive to display accurate product descriptions, images, and prices. However, we do not
									guarantee that all information is error-free. We reserve the right to correct pricing errors,
									cancel orders placed at incorrect prices, and modify or discontinue products without notice.
									All prices are listed in USD unless otherwise stated.
								</p>
							</section>

							{/* Section 5 */}
							<section>
								<div className='flex items-center gap-3 mb-4'>
									<div className='w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center'>
										<CreditCard size={18} className='text-gray-700' />
									</div>
									<h2 className='text-xl font-bold text-gray-900'>5. Orders & Payment</h2>
								</div>
								<p className='text-gray-600 leading-relaxed'>
									Placing an order constitutes an offer to purchase. We reserve the right to accept or decline
									any order for any reason. Payment is processed securely through our third-party payment
									processor. By submitting payment information, you authorize us to charge the total order
									amount, including applicable taxes and shipping fees.
								</p>
							</section>

							{/* Section 6 */}
							<section>
								<div className='flex items-center gap-3 mb-4'>
									<div className='w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center'>
										<Truck size={18} className='text-gray-700' />
									</div>
									<h2 className='text-xl font-bold text-gray-900'>6. Shipping & Delivery</h2>
								</div>
								<p className='text-gray-600 leading-relaxed'>
									Shipping times and costs vary by location and shipping method selected at checkout.
									Estimated delivery dates are not guaranteed. Risk of loss passes to you upon delivery to
									the carrier. See our <Link to='/shipping' className='text-gray-900 hover:text-gray-600 transition font-medium'>Shipping Information</Link> page for full details.
								</p>
							</section>

							{/* Section 7 */}
							<section>
								<div className='flex items-center gap-3 mb-4'>
									<div className='w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center'>
										<RotateCcw size={18} className='text-gray-700' />
									</div>
									<h2 className='text-xl font-bold text-gray-900'>7. Returns & Refunds</h2>
								</div>
								<p className='text-gray-600 leading-relaxed'>
									Our return and refund policies are outlined in our{" "}
									<Link to='/returns' className='text-gray-900 hover:text-gray-600 transition font-medium'>Return Policy</Link>. By making a purchase, you agree to the terms
									described therein.
								</p>
							</section>

							{/* Section 8 */}
							<section>
								<div className='flex items-center gap-3 mb-4'>
									<div className='w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center'>
										<Scale size={18} className='text-gray-700' />
									</div>
									<h2 className='text-xl font-bold text-gray-900'>8. Intellectual Property</h2>
								</div>
								<p className='text-gray-600 leading-relaxed'>
									All content on StyleHub — including logos, text, graphics, images, and software — is the
									property of StyleHub or its licensors and is protected by copyright and trademark laws.
									You may not reproduce, distribute, or create derivative works without our written permission.
								</p>
							</section>

							{/* Section 9 */}
							<section>
								<div className='flex items-center gap-3 mb-4'>
									<div className='w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center'>
										<AlertCircle size={18} className='text-gray-700' />
									</div>
									<h2 className='text-xl font-bold text-gray-900'>9. Prohibited Conduct</h2>
								</div>
								<p className='text-gray-600 mb-4 leading-relaxed'>You agree not to:</p>
								<ul className='space-y-2 text-gray-600 ml-6'>
									<li className='list-disc'>Use our services for any unlawful purpose</li>
									<li className='list-disc'>Attempt to gain unauthorized access to our systems or other users' accounts</li>
									<li className='list-disc'>Submit false or misleading information</li>
									<li className='list-disc'>Interfere with the proper functioning of the website</li>
									<li className='list-disc'>Resell products purchased from StyleHub for commercial purposes without authorization</li>
								</ul>
							</section>

							{/* Section 10 */}
							<section>
								<div className='flex items-center gap-3 mb-4'>
									<div className='w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center'>
										<Shield size={18} className='text-gray-700' />
									</div>
									<h2 className='text-xl font-bold text-gray-900'>10. Limitation of Liability</h2>
								</div>
								<p className='text-gray-600 leading-relaxed'>
									To the fullest extent permitted by law, StyleHub shall not be liable for any indirect,
									incidental, special, or consequential damages arising from your use of our services.
									Our total liability for any claim shall not exceed the amount you paid for the relevant order.
								</p>
							</section>

							{/* Section 11 */}
							<section>
								<div className='flex items-center gap-3 mb-4'>
									<div className='w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center'>
										<Globe size={18} className='text-gray-700' />
									</div>
									<h2 className='text-xl font-bold text-gray-900'>11. Governing Law</h2>
								</div>
								<p className='text-gray-600 leading-relaxed'>
									These Terms are governed by the laws of the State of New York, without regard to conflict
									of law principles. Any disputes shall be resolved in the courts of New York County, New York.
								</p>
							</section>

							{/* Section 12 */}
							<section>
								<div className='flex items-center gap-3 mb-4'>
									<div className='w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center'>
										<Clock size={18} className='text-gray-700' />
									</div>
									<h2 className='text-xl font-bold text-gray-900'>12. Changes to Terms</h2>
								</div>
								<p className='text-gray-600 leading-relaxed'>
									We may update these Terms at any time. Material changes will be posted on this page with
									an updated "Last updated" date. Continued use of StyleHub after changes constitutes acceptance
									of the revised Terms.
								</p>
							</section>

							{/* Section 13 */}
							<section className='pt-4 border-t border-gray-100'>
								<div className='flex items-center gap-3 mb-4'>
									<div className='w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center'>
										<Mail size={18} className='text-gray-700' />
									</div>
									<h2 className='text-xl font-bold text-gray-900'>13. Contact Us</h2>
								</div>
								<p className='text-gray-600 leading-relaxed'>
									Questions about these Terms? Reach us at{" "}
									<a href='mailto:legal@stylehub.com' className='text-gray-900 hover:text-gray-600 transition font-medium'>
										legal@stylehub.com
									</a>{" "}
									or visit our{" "}
									<Link to='/contact' className='text-gray-900 hover:text-gray-600 transition font-medium'>
										Contact page
									</Link>.
								</p>
							</section>
						</div>

						{/* Footer Note */}
						<div className='mt-8 pt-6 border-t border-gray-100'>
							<div className='bg-gray-50 rounded-xl p-4 flex items-center gap-3'>
								<Scale size={18} className='text-gray-600 flex-shrink-0' />
								<p className='text-xs text-gray-600'>
									By using StyleHub, you acknowledge that you have read, understood, and agree to these Terms & Conditions.
								</p>
							</div>
						</div>
					</div>
				</motion.div>
			</div>
		</div>
	);
};

export default TermsPage;