import { useEffect } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

const Home = () => {
    const [heroRef, heroVisible] = useScrollReveal({ threshold: 0.05 });
    const [heroImgRef, heroImgVisible] = useScrollReveal({ threshold: 0.05 });
    const [item1Ref, item1Visible] = useScrollReveal();
    const [item2Ref, item2Visible] = useScrollReveal();
    const [item3Ref, item3Visible] = useScrollReveal();
    const [contactRef, contactVisible] = useScrollReveal();

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
                <div className="container" ref={heroRef}>
                    <div className="hero-content">
                        <div className="reveal-clip-container" style={{ marginBottom: '15px' }}>
                            <span
                                style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '3px', color: 'var(--accent-color)', display: 'block' }}
                                className={`reveal-clip-text delay-100 ${heroVisible ? 'reveal-visible' : ''}`}
                            >
                                Heritage Collection 2026
                            </span>
                        </div>
                        <h1 className="hero-title reveal-clip-container" style={{ overflow: 'hidden' }}>
                            <span
                                className={`reveal-clip-text delay-200 ${heroVisible ? 'reveal-visible' : ''}`}
                                style={{ display: 'block', lineHeight: '1.2' }}
                            >
                                Royal Native<br />Couture
                            </span>
                        </h1>
                        <div
                            className={`hero-accent reveal-fade-in delay-300 ${heroVisible ? 'reveal-visible' : ''}`}
                        ></div>
                        <p className="hero-subtitle reveal-clip-container">
                            <span
                                className={`reveal-clip-text delay-400 ${heroVisible ? 'reveal-visible' : ''}`}
                                style={{ display: 'block', lineHeight: '1.6' }}
                            >
                                TRIBESMAN design house redefines modern luxury menswear. Bridging meticulous minimalist tailoring with premium African heritage styles like the Agbada, Senator, and Kaftan.
                            </span>
                        </p>
                        <div
                            className={`hero-buttons reveal-fade-up delay-500 ${heroVisible ? 'reveal-visible' : ''}`}
                        >
                            <a href="/catalog" className="btn underline-hover">Explore Archives</a>
                            <a href="/about" className="btn-secondary">The Atelier</a>
                        </div>
                    </div>
                    <div
                        ref={heroImgRef}
                        className={`hero-image reveal-scale ${heroImgVisible ? 'reveal-visible' : ''}`}
                    >
                        <img
                            src="/hero-agbada.png"
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

                        <div
                            ref={item1Ref}
                            className={`featured-item reveal-fade-up delay-100 ${item1Visible ? 'reveal-visible' : ''}`}
                        >
                            <div className="featured-img">
                                <img
                                    src="/agbada_black_gold.png"
                                    alt="The Onyx Agbada"
                                />
                                <div className="featured-overlay">
                                    <a href="/catalog" className="btn">Shop Editorial</a>
                                </div>
                            </div>
                            <div className="featured-info">
                                <h3>The Onyx Agbada</h3>
                                <p style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1.5px', color: 'var(--accent-color)', marginTop: '5px' }}>Style 01 / Premium Gold Embroidery</p>
                            </div>
                        </div>

                        <div
                            ref={item2Ref}
                            className={`featured-item reveal-fade-up delay-200 ${item2Visible ? 'reveal-visible' : ''}`}
                        >
                            <div className="featured-img">
                                <img
                                    src="/senator_burgundy.png"
                                    alt="Burgundy Senator"
                                />
                                <div className="featured-overlay">
                                    <a href="/catalog" className="btn">Shop Editorial</a>
                                </div>
                            </div>
                            <div className="featured-info">
                                <h3>Burgundy Senator</h3>
                                <p style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1.5px', color: 'var(--accent-color)', marginTop: '5px' }}>Style 02 / Silver Embroidery</p>
                            </div>
                        </div>

                        <div
                            ref={item3Ref}
                            className={`featured-item reveal-fade-up delay-300 ${item3Visible ? 'reveal-visible' : ''}`}
                        >
                            <div className="featured-img">
                                <img
                                    src="/senator_emerald.png"
                                    alt="Emerald Senator"
                                />
                                <div className="featured-overlay">
                                    <a href="/catalog" className="btn">Shop Editorial</a>
                                </div>
                            </div>
                            <div className="featured-info">
                                <h3>Emerald Senator</h3>
                                <p style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1.5px', color: 'var(--accent-color)', marginTop: '5px' }}>Style 03 / Modern Slim Cut</p>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* Premium Contact Section */}
            <section id="contact" className="contact" ref={contactRef}>
                <div className={`container reveal-fade-up ${contactVisible ? 'reveal-visible' : ''}`}>
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
