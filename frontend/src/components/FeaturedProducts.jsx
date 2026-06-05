import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import ProductCard from "./ProductCard";

const FeaturedProducts = ({ featuredProducts }) => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [itemsPerPage, setItemsPerPage] = useState(4);

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

	const nextSlide = () => {
		setCurrentIndex((prevIndex) => prevIndex + itemsPerPage);
	};

	const prevSlide = () => {
		setCurrentIndex((prevIndex) => prevIndex - itemsPerPage);
	};

	const isStartDisabled = currentIndex === 0;
	const isEndDisabled = currentIndex >= featuredProducts.length - itemsPerPage;

	return (
		<div className='py-8'>
			<div className='container mx-auto px-4'>
				<div className='relative'>
					<div className='overflow-hidden'>
						<motion.div
							className='flex'
							animate={{ x: `-${currentIndex * (100 / itemsPerPage)}%` }}
							transition={{ duration: 0.5, ease: "easeInOut" }}
						>
							{featuredProducts?.map((product) => (
								<div key={product._id} className='w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 flex-shrink-0 px-3'>
									<ProductCard product={product} />
								</div>
							))}
						</motion.div>
					</div>

					{/* Navigation Buttons */}
					<motion.button
						onClick={prevSlide}
						disabled={isStartDisabled}
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						className={`absolute top-1/2 -left-5 transform -translate-y-1/2 p-3 rounded-full transition-all duration-200 shadow-lg z-10 ${
							isStartDisabled
								? "bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200"
								: "bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:shadow-xl border border-emerald-500/50 hover:from-emerald-500 hover:to-teal-500"
						}`}
					>
						<ChevronLeft className='w-6 h-6' />
					</motion.button>

					<motion.button
						onClick={nextSlide}
						disabled={isEndDisabled}
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						className={`absolute top-1/2 -right-5 transform -translate-y-1/2 p-3 rounded-full transition-all duration-200 shadow-lg z-10 ${
							isEndDisabled
								? "bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200"
								: "bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:shadow-xl border border-emerald-500/50 hover:from-emerald-500 hover:to-teal-500"
						}`}
					>
						<ChevronRight className='w-6 h-6' />
					</motion.button>
				</div>
			</div>
		</div>
	);
};
export default FeaturedProducts;
