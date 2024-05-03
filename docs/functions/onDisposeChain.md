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

[gc.ts:90](https://github.com/tobes31415/dispose/blob/bcfd41f014b1be28cdb1b562046ef05a00a09f24/src/gc.ts#L90)
