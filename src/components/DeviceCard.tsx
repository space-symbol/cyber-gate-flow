import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Copy, Trash2, Smartphone, Monitor, Tablet } from 'lucide-react';

export interface Device {
  id: string;
  name: string;
  type: 'mobile' | 'desktop' | 'tablet';
  status: 'active' | 'deactivated' | 'pending_delete';
  token: string;
  lastConnected?: Date;
}

interface DeviceCardProps {
  device: Device;
  onDelete: (deviceId: string) => void;
}

const DeviceCard: React.FC<DeviceCardProps> = ({ device, onDelete }) => {
  const { toast } = useToast();
  const [isDeleting, setIsDeleting] = useState(false);

  const getStatusVariant = (status: Device['status']) => {
    switch (status) {
      case 'active':
        return 'default';
      case 'deactivated':
        return 'secondary';
      case 'pending_delete':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  const getStatusColor = (status: Device['status']) => {
    switch (status) {
      case 'active':
        return 'text-vpn-active';
      case 'deactivated':
        return 'text-vpn-inactive';
      case 'pending_delete':
        return 'text-destructive';
      default:
        return 'text-vpn-inactive';
    }
  };

  const getDeviceIcon = (type: Device['type']) => {
    switch (type) {
      case 'mobile':
        return <Smartphone className="w-5 h-5" />;
      case 'desktop':
        return <Monitor className="w-5 h-5" />;
      case 'tablet':
        return <Tablet className="w-5 h-5" />;
      default:
        return <Smartphone className="w-5 h-5" />;
    }
  };

  const copyToken = async () => {
    try {
      await navigator.clipboard.writeText(device.token);
      toast({
        title: "Токен скопирован",
        description: "Токен устройства скопирован в буфер обмена",
      });
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось скопировать токен",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    // Simulate API call
    setTimeout(() => {
      onDelete(device.id);
      setIsDeleting(false);
      toast({
        title: "Устройство удалено",
        description: `${device.name} было удалено из списка устройств`,
      });
    }, 1000);
  };

  return (
    <Card className="bg-gradient-card border-border/50 hover:border-primary/50 transition-all duration-300 transform hover:scale-[1.02]">
      <div className="p-6 space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="text-muted-foreground">
              {getDeviceIcon(device.type)}
            </div>
            <div>
              <h3 className="font-semibold text-foreground">{device.name}</h3>
              <p className="text-sm text-muted-foreground capitalize">
                {device.type}
              </p>
            </div>
          </div>
          <Badge variant={getStatusVariant(device.status)} className={getStatusColor(device.status)}>
            {device.status === 'active' && 'Активно'}
            {device.status === 'deactivated' && 'Отключено'}
            {device.status === 'pending_delete' && 'Ожидает удаления'}
          </Badge>
        </div>

        {device.lastConnected && (
          <div className="text-xs text-muted-foreground">
            Последнее подключение: {device.lastConnected.toLocaleString('ru-RU')}
          </div>
        )}

        <div className="bg-secondary/30 rounded-lg p-3 font-mono text-sm break-all border border-border/30">
          {device.token}
        </div>

        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={copyToken}
            className="flex-1"
          >
            <Copy className="w-4 h-4 mr-2" />
            Копировать токен
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            <Trash2 className="w-4 h-4 mr-2" />
            {isDeleting ? 'Удаление...' : 'Удалить'}
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default DeviceCard;