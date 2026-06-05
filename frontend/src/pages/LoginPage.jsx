import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, ArrowRight, Loader, Eye, EyeOff } from "lucide-react";
import { useUserStore } from "../stores/useUserStore";
import toast from "react-hot-toast";

const LoginPage = () => {
const [formData, setFormData] = useState({
email: "",
password: "",
});
const [showPassword, setShowPassword] = useState(false);
const { login, loading } = useUserStore();
const navigate = useNavigate();

const handleSubmit = async (e) => {
e.preventDefault();

if (!formData.email || !formData.password) {
toast.error("Please enter both email and password");
return;
}

const result = await login(formData.email, formData.password);
if (result !== false) {
navigate("/");
}
};

return (
<div className='min-h-screen bg-gray-50'>
<div className='relative h-[300px] bg-cover bg-center bg-fixed' style={{
backgroundImage: 'url("https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?q=80&w=2070")'
}}>
<div className='absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/60 to-slate-950/70' />
<div className='absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-gray-50' />
<div className='relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center'>
<motion.div
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.6 }}
className='max-w-2xl'
>
<div className='flex items-center gap-2 text-white/80 text-sm mb-4'>
<span>Welcome Back</span>
<span>→</span>
<span className='text-white'>Sign In</span>
</div>
<h1 className='text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight'>
Sign into your account
</h1>
<p className='text-white/80 text-lg'>
Access your orders, saved items, and checkout faster.
</p>
</motion.div>
</div>
</div>

<div className='max-w-md mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-10 pb-16'>
<motion.div
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.6, delay: 0.2 }}
className='bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden'
>
<div className='absolute top-0 left-0 w-full h-1 bg-slate-900' />
<div className='p-8 sm:p-10'>
<div className='text-center mb-8'>
<h2 className='text-2xl font-bold text-gray-900'>Sign In</h2>
<p className='text-gray-500 text-sm mt-2'>Welcome back! Enter your credentials to continue.</p>
</div>

<form onSubmit={handleSubmit} className='space-y-5'>
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
className='block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition'
placeholder='you@example.com'
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
className='block w-full pl-10 pr-10 py-2.5 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition'
placeholder='Enter your password'
/>
<button
type='button'
onClick={() => setShowPassword(!showPassword)}
className='absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition'
>
{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
</button>
</div>
</div>

<button
type='submit'
disabled={loading}
className='w-full bg-slate-900 hover:bg-slate-800 text-white py-3 rounded-lg font-semibold transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed'
>
{loading ? (
<>
<Loader className='h-5 w-5 animate-spin' />
Signing in...
</>
) : (
"Sign In"
)}
</button>
</form>

<div className='mt-8 pt-6 border-t border-gray-100'>
<p className='text-center text-sm text-gray-500'>
New here?{" "}
<Link to='/signup' className='font-semibold text-gray-900 hover:text-gray-600 transition inline-flex items-center gap-1'>
Create account <ArrowRight size={14} />
</Link>
</p>
</div>
</div>
</motion.div>
</div>
</div>
);
};

export default LoginPage;
