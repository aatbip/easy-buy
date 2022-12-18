export interface IHamburgerProps {
  role?: string;
  isLoggedIn: boolean;
}


export interface IFormData {
  name?: string;
  email: string;
  password: string;
  shopName?:string; 
}

export interface IHamburgerItems {
  name: string; 
  path: string; 
}