# Foundry Developer documentation

The documentation is a GitHub Pages site built with Jekyll.

## Preview locally

Run the repository's supported preview command:

```sh
./serve-docs
```

Open <http://127.0.0.1:4000/>. Jekyll watches the source files and LiveReload refreshes the browser after documentation changes.

The script uses Homebrew Ruby 3.3, installs the pinned bundle into a temporary cache when needed, and renders the current working tree into a temporary directory without changing tracked site output. Install the required Ruby once with `brew install ruby@3.3`.

GitHub Pages continues to build the published site with Jekyll. The `github-pages` gem keeps that production dependency set aligned with GitHub Pages.

## Authoring

The Markdown files in this repository are the single source of truth. Jekyll renders those same files both for local preview and for GitHub Pages. JavaScript enhances the rendered pages with navigation and copy buttons, but documentation content must remain in Markdown.
