import { e as createContentHighlighter, r as removeUndefined } from "./server-build-Byanh-JZ.js";
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
async function searchDocs(query, options) {
  const highlighter = createContentHighlighter(query);
  const list = [];
  const { index = "default", client, params: extraParams = {}, tag } = options;
  if (index === "crawler") {
    const result2 = await client.search({
      ...extraParams,
      term: query,
      where: {
        category: tag ? {
          eq: tag.slice(0, 1).toUpperCase() + tag.slice(1)
        } : void 0,
        ...extraParams.where
      },
      limit: 10
    });
    if (!result2) return list;
    for (const hit of result2.hits) {
      const doc = hit.document;
      list.push(
        {
          id: hit.id,
          type: "page",
          content: doc.title,
          contentWithHighlights: highlighter.highlight(doc.title),
          url: doc.path
        },
        {
          id: "page" + hit.id,
          type: "text",
          content: doc.content,
          contentWithHighlights: highlighter.highlight(doc.content),
          url: doc.path
        }
      );
    }
    return list;
  }
  const params = {
    ...extraParams,
    term: query,
    where: removeUndefined({
      tag,
      ...extraParams.where
    }),
    groupBy: {
      properties: ["page_id"],
      maxResult: 7,
      ...extraParams.groupBy
    }
  };
  const result = await client.search(params);
  if (!result || !result.groups) return list;
  for (const item of result.groups) {
    let addedHead = false;
    for (const hit of item.result) {
      const doc = hit.document;
      if (!addedHead) {
        list.push({
          id: doc.page_id,
          type: "page",
          content: doc.title,
          breadcrumbs: doc.breadcrumbs,
          contentWithHighlights: highlighter.highlight(doc.title),
          url: doc.url
        });
        addedHead = true;
      }
      list.push({
        id: doc.id,
        content: doc.content,
        contentWithHighlights: highlighter.highlight(doc.content),
        type: doc.content === doc.section ? "heading" : "text",
        url: doc.section_id ? `${doc.url}#${doc.section_id}` : doc.url
      });
    }
  }
  return list;
}
export {
  searchDocs
};
