// controllers/bikeController.js

const connectToDatabase = require('./mongodbConnectController');

async function getBikes(req, res, bike) {
    try {
        const client = await connectToDatabase();
        const db = client.db('test');
        const bikesCollection = db.collection('products');

        // Query the articles collection and store the results in an array
        const bikes = await bikesCollection.find({}).toArray();

        // consele.log the articles
        // console.log(articles);

        // Render the articles page with the retrieved articles
        res.render(bike, { bikes: bikes, title: "Bike Details" });
    } catch (error) {
        console.error("Error retrieving articles:", error);
        res.status(500).send("Error retrieving articles");
    }
}


exports.showMountainBike = (req, res) => {
    res.render('mountainBike', { title: 'Mountain Bike' });
};

exports.showCityBike = (req, res) => {
    res.render('cityBike', { title: 'City Bike' });
};

exports.showHybridBike = (req, res) => {
    res.render('hybridBike', { title: 'Hybrid Bike' });
};

// New controller functions for individual bicycles
exports.showBike1 = (req, res) => {
    res.render('bike1', { title: 'Bicycle 1' });
};

exports.showBike2 = (req, res) => {
    res.render('bike2', { title: 'Bicycle 2' });
};

exports.showBike3 = (req, res) => {
    res.render('bike3', { title: 'Bicycle 3' });
};

exports.getBikes = getBikes;