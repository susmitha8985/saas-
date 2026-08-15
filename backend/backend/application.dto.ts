import { IsString, IsNotEmpty } from 'class-validator';

export class CreateApplicationDto {
  // Student bas Job ki ID bhejega jisme use apply karna hai
  @IsNotEmpty()
  @IsString()
  jobId: string;
}
