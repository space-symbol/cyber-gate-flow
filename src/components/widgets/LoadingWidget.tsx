import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Loader2, Zap, Globe } from 'lucide-react';

const LoadingWidget: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
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

  const pulseVariants = {
    pulse: {
      scale: [1, 1.1, 1],
      opacity: [0.5, 1, 0.5],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut" as const
      }
    }
  };

  const rotateVariants = {
    rotate: {
      rotate: 360,
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "linear" as const
      }
    }
  };

  const floatingVariants = {
    float: {
      y: [-10, 10, -10],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut" as const
      }
    }
  };

  return (
    <motion.div 
      className="min-h-screen bg-background flex items-center justify-center p-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="text-center max-w-md">
        {/* Main loading icon */}
        <motion.div 
          className="relative mx-auto mb-8"
          variants={itemVariants}
        >
          <motion.div
            className="w-32 h-32 bg-primary/10 rounded-full flex items-center justify-center mx-auto border-2 border-primary/20 relative overflow-hidden"
            variants={pulseVariants}
            animate="pulse"
          >
            <motion.div
              className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center"
              variants={rotateVariants}
              animate="rotate"
            >
              <Shield className="w-10 h-10 text-primary" />
            </motion.div>
            
            {/* Rotating border */}
            <motion.div
              className="absolute inset-0 border-2 border-transparent border-t-primary/40 rounded-full"
              variants={rotateVariants}
              animate="rotate"
            />
          </motion.div>

          {/* Floating elements */}
          <motion.div
            className="absolute -top-4 -right-4 w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center"
            variants={floatingVariants}
            animate="float"
          >
            <Zap className="w-4 h-4 text-primary" />
          </motion.div>
          
          <motion.div
            className="absolute -bottom-4 -left-4 w-6 h-6 bg-primary/15 rounded-full flex items-center justify-center"
            variants={floatingVariants}
            animate="float"
            style={{ animationDelay: '1s' }}
          >
            <Globe className="w-3 h-3 text-primary" />
          </motion.div>
        </motion.div>

        {/* Loading text */}
        <motion.div 
          className="space-y-4"
          variants={itemVariants}
        >
          <h2 className="text-2xl font-bold text-foreground">
            Загрузка устройств
          </h2>
          <p className="text-muted-foreground">
            Получаем информацию о ваших VPN подключениях...
          </p>
        </motion.div>

        {/* Loading indicator */}
        <motion.div 
          className="flex items-center justify-center space-x-3 mt-8"
          variants={itemVariants}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          >
            <Loader2 className="w-6 h-6 text-primary" />
          </motion.div>
          <span className="text-sm text-muted-foreground">Пожалуйста, подождите</span>
        </motion.div>

        {/* Loading dots */}
        <motion.div 
          className="flex justify-center space-x-2 mt-6"
          variants={itemVariants}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-primary rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2
              }}
            />
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LoadingWidget;
