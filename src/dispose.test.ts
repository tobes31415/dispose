import * as gc from "./dispose";

test("disposes an object", () => {
    const temp = {};
    let gotDisposed = false;
    gc.onDispose(temp, ()=>gotDisposed = true);
    gc.dispose(temp);
    expect(gotDisposed).toBe(true);
    expect(1).toBe(1);
})