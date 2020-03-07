# Dispose
A tiny library to register callbacks on objects so that they get properly disposed at a later time even if you have complex trees of objects

npm install --save @tobes31415/dispose

# Basic Useage
    import { onDispose, dispose } from "@tobes31415/dispose"
    
    onDispose(foo, () => {
      //release resources
      //disconnect from servers, etc
    });
    
    dispose(foo);

# Advanced Useage
    import { isDisposed, assertNotDisposed, createDisposeableFunctionWrapper, dispose } from "@tobes31415/dispose"
    
    if (isDisposed(foo)) {
        foo = new Foo();
    }
    
    assertNotDisposed(bar); //throws exception if bar has been disposed
    
    const baz = createDisposeableFunctionWrapper( (a,b,c) => return a*b + c );
    baz(1,2,3) //outputs 5
    
    dispose(baz);
    baz(1,2,3) // throws an exception
    
