import { test } from 'node:test';
import assert from 'node:assert/strict';
import { metrics, validateLead, filterLeads, isValidStoredLead } from '../src/utils.js';
const lead = { id: '1', name: 'Jamie Taylor', email: 'jamie@example.com', phone: '', company: 'Acme', source: 'Website', status: 'New', priority: 'High', dealValue: 500, notes: '', createdAt: '2026-01-01T00:00:00.000Z' };
test('metrics exclude closed leads from pipeline and compute won conversion', () => {
  assert.deepEqual(metrics([]), { total: 0, pipeline: 0, revenue: 0, conversion: 0, high: 0 });
  assert.deepEqual(metrics([lead, { ...lead, id: '2', status: 'Won', dealValue: 1500, priority: 'Low' }, { ...lead, id: '3', status: 'Lost', dealValue: 2000, priority: 'Low' }, { ...lead, id: '4', status: 'Proposal', dealValue: 750, priority: 'Low' }]), { total: 4, pipeline: 1250, revenue: 1500, conversion: 25, high: 1 });
});
test('form rejects invalid values while allowing optional phone', () => {
  assert.deepEqual(validateLead(lead), {});
  assert.deepEqual(Object.keys(validateLead({ ...lead, name: ' ', email: 'broken', phone: 'abc', dealValue: -1 })), ['name', 'email', 'phone', 'dealValue']);
  assert.ok(validateLead({ ...lead, dealValue: 0 }).dealValue);
  assert.ok(validateLead({ ...lead, dealValue: Infinity }).dealValue);
});
test('combined filters and sorting do not mutate the source', () => {
  const input = [lead, { ...lead, id: '2', dealValue: 900, priority: 'Low' }];
  assert.equal(filterLeads(input, { search: 'ACME', priority: 'High' }).length, 1);
  assert.equal(filterLeads(input, { sort: 'value-desc' })[0].id, '2');
  assert.equal(input[0].id, '1');
});
test('storage validation rejects malformed lead records', () => {
  assert.equal(isValidStoredLead(lead), true);
  assert.equal(isValidStoredLead({ ...lead, createdAt: 'invalid' }), false);
  assert.equal(isValidStoredLead({ ...lead, dealValue: '500' }), false);
});
