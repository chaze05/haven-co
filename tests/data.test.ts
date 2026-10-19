import test from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { PROPERTIES } from "../src/data/properties.ts";
import { NEIGHBOURHOODS } from "../src/data/neighbourhoods.ts";
import { TESTIMONIALS } from "../src/data/testimonials.ts";

test("Haven has six unique PH properties", () => {
  assert.equal(PROPERTIES.length, 6);
  assert.equal(new Set(PROPERTIES.map((p) => p.slug)).size, 6);
  for (const property of PROPERTIES) {
    assert.ok(property.price > 0);
    assert.ok(property.images.length >= 2);
    assert.ok(property.features.length >= 3);
  }
});

test("neighbourhoods and testimonials are complete", () => {
  assert.equal(NEIGHBOURHOODS.length, 4);
  assert.equal(TESTIMONIALS.length, 4);
});

test("all referenced images exist", () => {
  const sources = [
    ...PROPERTIES.flatMap((p) => p.images),
    ...NEIGHBOURHOODS.map((n) => n.image),
  ];
  for (const src of sources) {
    assert.ok(src.startsWith("/images/"), src);
    assert.ok(existsSync("public" + src), "missing " + src);
  }
});
