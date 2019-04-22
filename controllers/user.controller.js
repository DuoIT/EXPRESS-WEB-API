var User = require('../models/user.model');

var bcrypt = require('bcrypt-nodejs');


module.exports.postSignUp = (req, res, next) =>{
    var username = req.body.username;
    var password = req.body.password;
    var email = req.body.email;
    var name = req.body.name;
    var phone = req.body.phone;

    User.findOne({ 'username' :  username }, (err, user) => {
        if (err) {
            return res.status(400).json({message: 'Tim user error'});
        }
        if (user) {
            return res.status(400).json({message: 'Username da ton tai'});
        } else {
            var newUser = new User({
                username: username,
                password : bcrypt.hashSync(password),
                email : email,
                name: name,
                phone: phone
            });
            newUser.save(function(err) {
                if (err) {
                    return res.status(400).json({message: 'Them user error'});
                }
                else {
                    return res.status(200).json({message: 'Them thanh cong'})
                }
            });
        }                    
    }); 
}

module.exports.postSignIn = (req, res, next) => {
    var username = req.body.username;
    var password = req.body.password;

    User.findOne({ 'username' :  username }, (err, user) => {
        if (err) {
            return res.status(400).json({message: 'Dang nhap that bai'});
        }
        if (!user) {
            return res.status(400).json({message: 'Username khong ton tai'});
        }
        if(bcrypt.compareSync(password, user.password) === false){
            return res.status(400).json({message: 'Mat khau khong chinh xac'});
        } else {
            return res.status(200).json({message: 'Dang nhap thanh cong'});
        }
        
    }); 
}
// module.exports.getSignIn 

// module.exports.postSignIn


// schema.methods.encryptPassword = function (password) {
//     return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
// };
// schema.methods.validPassword = function  (password) {
//     return bcrypt.compareSync(password, this.password);
// };