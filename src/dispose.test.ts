import * as gc from "./dispose";

test("disposes an object", () => {
  const temp = {};
  let gotDisposed = false;
  gc.onDispose(temp, () => gotDisposed = true);
  gc.dispose(temp);
  expect(gotDisposed).toBe(true);
});

test("recursively disposes arrays when no override specified", () => {
  const tempO = {};
  const temp = [{},{},tempO];
  let gotDisposed = false;
  gc.onDispose(tempO, () => gotDisposed = true);
  gc.dispose(temp);
  expect(gotDisposed).toBe(true);
})

test("recursively disposes Objects when no override specified", () => {
  const tempO = {};
  const temp = {a:{},b:{},c:tempO};
  let gotDisposed = false;
  gc.onDispose(tempO, () => gotDisposed = true);
  gc.dispose(temp);
  expect(gotDisposed).toBe(true);
})

test("recursively disposes nested Objects when no override specified", () => {
  const tempO = {};
  const temp = {a:{},b:{},c:{ d: tempO }};
  let gotDisposed = false;
  gc.onDispose(tempO, () => gotDisposed = true);
  gc.dispose(temp);
  expect(gotDisposed).toBe(true);
})


test("Does not recursively dispose arrays when override is specified", () => {
  const tempO = {};
  const temp = [{},{},tempO];
  let gotDisposed = false;
  gc.onDispose(tempO, () => gotDisposed = true);
  gc.onDispose(temp, () => {});
  gc.dispose(temp);
  expect(gotDisposed).toBe(false);
})

test("Does not recursively dispose Objects when no override is specified", () => {
  const tempO = {};
  const temp = {a:{},b:{},c:tempO};
  let gotDisposed = false;
  gc.onDispose(tempO, () => gotDisposed = true);
  gc.onDispose(temp, () => {});
  gc.dispose(temp);
  expect(gotDisposed).toBe(false);
})


test("Recursively disposes Objects when override is specified, and manually told to recurse", () => {
  const tempO = {};
  const temp = {a:{},b:{},c:tempO};
  let gotDisposed = false;
  gc.onDispose(tempO, () => gotDisposed = true);
  gc.onDispose(temp, () => {});
  gc.onDisposeDisposeRecursively(temp);
  gc.dispose(temp);
  expect(gotDisposed).toBe(true);
})

test("Wrapped function can be invoked, passing arguments in when not disposed", () => {
  let gotArgs: any[]=[];
  const wrapper = gc.createDisposeableFunctionWrapper((a,b,c)=>gotArgs=[a,b,c]);
  wrapper(1,2,3);
  expect(gotArgs).toEqual([1,2,3]);
})

test("Wrapped function can be invoked, passing return values out when not disposed", () => {
  const wrapper = gc.createDisposeableFunctionWrapper(()=>5);
  expect(wrapper()).toBe(5);
})

test("Wrapped function can be invoked, passing exceptions out when not disposed", () => {
  const wrapper = gc.createDisposeableFunctionWrapper(()=>{throw new Error()});
  expect(wrapper).toThrow();
})

test("wrapped function cannot be invoked once disposed, throw an error if not silent", () => {
  let gotInvoked: boolean = false;
  const wrapper = gc.createDisposeableFunctionWrapper(()=>gotInvoked = true);
  gc.dispose(wrapper);
  expect(wrapper).toThrow();
  expect(gotInvoked).toBe(false);
})

test("wrapped function cannot be invoked once disposed, throw an error with a specific message when specified", () => {
  let gotInvoked: boolean = false;
  const wrapper = gc.createDisposeableFunctionWrapper(()=>gotInvoked = true, "Test");
  gc.dispose(wrapper);
  let message: string="";
  try {
    wrapper();
  }
  catch(err) {
    message = err.message;
  }
  expect(message).toBe("Test");
  expect(gotInvoked).toBe(false);
})

test("wrapped function cannot be invoked once disposed, throw an error if not silent", () => {
  let gotInvoked: boolean = false;
  const wrapper = gc.createDisposeableFunctionWrapper(()=>gotInvoked = true, undefined, true);
  gc.dispose(wrapper);
  const value = wrapper();
  expect(value).toBe(undefined);
  expect(gotInvoked).toBe(false);
})

test("create wrapped function throws an error if no function specfied", () => {
  const test = ()=> gc.createDisposeableFunctionWrapper(null as any);
  expect(test).toThrow();
})

test("create wrapped function throws an error if both message and silent are specified", () => {
  const test = ()=> gc.createDisposeableFunctionWrapper(() => {}, "Test", true);
  expect(test).toThrow();
})

test("Calling dispose on an already disposed object has no effect", () => {
  const foo = {};
  let countInvoke = 0;
  gc.onDispose(foo, () => countInvoke++);
  gc.dispose(foo);
  gc.dispose(foo);
  expect(countInvoke).toBe(1);
})

test("Calling onDispose on an already disposed object immediately invokes the callback", () => {
  const foo = {};
  let didInvoke = false;
  gc.dispose(foo);
  gc.onDispose(foo, ()=> didInvoke = true);
  expect(didInvoke).toBe(true);
})

test("Chains of objects do get disposed", () => {
  const a = {};
  const b = {};
  const c = {};
  gc.onDisposeChain(a,b);
  gc.onDisposeChain(b,c);
  let didInvoke = false;
  gc.onDispose(c, () => didInvoke = true);
  gc.dispose(a);
  expect(didInvoke).toBe(true);
})