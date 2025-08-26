import React from 'react';
import { Shield, Users, CreditCard, Clock, TrendingUp, Activity } from 'lucide-react';
import { motion } from 'framer-motion';
import type { DeviceInfo } from '@/lib/api/types';

interface StatsWidgetProps {
  devices: DeviceInfo[];
}

const StatsWidget: React.FC<StatsWidgetProps> = ({ devices }) => {
  const activeDevices = devices.filter(d => d.status === 'active').length;
  const totalDevices = devices.length;
  const activeSubscriptions = devices.filter(d => d.subscription.status === 'active').length;
  const expiredSubscriptions = devices.filter(d => d.subscription.status === 'expired').length;

  const stats = [
    {
      label: 'Активных устройств',
      value: activeDevices,
      icon: Shield,
      color: 'text-success',
      bgColor: 'bg-success/10',
      borderColor: 'border-success/20',
      description: 'Устройства готовы к работе',
      trend: activeDevices > 0 ? 'up' : 'none'
    },
    {
      label: 'Всего устройств',
      value: totalDevices,
      icon: Users,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      borderColor: 'border-primary/20',
      description: 'Общее количество устройств',
      trend: 'stable'
    },
    {
      label: 'Активных подписок',
      value: activeSubscriptions,
      icon: CreditCard,
      color: 'text-success',
      bgColor: 'bg-success/10',
      borderColor: 'border-success/20',
      description: 'Действующие подписки',
      trend: activeSubscriptions > 0 ? 'up' : 'none'
    },
    {
      label: 'Истекших подписок',
      value: expiredSubscriptions,
      icon: Clock,
      color: 'text-warning',
      bgColor: 'bg-warning/10',
      borderColor: 'border-warning/20',
      description: 'Требуют продления',
      trend: expiredSubscriptions > 0 ? 'down' : 'none'
    }
  ];

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
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-success" />;
      case 'down':
        return <TrendingUp className="w-4 h-4 text-warning rotate-180" />;
      default:
        return <Activity className="w-4 h-4 text-muted-foreground" />;
    }
  };

  return (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {stats.map((stat, index) => (
        <motion.div 
          key={index}
          className="group relative"
          variants={itemVariants}
          whileHover={{ 
            y: -8,
            transition: { duration: 0.2 }
          }}
        >
          <div className="bg-card/80 backdrop-blur-sm border border-border/50 hover:border-border group-hover:border-primary/30 rounded-2xl p-6 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 relative overflow-hidden">
            {/* Background glow */}
            <div className={`absolute inset-0 ${stat.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
            
            {/* Content */}
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 ${stat.bgColor} ${stat.borderColor} border rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div className="flex items-center space-x-1">
                  {getTrendIcon(stat.trend)}
                </div>
              </div>
              
              <div className="space-y-2">
                <p className="text-3xl font-bold text-foreground group-hover:text-foreground transition-colors duration-300">
                  {stat.value}
                </p>
                <p className="text-sm font-medium text-foreground group-hover:text-foreground transition-colors duration-300">
                  {stat.label}
                </p>
                <p className="text-xs text-muted-foreground group-hover:text-muted-foreground/80 transition-colors duration-300">
                  {stat.description}
                </p>
              </div>
            </div>

            {/* Hover effect line */}
            <div className={`absolute bottom-0 left-0 right-0 h-1 ${stat.borderColor} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default StatsWidget;
