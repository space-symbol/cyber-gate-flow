import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { User, LogOut, Settings, CreditCard } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface UserProfileProps {
  user: { email: string; name: string } | null;
  onSignOut: () => void;
  onSignIn: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ user, onSignOut, onSignIn }) => {
  const { toast } = useToast();

  const handleSignOut = () => {
    onSignOut();
    toast({
      title: "До свидания!",
      description: "Вы успешно вышли из системы",
    });
  };

  if (!user) {
    return (
      <Button onClick={onSignIn} variant="outline" className="border-border/50">
        <User className="w-4 h-4 mr-2" />
        Войти
      </Button>
    );
  }

  const initials = user.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-10 w-10">
            <AvatarImage src="" alt={user.name} />
            <AvatarFallback className="bg-gradient-primary text-primary-foreground">
              {initials}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-card border-border" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none text-foreground">{user.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-border/30" />
        <DropdownMenuItem className="text-foreground cursor-pointer">
          <User className="mr-2 h-4 w-4" />
          <span>Профиль</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="text-foreground cursor-pointer">
          <CreditCard className="mr-2 h-4 w-4" />
          <span>Подписка</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="text-foreground cursor-pointer">
          <Settings className="mr-2 h-4 w-4" />
          <span>Настройки</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-border/30" />
        <DropdownMenuItem 
          className="text-destructive cursor-pointer focus:text-destructive"
          onClick={handleSignOut}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Выйти</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserProfile;