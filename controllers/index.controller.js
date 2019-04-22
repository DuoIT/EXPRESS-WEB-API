var Categories = require('../models/category.model');
var Products = require('../models/product.model');

module.exports.getHome = (req, res, next) => {
    Products.find()
    .select('name img cate des price quantity')
    .exec()
    .then(product =>{
        Categories.find()
        .then(cate => {
            const cates = cate.map(doc =>{
                        return {
                            id: doc._id,
                            name: doc.name,
                            request: {
                                type: 'GET',
                                url:'http://localhost:3000'
                            }
                        }});
            const products = product.map(doc => {
                return {
                    id: doc._id,
                    name: doc.name,
                    img: doc.img,
                    cate: doc.cate,
                    des: doc.des,
                    price: doc.price,
                    quantity: doc.quantity,
                    request: {
                        type: 'GET',
                        url:'http://localhost:3000'
                    }
                }
            });

            return res.status(200).json({
                cates: cates,
                products: products
            });
        })
        
    })
    .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
    });
};

module.exports.detail = (req, res, netx) => {
    var id = req.params.id;
    console.log(id);
    // 5cb76acc3212d60fb87d6d71
    Products.findById(id)
    .then(data => {
        res.status(200).json({product: data})
    });
};