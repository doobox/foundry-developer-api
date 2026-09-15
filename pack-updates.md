---
layout: default
title: Pack updates · Foundry Developer
permalink: "/pack-updates.html"
---
{% raw %}
{% endraw %}{% include breadcrumbs.html %}{% raw %}
<p class="eyebrow">Reference · Pack updates</p>
<h1>Publishing updates</h1>
<p class="lede">Publish signed releases of a development pack so installed copies can discover and install newer versions.</p>

## Before you start

Use a `.foundrydevpack` as your development source and distribute `.foundrypack` releases. Keep the pack's `id` stable between releases. The updater replaces the complete pack, not individual files inside it.

Configure the project's Publishing Settings and public URL for the update host. The built-in workflow publishes an `appcast.php` endpoint, so that host must execute PHP and serve the endpoint and downloads over HTTPS. A static-only host cannot run this generated endpoint.

## Prepare the pack

1. Open Foundry's developer release view and select the **Development Pack**.
2. Check the **Publishing URL** shown under **Prepare for Updates**.
3. Choose **Prepare and Publish Endpoint**.

Foundry creates a signing identity in the macOS Keychain, publishes and checks the endpoint, and then writes the pack's [update configuration](manifest-identity.html#updates). Its public key goes into the pack; the private key stays in Keychain.

Prepare the pack before distributing the first copy that should receive updates. A previously distributed pack without update configuration cannot discover this feed automatically.

Keep the signing identity available for subsequent releases. A different identity cannot sign updates accepted by installed copies using the original public key. Do not share the private key or put it in a pack or on the update host.

## Issue a release

Select the prepared development pack, enter a **Release Version**, and add at least one non-empty release note. The version must be a valid semantic version newer than both the development pack's version and every version already in its published feed.

Use the release publishing action in Foundry. It creates a `.foundrypack` copy, sets its release version, archives and signs it, then publishes the release directory and verifies that the endpoint exposes that version.

The published directory contains:

```text
<pack-id>/
  appcast.php
  <pack-id> <version>/
    <pack-id> <version>.foundrypack.zip
    release.json
    release-notes.html
```

The generated endpoint collects release metadata into the [appcast response](pack-appcast.html). Keep the release directories and their filenames intact. Do not edit or re-zip a signed archive: changing its bytes invalidates its checksum and signature. Make a new release instead.

Publishing settings must still resolve to the endpoint recorded in the pack. If they have changed, restore them or prepare the pack again. Moving the endpoint does not update the URL in copies that users already have; keep their existing feed available.

## What installed copies accept

Foundry selects the highest newer semantic version whose `minimumAPIVersion` it supports. Before installing, it checks the archive size, SHA-256 digest and publisher signature. The archive must contain exactly one top-level `.foundrypack`; its pack ID, version and public key must match the expected release.

Treat stable part IDs and existing saved property values as part of your compatibility contract. Signing confirms who published the archive; it does not make a breaking part change compatible with existing projects.
{% endraw %}
