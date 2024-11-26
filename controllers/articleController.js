// controllers/articleController.js

exports.showArticle1 = (req, res) => {
    res.render('article1', { title: 'Article 1' });
};

exports.showArticle2 = (req, res) => {
    res.render('article2', { title: 'Article 2' });
};

exports.showArticle3 = (req, res) => {
    res.render('article3', { title: 'Article 3' });
};