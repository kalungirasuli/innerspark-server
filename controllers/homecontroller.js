exports.index = (req, res) => {
    const React = require("react");
    const { renderToString } = require("react-dom/server");
  
    const Home = require("../views/pages/home").default;
    const MainLayout = require("../views/layouts/mainlayout").default;
  
    const content = renderToString(
      React.createElement(MainLayout, {
        children: React.createElement(Home, { message: "Hello from Controller!" }),
      })
    );
  
    res.send("<!DOCTYPE html>" + content);
  };
  