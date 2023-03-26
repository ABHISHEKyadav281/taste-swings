const mongoose = require('mongoose');
// const mongoUri='mongodb+srv://Taste-Swings:Taste-Swings@cluster0.edn14sy.mongodb.net/Taste-Swingsmern?retryWrites=true&w=majority';
const mongoUri = 'mongodb://Taste-Swings:Taste-Swings@ac-wrdd8np-shard-00-00.edn14sy.mongodb.net:27017,ac-wrdd8np-shard-00-01.edn14sy.mongodb.net:27017,ac-wrdd8np-shard-00-02.edn14sy.mongodb.net:27017/Taste-Swingsmern?ssl=true&replicaSet=atlas-tr0sll-shard-0&authSource=admin&retryWrites=true&w=majority';

const mongoDB = () => {
    mongoose.connect(mongoUri, { useNewUrlParser: true })
        .then(() => {
            console.log("connected");
            const fetch_data = mongoose.connection.db.collection("food_items");
            fetch_data.find({}).toArray()
                .then((data) => {
                    const fetch_data1 = mongoose.connection.db.collection("food_category");
                    fetch_data1.find({}).toArray()
                        .then((data1) => {
                            console.log("all set");
                            global.food_category = data1;
                            global.food_items = data;
                        })
                        .catch((err) => {
                            console.log(err);
                        })
                })
                .catch((err) => {
                    console.log(err);
                })
        })
        .catch((err) => {
            console.log('connection error', err);
        });
}


module.exports = mongoDB;