import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api/client';
import { useToast } from '@/hooks/use-toast';
import type {
  LoginRequest,
  RegisterRequest,
  PaymentRequest,
  UserInfo,
  DeviceInfo
} from '@/lib/api/types';

// Query keys
export const queryKeys = {
  user: ['user'] as const,
  devices: ['devices'] as const,
  device: (id: number) => ['device', id] as const,
};

// User hooks
export const useUser = () => {
  return useQuery({
    queryKey: queryKeys.user,
    queryFn: apiClient.getUserProfile,
    enabled: apiClient.isAuthenticated(),
    retry: false,
  });
};

export const useLogin = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (data: LoginRequest) => apiClient.login(data),
    onSuccess: (data) => {
      queryClient.setQueryData(queryKeys.user, data.user);
      toast({
        title: "Успешный вход",
        description: `Добро пожаловать, ${data.user.email}!`,
      });
    },
    onError: (error: Error | unknown) => {
      const errorMessage = error instanceof Error ? error.message : "Не удалось войти в систему";
      toast({
        title: "Ошибка входа",
        description: errorMessage,
        variant: "destructive",
      });
    },
  });
};

export const useRegister = () => {
  const { toast } = useToast();

  return useMutation({
    mutationFn: (data: RegisterRequest) => apiClient.register(data),
    onSuccess: (data) => {
      toast({
        title: "Регистрация успешна",
        description: `Аккаунт создан для ${data.user.email}. Настройте MFA для безопасности.`,
      });
    },
    onError: (error: Error | unknown) => {
      const errorMessage = error instanceof Error ? error.message : "Не удалось создать аккаунт";
      toast({
        title: "Ошибка регистрации",
        description: errorMessage,
        variant: "destructive",
      });
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: () => {
      apiClient.clearToken();
      return Promise.resolve();
    },
    onSuccess: () => {
      queryClient.clear();
      toast({
        title: "Выход выполнен",
        description: "Вы успешно вышли из системы",
      });
    },
  });
};

// Device hooks
export const useDevices = () => {
  return useQuery({
    queryKey: queryKeys.devices,
    queryFn: apiClient.getDevices,
    enabled: apiClient.isAuthenticated(),
  });
};

export const useDevice = (id: number) => {
  return useQuery({
    queryKey: queryKeys.device(id),
    queryFn: () => apiClient.getDevice(id),
    enabled: apiClient.isAuthenticated() && !!id,
  });
};

export const useAddDevice = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: apiClient.addDevice,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.devices });
      toast({
        title: "Устройство добавлено",
        description: `Устройство "${data.device.name}" успешно создано`,
      });
    },
    onError: (error: Error | unknown) => {
      const errorMessage = error instanceof Error ? error.message : "Не удалось добавить устройство";
      toast({
        title: "Ошибка добавления устройства",
        description: errorMessage,
        variant: "destructive",
      });
    },
  });
};

export const useDeleteDevice = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (id: number) => apiClient.deleteDevice(id),
    onSuccess: (_, deviceId) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.devices });
      toast({
        title: "Устройство удалено",
        description: "Устройство запланировано на удаление",
      });
    },
    onError: (error: Error | unknown) => {
      const errorMessage = error instanceof Error ? error.message : "Не удалось удалить устройство";
      toast({
        title: "Ошибка удаления",
        description: errorMessage,
        variant: "destructive",
      });
    },
  });
};

export const usePayDevice = () => {
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({ deviceId, months }: { deviceId: number; months: number }) =>
      apiClient.payDevice(deviceId, months),
    onSuccess: (data) => {
      // Redirect to payment page
      window.open(data.payment_url, '_blank');
      toast({
        title: "Переход к оплате",
        description: "Открывается страница оплаты в новом окне",
      });
    },
    onError: (error: Error | unknown) => {
      const errorMessage = error instanceof Error ? error.message : "Не удалось создать платеж";
      toast({
        title: "Ошибка создания платежа",
        description: errorMessage,
        variant: "destructive",
      });
    },
  });
};
