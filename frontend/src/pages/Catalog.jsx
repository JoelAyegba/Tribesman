import { useState, useEffect } from 'react';
import { client, urlFor } from '../sanity/client';
import { mockCategories, mockProducts } from '../data/mockData';

import { useScrollReveal } from '../hooks/useScrollReveal';

const Catalog = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [loading, setLoading] = useState(true);
    const [modalProduct, setModalProduct] = useState(null);
    const [selectedSize, setSelectedSize] = useState('M');


    const [headerRef, headerVisible] = useScrollReveal({ threshold: 0.05 });
    const [filterRef, filterVisible] = useScrollReveal({ threshold: 0.05 });
    const [gridRef, gridVisible] = useScrollReveal({ threshold: 0.02 });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const isMockProject = true; // Forced to true to show the updated African Native mock data

        if (isMockProject) {
            console.log('Sanity Client: Using mock catalog data (project unconfigured)');
            setProducts(mockProducts);
            setCategories(mockCategories);
            setLoading(false);
            return;
        }

        try {
            setLoading(true);

            // GROQ queries for Sanity
            const categoriesQuery = `*[_type == "category"] {
                "id": _id,
                name,
                description
            }`;

            const productsQuery = `*[_type == "product"] {
                "id": _id,
                name,
                description,
                price,
                image,
                "category_id": category->_id,
                "category_name": category->name
            }`;

            const [productsData, categoriesData] = await Promise.all([
                client.fetch(productsQuery),
                client.fetch(categoriesQuery)
            ]);

            const formattedProducts = productsData.map(p => ({
                id: p.id,
                name: p.name,
                description: p.description,
                price: p.price,
                image_url: p.image ? urlFor(p.image).url() : '',
                category_id: p.category_id,
                category_name: p.category_name
            }));

            const formattedCategories = categoriesData.map(c => ({
                id: c.id,
                name: c.name,
                description: c.description
            }));

            setProducts(formattedProducts);
            setCategories(formattedCategories);
        } catch (error) {
            console.error('Error fetching from Sanity, falling back to mock data:', error);
            setProducts(mockProducts);
            setCategories(mockCategories);
        } finally {
            setLoading(false);
        }
    };

    const filteredProducts = selectedCategory
        ? products.filter(p => p.category_id === selectedCategory)
        : products;

    return (
        <main style={{ backgroundColor: 'var(--light-bg)', color: 'var(--text-color)' }}>
            <section className="page-header" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1200')" }}>
                <div className="container">
                    <div ref={headerRef} className={`page-header-overlay reveal-fade-up ${headerVisible ? 'reveal-visible' : ''}`}>
                        <h1>Our Collections</h1>
                        <p>Explore the finest African craftsmanship</p>
                    </div>
                </div>
            </section>

            <section className="catalog">
                <div className="container">
                    <div ref={filterRef} className={`category-filter reveal-fade-in ${filterVisible ? 'reveal-visible' : ''}`}>
                        <button
                            className={`filter-btn ${!selectedCategory ? 'active' : ''}`}
                            onClick={() => setSelectedCategory(null)}
                        >
                            All
                        </button>
                        {categories.map(cat => (
                            <button
                                key={cat.id}
                                className={`filter-btn ${selectedCategory === cat.id ? 'active' : ''}`}
                                onClick={() => setSelectedCategory(cat.id)}
                            >
                                {cat.name}
                            </button>
                        ))}
                    </div>

                    {loading ? (
                        <div style={{ textAlign: 'center', padding: '50px 0', color: 'var(--medium-text)' }}>Loading collections...</div>
                    ) : (
                        <div ref={gridRef} className="catalog-grid">
                            {filteredProducts.map((product, index) => (
                                <div
                                    key={product.id}
                                    className="catalog-item reveal-fade-up"
                                    style={{
                                        opacity: gridVisible ? 1 : 0,
                                        transform: gridVisible ? 'translateY(0)' : 'translateY(30px)',
                                        transition: 'opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1), transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
                                        transitionDelay: `${(index % 6) * 100}ms`
                                    }}
                                >
                                    <div className="catalog-img img-container" onClick={() => {
                                        setModalProduct(product);
                                        setSelectedSize('M'); // Reset on details open
                                    }}>
                                        {product.image_url ? (
                                            <img src={product.image_url} alt={product.name} />
                                        ) : (
                                            <div style={{ width: '100%', height: '100%', backgroundColor: 'var(--gray-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>No Image</div>
                                        )}
                                        <div className="catalog-overlay">
                                            <span>Quick View</span>
                                        </div>
                                    </div>
                                    <div className="catalog-info">
                                        <h3>{product.name}</h3>
                                        <p className="price">₦{product.price.toLocaleString()}</p>
                                    </div>
                                </div>
                            ))}
                            {filteredProducts.length === 0 && (
                                <div style={{ gridColumn: '1 / -1', textAlign: 'center', color: 'var(--medium-text)', padding: '40px 0' }}>No products found in this category.</div>
                            )}
                        </div>
                    )}
                </div>
            </section>

            <section className="catalog-story" style={{ padding: '80px 20px', backgroundColor: 'var(--gray-bg)', marginTop: '60px' }}>
                <div className="container" style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '20px', fontFamily: 'var(--font-heading)' }}>Rooted in Tradition, Designed for Tomorrow</h2>
                    <p style={{ color: 'var(--medium-text)', lineHeight: '1.8', fontSize: '1.1rem' }}>
                        Every piece in our collection is a testament to the rich heritage of African craftsmanship. 
                        We work directly with local artisans, combining time-honored techniques with contemporary silhouettes. 
                        Our commitment to sustainable practices ensures that every garment not only tells a story but also 
                        preserves the culture from which it originates.
                    </p>
                </div>
            </section>

            {modalProduct && (
                <>
                    {/* Backdrop */}
                    <div className="side-drawer-backdrop open" onClick={() => setModalProduct(null)} />

                    {/* Editorial Detail Drawer */}
                    <div className="side-drawer open" style={{ maxWidth: '850px' }}>
                        <div className="drawer-header">
                            <h2>Garment Archive</h2>
                            <button className="drawer-close" onClick={() => setModalProduct(null)}>&times;</button>
                        </div>
                        <div className="drawer-body no-scrollbar" style={{ padding: 0 }}>
                            <div className="product-detail-layout">
                                <div className="product-images-stack no-scrollbar">
                                    {modalProduct.image_url ? (
                                        <>
                                            <img src={modalProduct.image_url} alt={modalProduct.name} />
                                        </>
                                    ) : (
                                        <div style={{ width: '100%', height: '300px', backgroundColor: 'var(--gray-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>No Image</div>
                                    )}
                                </div>
                                <div className="product-sticky-info">
                                    <h2>{modalProduct.name}</h2>
                                    <p className="price">₦{modalProduct.price.toLocaleString()}</p>
                                    <div className="description">
                                        <p style={{ marginBottom: '10px', color: 'var(--accent-color)', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                                            Atelier Reference: TM-{modalProduct.id.slice(0, 4).toUpperCase()}
                                        </p>
                                        <p>{modalProduct.description || 'Premium material structured with exceptional traditional craftsmanship, re-imagined for modern luxury.'}</p>
                                    </div>

                                    <div className="size-selector">
                                        <span>Select Size</span>
                                        <div className="size-options">
                                            {['S', 'M', 'L', 'XL'].map(sz => (
                                                <button
                                                    key={sz}
                                                    className={`size-btn ${selectedSize === sz ? 'active' : ''}`}
                                                    onClick={() => setSelectedSize(sz)}
                                                >
                                                    {sz}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <a
                                        href={`https://wa.me/233538932862?text=${encodeURIComponent(
                                            `Hi Tribesman! I'd like to order:\n\n` +
                                            `🧥 *${modalProduct.name}*\n` +
                                            `📏 Size: ${selectedSize}\n` +
                                            `💰 Price: ₦${modalProduct.price.toLocaleString()}\n\n` +
                                            `Please let me know the next steps. Thank you!`
                                        )}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn"
                                        style={{
                                            width: '100%',
                                            marginTop: 'auto',
                                            backgroundColor: '#25D366',
                                            borderColor: '#25D366',
                                            color: '#fff',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: '8px',
                                            textDecoration: 'none',
                                            textAlign: 'center'
                                        }}
                                    >
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                                        </svg>
                                        Order via WhatsApp
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </main>
    );
};

export default Catalog;
