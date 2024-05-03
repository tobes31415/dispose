/**
 * An action is any function which can be invoked synchronously and will not return any value
 */
export type Action = () => void;

interface PropInfo {
  key: string;
  value: any;
  object: any;
}
type PropAction = (prop: PropInfo) => void;

interface GC_MetaData {
  isDisposed?: boolean;
  onDispose: Action[];
}

const GC_META: unique symbol = Symbol("gc");

function getMeta(object: any): GC_MetaData {
  if (!object[GC_META]) {
    object[GC_META] = {
      onDispose: [],
    };
  }
  return object[GC_META];
}

function cleanUpMeta(meta: GC_MetaData) {
  delete (meta as any).onDispose;
}

/**
 * Disposes an object
 * @param object The object to be disposed
 */
export function dispose<T extends object>(object: T): void {
  const meta = getMeta(object);
  if (meta.isDisposed) {
    return;
  }
  meta.isDisposed = true;
  meta.onDispose.forEach(safeInvoke);
  cleanUpMeta(meta);
}

/**
 * Returns true if an object has been disposed, otherwise false
 * @param object The object to be inspected
 */
export function isDisposed<T extends object>(object: T): boolean {
  return !!getMeta(object).isDisposed;
}

/**
 * Throws an error if the object has been disposed
 * @param object The object to inspect
 * @param message The message for the error object
 */
export function assertNotDisposed<T extends object>(
  object: T,
  message?: string,
) {
  if (isDisposed(object)) {
    throw new Error(message || "Object has been disposed");
  }
}

/**
 * Attaches a callback that will be invoked when the object is disposed.
 * calling onDispose will suppress the default behaviour of recursively disposing, if you want the dispose call to be recursively applied you can either do it manually or cal onDisposeDisposeRecursively to explicitly instruct the object to be disposed.
 * The timing of callback functions is guarenteed only in the context of a single object.  If two or more objects get disposed at the same time then the callbacks might be interlaced.
 * @param object The object to subscribe to
 * @param action A callback function that will be invoked when the object is disposed
 */
export function onDispose<T extends object>(object: T, action: Action) {
  const meta = getMeta(object);
  if (meta.isDisposed) {
    safeInvoke(action);
  } else {
    meta.onDispose.push(action);
  }
}

/**
 * When objectA is disposed, objectB will also be disposed
 * @param trigger The object to be watched
 * @param triggee The object to chain the dipose to
 */
export function onDisposeChain<T1 extends object, T2 extends object>(
  trigger: T1,
  triggee: T2,
) {
  onDispose(trigger, dispose.bind(null, triggee));
}

/**
 * When the object is disposed, enumerate it's properties and call dispose on them
 * @param object The object to be watched
 */
export function onDisposeDisposeProperties<T extends object>(object: T) {
  onDispose(object, forEachProperty.bind(null, object, disposeProperty));
}

/**
 * When the object is disposed, clear and delete it's properties
 * @param object The object to be watched
 */
export function onDisposeDeleteProperties<T extends object>(object: T) {
  onDispose(object, forEachProperty.bind(null, object, deleteProperty));
}

function safeInvoke(action: Action) {
  try {
    action();
  } catch (err: any) {
    console.error(
      "error occured inside a dispose handler",
      err.message || "" + err,
    );
    console.log(err);
  }
}

function forEachProperty(object: any, action: PropAction) {
  Object.entries(object).forEach(([key, value]: [key: string, value: any]) =>
    action({ key, value, object }),
  );
}

function deleteProperty({ key, object }: PropInfo) {
  try {
    object[key] = undefined;
  } catch (ignored) {
    //do nothing
  }
  try {
    delete object[key];
  } catch (ignored) {
    //do nothing
  }
}

function disposeProperty({ value }: PropInfo) {
  if (typeof value === "object") {
    dispose(value);
  }
}

/**
 * An object receipt from a call to subscribe.  This object is used to unsubscribe
 */
export interface Subscription {
  unsubscribe: () => void;
}

/**
 * When the object is disposed, unsubscribe from the subscription
 * @param object The object to be watched
 * @param subscription The subscription that will be automatically unsubscribed
 */
export function onDisposeUnsubscribe<T extends object>(
  object: T,
  subscription: Subscription,
) {
  onDispose(object, subscription.unsubscribe.bind(subscription));
}
