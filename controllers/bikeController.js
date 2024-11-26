// controllers/bikeController.js

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