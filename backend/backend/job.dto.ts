import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateJobDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  company: string;

  @IsOptional()
  @IsString()
  location?: string;
}
