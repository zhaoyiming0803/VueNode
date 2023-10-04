import { IsNotEmpty, IsNumber, IsNumberString, IsString } from 'class-validator'

export class GetCouponListDto {
  @IsNumberString()
  	regionId: number

  @IsNumberString()
  	classifyId: number

  @IsNumberString()
  	page: number
}

export class GetCouponDetailDto {
  @IsNumberString()
  	id: number
}

export class ReceiveCouponDto {
  @IsNumber()
  @IsNotEmpty()
  	couponId: number

  @IsNumber()
  @IsNotEmpty()
  	userId: number
}

export class UpdateReceivedNumDto {
  @IsNumber()
  @IsNotEmpty()
  	couponId: number
}

export class GetCouponRecordByUserDto {
  @IsNumberString()
  @IsNotEmpty()
  	userId: number
}

export class GetReceivedCouponListDto {
  @IsNumberString()
  @IsNotEmpty()
  	userId: number

  @IsString()
  @IsNotEmpty()
  	type: string
}