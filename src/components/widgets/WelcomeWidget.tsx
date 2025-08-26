import React from 'react';
import { Button } from '@/components/ui/button';
import { Shield, ArrowRight } from 'lucide-react';

interface WelcomeWidgetProps {
  onSignIn: () => void;
}

const WelcomeWidget: React.FC<WelcomeWidgetProps> = ({ onSignIn }) => {
  return (
    <div className="text-center py-24">
      <div className="w-32 h-32 bg-primary rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl">
        <Shield className="w-16 h-16 text-primary-foreground" />
      </div>
      
      <h2 className="text-5xl font-bold text-foreground mb-6">
        Защитите свои устройства
      </h2>
      
      <p className="text-xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed">
        Войдите в свой аккаунт или создайте новый, чтобы начать управление 
        VPN подключениями на всех ваших устройствах
      </p>
      
      <div className="space-y-6">
        <Button 
          onClick={onSignIn}
          className="bg-primary hover:bg-primary/90 transition-all duration-300 text-lg px-10 py-4 h-auto rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          Войти в систему
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
        
        <div className="text-sm text-muted-foreground">
          Новый пользователь? Создайте аккаунт в модальном окне входа
        </div>
      </div>
    </div>
  );
};

export default WelcomeWidget;
