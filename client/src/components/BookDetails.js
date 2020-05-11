import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import { getBookDetailsQuery } from "./queries";

export default function BookDetails({ bookid }) {
  const { loading, error, data } = useQuery(getBookDetailsQuery, {
    variables: { id: bookid },
  });

  const [state, setState] = useState();

  useEffect(() => {
    if (data !== undefined) {
      setState({
        ...data.book,
      });
    }
  }, [data]);

  return (
    <div id="book-details">
      {state && (
        <>
          <p>{state.title}</p>
          <p>{state.genre}</p>
          <p>{state.author.name}</p>
        </>
      )}
    </div>
  );
}
