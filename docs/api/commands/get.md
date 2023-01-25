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
        "Name": "string",
        "Output": "string",
        "Userlevel": "string",
        "Added": "2023-01-11T15:11:35.448Z",
        "UserAdded": "string",
        "Edited": null,
        "UserEdited": null
      },
      {
        "ID": "string",
        "Name": "string",
        "Output": "string",
        "Userlevel": "string",
        "Added": "2023-01-11T15:11:35.448Z",
        "UserAdded": "string",
        "Edited": "2023-01-11T15:11:35.448Z",
        "UserEdited": "2023-01-11T15:11:35.448Z"
      }
    ]
  },
  "timestamp": "2023-01-25T19:05:51.638951331"
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
