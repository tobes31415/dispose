[@tobes31415/dispose](README.md) / Exports

# @tobes31415/dispose

## Table of contents

### Functions

- [assertNotDisposed](modules.md#assertnotdisposed)
- [dispose](modules.md#dispose)
- [isDisposed](modules.md#isdisposed)
- [onDispose](modules.md#ondispose)
- [onDisposeChain](modules.md#ondisposechain)
- [onDisposeDeleteProperties](modules.md#ondisposedeleteproperties)
- [onDisposeDisposeProperties](modules.md#ondisposedisposeproperties)
- [onDisposeUnsubscribe](modules.md#ondisposeunsubscribe)

## Functions

### assertNotDisposed

▸ **assertNotDisposed**<`T`\>(`object`, `message?`): `void`

Throws an error if the object has been disposed

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `object` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `object` | `T` | The object to inspect |
| `message?` | `string` | The message for the error object |

#### Returns

`void`

___

### dispose

▸ **dispose**<`T`\>(`object`): `void`

Disposes an object

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `object` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `object` | `T` | The object to be disposed |

#### Returns

`void`

___

### isDisposed

▸ **isDisposed**<`T`\>(`object`): `boolean`

Returns true if an object has been disposed, otherwise false

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `object` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `object` | `T` | The object to be inspected |

#### Returns

`boolean`

___

### onDispose

▸ **onDispose**<`T`\>(`object`, `action`): `void`

Attaches a callback that will be invoked when the object is disposed.
calling onDispose will suppress the default behaviour of recursively disposing, if you want the dispose call to be recursively applied you can either do it manually or cal onDisposeDisposeRecursively to explicitly instruct the object to be disposed.
The timing of callback functions is guarenteed only in the context of a single object.  If two or more objects get disposed at the same time then the callbacks might be interlaced.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `object` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `object` | `T` | The object to subscribe to |
| `action` | `Action` | - |

#### Returns

`void`

___

### onDisposeChain

▸ **onDisposeChain**<`T1`, `T2`\>(`triger`, `trigee`): `void`

When objectA is disposed, objectB will also be disposed

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T1` | extends `object` |
| `T2` | extends `object` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `triger` | `T1` |
| `trigee` | `T2` |

#### Returns

`void`

___

### onDisposeDeleteProperties

▸ **onDisposeDeleteProperties**<`T`\>(`object`): `void`

When the object is disposed, clear and delete it's properties

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `object` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `object` | `T` | The object to be watched |

#### Returns

`void`

___

### onDisposeDisposeProperties

▸ **onDisposeDisposeProperties**<`T`\>(`object`): `void`

When the object is disposed, enumerate it's properties and call dispose on them

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `object` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `object` | `T` | The object to be watched |

#### Returns

`void`

___

### onDisposeUnsubscribe

▸ **onDisposeUnsubscribe**<`T`\>(`object`, `subscription`): `void`

When the object is disposed, unsubscribe from the subscription

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `object` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `object` | `T` | The object to be watched |
| `subscription` | `Subscription` | The subscription that will be automatically unsubscribed |

#### Returns

`void`
