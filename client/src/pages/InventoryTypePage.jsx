import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import ProductDetailModal from '../components/ProductDetailModal';
import CallOwnerButton from '../components/CallOwnerButton';

function InventoryTypePage({ inventoryType, title }) {
  const { t } = useTranslation();
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const categories = [
    'bangles',
    'earrings',
    'necklace',
    'ring',
    'chain',
    'pendant',
    'bracelet',
    'mixed product',
    'other'
  ];

  useEffect(() => {
    fetchProducts();
  }, [inventoryType]);

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get('/api/products');
      const filtered = data.filter((p) => p.inventoryType === inventoryType);
      setProducts(filtered);
    } catch (err) {
      console.error('Failed to fetch products:', err);
    } finally {
      setLoading(false);
    }
  };

  const groupByCategory = (items) => {
    const grouped = {};
    items.forEach((item) => {
      if (!grouped[item.category]) {
        grouped[item.category] = [];
      }
      grouped[item.category].push(item);
    });
    return grouped;
  };

  const groupedProducts = groupByCategory(products);
  const selectedCategory = category
    ? categories.find((c) => c === category)
    : null;

  const displayProducts = selectedCategory
    ? groupedProducts[selectedCategory] || []
    : products;

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
  };

  return (
    <div className="min-h-screen grid-background">
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-4xl font-serif font-light text-brown-dark mb-2">
          {title}
        </h1>
        <p className="text-brown-light mb-10 italic">{t('address')}</p>

        {/* Category Sidebar Navigation */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          <aside className="bg-white p-6 rounded-lg shadow-md border border-cream-dark h-fit">
            <h3 className="text-lg font-sans font-semibold text-brown-dark mb-5">
              Categories
            </h3>
            <div className="space-y-1">
              <Link
                to={`/${inventoryType === 'Juna Sona' ? 'juna-sona' : inventoryType === 'Naya Sona' ? 'naya-sona' : 'order-cancelled-product'}`}
                className={`block px-4 py-3 rounded-md text-sm font-sans transition-all border-l-4 leading-relaxed ${
                  !selectedCategory
                    ? 'bg-gold bg-opacity-10 text-gold-dark border-gold font-medium'
                    : 'text-brown hover:bg-cream-light border-transparent hover:border-gold-light'
                }`}
              >
                All Products
              </Link>
              {categories.map((cat) => {
                const count = groupedProducts[cat]?.length || 0;
                if (count === 0) return null;

                const slug =
                  inventoryType === 'Juna Sona'
                    ? 'juna-sona'
                    : inventoryType === 'Naya Sona'
                    ? 'naya-sona'
                    : 'order-cancelled-product';

                return (
                  <Link
                    key={cat}
                    to={`/${slug}/${cat}`}
                    className={`block px-4 py-3 rounded-md text-sm font-sans transition-all border-l-4 leading-relaxed ${
                      selectedCategory === cat
                        ? 'bg-gold bg-opacity-10 text-gold-dark border-gold font-medium'
                        : 'text-brown hover:bg-cream-light border-transparent hover:border-gold-light'
                    }`}
                  >
                    {t(`categories.${cat}`)} ({count})
                  </Link>
                );
              })}
            </div>
          </aside>

          {/* Products Grid */}
          <main className="lg:col-span-4">
            {loading ? (
              <p className="text-center text-brown-light">Loading...</p>
            ) : displayProducts.length === 0 ? (
              <div className="text-center text-brown-light bg-white p-8 rounded shadow-sm border border-cream-dark">
                <p className="text-lg">
                  {selectedCategory
                    ? `No ${t(`categories.${selectedCategory}`)} items yet.`
                    : 'No products yet.'}
                </p>
                <p className="text-sm mt-2">Go to Admin to add items.</p>
              </div>
            ) : (
              <div>
                {selectedCategory && (
                  <h2 className="text-2xl font-serif font-light text-brown-dark mb-6 border-b border-gold pb-3">
                    {t(`categories.${selectedCategory}`)}
                  </h2>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                  {displayProducts.map((product) => (
                    <ProductCard 
                      key={product._id} 
                      product={product} 
                      t={t}
                      onClick={() => handleProductClick(product)}
                    />
                  ))}
                </div>
              </div>
            )}
          </main>
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <CallOwnerButton variant="primary" size="md" />
        </div>
      </div>

      {/* Product Detail Modal */}
      {showModal && selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={handleCloseModal}
          t={t}
        />
      )}
    </div>
  );
}

export default InventoryTypePage;
