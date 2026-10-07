import { test, expect } from '../fixtures/api.fixture';
import { observationTestData } from '../test-data/testData';
import {
  expectSearchBundle,
  expectSearchResults,
  expectOperationOutcome,
} from '../utils/assertions';


test('Retrieve existing Observation by ID - TC_OBSERVATION_001', async ({ observationApi }) => {
  const response = await observationApi.getObservation(
    observationTestData.existingObservationId
  );

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body.resourceType).toBe('Observation');
  expect(body.id).toBe(
    observationTestData.existingObservationId
  );
});


test('Retrieve non-existing Observation by ID - TC_OBSERVATION_002', async ({ observationApi }) => {
  const response = await observationApi.getObservation(
    observationTestData.nonExistingObservationId
  );

  expect(response.status()).toBe(404);
});


test('Search Observation by code - TC_OBSERVATION_003', async ({ observationApi }) => {
  const response = await observationApi.searchByCode(
    observationTestData.code
  );

  expect(response.status()).toBe(200);

  const body = await response.json();

  expectSearchResults(body);

  for (const entry of body.entry) {
    expect(entry.resource.resourceType).toBe('Observation');
    expect(entry.resource.code.coding[0].code).toBe(
      observationTestData.code
    );
  }
});


test('Search Observation by patient - TC_OBSERVATION_004', async ({ observationApi }) => {
  const response = await observationApi.searchByPatient(
    observationTestData.patientReference
  );

  expect(response.status()).toBe(200);

  const body = await response.json();

  expectSearchResults(body);

  for (const entry of body.entry) {
    expect(entry.resource.resourceType).toBe('Observation');
    expect(entry.resource.subject.reference).toBe(
      observationTestData.patientReference
    );
  }
});


test('Search Observation using unsupported parameter - TC_OBSERVATION_005', async ({ observationApi }) => {
  const response = await observationApi.searchWithParameter(
    observationTestData.unsupportedParameter,
    observationTestData.unsupportedParameterValue
  );

  expect(response.status()).toBe(400);

  const body = await response.json();

  expectOperationOutcome(body);
});


test('Validate Observation response data - TC_OBSERVATION_006', async ({ observationApi }) => {
  const response = await observationApi.getObservation(
    observationTestData.existingObservationId
  );

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body.resourceType).toBe('Observation');
  expect(body.id).toBe(
    observationTestData.existingObservationId
  );
  expect(body.status).toBe(
    observationTestData.status
  );
  expect(body.category[0].coding[0].code).toBe(
    observationTestData.categoryCode
  );
  expect(body.code.coding[0].code).toBe(
    observationTestData.code
  );
  expect(body.subject.reference).toBe(
    observationTestData.patientReference
  );
  expect(body.valueQuantity.value).toBe(
    observationTestData.value
  );
  expect(body.valueQuantity.unit).toBe(
    observationTestData.unit
  );
});