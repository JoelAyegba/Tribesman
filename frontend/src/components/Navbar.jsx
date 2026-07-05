import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './../index.css';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [isVisible, setIsVisible] = useState(true);
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

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY > 100 && currentScrollY > lastScrollY) {
                // Scrolling down: hide header
                setIsVisible(false);
            } else {
                // Scrolling up: reveal header
                setIsVisible(true);
            }
            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    return (
        <>
            <header className={`navbar ${!isVisible ? 'navbar-hidden' : ''}`}>
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

                    <div style={{ display: 'flex', alignItems: 'center', gap: '25px' }}>
                        {/* Theme Toggle */}
                        <button
                            onClick={toggleTheme}
                            style={{
                                background: 'transparent',
                                border: 'none',
                                color: 'var(--primary-color)',
                                fontFamily: 'var(--font-sans)',
                                fontSize: '10px',
                                letterSpacing: '2.5px',
                                textTransform: 'uppercase',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center'
                            }}
                        >
                            {theme === 'light' ? 'Dark' : 'Light'}
                        </button>

                        {/* Cart Toggle */}
                        <button
                            onClick={() => setIsCartOpen(true)}
                            style={{
                                background: 'transparent',
                                border: 'none',
                                color: 'var(--primary-color)',
                                fontFamily: 'var(--font-sans)',
                                fontSize: '10px',
                                letterSpacing: '2.5px',
                                textTransform: 'uppercase',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center'
                            }}
                        >
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
