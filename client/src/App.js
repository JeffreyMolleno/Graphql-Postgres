import React from "react";
import BookList from "./components/BookList";

import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";

// apollo client setup
const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <h1>Ninja Reading list</h1>
        <BookList />
      </div>
    </ApolloProvider>
  );
}

export default App;
