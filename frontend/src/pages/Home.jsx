import { useEffect } from 'react';

const Home = () => {
    useEffect(() => {
        // Handle smooth scroll for contact section hash
        if (window.location.hash === '#contact') {
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, []);

    return (
        <main>
            {/* Hero Section */}
            <section className="hero">
                <div className="container">
                    <div className="hero-content">
                        <h1>Discover African<br />Elegance</h1>
                        <p>Tribesman Fashion Design blends heritage with modern luxury to create bold, unforgettable pieces.</p>
                        <div className="hero-accent"></div>
                        <div className="hero-buttons">
                            <a href="/catalog" className="btn btn-primary">Shop Collection</a>
                            <a href="/about" className="btn btn-secondary">Our Heritage</a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Section */}
            <section className="featured">
                <div className="container">
                    <h2 className="section-title">New Arrivals</h2>
                    <div className="featured-grid">
                        <div className="featured-item">
                            <div className="featured-img" style={{ backgroundImage: "url('../assets/placeholder1.jpg')" }}>
                                <div className="featured-overlay">
                                    <a href="/catalog" className="btn btn-primary">View Output</a>
                                </div>
                            </div>
                            <h3>The Royal Agbada</h3>
                        </div>
                        <div className="featured-item">
                            <div className="featured-img" style={{ backgroundImage: "url('../assets/placeholder2.jpg')" }}>
                                <div className="featured-overlay">
                                    <a href="/catalog" className="btn btn-primary">View Output</a>
                                </div>
                            </div>
                            <h3>Modern Ankara Suit</h3>
                        </div>
                        <div className="featured-item">
                            <div className="featured-img" style={{ backgroundImage: "url('../assets/placeholder3.jpg')" }}>
                                <div className="featured-overlay">
                                    <a href="/catalog" className="btn btn-primary">View Output</a>
                                </div>
                            </div>
                            <h3>Heritage Senator</h3>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="contact">
                <div className="container">
                    <h2 className="section-title">Get in Touch</h2>
                    <div className="contact-content">
                        <div className="contact-info">
                            <i className="fas fa-envelope"></i>
                            <p>contact@tribesmanfashion.com</p>
                        </div>
                        <div className="contact-info">
                            <i className="fas fa-phone"></i>
                            <p>+234 800 123 4567</p>
                        </div>
                        <div className="contact-info">
                            <i className="fas fa-map-marker-alt"></i>
                            <p>Lagos, Nigeria</p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Home;
