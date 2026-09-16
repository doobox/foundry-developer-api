---
layout: default
title: Template files · Foundry Developer
permalink: "/templates.html"
---
{% raw %}
{% endraw %}{% include breadcrumbs.html %}{% raw %}
<p class="eyebrow">Info.plist template files</p>
<h1>Declare exactly the files your part uses</h1>
<p class="lede">The <code>templates</code> dictionary tells Foundry which files are source templates, how often to process them, and where their output belongs. This page separates the rules by file type so every declaration has one clear shape.</p>
<p>Foundry does not scan the pack and guess which files are templates. Every HTML, CSS, JavaScript or PHP template the part uses must be declared explicitly in this dictionary.</p>

<div class="note">
<strong>Paths are relative to Contents/Resources.</strong> Every declared file must exist inside the part pack. Foundry determines an additional template’s type from its filename extension.</div>

<h2 id="primary-html">Primary HTML</h2>
<p>Every part needs one primary HTML template. Name it with the <code>html</code> key inside the <code>templates</code> dictionary. Do not also list it in <code>files</code>.</p>


<div markdown="1">

```xml
<key>templates</key>
<dict>
    <key>html</key>
    <string>part.html</string>
</dict>
```

</div>


<p>Foundry processes this file once for every part placed on a page. The complete rendered output must have exactly one stable top-level root element. That root must contain <code>{{ part.attributes }}</code>, which supplies the internal <code>data-foundry-id</code> identity, author-supplied root attributes, and canvas hooks Foundry needs. Its <code>class</code> attribute must also contain <code>{{ part.class }}</code>, which merges Foundry’s generated classes with classes added in the Advanced Inspector.</p>

<div class="note">
<strong>The root element is yours to design.</strong> Choose its HTML element, developer classes, ordinary attributes, data attributes and control-driven values as needed. Foundry requires the two root hooks and reserves only the root <code>id</code>.</div>

<div class="callout warning">
<strong>The root marks the part’s rendered boundary.</strong> Put every descendant element, editable area, condition, loop and child area inside it. Control values may configure the root itself or content inside it. Do not render text, macros or sibling elements before or after the root. Only whitespace and HTML comments may sit outside it. Keep the root unconditional and render it exactly once.</div>


<div markdown="1">

```html
<!-- Whitespace and comments may sit outside the root. -->
<section class="callout {{ part.class }}" {{ part.attributes }}>
    <p>{{ control.introduction }}</p>
    <h2>{{ text("heading") }}</h2>
    {{ if control.showContent }}
        {{ dropZone("content") }}
    {{ endif }}
</section>
```

</div>

<p>The example part may use its controls on the <code>section</code> root and anywhere inside it. The <code>dropZone("content")</code> expression chooses where nested parts appear, but each nested part owns its own root and values. A parent cannot read a child’s controls, and a child cannot read its parent’s controls.</p>

<p>This is invalid because the first control value and the second top-level element sit outside the part root:</p>

<div markdown="1">

```html
{{ control.introduction }}

<section class="callout {{ part.class }}" {{ part.attributes }}>
    <h2>{{ text("heading") }}</h2>
</section>

<footer>Not owned by this part root</footer>
```

</div>

<p>Output outside the root is not part of the element identified by <code>{{ part.attributes }}</code>, so Foundry cannot treat it as that part during canvas updates, selection or nesting. When developer validation is enabled, Foundry reports this structure as an error.</p>

<div class="callout warning">
<strong>The root ID is reserved.</strong> Do not declare <code>id</code> on the part root. Foundry supplies the site author’s optional anchor there. Descendant elements may use developer-owned IDs.</div>



<h2 id="additional-files">Additional files</h2>
<p>Production CSS, JavaScript, PHP, and extra HTML belong in the optional <code>files</code> array. Each entry requires <code>path</code>. The file extension tells Foundry which rules to apply.</p>


<div markdown="1">

```xml
<key>files</key>
<array>
    <dict>
        <key>path</key>
        <string>part.css</string>
    </dict>
</array>
```

</div>



<div class="api-table template-table">
    <div class="api-row api-header">
<span>File</span><span>Allowed scope</span><span>Optional keys</span><span>Where it goes</span>
</div>
    <div class="api-row">
<strong>Primary HTML</strong><span>Instance, fixed</span><span>None</span><span>Part markup</span>
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
<dd>Once for every placed part. This is the default when <code>scope</code> is omitted. Instance-specific values such as <code>{{ instance.id }}</code> and <code>{{ control.name }}</code> are available.</dd>
<dt><code>page</code></dt>
<dd>Once per part pack on each page that uses it, regardless of how many instances appear. Values belonging to one particular instance are unavailable.</dd>
<dt><code>site</code></dt>
<dd>Once per part pack for the entire website. This scope is supported only by CSS.</dd>
</dl>
<div class="callout warning">
<strong>Shared template files cannot use instance values.</strong> Page- and site-scoped files cannot use instance, part, control, child-area, drop-zone, or editable-content macros because no single part instance owns their output. They may use conditional directives with the environment values <code>canvas</code>, <code>preview</code>, and <code>published</code>.</div>
<p>Page-scoped files may use package values, declared page or site assets, <code>site.baseURL</code>, <code>page.url</code>, <code>path.siteRoot</code>, and <code>path.siteAssets</code>. Site-scoped files may use the same site and path values plus package values, but may reference only site-scoped declared assets and cannot use <code>page.url</code>.</p>

<h2 id="css">CSS template files</h2>
<p>Declare a <code>.css</code> file in <code>files</code>. CSS supports all three scopes and does not use <code>placement</code> or <code>closure</code>.</p>

<h3>Instance CSS</h3>
<p>Use instance scope when the stylesheet needs a control value or a selector unique to one placed part. Omitting <code>scope</code> means <code>instance</code>.</p>


<div markdown="1">

```xml
<dict>
    <key>path</key><string>part.css</string>
</dict>
```

</div>




<div markdown="1">

```css
:instance {
    color: {{ control.textColor }};
}
```

</div>



<h3>Page CSS</h3>
<p>Use page scope for styles needed once on every page containing the part pack.</p>


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
    <key>path</key><string>part.js</string>
    <key>scope</key><string>instance</string>
    <key>closure</key><true/>
</dict>
```

</div>


<p><code>closure</code> is optional and defaults to <code>true</code>. Foundry wraps each instance script in a private function receiving <code>part</code>, the part’s root element, and provides a <code>foundry</code> relationship helper in the same private scope. A page-scoped closure receives <code>page</code>, which is the browser document.</p>


<div markdown="1">

```javascript
const button = part.querySelector("button");
button.addEventListener("click", () => {
    part.classList.toggle("is-active");
});
```

</div>

<h3>Part relationships</h3>
<p>The instance-scoped <code>foundry</code> helper finds nested part roots without confusing them with ordinary HTML inside the part. Every method may optionally receive a package identifier to filter its result.</p>
<dl class="syntax-list">
<dt><code>foundry.children(packageIdentifier?)</code></dt><dd>Direct child parts, even when child-area or drop-zone markup places wrappers between their roots.</dd>
<dt><code>foundry.descendants(packageIdentifier?)</code></dt><dd>All nested parts in document order.</dd>
<dt><code>foundry.parent()</code></dt><dd>The direct parent part, or <code>null</code> for a page-level part.</dd>
<dt><code>foundry.ancestors(packageIdentifier?)</code></dt><dd>All ancestor parts, nearest first.</dd>
<dt><code>foundry.closest(packageIdentifier)</code></dt><dd>The nearest ancestor from the requested package, or <code>null</code>.</dd>
</dl>

<div markdown="1">

```javascript
const cards = foundry.descendants("com.example.card");
const parentSection = foundry.closest("com.example.section");
```

</div>


<div class="callout warning">
<strong>Turn closure off deliberately.</strong> Set <code>closure</code> to <code>false</code> only when the script intentionally creates or consumes global values. JavaScript does not support <code>site</code> scope or <code>placement</code>.</div>

<h2 id="php">PHP template files</h2>
<p>Declare a <code>.php</code> file in <code>files</code>. PHP supports <code>instance</code> and <code>page</code> scope. Foundry places the processed PHP before the exported page’s doctype.</p>


<div markdown="1">

```xml
<key>requiresPHP</key>
<true/>

<key>templates</key>
<dict>
    <key>html</key><string>part.html</string>
    <key>files</key>
    <array>
        <dict>
            <key>path</key><string>part.php</string>
            <key>scope</key><string>instance</string>
        </dict>
    </array>
</dict>
```

</div>


<p>The top-level <code>requiresPHP</code> key is optional and defaults to <code>false</code>, but it must be <code>true</code> whenever the pack declares a PHP template or PHP asset. It also forces pages containing the part to use a <code>.php</code> extension. This remains useful when PHP is an independent endpoint called by JavaScript rather than inline page source.</p>
<p>Foundry’s bundled local-preview runtime executes generated PHP pages and endpoints. PHP template files do not use <code>placement</code> or <code>closure</code>.</p>

<h2 id="additional-html">Additional HTML template files</h2>
<p>The file named by <code>templates</code> → <code>html</code> creates each part instance. Any other <code>.html</code> file is page-level supporting markup and must declare both <code>scope = page</code> and a <code>placement</code>.</p>


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
<dd>Before normal page part markup.</dd>
<dt><code>bodyEnd</code></dt>
<dd>After normal page part markup.</dd>
</dl>
<p>Foundry emits the file once on each page using the part pack. Extra HTML does not support instance or site scope.</p>

<h2 id="editor-css">Editor CSS</h2>
<p>Editor CSS is a special canvas-only template. Name it directly with <code>editorCSS</code> inside the <code>templates</code> dictionary—not as an entry in <code>files</code>.</p>


<div markdown="1">

```xml
<key>templates</key>
<dict>
    <key>html</key><string>part.html</string>
    <key>editorCSS</key><string>editor.css</string>
</dict>
```

</div>


<p>Foundry processes editor CSS once per part instance, so instance and control macros are available. It can improve empty states, selection, and drop targets in the editing canvas, but it is never included in browser preview or production export.</p>


<div markdown="1">

```css
:instance .content:empty {
    min-height: 72px;
    outline: 1px dashed currentColor;
}
```

</div>



<h2>A complete declaration</h2>


<div markdown="1">

```xml
<key>requiresPHP</key>
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
    <key>html</key><string>part.html</string>
    <key>files</key>
    <array>
        <dict>
            <key>path</key><string>part.css</string>
        </dict>
        <dict>
            <key>path</key><string>site.css</string>
            <key>scope</key><string>site</string>
        </dict>
        <dict>
            <key>path</key><string>part.js</string>
        </dict>
        <dict>
            <key>path</key><string>part.php</string>
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
    <a class="card" href="template-identity.html"><strong>Template language</strong><p>Browse identity, controls, assets, conditions, persistent areas, drop zones and part hooks.</p></a>
    <a class="card" href="manifest-identity.html"><strong>Identity and metadata</strong><p>Review the manifest keys that identify and present the part.</p></a>
</div>
{% endraw %}
