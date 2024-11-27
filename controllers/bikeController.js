// controllers/bikeController.js

const connectToDatabase = require('./mongodbConnectController');

async function getBikes(req, res, bike) {
    try {
        const client = await connectToDatabase();
        const db = client.db('test');
        const bikesCollection = db.collection('products');

        // Query the articles collection and store the results in an array
        const bikes = await bikesCollection.find({}).toArray();

        // Render the articles page with the retrieved articles
        res.render(bike, { bikes: bikes, title: "Bike Details" });
    } catch (error) {
        console.error("Error retrieving articles:", error);
        res.status(500).send("Error retrieving articles");
    }
}

async function getMostPurchasedBikes(req, res) {
    try {
        const client = await connectToDatabase();
        const db = client.db('test');
        const bikesCollection = db.collection('products');

        // Query the most purchased bikes
        const bikes = await bikesCollection.find({}).toArray();

        // Ensure each bike has an id property
        bikes.forEach((bike, index) => {
            bike.id = index + 1; // Assuming the id is the index + 1
            bike.image = `/assets/images/bike_${bike.id}.png`;
        });

        // Render the homepage with the most purchased bikes
        res.render('homepage', { title: 'Home', bikes });
    } catch (error) {
        console.error("Error retrieving bicycles:", error);
        res.status(500).send("Error retrieving bicycles");
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
exports.getMostPurchasedBikes = getMostPurchasedBikes;