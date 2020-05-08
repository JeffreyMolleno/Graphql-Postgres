const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require("./schema/schema");
const app = express();
const massive = require("massive");

massive({
  host: "localhost",
  port: 5434,
  database: "library",
  user: "postgres",
  password: "admin",
}).then((db) => {

  app.set("db", db);
  
  app.use(
    "/graphql",
    graphqlHTTP({
      schema,
      graphiql: true,
    })
  );
});

const PORT = 4000;

app.listen(PORT, () => {
  console.log("now listening for request on port ", PORT);
});
