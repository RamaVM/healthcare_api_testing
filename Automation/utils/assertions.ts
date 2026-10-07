import { expect } from '@playwright/test';

export function expectSearchBundle(body: any) {
  expect(body.resourceType).toBe('Bundle');
  expect(body.type).toBe('searchset');
}

export function expectSearchResults(body: any) {
  expectSearchBundle(body);
  expect(body.entry).toBeDefined();
  expect(body.entry.length).toBeGreaterThan(0);
}

export function expectOperationOutcome(body: any) {
  expect(body.resourceType).toBe('OperationOutcome');
}