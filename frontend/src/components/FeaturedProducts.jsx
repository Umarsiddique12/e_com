import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Sparkles, TrendingUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ProductCard from "./ProductCard";

const FeaturedProducts = ({ featuredProducts }) => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [itemsPerPage, setItemsPerPage] = useState(4);
	const [isAutoPlaying, setIsAutoPlaying] = useState(true);

	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth < 640) setItemsPerPage(1);
			else if (window.innerWidth < 1024) setItemsPerPage(2);
			else if (window.innerWidth < 1280) setItemsPerPage(3);
			else setItemsPerPage(4);
		};

		handleResize();
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	// Auto-play functionality
	useEffect(() => {
		if (!isAutoPlaying || !featuredProducts?.length) return;
		
		const interval = setInterval(() => {
			if (currentIndex + itemsPerPage < featuredProducts.length) {
				setCurrentIndex(prev => prev + itemsPerPage);
			} else {
				setCurrentIndex(0);
			}
		}, 5000);
		
		return () => clearInterval(interval);
	}, [isAutoPlaying, currentIndex, itemsPerPage, featuredProducts?.length]);

	const nextSlide = () => {
		setIsAutoPlaying(false);
		setCurrentIndex((prevIndex) => Math.min(prevIndex + itemsPerPage, featuredProducts.length - itemsPerPage));
	};

	const prevSlide = () => {
		setIsAutoPlaying(false);
		setCurrentIndex((prevIndex) => Math.max(prevIndex - itemsPerPage, 0));
	};

	const goToSlide = (index) => {
		setIsAutoPlaying(false);
		setCurrentIndex(index);
	};

	const isStartDisabled = currentIndex === 0;
	const isEndDisabled = currentIndex >= featuredProducts.length - itemsPerPage;
	const totalPages = Math.ceil(featuredProducts?.length / itemsPerPage) || 0;
	const currentPage = Math.floor(currentIndex / itemsPerPage) + 1;

	if (!featuredProducts?.length) return null;

	return (
		<div className='py-8'>
			{/* Header with Title and Controls */}
			<div className='container mx-auto px-4 mb-6'>
				<div className='flex flex-col sm:flex-row sm:items-end justify-between gap-4'>
					<div>
						<div className='flex items-center gap-2 mb-2'>
							<div className='w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center'>
								<Sparkles size={16} className='text-gray-700' />
							</div>
							<h3 className='text-xl font-bold text-gray-900'>Featured Collection</h3>
						</div>
						<p className='text-gray-500 text-sm ml-10'>
							Handpicked luxury items for the discerning connoisseur
						</p>
					</div>
					
					{/* Desktop Pagination Info */}
					{totalPages > 1 && (
						<div className='flex items-center gap-3'>
							<span className='text-sm text-gray-500'>
								Page {currentPage} of {totalPages}
							</span>
							<div className='flex gap-2'>
								<motion.button
									onClick={prevSlide}
									disabled={isStartDisabled}
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
									className={`p-2 rounded-lg transition-all duration-200 ${
										isStartDisabled
											? "bg-gray-100 text-gray-400 cursor-not-allowed"
											: "bg-gray-900 text-white hover:bg-gray-800"
									}`}
								>
									<ChevronLeft size={18} />
								</motion.button>
								<motion.button
									onClick={nextSlide}
									disabled={isEndDisabled}
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
									className={`p-2 rounded-lg transition-all duration-200 ${
										isEndDisabled
											? "bg-gray-100 text-gray-400 cursor-not-allowed"
											: "bg-gray-900 text-white hover:bg-gray-800"
									}`}
								>
									<ChevronRight size={18} />
								</motion.button>
							</div>
						</div>
					)}
				</div>
			</div>

			{/* Carousel */}
			<div className='container mx-auto px-4 relative'>
				<div className='overflow-hidden'>
					<motion.div
						className='flex'
						animate={{ x: `-${currentIndex * (100 / itemsPerPage)}%` }}
						transition={{ duration: 0.5, ease: "easeInOut" }}
					>
						{featuredProducts.map((product, index) => (
							<div 
								key={product._id} 
								className={`flex-shrink-0 px-3 ${
									itemsPerPage === 1 ? 'w-full' :
									itemsPerPage === 2 ? 'w-1/2' :
									itemsPerPage === 3 ? 'w-1/3' : 'w-1/4'
								}`}
							>
								<ProductCard product={product} />
							</div>
						))}
					</motion.div>
				</div>

				{/* Navigation Dots */}
				{totalPages > 1 && (
					<div className='flex justify-center gap-2 mt-8'>
						{Array.from({ length: totalPages }).map((_, idx) => (
							<button
								key={idx}
								onClick={() => goToSlide(idx * itemsPerPage)}
								className={`h-2 rounded-full transition-all duration-300 ${
									currentPage === idx + 1
										? 'w-8 bg-gray-900'
										: 'w-2 bg-gray-300 hover:bg-gray-400'
								}`}
								aria-label={`Go to slide ${idx + 1}`}
							/>
						))}
					</div>
				)}

				{/* Auto-play Indicator */}
				{isAutoPlaying && totalPages > 1 && (
					<motion.div 
						className='absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-0.5 bg-gray-200 overflow-hidden rounded-full'
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
					>
						<motion.div
							className='h-full bg-gray-900 rounded-full'
							initial={{ width: '0%' }}
							animate={{ width: '100%' }}
							transition={{ duration: 5, ease: "linear", repeat: Infinity }}
						/>
					</motion.div>
				)}
			</div>

			{/* View All Link */}
			<div className='container mx-auto px-4 mt-8 text-center'>
				<Link 
					to='/shop' 
					className='inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors group'
				>
					<TrendingUp size={14} className="group-hover:translate-x-1 transition-transform" />
					View All Featured Products
				</Link>
			</div>
		</div>
	);
};

export default FeaturedProducts;