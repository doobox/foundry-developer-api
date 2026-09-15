---
layout: default
title: Advanced root attributes · Foundry Developer
permalink: /template-root-attributes.html
---
{% raw %}
{% endraw %}{% include breadcrumbs.html %}{% raw %}
<p class="eyebrow">Template API</p>
<h1>Advanced root attributes</h1>
<p class="lede">Expose author-defined anchors, classes and attributes on the developer-owned part root.</p>
<p>Every placed part ends with an Advanced Inspector group. Its values apply to the developer-owned root element through the two required part hooks.</p>
<dl class="syntax-list">
<dt><code>Anchor</code></dt>
<dd>An optional native HTML <code>id</code>. It must begin with a letter and contain only letters, numbers, hyphens, or underscores. Invalid and duplicate values are reported in the Inspector; invalid values are omitted from preview and published HTML.</dd>
<dt><code>Classes</code></dt>
<dd>Optional space-separated classes merged through <code>{{ part.class }}</code>.</dd>
<dt><code>Attributes</code></dt>
<dd>Optional name/value attributes merged through <code>{{ part.attributes }}</code>. Foundry rejects duplicate or malformed names and reserves <code>id</code>, <code>class</code>, <code>style</code>, <code>data-foundry-*</code>, and event-handler names beginning with <code>on</code>.</dd>
</dl>
<div class="callout warning">
<strong>Do not declare an ID on the root.</strong> Foundry reserves the root element’s <code>id</code> for the site author’s Anchor value. Developers may declare IDs on descendant elements. Use <code>:host</code> or a developer-owned class for shared package-wide root styling, and <code>:instance</code> when instance CSS must target one exact placed part.</div>
<div class="note">
<strong>No hidden selector rules.</strong> Foundry does not assume that a control belongs on the top-level element. Use the same control more than once or target any descendant your part requires.</div>
{% endraw %}
