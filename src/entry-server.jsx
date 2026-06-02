import React from "react";
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router";
import { HelmetProvider } from "react-helmet-async";
import "./i18n.js";
import App from "./App.jsx";

export function render(url, context = {}) {
  const helmetContext = {};
  const html = ReactDOMServer.renderToString(
    <HelmetProvider context={helmetContext}>
      <StaticRouter location={url} context={context}>
        <App />
      </StaticRouter>
    </HelmetProvider>
  );
  return {
    html,
    helmet: helmetContext.helmet
  };
}
