const express = require('express');
const cors = require('cors');
const path = require('path')
const {graphqlHTTP} = require('express-graphql');
const {buildSchema} = require('graphql');
const cart = require(`${__dirname}/api/products/index.json`);

const app = express();
const port = process.env.PORT || 5000
const contentBasePath = path.join(__dirname, "..", "build");

// Middlewares
app.use(cors());
app.use(express.static(contentBasePath))
app.use(express.static("public"));
app.get('/', (req: any, res: any) => {
  res.sendFile(path.join(__dirname, "..", "build", "index.html"));
});

interface ICart {
  name: string;
  price: number;
  size?: string;
  sku: string;
  stockLevel: number;
}

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
`
const schema = buildSchema(typeDefs);

// Query and Mutation logic
const resolvers = {
  getCart: () => cart.items,
  updateProduct: ({sku, stockLevel}: { sku: string, stockLevel: number }) => {
    if (!sku || !stockLevel) {
      console.log('Invalid Product');
    };

    const existingProduct = cart.items.find((item: ICart) => item.sku === sku);
    (existingProduct as any).stockLevel = stockLevel;

    return cart.items;
  },
  deleteProduct: ({sku}: { sku: string }) => {
    if (!sku) {
      console.log('Product unknown');
    };

    const existingProduct = cart.items.find((item: ICart) => item.sku === sku);
    const index = cart.items.indexOf(existingProduct as ICart);
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

app.listen(port, (error: any) => {
  if (error) {
    console.error('error', error)
  } else {
    console.info(`\n ==> 🌎  Listening`)
  }
})
