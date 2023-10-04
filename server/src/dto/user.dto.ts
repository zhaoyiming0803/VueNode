import { IsNumber, IsNumberString, IsString, Length, Max, MaxLength } from 'class-validator'

export class LoginFormDto {
  @IsString()
  @Length(11)
  	phone: string

  @IsString()
  	pwd: string
}

export class FindUserByPhoneDto {
  @IsString()
  @Length(11, 11)
  	phone: string
}

export class RegistFormDto {
  @IsString()
  @Length(11, 11)
  	phone: string

  @IsString()
  @Length(6)
  	pwd: string
}

export class GetPhoneCodeDto {
  @IsString()
  @Length(11, 11)
  	phone: string
}

export class ResetPasswordDto {
  @IsString()
  @Length(11, 11)
  	phone: string

  @IsString()
  @Length(6, 6)
  	phoneCode: string

  @IsString()
  	pwd: string
}

export class GetUserInfoDto {
  @IsNumberString()
  	id: number
}

export class ChangeUserNameDto {
  @IsNumberString()
  	userId: number

  @MaxLength(60)
  	userName: string
}

export class ChangeUserSexDto {
  @IsNumberString()
  	userId: number

  @IsNumber()
  @Max(1)
  	sex: number
}
