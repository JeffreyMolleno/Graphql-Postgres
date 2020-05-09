import { gql } from "apollo-boost";

const getBooksQuery = gql`
  {
    books {
      title
      id
    }
  }
`;

const getAuthorsQuery = gql`
  {
    authors {
      id
      name
    }
  }
`;

const addBookMutation = gql`
  mutation($title: String!, $genre: String!, $author_id: ID!) {
    addBook(author_id: $author_id, title: $title, genre: $genre) {
      id
      title
      genre
    }
  }
`;

export { getAuthorsQuery, getBooksQuery, addBookMutation };
