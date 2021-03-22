const mongoose = require('mongoose');

const mongoURL = process.env.MONGO_URL;

mongoose
  .connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .catch((err) => {
    console.log('MongoDB connection error: ' + err);
    process.exit(1);
  });
