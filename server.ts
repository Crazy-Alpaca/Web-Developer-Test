const express = require('express');
const cors = require('cors');
const path = require('path')
const {graphqlHTTP} = require('express-graphql');
const {buildSchema} = require('graphql');

const app = express();
const port = process.env.PORT || 8080
//const contentBasePath = path.join(__dirname, 'public');

app.use(cors());
//app.use(express.static(contentBasePath))

// app.get('*', function (request: any, response: any){
//   response.sendFile(path.resolve(contentBasePath, 'index.html'))
// })

const typeDefs = `
type Query {
  getCart: [Cart]!
}

type Mutation {
  updateProduct(id: ID!, quantity: Float!): [Cart]!,
  deleteProduct(id: ID!): [Cart]!
}

type Cart { 
    id: ID!,
    product: String!,
    price: String!,
    quantity: Float!
}
`
const schema = buildSchema(typeDefs);

const cart = [
  {
    id: "1",
    product:  "Cotton T-shirt, medium",
    price: "$10.99",
    quantity: 1
  },
  {
    id: "2",
    product:  "Baseball cap, one size",
    price: "$5.99",
    quantity: 0
  },
  {
    id: "3",
    product:  "Shorts, medium",
    price: "14.99",
    quantity: 0
  }
];

// Query and Mutation logic
const resolvers = {
  getCart: () => cart,
  updateProduct: ({id, quantity}: { id: string, quantity: number }) => {
    if (!id || !quantity) {
      console.log('Invalid Product');
    };

    const existingProduct = cart.find(item => item.id === id);
    (existingProduct as any).quantity = quantity;

    return cart;
  },
  deleteProduct: ({id}: { id: string }) => {
    if (!id) {
      console.log('Product unknown');
    };

    const existingProduct = cart.find(item => item.id === id);
    const index = cart.indexOf(existingProduct as any);
    cart.splice(index, 1);

    return cart;
  }
};

// Server config
app.use('/', graphqlHTTP({
  schema: schema,
  rootValue: resolvers,
  graphiql: true,
}));

app.listen(port, (error: any) => {
  if (error) {
    console.error('error', error)
  } else {
    console.info(`\n ==> 🌎  Listening on port ${port}. Open up http://localhost:${port}/ in your browser.`)
  }
})
