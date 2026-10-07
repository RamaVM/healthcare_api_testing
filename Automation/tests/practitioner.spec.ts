import { test, expect } from '../fixtures/api.fixture';
import { practitionerTestData } from '../test-data/testData';
import {
  expectSearchBundle,
  expectSearchResults,
  expectOperationOutcome,
} from '../utils/assertions';


test('Retrieve existing Practitioner by ID - TC_PRACTITIONER_001', async ({ practitionerApi }) => {
  const response = await practitionerApi.getPractitioner(
    practitionerTestData.existingPractitionerId
  );

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body.resourceType).toBe('Practitioner');
  expect(body.id).toBe(
    practitionerTestData.existingPractitionerId
  );
});


test('Retrieve non-existing Practitioner by ID - TC_PRACTITIONER_002', async ({ practitionerApi }) => {
  const response = await practitionerApi.getPractitioner(
    practitionerTestData.nonExistingPractitionerId
  );

  expect(response.status()).toBe(404);
});


test('Search Practitioner by existing name - TC_PRACTITIONER_003', async ({ practitionerApi }) => {
  const response = await practitionerApi.searchByName(
    practitionerTestData.existingPractitionerName
  );

  expect(response.status()).toBe(200);

  const body = await response.json();

  expectSearchResults(body);

  for (const entry of body.entry) {
    expect(entry.resource.resourceType).toBe('Practitioner');
    expect(entry.resource.name).toBeDefined();
  }
});


test('Search Practitioner by non-existing name - TC_PRACTITIONER_004', async ({ practitionerApi }) => {
  const response = await practitionerApi.searchByName(
    practitionerTestData.nonExistingPractitionerName
  );

  expect(response.status()).toBe(200);

  const body = await response.json();

  expectSearchBundle(body);
  expect(body.total).toBe(0);
});


test('Search Practitioner using unsupported parameter - TC_PRACTITIONER_005', async ({ practitionerApi }) => {
  const response = await practitionerApi.searchWithParameter(
    practitionerTestData.unsupportedParameter,
    practitionerTestData.unsupportedParameterValue
  );

  expect(response.status()).toBe(400);

  const body = await response.json();

  expectOperationOutcome(body);
});


test('Validate Practitioner response data - TC_PRACTITIONER_006', async ({ practitionerApi }) => {
  const response = await practitionerApi.getPractitioner(
    practitionerTestData.existingPractitionerId
  );

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body.resourceType).toBe('Practitioner');
  expect(body.id).toBe(
    practitionerTestData.existingPractitionerId
  );
  expect(body.active).toBe(true);
  expect(body.name).toBeDefined();
  expect(body.name[0].family).toBe('Chen');
  expect(body.name[0].given[0]).toBe('Mira');
  expect(body.qualification).toBeDefined();
  expect(body.qualification[0].code.coding[0].code).toBe('physician');
  expect(body.qualification[0].code.text).toBe(
    'Primary care physician'
  );
});