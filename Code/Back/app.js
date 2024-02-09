const express = require('express');
const router = require("./router/expressRouter.js");
const app = express();
const port = 3000;
const cors = require('cors');

app.use(express.json());
app.use(cors());
app.use('/', router);

app.listen(port, () => {
	console.log(`Server launched, listening on ${port}`);
});