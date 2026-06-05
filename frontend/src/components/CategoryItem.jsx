import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const CategoryItem = ({ category }) => {
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			whileInView={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
			viewport={{ once: true }}
			className='group relative overflow-hidden h-96 w-full rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500'
		>
			<Link to={"/category" + category.href}>
				<div className='w-full h-full cursor-pointer relative'>
					{/* Premium Border Glow Effect */}
					<div className='absolute inset-0 rounded-2xl border border-white/20 pointer-events-none z-10 group-hover:border-emerald-400/40 transition-colors duration-500' />

					{/* Gradient Overlay - Enhanced */}
					<div className='absolute inset-0 bg-gradient-to-b from-slate-900/0 via-slate-900/20 to-slate-950/80 opacity-70 z-10 group-hover:opacity-60 transition-all duration-500' />

					{/* Additional Premium Overlay */}
					<div className='absolute inset-0 bg-gradient-to-r from-emerald-600/0 via-transparent to-teal-600/0 opacity-0 group-hover:opacity-20 z-11 transition-all duration-500' />

					{/* Image */}
					<img
						src={category.imageUrl}
						alt={category.name}
						className='w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110'
						loading='lazy'
					/>

					{/* Content Container */}
					<div className='absolute bottom-0 left-0 right-0 p-8 z-20 flex flex-col justify-end h-full'>
						{/* Premium Top Accent Line */}
						<div className='w-12 h-1 bg-gradient-to-r from-emerald-400 to-teal-400 mb-4 rounded-full group-hover:w-16 transition-all duration-500' />

						{/* Title and Description */}
						<motion.div
							initial={{ opacity: 0, y: 10 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.2, duration: 0.5 }}
						>
							<h3 className='text-white text-3xl font-extrabold mb-2 tracking-tight group-hover:text-emerald-200 transition-colors duration-300'>
								{category.name}
							</h3>
							<div className='flex items-center gap-2'>
								<p className='text-emerald-300/90 text-base font-medium group-hover:text-emerald-200 transition-colors duration-300'>
									Explore {category.name}
								</p>
								<motion.div
									initial={{ x: 0 }}
									whileHover={{ x: 4 }}
									transition={{ duration: 0.3 }}
								>
									<ArrowRight size={18} className='text-emerald-300 group-hover:text-emerald-200 transition-colors' />
								</motion.div>
							</div>
						</motion.div>
					</div>
				</div>
			</Link>
		</motion.div>
	);
};

export default CategoryItem;
