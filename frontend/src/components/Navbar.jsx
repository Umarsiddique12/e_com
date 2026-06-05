import { useState } from "react";
import { ShoppingCart, UserPlus, LogIn, LogOut, Lock, Zap, User, ChevronDown, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";

const shopCategories = [
	{ to: "/jeans", label: "Jeans" },
	{ to: "/t-shirts", label: "T-Shirts" },
	{ to: "/shoes", label: "Shoes" },
	{ to: "/glasses", label: "Glasses" },
	{ to: "/jackets", label: "Jackets" },
	{ to: "/suits", label: "Suits" },
	{ to: "/bags", label: "Bags" },
];

const Navbar = () => {
	const { user, logout } = useUserStore();
	const isAdmin = user?.role === "admin";
	const { cart } = useCartStore();
	const [shopOpen, setShopOpen] = useState(false);
	const [mobileOpen, setMobileOpen] = useState(false);

	return (
		<header className='fixed top-0 left-0 w-full bg-white bg-opacity-80 backdrop-blur-md shadow-sm z-40 transition-all duration-300 border-b border-slate-200/60'>
			<div className='container mx-auto px-4 py-3'>
				<div className='flex justify-between items-center'>
					<Link to='/' className='text-2xl font-bold text-emerald-600 items-center space-x-2 flex hover:text-emerald-500 transition duration-300'>
						<Zap size={24} className='fill-emerald-100' />
						<span>StyleHub</span>
					</Link>

					<nav className='hidden lg:flex items-center gap-5'>
						<Link to='/' className='text-slate-600 hover:text-emerald-600 font-medium transition'>
							Home
						</Link>

						<div className='relative' onMouseEnter={() => setShopOpen(true)} onMouseLeave={() => setShopOpen(false)}>
							<button className='text-slate-600 hover:text-emerald-600 font-medium transition flex items-center gap-1'>
								Shop <ChevronDown size={16} className={`transition-transform ${shopOpen ? "rotate-180" : ""}`} />
							</button>
							{shopOpen && (
								<div className='absolute top-full left-0 mt-1 w-48 bg-white border border-slate-200 rounded-xl shadow-lg py-2 z-50'>
									{shopCategories.map((cat) => (
										<Link
											key={cat.to}
											to={cat.to}
											className='block px-4 py-2 text-sm text-slate-600 hover:bg-emerald-50 hover:text-emerald-600 transition'
										>
											{cat.label}
										</Link>
									))}
								</div>
							)}
						</div>

						<Link to='/about' className='text-slate-600 hover:text-emerald-600 font-medium transition'>
							About
						</Link>
						<Link to='/contact' className='text-slate-600 hover:text-emerald-600 font-medium transition'>
							Contact
						</Link>
						<Link to='/faq' className='text-slate-600 hover:text-emerald-600 font-medium transition'>
							FAQ
						</Link>

						{user && (
							<Link to='/cart' className='relative group text-slate-600 hover:text-emerald-600 font-medium transition flex items-center'>
								<ShoppingCart size={20} />
								{cart.length > 0 && (
									<span className='absolute -top-2 -right-2 bg-emerald-500 text-white rounded-full w-4 h-4 text-xs flex items-center justify-center'>
										{cart.length}
									</span>
								)}
							</Link>
						)}

						{isAdmin && (
							<Link
								className='bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1.5 rounded-md font-medium transition flex items-center shadow-sm'
								to='/secret-dashboard'
							>
								<Lock size={18} className='mr-1' />
								Dashboard
							</Link>
						)}

						{user && (
							<Link
								className='bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-md font-medium transition flex items-center gap-1.5 border border-slate-200/50'
								to='/profile'
							>
								<User size={18} />
								Profile
							</Link>
						)}

						{user ? (
							<button
								className='bg-slate-100 hover:bg-slate-200 text-slate-700 py-1.5 px-4 rounded-md flex items-center transition border border-slate-200/50'
								onClick={logout}
							>
								<LogOut size={18} />
							</button>
						) : (
							<>
								<Link
									to='/signup'
									className='bg-emerald-600 hover:bg-emerald-500 text-white py-2 px-4 rounded-md flex items-center transition shadow-sm'
								>
									<UserPlus className='mr-2' size={18} />
									Sign Up
								</Link>
								<Link
									to='/login'
									className='bg-slate-100 hover:bg-slate-200 text-slate-700 py-2 px-4 rounded-md flex items-center transition border border-slate-200/50'
								>
									<LogIn className='mr-2' size={18} />
									Login
								</Link>
							</>
						)}
					</nav>

					<button
						className='lg:hidden text-slate-600 hover:text-emerald-600 p-1'
						onClick={() => setMobileOpen(!mobileOpen)}
						aria-label='Toggle menu'
					>
						{mobileOpen ? <X size={24} /> : <Menu size={24} />}
					</button>
				</div>

				{mobileOpen && (
					<nav className='lg:hidden mt-4 pb-2 border-t border-slate-100 pt-4 space-y-1'>
						<Link to='/' onClick={() => setMobileOpen(false)} className='block px-3 py-2 rounded-lg hover:bg-emerald-50 text-slate-700 font-medium'>Home</Link>
						<p className='px-3 pt-2 pb-1 text-xs font-semibold uppercase tracking-wider text-slate-400'>Shop</p>
						{shopCategories.map((cat) => (
							<Link key={cat.to} to={cat.to} onClick={() => setMobileOpen(false)} className='block px-5 py-2 rounded-lg hover:bg-emerald-50 text-slate-600 text-sm'>
								{cat.label}
							</Link>
						))}
						<Link to='/about' onClick={() => setMobileOpen(false)} className='block px-3 py-2 rounded-lg hover:bg-emerald-50 text-slate-700 font-medium'>About</Link>
						<Link to='/contact' onClick={() => setMobileOpen(false)} className='block px-3 py-2 rounded-lg hover:bg-emerald-50 text-slate-700 font-medium'>Contact</Link>
						<Link to='/faq' onClick={() => setMobileOpen(false)} className='block px-3 py-2 rounded-lg hover:bg-emerald-50 text-slate-700 font-medium'>FAQ</Link>
						{user && (
							<Link to='/cart' onClick={() => setMobileOpen(false)} className='block px-3 py-2 rounded-lg hover:bg-emerald-50 text-slate-700 font-medium'>
								Cart {cart.length > 0 && `(${cart.length})`}
							</Link>
						)}
						{isAdmin && (
							<Link to='/secret-dashboard' onClick={() => setMobileOpen(false)} className='block px-3 py-2 rounded-lg hover:bg-emerald-50 text-emerald-600 font-medium'>Dashboard</Link>
						)}
						{user && (
							<Link to='/profile' onClick={() => setMobileOpen(false)} className='block px-3 py-2 rounded-lg hover:bg-emerald-50 text-slate-700 font-medium'>Profile</Link>
						)}
						<div className='flex gap-2 px-3 pt-3'>
							{user ? (
								<button onClick={() => { logout(); setMobileOpen(false); }} className='flex-1 bg-slate-100 text-slate-700 py-2 rounded-lg font-medium'>Log Out</button>
							) : (
								<>
									<Link to='/signup' onClick={() => setMobileOpen(false)} className='flex-1 bg-emerald-600 text-white py-2 rounded-lg font-medium text-center'>Sign Up</Link>
									<Link to='/login' onClick={() => setMobileOpen(false)} className='flex-1 bg-slate-100 text-slate-700 py-2 rounded-lg font-medium text-center'>Login</Link>
								</>
							)}
						</div>
					</nav>
				)}
			</div>
		</header>
	);
};

export default Navbar;
