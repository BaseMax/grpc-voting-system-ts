import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CandidateModule } from './candidate/candidate.module';
import { ElectionModule } from './election/election.module';

@Module({
  imports: [AuthModule, CandidateModule, ElectionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
