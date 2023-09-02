import {
  CreateELectionResponse,
  CreateElectionRequest,
  DeleteElectionRequest,
  DeleteElectionResponse,
  GetAllElectionRequest,
  GetElectionByIdRequest,
  GetElectionByIdResponse,
  UpdateElectionRequest,
  UpdateElectionResponse,
} from '@app/common';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Election } from './election.model';
import { Model } from 'mongoose';
import {
  GrpcAlreadyExistsException,
  GrpcNotFoundException,
} from 'nestjs-grpc-exceptions';

@Injectable()
export class ElectionService {
  constructor(
    @InjectModel(Election.name) private electionModel: Model<Election>,
  ) {}

  async createElection(
    request: CreateElectionRequest,
  ): Promise<CreateELectionResponse> {
    const existElection = await this.electionModel.findOne({
      title: request.title,
    });

    if (existElection)
      throw new GrpcAlreadyExistsException(
        'election with this title already exists',
      );

    const election = await this.electionModel.create(request);
    return { election: election.toJSON() };
  }

  async getElectionById(
    request: GetElectionByIdRequest,
  ): Promise<GetElectionByIdResponse> {
    const election = await this.electionModel.findById(request.id);
    if (!election)
      return {
        election: null,
      };

    return { election: election.toJSON() };
  }

  async deleteElection(
    request: DeleteElectionRequest,
  ): Promise<DeleteElectionResponse> {
    const election = await this.electionModel.deleteOne({ _id: request.id });
    return {
      deletedCount: election.deletedCount,
    };
  }

  async updateElection(
    request: UpdateElectionRequest,
  ): Promise<UpdateElectionResponse> {
    const existElection = await this.electionModel.findById(request.id);

    if (!existElection) throw new GrpcNotFoundException('election not found');

    const election = await this.electionModel.findOneAndUpdate(
      { _id: request.id },
      request,
      { new: true },
    );
    return { election: election.toJSON() };
  }

  async getAllElections(request: GetAllElectionRequest) {
    const elections = await this.electionModel.find(
      request,
      {},
      { lean: true },
    );
    return { elections };
  }
}
