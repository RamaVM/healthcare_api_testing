import { test, expect } from '../fixtures/api.fixture';
import { conditionTestData } from '../test-data/testData';
import {
  expectSearchBundle,
  expectSearchResults,
  expectOperationOutcome,
} from '../utils/assertions';


test('Retrieve existing Condition by ID - TC_CONDITION_001', async ({ conditionApi }) => {
  const response = await conditionApi.getCondition(
    conditionTestData.existingConditionId
  );

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body.resourceType).toBe('Condition');
  expect(body.id).toBe(
    conditionTestData.existingConditionId
  );
});


test('Retrieve non-existing Condition by ID - TC_CONDITION_002', async ({ conditionApi }) => {
  const response = await conditionApi.getCondition(
    conditionTestData.nonExistingConditionId
  );

  expect(response.status()).toBe(404);
});


test('Search Condition by code - TC_CONDITION_003', async ({ conditionApi }) => {
  const response = await conditionApi.searchByCode(
    conditionTestData.code
  );

  expect(response.status()).toBe(200);

  const body = await response.json();

  expectSearchResults(body);

  for (const entry of body.entry) {
    expect(entry.resource.resourceType).toBe('Condition');
    expect(entry.resource.code.coding[0].code).toBe(
      conditionTestData.code
    );
  }
});


test('Search Condition by patient - TC_CONDITION_004', async ({ conditionApi }) => {
  const response = await conditionApi.searchByPatient(
    conditionTestData.patientId
  );

  expect(response.status()).toBe(200);

  const body = await response.json();

  expectSearchResults(body);

  for (const entry of body.entry) {
    expect(entry.resource.resourceType).toBe('Condition');
    expect(entry.resource.subject.reference).toBe(
      conditionTestData.patientReference
    );
  }
});


test('Search Condition using unsupported parameter - TC_CONDITION_005', async ({ conditionApi }) => {
  const response = await conditionApi.searchWithParameter(
    conditionTestData.unsupportedParameter,
    conditionTestData.unsupportedParameterValue
  );

  expect(response.status()).toBe(400);

  const body = await response.json();

  expectOperationOutcome(body);
});


test('Validate Condition response data - TC_CONDITION_006', async ({ conditionApi }) => {
  const response = await conditionApi.getCondition(
    conditionTestData.existingConditionId
  );

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body.resourceType).toBe('Condition');
  expect(body.id).toBe(
    conditionTestData.existingConditionId
  );
  expect(body.clinicalStatus.coding[0].code).toBe(
    conditionTestData.clinicalStatus
  );
  expect(body.verificationStatus.coding[0].code).toBe(
    conditionTestData.verificationStatus
  );
  expect(body.code.coding[0].code).toBe(
    conditionTestData.code
  );
  expect(body.code.text).toBe(
    conditionTestData.codeText
  );
  expect(body.subject.reference).toBe(
    conditionTestData.patientReference
  );
  expect(body.recordedDate).toBe(
    conditionTestData.recordedDate
  );
  expect(body.asserter.reference).toBe(
    conditionTestData.asserterReference
  );
});