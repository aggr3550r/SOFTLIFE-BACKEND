import { IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdatePostDTO {
  @IsString()
  @IsOptional()
  @MaxLength(200)
  title: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  content: string;
}
