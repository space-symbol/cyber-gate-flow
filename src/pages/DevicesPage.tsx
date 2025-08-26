import React from 'react';
import { useDevices } from '@/hooks/use-api';
import { AddDeviceButton } from '@/components/AddDeviceButton';
import DeviceCard from '@/components/DeviceCard';
import StatsWidget from '@/components/widgets/StatsWidget';
import EmptyStateWidget from '@/components/widgets/EmptyStateWidget';
import LoadingWidget from '@/components/widgets/LoadingWidget';
import ErrorWidget from '@/components/widgets/ErrorWidget';
import SEOHead from '@/components/SEOHead';
import Breadcrumbs from '@/components/Breadcrumbs';
import { SEO_CONSTANTS } from '@/lib/seo-constants';
import type { DeviceInfo } from '@/lib/api/types';

const DevicesPage: React.FC = () => {
  const { data, isLoading, error, refetch } = useDevices();
  const devices = data?.devices || [];

  const handleDeleteDevice = (deviceId: number) => {
    // Device deletion is handled by the API hook
    // This function is called after successful deletion
  };

  const handleDeviceAdded = () => {
    // Refresh devices list after adding new device
    refetch();
  };

  if (isLoading) {
    return <LoadingWidget />;
  }

  if (error) {
    return (
      <ErrorWidget 
        message={error.message || "Произошла ошибка при загрузке устройств"}
        onRetry={refetch}
        title="Ошибка загрузки"
      />
    );
  }

  return (
    <>
      <SEOHead 
        title={SEO_CONSTANTS.PAGES.DEVICES.title}
        description={SEO_CONSTANTS.PAGES.DEVICES.description}
        keywords={SEO_CONSTANTS.PAGES.DEVICES.keywords}
        url={SEO_CONSTANTS.PAGES.DEVICES.url}
      />
      <div className="space-y-8">
        <Breadcrumbs />
        <div className="py-4 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-foreground via-foreground to-primary bg-clip-text">
              Устройства
            </h1>
            <p className="text-muted-foreground text-lg mt-2">
            </p>
          </div>
          <AddDeviceButton onDeviceAdded={handleDeviceAdded} />
        </div>

        {/* Stats */}
        {devices.length > 0 && (
          <div className="animate-in slide-in-from-bottom-4 duration-500">
            <StatsWidget devices={devices} />
          </div>
        )}

        {/* Devices Grid */}
        {devices.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {devices.map((device: DeviceInfo, index: number) => (
              <DeviceCard
                key={device.id}
                device={device}
                onDelete={handleDeleteDevice}
                index={index}
              />
            ))}
          </div>
        ) : (
          <div className="animate-in slide-in-from-bottom-4 duration-500">
            <EmptyStateWidget onDeviceAdded={handleDeviceAdded} />
          </div>
        )}
      </div>
    </>
  );
};

export default DevicesPage;
