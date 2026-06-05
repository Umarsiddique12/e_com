import { useState } from "react";
import { Link } from "react-router-dom";
import { UserPlus, Mail, Lock, User, ArrowRight, Loader, Eye, EyeOff, Check, Shield, Gift, Truck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useUserStore } from "../stores/useUserStore";
import toast from "react-hot-toast";

const SignUpPage = () => {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
		confirmPassword: "",
	});
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const { signup, loading } = useUserStore();

	const handleSubmit = async (e) => {
		e.preventDefault();
		
		if (formData.password !== formData.confirmPassword) {
			toast.error("Passwords do not match");
			return;
		}
		
		if (formData.password.length < 6) {
			toast.error("Password must be at least 6 characters");
			return;
		}
		
		await signup(formData);
	};

	return (
		<div className='min-h-screen bg-gray-50'>
			{/* Hero Section with Background Image */}
			<div className='relative h-[300px] bg-cover bg-center bg-fixed' style={{
				backgroundImage: 'url("https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070")'
			}}>
				<div className='absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/70' />
				<div className='absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-gray-50' />
				
				<div className='relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center'>
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						className='max-w-2xl'
					>
						<div className='flex items-center gap-2 text-white/80 text-sm mb-4'>
							<span>Account</span>
							<span>→</span>
							<span className='text-white'>Sign Up</span>
						</div>
						<h1 className='text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight'>
							Join the Luxury Circle
						</h1>
						<p className='text-white/80 text-lg'>
							Create an account to enjoy exclusive benefits, early access, and personalized service.
						</p>
					</motion.div>
				</div>
			</div>

			{/* Sign Up Form */}
			<div className='max-w-md mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-10 pb-16'>
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.2 }}
					className='bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden'
				>
					<div className='absolute top-0 left-0 w-full h-1 bg-gray-900' />
					
					<div className='p-8 sm:p-10'>
						<div className='text-center mb-8'>
							<div className='w-16 h-16 bg-gray-900 rounded-2xl flex items-center justify-center mx-auto mb-4'>
								<UserPlus size={28} className='text-white' />
							</div>
							<h2 className='text-2xl font-bold text-gray-900'>Create Account</h2>
							<p className='text-gray-500 text-sm mt-2'>Join our luxury community today</p>
						</div>

						<form onSubmit={handleSubmit} className='space-y-5'>
							<div>
								<label htmlFor='name' className='block text-sm font-medium text-gray-700 mb-2'>
									Full name
								</label>
								<div className='relative'>
									<div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
										<User className='h-5 w-5 text-gray-400' />
									</div>
									<input
										id='name'
										type='text'
										required
										value={formData.name}
										onChange={(e) => setFormData({ ...formData, name: e.target.value })}
										className='block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition'
										placeholder='James Wilson'
									/>
								</div>
							</div>

							<div>
								<label htmlFor='email' className='block text-sm font-medium text-gray-700 mb-2'>
									Email address
								</label>
								<div className='relative'>
									<div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
										<Mail className='h-5 w-5 text-gray-400' />
									</div>
									<input
										id='email'
										type='email'
										required
										value={formData.email}
										onChange={(e) => setFormData({ ...formData, email: e.target.value })}
										className='block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition'
										placeholder='hello@example.com'
									/>
								</div>
							</div>

							<div>
								<label htmlFor='password' className='block text-sm font-medium text-gray-700 mb-2'>
									Password
								</label>
								<div className='relative'>
									<div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
										<Lock className='h-5 w-5 text-gray-400' />
									</div>
									<input
										id='password'
										type={showPassword ? "text" : "password"}
										required
										value={formData.password}
										onChange={(e) => setFormData({ ...formData, password: e.target.value })}
										className='block w-full pl-10 pr-10 py-2.5 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition'
										placeholder='Create a strong password'
									/>
									<button
										type='button'
										onClick={() => setShowPassword(!showPassword)}
										className='absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition'
									>
										{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
									</button>
								</div>
								<p className='text-xs text-gray-400 mt-1'>Must be at least 6 characters</p>
							</div>

							<div>
								<label htmlFor='confirmPassword' className='block text-sm font-medium text-gray-700 mb-2'>
									Confirm password
								</label>
								<div className='relative'>
									<div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
										<Check className='h-5 w-5 text-gray-400' />
									</div>
									<input
										id='confirmPassword'
										type={showConfirmPassword ? "text" : "password"}
										required
										value={formData.confirmPassword}
										onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
										className='block w-full pl-10 pr-10 py-2.5 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition'
										placeholder='Confirm your password'
									/>
									<button
										type='button'
										onClick={() => setShowConfirmPassword(!showConfirmPassword)}
										className='absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition'
									>
										{showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
									</button>
								</div>
							</div>

							<button
								type='submit'
								disabled={loading}
								className='w-full bg-gray-900 hover:bg-gray-800 text-white py-3 rounded-lg font-semibold transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed'
							>
								{loading ? (
									<>
										<Loader className='h-5 w-5 animate-spin' />
										Creating account...
									</>
								) : (
									<>
										<UserPlus size={18} />
										Create Account
									</>
								)}
							</button>
						</form>

						<div className='mt-8 pt-6 border-t border-gray-100'>
							<p className='text-center text-sm text-gray-500'>
								Already have an account?{" "}
								<Link to='/login' className='font-semibold text-gray-900 hover:text-gray-600 transition inline-flex items-center gap-1'>
									Sign in <ArrowRight size={14} />
								</Link>
							</p>
						</div>

						{/* Benefits Section */}
						<div className='mt-6'>
							<p className='text-center text-xs text-gray-400 mb-3'>By signing up, you'll get:</p>
							<div className='grid grid-cols-2 gap-2'>
								<div className='flex items-center gap-1 text-xs text-gray-500'>
									<Gift size={12} className='text-gray-600' />
									<span>15% welcome discount</span>
								</div>
								<div className='flex items-center gap-1 text-xs text-gray-500'>
									<Truck size={12} className='text-gray-600' />
									<span>Free express shipping</span>
								</div>
								<div className='flex items-center gap-1 text-xs text-gray-500'>
									<Shield size={12} className='text-gray-600' />
									<span>Exclusive previews</span>
								</div>
								<div className='flex items-center gap-1 text-xs text-gray-500'>
									<Lock size={12} className='text-gray-600' />
									<span>Secure checkout</span>
								</div>
							</div>
						</div>

						{/* Terms */}
						<div className='mt-6 text-center'>
							<p className='text-xs text-gray-400'>
								By signing up, you agree to our{" "}
								<Link to='/terms' className='text-gray-600 hover:text-gray-900 transition'>
									Terms of Service
								</Link>{" "}
								and{" "}
								<Link to='/privacy' className='text-gray-600 hover:text-gray-900 transition'>
									Privacy Policy
								</Link>
							</p>
						</div>
					</div>
				</motion.div>
			</div>
		</div>
	);
};

export default SignUpPage;