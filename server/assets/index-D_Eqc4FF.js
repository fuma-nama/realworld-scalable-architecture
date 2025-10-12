import { jsx, Fragment, jsxs } from "react/jsx-runtime";
let frontmatter = {
  "title": "Hello World",
  "description": "Your first `document`\nYou'll love it!\n"
};
let extractedReferences = [];
let structuredData = {
  "contents": [{
    "heading": void 0,
    "content": "Hey there! Fumadocs is the docs framework that also works on React Router!"
  }, {
    "heading": "heading",
    "content": "Hello World"
  }, {
    "heading": "heading-2",
    "content": "Head"
  }, {
    "heading": "heading-2",
    "content": "Description"
  }, {
    "heading": "heading-2",
    "content": "hello"
  }, {
    "heading": "heading-2",
    "content": "Hello World"
  }, {
    "heading": "heading-2",
    "content": "very important"
  }, {
    "heading": "heading-2",
    "content": "Hey"
  }, {
    "heading": "heading-2",
    "content": "Surprisingly"
  }, {
    "heading": "heading-2",
    "content": "Fumadocs"
  }, {
    "heading": "heading-2",
    "content": "very long text that looks weird"
  }, {
    "heading": "heading-2",
    "content": "hello world hello world hello world"
  }],
  "headings": [{
    "id": "heading",
    "content": "Heading"
  }, {
    "id": "heading-1",
    "content": "Heading"
  }, {
    "id": "heading-2",
    "content": "Heading"
  }]
};
const toc = [{
  depth: 2,
  url: "#heading",
  title: jsx(Fragment, {
    children: "Heading"
  })
}, {
  depth: 3,
  url: "#heading-1",
  title: jsx(Fragment, {
    children: "Heading"
  })
}, {
  depth: 4,
  url: "#heading-2",
  title: jsx(Fragment, {
    children: "Heading"
  })
}];
function _createMdxContent(props) {
  const _components = {
    code: "code",
    em: "em",
    h2: "h2",
    h3: "h3",
    h4: "h4",
    p: "p",
    pre: "pre",
    span: "span",
    strong: "strong",
    table: "table",
    tbody: "tbody",
    td: "td",
    th: "th",
    thead: "thead",
    tr: "tr",
    ...props.components
  }, { Card, Cards } = _components;
  if (!Card) _missingMdxReference("Card");
  if (!Cards) _missingMdxReference("Cards");
  return jsxs(Fragment, {
    children: [jsx(_components.p, {
      children: "Hey there! Fumadocs is the docs framework that also works on React Router!"
    }), "\n", jsx(_components.h2, {
      id: "heading",
      children: "Heading"
    }), "\n", jsx(_components.p, {
      children: "Hello World"
    }), "\n", jsxs(Cards, {
      children: [jsx(Card, {
        title: "Learn more about React Router",
        href: "https://reactrouter.com"
      }), jsx(Card, {
        title: "Learn more about Fumadocs",
        href: "https://fumadocs.dev"
      })]
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
        icon: '<svg viewBox="0 0 24 24"><path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z" fill="currentColor" /></svg>',
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
              children: "'I love React!'"
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
    }), "\n", jsx(_components.h3, {
      id: "heading-1",
      children: "Heading"
    }), "\n", jsx(_components.h4, {
      id: "heading-2",
      children: "Heading"
    }), "\n", jsxs(_components.table, {
      children: [jsx(_components.thead, {
        children: jsxs(_components.tr, {
          children: [jsx(_components.th, {
            children: "Head"
          }), jsx(_components.th, {
            children: "Description"
          })]
        })
      }), jsxs(_components.tbody, {
        children: [jsxs(_components.tr, {
          children: [jsx(_components.td, {
            children: jsx(_components.code, {
              children: "hello"
            })
          }), jsx(_components.td, {
            children: "Hello World"
          })]
        }), jsxs(_components.tr, {
          children: [jsxs(_components.td, {
            children: ["very ", jsx(_components.strong, {
              children: "important"
            })]
          }), jsx(_components.td, {
            children: "Hey"
          })]
        }), jsxs(_components.tr, {
          children: [jsx(_components.td, {
            children: jsx(_components.em, {
              children: "Surprisingly"
            })
          }), jsx(_components.td, {
            children: "Fumadocs"
          })]
        }), jsxs(_components.tr, {
          children: [jsx(_components.td, {
            children: "very long text that looks weird"
          }), jsx(_components.td, {
            children: "hello world hello world hello world"
          })]
        })]
      })]
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
