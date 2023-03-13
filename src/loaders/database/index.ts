import mongoose from 'mongoose';

mongoose.set('debug', true);
const databaseLoader = async () => new Promise<any>((resolve, reject) => {
  mongoose.connect("mongodb://localhost:27017/productDb")
    .then(db => {
      console.log('Database connection established');
      resolve(db);
    })
    .catch(reject);
});

export { databaseLoader };
