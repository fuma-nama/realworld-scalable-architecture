import { e as createContentHighlighter } from "./server-build-BA_6yk4N.js";
import "react/jsx-runtime";
import "node:stream";
import "@react-router/node";
import "react-router";
import "isbot";
import "react-dom/server";
import "next-themes";
import "react";
import "@radix-ui/react-direction";
import "tailwind-merge";
import "class-variance-authority";
import "@radix-ui/react-navigation-menu";
import "@radix-ui/react-popover";
import "@radix-ui/react-scroll-area";
import "@radix-ui/react-collapsible";
import "@radix-ui/react-presence";
import "scroll-into-view-if-needed";
import "fumadocs-mdx/runtime/vite";
import "github-slugger";
import "@radix-ui/react-tabs";
import "@orama/orama";
function groupResults(hits) {
  const grouped = [];
  const scannedUrls = /* @__PURE__ */ new Set();
  for (const hit of hits) {
    if (!scannedUrls.has(hit.url)) {
      scannedUrls.add(hit.url);
      grouped.push({
        id: hit.url,
        type: "page",
        breadcrumbs: hit.breadcrumbs,
        url: hit.url,
        content: hit.title
      });
    }
    grouped.push({
      id: hit.objectID,
      type: hit.content === hit.section ? "heading" : "text",
      url: hit.section_id ? `${hit.url}#${hit.section_id}` : hit.url,
      content: hit.content
    });
  }
  return grouped;
}
async function searchDocs(query, { indexName, onSearch, client, locale, tag }) {
  if (query.trim().length === 0) return [];
  const result = onSearch ? await onSearch(query, tag, locale) : await client.searchForHits({
    requests: [
      {
        type: "default",
        indexName,
        query,
        distinct: 5,
        hitsPerPage: 10,
        filters: tag ? `tag:${tag}` : void 0
      }
    ]
  });
  const highlighter = createContentHighlighter(query);
  return groupResults(result.results[0].hits).flatMap((hit) => {
    if (hit.type === "page") {
      return {
        ...hit,
        contentWithHighlights: hit.contentWithHighlights ?? highlighter.highlight(hit.content)
      };
    }
    return [];
  });
}
export {
  groupResults,
  searchDocs
};
