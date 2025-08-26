import React from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';
import AddDeviceButton from '../AddDeviceButton';

interface ActionPanelWidgetProps {
  onRefresh: () => void;
  onDeviceAdded: () => void;
  isLoading: boolean;
}

const ActionPanelWidget: React.FC<ActionPanelWidgetProps> = ({
  onRefresh,
  onDeviceAdded,
  isLoading
}) => {
  return (
    <div className="flex space-x-3 items-center">
      <Button
        variant="outline"
        onClick={onRefresh}
        disabled={isLoading}
        className="border-border/50 hover:border-primary/50 transition-colors duration-200"
      >
        <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
        Обновить
      </Button>
      <AddDeviceButton onDeviceAdded={onDeviceAdded} />
    </div>
  );
};

export default ActionPanelWidget;
