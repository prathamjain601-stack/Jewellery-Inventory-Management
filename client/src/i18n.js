import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      shopName: 'Umesh Jewellers',
      callOwner: 'Call Owner',
      address: 'Address Here',
      junaSona: 'Juna Sona',
      nayaSona: 'Naya Sona',
      orderCancelledProduct: 'Order Cancelled Product',
      contactDealer: 'Contact Dealer',
      ownerPhone: '+91 9876543210',
      categories: {
        bangles: 'Bangles',
        earrings: 'Earrings',
        necklace: 'Necklace',
        ring: 'Ring',
        chain: 'Chain',
        pendant: 'Pendant',
        bracelet: 'Bracelet',
        'mixed product': 'Mixed Product',
        other: 'Other'
      },
      amount: 'Amount',
      goldRate: 'Gold Rate',
      goldRateUpdatedOn: 'Last updated on',
      description: 'Description'
    }
  },
  hi: {
    translation: {
      shopName: 'उमेश ज्वैलर्स',
      callOwner: 'मालिक को कॉल करें',
      address: 'पता यहाँ',
      junaSona: 'जूना सोना',
      nayaSona: 'नया सोना',
      orderCancelledProduct: 'रद्द किया गया ऑर्डर उत्पाद',
      contactDealer: 'डीलर से संपर्क करें',
      ownerPhone: '+91 9876543210',
      categories: {
        bangles: 'कंगन',
        earrings: 'कान की बालियाँ',
        necklace: 'हार',
        ring: 'अंगूठी',
        chain: 'चेन',
        pendant: 'लॉकेट',
        bracelet: 'ब्रेसलेट',
        'mixed product': 'मिश्रित उत्पाद',
        other: 'अन्य'
      },
      amount: 'राशि',
      goldRate: 'सोने का रेट',
      goldRateUpdatedOn: 'अंतिम अपडेट',
      description: 'विवरण'
    }
  }
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false
  }
});

export default i18n;
