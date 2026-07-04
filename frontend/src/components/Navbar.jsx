import { useState } from 'react';
import { Link } from 'react-router-dom';
import './../index.css';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className="navbar">
            <div className="container">
                <div className="logo">
                    <Link to="/">TRIBESMAN</Link>
                </div>
                <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
                    <li><Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link></li>
                    <li><Link to="/catalog" onClick={() => setIsMenuOpen(false)}>Catalog</Link></li>
                    <li><Link to="/about" onClick={() => setIsMenuOpen(false)}>About</Link></li>
                    <li><a href="/#contact" onClick={() => setIsMenuOpen(false)}>Contact</a></li>
                </ul>
                <div className={`menu-toggle ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}>
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
