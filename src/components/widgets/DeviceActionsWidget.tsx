import React from 'react';
import { Button } from '@/components/ui/button';
import { Copy, Trash2, CreditCard } from 'lucide-react';
import type { DeviceInfo } from '@/lib/api/types';
import { motion } from 'framer-motion';

interface DeviceActionsWidgetProps {
  device: DeviceInfo;
  onCopy: () => void;
  onDelete: () => void;
  onPay: () => void;
  isDeleting: boolean;
  isPaying: boolean;
}

const DeviceActionsWidget: React.FC<DeviceActionsWidgetProps> = ({
  device,
  onCopy,
  onDelete,
  onPay,
  isDeleting,
  isPaying
}) => {
  const canDelete = device.status === 'active' || device.status === 'deactivated';
  const canPay = device.subscription.status === 'expired' && device.status === 'active';

  const buttonVariants = {
    initial: { scale: 1, y: 0 },
    tap: { scale: 0.95, y: 5 },
  };

  const iconVariants = {
    initial: { x: 0 },
    tap: { x: -5 },
  };

  return (
    <div className="flex space-x-2">
      <Button
        variant="outline"
        size="sm"
        onClick={onCopy}
        className="flex-1 hover:bg-secondary/50 transition-colors duration-200"
      >
        <Copy className="w-4 h-4 mr-2" />
        Копировать URL
      </Button>
      
      {canPay && (
        <motion.div
          variants={buttonVariants}
          initial="initial"
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap="tap"
        >
          <Button
            variant="default"
            size="sm"
            onClick={onPay}
            disabled={isPaying}
            className="h-11 bg-primary hover:bg-primary/90 transition-all duration-300 rounded-xl shadow-lg hover:shadow-xl hover:shadow-primary/25 group relative overflow-hidden px-6"
          >
            <motion.div variants={iconVariants} className="flex items-center space-x-2">
              <CreditCard className="w-4 h-4 mr-2" />
              <span className="font-medium">
                {isPaying ? 'Обработка...' : 'Оплатить'}
              </span>
            </motion.div>
            
            {/* Loading state indicator */}
            {isPaying && (
              <motion.div
                className="absolute inset-0 bg-primary/20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              />
            )}
          </Button>
        </motion.div>
      )}
      
      {canDelete && (
        <motion.div
          variants={buttonVariants}
          initial="initial"
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap="tap"
        >
          <Button
            variant="destructive"
            size="sm"
            onClick={onDelete}
            disabled={isDeleting}
            className="h-11 bg-destructive hover:bg-destructive/90 transition-all duration-300 rounded-xl shadow-lg hover:shadow-xl hover:shadow-destructive/25 group relative overflow-hidden px-6"
          >
            <motion.div variants={iconVariants} className="flex items-center space-x-2">
              <Trash2 className="w-4 h-4 mr-2" />
              <span className="font-medium">
                {isDeleting ? 'Удаление...' : 'Удалить'}
              </span>
            </motion.div>
            
            {/* Loading state indicator */}
            {isDeleting && (
              <motion.div
                className="absolute inset-0 bg-destructive/20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              />
            )}
          </Button>
        </motion.div>
      )}
    </div>
  );
};

export default DeviceActionsWidget;
