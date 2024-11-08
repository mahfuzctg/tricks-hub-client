

export type TJwtDecoded = {
  email : string;
  exp : number;
  iat : number;
  role : string;
}


// Generic API Response Type
export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
}

// User Type (TUser)
export interface TUser {
  _id: string;
  email: string;
  name: string;
  role: string;
  image: string;
  followers?: string[];
}
