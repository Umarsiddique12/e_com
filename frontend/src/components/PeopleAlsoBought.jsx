import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import axios from "../lib/axios";
import toast from "react-hot-toast";
import LoadingSpinner from "./LoadingSpinner";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Sparkles, TrendingUp, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const PeopleAlsoBought = () => {
	const [recommendations, setRecommendations] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [visibleCount, setVisibleCount] = useState(6);

	useEffect(() => {
		const fetchRecommendations = async () => {
			try {
				const res = await axios.get("/products/recommendations");
				setRecommendations(res.data);
			} catch (error) {
				toast.error(error.response?.data?.message || "An error occurred while fetching recommendations");
			} finally {
				setIsLoading(false);
			}
		};

		fetchRecommendations();
	}, []);

	const handleShowMore = () => {
		setVisibleCount(prev => Math.min(prev + 3, recommendations.length));
	};

	if (isLoading) {
		return (
			<div className='mt-12'>
				<div className='flex justify-center py-12'>
					<LoadingSpinner />
				</div>
			</div>
		);
	}

	if (recommendations.length === 0) {
		return null;
	}

	const visibleProducts = recommendations.slice(0, visibleCount);
	const hasMore = visibleCount < recommendations.length;

	return (
		<motion.div 
			className='mt-16'
			initial={{ opacity: 0, y: 20 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true }}
			transition={{ duration: 0.6 }}
		>
			{/* Header Section */}
			<div className='flex flex-col sm:flex-row sm:items-end justify-between mb-8'>
				<div>
					<div className='flex items-center gap-2 mb-2'>
						<div className='w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center'>
							<TrendingUp size={20} className='text-gray-700' />
						</div>
						<h3 className='text-2xl font-bold text-gray-900'>People also bought</h3>
					</div>
					<p className='text-gray-500 ml-12'>
						Items frequently purchased together with this product
					</p>
				</div>
				
				{hasMore && (
					<button
						onClick={handleShowMore}
						className='mt-4 sm:mt-0 inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium transition-colors'
					>
						View more recommendations
						<ArrowRight size={16} />
					</button>
				)}
			</div>

			{/* Products Grid */}
			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
				<AnimatePresence mode="wait">
					{visibleProducts.map((product, index) => (
						<motion.div
							key={product._id}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, scale: 0.9 }}
							transition={{ duration: 0.4, delay: index * 0.05 }}
						>
							<ProductCard product={product} />
						</motion.div>
					))}
				</AnimatePresence>
			</div>

			{/* Recommendation Stats */}
			{recommendations.length > 0 && (
				<motion.div 
					className='mt-8 flex items-center justify-center gap-6 text-sm text-gray-500'
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.3 }}
				>
					<div className='flex items-center gap-2'>
						<ShoppingBag size={14} className='text-gray-400' />
						<span>{recommendations.length} recommended items</span>
					</div>
					<div className='flex items-center gap-2'>
						<Sparkles size={14} className='text-gray-400' />
						<span>Based on your browsing</span>
					</div>
				</motion.div>
			)}

			{/* Divider */}
			<div className='mt-12 pt-8 border-t border-gray-100'>
				<div className='flex items-center justify-center gap-2 text-xs text-gray-400'>
					<span>✨ Complete your look with these recommendations</span>
				</div>
			</div>
		</motion.div>
	);
};

export default PeopleAlsoBought;