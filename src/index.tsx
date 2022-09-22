import React from "react";
import ReactDOM from "react-dom/client";
import {App} from './components/app';
import reportWebVitals from "./reportWebVitals";
import { ApolloProvider } from '@apollo/client';
import "./styles/styles.css";
import {client} from './apollo';
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <ApolloProvider client={client}>
      <HelmetProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </HelmetProvider>
    </ApolloProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
