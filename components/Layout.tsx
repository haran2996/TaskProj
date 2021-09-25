import React, { ReactNode } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import TopNav from './TopNav';

type Props = {
  children?: ReactNode;
  title?: string;
  currentPage?: string;
};


const Layout = ({ children, title = 'This is the default title', currentPage }: Props) => {
  const activeTabClasses = 'border-blue-500 bg-blue-500 text-white';
  const inactiveTabClasses = 'border-white hover:border-gray-200 text-blue-500 hover:bg-gray-200';
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <header>
        <TopNav currentPage={currentPage}/>
      </header>
      {children}
      <footer>
        <div className="bg-white w-full fixed mt-10 bottom-0 text-center">
          <hr />
          <div className="p-2">
          footer content
          </div>
          </div>
      </footer>
    </div>
  );
}

export default Layout;
