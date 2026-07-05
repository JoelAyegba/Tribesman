import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './../index.css';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { cartCount, setIsCartOpen } = useCart();
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem('theme') || 'dark';
    });

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => prev === 'light' ? 'dark' : 'light');
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <>
            <header className="navbar">
                <div className="container">
                    <div className="logo">
                        <Link to="/">TRIBESMAN</Link>
                    </div>

                    <ul className="nav-menu">
                        <li><Link to="/">Collections</Link></li>
                        <li><Link to="/catalog">Catalog</Link></li>
                        <li><Link to="/about">About</Link></li>
                        <li><a href="/#contact">Contact</a></li>
                    </ul>

                    <div className="nav-actions">
                        {/* Theme Toggle */}
                        <button onClick={toggleTheme} className="nav-action-btn">
                            {theme === 'light' ? 'Dark' : 'Light'}
                        </button>

                        {/* Cart Toggle */}
                        <button onClick={() => setIsCartOpen(true)} className="nav-action-btn">
                            Bag <span className="cart-badge">{cartCount}</span>
                        </button>

                        {/* Hamburger Button */}
                        <button className={`hamburger ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu}>
                            <span></span>
                            <span></span>
                            <span></span>
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Dropdown Screens Cover */}
            <div className={`mobile-overlay ${isMenuOpen ? 'open' : ''}`}>
                <ul className="mobile-nav-links">
                    <li><Link to="/" onClick={() => setIsMenuOpen(false)}>Collections</Link></li>
                    <li><Link to="/catalog" onClick={() => setIsMenuOpen(false)}>Catalog</Link></li>
                    <li><Link to="/about" onClick={() => setIsMenuOpen(false)}>About Us</Link></li>
                    <li><a href="/#contact" onClick={() => setIsMenuOpen(false)}>Contact</a></li>
                </ul>
            </div>
        </>
    );
};

export default Navbar;
