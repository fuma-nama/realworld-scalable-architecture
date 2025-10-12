import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { ServerRouter, Link as Link$2, useNavigate, useRevalidator, useParams, useLocation, UNSAFE_withComponentProps, Outlet, UNSAFE_withErrorBoundaryProps, isRouteErrorResponse, Meta, Links, ScrollRestoration, Scripts } from "react-router";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { ThemeProvider, useTheme } from "next-themes";
import * as React from "react";
import React__default, { useState, useRef, useMemo, useEffect, createContext as createContext$1, useContext, lazy, forwardRef, createElement, useLayoutEffect, Fragment as Fragment$1, useCallback } from "react";
import { DirectionProvider } from "@radix-ui/react-direction";
import { twMerge } from "tailwind-merge";
import { cva } from "class-variance-authority";
import * as Primitive from "@radix-ui/react-navigation-menu";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";
import { Presence } from "@radix-ui/react-presence";
import scrollIntoView from "scroll-into-view-if-needed";
import { fromConfig, toClientRenderer } from "fumadocs-mdx/runtime/vite";
import Slugger from "github-slugger";
import * as Primitive$1 from "@radix-ui/react-tabs";
import { search, getByID, save, create as create$1, insertMultiple } from "@orama/orama";
const streamTimeout = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, routerContext, loadContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    let userAgent = request.headers.get("user-agent");
    let readyOption = userAgent && isbot(userAgent) || routerContext.isSpaMode ? "onAllReady" : "onShellReady";
    let timeoutId = setTimeout(
      () => abort(),
      streamTimeout + 1e3
    );
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(ServerRouter, { context: routerContext, url: request.url }),
      {
        [readyOption]() {
          shellRendered = true;
          const body = new PassThrough({
            final(callback) {
              clearTimeout(timeoutId);
              timeoutId = void 0;
              callback();
            }
          });
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          pipe(body);
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest,
  streamTimeout
}, Symbol.toStringTag, { value: "Module" }));
var notImplemented = () => {
  throw new Error(
    "You need to wrap your application inside `FrameworkProvider`."
  );
};
var FrameworkContext = createContext("FrameworkContext", {
  useParams: notImplemented,
  useRouter: notImplemented,
  usePathname: notImplemented
});
function FrameworkProvider({
  Link: Link22,
  useRouter: useRouter2,
  useParams: useParams2,
  usePathname: usePathname2,
  Image: Image2,
  children
}) {
  const framework2 = React__default.useMemo(
    () => ({
      usePathname: usePathname2,
      useRouter: useRouter2,
      Link: Link22,
      Image: Image2,
      useParams: useParams2
    }),
    [Link22, usePathname2, useRouter2, useParams2, Image2]
  );
  return /* @__PURE__ */ jsx(FrameworkContext.Provider, { value: framework2, children });
}
function usePathname() {
  return FrameworkContext.use().usePathname();
}
function useRouter() {
  return FrameworkContext.use().useRouter();
}
function Image$1(props) {
  const { Image: Image2 } = FrameworkContext.use();
  if (!Image2) {
    const { src, alt, priority, ...rest2 } = props;
    return /* @__PURE__ */ jsx(
      "img",
      {
        alt,
        src,
        fetchPriority: priority ? "high" : "auto",
        ...rest2
      }
    );
  }
  return /* @__PURE__ */ jsx(Image2, { ...props });
}
function Link$1(props) {
  const { Link: Link22 } = FrameworkContext.use();
  if (!Link22) {
    const { href, prefetch: _, ...rest2 } = props;
    return /* @__PURE__ */ jsx("a", { href, ...rest2 });
  }
  return /* @__PURE__ */ jsx(Link22, { ...props });
}
function createContext(name, v) {
  const Context2 = React__default.createContext(v);
  return {
    Provider: (props) => {
      return /* @__PURE__ */ jsx(Context2.Provider, { value: props.value, children: props.children });
    },
    use: (errorMessage) => {
      const value = React__default.useContext(Context2);
      if (!value)
        throw new Error(
          errorMessage ?? `Provider of ${name} is required but missing.`
        );
      return value;
    }
  };
}
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  __defProp(target, "default", { value: mod, enumerable: true }),
  mod
));
function isDifferent(a, b) {
  if (Array.isArray(a) && Array.isArray(b)) {
    return b.length !== a.length || a.some((v, i) => isDifferent(v, b[i]));
  }
  return a !== b;
}
function useOnChange(value, onChange, isUpdated = isDifferent) {
  const [prev, setPrev] = useState(value);
  if (isUpdated(prev, value)) {
    onChange(value, prev);
    setPrev(value);
  }
}
const SidebarContext = createContext("SidebarContext");
function useSidebar() {
  return SidebarContext.use();
}
function SidebarProvider({ children }) {
  const closeOnRedirect = useRef(true);
  const [open, setOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  useOnChange(pathname, () => {
    if (closeOnRedirect.current) {
      setOpen(false);
    }
    closeOnRedirect.current = true;
  });
  return jsx(SidebarContext.Provider, { value: useMemo(() => ({
    open,
    setOpen,
    collapsed,
    setCollapsed,
    closeOnRedirect
  }), [open, collapsed]), children });
}
const SearchContext = createContext("SearchContext", {
  enabled: false,
  hotKey: [],
  setOpenSearch: () => void 0
});
function useSearchContext() {
  return SearchContext.use();
}
function MetaOrControl() {
  const [key, setKey] = useState("⌘");
  useEffect(() => {
    const isWindows = window.navigator.userAgent.includes("Windows");
    if (isWindows)
      setKey("Ctrl");
  }, []);
  return key;
}
function SearchProvider({ SearchDialog, children, preload = true, options, hotKey = [
  {
    key: (e) => e.metaKey || e.ctrlKey,
    display: jsx(MetaOrControl, {})
  },
  {
    key: "k",
    display: "K"
  }
], links: links2 }) {
  const [isOpen, setIsOpen] = useState(preload ? false : void 0);
  useEffect(() => {
    const handler = (e) => {
      if (hotKey.every((v) => typeof v.key === "string" ? e.key === v.key : v.key(e))) {
        setIsOpen(true);
        e.preventDefault();
      }
    };
    window.addEventListener("keydown", handler);
    return () => {
      window.removeEventListener("keydown", handler);
    };
  }, [hotKey]);
  return jsxs(SearchContext.Provider, { value: useMemo(() => ({
    enabled: true,
    hotKey,
    setOpenSearch: setIsOpen
  }), [hotKey]), children: [isOpen !== void 0 && jsx(SearchDialog, {
    open: isOpen,
    onOpenChange: setIsOpen,
    // @ts-expect-error -- insert prop for official UIs
    links: links2,
    ...options
  }), children] });
}
const defaultTranslations = {
  search: "Search",
  searchNoResult: "No results found",
  toc: "On this page",
  tocNoHeadings: "No Headings",
  lastUpdate: "Last updated on",
  chooseLanguage: "Choose a language",
  nextPage: "Next Page",
  previousPage: "Previous Page",
  chooseTheme: "Theme",
  editOnGithub: "Edit on GitHub"
};
const I18nContext = createContext$1({
  text: defaultTranslations
});
function I18nLabel(props) {
  const { text } = useI18n();
  return text[props.label];
}
function useI18n() {
  return useContext(I18nContext);
}
const DefaultSearchDialog = lazy(() => import("./search-default-DrmYfUQ2.js"));
function RootProvider$1({ children, dir = "ltr", theme = {}, search: search2, i18n }) {
  let body = children;
  if (search2?.enabled !== false)
    body = jsx(SearchProvider, { SearchDialog: DefaultSearchDialog, ...search2, children: body });
  if (theme?.enabled !== false)
    body = jsx(ThemeProvider, { attribute: "class", defaultTheme: "system", enableSystem: true, disableTransitionOnChange: true, ...theme, children: body });
  if (i18n) {
    body = jsx(I18nProvider, { ...i18n, children: body });
  }
  return jsx(DirectionProvider, { dir, children: jsx(SidebarProvider, { children: body }) });
}
function I18nProvider({ locales = [], locale, onLocaleChange, children, translations }) {
  const router = useRouter();
  const pathname = usePathname();
  const onChange = (value) => {
    if (onLocaleChange) {
      return onLocaleChange(value);
    }
    const segments = pathname.split("/").filter((v) => v.length > 0);
    if (segments[0] !== locale) {
      segments.unshift(value);
    } else {
      segments[0] = value;
    }
    router.push(`/${segments.join("/")}`);
  };
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;
  return jsx(I18nContext.Provider, { value: useMemo(() => ({
    locale,
    locales,
    text: {
      ...defaultTranslations,
      ...translations
    },
    onChange: (v) => onChangeRef.current(v)
  }), [locale, locales, translations]), children });
}
var framework = {
  usePathname() {
    return useLocation().pathname;
  },
  useParams() {
    return useParams();
  },
  useRouter() {
    const navigate = useNavigate();
    const revalidator = useRevalidator();
    return useMemo(
      () => ({
        push(url) {
          navigate(url);
        },
        refresh() {
          void revalidator.revalidate();
        }
      }),
      [navigate, revalidator]
    );
  },
  Link({ href, prefetch, ...props }) {
    return /* @__PURE__ */ jsx(Link$2, { to: href, prefetch: prefetch ? "intent" : "none", ...props, children: props.children });
  }
};
function ReactRouterProvider({ children }) {
  return /* @__PURE__ */ jsx(FrameworkProvider, { ...framework, children });
}
function RootProvider(props) {
  return jsx(ReactRouterProvider, { children: jsx(RootProvider$1, { ...props, children: props.children }) });
}
const links = () => [{
  rel: "preconnect",
  href: "https://fonts.googleapis.com"
}, {
  rel: "preconnect",
  href: "https://fonts.gstatic.com",
  crossOrigin: "anonymous"
}, {
  rel: "stylesheet",
  href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
}];
function Layout({
  children
}) {
  return /* @__PURE__ */ jsxs("html", {
    lang: "en",
    suppressHydrationWarning: true,
    children: [/* @__PURE__ */ jsxs("head", {
      children: [/* @__PURE__ */ jsx("meta", {
        charSet: "utf-8"
      }), /* @__PURE__ */ jsx("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      }), /* @__PURE__ */ jsx(Meta, {}), /* @__PURE__ */ jsx(Links, {})]
    }), /* @__PURE__ */ jsxs("body", {
      className: "flex flex-col min-h-screen",
      children: [/* @__PURE__ */ jsx(RootProvider, {
        children
      }), /* @__PURE__ */ jsx(ScrollRestoration, {}), /* @__PURE__ */ jsx(Scripts, {})]
    })]
  });
}
const root = UNSAFE_withComponentProps(function App() {
  return /* @__PURE__ */ jsx(Outlet, {});
});
const ErrorBoundary = UNSAFE_withErrorBoundaryProps(function ErrorBoundary2({
  error
}) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack;
  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details = error.status === 404 ? "The requested page could not be found." : error.statusText || details;
  }
  return /* @__PURE__ */ jsxs("main", {
    className: "pt-16 p-4 container mx-auto",
    children: [/* @__PURE__ */ jsx("h1", {
      children: message
    }), /* @__PURE__ */ jsx("p", {
      children: details
    }), stack]
  });
});
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary,
  Layout,
  default: root,
  links
}, Symbol.toStringTag, { value: "Module" }));
function normalize(url) {
  if (url.length > 1 && url.endsWith("/"))
    return url.slice(0, -1);
  return url;
}
function isActive(url, pathname, nested = true) {
  url = normalize(url);
  pathname = normalize(pathname);
  return url === pathname || nested && pathname.startsWith(`${url}/`);
}
function isTabActive(tab, pathname) {
  if (tab.urls)
    return tab.urls.has(normalize(pathname));
  return isActive(tab.url, pathname, true);
}
var Link2 = forwardRef(
  ({
    href = "#",
    // any protocol
    external = href.match(/^\w+:/) || // protocol relative URL
    href.startsWith("//"),
    prefetch,
    ...props
  }, ref) => {
    if (external) {
      return /* @__PURE__ */ jsx(
        "a",
        {
          ref,
          href,
          rel: "noreferrer noopener",
          target: "_blank",
          ...props,
          children: props.children
        }
      );
    }
    return /* @__PURE__ */ jsx(Link$1, { ref, href, prefetch, ...props });
  }
);
Link2.displayName = "Link";
function BaseLinkItem({ ref, item, ...props }) {
  const pathname = usePathname();
  const activeType = item.active ?? "url";
  const active = activeType !== "none" && isActive(item.url, pathname, activeType === "nested-url");
  return jsx(Link2, { ref, href: item.url, external: item.external, ...props, "data-active": active, children: props.children });
}
function getLinks(links2 = [], githubUrl) {
  let result = links2 ?? [];
  if (githubUrl)
    result = [
      ...result,
      {
        type: "icon",
        url: githubUrl,
        text: "Github",
        label: "GitHub",
        icon: jsx("svg", { role: "img", viewBox: "0 0 24 24", fill: "currentColor", children: jsx("path", { d: "M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" }) }),
        external: true
      }
    ];
  return result;
}
createContext("StylesContext", {
  tocNav: "xl:hidden",
  toc: "max-xl:hidden"
});
const NavContext = createContext("NavContext", {
  isTransparent: false
});
function NavProvider({ transparentMode = "none", children }) {
  const [transparent, setTransparent] = useState(transparentMode !== "none");
  useEffect(() => {
    if (transparentMode !== "top")
      return;
    const listener = () => {
      setTransparent(window.scrollY < 10);
    };
    listener();
    window.addEventListener("scroll", listener);
    return () => {
      window.removeEventListener("scroll", listener);
    };
  }, [transparentMode]);
  return jsx(NavContext.Provider, { value: useMemo(() => ({ isTransparent: transparent }), [transparent]), children });
}
function useNav() {
  return NavContext.use();
}
const NavigationMenu = Primitive.Root;
const NavigationMenuList = Primitive.List;
const NavigationMenuItem = React.forwardRef(({ className, children, ...props }, ref) => jsx(Primitive.NavigationMenuItem, { ref, className: twMerge("list-none", className), ...props, children }));
NavigationMenuItem.displayName = Primitive.NavigationMenuItem.displayName;
const NavigationMenuTrigger = React.forwardRef(({ className, children, ...props }, ref) => jsx(Primitive.Trigger, { ref, className: twMerge("data-[state=open]:bg-fd-accent/50", className), ...props, children }));
NavigationMenuTrigger.displayName = Primitive.Trigger.displayName;
const NavigationMenuContent = React.forwardRef(({ className, ...props }, ref) => jsx(Primitive.Content, { ref, className: twMerge("absolute inset-x-0 top-0 overflow-auto fd-scroll-container max-h-[80svh] data-[motion=from-end]:animate-fd-enterFromRight data-[motion=from-start]:animate-fd-enterFromLeft data-[motion=to-end]:animate-fd-exitToRight data-[motion=to-start]:animate-fd-exitToLeft", className), ...props }));
NavigationMenuContent.displayName = Primitive.Content.displayName;
const NavigationMenuLink = Primitive.Link;
const NavigationMenuViewport = React.forwardRef(({ className, ...props }, ref) => jsx("div", { ref, className: "flex w-full justify-center", children: jsx(Primitive.Viewport, { ...props, className: twMerge("relative h-(--radix-navigation-menu-viewport-height) w-full origin-[top_center] overflow-hidden transition-[width,height] duration-300 data-[state=closed]:animate-fd-nav-menu-out data-[state=open]:animate-fd-nav-menu-in", className) }) }));
NavigationMenuViewport.displayName = Primitive.Viewport.displayName;
const variants = {
  primary: "bg-fd-primary text-fd-primary-foreground hover:bg-fd-primary/80",
  outline: "border hover:bg-fd-accent hover:text-fd-accent-foreground",
  ghost: "hover:bg-fd-accent hover:text-fd-accent-foreground",
  secondary: "border bg-fd-secondary text-fd-secondary-foreground hover:bg-fd-accent hover:text-fd-accent-foreground"
};
const buttonVariants = cva("inline-flex items-center justify-center rounded-md p-2 text-sm font-medium transition-colors duration-100 disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fd-ring", {
  variants: {
    variant: variants,
    // fumadocs use `color` instead of `variant`
    color: variants,
    size: {
      sm: "gap-1 px-2 py-1.5 text-xs",
      icon: "p-1.5 [&_svg]:size-5",
      "icon-sm": "p-1.5 [&_svg]:size-4.5",
      "icon-xs": "p-1 [&_svg]:size-4"
    }
  }
});
const navItemVariants = cva("inline-flex items-center gap-1 p-2 text-fd-muted-foreground transition-colors hover:text-fd-accent-foreground data-[active=true]:text-fd-primary [&_svg]:size-4");
function Navbar$1(props) {
  const [value, setValue] = useState("");
  const { isTransparent } = useNav();
  return jsx(NavigationMenu, { value, onValueChange: setValue, asChild: true, children: jsxs("header", { id: "nd-nav", ...props, className: twMerge("fixed top-(--fd-banner-height) z-40 left-0 right-(--removed-body-scroll-bar-size,0) backdrop-blur-lg border-b transition-colors *:mx-auto *:max-w-fd-container", value.length > 0 && "max-lg:shadow-lg max-lg:rounded-b-2xl", (!isTransparent || value.length > 0) && "bg-fd-background/80", props.className), children: [jsx(NavigationMenuList, { className: "flex h-14 w-full items-center px-4", asChild: true, children: jsx("nav", { children: props.children }) }), jsx(NavigationMenuViewport, {})] }) });
}
const NavbarMenu = NavigationMenuItem;
function NavbarMenuContent(props) {
  return jsx(NavigationMenuContent, { ...props, className: twMerge("grid grid-cols-1 gap-2 p-4 md:grid-cols-2 lg:grid-cols-3", props.className), children: props.children });
}
function NavbarMenuTrigger(props) {
  return jsx(NavigationMenuTrigger, { ...props, className: twMerge(navItemVariants(), "rounded-md", props.className), children: props.children });
}
function NavbarMenuLink(props) {
  return jsx(NavigationMenuLink, { asChild: true, children: jsx(Link2, { ...props, className: twMerge("flex flex-col gap-2 rounded-lg border bg-fd-card p-3 transition-colors hover:bg-fd-accent/80 hover:text-fd-accent-foreground", props.className), children: props.children }) });
}
const linkVariants = cva("", {
  variants: {
    variant: {
      main: navItemVariants(),
      button: buttonVariants({
        color: "secondary",
        className: "gap-1.5 [&_svg]:size-4"
      }),
      icon: buttonVariants({
        color: "ghost",
        size: "icon"
      })
    }
  },
  defaultVariants: {
    variant: "main"
  }
});
function NavbarLink({ item, variant, ...props }) {
  return jsx(NavigationMenuItem, { children: jsx(NavigationMenuLink, { asChild: true, children: jsx(BaseLinkItem, { ...props, item, className: twMerge(linkVariants({ variant }), props.className), children: props.children }) }) });
}
const defaultAttributes = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};
const createLucideIcon = (iconName, iconNode) => {
  const Component = forwardRef(({ className, size = 24, color = "currentColor", children, ...props }, ref) => {
    return jsxs("svg", { ref, ...defaultAttributes, width: size, height: size, stroke: color, className: twMerge("lucide", className), ...props, children: [iconNode.map(([tag, attr]) => createElement(tag, attr)), children] });
  });
  Component.displayName = iconName;
  return Component;
};
const ChevronDown = createLucideIcon("chevron-down", [
  ["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]
]);
const Languages = createLucideIcon("languages", [
  ["path", { d: "m5 8 6 6", key: "1wu5hv" }],
  ["path", { d: "m4 14 6-6 2-3", key: "1k1g8d" }],
  ["path", { d: "M2 5h12", key: "or177f" }],
  ["path", { d: "M7 2h1", key: "1t2jsx" }],
  ["path", { d: "m22 22-5-10-5 10", key: "don7ne" }],
  ["path", { d: "M14 18h6", key: "1m8k6r" }]
]);
const Sidebar$1 = createLucideIcon("panel-left", [
  [
    "rect",
    { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }
  ],
  ["path", { d: "M9 3v18", key: "fh3hqa" }]
]);
const ChevronsUpDown = createLucideIcon("chevrons-up-down", [
  ["path", { d: "m7 15 5 5 5-5", key: "1hf1tw" }],
  ["path", { d: "m7 9 5-5 5 5", key: "sgt6xg" }]
]);
const Search = createLucideIcon("search", [
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }],
  ["path", { d: "m21 21-4.3-4.3", key: "1qie3q" }]
]);
const ExternalLink = createLucideIcon("external-link", [
  ["path", { d: "M15 3h6v6", key: "1q9fwt" }],
  ["path", { d: "M10 14 21 3", key: "gplh6r" }],
  [
    "path",
    {
      d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6",
      key: "a6xqqp"
    }
  ]
]);
const Moon = createLucideIcon("moon", [
  ["path", { d: "M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z", key: "a7tn18" }]
]);
const Sun = createLucideIcon("sun", [
  ["circle", { cx: "12", cy: "12", r: "4", key: "4exip2" }],
  ["path", { d: "M12 2v2", key: "tus03m" }],
  ["path", { d: "M12 20v2", key: "1lh1kg" }],
  ["path", { d: "m4.93 4.93 1.41 1.41", key: "149t6j" }],
  ["path", { d: "m17.66 17.66 1.41 1.41", key: "ptbguv" }],
  ["path", { d: "M2 12h2", key: "1t8f8n" }],
  ["path", { d: "M20 12h2", key: "1q8mjw" }],
  ["path", { d: "m6.34 17.66-1.41 1.41", key: "1m8zz5" }],
  ["path", { d: "m19.07 4.93-1.41 1.41", key: "1shlcs" }]
]);
const Airplay = createLucideIcon("airplay", [
  [
    "path",
    {
      d: "M5 17H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-1",
      key: "ns4c3b"
    }
  ],
  ["path", { d: "m12 15 5 6H7Z", key: "14qnn2" }]
]);
createLucideIcon("menu", [
  ["line", { x1: "4", x2: "20", y1: "12", y2: "12", key: "1e0a9i" }],
  ["line", { x1: "4", x2: "20", y1: "6", y2: "6", key: "1owob3" }],
  ["line", { x1: "4", x2: "20", y1: "18", y2: "18", key: "yk5zj1" }]
]);
createLucideIcon("x", [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
]);
createLucideIcon("loader-circle", [
  ["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }]
]);
const CircleCheck = createLucideIcon("circle-check", [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
]);
const CircleX = createLucideIcon("circle-x", [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m15 9-6 6", key: "1uzhvr" }],
  ["path", { d: "m9 9 6 6", key: "z0biqf" }]
]);
const Check = createLucideIcon("check", [
  ["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]
]);
const TriangleAlert = createLucideIcon("triangle-alert", [
  [
    "path",
    {
      d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",
      key: "wmoenq"
    }
  ],
  ["path", { d: "M12 9v4", key: "juzpu7" }],
  ["path", { d: "M12 17h.01", key: "p32p05" }]
]);
const Info = createLucideIcon("info", [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M12 16v-4", key: "1dtifu" }],
  ["path", { d: "M12 8h.01", key: "e9boi3" }]
]);
createLucideIcon("copy", [
  [
    "rect",
    {
      width: "14",
      height: "14",
      x: "8",
      y: "8",
      rx: "2",
      ry: "2",
      key: "17jyea"
    }
  ],
  [
    "path",
    {
      d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",
      key: "zix9uf"
    }
  ]
]);
const Clipboard = createLucideIcon("clipboard", [
  [
    "rect",
    {
      width: "8",
      height: "4",
      x: "8",
      y: "2",
      rx: "1",
      ry: "1",
      key: "1"
    }
  ],
  [
    "path",
    {
      d: "M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2",
      key: "2"
    }
  ]
]);
createLucideIcon("file-text", [
  [
    "path",
    {
      d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",
      key: "1rqfz7"
    }
  ],
  ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4", key: "tnqrlb" }],
  ["path", { d: "M10 9H8", key: "b1mrlr" }],
  ["path", { d: "M16 13H8", key: "t4e002" }],
  ["path", { d: "M16 17H8", key: "z1uh3a" }]
]);
const Hash = createLucideIcon("hash", [
  ["line", { x1: "4", x2: "20", y1: "9", y2: "9", key: "4lhtct" }],
  ["line", { x1: "4", x2: "20", y1: "15", y2: "15", key: "vyu0kd" }],
  ["line", { x1: "10", x2: "8", y1: "3", y2: "21", key: "1ggp8o" }],
  ["line", { x1: "16", x2: "14", y1: "3", y2: "21", key: "weycgp" }]
]);
const Text = createLucideIcon("text", [
  ["path", { d: "M15 18H3", key: "olowqp" }],
  ["path", { d: "M17 6H3", key: "16j9eg" }],
  ["path", { d: "M21 12H3", key: "2avoz0" }]
]);
createLucideIcon("file", [
  [
    "path",
    {
      d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",
      key: "1rqfz7"
    }
  ],
  ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4", key: "tnqrlb" }]
]);
createLucideIcon("folder", [
  [
    "path",
    {
      d: "M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z",
      key: "1kt360"
    }
  ]
]);
createLucideIcon("folder-open", [
  [
    "path",
    {
      d: "m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2",
      key: "usdka0"
    }
  ]
]);
createLucideIcon("star", [
  [
    "path",
    {
      d: "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",
      key: "r04s7s"
    }
  ]
]);
const Link = createLucideIcon("link", [
  [
    "path",
    {
      d: "M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71",
      key: "1cjeqo"
    }
  ],
  [
    "path",
    {
      d: "M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71",
      key: "19qd67"
    }
  ]
]);
const Edit = createLucideIcon("square-pen", [
  [
    "path",
    {
      d: "M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7",
      key: "1m0v6g"
    }
  ],
  [
    "path",
    {
      d: "M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z",
      key: "ohrbg2"
    }
  ]
]);
const ChevronRight = createLucideIcon("chevron-right", [
  ["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]
]);
const ChevronLeft = createLucideIcon("chevron-left", [
  ["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }]
]);
createLucideIcon("plus", [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "M12 5v14", key: "s699le" }]
]);
createLucideIcon("trash-2", [
  ["path", { d: "M3 6h18", key: "d0wm0j" }],
  ["path", { d: "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6", key: "4alrt4" }],
  ["path", { d: "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2", key: "v07s0e" }],
  ["line", { x1: "10", x2: "10", y1: "11", y2: "17", key: "1uufr5" }],
  ["line", { x1: "14", x2: "14", y1: "11", y2: "17", key: "xtxkd" }]
]);
createLucideIcon("chevron-up", [
  ["path", { d: "m18 15-6-6-6 6", key: "153udz" }]
]);
function SearchToggle({ hideIfDisabled, size = "icon-sm", color = "ghost", ...props }) {
  const { setOpenSearch, enabled } = useSearchContext();
  if (hideIfDisabled && !enabled)
    return null;
  return jsx("button", { type: "button", className: twMerge(buttonVariants({
    size,
    color
  }), props.className), "data-search": "", "aria-label": "Open Search", onClick: () => {
    setOpenSearch(true);
  }, children: jsx(Search, {}) });
}
function LargeSearchToggle({ hideIfDisabled, ...props }) {
  const { enabled, hotKey, setOpenSearch } = useSearchContext();
  const { text } = useI18n();
  if (hideIfDisabled && !enabled)
    return null;
  return jsxs("button", { type: "button", "data-search-full": "", ...props, className: twMerge("inline-flex items-center gap-2 rounded-lg border bg-fd-secondary/50 p-1.5 ps-2 text-sm text-fd-muted-foreground transition-colors hover:bg-fd-accent hover:text-fd-accent-foreground", props.className), onClick: () => {
    setOpenSearch(true);
  }, children: [jsx(Search, { className: "size-4" }), text.search, jsx("div", { className: "ms-auto inline-flex gap-0.5", children: hotKey.map((k, i) => jsx("kbd", { className: "rounded-md border bg-fd-background px-1.5", children: k.display }, i)) })] });
}
const itemVariants$1 = cva("size-6.5 rounded-full p-1.5 text-fd-muted-foreground", {
  variants: {
    active: {
      true: "bg-fd-accent text-fd-accent-foreground",
      false: "text-fd-muted-foreground"
    }
  }
});
const full = [
  ["light", Sun],
  ["dark", Moon],
  ["system", Airplay]
];
function ThemeToggle({ className, mode = "light-dark", ...props }) {
  const { setTheme, theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useLayoutEffect(() => {
    setMounted(true);
  }, []);
  const container = twMerge("inline-flex items-center rounded-full border p-1", className);
  if (mode === "light-dark") {
    const value2 = mounted ? resolvedTheme : null;
    return jsx("button", { className: container, "aria-label": `Toggle Theme`, onClick: () => setTheme(value2 === "light" ? "dark" : "light"), "data-theme-toggle": "", ...props, children: full.map(([key, Icon]) => {
      if (key === "system")
        return;
      return jsx(Icon, { fill: "currentColor", className: twMerge(itemVariants$1({ active: value2 === key })) }, key);
    }) });
  }
  const value = mounted ? theme : null;
  return jsx("div", { className: container, "data-theme-toggle": "", ...props, children: full.map(([key, Icon]) => jsx("button", { "aria-label": key, className: twMerge(itemVariants$1({ active: value === key })), onClick: () => setTheme(key), children: jsx(Icon, { className: "size-full", fill: "currentColor" }) }, key)) });
}
const Popover = PopoverPrimitive.Root;
const PopoverTrigger = PopoverPrimitive.Trigger;
const PopoverContent = React.forwardRef(({ className, align = "center", sideOffset = 4, ...props }, ref) => jsx(PopoverPrimitive.Portal, { children: jsx(PopoverPrimitive.Content, { ref, align, sideOffset, side: "bottom", className: twMerge("z-50 origin-(--radix-popover-content-transform-origin) min-w-[240px] max-w-[98vw] rounded-xl border bg-fd-popover/60 backdrop-blur-lg p-2 text-sm text-fd-popover-foreground shadow-lg focus-visible:outline-none data-[state=closed]:animate-fd-popover-out data-[state=open]:animate-fd-popover-in", className), ...props }) }));
PopoverContent.displayName = PopoverPrimitive.Content.displayName;
function LanguageToggle(props) {
  const context = useI18n();
  if (!context.locales)
    throw new Error("Missing `<I18nProvider />`");
  return jsxs(Popover, { children: [jsx(PopoverTrigger, { "aria-label": context.text.chooseLanguage, ...props, className: twMerge(buttonVariants({
    color: "ghost",
    className: "gap-1.5 p-1.5"
  }), props.className), children: props.children }), jsxs(PopoverContent, { className: "flex flex-col overflow-hidden p-0", children: [jsx("p", { className: "mb-1 p-2 text-xs font-medium text-fd-muted-foreground", children: context.text.chooseLanguage }), context.locales.map((item) => jsx("button", { type: "button", className: twMerge("p-2 text-start text-sm", item.locale === context.locale ? "bg-fd-primary/10 font-medium text-fd-primary" : "hover:bg-fd-accent hover:text-fd-accent-foreground"), onClick: () => {
    context.onChange?.(item.locale);
  }, children: item.name }, item.locale))] })] });
}
function LanguageToggleText(props) {
  const context = useI18n();
  const text = context.locales?.find((item) => item.locale === context.locale)?.name;
  return jsx("span", { ...props, children: text });
}
const menuItemVariants = cva("", {
  variants: {
    variant: {
      main: "inline-flex items-center gap-2 py-1.5 transition-colors hover:text-fd-popover-foreground/50 data-[active=true]:font-medium data-[active=true]:text-fd-primary [&_svg]:size-4",
      icon: buttonVariants({
        size: "icon",
        color: "ghost"
      }),
      button: buttonVariants({
        color: "secondary",
        className: "gap-1.5 [&_svg]:size-4"
      })
    }
  },
  defaultVariants: {
    variant: "main"
  }
});
function MenuLinkItem({ item, ...props }) {
  if (item.type === "custom")
    return jsx("div", { className: twMerge("grid", props.className), children: item.children });
  if (item.type === "menu") {
    const header = jsxs(Fragment, { children: [item.icon, item.text] });
    return jsxs("div", { className: twMerge("mb-4 flex flex-col", props.className), children: [jsx("p", { className: "mb-1 text-sm text-fd-muted-foreground", children: item.url ? jsx(NavigationMenuLink, { asChild: true, children: jsx(Link2, { href: item.url, external: item.external, children: header }) }) : header }), item.items.map((child, i) => jsx(MenuLinkItem, { item: child }, i))] });
  }
  return jsx(NavigationMenuLink, { asChild: true, children: jsxs(BaseLinkItem, { item, className: twMerge(menuItemVariants({ variant: item.type }), props.className), "aria-label": item.type === "icon" ? item.label : void 0, children: [item.icon, item.type === "icon" ? void 0 : item.text] }) });
}
const Menu = NavigationMenuItem;
function MenuTrigger({ enableHover = false, ...props }) {
  return jsx(NavigationMenuTrigger, { ...props, onPointerMove: enableHover ? void 0 : (e) => e.preventDefault(), children: props.children });
}
function MenuContent(props) {
  return jsx(NavigationMenuContent, { ...props, className: twMerge("flex flex-col p-4", props.className), children: props.children });
}
function HomeLayout(props) {
  const { nav = {}, links: links2, githubUrl, i18n, themeSwitch = {}, searchToggle, ...rest2 } = props;
  return jsx(NavProvider, { transparentMode: nav?.transparentMode, children: jsxs("main", { id: "nd-home-layout", ...rest2, className: twMerge("flex flex-1 flex-col pt-14", rest2.className), children: [nav.enabled !== false && (nav.component ?? jsx(Header, { links: links2, nav, themeSwitch, searchToggle, i18n, githubUrl })), props.children] }) });
}
function Header({ nav = {}, i18n = false, links: links2, githubUrl, themeSwitch = {}, searchToggle = {} }) {
  const finalLinks = useMemo(() => getLinks(links2, githubUrl), [links2, githubUrl]);
  const navItems = finalLinks.filter((item) => ["nav", "all"].includes(item.on ?? "all"));
  const menuItems = finalLinks.filter((item) => ["menu", "all"].includes(item.on ?? "all"));
  return jsxs(Navbar$1, { children: [jsx(Link2, { href: nav.url ?? "/", className: "inline-flex items-center gap-2.5 font-semibold", children: nav.title }), nav.children, jsx("ul", { className: "flex flex-row items-center gap-2 px-6 max-sm:hidden", children: navItems.filter((item) => !isSecondary(item)).map((item, i) => jsx(NavbarLinkItem, { item, className: "text-sm" }, i)) }), jsxs("div", { className: "flex flex-row items-center justify-end gap-1.5 flex-1 max-lg:hidden", children: [searchToggle.enabled !== false && (searchToggle.components?.lg ?? jsx(LargeSearchToggle, { className: "w-full rounded-full ps-2.5 max-w-[240px]", hideIfDisabled: true })), themeSwitch.enabled !== false && (themeSwitch.component ?? jsx(ThemeToggle, { mode: themeSwitch?.mode })), i18n ? jsx(LanguageToggle, { children: jsx(Languages, { className: "size-5" }) }) : null, jsx("div", { className: "flex flex-row items-center empty:hidden", children: navItems.filter(isSecondary).map((item, i) => jsx(NavbarLinkItem, { item }, i)) })] }), jsxs("ul", { className: "flex flex-row items-center ms-auto -me-1.5 lg:hidden", children: [searchToggle.enabled !== false && (searchToggle.components?.sm ?? jsx(SearchToggle, { className: "p-2", hideIfDisabled: true })), jsxs(Menu, { children: [jsx(MenuTrigger, { "aria-label": "Toggle Menu", className: twMerge(buttonVariants({
    size: "icon",
    color: "ghost",
    className: "group"
  })), enableHover: nav.enableHoverToOpen, children: jsx(ChevronDown, { className: "!size-5.5 transition-transform duration-300 group-data-[state=open]:rotate-180" }) }), jsxs(MenuContent, { className: "sm:flex-row sm:items-center sm:justify-end", children: [menuItems.filter((item) => !isSecondary(item)).map((item, i) => jsx(MenuLinkItem, { item, className: "sm:hidden" }, i)), jsxs("div", { className: "-ms-1.5 flex flex-row items-center gap-1.5 max-sm:mt-2", children: [menuItems.filter(isSecondary).map((item, i) => jsx(MenuLinkItem, { item, className: "-me-1.5" }, i)), jsx("div", { role: "separator", className: "flex-1" }), i18n ? jsxs(LanguageToggle, { children: [jsx(Languages, { className: "size-5" }), jsx(LanguageToggleText, {}), jsx(ChevronDown, { className: "size-3 text-fd-muted-foreground" })] }) : null, themeSwitch.enabled !== false && (themeSwitch.component ?? jsx(ThemeToggle, { mode: themeSwitch?.mode }))] })] })] })] })] });
}
function NavbarLinkItem({ item, ...props }) {
  if (item.type === "custom")
    return jsx("div", { ...props, children: item.children });
  if (item.type === "menu") {
    const children = item.items.map((child, j) => {
      if (child.type === "custom") {
        return jsx(Fragment$1, { children: child.children }, j);
      }
      const { banner = child.icon ? jsx("div", { className: "w-fit rounded-md border bg-fd-muted p-1 [&_svg]:size-4", children: child.icon }) : null, ...rest2 } = child.menu ?? {};
      return jsx(NavbarMenuLink, { href: child.url, external: child.external, ...rest2, children: rest2.children ?? jsxs(Fragment, { children: [banner, jsx("p", { className: "text-[15px] font-medium", children: child.text }), jsx("p", { className: "text-sm text-fd-muted-foreground empty:hidden", children: child.description })] }) }, `${j}-${child.url}`);
    });
    return jsxs(NavbarMenu, { children: [jsx(NavbarMenuTrigger, { ...props, children: item.url ? jsx(Link2, { href: item.url, external: item.external, children: item.text }) : item.text }), jsx(NavbarMenuContent, { children })] });
  }
  return jsx(NavbarLink, { ...props, item, variant: item.type, "aria-label": item.type === "icon" ? item.label : void 0, children: item.type === "icon" ? item.icon : item.text });
}
function isSecondary(item) {
  if ("secondary" in item && item.secondary != null)
    return item.secondary;
  return item.type === "icon";
}
function baseOptions() {
  return {
    nav: {
      title: "Scalable Architecture"
    }
  };
}
function meta({}) {
  return [{
    title: "New React Router App"
  }, {
    name: "description",
    content: "Welcome to React Router!"
  }];
}
const home = UNSAFE_withComponentProps(function Home() {
  return /* @__PURE__ */ jsx(HomeLayout, {
    ...baseOptions(),
    children: /* @__PURE__ */ jsxs("div", {
      className: "relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden bg-gradient-to-br from-fd-background via-fd-background/80 to-fd-primary/10",
      children: [/* @__PURE__ */ jsx("div", {
        className: "absolute inset-0 -z-10 overflow-hidden",
        children: [{
          size: 500,
          top: "25%",
          left: "25%",
          color: "rgba(59, 130, 246, 0.3)",
          delay: "0s"
        }, {
          size: 400,
          top: "20%",
          left: "60%",
          color: "rgba(236, 72, 153, 0.3)",
          delay: "2s"
        }, {
          size: 450,
          top: "65%",
          left: "35%",
          color: "rgba(34, 197, 94, 0.3)",
          delay: "4s"
        }].map((blob, i) => /* @__PURE__ */ jsx("div", {
          style: {
            width: blob.size,
            height: blob.size,
            top: blob.top,
            left: blob.left,
            backgroundColor: blob.color,
            borderRadius: "50%",
            filter: "blur(100px)",
            position: "absolute",
            mixBlendMode: "multiply",
            animation: `blob 18s infinite ease-in-out`,
            animationDelay: blob.delay
          }
        }, i))
      }), /* @__PURE__ */ jsxs("div", {
        className: "p-4 flex flex-col items-center justify-center text-center z-10",
        children: [/* @__PURE__ */ jsx("img", {
          width: 85,
          height: 85,
          className: "mb-18 opacity-90 dark:hidden",
          src: "logo.png",
          alt: "Fumadocs"
        }), /* @__PURE__ */ jsx("img", {
          width: 85,
          height: 85,
          className: "mb-18 opacity-90 hidden dark:block",
          src: "logo-dark.png",
          alt: "Fumadocs"
        }), /* @__PURE__ */ jsxs("h1", {
          className: "text-7xl font-black mb-12",
          children: ["Real World ", /* @__PURE__ */ jsx("br", {}), " Scalable Architecture."]
        }), /* @__PURE__ */ jsx("p", {
          className: "text-fd-muted-foreground mb-22 max-w-2xl text-lg font-extralight",
          children: "Practical insights and patterns for building real-world, scalable, and maintainable software architectures."
        }), /* @__PURE__ */ jsx(Link$2, {
          className: "text-sm bg-fd-primary text-fd-primary-foreground rounded-full font-medium px-5 py-2.5 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300",
          to: "/docs",
          children: "Open Docs"
        })]
      }), /* @__PURE__ */ jsx("style", {
        children: `
            @keyframes blob {
              0% { transform: translate(0px, 0px) scale(1); }
              33% { transform: translate(30px, -50px) scale(1.1); }
              66% { transform: translate(-20px, 20px) scale(0.9); }
              100% { transform: translate(0px, 0px) scale(1); }
            }
          `
      })]
    })
  });
});
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: home,
  meta
}, Symbol.toStringTag, { value: "Module" }));
const ScrollArea = React.forwardRef(({ className, children, ...props }, ref) => jsxs(ScrollAreaPrimitive.Root, { ref, type: "scroll", className: twMerge("overflow-hidden", className), ...props, children: [children, jsx(ScrollAreaPrimitive.Corner, {}), jsx(ScrollBar, { orientation: "vertical" })] }));
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName;
const ScrollViewport = React.forwardRef(({ className, children, ...props }, ref) => jsx(ScrollAreaPrimitive.Viewport, { ref, className: twMerge("size-full rounded-[inherit]", className), ...props, children }));
ScrollViewport.displayName = ScrollAreaPrimitive.Viewport.displayName;
const ScrollBar = React.forwardRef(({ className, orientation = "vertical", ...props }, ref) => jsx(ScrollAreaPrimitive.Scrollbar, { ref, orientation, className: twMerge("flex select-none data-[state=hidden]:animate-fd-fade-out", orientation === "vertical" && "h-full w-1.5", orientation === "horizontal" && "h-1.5 flex-col", className), ...props, children: jsx(ScrollAreaPrimitive.ScrollAreaThumb, { className: "relative flex-1 rounded-full bg-fd-border" }) }));
ScrollBar.displayName = ScrollAreaPrimitive.Scrollbar.displayName;
const Collapsible = CollapsiblePrimitive.Root;
const CollapsibleTrigger = CollapsiblePrimitive.CollapsibleTrigger;
const CollapsibleContent = forwardRef(({ children, ...props }, ref) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  return jsx(CollapsiblePrimitive.CollapsibleContent, { ref, ...props, className: twMerge("overflow-hidden", mounted && "data-[state=closed]:animate-fd-collapsible-up data-[state=open]:animate-fd-collapsible-down", props.className), children });
});
CollapsibleContent.displayName = CollapsiblePrimitive.CollapsibleContent.displayName;
function findPath(nodes, matcher, options = {}) {
  const { includeSeparator = true } = options;
  function run(nodes2) {
    let separator2;
    for (const node of nodes2) {
      if (matcher(node)) {
        const items = [];
        if (separator2) items.push(separator2);
        items.push(node);
        return items;
      }
      if (node.type === "separator" && includeSeparator) {
        separator2 = node;
        continue;
      }
      if (node.type === "folder") {
        const items = node.index && matcher(node.index) ? [node.index] : run(node.children);
        if (items) {
          items.unshift(node);
          if (separator2) items.unshift(separator2);
          return items;
        }
      }
    }
  }
  return run(nodes) ?? null;
}
function normalizeUrl(url) {
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  if (!url.startsWith("/")) url = "/" + url;
  if (url.length > 1 && url.endsWith("/")) url = url.slice(0, -1);
  return url;
}
function getBreadcrumbItemsFromPath(tree, path, options) {
  const {
    includePage = false,
    includeSeparator = false,
    includeRoot = false
  } = options;
  let items = [];
  for (let i = 0; i < path.length; i++) {
    const item = path[i];
    switch (item.type) {
      case "page":
        if (includePage)
          items.push({
            name: item.name,
            url: item.url
          });
        break;
      case "folder":
        if (item.root && !includeRoot) {
          items = [];
          break;
        }
        if (i === path.length - 1 || item.index !== path[i + 1]) {
          items.push({
            name: item.name,
            url: item.index?.url
          });
        }
        break;
      case "separator":
        if (item.name && includeSeparator)
          items.push({
            name: item.name
          });
        break;
    }
  }
  if (includeRoot) {
    items.unshift({
      name: tree.name,
      url: typeof includeRoot === "object" ? includeRoot.url : void 0
    });
  }
  return items;
}
function searchPath(nodes, url) {
  const normalizedUrl = normalizeUrl(url);
  return findPath(
    nodes,
    (node) => node.type === "page" && node.url === normalizedUrl
  );
}
const TreeContext = createContext("TreeContext");
const PathContext = createContext("PathContext", []);
function TreeContextProvider(props) {
  const nextIdRef = useRef(0);
  const pathname = usePathname();
  const tree = useMemo(() => props.tree, [props.tree.$id ?? props.tree]);
  const path = useMemo(() => {
    let result = searchPath(tree.children, pathname);
    if (result)
      return result;
    if (tree.fallback)
      result = searchPath(tree.fallback.children, pathname);
    return result ?? [];
  }, [tree, pathname]);
  const root2 = path.findLast((item) => item.type === "folder" && item.root) ?? tree;
  root2.$id ?? (root2.$id = String(nextIdRef.current++));
  return jsx(TreeContext.Provider, { value: useMemo(() => ({ root: root2, full: tree }), [root2, tree]), children: jsx(PathContext.Provider, { value: path, children: props.children }) });
}
function useTreePath() {
  return PathContext.use();
}
function useTreeContext() {
  return TreeContext.use("You must wrap this component under <DocsLayout />");
}
function useMediaQuery(query, disabled = false) {
  const [isMatch, setMatch] = useState(null);
  useEffect(() => {
    if (disabled) return;
    const mediaQueryList = window.matchMedia(query);
    const handleChange = () => {
      setMatch(mediaQueryList.matches);
    };
    handleChange();
    mediaQueryList.addEventListener("change", handleChange);
    return () => {
      mediaQueryList.removeEventListener("change", handleChange);
    };
  }, [disabled, query]);
  return isMatch;
}
const itemVariants = cva("relative flex flex-row items-center gap-2 rounded-lg p-2 ps-(--sidebar-item-offset) text-start text-fd-muted-foreground [overflow-wrap:anywhere] [&_svg]:size-4 [&_svg]:shrink-0", {
  variants: {
    active: {
      true: "bg-fd-primary/10 text-fd-primary",
      false: "transition-colors hover:bg-fd-accent/50 hover:text-fd-accent-foreground/80 hover:transition-none"
    }
  }
});
const Context = createContext$1(null);
const FolderContext = createContext$1(null);
function Sidebar({ defaultOpenLevel = 0, prefetch = true, Mobile, Content }) {
  const isMobile = useMediaQuery("(width < 768px)") ?? false;
  const context = useMemo(() => {
    return {
      defaultOpenLevel,
      prefetch,
      level: 1
    };
  }, [defaultOpenLevel, prefetch]);
  return jsx(Context.Provider, { value: context, children: isMobile && Mobile != null ? Mobile : Content });
}
function SidebarContent(props) {
  const { collapsed } = useSidebar();
  const [hover, setHover] = useState(false);
  const timerRef = useRef(0);
  const closeTimeRef = useRef(0);
  useOnChange(collapsed, () => {
    setHover(false);
    closeTimeRef.current = Date.now() + 150;
  });
  return jsx("aside", { id: "nd-sidebar", ...props, "data-collapsed": collapsed, className: twMerge("fixed left-0 rtl:left-auto rtl:right-(--removed-body-scroll-bar-size,0) flex flex-col items-end top-(--fd-sidebar-top) bottom-(--fd-sidebar-margin) z-20 bg-fd-card text-sm border-e transition-[top,opacity,translate,width] duration-200 max-md:hidden *:w-(--fd-sidebar-width)", collapsed && [
    "rounded-xl border translate-x-(--fd-sidebar-offset) rtl:-translate-x-(--fd-sidebar-offset)",
    hover ? "z-50 shadow-lg" : "opacity-0"
  ], props.className), style: {
    ...props.style,
    "--fd-sidebar-offset": hover ? "calc(var(--spacing) * 2)" : "calc(16px - 100%)",
    "--fd-sidebar-margin": collapsed ? "0.5rem" : "0px",
    "--fd-sidebar-top": `calc(var(--fd-banner-height) + var(--fd-nav-height) + var(--fd-sidebar-margin))`,
    width: collapsed ? "var(--fd-sidebar-width)" : "calc(var(--spacing) + var(--fd-sidebar-width) + var(--fd-layout-offset))"
  }, onPointerEnter: (e) => {
    if (!collapsed || e.pointerType === "touch" || closeTimeRef.current > Date.now())
      return;
    window.clearTimeout(timerRef.current);
    setHover(true);
  }, onPointerLeave: (e) => {
    if (!collapsed || e.pointerType === "touch")
      return;
    window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => {
      setHover(false);
      closeTimeRef.current = Date.now() + 150;
    }, Math.min(e.clientX, document.body.clientWidth - e.clientX) > 100 ? 0 : 500);
  }, children: props.children });
}
function SidebarContentMobile({ className, children, ...props }) {
  const { open, setOpen } = useSidebar();
  const state = open ? "open" : "closed";
  return jsxs(Fragment, { children: [jsx(Presence, { present: open, children: jsx("div", { "data-state": state, className: "fixed z-40 inset-0 backdrop-blur-xs data-[state=open]:animate-fd-fade-in data-[state=closed]:animate-fd-fade-out", onClick: () => setOpen(false) }) }), jsx(Presence, { present: open, children: ({ present }) => jsx("aside", { id: "nd-sidebar-mobile", ...props, "data-state": state, className: twMerge("fixed text-[15px] flex flex-col shadow-lg border-s end-0 inset-y-0 w-[85%] max-w-[380px] z-40 bg-fd-background data-[state=open]:animate-fd-sidebar-in data-[state=closed]:animate-fd-sidebar-out", !present && "invisible", className), children }) })] });
}
function SidebarHeader(props) {
  return jsx("div", { ...props, className: twMerge("flex flex-col gap-3 p-4 pb-2", props.className), children: props.children });
}
function SidebarFooter(props) {
  return jsx("div", { ...props, className: twMerge("flex flex-col border-t p-4 pt-2", props.className), children: props.children });
}
function SidebarViewport(props) {
  return jsx(ScrollArea, { ...props, className: twMerge("h-full", props.className), children: jsx(ScrollViewport, { className: "p-4 overscroll-contain", style: {
    "--sidebar-item-offset": "calc(var(--spacing) * 2)",
    maskImage: "linear-gradient(to bottom, transparent, white 12px, white calc(100% - 12px), transparent)"
  }, children: props.children }) });
}
function SidebarSeparator(props) {
  return jsx("p", { ...props, className: twMerge("inline-flex items-center gap-2 mb-1.5 px-2 ps-(--sidebar-item-offset) empty:mb-0 [&_svg]:size-4 [&_svg]:shrink-0", props.className), children: props.children });
}
function SidebarItem({ icon, ...props }) {
  const pathname = usePathname();
  const active = props.href !== void 0 && isActive(props.href, pathname, false);
  const { prefetch } = useInternalContext();
  return jsxs(Link2, { ...props, "data-active": active, className: twMerge(itemVariants({ active }), props.className), prefetch, children: [icon ?? (props.external ? jsx(ExternalLink, {}) : null), props.children] });
}
function SidebarFolder({ defaultOpen = false, ...props }) {
  const [open, setOpen] = useState(defaultOpen);
  useOnChange(defaultOpen, (v) => {
    if (v)
      setOpen(v);
  });
  return jsx(Collapsible, { open, onOpenChange: setOpen, ...props, children: jsx(FolderContext.Provider, { value: useMemo(() => ({ open, setOpen }), [open]), children: props.children }) });
}
function SidebarFolderTrigger({ className, ...props }) {
  const { open } = useFolderContext();
  return jsxs(CollapsibleTrigger, { className: twMerge(itemVariants({ active: false }), "w-full", className), ...props, children: [props.children, jsx(ChevronDown, { "data-icon": true, className: twMerge("ms-auto transition-transform", !open && "-rotate-90") })] });
}
function SidebarFolderLink(props) {
  const { open, setOpen } = useFolderContext();
  const { prefetch } = useInternalContext();
  const pathname = usePathname();
  const active = props.href !== void 0 && isActive(props.href, pathname, false);
  return jsxs(Link2, { ...props, "data-active": active, className: twMerge(itemVariants({ active }), "w-full", props.className), onClick: (e) => {
    if (e.target instanceof Element && e.target.matches("[data-icon], [data-icon] *")) {
      setOpen(!open);
      e.preventDefault();
    } else {
      setOpen(active ? !open : true);
    }
  }, prefetch, children: [props.children, jsx(ChevronDown, { "data-icon": true, className: twMerge("ms-auto transition-transform", !open && "-rotate-90") })] });
}
function SidebarFolderContent(props) {
  const { level, ...ctx } = useInternalContext();
  return jsx(CollapsibleContent, { ...props, className: twMerge("relative", level === 1 && [
    "before:content-[''] before:absolute before:w-px before:inset-y-1 before:bg-fd-border before:start-2.5",
    "**:data-[active=true]:before:content-[''] **:data-[active=true]:before:bg-fd-primary **:data-[active=true]:before:absolute **:data-[active=true]:before:w-px **:data-[active=true]:before:inset-y-2.5 **:data-[active=true]:before:start-2.5"
  ], props.className), style: {
    "--sidebar-item-offset": `calc(var(--spacing) * ${(level + 1) * 3})`,
    ...props.style
  }, children: jsx(Context.Provider, { value: useMemo(() => ({
    ...ctx,
    level: level + 1
  }), [ctx, level]), children: props.children }) });
}
function SidebarTrigger({ children, ...props }) {
  const { setOpen } = useSidebar();
  return jsx("button", { ...props, "aria-label": "Open Sidebar", onClick: () => setOpen((prev) => !prev), children });
}
function SidebarCollapseTrigger(props) {
  const { collapsed, setCollapsed } = useSidebar();
  return jsx("button", { type: "button", "aria-label": "Collapse Sidebar", "data-collapsed": collapsed, ...props, onClick: () => {
    setCollapsed((prev) => !prev);
  }, children: props.children });
}
function useFolderContext() {
  const ctx = useContext(FolderContext);
  if (!ctx)
    throw new Error("Missing sidebar folder");
  return ctx;
}
function useInternalContext() {
  const ctx = useContext(Context);
  if (!ctx)
    throw new Error("<Sidebar /> component required.");
  return ctx;
}
function SidebarPageTree(props) {
  const { root: root2 } = useTreeContext();
  return useMemo(() => {
    const { Separator, Item, Folder } = props.components ?? {};
    function renderSidebarList(items, level) {
      return items.map((item, i) => {
        if (item.type === "separator") {
          if (Separator)
            return jsx(Separator, { item }, i);
          return jsxs(SidebarSeparator, { className: twMerge(i !== 0 && "mt-6"), children: [item.icon, item.name] }, i);
        }
        if (item.type === "folder") {
          const children = renderSidebarList(item.children, level + 1);
          if (Folder)
            return jsx(Folder, { item, level, children }, i);
          return jsx(PageTreeFolder, { item, children }, i);
        }
        if (Item)
          return jsx(Item, { item }, item.url);
        return jsx(SidebarItem, { href: item.url, external: item.external, icon: item.icon, children: item.name }, item.url);
      });
    }
    return jsx(Fragment$1, { children: renderSidebarList(root2.children, 1) }, root2.$id);
  }, [props.components, root2]);
}
function PageTreeFolder({ item, ...props }) {
  const { defaultOpenLevel, level } = useInternalContext();
  const path = useTreePath();
  return jsxs(SidebarFolder, { defaultOpen: (item.defaultOpen ?? defaultOpenLevel >= level) || path.includes(item), children: [item.index ? jsxs(SidebarFolderLink, { href: item.index.url, external: item.index.external, ...props, children: [item.icon, item.name] }) : jsxs(SidebarFolderTrigger, { ...props, children: [item.icon, item.name] }), jsx(SidebarFolderContent, { children: props.children })] });
}
function RootToggle({ options, placeholder, ...props }) {
  const [open, setOpen] = useState(false);
  const { closeOnRedirect } = useSidebar();
  const pathname = usePathname();
  const selected = useMemo(() => {
    return options.findLast((item2) => isTabActive(item2, pathname));
  }, [options, pathname]);
  const onClick = () => {
    closeOnRedirect.current = false;
    setOpen(false);
  };
  const item = selected ? jsxs(Fragment, { children: [jsx("div", { className: "size-9 shrink-0 md:size-5", children: selected.icon }), jsxs("div", { children: [jsx("p", { className: "text-sm font-medium", children: selected.title }), jsx("p", { className: "text-[13px] text-fd-muted-foreground empty:hidden md:hidden", children: selected.description })] })] }) : placeholder;
  return jsxs(Popover, { open, onOpenChange: setOpen, children: [item && jsxs(PopoverTrigger, { ...props, className: twMerge("flex items-center gap-2 rounded-lg p-2 border bg-fd-secondary/50 text-start text-fd-secondary-foreground transition-colors hover:bg-fd-accent data-[state=open]:bg-fd-accent data-[state=open]:text-fd-accent-foreground", props.className), children: [item, jsx(ChevronsUpDown, { className: "shrink-0 ms-auto size-4 text-fd-muted-foreground" })] }), jsx(PopoverContent, { className: "flex flex-col gap-1 w-(--radix-popover-trigger-width) overflow-hidden p-1", children: options.map((item2) => {
    const isActive2 = selected && item2.url === selected.url;
    if (!isActive2 && item2.unlisted)
      return;
    return jsxs(Link2, { href: item2.url, onClick, ...item2.props, className: twMerge("flex items-center gap-2 rounded-lg p-1.5 hover:bg-fd-accent hover:text-fd-accent-foreground", item2.props?.className), children: [jsx("div", { className: "shrink-0 size-9 md:mt-1 md:mb-auto md:size-5", children: item2.icon }), jsxs("div", { children: [jsx("p", { className: "text-sm font-medium", children: item2.title }), jsx("p", { className: "text-[13px] text-fd-muted-foreground empty:hidden", children: item2.description })] }), jsx(Check, { className: twMerge("shrink-0 ms-auto size-3.5 text-fd-primary", !isActive2 && "invisible") })] }, item2.url);
  }) })] });
}
function Navbar(props) {
  const { isTransparent } = useNav();
  return jsx("header", { id: "nd-subnav", ...props, className: twMerge("fixed top-(--fd-banner-height) left-0 right-(--removed-body-scroll-bar-size,0) z-30 flex items-center ps-4 pe-2.5 border-b transition-colors backdrop-blur-sm", !isTransparent && "bg-fd-background/80", props.className), children: props.children });
}
function LayoutBody(props) {
  const { collapsed } = useSidebar();
  return jsx("main", { id: "nd-docs-layout", ...props, className: twMerge("flex flex-1 flex-col pt-(--fd-nav-height) transition-[padding] fd-default-layout", !collapsed && "mx-(--fd-layout-offset)", props.className), style: {
    ...props.style,
    paddingInlineStart: collapsed ? "min(calc(100vw - var(--fd-page-width)), var(--fd-sidebar-width))" : "var(--fd-sidebar-width)"
  }, children: props.children });
}
function CollapsibleControl() {
  const { collapsed } = useSidebar();
  return jsxs("div", { className: twMerge("fixed flex shadow-lg transition-opacity rounded-xl p-0.5 border bg-fd-muted text-fd-muted-foreground z-10 max-md:hidden xl:start-4 max-xl:end-4", !collapsed && "pointer-events-none opacity-0"), style: {
    top: "calc(var(--fd-banner-height) + var(--fd-tocnav-height) + var(--spacing) * 4)"
  }, children: [jsx(SidebarCollapseTrigger, { className: twMerge(buttonVariants({
    color: "ghost",
    size: "icon-sm",
    className: "rounded-lg"
  })), children: jsx(Sidebar$1, {}) }), jsx(SearchToggle, { className: "rounded-lg", hideIfDisabled: true })] });
}
function LayoutTabs({ options, ...props }) {
  const pathname = usePathname();
  const selected = useMemo(() => {
    return options.findLast((option) => isTabActive(option, pathname));
  }, [options, pathname]);
  return jsx("div", { ...props, className: twMerge("flex flex-row items-end gap-6 overflow-auto", props.className), children: options.map((option) => jsx(LayoutTab, { selected: selected === option, option }, option.url)) });
}
function LayoutTab({ option: { title, url, unlisted, props }, selected = false }) {
  return jsx(Link2, { href: url, ...props, className: twMerge("inline-flex border-b-2 border-transparent transition-colors items-center pb-1.5 font-medium gap-2 text-fd-muted-foreground text-sm text-nowrap hover:text-fd-accent-foreground", unlisted && !selected && "hidden", selected && "border-fd-primary text-fd-primary", props?.className), children: title });
}
const defaultTransform = (option, node) => {
  if (!node.icon)
    return option;
  return {
    ...option,
    icon: jsx("div", { className: "size-full [&_svg]:size-full max-md:p-1.5 max-md:rounded-md max-md:border max-md:bg-fd-secondary", children: node.icon })
  };
};
function getSidebarTabs(tree, { transform = defaultTransform } = {}) {
  const results = [];
  function scanOptions(node, unlisted) {
    if ("root" in node && node.root) {
      const urls = getFolderUrls(node);
      if (urls.size > 0) {
        const option = {
          url: urls.values().next().value ?? "",
          title: node.name,
          icon: node.icon,
          unlisted,
          description: node.description,
          urls
        };
        const mapped = transform ? transform(option, node) : option;
        if (mapped)
          results.push(mapped);
      }
    }
    for (const child of node.children) {
      if (child.type === "folder")
        scanOptions(child, unlisted);
    }
  }
  scanOptions(tree);
  if (tree.fallback)
    scanOptions(tree.fallback, true);
  return results;
}
function getFolderUrls(folder, output = /* @__PURE__ */ new Set()) {
  if (folder.index)
    output.add(folder.index.url);
  for (const child of folder.children) {
    if (child.type === "page" && !child.external)
      output.add(child.url);
    if (child.type === "folder")
      getFolderUrls(child, output);
  }
  return output;
}
function DocsLayout({ nav: { transparentMode, ...nav } = {}, sidebar: { tabs: sidebarTabs, enabled: sidebarEnabled = true, ...sidebarProps } = {}, searchToggle = {}, themeSwitch = {}, tabMode = "auto", i18n = false, children, ...props }) {
  const tabs = useMemo(() => {
    if (Array.isArray(sidebarTabs)) {
      return sidebarTabs;
    }
    if (typeof sidebarTabs === "object") {
      return getSidebarTabs(props.tree, sidebarTabs);
    }
    if (sidebarTabs !== false) {
      return getSidebarTabs(props.tree);
    }
    return [];
  }, [sidebarTabs, props.tree]);
  const links2 = getLinks(props.links ?? [], props.githubUrl);
  const sidebarVariables = twMerge("md:[--fd-sidebar-width:268px] lg:[--fd-sidebar-width:286px]");
  function sidebar() {
    const { footer, banner, collapsible = true, component, components, defaultOpenLevel, prefetch, ...rest2 } = sidebarProps;
    if (component)
      return component;
    const iconLinks = links2.filter((item) => item.type === "icon");
    const viewport = jsxs(SidebarViewport, { children: [links2.filter((v) => v.type !== "icon").map((item, i, list) => jsx(SidebarLinkItem, { item, className: twMerge(i === list.length - 1 && "mb-4") }, i)), jsx(SidebarPageTree, { components })] });
    const mobile = jsxs(SidebarContentMobile, { ...rest2, children: [jsxs(SidebarHeader, { children: [jsxs("div", { className: "flex text-fd-muted-foreground items-center gap-1.5", children: [jsx("div", { className: "flex flex-1", children: iconLinks.map((item, i) => jsx(BaseLinkItem, { item, className: twMerge(buttonVariants({
      size: "icon-sm",
      color: "ghost",
      className: "p-2"
    })), "aria-label": item.label, children: item.icon }, i)) }), i18n ? jsxs(LanguageToggle, { children: [jsx(Languages, { className: "size-4.5" }), jsx(LanguageToggleText, {})] }) : null, themeSwitch.enabled !== false && (themeSwitch.component ?? jsx(ThemeToggle, { className: "p-0", mode: themeSwitch.mode })), jsx(SidebarTrigger, { className: twMerge(buttonVariants({
      color: "ghost",
      size: "icon-sm",
      className: "p-2"
    })), children: jsx(Sidebar$1, {}) })] }), tabs.length > 0 && jsx(RootToggle, { options: tabs }), banner] }), viewport, jsx(SidebarFooter, { className: "empty:hidden", children: footer })] });
    const content = jsxs(SidebarContent, { ...rest2, children: [jsxs(SidebarHeader, { children: [jsxs("div", { className: "flex", children: [jsx(Link2, { href: nav.url ?? "/", className: "inline-flex text-[15px] items-center gap-2.5 font-medium me-auto", children: nav.title }), nav.children, collapsible && jsx(SidebarCollapseTrigger, { className: twMerge(buttonVariants({
      color: "ghost",
      size: "icon-sm",
      className: "mb-auto text-fd-muted-foreground"
    })), children: jsx(Sidebar$1, {}) })] }), searchToggle.enabled !== false && (searchToggle.components?.lg ?? jsx(LargeSearchToggle, { hideIfDisabled: true })), tabs.length > 0 && tabMode === "auto" && jsx(RootToggle, { options: tabs }), banner] }), viewport, (i18n || iconLinks.length > 0 || themeSwitch?.enabled !== false || footer) && jsxs(SidebarFooter, { children: [jsxs("div", { className: "flex text-fd-muted-foreground items-center empty:hidden", children: [i18n && jsx(LanguageToggle, { children: jsx(Languages, { className: "size-4.5" }) }), iconLinks.map((item, i) => jsx(BaseLinkItem, { item, className: twMerge(buttonVariants({ size: "icon-sm", color: "ghost" })), "aria-label": item.label, children: item.icon }, i)), themeSwitch.enabled !== false && (themeSwitch.component ?? jsx(ThemeToggle, { className: "ms-auto p-0", mode: themeSwitch.mode }))] }), footer] })] });
    return jsx(Sidebar, { defaultOpenLevel, prefetch, Mobile: mobile, Content: jsxs(Fragment, { children: [collapsible && jsx(CollapsibleControl, {}), content] }) });
  }
  return jsx(TreeContextProvider, { tree: props.tree, children: jsxs(NavProvider, { transparentMode, children: [nav.enabled !== false && (nav.component ?? jsxs(Navbar, { className: "h-(--fd-nav-height) on-root:[--fd-nav-height:56px] md:on-root:[--fd-nav-height:0px] md:hidden", children: [jsx(Link2, { href: nav.url ?? "/", className: "inline-flex items-center gap-2.5 font-semibold", children: nav.title }), jsx("div", { className: "flex-1", children: nav.children }), searchToggle.enabled !== false && (searchToggle.components?.sm ?? jsx(SearchToggle, { className: "p-2", hideIfDisabled: true })), sidebarEnabled && jsx(SidebarTrigger, { className: twMerge(buttonVariants({
    color: "ghost",
    size: "icon-sm",
    className: "p-2"
  })), children: jsx(Sidebar$1, {}) })] })), jsxs(LayoutBody, { ...props.containerProps, className: twMerge("md:[&_#nd-page_article]:pt-12 xl:[--fd-toc-width:286px] xl:[&_#nd-page_article]:px-8", sidebarEnabled && sidebarVariables, props.containerProps?.className), children: [sidebarEnabled && sidebar(), tabMode === "top" && tabs.length > 0 && jsx(LayoutTabs, { options: tabs, className: "sticky top-[calc(var(--fd-nav-height)+var(--fd-tocnav-height))] z-10 bg-fd-background border-b px-6 pt-3 xl:px-8 max-md:hidden" }), children] })] }) });
}
function SidebarLinkItem({ item, ...props }) {
  if (item.type === "menu")
    return jsxs(SidebarFolder, { ...props, children: [item.url ? jsxs(SidebarFolderLink, { href: item.url, external: item.external, children: [item.icon, item.text] }) : jsxs(SidebarFolderTrigger, { children: [item.icon, item.text] }), jsx(SidebarFolderContent, { children: item.items.map((child, i) => jsx(SidebarLinkItem, { item: child }, i)) })] });
  if (item.type === "custom")
    return jsx("div", { ...props, children: item.children });
  return jsx(SidebarItem, { href: item.url, icon: item.icon, external: item.external, ...props, children: item.text });
}
function Cards(props) {
  return jsx("div", { ...props, className: twMerge("grid grid-cols-2 gap-3 @container", props.className), children: props.children });
}
function Card({ icon, title, description, ...props }) {
  const E = props.href ? Link2 : "div";
  return jsxs(E, { ...props, "data-card": true, className: twMerge("block rounded-xl border bg-fd-card p-4 text-fd-card-foreground transition-colors @max-lg:col-span-full", props.href && "hover:bg-fd-accent/80", props.className), children: [icon ? jsx("div", { className: "not-prose mb-2 w-fit shadow-md rounded-lg border bg-fd-muted p-1.5 text-fd-muted-foreground [&_svg]:size-4", children: icon }) : null, jsx("h3", { className: "not-prose mb-1 text-sm font-medium", children: title }), description ? jsx("p", { className: "!my-0 text-sm text-fd-muted-foreground", children: description }) : null, jsx("div", { className: "text-sm text-fd-muted-foreground prose-no-margin empty:hidden", children: props.children })] });
}
var useEffectEvent = "useEffectEvent" in React ? { ...React }.useEffectEvent : (callback) => {
  const ref = React.useRef(callback);
  ref.current = callback;
  return React.useCallback(
    ((...params) => ref.current(...params)),
    []
  );
};
function mergeRefs$1(...refs) {
  return (value) => {
    refs.forEach((ref) => {
      if (typeof ref === "function") {
        ref(value);
      } else if (ref !== null) {
        ref.current = value;
      }
    });
  };
}
function useAnchorObserver(watch, single) {
  const [activeAnchor, setActiveAnchor] = useState([]);
  useEffect(() => {
    let visible = [];
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry2 of entries) {
          if (entry2.isIntersecting && !visible.includes(entry2.target.id)) {
            visible = [...visible, entry2.target.id];
          } else if (!entry2.isIntersecting && visible.includes(entry2.target.id)) {
            visible = visible.filter((v) => v !== entry2.target.id);
          }
        }
        if (visible.length > 0) setActiveAnchor(visible);
      },
      {
        rootMargin: single ? "-80px 0% -70% 0%" : `-20px 0% -40% 0%`,
        threshold: 1
      }
    );
    function onScroll() {
      const element = document.scrollingElement;
      if (!element) return;
      const top = element.scrollTop;
      if (top <= 0 && single) setActiveAnchor(watch.slice(0, 1));
      else if (top + element.clientHeight >= element.scrollHeight - 6) {
        setActiveAnchor((active) => {
          return active.length > 0 && !single ? watch.slice(watch.indexOf(active[0])) : watch.slice(-1);
        });
      }
    }
    for (const heading of watch) {
      const element = document.getElementById(heading);
      if (element) observer.observe(element);
    }
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, [single, watch]);
  return single ? activeAnchor.slice(0, 1) : activeAnchor;
}
var ActiveAnchorContext = createContext$1([]);
var ScrollContext = createContext$1({
  current: null
});
function useActiveAnchor() {
  return useContext(ActiveAnchorContext).at(-1);
}
function useActiveAnchors() {
  return useContext(ActiveAnchorContext);
}
function ScrollProvider({
  containerRef,
  children
}) {
  return /* @__PURE__ */ jsx(ScrollContext.Provider, { value: containerRef, children });
}
function AnchorProvider({
  toc,
  single = true,
  children
}) {
  const headings = useMemo(() => {
    return toc.map((item) => item.url.split("#")[1]);
  }, [toc]);
  return /* @__PURE__ */ jsx(ActiveAnchorContext.Provider, { value: useAnchorObserver(headings, single), children });
}
var TOCItem$2 = forwardRef(
  ({ onActiveChange, ...props }, ref) => {
    const containerRef = useContext(ScrollContext);
    const anchors = useActiveAnchors();
    const anchorRef = useRef(null);
    const mergedRef = mergeRefs$1(anchorRef, ref);
    const isActive2 = anchors.includes(props.href.slice(1));
    useOnChange(isActive2, (v) => {
      const element = anchorRef.current;
      if (!element) return;
      if (v && containerRef.current) {
        scrollIntoView(element, {
          behavior: "smooth",
          block: "center",
          inline: "center",
          scrollMode: "always",
          boundary: containerRef.current
        });
      }
      onActiveChange?.(v);
    });
    return /* @__PURE__ */ jsx("a", { ref: mergedRef, "data-active": isActive2, ...props, children: props.children });
  }
);
TOCItem$2.displayName = "TOCItem";
function calc(container, active) {
  if (active.length === 0 || container.clientHeight === 0) {
    return [0, 0];
  }
  let upper = Number.MAX_VALUE, lower = 0;
  for (const item of active) {
    const element = container.querySelector(`a[href="#${item}"]`);
    if (!element)
      continue;
    const styles = getComputedStyle(element);
    upper = Math.min(upper, element.offsetTop + parseFloat(styles.paddingTop));
    lower = Math.max(lower, element.offsetTop + element.clientHeight - parseFloat(styles.paddingBottom));
  }
  return [upper, lower - upper];
}
function update(element, info) {
  element.style.setProperty("--fd-top", `${info[0]}px`);
  element.style.setProperty("--fd-height", `${info[1]}px`);
}
function TocThumb({ containerRef, ...props }) {
  const active = useActiveAnchors();
  const thumbRef = useRef(null);
  const onResize = useEffectEvent(() => {
    if (!containerRef.current || !thumbRef.current)
      return;
    update(thumbRef.current, calc(containerRef.current, active));
  });
  useEffect(() => {
    if (!containerRef.current)
      return;
    const container = containerRef.current;
    onResize();
    const observer = new ResizeObserver(onResize);
    observer.observe(container);
    return () => {
      observer.disconnect();
    };
  }, [containerRef]);
  useOnChange(active, () => {
    if (!containerRef.current || !thumbRef.current)
      return;
    update(thumbRef.current, calc(containerRef.current, active));
  });
  return jsx("div", { ref: thumbRef, role: "none", ...props });
}
function mergeRefs(...refs) {
  return (value) => {
    refs.forEach((ref) => {
      if (typeof ref === "function") {
        ref(value);
      } else if (ref) {
        ref.current = value;
      }
    });
  };
}
const TOCContext = createContext$1([]);
function useTOCItems() {
  return useContext(TOCContext);
}
function TOCProvider({ toc, children, ...props }) {
  return jsx(TOCContext, { value: toc, children: jsx(AnchorProvider, { toc, ...props, children }) });
}
function TOCScrollArea({ ref, className, ...props }) {
  const viewRef = useRef(null);
  return jsx("div", { ref: mergeRefs(viewRef, ref), className: twMerge("relative min-h-0 text-sm ms-px overflow-auto [scrollbar-width:none] [mask-image:linear-gradient(to_bottom,transparent,white_16px,white_calc(100%-16px),transparent)] py-3", className), ...props, children: jsx(ScrollProvider, { containerRef: viewRef, children: props.children }) });
}
function TOCItems({ ref, className, ...props }) {
  const containerRef = useRef(null);
  const items = useTOCItems();
  const { text } = useI18n();
  if (items.length === 0)
    return jsx("div", { className: "rounded-lg border bg-fd-card p-3 text-xs text-fd-muted-foreground", children: text.tocNoHeadings });
  return jsxs(Fragment, { children: [jsx(TocThumb, { containerRef, className: "absolute top-(--fd-top) h-(--fd-height) w-px bg-fd-primary transition-all" }), jsx("div", { ref: mergeRefs(ref, containerRef), className: twMerge("flex flex-col border-s border-fd-foreground/10", className), ...props, children: items.map((item) => jsx(TOCItem$1, { item }, item.url)) })] });
}
function TOCItem$1({ item }) {
  return jsx(TOCItem$2, { href: item.url, className: twMerge("prose py-1.5 text-sm text-fd-muted-foreground transition-colors [overflow-wrap:anywhere] first:pt-0 last:pb-0 data-[active=true]:text-fd-primary", item.depth <= 2 && "ps-3", item.depth === 3 && "ps-6", item.depth >= 4 && "ps-8"), children: item.title });
}
const TocPopoverContext = createContext("TocPopoverContext");
function PageTOCPopoverTrigger(props) {
  const { text } = useI18n();
  const { open } = TocPopoverContext.use();
  const items = useTOCItems();
  const active = useActiveAnchor();
  const selected = useMemo(() => items.findIndex((item) => active === item.url.slice(1)), [items, active]);
  const path = useTreePath().at(-1);
  const showItem = selected !== -1 && !open;
  return jsxs(CollapsibleTrigger, { ...props, className: twMerge("flex w-full h-(--fd-tocnav-height) items-center text-sm text-fd-muted-foreground gap-2.5 px-4 py-2.5 text-start focus-visible:outline-none [&_svg]:size-4 md:px-6", props.className), children: [jsx(ProgressCircle, { value: (selected + 1) / Math.max(1, items.length), max: 1, className: twMerge("shrink-0", open && "text-fd-primary") }), jsxs("span", { className: "grid flex-1 *:my-auto *:row-start-1 *:col-start-1", children: [jsx("span", { className: twMerge("truncate transition-all", open && "text-fd-foreground", showItem && "opacity-0 -translate-y-full pointer-events-none"), children: path?.name ?? text.toc }), jsx("span", { className: twMerge("truncate transition-all", !showItem && "opacity-0 translate-y-full pointer-events-none"), children: items[selected]?.title })] }), jsx(ChevronDown, { className: twMerge("shrink-0 transition-transform mx-0.5", open && "rotate-180") })] });
}
function clamp(input, min, max) {
  if (input < min)
    return min;
  if (input > max)
    return max;
  return input;
}
function ProgressCircle({ value, strokeWidth = 2, size = 24, min = 0, max = 100, ...restSvgProps }) {
  const normalizedValue = clamp(value, min, max);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = normalizedValue / max * circumference;
  const circleProps = {
    cx: size / 2,
    cy: size / 2,
    r: radius,
    fill: "none",
    strokeWidth
  };
  return jsxs("svg", { role: "progressbar", viewBox: `0 0 ${size} ${size}`, "aria-valuenow": normalizedValue, "aria-valuemin": min, "aria-valuemax": max, ...restSvgProps, children: [jsx("circle", { ...circleProps, className: "stroke-current/25" }), jsx("circle", { ...circleProps, stroke: "currentColor", strokeDasharray: circumference, strokeDashoffset: circumference - progress, strokeLinecap: "round", transform: `rotate(-90 ${size / 2} ${size / 2})`, className: "transition-all" })] });
}
function PageTOCPopoverContent(props) {
  return jsx(CollapsibleContent, { "data-toc-popover": "", ...props, className: twMerge("flex flex-col px-4 max-h-[50vh] md:px-6", props.className), children: props.children });
}
function PageTOCPopover(props) {
  const ref = useRef(null);
  const [open, setOpen] = useState(false);
  const { collapsed } = useSidebar();
  const { isTransparent } = useNav();
  const onClick = useEffectEvent((e) => {
    if (!open)
      return;
    if (ref.current && !ref.current.contains(e.target))
      setOpen(false);
  });
  useEffect(() => {
    window.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("click", onClick);
    };
  }, []);
  return jsx(TocPopoverContext.Provider, { value: useMemo(() => ({
    open,
    setOpen
  }), [setOpen, open]), children: jsx(Collapsible, { open, onOpenChange: setOpen, asChild: true, children: jsx("header", { ref, id: "nd-tocnav", ...props, className: twMerge("fixed pr-(--removed-body-scroll-bar-size,0) z-10 border-b backdrop-blur-sm transition-colors xl:hidden max-xl:on-root:[--fd-tocnav-height:40px]", (!isTransparent || open) && "bg-fd-background/80", open && "shadow-lg", props.className), style: {
    ...props.style,
    top: "calc(var(--fd-banner-height) + var(--fd-nav-height))",
    insetInlineStart: collapsed ? "0px" : "calc(var(--fd-sidebar-width) + var(--fd-layout-offset))",
    insetInlineEnd: 0
  }, children: props.children }) }) });
}
function PageLastUpdate({ date: value, ...props }) {
  const { text } = useI18n();
  const [date, setDate] = useState("");
  useEffect(() => {
    setDate(new Date(value).toLocaleDateString());
  }, [value]);
  return jsxs("p", { ...props, className: twMerge("text-sm text-fd-muted-foreground", props.className), children: [text.lastUpdate, " ", date] });
}
function scanNavigationList(tree) {
  const list = [];
  tree.forEach((node) => {
    if (node.type === "folder") {
      if (node.index) {
        list.push(node.index);
      }
      list.push(...scanNavigationList(node.children));
      return;
    }
    if (node.type === "page" && !node.external) {
      list.push(node);
    }
  });
  return list;
}
const listCache = /* @__PURE__ */ new Map();
function PageFooter({ items, ...props }) {
  const { root: root2 } = useTreeContext();
  const pathname = usePathname();
  const { previous, next } = useMemo(() => {
    if (items)
      return items;
    const cached = listCache.get(root2.$id);
    const list = cached ?? scanNavigationList(root2.children);
    listCache.set(root2.$id, list);
    const idx = list.findIndex((item) => isActive(item.url, pathname, false));
    if (idx === -1)
      return {};
    return {
      previous: list[idx - 1],
      next: list[idx + 1]
    };
  }, [items, pathname, root2]);
  return jsxs("div", { ...props, className: twMerge("@container grid gap-4 pb-6", previous && next ? "grid-cols-2" : "grid-cols-1", props.className), children: [previous ? jsx(FooterItem, { item: previous, index: 0 }) : null, next ? jsx(FooterItem, { item: next, index: 1 }) : null] });
}
function FooterItem({ item, index }) {
  const { text } = useI18n();
  const Icon = index === 0 ? ChevronLeft : ChevronRight;
  return jsxs(Link2, { href: item.url, className: twMerge("flex flex-col gap-2 rounded-lg border p-4 text-sm transition-colors hover:bg-fd-accent/80 hover:text-fd-accent-foreground @max-lg:col-span-full", index === 1 && "text-end"), children: [jsxs("div", { className: twMerge("inline-flex items-center gap-1.5 font-medium", index === 1 && "flex-row-reverse"), children: [jsx(Icon, { className: "-mx-1 size-4 shrink-0 rtl:rotate-180" }), jsx("p", { children: item.name })] }), jsx("p", { className: "text-fd-muted-foreground truncate", children: item.description ?? (index === 0 ? text.previousPage : text.nextPage) })] });
}
function PageBreadcrumb({ includeRoot, includeSeparator, includePage, ...props }) {
  const path = useTreePath();
  const { root: root2 } = useTreeContext();
  const items = useMemo(() => {
    return getBreadcrumbItemsFromPath(root2, path, {
      includePage,
      includeSeparator,
      includeRoot
    });
  }, [includePage, includeRoot, includeSeparator, path, root2]);
  if (items.length === 0)
    return null;
  return jsx("div", { ...props, className: twMerge("flex items-center gap-1.5 text-sm text-fd-muted-foreground", props.className), children: items.map((item, i) => {
    const className = twMerge("truncate", i === items.length - 1 && "text-fd-primary font-medium");
    return jsxs(Fragment$1, { children: [i !== 0 && jsx(ChevronRight, { className: "size-3.5 shrink-0" }), item.url ? jsx(Link2, { href: item.url, className: twMerge(className, "transition-opacity hover:opacity-80"), children: item.name }) : jsx("span", { className, children: item.name })] }, i);
  }) });
}
function PageTOC(props) {
  const { collapsed } = useSidebar();
  const offset = collapsed ? "0px" : "var(--fd-layout-offset)";
  return jsx("div", { id: "nd-toc", ...props, className: twMerge("fixed bottom-0 pt-12 pb-2 pr-(--removed-body-scroll-bar-size,0) max-xl:hidden", props.className), style: {
    ...props.style,
    top: "calc(var(--fd-banner-height) + var(--fd-nav-height))",
    insetInlineEnd: `max(${offset}, calc(50vw - var(--fd-sidebar-width)/2 - var(--fd-page-width)/2))`
  }, children: jsx("div", { className: "flex h-full w-(--fd-toc-width) max-w-full flex-col pe-4", children: props.children }) });
}
function ClerkTOCItems({ ref, className, ...props }) {
  const containerRef = useRef(null);
  const items = useTOCItems();
  const { text } = useI18n();
  const [svg, setSvg] = useState();
  useEffect(() => {
    if (!containerRef.current)
      return;
    const container = containerRef.current;
    function onResize() {
      if (container.clientHeight === 0)
        return;
      let w = 0, h = 0;
      const d = [];
      for (let i = 0; i < items.length; i++) {
        const element = container.querySelector(`a[href="#${items[i].url.slice(1)}"]`);
        if (!element)
          continue;
        const styles = getComputedStyle(element);
        const offset = getLineOffset(items[i].depth) + 1, top = element.offsetTop + parseFloat(styles.paddingTop), bottom = element.offsetTop + element.clientHeight - parseFloat(styles.paddingBottom);
        w = Math.max(offset, w);
        h = Math.max(h, bottom);
        d.push(`${i === 0 ? "M" : "L"}${offset} ${top}`);
        d.push(`L${offset} ${bottom}`);
      }
      setSvg({
        path: d.join(" "),
        width: w + 1,
        height: h
      });
    }
    const observer = new ResizeObserver(onResize);
    onResize();
    observer.observe(container);
    return () => {
      observer.disconnect();
    };
  }, [items]);
  if (items.length === 0)
    return jsx("div", { className: "rounded-lg border bg-fd-card p-3 text-xs text-fd-muted-foreground", children: text.tocNoHeadings });
  return jsxs(Fragment, { children: [svg ? jsx("div", { className: "absolute start-0 top-0 rtl:-scale-x-100", style: {
    width: svg.width,
    height: svg.height,
    maskImage: `url("data:image/svg+xml,${// Inline SVG
    encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${svg.width} ${svg.height}"><path d="${svg.path}" stroke="black" stroke-width="1" fill="none" /></svg>`)}")`
  }, children: jsx(TocThumb, { containerRef, className: "mt-(--fd-top) h-(--fd-height) bg-fd-primary transition-all" }) }) : null, jsx("div", { ref: mergeRefs(containerRef, ref), className: twMerge("flex flex-col", className), ...props, children: items.map((item, i) => jsx(TOCItem, { item, upper: items[i - 1]?.depth, lower: items[i + 1]?.depth }, item.url)) })] });
}
function getItemOffset(depth) {
  if (depth <= 2)
    return 14;
  if (depth === 3)
    return 26;
  return 36;
}
function getLineOffset(depth) {
  return depth >= 3 ? 10 : 0;
}
function TOCItem({ item, upper = item.depth, lower = item.depth }) {
  const offset = getLineOffset(item.depth), upperOffset = getLineOffset(upper), lowerOffset = getLineOffset(lower);
  return jsxs(TOCItem$2, { href: item.url, style: {
    paddingInlineStart: getItemOffset(item.depth)
  }, className: "prose relative py-1.5 text-sm text-fd-muted-foreground hover:text-fd-accent-foreground transition-colors [overflow-wrap:anywhere] first:pt-0 last:pb-0 data-[active=true]:text-fd-primary", children: [offset !== upperOffset ? jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 16 16", className: "absolute -top-1.5 start-0 size-4 rtl:-scale-x-100", children: jsx("line", { x1: upperOffset, y1: "0", x2: offset, y2: "12", className: "stroke-fd-foreground/10", strokeWidth: "1" }) }) : null, jsx("div", { className: twMerge("absolute inset-y-0 w-px bg-fd-foreground/10", offset !== upperOffset && "top-1.5", offset !== lowerOffset && "bottom-1.5"), style: {
    insetInlineStart: offset
  } }), item.title] });
}
function PageTOCTitle(props) {
  return jsxs("h3", { ...props, className: twMerge("inline-flex items-center gap-1.5 text-sm text-fd-muted-foreground", props.className), children: [jsx(Text, { className: "size-4" }), jsx(I18nLabel, { label: "toc" })] });
}
function PageTOCItems({ variant = "normal", ...props }) {
  return jsx(TOCScrollArea, { ...props, children: variant === "clerk" ? jsx(ClerkTOCItems, {}) : jsx(TOCItems, {}) });
}
function PageTOCPopoverItems({ variant = "normal", ...props }) {
  return jsx(TOCScrollArea, { ...props, children: variant === "clerk" ? jsx(ClerkTOCItems, {}) : jsx(TOCItems, {}) });
}
function PageArticle(props) {
  return jsx("article", { ...props, className: twMerge("flex min-w-0 w-full flex-col gap-4 pt-8 px-4 md:px-6 md:mx-auto", props.className), children: props.children });
}
function PageRoot({ toc = false, children, ...props }) {
  const content = jsx("div", { id: "nd-page", ...props, className: twMerge("flex flex-1 w-full mx-auto max-w-(--fd-page-width) pt-(--fd-tocnav-height) pe-(--fd-toc-width)", props.className), children });
  if (toc)
    return jsx(TOCProvider, { ...toc, children: content });
  return content;
}
function DocsPage({ editOnGithub, breadcrumb: { enabled: breadcrumbEnabled = true, component: breadcrumb, ...breadcrumbProps } = {}, footer = {}, lastUpdate, container, full: full2 = false, tableOfContentPopover: { enabled: tocPopoverEnabled, component: tocPopover, ...tocPopoverOptions } = {}, tableOfContent: { enabled: tocEnabled, component: tocReplace, ...tocOptions } = {}, toc = [], article, children }) {
  tocEnabled ?? (tocEnabled = !full2 && (toc.length > 0 || tocOptions.footer !== void 0 || tocOptions.header !== void 0));
  tocPopoverEnabled ?? (tocPopoverEnabled = toc.length > 0 || tocPopoverOptions.header !== void 0 || tocPopoverOptions.footer !== void 0);
  return jsxs(PageRoot, { toc: tocEnabled || tocPopoverEnabled ? {
    toc,
    single: tocOptions.single
  } : false, ...container, className: twMerge(!tocEnabled && "[--fd-toc-width:0px]", container?.className), children: [tocPopoverEnabled && (tocPopover ?? jsxs(PageTOCPopover, { children: [jsx(PageTOCPopoverTrigger, {}), jsxs(PageTOCPopoverContent, { children: [tocPopoverOptions.header, jsx(PageTOCPopoverItems, { variant: tocPopoverOptions.style }), tocPopoverOptions.footer] })] })), jsxs(PageArticle, { ...article, children: [breadcrumbEnabled && (breadcrumb ?? jsx(PageBreadcrumb, { ...breadcrumbProps })), children, jsxs("div", { className: "flex flex-row flex-wrap items-center justify-between gap-4 empty:hidden", children: [editOnGithub && jsx(EditOnGitHub, { href: `https://github.com/${editOnGithub.owner}/${editOnGithub.repo}/blob/${editOnGithub.sha}/${editOnGithub.path.startsWith("/") ? editOnGithub.path.slice(1) : editOnGithub.path}` }), lastUpdate && jsx(PageLastUpdate, { date: new Date(lastUpdate) })] }), footer.enabled !== false && (footer.component ?? jsx(PageFooter, { items: footer.items }))] }), tocEnabled && (tocReplace ?? jsxs(PageTOC, { children: [tocOptions.header, jsx(PageTOCTitle, {}), jsx(PageTOCItems, { variant: tocOptions.style }), tocOptions.footer] }))] });
}
function EditOnGitHub(props) {
  return jsx("a", { target: "_blank", rel: "noreferrer noopener", ...props, className: twMerge(buttonVariants({
    color: "secondary",
    size: "sm",
    className: "gap-1.5 not-prose"
  }), props.className), children: props.children ?? jsxs(Fragment, { children: [jsx(Edit, { className: "size-3.5" }), jsx(I18nLabel, { label: "editOnGithub" })] }) });
}
const DocsBody = forwardRef((props, ref) => jsx("div", { ref, ...props, className: twMerge("prose flex-1", props.className), children: props.children }));
DocsBody.displayName = "DocsBody";
const DocsDescription = forwardRef((props, ref) => {
  if (props.children === void 0)
    return null;
  return jsx("p", { ref, ...props, className: twMerge("mb-8 text-lg text-fd-muted-foreground", props.className), children: props.children });
});
DocsDescription.displayName = "DocsDescription";
const DocsTitle = forwardRef((props, ref) => {
  return jsx("h1", { ref, ...props, className: twMerge("text-[1.75em] font-semibold", props.className), children: props.children });
});
DocsTitle.displayName = "DocsTitle";
function iconPlugin(resolveIcon) {
  function replaceIcon(node) {
    if (node.icon === void 0 || typeof node.icon === "string")
      node.icon = resolveIcon(node.icon);
    return node;
  }
  return {
    name: "fumadocs:icon",
    transformPageTree: {
      file: replaceIcon,
      folder: replaceIcon,
      separator: replaceIcon
    }
  };
}
var path_exports = {};
__export(path_exports, {
  basename: () => basename$1,
  dirname: () => dirname,
  extname: () => extname,
  joinPath: () => joinPath,
  parseFilePath: () => parseFilePath,
  slash: () => slash,
  splitPath: () => splitPath
});
function basename$1(path, ext) {
  const idx = path.lastIndexOf("/");
  return path.substring(
    idx === -1 ? 0 : idx + 1,
    ext ? path.length - ext.length : path.length
  );
}
function extname(path) {
  const dotIdx = path.lastIndexOf(".");
  if (dotIdx !== -1) {
    return path.substring(dotIdx);
  }
  return "";
}
function dirname(path) {
  return path.split("/").slice(0, -1).join("/");
}
function parseFilePath(path) {
  const ext = extname(path);
  const name = basename$1(path, ext);
  const dir = dirname(path);
  return {
    dirname: dir,
    name,
    ext,
    path,
    get flattenedPath() {
      return [dir, name].filter((p) => p.length > 0).join("/");
    }
  };
}
function splitPath(path) {
  return path.split("/").filter((p) => p.length > 0);
}
function joinPath(...paths) {
  const out = [];
  const parsed = paths.flatMap(splitPath);
  for (const seg of parsed) {
    switch (seg) {
      case "..":
        out.pop();
        break;
      case ".":
        break;
      default:
        out.push(seg);
    }
  }
  return out.join("/");
}
function slash(path) {
  const isExtendedLengthPath = path.startsWith("\\\\?\\");
  if (isExtendedLengthPath) {
    return path;
  }
  return path.replaceAll("\\", "/");
}
function transformerFallback() {
  const addedFiles = /* @__PURE__ */ new Set();
  return {
    root(root2) {
      const isolatedStorage = new FileSystem();
      for (const file of this.storage.getFiles()) {
        if (addedFiles.has(file)) continue;
        const content = this.storage.read(file);
        if (content) isolatedStorage.write(file, content);
      }
      if (isolatedStorage.getFiles().length === 0) return root2;
      root2.fallback = this.builder.build(isolatedStorage, {
        ...this.options,
        id: `fallback-${root2.$id ?? ""}`,
        generateFallback: false
      });
      addedFiles.clear();
      return root2;
    },
    file(node, file) {
      if (file) addedFiles.add(file);
      return node;
    },
    folder(node, _dir, metaPath) {
      if (metaPath) addedFiles.add(metaPath);
      return node;
    }
  };
}
var group = /^\((?<name>.+)\)$/;
var link = /^(?:\[(?<icon>[^\]]+)])?\[(?<name>[^\]]+)]\((?<url>[^)]+)\)$/;
var separator = /^---(?:\[(?<icon>[^\]]+)])?(?<name>.+)---|^---$/;
var rest = "...";
var restReversed = "z...a";
var extractPrefix = "...";
var excludePrefix = "!";
function buildAll(paths, ctx, reversed = false) {
  const items = [];
  const folders = [];
  const sortedPaths = paths.sort(
    (a, b) => a.localeCompare(b) * (reversed ? -1 : 1)
  );
  for (const path of sortedPaths) {
    ctx.visitedPaths.add(path);
    const fileNode = buildFileNode(path, ctx);
    if (fileNode) {
      if (basename$1(path, extname(path)) === "index") items.unshift(fileNode);
      else items.push(fileNode);
      continue;
    }
    const dirNode = buildFolderNode(path, false, ctx);
    if (dirNode) folders.push(dirNode);
  }
  return [...items, ...folders];
}
function resolveFolderItem(folderPath, item, ctx, idx) {
  if (item === rest || item === restReversed) return item;
  const { resolveName } = ctx;
  let match = separator.exec(item);
  if (match?.groups) {
    let node = {
      $id: `${folderPath}#${idx}`,
      type: "separator",
      icon: match.groups.icon,
      name: match.groups.name
    };
    for (const transformer of ctx.transformers) {
      if (!transformer.separator) continue;
      node = transformer.separator.call(ctx, node);
    }
    return [node];
  }
  match = link.exec(item);
  if (match?.groups) {
    const { icon, url, name } = match.groups;
    const isRelative = url.startsWith("/") || url.startsWith("#") || url.startsWith(".");
    let node = {
      type: "page",
      icon,
      name,
      url,
      external: !isRelative
    };
    for (const transformer of ctx.transformers) {
      if (!transformer.file) continue;
      node = transformer.file.call(ctx, node);
    }
    return [node];
  }
  const isExcept = item.startsWith(excludePrefix);
  const isExtract = !isExcept && item.startsWith(extractPrefix);
  let filename = item;
  if (isExcept) {
    filename = item.slice(excludePrefix.length);
  } else if (isExtract) {
    filename = item.slice(extractPrefix.length);
  }
  const path = resolveName(joinPath(folderPath, filename), "page");
  ctx.visitedPaths.add(path);
  if (isExcept) return [];
  const dirNode = buildFolderNode(path, false, ctx);
  if (dirNode) {
    return isExtract ? dirNode.children : [dirNode];
  }
  const fileNode = buildFileNode(path, ctx);
  return fileNode ? [fileNode] : [];
}
function buildFolderNode(folderPath, isGlobalRoot, ctx) {
  const { storage, options, resolveName, transformers } = ctx;
  const files = storage.readDir(folderPath);
  if (!files) return;
  const metaPath = resolveName(joinPath(folderPath, "meta"), "meta");
  const indexPath = resolveName(joinPath(folderPath, "index"), "page");
  let meta2 = storage.read(metaPath);
  if (meta2?.format !== "meta") {
    meta2 = void 0;
  }
  const isRoot = meta2?.data.root ?? isGlobalRoot;
  let index;
  let children;
  function setIndexIfUnused() {
    if (isRoot || ctx.visitedPaths.has(indexPath)) return;
    ctx.visitedPaths.add(indexPath);
    index = buildFileNode(indexPath, ctx);
  }
  if (meta2 && meta2.data.pages) {
    const resolved = meta2.data.pages.flatMap((item, i) => resolveFolderItem(folderPath, item, ctx, i));
    setIndexIfUnused();
    for (let i = 0; i < resolved.length; i++) {
      const item = resolved[i];
      if (item !== rest && item !== restReversed) continue;
      const items = buildAll(
        files.filter((file) => !ctx.visitedPaths.has(file)),
        ctx,
        item === restReversed
      );
      resolved.splice(i, 1, ...items);
      break;
    }
    children = resolved;
  } else {
    setIndexIfUnused();
    children = buildAll(
      files.filter((file) => !ctx.visitedPaths.has(file)),
      ctx
    );
  }
  let name = meta2?.data.title ?? index?.name;
  if (!name) {
    const folderName = basename$1(folderPath);
    name = pathToName(group.exec(folderName)?.[1] ?? folderName);
  }
  let node = {
    type: "folder",
    name,
    icon: meta2?.data.icon ?? index?.icon,
    root: meta2?.data.root,
    defaultOpen: meta2?.data.defaultOpen,
    description: meta2?.data.description,
    index,
    children,
    $id: folderPath,
    $ref: !options.noRef && meta2 ? {
      metaFile: metaPath
    } : void 0
  };
  for (const transformer of transformers) {
    if (!transformer.folder) continue;
    node = transformer.folder.call(ctx, node, folderPath, metaPath);
  }
  return node;
}
function buildFileNode(path, ctx) {
  const { options, getUrl, storage, locale, transformers } = ctx;
  const page2 = storage.read(path);
  if (page2?.format !== "page") return;
  const { title, description, icon } = page2.data;
  let item = {
    $id: path,
    type: "page",
    name: title ?? pathToName(basename$1(path, extname(path))),
    description,
    icon,
    url: getUrl(page2.slugs, locale),
    $ref: !options.noRef ? {
      file: path
    } : void 0
  };
  for (const transformer of transformers) {
    if (!transformer.file) continue;
    item = transformer.file.call(ctx, item, path);
  }
  return item;
}
function build(id, ctx) {
  const folder = buildFolderNode("", true, ctx);
  let root2 = {
    $id: id,
    name: folder.name || "Docs",
    children: folder.children
  };
  for (const transformer of ctx.transformers) {
    if (!transformer.root) continue;
    root2 = transformer.root.call(ctx, root2);
  }
  return root2;
}
function createPageTreeBuilder(getUrl, plugins) {
  function getTransformers(generateFallback) {
    const transformers = [];
    for (const plugin of plugins ?? []) {
      if (plugin.transformPageTree) transformers.push(plugin.transformPageTree);
    }
    if (generateFallback) {
      transformers.push(transformerFallback());
    }
    return transformers;
  }
  function createFlattenPathResolver(storage) {
    const map2 = /* @__PURE__ */ new Map();
    const files = storage.getFiles();
    for (const file of files) {
      const content = storage.read(file);
      const flattenPath = file.substring(0, file.length - extname(file).length);
      map2.set(flattenPath + "." + content.format, file);
    }
    return (name, format) => {
      return map2.get(name + "." + format);
    };
  }
  return {
    build(storage, options) {
      const key = "";
      return this.buildI18n({ [key]: storage }, options)[key];
    },
    buildI18n(storages, options = {}) {
      const { id, generateFallback = true } = options;
      const transformers = getTransformers(generateFallback);
      const out = {};
      for (const [locale, storage] of Object.entries(storages)) {
        const resolve = createFlattenPathResolver(storage);
        const branch = locale.length === 0 ? "root" : locale;
        out[locale] = build(id ? `${id}-${branch}` : branch, {
          transformers,
          builder: this,
          options,
          getUrl,
          locale,
          storage,
          storages,
          visitedPaths: /* @__PURE__ */ new Set(),
          resolveName(name, format) {
            return resolve(name, format) ?? name;
          }
        });
      }
      return out;
    }
  };
}
function pathToName(name) {
  const result = [];
  for (const c of name) {
    if (result.length === 0) result.push(c.toLocaleUpperCase());
    else if (c === "-") result.push(" ");
    else result.push(c);
  }
  return result.join("");
}
var FileSystem = class {
  constructor(inherit) {
    this.files = /* @__PURE__ */ new Map();
    this.folders = /* @__PURE__ */ new Map();
    if (inherit) {
      for (const [k, v] of inherit.folders) {
        this.folders.set(k, v);
      }
      for (const [k, v] of inherit.files) {
        this.files.set(k, v);
      }
    } else {
      this.folders.set("", []);
    }
  }
  read(path) {
    return this.files.get(path);
  }
  /**
   * get the direct children of folder (in virtual file path)
   */
  readDir(path) {
    return this.folders.get(path);
  }
  write(path, file) {
    if (!this.files.has(path)) {
      const dir = dirname(path);
      this.makeDir(dir);
      this.readDir(dir)?.push(path);
    }
    this.files.set(path, file);
  }
  /**
   * Delete files at specified path.
   *
   * @param path - the target path.
   * @param [recursive=false] - if set to `true`, it will also delete directories.
   */
  delete(path, recursive = false) {
    if (this.files.delete(path)) return true;
    if (recursive) {
      const folder = this.folders.get(path);
      if (!folder) return false;
      this.folders.delete(path);
      for (const child of folder) {
        this.delete(child);
      }
      return true;
    }
    return false;
  }
  getFiles() {
    return Array.from(this.files.keys());
  }
  makeDir(path) {
    const segments = splitPath(path);
    for (let i = 0; i < segments.length; i++) {
      const segment = segments.slice(0, i + 1).join("/");
      if (this.folders.has(segment)) continue;
      this.folders.set(segment, []);
      this.folders.get(dirname(segment)).push(segment);
    }
  }
};
function isLocaleValid(locale) {
  return locale.length > 0 && !/\d+/.test(locale);
}
var parsers = {
  dir(path) {
    const [locale, ...segs] = path.split("/");
    if (locale && segs.length > 0 && isLocaleValid(locale))
      return [segs.join("/"), locale];
    return [path];
  },
  dot(path) {
    const dir = dirname(path);
    const base = basename$1(path);
    const parts = base.split(".");
    if (parts.length < 3) return [path];
    const [locale] = parts.splice(parts.length - 2, 1);
    if (!isLocaleValid(locale)) return [path];
    return [joinPath(dir, parts.join(".")), locale];
  },
  none(path) {
    return [path];
  }
};
function buildContentStorage(files, buildFile, plugins, i18n) {
  const parser = parsers[i18n.parser ?? "dot"];
  const storages = {};
  const normalized = files.map(
    (file) => buildFile({
      ...file,
      path: normalizePath(file.path)
    })
  );
  const fallbackLang = i18n.fallbackLanguage !== null ? i18n.fallbackLanguage ?? i18n.defaultLanguage : null;
  function scan(lang) {
    if (storages[lang]) return;
    let storage;
    if (fallbackLang && fallbackLang !== lang) {
      scan(fallbackLang);
      storage = new FileSystem(storages[fallbackLang]);
    } else {
      storage = new FileSystem();
    }
    for (const item of normalized) {
      const [path, locale = i18n.defaultLanguage] = parser(item.path);
      if (locale === lang) storage.write(path, item);
    }
    const context = {
      storage
    };
    for (const plugin of plugins) {
      plugin.transformStorage?.(context);
    }
    storages[lang] = storage;
  }
  for (const lang of i18n.languages) scan(lang);
  return storages;
}
function normalizePath(path) {
  const segments = splitPath(slash(path));
  if (segments[0] === "." || segments[0] === "..")
    throw new Error("It must not start with './' or '../'");
  return segments.join("/");
}
var priorityMap = {
  pre: 1,
  default: 0,
  post: -1
};
function buildPlugins(plugins) {
  const flatten = [];
  for (const plugin of plugins) {
    if (Array.isArray(plugin)) flatten.push(...plugin);
    else if (plugin) flatten.push(plugin);
  }
  return flatten.sort(
    (a, b) => priorityMap[b.enforce ?? "default"] - priorityMap[a.enforce ?? "default"]
  );
}
function slugsPlugin(slugsFn) {
  function isIndex(file) {
    return basename$1(file, extname(file)) === "index";
  }
  return {
    name: "fumadocs:slugs",
    transformStorage({ storage }) {
      const indexFiles = /* @__PURE__ */ new Set();
      const taken = /* @__PURE__ */ new Set();
      const autoIndex = slugsFn === void 0;
      for (const path of storage.getFiles()) {
        const file = storage.read(path);
        if (!file || file.format !== "page" || file.slugs) continue;
        if (isIndex(path) && autoIndex) {
          indexFiles.add(path);
          continue;
        }
        file.slugs = slugsFn ? slugsFn(parseFilePath(path)) : getSlugs(path);
        const key = file.slugs.join("/");
        if (taken.has(key)) throw new Error("Duplicated slugs");
        taken.add(key);
      }
      for (const path of indexFiles) {
        const file = storage.read(path);
        if (file?.format !== "page") continue;
        file.slugs = getSlugs(path);
        if (taken.has(file.slugs.join("/"))) file.slugs.push("index");
      }
    }
  };
}
var GroupRegex = /^\(.+\)$/;
function getSlugs(file) {
  if (typeof file !== "string") return getSlugs(file.path);
  const dir = dirname(file);
  const name = basename$1(file, extname(file));
  const slugs = [];
  for (const seg of dir.split("/")) {
    if (seg.length > 0 && !GroupRegex.test(seg)) slugs.push(encodeURI(seg));
  }
  if (GroupRegex.test(name))
    throw new Error(`Cannot use folder group in file names: ${file}`);
  if (name !== "index") {
    slugs.push(encodeURI(name));
  }
  return slugs;
}
function compatPlugin({
  pageTree,
  transformers
}) {
  const plugins = [];
  if (pageTree) {
    const { attachFile, attachSeparator, attachFolder, transformers: transformers2 } = pageTree;
    for (const transformer of transformers2 ?? []) {
      plugins.push(fromPageTreeTransformer(transformer));
    }
    plugins.push(
      fromPageTreeTransformer({
        file(node, file) {
          if (!attachFile) return node;
          const content = file ? this.storage.read(file) : void 0;
          return attachFile(
            node,
            content?.format === "page" ? content : void 0
          );
        },
        folder(node, folderPath, metaPath) {
          if (!attachFolder) return node;
          const files = this.storage.readDir(folderPath) ?? [];
          const meta2 = metaPath ? this.storage.read(metaPath) : void 0;
          return attachFolder(
            node,
            {
              children: files.flatMap((file) => this.storage.read(file) ?? [])
            },
            meta2?.format === "meta" ? meta2 : void 0
          );
        },
        separator(node) {
          if (!attachSeparator) return node;
          return attachSeparator(node);
        }
      })
    );
  }
  if (transformers) {
    for (const transformer of transformers) {
      plugins.push(fromStorageTransformer(transformer));
    }
  }
  return plugins;
}
function fromPageTreeTransformer(transformer) {
  return {
    transformPageTree: transformer
  };
}
function fromStorageTransformer(transformer) {
  return {
    transformStorage: transformer
  };
}
function indexPages(storages, getUrl) {
  const result = {
    // (locale.slugs -> page)
    pages: /* @__PURE__ */ new Map(),
    // (locale.path -> page)
    pathToMeta: /* @__PURE__ */ new Map(),
    // (locale.path -> meta)
    pathToPage: /* @__PURE__ */ new Map()
  };
  for (const [lang, storage] of Object.entries(storages)) {
    for (const filePath of storage.getFiles()) {
      const item = storage.read(filePath);
      const path = `${lang}.${filePath}`;
      if (item.format === "meta") {
        result.pathToMeta.set(path, fileToMeta(item));
        continue;
      }
      const page2 = fileToPage(item, getUrl, lang);
      result.pathToPage.set(path, page2);
      result.pages.set(`${lang}.${page2.slugs.join("/")}`, page2);
    }
  }
  return result;
}
function createGetUrl(baseUrl, i18n) {
  const baseSlugs = baseUrl.split("/");
  return (slugs, locale) => {
    const hideLocale = i18n?.hideLocale ?? "never";
    let urlLocale;
    if (hideLocale === "never") {
      urlLocale = locale;
    } else if (hideLocale === "default-locale" && locale !== i18n?.defaultLanguage) {
      urlLocale = locale;
    }
    const paths = [...baseSlugs, ...slugs];
    if (urlLocale) paths.unshift(urlLocale);
    return `/${paths.filter((v) => v.length > 0).join("/")}`;
  };
}
function loader$2(...args) {
  const resolved = args.length === 2 ? resolveConfig(args[0], args[1]) : resolveConfig(args[0].source, args[0]);
  return createOutput(resolved);
}
function resolveConfig(source2, { slugs, icon, plugins = [], baseUrl, url, ...base }) {
  const getUrl = url ? (...args) => normalizeUrl(url(...args)) : createGetUrl(baseUrl, base.i18n);
  let config = {
    ...base,
    url: getUrl,
    source: source2,
    plugins: buildPlugins([
      slugsPlugin(slugs),
      icon && iconPlugin(icon),
      compatPlugin(base),
      ...plugins
    ])
  };
  for (const plugin of config.plugins ?? []) {
    const result = plugin.config?.(config);
    if (result) config = result;
  }
  return config;
}
function createOutput({
  source: { files },
  url: getUrl,
  i18n,
  plugins = [],
  pageTree: pageTreeConfig
}) {
  const defaultLanguage = i18n?.defaultLanguage ?? "";
  const storages = buildContentStorage(
    files,
    (file) => {
      if (file.type === "page") {
        return {
          format: "page",
          path: file.path,
          slugs: file.slugs,
          data: file.data,
          absolutePath: file.absolutePath ?? ""
        };
      }
      return {
        format: "meta",
        path: file.path,
        absolutePath: file.absolutePath ?? "",
        data: file.data
      };
    },
    plugins,
    i18n ?? {
      defaultLanguage,
      parser: "none",
      languages: [defaultLanguage]
    }
  );
  const walker = indexPages(storages, getUrl);
  const builder = createPageTreeBuilder(getUrl, plugins);
  let pageTree;
  return {
    _i18n: i18n,
    get pageTree() {
      pageTree ??= builder.buildI18n(storages, pageTreeConfig);
      return i18n ? pageTree : pageTree[defaultLanguage];
    },
    set pageTree(v) {
      if (i18n) {
        pageTree = v;
      } else {
        pageTree = {
          [defaultLanguage]: v
        };
      }
    },
    getPageByHref(href, { dir = "", language = defaultLanguage } = {}) {
      const [value, hash] = href.split("#", 2);
      let target;
      if (value.startsWith(".") && (value.endsWith(".md") || value.endsWith(".mdx"))) {
        const path = joinPath(dir, value);
        target = walker.pathToPage.get(`${language}.${path}`);
      } else {
        target = this.getPages(language).find((item) => item.url === value);
      }
      if (target)
        return {
          page: target,
          hash
        };
    },
    getPages(language) {
      const pages = [];
      for (const [key, value] of walker.pages.entries()) {
        if (language === void 0 || key.startsWith(`${language}.`)) {
          pages.push(value);
        }
      }
      return pages;
    },
    getLanguages() {
      const list = [];
      if (!i18n) return list;
      for (const language of i18n.languages) {
        list.push({
          language,
          pages: this.getPages(language)
        });
      }
      return list;
    },
    getPage(slugs = [], language = defaultLanguage) {
      return walker.pages.get(`${language}.${slugs.join("/")}`);
    },
    getNodeMeta(node, language = defaultLanguage) {
      const ref = node.$ref?.metaFile;
      if (!ref) return;
      return walker.pathToMeta.get(`${language}.${ref}`);
    },
    getNodePage(node, language = defaultLanguage) {
      const ref = node.$ref?.file;
      if (!ref) return;
      return walker.pathToPage.get(`${language}.${ref}`);
    },
    getPageTree(locale) {
      if (i18n) {
        return this.pageTree[locale ?? defaultLanguage];
      }
      return this.pageTree;
    },
    // @ts-expect-error -- ignore this
    generateParams(slug, lang) {
      if (i18n) {
        return this.getLanguages().flatMap(
          (entry2) => entry2.pages.map((page2) => ({
            [slug ?? "slug"]: page2.slugs,
            [lang ?? "lang"]: entry2.language
          }))
        );
      }
      return this.getPages().map((page2) => ({
        [slug ?? "slug"]: page2.slugs
      }));
    }
  };
}
function fileToMeta(file) {
  return {
    path: file.path,
    absolutePath: file.absolutePath,
    get file() {
      return parseFilePath(this.path);
    },
    data: file.data
  };
}
function fileToPage(file, getUrl, locale) {
  return {
    get file() {
      return parseFilePath(this.path);
    },
    absolutePath: file.absolutePath,
    path: file.path,
    url: getUrl(file.slugs, locale),
    slugs: file.slugs,
    data: file.data,
    locale
  };
}
const create = fromConfig();
const docs = {
  doc: create.doc("docs", "./content/docs", /* @__PURE__ */ Object.assign({
    "./index.mdx": () => import("./index-D_Eqc4FF.js"),
    "./test.mdx": () => import("./test-H11bV9Qd.js")
  })),
  meta: create.meta("docs", "./content/docs", /* @__PURE__ */ Object.assign({}))
};
const source = loader$2({
  source: await create.sourceAsync(docs.doc, docs.meta),
  baseUrl: "/docs"
});
new Slugger();
const iconClass = "size-5 -me-0.5 fill-(--callout-color) text-fd-card";
const Callout = forwardRef(({ className, children, title, type = "info", icon, ...props }, ref) => {
  if (type === "warn")
    type = "warning";
  if (type === "tip")
    type = "info";
  return jsxs("div", { ref, className: twMerge("flex gap-2 my-4 rounded-xl border bg-fd-card p-3 ps-1 text-sm text-fd-card-foreground shadow-md", className), ...props, style: {
    "--callout-color": `var(--color-fd-${type}, var(--color-fd-muted))`,
    ...props.style
  }, children: [jsx("div", { role: "none", className: "w-0.5 bg-(--callout-color)/50 rounded-sm" }), icon ?? {
    info: jsx(Info, { className: iconClass }),
    warning: jsx(TriangleAlert, { className: iconClass }),
    error: jsx(CircleX, { className: iconClass }),
    success: jsx(CircleCheck, { className: iconClass })
  }[type], jsxs("div", { className: "flex flex-col gap-2 min-w-0 flex-1", children: [title && jsx("p", { className: "font-medium !my-0", children: title }), jsx("div", { className: "text-fd-muted-foreground prose-no-margin empty:hidden", children })] })] });
});
Callout.displayName = "Callout";
function Heading({ as, className, ...props }) {
  const As = as ?? "h1";
  if (!props.id)
    return jsx(As, { className, ...props });
  return jsxs(As, { className: twMerge("flex scroll-m-28 flex-row items-center gap-2", className), ...props, children: [jsx("a", { "data-card": "", href: `#${props.id}`, className: "peer", children: props.children }), jsx(Link, { "aria-label": "Link to section", className: "size-3.5 shrink-0 text-fd-muted-foreground opacity-0 transition-opacity peer-hover:opacity-100" })] });
}
function useCopyButton(onCopy) {
  const [checked, setChecked] = useState(false);
  const callbackRef = useRef(onCopy);
  const timeoutRef = useRef(null);
  callbackRef.current = onCopy;
  const onClick = useCallback(() => {
    if (timeoutRef.current)
      window.clearTimeout(timeoutRef.current);
    const res = Promise.resolve(callbackRef.current());
    void res.then(() => {
      setChecked(true);
      timeoutRef.current = window.setTimeout(() => {
        setChecked(false);
      }, 1500);
    });
  }, []);
  useEffect(() => {
    return () => {
      if (timeoutRef.current)
        window.clearTimeout(timeoutRef.current);
    };
  }, []);
  return [checked, onClick];
}
const listeners = /* @__PURE__ */ new Map();
function addChangeListener(id, listener) {
  const list = listeners.get(id) ?? [];
  list.push(listener);
  listeners.set(id, list);
}
function removeChangeListener(id, listener) {
  const list = listeners.get(id) ?? [];
  listeners.set(id, list.filter((item) => item !== listener));
}
const TabsContext$1 = createContext$1(null);
function useTabContext() {
  const ctx = useContext(TabsContext$1);
  if (!ctx)
    throw new Error("You must wrap your component in <Tabs>");
  return ctx;
}
const TabsList = Primitive$1.TabsList;
const TabsTrigger = Primitive$1.TabsTrigger;
function Tabs({ ref, groupId, persist = false, updateAnchor = false, defaultValue, value: _value, onValueChange: _onValueChange, ...props }) {
  const tabsRef = useRef(null);
  const [value, setValue] = _value === void 0 ? (
    // eslint-disable-next-line react-hooks/rules-of-hooks -- not supposed to change controlled/uncontrolled
    useState(defaultValue)
  ) : [_value, _onValueChange ?? (() => void 0)];
  const onChange = useEffectEvent((v) => setValue(v));
  const valueToIdMap = useMemo(() => /* @__PURE__ */ new Map(), []);
  useLayoutEffect(() => {
    if (!groupId)
      return;
    const previous = persist ? localStorage.getItem(groupId) : sessionStorage.getItem(groupId);
    if (previous)
      onChange(previous);
    addChangeListener(groupId, onChange);
    return () => {
      removeChangeListener(groupId, onChange);
    };
  }, [groupId, persist]);
  useLayoutEffect(() => {
    const hash = window.location.hash.slice(1);
    if (!hash)
      return;
    for (const [value2, id] of valueToIdMap.entries()) {
      if (id === hash) {
        onChange(value2);
        tabsRef.current?.scrollIntoView();
        break;
      }
    }
  }, [valueToIdMap]);
  return jsx(Primitive$1.Tabs, { ref: mergeRefs(ref, tabsRef), value, onValueChange: (v) => {
    if (updateAnchor) {
      const id = valueToIdMap.get(v);
      if (id) {
        window.history.replaceState(null, "", `#${id}`);
      }
    }
    if (groupId) {
      listeners.get(groupId)?.forEach((item) => {
        item(v);
      });
      if (persist)
        localStorage.setItem(groupId, v);
      else
        sessionStorage.setItem(groupId, v);
    } else {
      setValue(v);
    }
  }, ...props, children: jsx(TabsContext$1.Provider, { value: useMemo(() => ({ valueToIdMap }), [valueToIdMap]), children: props.children }) });
}
function TabsContent({ value, ...props }) {
  const { valueToIdMap } = useTabContext();
  if (props.id) {
    valueToIdMap.set(value, props.id);
  }
  return jsx(Primitive$1.TabsContent, { value, ...props, children: props.children });
}
const TabsContext = createContext$1(null);
function Pre(props) {
  return jsx("pre", { ...props, className: twMerge("min-w-full w-max *:flex *:flex-col", props.className), children: props.children });
}
function CodeBlock({ ref, title, allowCopy = true, keepBackground = false, icon, viewportProps = {}, children, Actions = (props2) => jsx("div", { ...props2, className: twMerge("empty:hidden", props2.className) }), ...props }) {
  const inTab = useContext(TabsContext) !== null;
  const areaRef = useRef(null);
  return jsxs("figure", { ref, dir: "ltr", ...props, className: twMerge(inTab ? "bg-fd-secondary -mx-px -mb-px last:rounded-b-xl" : "my-4 bg-fd-card rounded-xl", keepBackground && "bg-(--shiki-light-bg) dark:bg-(--shiki-dark-bg)", "shiki relative border shadow-sm outline-none not-prose overflow-hidden text-sm", props.className), children: [title ? jsxs("div", { className: "flex text-fd-muted-foreground items-center gap-2 h-9.5 border-b px-4", children: [typeof icon === "string" ? jsx("div", { className: "[&_svg]:size-3.5", dangerouslySetInnerHTML: {
    __html: icon
  } }) : icon, jsx("figcaption", { className: "flex-1 truncate", children: title }), Actions({
    className: "-me-2",
    children: allowCopy && jsx(CopyButton, { containerRef: areaRef })
  })] }) : Actions({
    className: "absolute top-2 right-2 z-2 backdrop-blur-lg rounded-lg text-fd-muted-foreground",
    children: allowCopy && jsx(CopyButton, { containerRef: areaRef })
  }), jsx("div", { ref: areaRef, ...viewportProps, className: twMerge("text-[13px] py-3.5 overflow-auto max-h-[600px] fd-scroll-container", viewportProps.className), style: {
    // space for toolbar
    "--padding-right": !title ? "calc(var(--spacing) * 8)" : void 0,
    counterSet: props["data-line-numbers"] ? `line ${Number(props["data-line-numbers-start"] ?? 1) - 1}` : void 0,
    ...viewportProps.style
  }, children })] });
}
function CopyButton({ className, containerRef, ...props }) {
  const [checked, onClick] = useCopyButton(() => {
    const pre = containerRef.current?.getElementsByTagName("pre").item(0);
    if (!pre)
      return;
    const clone = pre.cloneNode(true);
    clone.querySelectorAll(".nd-copy-ignore").forEach((node) => {
      node.replaceWith("\n");
    });
    void navigator.clipboard.writeText(clone.textContent ?? "");
  });
  return jsx("button", { type: "button", "data-checked": checked || void 0, className: twMerge(buttonVariants({
    className: "hover:text-fd-accent-foreground data-[checked]:text-fd-accent-foreground",
    size: "icon-xs"
  }), className), "aria-label": checked ? "Copied Text" : "Copy Text", onClick, ...props, children: checked ? jsx(Check, {}) : jsx(Clipboard, {}) });
}
function CodeBlockTabs({ ref, ...props }) {
  const containerRef = useRef(null);
  const nested = useContext(TabsContext) !== null;
  return jsx(Tabs, { ref: mergeRefs(containerRef, ref), ...props, className: twMerge("bg-fd-card rounded-xl border", !nested && "my-4", props.className), children: jsx(TabsContext.Provider, { value: useMemo(() => ({
    containerRef,
    nested
  }), [nested]), children: props.children }) });
}
function CodeBlockTabsList(props) {
  return jsx(TabsList, { ...props, className: twMerge("flex flex-row px-2 overflow-x-auto text-fd-muted-foreground", props.className), children: props.children });
}
function CodeBlockTabsTrigger({ children, ...props }) {
  return jsxs(TabsTrigger, { ...props, className: twMerge("relative group inline-flex text-sm font-medium text-nowrap items-center transition-colors gap-2 px-2 py-1.5 hover:text-fd-accent-foreground data-[state=active]:text-fd-primary [&_svg]:size-3.5", props.className), children: [jsx("div", { className: "absolute inset-x-2 bottom-0 h-px group-data-[state=active]:bg-fd-primary" }), children] });
}
function CodeBlockTab(props) {
  return jsx(TabsContent, { ...props });
}
function Image(props) {
  return jsx(Image$1, { sizes: "(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 900px", ...props, src: props.src, className: twMerge("rounded-lg", props.className) });
}
function Table(props) {
  return jsx("div", { className: "relative overflow-auto prose-no-margin my-6", children: jsx("table", { ...props }) });
}
const defaultMdxComponents = {
  CodeBlockTab,
  CodeBlockTabs,
  CodeBlockTabsList,
  CodeBlockTabsTrigger,
  pre: (props) => jsx(CodeBlock, { ...props, children: jsx(Pre, { children: props.children }) }),
  Card,
  Cards,
  a: Link2,
  img: Image,
  h1: (props) => jsx(Heading, { as: "h1", ...props }),
  h2: (props) => jsx(Heading, { as: "h2", ...props }),
  h3: (props) => jsx(Heading, { as: "h3", ...props }),
  h4: (props) => jsx(Heading, { as: "h4", ...props }),
  h5: (props) => jsx(Heading, { as: "h5", ...props }),
  h6: (props) => jsx(Heading, { as: "h6", ...props }),
  table: Table,
  Callout
};
async function loader$1({
  params
}) {
  const slugs = params["*"].split("/").filter((v) => v.length > 0);
  const page2 = source.getPage(slugs);
  if (!page2) throw new Response("Not found", {
    status: 404
  });
  return {
    path: page2.path,
    tree: source.pageTree
  };
}
const renderer = toClientRenderer(docs.doc, ({
  toc,
  default: Mdx,
  frontmatter
}) => {
  return /* @__PURE__ */ jsxs(DocsPage, {
    toc,
    children: [/* @__PURE__ */ jsx("title", {
      children: frontmatter.title
    }), /* @__PURE__ */ jsx("meta", {
      name: "description",
      content: frontmatter.description
    }), /* @__PURE__ */ jsx(DocsTitle, {
      children: frontmatter.title
    }), /* @__PURE__ */ jsx(DocsDescription, {
      children: frontmatter.description
    }), /* @__PURE__ */ jsx(DocsBody, {
      children: /* @__PURE__ */ jsx(Mdx, {
        components: {
          ...defaultMdxComponents
        }
      })
    })]
  });
});
const page = UNSAFE_withComponentProps(function Page(props) {
  const {
    tree,
    path
  } = props.loaderData;
  const Content = renderer[path];
  return /* @__PURE__ */ jsx(DocsLayout, {
    ...baseOptions(),
    tree,
    children: /* @__PURE__ */ jsx(Content, {})
  });
});
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: page,
  loader: loader$1
}, Symbol.toStringTag, { value: "Module" }));
function removeUndefined(value, deep = false) {
  const obj = value;
  for (const key in obj) {
    if (obj[key] === void 0) delete obj[key];
    if (!deep) continue;
    const entry2 = obj[key];
    if (typeof entry2 === "object" && entry2 !== null) {
      removeUndefined(entry2, deep);
      continue;
    }
    if (Array.isArray(entry2)) {
      for (const item of entry2) removeUndefined(item, deep);
    }
  }
  return value;
}
function escapeRegExp(input) {
  return input.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function buildRegexFromQuery(q) {
  const trimmed = q.trim();
  if (trimmed.length === 0) return null;
  const terms = Array.from(
    new Set(
      trimmed.split(/\s+/).map((t) => t.trim()).filter(Boolean)
    )
  );
  if (terms.length === 0) return null;
  const escaped = terms.map(escapeRegExp).join("|");
  return new RegExp(`(${escaped})`, "gi");
}
function createContentHighlighter(query) {
  const regex = typeof query === "string" ? buildRegexFromQuery(query) : query;
  return {
    highlight(content) {
      if (!regex) return [{ type: "text", content }];
      const out = [];
      let i = 0;
      for (const match of content.matchAll(regex)) {
        if (i < match.index) {
          out.push({
            type: "text",
            content: content.substring(i, match.index)
          });
        }
        out.push({
          type: "text",
          content: match[0],
          styles: {
            highlight: true
          }
        });
        i = match.index + match[0].length;
      }
      if (i < content.length) {
        out.push({
          type: "text",
          content: content.substring(i)
        });
      }
      return out;
    }
  };
}
async function searchSimple(db, query, params = {}) {
  const highlighter = createContentHighlighter(query);
  const result = await search(db, {
    term: query,
    tolerance: 1,
    ...params,
    boost: {
      title: 2,
      ..."boost" in params ? params.boost : void 0
    }
  });
  return result.hits.map((hit) => ({
    type: "page",
    content: hit.document.title,
    breadcrumbs: hit.document.breadcrumbs,
    contentWithHighlights: highlighter.highlight(hit.document.title),
    id: hit.document.url,
    url: hit.document.url
  }));
}
async function searchAdvanced(db, query, tag = [], {
  mode = "fulltext",
  ...override
} = {}) {
  if (typeof tag === "string") tag = [tag];
  let params = {
    ...override,
    mode,
    where: removeUndefined({
      tags: tag.length > 0 ? {
        containsAll: tag
      } : void 0,
      ...override.where
    }),
    groupBy: {
      properties: ["page_id"],
      maxResult: 8,
      ...override.groupBy
    }
  };
  if (query.length > 0) {
    params = {
      ...params,
      term: query,
      properties: mode === "fulltext" ? ["content"] : ["content", "embeddings"]
    };
  }
  const highlighter = createContentHighlighter(query);
  const result = await search(db, params);
  const list = [];
  for (const item of result.groups ?? []) {
    const pageId = item.values[0];
    const page2 = getByID(db, pageId);
    if (!page2) continue;
    list.push({
      id: pageId,
      type: "page",
      content: page2.content,
      breadcrumbs: page2.breadcrumbs,
      contentWithHighlights: highlighter.highlight(page2.content),
      url: page2.url
    });
    for (const hit of item.result) {
      if (hit.document.type === "page") continue;
      list.push({
        id: hit.document.id.toString(),
        content: hit.document.content,
        breadcrumbs: hit.document.breadcrumbs,
        contentWithHighlights: highlighter.highlight(hit.document.content),
        type: hit.document.type,
        url: hit.document.url
      });
    }
  }
  return list;
}
function createEndpoint(server2) {
  const { search: search2 } = server2;
  return {
    ...server2,
    async staticGET() {
      return Response.json(await server2.export());
    },
    async GET(request) {
      const url = new URL(request.url);
      const query = url.searchParams.get("query");
      if (!query) return Response.json([]);
      return Response.json(
        await search2(query, {
          tag: url.searchParams.get("tag")?.split(",") ?? void 0,
          locale: url.searchParams.get("locale") ?? void 0,
          mode: url.searchParams.get("mode") === "vector" ? "vector" : "full"
        })
      );
    }
  };
}
var advancedSchema = {
  content: "string",
  page_id: "string",
  type: "string",
  breadcrumbs: "string[]",
  tags: "enum[]",
  url: "string",
  embeddings: "vector[512]"
};
async function createDB({
  indexes,
  tokenizer,
  search: _,
  ...rest2
}) {
  const items = typeof indexes === "function" ? await indexes() : indexes;
  const db = create$1({
    schema: advancedSchema,
    ...rest2,
    components: {
      ...rest2.components,
      tokenizer: tokenizer ?? rest2.components?.tokenizer
    }
  });
  const mapTo = [];
  items.forEach((page2) => {
    const pageTag = page2.tag ?? [];
    const tags = Array.isArray(pageTag) ? pageTag : [pageTag];
    const data = page2.structuredData;
    let id = 0;
    mapTo.push({
      id: page2.id,
      page_id: page2.id,
      type: "page",
      content: page2.title,
      breadcrumbs: page2.breadcrumbs,
      tags,
      url: page2.url
    });
    const nextId = () => `${page2.id}-${id++}`;
    if (page2.description) {
      mapTo.push({
        id: nextId(),
        page_id: page2.id,
        tags,
        type: "text",
        url: page2.url,
        content: page2.description
      });
    }
    for (const heading of data.headings) {
      mapTo.push({
        id: nextId(),
        page_id: page2.id,
        type: "heading",
        tags,
        url: `${page2.url}#${heading.id}`,
        content: heading.content
      });
    }
    for (const content of data.contents) {
      mapTo.push({
        id: nextId(),
        page_id: page2.id,
        tags,
        type: "text",
        url: content.heading ? `${page2.url}#${content.heading}` : page2.url,
        content: content.content
      });
    }
  });
  await insertMultiple(db, mapTo);
  return db;
}
function defaultBuildIndex(source2) {
  function isBreadcrumbItem(item) {
    return typeof item === "string" && item.length > 0;
  }
  return async (page2) => {
    let breadcrumbs;
    let structuredData;
    if ("structuredData" in page2.data) {
      structuredData = page2.data.structuredData;
    } else if ("load" in page2.data && typeof page2.data.load === "function") {
      structuredData = (await page2.data.load()).structuredData;
    }
    if (!structuredData)
      throw new Error(
        "Cannot find structured data from page, please define the page to index function."
      );
    const pageTree = source2.getPageTree(page2.locale);
    const path = findPath(
      pageTree.children,
      (node) => node.type === "page" && node.url === page2.url
    );
    if (path) {
      breadcrumbs = [];
      path.pop();
      if (isBreadcrumbItem(pageTree.name)) {
        breadcrumbs.push(pageTree.name);
      }
      for (const segment of path) {
        if (!isBreadcrumbItem(segment.name)) continue;
        breadcrumbs.push(segment.name);
      }
    }
    return {
      title: page2.data.title ?? basename$1(page2.path, extname(page2.path)),
      breadcrumbs,
      description: page2.data.description,
      url: page2.url,
      id: page2.url,
      structuredData
    };
  };
}
function createFromSource(source2, _buildIndexOrOptions, _options) {
  const { buildIndex = defaultBuildIndex(source2), ...options } = {
    ...typeof _buildIndexOrOptions === "function" ? {
      buildIndex: _buildIndexOrOptions
    } : _buildIndexOrOptions,
    ..._options
  };
  if (source2._i18n) {
    return createI18nSearchAPI("advanced", {
      ...options,
      i18n: source2._i18n,
      indexes: async () => {
        const indexes = source2.getLanguages().flatMap((entry2) => {
          return entry2.pages.map(async (page2) => ({
            ...await buildIndex(page2),
            locale: entry2.language
          }));
        });
        return Promise.all(indexes);
      }
    });
  }
  return createSearchAPI("advanced", {
    ...options,
    indexes: async () => {
      const indexes = source2.getPages().map((page2) => buildIndex(page2));
      return Promise.all(indexes);
    }
  });
}
var STEMMERS = {
  arabic: "ar",
  armenian: "am",
  bulgarian: "bg",
  czech: "cz",
  danish: "dk",
  dutch: "nl",
  english: "en",
  finnish: "fi",
  french: "fr",
  german: "de",
  greek: "gr",
  hungarian: "hu",
  indian: "in",
  indonesian: "id",
  irish: "ie",
  italian: "it",
  lithuanian: "lt",
  nepali: "np",
  norwegian: "no",
  portuguese: "pt",
  romanian: "ro",
  russian: "ru",
  serbian: "rs",
  slovenian: "ru",
  spanish: "es",
  swedish: "se",
  tamil: "ta",
  turkish: "tr",
  ukrainian: "uk",
  sanskrit: "sk"
};
async function getTokenizer(locale) {
  return {
    language: Object.keys(STEMMERS).find((lang) => STEMMERS[lang] === locale) ?? locale
  };
}
async function initAdvanced(options) {
  const map = /* @__PURE__ */ new Map();
  if (options.i18n.languages.length === 0) {
    return map;
  }
  const indexes = typeof options.indexes === "function" ? await options.indexes() : options.indexes;
  for (const locale of options.i18n.languages) {
    const localeIndexes = indexes.filter((index) => index.locale === locale);
    const mapped = options.localeMap?.[locale] ?? await getTokenizer(locale);
    map.set(
      locale,
      typeof mapped === "object" ? initAdvancedSearch({
        ...options,
        indexes: localeIndexes,
        ...mapped
      }) : initAdvancedSearch({
        ...options,
        language: mapped,
        indexes: localeIndexes
      })
    );
  }
  return map;
}
function createI18nSearchAPI(type, options) {
  const get = initAdvanced(options);
  return createEndpoint({
    async export() {
      const map = await get;
      const entries = Array.from(map.entries()).map(async ([k, v]) => [
        k,
        await v.export()
      ]);
      return {
        type: "i18n",
        data: Object.fromEntries(await Promise.all(entries))
      };
    },
    async search(query, searchOptions) {
      const map = await get;
      const locale = searchOptions?.locale ?? options.i18n.defaultLanguage;
      const handler = map.get(locale);
      if (handler) return handler.search(query, searchOptions);
      return [];
    }
  });
}
function createSearchAPI(type, options) {
  return createEndpoint(initAdvancedSearch(options));
}
function initAdvancedSearch(options) {
  const get = createDB(options);
  return {
    async export() {
      return {
        type: "advanced",
        ...save(await get)
      };
    },
    async search(query, searchOptions) {
      const db = await get;
      const mode = searchOptions?.mode;
      return searchAdvanced(db, query, searchOptions?.tag, {
        ...options.search,
        mode: mode === "vector" ? "vector" : "fulltext"
      }).catch((err) => {
        if (mode === "vector") {
          throw new Error(
            "failed to search, make sure you have installed `@orama/plugin-embeddings` according to their docs.",
            {
              cause: err
            }
          );
        }
        throw err;
      });
    }
  };
}
const server = createFromSource(source, {
  // https://docs.orama.com/docs/orama-js/supported-languages
  language: "english"
});
async function loader({
  request
}) {
  return server.GET(request);
}
const route3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  loader
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-BeMNH1I3.js", "imports": ["/assets/chunk-OIYGIGL5-BheAzwZ-.js", "/assets/index-D-pmVXYH.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": true, "module": "/assets/root-BV7HoEac.js", "imports": ["/assets/chunk-OIYGIGL5-BheAzwZ-.js", "/assets/index-D-pmVXYH.js", "/assets/sidebar-q4gPrt-E.js", "/assets/i18n-ms-wR4U0.js"], "css": ["/assets/root-DfhAZ8yj.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/home": { "id": "routes/home", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/home-C4MEmPJq.js", "imports": ["/assets/chunk-OIYGIGL5-BheAzwZ-.js", "/assets/Combination-BdwQx32Q.js", "/assets/layout.shared-KBdF-TRC.js", "/assets/i18n-ms-wR4U0.js", "/assets/index-D-pmVXYH.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "docs/page": { "id": "docs/page", "parentId": "root", "path": "docs/*", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/page-rv2EF2z0.js", "imports": ["/assets/chunk-OIYGIGL5-BheAzwZ-.js", "/assets/Combination-BdwQx32Q.js", "/assets/i18n-ms-wR4U0.js", "/assets/layout.shared-KBdF-TRC.js", "/assets/sidebar-q4gPrt-E.js", "/assets/index-4Wzjh_Dz.js", "/assets/index-CQ4oX9Ud.js", "/assets/index-D-pmVXYH.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "docs/search": { "id": "docs/search", "parentId": "root", "path": "api/search", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/search-l0sNRNKZ.js", "imports": [], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 } }, "url": "/assets/manifest-7310359f.js", "version": "7310359f", "sri": void 0 };
const assetsBuildDirectory = "build/client";
const basename = "/";
const future = { "v8_middleware": false, "unstable_optimizeDeps": false, "unstable_splitRouteModules": false, "unstable_subResourceIntegrity": false, "unstable_viteEnvironmentApi": false };
const ssr = true;
const isSpaMode = false;
const prerender = ["/", "/docs", "/docs/test"];
const routeDiscovery = { "mode": "lazy", "manifestPath": "/__manifest" };
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/home": {
    id: "routes/home",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route1
  },
  "docs/page": {
    id: "docs/page",
    parentId: "root",
    path: "docs/*",
    index: void 0,
    caseSensitive: void 0,
    module: route2
  },
  "docs/search": {
    id: "docs/search",
    parentId: "root",
    path: "api/search",
    index: void 0,
    caseSensitive: void 0,
    module: route3
  }
};
export {
  ChevronRight as C,
  Hash as H,
  I18nLabel as I,
  Search as S,
  __toESM as _,
  useI18n as a,
  buttonVariants as b,
  useRouter as c,
  useEffectEvent as d,
  createContentHighlighter as e,
  searchAdvanced as f,
  __commonJS as g,
  assetsBuildDirectory as h,
  basename as i,
  future as j,
  ssr as k,
  isSpaMode as l,
  routeDiscovery as m,
  publicPath as n,
  entry as o,
  prerender as p,
  routes as q,
  removeUndefined as r,
  searchSimple as s,
  serverManifest as t,
  useOnChange as u
};
