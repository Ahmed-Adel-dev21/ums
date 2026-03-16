import { jwtDecode } from "jwt-decode";
import {  createContext, useEffect, useState, type ReactNode } from "react";

interface User{
    id: number;
    image: string;
    firstName: string;
    lastName: string;
    age: number;
    email: string;
    phone: string;
    birthDate: string;
    role: string;
}

interface AuthContextType{
    userData:User | null;
    saveUserData:()=>void;
}
export const AuthContext =  createContext<AuthContextType | null>(null)

export interface AuthContextProviderProps{
    children:ReactNode;
}
export default function AuthContextProvider({children}: AuthContextProviderProps){

     const [userData, setuserData] = useState<User|null>(null);

    const saveUserData=()=>{
        const encodedToken=localStorage.getItem('userToken')
        if(encodedToken){
            const decodeToken=jwtDecode<User>(encodedToken);
            setuserData(decodeToken);            
        }
    }

    // refresh 
    useEffect(() => {
        if(localStorage.getItem('userToken')){
            saveUserData();   
        }
    }, []);
    return(
        <AuthContext.Provider value={{userData,saveUserData}}>{children}</AuthContext.Provider>
    )
}

// ------------------------- context get api





