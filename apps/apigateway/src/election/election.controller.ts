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
import { CurrentUser } from '../auth/decorator';
import { VoteCandidateDto } from './dto/vote-candidate.dto';

@Controller('election')
@UseInterceptors(GrpcToHttpInterceptor)
export class ElectionController {
  constructor(private readonly electionService: ElectionService) { }

  @UseGuards(JwtGuard)
  @Post('vote')
  voteCandidate(@Body() request: VoteCandidateDto, @CurrentUser() user: any) {
    return this.electionService.voteCandidate(request, user.id);
  }


  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Get('vote/:voteId')
  getVote(@Param('voteId') id: string) {
    return this.electionService.getVote(id)
  }


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
