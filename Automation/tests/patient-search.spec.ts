import {test,expect} from '@playwright/test';
test('search patient by name - TC_PATIENT_001',async({request}) => {
    const response = await request.get('Patient?name=ram');
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.resourceType).toBe('Bundle');
    expect(body.type).toBe('searchset');
    expect(body.total).toBe(9);
})

test('serach patient with non-existing name - TC_PATIENT_002', async ({request}) => {
    const response = await request.get('Patient?name=rakdhnlf');
  expect(response.status()).toBe(200);
  const body =await response.json();
  expect(body.resourceType).toBe('Bundle');
  expect(body.type).toBe('searchset');
  expect(body.total).toBe(0);
});

test('Validate patient search response structure - TC_PATIENT_003',async({request}) => {
    const response = await request.get('Patient?name=ram');

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.resourceType).toBe('Bundle');
    expect(body.type).toBe('searchset');
    expect(body.total).toBeGreaterThan(0)
});