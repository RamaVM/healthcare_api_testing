import { test, expect } from '../fixtures/api.fixture';
import { encounterTestData } from '../test-data/testData';
import {
  expectSearchBundle,
  expectSearchResults,
  expectOperationOutcome,
} from '../utils/assertions';


test('Retrieve existing Encounter by ID - TC_ENCOUNTER_001', async ({ encounterApi }) => {
  const response = await encounterApi.getEncounter(
    encounterTestData.existingEncounterId
  );

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body.resourceType).toBe('Encounter');
  expect(body.id).toBe(
    encounterTestData.existingEncounterId
  );
});


test('Retrieve non-existing Encounter by ID - TC_ENCOUNTER_002', async ({ encounterApi }) => {
  const response = await encounterApi.getEncounter(
    encounterTestData.nonExistingEncounterId
  );

  expect(response.status()).toBe(404);
});


test('Search Encounter by patient - TC_ENCOUNTER_003', async ({ encounterApi }) => {
  const response = await encounterApi.searchByPatient(
    encounterTestData.patientReference
  );

  expect(response.status()).toBe(200);

  const body = await response.json();

  expectSearchResults(body);

  for (const entry of body.entry) {
    expect(entry.resource.resourceType).toBe('Encounter');
    expect(entry.resource.subject.reference).toBe(
      encounterTestData.patientReference
    );
  }
});


test('Search Encounter by status - TC_ENCOUNTER_004', async ({ encounterApi }) => {
  const response = await encounterApi.searchByStatus(
    encounterTestData.status
  );

  expect(response.status()).toBe(200);

  const body = await response.json();

  expectSearchResults(body);

  for (const entry of body.entry) {
    expect(entry.resource.resourceType).toBe('Encounter');
    expect(entry.resource.status).toBe(
      encounterTestData.status
    );
  }
});


test('Search Encounter using unsupported parameter - TC_ENCOUNTER_005', async ({ encounterApi }) => {
  const response = await encounterApi.searchWithParameter(
    encounterTestData.unsupportedParameter,
    encounterTestData.unsupportedParameterValue
  );

  expect(response.status()).toBe(400);

  const body = await response.json();

  expectOperationOutcome(body);
});


test('Validate Encounter response data - TC_ENCOUNTER_006', async ({ encounterApi }) => {
  const response = await encounterApi.getEncounter(
    encounterTestData.existingEncounterId
  );

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body.resourceType).toBe('Encounter');
  expect(body.id).toBe(encounterTestData.existingEncounterId);
  expect(body.status).toBe(encounterTestData.status);
  expect(body.class.code).toBe('AMB');
  expect(body.serviceType.text).toBe('Oncology');
  expect(body.subject.reference).toBe(
    encounterTestData.patientReference
  );
});