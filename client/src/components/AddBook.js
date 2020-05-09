import React from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";

const getAuthorsQuery = gql`
  {
    authors {
      id
      name
    }
  }
`;

export default function AddBook() {
  const { loading, error, data } = useQuery(getAuthorsQuery);

  return (
    <div>
      <Form data={data}/>
    </div>
  );
}

function Form({data}) {
  return (
    <form id="add-book">
      <div className="field">
        <label>Book Name:</label>
        <input type="text" />
      </div>
      <div className="field">
        <label>Genre:</label>
        <input type="text" />
      </div>

      <div className="field">
        <label>Author:</label>
        <select>
          <option>Select Author</option>
          {data &&
            data.authors.map((author) => {
              return <option id={author.id}>{author.name}</option>;
            })}
        </select>
      </div>
    </form>
  );
}
