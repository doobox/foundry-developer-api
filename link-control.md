---
layout: default
title: Link control · Foundry Developer
permalink: "/link-control.html"
---
{% raw %}
<div class="breadcrumbs">
<a href="index.html">Foundry Developer</a><span>›</span><a href="info-plist.html">Info.plist</a><span>›</span><a href="custom-controls.html">Custom controls</a>
</div>
<p class="eyebrow">Info.plist · customItems</p>
<h1>Link control</h1>
<p class="lede">The structured link editor supports URLs, plain text, project pages and project resources, with anchors, new-window behaviour and custom attributes.</p>
<h2>Manifest</h2>

<div markdown="1">

```xml
<key>type</key><string>link</string>
    <key>absoluteURL</key><true/>
```

</div>

<p>Page and resource destinations are stored by stable ID and resolve to their current exported path. When <code>absoluteURL</code> is enabled, internal destinations use the Site URL configured in Project Settings. Missing or invalid Site URLs safely fall back to relative paths.</p>
<h2>Templates</h2>
<dl>
<dt><code>{{ control.destination }}</code></dt>
<dd>Resolved href, including any anchor.</dd>
<dt><code>{{ control.destination.target }}</code></dt>
<dd>
<code>_blank</code> when Open in New Window is enabled; otherwise empty.</dd>
<dt><code>{{ control.destination.attributes }}</code></dt>
<dd>Validated, HTML-escaped custom attributes ready to place in an element.</dd>
</dl>

```xml
<a href="{{ control.destination }}"
   target="{{ control.destination.target }}"
   {{ control.destination.attributes }}>Read more</a>
```
{% endraw %}
