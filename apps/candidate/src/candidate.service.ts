import {
  AddCandidateRequest,
  AddCandidateResponse,
  GetAllCandidateRequest,
  GetOneCandidateRequest,
  GetOneCandidateResponse,
  UpdateCandidateRequest,
  UpdateCandidateResponse,
} from '@app/common';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Candidate as CandidateModel } from './candidate.model';
import { Model } from 'mongoose';
import {
  GrpcAlreadyExistsException,
  GrpcNotFoundException,
} from 'nestjs-grpc-exceptions';

@Injectable()
export class CandidateService {
  constructor(
    @InjectModel(CandidateModel.name)
    private candidateModel: Model<CandidateModel>,
  ) { }

  async addCandidate(
    request: AddCandidateRequest,
  ): Promise<AddCandidateResponse> {
    const existCandidates = await this.candidateModel.findOne({
      name: request.name,
    });

    if (existCandidates)
      throw new GrpcAlreadyExistsException(
        'a candidate already exists with this name',
      );
    const candidate = await this.candidateModel.create(request);
    return { candidate: candidate.toJSON() };
  }

  async updateCandidate(
    request: UpdateCandidateRequest,
  ): Promise<UpdateCandidateResponse> {
    const existCandidate = await this.candidateModel.findById(request.id);
    if (!existCandidate) throw new GrpcNotFoundException('candidate not found');
    const candidate = await this.candidateModel.findOneAndUpdate(
      { _id: request.id },
      request,
      { new: true },
    );
    return { candidate: candidate.toJSON() };
  }

  async getOneCandidate(
    request: GetOneCandidateRequest,
  ): Promise<GetOneCandidateResponse> {
    const candidate = await this.candidateModel.findById(request.id);
    if (!candidate) throw new GrpcNotFoundException('candidate not found');
    return { candidate: candidate.toJSON() };
  }

  async getAllCandidates(request: GetAllCandidateRequest) {
    const candidates = await this.candidateModel.find(
      request,
      {},
      { lean: true },
    );

    return { candidates };
  }
}
