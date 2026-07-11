import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './../index.css';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
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
                        <Link to="/">
                            <img src="/logo.jpg" alt="Tribesman Logo" style={{ height: '40px', width: '40px', objectFit: 'cover', borderRadius: '50%' }} />
                        </Link>
                    </div>

                    <ul className="nav-menu">
                        <li><Link to="/">Collections</Link></li>
                        <li><Link to="/catalog">Catalog</Link></li>
                        <li><Link to="/about">About</Link></li>
                        <li><a href="/#contact">Contact</a></li>
                    </ul>

                    <div className="nav-actions">
                        {/* Theme Toggle */}
                        <button onClick={toggleTheme} className="nav-action-btn" aria-label="Toggle theme">
                            {theme === 'light' ? (
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                                </svg>
                            ) : (
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="5"/>
                                    <line x1="12" y1="1" x2="12" y2="3"/>
                                    <line x1="12" y1="21" x2="12" y2="23"/>
                                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                                    <line x1="1" y1="12" x2="3" y2="12"/>
                                    <line x1="21" y1="12" x2="23" y2="12"/>
                                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                                </svg>
                            )}
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
