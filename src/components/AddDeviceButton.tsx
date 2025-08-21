import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, CreditCard, ExternalLink } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AddDeviceButtonProps {
  onDeviceAdded?: () => void;
}

const AddDeviceButton: React.FC<AddDeviceButtonProps> = ({ onDeviceAdded }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isGeneratingLink, setIsGeneratingLink] = useState(false);
  const { toast } = useToast();

  const generatePaymentLink = async () => {
    setIsGeneratingLink(true);
    
    // Mock API call to generate payment link
    setTimeout(() => {
      const mockPaymentUrl = `https://payment.example.com/vpn-subscription/${Math.random().toString(36).substr(2, 9)}`;
      
      // Open payment link in new tab
      window.open(mockPaymentUrl, '_blank');
      
      toast({
        title: "Ссылка на оплату создана",
        description: "Ссылка на оплату подписки открыта в новой вкладке",
      });
      
      setIsGeneratingLink(false);
      setIsOpen(false);
      
      // Simulate device addition after "payment"
      setTimeout(() => {
        if (onDeviceAdded) {
          onDeviceAdded();
        }
        toast({
          title: "Устройство добавлено",
          description: "Новое устройство успешно добавлено после оплаты",
        });
      }, 3000);
    }, 1500);
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button className="bg-gradient-primary hover:opacity-90 transition-opacity">
            <Plus className="w-4 h-4 mr-2" />
            Добавить устройство
          </Button>
        </DialogTrigger>
        <DialogContent className="bg-card border-border">
          <DialogHeader>
            <DialogTitle className="text-foreground">Добавить новое устройство</DialogTitle>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto">
                <CreditCard className="w-8 h-8 text-primary-foreground" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Оформить подписку
                </h3>
                <p className="text-muted-foreground text-sm">
                  Для добавления нового устройства необходимо оформить подписку. 
                  После оплаты устройство автоматически появится в списке.
                </p>
              </div>
            </div>
            
            <div className="bg-secondary/30 rounded-lg p-4 border border-border/30">
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Месячная подписка</span>
                  <span className="font-semibold text-foreground">599 ₽</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Количество устройств</span>
                  <span className="font-semibold text-foreground">+1</span>
                </div>
                <hr className="border-border/30" />
                <div className="flex justify-between font-semibold">
                  <span className="text-foreground">Итого</span>
                  <span className="text-foreground">599 ₽</span>
                </div>
              </div>
            </div>

            <Button 
              onClick={generatePaymentLink}
              disabled={isGeneratingLink}
              className="w-full bg-gradient-primary hover:opacity-90 transition-opacity"
            >
              {isGeneratingLink ? (
                <>Создание ссылки...</>
              ) : (
                <>
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Перейти к оплате
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