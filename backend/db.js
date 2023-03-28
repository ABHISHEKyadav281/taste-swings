const mongoose = require('mongoose');
// const mongoUri='mongodb+srv://Taste-Swings:Taste-Swings@cluster0.edn14sy.mongodb.net/Taste-Swingsmern?retryWrites=true&w=majority';
const mongoUri = 'mongodb://Taste-Swings:Taste-Swings@ac-wrdd8np-shard-00-00.edn14sy.mongodb.net:27017,ac-wrdd8np-shard-00-01.edn14sy.mongodb.net:27017,ac-wrdd8np-shard-00-02.edn14sy.mongodb.net:27017/Taste-Swingsmern?ssl=true&replicaSet=atlas-tr0sll-shard-0&authSource=admin&retryWrites=true&w=majority';

const mongoDB = async () => {
    try {
        await mongoose.connect(mongoUri, { useNewUrlParser: true })
        console.log("connected");
        
    } catch (err) {
        console.log('connection error', err);
    }

}


module.exports = mongoDB;