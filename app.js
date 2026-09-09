const base = document.body.dataset.base || "";

const favicon = document.createElement("link");
favicon.rel = "icon";
favicon.type = "image/png";
favicon.href = `${base}assets/foundry-icon.png`;
document.head.append(favicon);

const controlLinks = [
    ["Button", "button-control.html"],
    ["Colour", "colour.html"],
    ["Date", "date-control.html"],
    ["Divider", "divider-control.html"],
    ["Icon", "icon-control.html"],
    ["Link", "link-control.html"],
    ["Margin", "margin-control.html"],
    ["Math", "math-control.html"],
    ["Note", "note-control.html"],
    ["Number", "number-control.html"],
    ["Padding", "padding-control.html"],
    ["Select", "select-control.html"],
    ["Shadow", "shadow-control.html"],
    ["Slider", "slider-control.html"],
    ["Text", "text-control.html"],
    ["Text alignment", "text-alignment.html"],
    ["Text area", "text-area-control.html"],
    ["Theme colour", "theme-colour-control.html"],
    ["Toggle", "toggle-control.html"],
    ["Control arrays", "control-arrays.html"],
    ["Conditional visibility", "enable-control.html"]
];

const templateLinks = [
    ["Primary HTML", "templates.html#primary-html"],
    ["CSS", "templates.html#css"],
    ["JavaScript", "templates.html#javascript"],
    ["PHP", "templates.html#php"],
    ["Additional HTML", "templates.html#additional-html"],
    ["Editor CSS", "templates.html#editor-css"]
];

const sections = [
    { title: "Getting started", links: [["Overview", "index.html"], ["Build your first component", "quick-start.html"]] },
    { title: "Package structure", links: [["Bundle structure", "bundle-structure.html"], ["Collections & nested packs", "nested-packs.html"]] },
    { title: "Info.plist", links: [
        ["Identity & metadata", "manifest-identity.html"],
        ["Custom controls", "custom-controls.html", controlLinks],
        ["Template declarations", "templates.html", templateLinks],
        ["Libraries & assets", "manifest-resources.html"],
        ["Child slots", "slots.html"],
        ["Support & recovery", "manifest-support.html"]
    ] },
    { title: "Template language", links: [["Values & macros", "template-values.html"], ["Editable content", "editable-text.html"]] },
    { title: "Themes", links: [["Theme values", "theme-controls.html"], ["Theme bundles", "theme-bundles.html"]] },
    { title: "Reference", links: [["API map", "components.html"]] },
];

const pageName = value => value.split("#")[0];

const nav = document.querySelector("[data-doc-nav]");
if (nav) {
    const current = window.location.pathname.split("/").pop() || "index.html";
    const currentLocation = `${current}${window.location.hash}`;
    nav.innerHTML = `
        <a class="brand" href="${base}index.html"><img class="brand-mark" src="${base}assets/foundry-icon.png" alt=""><span class="brand-copy"><strong>Foundry</strong><small>Developer API v1</small></span></a>
        <input class="search" type="search" placeholder="Search topics" aria-label="Filter documentation">
        <div data-nav-sections></div>`;
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
                    const branchLinks = children
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
    nav.querySelector(".search").addEventListener("input", event => render(event.target.value));
}

const currentPage = window.location.pathname.split("/").pop() || "index.html";
const breadcrumbParents = {
    "bundle-structure.html": ["Package structure", "bundle-structure.html"],
    "nested-packs.html": ["Package structure", "bundle-structure.html"],
    "manifest-identity.html": ["Info.plist", null],
    "templates.html": ["Info.plist", null],
    "manifest-resources.html": ["Info.plist", null],
    "custom-controls.html": ["Info.plist", null],
    "slots.html": ["Info.plist", null],
    "manifest-support.html": ["Info.plist", null],
    "template-values.html": ["Template language", "template-values.html"],
    "editable-text.html": ["Template language", "template-values.html"],
    "theme-controls.html": ["Themes", "theme-controls.html"],
    "theme-bundles.html": ["Themes", "theme-controls.html"],
    "components.html": ["Reference", "components.html"],
};

const breadcrumbs = document.querySelector(".breadcrumbs");
if (breadcrumbs) {
    if (controlLinks.some(([, href]) => href === currentPage)) {
        breadcrumbs.innerHTML = `<a href="${base}index.html">Foundry Developer</a><span>›</span><span>Info.plist</span><span>›</span><a href="${base}custom-controls.html">Custom controls</a>`;
    } else if (breadcrumbParents[currentPage]) {
        const [label, href] = breadcrumbParents[currentPage];
        const parent = href ? `<a href="${base}${href}">${label}</a>` : `<span>${label}</span>`;
        breadcrumbs.innerHTML = `<a href="${base}index.html">Foundry Developer</a><span>›</span>${parent}`;
    }
}

const main = document.querySelector("main");
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
        await navigator.clipboard.writeText(code.textContent);
        button.textContent = "Copied";
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
        toc.innerHTML = `<strong>On this page</strong><ol>${headings.map(heading => `<li><a href="#${heading.id}">${heading.textContent}</a></li>`).join("")}</ol>`;
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
