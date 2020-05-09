import React from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
// import { graphql } from "react-apollo";

import AddBook from "./AddBook";

const getBooksQuery = gql`
  {
    books {
      title
      id
    }
  }
`;

export default function BookList() {
  const { loading, error, data } = useQuery(getBooksQuery);

  console.log(data, error, loading);

  return (
    <div>
      <ul id="book-list">
        {loading ? "Loading Books . . ." : ""}
        {data &&
          data.books.map((book) => {
            return <li keys={book.id}>{book.title}</li>;
          })}
      </ul>

      <AddBook />
    </div>
  );
}
