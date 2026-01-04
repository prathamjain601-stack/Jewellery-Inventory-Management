function ProductCard({ product, t, onClick }) {
  return (
    <div 
      className="bg-white rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-300 shadow-md border border-gray-200 cursor-pointer transform hover:-translate-y-1"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyPress={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick();
        }
      }}
    >
      <div className="relative w-full aspect-square bg-gradient-to-br from-cream-100 to-gray-50 overflow-hidden">
        <img
          src={product.imageURLs?.[0] || product.imageURL}
          alt={product.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="p-6">
        <h3 className="font-sans font-semibold text-lg mb-2 text-gray-800 line-clamp-1">{product.name}</h3>
        <p className="text-xs text-gold-dark uppercase tracking-wider mb-3 font-medium">
          {t(`categories.${product.category}`)}
        </p>
        <p className="text-sm text-gray-600 mb-4 leading-relaxed line-clamp-2">
          {product.description}
        </p>
        <div className="border-t border-gray-200 pt-4 mt-4">
          {typeof product.amount === 'number' && (
            <p className="font-sans font-semibold text-gray-900 text-xl mb-3">
              ₹{product.amount.toLocaleString()}
            </p>
          )}
          {product.goldRateType && (
            <div className="mb-2">
              <p className="text-xs text-gray-500 mb-1 font-sans">{t('goldRate')} (10g)</p>
              <p className="text-sm font-bold text-gold-dark">
                {product.goldRateType === 'single'
                  ? `₹${product.goldRateValue?.toLocaleString?.() || product.goldRateValue}`
                  : `₹${product.goldRateMin?.toLocaleString?.() || product.goldRateMin} - ₹${product.goldRateMax?.toLocaleString?.() || product.goldRateMax}`}
              </p>
            </div>
          )}
          {product.goldRateUpdatedOn && (
            <p className="text-xs text-gray-400 font-sans">
              {t('goldRateUpdatedOn')}: {new Date(product.goldRateUpdatedOn).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })}
            </p>
          )}
        </div>
        {(!product.amount || product.amount === null || product.amount === undefined) && (
          <button className="mt-4 w-full px-5 py-3 bg-gold text-white hover:bg-gold-dark rounded-lg transition-all font-sans font-medium tracking-wide shadow-sm hover:shadow-md">
            {t('contactDealer')}
          </button>
        )}
      </div>
    </div>
  );
}

export default ProductCard;