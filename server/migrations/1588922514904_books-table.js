/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable("books", {
    id: {
      type: "serial",
      primaryKey: true,
    },
    title: {
      type: "text",
      notNull: true,
    },
    genre: {
      type: "text",
      notNull: true,
    },
    author_id: {
      type: "integer",
      notNull: true,
      references: "authors",
    },
  });
};

exports.down = (pgm) => {};
