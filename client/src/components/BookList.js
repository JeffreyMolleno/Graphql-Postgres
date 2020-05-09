import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { getBooksQuery } from "./queries";

import AddBook from "./AddBook";

export default function BookList() {
  const { loading, error, data } = useQuery(getBooksQuery);

  console.log(data, error, loading);

  return (
    <div>
      <ul id="book-list">
        {loading ? "Loading Books . . ." : ""}
        {data &&
          data.books.map((book) => {
            return <li key={book.id}>{book.title}</li>;
          })}
      </ul>

      <AddBook />
    </div>
  );
}
