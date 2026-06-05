import { Link } from "react-router-dom";
import { Truck } from "lucide-react";
import InfoPageLayout from "../components/InfoPageLayout";

const ShippingPage = () => {
	return (
		<InfoPageLayout
			title='Shipping Information'
			subtitle='Fast, reliable delivery straight to your door.'
			icon={Truck}
			lastUpdated='June 1, 2026'
		>
			<h2>Free Shipping</h2>
			<p>
				Enjoy <strong>free standard shipping</strong> on all orders over <strong>$50</strong> within
				the continental United States. No code needed — the discount is applied automatically at checkout.
			</p>

			<h2>Shipping Methods & Delivery Times</h2>
			<div className='overflow-x-auto'>
				<table className='w-full text-sm border-collapse'>
					<thead>
						<tr className='border-b border-slate-200'>
							<th className='text-left py-3 pr-4 font-semibold text-slate-800'>Method</th>
							<th className='text-left py-3 pr-4 font-semibold text-slate-800'>Cost</th>
							<th className='text-left py-3 font-semibold text-slate-800'>Estimated Delivery</th>
						</tr>
					</thead>
					<tbody>
						<tr className='border-b border-slate-100'>
							<td className='py-3 pr-4'>Standard</td>
							<td className='py-3 pr-4'>$5.99 (Free over $50)</td>
							<td className='py-3'>5–7 business days</td>
						</tr>
						<tr className='border-b border-slate-100'>
							<td className='py-3 pr-4'>Express</td>
							<td className='py-3 pr-4'>$12.99</td>
							<td className='py-3'>2–3 business days</td>
						</tr>
						<tr>
							<td className='py-3 pr-4'>Overnight</td>
							<td className='py-3 pr-4'>$24.99</td>
							<td className='py-3'>Next business day</td>
						</tr>
					</tbody>
				</table>
			</div>
			<p className='text-sm text-slate-500 mt-2'>
				Delivery times are estimates and begin after your order has been processed and shipped.
			</p>

			<h2>Order Processing</h2>
			<p>
				Orders placed before <strong>2:00 PM EST</strong> on business days are typically processed
				the same day. Orders placed after cutoff or on weekends/holidays ship the next business day.
				You will receive a confirmation email with tracking information once your order ships.
			</p>

			<h2>International Shipping</h2>
			<p>
				We currently ship to the United States, Canada, United Kingdom, and select European countries.
				International shipping rates and delivery times vary by destination. Customs duties and import
				taxes may apply and are the responsibility of the recipient.
			</p>

			<h2>Order Tracking</h2>
			<p>
				Track your order anytime from your <Link to='/profile'>account profile</Link> or using the
				tracking link in your shipping confirmation email. Tracking updates may take 24 hours to appear
				after your package is picked up by the carrier.
			</p>

			<h2>Shipping Issues</h2>
			<ul>
				<li><strong>Lost packages:</strong> Contact us if your tracking shows delivered but you haven't received it within 48 hours</li>
				<li><strong>Damaged in transit:</strong> Report within 48 hours with photos — we'll send a replacement at no cost</li>
				<li><strong>Wrong address:</strong> Contact us immediately if you need to update your shipping address before dispatch</li>
			</ul>

			<h2>Need Help?</h2>
			<p>
				Questions about your shipment? Visit our <Link to='/faq'>FAQ</Link> or{" "}
				<Link to='/contact'>Contact us</Link> at{" "}
				<a href='mailto:shipping@stylehub.com'>shipping@stylehub.com</a>.
			</p>
		</InfoPageLayout>
	);
};

export default ShippingPage;
