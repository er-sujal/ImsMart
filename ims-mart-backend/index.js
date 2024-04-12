const port = 4000;
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const multer = require('multer');
const path = require('path');
const cors = require('cors');

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://localhost/imsmart")

app.get("/", (req, res) => {
    res.send("Express is working")
})

const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({ storage: storage })

app.use('/images', express.static('upload/images'))
app.post("/upload", upload.single('product'), (req, res) => {
    res.json({
        success: 1,
        image_url: `http://localhost:${port}/images/${req.file.filename}`
    })
})

const Product = mongoose.model("Product", {
    id: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    new_price: {
        type: Number,
        required: true,
    },
    old_price: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    avilable: {
        type: Boolean,
        default: true,
    },
})

app.post('/addproduct', async (req, res) => {
    let products = await Product.find({});
    let id;
    if (products.length > 0) {
        let last_product_array = products.slice(-1);
        let last_product = last_product_array[0];
        id = last_product.id + 1;
    }
    else {
        id: 1;
    }
    const product = new Product({
        id: id,
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        new_price: req.body.new_price,
        old_price: req.body.old_price,
    });
    console.log(product);
    await product.save();
    console.log("saved");
    res.json({
        success: true,
        name: req.body.name,
    })
})

app.post('/removeproduct', async (req, res) => {
    await Product.findOneAndDelete({
        id: req.body.id
    })
    console.log("Removed");
    res.json({
        success: true,
        name: req.body.name
    })
})

app.get('/allproducts', async (req, res) => {
    let products = await Product.find({});
    console.log("All product fetched");
    res.send(products);
})

const Users = mongoose.model('Users', {
    name: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
    },
    cartData: {
        type: Object,
    },
    date: {
        type: Date,
        default: Date.now,
    }
})

app.get('/user/:id', async (req, res) => {
    try {
        const user = Users.findById(req.params.id)
        if (user == null) {
            return res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

app.post('/signup', async (req, res) => {
    let chack = await Users.findOne({ email: req.body.email });
    if (chack) {
        return res.status(400).json({ success: false, errors: "Email Id alrady Register" })
    }

    const user = new Users({
        name: req.body.username,
        email: req.body.email,
        password: req.body.password,
        cartData: cart,
    })

    await save();

    const data = {
        user: {
            id: user.id
        }

    }

    const token = jwt.sign(data, 'secret_ecom')
    res.json({ success: true, token })
})

app.post('/login', async (req, res) => {
    let user = await Users.findOne({ email: req.body.email });
    if (user) {
        const passCompare = req.body.password === user.password;
        if (passCompare) {
            const data = {
                user: {
                    id: user.id
                }
            }
            const token = jwt.sign(data, 'secret_ecom');
            res.json({ success: true, token });
        }
        else {
            res.json({ success: false, errors: "Incorrect Password" });
        }
    }
    else {
        res.json({ success: false, errors: "Incorrect Email Please Register!!" })
    }
})

app.get('/newcollection', async (req, res) => {
    let products = await find({});
    let newcollection = products.slice(1).slice(-8);
    res.send(newcollection);
})

app.get('/popularinwomen', async (req, res) => {
    let products = await Product.find({ category: "women" });
    let popular_inwomen = products.slice(0, 4);
    res.send(popular_inwomen);
})

// app.get('/reletedproducts',async (req,res) =>{
//     let products = await Product.find({category:req.body.catrgory})
//     let releted_product = products.slice(0,4);
//     res.send(releted_product);
// })

const fetchUsre = async (req, res, next) => {
    const token = req.header('auth-token')
    if (!token) {
        res.status(401).send({
            errors: "Please authenticate using valid token"
        })
    }
    else {
        try {
            const data = jwt.verify(token, 'secret_ecom')
            req.user = data.user;
            next();
        } catch (error) {
            res.status(401).send({ errors: "please authenticate using valid token" })
        }
    }
}

// app.post('/active' ,fetchUsre,async (req,res)=>{
//     let userData = await Users.findOne({_id:req.user.id})
//     let uname =userData.username
//     res.send(uname);
// })

app.put('/updateproduct/:id', async (req, res) => {
    const productId = req.params.id;
    const updatedProductData = req.body;
    try {
        const updatedProduct = await Product.findOneAndUpdate(
            { id: productId },
            { $set: updatedProductData },
            { new: true }
        );
        if (!updatedProduct) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }
        res.json({ success: true, product: updatedProduct });
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});

app.post('/addtocart', fetchUsre, async (req, res) => {
    let userData = await Users.findOne({ _id: req.user.id })
    userData.cartData[req.body.itemId] += 1
    await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData })
    res.send("Added")
})

app.post('/removefromcart', fetchUsre, async (req, res) => {
    let userData = await Users.findOne({ _id: req.user.id })
    if (userData.cartData[req.body.itemId] > 0) {
        userData.cartData[req.body.itemId] -= 1
        await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData })
        res.send("REmoved")
    }
})

app.post('/getcart', fetchUsre, async (req, res) => {
    console.log("get cart")
    let userData = await Users.findOne({ _id: req.user.id })
    res.json(userData.cartData);

})

app.get('/search', async (req, res) => {
    const searchTerm = req.query.q;

    try {
        const searchResults = await Product.find({
            $or: [
                { name: { $regex: new RegExp(searchTerm, 'i') } },
                { category: { $regex: new RegExp(searchTerm, 'i') } }
            ]
        });

        res.json(searchResults);
    } catch (error) {
        console.error('Error searching products:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});


app.listen(port, (error) => {
    if (!error) {
        console.log("Server Running on http://localhost:4000");
    }
    else {
        console.log("error : " + error)
    }
})