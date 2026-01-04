import { useState, useEffect } from 'react';
import axios from 'axios';

function ProductForm({ t, onProductAdded, initialData, isEditing }) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    amount: '',
    productWeight: '',
    goldRateType: 'single',
    goldRateValue: '',
    goldRateMin: '',
    goldRateMax: '',
    goldRateUpdatedOn: new Date().toISOString().slice(0, 10),
    imageURL: '',
    imageFile: null,
    category: 'bangles',
    inventoryType: 'Juna Sona',
    contactPhone: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  useEffect(() => {
    if (isEditing && initialData) {
      setFormData({
        name: initialData.name || '',
        description: initialData.description || '',
        amount: initialData.amount || '',
        productWeight: initialData.productWeight || '',
        goldRateType: initialData.goldRateType || 'single',
        goldRateValue: initialData.goldRateValue || '',
        goldRateMin: initialData.goldRateMin || '',
        goldRateMax: initialData.goldRateMax || '',
        goldRateUpdatedOn: initialData.goldRateUpdatedOn
          ? new Date(initialData.goldRateUpdatedOn).toISOString().slice(0, 10)
          : new Date().toISOString().slice(0, 10),
        imageURL: initialData.imageURL || '',
        imageFile: null,
        category: initialData.category || 'bangles',
        inventoryType: initialData.inventoryType || 'Juna Sona',
        contactPhone: initialData.contactPhone || ''
      });
    }
  }, [isEditing, initialData]);

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

  const inventoryTypes = ['Juna Sona', 'Naya Sona', 'Order Cancelled Product'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        setFormData((prev) => ({
          ...prev,
          imageURL: base64String,
          imageFile: file
        }));
        setUploadingImage(false);
      };
      reader.readAsDataURL(file);
    } catch (err) {
      setError('Failed to process image');
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      if (!formData.imageURL) {
        throw new Error('Image is required');
      }

      const goldRatePayload = {
        goldRateType: formData.goldRateType,
        goldRateUpdatedOn: formData.goldRateUpdatedOn
      };

      if (formData.goldRateType === 'single') {
        const single = parseFloat(formData.goldRateValue);
        if (!single || single <= 0) {
          throw new Error('Gold Rate is required');
        }
        goldRatePayload.goldRateValue = single;
      } else {
        const min = parseFloat(formData.goldRateMin);
        const max = parseFloat(formData.goldRateMax);
        if (!min || !max || min <= 0 || max <= 0 || min > max) {
          throw new Error('Enter a valid Gold Rate range');
        }
        goldRatePayload.goldRateMin = min;
        goldRatePayload.goldRateMax = max;
      }

      const payload = {
        ...goldRatePayload,
        name: formData.name || undefined,
        description: formData.description || undefined,
        imageURL: formData.imageURL,
        category: formData.category,
        inventoryType: formData.inventoryType
      };

      const parsedAmount = parseFloat(formData.amount);
      if (!Number.isNaN(parsedAmount) && parsedAmount >= 0) {
        payload.amount = parsedAmount;
      }

      const parsedWeight = parseFloat(formData.productWeight);
      if (!Number.isNaN(parsedWeight) && parsedWeight > 0) {
        payload.productWeight = parsedWeight;
      }

      if (formData.contactPhone) {
        payload.contactPhone = formData.contactPhone;
      }

      let response;
      if (isEditing && initialData) {
        response = await axios.patch(`/api/products/${initialData._id}`, payload);
        setSuccess('Product updated successfully!');
      } else {
        response = await axios.post('/api/products', payload);
        setSuccess('Product added successfully!');
      }

      onProductAdded(response.data);

      if (!isEditing) {
        setFormData({
          name: '',
          description: '',
          amount: '',
          productWeight: '',
          goldRateType: 'single',
          goldRateValue: '',
          goldRateMin: '',
          goldRateMax: '',
          goldRateUpdatedOn: new Date().toISOString().slice(0, 10),
          imageURL: '',
          imageFile: null,
          category: 'bangles',
          inventoryType: 'Juna Sona',
          contactPhone: ''
        });
      }
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || 'Failed to save product'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-8 rounded shadow-sm max-w-2xl border border-cream-dark"
    >
      <h3 className="text-3xl font-serif font-light mb-6 text-brown-dark">
        {isEditing ? 'Update Product' : 'Add New Product'}
      </h3>

      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
          {success}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-semibold mb-1">
            Product Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold"
            placeholder="e.g., Gold Bangle"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">
            Category *
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">
            Inventory Type
          </label>
          <select
            name="inventoryType"
            value={formData.inventoryType}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold"
          >
            {inventoryTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">
            Amount (₹)
          </label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold"
            placeholder="e.g., 50000"
            min="0"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">
            Product Weight (grams)
          </label>
          <input
            type="number"
            name="productWeight"
            value={formData.productWeight}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold"
            placeholder="e.g., 12.5"
            min="0"
            step="0.01"
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-semibold mb-1">
          Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="3"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold"
          placeholder="Describe the product..."
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-semibold mb-2">
          Gold Rate (per 10g) *
        </label>
        <p className="text-xs text-brown-light mb-3">
          Gold Rate refers to the amount for 10 grams of gold. Enter a single value or a range and set the last updated date.
        </p>
        <div className="flex items-center gap-4 mb-3 text-sm">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="goldRateType"
              value="single"
              checked={formData.goldRateType === 'single'}
              onChange={handleChange}
            />
            Single value
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="goldRateType"
              value="range"
              checked={formData.goldRateType === 'range'}
              onChange={handleChange}
            />
            Range
          </label>
        </div>

        {formData.goldRateType === 'single' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-light text-brown mb-1">
                Gold Rate (₹)
              </label>
              <input
                type="number"
                name="goldRateValue"
                value={formData.goldRateValue}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gold text-sm"
                placeholder="e.g., 65000"
                min="0"
              />
            </div>
            <div>
              <label className="block text-xs font-light text-brown mb-1">
                Last Updated On
              </label>
              <input
                type="date"
                name="goldRateUpdatedOn"
                value={formData.goldRateUpdatedOn}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gold text-sm"
              />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-light text-brown mb-1">
                Min Rate (₹)
              </label>
              <input
                type="number"
                name="goldRateMin"
                value={formData.goldRateMin}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gold text-sm"
                placeholder="e.g., 64000"
                min="0"
              />
            </div>
            <div>
              <label className="block text-xs font-light text-brown mb-1">
                Max Rate (₹)
              </label>
              <input
                type="number"
                name="goldRateMax"
                value={formData.goldRateMax}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gold text-sm"
                placeholder="e.g., 68000"
                min="0"
              />
            </div>
            <div>
              <label className="block text-xs font-light text-brown mb-1">
                Last Updated On
              </label>
              <input
                type="date"
                name="goldRateUpdatedOn"
                value={formData.goldRateUpdatedOn}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gold text-sm"
              />
            </div>
          </div>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-semibold mb-2">
          Image *
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
          <div>
            <label className="block text-xs font-light text-brown mb-2">
              Upload Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              disabled={uploadingImage}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gold text-sm"
            />
            {uploadingImage && (
              <p className="text-xs text-gold mt-1">Processing image...</p>
            )}
            {formData.imageFile && (
              <p className="text-xs text-green-600 mt-1">
                ✓ {formData.imageFile.name}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-light text-brown mb-2">
              OR Paste URL
            </label>
            <input
              type="url"
              name="imageURL"
              value={formData.imageURL.startsWith('data:') ? '' : formData.imageURL}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gold text-sm"
              disabled={formData.imageFile !== null}
            />
          </div>
        </div>

        {formData.imageURL && (
          <div className="mt-3">
            <img
              src={formData.imageURL}
              alt="Preview"
              className="max-h-32 rounded border border-cream-dark"
            />
          </div>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-semibold mb-1">
          Contact Phone
        </label>
        <input
          type="tel"
          name="contactPhone"
          value={formData.contactPhone}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold"
          placeholder="+91 9876543210"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full px-6 py-3 bg-gold text-white rounded font-light hover:bg-gold-dark transition disabled:opacity-50"
      >
        {loading ? (isEditing ? 'Updating...' : 'Adding...') : isEditing ? 'Update Product' : 'Add Product'}
      </button>
    </form>
  );
}

export default ProductForm;
