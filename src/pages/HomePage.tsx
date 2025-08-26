import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play, Server, ShieldCheck, Zap as ZapIcon } from 'lucide-react';
import SEOHead from '@/components/SEOHead';
import { SEO_CONSTANTS } from '@/lib/seo-constants';
import Telegram from '../components/icons/telegram.svg?react'

const HomePage: React.FC = () => {
  return (
    <>
      <SEOHead 
        title={SEO_CONSTANTS.PAGES.HOME.title}
        description={SEO_CONSTANTS.PAGES.HOME.description}
        keywords={SEO_CONSTANTS.PAGES.HOME.keywords}
        url={SEO_CONSTANTS.PAGES.HOME.url}
      />
      <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="relative py-20 lg:py-32">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex items-center justify-center space-x-3 mb-8">
              <img src='logo.png' className="w-28 h-28 text-primary-foreground" />
              <h1 className="text-5xl lg:text-7xl font-bold text-primary">
                VibibayVPN
              </h1>
            </div>
            
            <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
              Управляйте своими VPN устройствами с легкостью
            </h2>
            
            <p className="text-xl lg:text-2xl text-muted-foreground mb-8 leading-relaxed max-w-3xl mx-auto">
              Безопасное подключение, простое управление и полный контроль над вашими устройствами в одной платформе.
            </p>
            <div className='space-y-4'>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg h-14 w-full sm:w-auto group">
                  <Link to="/auth/register">
                    Начать бесплатно
                    <ArrowRight className="w-6 h-6 transition-transform group-hover:translate-x-2" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-border text-foreground hover:bg-secondary text-lg h-14 w-full sm:w-auto group">
                  <Link to="/auth/login">
                    <Play className="w-6 h-6 transition-transform group-hover:scale-105" />
                    Войти в систему
                  </Link>
                </Button>
              </div>
              <Button asChild variant="outline" size="lg" className="border-border text-foreground hover:bg-secondary text-lg h-14 w-full sm:w-auto group">
                  <Link to="https://t.me/VibibayVPNBot">
                    <Telegram className="!w-6 !h-6 transition-transform group-hover:scale-105" />
                    Продолжить в Telegram
                  </Link>
                </Button>
           </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Почему выбирают VibibayVPN?
            </h3>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Наша платформа предоставляет все необходимые инструменты для безопасного и эффективного управления VPN устройствами
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-card p-8 rounded-2xl border border-border hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                <ShieldCheck className="w-6 h-6 text-primary" />
              </div>
              <h4 className="text-xl font-semibold text-foreground mb-3">Максимальная безопасность</h4>
              <p className="text-muted-foreground">
                Шифрование военного уровня и протоколы безопасности, которые защищают ваши данные
              </p>
            </div>
            
            <div className="bg-card p-8 rounded-2xl border border-border hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                <Server className="w-6 h-6 text-primary" />
              </div>
              <h4 className="text-xl font-semibold text-foreground mb-3">Простое управление</h4>
              <p className="text-muted-foreground">
                Интуитивный интерфейс для управления всеми вашими устройствами из одного места
              </p>
            </div>
            
            <div className="bg-card p-8 rounded-2xl border border-border hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                <ZapIcon className="w-6 h-6 text-primary" />
              </div>
              <h4 className="text-xl font-semibold text-foreground mb-3">Высокая скорость</h4>
              <p className="text-muted-foreground">
                Оптимизированные серверы обеспечивают максимальную скорость соединения
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="py-20">
        <div className="bg-card backdrop-blur-sm rounded-3xl p-12 text-center border border-border">
          <h3 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
            Готовы начать?
          </h3>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Присоединяйтесь к тысячам пользователей, которые уже доверяют VibibayVPN для защиты своей приватности.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg h-14 w-full sm:w-auto group">
              <Link to="/auth/register">
                Создать аккаунт
                <ArrowRight className="h-6 w-6 transition-transform group-hover:translate-x-2" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-border text-foreground hover:bg-secondary text-lg h-14 w-full sm:w-auto group">
              <Link to="/auth/login">
                <Play className="w-6 h-6 transition-transform group-hover:scale-105" />
                Войти в систему
              </Link>
            </Button>
          </div>
        </div>
      </section>


    </div>
    </>
  );
};

export default HomePage;
