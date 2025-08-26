import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, CreditCard, ExternalLink, Loader2 } from 'lucide-react';
import { useAddDevice } from '@/hooks/use-api';

interface AddDeviceButtonProps {
  onDeviceAdded?: () => void;
}

export const AddDeviceButton: React.FC<AddDeviceButtonProps> = ({ onDeviceAdded }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const addDeviceMutation = useAddDevice();

  const handleAddDevice = async () => {
    try {
      await addDeviceMutation.mutateAsync();
      setIsOpen(false);
      if (onDeviceAdded) {
        onDeviceAdded();
      }
    } catch (error) {
      // Error handling is done in the API hook
    }
  };

  const dialogVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { duration: 0.3, ease: "easeOut" as const }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8, 
      y: 20,
      transition: { duration: 0.2 }
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button className="bg-primary hover:bg-primary/90 transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl">
            <Plus className="w-4 h-4 mr-2" />
            Добавить устройство
          </Button>
        </DialogTrigger>
        <DialogContent className="bg-card/95 backdrop-blur-sm border-border/50 shadow-2xl max-w-md">
          <DialogHeader>
            <DialogTitle className="text-foreground text-xl font-bold">Добавить новое устройство</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            <div className="text-center space-y-4">
              <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto shadow-lg">
                <CreditCard className="w-10 h-10 text-primary-foreground" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  Добавить устройство
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Создайте новое VPN устройство для подключения. 
                  Устройство будет автоматически добавлено в ваш аккаунт.
                </p>
              </div>
            </div>

            <Button 
              onClick={handleAddDevice}
              disabled={addDeviceMutation.isPending}
              className="w-full bg-primary hover:bg-primary/90 transition-all duration-200 h-12 text-base font-medium shadow-lg hover:shadow-xl"
            >
              {addDeviceMutation.isPending ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Добавление устройства...
                </>
              ) : (
                <>
                  <Plus className="w-5 h-5 mr-2" />
                  Добавить устройство
                </>
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddDeviceButton;