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
        "TSID": "string",
        "FirstUsername": "string",
        "LatestUsername": "string",
        "FirstIP": "string",
        "LatestIP": "string",
        "FirstConnection": "2023-01-10T00:38:59.964Z",
        "LatestConnection": "2023-01-14T13:30:49.958Z",
        "LatestDisconnect": "2023-01-14T13:31:02.277Z",
        "Country": "string",
        "Version": "string",
        "Platform": "string",
        "UniqueID": "string"
      }
    ]
  },
  "timestamp": "2023-01-25T19:10:57.483256384"
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
