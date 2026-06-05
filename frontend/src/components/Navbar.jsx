import { useState, useEffect } from "react";
import { ShoppingCart, UserPlus, LogIn, LogOut, Lock, Zap, User, ChevronDown, Menu, X, Crown, Sparkles, Heart, Search } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";

const shopCategories = [
	{ to: "/jeans", label: "Jeans", icon: "👖" },
	{ to: "/t-shirts", label: "T-Shirts", icon: "👕" },
	{ to: "/shoes", label: "Shoes", icon: "👟" },
	{ to: "/glasses", label: "Glasses", icon: "👓" },
	{ to: "/jackets", label: "Jackets", icon: "🧥" },
	{ to: "/suits", label: "Suits", icon: "👔" },
	{ to: "/bags", label: "Bags", icon: "👜" },
];

const Navbar = () => {
	const { user, logout } = useUserStore();
	const isAdmin = user?.role === "admin";
	const { cart } = useCartStore();
	const [shopOpen, setShopOpen] = useState(false);
	const [mobileOpen, setMobileOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);
	const location = useLocation();

	useEffect(() => {
		const handleScroll = () => {
			setScrolled(window.scrollY > 20);
		};
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	// Close mobile menu on route change
	useEffect(() => {
		setMobileOpen(false);
	}, [location]);

	const cartItemCount = cart?.length || 0;

	return (
		<>
			{/* Top Bar */}
			<div className='hidden md:block bg-gray-900 text-white text-xs py-2'>
				<div className='container mx-auto px-4 flex justify-between items-center'>
					<div className='flex items-center gap-4'>
						<span className='flex items-center gap-1'>
							<Sparkles size={12} />
							Free shipping on orders $50+
						</span>
						<span className='flex items-center gap-1'>
							<Crown size={12} />
							Luxury concierge 24/7
						</span>
					</div>
					<div className='flex items-center gap-4'>
						<Link to='/contact' className='hover:text-gray-300 transition'>Support</Link>
						<Link to='/returns' className='hover:text-gray-300 transition'>Returns</Link>
						<Link to='/faq' className='hover:text-gray-300 transition'>FAQ</Link>
					</div>
				</div>
			</div>

			{/* Main Navbar */}
			<header className={`fixed top-0 left-0 w-full bg-white z-40 transition-all duration-300 ${
				scrolled ? 'shadow-lg border-b border-gray-100' : 'shadow-sm border-b border-gray-100/50'
			}`}>
				<div className='container mx-auto px-4 py-3 md:py-4'>
					<div className='flex justify-between items-center'>
						{/* Logo */}
						<Link to='/' className='flex items-center gap-2 group'>
							<div className='w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center group-hover:bg-gray-800 transition-colors'>
								<Zap size={18} className='text-white' />
							</div>
							<span className='text-xl font-bold text-gray-900 group-hover:text-gray-700 transition'>
								StyleHub
							</span>
						</Link>

						{/* Desktop Navigation */}
						<nav className='hidden lg:flex items-center gap-6'>
							<Link 
								to='/' 
								className={`text-gray-600 hover:text-gray-900 font-medium transition-colors ${
									location.pathname === '/' ? 'text-gray-900' : ''
								}`}
							>
								Home
							</Link>

							{/* Shop Dropdown */}
							<div 
								className='relative'
								onMouseEnter={() => setShopOpen(true)}
								onMouseLeave={() => setShopOpen(false)}
							>
								<button 
									className={`flex items-center gap-1 text-gray-600 hover:text-gray-900 font-medium transition-colors ${
										shopCategories.some(cat => location.pathname === cat.to) ? 'text-gray-900' : ''
									}`}
								>
									Shop 
									<ChevronDown size={16} className={`transition-transform duration-300 ${shopOpen ? "rotate-180" : ""}`} />
								</button>
								
								<AnimatePresence>
									{shopOpen && (
										<motion.div
											initial={{ opacity: 0, y: -10 }}
											animate={{ opacity: 1, y: 0 }}
											exit={{ opacity: 0, y: -10 }}
											transition={{ duration: 0.2 }}
											className='absolute top-full left-0 mt-2 w-56 bg-white border border-gray-100 rounded-xl shadow-xl py-2 z-50'
										>
											{shopCategories.map((cat) => (
												<Link
													key={cat.to}
													to={cat.to}
													className='flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors'
												>
													<span className="text-lg">{cat.icon}</span>
													{cat.label}
												</Link>
											))}
										</motion.div>
									)}
								</AnimatePresence>
							</div>

							<Link to='/about' className='text-gray-600 hover:text-gray-900 font-medium transition-colors'>About</Link>
							<Link to='/contact' className='text-gray-600 hover:text-gray-900 font-medium transition-colors'>Contact</Link>

							{/* Search Icon */}
							<button className='text-gray-400 hover:text-gray-600 transition-colors'>
								<Search size={18} />
							</button>
						</nav>

						{/* Right Section */}
						<div className='flex items-center gap-3'>
							{/* Cart Icon */}
							<Link to='/cart' className='relative group'>
								<div className='p-2 rounded-lg hover:bg-gray-100 transition-colors'>
									<ShoppingCart size={20} className='text-gray-600 group-hover:text-gray-900' />
									{cartItemCount > 0 && (
										<motion.span
											initial={{ scale: 0 }}
											animate={{ scale: 1 }}
											className='absolute -top-1 -right-1 bg-gray-900 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center font-medium'
										>
											{cartItemCount}
										</motion.span>
									)}
								</div>
							</Link>

							{/* Desktop Auth Buttons */}
							<div className='hidden lg:flex items-center gap-2'>
								{user ? (
									<>
										{isAdmin && (
											<Link
												to='/secret-dashboard'
												className='flex items-center gap-1.5 px-3 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors text-sm font-medium'
											>
												<Lock size={16} />
												Admin
											</Link>
										)}
										<Link
											to='/profile'
											className='flex items-center gap-1.5 px-3 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors text-sm font-medium'
										>
											<User size={16} />
											Profile
										</Link>
										<button
											onClick={logout}
											className='flex items-center gap-1.5 px-3 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors text-sm font-medium'
										>
											<LogOut size={16} />
											Logout
										</button>
									</>
								) : (
									<>
										<Link
											to='/login'
											className='px-4 py-2 rounded-lg text-gray-600 hover:text-gray-900 font-medium transition-colors text-sm'
										>
											Login
										</Link>
										<Link
											to='/signup'
											className='px-4 py-2 rounded-lg bg-gray-900 text-white hover:bg-gray-800 transition-colors text-sm font-medium'
										>
											Sign Up
										</Link>
									</>
								)}
							</div>

							{/* Mobile Menu Button */}
							<button
								className='lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors'
								onClick={() => setMobileOpen(!mobileOpen)}
								aria-label='Toggle menu'
							>
								{mobileOpen ? <X size={20} /> : <Menu size={20} />}
							</button>
						</div>
					</div>
				</div>

				{/* Mobile Menu */}
				<AnimatePresence>
					{mobileOpen && (
						<motion.nav
							initial={{ opacity: 0, height: 0 }}
							animate={{ opacity: 1, height: "auto" }}
							exit={{ opacity: 0, height: 0 }}
							transition={{ duration: 0.3 }}
							className='lg:hidden border-t border-gray-100 bg-white overflow-hidden'
						>
							<div className='container mx-auto px-4 py-4 space-y-2'>
								<Link to='/' className='block px-3 py-2 rounded-lg hover:bg-gray-50 text-gray-700 font-medium'>Home</Link>
								
								{/* Mobile Shop Section */}
								<div className='px-3 pt-2'>
									<p className='text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2'>Shop</p>
									<div className='space-y-1'>
										{shopCategories.map((cat) => (
											<Link 
												key={cat.to} 
												to={cat.to} 
												className='flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 text-gray-600 text-sm'
											>
												<span className="text-lg">{cat.icon}</span>
												{cat.label}
											</Link>
										))}
									</div>
								</div>

								<Link to='/about' className='block px-3 py-2 rounded-lg hover:bg-gray-50 text-gray-700 font-medium'>About</Link>
								<Link to='/contact' className='block px-3 py-2 rounded-lg hover:bg-gray-50 text-gray-700 font-medium'>Contact</Link>
								
								{user && (
									<>
										{isAdmin && (
											<Link to='/secret-dashboard' className='block px-3 py-2 rounded-lg hover:bg-gray-50 text-gray-700 font-medium'>Dashboard</Link>
										)}
										<Link to='/profile' className='block px-3 py-2 rounded-lg hover:bg-gray-50 text-gray-700 font-medium'>Profile</Link>
									</>
								)}

								<div className='pt-4 border-t border-gray-100 flex gap-3'>
									{user ? (
										<button 
											onClick={logout} 
											className='flex-1 bg-gray-100 text-gray-700 py-2.5 rounded-lg font-medium text-center hover:bg-gray-200 transition'
										>
											Log Out
										</button>
									) : (
										<>
											<Link to='/login' className='flex-1 border border-gray-200 text-gray-700 py-2.5 rounded-lg font-medium text-center hover:bg-gray-50 transition'>Login</Link>
											<Link to='/signup' className='flex-1 bg-gray-900 text-white py-2.5 rounded-lg font-medium text-center hover:bg-gray-800 transition'>Sign Up</Link>
										</>
									)}
								</div>
							</div>
						</motion.nav>
					)}
				</AnimatePresence>
			</header>

			{/* Spacer to prevent content from hiding under navbar */}
			<div className='h-[72px] md:h-[88px]' />
		</>
	);
};

export default Navbar;