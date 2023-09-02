import { CreateElectionRequest } from '@app/common';
import { IsString, IsNotEmpty, IsBoolean, IsDateString } from 'class-validator';

export class CreateElectionDto implements CreateElectionRequest {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsDateString()
  @IsNotEmpty()
  startDate: string;

  @IsDateString()
  @IsNotEmpty()
  endDate: string;

  @IsBoolean()
  isActive: boolean;
}
