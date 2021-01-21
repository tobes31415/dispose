import * as gc from "./gc";
import { Subscription, Observable, of, Subject } from 'rxjs';

interface GC_RXJS_MetaData {
    observable?: Observable<void>;
}

const GC_RXJS_META: unique symbol = Symbol("gc/rxjs");

function getMeta(object: any): GC_RXJS_MetaData {
    if (!object[GC_RXJS_META]) {
        object[GC_RXJS_META] = {};
    }
    return object[GC_RXJS_META];
}

function deleteMeta(object: any) {
    delete object[GC_RXJS_META];
}

/**
 * Emit an event when the object is disposed
 * @param object The object to be watched 
 */
export function watchForDispose<T extends object>(object: T): Observable<void> {
    if (gc.isDisposed(object)) {
        return of(void 0);
    }
    const meta = getMeta(object);
    if (meta.observable) {
        return meta.observable;
    }
    const subject = new Subject<void>();

    meta.observable = subject;
    gc.onDispose(object, subject.next.bind(subject));
    gc.onDispose(object, deleteMeta.bind(null, object));
    return meta.observable;
}

/**
 * When the object is disposed, unsubscribe from the subscription
 * @param object The object to be watched
 * @param subscription The subscription that will be automatically unsubscribed
 */
export function onDisposeUnsubscribe<T extends object>(object: T, subscription: Subscription) {
    gc.onDispose(object, subscription.unsubscribe.bind(subscription));
}