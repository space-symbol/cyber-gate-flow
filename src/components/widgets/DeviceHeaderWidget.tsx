import React from 'react';
import { Smartphone } from 'lucide-react';
import type { DeviceInfo } from '@/lib/api/types';

interface DeviceHeaderWidgetProps {
  device: DeviceInfo;
}

const DeviceHeaderWidget: React.FC<DeviceHeaderWidgetProps> = ({ device }) => {
  return (
    <div className="flex items-center space-x-3">
      <div className="text-muted-foreground">
        <Smartphone className="w-5 h-5" />
      </div>
      <div>
        <h3 className="font-semibold text-foreground">{device.name}</h3>
        <p className="text-sm text-muted-foreground">
          VPN устройство
        </p>
      </div>
    </div>
  );
};

export default DeviceHeaderWidget;
