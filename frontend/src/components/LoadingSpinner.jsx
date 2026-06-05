import { motion } from "framer-motion";

export const InlineSpinner = () => {
	return (
		<div className='flex items-center justify-center p-4'>
			<div className='relative w-8 h-8'>
				<div className='absolute inset-0 rounded-full border-2 border-gray-100' />
				<div className='absolute inset-0 rounded-full border-2 border-gray-900 border-t-transparent animate-spin' />
			</div>
		</div>
	);
};

export const PageSpinner = () => {
	return (
		<div className='min-h-[60vh] flex items-center justify-center'>
			<div className='relative'>
				<div className='w-16 h-16 rounded-full border-2 border-gray-100' />
				<div className='absolute top-0 left-0 w-16 h-16 rounded-full border-2 border-gray-900 border-t-transparent animate-spin' />
			</div>
		</div>
	);
};

export const CardSpinner = () => {
	return (
		<div className='bg-white rounded-2xl border border-gray-200 p-8 shadow-sm'>
			<div className='flex flex-col items-center justify-center'>
				<div className='relative w-12 h-12 mb-4'>
					<div className='absolute inset-0 rounded-full border-2 border-gray-100' />
					<div className='absolute inset-0 rounded-full border-2 border-gray-900 border-t-transparent animate-spin' />
				</div>
				<p className='text-gray-500 text-sm'>Loading...</p>
			</div>
		</div>
	);
};

export const ButtonSpinner = () => {
	return (
		<div className='relative w-5 h-5'>
			<div className='absolute inset-0 rounded-full border-2 border-white/30' />
			<div className='absolute inset-0 rounded-full border-2 border-white border-t-transparent animate-spin' />
		</div>
	);
};

const LoadingSpinner = () => {
	return (
		<div className='fixed inset-0 bg-white z-50 flex items-center justify-center'>
			<div className='relative'>
				{/* Outer ring */}
				<motion.div
					className='w-24 h-24 rounded-full border-2 border-gray-100'
					initial={{ opacity: 0, scale: 0.8 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.3 }}
				/>
				
				{/* Main spinner */}
				<motion.div
					className='absolute top-0 left-0 w-24 h-24 rounded-full border-2 border-gray-900 border-t-transparent'
					animate={{ rotate: 360 }}
					transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
				/>
				
				{/* Inner spinner */}
				<motion.div
					className='absolute top-2 left-2 w-20 h-20 rounded-full border-2 border-gray-600 border-b-transparent'
					animate={{ rotate: -360 }}
					transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
				/>
				
				{/* Center dot */}
				<motion.div
					className='absolute top-1/2 left-1/2 w-3 h-3 bg-gray-900 rounded-full -translate-x-1/2 -translate-y-1/2'
					animate={{ scale: [1, 1.5, 1] }}
					transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
				/>
				
				{/* Pulsing rings */}
				<motion.div
					className='absolute -inset-4 rounded-full border border-gray-200'
					animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
					transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
				/>
				
				<motion.div
					className='absolute -inset-8 rounded-full border border-gray-100'
					animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0, 0.3] }}
					transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
				/>
			</div>
			
			{/* Loading text */}
			<motion.div
				className='absolute bottom-32 left-1/2 -translate-x-1/2 text-center'
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.3 }}
			>
				<p className='text-gray-600 font-medium text-sm'>Loading</p>
				<motion.div
					className='flex justify-center gap-1 mt-2'
					animate={{ opacity: [0.4, 1, 0.4] }}
					transition={{ duration: 1.5, repeat: Infinity }}
				>
					<span className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
					<span className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
					<span className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
				</motion.div>
			</motion.div>
		</div>
	);
};

export default LoadingSpinner;