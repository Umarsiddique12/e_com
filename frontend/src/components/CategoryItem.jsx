import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Crown, Sparkles } from "lucide-react";
import { useState } from "react";

const CategoryItem = ({ category }) => {
	const [isHovered, setIsHovered] = useState(false);

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			whileInView={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
			viewport={{ once: true }}
			className='group relative overflow-hidden h-96 w-full rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500'
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			<Link to={"/category" + category.href}>
				<div className='w-full h-full cursor-pointer relative'>
					{/* Premium Border Glow Effect */}
					<div className='absolute inset-0 rounded-2xl border border-white/10 pointer-events-none z-10 group-hover:border-white/30 transition-all duration-500' />
					
					{/* Inner Border */}
					<div className='absolute inset-2 rounded-xl border border-white/5 pointer-events-none z-10 opacity-0 group-hover:opacity-100 transition-all duration-500' />

					{/* Gradient Overlay */}
					<div className='absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20 z-10 group-hover:from-black/95 group-hover:via-black/60 transition-all duration-500' />
					
					{/* Premium Radial Gradient */}
					<div className='absolute inset-0 bg-gradient-to-r from-gray-900/0 via-transparent to-gray-900/0 opacity-0 group-hover:opacity-30 z-11 transition-all duration-700' />

					{/* Image */}
					<motion.img
						src={category.imageUrl}
						alt={category.name}
						className='w-full h-full object-cover transition-transform duration-700 ease-out'
						animate={{ scale: isHovered ? 1.08 : 1 }}
						transition={{ duration: 0.6 }}
						loading='lazy'
					/>

					{/* Featured Badge */}
					{category.isFeatured && (
						<motion.div
							initial={{ opacity: 0, x: -20 }}
							animate={{ opacity: 1, x: 0 }}
							className='absolute top-5 left-5 z-20'
						>
							<div className='flex items-center gap-1.5 bg-white/10 backdrop-blur-md text-white px-3 py-1.5 rounded-full text-xs font-medium border border-white/20'>
								<Crown size={12} />
								<span>Featured</span>
							</div>
						</motion.div>
					)}

					{/* New Arrival Badge */}
					{category.isNew && (
						<motion.div
							initial={{ opacity: 0, x: 20 }}
							animate={{ opacity: 1, x: 0 }}
							className='absolute top-5 right-5 z-20'
						>
							<div className='flex items-center gap-1.5 bg-emerald-500 text-white px-3 py-1.5 rounded-full text-xs font-medium shadow-lg'>
								<Sparkles size={12} />
								<span>New Arrival</span>
							</div>
						</motion.div>
					)}

					{/* Content Container */}
					<div className='absolute bottom-0 left-0 right-0 p-6 z-20 flex flex-col justify-end h-full'>
						{/* Premium Top Accent Line */}
						<motion.div 
							className='w-12 h-0.5 bg-white/60 mb-4 rounded-full'
							animate={{ width: isHovered ? 24 : 48 }}
							transition={{ duration: 0.3 }}
						/>

						{/* Title */}
						<motion.h3 
							className='text-white text-2xl md:text-3xl font-bold mb-2 tracking-tight'
							animate={{ y: isHovered ? -5 : 0 }}
							transition={{ duration: 0.3 }}
						>
							{category.name}
						</motion.h3>
						
						{/* Description */}
						<motion.p 
							className='text-white/70 text-sm mb-3 max-w-[90%]'
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
							transition={{ duration: 0.3 }}
						>
							{category.description || `Explore our premium ${category.name.toLowerCase()} collection`}
						</motion.p>

						{/* Shop Now Link */}
						<motion.div 
							className='flex items-center gap-2 text-white/80 text-sm font-medium'
							initial={{ opacity: 0, x: -10 }}
							animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -10 }}
							transition={{ duration: 0.3, delay: 0.1 }}
						>
							<span>Shop Now</span>
							<motion.div
								animate={{ x: isHovered ? 5 : 0 }}
								transition={{ duration: 0.3 }}
							>
								<ArrowRight size={14} />
							</motion.div>
						</motion.div>
					</div>

					{/* Overlay Glow on Hover */}
					<motion.div 
						className='absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 z-10 pointer-events-none'
						animate={{ opacity: isHovered ? 1 : 0 }}
						transition={{ duration: 0.4 }}
					/>
				</div>
			</Link>
		</motion.div>
	);
};

export default CategoryItem;