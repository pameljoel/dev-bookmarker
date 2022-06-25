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
            <meta charSet="utf-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
            <meta name="theme-color" content="#000000"/>

            {/*manifest.json provides metadata used when your web app is added to the*/}
            {/*homescreen on Android. See https://developers.google.com/web/fundamentals/engage-and-retain/web-app-manifest/*/}

            <link rel="manifest" href="/public/manifest.json"/>
            <link rel="shortcut icon" href="/public/favicon.ico"/>

            {/*Notice the use of %PUBLIC_URL% in the tags above.*/}
            {/*It will be replaced with the URL of the `public` folder during the build.*/}
            {/*Only files inside the `public` folder can be referenced from the HTML.*/}

            {/*Unlike "/favicon.ico" or "favicon.ico", "%PUBLIC_URL%/favicon.ico" will*/}
            {/*work correctly both with client-side routing and a non-root public URL.*/}
            {/*Learn how to configure a non-root public URL by running `npm run build`.*/}

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