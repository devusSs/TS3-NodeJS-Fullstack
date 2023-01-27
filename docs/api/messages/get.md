# Needed header for authorization

`Authorization: Bearer <token>`

# Response structure

## Success

```json
{
  "code": 200,
  "data": {
    "result": [
      {
        "ID": "string",
        "InvokerNick": "string",
        "InvokerDBID": "string",
        "InvokerUID": "string",
        "InvokerIP": "string",
        "Message": "string",
        "Targetmode": "string",
        "DateTime": "2023-01-12T14:20:03.345Z"
      }
    ]
  },
  "timestamp": "2023-01-25T19:09:05.591141364"
}
```

## Error

```json
{
  "code": 403,
  "error": {
    "message": "string"
  },
  "timestamp": "2023-01-25T19:03:58.370836215"
}
```

or

```json
{
  "code": 404,
  "error": {
    "message": "string"
  },
  "timestamp": "2023-01-25T19:03:58.370836215"
}
```
