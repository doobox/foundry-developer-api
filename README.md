# Foundry documentation

One Jekyll site with two sections: the end-user guide (`guide/`) and the part developer API (`developer/`).

The documentation is a GitHub Pages site built with Jekyll.

## Preview locally

Run the repository's supported preview command:

```sh
./serve-docs
```

Open <http://127.0.0.1:4000/>. Jekyll watches the source files and LiveReload refreshes the browser after documentation changes.

Run `./serve-docs` again after editing documentation. If the repository's preview server is already running, the command refreshes the exact generated directory currently being served and exits without starting a second server.

The script uses Homebrew Ruby 3.3, installs the pinned bundle into a temporary cache when needed, and renders the current working tree into a temporary directory without changing tracked site output. Install the required Ruby once with `brew install ruby@3.3`.

GitHub Pages continues to build the published site with Jekyll. The `github-pages` gem keeps that production dependency set aligned with GitHub Pages.

## Authoring

Every control reference starts with a **Quick example**: a small dictionary for the `inspector` array followed by template usage, or an explicit statement that the item has no output. Put `type` before `id`. Keep required prerequisites beside the example and retain the complete property reference below it.

Controls belong to the Settings Inspector section unless wrapped in a section entry — an `inspector` entry without a `type`, named by its `section` key and carrying its own inner `controls` array. A per-control `group` key is a validation error, as is a section wrapper named with `group`. The top-level manifest `group` key (the Parts panel category beside `title`) is a different, unrelated key and remains valid.

## Check documentation

Run the dependency-free source checks with Python 3:

```sh
python3 scripts/check-docs.py
```

After `./serve-docs`, also check the rendered links and search index. Pass the **Destination** directory printed by the Jekyll build:

```sh
python3 scripts/check-docs.py --site /path/to/jekyll/output
```

The checker validates complete JSON snippets, control-example keys against the documented property entries, Inspector section entries, default dictionaries, numeric default ranges, quick-example placement, local links and heading anchors. Explicitly abbreviated snippets containing ellipses are skipped. External URLs are not fetched. This is not the application's full manifest validator: importing example packs into Foundry is still required for end-to-end validation.

### Navigation

`_data/navigation.json` is the shared source for the sidebar, breadcrumbs and API map, including the no-JavaScript navigation. Each section has a `title` and `links`; each link is `[label, href]`, optionally followed by an array of child links. Update this file when adding or moving a topic, rather than maintaining separate lists in JavaScript or Markdown. Rebuild with `./serve-docs` and run the rendered-link checker after changes.

### Starter downloads

The starter and completed ZIPs under `assets/downloads` are generated from explicitly marked code blocks in `quick-start.md`. Do not edit the archives by hand. After changing those snippets, run:

```sh
python3 scripts/build-starters.py
./serve-docs
```

Commit both the Markdown and refreshed ZIPs. `python3 scripts/build-starters.py --check` detects missing or stale archives without writing anything; both the preview script and documentation checks run it. Archives use fixed timestamps and file permissions so identical examples produce identical downloads. Both archives use the same part ID and are alternative stages, not two packs to install together.

### Validate with Foundry

The sibling application repository also has focused tests that read this working tree directly. From `Mac/Foundry/Foundry`, run:

```sh
xcodebuild test -project Foundry.xcodeproj -scheme Foundry \
  -destination 'platform=macOS' \
  '-only-testing:FoundryTests/PartPackageTests/developerDocumentationQuickExamplesLoad()' \
  '-only-testing:FoundryTests/PartPackageTests/developerDocumentationCompleteExamplesLoad()' \
  '-only-testing:FoundryTests/PartPackageTests/developerDocumentationQuickStartLoads()'
```

These tests package the 39 Quick examples, the 26 full control examples and both quick-start stages, then run Foundry's package loader and prepare their template payloads. Control snippets are placed inside a valid host part; HTML fragments receive a root wrapper. The ZIP consistency check separately verifies the downloads match those source snippets. This checks declarations and HTML/CSS template preparation, not browser appearance, standalone text-output fragments or every template-language example. The tests are skipped when this sibling repository is absent. Verify that the test report actually ran **three tests**, rather than accepting a successful build with zero selected tests.

The Markdown files in this repository are the single source of truth. Jekyll renders those same files both for local preview and for GitHub Pages. JavaScript enhances the rendered pages with navigation and copy buttons, but documentation content must remain in Markdown.
