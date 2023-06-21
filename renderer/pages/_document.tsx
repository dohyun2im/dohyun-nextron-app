import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { css, Global } from '@emotion/react';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <meta name='viewport' content='width=device-width, initial-scale=1' />
          <title>Dohyun - Nextron - App</title>
          <link rel="shortcut icon" href="/logo.png" />
        </Head>
        <Global
          styles={css`
            html, body {
              margin: 0;
              padding: 0;
              min-height: 100%;
            }

            body {
              padding: 2rem 4rem;
              background: black;
              font-family: Helvetica, Arial, sans-serif;
              font-size: 24px;
            }
          `}
        />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
