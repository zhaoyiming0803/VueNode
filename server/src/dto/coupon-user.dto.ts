import { IsNumberString, IsNotEmpty } from 'class-validator'

export class FindCouponUserByIdDto {
  @IsNumberString()
  @IsNotEmpty()
  	couponId: number

  @IsNumberString()
  @IsNotEmpty()
  	userId: number
}

export class AddCouponUserDto {
  @IsNumberString()
  @IsNotEmpty()
  	couponId: number

  @IsNumberString()
  @IsNotEmpty()
  	userId: number
}
