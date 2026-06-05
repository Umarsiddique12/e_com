import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ShoppingCart, Sparkles, Shield, Truck, Check, Crown, Zap } from "lucide-react";
import { useProductStore } from "../stores/useProductStore";
import { useCartStore } from "../stores/useCartStore";
import { useUserStore } from "../stores/useUserStore";
import axios from "../lib/axios";
import toast from "react-hot-toast";
import LoadingSpinner from "../components/LoadingSpinner";

const ProductDetailPage = () => {
	const { id } = useParams();
	const { fetchProductById, productDetail, loading } = useProductStore();
	const { addToCart } = useCartStore();
	const { user } = useUserStore();
	const [loadingCheckout, setLoadingCheckout] = useState(false);

	useEffect(() => {
		fetchProductById(id);
	}, [fetchProductById, id]);

	const handleAddToCart = () => {
		if (!user) {
			toast.error("Please login to add this product to cart");
			return;
		}

		addToCart(productDetail);
		toast.success("Product added to cart!");
	};

	const handleBuyNow = async () => {
		if (!user) {
			toast.error("Please login to make a purchase");
			return;
		}

		setLoadingCheckout(true);
		try {
			const response = await axios.post("/payments/create-checkout-session", {
				products: [{ ...productDetail, quantity: 1 }],
			});

			window.location.href = response.data.session.url;
		} catch (error) {
			toast.error(error.response?.data?.error || "Failed to start checkout");
		} finally {
			setLoadingCheckout(false);
		}
	};

	if (loading) return <LoadingSpinner />;

	if (!productDetail) {
		return (
			<div className='min-h-screen flex items-center justify-center px-4 py-20'>
				<motion.div
					initial={{ opacity: 0, scale: 0.9 }}
					animate={{ opacity: 1, scale: 1 }}
					className='bg-white border border-slate-200 rounded-3xl shadow-lg p-10 text-center max-w-lg'
				>
					<h2 className='text-3xl font-bold text-slate-800 mb-4'>Product not found</h2>
					<p className='text-slate-500 mb-6'>The item you are looking for may have been removed or does not exist.</p>
					<Link to='/' className='inline-flex items-center justify-center rounded-full bg-emerald-600 px-6 py-3 text-white font-semibold shadow-lg shadow-emerald-600/20 hover:bg-emerald-500 transition'>
						Back to shop
					</Link>
				</motion.div>
			</div>
		);
	}

	return (
		<div className='min-h-screen bg-slate-50'>
			<div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
				{/* Back Button */}
				<motion.div
					initial={{ opacity: 0, x: -20 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.5 }}
				>
					<Link to='/' className='inline-flex items-center gap-2 text-slate-600 hover:text-emerald-600 mb-10 font-medium transition-colors'>
						<ArrowLeft className='w-5 h-5' />
						Back to shop
					</Link>
				</motion.div>

				<div className='grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-start'>
					{/* Product Image Section */}
					<motion.div
						initial={{ opacity: 0, x: -60 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.7, ease: "easeOut" }}
						className='group'
					>
						<div className='relative rounded-[2.5rem] overflow-hidden shadow-2xl hover:shadow-3xl transition-shadow duration-500 bg-white border border-slate-200/80 group-hover:border-emerald-300/60'>
							{/* Top accent bar */}
							<div className='absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-400 z-10' />
							
							{/* Image container with zoom effect */}
							<div className='relative overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100 aspect-square'>
								<motion.img
									src={productDetail.image}
									alt={productDetail.name}
									className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out'
									initial={{ scale: 1 }}
									animate={{ scale: 1 }}
								/>
								{/* Overlay gradient on hover */}
								<div className='absolute inset-0 bg-gradient-to-t from-slate-900/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500' />
							</div>

							{/* Badge */}
							<motion.div
								initial={{ opacity: 0, y: -10 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.3, duration: 0.5 }}
								className='absolute top-6 right-6 z-20'
							>
								<div className='rounded-full bg-emerald-600/95 backdrop-blur text-white px-4 py-2 text-sm font-bold shadow-lg flex items-center gap-2'>
									<Crown size={16} />
									Premium
								</div>
							</motion.div>
						</div>
					</motion.div>

					{/* Product Details Section */}
					<motion.div
						initial={{ opacity: 0, y: 40 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
						className='space-y-6'
					>
						{/* Category & Title */}
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 0.3, duration: 0.5 }}
							className='rounded-2xl border border-slate-200 bg-white p-8 shadow-sm hover:shadow-md transition-shadow duration-300'
						>
							<div className='flex items-center gap-2 mb-3'>
								<Sparkles size={16} className='text-emerald-600' />
								<p className='text-sm font-bold uppercase tracking-[0.12em] text-emerald-600'>
									{productDetail.category || "Collection"}
								</p>
							</div>
							<h1 className='text-5xl font-extrabold tracking-tight text-slate-900 mb-4 leading-tight'>
								{productDetail.name}
							</h1>
							<p className='text-lg text-slate-600 leading-relaxed mb-6'>
								{productDetail.description || "Premium style with bold details and a perfect fit for every occasion."}
							</p>
							
							{/* Price Display */}
							<motion.div
								whileHover={{ scale: 1.05 }}
								className='inline-block rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 px-6 py-4 border border-emerald-200/60'
							>
								<p className='text-xs uppercase tracking-widest text-emerald-700 font-bold mb-1'>Price</p>
								<p className='text-5xl font-extrabold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent'>
									${productDetail.price.toFixed(2)}
								</p>
							</motion.div>
						</motion.div>

						{/* Features Grid */}
						<div className='grid gap-3 sm:grid-cols-3'>
							{[
								{ icon: Sparkles, label: "Premium Materials", desc: "Luxurious fabrics" },
								{ icon: Truck, label: "Fast Shipping", desc: "Quick delivery" },
								{ icon: Shield, label: "Easy Returns", desc: "30-day guarantee" },
							].map((feature, i) => (
								<motion.div
									key={i}
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
									className='rounded-2xl bg-white border border-slate-200 p-4 shadow-sm hover:shadow-md hover:border-emerald-300/50 transition-all duration-300'
								>
									<div className='flex items-center gap-3 mb-2'>
										<feature.icon size={18} className='text-emerald-600' />
										<h3 className='font-bold text-slate-800 text-sm'>{feature.label}</h3>
									</div>
									<p className='text-xs text-slate-500'>{feature.desc}</p>
								</motion.div>
							))}
						</div>

						{/* Product Details & Highlights */}
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.5, duration: 0.5 }}
							className='rounded-2xl border border-slate-200 bg-white p-8 shadow-sm'
						>
							<div className='flex items-center justify-between mb-6'>
								<h3 className='text-lg font-bold text-slate-800 uppercase tracking-wide'>Highlights</h3>
								<div className='rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700 flex items-center gap-2'>
									<Zap size={14} />
									Best Seller
								</div>
							</div>
							<ul className='space-y-4'>
								{[
									"Premium materials with a modern silhouette",
									"Perfect for day-to-night styling",
									"Handpicked to elevate your wardrobe instantly",
									"Eco-friendly and sustainably sourced",
								].map((item, i) => (
									<motion.li
										key={i}
										initial={{ opacity: 0, x: -20 }}
										animate={{ opacity: 1, x: 0 }}
										transition={{ delay: 0.6 + i * 0.1, duration: 0.5 }}
										className='flex items-start gap-4'
									>
										<motion.span
											initial={{ scale: 0 }}
											animate={{ scale: 1 }}
											transition={{ delay: 0.7 + i * 0.1, duration: 0.4 }}
											className='mt-1 h-3 w-3 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 flex-shrink-0 shadow-sm'
										/>
										<span className='text-slate-600 leading-relaxed font-medium'>{item}</span>
									</motion.li>
								))}
							</ul>
						</motion.div>

						{/* Action Buttons */}
						<motion.div
							initial={{ opacity: 0, y: 30 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.7, duration: 0.5 }}
							className='space-y-4'
						>
							<motion.button
								whileHover={{ scale: 1.02 }}
								whileTap={{ scale: 0.98 }}
								onClick={handleBuyNow}
								disabled={loadingCheckout}
								className='w-full rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 px-8 py-4 text-white text-lg font-bold shadow-lg shadow-emerald-600/30 hover:from-emerald-500 hover:to-teal-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 group border border-emerald-500/50'
							>
								{loadingCheckout ? (
									<>
										<div className='w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin' />
										Processing...
									</>
								) : (
									<>
										<Zap size={20} className='group-hover:scale-110 transition-transform' />
										Buy Now
									</>
								)}
							</motion.button>

							<motion.button
								whileHover={{ scale: 1.02 }}
								whileTap={{ scale: 0.98 }}
								onClick={handleAddToCart}
								className='w-full rounded-2xl border-2 border-emerald-600 bg-white px-8 py-4 text-emerald-600 text-lg font-bold hover:bg-emerald-50 transition-all duration-300 flex items-center justify-center gap-3 group shadow-sm'
							>
								<ShoppingCart size={20} className='group-hover:translate-y-1 transition-transform' />
								Add to Cart
							</motion.button>
						</motion.div>

						{/* Trust Badges */}
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 0.8, duration: 0.5 }}
							className='pt-4 border-t border-slate-200 flex items-center justify-center gap-6 text-sm text-slate-500'
						>
							<div className='flex items-center gap-2'>
								<Check size={16} className='text-emerald-600' />
								<span>100% Authentic</span>
							</div>
							<div className='flex items-center gap-2'>
								<Shield size={16} className='text-emerald-600' />
								<span>Secure Payment</span>
							</div>
						</motion.div>
					</motion.div>
				</div>
			</div>
		</div>
	);
};

export default ProductDetailPage;
