export interface users{
    user_id: string,
    name: string,
    image: string
    email: string,
    phone_number: string,
    password: string,
}

export interface loginDetails{email:string;
    password:string}
  
    export interface ViewUsers {
        user_id:string;
        name: string;
        email: string;
      }
export interface updatedUser{
    name:string, 
    image:string
    email:string, 
    password:string, 
    phone_number:string, 
}

export interface signUpDetails{
    name: string,
    image:string,
    email: string,
    phone_number:string,
    password: string
}
