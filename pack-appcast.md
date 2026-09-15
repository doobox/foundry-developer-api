---
layout: default
title: Pack appcast · Foundry Developer
permalink: "/pack-appcast.html"
---
{% raw %}
{% endraw %}{% include breadcrumbs.html %}{% raw %}
<p class="eyebrow">Reference · Pack updates</p>
<h1>Appcast format</h1>
<p class="lede">The HTTPS appcast endpoint returns JSON describing the pack's available signed releases.</p>

Foundry's publishing workflow generates this information. The example below illustrates the response schema; the checksum, signature and file size must come from the actual release archive, not these placeholders.

```json
{
  "formatVersion": 1,
  "packID": "com.example.layout",
  "releases": [
    {
      "version": "1.0.1",
      "publishedAt": "2026-09-14T12:00:00Z",
      "minimumAPIVersion": 1,
      "downloadURL": "https://example.com/updates/layout/layout-1.0.1.zip",
      "releaseNotesURL": "https://example.com/updates/layout/release-notes.html",
      "fileSize": 12345,
      "sha256": "<SHA-256 hex digest of the ZIP>",
      "signature": "<Base64 Ed25519 signature of the ZIP>"
    }
  ]
}
```

## Appcast fields

- `formatVersion` — required Integer. Must be `1`.
- `packID` — required String. Must match the installed pack's `id`.
- `releases` — required array of release objects. An empty array represents no published releases.

## Release fields

- `version` — required semantic-version String. Only versions newer than the installed version are candidates.
- `publishedAt` — required ISO 8601 date String. Use UTC, as in the example. Selection uses semantic version order, not publication date.
- `minimumAPIVersion` — required Integer. Releases requiring a newer API than the installed Foundry supports are skipped.
- `downloadURL` — required HTTPS URL String pointing to the signed ZIP archive.
- `releaseNotesURL` — optional URL String pointing to release notes; omit when unavailable. Foundry's publisher generates this page.
- `fileSize` — required Integer: the exact archive size in bytes.
- `sha256` — required String: the SHA-256 hexadecimal digest of the complete archive. Verification is case-insensitive.
- `signature` — required String: a Base64-encoded Ed25519 signature over the complete archive bytes, verified using the public key installed with the pack.

## Hosting and integrity

Serve the appcast and archive URLs over HTTPS. An appcast endpoint may serve static JSON when managed outside Foundry's built-in publishing workflow; that workflow specifically expects its generated `appcast.php` endpoint.

The downloaded archive must contain exactly one top-level `.foundrypack`. Its manifest version must equal the release version, its ID must match `packID`, and its update public key must remain the trusted public key. Updating the feed alone cannot rotate that key.
{% endraw %}
