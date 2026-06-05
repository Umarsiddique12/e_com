import { Link } from "react-router-dom";
import { Heart, Mail, MapPin, Phone, Zap, Facebook, Twitter, Instagram, Linkedin, Youtube, Shield, Truck, RotateCcw, CreditCard, ArrowUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const shopLinks = [
	{ to: "/category/jeans", label: "Jeans" },
	{ to: "/category/t-shirts", label: "T-Shirts" },
	{ to: "/category/shoes", label: "Shoes" },
	{ to: "/category/glasses", label: "Glasses" },
	{ to: "/category/jackets", label: "Jackets" },
	{ to: "/category/suits", label: "Suits" },
	{ to: "/category/bags", label: "Bags" },
];

const companyLinks = [
	{ to: "/about", label: "About Us" },
	{ to: "/contact", label: "Contact" },
	{ to: "/faq", label: "FAQ" },
	{ to: "/shipping", label: "Shipping Info" },
];

const legalLinks = [
	{ to: "/returns", label: "Return Policy" },
	{ to: "/terms", label: "Terms & Conditions" },
	{ to: "/privacy", label: "Privacy Policy" },
];

const socialLinks = [
	{ icon: Facebook, href: "https://facebook.com", label: "Facebook" },
	{ icon: Twitter, href: "https://twitter.com", label: "Twitter" },
	{ icon: Instagram, href: "https://instagram.com", label: "Instagram" },
	{ icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
	{ icon: Youtube, href: "https://youtube.com", label: "YouTube" },
];

const Footer = () => {
	const [showScrollTop, setShowScrollTop] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setShowScrollTop(window.scrollY > 300);
		};
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	return (
		<footer className='bg-gray-950 text-gray-400 border-t border-gray-800 relative'>
			{/* Scroll to Top Button */}
			<AnimatePresence>
				{showScrollTop && (
					<motion.button
						initial={{ opacity: 0, scale: 0 }}
						animate={{ opacity: 1, scale: 1 }}
						exit={{ opacity: 0, scale: 0 }}
						whileHover={{ scale: 1.1 }}
						whileTap={{ scale: 0.9 }}
						onClick={scrollToTop}
						className='fixed bottom-8 right-8 z-50 bg-gray-800 hover:bg-gray-700 text-white p-3 rounded-full shadow-lg transition-colors'
					>
						<ArrowUp size={20} />
					</motion.button>
				)}
			</AnimatePresence>

			{/* Main Footer Content */}
			<div className='container mx-auto px-4 py-12'>
				<div className='grid gap-10 sm:grid-cols-2 lg:grid-cols-5'>
					{/* Brand Section */}
					<div className='lg:col-span-2'>
						<Link to='/' className='flex items-center gap-2 mb-4 group'>
							<div className='w-10 h-10 bg-gray-800 rounded-xl flex items-center justify-center group-hover:bg-gray-700 transition-colors'>
								<Zap size={20} className='text-gray-400 group-hover:text-white transition-colors' />
							</div>
							<span className='text-xl font-bold text-white group-hover:text-gray-300 transition-colors'>
								StyleHub
							</span>
						</Link>
						<p className='text-sm text-gray-500 max-w-sm leading-relaxed mb-6'>
							Your destination for premium, sustainable fashion. Curated collections,
							secure checkout, and hassle-free returns — all in one place.
						</p>
						
						{/* Contact Info */}
						<div className='space-y-3 text-sm'>
							<p className='flex items-center gap-3 text-gray-400'>
								<MapPin size={16} className='text-gray-500 shrink-0' />
								<span>123 Fashion St, Style City, NY 10001</span>
							</p>
							<p className='flex items-center gap-3 text-gray-400'>
								<Mail size={16} className='text-gray-500 shrink-0' />
								<a href='mailto:support@stylehub.com' className='hover:text-white transition-colors'>
									support@stylehub.com
								</a>
							</p>
							<p className='flex items-center gap-3 text-gray-400'>
								<Phone size={16} className='text-gray-500 shrink-0' />
								<a href='tel:+18005550199' className='hover:text-white transition-colors'>
									+1 (800) 555-0199
								</a>
							</p>
						</div>

						{/* Social Links */}
						<div className='flex gap-3 mt-6'>
							{socialLinks.map((social) => (
								<a
									key={social.label}
									href={social.href}
									target='_blank'
									rel='noopener noreferrer'
									className='w-9 h-9 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:bg-gray-700 hover:text-white transition-all duration-300'
									aria-label={social.label}
								>
									<social.icon size={16} />
								</a>
							))}
						</div>
					</div>

					{/* Shop Links */}
					<div>
						<h4 className='text-sm font-semibold uppercase tracking-wider text-gray-500 mb-4'>
							Shop
						</h4>
						<ul className='space-y-2.5'>
							{shopLinks.map((link) => (
								<li key={link.to}>
									<Link 
										to={link.to} 
										className='text-sm text-gray-400 hover:text-white transition-colors duration-200'
									>
										{link.label}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Company Links */}
					<div>
						<h4 className='text-sm font-semibold uppercase tracking-wider text-gray-500 mb-4'>
							Company
						</h4>
						<ul className='space-y-2.5'>
							{companyLinks.map((link) => (
								<li key={link.to}>
									<Link 
										to={link.to} 
										className='text-sm text-gray-400 hover:text-white transition-colors duration-200'
									>
										{link.label}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Legal Links */}
					<div>
						<h4 className='text-sm font-semibold uppercase tracking-wider text-gray-500 mb-4'>
							Legal
						</h4>
						<ul className='space-y-2.5'>
							{legalLinks.map((link) => (
								<li key={link.to}>
									<Link 
										to={link.to} 
										className='text-sm text-gray-400 hover:text-white transition-colors duration-200'
									>
										{link.label}
									</Link>
								</li>
							))}
						</ul>
					</div>
				</div>

				{/* Trust Badges */}
				<div className='mt-10 pt-8 border-t border-gray-800'>
					<div className='grid grid-cols-2 md:grid-cols-4 gap-6 text-center'>
						<div className='flex flex-col items-center gap-2'>
							<Truck size={20} className='text-gray-500' />
							<p className='text-xs text-gray-500'>Free Shipping</p>
							<p className='text-xs text-gray-600'>On orders $50+</p>
						</div>
						<div className='flex flex-col items-center gap-2'>
							<Shield size={20} className='text-gray-500' />
							<p className='text-xs text-gray-500'>Secure Payment</p>
							<p className='text-xs text-gray-600'>256-bit SSL</p>
						</div>
						<div className='flex flex-col items-center gap-2'>
							<RotateCcw size={20} className='text-gray-500' />
							<p className='text-xs text-gray-500'>Easy Returns</p>
							<p className='text-xs text-gray-600'>30-day guarantee</p>
						</div>
						<div className='flex flex-col items-center gap-2'>
							<CreditCard size={20} className='text-gray-500' />
							<p className='text-xs text-gray-500'>Premium Quality</p>
							<p className='text-xs text-gray-600'>100% Authentic</p>
						</div>
					</div>
				</div>

				{/* Bottom Bar */}
				<div className='mt-8 pt-6 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4'>
					<p className='text-xs text-gray-500'>
						&copy; {new Date().getFullYear()} StyleHub. All rights reserved.
					</p>
					<div className='flex items-center gap-4'>
						<p className='flex items-center gap-1.5 text-xs text-gray-500'>
							<Heart size={12} className='text-gray-500' />
							Built with care for online shopping
						</p>
						<div className='flex items-center gap-2'>
							<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/visa/visa-original.svg" alt="Visa" className='h-5 opacity-50' />
							<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mastercard/mastercard-original.svg" alt="Mastercard" className='h-5 opacity-50' />
							<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/paypal/paypal-original.svg" alt="PayPal" className='h-5 opacity-50' />
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;