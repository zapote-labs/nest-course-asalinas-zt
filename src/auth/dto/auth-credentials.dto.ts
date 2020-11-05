import { IsString, MaxLength, Min, MinLength, Matches } from 'class-validator';

export class AuthCredentialsDto {
	@IsString()
	@MaxLength(20)
	@MinLength(4)
	username: string;

	@IsString()
	@MaxLength(20)
	@MinLength(8)
	@Matches(
		/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, 
		{ message: 'password to weak'},
	)
	password: string;
}