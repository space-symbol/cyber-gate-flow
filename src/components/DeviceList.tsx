import React, { useState, useEffect } from 'react';
import DeviceCard, { Device } from './DeviceCard';
import AddDeviceButton from './AddDeviceButton';
import UserProfile from './UserProfile';
import AuthModal from './AuthModal';
import { Button } from '@/components/ui/button';
import { RefreshCw, Shield, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const DeviceList: React.FC = () => {
  const [devices, setDevices] = useState<Device[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [user, setUser] = useState<{ email: string; name: string } | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { toast } = useToast();

  // Mock initial data
  const mockDevices: Device[] = [
    {
      id: '1',
      name: 'iPhone 15 Pro',
      type: 'mobile',
      status: 'active',
      token: 'vpn_token_abc123def456ghi789jkl012',
      lastConnected: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    },
    {
      id: '2',
      name: 'MacBook Air M2',
      type: 'desktop',
      status: 'active',
      token: 'vpn_token_mno345pqr678stu901vwx234',
      lastConnected: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    },
    {
      id: '3',
      name: 'iPad Pro 12.9"',
      type: 'tablet',
      status: 'deactivated',
      token: 'vpn_token_yzа567bcd890efg123hij456',
      lastConnected: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 days ago
    },
  ];

  useEffect(() => {
    // Simulate loading devices if user is authenticated
    if (user) {
      setTimeout(() => {
        setDevices(mockDevices);
      }, 500);
    } else {
      setDevices([]);
    }
  }, [user]);

  const handleDeleteDevice = (deviceId: string) => {
    setDevices(devices.filter(device => device.id !== deviceId));
  };

  const handleDeviceAdded = () => {
    // Simulate adding new device after payment
    const newDevice: Device = {
      id: Math.random().toString(36).substr(2, 9),
      name: 'Новое устройство',
      type: 'mobile',
      status: 'active',
      token: `vpn_token_${Math.random().toString(36).substr(2, 24)}`,
      lastConnected: new Date(),
    };
    setDevices([...devices, newDevice]);
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setIsRefreshing(false);
      toast({
        title: "Список обновлен",
        description: "Статус устройств обновлен",
      });
    }, 1000);
  };

  const handleAuthSuccess = (userData: { email: string; name: string }) => {
    setUser(userData);
  };

  const handleSignOut = () => {
    setUser(null);
    setDevices([]);
  };

  const handleSignIn = () => {
    setShowAuthModal(true);
  };

  const activeDevices = devices.filter(device => device.status === 'active').length;
  const totalDevices = devices.length;

  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                <Shield className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">VPN Устройства</h1>
                <p className="text-muted-foreground">
                  {user ? `Добро пожаловать, ${user.name}!` : 'Управление подключенными устройствами'}
                </p>
              </div>
            </div>
            <div className="flex space-x-3 items-center">
              {user && (
                <>
                  <Button
                    variant="outline"
                    onClick={handleRefresh}
                    disabled={isRefreshing}
                    className="border-border/50"
                  >
                    <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
                    Обновить
                  </Button>
                  <AddDeviceButton onDeviceAdded={handleDeviceAdded} />
                </>
              )}
              <UserProfile 
                user={user}
                onSignOut={handleSignOut}
                onSignIn={handleSignIn}
              />
            </div>
          </div>

          {user && (
            <>
              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-gradient-card border border-border/50 rounded-lg p-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-success/10 rounded-full flex items-center justify-center">
                      <Shield className="w-5 h-5 text-success" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">{activeDevices}</p>
                      <p className="text-sm text-muted-foreground">Активных устройств</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-card border border-border/50 rounded-lg p-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <Users className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">{totalDevices}</p>
                      <p className="text-sm text-muted-foreground">Всего устройств</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-card border border-border/50 rounded-lg p-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-warning/10 rounded-full flex items-center justify-center">
                      <Shield className="w-5 h-5 text-warning" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">99.9%</p>
                      <p className="text-sm text-muted-foreground">Время работы</p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Content */}
        {!user ? (
          // Not authenticated view
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield className="w-12 h-12 text-primary-foreground" />
            </div>
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Защитите свои устройства
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Войдите в свой аккаунт или создайте новый, чтобы начать управление 
              VPN подключениями на всех ваших устройствах
            </p>
            <div className="space-y-4">
              <Button 
                onClick={handleSignIn}
                className="bg-gradient-primary hover:opacity-90 transition-opacity text-lg px-8 py-3"
              >
                Войти в систему
              </Button>
              <div className="text-sm text-muted-foreground">
                Новый пользователь? Создайте аккаунт в модальном окне входа
              </div>
            </div>
          </div>
        ) : (
          // Authenticated view - Device Grid
          <>
            {devices.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {devices.map((device) => (
                  <DeviceCard
                    key={device.id}
                    device={device}
                    onDelete={handleDeleteDevice}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-muted/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Нет подключенных устройств
                </h3>
                <p className="text-muted-foreground mb-6">
                  Добавьте свое первое устройство, чтобы начать использовать VPN
                </p>
                <AddDeviceButton onDeviceAdded={handleDeviceAdded} />
              </div>
            )}
          </>
        )}

        {/* Auth Modal */}
        <AuthModal
          isOpen={showAuthModal}
          onOpenChange={setShowAuthModal}
          onAuthSuccess={handleAuthSuccess}
        />
      </div>
    </div>
  );
};

export default DeviceList;