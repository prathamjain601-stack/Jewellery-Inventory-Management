import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function HomePage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-cream">
      <div className="container mx-auto px-4 py-20">
        {/* Hero Section */}
        <div className="text-center mb-24 py-12">
          <p className="text-brown-light text-xl font-sans italic mb-10">{t('address')}</p>
          <a
            href="tel:+919876543210"
            className="inline-block px-10 py-4 bg-gold text-white rounded-lg font-sans font-medium hover:bg-gold-dark transition-all text-lg tracking-wide shadow-lg hover:shadow-xl hover:scale-105"
          >
            {t('callOwner')}
          </a>
        </div>

        {/* Three Main Categories */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Juna Sona Card */}
          <Link
            to="/juna-sona"
            className="bg-white rounded-xl shadow-md border border-gray-200 hover:shadow-2xl transition-all duration-300 group overflow-hidden transform hover:-translate-y-2"
          >
            <div className="bg-gradient-to-br from-gold-light to-gold h-56 text-white flex flex-col items-center justify-center group-hover:from-gold group-hover:to-gold-dark transition-all">
              <h2 className="text-4xl font-serif font-light mb-3 tracking-wide">
                {t('junaSona')}
              </h2>
              <p className="text-sm font-sans font-light italic opacity-90">
                Premium pre-owned gold jewelry
              </p>
            </div>
            <div className="p-8 text-center">
              <p className="text-gray-600 text-sm font-sans mb-6 leading-relaxed">
                Explore our collection of traditional and classic pieces
              </p>
              <span className="inline-block px-8 py-3 border-2 border-gold text-gold rounded-lg font-sans font-medium hover:bg-gold hover:text-white transition-all tracking-wide shadow-sm hover:shadow-md">
                Browse
              </span>
            </div>
          </Link>

          {/* Naya Sona Card */}
          <Link
            to="/naya-sona"
            className="bg-white rounded-xl shadow-md border border-gray-200 hover:shadow-2xl transition-all duration-300 group overflow-hidden transform hover:-translate-y-2"
          >
            <div className="bg-gradient-to-br from-gold-light to-gold h-56 text-white flex flex-col items-center justify-center group-hover:from-gold group-hover:to-gold-dark transition-all">
              <h2 className="text-4xl font-serif font-light mb-3 tracking-wide">
                {t('nayaSona')}
              </h2>
              <p className="text-sm font-sans font-light italic opacity-90">
                New 22K gold designs
              </p>
            </div>
            <div className="p-8 text-center">
              <p className="text-gray-600 text-sm font-sans mb-6 leading-relaxed">
                Explore our new collection and contact for custom orders
              </p>
              <span className="inline-block px-8 py-3 border-2 border-gold text-gold rounded-lg font-sans font-medium hover:bg-gold hover:text-white transition-all tracking-wide shadow-sm hover:shadow-md">
                Browse
              </span>
            </div>
          </Link>

          {/* Order Cancelled Product Card */}
          <Link
            to="/order-cancelled-product"
            className="bg-white rounded-xl shadow-md border border-gray-200 hover:shadow-2xl transition-all duration-300 group overflow-hidden transform hover:-translate-y-2"
          >
            <div className="bg-gradient-to-br from-gold-light to-gold h-56 text-white flex flex-col items-center justify-center group-hover:from-gold group-hover:to-gold-dark transition-all">
              <h2 className="text-3xl md:text-4xl font-serif font-light mb-3 tracking-wide px-4 text-center">
                {t('orderCancelledProduct')}
              </h2>
              <p className="text-sm font-sans font-light italic opacity-90">
                Custom design gallery
              </p>
            </div>
            <div className="p-8 text-center">
              <p className="text-gray-600 text-sm font-sans mb-6 leading-relaxed">
                View inspirational designs and request custom pieces
              </p>
              <span className="inline-block px-8 py-3 border-2 border-gold text-gold rounded-lg font-sans font-medium hover:bg-gold hover:text-white transition-all tracking-wide shadow-sm hover:shadow-md">
                Browse
              </span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
