import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Plus, Zap, Globe } from 'lucide-react';
import AddDeviceButton from '../AddDeviceButton';

interface EmptyStateWidgetProps {
  onDeviceAdded: () => void;
}

const EmptyStateWidget: React.FC<EmptyStateWidgetProps> = ({ onDeviceAdded }) => {
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" as const }
    }
  };

  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: { duration: 0.8, ease: "easeOut" as const }
    }
  };

  const floatingVariants = {
    initial: { y: 0 },
    float: {
      y: [-10, 10, -10],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut" as const
      }
    }
  };

  return (
    <motion.div 
      className="container mx-auto text-center py-20"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div 
        className="relative mx-auto mb-8"
        variants={iconVariants}
      >
        <motion.div
          className="relative w-32 h-32 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center mx-auto shadow-2xl shadow-primary/25 border border-primary/20"
          variants={floatingVariants}
          initial="initial"
          animate="float"
        >
          <Shield className="w-16 h-16 text-primary" />

          <motion.div
            className="absolute -top-6 right-0 w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center"
            animate={{ 
              y: [5, -5, 5],
              scale: [1, 1.2, 1]
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <Zap className="w-4 h-4 text-primary" />
          </motion.div>
          
          <motion.div
            className="absolute -bottom-4 left-0 w-6 h-6 bg-primary/15 rounded-full flex items-center justify-center"
            animate={{ 
              y: [5, -5, 5],
              scale: [1, 1.2, 1]
            }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <Globe className="w-3 h-3 text-primary" />
          </motion.div>
        </motion.div>
      </motion.div>
      
      <motion.div 
        className="space-y-4 mb-8"
        variants={itemVariants}
      >
        <h3 className="text-3xl font-bold text-foreground bg-gradient-to-r from-foreground via-foreground to-primary bg-clip-text">
          Нет подключенных устройств
        </h3>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Добавьте свое первое VPN устройство, чтобы начать безопасное подключение к интернету. 
          Мы обеспечим защиту вашей приватности и анонимность в сети.
        </p>
      </motion.div>

      <motion.div
        variants={itemVariants}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <AddDeviceButton onDeviceAdded={onDeviceAdded} />
      </motion.div>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-4xl mx-auto"
        variants={itemVariants}
      >
        <div 
          className="p-4 bg-card/50 rounded-xl border border-border/30"
        >
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Shield className="w-6 h-6 text-primary" />
          </div>
          <h4 className="font-semibold text-foreground mb-2">Безопасность</h4>
          <p className="text-sm text-muted-foreground">Шифрование трафика и защита от слежки</p>
        </div>

        <div 
          className="p-4 bg-card/50 rounded-xl border border-border/30"
        >
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Zap className="w-6 h-6 text-primary" />
          </div>
          <h4 className="font-semibold text-foreground mb-2">Скорость</h4>
          <p className="text-sm text-muted-foreground">Быстрое подключение без потери скорости</p>
        </div>

        <div 
          className="p-4 bg-card/50 rounded-xl border border-border/30"
        >
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Globe className="w-6 h-6 text-primary" />
          </div>
          <h4 className="font-semibold text-foreground mb-2">Доступность</h4>
          <p className="text-sm text-muted-foreground">Подключение к заблокированным сайтам</p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default EmptyStateWidget;
