import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { css, Global } from '@emotion/react';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head />
        <Global
          styles={css`
            html,
            body {
              margin: 0;
              padding: 0;
              min-height: 100%;
              overflow: hidden;
            }

            body {
              background: #222222;
              color: #ffffff;
              font-family: Helvetica, Arial, sans-serif;
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
