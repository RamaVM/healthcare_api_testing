import { APIRequestContext, APIResponse } from '@playwright/test';

export class OrganizationApi {
  constructor(private request: APIRequestContext) {}

  async getOrganization(id: string): Promise<APIResponse> {
    return await this.request.get(`Organization/${id}`);
  }

  async searchByName(name: string): Promise<APIResponse> {
    return await this.request.get(`Organization?name=${name}`);
  }

  async searchWithParameter(parameter: string, value: string): Promise<APIResponse> {
    return await this.request.get(`Organization?${parameter}=${value}`);
  }
}