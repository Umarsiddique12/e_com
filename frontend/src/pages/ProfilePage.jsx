import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useUserStore } from "../stores/useUserStore";
import { User, Mail, Shield, Calendar, ShoppingBag, Edit, Lock, Save, Loader, X, CheckCircle, Package } from "lucide-react";

const ProfilePage = () => {
	const { user, orders, ordersLoading, getProfileOrders, updateProfile, loading } = useUserStore();
	const [name, setName] = useState(user?.name || "");
	const [email, setEmail] = useState(user?.email || "");
	const [currentPassword, setCurrentPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [isEditing, setIsEditing] = useState(false);
	const [showPasswordChange, setShowPasswordChange] = useState(false);

	useEffect(() => { getProfileOrders(); }, [getProfileOrders]);

	const handleUpdateProfile = async (e) => {
		e.preventDefault();
		const updateData = { name, email };
		if (showPasswordChange && newPassword) {
			updateData.currentPassword = currentPassword;
			updateData.newPassword = newPassword;
		}
		const success = await updateProfile(updateData);
		if (success) {
			setIsEditing(false);
			setCurrentPassword(""); setNewPassword(""); setShowPasswordChange(false);
		}
	};

	const formatDate = (d) => d ? new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) : "N/A";
	const inputCls = "w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition text-sm";
	const labelCls = "block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5";

	return (
		<motion.div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10'
			initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>

			<motion.div className='mb-8' initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
				<h1 className='text-3xl font-extrabold text-slate-900 flex items-center gap-3 tracking-tight'>
					<span className='w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center'>
						<User className='text-emerald-600' size={22} />
					</span>
					My Profile
				</h1>
				<p className='text-slate-500 mt-1 ml-1'>Manage your account and view order history</p>
			</motion.div>

			<div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
				{/* LEFT — Profile Card */}
				<motion.div className='lg:col-span-1 space-y-6' initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
					<div className='bg-white border border-slate-200/80 rounded-2xl shadow-sm overflow-hidden'>
						<div className='h-1.5 w-full bg-gradient-to-r from-emerald-500 via-teal-400 to-green-400' />
						<div className='p-6'>
							<div className='flex flex-col items-center text-center pb-6 border-b border-slate-100'>
								<motion.div
									className='w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white text-3xl font-extrabold shadow-lg shadow-emerald-500/20 mb-4'
									whileHover={{ scale: 1.05, rotate: 3 }} transition={{ type: "spring", stiffness: 300 }}>
									{user?.name ? user.name[0].toUpperCase() : "U"}
								</motion.div>
								<h2 className='text-xl font-extrabold text-slate-900'>{user?.name}</h2>
								<p className='text-slate-500 text-sm mb-3'>{user?.email}</p>
								{user?.role === "admin" ? (
									<span className='inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700 border border-emerald-200'>
										<Shield size={11} /> Administrator
									</span>
								) : (
									<span className='inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-600 border border-slate-200'>
										<User size={11} /> Customer
									</span>
								)}
							</div>

							<AnimatePresence mode="wait">
								{!isEditing ? (
									<motion.div key="view" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className='pt-5 space-y-3'>
										<div className='flex items-center justify-between text-sm py-2.5 border-b border-slate-50'>
											<span className='text-slate-500 flex items-center gap-2 font-medium'><Mail size={14} className='text-emerald-500' /> Email</span>
											<span className='text-slate-800 font-semibold text-xs max-w-[160px] truncate'>{user?.email}</span>
										</div>
										<div className='flex items-center justify-between text-sm py-2.5'>
											<span className='text-slate-500 flex items-center gap-2 font-medium'><Calendar size={14} className='text-emerald-500' /> Member Since</span>
											<span className='text-slate-800 font-semibold text-xs'>{formatDate(user?.createdAt)}</span>
										</div>
										<motion.button onClick={() => setIsEditing(true)}
											className='w-full mt-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition border border-slate-200 text-sm'
											whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
											<Edit size={15} /> Edit Profile
										</motion.button>
									</motion.div>
								) : (
									<motion.form key="edit" onSubmit={handleUpdateProfile} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className='pt-5 space-y-4'>
										<div>
											<label className={labelCls}>Full Name</label>
											<div className='relative'>
												<User className='absolute left-3 top-1/2 -translate-y-1/2 text-slate-400' size={15} />
												<input type='text' value={name} onChange={(e) => setName(e.target.value)} required className={`${inputCls} pl-9`} placeholder='Your name' />
											</div>
										</div>
										<div>
											<label className={labelCls}>Email Address</label>
											<div className='relative'>
												<Mail className='absolute left-3 top-1/2 -translate-y-1/2 text-slate-400' size={15} />
												<input type='email' value={email} onChange={(e) => setEmail(e.target.value)} required className={`${inputCls} pl-9`} placeholder='your@email.com' />
											</div>
										</div>
										<button type='button' onClick={() => setShowPasswordChange(!showPasswordChange)}
											className='text-xs text-emerald-600 hover:text-emerald-500 font-bold flex items-center gap-1.5 focus:outline-none'>
											<Lock size={11} /> {showPasswordChange ? "Cancel password change" : "Change Password?"}
										</button>
										<AnimatePresence>
											{showPasswordChange && (
												<motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
													className='space-y-3 overflow-hidden border-t border-slate-100 pt-3'>
													<div>
														<label className={labelCls}>Current Password</label>
														<input type='password' placeholder='••••••••' value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} required={showPasswordChange} className={inputCls} />
													</div>
													<div>
														<label className={labelCls}>New Password</label>
														<input type='password' placeholder='At least 6 characters' value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required={showPasswordChange} className={inputCls} />
													</div>
												</motion.div>
											)}
										</AnimatePresence>
										<div className='flex gap-3 pt-2'>
											<motion.button type='button'
												onClick={() => { setIsEditing(false); setName(user?.name || ""); setEmail(user?.email || ""); setShowPasswordChange(false); }}
												className='flex-1 border border-slate-200 text-slate-600 hover:bg-slate-50 font-semibold py-2 rounded-xl text-sm flex items-center justify-center gap-1.5 transition'
												whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
												<X size={14} /> Cancel
											</motion.button>
											<motion.button type='submit' disabled={loading}
												className='flex-1 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold py-2 rounded-xl text-sm flex items-center justify-center gap-1.5 shadow-md shadow-emerald-600/15 transition'
												whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
												{loading ? <Loader className='animate-spin' size={15} /> : <><Save size={14} /> Save</>}
											</motion.button>
										</div>
									</motion.form>
								)}
							</AnimatePresence>
						</div>
					</div>

					{/* Stats Card */}
					<div className='bg-white border border-slate-200/80 rounded-2xl shadow-sm p-5'>
						<h3 className='text-sm font-bold text-slate-700 mb-4 flex items-center gap-2'>
							<Package size={15} className='text-emerald-500' /> Account Stats
						</h3>
						<div className='grid grid-cols-2 gap-3'>
							<div className='bg-emerald-50 rounded-xl p-3 border border-emerald-100'>
								<p className='text-2xl font-extrabold text-emerald-600'>{orders?.length || 0}</p>
								<p className='text-xs text-slate-500 font-medium mt-0.5'>Orders Placed</p>
							</div>
							<div className='bg-slate-50 rounded-xl p-3 border border-slate-100'>
								<p className='text-xl font-extrabold text-slate-700'>${orders?.reduce((s, o) => s + (o.totalAmount || 0), 0).toFixed(0) || "0"}</p>
								<p className='text-xs text-slate-500 font-medium mt-0.5'>Total Spent</p>
							</div>
						</div>
					</div>
				</motion.div>

				{/* RIGHT — Orders */}
				<motion.div className='lg:col-span-2' initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.15 }}>
					<div className='bg-white border border-slate-200/80 rounded-2xl shadow-sm overflow-hidden'>
						<div className='h-1.5 w-full bg-gradient-to-r from-emerald-500 via-teal-400 to-green-400' />
						<div className='p-6'>
							<h2 className='text-lg font-extrabold text-slate-900 mb-5 flex items-center gap-2.5 pb-4 border-b border-slate-100'>
								<span className='w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center'>
									<ShoppingBag className='text-emerald-600' size={16} />
								</span>
								Order History
								{orders?.length > 0 && (
									<span className='ml-auto text-xs font-semibold bg-emerald-100 text-emerald-700 px-2.5 py-1 rounded-full border border-emerald-200'>
										{orders.length} orders
									</span>
								)}
							</h2>

							{ordersLoading ? (
								<div className='flex flex-col items-center justify-center py-16'>
									<div className='relative w-12 h-12 mb-4'>
										<div className='absolute inset-0 rounded-full border-2 border-emerald-100' />
										<div className='absolute inset-0 rounded-full border-t-2 border-emerald-500 animate-spin' />
									</div>
									<p className='text-slate-500 text-sm font-medium'>Loading orders...</p>
								</div>
							) : orders.length === 0 ? (
								<div className='flex flex-col items-center justify-center py-16 text-center'>
									<div className='w-20 h-20 rounded-2xl bg-slate-100 flex items-center justify-center mb-5 border border-slate-200'>
										<ShoppingBag size={32} className='text-slate-400' />
									</div>
									<h3 className='text-lg font-bold text-slate-800 mb-2'>No orders yet</h3>
									<p className='text-slate-500 text-sm max-w-xs'>Explore our collection and place your first order!</p>
								</div>
							) : (
								<div className='space-y-4 overflow-y-auto max-h-[560px] pr-1'>
									{orders.map((order, i) => (
										<motion.div key={order._id}
											className='border border-slate-200/80 hover:border-emerald-300 rounded-xl p-4 transition-all duration-200 hover:shadow-md bg-white'
											initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: i * 0.05 }}
											whileHover={{ y: -1 }}>
											<div className='flex flex-wrap items-start justify-between gap-3 mb-4 pb-3 border-b border-slate-100'>
												<div>
													<p className='text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-0.5'>Order ID</p>
													<p className='text-xs font-mono font-semibold text-emerald-600 max-w-[180px] truncate'>{order._id}</p>
												</div>
												<div className='text-right'>
													<p className='text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-0.5'>Date</p>
													<p className='text-xs font-semibold text-slate-700'>{formatDate(order.createdAt)}</p>
												</div>
												<div className='text-right'>
													<p className='text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-0.5'>Total</p>
													<p className='text-base font-extrabold text-slate-900'>${order.totalAmount?.toFixed(2)}</p>
												</div>
												<span className='inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold border bg-emerald-100 text-emerald-700 border-emerald-200'>
													<CheckCircle size={10} /> Paid
												</span>
											</div>
											<div className='space-y-2.5'>
												{order.products.map((item, idx) => (
													<div key={idx} className='flex items-center gap-3'>
														<div className='w-10 h-10 rounded-lg bg-slate-100 flex-shrink-0 overflow-hidden border border-slate-200'>
															<img src={item.product?.image || "https://via.placeholder.com/150"} alt={item.product?.name || "Product"} className='w-full h-full object-cover' />
														</div>
														<div className='flex-grow min-w-0'>
															<p className='text-sm font-semibold text-slate-800 truncate'>{item.product?.name || "Deleted Product"}</p>
															<p className='text-xs text-slate-400 font-medium capitalize'>{item.product?.category || "N/A"}</p>
														</div>
														<div className='text-right flex-shrink-0'>
															<p className='text-sm font-bold text-emerald-600'>${item.price?.toFixed(2)}</p>
															<p className='text-xs text-slate-400'>×{item.quantity}</p>
														</div>
													</div>
												))}
											</div>
										</motion.div>
									))}
								</div>
							)}
						</div>
					</div>
				</motion.div>
			</div>
		</motion.div>
	);
};

export default ProfilePage;
