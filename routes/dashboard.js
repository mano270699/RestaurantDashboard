const express = require('express');
const router = express.Router();
const request = require('request');


module.exports = {

    //Get Functions
    dashboardPage: (req, res) => {
        var url = req.connection.encrypted ? 'https://' : 'http://' + req.hostname + ':' + port;

        console.log("My url" + url);
        var sess;
        sess = req.session;

        var sess;
        sess = req.session;

        if (sess.email) {

            res.render("dashboard.ejs", {
                name: req.session.username,
                image: req.session.image,
                urlMain: url
            });

            console.log("My Email : " + req.session.email);

        } else {

            res.writeHead(301, { Location: `${url}/login` });
            res.end();
        }






    },
    categorypage: (req, res) => {
        var url = req.connection.encrypted ? 'https://' : 'http://' + req.hostname + ':' + port;



        var sess;
        sess = req.session;

        if (sess.email) {
            console.log("in if catregory" + req.session.username)
            res.render("Category.ejs", {
                name: req.session.username,
                image: req.session.image,
                urlMain: url
            });

        } else {

            res.writeHead(301, { Location: `${url}/login` });
            res.end();
        }






    },
    meal_prodectPage: (req, res) => {


        var url = req.connection.encrypted ? 'https://' : 'http://' + req.hostname + ':' + port;




        var sess;
        sess = req.session;

        if (sess.email) {

            res.render("item.ejs", {
                name: req.session.username,
                image: req.session.image,
                urlMain: url
            });

        } else {

            res.writeHead(301, { Location: `${url}/login` });
            res.end();
        }


    },
    addofferPage: (req, res) => {


        var url = req.connection.encrypted ? 'https://' : 'http://' + req.hostname + ':' + port;




        var sess;
        sess = req.session;

        if (sess.email) {

            res.render("offer.ejs", {
                name: req.session.username,
                image: req.session.image,
                urlMain: url
            });

        } else {

            res.writeHead(301, { Location: `${url}/login` });
            res.end();
        }



    },
    appusersPage: (req, res) => {


        var url = req.connection.encrypted ? 'https://' : 'http://' + req.hostname + ':' + port;


        var sess;
        sess = req.session;

        if (sess.email) {

            res.render("Appuser.ejs", {
                name: req.session.username,
                image: req.session.image,
                urlMain: url
            });

        } else {

            res.writeHead(301, { Location: `${url}/login` });
            res.end();
        }


    },
    slidershowPage: (req, res) => {


        var url = req.connection.encrypted ? 'https://' : 'http://' + req.hostname + ':' + port;


        var sess;
        sess = req.session;

        if (sess.email) {

            res.render("SliderImages.ejs", {
                name: req.session.username,
                image: req.session.image,
                urlMain: url
            });

        } else {

            res.writeHead(301, { Location: `${url}/login` });
            res.end();
        }




    },

    settingPage: (req, res) => {


        var url = req.connection.encrypted ? 'https://' : 'http://' + req.hostname + ':' + port;


        var sess;
        sess = req.session;

        if (sess.email) {

            res.render("Setting.ejs", {
                name: req.session.username,
                image: req.session.image,
                password: req.session.password,
                email: req.session.email,
                urlMain: url
            });

        } else {

            res.writeHead(301, { Location: `${url}/login` });
            res.end();
        }






    },
    logPage: (req, res) => {
        var url = req.connection.encrypted ? 'https://' : 'http://' + req.hostname + ':' + port;



        if (!req.session.email) {

            console.log(req.session);
            console.log(req.session.email);

            res.render("Login.ejs", {

                urlMain: url
            });


        } else {
            res.writeHead(301, { Location: `${url}/dashboard` });
            res.end();
        }




    },
    manageComments: (req, res) => {


        var url = req.connection.encrypted ? 'https://' : 'http://' + req.hostname + ':' + port;


        var sess;
        sess = req.session;
        var meal_id = req.params.meal_id;
        console.log(meal_id);
        if (sess.email) {

            res.render("ManageComments.ejs", {
                name: req.session.username,
                image: req.session.image,
                urlMain: url,
                meal_id: meal_id
            });

        } else {

            res.writeHead(301, { Location: `${url}/login` });
            res.end();
        }







    },
    forgetPassword: (req, res) => {

        var url = req.connection.encrypted ? 'https://' : 'http://' + req.hostname + ':' + port;

        res.render("Resetpass.ejs", {
            urlMain: url

        });

    }




}