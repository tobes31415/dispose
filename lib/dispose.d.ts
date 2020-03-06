export declare type action = () => void;
export declare function dispose(object: object): void;
export declare function onDispose(object: object, fnRef: action): void;
export declare function onDisposeChain(objectA: object, objectB: object): void;
export declare function isDisposed(object: object): boolean;
export declare function assertNotDisposed(object: object, message?: string): void;
export declare function createDisposeableFunctionWrapper<T extends Function>(fnRef: T, message?: string): T;
