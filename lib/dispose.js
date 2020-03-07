const DISPOSE_CALLBACKS = Symbol("Dispose Callbacks");
const IS_DISPOSED = Symbol("Is Disposed");
const FORCE_RECURSIVE = Symbol("Force recursive dispose");
function tryInvokeFunction(fnRef) {
    try {
        fnRef();
    }
    catch (err) {
        console.error("Error occured during dispose: " + err);
    }
}
function forEachChild(object, action) {
    if (Array.isArray(object)) {
        object.forEach(action);
    }
    else {
        forEachChild(Object.values(object), action);
    }
}
/**
 * Returns true if an object has been disposed, otherwise false
 * @param object The object to be inspected
 */
export function isDisposed(object) {
    return !!object[IS_DISPOSED];
}
/**
 * Disposes an object
 * @param object The object to be disposed
 */
export function dispose(object) {
    if (isDisposed(object)) {
        return;
    }
    object[IS_DISPOSED] = true;
    if (object[DISPOSE_CALLBACKS]) {
        object[DISPOSE_CALLBACKS].forEach(tryInvokeFunction);
    }
    else {
        forEachChild(object, dispose);
    }
}
/**
 * Attaches a callback that will be invoked when the object is disposed.
 * calling onDispose will suppress the default behaviour of recursively disposing, if you want the dispose call to be recursively applied you can either do it manually or cal onDisposeDisposeRecursively to explicitly instruct the object to be disposed.
 * The timing of callback functions is guarenteed only in the context of a single object.  If two or more objects get disposed at the same time then the callbacks might be interlaced.
 * @param object The object to subscribe to
 * @param fnRef A callback function that will be invoked when the object is disposed
 */
export function onDispose(object, fnRef) {
    if (isDisposed(object)) {
        tryInvokeFunction(fnRef);
        return;
    }
    if (!object[DISPOSE_CALLBACKS]) {
        object[DISPOSE_CALLBACKS] = [];
    }
    object[DISPOSE_CALLBACKS].push(fnRef);
}
/**
 * Explicitly instructs an object to dispose recursively.  This is actually the default behaviour.  You only need to call this if you need to override the dispoal of an object but still want the dispose to be recursively applied.
 * @param object The object to subscribe to
 */
export function onDisposeDisposeRecursively(object) {
    if (!object[FORCE_RECURSIVE]) {
        object[FORCE_RECURSIVE] = true;
        onDispose(object, () => forEachChild(object, dispose));
    }
}
/**
 * When objectA is disposed, objectB will also be disposed
 * @param objectA The object to be subscribed to
 * @param objectB The object to chain the dipose to
 */
export function onDisposeChain(objectA, objectB) {
    onDispose(objectA, () => dispose(objectB));
}
/**
 * Throws an error if the object has been disposed
 * @param object The object to inspect
 * @param message An optional message, otherwise the error will say "Object has been disposed"
 */
export function assertNotDisposed(object, message) {
    if (isDisposed(object)) {
        throw new Error(message || "Object has been disposed");
    }
}
/**
 * Wraps a function so that it can be disposed.  Once disposed the function will no longer execute
 * @param fnRef The function to be wrapped
 * @param message The message to be included in the error if invoked after the wrapper is disposed.  Mutually exclusive with silent
 * @param silent Optional[false] If true attempting to invoke the function after the wrapper has been disposed will fail silently, otherwise it'll throw an exception.  Mutually exclusive with message.
 */
export function createDisposeableFunctionWrapper(fnRef, message, silent = false) {
    if (!fnRef) {
        throw new Error("fnRef is required");
    }
    if (message && silent) {
        throw new Error("message and silent are mutually exclusive");
    }
    const wrapper = (...args) => {
        if (silent) {
            if (isDisposed(wrapper)) {
                return;
            }
        }
        else {
            assertNotDisposed(wrapper, message);
        }
        return fnRef.apply(this, args);
    };
    return wrapper;
}
