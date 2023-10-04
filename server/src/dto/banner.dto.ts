import { IsNumberString, IsOptional } from 'class-validator'

export class FindBannerDto {
  @IsNumberString()
  @IsOptional()
  	id?: number

  @IsNumberString()
  @IsOptional()
  	bannerBelongRegion?: number
}
