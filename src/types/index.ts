

// Decoded JWT Token Type
export type TJwtDecoded = {
  email: string;
  exp: number;
  iat: number;
  role: string;
}

// Generic API Response Type
export interface ApiResponse<T> {
  success: boolean;
  data: T;
}

// Follower Type - Represents a full user object for followers
export interface FollowerType {
  _id: string;
  image: string;
  email: string;
  name: string;
}

// User Type (TUser) - Main user profile type
export interface TUser {
  _id: string;
  email: string;
  name: string;
  role: string;
  image: string;
  followers?: FollowerType[]; // Now references FollowerType array
  following?: FollowerType[]; // Following can also reference FollowerType array
}
