import { APIRequestContext, APIResponse } from '@playwright/test';

export class PractitionerApi {
  constructor(private request: APIRequestContext) {}

  async getPractitioner(id: string): Promise<APIResponse> {
    return await this.request.get(`Practitioner/${id}`);
  }

  async searchByName(name: string): Promise<APIResponse> {
    return await this.request.get(`Practitioner?name=${name}`);
  }

  async searchWithParameter(parameter: string, value: string): Promise<APIResponse> {
    return await this.request.get(`Practitioner?${parameter}=${value}`);
  }
}