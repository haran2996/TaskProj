import { wrapper } from '../store';
import React from 'react';
function App({ Component , pageProps }) {
  return <Component {...pageProps} />
}

export default wrapper.withRedux(App)
