import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import CallOwnerButton from './CallOwnerButton';

function Navbar({ onLanguageChange }) {
  const { t, i18n } = useTranslation();
  const location = useLocation();

  const isActive = (path) => location.pathname.startsWith(path);

  return (
    <nav className="navbar-root bg-white border-b border-cream-dark shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-6">
        <div className="navbar-header flex justify-between items-center mb-6">
          <Link to="/" className="navbar-title text-5xl md:text-6xl font-serif font-light text-brown-dark hover:text-gold-dark transition-colors tracking-wide">
            {t('shopName')}
          </Link>
          <div className="navbar-actions flex gap-3 items-center">
            <CallOwnerButton variant="primary" size="md" />
            <button
              onClick={() => i18n.changeLanguage(i18n.language === 'en' ? 'hi' : 'en')}
              className="px-5 py-2.5 border border-gold text-gold hover:bg-gold hover:text-white rounded transition font-light text-base"
            >
              {i18n.language === 'en' ? 'हिंदी' : 'English'}
            </button>
            <Link
              to="/admin"
              className="px-5 py-2.5 border border-brown text-brown hover:bg-brown hover:text-white rounded transition font-light text-base"
            >
              Admin
            </Link>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 border-t border-cream-dark pt-5">
          <Link
            to="/juna-sona"
            className={`px-6 py-2.5 rounded font-light text-base transition ${
              isActive('/juna-sona')
                ? 'bg-gold text-white'
                : 'border border-cream-dark text-brown hover:border-gold'
            }`}
          >
            {t('junaSona')}
          </Link>
          <Link
            to="/naya-sona"
            className={`px-6 py-2.5 rounded font-light text-base transition ${
              isActive('/naya-sona')
                ? 'bg-gold text-white'
                : 'border border-cream-dark text-brown hover:border-gold'
            }`}
          >
            {t('nayaSona')}
          </Link>
          <Link
            to="/order-cancelled-product"
            className={`px-6 py-2.5 rounded font-light text-base transition ${
              isActive('/order-cancelled-product')
                ? 'bg-gold text-white'
                : 'border border-cream-dark text-brown hover:border-gold'
            }`}
          >
            {t('orderCancelledProduct')}
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
