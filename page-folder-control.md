---
layout: default
title: Page folder control · Foundry Developer
permalink: /page-folder-control.html
---
{% raw %}
{% endraw %}{% include breadcrumbs.html %}{% raw %}
<p class="eyebrow">Info.plist · controls</p>
<h1>Page folder</h1>
<p class="lede">A picker of the project's page folders, for parts that render a folder's contents — folder-scoped menus, link lists and footers.</p>

## Quick example

Add this dictionary to your part's `controls` array:

```xml
<dict>
    <key>type</key><string>pageFolder</string>
    <key>id</key><string>sourceFolder</string>
    <key>label</key><string>Folder</string>
    <key>defaults</key>
    <dict>
        <key>base</key><string></string>
    </dict>
</dict>
```

Pair it with the `navigation.folders` collection in your template:

```html
{{ loop navigation.folders as group where group.id == control.sourceFolder }}
    {{ loop group.children as item }}
        <a href="{{ item.href }}">{{ item.title }}</a>
    {{ endloop }}
{{ endloop }}
```

## Choosing folders

The Inspector shows the project's folders by name, with nested folders labelled by their path, such as `Company / Legal`. When the project has no folders the control explains that instead of offering an empty menu. A selection whose folder was deleted remains marked as missing until replaced.

## Properties

<h3 class="property-heading"><code>type</code></h3>
<div class="property-meta"><span class="property-type">String</span><span class="required">Required</span></div>

Always `pageFolder`. It does not accept `count`, `options`, `frameworkValues`, or `allowsCustom`.

```xml
<key>type</key>
<string>pageFolder</string>
```

<h3 class="property-heading"><code>id</code></h3>
<div class="property-meta"><span class="property-type">String</span><span class="required">Required</span></div>

The unique template name. It must start with a letter and may contain letters, numbers, underscores and hyphens.

<h3 class="property-heading"><code>label</code></h3>
<div class="property-meta"><span class="property-type">String</span><span class="optional">Optional</span><span class="default">Default: empty</span></div>

Text shown to the left of the control.

<h3 class="property-heading"><code>group</code></h3>
<div class="property-meta"><span class="property-type">String</span><span class="optional">Optional</span><span class="default">Default: Settings</span></div>

The Inspector section containing the control.

<h3 class="property-heading"><code>tooltip</code></h3>
<div class="property-meta"><span class="property-type">String</span><span class="optional">Optional</span><span class="default">Default: omitted</span></div>

Help text explaining what the control changes.

<h3 class="property-heading"><code>subtitle</code></h3>
<div class="property-meta"><span class="property-type">String</span><span class="optional">Optional</span><span class="default">Default: empty</span></div>

Supporting text shown beneath the control.

<h3 class="property-heading"><code>visibleWhen</code></h3>
<div class="property-meta"><span class="property-type">Dictionary</span><span class="optional">Optional</span><span class="default">Default: shown</span></div>

Shows this control only when another control meets the declared condition. See [Conditional visibility](visible-when.html).

<h3 class="property-heading"><code>valueAvailability</code></h3>
<div class="property-meta"><span class="property-type">String</span><span class="optional">Optional</span><span class="default">Default: always</span></div>

Controls when this control's value is available to templates. `always` preserves the value when the control is hidden. `whenVisible` makes `control.<id>` and its qualified derived values unavailable while `visibleWhen` is false, without discarding the stored value. `whenVisible` requires `visibleWhen`. See [Conditional visibility](visible-when.html).

<h3 class="property-heading"><code>defaults</code></h3>
<div class="property-meta"><span class="property-type">Dictionary</span><span class="required">Required</span></div>

A dictionary containing the required `base` value and optional breakpoint values: `small`, `medium`, `large`, `extraLarge`, and `doubleExtraLarge`. Breakpoint entries require `responsive: true`; omitted breakpoints inherit the preceding enabled value.

<h3 class="property-heading"><code>defaults.base</code></h3>
<div class="property-meta"><span class="property-type">String</span><span class="required">Required</span></div>

Always the empty string. Folders belong to individual projects, so no selection is portable; users choose one in the Inspector.

<h3 class="property-heading"><code>responsive</code></h3>
<div class="property-meta"><span class="property-type">Boolean</span><span class="optional">Optional</span><span class="default">Default: false</span></div>

Allows a different folder selection at each responsive breakpoint.

## Return value

`{{ control.sourceFolder }}` resolves to the selected folder's identifier — the same value as a `navigation.folders` group item's `id` — or an empty String when nothing is selected. Match it in a `where` expression to render that folder's contents.
{% endraw %}
