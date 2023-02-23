/*

    Before start the project run:

    npm init -y
    npm i express ejs mongoose
    touch index.js
    mkdir views
*/


const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');//when I wanna update or override a data


const Product = require('./models/product'); //Here I import Product from models/products.js
const { render } = require('ejs');

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

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));//use for post 
app.use(methodOverride('_method'));//when I wanna update or override a data


const categories = ['fruit','vegetables', 'dairy','aaa'];

//http://localhost:3000/products?category=fruit
app.get('/products',async (req, res)=>{

    const {category} = req.query//query for search by category
    console.log(category);
    console.log("----------------------------------");
    if(category){
        const products = await Product.find({category})
        console.log(category);
        console.log("..........................");
        console.log(products);
        res.render('products/index', {Allproducts: products, category})
    }
    else{
        const products = await Product.find({})
        res.render('products/index', {Allproducts: products, category:'All'})
    }
})

app.get('/products/new', (req, res)=>{
    res.render('products/new', {categories})
})

app.post('/products', async (req, res) =>{
    const newProduct = new Product(req.body)
    await newProduct.save();
    console.log(newProduct);
    res.redirect(`/products/${newProduct._id}`);
   // res.send("making your product!");
})

app.get('/products/:id', async (req, res) =>{
    const {id} = req.params;
    const product = await Product.findById(id);
    console.log(product);
    res.render('products/show', {product});
})
//searchinh and updating

app.get('/products/:id/edit', async (req, res) =>{
    const {id} = req.params;
    const product = await Product.findById(id);
    res.render('products/edit', {product, categories})
})
//update data, remember that have to install "npm i method-override"
app.put('/products/:id', async (req, res) => {
    const {id} = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, {runValidators:true, new: true });
    //console.log(req.body); 
    console.log("-------------------------------------------------------------------");
    res.redirect(`/products/${product._id}`);
})

app.delete('/products/:id', async (req, res) =>{
   // res.send("MADE IT!!")
    const {id} = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    res.redirect('/products');

})

app.listen(3000, () =>{
    console.log("APP IS LISTENING ON PORT 3000!");
})