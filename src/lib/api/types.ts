// API Types based on Swagger schema

export interface LoginRequest {
  email: string;
  pass: string;
  otp?: string;
}

export interface LoginResponse {
  token: string;
  user: UserInfo;
  expires_at: string;
}

export interface RegisterRequest {
  email: string;
  pass: string;
}

export interface RegisterResponse {
  user: UserInfo;
  mfa_secret: string;
  qr_url: string;
}

export interface UserInfo {
  id: number;
  email: string;
  telegram_id?: number;
  telegram_username?: string;
  ip_address?: string;
  created_at: string;
}

export interface DeviceInfo {
  id: number;
  name: string;
  status: 'active' | 'pending_delete' | 'deactivated' | 'deleted';
  access_url: string;
  created_at: string;
  scheduled_delete_at?: string;
  subscription: SubscriptionInfo;
}

export interface SubscriptionInfo {
  id: number;
  expires_at: string;
  status: 'active' | 'expired' | 'canceled';
}

export interface AddDeviceResponse {
  device: DeviceInfo;
  subscription: SubscriptionInfo;
}

export interface PaymentRequest {
  device_id: number;
  months: number;
}

export interface PaymentResponse {
  payment_url: string;
}

export interface ErrorResponse {
  error: string;
  code: string;
  details?: string;
}

export interface DevicesResponse {
  devices: DeviceInfo[];
}

// Legacy types for backward compatibility
export interface Device {
  id: string;
  name: string;
  type: 'mobile' | 'desktop' | 'tablet';
  status: 'active' | 'deactivated';
  token: string;
  lastConnected: Date;
}
