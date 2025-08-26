import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Shield, Download, Mail, Phone, MapPin, ExternalLink } from 'lucide-react';

const MainLayout: React.FC = () => {
  const handleDownloadOferta = () => {
    const link = document.createElement('a');
    link.href = '/oferta.docx';
    link.download = 'CyberGate_Flow_Оферта.docx';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Main content */}
      <main className="container mx-auto px-4 py-6 flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-card border-t border-border">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Shield className="w-4 h-4 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold text-primary">
                  CyberGate Flow
                </span>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Современная платформа для управления VPN устройствами, подписками и безопасными подключениями.
              </p>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">Быстрые ссылки</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
                    Главная
                  </Link>
                </li>
                <li>
                  <Link to="/devices" className="text-muted-foreground hover:text-foreground transition-colors">
                    Устройства
                  </Link>
                </li>
                <li>
                  <Link to="/auth/login" className="text-muted-foreground hover:text-foreground transition-colors">
                    Войти
                  </Link>
                </li>
                <li>
                  <Link to="/auth/register" className="text-muted-foreground hover:text-foreground transition-colors">
                    Регистрация
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal & Support */}
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">Правовая информация</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <button
                    onClick={handleDownloadOferta}
                    className="text-muted-foreground hover:text-foreground transition-colors flex items-center space-x-2"
                  >
                    <Download className="w-4 h-4" />
                    <span>Скачать оферту</span>
                  </button>
                </li>
                <li>
                  <Link to="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
                    Политика конфиденциальности
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
                    Условия использования
                  </Link>
                </li>
                <li>
                  <Link to="/support" className="text-muted-foreground hover:text-foreground transition-colors">
                    Поддержка
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">Контакты</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center space-x-2 text-muted-foreground">
                  <Mail className="w-4 h-4" />
                  <span>support@cybergateflow.com</span>
                </li>
                <li className="flex items-center space-x-2 text-muted-foreground">
                  <Phone className="w-4 h-4" />
                  <span>+7 (XXX) XXX-XX-XX</span>
                </li>
                <li className="flex items-center space-x-2 text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span>Москва, Россия</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="border-t border-border mt-8 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-sm text-muted-foreground">
                © 2025 CyberGate Flow. Все права защищены.
              </p>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <a
                  href="https://github.com/cybergateflow"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors flex items-center space-x-1"
                >
                  <span>GitHub</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
                <a
                  href="https://t.me/cybergateflow"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors flex items-center space-x-1"
                >
                  <span>Telegram</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
