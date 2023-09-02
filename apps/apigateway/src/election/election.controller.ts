import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  Delete,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { ElectionService } from './election.service';
import { CreateElectionDto } from './dto/create-election.dto';
import { UpdateElectionDto } from './dto/update-election.dto';
import { GrpcToHttpInterceptor } from 'nestjs-grpc-exceptions';
import { JwtGuard, Roles, RolesGuard } from '../auth/guard';
import { Role } from '@app/common';

@Controller('election')
@UseInterceptors(GrpcToHttpInterceptor)
export class ElectionController {
  constructor(private readonly electionService: ElectionService) {}

  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Post()
  create(@Body() createElectionDto: CreateElectionDto) {
    return this.electionService.create(createElectionDto);
  }

  @Get()
  findAll() {
    return this.electionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.electionService.findOne(id);
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateElectionDto: UpdateElectionDto,
  ) {
    return this.electionService.update(id, updateElectionDto);
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.electionService.remove(id);
  }
}
