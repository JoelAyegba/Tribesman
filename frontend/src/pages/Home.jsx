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
        <main style={{ backgroundColor: 'var(--light-bg)', color: 'var(--text-color)' }}>
            {/* Immersive Hero Section */}
            <section className="hero">
                <div className="container">
                    <div className="hero-content">
                        <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '3px', color: 'var(--accent-color)', display: 'block', marginBottom: '15px' }}>
                            Winter / Spring Campaign 2026
                        </span>
                        <h1 className="hero-title">
                            Memento Mori<br />Couture
                        </h1>
                        <div className="hero-accent"></div>
                        <p className="hero-subtitle">
                            TRIBESMAN design house redefines modern luxury styling. Bridging meticulous minimalist geometry with premium raw fabrics sourced across West Africa.
                        </p>
                        <div className="hero-buttons">
                            <a href="/catalog" className="btn">Explore Archives</a>
                            <a href="/about" className="btn-secondary">The Atelier</a>
                        </div>
                    </div>
                    <div className="hero-image">
                        <img
                            src="https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=800"
                            alt="Tribesman Collection Cover"
                        />
                    </div>
                </div>
            </section>

            {/* Asymmetrical Lookbook Grid */}
            <section className="featured">
                <div className="container">
                    <h2 className="section-title">The Editorial Lookbook</h2>
                    <div className="featured-grid">

                        <div className="featured-item">
                            <div className="featured-img">
                                <img
                                    src="https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&q=80&w=650"
                                    alt="The Royal Agbada"
                                />
                                <div className="featured-overlay">
                                    <a href="/catalog" className="btn">Shop Editorial</a>
                                </div>
                            </div>
                            <div className="featured-info">
                                <h3>The Royal Agbada</h3>
                                <p style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1.5px', color: 'var(--accent-color)', marginTop: '5px' }}>Style 01 / Draped Silk</p>
                            </div>
                        </div>

                        <div className="featured-item">
                            <div className="featured-img">
                                <img
                                    src="https://images.unsplash.com/photo-1593032465175-481ac7f401a0?auto=format&fit=crop&q=80&w=650"
                                    alt="Modern Ankara Suit"
                                />
                                <div className="featured-overlay">
                                    <a href="/catalog" className="btn">Shop Editorial</a>
                                </div>
                            </div>
                            <div className="featured-info">
                                <h3>Modern Ankara Suit</h3>
                                <p style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1.5px', color: 'var(--accent-color)', marginTop: '5px' }}>Style 02 / Senator Wool</p>
                            </div>
                        </div>

                        <div className="featured-item">
                            <div className="featured-img">
                                <img
                                    src="https://images.unsplash.com/photo-1607990283143-e81e7a2c93ab?auto=format&fit=crop&q=80&w=650"
                                    alt="Heritage Senator"
                                />
                                <div className="featured-overlay">
                                    <a href="/catalog" className="btn">Shop Editorial</a>
                                </div>
                            </div>
                            <div className="featured-info">
                                <h3>Heritage Senator</h3>
                                <p style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1.5px', color: 'var(--accent-color)', marginTop: '5px' }}>Style 03 / Cashmere Blend</p>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* Premium Contact Section */}
            <section id="contact" className="contact">
                <div className="container">
                    <h2 className="section-title">The Atelier Location</h2>
                    <div className="contact-content">
                        <div className="contact-info">
                            <p style={{ textTransform: 'uppercase', letterSpacing: '2px', fontSize: '10px', color: 'var(--accent-color)', marginBottom: '8px' }}>Direct Inquiries</p>
                            <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem' }}>contact@tribesman.com</p>
                        </div>
                        <div className="contact-info">
                            <p style={{ textTransform: 'uppercase', letterSpacing: '2px', fontSize: '10px', color: 'var(--accent-color)', marginBottom: '8px' }}>Press & Appointments</p>
                            <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem' }}>+234 800 123 4567</p>
                        </div>
                        <div className="contact-info">
                            <p style={{ textTransform: 'uppercase', letterSpacing: '2px', fontSize: '10px', color: 'var(--accent-color)', marginBottom: '8px' }}>Main Showroom</p>
                            <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem' }}>Victoria Island, Lagos</p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Home;
