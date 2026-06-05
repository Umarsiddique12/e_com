import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronRight, Home } from "lucide-react";

const InfoPageLayout = ({ title, subtitle, icon: Icon, children, lastUpdated }) => {
	return (
		<div className='min-h-screen'>
			<div className='relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
				<nav className='flex items-center gap-1.5 text-sm text-slate-500 mb-8'>
					<Link to='/' className='hover:text-emerald-600 transition flex items-center gap-1'>
						<Home size={14} />
						Home
					</Link>
					<ChevronRight size={14} />
					<span className='text-slate-700 font-medium'>{title}</span>
				</nav>

				<motion.div
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					className='text-center mb-12'
				>
					{Icon && (
						<div className='inline-flex items-center justify-center w-16 h-16 bg-emerald-50 rounded-2xl mb-4 text-emerald-600 border border-emerald-100'>
							<Icon size={32} />
						</div>
					)}
					<h1 className='text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-3'>{title}</h1>
					{subtitle && <p className='text-lg text-slate-500 max-w-2xl mx-auto'>{subtitle}</p>}
					{lastUpdated && (
						<p className='text-sm text-slate-400 mt-3'>Last updated: {lastUpdated}</p>
					)}
				</motion.div>

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.15 }}
					className='bg-white/80 backdrop-blur-sm border border-slate-200/60 rounded-2xl p-8 sm:p-10 shadow-sm'
				>
					<div className='space-y-6 text-slate-600 leading-relaxed [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-slate-900 [&_h2]:mt-8 [&_h2]:mb-3 [&_h2:first-child]:mt-0 [&_p]:mb-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-1.5 [&_ul]:mb-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:space-y-1.5 [&_ol]:mb-4 [&_a]:text-emerald-600 [&_a]:font-medium hover:[&_a]:underline [&_strong]:text-slate-800 [&_table]:w-full [&_th]:text-left [&_th]:py-3 [&_th]:font-semibold [&_th]:text-slate-800 [&_td]:py-3 [&_tr]:border-b [&_tr]:border-slate-100'>
						{children}
					</div>
				</motion.div>
			</div>
		</div>
	);
};

export default InfoPageLayout;
