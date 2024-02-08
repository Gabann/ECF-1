const express = require('express');
const router = require("./routes/router.js");
const app = express();
const port = 3000;
const cors = require('cors');

app.use(express.json());
app.use(cors());
app.use('/', router);

app.listen(port, () => {
	console.log(`server launched, listening on ${port}`);
});