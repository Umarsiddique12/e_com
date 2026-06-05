import { useState } from "react";
import { motion } from "framer-motion";
import { Gift, Loader } from "lucide-react";
import axios from "../lib/axios";
import toast from "react-hot-toast";

const CreateCouponForm = () => {
	const [couponData, setCouponData] = useState({
		email: "",
		code: "",
		discountPercentage: "",
		expirationDate: "",
	});
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			await axios.post("/coupons/admin/create", {
				...couponData,
				discountPercentage: Number(couponData.discountPercentage),
				code: couponData.code.trim().toUpperCase(),
			});
			toast.success("Coupon created successfully");
			setCouponData({ email: "", code: "", discountPercentage: "", expirationDate: "" });
		} catch (error) {
			toast.error(error.response?.data?.message || "Failed to create coupon");
		} finally {
			setLoading(false);
		}
	};

	return (
		<motion.div
			className='bg-white border border-slate-200/80 shadow-sm rounded-2xl p-8 mb-8 max-w-2xl mx-auto relative overflow-hidden'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.8 }}
		>
			<div className='absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-emerald-500 to-teal-400' />
			<div className='flex items-center gap-3 mb-6'>
				<Gift className='h-6 w-6 text-emerald-600' />
				<h2 className='text-2xl font-bold text-emerald-700'>Create Coupon</h2>
			</div>

			<form onSubmit={handleSubmit} className='space-y-4'>
				<div>
					<label htmlFor='email' className='block text-sm font-semibold text-slate-700'>
						Customer Email
					</label>
					<input
						type='email'
						id='email'
						value={couponData.email}
						onChange={(e) => setCouponData({ ...couponData, email: e.target.value })}
						className='mt-1 block w-full bg-slate-50 border border-slate-200 rounded-lg shadow-sm py-2 px-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition text-sm'
						required
					/>
				</div>

				<div>
					<label htmlFor='code' className='block text-sm font-semibold text-slate-700'>
						Coupon Code
					</label>
					<input
						type='text'
						id='code'
						value={couponData.code}
						onChange={(e) => setCouponData({ ...couponData, code: e.target.value })}
						className='mt-1 block w-full bg-slate-50 border border-slate-200 rounded-lg shadow-sm py-2 px-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition text-sm'
						required
					/>
				</div>

				<div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
					<div>
						<label htmlFor='discountPercentage' className='block text-sm font-semibold text-slate-700'>
							Discount (%)
						</label>
						<input
							type='number'
							id='discountPercentage'
							value={couponData.discountPercentage}
							onChange={(e) => setCouponData({ ...couponData, discountPercentage: e.target.value })}
							min='1'
							max='100'
							className='mt-1 block w-full bg-slate-50 border border-slate-200 rounded-lg shadow-sm py-2 px-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition text-sm'
							required
						/>
					</div>
					<div>
						<label htmlFor='expirationDate' className='block text-sm font-semibold text-slate-700'>
							Expiration Date
						</label>
						<input
							type='date'
							id='expirationDate'
							value={couponData.expirationDate}
							onChange={(e) => setCouponData({ ...couponData, expirationDate: e.target.value })}
							className='mt-1 block w-full bg-slate-50 border border-slate-200 rounded-lg shadow-sm py-2 px-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition text-sm'
							required
						/>
					</div>
				</div>

				<button
					type='submit'
					className='w-full inline-flex items-center justify-center py-3 px-4 rounded-xl bg-emerald-600 text-white font-semibold shadow-md shadow-emerald-600/15 hover:bg-emerald-500 transition disabled:opacity-50'
					disabled={loading}
				>
					{loading ? (
						<>
							<Loader className='mr-2 h-5 w-5 animate-spin' />
							Creating...
						</>
					) : (
						"Create Coupon"
					)}
				</button>
			</form>
		</motion.div>
	);
};

export default CreateCouponForm;
