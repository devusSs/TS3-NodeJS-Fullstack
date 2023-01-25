# Request structure

Make sure to set `with-credentials` to true in your app and request.
The refresh cookie will be send automatically.

# Response structure

## Success

```json
{
  "code": 200,
  "data": {
    "username": "string",
    "token": "token",
    "timestamp": "2023-01-25T19:24:10.214047112"
  },
  "timestamp": "2023-01-25T19:24:10.214047112"
}
```

## Error

```json
{
  "code": 400,
  "error": {
    "message": "Invalid token provided"
  },
  "timestamp": "2023-01-25T19:24:10.214047112"
}
```

or

```json
{
  "code": 401,
  "error": {
    "message": "Missing token"
  },
  "timestamp": "2023-01-25T19:24:10.214047112"
}
```

or

```json
{
  "code": 404,
  "error": {
    "message": "User not found"
  },
  "timestamp": "2023-01-25T19:24:10.214047112"
}
```
