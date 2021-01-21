import * as gc from './gc';
import * as nggc from './gc-ng';
import { OnDestroy } from '@angular/core';

describe("gc/ng", () => {
    let spy: any;

    beforeEach(() => {
        spy = jest.fn();
    })

    it("gets invoked when ngDestroy is called", () => {
        const angularObject: OnDestroy = {
            ngOnDestroy: spy
        };
        nggc.onNgDestroyDisposeSelf(angularObject);
        expect(gc.isDisposed(angularObject)).toBe(false);
        expect(spy).not.toHaveBeenCalled();
        angularObject.ngOnDestroy();
        expect(gc.isDisposed(angularObject)).toBe(true);
        expect(spy).toHaveBeenCalled();
    })
});
