import { Link } from "react-router-dom";
import { Shield } from "lucide-react";
import InfoPageLayout from "../components/InfoPageLayout";

const PrivacyPolicyPage = () => {
	return (
		<InfoPageLayout
			title='Privacy Policy'
			subtitle="Your privacy matters. Here's how we collect, use, and protect your data."
			icon={Shield}
			lastUpdated='June 1, 2026'
		>
			<h2>Information We Collect</h2>
			<p>We collect information you provide directly and data collected automatically when you use StyleHub:</p>
			<ul>
				<li><strong>Account data:</strong> name, email address, password (encrypted), and profile preferences</li>
				<li><strong>Order data:</strong> shipping address, billing information, purchase history</li>
				<li><strong>Communication data:</strong> messages sent to customer support</li>
				<li><strong>Usage data:</strong> pages visited, products viewed, device type, browser, IP address</li>
				<li><strong>Cookies:</strong> session cookies and analytics cookies to improve your experience</li>
			</ul>

			<h2>How We Use Your Information</h2>
			<p>We use your information to:</p>
			<ul>
				<li>Process and fulfill your orders</li>
				<li>Manage your account and provide customer support</li>
				<li>Send order confirmations, shipping updates, and promotional emails (with your consent)</li>
				<li>Improve our website, products, and services</li>
				<li>Detect and prevent fraud and unauthorized activity</li>
				<li>Comply with legal obligations</li>
			</ul>

			<h2>Information Sharing</h2>
			<p>We do not sell your personal information. We may share data with:</p>
			<ul>
				<li><strong>Service providers:</strong> payment processors, shipping carriers, and email services</li>
				<li><strong>Legal requirements:</strong> when required by law or to protect our rights</li>
				<li><strong>Business transfers:</strong> in connection with a merger, acquisition, or sale of assets</li>
			</ul>

			<h2>Data Security</h2>
			<p>
				We implement industry-standard security measures including SSL encryption, secure payment
				processing, and access controls. While we take reasonable precautions, no method of
				transmission over the internet is 100% secure.
			</p>

			<h2>Your Rights</h2>
			<p>Depending on your location, you may have the right to:</p>
			<ul>
				<li>Access the personal data we hold about you</li>
				<li>Request correction of inaccurate data</li>
				<li>Request deletion of your data</li>
				<li>Opt out of marketing communications</li>
				<li>Request data portability</li>
			</ul>
			<p>
				To exercise these rights, contact us at{" "}
				<a href='mailto:privacy@stylehub.com'>privacy@stylehub.com</a> or through your{" "}
				<Link to='/profile'>account settings</Link>.
			</p>

			<h2>Cookies</h2>
			<p>
				We use cookies to remember your preferences, keep you logged in, and analyze site traffic.
				You can control cookies through your browser settings. Disabling cookies may affect site functionality.
			</p>

			<h2>Children's Privacy</h2>
			<p>
				StyleHub is not intended for users under 18. We do not knowingly collect personal information
				from children. If you believe we have collected data from a minor, please contact us immediately.
			</p>

			<h2>Changes to This Policy</h2>
			<p>
				We may update this Privacy Policy periodically. We will notify you of significant changes
				via email or a prominent notice on our website.
			</p>

			<h2>Contact Us</h2>
			<p>
				Privacy questions? Email{" "}
				<a href='mailto:privacy@stylehub.com'>privacy@stylehub.com</a> or visit our{" "}
				<Link to='/contact'>Contact page</Link>.
			</p>
		</InfoPageLayout>
	);
};

export default PrivacyPolicyPage;
