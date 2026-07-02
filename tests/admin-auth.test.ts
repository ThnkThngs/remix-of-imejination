import assert from "node:assert/strict";
import { isAdminPasswordValid } from "../lib/admin-auth";

assert.equal(isAdminPasswordValid(" imejination-admin "), true);
assert.equal(isAdminPasswordValid("wrong-password"), false);
assert.equal(isAdminPasswordValid(""), false);

