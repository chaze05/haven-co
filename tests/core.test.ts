import test from "node:test";
import assert from "node:assert/strict";
import { formatPrice, formatPeso } from "../src/lib/format.ts";
import { parseFavorites, toggleFavorite } from "../src/lib/favorites.ts";
import { validateInquiry } from "../src/lib/validation.ts";

test("formatPrice renders compact PH prices", () => {
  assert.equal(formatPrice(18500000), "₱18.5M");
  assert.equal(formatPrice(9800000), "₱9.8M");
  assert.equal(formatPrice(6500000), "₱6.5M");
});

test("formatPeso renders full PH prices", () => {
  assert.equal(formatPeso(18500000), "₱18,500,000");
  assert.equal(formatPeso(0), "₱0");
});

test("favorites parse and toggle safely", () => {
  assert.deepEqual(parseFavorites(null), []);
  assert.deepEqual(parseFavorites("not json"), []);
  assert.deepEqual(parseFavorites('["a","b","b"]'), ["a", "b"]);
  assert.deepEqual(toggleFavorite(["a"], "b"), ["a", "b"]);
  assert.deepEqual(toggleFavorite(["a", "b"], "a"), ["b"]);
});

test("inquiry validation blocks bad input", () => {
  const bad = validateInquiry({
    name: " ",
    email: "nope",
    phone: "abc",
    interest: "",
    message: "hi",
  });
  assert.ok(bad.name);
  assert.ok(bad.email);
  assert.ok(bad.phone);
  assert.ok(bad.message);

  const good = validateInquiry({
    name: "Camille Reyes",
    email: "camille@example.com",
    phone: "+63 917 555 0142",
    interest: "The Alcove at BGC",
    message: "I would like to schedule a viewing this weekend.",
  });
  assert.deepEqual(good, {});
});
