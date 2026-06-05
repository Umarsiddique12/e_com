import { Link } from "react-router-dom";
import { Heart, Mail, MapPin, Phone, Zap } from "lucide-react";

const shopLinks = [
	{ to: "/jeans", label: "Jeans" },
	{ to: "/t-shirts", label: "T-Shirts" },
	{ to: "/shoes", label: "Shoes" },
	{ to: "/jackets", label: "Jackets" },
	{ to: "/suits", label: "Suits" },
	{ to: "/bags", label: "Bags" },
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

const Footer = () => {
	return (
		<footer className='bg-slate-950 text-slate-300 border-t border-slate-800'>
			<div className='container mx-auto px-4 py-14'>
				<div className='grid gap-10 sm:grid-cols-2 lg:grid-cols-5'>
					<div className='lg:col-span-2'>
						<Link to='/' className='flex items-center gap-2 text-xl font-bold text-white mb-4 hover:text-emerald-400 transition'>
							<Zap size={22} className='text-emerald-400 fill-emerald-900' />
							StyleHub
						</Link>
						<p className='text-sm text-slate-400 max-w-sm leading-7 mb-5'>
							Your destination for premium, sustainable fashion. Curated collections,
							secure checkout, and hassle-free returns — all in one place.
						</p>
						<div className='space-y-2.5 text-sm'>
							<p className='flex items-center gap-2 text-slate-400'>
								<MapPin size={15} className='text-emerald-400 shrink-0' />
								123 Fashion St, Style City, NY 10001
							</p>
							<p className='flex items-center gap-2 text-slate-400'>
								<Mail size={15} className='text-emerald-400 shrink-0' />
								<a href='mailto:support@stylehub.com' className='hover:text-white transition'>
									support@stylehub.com
								</a>
							</p>
							<p className='flex items-center gap-2 text-slate-400'>
								<Phone size={15} className='text-emerald-400 shrink-0' />
								+1 (800) 555-0199
							</p>
						</div>
					</div>

					<div>
						<h4 className='text-sm font-semibold uppercase tracking-wider text-slate-400 mb-4'>Shop</h4>
						<ul className='space-y-2.5 text-sm'>
							{shopLinks.map((link) => (
								<li key={link.to}>
									<Link to={link.to} className='hover:text-white transition'>
										{link.label}
									</Link>
								</li>
							))}
						</ul>
					</div>

					<div>
						<h4 className='text-sm font-semibold uppercase tracking-wider text-slate-400 mb-4'>Company</h4>
						<ul className='space-y-2.5 text-sm'>
							{companyLinks.map((link) => (
								<li key={link.to}>
									<Link to={link.to} className='hover:text-white transition'>
										{link.label}
									</Link>
								</li>
							))}
						</ul>
					</div>

					<div>
						<h4 className='text-sm font-semibold uppercase tracking-wider text-slate-400 mb-4'>Legal</h4>
						<ul className='space-y-2.5 text-sm'>
							{legalLinks.map((link) => (
								<li key={link.to}>
									<Link to={link.to} className='hover:text-white transition'>
										{link.label}
									</Link>
								</li>
							))}
						</ul>
					</div>
				</div>

				<div className='mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4'>
					<p className='text-xs text-slate-500'>
						&copy; {new Date().getFullYear()} StyleHub. All rights reserved.
					</p>
					<p className='flex items-center gap-1.5 text-xs text-slate-500'>
						<Heart size={13} className='text-emerald-400' />
						Built with care for online shopping
					</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
