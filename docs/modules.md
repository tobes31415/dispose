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
- [watchForDispose](modules.md#watchfordispose)

## Functions

### assertNotDisposed

▸ **assertNotDisposed**<T\>(`object`: T, `message?`: *string*): *void*

Throws an error if the object has been disposed

#### Type parameters:

Name | Type |
------ | ------ |
`T` | *object* |

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`object` | T | The object to inspect   |
`message?` | *string* | The message for the error object    |

**Returns:** *void*

Defined in: [gc.ts:57](https://github.com/tobes31415/dispose/blob/4d88519/src/gc.ts#L57)

___

### dispose

▸ **dispose**<T\>(`object`: T): *void*

Disposes an object

#### Type parameters:

Name | Type |
------ | ------ |
`T` | *object* |

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`object` | T | The object to be disposed    |

**Returns:** *void*

Defined in: [gc.ts:34](https://github.com/tobes31415/dispose/blob/4d88519/src/gc.ts#L34)

___

### isDisposed

▸ **isDisposed**<T\>(`object`: T): *boolean*

Returns true if an object has been disposed, otherwise false

#### Type parameters:

Name | Type |
------ | ------ |
`T` | *object* |

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`object` | T | The object to be inspected    |

**Returns:** *boolean*

Defined in: [gc.ts:48](https://github.com/tobes31415/dispose/blob/4d88519/src/gc.ts#L48)

___

### onDispose

▸ **onDispose**<T\>(`object`: T, `action`: Action): *void*

Attaches a callback that will be invoked when the object is disposed.
calling onDispose will suppress the default behaviour of recursively disposing, if you want the dispose call to be recursively applied you can either do it manually or cal onDisposeDisposeRecursively to explicitly instruct the object to be disposed.
The timing of callback functions is guarenteed only in the context of a single object.  If two or more objects get disposed at the same time then the callbacks might be interlaced.

#### Type parameters:

Name | Type |
------ | ------ |
`T` | *object* |

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`object` | T | The object to subscribe to   |
`action` | Action | - |

**Returns:** *void*

Defined in: [gc.ts:70](https://github.com/tobes31415/dispose/blob/4d88519/src/gc.ts#L70)

___

### onDisposeChain

▸ **onDisposeChain**<T1, T2\>(`triger`: T1, `trigee`: T2): *void*

When objectA is disposed, objectB will also be disposed

#### Type parameters:

Name | Type |
------ | ------ |
`T1` | *object* |
`T2` | *object* |

#### Parameters:

Name | Type |
------ | ------ |
`triger` | T1 |
`trigee` | T2 |

**Returns:** *void*

Defined in: [gc.ts:84](https://github.com/tobes31415/dispose/blob/4d88519/src/gc.ts#L84)

___

### onDisposeDeleteProperties

▸ **onDisposeDeleteProperties**<T\>(`object`: T): *void*

When the object is disposed, clear and delete it's properties

#### Type parameters:

Name | Type |
------ | ------ |
`T` | *object* |

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`object` | T | The object to be watched    |

**Returns:** *void*

Defined in: [gc.ts:100](https://github.com/tobes31415/dispose/blob/4d88519/src/gc.ts#L100)

___

### onDisposeDisposeProperties

▸ **onDisposeDisposeProperties**<T\>(`object`: T): *void*

When the object is disposed, enumerate it's properties and call dispose on them

#### Type parameters:

Name | Type |
------ | ------ |
`T` | *object* |

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`object` | T | The object to be watched    |

**Returns:** *void*

Defined in: [gc.ts:92](https://github.com/tobes31415/dispose/blob/4d88519/src/gc.ts#L92)

___

### onDisposeUnsubscribe

▸ **onDisposeUnsubscribe**<T\>(`object`: T, `subscription`: Subscription): *void*

When the object is disposed, unsubscribe from the subscription

#### Type parameters:

Name | Type |
------ | ------ |
`T` | *object* |

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`object` | T | The object to be watched   |
`subscription` | Subscription | The subscription that will be automatically unsubscribed    |

**Returns:** *void*

Defined in: [gc-rxjs.ts:51](https://github.com/tobes31415/dispose/blob/4d88519/src/gc-rxjs.ts#L51)

___

### watchForDispose

▸ **watchForDispose**<T\>(`object`: T): *Observable*<*void*\>

Emit an event when the object is disposed

#### Type parameters:

Name | Type |
------ | ------ |
`T` | *object* |

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`object` | T | The object to be watched    |

**Returns:** *Observable*<*void*\>

Defined in: [gc-rxjs.ts:25](https://github.com/tobes31415/dispose/blob/4d88519/src/gc-rxjs.ts#L25)
