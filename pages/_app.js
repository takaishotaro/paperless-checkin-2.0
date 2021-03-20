import React from 'react'
import App, { Container, Component } from 'next/app'
import 'bootstrap/dist/css/bootstrap.min.css';
import { ApolloClient, InMemoryCache, createHttpLink, ApolloProvider } from '@apollo/client';



function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}
export default MyApp
