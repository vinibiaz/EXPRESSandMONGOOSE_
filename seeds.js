/*
    Seed database file
*/

const mongoose = require('mongoose');
const Product = require('./models/product.js'); //Here I import Product from models/products.js

mongoose.connect('mongodb://localhost:27017/farmStand',
  {
  useNewUrlParser: true,
    //useFindAndModify: false,
    useUnifiedTopology: true
  }
).then(()=>{
    console.log("MONGO - Connection OPEN");
})
.catch(err => {
    console.log("MONGO - Connection ERROR");
    console.log(err);
});


/*
    insert one 
*/
const p = new Product({
    name: 'Ruby Grapefruit',
    price: 1.99,
    category: 'fruit'
})
p.save().then(p =>{
    console.log(p)
})
.catch(e =>{
    console.log(e)
})


/*
    insert many
*/

const seedProducts = [
    {
        name: 'Fairy Eggplant',
        price: 1.00,
        category: 'vegetable'
    },
    {
        name: 'Organic Goddess Melon',
        price: 4.99,
        category: 'fruit'
    },
    {
        name: 'Organic Mini Seedless Watermelon',
        price: 3.99,
        category: 'fruit'
    },
    {
        name: 'Organic Celery',
        price: 1.50,
        category: 'vegetable'
    },
    {
        name: 'Chocolate Whole Milk',
        price: 2.69,
        category: 'dairy'
    },
]

Product.insertMany(seedProducts)
.then( res=>{
    console.log(res);
})
.catch(e =>{
    console.log(e);
})