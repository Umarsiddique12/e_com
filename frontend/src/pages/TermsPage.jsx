import { Link } from "react-router-dom";
import { FileText } from "lucide-react";
import InfoPageLayout from "../components/InfoPageLayout";

const TermsPage = () => {
	return (
		<InfoPageLayout
			title='Terms & Conditions'
			subtitle='Please read these terms carefully before using StyleHub.'
			icon={FileText}
			lastUpdated='June 1, 2026'
		>
			<h2>1. Agreement to Terms</h2>
			<p>
				By accessing or using the StyleHub website and services, you agree to be bound by these
				Terms & Conditions and our <Link to='/privacy'>Privacy Policy</Link>. If you do not agree,
				please do not use our services.
			</p>

			<h2>2. Eligibility</h2>
			<p>
				You must be at least 18 years old to create an account and make purchases on StyleHub.
				By using our services, you represent that you meet this age requirement and have the legal
				capacity to enter into a binding agreement.
			</p>

			<h2>3. Account Registration</h2>
			<p>When you create an account, you agree to:</p>
			<ul>
				<li>Provide accurate, current, and complete information</li>
				<li>Maintain and promptly update your account information</li>
				<li>Keep your password secure and confidential</li>
				<li>Accept responsibility for all activities under your account</li>
				<li>Notify us immediately of any unauthorized use of your account</li>
			</ul>

			<h2>4. Products & Pricing</h2>
			<p>
				We strive to display accurate product descriptions, images, and prices. However, we do not
				guarantee that all information is error-free. We reserve the right to correct pricing errors,
				cancel orders placed at incorrect prices, and modify or discontinue products without notice.
				All prices are listed in USD unless otherwise stated.
			</p>

			<h2>5. Orders & Payment</h2>
			<p>
				Placing an order constitutes an offer to purchase. We reserve the right to accept or decline
				any order for any reason. Payment is processed securely through our third-party payment
				processor. By submitting payment information, you authorize us to charge the total order
				amount, including applicable taxes and shipping fees.
			</p>

			<h2>6. Shipping & Delivery</h2>
			<p>
				Shipping times and costs vary by location and shipping method selected at checkout.
				Estimated delivery dates are not guaranteed. Risk of loss passes to you upon delivery to
				the carrier. See our <Link to='/shipping'>Shipping Information</Link> page for full details.
			</p>

			<h2>7. Returns & Refunds</h2>
			<p>
				Our return and refund policies are outlined in our{" "}
				<Link to='/returns'>Return Policy</Link>. By making a purchase, you agree to the terms
				described therein.
			</p>

			<h2>8. Intellectual Property</h2>
			<p>
				All content on StyleHub — including logos, text, graphics, images, and software — is the
				property of StyleHub or its licensors and is protected by copyright and trademark laws.
				You may not reproduce, distribute, or create derivative works without our written permission.
			</p>

			<h2>9. Prohibited Conduct</h2>
			<p>You agree not to:</p>
			<ul>
				<li>Use our services for any unlawful purpose</li>
				<li>Attempt to gain unauthorized access to our systems or other users' accounts</li>
				<li>Submit false or misleading information</li>
				<li>Interfere with the proper functioning of the website</li>
				<li>Resell products purchased from StyleHub for commercial purposes without authorization</li>
			</ul>

			<h2>10. Limitation of Liability</h2>
			<p>
				To the fullest extent permitted by law, StyleHub shall not be liable for any indirect,
				incidental, special, or consequential damages arising from your use of our services.
				Our total liability for any claim shall not exceed the amount you paid for the relevant order.
			</p>

			<h2>11. Governing Law</h2>
			<p>
				These Terms are governed by the laws of the State of New York, without regard to conflict
				of law principles. Any disputes shall be resolved in the courts of New York County, New York.
			</p>

			<h2>12. Changes to Terms</h2>
			<p>
				We may update these Terms at any time. Material changes will be posted on this page with
				an updated "Last updated" date. Continued use of StyleHub after changes constitutes acceptance
				of the revised Terms.
			</p>

			<h2>13. Contact Us</h2>
			<p>
				Questions about these Terms? Reach us at{" "}
				<a href='mailto:legal@stylehub.com'>legal@stylehub.com</a> or visit our{" "}
				<Link to='/contact'>Contact page</Link>.
			</p>
		</InfoPageLayout>
	);
};

export default TermsPage;
