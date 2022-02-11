const express = require('express');
const cors = require('cors');
const router = express.Router();
const connectDB = require('./config/db');

const app = express();
app.set('views', __dirname + '/');
app.engine('html', require('ejs').renderFile);

// connect to database
connectDB();

app.use(cors({ origin: '*' }));
app.use(express.json({ extended: false }));

// define routes
app.get('/', async(req, res) => {
    // const shortUrls = await ShortUrl.find();
    res.render('./index.html');
});

app.use('/goto/', require('./routes/code'));
app.use('/api/', require('./routes/url'));

const PORT = 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));