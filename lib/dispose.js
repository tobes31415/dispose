const DISPOSE_CALLBACKS = Symbol("Dispose Callbacks");
const IS_DISPOSED = Symbol("Is Disposed");
function tryInvokeFunction(fnRef) {
    try {
        fnRef();
    }
    catch (err) {
        console.error("Error occured during dispose: " + err);
    }
}
export function isDisposed(object) {
    return !!object[IS_DISPOSED];
}
export function dispose(object) {
    if (isDisposed(object)) {
        return;
    }
    object[IS_DISPOSED] = true;
    if (object[DISPOSE_CALLBACKS]) {
        object[DISPOSE_CALLBACKS].forEach(tryInvokeFunction);
    }
}
export function onDispose(object, fnRef) {
    if (!object[DISPOSE_CALLBACKS]) {
        object[DISPOSE_CALLBACKS] = [];
    }
    object[DISPOSE_CALLBACKS].push(fnRef);
}
export function onDisposeChain(objectA, objectB) {
    onDispose(objectA, () => dispose(objectB));
}
export function assertNotDisposed(object, message) {
    if (isDisposed(object)) {
        throw new Error(message || "Object has been disposed");
    }
}
export function createDisposeableFunctionWrapper(fnRef, message) {
    const wrapper = (...args) => {
        assertNotDisposed(wrapper, message);
        return fnRef.apply(this, args);
    };
    return wrapper;
}
