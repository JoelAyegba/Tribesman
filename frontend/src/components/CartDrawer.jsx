import { useCart } from '../context/CartContext';

export default function CartDrawer() {
    const {
        cartItems,
        isCartOpen,
        setIsCartOpen,
        updateQuantity,
        removeFromCart,
        cartTotal
    } = useCart();

    return (
        <>
            {/* Backdrop */}
            <div
                className={`side-drawer-backdrop ${isCartOpen ? 'open' : ''}`}
                onClick={() => setIsCartOpen(false)}
            />

            {/* Sidebar Cart */}
            <div className={`side-drawer ${isCartOpen ? 'open' : ''}`}>
                <div className="drawer-header">
                    <h2>Shopping Bag</h2>
                    <button className="drawer-close" onClick={() => setIsCartOpen(false)}>
                        &times;
                    </button>
                </div>

                <div className="drawer-body no-scrollbar">
                    {cartItems.length === 0 ? (
                        <div style={{
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            textAlign: 'center',
                            color: 'var(--medium-text)'
                        }}>
                            <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', marginBottom: '15px' }}>
                                Your archives are empty
                            </p>
                            <button
                                className="btn-secondary"
                                onClick={() => setIsCartOpen(false)}
                                style={{ padding: '10px 20px', fontSize: '9px' }}
                            >
                                Continue Browsing
                            </button>
                        </div>
                    ) : (
                        cartItems.map(item => (
                            <div key={`${item.id}-${item.selectedSize}`} className="cart-item">
                                <div className="cart-item-img">
                                    {item.image_url ? (
                                        <img src={item.image_url} alt={item.name} />
                                    ) : (
                                        <div style={{
                                            width: '100%',
                                            height: '100%',
                                            backgroundColor: 'var(--gray-bg)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontSize: '10px'
                                        }}>
                                            No Image
                                        </div>
                                    )}
                                </div>
                                <div className="cart-item-details">
                                    <div>
                                        <h4>{item.name}</h4>
                                        <p style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--medium-text)', marginTop: '2px' }}>
                                            Size: {item.selectedSize}
                                        </p>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
                                        <div className="qty-control">
                                            <button
                                                className="qty-btn"
                                                onClick={() => updateQuantity(item.id, item.selectedSize, -1)}
                                            >
                                                -
                                            </button>
                                            <span className="qty-val">{item.quantity}</span>
                                            <button
                                                className="qty-btn"
                                                onClick={() => updateQuantity(item.id, item.selectedSize, 1)}
                                            >
                                                +
                                            </button>
                                        </div>
                                        <span className="price">${(item.price * item.quantity).toLocaleString()}</span>
                                    </div>
                                    <button
                                        className="cart-item-remove"
                                        onClick={() => removeFromCart(item.id, item.selectedSize)}
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {cartItems.length > 0 && (
                    <div className="drawer-footer">
                        <div className="summary-row">
                            <span className="label">Order Subtotal</span>
                            <span className="value">${cartTotal.toLocaleString()}</span>
                        </div>
                        <p style={{ fontSize: '10px', color: 'var(--medium-text)', marginBottom: '25px', lineHeight: '1.4' }}>
                            Taxes and shipping calculated at checkout. Custom garment box shipping included.
                        </p>
                        <button
                            className="btn"
                            style={{ width: '100%' }}
                            onClick={() => alert('Checkout demo complete. Secure payment integrations (Stripe/Paystack) are ready to be integrated.')}
                        >
                            Proceed to Checkout
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}
