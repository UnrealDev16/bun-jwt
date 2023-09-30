# bun-jwt
JWT for Bun

# How to add this to your project
1. ```curl https://raw.githubusercontent.com/UnrealDev16/bun-jwt/main/JWT.js```
2. Add 
```js
import { createJWT, verifyJWT } from "path-to-JWT.js"
```

# How to use
## Creating Token
```js
const token = createJWT({
    "name": "John Doe"
}, 86400) //createJWT(payload,expirationTimeInSeconds)
```

## Verifying Token
```js
const payload = verifyJWT(token)
```
