import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Package } from "lucide-react";
import ProductCard from "../components/ProductCard";
import { useProductStore } from "../stores/useProductStore";
import LoadingSpinner from "../components/LoadingSpinner";

const CategoryPage = () => {
	const { category } = useParams();
	const { fetchProductsByCategory, products, loading } = useProductStore();

	const categorySlug = category?.replace(/^\//, "") || "";
	const displayName = categorySlug
		? categorySlug.charAt(0).toUpperCase() + categorySlug.slice(1).replace(/-/g, " ")
		: "Category";

	const productList = Array.isArray(products) ? products : [];

	useEffect(() => {
		if (categorySlug) {
			fetchProductsByCategory(categorySlug);
		}
	}, [fetchProductsByCategory, categorySlug]);

	if (loading) {
		return <LoadingSpinner />;
	}

	return (
		<div className='relative min-h-screen'>
			<div className='relative z-10 max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16'>
				<Link
					to='/'
					className='inline-flex items-center gap-2 text-sm text-slate-500 hover:text-emerald-600 transition mb-8'
				>
					<ArrowLeft size={16} />
					Back to Home
				</Link>

				<motion.div
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					className='text-center mb-12'
				>
					<h1 className='text-4xl sm:text-5xl font-extrabold text-emerald-600 tracking-tight mb-3'>
						{displayName}
					</h1>
					<p className='text-slate-500 font-medium max-w-xl mx-auto'>
						Browse our {displayName.toLowerCase()} collection — curated styles for every occasion.
					</p>
					<p className='text-sm text-slate-400 mt-2'>
						{productList.length} {productList.length === 1 ? "product" : "products"} available
					</p>
				</motion.div>

				{productList.length === 0 ? (
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						className='text-center py-20 bg-white/80 backdrop-blur-sm border border-slate-200/60 rounded-2xl shadow-sm'
					>
						<div className='w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-100'>
							<Package size={28} className='text-emerald-500' />
						</div>
						<h2 className='text-2xl font-semibold text-slate-700 mb-2'>No products found</h2>
						<p className='text-slate-500 mb-6'>
							We do not have items in this category yet. Check back soon or explore other collections.
						</p>
						<Link
							to='/'
							className='inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2.5 rounded-lg font-semibold transition'
						>
							Continue Shopping
						</Link>
					</motion.div>
				) : (
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.1 }}
						className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center'
					>
						{productList.map((product) => (
							<ProductCard key={product._id} product={product} />
						))}
					</motion.div>
				)}
			</div>
		</div>
	);
};

export default CategoryPage;
