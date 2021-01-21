import * as gc from './gc';
import * as gc_rxjs from './gc-rxjs';

describe("gc", () => {
    let foo: {abc: number, sub: { ghi: number }};
    let bar: {def: number};
    let spy: any

    beforeEach(() => {
        foo = { abc: 123, sub: {ghi : 789}};
        bar = {def: 456};
        spy = jest.fn();
    })

    it("Watches for dispose", () => {
        gc_rxjs.watchForDispose(foo).subscribe(spy);
        expect(spy).not.toHaveBeenCalled();
        gc.dispose(foo);
        expect(spy).toHaveBeenCalled();
    });

    it("Only creates one observable per object", () => {
        const A = gc_rxjs.watchForDispose(foo);
        const B = gc_rxjs.watchForDispose(foo);
        expect(A).toBe(B);
        gc.dispose(foo);
    });
});
