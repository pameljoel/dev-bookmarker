import React from 'react';
import Head from "next/head";

import '../main.scss';
import '../home/Header.scss';
import '../url/Url.scss';
import '../url/generatedUrls/GeneratedUrl.scss';
import "../url/urlChunk/UrlChunk.scss";
import "../url/PreviewUrls/PreviewUrls.scss";
import {AppProps} from "next/app";

function MyApp({Component, pageProps}: AppProps) {
    return <>
        <Head>
            <title>Dev Bookmarker</title>
            <meta name="viewport"
                  content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"></meta>
            <meta charSet="utf-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
            <meta name="theme-color" content="#000000"/>

            <link rel="manifest" href="/manifest.json"/>
            <link rel="shortcut icon" href="/favicon.ico"/>
        </Head>
        <Component {...pageProps} />
    </>
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//
//   return { ...appProps }
// }

export default MyApp