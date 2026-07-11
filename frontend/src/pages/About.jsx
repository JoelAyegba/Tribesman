import { useScrollReveal } from '../hooks/useScrollReveal';

const About = () => {
    const [headerRef, headerVisible] = useScrollReveal({ threshold: 0.05 });
    const [imgRef, imgVisible] = useScrollReveal();
    const [textRef, textVisible] = useScrollReveal();

    return (
        <main style={{ backgroundColor: 'var(--light-bg)', color: 'var(--text-color)' }}>
            <section className="page-header" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1200')" }}>
                <div className="container">
                    <div ref={headerRef} className={`page-header-overlay reveal-fade-up ${headerVisible ? 'reveal-visible' : ''}`}>
                        <h1>Our Story</h1>
                        <p>The journey behind TRIBESMAN Design House</p>
                    </div>
                </div>
            </section>

            <section className="brand-story" style={{ padding: '100px 0' }}>
                <div className="container">
                    <div className="story-content" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.2fr)', gap: '60px', alignItems: 'center' }}>
                        <div ref={imgRef} className={`story-image reveal-scale ${imgVisible ? 'reveal-visible' : ''}`}>
                            <img
                                src="/agbada_wine_silk.png"
                                alt="Tribesman Craftsmanship"
                                style={{ width: '100%', height: 'auto', border: '1px solid var(--border-color)' }}
                            />
                        </div>
                        <div ref={textRef} className={`story-text reveal-fade-up ${textVisible ? 'reveal-visible' : ''}`}>
                            <h2 className="section-title" style={{ textAlign: 'left', marginBottom: '30px' }}>The Genesis of Elegance</h2>
                            <p style={{ marginBottom: '20px', fontSize: '14px', lineHeight: '1.8', color: 'var(--medium-text)' }}>
                                Founded in the heart of Africa, TRIBESMAN emerged from a passion to redefine
                                luxury menswear. We specialize in elevating traditional African garments—such as 
                                the Agbada, Senator, and Kaftan—for the modern gentleman. We believe that true 
                                style honors heritage while embracing contemporary sophistication.
                            </p>
                            <p style={{ marginBottom: '20px', fontSize: '14px', lineHeight: '1.8', color: 'var(--medium-text)' }}>
                                Every stitch is a testament to our commitment to excellence. We source the finest
                                materials and collaborate with master artisans to create pieces that command respect
                                and inspire confidence.
                            </p>
                            <p style={{ fontSize: '14px', lineHeight: '1.8', color: 'var(--medium-text)' }}>
                                Our collections are more than clothing; they are a celebration of culture, strength,
                                and the enduring spirit of the modern global citizen. Join us in wearing the legacy.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default About;
