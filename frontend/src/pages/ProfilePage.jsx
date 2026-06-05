import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useUserStore } from "../stores/useUserStore";
import { User, Mail, Shield, Calendar, ShoppingBag, Edit, Lock, Save, Loader, X, CheckCircle, Package, LogOut, CreditCard, MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";

const ProfilePage = () => {
	const { user, orders, ordersLoading, getProfileOrders, updateProfile, loading, logout } = useUserStore();
	const [name, setName] = useState(user?.name || "");
	const [email, setEmail] = useState(user?.email || "");
	const [phone, setPhone] = useState(user?.phone || "");
	const [address, setAddress] = useState(user?.address || "");
	const [currentPassword, setCurrentPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [isEditing, setIsEditing] = useState(false);
	const [showPasswordChange, setShowPasswordChange] = useState(false);
	const [activeTab, setActiveTab] = useState("profile");

	useEffect(() => { getProfileOrders(); }, [getProfileOrders]);

	const handleUpdateProfile = async (e) => {
		e.preventDefault();
		const updateData = { name, email, phone, address };
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
	
	const inputCls = "w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition text-sm";
	const labelCls = "block text-xs font-medium text-gray-600 mb-1.5";

	return (
		<div className='min-h-screen bg-gray-50'>
			{/* Hero Section with Background Image */}
			<div className='relative h-[250px] bg-cover bg-center bg-fixed' style={{
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
							<span className='text-white'>My Profile</span>
						</div>
						<h1 className='text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight'>
							My Profile
						</h1>
						<p className='text-white/80 text-lg'>
							Manage your account, view orders, and update your preferences.
						</p>
					</motion.div>
				</div>
			</div>

			{/* Main Content */}
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10 pb-16'>
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
				>
					{/* Tab Navigation */}
					<div className='bg-white rounded-2xl shadow-sm border border-gray-200 mb-6 overflow-hidden'>
						<div className='flex'>
							<button
								onClick={() => setActiveTab("profile")}
								className={`flex-1 py-4 text-center font-medium transition-all relative ${
									activeTab === "profile" ? 'text-gray-900 bg-gray-50' : 'text-gray-500 hover:text-gray-700'
								}`}
							>
								<div className='flex items-center justify-center gap-2'>
									<User size={18} />
									Profile Details
								</div>
								{activeTab === "profile" && (
									<motion.div className='absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900' layoutId="activeTab" />
								)}
							</button>
							<button
								onClick={() => setActiveTab("orders")}
								className={`flex-1 py-4 text-center font-medium transition-all relative ${
									activeTab === "orders" ? 'text-gray-900 bg-gray-50' : 'text-gray-500 hover:text-gray-700'
								}`}
							>
								<div className='flex items-center justify-center gap-2'>
									<ShoppingBag size={18} />
									Order History
								</div>
								{activeTab === "orders" && (
									<motion.div className='absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900' layoutId="activeTab" />
								)}
							</button>
						</div>
					</div>

					{/* Profile Tab */}
					{activeTab === "profile" && (
						<div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
							{/* Profile Card */}
							<motion.div className='lg:col-span-1' initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
								<div className='bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden'>
									<div className='absolute top-0 left-0 w-full h-1 bg-gray-900' />
									<div className='p-6'>
										<div className='flex flex-col items-center text-center pb-6 border-b border-gray-100'>
											<motion.div
												className='w-24 h-24 rounded-2xl bg-gray-900 flex items-center justify-center text-white text-3xl font-bold shadow-lg mb-4'
												whileHover={{ scale: 1.05 }}
												transition={{ type: "spring", stiffness: 300 }}
											>
												{user?.name ? user.name[0].toUpperCase() : "U"}
											</motion.div>
											<h2 className='text-xl font-bold text-gray-900'>{user?.name}</h2>
											<p className='text-gray-500 text-sm mb-3'>{user?.email}</p>
											{user?.role === "admin" ? (
												<span className='inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200'>
													<Shield size={11} /> Administrator
												</span>
											) : (
												<span className='inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200'>
													<User size={11} /> Customer
												</span>
											)}
										</div>

										<div className='pt-5 space-y-3'>
											<div className='flex items-center justify-between text-sm py-2.5'>
												<span className='text-gray-500 flex items-center gap-2'><Mail size={14} className='text-gray-400' /> Email</span>
												<span className='text-gray-800 font-medium text-xs max-w-[160px] truncate'>{user?.email}</span>
											</div>
											<div className='flex items-center justify-between text-sm py-2.5'>
												<span className='text-gray-500 flex items-center gap-2'><Calendar size={14} className='text-gray-400' /> Member Since</span>
												<span className='text-gray-800 font-medium text-xs'>{formatDate(user?.createdAt)}</span>
											</div>
											<button
												onClick={() => logout()}
												className='w-full mt-4 bg-red-50 hover:bg-red-100 text-red-600 font-medium py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition border border-red-200 text-sm'
											>
												<LogOut size={15} /> Sign Out
											</button>
										</div>
									</div>
								</div>
							</motion.div>

							{/* Edit Profile Form */}
							<motion.div className='lg:col-span-2' initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
								<div className='bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden'>
									<div className='absolute top-0 left-0 w-full h-1 bg-gray-900' />
									<div className='p-6'>
										<div className='flex items-center justify-between mb-6 pb-4 border-b border-gray-100'>
											<h2 className='text-lg font-bold text-gray-900'>Account Information</h2>
											{!isEditing && (
												<button
													onClick={() => setIsEditing(true)}
													className='text-gray-600 hover:text-gray-900 text-sm font-medium flex items-center gap-1'
												>
													<Edit size={14} /> Edit
												</button>
											)}
										</div>

										<AnimatePresence mode="wait">
											{!isEditing ? (
												<motion.div key="view" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className='space-y-4'>
													<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
														<div>
															<label className={labelCls}>Full Name</label>
															<p className='text-gray-900 font-medium'>{user?.name || "Not set"}</p>
														</div>
														<div>
															<label className={labelCls}>Email Address</label>
															<p className='text-gray-900 font-medium'>{user?.email}</p>
														</div>
														<div>
															<label className={labelCls}>Phone Number</label>
															<p className='text-gray-900 font-medium'>{user?.phone || "Not set"}</p>
														</div>
														<div>
															<label className={labelCls}>Address</label>
															<p className='text-gray-900 font-medium'>{user?.address || "Not set"}</p>
														</div>
													</div>
												</motion.div>
											) : (
												<motion.form key="edit" onSubmit={handleUpdateProfile} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className='space-y-4'>
													<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
														<div>
															<label className={labelCls}>Full Name</label>
															<div className='relative'>
																<User className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' size={15} />
																<input type='text' value={name} onChange={(e) => setName(e.target.value)} required className={`${inputCls} pl-9`} placeholder='Your name' />
															</div>
														</div>
														<div>
															<label className={labelCls}>Email Address</label>
															<div className='relative'>
																<Mail className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' size={15} />
																<input type='email' value={email} onChange={(e) => setEmail(e.target.value)} required className={`${inputCls} pl-9`} placeholder='your@email.com' />
															</div>
														</div>
														<div>
															<label className={labelCls}>Phone Number</label>
															<div className='relative'>
																<Phone className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' size={15} />
																<input type='tel' value={phone} onChange={(e) => setPhone(e.target.value)} className={`${inputCls} pl-9`} placeholder='+1 234 567 8900' />
															</div>
														</div>
														<div>
															<label className={labelCls}>Address</label>
															<div className='relative'>
																<MapPin className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' size={15} />
																<input type='text' value={address} onChange={(e) => setAddress(e.target.value)} className={`${inputCls} pl-9`} placeholder='Your address' />
															</div>
														</div>
													</div>

													<button type='button' onClick={() => setShowPasswordChange(!showPasswordChange)}
														className='text-xs text-gray-600 hover:text-gray-900 font-medium flex items-center gap-1.5 focus:outline-none'>
														<Lock size={11} /> {showPasswordChange ? "Cancel password change" : "Change Password?"}
													</button>

													<AnimatePresence>
														{showPasswordChange && (
															<motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
																className='space-y-3 overflow-hidden border-t border-gray-100 pt-3'>
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
														<button type='button'
															onClick={() => { setIsEditing(false); setName(user?.name || ""); setEmail(user?.email || ""); setPhone(user?.phone || ""); setAddress(user?.address || ""); setShowPasswordChange(false); }}
															className='flex-1 border border-gray-200 text-gray-600 hover:bg-gray-50 font-medium py-2 rounded-lg text-sm flex items-center justify-center gap-1.5 transition'
														>
															<X size={14} /> Cancel
														</button>
														<button type='submit' disabled={loading}
															className='flex-1 bg-gray-900 hover:bg-gray-800 disabled:opacity-50 text-white font-medium py-2 rounded-lg text-sm flex items-center justify-center gap-1.5 transition'
														>
															{loading ? <Loader className='animate-spin' size={15} /> : <><Save size={14} /> Save Changes</>}
														</button>
													</div>
												</motion.form>
											)}
										</AnimatePresence>
									</div>
								</div>
							</motion.div>
						</div>
					)}

					{/* Orders Tab */}
					{activeTab === "orders" && (
						<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
							<div className='bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden'>
								<div className='absolute top-0 left-0 w-full h-1 bg-gray-900' />
								<div className='p-6'>
									<h2 className='text-lg font-bold text-gray-900 mb-6 flex items-center gap-2.5 pb-4 border-b border-gray-100'>
										<ShoppingBag size={18} className='text-gray-700' />
										Order History
										{orders?.length > 0 && (
											<span className='ml-auto text-xs font-medium bg-gray-100 text-gray-700 px-2.5 py-1 rounded-full'>
												{orders.length} orders
											</span>
										)}
									</h2>

									{ordersLoading ? (
										<div className='flex flex-col items-center justify-center py-16'>
											<div className='relative w-12 h-12 mb-4'>
												<div className='absolute inset-0 rounded-full border-2 border-gray-100' />
												<div className='absolute inset-0 rounded-full border-t-2 border-gray-900 animate-spin' />
											</div>
											<p className='text-gray-500 text-sm font-medium'>Loading orders...</p>
										</div>
									) : orders.length === 0 ? (
										<div className='flex flex-col items-center justify-center py-16 text-center'>
											<div className='w-20 h-20 rounded-2xl bg-gray-100 flex items-center justify-center mb-5'>
												<ShoppingBag size={32} className='text-gray-400' />
											</div>
											<h3 className='text-lg font-bold text-gray-800 mb-2'>No orders yet</h3>
											<p className='text-gray-500 text-sm max-w-xs'>Explore our collection and place your first order!</p>
											<Link to='/shop' className='mt-4 bg-gray-900 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition'>
												Start Shopping
											</Link>
										</div>
									) : (
										<div className='space-y-4'>
											{orders.map((order, i) => (
												<motion.div key={order._id}
													className='border border-gray-200 hover:border-gray-300 rounded-xl p-4 transition-all duration-200 hover:shadow-md bg-white'
													initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: i * 0.05 }}
												>
													<div className='flex flex-wrap items-start justify-between gap-3 mb-4 pb-3 border-b border-gray-100'>
														<div>
															<p className='text-[10px] font-medium uppercase tracking-wider text-gray-400 mb-0.5'>Order ID</p>
															<p className='text-xs font-mono font-semibold text-gray-700 max-w-[180px] truncate'>{order._id}</p>
														</div>
														<div className='text-right'>
															<p className='text-[10px] font-medium uppercase tracking-wider text-gray-400 mb-0.5'>Date</p>
															<p className='text-xs font-medium text-gray-700'>{formatDate(order.createdAt)}</p>
														</div>
														<div className='text-right'>
															<p className='text-[10px] font-medium uppercase tracking-wider text-gray-400 mb-0.5'>Total</p>
															<p className='text-base font-bold text-gray-900'>${order.totalAmount?.toFixed(2)}</p>
														</div>
														<span className='inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border bg-green-50 text-green-700 border-green-200'>
															<CheckCircle size={10} /> Completed
														</span>
													</div>
													<div className='space-y-2.5'>
														{order.products.map((item, idx) => (
															<div key={idx} className='flex items-center gap-3'>
																<div className='w-12 h-12 rounded-lg bg-gray-100 flex-shrink-0 overflow-hidden border border-gray-200'>
																	<img src={item.product?.image || "https://via.placeholder.com/150"} alt={item.product?.name || "Product"} className='w-full h-full object-cover' />
																</div>
																<div className='flex-grow min-w-0'>
																	<p className='text-sm font-semibold text-gray-800 truncate'>{item.product?.name || "Deleted Product"}</p>
																	<p className='text-xs text-gray-400 font-medium capitalize'>{item.product?.category || "N/A"}</p>
																</div>
																<div className='text-right flex-shrink-0'>
																	<p className='text-sm font-bold text-gray-900'>${item.price?.toFixed(2)}</p>
																	<p className='text-xs text-gray-400'>×{item.quantity}</p>
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
					)}
				</motion.div>
			</div>
		</div>
	);
};

export default ProfilePage;