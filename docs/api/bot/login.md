# Request structure

```json
{
  "username": "string",
  "password": "string"
}
```

# Response structure

## Success

```json
{
  "code": 200,
  "data": {
    "username": "string",
    "token": "string",
    "expires_in": 1200000
  },
  "timestamp": "2023-01-25T19:05:40.598936331"
}
```

## Error

```json
{
  "code": 401,
  "error": {
    "message": "Invalid username or password."
  },
  "timestamp": "2023-01-25T19:17:52.036671451"
}
```
