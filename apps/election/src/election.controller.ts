import { Controller } from '@nestjs/common';
import { ElectionService } from './election.service';
import {
  CreateELectionResponse,
  CreateElectionRequest,
  DeleteElectionRequest,
  DeleteElectionResponse,
  ElectionServiceControllerMethods,
  GetAllElectionRequest,
  GetElectionByIdRequest,
  GetElectionByIdResponse,
  UpdateElectionRequest,
  UpdateElectionResponse,
} from '@app/common';

@Controller()
@ElectionServiceControllerMethods()
export class ElectionController {
  constructor(private readonly electionService: ElectionService) {}
  getAllElections(request: GetAllElectionRequest) {
    return this.electionService.getAllElections(request);
  }
  createElection(
    request: CreateElectionRequest,
  ): Promise<CreateELectionResponse> {
    return this.electionService.createElection(request);
  }

  getElectionById(
    request: GetElectionByIdRequest,
  ): Promise<GetElectionByIdResponse> {
    return this.electionService.getElectionById(request);
  }

  updateElection(
    request: UpdateElectionRequest,
  ): Promise<UpdateElectionResponse> {
    return this.electionService.updateElection(request);
  }

  deleteElection(
    request: DeleteElectionRequest,
  ): Promise<DeleteElectionResponse> {
    return this.electionService.deleteElection(request);
  }
}
