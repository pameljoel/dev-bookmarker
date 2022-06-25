import React from 'react';
import Head from 'next/head'

import '../main.scss';
import '../home/Header.scss';
import '../url/Url.scss';
import '../url/generatedUrls/GeneratedUrl.scss';
import "../url/urlChunk/UrlChunk.scss";

function MyApp({Component, pageProps}) {
    return <>
        <Head>
            <title>Dev Bookmarker</title>
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