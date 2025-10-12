import { _ as __toESM, g as __commonJS } from "./server-build-BA_6yk4N.js";
import Slugger from "github-slugger";
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
import "@radix-ui/react-tabs";
import "@orama/orama";
var require_remove_markdown = __commonJS({
  "../../node_modules/.pnpm/remove-markdown@0.6.2/node_modules/remove-markdown/index.js"(exports, module) {
    module.exports = function(md, options) {
      options = options || {};
      options.listUnicodeChar = options.hasOwnProperty("listUnicodeChar") ? options.listUnicodeChar : false;
      options.stripListLeaders = options.hasOwnProperty("stripListLeaders") ? options.stripListLeaders : true;
      options.gfm = options.hasOwnProperty("gfm") ? options.gfm : true;
      options.useImgAltText = options.hasOwnProperty("useImgAltText") ? options.useImgAltText : true;
      options.abbr = options.hasOwnProperty("abbr") ? options.abbr : false;
      options.replaceLinksWithURL = options.hasOwnProperty("replaceLinksWithURL") ? options.replaceLinksWithURL : false;
      options.htmlTagsToSkip = options.hasOwnProperty("htmlTagsToSkip") ? options.htmlTagsToSkip : [];
      options.throwError = options.hasOwnProperty("throwError") ? options.throwError : false;
      var output = md || "";
      output = output.replace(/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/gm, "");
      try {
        if (options.stripListLeaders) {
          if (options.listUnicodeChar)
            output = output.replace(/^([\s\t]*)([\*\-\+]|\d+\.)\s+/gm, options.listUnicodeChar + " $1");
          else
            output = output.replace(/^([\s\t]*)([\*\-\+]|\d+\.)\s+/gm, "$1");
        }
        if (options.gfm) {
          output = output.replace(/\n={2,}/g, "\n").replace(/~{3}.*\n/g, "").replace(/~~/g, "").replace(/```(?:.*)\n([\s\S]*?)```/g, (_, code) => code.trim());
        }
        if (options.abbr) {
          output = output.replace(/\*\[.*\]:.*\n/, "");
        }
        let htmlReplaceRegex = /<[^>]*>/g;
        if (options.htmlTagsToSkip && options.htmlTagsToSkip.length > 0) {
          const joinedHtmlTagsToSkip = options.htmlTagsToSkip.join("|");
          htmlReplaceRegex = new RegExp(
            `<(?!/?(${joinedHtmlTagsToSkip})(?=>|s[^>]*>))[^>]*>`,
            "g"
          );
        }
        output = output.replace(htmlReplaceRegex, "").replace(/^[=\-]{2,}\s*$/g, "").replace(/\[\^.+?\](\: .*?$)?/g, "").replace(/\s{0,2}\[.*?\]: .*?$/g, "").replace(/\!\[(.*?)\][\[\(].*?[\]\)]/g, options.useImgAltText ? "$1" : "").replace(/\[([\s\S]*?)\]\s*[\(\[].*?[\)\]]/g, options.replaceLinksWithURL ? "$2" : "$1").replace(/^(\n)?\s{0,3}>\s?/gm, "$1").replace(/^\s{1,2}\[(.*?)\]: (\S+)( ".*?")?\s*$/g, "").replace(/^(\n)?\s{0,}#{1,6}\s*( (.+))? +#+$|^(\n)?\s{0,}#{1,6}\s*( (.+))?$/gm, "$1$3$4$6").replace(/([\*]+)(\S)(.*?\S)??\1/g, "$2$3").replace(/(^|\W)([_]+)(\S)(.*?\S)??\2($|\W)/g, "$1$3$4$5").replace(/(`{3,})(.*?)\1/gm, "$2").replace(/`(.+?)`/g, "$1").replace(/~(.*?)~/g, "$1");
      } catch (e) {
        if (options.throwError) throw e;
        console.error("remove-markdown encountered error: %s", e);
        return md;
      }
      return output;
    };
  }
});
var import_remove_markdown = __toESM(require_remove_markdown());
var slugger = new Slugger();
function extractHeadingTitle(text) {
  const trimmedText = text.trim();
  if (!trimmedText.startsWith("#")) {
    return "";
  }
  const lines = trimmedText.split("\n");
  const firstLine = lines[0]?.trim();
  if (firstLine) {
    const plainText = (0, import_remove_markdown.default)(firstLine, {
      useImgAltText: false
    });
    return plainText;
  }
  return "";
}
async function search(query, options) {
  const { client, vectorStoreId, tag } = options;
  if (!query.trim()) {
    return [];
  }
  const res = await client.vectorStores.search({
    query,
    vector_store_identifiers: [vectorStoreId],
    top_k: 10,
    filters: {
      key: "generated_metadata.tag",
      operator: "eq",
      value: tag
    },
    search_options: {
      return_metadata: true
    }
  });
  return res.data.flatMap((item) => {
    const metadata = item.generated_metadata;
    const url = metadata.url || "#";
    const title = metadata.title || "Untitled";
    const chunkResults = [
      {
        id: `${item.file_id}-${item.chunk_index}-page`,
        type: "page",
        content: title,
        url
      }
    ];
    const headingTitle = item.type === "text" ? extractHeadingTitle(item.text) : "";
    if (headingTitle) {
      slugger.reset();
      chunkResults.push({
        id: `${item.file_id}-${item.chunk_index}-heading`,
        type: "heading",
        content: headingTitle,
        url: `${url}#${slugger.slug(headingTitle)}`
      });
    }
    return chunkResults;
  });
}
export {
  search
};
