import React from 'react';
import DeviceCard from '../DeviceCard';
import type { DeviceInfo } from '@/lib/api/types';

interface DeviceGridWidgetProps {
  devices: DeviceInfo[];
  onDelete: (deviceId: number) => void;
}

const DeviceGridWidget: React.FC<DeviceGridWidgetProps> = ({ devices, onDelete }) => {
  if (devices.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {devices.map((device) => (
        <DeviceCard
          key={device.id}
          device={device}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default DeviceGridWidget;
