import { UpdateElectionRequest } from '@app/common';
import { IsBoolean, IsDate, IsNotEmpty, IsString } from 'class-validator';

export class UpdateElectionDto implements Omit<UpdateElectionRequest, 'id'> {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsDate()
  @IsNotEmpty()
  startDate: string;

  @IsDate()
  @IsNotEmpty()
  endDate: string;

  @IsBoolean()
  isActive: boolean;
}
