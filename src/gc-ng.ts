import * as gc from "./gc";
import { OnDestroy } from '@angular/core';

interface GC_NG_MetaData {
    isNgDestroyRegistered?: boolean;
}

const GC_NG_META: unique symbol = Symbol("gc/ng");

function getMeta(object: any): GC_NG_MetaData {
    if (!object[GC_NG_META]) {
        object[GC_NG_META] = {};
    }
    return object[GC_NG_META];
}

function deleteMeta(object: any) {
    delete object[GC_NG_META];
}

/**
 * When the component/directive/etc is destroyed, trigger a dispose on the same object.
 * Allows you to integrate dispose with the angular lifecycle
 * @param angularObject the angular object to be watched
 */
export function onNgDestroyDisposeSelf<T extends OnDestroy>(angularObject: T) {
    if (gc.isDisposed(angularObject)) {
        return;
    }
    const meta = getMeta(angularObject);
    if (meta.isNgDestroyRegistered) { return; }
    meta.isNgDestroyRegistered = true;
    const originalDestroyFunction = angularObject.ngOnDestroy;
    angularObject.ngOnDestroy = gc.dispose.bind(null, angularObject);
    gc.onDispose(angularObject, originalDestroyFunction);
    gc.onDispose(angularObject, deleteMeta.bind(null, angularObject));
}