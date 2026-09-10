---
layout: default
title: Template files · Foundry Developer
permalink: "/templates.html"
---
{% raw %}
<div class="breadcrumbs">
<a href="index.html">Foundry Developer</a><span>›</span><span>Info.plist</span>
</div>
<p class="eyebrow">Info.plist template files</p>
<h1>Declare exactly the files your component uses</h1>
<p class="lede">The <code>templates</code> dictionary tells Foundry which files are source templates, how often to process them, and where their output belongs. This page separates the rules by file type so every declaration has one clear shape.</p>
<p>Foundry does not scan the pack and guess which files are templates. Every HTML, CSS, JavaScript or PHP template the component uses must be declared explicitly in this dictionary.</p>

<div class="note">
<strong>Paths are relative to Contents/Resources.</strong> Every declared file must exist inside the component pack. Foundry determines an additional template’s type from its filename extension.</div>

<h2 id="primary-html">Primary HTML</h2>
<p>Every component needs one primary HTML template. Name it with the <code>html</code> key inside the <code>templates</code> dictionary. Do not also list it in <code>files</code>.</p>


<div markdown="1">

```xml
<key>templates</key>
<dict>
    <key>html</key>
    <string>component.html</string>
</dict>
```

</div>


<p>Foundry processes this file once for every component placed on a page. Its root element must contain <code>{{ component.attributes }}</code>, which supplies the internal <code>data-foundry-id</code> identity, author-supplied root attributes, and canvas hooks Foundry needs. Its root <code>class</code> attribute must also contain <code>{{ component.class }}</code>, which merges Foundry’s generated classes with classes added in the Advanced Inspector.</p>


<div markdown="1">

```xml
<section class="callout{{ component.class }}" {{ component.attributes }}>
    <h2>{{ text }}</h2>
</section>
```

</div>

<div class="callout warning">
<strong>The root ID is reserved.</strong> Do not declare <code>id</code> on the component root. Foundry supplies the site author’s optional anchor there. Descendant elements may use developer-owned IDs.</div>



<h2 id="additional-files">Additional files</h2>
<p>Production CSS, JavaScript, PHP, and extra HTML belong in the optional <code>files</code> array. Each entry requires <code>path</code>. The file extension tells Foundry which rules to apply.</p>


<div markdown="1">

```xml
<key>files</key>
<array>
    <dict>
        <key>path</key>
        <string>component.css</string>
    </dict>
</array>
```

</div>



<div class="api-table template-table">
    <div class="api-row api-header">
<span>File</span><span>Allowed scope</span><span>Optional keys</span><span>Where it goes</span>
</div>
    <div class="api-row">
<strong>Primary HTML</strong><span>Instance, fixed</span><span>None</span><span>Component markup</span>
</div>
    <div class="api-row">
<strong>CSS</strong><span><code>instance</code>, <code>page</code>, <code>site</code></span><span><code>scope</code></span><span>Generated stylesheets</span>
</div>
    <div class="api-row">
<strong>JavaScript</strong><span><code>instance</code>, <code>page</code></span><span><code>scope</code>, <code>closure</code></span><span>End of the page body</span>
</div>
    <div class="api-row">
<strong>PHP</strong><span><code>instance</code>, <code>page</code></span><span><code>scope</code></span><span>Before the page doctype</span>
</div>
    <div class="api-row">
<strong>Extra HTML</strong><span><code>page</code> only</span><span><code>scope</code>, <code>placement</code></span><span>Chosen head/body position</span>
</div>
    <div class="api-row">
<strong>Editor CSS</strong><span>Instance, fixed</span><span>None</span><span>Canvas only; never exported</span>
</div>
</div>

<h2 id="scope">What scope means</h2>
<p><code>scope</code> controls how often Foundry processes an entry in <code>files</code>. It does not select a CSS selector or an HTML location.</p>
<dl class="syntax-list">
<dt><code>instance</code></dt>
<dd>Once for every placed component. This is the default when <code>scope</code> is omitted. Instance-specific values such as <code>{{ id }}</code> and <code>{{ control.name }}</code> are available.</dd>
<dt><code>page</code></dt>
<dd>Once per component pack on each page that uses it, regardless of how many instances appear. Values belonging to one particular instance are unavailable.</dd>
<dt><code>site</code></dt>
<dd>Once per component pack for the entire website. This scope is supported only by CSS.</dd>
</dl>
<div class="callout warning">
<strong>Shared template files cannot use instance values.</strong> Page- and site-scoped files cannot use instance, component, control, slot, or editable-content macros because no single component instance owns their output. They may use conditional directives with the environment values <code>canvas</code>, <code>preview</code>, and <code>published</code>.</div>
<p>Page-scoped files may use package values, declared page or site assets, <code>site.baseURL</code>, <code>page.url</code>, <code>path.siteRoot</code>, and <code>path.siteAssets</code>. Site-scoped files may use the same site and path values plus package values, but may reference only site-scoped declared assets and cannot use <code>page.url</code>.</p>

<h2 id="css">CSS template files</h2>
<p>Declare a <code>.css</code> file in <code>files</code>. CSS supports all three scopes and does not use <code>placement</code> or <code>closure</code>.</p>

<h3>Instance CSS</h3>
<p>Use instance scope when the stylesheet needs a control value or a selector unique to one placed component. Omitting <code>scope</code> means <code>instance</code>.</p>


<div markdown="1">

```xml
<dict>
    <key>path</key><string>component.css</string>
</dict>
```

</div>




<div markdown="1">

```css
[data-foundry-id="{{ instance.uuid }}"] {
    color: {{ control.textColor }};
}
```

</div>



<h3>Page CSS</h3>
<p>Use page scope for styles needed once on every page containing the component pack.</p>


<div markdown="1">

```xml
<dict>
    <key>path</key><string>page.css</string>
    <key>scope</key><string>page</string>
</dict>
```

</div>



<h3>Site CSS</h3>
<p>Use site scope for package-wide styles that should appear once in the shared site stylesheet.</p>


<div markdown="1">

```xml
<dict>
    <key>path</key><string>site.css</string>
    <key>scope</key><string>site</string>
</dict>
```

</div>



<h2 id="javascript">JavaScript template files</h2>
<p>Declare a <code>.js</code> file in <code>files</code>. JavaScript supports <code>instance</code> and <code>page</code> scope. Foundry emits it at the end of the page body.</p>


<div markdown="1">

```xml
<dict>
    <key>path</key><string>component.js</string>
    <key>scope</key><string>instance</string>
    <key>closure</key><true/>
</dict>
```

</div>


<p><code>closure</code> is optional and defaults to <code>true</code>. Foundry wraps each instance script in a private function receiving <code>component</code>, the component’s root element. A page-scoped closure receives <code>page</code>, which is the browser document.</p>


<div markdown="1">

```javascript
const button = component.querySelector("button");
button.addEventListener("click", () => {
    component.classList.toggle("is-active");
});
```

</div>


<div class="callout warning">
<strong>Turn closure off deliberately.</strong> Set <code>closure</code> to <code>false</code> only when the script intentionally creates or consumes global values. JavaScript does not support <code>site</code> scope or <code>placement</code>.</div>

<h2 id="php">PHP template files</h2>
<p>Declare a <code>.php</code> file in <code>files</code>. PHP supports <code>instance</code> and <code>page</code> scope. Foundry places the processed PHP before the exported page’s doctype.</p>


<div markdown="1">

```xml
<key>requiresPhp</key>
<true/>

<key>templates</key>
<dict>
    <key>html</key><string>component.html</string>
    <key>files</key>
    <array>
        <dict>
            <key>path</key><string>component.php</string>
            <key>scope</key><string>instance</string>
        </dict>
    </array>
</dict>
```

</div>


<p>The top-level <code>requiresPhp</code> key is optional and defaults to <code>false</code>, but it must be <code>true</code> whenever the pack declares a PHP template or PHP asset. It also forces pages containing the component to use a <code>.php</code> extension. This remains useful when PHP is an independent endpoint called by JavaScript rather than inline page source.</p>
<p>Foundry’s bundled local-preview runtime executes generated PHP pages and endpoints. PHP template files do not use <code>placement</code> or <code>closure</code>.</p>

<h2 id="additional-html">Additional HTML template files</h2>
<p>The file named by <code>templates</code> → <code>html</code> creates each component instance. Any other <code>.html</code> file is page-level supporting markup and must declare both <code>scope = page</code> and a <code>placement</code>.</p>


<div markdown="1">

```xml
<dict>
    <key>path</key><string>metadata.html</string>
    <key>scope</key><string>page</string>
    <key>placement</key><string>headEnd</string>
</dict>
```

</div>


<dl class="syntax-list">
<dt><code>headStart</code></dt>
<dd>Near the beginning of the document head.</dd>
<dt><code>headEnd</code></dt>
<dd>Near the end of the document head.</dd>
<dt><code>bodyStart</code></dt>
<dd>Before normal page component markup.</dd>
<dt><code>bodyEnd</code></dt>
<dd>After normal page component markup.</dd>
</dl>
<p>Foundry emits the file once on each page using the component pack. Extra HTML does not support instance or site scope.</p>

<h2 id="editor-css">Editor CSS</h2>
<p>Editor CSS is a special canvas-only template. Name it directly with <code>editorCSS</code> inside the <code>templates</code> dictionary—not as an entry in <code>files</code>.</p>


<div markdown="1">

```xml
<key>templates</key>
<dict>
    <key>html</key><string>component.html</string>
    <key>editorCSS</key><string>editor.css</string>
</dict>
```

</div>


<p>Foundry processes editor CSS once per component instance, so instance and control macros are available. It can improve empty states, selection, and drop targets in the editing canvas, but it is never included in browser preview or production export.</p>


<div markdown="1">

```css
[data-foundry-id="{{ instance.uuid }}"] .content:empty {
    min-height: 72px;
    outline: 1px dashed currentColor;
}
```

</div>



<h2>A complete declaration</h2>


<div markdown="1">

```xml
<key>requiresPhp</key>
<true/>

<key>assets</key>
<array>
    <dict>
        <key>path</key><string>images/badge.svg</string>
    </dict>
    <dict>
        <key>path</key><string>shared/icons</string>
        <key>scope</key><string>site</string>
    </dict>
</array>

<key>templates</key>
<dict>
    <key>html</key><string>component.html</string>
    <key>files</key>
    <array>
        <dict>
            <key>path</key><string>component.css</string>
        </dict>
        <dict>
            <key>path</key><string>site.css</string>
            <key>scope</key><string>site</string>
        </dict>
        <dict>
            <key>path</key><string>component.js</string>
        </dict>
        <dict>
            <key>path</key><string>component.php</string>
        </dict>
        <dict>
            <key>path</key><string>metadata.html</string>
            <key>scope</key><string>page</string>
            <key>placement</key><string>headEnd</string>
        </dict>
    </array>
    <key>editorCSS</key><string>editor.css</string>
</dict>
```

</div>



<div class="callout warning">
<strong>Use browser-ready source.</strong> Foundry accepts <code>.html</code>, <code>.css</code>, <code>.js</code>, and <code>.php</code> template files. Compile Sass, SCSS, TypeScript, or other source formats before packaging and declare their generated browser-ready files.</div>

<div class="page-links">
    <a class="card" href="template-values.html"><strong>Template values</strong><p>See the macros available inside templates, including identity, controls, assets, conditions, editable content, and slots.</p></a>
    <a class="card" href="manifest-identity.html"><strong>Identity and metadata</strong><p>Review the manifest keys that identify and present the component.</p></a>
</div>
{% endraw %}
