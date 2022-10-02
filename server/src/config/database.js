const mongoose = require('mongoose');
require('dotenv').config();

const connect = async () => {
  const mongoConnectionString = process.env.MONGO_DB_LINK;
  try {
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true
    };
    await mongoose.connect(mongoConnectionString, opts);
    // eslint-disable-next-line no-console
    console.log('Successfully Connected to Database');
    logger.debug({ mongoConnectionString });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log('Unable to establish connection to Database');
    logger.error(`Fail to connect with database ${mongoConnectionString}`);
  }
};
module.exports = { connect };
