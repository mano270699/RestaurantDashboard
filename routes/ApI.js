const express = require('express');
const router = express.Router();
const User = require("../models/User");
const Meal = require('../models/Meal'),
    Cat = require('../models/Cat'),
    Offer = require('../models/offer'),
    Customer = require('../models/Customer'),
    Order = require('../models/Order'),
    Slider = require('../models/Slider'),
    Feedback = require('../models/feedback'),

    fs = require('fs');

jwt = require('jsonwebtoken');
isEmpty = require('is-empty');
config = require('../config');
transporter = require('../sendMailer');


const { QueryTypes } = require('sequelize');
const sequelize = require('../config/database');
const Sequelize = require('sequelize');
const op = Sequelize.Op;
const urlDashBoard = "http://192.168.1.12:8081";


module.exports = {
    //Admin function
    getAdmin: (req, res) => {
        User.findAll({})
            .then(function(result) {
                console.log(result)

                return res.json(result, 200);

            });
        console.log("Done")

    },

    postlogPage: (req, res) => {
        var sess;
        sess = req.session;
        User.findOne({
            where: {
                email: req.body.emailuser,

            }
        }).then((user) => {

            if (!user) {

                res.status(400).send("email or password incorrect ");

            } else {
                if (user.password == req.body.passuser) {
                    sess.email = user.email;
                    sess.username = user.admin_name;
                    sess.password = user.password;
                    sess.image = user.admin_image;
                    sess.User_id = user.admin_id;

                    res.writeHead(301, { Location: `${urlDashBoard}/dashboard` });
                    res.end();
                } else {
                    res.status(400).send("email or password incorrect ");


                }

            }

        })

    },

    updateadmin: (req, res) => {
        let
            admin_name = req.body.admin_name,
            fileupload = req.files.admin_image,
            admin_id = req.params.id,
            email = req.body.email,
            password = req.body.password;

        var fileEx = fileupload.mimetype.split('/')[1];
        User.update({ admin_name: admin_name, email: email, password: password }, {
            where: {
                admin_id: admin_id
            }
        }).then((result) => {
            fileupload.mv('puplic/image/Admin/' + admin_id + "." + fileEx, (err) => {
                if (err) {
                    console.log(err);
                    return res.status(400).send({ msg: err + "for upload image" });
                }


            });

            let values = { admin_image: admin_id + "." + fileEx }
            User.update(values, { where: { admin_id: admin_id } }).then(updatedRecord => {
                console.log(`updated record ${JSON.stringify(updatedRecord, null, 2)}`)
                return res.status(200).send({ msg: "data Saved ture" });
            })


        })
        console.log('data updated Done');

    },


    //category Functions
    allcategory: (req, res) => {
        Cat.findAll({})
            .then(function(result) {
                console.log(result)
                category: result;
                return res.json(result, 200);

            });
        console.log("Done")

    },
    savecategory: (req, res) => {


        if (!req.files)
            return res.json({ msg: "no product image uploaded " }, 400);

        let errors = [];
        if (errors.length > 0) {
            res.json(errors, 400);
        } else {

            let
                cat_name = req.body.cat_name,

                fileupload = req.files.cat_image;

            console.log(fileupload);
            var cat_image = fileupload.name;

            var fileEx = fileupload.mimetype.split('/')[1];
            console.log(fileupload);
            //create product
            const newCategory = new Cat({ cat_name, cat_image });
            console.log(JSON.stringify(newCategory));
            newCategory.save()

            .then((newCategory) => {
                console.log("category added Succssfully :)  " + JSON.stringify(newCategory));
                fileupload.mv('puplic/image/category_images/' + newCategory.cat_id + "." + fileEx, (err) => {
                    if (err)
                        return res.json({ msg: err + "for upload image" }, 400);
                });



                let values = { cat_image: newCategory.cat_id + "." + fileEx }
                newCategory.update(values).then(updatedOne => {
                    console.log(`updated record ${JSON.stringify(updatedOne, null, 2)}`)
                    return res.json({ msg: "category created Succssfully :)  " }, 200);
                })



            }).catch((err) => {
                console.log(err)

            });
        }




    },
    updatecategory: (req, res) => {
        let
            cat_name = req.body.cat_name,

            fileupload = req.files.cat_image,

            cat_id = req.params.id;

        var fileEx = fileupload.mimetype.split('/')[1];
        Cat.update({ cat_name: cat_name }, {
            where: {
                cat_id: cat_id
            }
        }).then((result) => {
            fileupload.mv('puplic/image/category_images/' + cat_id + "." + fileEx, (err) => {
                if (err)
                    return res.status(400).send({ msg: err + "for upload image" });


            });

            let values = { cat_image: cat_id + "." + fileEx }
            Cat.update(values, { where: { cat_id: cat_id } }).then(updatedRecord => {
                console.log(`updated record ${JSON.stringify(updatedRecord, null, 2)}`)
                return res.status(200).send({ msg: "Category Updated successfully" });
            })


        })
        console.log('data updated Done');
    },
    deletecategory: (req, res) => {


        Cat.findAll({ where: { cat_id: req.params.id } }).then((results) => {

            console.log("Cat :" + JSON.stringify(results));

            results.forEach(element => {
                console.log("image :" + JSON.stringify(element.cat_image));
                fs.access('puplic/image/category_images/' + element.cat_image, fs.F_OK, (err) => {
                    if (err) {
                        return
                    }

                    fs.unlink('puplic/image/category_images/' + element.cat_image, (err) => {
                        if (err) throw err;
                    });
                });

            });

            Cat.destroy({
                where: {
                    cat_id: req.params.id
                }
            }).then((result) => {

                console.log(JSON.stringify(result));
                return res.status(200).send({ msg: " record deleted succssfully" })

            })

        });

    },

    //meal API
    allmealProdect: (req, res) => {
        Meal.findAll({})
            .then(function(result) {
                console.log(result)

                return res.json(result, 200);

            });
        console.log("Done")

    },
    mealProdectbyID: (req, res) => {
        let meal_id = req.params.id;
        Meal.findAll({ where: { meal_id: meal_id } })
            .then(function(result) {
                console.log(result)

                return res.json(result, 200);

            });
        console.log("Done")

    },

    addmealProdect: (req, res) => {
        if (!req.files)
            return res.status(400).send({ msg: "no product image uploaded " });

        let errors = [];
        if (errors.length > 0) {
            return res.status(400).send({ msg: errors });
        } else {

            let
                meal_name = req.body.meal_name,
                meal_price = req.body.meal_price,
                old_price = 0,
                description = req.body.description,
                fileupload = req.files.meal_image,
                cat_id = req.body.cat_id;

            console.log(fileupload);
            var meal_image = fileupload.name;

            var fileEx = fileupload.mimetype.split('/')[1];
            console.log(fileupload);
            //create product
            const newMeal = new Meal({
                meal_name,
                meal_image,
                meal_price,
                old_price,
                description,
                cat_id




            });


            console.log(JSON.stringify(newMeal));
            newMeal.save()

            .then((newMeal) => {
                console.log("Meal added Succssfully :)  " + JSON.stringify(newMeal));
                fileupload.mv('puplic/image/Meal_images/' + newMeal.meal_id + "." + fileEx, (err) => {
                    if (err)

                        return res.status(400).send({ msg: err + "for upload image" });
                });



                let values = { meal_image: newMeal.meal_id + "." + fileEx }
                newMeal.update(values).then(updatedOne => {
                    console.log(`updated record ${JSON.stringify(updatedOne, null, 2)}`)

                    return res.status(200).send({ msg: "Meal created Succssfully :" });

                })



            }).catch((err) => {
                console.log(err)


            });
        }

    },
    updatemealProdect: (req, res) => {

        if (!req.files)
            return res.status(400).send({ msg: "no product image uploaded " });
        let
            meal_name = req.body.meal_name,
            meal_price = req.body.meal_price,
            fileupload = req.files.meal_image,
            description = req.body.description,
            meal_id = req.params.id,
            cat_id = req.body.cat_id;



        var fileEx = fileupload.mimetype.split('/')[1];
        Meal.update({ meal_name: meal_name, meal_price: meal_price, description: description, cat_id: cat_id }, {
            where: {
                meal_id: meal_id
            }
        }).then((result) => {
            fileupload.mv('puplic/image/Meal_images/' + meal_id + "." + fileEx, (err) => {
                if (err)
                    return res.status(400).send({ msg: err + "for upload image" });


            });

            let values = { meal_image: meal_id + "." + fileEx }
            Meal.update(values, { where: { meal_id: meal_id } }).then(updatedRecord => {
                console.log(`updated record ${JSON.stringify(updatedRecord, null, 2)}`)
            })
            return res.status(200).send({ msg: "this record updated true" })


        })
        console.log('data updated Done');

    },
    deletemealProdect: (req, res) => {


        Meal.findAll({ where: { meal_id: req.params.id } }).then((results) => {

            console.log("Meal :" + JSON.stringify(results));

            results.forEach(element => {
                console.log("image :" + JSON.stringify(element.meal_image));
                fs.access('puplic/image/Meal_images/' + element.meal_image, fs.F_OK, (err) => {
                    if (err) {
                        return
                    }

                    fs.unlink('puplic/image/Meal_images/' + element.meal_image, (err) => {
                        if (err) throw err;
                    });
                });

            });
            Meal.destroy({
                where: {
                    meal_id: req.params.id
                }
            }).then((result) => {

                console.log(JSON.stringify(result));
                return res.status(200).send({ msg: " record deleted succssfully" })

            })

        });






    },




    //offer Api
    alloffers: (req, res) => {
        Meal.findAll({
                where: {
                    old_price: {
                        [op.not]: 0
                    }
                }
            })
            .then(function(result) {
                console.log(result)
                Meal: result;
                return res.json(result, 200);

            });
        console.log("Done")

    },
    addOffer: (req, res) => {

        let

            meal_price = req.body.meal_price,
            old_price = req.body.old_price,
            meal_id = req.body.meal_id;


        let values = { meal_price: meal_price, old_price: old_price }
        Meal.update(values, { where: { meal_id: meal_id } }).then(updatedRecord => {
            console.log(`updated record ${JSON.stringify(updatedRecord, null, 2)}`)
            return res.status(200).send({ msg: "this record updated true" })
        })










    },
    allMealin_Category: (req, res) => {
        let cat_id = req.params.id;
        Meal.findAll({ where: { cat_id: cat_id } })
            .then(function(result) {
                console.log(result)

                return res.json(result, 200);

            });
        console.log("Done")

    }


    ,
    updateoffer: (req, res) => {
        let
            meal_id = req.body.meal_id,
            discount = req.body.discount,
            new_price = req.body.new_price,
            cat_id = req.body.cat_id,
            offer_id = req.params.id;


        Offer.update({ meal_id: meal_id, discount: discount, new_price: new_price, cat_id: cat_id }, {
            where: {
                offer_id: offer_id
            }
        }).then((result) => {
            console.log(result)
            console.log("Offer Updated successfully")
            return res.status(200).json({ msg: "Offer Updated successfully" });

        })

    },
    deleteoffer: (req, res) => {
        let

            meal_price = req.body.meal_price,
            old_price = 0,
            meal_id = req.body.meal_id;

        console.log("meal_price:" + meal_price);
        console.log("old_price:" + old_price);
        console.log("meal_id:" + meal_id);
        let values = { meal_price: meal_price, old_price: old_price }
        Meal.update(values, { where: { meal_id: meal_id } }).then(updatedRecord => {
            console.log(`updated record ${JSON.stringify(updatedRecord, null, 2)}`)
            return res.status(200).send({ msg: "this record updated true" })
        })

    },
    //App User API
    allusers: (req, res) => {
        Customer.findAll({})
            .then(function(result) {
                console.log(result)

                return res.status(200).json(result);

            });
        console.log("Done")

    },

    updateAddressCustomer: (req, res) => {

        let
            address = req.body.address;


        Customer.update({ address: address }, {
            where: {
                customer_id: req.params.customer_id
            }
        }).then((result) => {
            console.log(result)

            return res.status(200).send({ error: false, msg: "this record updated true" })



        });


        console.log('User updated Done');

    },
    finduserbyID: (req, res) => {
        let customer_id = req.params.id;


        Customer.findOne({ where: { customer_id: customer_id } })
            .then(function(customer) {
                console.log(customer == null)

                if (customer != null)
                    return res.status(200).send({ error: false, msg: "U are user", customer_id: customer.customer_id, full_name: customer.full_name, email: customer.email, address: customer.address, birth_date: customer.birth_date, phone: customer.phone, image: customer.image, Blocked: customer.Blocked })
                else
                    return res.status(404).send({ error: true, msg: "Your account not exist" })

            });




        /*
                sequelize.query("SELECT * FROM `customer` WHERE `customer_id`=" +customer_id, { type: sequelize.QueryTypes.SELECT })
                    .then(function (result) {
                        return res.status(200).send(result);
        
                    })*/
    }




    ,
    addnewCustomer: ((req, res) => {
        let
            full_name = req.body.full_name,
            email = req.body.email,
            password = req.body.password,
            phone = req.body.phone;

        Customer.findOne({ where: { email: email } }).then(user => {
            if (user) {

                res.status(200).send({ error: true, msg: "Email already exists" });
            } else {
                var newCustomer = new Customer({
                    full_name: full_name,
                    email: email,
                    password: password,
                    phone: phone
                });


                newCustomer.save();
                res.status(200).send({ error: false, msg: "You are registerd and can now login" });


            }
        })








        /*let errors = [];
        if (errors.length > 0) {
            return res.status(400).send({ msg: errors });
        } else {

            let
                full_name = req.body.full_name,
                email = req.body.email,
                password = req.body.password,
                phone = req.body.phone;

            //create product
            const newCustomer = new Customer({
                full_name,
                email,
                password,
                phone
            });



            console.log(JSON.stringify(newCustomer));
            newCustomer.save()

                .then((newCustomer) => {

                    console.log("Customer added Succssfully :)  " + JSON.stringify(newCustomer));
                    return res.status(200).send({ error: false, msg: "Customer Created  Done" });

                }).catch((err) => {

                    if (err.parent.code == 'ER_DUP_ENTRY' || err.parent.errno == 1062) {
                        return res.send({ error: true, msg: "The email is already used, please choose another one or sign in" });
                    }

                });
        }*/


    }),
    updateUserData: (req, res) => {

        let
            full_name = req.body.full_name,
            email = req.body.email,
            phone = req.body.phone,
            customer_id = req.params.id;



        Customer.update({ full_name: full_name, email: email, phone: phone }, {
            where: {
                customer_id: customer_id
            }
        }).then((result) => {
            console.log(result)

            return res.status(200).send({ msg: "this record updated true" })



        });


        console.log('User updated Done');

    },
    customerLogin: (req, res) => {
        Customer.findOne({
            where: {
                email: req.body.email,

            }
        }).then((customer) => {

            if (!customer) {


                return res.status(404).send({ error: true, msg: "email or password is incorrect" })

            } else {
                console.log("user found");

                if (customer.password == req.body.password) {
                    console.log("correct password");
                    console.log("info user:" + customer);

                    return res.status(200).send({ error: false, msg: "U are user", customer_id: customer.customer_id, full_name: customer.full_name, address: customer.address, birth_date: customer.birth_date, phone: customer.phone, image: customer.image, Blocked: customer.Blocked })


                } else {
                    console.log("incorrect password");
                    return res.status(200).send({ error: true, msg: "email or password is incorrect" })



                }

            }

        })


    },
    blockuser: (req, res) => {


        Customer.update({ Blocked: 1 }, {
            where: {
                customer_id: req.params.id
            }
        }).then((result) => {
            console.log(result)

            return res.status(200).send({ msg: "this User is now Blocked" })



        });


        console.log('User updated Done');

    },
    unblockuser: (req, res) => {


        Customer.update({ Blocked: 0 }, {
            where: {
                customer_id: req.params.id
            }
        }).then((result) => {
            console.log(result)

            return res.status(200).send({ msg: "this User is now unBlocked" })



        });


        console.log('User updated Done');

    },
    //all orders
    allorder: (req, res) => {
        /*   Order.findAll({})
               .then(function (result) {
                   console.log(result)
   
                   return res.status(200).json(result);
   
               });
           console.log("Done")*/

        sequelize.query("SELECT * FROM `v_productsorder_data` ", { type: sequelize.QueryTypes.SELECT })
            .then(function(result) {
                return res.status(200).send(result);

            })

    },

    getAvalibleTable: (req, res) => {

        let date = req.params.date
        console.log(date)
        let selectQuery = "SELECT `restaurant_table`.`table_id` FROM `restaurant_table` where `restaurant_table`.`table_id` NOT IN (SELECT `booking_table`.`table_id` FROM `booking_table` WHERE `booking_table`.`date`='" + date + "' )"
        sequelize.query(selectQuery, { type: sequelize.QueryTypes.SELECT })
            .then(function(result) {
                return res.status(200).send(result);

            })

    },
    getCustomerBookTable: (req, res) => {
        let ts = Date.now();


        let date_ob = new Date(ts);
        let date = date_ob.getDate();
        let month = date_ob.getMonth() + 1;
        let year = date_ob.getFullYear();

        console.log(year + "-" + month + "-" + date)

        sequelize.query("SELECT * FROM `v_customer_table` WHERE date= '" + year + "-" + month + "-" + date + "'", { type: sequelize.QueryTypes.SELECT })
            .then(function(result) {
                return res.status(200).send(result);
            });



    },

    orderInDashboard: (req, res) => {

        sequelize.query("SELECT * FROM `v_productsorder_data` ORDER BY order_id DESC", { type: sequelize.QueryTypes.SELECT })
            .then(function(result) {
                return res.status(200).send(result);

            })



    },
    orderforspacialcustomer: (req, res) => {
        let customer_id = req.params.id;

        sequelize.query("SELECT * FROM `v_productsorder_data` WHERE `cutomer_id`=" + customer_id + " and isOrdered=1", { type: sequelize.QueryTypes.SELECT })
            .then(function(result) {
                return res.status(200).send(result);

            })

    },
    TotalPriceorderforspacialcustomer: (req, res) => {
        let customer_id = req.params.cutomer_id;
        let order_id = req.params.order_id;

        sequelize.query("SELECT * FROM `v_productsorder_data` WHERE `cutomer_id`=" + customer_id + " and isOrdered=0 and order_id=" + order_id + "", { type: sequelize.QueryTypes.SELECT })
            .then(function(result) {
                return res.status(200).send(result[0]);

            })

    },
    orderInOrderInfo: (req, res) => {
        let order_id = req.params.id;
        sequelize.query("SELECT * FROM `v_order_details`WHERE `order_id`=" + order_id, { type: sequelize.QueryTypes.SELECT })
            .then(function(result) {
                return res.status(200).send(result);

            })



    },
    allorderforCustomer: (req, res) => {
        //let customer_id=req.params.id;
        console.log("allorderforCustomer:" + req.params.id);

        /* Order.findAll({ where: { cutomer_id: req.params.id } })
             .then(function (result) {
                 console.log(result)
 
                 return res.status(200).json(result);
 
             });
         console.log("Done")*/



        sequelize.query("SELECT * FROM `v_productsorder_data`WHERE `cutomer_id`=" + req.params.id, { type: sequelize.QueryTypes.SELECT })
            .then(function(result) {
                return res.status(200).send(result);

            })

    },
    addSlider: (req, res) => {
        if (!req.files)
            return res.status(400).send({ msg: "no Slider image uploaded " });

        let errors = [];
        if (errors.length > 0) {
            return res.status(400).send({ msg: errors });
        } else {

            let
                fileupload = req.files.image,
                meal_id = req.body.meal_id;

            console.log(fileupload);
            var image = fileupload.name;

            var fileEx = fileupload.mimetype.split('/')[1];
            console.log(fileupload);
            //create product
            const newSlider = new Slider({
                image,

                meal_id
            });


            console.log(JSON.stringify(newSlider));
            newSlider.save()

            .then((newSlider) => {
                console.log("Slider image added Succssfully :)  " + JSON.stringify(newSlider));
                fileupload.mv('puplic/image/Slider/' + newSlider.slide_id + "." + fileEx, (err) => {
                    if (err)

                        return res.status(400).send({ msg: err + "for upload image" });
                });



                let values = { image: newSlider.slide_id + "." + fileEx }
                console.log("values=" + values);
                newSlider.update(values).then(updatedOne => {
                    console.log(`updated record ${JSON.stringify(updatedOne, null, 2)}`)

                    return res.status(200).send({ msg: "Slider created can u view " });

                })



            }).catch((err) => {
                console.log(err)


            });
        }

    },
    allSlider: (req, res) => {
        sequelize.query("SELECT * FROM `V_Slider`", { type: sequelize.QueryTypes.SELECT })
            .then(function(result) {
                return res.status(200).send(result);

            })

        console.log("Done")

    },
    deleteSlider: (req, res) => {
        Slider.findAll({ where: { slide_id: req.params.id } }).then((results) => {

            console.log("Slider :" + JSON.stringify(results));

            results.forEach(element => {
                console.log("image :" + JSON.stringify(element.image));
                fs.access('puplic/image/Slider/' + element.image, fs.F_OK, (err) => {
                    if (err) {
                        return res.status(400).send({ msg: err + "error for deleting image from server" })
                    }

                    fs.unlink('puplic/image/Slider/' + element.image, (err) => {
                        if (err)
                            return res.status(400).send({ msg: err + "error for deleting image from server" });
                    });
                });

            });

            Slider.destroy({
                where: {
                    slide_id: req.params.id
                }
            }).then((result) => {

                console.log(JSON.stringify(result));
                return res.status(200).send({ msg: " record deleted succssfully" })

            })

        });


    },
    allCustomerFeedbackMeal: (req, res) => {
        Feedback.findAll({ where: { meal_id: req.params.id } })
            .then(function(result) {
                console.log(result)

                return res.status(200).json(result);

            });
        console.log("Done")



    },

    addCustomerFeedbackMeal: (req, res) => {
        let date_ob = new Date();

        // current date
        // adjust 0 before single digit date
        var dates = ("0" + date_ob.getDate()).slice(-2);
        // current month
        var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
        // current year
        var year = date_ob.getFullYear();
        // current hours
        var hours = date_ob.getHours();
        // current minutes
        var minutes = date_ob.getMinutes();
        // current seconds
        var seconds = date_ob.getSeconds();
        // prints date in YYYY-MM-DD format

        var datedisplay = year + "-" + month + "-" + dates
        var timedisplay = hours + ":" + minutes + ":" + seconds;

        var dateString = datedisplay + " " + timedisplay;

        console.log("date_time" + dateString)
        insertQuery = "INSERT INTO `customer_feedback`(`customer_id`, `meal_id`,`comment`,`rate`,`date_time`) VALUES (" + req.body.customer_id + "," + req.body.meal_id + "," + "'" + req.body.comment + "'" + "," + req.body.rate + "," + "'" + dateString + "'" + ")";
        sequelize.query(insertQuery, { type: sequelize.QueryTypes.INSERT })
            .then(function(result) {
                return res.send({ error: false, msg: "feedback sent" });

            }).catch((err) => {

                console.log(err)
                if (err.parent.code == 'ER_DUP_ENTRY' || err.parent.errno == 1062) {
                    return res.send({ error: true, msg: "feedback is already saved" });
                }

            });
        /* const newFeedback = new Feedback({
        customer_id,
            meal_id,
            comment,
            rate,
            date_time

        });


        console.log(JSON.stringify(newFeedback));
        newFeedback.save()

            .then((newFeedback) => {
               
                return res.status(200).send("Feedback sended ");


            }).catch((err) => {
                return res.status(400).send("Error: " + err);


            });
*/









    },
    allCustomerComments: (req, res) => {
        var meal_id = req.params.meal_id;
        sequelize.query("SELECT * FROM `v_managecomment`WHERE `meal_id`=" + meal_id, { type: sequelize.QueryTypes.SELECT })
            .then(function(result) {
                if (result.length == 0)
                    return res.status(400).send("nothing comments");
                else
                    return res.status(200).send(result);

            })

    },
    deleteComment: (req, res) => {
        com_id = req.params.id;

        sequelize.query("DELETE FROM `customer_feedback` WHERE `customer_feedback`.`com_id` =" + com_id, { type: sequelize.QueryTypes.DELETE })
            .then(function(result) {
                return res.status(200).send(result);

            })
    },
    lostadminPassword: (req, res) => {
        let Emp_Email = req.body.email;

        var url = req.connection.encrypted ? 'https://' : 'http://' + req.hostname + ':' + port;



        let selectQuery = "SELECT `admin_name`,`email` FROM `admin` WHERE `email`='" + Emp_Email + "'";



        sequelize.query(selectQuery, { type: sequelize.QueryTypes.SELECT })
            .then(function(result) {
                if (result.length == 0)
                    return res.status(403).send({ error: true, msg: "No account found" });
                else {


                    var payload = { Emp_Email: Emp_Email };

                    var name = result[0].admin_name;
                    var gTokenPassword = jwt.sign(payload, config.key, { expiresIn: "60m" });
                    var link_ResetPassword = urlDashBoard + '/ChangePasswordEmp?token=' + gTokenPassword;
                    var logo = "https://i.ibb.co/Kqk0Dpc/food.png";
                    var oldTemplete = `'<div><div class="adM"></div><div style="text-align:center"><img src="' + ${logo} + '" style="width:200px" class="CToWUd"></div><div style="padding:20px;font-family:Verdana"><div style="text-align:center"><h5>Password Reset</h5></div><br><a href="` + link_ResetPassword + `" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://www.sarahah.com/Manage/ChangePassword&amp;source=gmail&amp;ust=1565570212951000&amp;usg=AFQjCNHAKb67p_zfdkaHNVxYMzIA7Q2txg">Click here to Reset your password.</a>   <div style="text-align:center;margin-top:50px;font-size:10px"> If you do not wish to receive this e-mail you can <a href="" style="font-weight:bold" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://www.sarahah.com/manage/DisableNotifications/&amp;source=gmail&amp;ust=1565570212951000&amp;usg=AFQjCNHDqyyteH-s75XxScN3qW5PH9hpKA">unsubscribe</a></div></div><div class="yj6qo"></div><div class="adL"></div></div>'`;
                    var templeteHtml = `<html style="width:100%;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0;"><head> <meta charset="UTF-8"> <meta content="width=device-width, initial-scale=1" name="viewport"> <meta name="x-apple-disable-message-reformatting"> <meta http-equiv="X-UA-Compatible" content="IE=edge"> <meta content="telephone=no" name="format-detection"> <title>New Template</title> <!--[if (mso 16)]><style type="text/css"> a {text-decoration: none;} </style><![endif]--> <!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]--> <style type="text/css">@media only screen and (max-width:600px) {p, ul li, ol li, a { font-size:16px!important; line-height:150%!important } h1 { font-size:20px!important; text-align:center; line-height:120%!important } h2 { font-size:16px!important; text-align:left;
                line-height:120%!important } h3 { font-size:20px!important; text-align:center; line-height:120%!important } h1 a { font-size:20px!important } h2 a { font-size:16px!important; text-align:left } h3 a { font-size:20px!important } .es-menu td a { font-size:14px!important } .es-header-body p, .es-header-body ul li, .es-header-body ol li, .es-header-body a { font-size:10px!important } .es-footer-body p, .es-footer-body ul li, .es-footer-body ol li, .es-footer-body a { font-size:12px!important } .es-infoblock p, .es-infoblock ul li, .es-infoblock ol li, .es-infoblock a { font-size:12px!important } *[class="gmail-fix"] { display:none!important } .es-m-txt-c, .es-m-txt-c h1, .es-m-txt-c h2, .es-m-txt-c h3 { text-align:center!important } .es-m-txt-r, .es-m-txt-r h1, .es-m-txt-r h2, .es-m-txt-r h3 { text-align:right!important } .es-m-txt-l, .es-m-txt-l h1, .es-m-txt-l h2, .es-m-txt-l h3 { text-align:left!important } .es-m-txt-r img, .es-m-txt-c img, .es-m-txt-l img { display:inline!important } .es-button-border { display:block!important } a.es-button {
                font-size:14px!important; display:block!important; border-left-width:0px!important; border-right-width:0px!important } .es-btn-fw { border-width:10px 0px!important; text-align:center!important } .es-adaptive table, .es-btn-fw, .es-btn-fw-brdr, .es-left, .es-right { width:100%!important } .es-content table, .es-header table, .es-footer table, .es-content, .es-footer, .es-header { width:100%!important; max-width:600px!important } .es-adapt-td { display:block!important; width:100%!important } .adapt-img { width:100%!important; height:auto!important } .es-m-p0 { padding:0px!important } .es-m-p0r { padding-right:0px!important } .es-m-p0l { padding-left:0px!important } .es-m-p0t { padding-top:0px!important } .es-m-p0b { padding-bottom:0!important } .es-m-p20b { padding-bottom:20px!important } .es-mobile-hidden, .es-hidden { display:none!important } .es-desk-hidden { display:table-row!important; width:auto!important; overflow:visible!important; float:none!important; max-height:inherit!important;
                line-height:inherit!important } .es-desk-menu-hidden { display:table-cell!important } table.es-table-not-adapt, .esd-block-html table { width:auto!important } table.es-social { display:inline-block!important } table.es-social td { display:inline-block!important } }#outlook a {   padding:0;}.ExternalClass { width:100%;}.ExternalClass,.ExternalClass p,.ExternalClass span,.ExternalClass font,.ExternalClass td,.ExternalClass div {  line-height:100%;}.es-button {  mso-style-priority:100!important;   text-decoration:none!important;}a[x-apple-data-detectors] { color:inherit!important;    text-decoration:none!important; font-size:inherit!important;    font-family:inherit!important;  font-weight:inherit!important;  line-height:inherit!important;}.es-desk-hidden {    display:none;   float:left; overflow:hidden;    width:0;    max-height:0;   line-height:0;  mso-hide:all;}.es-button-border:hover a.es-button { background:#ffffff!important;   border-color:#ffffff!important;}.es-button-border:hover
                {   background:#ffffff!important;   border-style:solid solid solid solid!important; border-color:#3d5ca3 #3d5ca3 #3d5ca3 #3d5ca3!important;}</style> </head> <body style="width:100%;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0;"> <div class="es-wrapper-color" style="background-color:#FAFAFA;"> <!--[if gte mso 9]><v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t"> <v:fill type="tile" color="#fafafa"></v:fill> </v:background><![endif]--> <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-repeat:repeat;background-position:center top;"> <tbody><tr style="border-collapse:collapse;"> <td valign="top" style="padding:0;Margin:0;"> <table class="es-content" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;"> <tbody><tr style="border-collapse:collapse;"> <td class="es-info-area" style="padding:0;Margin:0;background-color:#FAFAFA;" bgcolor="#fafafa" align="center"> <table class="es-content-body" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FAFAFA;" width="600" cellspacing="0" cellpadding="0" bgcolor="#fafafa" align="center"> <tbody><tr style="border-collapse:collapse;"> <td style="Margin:0;padding-bottom:5px;padding-top:20px;padding-left:20px;padding-right:20px;background-position:left top;" align="left"> <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;"> <tbody><tr style="border-collapse:collapse;"> <td width="560" valign="top" align="center" style="padding:0;Margin:0;"> <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;"> <tbody><tr style="border-collapse:collapse;"> <td class="es-infoblock" align="center" style="padding:0;Margin:0;padding-bottom:5px;line-height:14px;font-size:12px;color:#CCCCCC;"></td> </tr> </tbody></table></td> </tr> </tbody></table></td> </tr> </tbody></table></td> </tr> </tbody></table> <table class="es-content" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;"> <tbody><tr style="border-collapse:collapse;"> <td style="padding:0;Margin:0;background-color:#FAFAFA;" bgcolor="#fafafa" align="center"> <table class="es-content-body" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;" width="600" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center"> <tbody><tr style="border-collapse:collapse;"> <td style="Margin:0;padding-top:10px;padding-left:20px;padding-right:20px;padding-bottom:30px;border-radius:10px 10px 0px 0px;background-color: #0B5394;background-position:left top;" bgcolor="transparent" align="left"> <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;"> <tbody><tr style="border-collapse:collapse;"> <td width="560" valign="top" align="center" style="padding:0;Margin:0;"> <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;"> <tbody><tr style="border-collapse:collapse;">  </tr> <tr style="border-collapse:collapse;"> <td align="center" style="padding:0;Margin:0;padding-top:10px;">
<h1 style="margin:0;
    font-weight: 300;
    line-height: 1.2;
    font-size: 3rem;
    font-family: -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,'Noto Sans',sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol','Noto Color Emoji';
    font-style:normal;
    color:#FFFFFF;
    ">King Burger</h1>
</td> </tr> <tr style="border-collapse:collapse;">  </tr> </tbody></table></td> </tr> </tbody></table></td> </tr> <tr style="border-collapse:collapse;"> <td style="padding:0;Margin:0;padding-left:20px;padding-right:20px;padding-top:40px;background-color:transparent;background-position:left top;" bgcolor="transparent" align="left"> <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;"> <tbody><tr style="border-collapse:collapse;"> <td width="560" valign="top" align="center" style="padding:0;Margin:0;"> <table style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-position:left top;" width="100%" cellspacing="0" cellpadding="0"> <tbody><tr style="border-collapse:collapse;"> <td align="center" style="padding:0;Margin:0;padding-top:5px;padding-bottom:5px;"><img src="https://qbsgq.stripocdn.email/content/guids/CABINET_905af03e8709229f1b10ad7414dc1531/images/23891556799905703.png" alt="" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic;" width="160" height="189.92"></td> </tr> <tr style="border-collapse:collapse;"> <td align="center" style="padding:0;Margin:0;padding-top:15px;padding-bottom:15px;"><h1 style="Margin:0;line-height:24px;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:20px;font-style:normal;font-weight:normal;color:#333333;"><strong>FORGOT YOUR </strong></h1><h1 style="Margin:0;line-height:24px;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:20px;font-style:normal;font-weight:normal;color:#333333;"><strong>&nbsp;PASSWORD?</strong></h1></td> </tr> <tr style="border-collapse:collapse;"> <td align="center" style="padding:0;Margin:0;padding-left:40px;padding-right:40px;"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:16px;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;line-height:24px;color:#666666;">Dear,&nbsp;` + name + `</p></td> </tr> <tr style="border-collapse:collapse;"> <td align="center" style="padding:0;Margin:0;padding-right:35px;padding-left:40px;"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:16px;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;line-height:24px;color:#666666;">There
                was a request to change your password!</p></td> </tr> <tr style="border-collapse:collapse;"> <td align="center" style="padding:0;Margin:0;padding-top:25px;padding-left:40px;padding-right:40px;"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:16px;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;line-height:24px;color:#666666;">If did not make this request, just ignore this email. Otherwise, please click the button below to change your password:</p></td> </tr> <tr style="border-collapse:collapse;"> <td align="center" style="Margin:0;padding-left:10px;padding-right:10px;padding-top:40px;padding-bottom:40px;"><span class="es-button-border" style="border-style:solid;border-color:#3D5CA3;background:#FFFFFF;border-width:2px;display:inline-block;border-radius:10px;width:auto;"><a href="` + link_ResetPassword + `" class="es-button" target="_blank" style="mso-style-priority:100
                !important;text-decoration:none;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:14px;color:#3D5CA3;border-style:solid;border-color:#FFFFFF;border-width:15px 20px 15px 20px;display:inline-block;background:#FFFFFF;border-radius:10px;font-weight:bold;font-style:normal;line-height:17px;width:auto;text-align:center;">RESET PASSWORD</a></span></td> </tr> </tbody></table></td> </tr> </tbody></table></td> </tr> <tr style="border-collapse:collapse;"> <td style="padding:0;Margin:0;padding-left:10px;padding-right:10px;padding-top:20px;background-position:center center;" align="left"> <!--[if mso]><table width="580" cellpadding="0" cellspacing="0"><tr><td width="199" valign="top"><![endif]--> <table class="es-left" cellspacing="0" cellpadding="0" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left;"> <tbody><tr style="border-collapse:collapse;"> <td width="199" align="left" style="padding:0;Margin:0;"> <table style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-position:center center;" width="100%" cellspacing="0" cellpadding="0"> <tbody><tr style="border-collapse:collapse;"> <td class="es-m-txt-c" align="right" style="padding:0;Margin:0;padding-top:15px;"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:16px;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;line-height:24px;color:#666666;"><strong>Follow us:</strong></p></td> </tr> </tbody></table></td> </tr> </tbody></table> <!--[if mso]></td><td width="20"></td><td width="361" valign="top"><![endif]--> <table class="es-right" cellspacing="0" cellpadding="0" align="right" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right;"> <tbody><tr style="border-collapse:collapse;"> <td width="361" align="left" style="padding:0;Margin:0;"> <table style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-position:center center;" width="100%" cellspacing="0" cellpadding="0"> <tbody><tr style="border-collapse:collapse;"> <td class="es-m-txt-c" align="left" style="padding:0;Margin:0;padding-bottom:5px;padding-top:10px;"> <table class="es-table-not-adapt es-social" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;"> <tbody><tr style="border-collapse:collapse;"> <td valign="top" align="center" style="padding:0;Margin:0;padding-right:10px;"><img src="https://qbsgq.stripocdn.email/content/assets/img/social-icons/rounded-gray/facebook-rounded-gray.png" alt="Fb" title="Facebook" width="32" height="32" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic;"></td> <td valign="top" align="center" style="padding:0;Margin:0;padding-right:10px;"><img src="https://qbsgq.stripocdn.email/content/assets/img/social-icons/rounded-gray/twitter-rounded-gray.png" alt="Tw" title="Twitter" width="32" height="32" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic;"></td> <td valign="top" align="center" style="padding:0;Margin:0;padding-right:10px;"><img src="https://qbsgq.stripocdn.email/content/assets/img/social-icons/rounded-gray/instagram-rounded-gray.png" alt="Ig" title="Instagram" width="32" height="32" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic;"></td> <td valign="top" align="center" style="padding:0;Margin:0;padding-right:10px;"><img src="https://qbsgq.stripocdn.email/content/assets/img/social-icons/rounded-gray/youtube-rounded-gray.png" alt="Yt" title="Youtube" width="32" height="32" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic;"></td> <td valign="top" align="center" style="padding:0;Margin:0;padding-right:10px;"><img src="https://qbsgq.stripocdn.email/content/assets/img/social-icons/rounded-gray/linkedin-rounded-gray.png" alt="In" title="Linkedin" width="32" height="32" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic;"></td> </tr> </tbody></table></td> </tr> </tbody></table></td> </tr> </tbody></table> <!--[if mso]></td></tr></table><![endif]--></td> </tr> <tr style="border-collapse:collapse;"> <td style="Margin:0;padding-top:5px;padding-bottom:20px;padding-left:20px;padding-right:20px;background-position:left top;" align="left"> <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;"> <tbody><tr style="border-collapse:collapse;"> <td width="560" valign="top" align="center" style="padding:0;Margin:0;"> <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;"> <tbody><tr style="border-collapse:collapse;"> <td align="center" style="padding:0;Margin:0;"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;line-height:21px;color:#666666;">Contact us: +201064754874 | <a target="_blank" href="mailto:likefb2019@gmail.com" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;font-size:14px;text-decoration:none;color:#666666;">info@kingburger.com</a></p></td> </tr> </tbody></table></td> </tr> </tbody></table></td> </tr> </tbody></table></td> </tr> </tbody></table> <table class="es-footer" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;background-color:transparent;background-repeat:repeat;background-position:center top;"> <tbody><tr style="border-collapse:collapse;"> <td style="padding:0;Margin:0;background-color:#FAFAFA;" bgcolor="#fafafa" align="center"> <table class="es-footer-body" width="600" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;"> <tbody><tr style="border-collapse:collapse;"> <td style="Margin:0;padding-top:10px;padding-left:20px;padding-right:20px;padding-bottom:30px;border-radius:0px 0px 10px 10px;background-color:#0B5394;background-position:left top;" bgcolor="#0b5394" align="left"> <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;"> <tbody><tr style="border-collapse:collapse;"> <td width="560" valign="top" align="center" style="padding:0;Margin:0;"> <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;"> <tbody><tr style="border-collapse:collapse;"> <td align="left" style="padding:0;Margin:0;padding-top:5px;padding-bottom:5px;"><h2 style="Margin:0;line-height:19px;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:16px;font-style:normal;font-weight:normal;color:#FFFFFF;"><strong>Have quastions?</strong></h2></td> </tr> <tr style="border-collapse:collapse;"> <td align="left" style="padding:0;Margin:0;padding-bottom:5px;"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:helvetica, 'helvetica neue',
                arial, verdana, sans-serif;line-height:21px;color:#FFFFFF;">We are here to help, learn more about us <a target="_blank" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;font-size:14px;text-decoration:none;color:#FFFFFF;" href="">here</a></p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;line-height:21px;color:#FFFFFF;">or <a target="_blank" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;font-size:14px;text-decoration:none;color:#FFFFFF;" href="">contact us</a><br></p></td> </tr> </tbody></table></td> </tr> </tbody></table></td> </tr> </tbody></table></td> </tr> </tbody></table> <table class="es-content" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;"> <tbody><tr style="border-collapse:collapse;"> <td style="padding:0;Margin:0;background-color:#FAFAFA;" bgcolor="#fafafa" align="center"> <table class="es-content-body" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;" width="600" cellspacing="0" cellpadding="0" bgcolor="transparent" align="center"> <tbody><tr style="border-collapse:collapse;"> <td style="padding:0;Margin:0;padding-top:15px;background-position:left top;" align="left"> <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;"> <tbody><tr style="border-collapse:collapse;"> <td width="600" valign="top" align="center" style="padding:0;Margin:0;"> <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;"> <tbody><tr style="border-collapse:collapse;"> <td align="center" style="padding:0;Margin:0;padding-bottom:20px;padding-left:20px;padding-right:20px;"> <table width="100%" height="100%" cellspacing="0" cellpadding="0" border="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;"> <tbody><tr style="border-collapse:collapse;"> <td style="padding:0;Margin:0px;border-bottom:1px solid #FAFAFA;background:none;height:1px;width:100%;margin:0px;"></td> </tr> </tbody></table></td> </tr> </tbody></table></td> </tr> </tbody></table></td> </tr> </tbody></table></td> </tr> </tbody></table> <table class="es-footer" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;background-color:transparent;background-repeat:repeat;background-position:center top;"> <tbody><tr style="border-collapse:collapse;"> <td style="padding:0;Margin:0;background-color:#FAFAFA;" bgcolor="#fafafa" align="center"> <table class="es-footer-body" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;" width="600" cellspacing="0" cellpadding="0" bgcolor="transparent" align="center"> <tbody><tr style="border-collapse:collapse;"> <td align="left" style="Margin:0;padding-bottom:5px;padding-top:15px;padding-left:20px;padding-right:20px;"> <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;"> <tbody><tr style="border-collapse:collapse;"> <td width="560" valign="top" align="center" style="padding:0;Margin:0;"> <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;"> <tbody><tr style="border-collapse:collapse;"> <td align="center" style="padding:0;Margin:0;"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:12px;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;line-height:18px;color:#666666;">This daily newsletter was sent to likefb2019@gmail.com from company name because you subscribed. If you would not like to receive this email <a target="_blank" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;font-size:12px;text-decoration:underline;color:#333333;" href="">unsubscribe here</a>.</p></td> </tr> </tbody></table></td> </tr> </tbody></table></td> </tr> </tbody></table></td> </tr> </tbody></table> </td> </tr> </tbody></table> </div> 
             </body></html>`;
                    var mailOptions = {
                        from: '"Restaurant 🍔" <likefb2019@gmail.com>',
                        to: Emp_Email,
                        subject: 'Your KingBurger account - Forgot your password?',
                        text: 'Dear   ' + name + ',\nDid you forget your password? No problem - open link  below to change it now\n!' + link_ResetPassword,
                        html: templeteHtml
                    };
                    transporter.sendMail(mailOptions, function(error, info) {
                        if (error) {
                            console.log('error sent: ' + error);
                            return res.send({ error: true, msg: error });
                        } else {
                            console.log('Email sent: ' + info.response);
                            res.status(200).send({ msg: "Check Your Email " + name });
                        }
                    });

                }



            });



    },
    ChangePasswordEmp: (req, res) => {
        var url = req.connection.encrypted ? 'https://' : 'http://' + req.hostname + ':' + port;





        var token = req.query.token;

        if (token) {
            jwt.verify(token, config.key, function(err, decode) {

                if (err) return res.render("404.ejs", {
                    title: "This link is not valid anymore.",
                    urlMain: url

                });
                else {
                    res.render("ChangePasswordEmp.ejs", {
                        title: "Change Password Employee",
                        token: token,
                        email: decode.Emp_Email,
                        urlMain: url

                    });

                }
            });
        } else {
            return res.status(403).send('No token');

        }

    },

    setNewPasswordEmp: (req, res) => {

        var url = req.connection.encrypted ? 'https://' : 'http://' + req.hostname + ':' + port;




        var token = req.body.token;


        if (token) {
            jwt.verify(token, config.key, function(err, decode) {

                if (err) return res.render("404.ejs", {
                    title: "This link is not valid anymore.",
                    urlMain: url

                });
                else {

                    var newPassEmp = req.body.newPassEmp;
                    if (!isEmpty(newPassEmp)) {

                        if (newPassEmp.length >= 6) {
                            updatePasswordEmp = "UPDATE `admin` SET `password`='" + newPassEmp + "' WHERE `email`='" + decode.Emp_Email + "'";
                            sequelize.query(updatePasswordEmp, { type: sequelize.QueryTypes.UPDATE })
                                .then(function(result) {
                                    return res.status(200).send(result);

                                })
                        } else {
                            res.status(400).send({ msg: "please enter a password at least 6 characters long." });

                        }


                    } else {
                        res.status(400).send({ msg: "please write new password." });


                    }
                }
            });
        } else {
            return res.status(403).send('No token');

        }



    },
    getTotalOrders: (req, res) => {

        let selectQuery = "SELECT COUNT(*) as 'TotalOrders' FROM `customer_order`";
        sequelize.query(selectQuery, { type: sequelize.QueryTypes.SELECT })
            .then(function(result) {
                return res.status(200).send(result);

            })
    },
    getTotalAcceptOrders: (req, res) => {

        let selectQuery = "SELECT COUNT(*) as 'TotalAcceptOrders' FROM `customer_order` WHERE `status`!='Cancel' And  `status`!='New_Order'"
        sequelize.query(selectQuery, { type: sequelize.QueryTypes.SELECT })
            .then(function(result) {
                return res.status(200).send(result);

            })
    },
    getTotalTodayOrders: (req, res) => {


        // moment().format('YYYY-MM-DD HH:mm:ss')
        let d = new Date();
        let day = d.getDate().toString().padStart(2, "0");
        let Month = (d.getMonth() + 1).toString().padStart(2, "0");
        let year = d.getFullYear();

        let DateNow = year + "-" + Month + "-" + day;
        console.log(DateNow);
        let selectQuery = "SELECT COUNT(*) as 'TotalTodayOrders' FROM `customer_order` WHERE `date`='" + DateNow + "'";


        sequelize.query(selectQuery, { type: sequelize.QueryTypes.SELECT })
            .then(function(result) {
                return res.status(200).send(result);

            })
    },
    userToken: (req, res) => {
        let
            token = req.body.token;


        Customer.update({ token: token }, {
            where: {
                customer_id: req.params.id
            }
        }).then((result) => {
            console.log(result)

            return res.status(200).send({ error: false, msg: "this record updated true" })



        });






    }

    ,
    updateOrderStatus: (req, res) => {


        var url = req.connection.encrypted ? 'https://' : 'http://' + req.hostname + ':' + port;


        let order_id = req.body.orderID;

        updatePasswordEmp = "UPDATE `customer_order` SET `status`='" + req.body.status + "' WHERE `order_id`='" + order_id + "'";
        sequelize.query(updatePasswordEmp, { type: sequelize.QueryTypes.UPDATE })
            .then(function(result) {
                var request = require('request');

                console.log("order_id: " + order_id)

                var optionsdata = {
                    'method': 'GET',
                    'url': `${url}/getorderinfobyID/` + order_id,
                    'headers': {

                    }
                };


                request(optionsdata, function(error, response) {
                    if (error)
                        throw new Error(error);
                    let order_info = JSON.parse(response.body);


                    console.log("status: " + '"' + order_info[0].status + '"')
                    console.log("orderid: " + '"' + order_info[0].order_id + '"')
                    console.log("date: " + '"' + order_info[0].date + '"')
                    console.log("time: " + '"' + order_info[0].time + '"')
                    console.log("token: " + '"' + order_info[0].token + '"')
                    console.log("cutomer_id: " + '"' + order_info[0].cutomer_id + '"')

                    var options = {
                        'method': 'POST',
                        'url': 'https://fcm.googleapis.com/fcm/send',
                        'headers': {
                            'Content-Type': 'application/json',
                            'Authorization': 'key=AAAAArp_XS8:APA91bFqahhNctwJ1QKTvAqFOSfhpoZz78eL0XbQXdDi5hD_ZNTqLTvW2forvzehQW0m3UzsFq04QWA5UxqI7CdW-c5f6LVgwteLlIRpVTXX7s568cVO9_ikQQXZRIpNVgscQR9IRS7u'
                        },
                        body: JSON.stringify({
                            "to": order_info[0].token,
                            "notification": {
                                "body": "Order Status updeted to " + order_info[0].status,
                                "Title": " Order Status "
                            },
                            "data": {
                                "id": order_info[0].order_id,
                                "date": order_info[0].date,
                                "time": order_info[0].time,
                                "price": order_info[0].total_price,
                                "status": order_info[0].status,
                                "num_item": order_info[0].Num_items,
                                "paymentMethod": order_info[0].payment_method,
                                "deliveryMethod": order_info[0].delivery_method,
                                "cutomer_id": order_info[0].cutomer_id
                            }
                        })

                    };
                    request(options, function(error, response) {
                        if (error) throw new Error(error);
                        console.log(response.body);
                    });


                });



                return res.status(200).send(result);

            })
    }


    ,
    getorderinfobyID: (req, res) => {

        let order_id = req.params.id;
        sequelize.query("SELECT * FROM `v_productsorder_data` where order_id=" + order_id, { type: sequelize.QueryTypes.SELECT })
            .then(function(result) {
                return res.status(200).send(result);

            })
    }




    ,
    lostUserPassword: (req, res) => {
        let Emp_Email = req.body.email;
        var url = req.connection.encrypted ? 'https://' : 'http://' + req.hostname + ':' + port;



        let selectQuery = "SELECT `full_name`,`email` FROM `customer` WHERE `email`='" + Emp_Email + "'";



        sequelize.query(selectQuery, { type: sequelize.QueryTypes.SELECT })
            .then(function(result) {
                if (result.length == 0)
                    return res.status(403).send({ error: true, msg: "No account found" });
                else {


                    var payload = { Emp_Email: Emp_Email };

                    var name = result[0].full_name;
                    var gTokenPassword = jwt.sign(payload, config.key, { expiresIn: "60m" });
                    var link_ResetPassword = urlDashBoard + '/ChangePasswordUser?token=' + gTokenPassword;
                    var logo = "https://i.ibb.co/MscRBtG/android-chrome-384x384.png";
                    var oldTemplete = `'<div><div class="adM"></div><div style="text-align:center"><img src="' + ${logo} + '" style="width:200px" class="CToWUd"></div><div style="padding:20px;font-family:Verdana"><div style="text-align:center"><h5>Password Reset</h5></div><br><a href="` + link_ResetPassword + `" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://www.sarahah.com/Manage/ChangePassword&amp;source=gmail&amp;ust=1565570212951000&amp;usg=AFQjCNHAKb67p_zfdkaHNVxYMzIA7Q2txg">Click here to Reset your password.</a>   <div style="text-align:center;margin-top:50px;font-size:10px"> If you do not wish to receive this e-mail you can <a href="" style="font-weight:bold" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://www.sarahah.com/manage/DisableNotifications/&amp;source=gmail&amp;ust=1565570212951000&amp;usg=AFQjCNHDqyyteH-s75XxScN3qW5PH9hpKA">unsubscribe</a></div></div><div class="yj6qo"></div><div class="adL"></div></div>'`;
                    var templeteHtml = `<html style="width:100%;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0;"><head> <meta charset="UTF-8"> <meta content="width=device-width, initial-scale=1" name="viewport"> <meta name="x-apple-disable-message-reformatting"> <meta http-equiv="X-UA-Compatible" content="IE=edge"> <meta content="telephone=no" name="format-detection"> <title>New Template</title> <!--[if (mso 16)]><style type="text/css"> a {text-decoration: none;} </style><![endif]--> <!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]--> <style type="text/css">@media only screen and (max-width:600px) {p, ul li, ol li, a { font-size:16px!important; line-height:150%!important } h1 { font-size:20px!important; text-align:center; line-height:120%!important } h2 { font-size:16px!important; text-align:left;
                line-height:120%!important } h3 { font-size:20px!important; text-align:center; line-height:120%!important } h1 a { font-size:20px!important } h2 a { font-size:16px!important; text-align:left } h3 a { font-size:20px!important } .es-menu td a { font-size:14px!important } .es-header-body p, .es-header-body ul li, .es-header-body ol li, .es-header-body a { font-size:10px!important } .es-footer-body p, .es-footer-body ul li, .es-footer-body ol li, .es-footer-body a { font-size:12px!important } .es-infoblock p, .es-infoblock ul li, .es-infoblock ol li, .es-infoblock a { font-size:12px!important } *[class="gmail-fix"] { display:none!important } .es-m-txt-c, .es-m-txt-c h1, .es-m-txt-c h2, .es-m-txt-c h3 { text-align:center!important } .es-m-txt-r, .es-m-txt-r h1, .es-m-txt-r h2, .es-m-txt-r h3 { text-align:right!important } .es-m-txt-l, .es-m-txt-l h1, .es-m-txt-l h2, .es-m-txt-l h3 { text-align:left!important } .es-m-txt-r img, .es-m-txt-c img, .es-m-txt-l img { display:inline!important } .es-button-border { display:block!important } a.es-button {
                font-size:14px!important; display:block!important; border-left-width:0px!important; border-right-width:0px!important } .es-btn-fw { border-width:10px 0px!important; text-align:center!important } .es-adaptive table, .es-btn-fw, .es-btn-fw-brdr, .es-left, .es-right { width:100%!important } .es-content table, .es-header table, .es-footer table, .es-content, .es-footer, .es-header { width:100%!important; max-width:600px!important } .es-adapt-td { display:block!important; width:100%!important } .adapt-img { width:100%!important; height:auto!important } .es-m-p0 { padding:0px!important } .es-m-p0r { padding-right:0px!important } .es-m-p0l { padding-left:0px!important } .es-m-p0t { padding-top:0px!important } .es-m-p0b { padding-bottom:0!important } .es-m-p20b { padding-bottom:20px!important } .es-mobile-hidden, .es-hidden { display:none!important } .es-desk-hidden { display:table-row!important; width:auto!important; overflow:visible!important; float:none!important; max-height:inherit!important;
                line-height:inherit!important } .es-desk-menu-hidden { display:table-cell!important } table.es-table-not-adapt, .esd-block-html table { width:auto!important } table.es-social { display:inline-block!important } table.es-social td { display:inline-block!important } }#outlook a {   padding:0;}.ExternalClass { width:100%;}.ExternalClass,.ExternalClass p,.ExternalClass span,.ExternalClass font,.ExternalClass td,.ExternalClass div {  line-height:100%;}.es-button {  mso-style-priority:100!important;   text-decoration:none!important;}a[x-apple-data-detectors] { color:inherit!important;    text-decoration:none!important; font-size:inherit!important;    font-family:inherit!important;  font-weight:inherit!important;  line-height:inherit!important;}.es-desk-hidden {    display:none;   float:left; overflow:hidden;    width:0;    max-height:0;   line-height:0;  mso-hide:all;}.es-button-border:hover a.es-button { background:#ffffff!important;   border-color:#ffffff!important;}.es-button-border:hover
                {   background:#ffffff!important;   border-style:solid solid solid solid!important; border-color:#3d5ca3 #3d5ca3 #3d5ca3 #3d5ca3!important;}</style> </head> <body style="width:100%;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0;"> <div class="es-wrapper-color" style="background-color:#FAFAFA;"> <!--[if gte mso 9]><v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t"> <v:fill type="tile" color="#fafafa"></v:fill> </v:background><![endif]--> <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-repeat:repeat;background-position:center top;"> <tbody><tr style="border-collapse:collapse;"> <td valign="top" style="padding:0;Margin:0;"> <table class="es-content" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;"> <tbody><tr style="border-collapse:collapse;"> <td class="es-info-area" style="padding:0;Margin:0;background-color:#FAFAFA;" bgcolor="#fafafa" align="center"> <table class="es-content-body" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FAFAFA;" width="600" cellspacing="0" cellpadding="0" bgcolor="#fafafa" align="center"> <tbody><tr style="border-collapse:collapse;"> <td style="Margin:0;padding-bottom:5px;padding-top:20px;padding-left:20px;padding-right:20px;background-position:left top;" align="left"> <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;"> <tbody><tr style="border-collapse:collapse;"> <td width="560" valign="top" align="center" style="padding:0;Margin:0;"> <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;"> <tbody><tr style="border-collapse:collapse;"> <td class="es-infoblock" align="center" style="padding:0;Margin:0;padding-bottom:5px;line-height:14px;font-size:12px;color:#CCCCCC;"></td> </tr> </tbody></table></td> </tr> </tbody></table></td> </tr> </tbody></table></td> </tr> </tbody></table> <table class="es-content" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;"> <tbody><tr style="border-collapse:collapse;"> <td style="padding:0;Margin:0;background-color:#FAFAFA;" bgcolor="#fafafa" align="center"> <table class="es-content-body" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;" width="600" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center"> <tbody><tr style="border-collapse:collapse;"> <td style="Margin:0;padding-top:10px;padding-left:20px;padding-right:20px;padding-bottom:30px;border-radius:10px 10px 0px 0px;background-color: #0B5394;background-position:left top;" bgcolor="transparent" align="left"> <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;"> <tbody><tr style="border-collapse:collapse;"> <td width="560" valign="top" align="center" style="padding:0;Margin:0;"> <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;"> <tbody><tr style="border-collapse:collapse;">  </tr> <tr style="border-collapse:collapse;"> <td align="center" style="padding:0;Margin:0;padding-top:10px;">
<h1 style="margin:0;
    font-weight: 300;
    line-height: 1.2;
    font-size: 3rem;
    font-family: -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,'Noto Sans',sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol','Noto Color Emoji';
    font-style:normal;
    color:#FFFFFF;
    ">King Burger</h1>
</td> </tr> <tr style="border-collapse:collapse;">  </tr> </tbody></table></td> </tr> </tbody></table></td> </tr> <tr style="border-collapse:collapse;"> <td style="padding:0;Margin:0;padding-left:20px;padding-right:20px;padding-top:40px;background-color:transparent;background-position:left top;" bgcolor="transparent" align="left"> <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;"> <tbody><tr style="border-collapse:collapse;"> <td width="560" valign="top" align="center" style="padding:0;Margin:0;"> <table style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-position:left top;" width="100%" cellspacing="0" cellpadding="0"> <tbody><tr style="border-collapse:collapse;"> <td align="center" style="padding:0;Margin:0;padding-top:5px;padding-bottom:5px;"><img src="https://qbsgq.stripocdn.email/content/guids/CABINET_905af03e8709229f1b10ad7414dc1531/images/23891556799905703.png" alt="" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic;" width="160" height="189.92"></td> </tr> <tr style="border-collapse:collapse;"> <td align="center" style="padding:0;Margin:0;padding-top:15px;padding-bottom:15px;"><h1 style="Margin:0;line-height:24px;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:20px;font-style:normal;font-weight:normal;color:#333333;"><strong>FORGOT YOUR </strong></h1><h1 style="Margin:0;line-height:24px;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:20px;font-style:normal;font-weight:normal;color:#333333;"><strong>&nbsp;PASSWORD?</strong></h1></td> </tr> <tr style="border-collapse:collapse;"> <td align="center" style="padding:0;Margin:0;padding-left:40px;padding-right:40px;"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:16px;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;line-height:24px;color:#666666;">Dear,&nbsp;` + name + `</p></td> </tr> <tr style="border-collapse:collapse;"> <td align="center" style="padding:0;Margin:0;padding-right:35px;padding-left:40px;"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:16px;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;line-height:24px;color:#666666;">There
                was a request to change your password!</p></td> </tr> <tr style="border-collapse:collapse;"> <td align="center" style="padding:0;Margin:0;padding-top:25px;padding-left:40px;padding-right:40px;"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:16px;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;line-height:24px;color:#666666;">If did not make this request, just ignore this email. Otherwise, please click the button below to change your password:</p></td> </tr> <tr style="border-collapse:collapse;"> <td align="center" style="Margin:0;padding-left:10px;padding-right:10px;padding-top:40px;padding-bottom:40px;"><span class="es-button-border" style="border-style:solid;border-color:#3D5CA3;background:#FFFFFF;border-width:2px;display:inline-block;border-radius:10px;width:auto;"><a href="` + link_ResetPassword + `" class="es-button" target="_blank" style="mso-style-priority:100
                !important;text-decoration:none;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:14px;color:#3D5CA3;border-style:solid;border-color:#FFFFFF;border-width:15px 20px 15px 20px;display:inline-block;background:#FFFFFF;border-radius:10px;font-weight:bold;font-style:normal;line-height:17px;width:auto;text-align:center;">RESET PASSWORD</a></span></td> </tr> </tbody></table></td> </tr> </tbody></table></td> </tr> <tr style="border-collapse:collapse;"> <td style="padding:0;Margin:0;padding-left:10px;padding-right:10px;padding-top:20px;background-position:center center;" align="left"> <!--[if mso]><table width="580" cellpadding="0" cellspacing="0"><tr><td width="199" valign="top"><![endif]--> <table class="es-left" cellspacing="0" cellpadding="0" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left;"> <tbody><tr style="border-collapse:collapse;"> <td width="199" align="left" style="padding:0;Margin:0;"> <table style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-position:center center;" width="100%" cellspacing="0" cellpadding="0"> <tbody><tr style="border-collapse:collapse;"> <td class="es-m-txt-c" align="right" style="padding:0;Margin:0;padding-top:15px;"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:16px;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;line-height:24px;color:#666666;"><strong>Follow us:</strong></p></td> </tr> </tbody></table></td> </tr> </tbody></table> <!--[if mso]></td><td width="20"></td><td width="361" valign="top"><![endif]--> <table class="es-right" cellspacing="0" cellpadding="0" align="right" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right;"> <tbody><tr style="border-collapse:collapse;"> <td width="361" align="left" style="padding:0;Margin:0;"> <table style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-position:center center;" width="100%" cellspacing="0" cellpadding="0"> <tbody><tr style="border-collapse:collapse;"> <td class="es-m-txt-c" align="left" style="padding:0;Margin:0;padding-bottom:5px;padding-top:10px;"> <table class="es-table-not-adapt es-social" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;"> <tbody><tr style="border-collapse:collapse;"> <td valign="top" align="center" style="padding:0;Margin:0;padding-right:10px;"><img src="https://qbsgq.stripocdn.email/content/assets/img/social-icons/rounded-gray/facebook-rounded-gray.png" alt="Fb" title="Facebook" width="32" height="32" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic;"></td> <td valign="top" align="center" style="padding:0;Margin:0;padding-right:10px;"><img src="https://qbsgq.stripocdn.email/content/assets/img/social-icons/rounded-gray/twitter-rounded-gray.png" alt="Tw" title="Twitter" width="32" height="32" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic;"></td> <td valign="top" align="center" style="padding:0;Margin:0;padding-right:10px;"><img src="https://qbsgq.stripocdn.email/content/assets/img/social-icons/rounded-gray/instagram-rounded-gray.png" alt="Ig" title="Instagram" width="32" height="32" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic;"></td> <td valign="top" align="center" style="padding:0;Margin:0;padding-right:10px;"><img src="https://qbsgq.stripocdn.email/content/assets/img/social-icons/rounded-gray/youtube-rounded-gray.png" alt="Yt" title="Youtube" width="32" height="32" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic;"></td> <td valign="top" align="center" style="padding:0;Margin:0;padding-right:10px;"><img src="https://qbsgq.stripocdn.email/content/assets/img/social-icons/rounded-gray/linkedin-rounded-gray.png" alt="In" title="Linkedin" width="32" height="32" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic;"></td> </tr> </tbody></table></td> </tr> </tbody></table></td> </tr> </tbody></table> <!--[if mso]></td></tr></table><![endif]--></td> </tr> <tr style="border-collapse:collapse;"> <td style="Margin:0;padding-top:5px;padding-bottom:20px;padding-left:20px;padding-right:20px;background-position:left top;" align="left"> <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;"> <tbody><tr style="border-collapse:collapse;"> <td width="560" valign="top" align="center" style="padding:0;Margin:0;"> <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;"> <tbody><tr style="border-collapse:collapse;"> <td align="center" style="padding:0;Margin:0;"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;line-height:21px;color:#666666;">Contact us: +201064754874 | <a target="_blank" href="mailto:likefb2019@gmail.com" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;font-size:14px;text-decoration:none;color:#666666;">info@kingburger.com</a></p></td> </tr> </tbody></table></td> </tr> </tbody></table></td> </tr> </tbody></table></td> </tr> </tbody></table> <table class="es-footer" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;background-color:transparent;background-repeat:repeat;background-position:center top;"> <tbody><tr style="border-collapse:collapse;"> <td style="padding:0;Margin:0;background-color:#FAFAFA;" bgcolor="#fafafa" align="center"> <table class="es-footer-body" width="600" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;"> <tbody><tr style="border-collapse:collapse;"> <td style="Margin:0;padding-top:10px;padding-left:20px;padding-right:20px;padding-bottom:30px;border-radius:0px 0px 10px 10px;background-color:#0B5394;background-position:left top;" bgcolor="#0b5394" align="left"> <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;"> <tbody><tr style="border-collapse:collapse;"> <td width="560" valign="top" align="center" style="padding:0;Margin:0;"> <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;"> <tbody><tr style="border-collapse:collapse;"> <td align="left" style="padding:0;Margin:0;padding-top:5px;padding-bottom:5px;"><h2 style="Margin:0;line-height:19px;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:16px;font-style:normal;font-weight:normal;color:#FFFFFF;"><strong>Have quastions?</strong></h2></td> </tr> <tr style="border-collapse:collapse;"> <td align="left" style="padding:0;Margin:0;padding-bottom:5px;"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:helvetica, 'helvetica neue',
                arial, verdana, sans-serif;line-height:21px;color:#FFFFFF;">We are here to help, learn more about us <a target="_blank" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;font-size:14px;text-decoration:none;color:#FFFFFF;" href="">here</a></p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;line-height:21px;color:#FFFFFF;">or <a target="_blank" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;font-size:14px;text-decoration:none;color:#FFFFFF;" href="">contact us</a><br></p></td> </tr> </tbody></table></td> </tr> </tbody></table></td> </tr> </tbody></table></td> </tr> </tbody></table> <table class="es-content" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;"> <tbody><tr style="border-collapse:collapse;"> <td style="padding:0;Margin:0;background-color:#FAFAFA;" bgcolor="#fafafa" align="center"> <table class="es-content-body" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;" width="600" cellspacing="0" cellpadding="0" bgcolor="transparent" align="center"> <tbody><tr style="border-collapse:collapse;"> <td style="padding:0;Margin:0;padding-top:15px;background-position:left top;" align="left"> <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;"> <tbody><tr style="border-collapse:collapse;"> <td width="600" valign="top" align="center" style="padding:0;Margin:0;"> <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;"> <tbody><tr style="border-collapse:collapse;"> <td align="center" style="padding:0;Margin:0;padding-bottom:20px;padding-left:20px;padding-right:20px;"> <table width="100%" height="100%" cellspacing="0" cellpadding="0" border="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;"> <tbody><tr style="border-collapse:collapse;"> <td style="padding:0;Margin:0px;border-bottom:1px solid #FAFAFA;background:none;height:1px;width:100%;margin:0px;"></td> </tr> </tbody></table></td> </tr> </tbody></table></td> </tr> </tbody></table></td> </tr> </tbody></table></td> </tr> </tbody></table> <table class="es-footer" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;background-color:transparent;background-repeat:repeat;background-position:center top;"> <tbody><tr style="border-collapse:collapse;"> <td style="padding:0;Margin:0;background-color:#FAFAFA;" bgcolor="#fafafa" align="center"> <table class="es-footer-body" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;" width="600" cellspacing="0" cellpadding="0" bgcolor="transparent" align="center"> <tbody><tr style="border-collapse:collapse;"> <td align="left" style="Margin:0;padding-bottom:5px;padding-top:15px;padding-left:20px;padding-right:20px;"> <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;"> <tbody><tr style="border-collapse:collapse;"> <td width="560" valign="top" align="center" style="padding:0;Margin:0;"> <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;"> <tbody><tr style="border-collapse:collapse;"> <td align="center" style="padding:0;Margin:0;"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:12px;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;line-height:18px;color:#666666;">This daily newsletter was sent to likefb2019@gmail.com from company name because you subscribed. If you would not like to receive this email <a target="_blank" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;font-size:12px;text-decoration:underline;color:#333333;" href="">unsubscribe here</a>.</p></td> </tr> </tbody></table></td> </tr> </tbody></table></td> </tr> </tbody></table></td> </tr> </tbody></table> </td> </tr> </tbody></table> </div> 
             </body></html>`;
                    var mailOptions = {
                        from: '"Restaurant 🍔" <likefb2019@gmail.com>',
                        to: Emp_Email,
                        subject: 'Your Restaurant account - Forgot your password?',
                        text: 'Dear   ' + name + ',\nDid you forget your password? No problem - open link  below to change it now\n!' + link_ResetPassword,
                        html: templeteHtml
                    };
                    transporter.sendMail(mailOptions, function(error, info) {
                        if (error) {
                            return res.send({ error: true, msg: error });
                        } else {
                            console.log('Email sent: ' + info.response);
                            res.status(200).send({ msg: "Check Your Email " + name });
                        }
                    });

                }



            });



    },
    ChangePasswordUser: (req, res) => {
        var url = req.connection.encrypted ? 'https://' : 'http://' + req.hostname + ':' + port;


        var token = req.query.token;

        if (token) {
            jwt.verify(token, config.key, function(err, decode) {

                if (err) return res.render("404.ejs", {
                    title: "This link is not valid anymore.",
                    urlMain: url

                });
                else {
                    res.render("ChangePasswordUser.ejs", {
                        title: "Change Password User",
                        token: token,
                        email: decode.Emp_Email,
                        urlMain: url

                    });

                }
            });
        } else {
            return res.status(403).send('No token');

        }

    },

    setNewPasswordUser: (req, res) => {

        var url = req.connection.encrypted ? 'https://' : 'http://' + req.hostname + ':' + port;


        var token = req.body.token;

        if (token) {
            jwt.verify(token, config.key, function(err, decode) {

                if (err) return res.render("404.ejs", {
                    title: "This link is not valid anymore.",
                    urlMain: url

                });
                else {

                    var newPassEmp = req.body.newPassEmp;
                    if (!isEmpty(newPassEmp)) {

                        if (newPassEmp.length >= 6) {
                            updatePasswordEmp = "UPDATE `customer` SET `password`='" + newPassEmp + "' WHERE `email`='" + decode.Emp_Email + "'";
                            sequelize.query(updatePasswordEmp, { type: sequelize.QueryTypes.UPDATE })
                                .then(function(result) {
                                    return res.status(200).send(result);

                                })
                        } else {
                            res.status(400).send({ msg: "please enter a password at least 6 characters long." });

                        }


                    } else {
                        res.status(400).send({ msg: "please write new password." });


                    }
                }
            });
        } else {
            return res.status(403).send('No token');

        }



    },



    allCustomerSavedMeal: (req, res) => {
        selectQuery = "SELECT * FROM `v_saved` WHERE `customer_id`=" + req.params.id + "";
        sequelize.query(selectQuery, { type: sequelize.QueryTypes.SELECT })
            .then(function(result) {
                return res.status(200).send(result);

            })



    },

    addCustomerSavedMeal: (req, res) => {
        insertQuery = "INSERT INTO `meal_saved`(`customer_id`, `meal_id`) VALUES (" + req.body.customer_id + "," + req.body.meal_id + ")";
        sequelize.query(insertQuery, { type: sequelize.QueryTypes.INSERT })
            .then(function(result) {
                return res.send({ error: false, msg: "meal saved" });

            }).catch((err) => {

                console.log(err)
                if (err.parent.code == 'ER_DUP_ENTRY' || err.parent.errno == 1062) {
                    return res.send({ error: true, msg: "The meal is already saved" });
                }

            });



    },
    deleteCustomerSavedMeal: (req, res) => {
        DELETEQuery = "DELETE FROM `meal_saved` WHERE `customer_id`=" + req.params.customer_id + " and meal_id=" + req.params.meal_id;
        sequelize.query(DELETEQuery, { type: sequelize.QueryTypes.DELETE })
            .then(function(result) {
                return res.send({ error: false, msg: "meal unsaved" });


            })



    },












    addNewOrder: (req, res) => {
        let date_ob = new Date();

        // current date
        // adjust 0 before single digit date
        var dates = ("0" + date_ob.getDate()).slice(-2);
        // current month
        var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
        // current year
        var year = date_ob.getFullYear();
        // current hours
        var hours = date_ob.getHours();
        // current minutes
        var minutes = date_ob.getMinutes();
        // current seconds
        var seconds = date_ob.getSeconds();
        // prints date in YYYY-MM-DD format

        var datedisplay = year + "-" + month + "-" + dates
        var timedisplay = hours + ":" + minutes + ":" + seconds;
        let
            cutomer_id = req.body.customer_id,
            date = datedisplay,
            time = timedisplay;

        console.log(datedisplay + " " + timedisplay);
        const newOrder = new Order({ cutomer_id, date, time });

        newOrder.save()

        .then((newOrder) => {
            console.log("order added Succssfully :)  " + newOrder.order_id);





            return res.json({ order_id: newOrder.order_id, msg: "order created Succssfully :)  " }, 200);




        }).catch((err) => {
            console.log(err)

        });


    },

    addNewMealOrder: (req, res) => {

        insertQuery = "INSERT INTO `order_info`(`meal_id`, `order_id`) VALUES (" + req.body.meal_id + "," + req.body.order_id + ")";
        sequelize.query(insertQuery, { type: sequelize.QueryTypes.INSERT })
            .then(function(result) {
                return res.status(200).send({ error: false, msg: "The meal has been added" });

            }).catch((err) => {

                console.log(err)
                if (err.parent.code == 'ER_DUP_ENTRY' || err.parent.errno == 1062) {
                    return res.send({ error: true, msg: "The meal is already added" });
                }
                return res.send({ error: true, msg: "The meal is not exist" });


            });


    },

    deleteMealCart: (req, res) => {


        deleteQuery = "DELETE FROM `order_info` WHERE `meal_id`=" + req.body.meal_id + " and `order_id`=" + req.body.order_id + "";
        sequelize.query(deleteQuery, { type: sequelize.QueryTypes.DELETE })
            .then(function(result) {
                return res.status(200).send({ error: false, msg: "The meal has been deleted" });

            }).catch((err) => {

                console.log(err)

                return res.send({ error: true, msg: "The meal is not exist" });


            });


    },

    addMealQty: (req, res) => {


        UpdateQuery = "UPDATE `order_info` SET `quantity`=" + req.body.quantity + " WHERE `meal_id`=" + req.body.meal_id + " and `order_id`=" + req.body.order_id + "";
        sequelize.query(UpdateQuery, { type: sequelize.QueryTypes.UPDATE })
            .then(function(result) {
                return res.status(200).send({ error: false, msg: "The meal has been +1" });

            }).catch((err) => {

                console.log(err)

                return res.send({ error: true, msg: "The meal is not exist" });


            });


    },

    getCurrentOrderID: (req, res) => {

        SELECTQuery = "SELECT * FROM `customer_order` WHERE `cutomer_id`=" + req.params.id + " AND `isOrdered`=0 LIMIT 1";
        sequelize.query(SELECTQuery, { type: sequelize.QueryTypes.SELECT })
            .then(function(result) {

                if (result != "")
                    return res.status(200).send(result[0]);
                else
                    return res.status(404).send({ error: true, msg: "no cart" });

            }).catch((err) => {

                console.log(err)
                if (err.parent.code == 'ER_DUP_ENTRY' || err.parent.errno == 1062) {
                    return res.send({ error: true, msg: "The meal is already added" });
                }
                return res.send({ error: true, msg: "The meal is not exist" });


            });


    },


    //tabel

    addOrderToTabel: (req, res) => {
        insertQuery = "INSERT INTO `booking_table`(`customer_id`, `table_id`, `num_of_people`, `date`,`time`,`note`, `order_id`) VALUES (" + req.body.customer_id + "," + req.body.table_id + "," + req.body.num_of_people + ",'" + req.body.date + "','" + req.body.time + "','" + req.body.note + "'," + req.body.order_id + ")";
        sequelize.query(insertQuery, { type: sequelize.QueryTypes.INSERT })
            .then(function(result) {


                return res.send({ error: false, msg: "Booked tabel" });

            }).catch((err) => {

                console.log(err)

            });



    },
    updateisOrder: (req, res) => {

        let


            order_id = req.params.id,
            payment_method = req.body.payment_method,
            delivery_method = req.body.delivery_method;


        Order.update({ isOrdered: 1, payment_method: payment_method, delivery_method: delivery_method }, {
            where: {
                order_id: order_id
            }
        }).then((result) => {

            res.status(200).send({ error: false, meg: "oreder Done" })


        })
        console.log('data updated Done');
    }

    ,
    getTableInDay: (req, res) => {
        // current timestamp in milliseconds
        let ts = Date.now();

        let date_ob = new Date(ts);
        let date = date_ob.getDate();
        let month = date_ob.getMonth() + 1;
        let year = date_ob.getFullYear();

        // prints date & time in YYYY-MM-DD format


        sequelize.query("SELECT * FROM `booking_table` WHERE date= '" + year + "-" + month + "-" + date + "'", { type: sequelize.QueryTypes.SELECT })
            .then(function(result) {
                return res.status(200).send(result);
            });







    },
    getMostPopularMeal: (req, res) => {



        sequelize.query("SELECT * FROM v_most_meal_ordered", { type: sequelize.QueryTypes.SELECT })
            .then(function(result) {
                return res.status(200).send(result);
            });







    },

}