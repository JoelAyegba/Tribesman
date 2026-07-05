import { useState, useEffect } from 'react';
import { client, urlFor } from '../sanity/client';
import { mockCategories, mockProducts } from '../data/mockData';
import { useCart } from '../context/CartContext';

const Catalog = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [loading, setLoading] = useState(true);
    const [modalProduct, setModalProduct] = useState(null);
    const [selectedSize, setSelectedSize] = useState('M');
    const { addToCart } = useCart();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const isMockProject = client.config().projectId === 'mock_project_id';

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
                    <div className="page-header-overlay">
                        <h1>Our Collections</h1>
                        <p>Explore the finest African craftsmanship</p>
                    </div>
                </div>
            </section>

            <section className="catalog">
                <div className="container">
                    <div className="category-filter">
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
                        <div className="catalog-grid">
                            {filteredProducts.map(product => (
                                <div key={product.id} className="catalog-item">
                                    <div className="catalog-img" onClick={() => {
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
                                            {/* Second editorial texture shot */}
                                            <img
                                                src="https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=700"
                                                alt={`${modalProduct.name} Detail`}
                                            />
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

                                    <button
                                        className="btn"
                                        style={{ width: '100%', marginTop: 'auto' }}
                                        onClick={() => {
                                            addToCart(modalProduct, selectedSize);
                                            setModalProduct(null);
                                        }}
                                    >
                                        Add to Bag
                                    </button>
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
