import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle, ChevronDown } from "lucide-react";

const faqCategories = [
	{
		title: "Orders & Payment",
		items: [
			{
				q: "How do I place an order?",
				a: "Browse our categories, add items to your cart, and proceed to checkout. You'll need to create an account or log in to complete your purchase. We accept all major credit cards through our secure payment processor.",
			},
			{
				q: "Can I modify or cancel my order?",
				a: "Orders can be modified or cancelled within 1 hour of placement. After that, your order enters processing and cannot be changed. Contact us immediately at support@stylehub.com if you need assistance.",
			},
			{
				q: "Is my payment information secure?",
				a: "Yes. All payments are processed through Stripe with industry-standard SSL encryption. We never store your full credit card details on our servers.",
			},
			{
				q: "Do you offer gift cards?",
				a: "Gift cards are coming soon! Sign up for our newsletter on the homepage to be notified when they launch.",
			},
		],
	},
	{
		title: "Shipping & Delivery",
		items: [
			{
				q: "How long does shipping take?",
				a: "Standard shipping takes 5–7 business days. Express (2–3 days) and overnight options are available at checkout. Free standard shipping applies to orders over $50.",
			},
			{
				q: "How do I track my order?",
				a: "Once your order ships, you'll receive a tracking link via email. You can also view tracking information from your account profile page.",
			},
			{
				q: "Do you ship internationally?",
				a: "Yes, we ship to the US, Canada, UK, and select European countries. International rates and delivery times vary. Customs fees may apply.",
			},
		],
	},
	{
		title: "Returns & Exchanges",
		items: [
			{
				q: "What is your return policy?",
				a: "We offer a 30-day hassle-free return policy on eligible items. Items must be unworn with tags attached. Visit our Return Policy page for full details.",
			},
			{
				q: "How do I start a return?",
				a: "Log in to your account, go to your order history, and click 'Request Return'. You'll receive a prepaid shipping label via email. Returns are free on orders over $50.",
			},
			{
				q: "When will I receive my refund?",
				a: "Refunds are processed within 5–7 business days after we receive your return. Allow an additional 3–5 days for the refund to appear on your statement.",
			},
		],
	},
	{
		title: "Account & Sizing",
		items: [
			{
				q: "How do I create an account?",
				a: "Click 'Sign Up' in the navigation bar and fill in your details. An account lets you track orders, save your cart, and manage returns easily.",
			},
			{
				q: "I forgot my password. What do I do?",
				a: "On the login page, click 'Forgot Password' and enter your email. You'll receive a reset link within a few minutes.",
			},
			{
				q: "How do I find my size?",
				a: "Each product page includes a size guide. If you're between sizes, we generally recommend sizing up. Contact us for personalized sizing advice.",
			},
		],
	},
];

const FAQItem = ({ question, answer }) => {
	const [open, setOpen] = useState(false);

	return (
		<div className='border-b border-slate-100 last:border-0'>
			<button
				onClick={() => setOpen(!open)}
				className='w-full flex items-center justify-between py-4 text-left group'
			>
				<span className='font-medium text-slate-800 group-hover:text-emerald-600 transition pr-4'>
					{question}
				</span>
				<ChevronDown
					size={18}
					className={`text-slate-400 shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
				/>
			</button>
			<AnimatePresence>
				{open && (
					<motion.div
						initial={{ height: 0, opacity: 0 }}
						animate={{ height: "auto", opacity: 1 }}
						exit={{ height: 0, opacity: 0 }}
						transition={{ duration: 0.2 }}
						className='overflow-hidden'
					>
						<p className='text-slate-600 text-sm leading-relaxed pb-4'>{answer}</p>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};

const FAQPage = () => {
	return (
		<div className='min-h-screen'>
			<div className='relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
				<motion.div
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					className='text-center mb-12'
				>
					<div className='inline-flex items-center justify-center w-16 h-16 bg-emerald-50 rounded-2xl mb-4 text-emerald-600 border border-emerald-100'>
						<HelpCircle size={32} />
					</div>
					<h1 className='text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-3'>
						Frequently Asked Questions
					</h1>
					<p className='text-lg text-slate-500'>
						Find quick answers to common questions. Can't find what you need?{" "}
						<Link to='/contact' className='text-emerald-600 hover:underline font-medium'>
							Contact us
						</Link>
						.
					</p>
				</motion.div>

				<div className='space-y-8'>
					{faqCategories.map((category, ci) => (
						<motion.div
							key={category.title}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: ci * 0.1 }}
							className='bg-white/80 backdrop-blur-sm border border-slate-200/60 rounded-2xl p-6 shadow-sm'
						>
							<h2 className='text-lg font-bold text-emerald-600 mb-2'>{category.title}</h2>
							{category.items.map((item) => (
								<FAQItem key={item.q} question={item.q} answer={item.a} />
							))}
						</motion.div>
					))}
				</div>

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.5 }}
					className='mt-12 text-center bg-slate-50 border border-slate-200 rounded-2xl p-8'
				>
					<h3 className='text-xl font-bold text-slate-800 mb-2'>Still have questions?</h3>
					<p className='text-slate-500 mb-4'>Our support team is happy to help.</p>
					<div className='flex flex-col sm:flex-row gap-3 justify-center'>
						<Link
							to='/contact'
							className='bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2.5 rounded-lg font-semibold transition'
						>
							Contact Support
						</Link>
						<Link
							to='/returns'
							className='border border-slate-300 text-slate-700 hover:bg-white px-6 py-2.5 rounded-lg font-semibold transition'
						>
							View Return Policy
						</Link>
					</div>
				</motion.div>
			</div>
		</div>
	);
};

export default FAQPage;
