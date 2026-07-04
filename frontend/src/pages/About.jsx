const About = () => {
    return (
        <main>
            <section className="page-header" style={{ backgroundImage: "url('../assets/placeholder1.jpg')" }}>
                <div className="container">
                    <div className="page-header-overlay">
                        <h1>Our Story</h1>
                        <p>The journey behind Tribesman Fashion Design</p>
                    </div>
                </div>
            </section>

            <section className="brand-story">
                <div className="container">
                    <div className="story-content">
                        <div className="story-image">
                            <img src="../assets/placeholder2.jpg" alt="Tribesman Craftsmanship" />
                        </div>
                        <div className="story-text">
                            <h2 className="section-title">The Genesis of Elegance</h2>
                            <p>
                                Founded in the heart of Africa, Tribesman emerged from a passion to redefine
                                luxury menswear. We believe that true style honors heritage while embracing modern
                                sophistication.
                            </p>
                            <p>
                                Every stitch is a testament to our commitment to excellence. We source the finest
                                materials and collaborate with master artisans to create pieces that command respect
                                and inspire confidence.
                            </p>
                            <p>
                                Our collections are more than clothing; they are a celebration of culture, strength,
                                and the enduring spirit of the modern African man. Join us in wearing the legacy.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default About;
