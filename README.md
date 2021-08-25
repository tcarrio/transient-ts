[![npm (scoped)](https://img.shields.io/npm/v/@0xc/transient)](https://www.npmjs.com/package/@0xc/transient)
[![npm](https://img.shields.io/npm/dt/@0xc/transient)](https://www.npmjs.com/package/@0xc/transient)
[![GitHub issues](https://img.shields.io/github/issues/tcarrio/transient-ts)](https://github.com/tcarrio/transient-ts/issues)
[![GitHub pull requests](https://img.shields.io/github/issues-pr/tcarrio/transient-ts)](https://github.com/tcarrio/transient-ts/pulls)
![Dependencies](https://img.shields.io/david/tcarrio/transient-ts)

# @0xc/transient

This package provides a `@transient` decorator, similar to the `transient` keyword in Java.

Marking a property in a class with the `@transient` operator will ignore serialization of that property when using the native `JSON.stringify(object)`.

This is useful if you would prefer to redact properties for objects going over the wire, such as with `fetch` and others which make use of `JSON.stringify`.

## example

To get started using the `transient` decorator, you can import it from the library:

```typescript
import { transient } from "@0xc/transient";

export class UserDto {
    public firstName: string;

    public lastName: string;

    public email: string;

    @transient()
    public password: string;

    public static fromModel(userModel: UserModel): UserDto {
        const userDto = new UserDto();
        this.firstName = userModel.firstName;
        this.lastName = userModel.lastName;
        this.email = userModel.email;
        this.password = userModel.password;
        return userDto;
    }
}
```

In this scenario, we have a User DTO which will no longer serialize when calling `userDto.toJSON()`. Perhaps this is used a backend service which we would prefer to not return this field when serializing a response back to users.

```typescript
app.get("/user", (req, res) => {
    const userModel = UserRepository.findOne(req.session.id);
    const userDto = UserDto.fromModel(userModel);
    res.send(userDto);
});
```

**Ta-da!** Now the response should look like:

```json
{
    "firstName": "Ricky",
    "lastName": "Bobby",
    "email": "shake@bake.net"
}
```
