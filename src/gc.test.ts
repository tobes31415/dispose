import * as gc from "./gc";
import { describe, beforeEach, test, expect } from "vitest";

describe("gc", () => {
  let foo: { abc: number; sub: { ghi: number } };
  let bar: { def: number };
  let spy: any;
  let callCount: number = 0;

  beforeEach(() => {
    foo = { abc: 123, sub: { ghi: 789 } };
    bar = { def: 456 };
    spy = () => {
      callCount++;
    };
    callCount = 0;
  });

  test("invokes the dispose function", () => {
    gc.onDispose(foo, spy);
    expect(callCount).to.equal(0);
    gc.dispose(foo);
    expect(callCount).to.equal(1);
  });

  test("returns true when object is disposed", () => {
    expect(gc.isDisposed(foo)).toBe(false);
    gc.dispose(foo);
    expect(gc.isDisposed(foo)).toBe(true);
  });

  test("Only throw if asserting on disposed object", () => {
    expect(() => gc.assertNotDisposed(foo)).not.toThrowError();
    gc.dispose(foo);
    expect(() => gc.assertNotDisposed(foo)).toThrowError();
  });

  test("Chains dispose", () => {
    gc.onDisposeChain(foo, bar);
    gc.dispose(foo);
    expect(gc.isDisposed(bar)).toBe(true);
  });

  test("Deletes Properties", () => {
    gc.onDisposeDeleteProperties(foo);
    expect(foo.abc).toBeTruthy();
    gc.dispose(foo);
    expect(foo.abc as any).to.equal(undefined);
  });

  test("Disposes Properties", () => {
    gc.onDisposeDisposeProperties(foo);
    expect(gc.isDisposed(foo.sub)).toBe(false);
    gc.dispose(foo);
    expect(gc.isDisposed(foo.sub)).toBe(true);
  });

  test("Triggers dispose action immedietly if already disposed", () => {
    gc.dispose(foo);
    expect(callCount).to.equal(0);
    gc.onDispose(foo, spy);
    expect(callCount).to.equal(1);
  });

  test("Only disposes an object once", () => {
    gc.onDispose(foo, spy);
    expect(callCount).to.equal(0);
    gc.dispose(foo);
    expect(callCount).to.equal(1);
    gc.dispose(foo);
    expect(callCount).to.equal(1);
  });
});
