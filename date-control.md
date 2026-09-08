---
layout: default
title: Date control · Foundry Developer
permalink: "/date-control.html"
---
{% raw %}
<div class="breadcrumbs">
<a href="index.html">Foundry Developer</a><span>›</span><span>Info.plist</span><span>›</span><a href="custom-controls.html">Custom controls</a>
</div>
<p class="eyebrow">Info.plist · customItems</p>
<h1>Date</h1>
<p class="lede">A native calendar-date picker storing a date-only ISO String.</p>


## Basic properties

Each item in `customItems` defines one Inspector item. These keys set its name, placement, initial value and responsive behaviour where applicable.

<h3 class="property-heading"><code>type</code></h3>
<div class="property-meta"><span class="property-type">String</span><span class="required">Required</span></div>

Identifies this item as Date. Always use `date`.

```xml
<key>type</key>
<string>date</string>
```


<h3 class="property-heading"><code>id</code></h3>
<div class="property-meta"><span class="property-type">String</span><span class="required">Required</span></div>

The unique name used to store this control and read it in templates. It must start with a letter and may contain letters, numbers, underscores and hyphens.

```xml
<key>id</key>
<string>published</string>
```

<h3 class="property-heading"><code>label</code></h3>
<div class="property-meta"><span class="property-type">String</span><span class="optional">Optional</span><span class="default">Default: empty</span></div>

Text shown to the left of the control in the Inspector, including when `count` is present.

```xml
<key>label</key>
<string>Date</string>
```

<h3 class="property-heading"><code>group</code></h3>
<div class="property-meta"><span class="property-type">String</span><span class="optional">Optional</span><span class="default">Default: Settings</span></div>

The Inspector section that contains this control. Omit the key to place it in Settings.

```xml
<key>group</key>
<string>Appearance</string>
```

<h3 class="property-heading"><code>toolTip</code></h3>
<div class="property-meta"><span class="property-type">String</span><span class="optional">Optional</span><span class="default">Default: omitted</span></div>

Help text that explains what the control changes.

```xml
<key>toolTip</key>
<string>Choose a value.</string>
```

<h3 class="property-heading"><code>subtitle</code></h3>
<div class="property-meta"><span class="property-type">String or String array</span><span class="optional">Optional</span><span class="default">Default: empty</span></div>

Supporting text shown beneath the control. Use a String for one control or a String array with `count`.

Single control

```xml
<key>subtitle</key>
<string>Additional guidance</string>
```

Control array

```xml
<key>subtitle</key>
<array>
    <string>First value</string>
    <string>Second value</string>
</array>
```

<h3 class="property-heading"><code>enable</code></h3>
<div class="property-meta"><span class="property-type">Dictionary</span><span class="optional">Optional</span><span class="default">Default: shown</span></div>

Shows this control only when another control meets the stated condition.

```xml
<key>enable</key>
<dict>
    <key>id</key>
    <string>showControl</string>
    <key>value</key>
    <true/>
</dict>
```

<h3 class="property-heading"><code>default</code></h3>
<div class="property-meta"><span class="property-type">String or String array</span><span class="required">Required</span></div>

The value initially stored for this control. Supply a real calendar date using `YYYY-MM-DD`. A control array needs one value for each member.

Single control

```xml
<key>default</key>
<string>2026-08-30</string>
```

Control array

```xml
<key>default</key>
<array>
    <string>2026-08-30</string>
    <string>2026-09-06</string>
</array>
```

<h3 class="property-heading"><code>responsive</code></h3>
<div class="property-meta"><span class="property-type">Boolean</span><span class="optional">Optional</span><span class="default">Default: false</span></div>

Set to true to allow a different value at each responsive breakpoint.

```xml
<key>responsive</key>
<false/>
```

## Date options

These keys sit directly in the same custom-item dictionary. Omitted optional keys use the defaults shown.

<h3 class="property-heading"><code>minimum</code></h3>
<div class="property-meta"><span class="property-type">String</span><span class="optional">Optional</span><span class="default">Default: unrestricted</span></div>

The earliest date the developer may select. Use `YYYY-MM-DD`. The default date cannot be earlier than this value.

```xml
<key>minimum</key>
<string>2026-01-01</string>
```

<h3 class="property-heading"><code>maximum</code></h3>
<div class="property-meta"><span class="property-type">String</span><span class="optional">Optional</span><span class="default">Default: unrestricted</span></div>

The latest date the developer may select. Use `YYYY-MM-DD`. It must be the same as or later than `minimum`, and the default date cannot be later than this value.

```xml
<key>maximum</key>
<string>2026-12-31</string>
```

With `count`, the same optional bounds apply to every date picker.

<h3 class="property-heading"><code>count</code></h3>
<div class="property-meta"><span class="property-type">Integer</span><span class="optional">Optional</span><span class="default">Default: omitted</span></div>

Creates two to four controls that are stored as one array. Read each value with a zero-based index such as `{{ control.myControl[0] }}`.

Control array

```xml
<key>count</key>
<integer>2</integer>
```

## Return value

`{{ control.published }}` resolves as an HTML-escaped `YYYY-MM-DD` String. It contains no hidden time or timezone.

```html
<time datetime="{{ control.published }}">{{ control.published }}</time>
```

## Date values

Each selected date also provides named calendar values:

- `year`, `month` and `day` return numbers.
- `monthName` returns the full English month name.
- `weekday` returns the full English weekday name.

```text
{{ control.published.year }}
{{ control.published.month }}
{{ control.published.day }}
{{ control.published.monthName }}
{{ control.published.weekday }}
```

With `count`, place the zero-based index before the named value:

```text
{{ control.schedule[0].weekday }}
{{ control.schedule[1].day }}
```

Named numeric values may also be used in template expressions.

## Formatting visible dates

Use `formatDate("pattern")` when displaying a date to a reader. Patterns use Unicode date-field symbols and produce deterministic English output. The stored value remains unchanged.

```html
<time datetime="{{ control.published }}">
    {{ control.published | formatDate("d MMMM yyyy") }}
</time>
```

This produces visible text such as `30 August 2026` while retaining `2026-08-30` in the machine-readable `datetime` attribute.

Control arrays support the same filter:

```html
<time datetime="{{ control.schedule[0] }}">{{ control.schedule[0] | formatDate("d MMM") }}</time>–<time datetime="{{ control.schedule[1] }}">{{ control.schedule[1] | formatDate("d MMM yyyy") }}</time>
```

## Date arithmetic

Use `addDays(integer)` or `addMonths(integer)` to derive a related date without adding another Inspector control. Positive values move forward and negative values move backward. Filters run from left to right and do not change the stored date.

The integer may be written directly or supplied by a Number control. A `formatDate` pattern may likewise be supplied by a Text control.

```text
{{ control.published | addDays(7) }}
{{ control.published | addDays(control.reviewDelay) }}
{{ control.published | addMonths(1) | formatDate("d MMMM yyyy") }}
{{ control.published | formatDate(control.datePattern) }}
```

Calendar arithmetic handles differing month lengths. For example, adding one month to the final day of January produces the final valid day of February.

## Complete example

### Info.plist

```xml
<key>customItems</key>
<array>
    <dict>
        <key>id</key><string>published</string>
        <key>label</key><string>Date</string>
        <key>group</key><string>Content</string>
        <key>type</key><string>date</string>
        <key>minimum</key><string>2026-01-01</string>
        <key>maximum</key><string>2026-12-31</string>
        <key>default</key><string>2026-08-30</string>
        <key>responsive</key><false/>
    </dict>
</array>
```

### Use it in a template

```html
<time datetime="{{ control.published }}">{{ control.published | formatDate("d MMMM yyyy") }}</time>
```

{% endraw %}
