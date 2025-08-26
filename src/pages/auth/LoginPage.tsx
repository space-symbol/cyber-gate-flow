import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Shield, Mail, Lock, Eye, EyeOff, AlertCircle, ArrowLeft } from 'lucide-react';
import { useLogin } from '@/hooks/use-api';
import { useToast } from '@/hooks/use-toast';
import SEOHead from '@/components/SEOHead';

const LoginPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [otp, setOtp] = useState('');
  const [showOtp, setShowOtp] = useState(false);
  
  const loginMutation = useLogin();
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, заполните все поля",
        variant: "destructive",
      });
      return;
    }

    const loginData = {
      email: formData.email,
      pass: formData.password,
      ...(otp && { otp })
    };

    try {
      const result = await loginMutation.mutateAsync(loginData);
      toast({
        title: "Успешный вход",
        description: `Добро пожаловать, ${result.user.email}!`,
      });
      
      // Redirect to intended page or devices page
      const from = location.state?.from?.pathname || '/devices';
      navigate(from, { replace: true });
    } catch (error: unknown) {
      if (error && typeof error === 'object' && 'code' in error && (error as { code: string }).code === 'OTP_REQUIRED') {
        setShowOtp(true);
        toast({
          title: "Требуется OTP",
          description: "Введите код подтверждения",
        });
      } else {
        const errorMessage = error instanceof Error ? error.message : "Не удалось войти в систему";
        toast({
          title: "Ошибка входа",
          description: errorMessage,
          variant: "destructive",
        });
      }
    }
  };

  return (
    <>
      <SEOHead 
        title="Вход в систему - CyberGate Flow"
        description="Войдите в свой аккаунт CyberGate Flow для управления VPN устройствами и подписками. Безопасный доступ к вашим настройкам."
        keywords="вход, авторизация, VPN, аккаунт, безопасность"
        url="https://cybergateflow.com/auth/login"
      />
      <div className="w-full">
      {/* Back button */}
      <div className="mb-6">
        <Link 
          to="/" 
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Назад
        </Link>
      </div>

      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Shield className="w-8 h-8 text-primary-foreground" />
        </div>
        <h1 className="text-2xl font-bold text-foreground mb-2">Добро пожаловать обратно</h1>
        <p className="text-muted-foreground">Войдите в свой аккаунт для продолжения</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-foreground">
            Email
          </Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              id="email"
              type="email"
              placeholder="example@gmail.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="pl-10 bg-card border-border/50 focus:border-primary"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="password" className="text-foreground">
            Пароль
          </Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="pl-10 pr-10 bg-card border-border/50 focus:border-primary"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {showOtp && (
          <div className="space-y-2">
            <Label htmlFor="otp" className="text-foreground">
              OTP код
            </Label>
            <div className="relative">
              <AlertCircle className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="otp"
                type="text"
                placeholder="123456"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="pl-10 bg-card border-border/50 focus:border-primary"
                required
              />
            </div>
          </div>
        )}

        <Button
          type="submit"
          disabled={loginMutation.isPending}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          {loginMutation.isPending ? 'Вход в систему...' : 'Войти'}
        </Button>
      </form>

      {/* Footer */}
      <div className="text-center mt-6 pt-6 border-t border-border/30">
        <p className="text-sm text-muted-foreground">
          Нет аккаунта?{' '}
          <Link 
            to="/auth/register" 
            className="text-primary hover:text-primary/80 font-medium transition-colors"
          >
            Зарегистрироваться
          </Link>
        </p>
      </div>
    </div>
    </>
  );
};

export default LoginPage;
