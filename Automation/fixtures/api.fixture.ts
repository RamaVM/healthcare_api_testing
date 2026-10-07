import { test as base } from '@playwright/test';

import { PatientApi } from '../api/PatientApi';
import { PractitionerApi } from '../api/PractitionerApi';
import { OrganizationApi } from '../api/OrganizationApi';
import { EncounterApi } from '../api/EncounterApi';
import { ObservationApi } from '../api/ObservationApi';
import { ConditionApi } from '../api/ConditionApi';

type ApiFixtures = {
  patientApi: PatientApi;
  practitionerApi: PractitionerApi;
  organizationApi: OrganizationApi;
  encounterApi: EncounterApi;
  observationApi: ObservationApi;
  conditionApi: ConditionApi;
};

export const test = base.extend<ApiFixtures>({
  patientApi: async ({ request }, use) => {
    await use(new PatientApi(request));
  },

  practitionerApi: async ({ request }, use) => {
    await use(new PractitionerApi(request));
  },

  organizationApi: async ({ request }, use) => {
    await use(new OrganizationApi(request));
  },

  encounterApi: async ({ request }, use) => {
    await use(new EncounterApi(request));
  },

  observationApi: async ({ request }, use) => {
    await use(new ObservationApi(request));
  },

  conditionApi: async ({ request }, use) => {
    await use(new ConditionApi(request));
  },
});

export { expect } from '@playwright/test';