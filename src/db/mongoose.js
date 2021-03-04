const mongoose = require('mongoose');

const mongoURL = process.env.MONGO_URL;

mongoose
  .connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {})
  .catch(() => {
    console.log('Failed to connect to mongodb');
  });
