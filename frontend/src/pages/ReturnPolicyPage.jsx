import { Link } from "react-router-dom";
import { RotateCcw } from "lucide-react";
import InfoPageLayout from "../components/InfoPageLayout";

const ReturnPolicyPage = () => {
	return (
		<InfoPageLayout
			title='Return Policy'
			subtitle="We want you to love every purchase. If something isn't right, we're here to help."
			icon={RotateCcw}
			lastUpdated='June 1, 2026'
		>
			<h2>30-Day Hassle-Free Returns</h2>
			<p>
				At StyleHub, your satisfaction is our priority. If you're not completely happy with your order,
				you may return eligible items within <strong>30 days</strong> of delivery for a full refund or exchange.
			</p>

			<h2>Eligibility Requirements</h2>
			<p>To qualify for a return, items must meet the following conditions:</p>
			<ul>
				<li>Items must be unworn, unwashed, and in original condition with all tags attached</li>
				<li>Items must be in original packaging where applicable</li>
				<li>Proof of purchase (order number or receipt) is required</li>
				<li>Final sale items, personalized products, and intimate apparel are non-returnable</li>
				<li>Gift cards and promotional items are not eligible for returns</li>
			</ul>

			<h2>How to Start a Return</h2>
			<ol>
				<li>Log in to your <Link to='/profile'>StyleHub account</Link> and navigate to your order history</li>
				<li>Select the order containing the item(s) you wish to return</li>
				<li>Click "Request Return" and choose your reason from the dropdown</li>
				<li>Print the prepaid return shipping label we provide via email</li>
				<li>Pack items securely and drop off at any authorized shipping location</li>
			</ol>
			<p>
				Don't have an account? Contact us at{" "}
				<a href='mailto:returns@stylehub.com'>returns@stylehub.com</a> with your order number.
			</p>

			<h2>Refund Processing</h2>
			<p>
				Once we receive and inspect your return, we'll process your refund within <strong>5–7 business days</strong>.
				Refunds are issued to your original payment method. Please allow an additional 3–5 business days
				for the refund to appear on your statement, depending on your bank or card issuer.
			</p>

			<h2>Exchanges</h2>
			<p>
				Need a different size or color? Select "Exchange" when initiating your return. We'll ship your
				replacement item as soon as we receive the original. Exchanges are subject to availability.
				If your preferred option is out of stock, we'll issue a full refund instead.
			</p>

			<h2>Return Shipping Costs</h2>
			<ul>
				<li><strong>Free returns</strong> on orders over $50 within the United States</li>
				<li>A flat $5.99 return shipping fee applies to orders under $50</li>
				<li>International return shipping costs are the responsibility of the customer</li>
				<li>Defective or incorrect items: we cover all return shipping — contact us first</li>
			</ul>

			<h2>Damaged or Defective Items</h2>
			<p>
				Received a damaged or defective product? Contact us within <strong>48 hours</strong> of delivery
				at <a href='mailto:support@stylehub.com'>support@stylehub.com</a> with photos of the issue.
				We'll arrange a free return and send a replacement or full refund immediately.
			</p>

			<h2>Questions?</h2>
			<p>
				Our customer care team is available Monday–Friday, 9 AM – 6 PM EST.
				Visit our <Link to='/contact'>Contact page</Link> or email{" "}
				<a href='mailto:returns@stylehub.com'>returns@stylehub.com</a>.
			</p>
		</InfoPageLayout>
	);
};

export default ReturnPolicyPage;
