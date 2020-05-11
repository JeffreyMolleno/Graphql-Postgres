import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import { getBooksQuery } from "./queries";

import AddBook from "./AddBook";
import BookDetails from "./BookDetails";

export default function BookList() {
  const { loading, error, data } = useQuery(getBooksQuery);
  
  const [state, setState] = useState({
    selected: "",
  });

  console.log(state);

  return (
    <div>
      <ul id="book-list">
        {loading ? "Loading Books . . ." : ""}
        {data &&
          data.books.map((book) => {
            return (
              <li
                key={book.id}
                style={{'cursor':'pointer'}}
                onClick={() => {
                  return setState({
                    selected: book.id,
                  });
                }}
              >
                {book.title}
              </li>
            );
          })}
      </ul>

      {state.selected && <BookDetails bookid={state.selected}/>}

      <AddBook />
    </div>
  );
}
