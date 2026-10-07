HEALTHCARE API TESTING & AUTOMATION

A healthcare API testing project covering manual API testing and automated API testing using Postman, Playwright, and TypeScript.

The project tests a public FHIR R4 healthcare API and validates resource retrieval, search functionality, response structures, negative scenarios, and unsupported parameters.


PROJECT OVERVIEW

This project was created to demonstrate practical API testing and automation skills using a healthcare API.

The testing covers six FHIR resources:

- Patient
- Practitioner
- Organization
- Encounter
- Observation
- Condition

The project includes both manual API testing in Postman and automated API testing using Playwright with TypeScript.


TECH STACK

Postman
- Manual API testing

Playwright
- API automation

TypeScript
- Automation programming language

Node.js
- Runtime environment

Git & GitHub
- Version control

FHIR R4
- Healthcare API standard


API UNDER TEST

HAPI FHIR R4

Base URL:

https://hapi.fhir.org/baseR4

The API follows the FHIR (Fast Healthcare Interoperability Resources) standard for representing healthcare information.


RESOURCES TESTED

1. PATIENT

Test coverage includes:

- Search patient by name
- Search patient by non-existing name
- Validate search response structure
- Retrieve patient by ID
- Retrieve non-existing patient
- Validate patient response data
- Search patients by gender
- Unsupported search parameter

Total: 8 tests


2. PRACTITIONER

Test coverage includes:

- Retrieve practitioner by ID
- Retrieve non-existing practitioner
- Search practitioner by name
- Search using non-existing name
- Unsupported search parameter
- Validate practitioner response data

Total: 6 tests


3. ORGANIZATION

Test coverage includes:

- Retrieve organization by ID
- Retrieve non-existing organization
- Search organization by name
- Validate organization response data
- Search using non-existing name
- Unsupported search parameter

Total: 6 tests


4. ENCOUNTER

Test coverage includes:

- Retrieve encounter by ID
- Retrieve non-existing encounter
- Search encounter by patient
- Search encounter by status
- Unsupported search parameter
- Validate encounter response data

Total: 6 tests


5. OBSERVATION

Test coverage includes:

- Retrieve observation by ID
- Retrieve non-existing observation
- Search observation by code
- Search observation by patient
- Unsupported search parameter
- Validate observation response data

Total: 6 tests


6. CONDITION

Test coverage includes:

- Retrieve condition by ID
- Retrieve non-existing condition
- Search condition by code
- Search condition by patient
- Unsupported search parameter
- Validate condition response data

Total: 6 tests


TEST COVERAGE SUMMARY

Patient          8
Practitioner     6
Organization     6
Encounter        6
Observation      6
Condition        6

TOTAL            38


TESTING APPROACH

The project covers multiple API testing scenarios.


POSITIVE TESTING

Valid requests are used to verify successful API behavior.

Examples:

GET /Patient/1000
GET /Practitioner/14927
GET /Organization/15856

Expected response:

HTTP 200 OK


NEGATIVE TESTING

Invalid or non-existing resources are tested.

Example:

GET /Patient/999999

Expected response:

HTTP 404 Not Found


SEARCH TESTING

Search endpoints are tested using different parameters.

Examples:

Patient?name=ram
Patient?gender=male
Observation?code=777-3
Condition?patient=pat-002


RESPONSE VALIDATION

The automation validates:

- HTTP status codes
- FHIR resource type
- Resource IDs
- Search Bundle structure
- Search results
- Resource-specific fields
- OperationOutcome responses


UNSUPPORTED PARAMETER TESTING

Unsupported search parameters are also tested.

Example:

GET /Patient?age=50

Expected response:

HTTP 400 Bad Request

The response is also validated as a FHIR OperationOutcome.


AUTOMATION ARCHITECTURE

The automation framework follows an API Client / Service Object pattern.

Instead of putting API requests directly inside every test, API operations are separated into dedicated API client classes.

Architecture:

Test
  |
  v
Fixture
  |
  v
API Client
  |
  v
Playwright APIRequestContext
  |
  v
HAPI FHIR API


PROJECT STRUCTURE

HealthCare_API_testing/
|
├── Automation/
│   |
│   ├── api/
│   │   ├── PatientApi.ts
│   │   ├── PractitionerApi.ts
│   │   ├── OrganizationApi.ts
│   │   ├── EncounterApi.ts
│   │   ├── ObservationApi.ts
│   │   └── ConditionApi.ts
│   |
│   ├── fixtures/
│   │   └── api.fixture.ts
│   |
│   ├── test-data/
│   │   └── testData.ts
│   |
│   ├── tests/
│   │   ├── patient-search.spec.ts
│   │   ├── practitioner.spec.ts
│   │   ├── organization.spec.ts
│   │   ├── encounter.spec.ts
│   │   ├── observation.spec.ts
│   │   └── condition.spec.ts
│   |
│   ├── utils/
│   │   └── assertions.ts
│   |
│   └── playwright.config.ts
|
├── Defects/
|
├── Documentation/
|
├── Postman/
│   ├── collections/
│   └── environments/
|
├── Test_Cases/
|
└── README.md


REUSABLE ASSERTIONS

Common FHIR response validations are centralized in:

Automation/utils/assertions.ts

Reusable helpers include:

expectSearchBundle(body);
expectSearchResults(body);
expectOperationOutcome(body);

For example:

expectSearchResults(body);

validates that the response is a FHIR search Bundle containing results.

Resource-specific validations remain inside the individual tests.

This avoids unnecessary over-abstraction while keeping common validations reusable.


TEST DATA MANAGEMENT

Test data is centralized in:

Automation/test-data/testData.ts

Example:

export const patientTestData = {
  existingPatientId: '1000',
  nonExistingPatientId: '999999',
  existingPatientName: 'ram',
  nonExistingPatientName: 'rakdhnlf',
};

This prevents test data from being duplicated across multiple test files.


FIXTURES

Playwright fixtures are used to provide API clients to tests.

API clients include:

patientApi
practitionerApi
organizationApi
encounterApi
observationApi
conditionApi

This allows tests to focus on test scenarios and assertions rather than API client initialization.


RUNNING THE TESTS

Navigate to the Automation directory:

cd Automation

Install dependencies:

npm install

Run the complete test suite:

npx playwright test

Run a specific resource:

npx playwright test tests/patient-search.spec.ts

Run a specific test:

npx playwright test -g "TC_PATIENT_001"


TEST REPORT

The project uses Playwright HTML reporting.

After executing the tests, open the report using:

npx playwright show-report

The report provides:

- Test execution results
- Passed/failed tests
- Execution time
- Failure details
- Screenshots for failures
- Trace information for retries


PLAYWRIGHT CONFIGURATION

The framework is configured with:

- Parallel test execution
- HTML reporting
- List reporter
- Screenshot on failure
- Video retention on failure
- Trace on first retry
- CI-specific retries and workers


MANUAL API TESTING

Manual API testing was performed using Postman before automation.

Postman collections and environment files are maintained under:

Postman/
├── collections/
└── environments/

Manual testing helped identify:

- API endpoints
- HTTP methods
- Expected status codes
- Response structures
- Search parameters
- Negative scenarios
- Unsupported parameters

The identified scenarios were then automated using Playwright.


KEY QA PRACTICES DEMONSTRATED

This project demonstrates practical experience with:

- API testing
- REST API testing
- FHIR API testing
- HTTP methods
- Status code validation
- Positive testing
- Negative testing
- Response validation
- JSON validation
- Search parameter testing
- Error response validation
- Postman
- Playwright API automation
- TypeScript
- API Client / Service Object pattern
- Playwright fixtures
- Centralized test data
- Reusable assertions
- HTML test reporting
- Git and GitHub


CURRENT AUTOMATION STATUS

Total automated tests: 38

Passed: 38

Failed: 0

Status: PASS


FUTURE IMPROVEMENTS

Planned improvements include:

- CI/CD integration
- GitHub Actions
- Improved test documentation
- Automated test execution on code changes
- Additional API validation
- Better test reporting and execution history