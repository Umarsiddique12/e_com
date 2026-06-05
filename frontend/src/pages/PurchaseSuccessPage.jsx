import { ArrowRight, CheckCircle, HandHeart } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCartStore } from "../stores/useCartStore";
import axios from "../lib/axios";
import Confetti from "react-confetti";

const PurchaseSuccessPage = () => {
	const [isProcessing, setIsProcessing] = useState(true);
	const { clearCart } = useCartStore();
	const [error, setError] = useState(null);

	useEffect(() => {
		const handleCheckoutSuccess = async (sessionId) => {
			try {
				await axios.post("/payments/checkout-success", {
					sessionId,
				});
				clearCart();
			} catch (error) {
				console.log(error);
			} finally {
				setIsProcessing(false);
			}
		};

		const sessionId = new URLSearchParams(window.location.search).get("session_id");
		if (sessionId) {
			handleCheckoutSuccess(sessionId);
		} else {
			setIsProcessing(false);
			setError("No session ID found in the URL");
		}
	}, [clearCart]);

	if (isProcessing) return "Processing...";

	if (error) return `Error: ${error}`;

	return (
		<div className='h-screen flex items-center justify-center px-4'>
			<Confetti
				width={window.innerWidth}
				height={window.innerHeight}
				gravity={0.1}
				style={{ zIndex: 99 }}
				numberOfPieces={700}
				recycle={false}
			/>

			<div className='max-w-md w-full bg-white border border-slate-200/80 rounded-2xl shadow-xl overflow-hidden relative z-10'>
				{/* Top accent bar */}
				<div className='h-1.5 w-full bg-gradient-to-r from-emerald-500 via-teal-400 to-green-400' />

				<div className='p-6 sm:p-8'>
					<div className='flex justify-center'>
						<div className='w-20 h-20 rounded-full bg-emerald-50 flex items-center justify-center mb-4 border border-emerald-100'>
							<CheckCircle className='text-emerald-500 w-10 h-10' />
						</div>
					</div>
					<h1 className='text-2xl sm:text-3xl font-extrabold text-center text-slate-900 mb-2'>
						Purchase Successful!
					</h1>

					<p className='text-slate-500 text-center mb-2'>
						Thank you for your order. {"We're"} processing it now.
					</p>
					<p className='text-emerald-600 text-center text-sm font-semibold mb-6'>
						Check your email for order details and updates.
					</p>
					<div className='bg-slate-50 border border-slate-100 rounded-xl p-4 mb-6'>
						<div className='flex items-center justify-between mb-2.5'>
							<span className='text-sm text-slate-500 font-medium'>Order number</span>
							<span className='text-sm font-bold text-emerald-600'>#12345</span>
						</div>
						<div className='flex items-center justify-between'>
							<span className='text-sm text-slate-500 font-medium'>Estimated delivery</span>
							<span className='text-sm font-bold text-slate-700'>3-5 business days</span>
						</div>
					</div>

					<div className='space-y-3'>
						<button
							className='w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 px-4
             rounded-xl transition duration-200 flex items-center justify-center shadow-md shadow-emerald-600/15'
						>
							<HandHeart className='mr-2' size={18} />
							Thanks for trusting us!
						</button>
						<Link
							to={"/"}
							className='w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2.5 px-4
             rounded-xl transition duration-200 flex items-center justify-center border border-slate-200'
						>
							Continue Shopping
							<ArrowRight className='ml-2' size={18} />
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};
export default PurchaseSuccessPage;
