import { APIRequestContext, APIResponse } from '@playwright/test';

export class EncounterApi {
  constructor(private request: APIRequestContext) {}

  async getEncounter(id: string): Promise<APIResponse> {
    return await this.request.get(`Encounter/${id}`);
  }

  async searchByPatient(patientReference: string): Promise<APIResponse> {
    return await this.request.get(
      `Encounter?subject=${patientReference}`
    );
  }

  async searchByStatus(status: string): Promise<APIResponse> {
    return await this.request.get(
      `Encounter?status=${status}`
    );
  }

  async searchWithParameter(
    parameter: string,
    value: string
  ): Promise<APIResponse> {
    return await this.request.get(
      `Encounter?${parameter}=${value}`
    );
  }
}