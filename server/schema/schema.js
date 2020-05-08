const graphql = require("graphql");
const _ = require("lodash");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
} = graphql; //destructuring

// define expected structure of the object to retrieve/process
const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: new GraphQLList(AuthorType),
      async resolve(parent, args, request) {
        let res = await request.app
          .get("db")
          .authors.where(`id=${parent.author_id}`);
        return res;
      },
    },
  }),
});

const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      async resolve(parent, args, request) {
        let res = await request.app.get("db").books.where(`author_id=${parent.id}`);
        return res;
      },
    },
  }),
});

// Defining root query
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      async resolve(parent, args, request) {
        //   code to get data from db or other sources
        let res = await request.app.get("db").books.where(`id=${args.id}`);
        return res[0];
      },
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      async resolve(parent, args, request) {
        let res = await request.app.get("db").authors.where(`id=${args.id}`);
        return res[0];
      },
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args, request) {
        let db = request.app.get("db");
        return db.query("SELECT * FROM books");
      },
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args, request) {
        // return authors;
        let db = request.app.get("db");
        return db.query("SELECT * FROM authors");
      },
    },
  },
  
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
