import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, CreditCard, Clock, Shield } from 'lucide-react';
import type { DeviceInfo } from '@/lib/api/types';

interface DeviceInfoWidgetProps {
  device: DeviceInfo;
}

const DeviceInfoWidget: React.FC<DeviceInfoWidgetProps> = ({ device }) => {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4, ease: "easeOut" as const }
    }
  };

  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: { duration: 0.5, ease: "easeOut" as const }
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = date.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays > 0) {
      return `${date.toLocaleDateString('ru-RU')} (через ${diffDays} дн.)`;
    } else if (diffDays === 0) {
      return `${date.toLocaleDateString('ru-RU')} (сегодня)`;
    } else {
      return `${date.toLocaleDateString('ru-RU')} (${Math.abs(diffDays)} дн. назад)`;
    }
  };

  const getSubscriptionStatus = () => {
    const expiresAt = new Date(device.subscription.expires_at);
    const now = new Date();
    const diffTime = expiresAt.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays > 30) {
      return { status: 'active', color: 'text-success', icon: Shield };
    } else if (diffDays > 0) {
      return { status: 'warning', color: 'text-warning', icon: Clock };
    } else {
      return { status: 'expired', color: 'text-destructive', icon: Clock };
    }
  };

  const subscriptionInfo = getSubscriptionStatus();

  return (
    <motion.div 
      className="space-y-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div 
        className="flex items-center space-x-3 p-3 bg-secondary/20 rounded-lg border border-border/30 group hover:bg-secondary/30 transition-all duration-300"
        variants={itemVariants}
        whileHover={{ x: 5, transition: { duration: 0.2 } }}
      >
        <motion.div 
          className="text-muted-foreground group-hover:text-primary transition-colors duration-300"
          variants={iconVariants}
        >
          <Calendar className="w-4 h-4" />
        </motion.div>
        <div className="flex-1">
          <p className="text-sm text-muted-foreground">Создано</p>
          <p className="text-sm font-medium text-foreground">
            {formatDate(device.created_at)}
          </p>
        </div>
      </motion.div>
      
      <motion.div 
        className="flex items-center space-x-3 p-3 bg-secondary/20 rounded-lg border border-border/30 group hover:bg-secondary/30 transition-all duration-300"
        variants={itemVariants}
        whileHover={{ x: 5, transition: { duration: 0.2 } }}
      >
        <motion.div 
          className={`group-hover:text-primary transition-colors duration-300 ${subscriptionInfo.color}`}
          variants={iconVariants}
        >
          <subscriptionInfo.icon className="w-4 h-4" />
        </motion.div>
        <div className="flex-1">
          <p className="text-sm text-muted-foreground">Подписка</p>
          <div className="flex items-center space-x-2">
            <p className={`text-sm font-medium ${subscriptionInfo.color}`}>
              {device.subscription.status === 'active' && 'Активна'}
              {device.subscription.status === 'expired' && 'Истекла'}
              {device.subscription.status === 'canceled' && 'Отменена'}
            </p>
            <span className="text-xs text-muted-foreground">
              до {formatDate(device.subscription.expires_at)}
            </span>
          </div>
        </div>
      </motion.div>

      {device.scheduled_delete_at && (
        <motion.div 
          className="flex items-center space-x-3 p-3 bg-warning/10 rounded-lg border border-warning/20 group hover:bg-warning/20 transition-all duration-300"
          variants={itemVariants}
          whileHover={{ x: 5, transition: { duration: 0.2 } }}
        >
          <motion.div 
            className="text-warning group-hover:text-warning/80 transition-colors duration-300"
            variants={iconVariants}
          >
            <Clock className="w-4 h-4" />
          </motion.div>
          <div className="flex-1">
            <p className="text-sm text-warning/80">Запланировано удаление</p>
            <p className="text-sm font-medium text-warning">
              {formatDate(device.scheduled_delete_at)}
            </p>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default DeviceInfoWidget;
