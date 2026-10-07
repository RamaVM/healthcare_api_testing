import { APIRequestContext, APIResponse } from '@playwright/test';

export class ConditionApi {
  constructor(private request: APIRequestContext) {}

  async getCondition(id: string): Promise<APIResponse> {
    return await this.request.get(`Condition/${id}`);
  }

  async searchByCode(code: string): Promise<APIResponse> {
    return await this.request.get(`Condition?code=${code}`);
  }

  async searchByPatient(patientId: string): Promise<APIResponse> {
    return await this.request.get(`Condition?patient=${patientId}`);
  }

  async searchWithParameter(
    parameter: string,
    value: string
  ): Promise<APIResponse> {
    return await this.request.get(
      `Condition?${parameter}=${value}`
    );
  }
}