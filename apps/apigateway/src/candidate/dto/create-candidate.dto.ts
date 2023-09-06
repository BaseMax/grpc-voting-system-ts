import { AddCandidateRequest } from '@app/common';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateCandidateDto
  implements Omit<AddCandidateRequest, 'socialMedia'>
{
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  age: number;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  education?: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  website?: string;
}
