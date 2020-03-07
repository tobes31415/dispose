



## Index

### Functions

* [assertNotDisposed](dispose.md#assertnotdisposed)
* [createDisposeableFunctionWrapper](dispose.md#createdisposeablefunctionwrapper)
* [dispose](dispose.md#dispose)
* [isDisposed](dispose.md#isdisposed)
* [onDispose](dispose.md#ondispose)
* [onDisposeChain](dispose.md#ondisposechain)
* [onDisposeDisposeRecursively](dispose.md#ondisposedisposerecursively)

## Functions

###  assertNotDisposed

▸ **assertNotDisposed**(`object`: object, `message`: string): *void*

*Defined in [dispose.ts:91](https://github.com/tobes31415/dispose/blob/023e8ae/src/dispose.ts#L91)*

Throws an error if the object has been disposed

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`object` | object | - | The object to inspect |
`message` | string | "Object has been disposed" | The message for the error object  |

**Returns:** *void*

___

###  createDisposeableFunctionWrapper

▸ **createDisposeableFunctionWrapper**<**T**>(`fnRef`: T, `message`: string, `silent`: boolean): *T*

*Defined in [dispose.ts:103](https://github.com/tobes31415/dispose/blob/023e8ae/src/dispose.ts#L103)*

Wraps a function so that it can be disposed.  Once disposed the function will no longer execute

**Type parameters:**

▪ **T**: *Function*

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`fnRef` | T | - | The function to be wrapped |
`message` | string | "Function has been disposed" | The message to be included in the error if invoked after the wrapper is disposed.  Mutually exclusive with silent |
`silent` | boolean | false | If true attempting to invoke the function after the wrapper has been disposed will fail silently, otherwise it'll throw an error.  Mutually exclusive with message.  |

**Returns:** *T*

___

###  dispose

▸ **dispose**(`object`: object): *void*

*Defined in [dispose.ts:36](https://github.com/tobes31415/dispose/blob/023e8ae/src/dispose.ts#L36)*

Disposes an object

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`object` | object | The object to be disposed  |

**Returns:** *void*

___

###  isDisposed

▸ **isDisposed**(`object`: object): *boolean*

*Defined in [dispose.ts:28](https://github.com/tobes31415/dispose/blob/023e8ae/src/dispose.ts#L28)*

Returns true if an object has been disposed, otherwise false

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`object` | object | The object to be inspected  |

**Returns:** *boolean*

___

###  onDispose

▸ **onDispose**(`object`: object, `fnRef`: action): *void*

*Defined in [dispose.ts:55](https://github.com/tobes31415/dispose/blob/023e8ae/src/dispose.ts#L55)*

Attaches a callback that will be invoked when the object is disposed.
calling onDispose will suppress the default behaviour of recursively disposing, if you want the dispose call to be recursively applied you can either do it manually or cal onDisposeDisposeRecursively to explicitly instruct the object to be disposed.
The timing of callback functions is guarenteed only in the context of a single object.  If two or more objects get disposed at the same time then the callbacks might be interlaced.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`object` | object | The object to subscribe to |
`fnRef` | action | A callback function that will be invoked when the object is disposed  |

**Returns:** *void*

___

###  onDisposeChain

▸ **onDisposeChain**(`objectA`: object, `objectB`: object): *void*

*Defined in [dispose.ts:82](https://github.com/tobes31415/dispose/blob/023e8ae/src/dispose.ts#L82)*

When objectA is disposed, objectB will also be disposed

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`objectA` | object | The object to be subscribed to |
`objectB` | object | The object to chain the dipose to  |

**Returns:** *void*

___

###  onDisposeDisposeRecursively

▸ **onDisposeDisposeRecursively**(`object`: object): *void*

*Defined in [dispose.ts:70](https://github.com/tobes31415/dispose/blob/023e8ae/src/dispose.ts#L70)*

Explicitly instructs an object to dispose recursively.  This is actually the default behaviour.  You only need to call this if you need to override the dispoal of an object but still want the dispose to be recursively applied.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`object` | object | The object to subscribe to  |

**Returns:** *void*
