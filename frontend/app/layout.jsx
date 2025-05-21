// app/layout.jsx
'use client'; // This layout is a client component

import './globals.css'; // Import global styles
import { ApolloProvider } from '@apollo/client';
import client from '../apollo-client'; // Import your Apollo Client instance

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en">
      {/* You can add head elements like <title> here in a <head> tag */}
      <body>
        <ApolloProvider client={client}>
          {children}
        </ApolloProvider>
      </body>
    </html>
  );
}