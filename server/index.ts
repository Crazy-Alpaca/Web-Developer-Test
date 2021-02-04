const express = require('express');
const cors = require('cors');
const path = require('path')
const {graphqlHTTP} = require('express-graphql');
const {buildSchema} = require('graphql');
const cart = require(`${__dirname}/api/products/index.json`);

const app = express();
const port = process.env.PORT || 8080;
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
  getCart: Cart!
}

type Mutation {
  updateProduct(sku: ID!, stockLevel: Float!): Cart,
  deleteProduct(sku: ID!): Cart
}

type Cart {
    items: [Product]!
    subTotal: Float,
    VAT: Float,
    total: Float
}

type Product { 
    name: String!,
    price: Float!,
    size: String!,
    sku: String!,
    stockLevel: Float
}
`
const schema = buildSchema(typeDefs);

const getSubtotalCost = async (item: Array<ICart>) => await item.reduce((total: number, current:  any) => total + (current.stockLevel *  current.price),0);

// Query and Mutation logic
const resolvers = {
  getCart: async () => {
    // Update subtotal cost
    cart.subTotal = await getSubtotalCost(cart.items);

    // Update VAT
    cart.VAT = cart.subTotal * 20/100

    // Update Total cost
    cart.total = cart.VAT + cart.subTotal

    return Promise.resolve(cart);
  },
  updateProduct: async ({sku, stockLevel}: { sku: string, stockLevel: number }) => {
    if (!sku || !stockLevel) {
      console.log('Invalid Product');
    };

    // Update quantity
    const existingProduct = cart.items.find((item: ICart) => item.sku === sku);
    (existingProduct as any).stockLevel = stockLevel;

    // Update subtotal cost
    cart.subTotal = await getSubtotalCost(cart.items);

    // Update VAT
    cart.VAT = cart.subTotal * 20/100

    // Update Total cost
    cart.total = cart.VAT + cart.subTotal

    return Promise.resolve(cart);
  },
  deleteProduct: async ({sku}: { sku: string }) => {
    if (!sku) {
      console.log('Product unknown');
    };

    // Delete item from cart
    const existingProduct = cart.items.find((item: ICart) => item.sku === sku);
    const index = cart.items.indexOf(existingProduct as ICart);
    cart.items.splice(index, 1);

    // Update subtotal cost
    cart.subTotal = await getSubtotalCost(cart.items);

    // Update VAT
    cart.VAT = cart.subTotal * 20/100

    // Update Total cost
    cart.total = cart.VAT + cart.subTotal

    return Promise.resolve(cart);
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
    console.info(`\n ==> 🌎  Listening on port ${port}. Open up http://localhost:${port}/ in your browser.`)
  }
})
