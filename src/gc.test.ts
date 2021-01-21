import * as gc from './gc';

describe("gc", () => {
    let foo: {abc: number, sub: { ghi: number }};
    let bar: {def: number};
    let spy:any;

    beforeEach(() => {
        foo = { abc: 123, sub: {ghi : 789}};
        bar = {def: 456};
        spy = jest.fn();
    })

    it ("invokes the dispose function", () => {
        gc.onDispose(foo, spy);
        expect(spy).not.toHaveBeenCalled();
        gc.dispose(foo);
        expect(spy).toHaveBeenCalled();
    });

    it ("returns true when object is disposed", () => {
        expect(gc.isDisposed(foo)).toBe(false);
        gc.dispose(foo);
        expect(gc.isDisposed(foo)).toBe(true);
    });

    it ("Only throw if asserting on disposed object", () => {
        expect(() => gc.assertNotDisposed(foo)).not.toThrow();
        gc.dispose(foo);
        expect(() => gc.assertNotDisposed(foo)).toThrow();
    });

    it("Chains dispose", () => {
        gc.onDisposeChain(foo, bar);
        gc.dispose(foo);
        expect(gc.isDisposed(bar)).toBe(true);
    });

    it("Deletes Properties", () => {
        gc.onDisposeDeleteProperties(foo);
        expect(foo.abc).toBeTruthy();
        gc.dispose(foo);
        expect(foo.abc as any).toEqual(undefined);
    });

    it ("Disposes Properties", () => {
        gc.onDisposeDisposeProperties(foo);
        expect(gc.isDisposed(foo.sub)).toBe(false);
        gc.dispose(foo);
        expect(gc.isDisposed(foo.sub)).toBe(true);
    });

    it("Triggers dispose action immedietly if already disposed", () => {
        gc.dispose(foo);
        expect(spy).not.toHaveBeenCalled();
        gc.onDispose(foo, spy);
        expect(spy).toHaveBeenCalled();    
    });

    it("Only disposes an object once", () => {
        gc.onDispose(foo, spy);
        expect(spy).toHaveBeenCalledTimes(0);
        gc.dispose(foo);
        expect(spy).toHaveBeenCalledTimes(1);
        gc.dispose(foo);
        expect(spy).toHaveBeenCalledTimes(1);
    });
});
