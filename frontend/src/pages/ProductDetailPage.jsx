import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ShoppingCart, Shield, Truck, Check, Crown, Star, Heart, Share2, Ruler, RefreshCw, Award } from "lucide-react";
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
	const [selectedImage, setSelectedImage] = useState(0);
	const [quantity, setQuantity] = useState(1);

	useEffect(() => {
		fetchProductById(id);
	}, [fetchProductById, id]);

	const handleAddToCart = () => {
		if (!user) {
			toast.error("Please login to add this product to cart");
			return;
		}

		addToCart({ ...productDetail, quantity });
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
				products: [{ ...productDetail, quantity }],
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
			<div className='min-h-screen bg-gray-50 flex items-center justify-center px-4 py-20'>
				<motion.div
					initial={{ opacity: 0, scale: 0.9 }}
					animate={{ opacity: 1, scale: 1 }}
					className='bg-white rounded-2xl shadow-xl p-10 text-center max-w-lg border border-gray-100'
				>
					<div className='w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4'>
						<Crown size={32} className='text-gray-400' />
					</div>
					<h2 className='text-2xl font-bold text-gray-900 mb-4'>Product not found</h2>
					<p className='text-gray-500 mb-6'>The item you are looking for may have been removed or does not exist.</p>
					<Link to='/' className='inline-flex items-center justify-center bg-gray-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition'>
						Back to shop
					</Link>
				</motion.div>
			</div>
		);
	}

	return (
		<div className='min-h-screen bg-gray-50'>
			{/* Hero Section with Background Image */}
			<div className='relative h-[300px] bg-cover bg-center bg-fixed' style={{
				backgroundImage: 'url("https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070")'
			}}>
				<div className='absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/70' />
				<div className='absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-gray-50' />
				
				<div className='relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center'>
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						className='max-w-2xl'
					>
						<div className='flex items-center gap-2 text-white/80 text-sm mb-4'>
							<span>Shop</span>
							<span>→</span>
							<span className='text-white'>Product Details</span>
						</div>
						<h1 className='text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight'>
							Product Details
						</h1>
						<p className='text-white/80 text-lg'>
							Discover the craftsmanship and quality of our luxury collection.
						</p>
					</motion.div>
				</div>
			</div>

			{/* Main Content */}
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10 pb-16'>
				{/* Back Button */}
				<motion.div
					initial={{ opacity: 0, x: -20 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.5 }}
					className='mb-6'
				>
					<Link to='/' className='inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 transition font-medium'>
						<ArrowLeft className='w-4 h-4' />
						Back to shop
					</Link>
				</motion.div>

				<div className='grid gap-8 lg:grid-cols-2'>
					{/* Product Image Section */}
					<motion.div
						initial={{ opacity: 0, x: -30 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.6 }}
						className='space-y-4'
					>
						<div className='relative bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-lg'>
							<div className='absolute top-0 left-0 w-full h-1 bg-gray-900' />
							<div className='relative aspect-square bg-gray-100'>
								<img
									src={productDetail.image}
									alt={productDetail.name}
									className='w-full h-full object-cover'
								/>
								<div className='absolute top-4 right-4 flex gap-2'>
									<button className='w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-50 transition'>
										<Heart size={18} className='text-gray-600' />
									</button>
									<button className='w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-50 transition'>
										<Share2 size={18} className='text-gray-600' />
									</button>
								</div>
								<div className='absolute bottom-4 left-4 bg-gray-900 text-white px-3 py-1 rounded-lg text-xs font-medium flex items-center gap-1'>
									<Crown size={12} />
									Premium
								</div>
							</div>
						</div>
					</motion.div>

					{/* Product Details Section */}
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.2 }}
						className='space-y-6'
					>
						{/* Title & Price */}
						<div className='bg-white rounded-2xl border border-gray-200 p-6 shadow-sm'>
							<div className='flex items-center gap-2 mb-3'>
								<span className='text-xs font-medium text-gray-500 uppercase tracking-wider'>
									{productDetail.category || "Luxury Collection"}
								</span>
								<div className='flex items-center gap-1'>
									<Star size={14} className='fill-yellow-400 text-yellow-400' />
									<span className='text-sm font-medium text-gray-700'>4.9</span>
									<span className='text-xs text-gray-400'>(128 reviews)</span>
								</div>
							</div>
							<h1 className='text-3xl font-bold text-gray-900 mb-3'>
								{productDetail.name}
							</h1>
							<p className='text-gray-600 leading-relaxed mb-4'>
								{productDetail.description || "Premium style with bold details and a perfect fit for every occasion."}
							</p>
							<div className='flex items-baseline gap-2'>
								<span className='text-3xl font-bold text-gray-900'>
									${productDetail.price.toFixed(2)}
								</span>
								{productDetail.oldPrice && (
									<span className='text-gray-400 line-through text-sm'>
										${productDetail.oldPrice.toFixed(2)}
									</span>
								)}
							</div>
						</div>

						{/* Quantity Selector */}
						<div className='bg-white rounded-2xl border border-gray-200 p-6 shadow-sm'>
							<h3 className='font-semibold text-gray-900 mb-3'>Quantity</h3>
							<div className='flex items-center gap-3'>
								<button
									onClick={() => setQuantity(Math.max(1, quantity - 1))}
									className='w-10 h-10 border border-gray-200 rounded-lg flex items-center justify-center hover:border-gray-400 transition'
								>
									-
								</button>
								<span className='w-12 text-center font-medium text-gray-900'>{quantity}</span>
								<button
									onClick={() => setQuantity(quantity + 1)}
									className='w-10 h-10 border border-gray-200 rounded-lg flex items-center justify-center hover:border-gray-400 transition'
								>
									+
								</button>
							</div>
						</div>

						{/* Features Grid */}
						<div className='grid grid-cols-2 gap-3'>
							{[
								{ icon: Award, label: "Premium Quality", desc: "Luxury materials" },
								{ icon: Truck, label: "Fast Shipping", desc: "Express delivery" },
								{ icon: Shield, label: "Secure Payment", desc: "256-bit SSL" },
								{ icon: RefreshCw, label: "Easy Returns", desc: "30-day guarantee" },
							].map((feature, i) => (
								<motion.div
									key={i}
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: 0.4 + i * 0.1 }}
									className='bg-white rounded-xl border border-gray-200 p-3 shadow-sm'
								>
									<div className='flex items-center gap-2 mb-1'>
										<feature.icon size={14} className='text-gray-700' />
										<span className='font-medium text-gray-800 text-xs'>{feature.label}</span>
									</div>
									<p className='text-xs text-gray-500'>{feature.desc}</p>
								</motion.div>
							))}
						</div>

						{/* Action Buttons */}
						<div className='space-y-3'>
							<button
								onClick={handleBuyNow}
								disabled={loadingCheckout}
								className='w-full bg-gray-900 hover:bg-gray-800 text-white py-3.5 rounded-lg font-semibold transition flex items-center justify-center gap-2 disabled:opacity-50'
							>
								{loadingCheckout ? (
									<>
										<div className='w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin' />
										Processing...
									</>
								) : (
									<>Buy Now</>
								)}
							</button>

							<button
								onClick={handleAddToCart}
								className='w-full border-2 border-gray-900 text-gray-900 hover:bg-gray-50 py-3.5 rounded-lg font-semibold transition flex items-center justify-center gap-2'
							>
								<ShoppingCart size={18} />
								Add to Cart
							</button>
						</div>

						{/* Product Details Accordion */}
						<div className='bg-white rounded-2xl border border-gray-200 divide-y divide-gray-100 shadow-sm'>
							<div className='p-5'>
								<div className='flex items-center gap-2 mb-3'>
									<Ruler size={16} className='text-gray-700' />
									<h3 className='font-semibold text-gray-900'>Size & Fit</h3>
								</div>
								<p className='text-sm text-gray-600'>Model is 6'1" wearing size M. Regular fit, true to size.</p>
							</div>
							<div className='p-5'>
								<div className='flex items-center gap-2 mb-3'>
									<Shield size={16} className='text-gray-700' />
									<h3 className='font-semibold text-gray-900'>Materials & Care</h3>
								</div>
								<p className='text-sm text-gray-600'>100% premium cotton. Machine wash cold, tumble dry low.</p>
							</div>
							<div className='p-5'>
								<div className='flex items-center gap-2 mb-3'>
									<Truck size={16} className='text-gray-700' />
									<h3 className='font-semibold text-gray-900'>Shipping & Returns</h3>
								</div>
								<p className='text-sm text-gray-600'>Free express shipping on orders $50+. 30-day easy returns.</p>
							</div>
						</div>

						{/* Trust Badges */}
						<div className='flex items-center justify-center gap-4 text-xs text-gray-500'>
							<div className='flex items-center gap-1'>
								<Check size={14} className='text-green-600' />
								<span>100% Authentic</span>
							</div>
							<div className='flex items-center gap-1'>
								<Shield size={14} className='text-green-600' />
								<span>Secure Checkout</span>
							</div>
							<div className='flex items-center gap-1'>
								<Award size={14} className='text-green-600' />
								<span>Luxury Quality</span>
							</div>
						</div>
					</motion.div>
				</div>
			</div>
		</div>
	);
};

export default ProductDetailPage;