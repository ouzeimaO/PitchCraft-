import test from "node:test";
import assert from "node:assert/strict";
import { validateTopic } from "./validateTopic.js";

test("rejects missing and non-string descriptions", () => {
  assert.equal(validateTopic(undefined).valid, false);
  assert.equal(validateTopic(42).valid, false);
});

test("rejects descriptions that are too short", () => {
  assert.equal(validateTopic("abc").valid, false);
});

test("trims and accepts a valid project description", () => {
  assert.deepEqual(validateTopic("  Mon projet de plateforme  "), {
    valid: true,
    topic: "Mon projet de plateforme",
  });
});

test("rejects descriptions longer than 1200 characters", () => {
  assert.equal(validateTopic("a".repeat(1201)).valid, false);
});
