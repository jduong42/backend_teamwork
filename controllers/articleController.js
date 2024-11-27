// controllers/articleController.js

const connectToDatabase = require('./mongodbConnectController');

async function getArticles(req, res) {
    try {
        const client = await connectToDatabase();
        const db = client.db('test');
        const articlesCollection = db.collection('articles');

        // Query the articles collection and store the results in an array
        const articles = await articlesCollection.find({}).toArray();

        // consele.log the articles
        console.log(articles);

        // Render the articles page with the retrieved articles
        res.render('articles', { title: 'Articles', articles });
    } catch (error) {
        console.error("Error retrieving articles:", error);
        res.status(500).send("Error retrieving articles");
    }
}

exports.showArticle1 = (req, res) => {
    res.render('article1', { title: 'Article 1' });
};

exports.showArticle2 = (req, res) => {
    res.render('article2', { title: 'Article 2' });
};

exports.showArticle3 = (req, res) => {
    res.render('article3', { title: 'Article 3' });
};

exports.getArticles = getArticles;