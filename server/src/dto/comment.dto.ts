import { IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsString, Length } from 'class-validator'

export class GetCommentListDto {
  @IsNumberString()
  	couponId: number
}

export class PublishCommentDto {
  @IsNumber()
  	userId?: number

  @IsNumber()
  @IsNotEmpty()
  	commentStar: number

  @IsString()
  @IsNotEmpty()
  @Length(10, 100)
  	commentContent: string

  @IsNumber()
  @IsNotEmpty()
  	couponId: number

  @IsString()
  @Length(11, 11)
  @IsOptional()
  	commentUserPhone?: string

  @IsNumber()
  @Length(13, 13)
  @IsOptional()
  	commentTime?: number
}