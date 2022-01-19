import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
// components
import { BookList, AddBook } from '../components/components';

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql'
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <div id="main">
        <h1>Book&apos;s Reading List</h1>
        <BookList />
        <AddBook />
      </div>
    </ApolloProvider>
  );
}

export default App;
