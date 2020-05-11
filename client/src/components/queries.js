import { gql } from "apollo-boost";

const getBooksQuery = gql`
  {
    books {
      title
      id
    }
  }
`;

const getBookDetailsQuery = gql`
  query($id: ID) {
    book(id: $id) {
      title
      genre
      author {
        name
        age
        books {
          title
          genre
        }
      }
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

export { getAuthorsQuery, getBooksQuery, addBookMutation, getBookDetailsQuery };
