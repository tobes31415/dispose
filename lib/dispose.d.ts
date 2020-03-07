declare type action = () => void;
/**
 * Returns true if an object has been disposed, otherwise false
 * @param object The object to be inspected
 */
export declare function isDisposed(object: object): boolean;
/**
 * Disposes an object
 * @param object The object to be disposed
 */
export declare function dispose(object: object): void;
/**
 * Attaches a callback that will be invoked when the object is disposed.
 * calling onDispose will suppress the default behaviour of recursively disposing, if you want the dispose call to be recursively applied you can either do it manually or cal onDisposeDisposeRecursively to explicitly instruct the object to be disposed.
 * The timing of callback functions is guarenteed only in the context of a single object.  If two or more objects get disposed at the same time then the callbacks might be interlaced.
 * @param object The object to subscribe to
 * @param fnRef A callback function that will be invoked when the object is disposed
 */
export declare function onDispose(object: object, fnRef: action): void;
/**
 * Explicitly instructs an object to dispose recursively.  This is actually the default behaviour.  You only need to call this if you need to override the dispoal of an object but still want the dispose to be recursively applied.
 * @param object The object to subscribe to
 */
export declare function onDisposeDisposeRecursively(object: object): void;
/**
 * When objectA is disposed, objectB will also be disposed
 * @param objectA The object to be subscribed to
 * @param objectB The object to chain the dipose to
 */
export declare function onDisposeChain(objectA: object, objectB: object): void;
/**
 * Throws an error if the object has been disposed
 * @param object The object to inspect
 * @param message An optional message, otherwise the error will say "Object has been disposed"
 */
export declare function assertNotDisposed(object: object, message?: string): void;
/**
 * Wraps a function so that it can be disposed.  Once disposed the function will no longer execute
 * @param fnRef The function to be wrapped
 * @param message The message to be included in the error if invoked after the wrapper is disposed.  Mutually exclusive with silent
 * @param silent Optional[false] If true attempting to invoke the function after the wrapper has been disposed will fail silently, otherwise it'll throw an exception.  Mutually exclusive with message.
 */
export declare function createDisposeableFunctionWrapper<T extends Function>(fnRef: T, message?: string, silent?: boolean): T;
export {};
