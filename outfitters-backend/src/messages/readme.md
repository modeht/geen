# Messages WebSocket API Documentation

## Overview

This document describes the WebSocket API for real-time messaging through the endpoint `{{baseUrl}}/messages`. The API supports events related to messages, errors, and reactions.

### Headers

Authorization : Bearer <"authToken">\
Regular authorization token, Failing to connet means there is a problem with the auth token

### Events

Once connected to the WebSocket, the following events can be received:

- **messages**: Event triggered when a new message is received.
- **errors**: Event triggered when an error occurs in the WebSocket request, if acknowledgment is provided then the error will be returned through it instead of this event.
- **reactions**: Event triggered when a reaction is added/removed to one of the user messages.

### Sending WS Messages

You can send the following types of messages through the WebSocket:

- **sendMessage**: Send a new message to the server.
- **readMessage**: Mark a message as read.
- **sendReaction**: Add a reaction to a message.

### Websocket messages body:

#### sendMessage:

```
{
    "recipientId": "<number>",
    "content": "<string>",
    "mediaIds": [
        "<number>",
        "<number>"
    ]
}
```

```
recipientId: The id of the user to receive the message
content: The message itself
mediaIds: The ids of pictures/videos in the messgae (optional)
```

#### readMessage:

```
{
    "messageId": "<number>",
}
```

```
messageId: The ID of the message to be marked as read
```

#### sendReaction:

```
{
    "messageId": "<number>",
    "reaction": "<string>"
}
```

```
messageId: The id of the message to update its reaction
reaction: The unicode representing the reaction
```
