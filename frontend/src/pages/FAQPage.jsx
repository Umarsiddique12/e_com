import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle, ChevronDown, ShoppingBag, Truck, RefreshCw, User, Headphones, Search, X, ArrowRight } from "lucide-react";

const faqCategories = [
	{
		title: "Orders & Payment",
		icon: ShoppingBag,
		items: [
			{
				q: "How do I place an order?",
				a: "Browse our curated collections, add items to your cart, and proceed to our secure checkout. You can checkout as a guest or create an account for faster future purchases.",
			},
			{
				q: "Can I modify or cancel my order?",
				a: "Orders can be modified within 1 hour of placement. Please contact our support team immediately at support@stylehub.com for assistance with order changes.",
			},
			{
				q: "Is my payment information secure?",
				a: "Absolutely. We use enterprise-grade SSL encryption and PCI-compliant payment processing. Your financial data is never stored on our servers.",
			},
			{
				q: "Do you offer gift cards?",
				a: "Gift cards are coming soon! Sign up for our newsletter to be notified when they launch.",
			},
		],
	},
	{
		title: "Shipping & Delivery",
		icon: Truck,
		items: [
			{
				q: "How long does shipping take?",
				a: "Standard shipping takes 5-7 business days. Express (2-3 days) and overnight options are available. Free standard shipping on orders over $50.",
			},
			{
				q: "How do I track my order?",
				a: "Once your order ships, you'll receive a tracking link via email. You can also track your package from your account dashboard.",
			},
			{
				q: "Do you ship internationally?",
				a: "Yes, we ship to the US, Canada, UK, and select European countries. International rates and delivery times vary by location.",
			},
		],
	},
	{
		title: "Returns & Exchanges",
		icon: RefreshCw,
		items: [
			{
				q: "What is your return policy?",
				a: "We offer a 30-day hassle-free return policy on eligible items. Items must be unworn with original tags attached.",
			},
			{
				q: "How do I start a return?",
				a: "Log into your account, go to 'Order History', and click 'Request Return'. You'll receive a prepaid shipping label via email.",
			},
			{
				q: "When will I receive my refund?",
				a: "Refunds are processed within 5-7 business days after we receive your return. The credit will appear on your original payment method.",
			},
		],
	},
	{
		title: "Account & Support",
		icon: User,
		items: [
			{
				q: "How do I create an account?",
				a: "Click 'Sign Up' in the navigation bar. An account lets you track orders, save favorites, and manage returns easily.",
			},
			{
				q: "I forgot my password. What do I do?",
				a: "Click 'Forgot Password' on the login page and enter your email. You'll receive a secure reset link within minutes.",
			},
			{
				q: "How do I find my size?",
				a: "Each product page includes a detailed size guide. For personalized sizing advice, our support team is happy to help.",
			},
		],
	},
];

const FAQItem = ({ question, answer }) => {
	const [open, setOpen] = useState(false);

	return (
		<div className='border-b border-gray-100 last:border-0'>
			<button
				onClick={() => setOpen(!open)}
				className='w-full flex items-center justify-between py-4 text-left group'
			>
				<span className='text-gray-700 font-medium group-hover:text-gray-900 transition pr-4'>
					{question}
				</span>
				<motion.div
					animate={{ rotate: open ? 180 : 0 }}
					transition={{ duration: 0.3 }}
				>
					<ChevronDown size={18} className='text-gray-400' />
				</motion.div>
			</button>
			<AnimatePresence>
				{open && (
					<motion.div
						initial={{ height: 0, opacity: 0 }}
						animate={{ height: "auto", opacity: 1 }}
						exit={{ height: 0, opacity: 0 }}
						transition={{ duration: 0.3 }}
						className='overflow-hidden'
					>
						<p className='text-gray-500 text-sm leading-relaxed pb-4'>{answer}</p>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};

const FAQPage = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [activeCategory, setActiveCategory] = useState(null);

	// Filter FAQs based on search
	const filteredCategories = faqCategories.map(category => ({
		...category,
		items: category.items.filter(item => 
			item.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
			item.a.toLowerCase().includes(searchTerm.toLowerCase())
		)
	})).filter(category => category.items.length > 0);

	return (
		<div className='min-h-screen bg-gray-50'>
			{/* Hero Section with Background Image */}
			<div className='relative h-[400px] bg-cover bg-center bg-fixed' style={{
				backgroundImage: 'url("https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070")'
			}}>
				<div className='absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/70' />
				<div className='absolute inset-0 bg-gradient-to-t from-gray-50 to-transparent' />
				
				<div className='relative h-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center'>
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						className='max-w-2xl'
					>
						<div className='flex items-center gap-2 text-white/80 text-sm mb-4'>
							<span>Support Center</span>
							<span>→</span>
							<span className='text-white'>FAQ</span>
						</div>
						<h1 className='text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight'>
							How can we help?
						</h1>
						<p className='text-white/80 text-lg mb-8 max-w-xl'>
							Find answers to common questions about orders, shipping, returns, and more.
						</p>
						
						{/* Search Bar */}
						<div className='relative max-w-xl'>
							<Search className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400' size={20} />
							<input
								type='text'
								placeholder='Search for answers...'
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								className='w-full px-5 py-3 pl-12 pr-12 rounded-xl border-0 focus:outline-none focus:ring-2 focus:ring-gray-900 text-gray-900 placeholder-gray-400 shadow-lg'
							/>
							{searchTerm && (
								<button
									onClick={() => setSearchTerm("")}
									className='absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition'
								>
									<X size={18} />
								</button>
							)}
						</div>
					</motion.div>
				</div>
			</div>

			{/* Main Content */}
			<div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
				
				{/* Category Navigation */}
				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12'>
					{faqCategories.map((category, idx) => (
						<motion.button
							key={category.title}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: idx * 0.1 }}
							onClick={() => setActiveCategory(activeCategory === category.title ? null : category.title)}
							className={`text-left p-5 rounded-xl transition-all ${
								activeCategory === category.title
									? 'bg-gray-900 text-white shadow-lg'
									: 'bg-white border border-gray-200 text-gray-700 hover:border-gray-300 hover:shadow-md'
							}`}
						>
							<category.icon size={24} className={`mb-3 ${activeCategory === category.title ? 'text-white' : 'text-gray-900'}`} />
							<h3 className={`font-semibold mb-1 ${activeCategory === category.title ? 'text-white' : 'text-gray-900'}`}>
								{category.title}
							</h3>
							<p className={`text-sm ${activeCategory === category.title ? 'text-gray-300' : 'text-gray-500'}`}>
								{category.items.length} questions
							</p>
						</motion.button>
					))}
				</div>

				{/* FAQ Sections */}
				<div className='space-y-6'>
					{filteredCategories.length === 0 ? (
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							className='text-center py-16 bg-white rounded-2xl border border-gray-200'
						>
							<Search size={48} className='text-gray-400 mx-auto mb-4' />
							<h3 className='text-xl font-semibold text-gray-900 mb-2'>No results found</h3>
							<p className='text-gray-500'>Try different keywords or browse our categories above</p>
						</motion.div>
					) : (
						filteredCategories.map((category, ci) => {
							const showCategory = !activeCategory || activeCategory === category.title;
							if (!showCategory) return null;
							
							return (
								<motion.div
									key={category.title}
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.5, delay: ci * 0.1 }}
									className='bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow'
								>
									<div className='px-6 py-5 border-b border-gray-100 bg-gray-50'>
										<div className='flex items-center gap-3'>
											<div className='w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center'>
												<category.icon size={20} className='text-white' />
											</div>
											<div>
												<h2 className='text-xl font-semibold text-gray-900'>{category.title}</h2>
												<p className='text-sm text-gray-500 mt-0.5'>
													{category.items.length} frequently asked questions
												</p>
											</div>
										</div>
									</div>
									<div className='divide-y divide-gray-100'>
										{category.items.map((item) => (
											<FAQItem key={item.q} question={item.q} answer={item.a} />
										))}
									</div>
								</motion.div>
							);
						})
					)}
				</div>

				{/* Help Section */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.4 }}
					className='mt-12 bg-gray-900 rounded-2xl p-8 text-center'
				>
					<Headphones className='text-white w-12 h-12 mx-auto mb-4' />
					<h3 className='text-2xl font-bold text-white mb-2'>Still have questions?</h3>
					<p className='text-gray-300 mb-6 max-w-md mx-auto'>
						Our support team is available 24/7 to assist you with any inquiries
					</p>
					<div className='flex flex-col sm:flex-row gap-4 justify-center'>
						<Link
							to='/contact'
							className='inline-flex items-center gap-2 bg-white text-gray-900 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition shadow-lg'
						>
							Contact Support <ArrowRight size={18} />
						</Link>
						<Link
							to='/returns'
							className='inline-flex items-center gap-2 bg-transparent border border-white/30 text-white hover:bg-white/10 px-8 py-3 rounded-lg font-semibold transition'
						>
							View Return Policy
						</Link>
					</div>
				</motion.div>

				{/* Trust Indicators */}
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.6 }}
					className='mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 text-center'
				>
					<div>
						<div className='w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-2'>
							<HelpCircle size={18} className='text-gray-900' />
						</div>
						<p className='text-sm font-medium text-gray-900'>24/7 Support</p>
						<p className='text-xs text-gray-500'>Always here to help</p>
					</div>
					<div>
						<div className='w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-2'>
							<Truck size={18} className='text-gray-900' />
						</div>
						<p className='text-sm font-medium text-gray-900'>Free Shipping</p>
						<p className='text-xs text-gray-500'>On orders $50+</p>
					</div>
					<div>
						<div className='w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-2'>
							<RefreshCw size={18} className='text-gray-900' />
						</div>
						<p className='text-sm font-medium text-gray-900'>Easy Returns</p>
						<p className='text-xs text-gray-500'>30-day guarantee</p>
					</div>
					<div>
						<div className='w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-2'>
							<Headphones size={18} className='text-gray-900' />
						</div>
						<p className='text-sm font-medium text-gray-900'>Quick Response</p>
						<p className='text-xs text-gray-500'>Within 2 hours</p>
					</div>
				</motion.div>
			</div>
		</div>
	);
};

export default FAQPage;