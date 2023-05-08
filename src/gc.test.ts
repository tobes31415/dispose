import * as gc from './gc';
import expect from "expect.js";

describe("gc", () => {
    let foo: {abc: number, sub: { ghi: number }};
    let bar: {def: number};
    let spy:any;
    let callCount: number = 0;

    beforeEach(() => {
        foo = { abc: 123, sub: {ghi : 789}};
        bar = {def: 456};
        spy = () => {callCount++;}
        callCount = 0;
    })

    it ("invokes the dispose function", () => {
        gc.onDispose(foo, spy);
        expect(callCount).to.equal(0);
        gc.dispose(foo);
        expect(callCount).to.equal(1);
    });

    it ("returns true when object is disposed", () => {
        expect(gc.isDisposed(foo)).to.be(false);
        gc.dispose(foo);
        expect(gc.isDisposed(foo)).to.be(true);
    });

    it ("Only throw if asserting on disposed object", () => {
        expect(() => gc.assertNotDisposed(foo)).to.not.throwError();
        gc.dispose(foo);
        expect(() => gc.assertNotDisposed(foo)).to.throwError();
    });

    it("Chains dispose", () => {
        gc.onDisposeChain(foo, bar);
        gc.dispose(foo);
        expect(gc.isDisposed(bar)).to.be(true);
    });

    it("Deletes Properties", () => {
        gc.onDisposeDeleteProperties(foo);
        expect(foo.abc).to.be.ok();
        gc.dispose(foo);
        expect(foo.abc as any).to.equal(undefined);
    });

    it ("Disposes Properties", () => {
        gc.onDisposeDisposeProperties(foo);
        expect(gc.isDisposed(foo.sub)).to.be(false);
        gc.dispose(foo);
        expect(gc.isDisposed(foo.sub)).to.be(true);
    });

    it("Triggers dispose action immedietly if already disposed", () => {
        gc.dispose(foo);
        expect(callCount).to.equal(0);
        gc.onDispose(foo, spy);
        expect(callCount).to.equal(1);
    });

    it("Only disposes an object once", () => {
        gc.onDispose(foo, spy);
        expect(callCount).to.equal(0);
        gc.dispose(foo);
        expect(callCount).to.equal(1);
        gc.dispose(foo);
        expect(callCount).to.equal(1);
    });
});
