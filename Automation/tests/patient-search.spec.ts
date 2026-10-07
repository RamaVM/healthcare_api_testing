import { test, expect } from '../fixtures/api.fixture';
import { patientTestData } from '../test-data/testData';
import {
  expectSearchBundle,
  expectSearchResults,
  expectOperationOutcome,
} from '../utils/assertions';


test('Search patient by name - TC_PATIENT_001', async ({ patientApi }) => {
  const response = await patientApi.searchByName(
    patientTestData.existingPatientName
  );

  expect(response.status()).toBe(200);

  const body = await response.json();

  expectSearchResults(body);
  expect(body.total).toBeGreaterThan(0);
});


test('Search patient by non-existing name - TC_PATIENT_002', async ({ patientApi }) => {
  const response = await patientApi.searchByName(
    patientTestData.nonExistingPatientName
  );

  expect(response.status()).toBe(200);

  const body = await response.json();

  expectSearchBundle(body);
  expect(body.total).toBe(0);
});


test('Validate patient search response structure - TC_PATIENT_003', async ({ patientApi }) => {
  const response = await patientApi.searchByName(
    patientTestData.existingPatientName
  );

  expect(response.status()).toBe(200);

  const body = await response.json();

  expectSearchResults(body);
  expect(body.total).toBeGreaterThan(0);
});


test('Retrieve existing patient by ID - TC_PATIENT_004', async ({ patientApi }) => {
  const response = await patientApi.getPatient(
    patientTestData.existingPatientId
  );

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body.resourceType).toBe('Patient');
  expect(body.id).toBe(patientTestData.existingPatientId);
});


test('Retrieve non-existing patient by ID - TC_PATIENT_005', async ({ patientApi }) => {
  const response = await patientApi.getPatient(
    patientTestData.nonExistingPatientId
  );

  expect(response.status()).toBe(404);
});


test('Validate patient data returned from name search - TC_PATIENT_006', async ({ patientApi }) => {
  const response = await patientApi.searchByName(
    patientTestData.existingPatientName
  );

  expect(response.status()).toBe(200);

  const body = await response.json();

  expectSearchResults(body);

  for (const entry of body.entry) {
    expect(entry.resource.resourceType).toBe('Patient');
    expect(entry.resource.id).toBeDefined();
    expect(entry.resource.name).toBeDefined();
  }
});


test('Search patients by gender - TC_PATIENT_007', async ({ patientApi }) => {
  const response = await patientApi.searchByGender(
    patientTestData.gender
  );

  expect(response.status()).toBe(200);

  const body = await response.json();

  expectSearchResults(body);

  for (const entry of body.entry) {
    expect(entry.resource.resourceType).toBe('Patient');
    expect(entry.resource.gender).toBe(
      patientTestData.gender
    );
  }
});


test('Search patient using unsupported parameter - TC_PATIENT_008', async ({ patientApi }) => {
  const response = await patientApi.searchWithParameter(
    patientTestData.unsupportedParameter,
    patientTestData.unsupportedParameterValue
  );

  expect(response.status()).toBe(400);

  const body = await response.json();

  expectOperationOutcome(body);
});