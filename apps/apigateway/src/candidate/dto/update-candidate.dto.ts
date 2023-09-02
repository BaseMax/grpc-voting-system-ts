import { UpdateCandidateRequest } from '@app/common';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateCandidateDto implements Omit<UpdateCandidateRequest, 'id'> {
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

  @IsNotEmpty({ each: true })
  @IsString({ each: true })
  @IsOptional()
  socialMedia: string[];
}
