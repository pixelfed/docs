+++
title = "ActivityPub"
summary = "Information about how Pixelfed federates"
[menu]
[menu.docs]
identifier = "tech/activitypub"
parent = "tech"
+++

{{<hint style="warning">}}
**WIP**

This document is not yet finished.
{{</hint>}}

Pixelfed largely follows the ActivityPub server-to-server specification but it makes uses of some non-standard extensions, some of which are required for interacting with Pixelfed at all.

[[toc]]

## Caveats

### TLS & URL Validation

In Pixelfed, all activity object uris MUST begin with `https://`

### sharedInbox

In Pixelfed, users have an `inbox` and a communal `sharedInbox`. Other implementations MAY consolidate activity delivery to the `sharedInbox` rather than each individual user `inbox`.

### Instance Actor

An instance-wide actor is used in Pixelfed to sign `GET` requests to remote instances. The actor type is **Application** to differentiate from the **Person** type typically used by regular accounts.

```json
{
    "@context": "https://www.w3.org/ns/activitystreams",
    "id": "https://example.org/i/actor",
    "type": "Application",
    "inbox": "https://example.org/i/actor/inbox",
    "outbox": "https://example.org/i/actor/outbox",
    "preferredUsername": "example.org",
    "publicKey": {
        "id": "https://example.org/i/actor#main-key",
        "owner": "https://example.org/i/actor",
        "publicKeyPem": "-----BEGIN PUBLIC KEY-----..."
    },
    "manuallyApprovesFollowers": true,
    "url": "https://example.org/site/kb/instance-actor"
}
```

## Extensions

### Webfinger

In Pixelfed, users are identified by a `username` and `domain` pair (e.g., `dansup@example.org`).
This is used both for discovery and for unambiguously mentioning users across the fediverse. Furthermore, this is part of Pixelfed's database design from its very beginnings.

As a result, Pixelfed requires that each ActivityPub actor uniquely maps back to an `acct:` URI that can be resolved via WebFinger.

More information and examples are available at: https://docs.joinmastodon.org/spec/webfinger/

### HTTP Signatures

In order to authenticate activities, Pixelfed relies on HTTP Signatures, signing every `POST` and `GET` request to other ActivityPub implementations on behalf of the user authoring an activity (for `POST` requests) or an actor representing the Pixelfed server itself (for most `GET` requests).

Pixelfed requires all `POST` requests to be signed, and MAY require `GET` requests to be signed, depending on the configuration of the Pixelfed server.

More information on HTTP Signatures, as well as examples, can be found here: https://docs.joinmastodon.org/spec/security/#http

## Hashtags

Hashtags are represented by the `type` **Hashtag** and contain a `href` and `name` attribute like the example below.

```json
{
    "type": "Hashtag",
    "href": "https://pixelfed.social/discover/tags/mazda",
    "name": "#mazda"
}
```

## Groups

## Posts

Posts are represented by the **Note** `type`. For more details see the [note](#note) section.

## Profiles

## Stories

## Activity Types

All Activity Types inherit the properties of the base Activity type. Some specific Activity Types are subtypes or specializations of more generalized Activity Types.

### Add

### Announce

### Accept

### Delete

### Create

Indicates that the actor has created the object. Supported object sub-types are **Note** and **Question**.

```json
{
  "@context": "https://www.w3.org/ns/activitystreams",
  "id": "https://example.org/p/dansup/2/activity",
  "type": "Create",
  "actor": "https://example.org/users/dansup",
  "object": {
    "id": "https://example.org/p/dansup/2",
    "type": "Note",
    "content": "This was my first IG post too...",
    ...
  }
}
```

### Follow

### Like

### Reject

### Undo

### Question

### Story:Reaction

### Story:Reply

### Update

### View

## Actor Types

### Person

## Object and Link Types

<!-- ### Article -->

<!-- ### Audio -->

### Document

<!-- ### Event -->

### Image

Images are used to represent `Status` media

```json
{
    "type": "Image",
    "mediaType": "image/jpeg",
    "url": "https://example.org/s/...8o12Ji1A2x.jpeg",
    "name": null
}
```

### Note

Notes are converted to `Status` models internally

```json
{
    "@context": [
        "https://www.w3.org/ns/activitystreams",
        "https://w3id.org/security/v1",
        {
            "sc": "http://schema.org#",
            "Hashtag": "as:Hashtag",
            "sensitive": "as:sensitive",
            "commentsEnabled": "sc:Boolean",
            "capabilities": {
                "announce": {
                    "@type": "@id"
                },
                "like": {
                    "@type": "@id"
                },
                "reply": {
                    "@type": "@id"
                }
            },
            "toot": "http://joinmastodon.org/ns#",
            "Emoji": "toot:Emoji"
        }
    ],
    "id": "https://example.org/p/dansup/2",
    "type": "Note",
    "summary": null,
    "content": "This was my first IG post too...",
    "inReplyTo": null,
    "published": "2018-06-01T05:16:51+00:00",
    "url": "https://example.org/p/dansup/2",
    "attributedTo": "https://example.org/users/dansup",
    "to": [
        "https://www.w3.org/ns/activitystreams#Public"
    ],
    "cc": [
        "https://example.org/users/dansup/followers"
    ],
    "sensitive": false,
    "attachment": [
        {
            "type": "Image",
            "mediaType": "image/jpeg",
            "url": "https://example.org/s/...Ji1A2x.jpeg",
            "name": null
        }
    ],
    "tag": [
        {
            "type": "Hashtag",
            "href": "https://example.org/discover/tags/mazda",
            "name": "#mazda"
        },
        {
            "type": "Hashtag",
            "href": "https://example.org/discover/tags/zoomzoom",
            "name": "#zoomzoom"
        }
    ],
    "commentsEnabled": false,
    "capabilities": {
        "announce": "https://www.w3.org/ns/activitystreams#Public",
        "like": "https://www.w3.org/ns/activitystreams#Public",
        "reply": null
    },
    "location": null
}
```

<!-- ### Page -->

<!-- ### Place
 -->
<!-- ### Tombstone -->

### Video

### Mention

## Troubleshooting

### Cloudflare

Instances behind cloudflare may experience federation issues depending on the configuration. Check to ensure the `/f/sharedInbox`