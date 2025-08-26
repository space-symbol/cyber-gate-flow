import React from 'react';
import { Button } from '@/components/ui/button';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface ErrorWidgetProps {
  message?: string;
  onRetry?: () => void;
  title?: string;
}

const ErrorWidget: React.FC<ErrorWidgetProps> = ({ 
  message = "Произошла ошибка при загрузке данных", 
  onRetry,
  title = "Ошибка"
}) => {
  return (
    <div className="text-center py-16">
      <div className="w-20 h-20 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-6">
        <AlertTriangle className="w-10 h-10 text-destructive" />
      </div>
      
      <h3 className="text-2xl font-semibold text-foreground mb-3">
        {title}
      </h3>
      
      <p className="text-muted-foreground mb-8 max-w-md mx-auto">
        {message}
      </p>
      
      {onRetry && (
        <Button 
          onClick={onRetry}
          variant="outline"
          className="hover:bg-destructive/10 hover:border-destructive/50 transition-colors duration-200"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Попробовать снова
        </Button>
      )}
    </div>
  );
};

export default ErrorWidget;
