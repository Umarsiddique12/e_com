import { Minus, Plus, Trash, Package, Clock, Shield } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "../stores/useCartStore";
import { useState } from "react";
import { Link } from "react-router-dom";

const CartItem = ({ item }) => {
	const { removeFromCart, updateQuantity } = useCartStore();
	const [isRemoving, setIsRemoving] = useState(false);
	const [quantity, setQuantity] = useState(item.quantity);

	const handleQuantityChange = (newQuantity) => {
		if (newQuantity < 1) return;
		setQuantity(newQuantity);
		updateQuantity(item._id, newQuantity);
	};

	const handleRemove = async () => {
		setIsRemoving(true);
		await removeFromCart(item._id);
	};

	const itemTotal = (item.price * quantity).toFixed(2);

	return (
		<AnimatePresence>
			{!isRemoving && (
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, x: -100 }}
					transition={{ duration: 0.3 }}
					className='rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-all duration-300'
				>
					<div className='p-4 md:p-5'>
						<div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
							{/* Product Image */}
							<div className='flex-shrink-0'>
								<Link to={`/product/${item._id}`}>
									<div className='relative w-20 h-20 md:w-24 md:h-24 rounded-xl overflow-hidden bg-gray-100 border border-gray-200 group'>
										<img 
											className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-500' 
											src={item.image} 
											alt={item.name}
										/>
										<div className='absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300' />
									</div>
								</Link>
							</div>

							{/* Product Info */}
							<div className='flex-1 min-w-0'>
								<Link to={`/product/${item._id}`}>
									<h3 className='text-base font-bold text-gray-900 hover:text-gray-700 transition-colors line-clamp-2'>
										{item.name}
									</h3>
								</Link>
								{item.description && (
									<p className='text-sm text-gray-500 mt-1 line-clamp-1'>{item.description}</p>
								)}
								
								{/* Stock Status */}
								<div className='flex items-center gap-3 mt-2'>
									<span className='inline-flex items-center gap-1 text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded-full'>
										<Package size={10} />
										In Stock
									</span>
									{item.freeShipping && (
										<span className='inline-flex items-center gap-1 text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full'>
											<Truck size={10} />
											Free Shipping
										</span>
									)}
								</div>
							</div>

							{/* Quantity Controls */}
							<div className='flex items-center justify-between md:justify-end gap-6'>
								<div className='flex items-center gap-2'>
									<motion.button
										whileHover={{ scale: 1.05 }}
										whileTap={{ scale: 0.95 }}
										className='w-8 h-8 rounded-lg border border-gray-300 bg-gray-50 hover:bg-gray-100 flex items-center justify-center transition-all duration-200'
										onClick={() => handleQuantityChange(quantity - 1)}
										disabled={quantity <= 1}
									>
										<Minus className={`w-3.5 h-3.5 ${quantity <= 1 ? 'text-gray-300' : 'text-gray-600'}`} />
									</motion.button>
									
									<span className='w-10 text-center font-semibold text-gray-800'>{quantity}</span>
									
									<motion.button
										whileHover={{ scale: 1.05 }}
										whileTap={{ scale: 0.95 }}
										className='w-8 h-8 rounded-lg border border-gray-300 bg-gray-50 hover:bg-gray-100 flex items-center justify-center transition-all duration-200'
										onClick={() => handleQuantityChange(quantity + 1)}
									>
										<Plus className='w-3.5 h-3.5 text-gray-600' />
									</motion.button>
								</div>

								{/* Price */}
								<div className='text-right'>
									<p className='text-lg font-bold text-gray-900'>${itemTotal}</p>
									<p className='text-xs text-gray-400'>${item.price} each</p>
								</div>
							</div>
						</div>

						{/* Action Buttons */}
						<div className='flex items-center justify-between gap-4 mt-4 pt-3 border-t border-gray-100'>
							<button
								className='inline-flex items-center gap-1.5 text-sm text-red-500 hover:text-red-600 transition-colors'
								onClick={handleRemove}
							>
								<Trash size={14} />
								<span>Remove</span>
							</button>
							
							<div className='flex items-center gap-2 text-xs text-gray-400'>
								<Shield size={12} />
								<span>Secure item • 30-day returns</span>
							</div>
						</div>
					</div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default CartItem;