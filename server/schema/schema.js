const graphql = require("graphql");
const _ = require("lodash");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
} = graphql; //destructuring

// define expected structure of the object to retrieve/process
const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      async resolve(parent, args, request) {
        let res = await request.app
          .get("db")
          .authors.where(`id=${parent.author_id}`);
        return res[0];
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
        let res = await request.app
          .get("db")
          .books.where(`author_id=${parent.id}`);
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

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) },
      },
      async resolve(parent, args, request) {
        return await request.app.get("db").authors.insert({
          name: args.name,
          age: args.age,
        });
      },
    },
    addBook: {
      type: BookType,
      args: {
        title: { type: new GraphQLNonNull(GraphQLString) },
        genre: { type: new GraphQLNonNull(GraphQLString) },
        author_id: { type: new GraphQLNonNull(GraphQLID) },
      },
      async resolve(parent, args, request) {
        return await request.app.get("db").books.insert({
          title: args.title,
          genre: args.genre,
          author_id: args.author_id,
        });
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
