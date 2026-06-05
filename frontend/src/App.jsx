import { Navigate, Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import AdminPage from "./pages/AdminPage";
import CategoryPage from "./pages/CategoryPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import ProfilePage from "./pages/ProfilePage";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import { Toaster } from "react-hot-toast";
import { useUserStore } from "./stores/useUserStore";
import { useEffect } from "react";
import LoadingSpinner from "./components/LoadingSpinner";
import CartPage from "./pages/CartPage";
import { useCartStore } from "./stores/useCartStore";
import PurchaseSuccessPage from "./pages/PurchaseSuccessPage";
import PurchaseCancelPage from "./pages/PurchaseCancelPage";
import ReturnPolicyPage from "./pages/ReturnPolicyPage";
import TermsPage from "./pages/TermsPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import FAQPage from "./pages/FAQPage";
import ShippingPage from "./pages/ShippingPage";

function App() {
	const { user, checkAuth, checkingAuth } = useUserStore();
	const { getCartItems } = useCartStore();
	useEffect(() => {
		checkAuth();
	}, [checkAuth]);

	useEffect(() => {
		if (!user) return;

		getCartItems();
	}, [getCartItems, user]);

	if (checkingAuth) return <LoadingSpinner />;

	return (
		<div className='min-h-screen bg-slate-50 text-slate-900 relative overflow-hidden'>
			{/* Background gradient */}
			<div className='absolute inset-0 overflow-hidden'>
				<div className='absolute inset-0'>
					<div className='absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.15)_0%,rgba(204,251,241,0.25)_45%,rgba(255,255,255,0)_100%)]' />
				</div>
			</div>

			<div className='relative z-50 pt-20'>
				<ScrollToTop />
				<Navbar />
				<Routes>
					<Route path='/' element={<HomePage />} />
					<Route path='/signup' element={!user ? <SignUpPage /> : <Navigate to='/' />} />
					<Route path='/login' element={!user ? <LoginPage /> : <Navigate to='/' />} />
					<Route path='/product/:id' element={<ProductDetailPage />} />
					<Route
						path='/secret-dashboard'
						element={user?.role === "admin" ? <AdminPage /> : <Navigate to='/login' />}
					/>
					<Route path='/category/:category' element={<CategoryPage />} />
					<Route path='/jeans' element={<Navigate to='/category/jeans' replace />} />
					<Route path='/t-shirts' element={<Navigate to='/category/t-shirts' replace />} />
					<Route path='/shoes' element={<Navigate to='/category/shoes' replace />} />
					<Route path='/glasses' element={<Navigate to='/category/glasses' replace />} />
					<Route path='/jackets' element={<Navigate to='/category/jackets' replace />} />
					<Route path='/suits' element={<Navigate to='/category/suits' replace />} />
					<Route path='/bags' element={<Navigate to='/category/bags' replace />} />
					<Route path='/cart' element={user ? <CartPage /> : <Navigate to='/login' />} />
					<Route path='/profile' element={user ? <ProfilePage /> : <Navigate to='/login' />} />
					<Route
						path='/purchase-success'
						element={user ? <PurchaseSuccessPage /> : <Navigate to='/login' />}
					/>
					<Route path='/purchase-cancel' element={user ? <PurchaseCancelPage /> : <Navigate to='/login' />} />
					<Route path='/returns' element={<ReturnPolicyPage />} />
					<Route path='/terms' element={<TermsPage />} />
					<Route path='/privacy' element={<PrivacyPolicyPage />} />
					<Route path='/about' element={<AboutPage />} />
					<Route path='/contact' element={<ContactPage />} />
					<Route path='/faq' element={<FAQPage />} />
					<Route path='/shipping' element={<ShippingPage />} />
				</Routes>
			</div>
			<Footer />
			<Toaster />
		</div>
	);
}

export default App;
