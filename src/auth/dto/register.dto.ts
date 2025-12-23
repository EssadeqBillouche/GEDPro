import { IsEmail, IsNotEmpty, IsStrongPassword } from "class-validator"



export class RegisterDto {

    @IsEmail()
    readonly email : string;

     @IsStrongPassword()
     readonly password : string;

     @IsNotEmpty()
     readonly firstName : string;

     @IsNotEmpty()
    readonly lastname : string;

}