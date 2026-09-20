---
layout: default
title: Pre Release Notes · Foundry Developer
permalink: /pre-release-notes.html
description: Highlights from Foundry preview builds distributed before public release.
---
{% raw %}
{% endraw %}{% include breadcrumbs.html %}{% raw %}
<header class="release-hero">
    <p class="eyebrow">Foundry for macOS</p>
    <h1>Pre-release notes</h1>
    <p class="lede">A concise history of the preview builds shared with Foundry’s early developers. Each build includes everything listed in the builds before it.</p>
    <nav class="release-jump" aria-label="Jump to a preview build">
        <a href="#build-6">Build 6</a>
        <a href="#build-5">Build 5</a>
        <a href="#build-4">Build 4</a>
        <a href="#build-3">Build 3</a>
    </nav>
</header>

<div class="note release-note">
    <strong>Preview software:</strong> projects and part APIs may continue to evolve before Foundry’s public release. Keep a backup of important projects and development packs when moving between builds.
</div>

<div class="release-timeline">
    <article class="release-build" id="build-6">
        <header class="release-build-header">
            <div>
                <span class="release-build-number">Build 6</span>
                <h2>Site identity and flexible publishing</h2>
            </div>
            <time datetime="2026-09-16">16 September 2026</time>
        </header>
        <p class="release-summary">A project-configuration release that brings site identity, generated web icons, search visibility and reusable publishing destinations into one clearer workflow.</p>

        <div class="release-groups">
            <section class="release-group">
                <h3>Project and site settings</h3>
                <ul class="release-list">
                    <li>Moved Site Settings into its own resizable project window and redesigned it with consistent grid rows and dedicated sections for General, Site Identity, Web Icons, SEO &amp; Search, Publishing and Code &amp; Analytics.</li>
                    <li>Improved General settings with web-address validation, a language picker, managed site-logo artwork and alt text, and the project’s dark-mode option.</li>
                    <li>Added site-wide title suffix, default description and social-image fallbacks for pages that do not provide their own metadata.</li>
                    <li>Added site-logo and social-image wells with native file picking and drag-and-drop workflows.</li>
                    <li>Separated search indexing, canonical URL, sitemap and robots.txt controls from publishing configuration, with guidance when a valid public web address is required.</li>
                    <li>Exported managed site artwork with the project while keeping source artwork private to the document package.</li>
                </ul>
            </section>

            <section class="release-group">
                <h3>Web icons</h3>
                <ul class="release-list">
                    <li>Added a managed web-icon generator that accepts a square source image of at least 256 pixels.</li>
                    <li>Generated and stored favicon and Apple touch-icon variants once, then reused them across previews and published output.</li>
                    <li>Kept imported source artwork and generated icon files private to the project while emitting depth-correct icon links on every exported page.</li>
                    <li>Removed generated icon output cleanly when the source is cleared.</li>
                </ul>
            </section>

            <section class="release-group">
                <h3>Structure and workspace</h3>
                <ul class="release-list">
                    <li>Added the current page as the root item in Structure, making the page itself selectable for metadata inspection.</li>
                    <li>Allowed Parts to be dragged directly onto the page root and made root-level ordering clearer alongside nested drop zones and child pickers.</li>
                    <li>Kept the page root and selected Part hierarchy expanded when revealing selections.</li>
                    <li>Refined Pages, Structure and Assets outline backgrounds so they blend correctly with sidebar materials.</li>
                </ul>
            </section>

            <section class="release-group">
                <h3>Publishing destinations</h3>
                <ul class="release-list">
                    <li>Added multiple named Local Folder, SFTP, FTP, FTPS and Amazon S3 destinations with one clearly selected default.</li>
                    <li>Added reusable destination bookmarks for recalling connection settings in other projects, with credentials retained securely in Keychain.</li>
                    <li>Improved connection testing with clear success and failure states, including recognition of remote directories that will be created on first publish.</li>
                    <li>Extended the toolbar Publish control with destination selection, full republishing and direct access to Publishing Setup.</li>
                    <li>Automatically migrated projects using the earlier single-destination publishing settings.</li>
                    <li>Scoped local folders, credentials and publishing manifests to their individual destinations while keeping the sole remaining destination as the default.</li>
                </ul>
            </section>

            <section class="release-group">
                <h3>Developer reliability</h3>
                <ul class="release-list">
                    <li>Added validation requiring a Part’s primary HTML output to have one stable top-level root when developer validation is enabled.</li>
                    <li>Added the Inspector’s canonical String, wildcard, array-membership and empty-value predicates to template expressions, with shared matching semantics across both APIs.</li>
                    <li>Improved live-refresh boundary coverage so malformed templates are reported before they can produce unreliable canvas updates.</li>
                    <li>Expanded regression coverage for project migration, managed site artwork, generated icons, publishing URLs and package validation.</li>
                </ul>
            </section>
        </div>
    </article>

    <article class="release-build" id="build-5">
        <header class="release-build-header">
            <div>
                <span class="release-build-number">Build 5</span>
                <h2>Selection clarity and batch editing</h2>
            </div>
            <time datetime="2026-09-15">15 September 2026</time>
        </header>
        <p class="release-summary">A focused interaction release that made complex and nested canvases easier to understand, select and edit.</p>

        <div class="release-groups">
            <section class="release-group">
                <h3>Canvas chrome</h3>
                <ul class="release-list">
                    <li>Unified chrome state priority so editing, drop targets, selection and hover no longer compete visually.</li>
                    <li>Kept selected labels visible after pointer exit while clearing genuine hover state when leaving the canvas.</li>
                    <li>Improved nested and multiple-selection label ordering, giving the primary selection visual priority.</li>
                    <li>Separated drop indicators from rendered Part styles so dragging no longer replaces a Part’s own box shadow.</li>
                    <li>Added empty-canvas click and Escape as clear ways to remove the current selection.</li>
                </ul>
            </section>

            <section class="release-group">
                <h3>Multiple-Part editing</h3>
                <ul class="release-list">
                    <li>Allowed multiple instances of the same Part to share one Inspector and be edited together.</li>
                    <li>Used the last instance added to the selection as the Inspector’s visible source value.</li>
                    <li>Applied each subsequent change across every compatible selected instance, including conditional and visibility-related settings.</li>
                    <li>Refined canvas synchronisation after grouped edits so all affected instances update together.</li>
                </ul>
            </section>
        </div>
    </article>

    <article class="release-build" id="build-4">
        <header class="release-build-header">
            <div>
                <span class="release-build-number">Build 4</span>
                <h2>World-class layout foundations</h2>
            </div>
            <time datetime="2026-09-15">15 September 2026</time>
        </header>
        <p class="release-summary">The first major pass over Foundry’s built-in layout system, with a shared Inspector language and more dependable live canvas rendering.</p>

        <div class="release-groups">
            <section class="release-group">
                <h3>Built-in layout Parts</h3>
                <ul class="release-list">
                    <li>Added dedicated <strong>Stack</strong> and <strong>Grid</strong> Parts alongside Section, Container and Columns.</li>
                    <li>Greatly expanded Section, Container and Columns with responsive flex, grid, alignment, sizing and spacing options.</li>
                    <li>Standardised common Inspector groups so equivalent settings appear in predictable places across layout Parts.</li>
                    <li>Added opt-in presentation controls and hover states where they make sense, while hiding unused settings until enabled.</li>
                </ul>
            </section>

            <section class="release-group">
                <h3>Canvas fidelity</h3>
                <ul class="release-list">
                    <li>Fixed cases where the canvas could fall behind the current Inspector settings while browser Preview remained correct.</li>
                    <li>Moved editing chrome inside Part bounds so developer borders remain visible.</li>
                    <li>Improved chrome visibility over images and highly styled Parts.</li>
                    <li>Added regression coverage for live Part updates and the built-in layout system.</li>
                </ul>
            </section>
        </div>
    </article>

    <article class="release-build" id="build-3">
        <header class="release-build-header">
            <div>
                <span class="release-build-number">Build 3</span>
                <h2>Developer platform and preview foundations</h2>
            </div>
            <time datetime="2026-09-14">14 September 2026</time>
        </header>
        <p class="release-summary">A broad foundation release that established the modern Part API, rebuilt the theme workflow and made large previews substantially more responsive.</p>

        <div class="release-groups">
            <section class="release-group">
                <h3>Parts and the developer API</h3>
                <ul class="release-list">
                    <li>Standardised the product language around <strong>Parts</strong>, including packs, the Inspector, Structure and developer documentation.</li>
                    <li>Expanded the custom-control API with colour, date, icon, link, shadow, typography, spacing, margin, padding, border and radius controls.</li>
                    <li>Added responsive defaults and theme-aware values so controls can inherit from project themes while retaining breakpoint overrides.</li>
                    <li>Added named drop zones, managed child pickers, collection loops and persistent editable text, HTML and image areas.</li>
                    <li>Added the signed Part update workflow, update discovery and in-app release availability.</li>
                </ul>
            </section>

            <section class="release-group">
                <h3>Canvas and editing</h3>
                <ul class="release-list">
                    <li>Introduced targeted canvas patches and revisioned updates for faster control editing without full-page reloads.</li>
                    <li>Kept linked global Parts synchronised across placements, including structural changes and canvas chrome.</li>
                    <li>Improved image controls with drag and drop, focal-point editing, renditions and reusable on-disk rendition caching.</li>
                    <li>Refined canvas selection, context menus, inline editing, responsive indicators and undo grouping.</li>
                </ul>
            </section>

            <section class="release-group">
                <h3>Themes and projects</h3>
                <ul class="release-list">
                    <li>Redesigned the Theme Editor around persistent colour palettes, fonts, type scales, spacing, shadows, borders and radii.</li>
                    <li>Moved responsive breakpoints to project settings so changing themes no longer changes a project’s responsive behaviour.</li>
                    <li>Allowed built-in themes to be adjusted within a project without modifying the installed theme.</li>
                    <li>Added a native welcome window, recent-project access and substantial workspace and Inspector refinements.</li>
                </ul>
            </section>

            <section class="release-group">
                <h3>Preview and distribution</h3>
                <ul class="release-list">
                    <li>Moved browser previews to disk-backed, incremental output to keep memory use predictable on large sites.</li>
                    <li>Made external preview auto-reload follow both project edits and internal page changes.</li>
                    <li>Cached generated image renditions on disk and reused them across preview and export.</li>
                    <li>Prepared the bundled PHP runtime for hardened-runtime signing and direct app distribution.</li>
                </ul>
            </section>
        </div>
    </article>

</div>
{% endraw %}
