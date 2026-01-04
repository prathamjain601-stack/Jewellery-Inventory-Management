import { useTranslation } from 'react-i18next';
import { OWNER_PHONE } from '../config/owner.config';

function CallOwnerButton({ variant = 'primary', size = 'md', className = '' }) {
  const { t } = useTranslation();

  const variantClasses = {
    primary: 'bg-gold text-white hover:bg-gold-dark shadow-md hover:shadow-lg',
    secondary: 'border border-gold text-gold hover:bg-gold hover:text-white',
    outline: 'border border-brown-light text-brown hover:border-brown-dark'
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-6 py-2.5 text-base',
    lg: 'px-8 py-3 text-lg'
  };

  return (
    <a
      href={`tel:${OWNER_PHONE}`}
      className={`
        inline-flex items-center justify-center
        rounded-lg font-medium transition-all duration-200
        active:scale-95 hover:-translate-y-0.5
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${className}
      `}
      aria-label={t('callOwner')}
    >
      <svg
        className="w-5 h-5 mr-2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path d="M3 5a2 2 0 012-2h3.28a1 1 0 00.948.684l2.498 5.729a1 1 0 00.502.692l2.654 1.565a1 1 0 00.588-.022l5.541-1.477a1 1 0 00.767-.933V5a2 2 0 00-2-2h-1.268a2 2 0 00-2 2v12a2 2 0 002 2h1.268a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2h14a2 2 0 002-2"></path>
      </svg>
      {t('callOwner')}
    </a>
  );
}

export default CallOwnerButton;
