import {UserRole} from './UserRole';

export class User {
    name: any
    role!: number;
    accessToken?: string;
    lang!: string 
    // websocket: any;
    maskedPhone: any;
    roleId!: number  // for personal/organization wallet
    orgType!: number; //1 = temples,2=ngo
    customerId!:string ;
  token: any;
    
}
