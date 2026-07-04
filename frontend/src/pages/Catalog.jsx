import { useState, useEffect } from 'react';

const Catalog = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [loading, setLoading] = useState(true);
    const [modalProduct, setModalProduct] = useState(null);

    // Hardcode API URL based on previous vanilla JS config.js
    const API_URL = 'http://localhost:3000/api';

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const [productsRes, categoriesRes] = await Promise.all([
                fetch(`${API_URL}/products`),
                fetch(`${API_URL}/categories`)
            ]);

            const productsData = await productsRes.json();
            const categoriesData = await categoriesRes.json();

            setProducts(productsData);
            setCategories(categoriesData);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    const filteredProducts = selectedCategory
        ? products.filter(p => parseInt(p.category_id) === parseInt(selectedCategory))
        : products;

    return (
        <main>
            <section className="page-header" style={{ backgroundImage: "url('../images/hero.jpg')" }}>
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
                                className={`filter-btn ${parseInt(selectedCategory) === parseInt(cat.id) ? 'active' : ''}`}
                                onClick={() => setSelectedCategory(cat.id)}
                            >
                                {cat.name}
                            </button>
                        ))}
                    </div>

                    {loading ? (
                        <div style={{ textAlign: 'center', padding: '50px 0' }}>Loading collections...</div>
                    ) : (
                        <div className="catalog-grid">
                            {filteredProducts.map(product => (
                                <div key={product.id} className="catalog-item">
                                    <div
                                        className="catalog-img"
                                        style={{ backgroundImage: `url(http://localhost:3000${product.image_url})` }}
                                        onClick={() => setModalProduct(product)}
                                    >
                                        <div className="catalog-overlay">
                                            <span>Quick View</span>
                                        </div>
                                    </div>
                                    <h3>{product.name}</h3>
                                    <p className="price">₦{product.price.toLocaleString()}</p>
                                </div>
                            ))}
                            {filteredProducts.length === 0 && (
                                <div style={{ gridColumn: '1 / -1', textAlign: 'center' }}>No products found in this category.</div>
                            )}
                        </div>
                    )}
                </div>
            </section>

            {modalProduct && (
                <div className="modal" style={{ display: 'block' }} onClick={() => setModalProduct(null)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <span className="close-btn" onClick={() => setModalProduct(null)}>&times;</span>
                        <div className="modal-body">
                            <div className="modal-image">
                                <img src={`http://localhost:3000${modalProduct.image_url}`} alt={modalProduct.name} />
                            </div>
                            <div className="modal-info">
                                <h2>{modalProduct.name}</h2>
                                <p className="price">₦{modalProduct.price.toLocaleString()}</p>
                                <div className="modal-details">
                                    <p><strong>Description:</strong> {modalProduct.description || 'Premium material structured with exceptional craftsmanship.'}</p>
                                    <p><strong>Availability:</strong> In Stock</p>
                                </div>
                                <div className="modal-actions">
                                    <button className="btn btn-primary" style={{ width: '100%' }}>Add to Cart</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
};

export default Catalog;
