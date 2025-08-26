import React, { useState, useMemo } from 'react';
import UserProfile from './UserProfile';
import AuthModal from './AuthModal';
import HeaderWidget from './widgets/HeaderWidget';
import StatsWidget from './widgets/StatsWidget';
import ActionPanelWidget from './widgets/ActionPanelWidget';
import WelcomeWidget from './widgets/WelcomeWidget';
import EmptyStateWidget from './widgets/EmptyStateWidget';
import DeviceGridWidget from './widgets/DeviceGridWidget';
import SearchFilterWidget from './widgets/SearchFilterWidget';
import { useUser, useDevices, useLogout } from '@/hooks/use-api';
import type { UserInfo } from '@/lib/api/types';
import { Button } from './ui/button';
import { Search, X } from 'lucide-react';
import type { DeviceInfo } from '@/lib/api/types';

const DeviceList: React.FC = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [filteredDevices, setFilteredDevices] = useState<DeviceInfo[]>([]);
  
  const { data: user, isLoading: userLoading } = useUser();
  const { data: devicesData, isLoading: devicesLoading, refetch: refetchDevices } = useDevices();
  const logoutMutation = useLogout();

  const devices = devicesData?.devices || [];
  const activeDevices = devices.filter(device => device.status === 'active').length;
  const totalDevices = devices.length;

  // Инициализируем отфильтрованные устройства при изменении devices
  useMemo(() => {
    setFilteredDevices(devices);
  }, [devices]);

  const handleDeleteDevice = (deviceId: number) => {
    // This will be handled by the API hook
  };

  const handleDeviceAdded = () => {
    // This will be handled by the API hook
    refetchDevices();
  };

  const handleRefresh = async () => {
    refetchDevices();
  };

  const handleAuthSuccess = (userData: UserInfo) => {
    setShowAuthModal(false);
    refetchDevices();
  };

  const handleSignOut = () => {
    logoutMutation.mutate();
  };

  const handleSignIn = () => {
    setShowAuthModal(true);
  };

  const handleFilterChange = (newFilteredDevices: DeviceInfo[]) => {
    setFilteredDevices(newFilteredDevices);
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8 gap-6">
            <HeaderWidget 
              userEmail={user?.email} 
              isAuthenticated={!!user} 
            />
            
            {user && (
              <div className="flex items-center space-x-4">
                <ActionPanelWidget
                  onRefresh={handleRefresh}
                  onDeviceAdded={handleDeviceAdded}
                  isLoading={devicesLoading}
                />
                <UserProfile 
                  user={user ? { email: user.email, name: user.email.split('@')[0] } : null}
                  onSignOut={handleSignOut}
                  onSignIn={handleSignIn}
                />
              </div>
            )}
          </div>

          {/* Stats Section */}
          {user && (
            <StatsWidget
              activeDevices={activeDevices}
              totalDevices={totalDevices}
              uptime="99.9%"
            />
          )}
        </div>

        {/* Content Section */}
        {!user ? (
          <WelcomeWidget onSignIn={handleSignIn} />
        ) : (
          <>
            {/* Search and Filter Section */}
            {devices.length > 0 && (
              <SearchFilterWidget
                devices={devices}
                onFilterChange={handleFilterChange}
              />
            )}

            {/* Devices Section */}
            {filteredDevices.length > 0 ? (
              <DeviceGridWidget 
                devices={filteredDevices} 
                onDelete={handleDeleteDevice} 
              />
            ) : devices.length > 0 ? (
              <div className="text-center py-16">
                <div className="w-20 h-20 bg-muted/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="w-10 h-10 text-muted-foreground" />
                </div>
                <h3 className="text-2xl font-semibold text-foreground mb-3">
                  Устройства не найдены
                </h3>
                <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                  Попробуйте изменить параметры поиска или фильтрации
                </p>
                <Button
                  variant="outline"
                  onClick={() => setFilteredDevices(devices)}
                  className="hover:bg-primary/10 hover:border-primary/50 transition-colors duration-200"
                >
                  <X className="w-4 h-4 mr-2" />
                  Сбросить фильтры
                </Button>
              </div>
            ) : (
              <EmptyStateWidget onDeviceAdded={handleDeviceAdded} />
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