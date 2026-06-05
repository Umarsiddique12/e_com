import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { ShoppingCart, Star, Eye, Heart, TrendingUp, Sparkles } from "lucide-react";
import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const ProductCard = ({ product }) => {
	const { user } = useUserStore();
	const { addToCart } = useCartStore();
	const [isHovered, setIsHovered] = useState(false);
	const [isAdded, setIsAdded] = useState(false);

	const handleAddToCart = () => {
		if (!user) {
			toast.error("Please login to add products to cart", { id: "login" });
			return;
		} else {
			addToCart(product);
			setIsAdded(true);
			toast.success("Added to cart!");
			setTimeout(() => setIsAdded(false), 2000);
		}
	};

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			whileInView={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
			viewport={{ once: true }}
			className='group relative h-full'
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			<div className='relative flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-md hover:shadow-2xl transition-all duration-500 group-hover:border-gray-300'>
				{/* Premium Top Accent */}
				<div className='absolute top-0 left-0 right-0 h-0.5 bg-gray-900 z-20' />

				{/* Image Container */}
				<Link to={`/product/${product._id}`} className='relative overflow-hidden h-72 bg-gray-100'>
					<div className='absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20 z-10' />
					<motion.img
						className='w-full h-full object-cover'
						src={product.image}
						alt={product.name}
						animate={{ scale: isHovered ? 1.08 : 1 }}
						transition={{ duration: 0.5, ease: "easeOut" }}
					/>
					
					{/* Featured Badge */}
					{product.isFeatured && (
						<motion.div
							initial={{ opacity: 0, x: -20 }}
							animate={{ opacity: 1, x: 0 }}
							className='absolute top-4 left-4 z-20'
						>
							<span className='inline-flex items-center gap-1.5 bg-gray-900 text-white px-2.5 py-1 rounded-lg text-xs font-medium shadow-lg'>
								<Sparkles size={12} />
								Featured
							</span>
						</motion.div>
					)}

					{/* Wishlist Button */}
					<motion.button
						initial={{ opacity: 0, scale: 0.8 }}
						animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.8 }}
						transition={{ duration: 0.2 }}
						className='absolute top-4 right-4 z-20 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-50 transition-colors'
					>
						<Heart size={16} className='text-gray-600 hover:text-red-500 transition-colors' />
					</motion.button>

					{/* Quick View Overlay */}
					<AnimatePresence>
						{isHovered && (
							<motion.div
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								transition={{ duration: 0.3 }}
								className='absolute inset-0 bg-black/40 flex items-center justify-center z-20'
							>
								<motion.div
									initial={{ scale: 0.9 }}
									animate={{ scale: 1 }}
									transition={{ duration: 0.2 }}
								>
									<Link
										to={`/product/${product._id}`}
										className='inline-flex items-center gap-2 bg-white text-gray-900 px-5 py-2.5 rounded-xl text-sm font-semibold shadow-lg hover:bg-gray-100 transition-colors'
									>
										<Eye size={16} />
										Quick View
									</Link>
								</motion.div>
							</motion.div>
						)}
					</AnimatePresence>
				</Link>

				{/* Content Container */}
				<div className='flex-grow flex flex-col justify-between p-5'>
					{/* Product Info */}
					<div>
						{/* Category */}
						<div className='flex items-center gap-2 mb-2'>
							<span className='text-xs text-gray-500 uppercase tracking-wider'>
								{product.category || "Collection"}
							</span>
							{product.bestSeller && (
								<span className='text-xs font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-full'>
									Best Seller
								</span>
							)}
						</div>

						<Link to={`/product/${product._id}`} className='block'>
							<h3 className='text-base font-bold text-gray-900 line-clamp-2 hover:text-gray-700 transition-colors leading-tight mb-2'>
								{product.name}
							</h3>
						</Link>

						{/* Rating */}
						<div className='flex items-center gap-1.5 mt-2 mb-3'>
							<div className='flex items-center gap-0.5'>
								{[...Array(5)].map((_, i) => (
									<Star
										key={i}
										size={13}
										className={i < 4 ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
									/>
								))}
							</div>
							<span className='text-xs text-gray-500'>(4.8)</span>
							<span className='text-xs text-gray-400'>· 1.2k reviews</span>
						</div>

						{/* Price */}
						<div className='flex items-baseline gap-2 mb-3'>
							<span className='text-2xl font-bold text-gray-900'>
								${product.price?.toFixed(2)}
							</span>
							{product.oldPrice && (
								<span className='text-sm text-gray-400 line-through'>
									${product.oldPrice?.toFixed(2)}
								</span>
							)}
						</div>
					</div>

					{/* Add to Cart Button */}
					<motion.button
						whileHover={{ scale: 1.02 }}
						whileTap={{ scale: 0.98 }}
						onClick={handleAddToCart}
						disabled={isAdded}
						className='mt-3 w-full flex items-center justify-center gap-2 rounded-xl bg-gray-900 hover:bg-gray-800 text-white px-4 py-2.5 text-sm font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 disabled:opacity-70'
					>
						<AnimatePresence mode="wait">
							{isAdded ? (
								<motion.div
									key="added"
									initial={{ scale: 0 }}
									animate={{ scale: 1 }}
									exit={{ scale: 0 }}
									className="flex items-center gap-2"
								>
									<svg className="w-4 h-4 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
									</svg>
									Added to Cart
								</motion.div>
							) : (
								<motion.div
									key="add"
									initial={{ scale: 0 }}
									animate={{ scale: 1 }}
									exit={{ scale: 0 }}
									className="flex items-center gap-2"
								>
									<ShoppingCart size={16} />
									Add to Cart
								</motion.div>
							)}
						</AnimatePresence>
					</motion.button>

					{/* Free Shipping Badge */}
					{product.price > 50 && (
						<div className='mt-3 flex items-center justify-center gap-1 text-xs text-gray-500'>
							<TrendingUp size={12} />
							<span>Free shipping available</span>
						</div>
					)}
				</div>
			</div>
		</motion.div>
	);
};

export default ProductCard;