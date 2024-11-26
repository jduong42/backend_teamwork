// controllers/cartController.js

exports.showCart = (req, res) => {
    res.render('cart', { title: 'Cart' });
};