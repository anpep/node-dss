# node-dss

dead simple signalling for webrtc.

## Usage
```
dss [port]

dead-simple signaler

Positionals:
  port  Port to bind on                                 [number] [default: 3000]

Options:
  --version      Show version number                                   [boolean]
  --help         Show help                                             [boolean]
  --verbose, -v  Display signaling traces for debugging                [boolean]
  --debug, -d    Display debugging traces for all modules              [boolean]
```

## Why

Think of this as a message broker service. It allows you to pass messages to a predetermined reciever. We use this as a lightweight replacement for a signalling server, where both clients have known identities. This saves us from the more complex logic of tracking live clients, and communicating peer 'join' and 'leave' events.

### Check for a message

Use `GET` to `/data/:id` where `:id` identifies your client

#### No messages for you

```
GET /data/user1 HTTP/1.1
Host: localhost:3000

404

<emptyBody>
```

#### You have a message

```
GET /data/user1 HTTP/1.1
Host: localhost:3000

200

<message data>
```

### Post a message

Use `POST` to `/data/:id` where `:id` identifies the destination client. The body is your message. MIME not required.

#### Message uploaded

```
POST /data/user1 HTTP/1.1
Host: localhost:3000

<message data>

200

<emptyBody>
```

## License

MIT
