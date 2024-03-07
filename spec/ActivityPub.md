# ActivityPub

A decentralized social networking protocol based upon the ActivityStreams 2.0 data format and JSON-LD. Pixelfed uses ActivityPub to send and recieve activities from other Pixelfed servers and other fediverse software like Mastodon.

## Context

::: details Click to expand status context example
<<< @/snippets/activitypub/status_context.json
:::


## Actors

::: details Click to expand actor example
<<< @/snippets/activitypub/actor_object.json
:::

::: details Click to expand actor attributes
| Field        |      Type      |  Description |
| ------------- | :-----------: | -----------: |
| id      | String | ID of the user |
| type     |   String    | The object type, always set to `Person` |
| following |   String    | The [`following`](#following) collection |
| followers |   String    | The [`followers`](#followers) collection |
| inbox |   String    | The `inbox` collection |
| outbox |   String    | The [`outbox`](#outbox) collection |
| preferredUsername |   String    | The account username |
| name |   String    | The account display name |
| summary |   String    | The account bio, may contain HTML |
| url |   String    | The account url |
| manuallyApprovesFollowers |   Boolean    | If the account is private, this value is set to `true` |
| indexable |   Boolean    | If the account allows crawling, this value is set to `true` |
| publicKey |   Object    | The public key data used for federation |
| icon |   Object    | The account avatar object |
| endpoints |   Object    | The `sharedInbox` will be set if configured |
| alsoKnownAs | Array | A list of account aliases if applicable |
:::

## Activities

Supported ActivityPub Activities

::: details Click to expand Activities

### Accept

`object.type` if `Follow` is transformed into a `FollowRequest` or `Follow` model.

### Add

If `type` is `Story` then `object` object is transformed into `Story` model.

### Announce

`object` object is transformed into a `reblog_of_id` `Status` model.

### Create

`Note` and `Question` objects are transformed into `statuses` database models.

### Delete

`Person`, `Tombstone` and `Story` objects with cached models are deleted.

### Flag

Used for federated Reports.

### Like

`object` object is transformed into a `StatusLike` model.

### Reject

Used to reject or deny `FollowRequest`.

### Story:Reaction

Transformed into `StoryReaction` model.

### Story:Reply

Transformed into `StoryReaction` model.

### Update

Used for ...

### Undo

Used for ...

### View

Transformed into `StoryView` model.
:::

## Collections

### Following

The user `following` collection is comprised of accounts that this account follows. You may use the `totalItems` to get the following count for this account, it may return `0` if the account has opted to hide their following.

::: details Click to expand following example
<<< @/snippets/activitypub/following_collection.json
:::

### Followers

The user `followers` collection is comprised of accounts that follow this account. You may use the `totalItems` to get the followers count for this account, it may return `0` if the account has opted to hide their followers.

::: details Click to expand followers example
<<< @/snippets/activitypub/followers_collection.json
:::

### Outbox

The user `outbox` collection is comprised of statuses authored by this account. You may use the `totalItems` to get the status count for this account, it may return `0` if the account is private.

::: details Click to expand outbox example
<<< @/snippets/activitypub/outbox_collection.json
:::

## Objects

### Accept

#### Accept.Follow

Approve/accept follow requests

::: details Click to expand
<<< @/snippets/activitypub/accept_follow.json
:::

### Announce

Announce (also known as boosting or re-tooting) a status to your followers

::: details Click to expand
<<< @/snippets/activitypub/announce.json
:::

### Add

#### Add.Story

This object is used for federating new Stories, and uses Bearcaps. We currently deliver this activity to known Pixelfed instances only.

::: details Click to expand
<<< @/snippets/activitypub/add_story.json
:::

### Create

#### Create.Note

Share a new status to your followers.

::: details Click to expand
<<< @/snippets/activitypub/create_note.json
:::

### Delete

#### Delete.Note

Delete a status by the object id.

::: details Click to expand
<<< @/snippets/activitypub/delete_note.json
:::

#### Delete.Story

Delete a story by the object id.

::: details Click to expand
<<< @/snippets/activitypub/delete_story.json
:::

### Follow

Follow a specific account as described by the `object` attribute.

::: details Click to expand
<<< @/snippets/activitypub/follow.json
:::

### Like

Like a specific status as described by the `object` attribute.

::: details Click to expand
<<< @/snippets/activitypub/like.json
:::

### Reject

#### Reject.Follow 

Reject/deny a follow request by the `actor`.

::: details Click to expand
<<< @/snippets/activitypub/reject_follow.json
:::

### Undo

#### Undo.Announce

Undo the announce/boost activity as described by the `object.object` attribute.

::: details Click to expand
<<< @/snippets/activitypub/undo_announce.json
:::

#### Undo.Follow

::: details Click to expand
<<< @/snippets/activitypub/undo_follow.json
:::

#### Undo.Like

::: details Click to expand
<<< @/snippets/activitypub/undo_like.json
:::

### Update

#### Update.Note

::: details Click to expand
<<< @/snippets/activitypub/update_note.json
:::

#### Update.Person

::: details Click to expand
<<< @/snippets/activitypub/update_person.json
:::

## Extensions

### Blurhash

Pixelfed supports the [blurhash](https://blurha.sh) algorithm to generate efficient image previews to show as a placeholder while content is loading, or for sensitive statuses.

::: details Click to expand blurhash example
<<< @/snippets/activitypub/blurhash_note.json
:::

### Capabilities (Comment Controls)

Pixelfed supports basic comment controls, allowing users to disable `Announce`, `Like` and reply activities. The `announce`, `like` and `reply` attributes will be either `NULL` or `https://www.w3.org/ns/activitystreams#Public` to represent basic ACL.

::: details Click to expand capabilities example
<<< @/snippets/activitypub/note_capabilities.json
:::

### Content Warnings

Pixelfed employs the `as:sensitive` extension property, similar to Mastodon, for indicating sensitive content in posts. When this property is applied to a post in Pixelfed, any associated media will be concealed by default. Additionally, if the post includes a summary, the main content of the post will be collapsed behind this summary, functioning as a content warning. This feature ensures that sensitive material is not immediately visible to viewers, requiring an action to view it.

::: details Click to expand content warnings example
<<< @/snippets/activitypub/note_sensitive.json
:::

### Custom Emoji

Pixelfed, akin to [Mastodon](https://docs.joinmastodon.org/spec/activitypub/#Emoji), accommodates custom emojis through the integration of an `Emoji` type tag. This feature operates similarly to the handling of mentions and hashtags. 

In this system, the custom emoji is recognized as a substring within the natural language elements (such as the name, summary, or content) of a post. This substring, representing the emoji's shortcode, is then dynamically linked to its corresponding visual representation. Specifically, the shortcode name is substituted in the post with the HTML code for an inline image, which is derived from the icon property of the emoji. The icon's URL directly links to the image resource, ensuring that the custom emoji is properly displayed within the content.

::: details Click to expand custom emoji example
<<< @/snippets/activitypub/custom_emoji.json
:::

### Location (Geo-tagging)

Pixelfed supports location geo-tagging statuses by selecting a location from a shared dataset. The `location` object contains a `type` attribute which is always `Place`, a `name` attribute of the location city, the `longitude` and `latitude` attributes describe the geographic location and finally the `country` attribute is the location country. 

::: details Click to expand location example
<<< @/snippets/activitypub/location_note.json
:::

## Authorized Fetch

Pixelfed, like other platforms in the Fediverse including Mastodon, uses digital signatures to ensure secure and authenticated federation requests. This compatibility with Mastodon's Authorized Fetch protocol is a crucial aspect of maintaining a secure and interoperable federated network. 

::: details Click to learn more

Here's how Pixelfed signs federation requests to align with Mastodon's Authorized Fetch mechanism:

1. **HTTP Signatures**: Pixelfed employs HTTP Signatures to sign federation requests. This is a standard method used across the Fediverse for authenticating HTTP requests, ensuring that the request is sent by a known and verified entity.

2. **Digital Signature Creation**: When Pixelfed sends a federation request (like a post or an activity), it generates a digital signature using the private key of the sending user or server. This signature is unique to each request and is based on the content of the HTTP request.

3. **Including Public Key Information**: Pixelfed includes information in its federation requests about how to find the public key needed to verify the signature. This is usually a URL pointing to an actor's profile where the public key can be fetched.

4. **Verification on the Receiving End**: When Mastodon, or any other compatible platform in the Fediverse, receives a request from Pixelfed, it uses the provided information to fetch the public key and verify the signature. This process ensures that the request is indeed from the claimed source and has not been tampered with during transmission.

5. **Timestamps and Replay Prevention**: To prevent replay attacks, Pixelfed includes timestamps in its signed requests. Mastodon and other platforms check these timestamps to ensure that the request is recent and not a replay of an old request.

6. **Compliance with ActivityPub Protocol**: Both Pixelfed and Mastodon adhere to the ActivityPub protocol, which standardizes the way federated services communicate. The use of HTTP Signatures for authentication is a part of this protocol.

7. **Authorized Fetch Compatibility**: For Mastodon's Authorized Fetch, when Pixelfed sends a request to Mastodon (like accessing a post or user data), Mastodon checks the signature to authenticate the request. Only if the signature is valid and the request is authorized, Mastodon will fulfill the request, aligning with its privacy and security standards.

By following these steps, Pixelfed ensures that its federation requests to Mastodon and other Fediverse platforms are secure, authenticated, and in line with the privacy standards set by these platforms. This method effectively maintains user privacy and data integrity across different services in the federated network.
:::

<!-- ## Delivery -->

<!-- ## Shared Inbox -->