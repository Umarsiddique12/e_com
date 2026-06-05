import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { create } from 'zustand';

// ==================== PRODUCT STORE ====================
const useProductStore = create((set) => ({
  products: [],
  isLoading: false,
  error: null,
  
  fetchProductsByCategory: async (category) => {
    set({ isLoading: true, error: null });
    try {
      // Replace with your actual API endpoint
      const response = await fetch(`/api/products/category/${category}`);
      if (!response.ok) throw new Error('Failed to fetch products');
      const data = await response.json();
      set({ products: data, isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },
}));

// ==================== PRODUCT CARD COMPONENT ====================
const ProductCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      className='bg-white/10 backdrop-blur-lg rounded-2xl overflow-hidden shadow-2xl border border-white/20 w-full max-w-sm'
      whileHover={{ y: -10 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className='relative h-64 overflow-hidden'>
        <motion.img
          src={product.image || 'https://via.placeholder.com/300'}
          alt={product.name}
          className='w-full h-full object-cover'
          animate={{ scale: isHovered ? 1.1 : 1 }}
          transition={{ duration: 0.3 }}
        />
        <div className='absolute inset-0 bg-gradient-to-t from-black/50 to-transparent' />
      </div>
      
      <div className='p-5'>
        <h3 className='text-xl font-bold text-white mb-2'>{product.name}</h3>
        <p className='text-gray-300 text-sm mb-3 line-clamp-2'>{product.description}</p>
        <div className='flex justify-between items-center'>
          <span className='text-2xl font-bold text-purple-400'>${product.price}</span>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className='px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full text-sm font-semibold shadow-lg'
          >
            Buy Now
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

// ==================== MAIN CATEGORY PAGE ====================
const CategoryPage = () => {
	const { fetchProductsByCategory, products, isLoading } = useProductStore();
	const { category } = useParams();
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
	const [scrolled, setScrolled] = useState(false);
	const containerRef = useRef(null);
	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ["start start", "end start"]
	});

	// Parallax effects
	const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
	const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

	useEffect(() => {
		fetchProductsByCategory(category);
	}, [fetchProductsByCategory, category]);

	useEffect(() => {
		const handleMouseMove = (e) => {
			setMousePosition({ x: e.clientX, y: e.clientY });
		};
		const handleScroll = () => {
			setScrolled(window.scrollY > 50);
		};
		
		window.addEventListener("mousemove", handleMouseMove);
		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("mousemove", handleMouseMove);
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	// Animated particles data
	const particles = Array.from({ length: 100 }, (_, i) => ({
		id: i,
		x: Math.random() * 100,
		y: Math.random() * 100,
		duration: Math.random() * 15 + 10,
		delay: Math.random() * 5,
		size: Math.random() * 4 + 1,
		rotation: Math.random() * 360,
	}));

	// Floating images data
	const floatingImages = [
		{ id: 1, emoji: "🛍️", x: "10%", y: "20%", size: "60px", delay: 0 },
		{ id: 2, emoji: "🎁", x: "85%", y: "15%", size: "50px", delay: 2 },
		{ id: 3, emoji: "✨", x: "15%", y: "70%", size: "40px", delay: 4 },
		{ id: 4, emoji: "💎", x: "90%", y: "60%", size: "55px", delay: 1 },
		{ id: 5, emoji: "🏷️", x: "50%", y: "85%", size: "45px", delay: 3 },
		{ id: 6, emoji: "⭐", x: "75%", y: "40%", size: "35px", delay: 2.5 },
		{ id: 7, emoji: "🔥", x: "25%", y: "45%", size: "50px", delay: 1.5 },
		{ id: 8, emoji: "💝", x: "60%", y: "10%", size: "45px", delay: 3.5 },
	];

	// Background images array for slideshow
	const bgImages = [
		"https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070",
		"https://images.unsplash.com/photo-1601924582970-9238bcb495d9?q=80&w=2070",
		"https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070",
		"https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=2070",
	];

	return (
		<div ref={containerRef} className='relative min-h-screen overflow-hidden'>
			{/* Background Slideshow */}
			<AnimatePresence mode="wait">
				<motion.div
					key={category}
					className='fixed inset-0 z-0'
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 1 }}
				>
					{/* Main Background Image */}
					<div 
						className='absolute inset-0 bg-cover bg-center bg-fixed'
						style={{
							backgroundImage: `url(${bgImages[Math.floor(Math.random() * bgImages.length)]})`,
							transform: `scale(${scrolled ? 1.1 : 1})`,
							transition: 'transform 0.3s ease-out'
						}}
					/>
					
					{/* Multiple Gradient Overlays */}
					<div className='absolute inset-0 bg-gradient-to-br from-black/70 via-purple-900/50 to-black/70' />
					<div className='absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40' />
					<div className='absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-purple-500/20 to-black/60' />
					
					{/* Animated Pattern Overlay */}
					<div className='absolute inset-0 opacity-30'>
						<div className='absolute inset-0' style={{
							backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C27B0' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
							backgroundRepeat: 'repeat',
							animation: 'slide 20s linear infinite'
						}} />
					</div>
					
					{/* Animated Diagonal Lines */}
					<div className='absolute inset-0 overflow-hidden'>
						<div className='absolute inset-0' style={{
							backgroundImage: 'repeating-linear-gradient(45deg, rgba(255,255,255,0.05) 0px, rgba(255,255,255,0.05) 2px, transparent 2px, transparent 8px)',
							animation: 'moveLines 10s linear infinite'
						}} />
					</div>
				</motion.div>
			</AnimatePresence>

			{/* Parallax Floating Elements */}
			<motion.div style={{ y, opacity }} className='fixed inset-0 pointer-events-none z-0'>
				{/* Floating Images/Emojis */}
				{floatingImages.map((item) => (
					<motion.div
						key={item.id}
						className='absolute filter drop-shadow-2xl'
						style={{
							left: item.x,
							top: item.y,
							fontSize: item.size,
						}}
						animate={{
							y: [0, -30, 0],
							x: [0, 20, 0],
							rotate: [0, 10, -10, 0],
							scale: [1, 1.2, 1],
						}}
						transition={{
							duration: 6,
							delay: item.delay,
							repeat: Infinity,
							ease: "easeInOut",
						}}
					>
						{item.emoji}
					</motion.div>
				))}

				{/* Animated Particles with Images */}
				{particles.map((particle) => (
					<motion.div
						key={particle.id}
						className='absolute rounded-full'
						style={{
							left: `${particle.x}%`,
							top: `${particle.y}%`,
							width: `${particle.size * 2}px`,
							height: `${particle.size * 2}px`,
							background: `radial-gradient(circle, rgba(168,85,247,0.4) 0%, rgba(236,72,153,0.2) 100%)`,
							boxShadow: '0 0 10px rgba(168,85,247,0.3)',
						}}
						animate={{
							y: [0, -50, 0],
							x: [0, 30, -20, 0],
							scale: [1, 1.5, 1],
							opacity: [0.2, 0.6, 0.2],
							rotate: [0, particle.rotation],
						}}
						transition={{
							duration: particle.duration,
							delay: particle.delay,
							repeat: Infinity,
							ease: "easeInOut",
						}}
					/>
				))}

				{/* Glowing Orbs */}
				<motion.div
					className='absolute w-96 h-96 rounded-full bg-purple-600/20 blur-3xl'
					animate={{
						x: [0, 100, 0],
						y: [0, 50, 0],
						scale: [1, 1.2, 1],
					}}
					transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
					style={{ left: '10%', top: '20%' }}
				/>
				<motion.div
					className='absolute w-[500px] h-[500px] rounded-full bg-pink-600/20 blur-3xl'
					animate={{
						x: [0, -80, 0],
						y: [0, -60, 0],
						scale: [1, 1.3, 1],
					}}
					transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
					style={{ right: '5%', bottom: '10%' }}
				/>
			</motion.div>

			{/* Mouse Follower */}
			<motion.div
				className='fixed pointer-events-none z-20'
				animate={{
					x: mousePosition.x - 150,
					y: mousePosition.y - 150,
				}}
				transition={{ type: "spring", damping: 20, stiffness: 150 }}
			>
				<div className='w-[300px] h-[300px] rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 blur-2xl' />
				<div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-white/5 blur-xl' />
			</motion.div>

			{/* Main Content */}
			<div className='relative z-10 max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16'>
				{/* Category Header with Advanced Animation */}
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.5 }}
					className='text-center mb-12 relative'
				>
					{/* Decorative Circles */}
					<motion.div
						className='absolute left-1/2 -translate-x-1/2 -top-20 w-64 h-64 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-3xl'
						animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
						transition={{ duration: 4, repeat: Infinity }}
					/>
					
					<motion.div
						className='inline-block mb-4'
						animate={{ 
							rotate: [0, 360],
							scale: [1, 1.2, 1]
						}}
						transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
					>
						<span className='text-7xl sm:text-8xl block filter drop-shadow-2xl'>
							🎯
						</span>
					</motion.div>

					<motion.h1
						className='text-5xl sm:text-7xl lg:text-8xl font-extrabold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent tracking-tight'
						initial={{ opacity: 0, y: -50 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
						whileHover={{ scale: 1.05 }}
					>
						{category?.charAt(0).toUpperCase() + category?.slice(1)}
					</motion.h1>

					<motion.div
						className='h-1 w-32 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 mx-auto rounded-full mb-6'
						initial={{ width: 0 }}
						animate={{ width: 128 }}
						transition={{ duration: 0.8, delay: 0.3 }}
					/>

					<motion.p
						className='text-gray-200 text-lg sm:text-xl max-w-2xl mx-auto'
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.8, delay: 0.5 }}
					>
						Discover the finest collection of {category} curated just for you
					</motion.p>

					{/* Animated Stats */}
					<motion.div
						className='flex justify-center gap-8 mt-8'
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.7 }}
					>
						<div className='text-center'>
							<motion.div 
								className='text-2xl font-bold text-purple-400'
								animate={{ scale: [1, 1.1, 1] }}
								transition={{ duration: 2, repeat: Infinity }}
							>
								{products?.length || 0}
							</motion.div>
							<div className='text-sm text-gray-300'>Products</div>
						</div>
						<div className='text-center'>
							<div className='text-2xl font-bold text-pink-400'>✨</div>
							<div className='text-sm text-gray-300'>Premium Quality</div>
						</div>
						<div className='text-center'>
							<div className='text-2xl font-bold text-purple-400'>🚚</div>
							<div className='text-sm text-gray-300'>Free Shipping</div>
						</div>
					</motion.div>
				</motion.div>

				{/* Loading State with Animated Background */}
				<AnimatePresence>
					{isLoading && (
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							className='flex flex-col justify-center items-center py-32'
						>
							<div className='relative'>
								<motion.div
									className='w-24 h-24 border-4 border-purple-500 border-t-transparent rounded-full'
									animate={{ rotate: 360 }}
									transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
								/>
								<motion.div
									className='absolute inset-0 w-24 h-24 border-4 border-pink-500 border-b-transparent rounded-full'
									animate={{ rotate: -360 }}
									transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
								/>
								<motion.div
									className='absolute inset-2 w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-xl'
									animate={{ scale: [1, 1.2, 1] }}
									transition={{ duration: 1, repeat: Infinity }}
								/>
							</div>
							<motion.p
								className='mt-8 text-gray-200 text-lg'
								animate={{ opacity: [0.5, 1, 0.5] }}
								transition={{ duration: 1.5, repeat: Infinity }}
							>
								Loading amazing products...
							</motion.p>
						</motion.div>
					)}
				</AnimatePresence>

				{/* Products Grid with Stagger Animation */}
				<AnimatePresence mode="wait">
					{!isLoading && (
						<motion.div
							key={category}
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.5 }}
							className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8 justify-items-center'
						>
							{products?.length === 0 ? (
								<motion.div
									initial={{ opacity: 0, scale: 0.9 }}
									animate={{ opacity: 1, scale: 1 }}
									exit={{ opacity: 0 }}
									className='col-span-full text-center py-20'
								>
									<motion.div
										animate={{ 
											y: [0, -20, 0],
											rotate: [0, 10, -10, 0]
										}}
										transition={{ duration: 3, repeat: Infinity }}
										className='text-8xl mb-6'
									>
										🔍
									</motion.div>
									<h2 className='text-3xl sm:text-4xl font-bold text-gray-200 mb-4'>
										No products found
									</h2>
									<p className='text-gray-300 text-lg'>
										Be the first to explore this category soon!
									</p>
									<motion.button
										whileHover={{ scale: 1.05 }}
										whileTap={{ scale: 0.95 }}
										onClick={() => window.location.href = '/'}
										className='mt-8 px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-semibold shadow-lg'
									>
										Continue Shopping
									</motion.button>
								</motion.div>
							) : (
								products?.map((product, index) => (
									<motion.div
										key={product._id}
										initial={{ opacity: 0, y: 50 }}
										animate={{ opacity: 1, y: 0 }}
										exit={{ opacity: 0, scale: 0.8 }}
										transition={{ 
											duration: 0.5, 
											delay: index * 0.1,
											type: "spring",
											stiffness: 100
										}}
										whileHover={{ 
											scale: 1.05,
											transition: { duration: 0.2 }
										}}
										className='w-full'
									>
										<ProductCard product={product} />
									</motion.div>
								))
							)}
						</motion.div>
					)}
				</AnimatePresence>
			</div>

			{/* Animated Back to Top Button */}
			<AnimatePresence>
				{scrolled && (
					<motion.button
						initial={{ opacity: 0, scale: 0 }}
						animate={{ opacity: 1, scale: 1 }}
						exit={{ opacity: 0, scale: 0 }}
						whileHover={{ scale: 1.1 }}
						whileTap={{ scale: 0.9 }}
						onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
						className='fixed bottom-8 right-8 z-20 group'
					>
						<div className='absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-lg group-hover:blur-xl transition-all' />
						<div className='relative bg-gradient-to-r from-purple-500 to-pink-500 text-white p-3 rounded-full shadow-2xl'>
							<svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
								<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 10l7-7m0 0l7 7m-7-7v18' />
							</svg>
						</div>
					</motion.button>
				)}
			</AnimatePresence>

			{/* CSS Animations */}
			<style jsx>{`
				@keyframes slide {
					0% {
						transform: translate(0, 0);
					}
					100% {
						transform: translate(60px, 60px);
					}
				}
				@keyframes moveLines {
					0% {
						transform: translate(0, 0);
					}
					100% {
						transform: translate(50px, 50px);
					}
				}
			`}</style>
		</div>
	);
};

export default CategoryPage;