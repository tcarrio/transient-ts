# transient-ts

This package provides a `@transient` decorator, similar to the `transient` keyword in Java.

Marking a property in a class with the `@transient` operator will ignore serialization of that property when using the native `JSON.stringify(object)`.

This is useful if you would prefer to redact properties for objects going over the wire, such as with `fetch` and others which make use of `JSON.stringify`.