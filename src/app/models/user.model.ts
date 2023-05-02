
import {Role} from './index'

export class User {
    _id?: string;
    password?: string;
    firstName: string;
    lastName: string;
    phone:string;
    email:string;
    roles:  any[];
    token?: string;
    status:number;
}