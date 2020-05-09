import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { getAuthorsQuery, addBookMutation } from "./queries";

export default function AddBook() {
  const { loading, error, data } = useQuery(getAuthorsQuery);
  return (
    <div>
      <Form data={data} />
    </div>
  );
}

function Form({ data }) {
  const [addBook, { loading, error, extract }] = useMutation(addBookMutation);

  const [state, setState] = useState({
    title: "",
    genre: "",
    author_id: "",
  });

  const Submit = (e) => {
    e.preventDefault();

    addBook({ variables:  state });

    console.log(state);

    // console.log(error, loading, extract);
  };

  return (
    <form id="add-book" onSubmit={(e) => Submit(e)}>
      <div className="field">
        <label>Book Name:</label>
        <input
          type="text"
          value={state.title}
          onChange={(e) => {
            const res = e.target.value;
            setState((prevProps) => {
              return { ...prevProps, title: res };
            });
          }}
        />
      </div>
      <div className="field">
        <label>Genre:</label>
        <input
          type="text"
          onChange={(e) => {
            const res = e.target.value;
            setState((prevProps) => {
              return { ...prevProps, genre: res };
            });
          }}
        />
      </div>

      <div className="field">
        <label>Author:</label>
        <select
          onChange={(e) => {
            const res = e.target.value;
            setState((prevProps) => {
              return { ...prevProps, author_id: res };
            });
          }}
        >
          <option>Select Author</option>
          {data &&
            data.authors.map((author) => {
              return (
                <option key={author.id} value={author.id}>
                  {author.name}
                </option>
              );
            })}
        </select>
      </div>
      <button>Submit</button>
    </form>
  );
}
