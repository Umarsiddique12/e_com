import { BarChart, PlusCircle, ShoppingBasket, Gift, Crown, Sparkles, TrendingUp, Users, DollarSign } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import AnalyticsTab from "../components/AnalyticsTab";
import CreateCouponForm from "../components/CreateCouponForm";
import CreateProductForm from "../components/CreateProductForm";
import ProductsList from "../components/ProductsList";
import { useProductStore } from "../stores/useProductStore";

const tabs = [
	{ id: "create", label: "Create Product", icon: PlusCircle, gradient: "from-amber-500 to-amber-600", description: "Add new luxury items" },
	{ id: "coupons", label: "Create Coupon", icon: Gift, gradient: "from-amber-500 to-amber-600", description: "Manage promotions" },
	{ id: "products", label: "Products", icon: ShoppingBasket, gradient: "from-amber-500 to-amber-600", description: "Manage inventory" },
	{ id: "analytics", label: "Analytics", icon: BarChart, gradient: "from-amber-500 to-amber-600", description: "Track performance" },
];

// Stats cards for admin overview
const adminStats = [
	{ label: "Total Products", value: "2,847", change: "+12%", icon: ShoppingBasket, color: "from-amber-500 to-amber-600" },
	{ label: "Active Coupons", value: "24", change: "+5%", icon: Gift, color: "from-amber-500 to-amber-600" },
	{ label: "Revenue", value: "$84.2K", change: "+23%", icon: DollarSign, color: "from-amber-500 to-amber-600" },
	{ label: "Active Users", value: "12.5K", change: "+18%", icon: Users, color: "from-amber-500 to-amber-600" },
];

const AdminPage = () => {
	const [activeTab, setActiveTab] = useState("create");
	const [hoveredTab, setHoveredTab] = useState(null);
	const { fetchAllProducts } = useProductStore();

	useEffect(() => {
		fetchAllProducts();
	}, [fetchAllProducts]);

	// Floating particles for admin page
	const particles = Array.from({ length: 30 }, (_, i) => ({
		id: i,
		x: Math.random() * 100,
		y: Math.random() * 100,
		duration: 4 + Math.random() * 8,
		delay: Math.random() * 3,
	}));

	return (
		<div className='min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-amber-50/30'>
			{/* Animated Background Particles */}
			<div className="fixed inset-0 pointer-events-none overflow-hidden">
				{particles.map((particle) => (
					<motion.div
						key={particle.id}
						className="absolute w-1 h-1 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full opacity-30"
						initial={{ x: `${particle.x}%`, y: `${particle.y}%` }}
						animate={{
							y: ["0%", "100%", "0%"],
							x: [`${particle.x}%`, `${particle.x + 5}%`, `${particle.x}%`],
							opacity: [0.3, 0.6, 0.3],
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

			{/* Decorative Gradients */}
			<div className="absolute top-0 right-0 w-96 h-96 bg-amber-300/20 rounded-full blur-3xl animate-pulse" />
			<div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-300/20 rounded-full blur-3xl animate-pulse delay-1000" />

			<div className='relative z-10 container mx-auto px-4 py-12'>
				{/* Header with Animation */}
				<motion.div
					initial={{ opacity: 0, y: -30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, type: "spring" }}
					className='text-center mb-12'
				>
					<div className="inline-flex items-center justify-center gap-3 mb-4">
						<motion.div
							animate={{ rotate: 360 }}
							transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
						>
							<Crown size={40} className="text-amber-500" />
						</motion.div>
						<motion.h1
							className='text-5xl sm:text-6xl font-bold bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 bg-clip-text text-transparent tracking-tight'
							animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
							transition={{ duration: 5, repeat: Infinity }}
							style={{ backgroundSize: "200% auto" }}
						>
							Admin Dashboard
						</motion.h1>
						<motion.div
							animate={{ rotate: -360 }}
							transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
						>
							<Crown size={40} className="text-amber-500" />
						</motion.div>
					</div>
					
					<motion.p
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.3 }}
						className='text-slate-500 text-lg font-light'
					>
						Manage your luxury e-commerce empire with precision and style
					</motion.p>
				</motion.div>

				{/* Stats Overview Cards */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.2 }}
					className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12'
				>
					{adminStats.map((stat, index) => (
						<motion.div
							key={stat.label}
							initial={{ opacity: 0, scale: 0.9 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ delay: 0.3 + index * 0.1, type: "spring" }}
							whileHover={{ y: -5, scale: 1.02 }}
							className='relative group'
						>
							<div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500 to-amber-600 rounded-2xl blur opacity-0 group-hover:opacity-75 transition duration-500" />
							<div className='relative bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-amber-200/50'>
								<div className='flex items-center justify-between mb-4'>
									<motion.div
										whileHover={{ rotate: 360 }}
										transition={{ duration: 0.6 }}
										className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center shadow-lg`}
									>
										<stat.icon size={24} className="text-white" />
									</motion.div>
									<motion.span
										initial={{ scale: 0 }}
										animate={{ scale: 1 }}
										transition={{ delay: 0.5 + index * 0.1 }}
										className="text-sm font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full"
									>
										{stat.change}
									</motion.span>
								</div>
								<h3 className='text-2xl font-bold text-slate-800'>{stat.value}</h3>
								<p className='text-slate-500 text-sm font-medium'>{stat.label}</p>
							</div>
						</motion.div>
					))}
				</motion.div>

				{/* Luxury Tabs Navigation */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.4 }}
					className='flex justify-center mb-12'
				>
					<div className='inline-flex flex-wrap justify-center gap-4 p-2 bg-white/50 backdrop-blur-sm rounded-2xl border border-amber-200/50 shadow-lg'>
						{tabs.map((tab, index) => (
							<motion.button
								key={tab.id}
								onClick={() => setActiveTab(tab.id)}
								onHoverStart={() => setHoveredTab(tab.id)}
								onHoverEnd={() => setHoveredTab(null)}
								initial={{ opacity: 0, scale: 0.8 }}
								animate={{ opacity: 1, scale: 1 }}
								transition={{ delay: 0.5 + index * 0.1 }}
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
								className={`relative group px-6 py-3 rounded-xl font-semibold transition-all duration-300 overflow-hidden ${
									activeTab === tab.id
										? "text-white"
										: "text-slate-600 hover:text-amber-600"
								}`}
							>
								{activeTab === tab.id && (
									<motion.div
										layoutId="activeTab"
										className="absolute inset-0 bg-gradient-to-r from-amber-600 to-amber-500 rounded-xl"
										transition={{ type: "spring", duration: 0.6 }}
									/>
								)}
								<div className="relative z-10 flex items-center gap-2">
									<motion.div
										animate={hoveredTab === tab.id ? { rotate: 360 } : { rotate: 0 }}
										transition={{ duration: 0.6 }}
									>
										<tab.icon size={20} />
									</motion.div>
									<span>{tab.label}</span>
									{activeTab === tab.id && (
										<motion.span
											initial={{ scale: 0 }}
											animate={{ scale: 1 }}
											className="absolute -top-1 -right-1"
										>
											<Sparkles size={12} className="text-white" />
										</motion.span>
									)}
								</div>
							</motion.button>
						))}
					</div>
				</motion.div>

				{/* Tab Content with Animated Transitions */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.6 }}
					className='relative'
				>
					<div className='absolute inset-0 bg-gradient-to-r from-amber-500/5 to-amber-600/5 rounded-3xl blur-3xl' />
					
					<AnimatePresence mode="wait">
						{activeTab === "create" && (
							<motion.div
								key="create"
								initial={{ opacity: 0, x: -20 }}
								animate={{ opacity: 1, x: 0 }}
								exit={{ opacity: 0, x: 20 }}
								transition={{ duration: 0.4, type: "spring" }}
							>
								<div className="relative">
									<div className="absolute -top-4 -left-4 w-20 h-20 bg-amber-500/10 rounded-full blur-xl" />
									<CreateProductForm />
								</div>
							</motion.div>
						)}

						{activeTab === "coupons" && (
							<motion.div
								key="coupons"
								initial={{ opacity: 0, x: -20 }}
								animate={{ opacity: 1, x: 0 }}
								exit={{ opacity: 0, x: 20 }}
								transition={{ duration: 0.4, type: "spring" }}
							>
								<div className="relative">
									<div className="absolute -top-4 -right-4 w-20 h-20 bg-amber-500/10 rounded-full blur-xl" />
									<CreateCouponForm />
								</div>
							</motion.div>
						)}

						{activeTab === "products" && (
							<motion.div
								key="products"
								initial={{ opacity: 0, x: -20 }}
								animate={{ opacity: 1, x: 0 }}
								exit={{ opacity: 0, x: 20 }}
								transition={{ duration: 0.4, type: "spring" }}
							>
								<div className="relative">
									<div className="absolute -bottom-4 -left-4 w-20 h-20 bg-amber-500/10 rounded-full blur-xl" />
									<ProductsList />
								</div>
							</motion.div>
						)}

						{activeTab === "analytics" && (
							<motion.div
								key="analytics"
								initial={{ opacity: 0, x: -20 }}
								animate={{ opacity: 1, x: 0 }}
								exit={{ opacity: 0, x: 20 }}
								transition={{ duration: 0.4, type: "spring" }}
							>
								<div className="relative">
									<div className="absolute -bottom-4 -right-4 w-20 h-20 bg-amber-500/10 rounded-full blur-xl" />
									<AnalyticsTab />
								</div>
							</motion.div>
						)}
					</AnimatePresence>
				</motion.div>

				{/* Footer Note */}
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.8 }}
					className="text-center mt-12 pt-8 border-t border-amber-200/50"
				>
					<p className="text-sm text-slate-400 flex items-center justify-center gap-2">
						<Sparkles size={14} />
						Luxury Admin Dashboard • Secure Management • Real-time Analytics
						<Sparkles size={14} />
					</p>
				</motion.div>
			</div>
		</div>
	);
};

export default AdminPage;