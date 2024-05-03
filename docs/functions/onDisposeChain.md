[**@tobes31415/dispose**](../README.md) • **Docs**

***

[@tobes31415/dispose](../globals.md) / onDisposeChain

# Function: onDisposeChain()

> **onDisposeChain**\<`T1`, `T2`\>(`trigger`, `triggee`): `void`

When objectA is disposed, objectB will also be disposed

## Type parameters

• **T1** *extends* `object`

• **T2** *extends* `object`

## Parameters

• **trigger**: `T1`

The object to be watched

• **triggee**: `T2`

The object to chain the dipose to

## Returns

`void`

## Source

[gc.ts:87](https://github.com/tobes31415/dispose/blob/8b821ba54eb1fd6736de9a4ab9b915563840a838/src/gc.ts#L87)
