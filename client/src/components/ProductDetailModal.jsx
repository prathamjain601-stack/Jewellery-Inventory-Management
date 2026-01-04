import { useState } from 'react';

function ProductDetailModal({ product, onClose, t }) {
  const images = product.imageURLs || [product.imageURL];
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrevImage = () => {
    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4 overflow-y-auto"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-lg max-w-7xl w-full max-h-[95vh] overflow-y-auto relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-lg hover:bg-gray-100 transition"
          aria-label="Close"
        >
          <svg
            className="w-6 h-6 text-brown-dark"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>

        {/* Image Section */}
        <div className="relative w-full h-[75vh] max-h-[700px] bg-cream-100 overflow-hidden flex items-center justify-center">
          <img
            src={images[activeIndex]}
            alt={product.name}
            className="w-full h-full object-contain"
          />
          
          {/* Navigation Arrows (if multiple images) */}
          {images.length > 1 && (
            <>
              <button
                onClick={handlePrevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-white bg-opacity-90 rounded-full shadow-lg hover:bg-opacity-100 transition"
                aria-label="Previous image"
              >
                <svg
                  className="w-6 h-6 text-brown-dark"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M15 19l-7-7 7-7"></path>
                </svg>
              </button>
              <button
                onClick={handleNextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-white bg-opacity-90 rounded-full shadow-lg hover:bg-opacity-100 transition"
                aria-label="Next image"
              >
                <svg
                  className="w-6 h-6 text-brown-dark"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M9 5l7 7-7 7"></path>
                </svg>
              </button>
            </>
          )}

          {/* Image Counter */}
          {images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black bg-opacity-60 text-white px-3 py-1 rounded-full text-sm">
              {activeIndex + 1} / {images.length}
            </div>
          )}
        </div>

        {/* Product Details Section */}
        <div className="p-6 md:p-8">
          <h2 className="text-3xl font-serif font-light text-brown-dark mb-2">
            {product.name}
          </h2>
          
          <p className="text-sm text-gold uppercase tracking-wide mb-4">
            {t(`categories.${product.category}`)}
          </p>

          {product.description && (
            <div className="mb-6">
              <h3 className="text-lg font-serif font-light text-brown-dark mb-2">
                {t('description')}
              </h3>
              <p className="text-brown-light leading-relaxed">
                {product.description}
              </p>
            </div>
          )}

          {/* Product Information Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {typeof product.amount === 'number' && (
              <div>
                <p className="text-sm text-brown-light mb-1">{t('amount')}</p>
                <p className="text-2xl font-light text-gold-dark">
                  ₹{product.amount.toLocaleString()}
                </p>
              </div>
            )}

            {product.productWeight && (
              <div>
                <p className="text-sm text-brown-light mb-1">Weight</p>
                <p className="text-xl font-light text-brown-dark">
                  {product.productWeight}g
                </p>
              </div>
            )}

            {product.goldRateType && (
              <div>
                <p className="text-sm text-brown-light mb-1">
                  {t('goldRate')} (10g)
                </p>
                <p className="text-xl font-light text-brown-dark">
                  {product.goldRateType === 'single'
                    ? `₹${product.goldRateValue?.toLocaleString?.() || product.goldRateValue}`
                    : `₹${product.goldRateMin?.toLocaleString?.() || product.goldRateMin} - ₹${product.goldRateMax?.toLocaleString?.() || product.goldRateMax}`}
                </p>
              </div>
            )}

            {product.goldRateUpdatedOn && (
              <div>
                <p className="text-sm text-brown-light mb-1">
                  {t('goldRateUpdatedOn')}
                </p>
                <p className="text-base font-light text-brown-dark">
                  {new Date(product.goldRateUpdatedOn).toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric'
                  })}
                </p>
              </div>
            )}
          </div>

          {/* Contact Button */}
          {product.contactPhone && (
            <a
              href={`tel:${product.contactPhone}`}
              className="block w-full md:w-auto md:inline-block text-center px-8 py-3 bg-gold text-white rounded font-light hover:bg-gold-dark transition tracking-wide"
            >
              {t('contactDealer')}
            </a>
          )}

          {(!product.amount || product.amount === null || product.amount === undefined) && !product.contactPhone && (
            <button className="block w-full md:w-auto md:inline-block text-center px-8 py-3 border border-gold text-gold hover:bg-gold hover:text-white rounded transition font-light tracking-wide">
              {t('contactDealer')}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductDetailModal;