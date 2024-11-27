// controllers/articleController.js

const connectToDatabase = require('./mongodbConnectController');

async function getArticles(req, res, article) {
    try {
        const client = await connectToDatabase();
        const db = client.db('test');
        const articlesCollection = db.collection('articles');

        // Query the articles collection and store the results in an array
        const articles = await articlesCollection.find({}).toArray();

        // consele.log the articles
        // console.log(articles);

        // Render the articles page with the retrieved articles
        res.render(article, { articles: articles, title: "Article" });
    } catch (error) {
        console.error("Error retrieving articles:", error);
        res.status(500).send("Error retrieving articles");
    }
}

exports.getArticles = getArticles;