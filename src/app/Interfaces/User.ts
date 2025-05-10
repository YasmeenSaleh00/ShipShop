export interface User {
    id: number;
    firstName: string;
    lastName:string
    email: string;
    roleName: string;
    roleId:number,
    password: string;
    confirmPassword: string;
    createdOn: string;
    updatedOn: string | null;
    isActive: boolean;
  }
  


