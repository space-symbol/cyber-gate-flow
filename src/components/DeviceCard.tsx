import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { useDeleteDevice, usePayDevice } from '@/hooks/use-api';
import DeviceHeaderWidget from './widgets/DeviceHeaderWidget';
import DeviceInfoWidget from './widgets/DeviceInfoWidget';
import DeviceActionsWidget from './widgets/DeviceActionsWidget';
import type { DeviceInfo } from '@/lib/api/types';

interface DeviceCardProps {
  device: DeviceInfo;
  onDelete: (deviceId: number) => void;
  index: number;
}

const DeviceCard: React.FC<DeviceCardProps> = ({ device, onDelete, index }) => {
  const deleteDeviceMutation = useDeleteDevice();
  const payDeviceMutation = usePayDevice();

  const copyToken = async () => {
    try {
      await navigator.clipboard.writeText(device.access_url);
      // Toast will be handled by the API hook
    } catch (error) {
      // Error handling is done in the API hook
    }
  };

  const handleDelete = async () => {
    try {
      await deleteDeviceMutation.mutateAsync(device.id);
      onDelete(device.id);
    } catch (error) {
      // Error handling is done in the API hook
    }
  };

  const handlePay = () => {
    payDeviceMutation.mutate({ deviceId: device.id, months: 3 });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-success text-success-foreground border-success/20';
      case 'pending_delete':
        return 'bg-warning text-warning-foreground border-warning/20';
      case 'deactivated':
        return 'bg-muted text-muted-foreground border-muted/20';
      case 'deleted':
        return 'bg-destructive text-destructive-foreground border-destructive/20';
      default:
        return 'bg-muted text-muted-foreground border-muted/20';
    }
  };

  const getSubscriptionStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-success text-success-foreground border-success/20';
      case 'expired':
        return 'bg-destructive text-destructive-foreground border-destructive/20';
      case 'canceled':
        return 'bg-muted text-muted-foreground border-muted/20';
      default:
        return 'bg-muted text-muted-foreground border-muted/20';
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50, 
      scale: 0.9 
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: index * 0.1,
        ease: "easeOut"
      }
    },
    hover: {
      y: -8,
      scale: 1.02,
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    }
  };

  const statusVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { delay: 0.3 + index * 0.1, duration: 0.3 }
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      layout
    >
      <Card className="bg-card/80 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-300 overflow-hidden group relative">
        {/* Status indicator line */}
        <div className={`absolute top-0 left-0 right-0 h-1 ${device.status === 'active' ? 'bg-success' : device.status === 'pending_delete' ? 'bg-warning' : 'bg-muted'}`} />
        
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="p-6 space-y-5 relative z-10">
          <div className="flex items-center justify-between">
            <DeviceHeaderWidget device={device} />
            <motion.div 
              className="flex gap-2"
              variants={statusVariants}
              initial="hidden"
              animate="visible"
            >
              <Badge className={`${getStatusColor(device.status)} border shadow-sm`}>
                {device.status === 'active' && '🟢 Активно'}
                {device.status === 'pending_delete' && '🟡 Удаление'}
                {device.status === 'deactivated' && '⚪ Деактивировано'}
                {device.status === 'deleted' && '🔴 Удалено'}
              </Badge>
              <Badge className={`${getSubscriptionStatusColor(device.subscription.status)} border shadow-sm`}>
                {device.subscription.status === 'active' && '💳 Подписка'}
                {device.subscription.status === 'expired' && '⏰ Истекла'}
                {device.subscription.status === 'canceled' && '❌ Отменена'}
              </Badge>
            </motion.div>
          </div>
          
          <motion.div 
            className="bg-secondary/30 rounded-lg p-4 font-mono text-sm break-all border border-border/30 group-hover:border-primary/30 transition-all duration-300 group-hover:bg-secondary/50"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-muted-foreground uppercase tracking-wider">Access URL</span>
              <Badge variant="outline" className="text-xs">VPN</Badge>
            </div>
            <div className="text-foreground font-medium">{device.access_url}</div>
          </motion.div>

          <DeviceInfoWidget device={device} />

          <DeviceActionsWidget
            device={device}
            onCopy={copyToken}
            onDelete={handleDelete}
            onPay={handlePay}
            isDeleting={deleteDeviceMutation.isPending}
            isPaying={payDeviceMutation.isPending}
          />
        </div>
      </Card>
    </motion.div>
  );
};

export default DeviceCard;