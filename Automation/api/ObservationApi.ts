import { APIRequestContext, APIResponse } from '@playwright/test';

export class ObservationApi {
  constructor(private request: APIRequestContext) {}

  async getObservation(id: string): Promise<APIResponse> {
    return await this.request.get(`Observation/${id}`);
  }

  async searchByCode(code: string): Promise<APIResponse> {
    return await this.request.get(`Observation?code=${code}`);
  }

  async searchByPatient(patientReference: string): Promise<APIResponse> {
    return await this.request.get(
      `Observation?subject=${patientReference}`
    );
  }

  async searchWithParameter(
    parameter: string,
    value: string
  ): Promise<APIResponse> {
    return await this.request.get(
      `Observation?${parameter}=${value}`
    );
  }
}