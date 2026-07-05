const About = () => {
    return (
        <main style={{ backgroundColor: 'var(--light-bg)', color: 'var(--text-color)' }}>
            <section className="page-header" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1200')" }}>
                <div className="container">
                    <div className="page-header-overlay">
                        <h1>Our Story</h1>
                        <p>The journey behind TRIBESMAN Design House</p>
                    </div>
                </div>
            </section>

            <section className="brand-story" style={{ padding: '100px 0' }}>
                <div className="container">
                    <div className="story-content" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.2fr)', gap: '60px', alignItems: 'center' }}>
                        <div className="story-image">
                            <img
                                src="https://images.unsplash.com/photo-1593032465175-481ac7f401a0?auto=format&fit=crop&q=80&w=800"
                                alt="Tribesman Craftsmanship"
                                style={{ width: '100%', height: 'auto', border: '1px solid var(--border-color)' }}
                            />
                        </div>
                        <div className="story-text">
                            <h2 className="section-title" style={{ textAlign: 'left', marginBottom: '30px' }}>The Genesis of Elegance</h2>
                            <p style={{ marginBottom: '20px', fontSize: '14px', lineHeight: '1.8', color: 'var(--medium-text)' }}>
                                Founded in the heart of Africa, TRIBESMAN emerged from a passion to redefine
                                luxury menswear. We believe that true style honors heritage while embracing modern
                                sophistication.
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
