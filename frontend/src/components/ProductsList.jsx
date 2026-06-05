import { motion, AnimatePresence } from "framer-motion";
import { Trash, Star, Edit, Eye, Package, DollarSign, Tag, TrendingUp, AlertCircle } from "lucide-react";
import { useProductStore } from "../stores/useProductStore";
import { useState } from "react";
import toast from "react-hot-toast";

const ProductsList = () => {
	const { deleteProduct, toggleFeaturedProduct, products } = useProductStore();
	const [deletingId, setDeletingId] = useState(null);
	const [hoveredProduct, setHoveredProduct] = useState(null);

	const handleDelete = async (id) => {
		setDeletingId(id);
		try {
			await deleteProduct(id);
			toast.success("Product deleted successfully");
		} catch (error) {
			toast.error("Failed to delete product");
		} finally {
			setDeletingId(null);
		}
	};

	const handleToggleFeatured = async (id) => {
		try {
			await toggleFeaturedProduct(id);
			toast.success("Featured status updated");
		} catch (error) {
			toast.error("Failed to update featured status");
		}
	};

	return (
		<motion.div
			className='bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
		>
			{/* Header */}
			<div className='px-6 py-4 border-b border-gray-200 bg-gray-50'>
				<div className='flex items-center justify-between'>
					<div className='flex items-center gap-3'>
						<div className='w-10 h-10 bg-gray-900 rounded-xl flex items-center justify-center'>
							<Package size={20} className='text-white' />
						</div>
						<div>
							<h2 className='text-lg font-bold text-gray-900'>Products List</h2>
							<p className='text-sm text-gray-500'>Manage your product inventory</p>
						</div>
					</div>
					<div className='flex items-center gap-2'>
						<span className='text-sm text-gray-500'>Total:</span>
						<span className='text-lg font-bold text-gray-900'>{products?.length || 0}</span>
					</div>
				</div>
			</div>

			{/* Table */}
			<div className='overflow-x-auto'>
				<table className='min-w-full divide-y divide-gray-200'>
					<thead className='bg-gray-50'>
						<tr>
							<th className='px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
								Product
							</th>
							<th className='px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
								Price
							</th>
							<th className='px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
								Category
							</th>
							<th className='px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
								Featured
							</th>
							<th className='px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
								Actions
							</th>
						</tr>
					</thead>

					<tbody className='bg-white divide-y divide-gray-100'>
						<AnimatePresence>
							{products?.length === 0 ? (
								<tr>
									<td colSpan="5" className='px-6 py-12 text-center'>
										<div className='flex flex-col items-center justify-center'>
											<div className='w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-3'>
												<Package size={28} className='text-gray-400' />
											</div>
											<p className='text-gray-500 font-medium'>No products found</p>
											<p className='text-sm text-gray-400 mt-1'>Add your first product to get started</p>
										</div>
									</td>
								</tr>
							) : (
								products.map((product, index) => (
									<motion.tr
										key={product._id}
										initial={{ opacity: 0, x: -20 }}
										animate={{ opacity: 1, x: 0 }}
										exit={{ opacity: 0, x: 20 }}
										transition={{ duration: 0.3, delay: index * 0.05 }}
										className='hover:bg-gray-50 transition-colors duration-150 group'
										onMouseEnter={() => setHoveredProduct(product._id)}
										onMouseLeave={() => setHoveredProduct(null)}
									>
										<td className='px-6 py-4 whitespace-nowrap'>
											<div className='flex items-center gap-3'>
												<div className='flex-shrink-0 w-12 h-12 rounded-xl overflow-hidden bg-gray-100 border border-gray-200'>
													<img
														className='w-full h-full object-cover'
														src={product.image}
														alt={product.name}
													/>
												</div>
												<div>
													<div className='text-sm font-semibold text-gray-900'>{product.name}</div>
													<div className='text-xs text-gray-500 mt-0.5'>ID: {product._id?.slice(-8)}</div>
												</div>
											</div>
										</td>
										<td className='px-6 py-4 whitespace-nowrap'>
											<div className='flex items-center gap-1'>
												<DollarSign size={14} className='text-gray-400' />
												<span className='text-sm font-bold text-gray-900'>{product.price?.toFixed(2)}</span>
											</div>
										</td>
										<td className='px-6 py-4 whitespace-nowrap'>
											<span className='inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700'>
												<Tag size={10} />
												{product.category || "Uncategorized"}
											</span>
										</td>
										<td className='px-6 py-4 whitespace-nowrap'>
											<button
												onClick={() => handleToggleFeatured(product._id)}
												className={`relative group p-1.5 rounded-lg transition-all duration-200 ${
													product.isFeatured 
														? "bg-yellow-50 text-yellow-600 border border-yellow-200" 
														: "bg-gray-50 text-gray-400 border border-gray-200 hover:bg-gray-100"
												}`}
											>
												<Star 
													size={18} 
													className={`${product.isFeatured ? "fill-yellow-500" : ""} transition-transform group-hover:scale-110`}
												/>
												{product.isFeatured && (
													<span className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-500 rounded-full animate-pulse" />
												)}
											</button>
										</td>
										<td className='px-6 py-4 whitespace-nowrap'>
											<div className='flex items-center gap-2'>
												<motion.button
													whileHover={{ scale: 1.1 }}
													whileTap={{ scale: 0.95 }}
													onClick={() => handleDelete(product._id)}
													disabled={deletingId === product._id}
													className='p-1.5 rounded-lg text-red-500 hover:bg-red-50 transition-all duration-200 disabled:opacity-50'
												>
													{deletingId === product._id ? (
														<div className='w-5 h-5 border-2 border-red-500 border-t-transparent rounded-full animate-spin' />
													) : (
														<Trash size={18} />
													)}
												</motion.button>
											</div>
										</td>
									</motion.tr>
								))
							)}
						</AnimatePresence>
					</tbody>
				</table>
			</div>

			{/* Footer */}
			{products?.length > 0 && (
				<div className='px-6 py-3 border-t border-gray-200 bg-gray-50'>
					<div className='flex items-center justify-between text-sm'>
						<div className='flex items-center gap-2 text-gray-500'>
							<TrendingUp size={14} />
							<span>Showing {products.length} products</span>
						</div>
						<div className='flex items-center gap-2 text-gray-500'>
							<AlertCircle size={14} />
							<span>Last updated: {new Date().toLocaleDateString()}</span>
						</div>
					</div>
				</div>
			)}
		</motion.div>
	);
};

export default ProductsList;import { motion, AnimatePresence } from "framer-motion";
import { Trash, Star, Edit, Eye, Package, DollarSign, Tag, TrendingUp, AlertCircle } from "lucide-react";
import { useProductStore } from "../stores/useProductStore";
import { useState } from "react";
import toast from "react-hot-toast";

const ProductsList = () => {
	const { deleteProduct, toggleFeaturedProduct, products } = useProductStore();
	const [deletingId, setDeletingId] = useState(null);
	const [hoveredProduct, setHoveredProduct] = useState(null);

	const handleDelete = async (id) => {
		setDeletingId(id);
		try {
			await deleteProduct(id);
			toast.success("Product deleted successfully");
		} catch (error) {
			toast.error("Failed to delete product");
		} finally {
			setDeletingId(null);
		}
	};

	const handleToggleFeatured = async (id) => {
		try {
			await toggleFeaturedProduct(id);
			toast.success("Featured status updated");
		} catch (error) {
			toast.error("Failed to update featured status");
		}
	};

	return (
		<motion.div
			className='bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
		>
			{/* Header */}
			<div className='px-6 py-4 border-b border-gray-200 bg-gray-50'>
				<div className='flex items-center justify-between'>
					<div className='flex items-center gap-3'>
						<div className='w-10 h-10 bg-gray-900 rounded-xl flex items-center justify-center'>
							<Package size={20} className='text-white' />
						</div>
						<div>
							<h2 className='text-lg font-bold text-gray-900'>Products List</h2>
							<p className='text-sm text-gray-500'>Manage your product inventory</p>
						</div>
					</div>
					<div className='flex items-center gap-2'>
						<span className='text-sm text-gray-500'>Total:</span>
						<span className='text-lg font-bold text-gray-900'>{products?.length || 0}</span>
					</div>
				</div>
			</div>

			{/* Table */}
			<div className='overflow-x-auto'>
				<table className='min-w-full divide-y divide-gray-200'>
					<thead className='bg-gray-50'>
						<tr>
							<th className='px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
								Product
							</th>
							<th className='px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
								Price
							</th>
							<th className='px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
								Category
							</th>
							<th className='px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
								Featured
							</th>
							<th className='px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
								Actions
							</th>
						</tr>
					</thead>

					<tbody className='bg-white divide-y divide-gray-100'>
						<AnimatePresence>
							{products?.length === 0 ? (
								<tr>
									<td colSpan="5" className='px-6 py-12 text-center'>
										<div className='flex flex-col items-center justify-center'>
											<div className='w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-3'>
												<Package size={28} className='text-gray-400' />
											</div>
											<p className='text-gray-500 font-medium'>No products found</p>
											<p className='text-sm text-gray-400 mt-1'>Add your first product to get started</p>
										</div>
									</td>
								</tr>
							) : (
								products.map((product, index) => (
									<motion.tr
										key={product._id}
										initial={{ opacity: 0, x: -20 }}
										animate={{ opacity: 1, x: 0 }}
										exit={{ opacity: 0, x: 20 }}
										transition={{ duration: 0.3, delay: index * 0.05 }}
										className='hover:bg-gray-50 transition-colors duration-150 group'
										onMouseEnter={() => setHoveredProduct(product._id)}
										onMouseLeave={() => setHoveredProduct(null)}
									>
										<td className='px-6 py-4 whitespace-nowrap'>
											<div className='flex items-center gap-3'>
												<div className='flex-shrink-0 w-12 h-12 rounded-xl overflow-hidden bg-gray-100 border border-gray-200'>
													<img
														className='w-full h-full object-cover'
														src={product.image}
														alt={product.name}
													/>
												</div>
												<div>
													<div className='text-sm font-semibold text-gray-900'>{product.name}</div>
													<div className='text-xs text-gray-500 mt-0.5'>ID: {product._id?.slice(-8)}</div>
												</div>
											</div>
										</td>
										<td className='px-6 py-4 whitespace-nowrap'>
											<div className='flex items-center gap-1'>
												<DollarSign size={14} className='text-gray-400' />
												<span className='text-sm font-bold text-gray-900'>{product.price?.toFixed(2)}</span>
											</div>
										</td>
										<td className='px-6 py-4 whitespace-nowrap'>
											<span className='inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700'>
												<Tag size={10} />
												{product.category || "Uncategorized"}
											</span>
										</td>
										<td className='px-6 py-4 whitespace-nowrap'>
											<button
												onClick={() => handleToggleFeatured(product._id)}
												className={`relative group p-1.5 rounded-lg transition-all duration-200 ${
													product.isFeatured 
														? "bg-yellow-50 text-yellow-600 border border-yellow-200" 
														: "bg-gray-50 text-gray-400 border border-gray-200 hover:bg-gray-100"
												}`}
											>
												<Star 
													size={18} 
													className={`${product.isFeatured ? "fill-yellow-500" : ""} transition-transform group-hover:scale-110`}
												/>
												{product.isFeatured && (
													<span className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-500 rounded-full animate-pulse" />
												)}
											</button>
										</td>
										<td className='px-6 py-4 whitespace-nowrap'>
											<div className='flex items-center gap-2'>
												<motion.button
													whileHover={{ scale: 1.1 }}
													whileTap={{ scale: 0.95 }}
													onClick={() => handleDelete(product._id)}
													disabled={deletingId === product._id}
													className='p-1.5 rounded-lg text-red-500 hover:bg-red-50 transition-all duration-200 disabled:opacity-50'
												>
													{deletingId === product._id ? (
														<div className='w-5 h-5 border-2 border-red-500 border-t-transparent rounded-full animate-spin' />
													) : (
														<Trash size={18} />
													)}
												</motion.button>
											</div>
										</td>
									</motion.tr>
								))
							)}
						</AnimatePresence>
					</tbody>
				</table>
			</div>

			{/* Footer */}
			{products?.length > 0 && (
				<div className='px-6 py-3 border-t border-gray-200 bg-gray-50'>
					<div className='flex items-center justify-between text-sm'>
						<div className='flex items-center gap-2 text-gray-500'>
							<TrendingUp size={14} />
							<span>Showing {products.length} products</span>
						</div>
						<div className='flex items-center gap-2 text-gray-500'>
							<AlertCircle size={14} />
							<span>Last updated: {new Date().toLocaleDateString()}</span>
						</div>
					</div>
				</div>
			)}
		</motion.div>
	);
};

export default ProductsList;