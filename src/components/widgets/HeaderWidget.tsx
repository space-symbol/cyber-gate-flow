import React from 'react';
import { Shield, Zap, Globe, Users } from 'lucide-react';
import { motion } from 'framer-motion';

interface HeaderWidgetProps {
  userEmail?: string;
  isAuthenticated: boolean;
}

const HeaderWidget: React.FC<HeaderWidgetProps> = ({ userEmail, isAuthenticated }) => {
  const containerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" as const }
    }
  };

  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: { duration: 0.6, ease: "easeOut" as const }
    }
  };

  return (
    <motion.div 
      className="flex items-center space-x-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div 
        className="flex items-center space-x-4"
        variants={itemVariants}
      >
        <motion.div 
          className="relative"
          variants={iconVariants}
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center shadow-lg shadow-primary/25">
            <Shield className="w-8 h-8 text-primary-foreground" />
          </div>
          <div className="absolute -inset-1 bg-primary/20 rounded-2xl blur-xl -z-10"></div>
        </motion.div>
        
        <div className="space-y-2">
          <motion.h1 
            className="text-4xl font-bold text-foreground bg-gradient-to-r from-foreground via-foreground to-primary bg-clip-text"
            variants={itemVariants}
          >
            VPN Устройства
          </motion.h1>
          <motion.p 
            className="text-lg text-muted-foreground flex items-center space-x-2"
            variants={itemVariants}
          >
            <Globe className="w-4 h-4" />
            <span>
              {isAuthenticated 
                ? `Добро пожаловать, ${userEmail}!` 
                : 'Управление подключенными устройствами'
              }
            </span>
          </motion.p>
        </div>
      </motion.div>

      {/* Quick stats */}
      <motion.div 
        className="hidden lg:flex items-center space-x-6 ml-auto"
        variants={itemVariants}
      >
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Zap className="w-4 h-4 text-warning" />
          <span>Быстрое подключение</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Users className="w-4 h-4 text-success" />
          <span>Множество устройств</span>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default HeaderWidget;
