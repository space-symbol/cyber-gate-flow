// SEO константы для всего приложения
export const SEO_CONSTANTS = {
  // Базовые настройки
  SITE_NAME: 'VibibayVPN',
  SITE_URL: 'https://vibibay.ru',
  SITE_DESCRIPTION: 'Современная платформа для управления VPN устройствами, подписками и безопасными подключениями',
  DEFAULT_KEYWORDS: 'VPN, безопасность, устройства, подписки, управление, кибербезопасность, сеть',
  
  // Ресурсы
  ASSETS: {
    LOGO: '/logo.png',
    FAVICON: 'https://vibibay.ru/favicon.ico',
    APPLE_TOUCH_ICON: '/apple-touch-icon.png'
  },
  
  // Страницы
  PAGES: {
    HOME: {
      title: 'VibibayVPN - Безопасное управление VPN устройствами',
      description: 'Современная платформа для управления VPN устройствами, подписками и безопасными подключениями. Максимальная безопасность, простое управление и высокая скорость.',
      keywords: 'VPN управление, безопасность, устройства, подписки, кибербезопасность, сеть, шифрование',
      url: 'https://vibibay.ru/'
    },
    DEVICES: {
      title: 'Управление устройствами - VibibayVPN',
      description: 'Управляйте всеми вашими VPN устройствами в одном месте. Добавляйте новые устройства, контролируйте статус подключений и настройки безопасности.',
      keywords: 'VPN устройства, управление, подключения, безопасность, настройки',
      url: 'https://vibibay.ru/devices'
    },
    LOGIN: {
      title: 'Вход в систему - VibibayVPN',
      description: 'Войдите в свой аккаунт VibibayVPN для управления VPN устройствами и подписками. Безопасный доступ к вашим настройкам.',
      keywords: 'вход, авторизация, VPN, аккаунт, безопасность',
      url: 'https://vibibay.ru/auth/login'
    },
    REGISTER: {
      title: 'Регистрация - VibibayVPN',
      description: 'Создайте новый аккаунт VibibayVPN для управления VPN устройствами и подписками. Начните использовать безопасные подключения уже сегодня.',
      keywords: 'регистрация, создание аккаунта, VPN, безопасность, подписки',
      url: 'https://vibibay.ru/auth/register'
    },
    NOT_FOUND: {
      title: 'Страница не найдена - VibibayVPN',
      description: 'Запрашиваемая страница не найдена. Вернитесь на главную страницу VibibayVPN.',
      url: 'https://vibibay.ru/404'
    }
  },
  
  // Open Graph настройки
  OPEN_GRAPH: {
    type: 'website',
    locale: 'ru_RU',
    siteName: 'VibibayVPN',
    image: '/logo.jpg'
  },
  
  // Twitter настройки
  TWITTER: {
    card: 'summary_large_image'
  }
} as const;
