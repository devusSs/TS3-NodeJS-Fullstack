# Request structure

Make sure to set `with-credentials` to true in your app and request.
The refresh cookie will be send automatically.

# Response structure

## Success

```json
{
  "code": 204,
  "data": {},
  "timestamp": "2023-01-25T19:24:10.214047112"
}
```

This will also clear the refresh cookie.

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
