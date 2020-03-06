export type action = () => void;

const DISPOSE_CALLBACKS: unique symbol = Symbol("Dispose Callbacks");
const IS_DISPOSED: unique symbol = Symbol("Is Disposed");

function tryInvokeFunction(fnRef: action): void {
  try {
    fnRef();
  } catch (err) {
    console.error("Error occured during dispose: " + err);
  }
}

export function isDisposed(object: object): boolean {
  return !!object[IS_DISPOSED];
}

export function dispose(object: object): void {
  if (isDisposed(object)) {
    return;
  }
  object[IS_DISPOSED] = true;
  if (object[DISPOSE_CALLBACKS]) {
    object[DISPOSE_CALLBACKS].forEach(tryInvokeFunction);
  }
}

export function onDispose(object: object, fnRef: action): void {
  if (!object[DISPOSE_CALLBACKS]) {
    object[DISPOSE_CALLBACKS] = [];
  }
  object[DISPOSE_CALLBACKS].push(fnRef);
}

export function onDisposeChain(objectA: object, objectB: object): void {
  onDispose(objectA, () => dispose(objectB));
}

export function assertNotDisposed(object: object, message?: string): void {
  if (isDisposed(object)) {
    throw new Error(message || "Object has been disposed");
  }
}

export function createDisposeableFunctionWrapper<T extends Function>(
  fnRef: T,
  message?: string,
): T {
  const wrapper = (...args) => {
    assertNotDisposed(wrapper, message);
    return fnRef.apply(this, args) as any;
  };
  return (wrapper as any) as T;
}
