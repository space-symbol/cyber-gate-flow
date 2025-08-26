import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Shield, Mail, Lock, Eye, EyeOff, User, ArrowLeft, CheckCircle } from 'lucide-react';
import { useRegister } from '@/hooks/use-api';
import { useToast } from '@/hooks/use-toast';
import SEOHead from '@/components/SEOHead';

const RegisterPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const registerMutation = useRegister();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password || formData.password !== formData.confirmPassword) {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, заполните все поля и убедитесь, что пароли совпадают",
        variant: "destructive",
      });
      return;
    }

    if (formData.password.length < 8) {
      toast({
        title: "Ошибка",
        description: "Пароль должен содержать минимум 8 символов",
        variant: "destructive",
      });
      return;
    }

    const registerData = {
      email: formData.email,
      pass: formData.password,
    };

    try {
      const result = await registerMutation.mutateAsync(registerData);
      toast({
        title: "Регистрация успешна",
        description: `Аккаунт создан для ${result.user.email}. Теперь вы можете войти в систему.`,
      });
      
      // Redirect to login page
      navigate('/auth/login');
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Не удалось создать аккаунт";
      toast({
        title: "Ошибка регистрации",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <SEOHead 
        title="Регистрация - CyberGate Flow"
        description="Создайте новый аккаунт в CyberGate Flow для управления VPN устройствами. Начните использовать безопасную платформу уже сегодня."
        keywords="регистрация, новый аккаунт, VPN, безопасность, платформа"
        url="https://cybergateflow.com/auth/register"
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
        <h1 className="text-2xl font-bold text-foreground mb-2">Создать аккаунт</h1>
        <p className="text-muted-foreground">Присоединяйтесь к CyberGate Flow</p>
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
          <p className="text-xs text-muted-foreground">Минимум 8 символов</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword" className="text-foreground">
            Подтверждение пароля
          </Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              className="pl-10 pr-10 bg-card border-border/50 focus:border-primary"
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <Button
          type="submit"
          disabled={registerMutation.isPending}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          {registerMutation.isPending ? 'Создание аккаунта...' : 'Создать аккаунт'}
        </Button>
      </form>

      {/* Footer */}
      <div className="text-center mt-6 pt-6 border-t border-border/30">
        <p className="text-sm text-muted-foreground">
          Уже есть аккаунт?{' '}
          <Link 
            to="/auth/login" 
            className="text-primary hover:text-primary/80 font-medium transition-colors"
          >
            Войти
          </Link>
        </p>
      </div>
    </div>
    </>
  );
};

export default RegisterPage;
