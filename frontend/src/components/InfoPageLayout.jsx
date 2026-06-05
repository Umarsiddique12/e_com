import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronRight, Home, Calendar, Shield, CheckCircle } from "lucide-react";

const InfoPageLayout = ({ title, subtitle, icon: Icon, children, lastUpdated }) => {
	return (
		<div className='min-h-screen bg-gray-50'>
			{/* Hero Section with Background Image */}
			<div className='relative h-[300px] bg-cover bg-center bg-fixed' style={{
				backgroundImage: 'url("https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070")'
			}}>
				<div className='absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/70' />
				<div className='absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-gray-50' />
				
				<div className='relative h-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center'>
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						className='text-center w-full'
					>
						{Icon && (
							<div className='inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-sm rounded-2xl mb-5 border border-white/30'>
								<Icon size={36} className='text-white' />
							</div>
						)}
						<h1 className='text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight'>
							{title}
						</h1>
						{subtitle && (
							<p className='text-white/80 text-lg max-w-2xl mx-auto'>
								{subtitle}
							</p>
						)}
						{lastUpdated && (
							<div className='flex items-center justify-center gap-2 mt-4 text-white/60 text-sm'>
								<Calendar size={14} />
								<span>Last updated: {lastUpdated}</span>
							</div>
						)}
					</motion.div>
				</div>
			</div>

			{/* Main Content */}
			<div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10 pb-16'>
				{/* Breadcrumb */}
				<motion.nav
					initial={{ opacity: 0, x: -20 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.5, delay: 0.1 }}
					className='flex items-center gap-1.5 text-sm text-gray-500 mb-6 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-lg inline-flex border border-gray-100'
				>
					<Link to='/' className='hover:text-gray-900 transition flex items-center gap-1'>
						<Home size={14} />
						Home
					</Link>
					<ChevronRight size={14} />
					<span className='text-gray-900 font-medium'>{title}</span>
				</motion.nav>

				{/* Content Card */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.2 }}
					className='bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden'
				>
					<div className='absolute top-0 left-0 w-full h-1 bg-gray-900' />
					
					<div className='p-8 sm:p-10'>
						{/* Content Styling */}
						<div className='prose prose-gray max-w-none 
							[&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-gray-900 [&_h2]:mt-8 [&_h2]:mb-4 [&_h2:first-child]:mt-0 
							[&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-gray-800 [&_h3]:mt-6 [&_h3]:mb-3
							[&_p]:text-gray-600 [&_p]:leading-relaxed [&_p]:mb-4 
							[&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_ul]:mb-5 
							[&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:space-y-2 [&_ol]:mb-5 
							[&_li]:text-gray-600 [&_li]:leading-relaxed
							[&_a]:text-gray-900 [&_a]:font-medium hover:[&_a]:text-gray-600 hover:[&_a]:underline 
							[&_strong]:text-gray-900 [&_strong]:font-semibold
							[&_table]:w-full [&_table]:border-collapse [&_table]:my-6
							[&_th]:text-left [&_th]:py-3 [&_th]:px-4 [&_th]:font-semibold [&_th]:text-gray-900 [&_th]:bg-gray-50 [&_th]:border-b [&_th]:border-gray-200
							[&_td]:py-3 [&_td]:px-4 [&_td]:text-gray-600 [&_td]:border-b [&_td]:border-gray-100
							[&_tr]:hover:bg-gray-50 [&_tr]:transition-colors
							[&_.table-container]:overflow-x-auto
						'>
							{children}
						</div>

						{/* Footer Note */}
						<div className='mt-8 pt-6 border-t border-gray-100'>
							<div className='bg-gray-50 rounded-xl p-4 flex items-center gap-3'>
								<Shield size={18} className='text-gray-600 flex-shrink-0' />
								<p className='text-xs text-gray-600'>
									This information is subject to our <Link to='/terms' className='text-gray-900 hover:text-gray-600'>Terms & Conditions</Link> and <Link to='/privacy' className='text-gray-900 hover:text-gray-600'>Privacy Policy</Link>.
								</p>
							</div>
						</div>
					</div>
				</motion.div>

				{/* Help Section */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.3 }}
					className='mt-8 text-center'
				>
					<p className='text-sm text-gray-500'>
						Need assistance?{" "}
						<Link to='/contact' className='text-gray-900 hover:text-gray-600 font-medium transition-colors'>
							Contact our support team
						</Link>
					</p>
				</motion.div>
			</div>
		</div>
	);
};

export default InfoPageLayout;