---
layout: default
title: Libraries and assets · Foundry Developer
permalink: "/manifest-resources.html"
---
{% raw %}
<div class="breadcrumbs">
<a href="index.html">Foundry Developer</a><span>›</span><span>Info.plist</span>
</div>
<p class="eyebrow">Info.plist</p>
<h1>Libraries and assets</h1>
<p class="lede">Use libraries for Foundry-managed web dependencies and assets for component-owned files that templates reference but do not process as source templates.</p>

<h2>libraries</h2>
<section class="reference-entry">
<h3>libraries</h3>
<div class="api-meta">
<span class="pill">Dictionary array</span><span class="pill">Optional</span><span class="pill">Default: []</span>
</div>
<p>Requests a web library supplied by Foundry. Foundry includes a requested library only when the site uses a component that declares it, and deduplicates the same request across components.</p>
<p>Foundry provides the locally bundled Bootstrap Icons library as <code>com.foundry.icons</code>, major version <code>1</code>. Third-party components request it; they do not bundle or download their own copy.</p>


<div markdown="1">

```xml
<key>libraries</key>
<array>
    <dict>
        <key>id</key><string>com.foundry.icons</string>
        <key>majorVersion</key><integer>1</integer>
    </dict>
</array>
```

</div>


<p>After declaring the library, use Bootstrap Icons classes in markup, for example <code>&lt;i class="bi bi-alarm"&gt;&lt;/i&gt;</code>. To let authors choose the icon, add Foundry’s searchable <a href="icon-control.html"><code>icon</code> custom control</a>.</p>
</section>

<h2>assets</h2>
<section class="reference-entry">
<h3>assets</h3>
<div class="api-meta">
<span class="pill">Dictionary array</span><span class="pill">Optional</span><span class="pill">Default: []</span>
</div>
<p>Lists component-owned resources that templates use without processing them as templates—for example images, fonts, JSON, video, or a PHP endpoint. Each array entry must be a dictionary representing one file or folder to publish. Bare string entries are not accepted.</p>


<div markdown="1">

```xml
<key>assets</key>
<array>
    <dict>
        <key>path</key><string>images/badge.svg</string>
    </dict>
    <dict>
        <key>path</key><string>data/defaults.json</string>
    </dict>
</array>
```

</div>


<p>Reference a declared asset with <code>{{ asset.&lt;path&gt; }}</code>:</p>


<div markdown="1">

```xml
<img src="{{ asset.images/badge.svg }}" alt="">
```

</div>


<dl class="syntax-list">
<dt><code>path</code></dt>
<dd>Required. A safe path relative to <code>Contents/Resources</code>. It must identify an existing file or folder.</dd>
<dt><code>scope</code></dt>
<dd>Optional. Accepts <code>page</code> or <code>site</code> and defaults to <code>page</code> when omitted.</dd>
</dl>
<p>Foundry publishes a page asset once in that page’s <code>files/</code> directory, regardless of how many component instances use it. A declared file publishes using only its filename; a declared directory publishes recursively and retains the directory name.</p>
<p>Use <code>site</code> scope to publish an asset once for the entire website:</p>


<div markdown="1">

```xml
<dict>
    <key>path</key><string>shared/icons</string>
    <key>scope</key><string>site</string>
</dict>
```

</div>


<p>Foundry publishes site assets once below the website’s global <code>assets/</code> directory, preserving the declared path. They are not component-namespaced, so any template can use a known path with <code>{{ path.siteAssets }}/shared/icons/star.svg</code>.</p>
<div class="callout warning">
<strong>Site asset paths are shared.</strong> Identical files targeting the same path are deduplicated. Different contents targeting the same path stop preview and publishing with an error.</div>
</section>

<h2>requiresPhp</h2>
<section class="reference-entry">
<h3>requiresPhp</h3>
<div class="api-meta">
<span class="pill">Boolean</span><span class="pill">Optional</span><span class="pill">Default: false</span>
</div>
<p>Declares that the component needs PHP-capable hosting. When <code>true</code>, every page containing the component uses a <code>.php</code> extension. Set it when the component declares a PHP template or a PHP asset, including a separate endpoint called by JavaScript.</p>


<div markdown="1">

```xml
<key>requiresPhp</key>
<true/>
```

</div>


<div class="callout warning">
<strong>Keep the declaration explicit.</strong> A <code>.php</code> file alone does not replace this key. <code>requiresPhp</code> is the component’s statement that the page and its hosting environment require PHP.</div>
</section>

<h2>Template files are not assets</h2>
<p>Put a file under <code>templates</code> when Foundry should process its macros and emit its result. Put it under <code>assets</code> when Foundry should copy it as a resource. A path should not be declared in both places.</p>
<div class="rule-summary">
    <div>
<strong>Template</strong><span>Foundry reads and processes the source.</span>
</div>
    <div>
<strong>Asset</strong><span>Foundry publishes the packaged file.</span>
</div>
    <div>
<strong>Library</strong><span>Foundry supplies and deduplicates the dependency.</span>
</div>
</div>

<div class="page-links">
    <a class="card" href="templates.html"><strong>Template files</strong><p>See the supported source file types and scopes.</p></a>
    <a class="card" href="template-values.html"><strong>Asset template values</strong><p>Use declared assets safely from component markup and styles.</p></a>
</div>
{% endraw %}
