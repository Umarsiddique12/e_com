import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { ShoppingCart, Star } from "lucide-react";
import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";
import { motion } from "framer-motion";

const ProductCard = ({ product }) => {
	const { user } = useUserStore();
	const { addToCart } = useCartStore();
	const handleAddToCart = () => {
		if (!user) {
			toast.error("Please login to add products to cart", { id: "login" });
			return;
		} else {
			addToCart(product);
			toast.success("Added to cart!");
		}
	};

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			whileInView={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
			viewport={{ once: true }}
			className='group relative h-full'
		>
			<div className='relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-lg hover:shadow-2xl transition-all duration-500 hover:border-emerald-300/60 backdrop-blur-sm'>
				{/* Premium Top Accent */}
				<div className='absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-400' />

				{/* Image Container */}
				<Link to={`/product/${product._id}`} className='relative overflow-hidden h-72'>
					<div className='absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-900/20 z-10' />
					<img
						className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out'
						src={product.image}
						alt={product.name}
					/>
					
					{/* Quick View Badge */}
					<motion.div
						initial={{ opacity: 0, y: 10 }}
						whileHover={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.3 }}
						className='absolute inset-0 flex items-center justify-center z-20 pointer-events-none'
					>
						<span className='bg-emerald-600/95 backdrop-blur text-white px-6 py-2 rounded-full text-sm font-semibold shadow-xl pointer-events-auto cursor-pointer hover:bg-emerald-500 transition-colors'>
							View Details
						</span>
					</motion.div>
				</Link>

				{/* Content Container */}
				<div className='flex-grow flex flex-col justify-between p-6'>
					{/* Product Info */}
					<div>
						<Link to={`/product/${product._id}`} className='block group/name'>
							<h3 className='text-lg font-bold text-slate-900 line-clamp-2 group-hover/name:text-emerald-600 transition-colors duration-300 leading-tight'>
								{product.name}
							</h3>
						</Link>

						{/* Rating */}
						<div className='flex items-center gap-1 mt-2 mb-3'>
							{[...Array(5)].map((_, i) => (
								<Star
									key={i}
									size={14}
									className={i < 4 ? 'fill-emerald-400 text-emerald-400' : 'text-slate-300'}
								/>
							))}
							<span className='text-xs text-slate-500 ml-1'>(4.0)</span>
						</div>

						{/* Price */}
						<div className='flex items-baseline gap-2'>
							<span className='text-3xl font-extrabold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent'>
								${product.price.toFixed(2)}
							</span>
						</div>
					</div>

					{/* Add to Cart Button */}
					<motion.button
						whileHover={{ scale: 1.02 }}
						whileTap={{ scale: 0.98 }}
						onClick={handleAddToCart}
						className='mt-5 w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 px-5 py-3 text-center text-sm font-bold text-white shadow-lg shadow-emerald-600/20 hover:shadow-xl hover:shadow-emerald-600/30 transition-all duration-300 hover:from-emerald-500 hover:to-teal-500 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2'
					>
						<ShoppingCart size={18} />
						Add to Cart
					</motion.button>
				</div>
			</div>
		</motion.div>
	);
};
export default ProductCard;
