import { APIRequestContext, APIResponse } from '@playwright/test';

export class PatientApi {
  constructor(private request: APIRequestContext) {}

  async getPatient(id: string): Promise<APIResponse> {
    return await this.request.get(`Patient/${id}`);
  }

  async searchByName(name: string): Promise<APIResponse> {
    return await this.request.get(`Patient?name=${name}`);
  }

  async searchByGender(gender: string): Promise<APIResponse> {
    return await this.request.get(`Patient?gender=${gender}`);
  }

  async searchWithParameter(parameter: string, value: string): Promise<APIResponse> {
    return await this.request.get(`Patient?${parameter}=${value}`);
  }
}