const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const router = express.Router();
const schema = require("../schema/schema");

router.use("/graphql", graphqlHTTP({
    schema: schema,
    graphiql: true,
}));

module.exports = router;
