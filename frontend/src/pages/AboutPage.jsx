import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, Leaf, Users, Award, Sparkles } from "lucide-react";

const values = [
	{
		icon: Leaf,
		title: "Sustainable Fashion",
		description: "We partner with eco-conscious brands and use recyclable packaging on every order.",
	},
	{
		icon: Award,
		title: "Premium Quality",
		description: "Every product is hand-selected for craftsmanship, durability, and timeless style.",
	},
	{
		icon: Users,
		title: "Community First",
		description: "Built by fashion lovers, for fashion lovers. Your feedback shapes what we carry.",
	},
	{
		icon: Heart,
		title: "Customer Care",
		description: "Dedicated support team ready to help with sizing, returns, and styling advice.",
	},
];

const stats = [
	{ value: "50K+", label: "Happy Customers" },
	{ value: "2,000+", label: "Products" },
	{ value: "7", label: "Categories" },
	{ value: "4.9★", label: "Average Rating" },
];

const AboutPage = () => {
	return (
		<div className='min-h-screen'>
			<div className='relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
				<motion.div
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					className='text-center mb-16'
				>
					<div className='inline-flex items-center justify-center w-16 h-16 bg-emerald-50 rounded-2xl mb-4 text-emerald-600 border border-emerald-100'>
						<Sparkles size={32} />
					</div>
					<h1 className='text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-4'>
						About StyleHub
					</h1>
					<p className='text-xl text-slate-500 max-w-3xl mx-auto leading-relaxed'>
						We're on a mission to make premium fashion accessible, sustainable, and effortless for everyone.
					</p>
				</motion.div>

				<div className='grid grid-cols-2 md:grid-cols-4 gap-6 mb-20'>
					{stats.map((stat, i) => (
						<motion.div
							key={stat.label}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: i * 0.1 }}
							className='bg-white/80 backdrop-blur-sm border border-slate-200/60 rounded-xl p-6 text-center shadow-sm'
						>
							<div className='text-3xl font-extrabold text-emerald-600 mb-1'>{stat.value}</div>
							<div className='text-sm text-slate-500 font-medium'>{stat.label}</div>
						</motion.div>
					))}
				</div>

				<div className='grid md:grid-cols-2 gap-12 mb-20'>
					<motion.div
						initial={{ opacity: 0, x: -20 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.6, delay: 0.2 }}
					>
						<h2 className='text-3xl font-bold text-slate-900 mb-4'>Our Story</h2>
						<p className='text-slate-600 leading-relaxed mb-4'>
							StyleHub was founded in 2020 with a simple idea: everyone deserves access to
							well-made, stylish clothing without compromising on ethics or breaking the bank.
							What started as a small curated collection has grown into a full-scale fashion
							destination serving thousands of customers worldwide.
						</p>
						<p className='text-slate-600 leading-relaxed'>
							We believe fashion should be an expression of who you are — not a burden on the
							planet. That's why we carefully vet every brand and product we carry, prioritizing
							sustainable materials, fair labor practices, and designs that last beyond a single season.
						</p>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, x: 20 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.6, delay: 0.3 }}
						className='bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-100 rounded-2xl p-8'
					>
						<h2 className='text-3xl font-bold text-slate-900 mb-4'>Our Mission</h2>
						<p className='text-slate-600 leading-relaxed mb-4'>
							To empower people to look and feel their best while making responsible choices
							for the environment and the communities that make our clothes.
						</p>
						<p className='text-slate-600 leading-relaxed'>
							From jeans and t-shirts to suits and accessories, every item in our catalog is
							chosen with intention — blending contemporary trends with enduring quality.
						</p>
					</motion.div>
				</div>

				<div className='mb-20'>
					<h2 className='text-3xl font-bold text-slate-900 text-center mb-10'>What We Stand For</h2>
					<div className='grid sm:grid-cols-2 lg:grid-cols-4 gap-6'>
						{values.map((item, i) => (
							<motion.div
								key={item.title}
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5, delay: 0.1 * i }}
								className='bg-white/80 backdrop-blur-sm border border-slate-200/60 rounded-xl p-6 hover:shadow-lg hover:border-emerald-300 transition duration-300'
							>
								<div className='w-12 h-12 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-600 mb-4 border border-emerald-100'>
									<item.icon size={24} />
								</div>
								<h3 className='font-bold text-slate-800 mb-2'>{item.title}</h3>
								<p className='text-sm text-slate-500 leading-relaxed'>{item.description}</p>
							</motion.div>
						))}
					</div>
				</div>

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.4 }}
					className='bg-emerald-600 rounded-2xl p-10 text-center text-white'
				>
					<h2 className='text-3xl font-bold mb-3'>Ready to Shop?</h2>
					<p className='text-emerald-100 mb-6 max-w-xl mx-auto'>
						Explore our curated collections and find your next favorite piece.
					</p>
					<div className='flex flex-col sm:flex-row gap-4 justify-center'>
						<Link
							to='/jeans'
							className='bg-white text-emerald-600 hover:bg-emerald-50 px-8 py-3 rounded-lg font-semibold transition'
						>
							Shop Now
						</Link>
						<Link
							to='/contact'
							className='border-2 border-white text-white hover:bg-white/10 px-8 py-3 rounded-lg font-semibold transition'
						>
							Get in Touch
						</Link>
					</div>
				</motion.div>
			</div>
		</div>
	);
};

export default AboutPage;
