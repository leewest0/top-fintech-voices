import { buildMailto } from '../src/lib/mailto.ts';
import assert from 'node:assert/strict';

const url = buildMailto({
  to: 'info@topfintechvoices.org',
  topic: 'Sponsorship',
  name: 'Ama Test',
  email: 'ama@example.com',
  message: 'We would like to sponsor Vol. 3 — can you send the rate card?',
});
const [scheme, query] = url.split('?');
const params = new URLSearchParams(query);

assert.equal(scheme, 'mailto:info@topfintechvoices.org');
assert.equal(params.get('subject'), 'Sponsorship — Ama Test');
assert.match(params.get('body'), /rate card\?\n\n—\nAma Test\nama@example\.com$/);
assert.ok(!url.includes('+'), 'spaces must not encode as "+" — mail clients show them literally');
assert.ok(url.includes('%E2%80%94'), 'em dash must be percent-encoded');

// Empty name still produces a usable subject.
assert.equal(
  new URLSearchParams(buildMailto({ to: 'a@b.c', topic: 'Press', name: '  ', email: '', message: 'hi' }).split('?')[1]).get('subject'),
  'Press — Website enquiry',
);
console.log('buildMailto: all assertions passed');
console.log('sample:', decodeURIComponent(url).replace(/\n/g, ' ⏎ ').slice(0, 130));
