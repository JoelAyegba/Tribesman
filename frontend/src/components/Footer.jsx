import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-logo">
                        <h3>TRIBESMAN</h3>
                        <p>Redefining African fashion with modern elegance.</p>
                    </div>

                    <div className="footer-links">
                        <h4>Quick Links</h4>
                        <ul>
                            <li><Link to="/catalog">Shop Catalog</Link></li>
                            <li><Link to="/about">Our Story</Link></li>
                            <li><Link to="#">Terms of Service</Link></li>
                            <li><Link to="#">Privacy Policy</Link></li>
                        </ul>
                    </div>

                    <div className="footer-social">
                        <a href="#"><i className="fab fa-instagram"></i></a>
                        <a href="#"><i className="fab fa-twitter"></i></a>
                        <a href="#"><i className="fab fa-facebook"></i></a>
                    </div>
                </div>
                <div className="copyright">
                    <p>&copy; {new Date().getFullYear()} Tribesman Fashion Design. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
