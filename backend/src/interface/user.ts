export interface User{
    user_id:string;
    name:string;
    email:string;
    phone_number:string;
    password:string;

}
export interface loginUserDetails{
    user_id: string,
    name: string,
    email: string,
    isWelcomed: boolean,
}