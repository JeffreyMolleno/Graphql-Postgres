/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable("authors", {
    id: {
      type: "serial",
      primaryKey: true,
    },
    name: {
      type: "text",
      notNull: true,
    },
    age: {
      type: "text",
      notNull: false,
    },
  });
};

exports.down = (pgm) => {};
