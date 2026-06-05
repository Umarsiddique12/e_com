import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import CategoryItem from "../components/CategoryItem";
import { useProductStore } from "../stores/useProductStore";
import FeaturedProducts from "../components/FeaturedProducts";
import {
	ArrowRight, Shield, Truck, Star, RotateCcw,
	ShoppingBag, CreditCard, PackageCheck, Crown, Gem, Sparkles, Clock, Gift
} from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import toast from "react-hot-toast";
import { submitToWeb3Forms } from "../lib/web3forms";

const categories = [
	{ href: "/jeans", name: "Jeans", imageUrl: "/jeans.jpg", gradient: "from-gray-800 to-gray-900" },
	{ href: "/t-shirts", name: "T-shirts", imageUrl: "/tshirts.jpg", gradient: "from-gray-800 to-gray-900" },
	{ href: "/shoes", name: "Shoes", imageUrl: "/shoes.jpg", gradient: "from-gray-800 to-gray-900" },
	{ href: "/glasses", name: "Glasses", imageUrl: "/glasses.png", gradient: "from-gray-800 to-gray-900" },
	{ href: "/jackets", name: "Jackets", imageUrl: "/jackets.jpg", gradient: "from-gray-800 to-gray-900" },
	{ href: "/suits", name: "Suits", imageUrl: "/suits.jpg", gradient: "from-gray-800 to-gray-900" },
	{ href: "/bags", name: "Bags", imageUrl: "/bags.jpg", gradient: "from-gray-800 to-gray-900" },
];

const luxuryFeatures = [
	{ icon: Crown, title: "Curated Luxury", description: "Hand-picked premium collections from global designers" },
	{ icon: Gem, title: "Certified Quality", description: "Each piece undergoes rigorous quality inspection" },
	{ icon: Sparkles, title: "Exclusive Access", description: "Members-only previews and early access" },
	{ icon: Clock, title: "24/7 Concierge", description: "Personal assistance whenever you need it" },
];

const howItWorks = [
	{ icon: ShoppingBag, step: "01", title: "Discover", description: "Browse our curated luxury collections" },
	{ icon: CreditCard, step: "02", title: "Secure", description: "Bank-grade encryption & multiple payment options" },
	{ icon: Truck, step: "03", title: "Express", description: "Complimentary express shipping worldwide" },
	{ icon: PackageCheck, step: "04", title: "Experience", description: "30-day concierge returns & exchanges" },
];

const stats = [
	{ value: "50K+", label: "Luxury Clients", icon: Crown },
	{ value: "2,000+", label: "Designer Pieces", icon: Gem },
	{ value: "4.9★", label: "Client Rating", icon: Star },
	{ value: "24/7", label: "Concierge", icon: Clock },
];

const HomePage = () => {
	const { fetchFeaturedProducts, products, isLoading } = useProductStore();
	const categoriesRef = useRef(null);
	const heroRef = useRef(null);
	const { scrollYProgress } = useScroll({
		target: heroRef,
		offset: ["start start", "end start"]
	});
	
	const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
	const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

	useEffect(() => {
		fetchFeaturedProducts();
	}, [fetchFeaturedProducts]);

	const handleLearnMore = () => {
		categoriesRef.current?.scrollIntoView({ behavior: "smooth" });
	};

	return (
		<div className='min-h-screen bg-white'>
			{/* Hero Section with Background Image */}
			<div ref={heroRef} className='relative h-[600px] bg-cover bg-center bg-fixed' style={{
				backgroundImage: 'url("https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070")'
			}}>
				<div className='absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/70' />
				<div className='absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white' />
				
				<motion.div style={{ y, opacity }} className='relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center'>
					<div className='max-w-3xl'>
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6 }}
							className='mb-4'
						>
							<span className='inline-block px-4 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-sm font-medium border border-white/20'>
								Luxury Collection 2026
							</span>
						</motion.div>
						
						<motion.h1
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.1 }}
							className='text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight'
						>
							Timeless Elegance
							<br />
							<span className='text-amber-400'>Modern Sophistication</span>
						</motion.h1>
						
						<motion.p
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.2 }}
							className='text-white/80 text-lg mb-8 max-w-xl'
						>
							Experience unparalleled craftsmanship and exclusive designs. 
							Complimentary worldwide express shipping on all orders.
						</motion.p>
						
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.3 }}
							className='flex flex-col sm:flex-row gap-4'
						>
							<Link
								to='/jeans'
								className='inline-flex items-center justify-center gap-2 bg-white text-gray-900 hover:bg-gray-100 px-8 py-3.5 rounded-lg font-semibold transition shadow-lg'
							>
								Explore Collection <ArrowRight size={18} />
							</Link>
							<button
								onClick={handleLearnMore}
								className='inline-flex items-center justify-center gap-2 border border-white/30 text-white hover:bg-white/10 px-8 py-3.5 rounded-lg font-semibold transition'
							>
								Discover More
							</button>
						</motion.div>
						
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 0.6, delay: 0.4 }}
							className='flex flex-wrap gap-6 mt-8 text-white/70 text-sm'
						>
							<span className='flex items-center gap-2'><Truck size={16} /> Express Shipping</span>
							<span className='flex items-center gap-2'><RotateCcw size={16} /> 30-Day Returns</span>
							<span className='flex items-center gap-2'><Shield size={16} /> Authenticity Guarantee</span>
						</motion.div>
					</div>
				</motion.div>
			</div>

			{/* Main Content */}
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
				
				{/* Stats Section */}
				<div className='grid grid-cols-2 md:grid-cols-4 gap-6 mb-20'>
					{stats.map((stat, i) => (
						<motion.div
							key={stat.label}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: i * 0.1 }}
							className='text-center'
						>
							<div className='w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3'>
								<stat.icon size={20} className='text-gray-900' />
							</div>
							<div className='text-2xl sm:text-3xl font-bold text-gray-900'>{stat.value}</div>
							<div className='text-sm text-gray-500 mt-1'>{stat.label}</div>
						</motion.div>
					))}
				</div>

				{/* Features Section */}
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20'>
					{luxuryFeatures.map((feature, i) => (
						<motion.div
							key={feature.title}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: i * 0.1 }}
							className='text-center'
						>
							<div className='w-14 h-14 bg-gray-900 rounded-xl flex items-center justify-center mx-auto mb-4'>
								<feature.icon size={24} className='text-white' />
							</div>
							<h3 className='font-semibold text-gray-900 text-lg mb-2'>{feature.title}</h3>
							<p className='text-gray-500 text-sm'>{feature.description}</p>
						</motion.div>
					))}
				</div>

				{/* How It Works */}
				<div className='mb-20'>
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						className='text-center mb-12'
					>
						<h2 className='text-3xl sm:text-4xl font-bold text-gray-900 mb-4'>The Luxury Experience</h2>
						<p className='text-gray-500 text-lg'>Four steps to exceptional style</p>
					</motion.div>
					
					<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8'>
						{howItWorks.map((item, i) => (
							<motion.div
								key={item.step}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ delay: i * 0.1 }}
								className='text-center relative'
							>
								<div className='w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-900 font-bold'>
									{item.step}
								</div>
								<div className='w-14 h-14 bg-gray-50 rounded-xl flex items-center justify-center mx-auto mb-3'>
									<item.icon size={24} className='text-gray-700' />
								</div>
								<h3 className='font-semibold text-gray-900 mb-2'>{item.title}</h3>
								<p className='text-gray-500 text-sm'>{item.description}</p>
							</motion.div>
						))}
					</div>
				</div>

				{/* Categories Section */}
				<div ref={categoriesRef} className='mb-20 scroll-mt-24'>
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						className='text-center mb-12'
					>
						<h2 className='text-3xl sm:text-4xl font-bold text-gray-900 mb-4'>Curated Collections</h2>
						<p className='text-gray-500 text-lg'>Discover our exclusive designer categories</p>
					</motion.div>
					
					<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
						{categories.map((category, index) => (
							<motion.div
								key={category.name}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ delay: index * 0.05 }}
							>
								<CategoryItem category={category} />
							</motion.div>
						))}
					</div>
				</div>

				{/* Featured Products */}
				{!isLoading && products.length > 0 && (
					<div className='mb-20'>
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							className='text-center mb-12'
						>
							<h2 className='text-3xl sm:text-4xl font-bold text-gray-900 mb-4'>Featured Masterpieces</h2>
							<p className='text-gray-500 text-lg'>Handpicked luxury items for the discerning connoisseur</p>
						</motion.div>
						
						<FeaturedProducts featuredProducts={products} />
						
						<div className='text-center mt-8'>
							<Link
								to='/jackets'
								className='inline-flex items-center gap-2 text-gray-900 hover:text-gray-600 font-semibold transition'
							>
								View Entire Collection <ArrowRight size={18} />
							</Link>
						</div>
					</div>
				)}

				{/* Newsletter Section */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					className='bg-gray-900 rounded-2xl p-12 text-center'
				>
					<div className='w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4'>
						<Gift size={28} className='text-white' />
					</div>
					<h2 className='text-2xl sm:text-3xl font-bold text-white mb-4'>Join the Luxury Circle</h2>
					<p className='text-gray-300 mb-8 max-w-md mx-auto'>
						Be first to experience exclusive drops, private sales, and receive a 15% welcome gift
					</p>
					<form className='flex flex-col sm:flex-row gap-4 max-w-md mx-auto'>
						<input
							type='email'
							placeholder='Enter your email address'
							className='flex-1 px-4 py-3 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-white/50 text-gray-900'
						/>
						<button
							type='submit'
							className='bg-white text-gray-900 hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold transition'
						>
							Subscribe
						</button>
					</form>
					<p className='text-xs text-gray-400 mt-4'>✓ No spam, unsubscribe anytime ✓ Exclusive member benefits</p>
				</motion.div>
			</div>
		</div>
	);
};

export default HomePage;