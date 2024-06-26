[**@tobes31415/dispose**](../README.md) • **Docs**

***

[@tobes31415/dispose](../globals.md) / onDispose

# Function: onDispose()

> **onDispose**\<`T`\>(`object`, `action`): `void`

Attaches a callback that will be invoked when the object is disposed.
calling onDispose will suppress the default behaviour of recursively disposing, if you want the dispose call to be recursively applied you can either do it manually or cal onDisposeDisposeRecursively to explicitly instruct the object to be disposed.
The timing of callback functions is guarenteed only in the context of a single object.  If two or more objects get disposed at the same time then the callbacks might be interlaced.

## Type parameters

• **T** *extends* `object`

## Parameters

• **object**: `T`

The object to subscribe to

• **action**: [`Action`](../type-aliases/Action.md)

A callback function that will be invoked when the object is disposed

## Returns

`void`

## Source

[gc.ts:76](https://github.com/tobes31415/dispose/blob/bcfd41f014b1be28cdb1b562046ef05a00a09f24/src/gc.ts#L76)
