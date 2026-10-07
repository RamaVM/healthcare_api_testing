export const patientTestData = {
  existingPatientId: '1000',
  nonExistingPatientId: '999999',
  existingPatientName: 'ram',
  nonExistingPatientName: 'rakdhnlf',
  gender: 'male',
  unsupportedParameter: 'age',
  unsupportedParameterValue: '50',
};

export const practitionerTestData = {
  existingPractitionerId: '14927',
  nonExistingPractitionerId: '999999',
  existingPractitionerName: 'Mira',
  nonExistingPractitionerName: 'xyznonexistent',
  unsupportedParameter: 'age',
  unsupportedParameterValue: '50',
};

export const organizationTestData = {
  existingOrganizationId: '15856',
  nonExistingOrganizationId: '999999',
  existingOrganizationName: 'MercyCare Health Plan',
  nonExistingOrganizationName: 'xyznonexistent',
  unsupportedParameter: 'age',
  unsupportedParameterValue: '50',
};

export const encounterTestData = {
  existingEncounterId: '14391',
  nonExistingEncounterId: '999999',
  patientReference: 'Patient/14387',
  status: 'finished',
  unsupportedParameter: 'service-type',
  unsupportedParameterValue: 'Oncology',
};

export const observationTestData = {
  existingObservationId: 'nhanes-112200-777-3',
  nonExistingObservationId: 'nonexistent-observation-999999',
  code: '777-3',
  patientReference: 'Patient/nhanes-112200',
  unsupportedParameter: 'age',
  unsupportedParameterValue: '50',
  status: 'final',
  categoryCode: 'laboratory',
  value: 161.0,
  unit: '10*3/uL',
};

export const conditionTestData = {
  existingConditionId: 'cond-002',
  nonExistingConditionId: '999999',
  code: '38341003',
  patientId: 'pat-002',
  patientReference: 'Patient/pat-002',
  clinicalStatus: 'active',
  verificationStatus: 'confirmed',
  codeText: 'Hypertension',
  recordedDate: '2025-02-20',
  asserterReference: 'Practitioner/prac-001',
  unsupportedParameter: 'age',
  unsupportedParameterValue: '50',
};