import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import ProductForm from '../components/ProductForm';
import ProductCard from '../components/ProductCard';

function AdminPage() {
  const { t } = useTranslation();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get('/api/products');
      setProducts(data);
    } catch (err) {
      console.error('Failed to fetch products:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleProductAdded = (newProduct) => {
    setProducts((prev) => [newProduct, ...prev]);
  };

  const handleProductUpdated = (updatedProduct) => {
    setProducts((prev) =>
      prev.map((p) => (p._id === updatedProduct._id ? updatedProduct : p))
    );
    setShowEditModal(false);
    setEditingProduct(null);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setShowEditModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this product?')) return;
    try {
      await axios.delete(`/api/products/${id}`);
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      console.error('Failed to delete:', err);
    }
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setEditingProduct(null);
  };

  return (
    <div className="min-h-screen bg-cream">
      <header className="bg-white border-b border-cream-dark shadow-sm">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-serif font-light text-brown-dark">{t('shopName')} - Admin</h1>
          <p className="text-sm mt-2 text-brown-light italic">Manage your jewelry inventory</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <ProductForm t={t} onProductAdded={handleProductAdded} />
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4">Quick Stats</h3>
            <p className="text-gray-600 mb-2">
              Total Products: <span className="font-bold text-gold">{products.length}</span>
            </p>
            <p className="text-gray-600 mb-2">
              Juna Sona:{' '}
              <span className="font-bold">
                {products.filter((p) => p.inventoryType === 'Juna Sona').length}
              </span>
            </p>
            <p className="text-gray-600 mb-2">
              Naya Sona:{' '}
              <span className="font-bold">
                {products.filter((p) => p.inventoryType === 'Naya Sona').length}
              </span>
            </p>
            <p className="text-gray-600">
              Order Cancelled Product:{' '}
              <span className="font-bold">
                {products.filter((p) => p.inventoryType === 'Order Cancelled Product').length}
              </span>
            </p>
          </div>
        </div>

        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6">All Products</h2>
          {loading ? (
            <p>Loading...</p>
          ) : products.length === 0 ? (
            <p className="text-gray-600">No products yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <div key={product._id} className="relative group">
                  <ProductCard product={product} t={t} />
                  <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition">
                    <button
                      onClick={() => handleEdit(product)}
                      className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Edit Modal */}
      {showEditModal && editingProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-cream-dark p-4 flex justify-between items-center">
              <h2 className="text-2xl font-serif font-light text-brown-dark">Edit Product</h2>
              <button
                onClick={handleCloseEditModal}
                className="text-2xl text-brown-light hover:text-brown"
              >
                ✕
              </button>
            </div>
            <div className="p-6">
              <ProductForm
                t={t}
                onProductAdded={handleProductUpdated}
                initialData={editingProduct}
                isEditing={true}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminPage;
