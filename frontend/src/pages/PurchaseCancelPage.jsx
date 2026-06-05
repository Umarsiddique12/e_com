import { XCircle, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const PurchaseCancelPage = () => {
	return (
		<div className='min-h-screen flex items-center justify-center px-4'>
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className='max-w-md w-full bg-white border border-slate-200/80 rounded-2xl shadow-xl overflow-hidden relative z-10'
			>
				{/* Top accent bar */}
				<div className='h-1.5 w-full bg-gradient-to-r from-red-500 to-rose-400' />

				<div className='p-6 sm:p-8'>
					<div className='flex justify-center'>
						<div className='w-20 h-20 rounded-full bg-red-50 flex items-center justify-center mb-4 border border-red-100'>
							<XCircle className='text-red-500 w-10 h-10' />
						</div>
					</div>
					<h1 className='text-2xl sm:text-3xl font-extrabold text-center text-slate-900 mb-2'>Purchase Cancelled</h1>
					<p className='text-slate-500 text-center mb-6'>
						Your order has been cancelled. No charges have been made.
					</p>
					<div className='bg-red-50 border border-red-100 rounded-xl p-4 mb-6'>
						<p className='text-sm text-slate-600 text-center leading-relaxed'>
							If you encountered any issues during the checkout process, please don&apos;t hesitate to
							contact our support team.
						</p>
					</div>
					<div className='space-y-3'>
						<Link
							to={"/"}
							className='w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2.5 px-4 rounded-xl transition duration-200 flex items-center justify-center border border-slate-200'
						>
							<ArrowLeft className='mr-2' size={18} />
							Return to Shop
						</Link>
					</div>
				</div>
			</motion.div>
		</div>
	);
};

export default PurchaseCancelPage;
