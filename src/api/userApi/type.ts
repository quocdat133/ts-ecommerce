export interface userInfo {
  id: string;
  email: string;
  name: string;
  address: string;
  avatar?: string;
  role: string;
}

export interface loginData {
  email: string;
  password: string;
}

export interface UserDataType {
  key: string;
  name: string;
  email: string;
  address: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: userInfo;
}
