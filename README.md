# Dispose
A tiny library to register callbacks on objects so that they get properly disposed at a later time even if you have complex trees of objects.  What makes this library special enough to post is that instead of modifying the class that define the objects themselves it uses on the decorator pattern to modify objects on the fly.  This means you can attach behaviour to objects coming from libraries and frameworks and even other parts of your own code.  You can also directly attach behaviour to arrays and maps of objects as well.  

The real advantage comes when you're dealing with large trees of objects and/or objects communicating between multiple contexts.  Local user wants to disconnect?  Dispose the connection to send a goodbye message and then clean up your local resources.  Remote user sent a goodbye message?  Dispose your connection to clean up your resources locally for no added effort.  Session Timed out? network errors? Any of these you can just call dispose and trust that your objects will disconnect themselves gracefully without having to handle all the edge cases yourself.  Each small piece of code handles disposing itself properly, and anyone in the code can trigger the dispose without needing knowledge of how that will work.

[View API Docs](docs/modules.md)

# Installation
    npm install --save @tobes31415/dispose

# Basic Useage
    import { onDispose, dispose } from "@tobes31415/dispose"
    
    onDispose(foo, () => {
      //release resources
      //disconnect from servers, etc
    });
    
    dispose(foo);