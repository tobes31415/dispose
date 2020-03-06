export type action = () => void;

const DISPOSE_CALLBACKS: unique symbol = Symbol("Dispose Callbacks");
const IS_DISPOSED: unique symbol = Symbol("Is Disposed");

function tryInvokeFunction(fnRef: action) {
  try {
    fnRef();
  } catch (err) {
    console.error("Error occured during dispose: " + err);
  }
}

export function dispose(object: object) {
  if (isDisposed(object)) {
    return;
  }
  object[IS_DISPOSED] = true;
  if (object[DISPOSE_CALLBACKS]) {
    object[DISPOSE_CALLBACKS].forEach(tryInvokeFunction);
  }
}

export function onDispose(object: object, fnRef: action) {
  if (!object[DISPOSE_CALLBACKS]) {
    object[DISPOSE_CALLBACKS] = [];
  }
  object[DISPOSE_CALLBACKS].push(fnRef);
}

export function onDisposeChain(objectA: object, objectB: object) {}

export function isDisposed(object: object): boolean {
  return !!object[IS_DISPOSED];
}

export function assertNotDisposed(object: object, message?: string) {}

export function createDisposeableFunctionWrapper<T extends Function>(
  fnRef: T,
  message?: string,
): T {
  const wrapper = (...args) => {
    assertNotDisposed(wrapper, message);
    return fnRef.apply(this, args);
  };
  return (wrapper as any) as T;
}
