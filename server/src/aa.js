const { connect } = require('./config/database');
const app = require('./server');

// app.listen(port,()=>console.log("working"));


// require('dotenv').config();

// // const port = process.env.PORT || 3000;

// const port=2000;




connect();

// // eslint-disable-next-line no-console
// app.listen(port, () => console.log(`Running on Port ${port}`));


app.listen(8080,()=>console.log("Server connected on port 8080"));




