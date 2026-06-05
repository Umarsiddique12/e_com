import { Minus, Plus, Trash } from "lucide-react";
import { useCartStore } from "../stores/useCartStore";

const CartItem = ({ item }) => {
	const { removeFromCart, updateQuantity } = useCartStore();

	return (
		<div className='rounded-xl border p-4 shadow-sm border-slate-200 bg-white md:p-6 hover:shadow-md transition-shadow duration-300'>
			<div className='space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0'>
				<div className='shrink-0 md:order-1'>
					<img className='h-20 md:h-32 rounded-lg object-cover border border-slate-100' src={item.image} />
				</div>
				<label className='sr-only'>Choose quantity:</label>

				<div className='flex items-center justify-between md:order-3 md:justify-end'>
					<div className='flex items-center gap-3'>
						<button
							className='inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md border
							 border-slate-300 bg-slate-50 hover:bg-slate-100 focus:outline-none'
							onClick={() => updateQuantity(item._id, item.quantity - 1)}
						>
							<Minus className='text-slate-600 w-4 h-4' />
						</button>
						<p className='text-slate-800 font-bold text-sm min-w-[12px] text-center'>{item.quantity}</p>
						<button
							className='inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md border
							 border-slate-300 bg-slate-50 hover:bg-slate-100 focus:outline-none'
							onClick={() => updateQuantity(item._id, item.quantity + 1)}
						>
							<Plus className='text-slate-600 w-4 h-4' />
						</button>
					</div>

					<div className='text-end md:order-4 md:w-32'>
						<p className='text-lg font-extrabold text-emerald-600'>${item.price}</p>
					</div>
				</div>

				<div className='w-full min-w-0 flex-1 space-y-2 md:order-2 md:max-w-md'>
					<p className='text-base font-bold text-slate-800 hover:text-emerald-600 transition-colors duration-250 cursor-pointer'>
						{item.name}
					</p>
					<p className='text-sm text-slate-500 leading-relaxed'>{item.description}</p>

					<div className='flex items-center gap-4 pt-1'>
						<button
							className='inline-flex items-center gap-1 text-sm font-semibold text-red-500
							 hover:text-red-600'
							onClick={() => removeFromCart(item._id)}
						>
							<Trash size={16} />
							<span className='text-xs'>Remove</span>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
export default CartItem;
