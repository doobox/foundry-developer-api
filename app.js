const base = document.body.dataset.base || "";

// Use the same stable heading identifiers on pages and in search results.
function anchorHeadings(root) {
    const used = new Set([...root.querySelectorAll("[id]")].map(node => node.id));
    return [...root.querySelectorAll("h2, h3")].map(heading => {
        if (!heading.id) {
            const stem = heading.textContent.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "section";
            let id = stem;
            let suffix = 2;
            while (used.has(id)) id = `${stem}-${suffix++}`;
            heading.id = id;
            used.add(id);
        }
        return heading;
    });
}
const escapeHTML = text => text.replace(/[&<>"']/g, character => ({"&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;"}[character]));
const normalizeSearch = text => text.toLowerCase().replace(/colour/g, "color").replace(/[^a-z0-9]+/g, " ").trim();
let searchIndex;
async function loadSearch() {
    if (!searchIndex) searchIndex = fetch(`${base}search.json`).then(response => {
        if (!response.ok) throw new Error("Search unavailable");
        return response.json();
    }).then(pages => pages.flatMap(page => {
        const document = new DOMParser().parseFromString(page.html.replace(/\{%\s*(?:(?:end)?raw|include\s+[^%]+)\s*%\}/g, ""), "text/html");
        anchorHeadings(document.body);
        document.querySelectorAll(".breadcrumbs, .eyebrow").forEach(node => node.remove());
        document.querySelectorAll(".property-meta span").forEach(node => node.append(" "));
        const entries = [{title: page.title.replace(/ · Foundry Developer$/, ""), heading: "Overview", url: page.url, text: (document.querySelector(".lede")?.textContent || document.body.textContent).replace(/\s+/g, " ").trim()}];
        document.querySelectorAll("h2, h3").forEach(heading => {
            let text = "";
            for (let node = heading.nextElementSibling; node && !/^H[23]$/.test(node.tagName); node = node.nextElementSibling) text += ` ${node.textContent}`;
            entries.push({title: entries[0].title, heading: heading.textContent.trim(), url: `${page.url}#${heading.id}`, text: text.replace(/\s+/g, " ").trim()});
        });
        return entries;
    })).catch(error => { searchIndex = null; throw error; });
    return searchIndex;
}

const favicon = document.createElement("link");
favicon.rel = "icon";
favicon.type = "image/png";
favicon.href = `${base}assets/foundry-icon.png`;
document.head.append(favicon);

const sections = JSON.parse(document.getElementById("docs-navigation").textContent);

const pageName = value => value.split("#")[0];

const nav = document.querySelector("[data-doc-nav]");
if (nav) {
    const current = window.location.pathname.split("/").pop() || "index.html";
    const currentLocation = `${current}${window.location.hash}`;
    nav.innerHTML = `
        <a class="brand" href="${base}index.html"><img class="brand-mark" src="${base}assets/foundry-icon.png" alt=""><span class="brand-copy"><strong>Foundry</strong><small>Developer API v1</small></span></a>
        <button class="mobile-nav-toggle" type="button" aria-controls="docs-browser" aria-expanded="false">Browse documentation</button>
        <div id="docs-browser">
        <input class="search" type="search" placeholder="Search docs…" aria-label="Search documentation" aria-controls="search-results">
        <div id="search-results" hidden></div>
        <div data-nav-sections></div></div>`;
    const toggle = nav.querySelector(".mobile-nav-toggle");
    const browser = nav.querySelector("#docs-browser");
    const narrow = window.matchMedia("(max-width: 820px)");
    function setBrowserOpen(open) {
        toggle.setAttribute("aria-expanded", String(open));
        browser.hidden = !open;
    }
    setBrowserOpen(!narrow.matches);
    narrow.addEventListener("change", () => setBrowserOpen(!narrow.matches));
    toggle.addEventListener("click", () => setBrowserOpen(browser.hidden));
    const container = nav.querySelector("[data-nav-sections]");
    const render = (query = "") => {
        const normalized = query.trim().toLowerCase();
        const visible = sections.map(section => ({
            ...section,
            links: section.links.filter(([label, , children]) => !normalized || `${section.title} ${label} ${(children || []).map(([child]) => child).join(" ")}`.toLowerCase().includes(normalized))
        })).filter(section => section.links.length);
        container.innerHTML = visible.length ? visible.map((section, index) => {
            const sectionActive = section.links.some(([, href, children]) =>
                pageName(href) === current || (children || []).some(([, childHref]) => pageName(childHref) === current)
            );
            const expanded = Boolean(normalized || sectionActive);
            return `
            <section class="nav-section${expanded ? " is-open" : ""}">
                <h2 class="nav-heading">
                    <button class="nav-disclosure" type="button" aria-expanded="${expanded}" aria-controls="nav-section-${index}">
                        <span class="nav-chevron" aria-hidden="true"></span>
                        ${section.title}
                    </button>
                </h2>
                <ul class="nav-list" id="nav-section-${index}"${expanded ? "" : " hidden"}>${section.links.map(([label, href, children], linkIndex) => {
                    const branchActive = pageName(href) === current || (children || []).some(([, childHref]) => pageName(childHref) === current);
                    if (!children) {
                        return `<li><a ${href === currentLocation || (href === current && !window.location.hash) ? 'aria-current="page"' : ""} href="${base}${href}">${label}</a></li>`;
                    }
                    const branchExpanded = Boolean(normalized || branchActive);
                    const branchID = `nav-branch-${index}-${linkIndex}`;
                    const branchLinks = (children.some(([, childHref]) => childHref === href) ? children : [["Overview", href], ...children])
                        .filter(([child]) => !normalized || child.toLowerCase().includes(normalized) || label.toLowerCase().includes(normalized));
                    return `<li class="nav-branch">
                        <button class="nav-disclosure nav-branch-toggle" type="button" aria-expanded="${branchExpanded}" aria-controls="${branchID}">
                            <span class="nav-chevron" aria-hidden="true"></span>
                            ${label}
                        </button>
                        <ul class="nav-children" id="${branchID}"${branchExpanded ? "" : " hidden"}>${branchLinks.map(([child, childHref]) => `<li><a ${childHref === currentLocation || (childHref === current && !window.location.hash) ? 'aria-current="page"' : ""} href="${base}${childHref}">${child}</a></li>`).join("")}</ul>
                    </li>`;
                }).join("")}</ul>
            </section>`;
        }).join("") : '<p class="nav-empty">No matching topics.</p>';

        container.querySelectorAll(".nav-disclosure").forEach(button => {
            button.addEventListener("click", () => {
                const list = document.getElementById(button.getAttribute("aria-controls"));
                const expanded = button.getAttribute("aria-expanded") === "true";

                if (!expanded && button.closest(".nav-heading")) {
                    container.querySelectorAll(".nav-heading .nav-disclosure[aria-expanded=\"true\"]").forEach(openButton => {
                        if (openButton === button) return;
                        openButton.setAttribute("aria-expanded", "false");
                        document.getElementById(openButton.getAttribute("aria-controls")).hidden = true;
                    });
                }

                button.setAttribute("aria-expanded", String(!expanded));
                list.hidden = expanded;
            });
        });
    };
    render();
    const input = nav.querySelector(".search");
    const results = nav.querySelector("#search-results");
    let request = 0;
    input.addEventListener("input", async () => {
        const version = ++request;
        const query = normalizeSearch(input.value);
        results.hidden = !query;
        container.hidden = Boolean(query);
        if (!query) return;
        results.innerHTML = '<p role="status">Searching…</p>';
        try {
            const entries = await loadSearch();
            if (version !== request) return;
            const terms = query.split(" ");
            const matches = entries.map(entry => {
                const heading = normalizeSearch(entry.heading);
                const title = normalizeSearch(entry.title);
                const haystack = normalizeSearch(`${entry.title} ${entry.heading} ${entry.text}`);
                const score = terms.every(term => haystack.includes(term)) ? 1 + (heading === query ? 30 : 0) + (heading.includes(query) ? 10 : 0) + (title.includes(query) ? 5 : 0) + (haystack.includes(query) ? 3 : 0) : 0;
                return {...entry, score};
            }).filter(entry => entry.score).sort((a, b) => b.score - a.score).slice(0, 20);
            results.innerHTML = `<p role="status">${matches.length ? `Showing ${matches.length} results` : "No results. Try a control or property name."}</p><ul>${matches.map(entry => `<li><a href="${escapeHTML(entry.url)}"><strong>${escapeHTML(entry.title)}</strong><span>${escapeHTML(entry.heading)}</span><small>${escapeHTML(entry.text.slice(0, 160))}${entry.text.length > 160 ? "…" : ""}</small></a></li>`).join("")}</ul>`;
        } catch {
            if (version === request) results.innerHTML = '<p role="status">Search could not load. Clear the search to browse the sidebar, or type again to retry.</p>';
        }
    });
    document.addEventListener("keydown", event => {
        if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") { event.preventDefault(); setBrowserOpen(true); input.focus(); input.select(); }
        if (event.key === "Escape" && document.activeElement === input) { input.value = ""; input.dispatchEvent(new Event("input")); }
    });
    nav.addEventListener("click", event => {
        if (event.target.closest("a") && !input.value) {
            try { sessionStorage.setItem("docs-nav-scroll", String(nav.scrollTop)); } catch {}
        }
    });
    try { nav.scrollTop = Number(sessionStorage.getItem("docs-nav-scroll")) || 0; } catch {}
}

const currentPage = window.location.pathname.split("/").pop() || "index.html";
const main = document.querySelector("main");
if (main) {
    anchorHeadings(main).forEach(heading => {
        const link = document.createElement("a");
        link.className = "heading-anchor";
        link.href = `#${heading.id}`;
        link.setAttribute("aria-label", `Link to ${heading.textContent.trim()}`);
        link.textContent = "#";
        heading.append(link);
    });
    if (window.location.hash) document.getElementById(decodeURIComponent(window.location.hash.slice(1)))?.scrollIntoView();
}
document.querySelectorAll("pre > code").forEach(code => {
    const pre = code.parentElement;
    const container = pre.closest(".highlight") || pre;
    container.classList.add("code-snippet");

    const button = document.createElement("button");
    button.className = "copy-code";
    button.type = "button";
    button.textContent = "Copy";
    button.setAttribute("aria-label", "Copy code snippet");
    button.addEventListener("click", async () => {
        try {
            await navigator.clipboard.writeText(code.textContent);
            button.textContent = "Copied";
        } catch { button.textContent = "Select and copy"; }
        window.setTimeout(() => { button.textContent = "Copy"; }, 1400);
    });
    container.append(button);
});

if (main && currentPage !== "index.html" && currentPage !== "quick-start.html") {
    const headings = [...main.querySelectorAll(":scope > h2")];
    if (headings.length >= 3) {
        const usedIDs = new Set();
        headings.forEach(heading => {
            if (!heading.id) {
                const root = heading.textContent.trim().toLowerCase()
                    .replace(/[^a-z0-9]+/g, "-")
                    .replace(/^-|-$/g, "") || "section";
                let id = root;
                let suffix = 2;
                while (usedIDs.has(id) || document.getElementById(id)) id = `${root}-${suffix++}`;
                heading.id = id;
            }
            usedIDs.add(heading.id);
        });

        const article = document.createElement("article");
        article.className = "doc-article";
        while (main.firstChild) article.append(main.firstChild);

        const toc = document.createElement("aside");
        toc.className = "page-toc";
        toc.setAttribute("aria-label", "On this page");
        toc.innerHTML = `<strong>On this page</strong><ol>${headings.map(heading => {
            const properties = [];
            for (let node = heading.nextElementSibling; node && node.tagName !== "H2"; node = node.nextElementSibling) if (node.tagName === "H3") properties.push(node);
            const title = heading.textContent.replace(/#$/, "");
            return `<li><a href="#${heading.id}">${escapeHTML(title)}</a>${properties.length ? `<details><summary>Properties</summary><ol>${properties.map(property => `<li><a href="#${property.id}">${escapeHTML(property.textContent.replace(/#$/, ""))}</a></li>`).join("")}</ol></details>` : ""}</li>`;
        }).join("")}</ol>`;
        main.classList.add("with-page-toc");
        main.append(article, toc);

        if ("IntersectionObserver" in window) {
            const links = new Map([...toc.querySelectorAll("a")].map(link => [link.hash.slice(1), link]));
            const observer = new IntersectionObserver(entries => {
                const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
                if (!visible) return;
                links.forEach(link => link.removeAttribute("aria-current"));
                links.get(visible.target.id)?.setAttribute("aria-current", "location");
            }, { rootMargin: "-12% 0px -76% 0px" });
            headings.forEach(heading => observer.observe(heading));
        }
    }
}
