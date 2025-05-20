const React = require("react");
const { renderToString } = require("react-dom/server");
const { StaticRouter } = require("react-router-dom/server");
const { Routes, Route } = require("react-router-dom");
const MainLayout = require("../views/layouts/mainlayout").default;
const Home = require("../views/pages/home").default;
const ForgotPassword = require("../views/pages/forgot-password").default;

const routes = (req, res) => {
    const content = renderToString(
        React.createElement(MainLayout, {
            children: React.createElement(StaticRouter, { location: req.url },
                React.createElement(Routes, null,
                    React.createElement(Route, { 
                        path: "/", 
                        element: React.createElement(Home) 
                    }),
                    React.createElement(Route, { 
                        path: "/reset-password/*", 
                        element: React.createElement(ForgotPassword) 
                    })
                )
            )
        })
    );

    res.send("<!DOCTYPE html>" + content);
};

module.exports = routes;
