import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { User, LogOut, Settings, CreditCard, ChevronDown } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import type { UserInfo } from '@/lib/api/types';

interface UserProfileProps {
  user: UserInfo | null;
  onSignOut: () => void;
  onSignIn: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ user, onSignOut, onSignIn }) => {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);

  const handleSignOut = () => {
    onSignOut();
    toast({
      title: "До свидания!",
      description: "Вы успешно вышли из системы",
    });
  };

  if (!user) {
    return (
      <Button 
        onClick={onSignIn} 
        variant="outline" 
        className="border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-all duration-200 px-6 py-2"
      >
        <User className="w-4 h-4 mr-2" />
        Войти
      </Button>
    );
  }

  const initials = user.email
    .split('@')[0]
    .slice(0, 2)
    .toUpperCase();

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          className="relative h-12 w-auto px-4 rounded-full hover:bg-primary/10 transition-all duration-200 group"
        >
          <div className="flex items-center space-x-3">
            <Avatar className="h-8 w-8 ring-2 ring-primary/20 group-hover:ring-primary/40 transition-all duration-200">
              <AvatarImage src="" alt={user.email} />
              <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="hidden sm:block text-left">
              <p className="text-sm font-medium text-foreground leading-none">Пользователь</p>
              <p className="text-xs text-muted-foreground leading-none">
                {user.email}
              </p>
            </div>
            <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
          </div>
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent 
        className="w-64 bg-card/95 backdrop-blur-sm border-border/50 shadow-xl" 
        align="end" 
        forceMount
      >
        <DropdownMenuLabel className="font-normal p-4">
          <div className="flex flex-col space-y-2">
            <p className="text-sm font-medium leading-none text-foreground">Пользователь</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
            {user.telegram_username && (
              <p className="text-xs leading-none text-muted-foreground">
                Telegram: @{user.telegram_username}
              </p>
            )}
          </div>
        </DropdownMenuLabel>
        
        <DropdownMenuSeparator className="bg-border/30" />
        
        <DropdownMenuItem className="text-foreground cursor-pointer hover:bg-primary/5 transition-colors duration-150 p-3">
          <User className="mr-3 h-4 w-4" />
          <span>Профиль</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem className="text-foreground cursor-pointer hover:bg-primary/5 transition-colors duration-150 p-3">
          <CreditCard className="mr-3 h-4 w-4" />
          <span>Подписка</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem className="text-foreground cursor-pointer hover:bg-primary/5 transition-colors duration-150 p-3">
          <Settings className="mr-3 h-4 w-4" />
          <span>Настройки</span>
        </DropdownMenuItem>
        
        <DropdownMenuSeparator className="bg-border/30" />
        
        <DropdownMenuItem 
          className="text-destructive cursor-pointer focus:text-destructive hover:bg-destructive/10 transition-colors duration-150 p-3"
          onClick={handleSignOut}
        >
          <LogOut className="mr-3 h-4 w-4" />
          <span>Выйти</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserProfile;