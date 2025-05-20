require("@babel/register")({
    extensions: [".js", ".jsx"],
    ignore: [/node_modules/],
});

const express = require("express");
const path = require("path");
const app = express();

app.use(express.static(path.join(__dirname, 'public')));

// Handle all routes through React Router
app.get('/*', (req, res) => {
    const webRoutes = require("./routes/web");
    webRoutes(req, res);
});

app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});