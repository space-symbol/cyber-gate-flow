import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Download, Mail, ExternalLink } from 'lucide-react';

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
      <main className="container mx-auto px-4 py-6 flex-1">
        <Outlet />
      </main>
      <footer className="bg-card border-t border-border">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <img src='/logo.png' className="w-12 h-12 text-primary-foreground" />
                <span className="text-xl font-bold text-primary">
                  VibibayVPN
                </span>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Современная платформа для управления VPN устройствами, подписками и безопасными подключениями.
              </p>
            </div>

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
              </ul>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">Контакты</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center space-x-2 text-muted-foreground">
                  <Mail className="w-4 h-4" />
                  <a href='https://t.me/yamillion33' target='_blank'>https://t.me/yamillion33</a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="border-t border-border mt-8 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-sm text-muted-foreground">
                © 2025 VibibayVPN. Все права защищены.
              </p>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <a
                  href="https://t.me/VibibayVPNBot"
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
