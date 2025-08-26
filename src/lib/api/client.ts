import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  UserInfo,
  DeviceInfo,
  DevicesResponse,
  AddDeviceResponse,
  PaymentRequest,
  PaymentResponse,
  ErrorResponse
} from './types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

class ApiError extends Error {
  constructor(
    message: string,
    public code: string,
    public status: number,
    public details?: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

class ApiClient {
  private baseUrl: string;
  private token: string | null = null;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
    this.token = localStorage.getItem('vpn_token');
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      let errorData: ErrorResponse;
      try {
        errorData = await response.json();
      } catch {
        errorData = {
          error: 'Network error',
          code: 'NETWORK_ERROR'
        };
      }

      throw new ApiError(
        errorData.error,
        errorData.code,
        response.status,
        errorData.details
      );
    }

    // Handle empty responses
    if (response.status === 204 || response.headers.get('content-length') === '0') {
      return {} as T;
    }

    return response.json();
  }

  // Authentication methods
  async login(data: LoginRequest): Promise<LoginResponse> {
    const response = await this.request<LoginResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    
    this.token = response.token;
    localStorage.setItem('vpn_token', response.token);
    return response;
  }

  async register(data: RegisterRequest): Promise<RegisterResponse> {
    return this.request<RegisterResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getUserProfile(): Promise<UserInfo> {
    return this.request<UserInfo>('/user/profile');
  }

  // Device methods
  async getDevices(): Promise<DevicesResponse> {
    return this.request<DevicesResponse>('/devices');
  }

  async addDevice(): Promise<AddDeviceResponse> {
    return this.request<AddDeviceResponse>('/devices', {
      method: 'POST',
    });
  }

  async getDevice(id: number): Promise<DeviceInfo> {
    return this.request<DeviceInfo>(`/devices/${id}`);
  }

  async deleteDevice(id: number): Promise<{ message: string }> {
    return this.request<{ message: string }>(`/devices/${id}`, {
      method: 'DELETE',
    });
  }

  async getDeviceKey(id: number): Promise<{ access_url: string }> {
    return this.request<{ access_url: string }>(`/devices/${id}/key`);
  }

  // Payment methods
  async payDevice(id: number, months: number): Promise<PaymentResponse> {
    const data: PaymentRequest = { device_id: id, months };
    return this.request<PaymentResponse>(`/devices/${id}/pay`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Utility methods
  setToken(token: string) {
    this.token = token;
    localStorage.setItem('vpn_token', token);
  }

  clearToken() {
    this.token = null;
    localStorage.removeItem('vpn_token');
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  getToken(): string | null {
    return this.token;
  }
}

// Create and export a singleton instance
export const apiClient = new ApiClient();

// Export the class for testing purposes
export { ApiClient, ApiError };
