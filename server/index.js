"use strict";
const express = require('express');
const cors = require('cors');
const path = require('path');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const cart = require(`${__dirname}/api/products/index.json`);
const app = express();
const port = process.env.PORT || 8080;
const contentBasePath = path.join(__dirname, "..", "build");
// Middlewares
app.use(cors());
app.use(express.static(contentBasePath));
app.use(express.static("public"));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "..", "build", "index.html"));
});
const typeDefs = `
type Query {
  getCart: [Cart]!
}

type Mutation {
  updateProduct(sku: ID!, stockLevel: Float!): [Cart]!,
  deleteProduct(sku: ID!): [Cart]!
}

type Cart { 
    name: String!,
    price: Float!,
    size: String!,
    sku: String!,
    stockLevel: Float
}
`;
const schema = buildSchema(typeDefs);
// Query and Mutation logic
const resolvers = {
    getCart: () => cart.items,
    updateProduct: ({ sku, stockLevel }) => {
        if (!sku || !stockLevel) {
            console.log('Invalid Product');
        }
        ;
        const existingProduct = cart.items.find((item) => item.sku === sku);
        existingProduct.stockLevel = stockLevel;
        return cart.items;
    },
    deleteProduct: ({ sku }) => {
        if (!sku) {
            console.log('Product unknown');
        }
        ;
        const existingProduct = cart.items.find((item) => item.sku === sku);
        const index = cart.items.indexOf(existingProduct);
        cart.items.splice(index, 1);
        return cart.items;
    }
};
// Server config
app.use('/api', graphqlHTTP({
    schema: schema,
    rootValue: resolvers,
    graphiql: true,
}));
app.listen(port, (error) => {
    if (error) {
        console.error('error', error);
    }
    else {
        console.info(`\n ==> 🌎  Listening on port ${port}. Open up http://localhost:${port}/ in your browser.`);
    }
});
//# sourceMappingURL=index.js.map