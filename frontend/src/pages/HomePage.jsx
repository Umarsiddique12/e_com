import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import CategoryItem from "../components/CategoryItem";
import { useProductStore } from "../stores/useProductStore";
import FeaturedProducts from "../components/FeaturedProducts";
import {
	ArrowRight, Zap, Shield, Truck, ChevronDown, Star, RotateCcw,
	ShoppingBag, CreditCard, PackageCheck, Quote, Mail, CheckCircle,
	Sparkles, Crown, Gem, Award, TrendingUp, Heart, Clock,
	Layers, Palette, Compass, Gift
} from "lucide-react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { submitToWeb3Forms } from "../lib/web3forms";

const categories = [
	{ href: "/jeans", name: "Jeans", imageUrl: "/jeans.jpg", gradient: "from-blue-600 to-indigo-600" },
	{ href: "/t-shirts", name: "T-shirts", imageUrl: "/tshirts.jpg", gradient: "from-purple-600 to-pink-600" },
	{ href: "/shoes", name: "Shoes", imageUrl: "/shoes.jpg", gradient: "from-orange-600 to-red-600" },
	{ href: "/glasses", name: "Glasses", imageUrl: "/glasses.png", gradient: "from-cyan-600 to-blue-600" },
	{ href: "/jackets", name: "Jackets", imageUrl: "/jackets.jpg", gradient: "from-amber-600 to-orange-600" },
	{ href: "/suits", name: "Suits", imageUrl: "/suits.jpg", gradient: "from-gray-800 to-black" },
	{ href: "/bags", name: "Bags", imageUrl: "/bags.jpg", gradient: "from-rose-600 to-purple-600" },
];

const luxuryFeatures = [
	{ icon: Crown, title: "Curated Luxury", description: "Hand-picked premium collections from global designers" },
	{ icon: Award, title: "Certified Quality", description: "Each piece undergoes rigorous quality inspection" },
	{ icon: Gem, title: "Exclusive Access", description: "Members-only previews and early access" },
	{ icon: Sparkles, title: "Personal Stylist", description: "AI-powered recommendations tailored to you" },
];

const howItWorks = [
	{ icon: ShoppingBag, step: "01", title: "Discover", description: "Browse our curated luxury collections" },
	{ icon: CreditCard, step: "02", title: "Secure", description: "Bank-grade encryption & multiple payment options" },
	{ icon: Truck, step: "03", title: "Express", description: "Complimentary express shipping worldwide" },
	{ icon: PackageCheck, step: "04", title: "Experience", description: "30-day concierge returns & exchanges" },
];

const testimonials = [
	{ name: "Victoria Chen", location: "Hong Kong", rating: 5, text: "The attention to detail is extraordinary. Every piece feels like it was made just for me. Truly exceptional service." },
	{ name: "Alexander Volkov", location: "Moscow", rating: 5, text: "StyleHub redefines luxury e-commerce. The packaging alone is an experience. Will definitely return." },
	{ name: "Isabella Romano", location: "Milan", rating: 5, text: "Finally, a platform that understands true elegance. The curation is impeccable and delivery was seamless." },
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
	const [email, setEmail] = useState("");
	const [subscribing, setSubscribing] = useState(false);
	const [hoveredStat, setHoveredStat] = useState(null);
	
	const { scrollYProgress } = useScroll({
		target: heroRef,
		offset: ["start start", "end start"]
	});
	
	const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
	const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
	const scale = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

	useEffect(() => {
		fetchFeaturedProducts();
	}, [fetchFeaturedProducts]);

	const handleLearnMore = () => {
		categoriesRef.current?.scrollIntoView({ behavior: "smooth" });
	};

	const handleNewsletter = async (e) => {
		e.preventDefault();
		if (!email) return;

		setSubscribing(true);
		try {
			await submitToWeb3Forms({
				subject: "StyleHub Luxury Newsletter Subscription",
				from_name: "StyleHub Luxury",
				email,
				message: "New luxury newsletter subscription request.",
			});
			toast.custom((t) => (
				<div className="bg-gradient-to-r from-amber-600 to-amber-500 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3">
					<Gift className="animate-bounce" size={24} />
					<div>
						<p className="font-bold">Welcome to the luxury circle! ✨</p>
						<p className="text-sm opacity-90">Check your inbox for an exclusive 15% off code</p>
					</div>
				</div>
			));
			setEmail("");
		} catch (error) {
			toast.error("Failed to subscribe. Please try again.");
		} finally {
			setSubscribing(false);
		}
	};

	// Floating particles animation
	const particles = Array.from({ length: 50 }, (_, i) => ({
		id: i,
		x: Math.random() * 100,
		y: Math.random() * 100,
		duration: 5 + Math.random() * 10,
		delay: Math.random() * 5,
	}));

	return (
		<div className='relative min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50/30 overflow-x-hidden'>
			{/* Animated Background Particles */}
			<div className="fixed inset-0 pointer-events-none overflow-hidden">
				{particles.map((particle) => (
					<motion.div
						key={particle.id}
						className="absolute w-1 h-1 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full opacity-20"
						initial={{ x: `${particle.x}%`, y: `${particle.y}%` }}
						animate={{
							y: ["0%", "100%", "0%"],
							x: [`${particle.x}%`, `${particle.x + 10}%`, `${particle.x}%`],
							opacity: [0.2, 0.5, 0.2],
						}}
						transition={{
							duration: particle.duration,
							repeat: Infinity,
							delay: particle.delay,
							ease: "linear",
						}}
					/>
				))}
			</div>

			{/* Hero Section with Parallax */}
			<div ref={heroRef} className='relative z-10 pt-32 pb-20 overflow-hidden'>
				<motion.div style={{ y, opacity }} className='absolute inset-0'>
					<div className="absolute top-20 right-10 w-72 h-72 bg-amber-300/20 rounded-full blur-3xl animate-pulse" />
					<div className="absolute bottom-20 left-10 w-96 h-96 bg-purple-300/20 rounded-full blur-3xl animate-pulse delay-1000" />
				</motion.div>

				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative'>
					<motion.div 
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						className='text-center mb-20'
					>
						<motion.div 
							initial={{ scale: 0 }}
							animate={{ scale: 1 }}
							transition={{ type: "spring", stiffness: 260, damping: 20 }}
							className='inline-block mb-6'
						>
							<span className='bg-gradient-to-r from-amber-600 to-amber-500 text-white px-6 py-2.5 rounded-full text-sm font-semibold shadow-lg shadow-amber-500/25 flex items-center gap-2'>
								<Sparkles size={16} className="animate-pulse" />
								Luxury Collection 2026
								<Sparkles size={16} className="animate-pulse" />
							</span>
						</motion.div>

						<motion.h1 
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.2, duration: 0.8 }}
							className='text-6xl sm:text-8xl font-bold mb-6 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 bg-clip-text text-transparent tracking-tight'
						>
							StyleHub
							<motion.span
								animate={{ rotate: 360 }}
								transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
								className="inline-block ml-4"
							>
								<Crown size={60} className="text-amber-500" />
							</motion.span>
						</motion.h1>

						<motion.p 
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 0.4, duration: 0.8 }}
							className='text-2xl sm:text-3xl text-slate-600 mb-4 max-w-3xl mx-auto font-light'
						>
							Where <span className="font-bold text-amber-600">Timeless Elegance</span> Meets Modern Sophistication
						</motion.p>
						
						<motion.p 
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 0.5, duration: 0.8 }}
							className='text-slate-500 mb-8 max-w-2xl mx-auto text-lg'
						>
							Experience unparalleled craftsmanship and exclusive designs. 
							Complimentary worldwide express shipping on all orders.
						</motion.p>

						<motion.div 
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.6, duration: 0.8 }}
							className='flex flex-col sm:flex-row gap-6 justify-center mb-12'
						>
							<motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
								<Link
									to='/jeans'
									className='group relative bg-gradient-to-r from-amber-600 to-amber-500 text-white px-10 py-4 rounded-full font-semibold transition-all duration-300 flex items-center justify-center gap-3 shadow-2xl shadow-amber-500/30 hover:shadow-amber-500/50 overflow-hidden'
								>
									<span className="relative z-10">Explore Collection</span>
									<ArrowRight size={20} className='group-hover:translate-x-1 transition relative z-10' />
									<motion.div 
										className="absolute inset-0 bg-gradient-to-r from-amber-500 to-amber-600"
										initial={{ x: "-100%" }}
										whileHover={{ x: 0 }}
										transition={{ duration: 0.3 }}
									/>
								</Link>
							</motion.div>
							
							<motion.button
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
								onClick={handleLearnMore}
								className='group border-2 border-amber-600 text-amber-600 hover:bg-amber-50 px-10 py-4 rounded-full font-semibold transition duration-300 flex items-center justify-center gap-3 backdrop-blur-sm'
							>
								Discover More
								<ChevronDown size={20} className='group-hover:translate-y-1 transition' />
							</motion.button>
						</motion.div>

						<motion.div 
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 0.8, duration: 0.8 }}
							className='flex flex-wrap justify-center gap-8 text-sm text-slate-600'
						>
							<motion.span whileHover={{ scale: 1.05 }} className='flex items-center gap-2 cursor-pointer'>
								<Truck size={18} className='text-amber-500' /> 
								Complimentary Express Shipping
							</motion.span>
							<motion.span whileHover={{ scale: 1.05 }} className='flex items-center gap-2 cursor-pointer'>
								<RotateCcw size={18} className='text-amber-500' /> 
								30-Day Concierge Returns
							</motion.span>
							<motion.span whileHover={{ scale: 1.05 }} className='flex items-center gap-2 cursor-pointer'>
								<Shield size={18} className='text-amber-500' /> 
								Luxury Authenticity Guarantee
							</motion.span>
						</motion.div>
					</motion.div>

					{/* Luxury Stats Bar with Animation */}
					<motion.div 
						initial={{ opacity: 0, y: 50 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						className='grid grid-cols-2 md:grid-cols-4 gap-6 mb-24'
					>
						{stats.map((stat, i) => (
							<motion.div
								key={stat.label}
								initial={{ opacity: 0, scale: 0.5 }}
								whileInView={{ opacity: 1, scale: 1 }}
								viewport={{ once: true }}
								transition={{ duration: 0.5, delay: i * 0.1, type: "spring" }}
								whileHover={{ y: -10, scale: 1.05 }}
								onHoverStart={() => setHoveredStat(i)}
								onHoverEnd={() => setHoveredStat(null)}
								className='relative bg-white/90 backdrop-blur-md border border-amber-200/50 rounded-2xl p-6 text-center shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden group'
							>
								<motion.div
									animate={{ rotate: hoveredStat === i ? 360 : 0 }}
									transition={{ duration: 0.6 }}
									className="absolute -top-10 -right-10 opacity-10 group-hover:opacity-20 transition"
								>
									<stat.icon size={80} />
								</motion.div>
								<motion.div
									animate={{ scale: hoveredStat === i ? 1.2 : 1 }}
									className="w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg"
								>
									<stat.icon size={24} className="text-white" />
								</motion.div>
								<div className='text-3xl sm:text-4xl font-bold bg-gradient-to-r from-amber-600 to-amber-500 bg-clip-text text-transparent'>
									{stat.value}
								</div>
								<div className='text-sm text-slate-600 font-medium mt-2'>{stat.label}</div>
							</motion.div>
						))}
					</motion.div>

					{/* Luxury Features Grid */}
					<motion.div
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
						viewport={{ once: true }}
						className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24'
					>
						{luxuryFeatures.map((feature, i) => (
							<motion.div
								key={feature.title}
								initial={{ opacity: 0, x: -50 }}
								whileInView={{ opacity: 1, x: 0 }}
								viewport={{ once: true }}
								transition={{ delay: i * 0.1, type: "spring" }}
								whileHover={{ y: -10, scale: 1.02 }}
								className='group relative bg-white/90 backdrop-blur-md border border-amber-200/50 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer'
							>
								<motion.div
									className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
									initial={{ x: "-100%" }}
									whileHover={{ x: "100%" }}
									transition={{ duration: 0.5 }}
								/>
								<motion.div
									whileHover={{ rotate: 360, scale: 1.1 }}
									transition={{ duration: 0.6 }}
									className="w-14 h-14 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center mb-5 shadow-lg group-hover:shadow-xl transition-all"
								>
									<feature.icon size={28} className="text-white" />
								</motion.div>
								<h3 className='text-xl font-bold text-slate-800 mb-3'>{feature.title}</h3>
								<p className='text-slate-500 leading-relaxed'>{feature.description}</p>
							</motion.div>
						))}
					</motion.div>

					{/* How It Works with Luxury Timeline */}
					<motion.div 
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
						viewport={{ once: true }}
						className='mb-24'
					>
						<motion.h2 
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							className='text-center text-5xl font-bold text-slate-900 mb-4'
						>
							The <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-amber-500">Luxury Experience</span>
						</motion.h2>
						<motion.p 
							initial={{ opacity: 0 }}
							whileInView={{ opacity: 1 }}
							className='text-center text-slate-500 mb-16 text-lg font-light'
						>
							Four steps to exceptional style
						</motion.p>
						
						<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8'>
							{howItWorks.map((item, i) => (
								<motion.div
									key={item.step}
									initial={{ opacity: 0, y: 50 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true }}
									transition={{ delay: i * 0.15, type: "spring" }}
									whileHover={{ y: -10 }}
									className='relative group'
								>
									<motion.div 
										className="absolute -inset-0.5 bg-gradient-to-r from-amber-500 to-amber-600 rounded-2xl blur opacity-0 group-hover:opacity-75 transition duration-500"
										animate={{ scale: [1, 1.05, 1] }}
										transition={{ duration: 2, repeat: Infinity }}
									/>
									<div className='relative bg-white rounded-2xl p-8 shadow-lg'>
										<motion.div
											animate={{ rotate: [0, 10, -10, 0] }}
											transition={{ delay: i * 0.2, duration: 0.5, repeat: Infinity, repeatDelay: 3 }}
											className="absolute -top-3 -right-3 w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg"
										>
											{item.step}
										</motion.div>
										<motion.div 
											whileHover={{ rotate: 360 }}
											transition={{ duration: 0.6 }}
											className='w-14 h-14 bg-gradient-to-br from-amber-100 to-amber-200 rounded-xl flex items-center justify-center mx-auto mb-5'
										>
											<item.icon size={28} className="text-amber-600" />
										</motion.div>
										<h3 className='font-bold text-xl text-slate-800 mb-3 text-center'>{item.title}</h3>
										<p className='text-slate-500 text-center leading-relaxed'>{item.description}</p>
									</div>
								</motion.div>
							))}
						</div>
					</motion.div>

					{/* Categories Section with 3D Hover Effect */}
					<div ref={categoriesRef} className='mb-24 scroll-mt-24'>
						<motion.h2 
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							className='text-center text-5xl font-bold text-slate-900 mb-4'
						>
							Curated <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-amber-500">Collections</span>
						</motion.h2>
						<motion.p 
							initial={{ opacity: 0 }}
							whileInView={{ opacity: 1 }}
							className='text-center text-slate-500 mb-16 text-lg font-light'
						>
							Discover our exclusive designer categories
						</motion.p>
						
						<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
							{categories.map((category, index) => (
								<motion.div
									key={category.name}
									initial={{ opacity: 0, scale: 0.8 }}
									whileInView={{ opacity: 1, scale: 1 }}
									viewport={{ once: true }}
									transition={{ delay: index * 0.1 }}
									whileHover={{ scale: 1.03, rotateY: 5 }}
									style={{ transformStyle: "preserve-3d" }}
								>
									<CategoryItem category={category} key={category.name} />
								</motion.div>
							))}
						</div>
					</div>

					{/* Featured Products with Carousel Animation */}
					{!isLoading && products.length > 0 && (
						<motion.div 
							initial={{ opacity: 0 }}
							whileInView={{ opacity: 1 }}
							viewport={{ once: true }}
							className='mb-24'
						>
							<motion.h2 
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								className='text-center text-5xl font-bold text-slate-900 mb-4'
							>
								Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-amber-500">Masterpieces</span>
							</motion.h2>
							<motion.p 
								initial={{ opacity: 0 }}
								whileInView={{ opacity: 1 }}
								className='text-center text-slate-500 mb-16 text-lg font-light'
							>
								Handpicked luxury items for the discerning connoisseur
							</motion.p>
							
							<FeaturedProducts featuredProducts={products} />
							
							<motion.div 
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								className='text-center mt-12'
							>
								<motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
									<Link
										to='/jackets'
										className='group inline-flex items-center gap-3 bg-gradient-to-r from-amber-600 to-amber-500 text-white px-8 py-4 rounded-full font-semibold transition shadow-xl hover:shadow-2xl'
									>
										View Entire Collection 
										<ArrowRight size={20} className='group-hover:translate-x-2 transition-transform' />
									</Link>
								</motion.div>
							</motion.div>
						</motion.div>
					)}

					{/* Testimonials with 3D Flip Effect */}
					<motion.div 
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
						viewport={{ once: true }}
						className='mb-24'
					>
						<motion.h2 
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							className='text-center text-5xl font-bold text-slate-900 mb-4'
						>
							Client <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-amber-500">Testimonials</span>
						</motion.h2>
						<motion.p 
							initial={{ opacity: 0 }}
							whileInView={{ opacity: 1 }}
							className='text-center text-slate-500 mb-16 text-lg font-light'
						>
							What our discerning clients say
						</motion.p>
						
						<div className='grid md:grid-cols-3 gap-8'>
							{testimonials.map((t, i) => (
								<motion.div
									key={t.name}
									initial={{ opacity: 0, rotateY: 90 }}
									whileInView={{ opacity: 1, rotateY: 0 }}
									viewport={{ once: true }}
									transition={{ delay: i * 0.2, duration: 0.6, type: "spring" }}
									whileHover={{ y: -10 }}
									className='group perspective'
								>
									<div className='relative bg-white/90 backdrop-blur-md border border-amber-200/50 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500'>
										<motion.div
											animate={{ rotate: [0, 10, -10, 0] }}
											transition={{ duration: 2, repeat: Infinity, repeatDelay: 5 }}
											className="absolute -top-4 -left-4"
										>
											<Quote size={32} className="text-amber-400 opacity-50" />
										</motion.div>
										<p className='text-slate-600 text-base leading-relaxed mb-6 italic'>"{t.text}"</p>
										<div className='flex items-center gap-1 mb-3'>
											{Array.from({ length: t.rating }).map((_, j) => (
												<motion.div
													key={j}
													initial={{ scale: 0 }}
													whileInView={{ scale: 1 }}
													transition={{ delay: i * 0.2 + j * 0.1 }}
												>
													<Star size={18} className='text-amber-400 fill-amber-400' />
												</motion.div>
											))}
										</div>
										<p className='font-bold text-slate-800 text-lg'>{t.name}</p>
										<p className='text-sm text-amber-600 font-medium'>{t.location}</p>
									</div>
								</motion.div>
							))}
						</div>
					</motion.div>

					{/* Luxury Newsletter with Animated Background */}
					<motion.div 
						initial={{ opacity: 0, scale: 0.9 }}
						whileInView={{ opacity: 1, scale: 1 }}
						viewport={{ once: true }}
						className='mb-24 relative overflow-hidden'
					>
						<motion.div 
							className="absolute inset-0 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 rounded-3xl"
							animate={{ 
								backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
							}}
							transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
							style={{ backgroundSize: "200% 200%" }}
						/>
						
						<div className='relative rounded-3xl p-12 sm:p-16 text-center text-white overflow-hidden'>
							<motion.div
								animate={{ y: [0, -10, 0] }}
								transition={{ duration: 2, repeat: Infinity }}
								className='inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-2xl mb-6 backdrop-blur-sm'
							>
								<Gift size={40} />
							</motion.div>
							
							<motion.h2 
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								className='text-4xl font-bold mb-4'
							>
								Join the Luxury Circle
							</motion.h2>
							
							<motion.p 
								initial={{ opacity: 0 }}
								whileInView={{ opacity: 1 }}
								className='text-amber-100 mb-8 max-w-lg mx-auto text-lg'
							>
								Be first to experience exclusive drops, private sales, and receive a 15% welcome gift
							</motion.p>
							
							<form onSubmit={handleNewsletter} className='flex flex-col sm:flex-row gap-4 max-w-md mx-auto'>
								<motion.input
									whileFocus={{ scale: 1.02 }}
									type='email'
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									placeholder='Enter your email address'
									required
									disabled={subscribing}
									className='flex-1 px-6 py-4 rounded-full text-slate-800 focus:outline-none focus:ring-2 focus:ring-white/50 disabled:opacity-60 bg-white/90 backdrop-blur-sm'
								/>
								<motion.button
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
									type='submit'
									disabled={subscribing}
									className='bg-white text-amber-600 hover:bg-amber-50 disabled:opacity-60 px-8 py-4 rounded-full font-semibold transition shadow-lg whitespace-nowrap'
								>
									{subscribing ? "Subscribing..." : "Subscribe Now"}
								</motion.button>
							</form>
							
							<p className='text-xs text-amber-200 mt-6'>✓ No spam, unsubscribe anytime ✓ Exclusive member benefits</p>
						</div>
					</motion.div>

					{/* Dual CTA Section */}
					<div className='grid md:grid-cols-2 gap-8'>
						<motion.div
							initial={{ opacity: 0, x: -50 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true }}
							whileHover={{ y: -5 }}
							className='bg-white/90 backdrop-blur-md border border-amber-200/50 rounded-2xl p-10 shadow-xl hover:shadow-2xl transition-all duration-500'
						>
							<motion.div
								whileHover={{ rotate: 360 }}
								transition={{ duration: 0.6 }}
								className='inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl mb-5'
							>
								<Crown size={28} className="text-white" />
							</motion.div>
							<h3 className='text-2xl font-bold text-slate-800 mb-3'>Become a Member</h3>
							<p className='text-slate-500 leading-relaxed mb-6'>
								Enjoy priority access, exclusive previews, and a personal stylist. 
								Plus, receive 10% off your first purchase.
							</p>
							<motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
								<Link
									to='/signup'
									className='inline-flex items-center gap-2 bg-gradient-to-r from-amber-600 to-amber-500 text-white px-8 py-3.5 rounded-full font-semibold transition shadow-lg hover:shadow-xl'
								>
									Join Now <ArrowRight size={18} />
								</Link>
							</motion.div>
						</motion.div>

						<motion.div
							initial={{ opacity: 0, x: 50 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true }}
							whileHover={{ y: -5 }}
							className='bg-white/90 backdrop-blur-md border border-amber-200/50 rounded-2xl p-10 shadow-xl hover:shadow-2xl transition-all duration-500'
						>
							<motion.div
								whileHover={{ rotate: 360 }}
								transition={{ duration: 0.6 }}
								className='inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl mb-5'
							>
								<Compass size={28} className="text-white" />
							</motion.div>
							<h3 className='text-2xl font-bold text-slate-800 mb-3'>Concierge Service</h3>
							<p className='text-slate-500 leading-relaxed mb-6'>
								Need assistance? Our luxury concierge team is available 24/7 to help with 
								any request, big or small.
							</p>
							<div className='flex flex-wrap gap-4'>
								<motion.div whileHover={{ scale: 1.05 }}>
									<Link to='/faq' className='text-amber-600 font-semibold hover:text-amber-500 transition'>
										View FAQ →
									</Link>
								</motion.div>
								<motion.div whileHover={{ scale: 1.05 }}>
									<Link to='/contact' className='text-amber-600 font-semibold hover:text-amber-500 transition'>
										Contact Concierge →
									</Link>
								</motion.div>
							</div>
						</motion.div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default HomePage;