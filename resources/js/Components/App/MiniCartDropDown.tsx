import {usePage } from '@inertiajs/react';
import { CurrencyFormatter } from '../Core/CurrencyFormatter';
import { Link } from '../Core/Link';

export const MiniCartDropDowm = ({ onClose }: { onClose?: () => void }) => {

    const { totalPrice, totalQuantity, miniCartItems } = usePage().props;

    return (
        <>
            <div
                tabIndex={0}
                className="card card-compact dropdown-content
                           bg-base-100 z-[50] mt-3 w-full md:w-[400px] shadow
                          ">
                <div className="card-body">
                    <div className="flex items-center justify-between">
                        <span className="text-lg font-bold">{totalQuantity} Items</span>
                        {onClose && (
                            <button
                                onClick={onClose}
                                className="btn btn-ghost btn-sm btn-circle">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        )}
                    </div>
                    <div className="my-4 max-h-[300px] overflow-auto">
                        {miniCartItems.length === 0 && (
                            <div className="py-2 text-gray-500 text-center">
                                You don't have any items yet
                            </div>
                        )}
                        {miniCartItems.map((item) => (
                            <div key={item.id} className="flex gap-4 p-3">
                                <Link href={route('product.show', item.id)}
                                      onClick={onClose}
                                      className='w-16 h-16 flex justify-center items-center'>
                                 <img src={item.image}
                                      alt='Item Image'
                                      className='max-w-full max-h-full'/>
                                </Link>
                                <div className="flex-1 min-w-0">
                                    <h3 className='mb-3 font-semibold line-clamp-2'>
                                        <Link href={route('product.show', item.id)}
                                              onClick={onClose}>
                                            {item.title}
                                        </Link>
                                    </h3>
                                    <div className="flex justify-between text-sm">
                                        <div className="">
                                            Quantity: {item.quantity}
                                        </div>
                                        <div className="">
                                            <CurrencyFormatter amount={item.quantity * item.price}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <span className="text-lg">
                        Subtotal: <CurrencyFormatter amount={totalPrice}/>
                    </span>
                    <div className="card-actions">
                        <Link href={route('cart.index')}
                              onClick={onClose}
                              className="btn btn-primary btn-block bg-black
                                        hover:bg-black focus:bg-black text-white">
                           View cart
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MiniCartDropDowm;
