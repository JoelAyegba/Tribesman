import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);

    // Save cart state to local storage
    useEffect(() => {
        const stored = localStorage.getItem('tribesman_cart');
        if (stored) {
            try {
                setCartItems(JSON.parse(stored));
            } catch (e) {
                console.error(e);
            }
        }
    }, []);

    const saveCart = (items) => {
        setCartItems(items);
        localStorage.setItem('tribesman_cart', JSON.stringify(items));
    };

    const addToCart = (product, size = 'M') => {
        const existingIndex = cartItems.findIndex(
            item => item.id === product.id && item.selectedSize === size
        );

        if (existingIndex > -1) {
            const updated = [...cartItems];
            updated[existingIndex].quantity += 1;
            saveCart(updated);
        } else {
            saveCart([...cartItems, { ...product, selectedSize: size, quantity: 1 }]);
        }
        setIsCartOpen(true); // Auto reveal on addition
    };

    const removeFromCart = (productId, size) => {
        saveCart(cartItems.filter(item => !(item.id === productId && item.selectedSize === size)));
    };

    const updateQuantity = (productId, size, change) => {
        const updated = cartItems.map(item => {
            if (item.id === productId && item.selectedSize === size) {
                const newQty = item.quantity + change;
                return { ...item, quantity: newQty < 1 ? 1 : newQty };
            }
            return item;
        });
        saveCart(updated);
    };

    const clearCart = () => {
        saveCart([]);
    };

    const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    const cartTotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    return (
        <CartContext.Provider value={{
            cartItems,
            isCartOpen,
            setIsCartOpen,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            cartCount,
            cartTotal
        }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    return useContext(CartContext);
}
