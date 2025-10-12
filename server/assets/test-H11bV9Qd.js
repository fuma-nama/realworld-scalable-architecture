import { jsx, Fragment, jsxs } from "react/jsx-runtime";
let frontmatter = {
  "title": "Test",
  "description": "A document to test Fumadocs"
};
let extractedReferences = [];
let structuredData = {
  "contents": [{
    "heading": void 0,
    "content": "Hey there!"
  }, {
    "heading": "list",
    "content": "Hello"
  }, {
    "heading": "list",
    "content": "World"
  }],
  "headings": [{
    "id": "cards",
    "content": "Cards"
  }, {
    "id": "codeblock",
    "content": "CodeBlock"
  }, {
    "id": "list",
    "content": "List"
  }]
};
const toc = [{
  depth: 2,
  url: "#cards",
  title: jsx(Fragment, {
    children: "Cards"
  })
}, {
  depth: 3,
  url: "#codeblock",
  title: jsx(Fragment, {
    children: "CodeBlock"
  })
}, {
  depth: 4,
  url: "#list",
  title: jsx(Fragment, {
    children: "List"
  })
}];
function _createMdxContent(props) {
  const _components = {
    code: "code",
    h2: "h2",
    h3: "h3",
    h4: "h4",
    li: "li",
    p: "p",
    pre: "pre",
    span: "span",
    ul: "ul",
    ...props.components
  }, { Card, Cards } = _components;
  if (!Card) _missingMdxReference("Card");
  if (!Cards) _missingMdxReference("Cards");
  return jsxs(Fragment, {
    children: [jsx(_components.p, {
      children: "Hey there!"
    }), "\n", jsx(_components.h2, {
      id: "cards",
      children: "Cards"
    }), "\n", jsxs(Cards, {
      children: [jsx(Card, {
        title: "Learn more about Next.js",
        href: "https://nextjs.org/docs"
      }), jsx(Card, {
        title: "Learn more about Fumadocs",
        href: "https://fumadocs.dev"
      })]
    }), "\n", jsx(_components.h3, {
      id: "codeblock",
      children: "CodeBlock"
    }), "\n", jsx(Fragment, {
      children: jsx(_components.pre, {
        className: "shiki shiki-themes github-light github-dark",
        style: {
          "--shiki-light": "#24292e",
          "--shiki-dark": "#e1e4e8",
          "--shiki-light-bg": "#fff",
          "--shiki-dark-bg": "#24292e"
        },
        tabIndex: "0",
        icon: '<svg viewBox="0 0 24 24"><path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z" fill="currentColor" /></svg>',
        children: jsx(_components.code, {
          children: jsxs(_components.span, {
            className: "line",
            children: [jsx(_components.span, {
              style: {
                "--shiki-light": "#24292E",
                "--shiki-dark": "#E1E4E8"
              },
              children: "console."
            }), jsx(_components.span, {
              style: {
                "--shiki-light": "#6F42C1",
                "--shiki-dark": "#B392F0"
              },
              children: "log"
            }), jsx(_components.span, {
              style: {
                "--shiki-light": "#24292E",
                "--shiki-dark": "#E1E4E8"
              },
              children: "("
            }), jsx(_components.span, {
              style: {
                "--shiki-light": "#032F62",
                "--shiki-dark": "#9ECBFF"
              },
              children: "'Hello World'"
            }), jsx(_components.span, {
              style: {
                "--shiki-light": "#24292E",
                "--shiki-dark": "#E1E4E8"
              },
              children: ");"
            })]
          })
        })
      })
    }), "\n", jsx(_components.h4, {
      id: "list",
      children: "List"
    }), "\n", jsxs(_components.ul, {
      children: ["\n", jsx(_components.li, {
        children: "Hello"
      }), "\n", jsx(_components.li, {
        children: "World"
      }), "\n"]
    })]
  });
}
function MDXContent(props = {}) {
  const { wrapper: MDXLayout } = props.components || {};
  return MDXLayout ? jsx(MDXLayout, {
    ...props,
    children: jsx(_createMdxContent, {
      ...props
    })
  }) : _createMdxContent(props);
}
function _missingMdxReference(id, component) {
  throw new Error("Expected component `" + id + "` to be defined: you likely forgot to import, pass, or provide it.");
}
export {
  MDXContent as default,
  extractedReferences,
  frontmatter,
  structuredData,
  toc
};
