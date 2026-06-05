import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Clock, Send, MessageCircle } from "lucide-react";
import toast from "react-hot-toast";
import { submitToWeb3Forms } from "../lib/web3forms";

const contactInfo = [
	{
		icon: Mail,
		title: "Email Us",
		detail: "support@stylehub.com",
		sub: "We reply within 24 hours",
		href: "mailto:support@stylehub.com",
	},
	{
		icon: Phone,
		title: "Call Us",
		detail: "+1 (800) 555-0199",
		sub: "Mon–Fri, 9 AM – 6 PM EST",
		href: "tel:+18005550199",
	},
	{
		icon: MapPin,
		title: "Visit Us",
		detail: "123 Fashion St, Style City, NY 10001",
		sub: "By appointment only",
	},
	{
		icon: Clock,
		title: "Business Hours",
		detail: "Monday – Friday",
		sub: "9:00 AM – 6:00 PM EST",
	},
];

const ContactPage = () => {
	const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
	const [sending, setSending] = useState(false);

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setSending(true);

		try {
			await submitToWeb3Forms({
				subject: `StyleHub Contact — ${form.subject}`,
				from_name: "StyleHub Contact Form",
				name: form.name,
				email: form.email,
				topic: form.subject,
				message: form.message,
			});

			toast.success("Message sent! We'll get back to you within 24 hours.");
			setForm({ name: "", email: "", subject: "", message: "" });
		} catch (error) {
			toast.error(error.message || "Failed to send message. Please try again.");
		} finally {
			setSending(false);
		}
	};

	return (
		<div className='min-h-screen'>
			<div className='relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
				<motion.div
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					className='text-center mb-12'
				>
					<div className='inline-flex items-center justify-center w-16 h-16 bg-emerald-50 rounded-2xl mb-4 text-emerald-600 border border-emerald-100'>
						<MessageCircle size={32} />
					</div>
					<h1 className='text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-3'>
						Contact Us
					</h1>
					<p className='text-lg text-slate-500 max-w-2xl mx-auto'>
						Have a question, feedback, or need help with an order? We'd love to hear from you.
					</p>
				</motion.div>

				<div className='grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12'>
					{contactInfo.map((item, i) => (
						<motion.div
							key={item.title}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: i * 0.08 }}
							className='bg-white/80 backdrop-blur-sm border border-slate-200/60 rounded-xl p-5 shadow-sm'
						>
							<div className='w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-600 mb-3 border border-emerald-100'>
								<item.icon size={20} />
							</div>
							<h3 className='font-semibold text-slate-800 text-sm mb-1'>{item.title}</h3>
							{item.href ? (
								<a href={item.href} className='text-emerald-600 text-sm font-medium hover:underline'>
									{item.detail}
								</a>
							) : (
								<p className='text-slate-700 text-sm font-medium'>{item.detail}</p>
							)}
							<p className='text-xs text-slate-400 mt-1'>{item.sub}</p>
						</motion.div>
					))}
				</div>

				<div className='grid lg:grid-cols-5 gap-10'>
					<motion.form
						onSubmit={handleSubmit}
						initial={{ opacity: 0, x: -20 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.6, delay: 0.2 }}
						className='lg:col-span-3 bg-white/80 backdrop-blur-sm border border-slate-200/60 rounded-2xl p-8 shadow-sm'
					>
						<input type='hidden' name='form_type' value='contact' />
						<h2 className='text-2xl font-bold text-slate-900 mb-6'>Send a Message</h2>
						<div className='grid sm:grid-cols-2 gap-4 mb-4'>
							<div>
								<label className='block text-sm font-medium text-slate-700 mb-1.5'>Full Name</label>
								<input
									type='text'
									name='name'
									value={form.name}
									onChange={handleChange}
									required
									placeholder='John Doe'
									className='w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-slate-800'
								/>
							</div>
							<div>
								<label className='block text-sm font-medium text-slate-700 mb-1.5'>Email</label>
								<input
									type='email'
									name='email'
									value={form.email}
									onChange={handleChange}
									required
									placeholder='you@example.com'
									className='w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-slate-800'
								/>
							</div>
						</div>
						<div className='mb-4'>
							<label className='block text-sm font-medium text-slate-700 mb-1.5'>Subject</label>
							<select
								name='subject'
								value={form.subject}
								onChange={handleChange}
								required
								className='w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-slate-800 bg-white'
							>
								<option value=''>Select a topic</option>
								<option value='order'>Order Inquiry</option>
								<option value='return'>Returns & Refunds</option>
								<option value='shipping'>Shipping Question</option>
								<option value='product'>Product Question</option>
								<option value='feedback'>Feedback</option>
								<option value='other'>Other</option>
							</select>
						</div>
						<div className='mb-6'>
							<label className='block text-sm font-medium text-slate-700 mb-1.5'>Message</label>
							<textarea
								name='message'
								value={form.message}
								onChange={handleChange}
								required
								rows={5}
								placeholder='How can we help you?'
								className='w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-slate-800 resize-none'
							/>
						</div>
						<button
							type='submit'
							disabled={sending}
							className='bg-emerald-600 hover:bg-emerald-500 disabled:opacity-60 text-white px-8 py-3 rounded-lg font-semibold transition flex items-center gap-2 shadow-lg shadow-emerald-600/20'
						>
							<Send size={18} />
							{sending ? "Sending..." : "Send Message"}
						</button>
					</motion.form>

					<motion.div
						initial={{ opacity: 0, x: 20 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.6, delay: 0.3 }}
						className='lg:col-span-2 space-y-6'
					>
						<div className='bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-100 rounded-2xl p-6'>
							<h3 className='font-bold text-slate-800 mb-3'>Quick Help</h3>
							<ul className='space-y-2 text-sm text-slate-600'>
								<li>• Track your order from your account profile</li>
								<li>• Start a return within 30 days of delivery</li>
								<li>• Check our FAQ for instant answers</li>
								<li>• Response time: within 24 business hours</li>
							</ul>
						</div>

						<div className='bg-white/80 backdrop-blur-sm border border-slate-200/60 rounded-2xl p-6 shadow-sm'>
							<h3 className='font-bold text-slate-800 mb-3'>Department Contacts</h3>
							<ul className='space-y-3 text-sm'>
								<li>
									<span className='text-slate-500'>Orders:</span>{" "}
									<a href='mailto:orders@stylehub.com' className='text-emerald-600 hover:underline'>
										orders@stylehub.com
									</a>
								</li>
								<li>
									<span className='text-slate-500'>Returns:</span>{" "}
									<a href='mailto:returns@stylehub.com' className='text-emerald-600 hover:underline'>
										returns@stylehub.com
									</a>
								</li>
								<li>
									<span className='text-slate-500'>Wholesale:</span>{" "}
									<a href='mailto:wholesale@stylehub.com' className='text-emerald-600 hover:underline'>
										wholesale@stylehub.com
									</a>
								</li>
							</ul>
						</div>
					</motion.div>
				</div>
			</div>
		</div>
	);
};

export default ContactPage;
