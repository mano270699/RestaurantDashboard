const express = require('express'),
    fileUpload = require('express-fileupload'),
    bodyParser = require('body-parser'),
    passport = require('passport'),
    request = require('request'),
    path = require('path'),
    app = express(),
    session = require('express-session'),
    port = process.env.PORT || 8081;
global.port = port;
jwt = require('jsonwebtoken');
config = require('./config');

cookieParser = require('cookie-parser');
const TWO_HOURS = 1000 * 60 * 60 * 2;
const {
    NODE_ENV = "development",
        SEE_LIFETIME = TWO_HOURS,
        SESS_NAME = 'sid'


} = process.env
const IN_PROD = NODE_ENV === 'production';


app.use(session({
    name: SESS_NAME,
    resave: false,
    cookie: {
        maxAge: SEE_LIFETIME,
        sameSite: true,
        secure: IN_PROD,
    },
    secret: 'ssshhhhh',
    saveUninitialized: true,
    resave: true
}));

app.set("port", process.env.port || port);
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extends: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'puplic')));
app.use(fileUpload());
var sess;

app.get('/', function(req, res) {
    sess = req.session;
    /*
     * Here we have assigned the 'session' to 'sess'.
     * Now we can create any number of session variables we want.
     * in PHP we do as $_SESSION['var name'].
     * Here we do like this.
     */
    sess.email; // equivalent to $_SESSION['email'] in PHP.
    sess.username; // equivalent to $_SESSION['username'] in PHP.
    sess.password; // equivalent to $_SESSION['password'] in PHP.
    sess.image; // equivalent to $_SESSION['password'] in PHP.
});


const {
    dashboardPage,
    addofferPage,
    appusersPage,
    slidershowPage,
    settingPage,
    categorypage,
    meal_prodectPage,
    logPage,
    manageComments,
    forgetPassword
} = require("./routes/dashboard");
const {
    allcategory,
    savecategory,
    updatecategory,
    deletecategory,
    addmealProdect,
    allmealProdect,
    updatemealProdect,
    deletemealProdect,

    getAdmin,
    postlogPage,


    lostadminPassword,
    ChangePasswordEmp,
    setNewPasswordEmp,

    lostUserPassword,
    setNewPasswordUser,
    ChangePasswordUser,
    updateAddressCustomer,



    updateadmin,
    alloffers,
    addOffer,
    updateoffer,
    deleteoffer,
    mealProdectbyID,
    allMealin_Category,
    allusers,
    finduserbyID,
    addnewCustomer,
    updateUserData,
    customerLogin,
    unblockuser,
    blockuser,
    allorder,
    orderInDashboard,
    updateOrderStatus,
    orderforspacialcustomer,
    orderInOrderInfo,
    allorderforCustomer,
    addSlider,
    allSlider,
    deleteSlider,
    allCustomerComments,
    addCustomerFeedbackMeal,
    deleteComment,
    getTotalOrders,
    getTotalAcceptOrders,
    getTotalTodayOrders,
    getCustomerBookTable


    ,
    allCustomerSavedMeal,
    addCustomerSavedMeal,
    deleteCustomerSavedMeal,


    addNewOrder,
    addNewMealOrder,
    deleteMealCart,
    addMealQty,


    getCurrentOrderID,
    TotalPriceorderforspacialcustomer,


    addOrderToTabel,
    updateisOrder,
    getAvalibleTable,
    getTableInDay,
    getMostPopularMeal,
    userToken,
    getorderinfobyID


} = require("./routes/ApI");
app.get("/login", logPage);
app.post("/login", postlogPage);
app.get("/dashboard", dashboardPage);
app.put("/updateadmin/:id", updateadmin);
app.get("/adminSetting", getAdmin);


app.get("/logout", (req, res) => {
    // res.send("done destroy session :"+req.session)
    req.session.destroy((err) => {
        if (err) {
            return res.redirect("/dashboard");
        }
        console.log("loged out !")
        res.redirect("/login")
        res.end()
    });

});

app.post("/lostadminPassword", lostadminPassword);
app.put("/setNewPasswordEmp", setNewPasswordEmp);


//category route
app.get("/allcategory", allcategory);
app.post("/savecategory", savecategory);
app.put("/updatecategory/:id", updatecategory);
app.delete("/deletecategory/:id", deletecategory);
//meal route
app.get("/allmealProdect", allmealProdect);
app.get("/mealProdectbyID/:id", mealProdectbyID);
app.post("/addmealProdect", addmealProdect);
app.put("/updatemealProdect/:id", updatemealProdect);
app.delete("/deletemealProdect/:id", deletemealProdect);
app.delete("/deleteComment/:id", deleteComment);
//offer route
app.get("/alloffers", alloffers);
app.get("/allMealin_Category/:id", allMealin_Category);
app.post("/addOffer", addOffer);
app.put("/updateoffer/:id", updateoffer);
app.put("/deleteoffer", deleteoffer);

//app user route
app.get("/allusers", allusers);
app.get("/finduserbyID/:id", finduserbyID);
app.post("/addnewCustomer", addnewCustomer);
app.put("/updateAddressCustomer/:customer_id", updateAddressCustomer);
app.post("/customerLogin", customerLogin);
app.put("/updateUserData/:id", updateUserData);
app.put("/blockuser/:id", blockuser);
app.put("/unblockuser/:id", unblockuser);


//tabel
app.get("/getAvalibleTable/:date", getAvalibleTable);
app.post("/addOrderToTabel", addOrderToTabel);
app.get("/getTableInDay", getTableInDay);
app.get("/getCustomerBookTable", getCustomerBookTable);



app.get("/getMostPopularMeal", getMostPopularMeal);

app.post("/lostUserPassword", lostUserPassword);
app.put("/setNewPasswordUser", setNewPasswordUser);
app.get("/ChangePasswordUser", ChangePasswordUser);
//order
app.get("/allorder", allorder);
app.get("/orderInDashboard", orderInDashboard);
app.get("/orderInOrderInfo/:id", orderInOrderInfo);
app.get("/allorderforCustomer/:id", allorderforCustomer);
app.get("/orderforspacialcustomer/:id", orderforspacialcustomer);
app.get("/TotalPriceorderforspacialcustomer/:cutomer_id/order/:order_id", TotalPriceorderforspacialcustomer);
app.get("/getTotalOrders", getTotalOrders);
app.get("/getTotalAcceptOrders", getTotalAcceptOrders);
app.get("/getTotalTodayOrders", getTotalTodayOrders);
app.put("/updateOrderStatus", updateOrderStatus);
app.put("/updateisOrder/:id", updateisOrder);


app.post("/addNewOrder", addNewOrder);
app.post("/addNewMealOrder", addNewMealOrder);
app.delete("/deleteMealCart", deleteMealCart);
app.put("/addMealQty", addMealQty);
app.get("/getCurrentOrderID/:id", getCurrentOrderID);

//slider routs

app.post("/addSlider", addSlider);
app.get("/allSlider", allSlider);
app.delete("/deleteSlider/:id", deleteSlider);

//manage comment routs

app.get("/allCustomerComments/:meal_id", allCustomerComments);
app.post("/addCustomerFeedbackMeal", addCustomerFeedbackMeal);

//saved meal
app.get("/allCustomerSavedMeal/:id", allCustomerSavedMeal);
app.post("/addCustomerSavedMeal", addCustomerSavedMeal);
app.delete("/deleteCustomerSavedMeal/:customer_id/meal/:meal_id", deleteCustomerSavedMeal);


app.put("/userToken/:id", userToken);
app.get("/getorderinfobyID/:id", getorderinfobyID);

app.get("/category", categorypage);
//app.post("/category", addcategory);

app.get("/meal_prodect", meal_prodectPage);

app.get("/addoffer", addofferPage);

app.get("/appusers", appusersPage);

app.get("/manageComments/:meal_id", manageComments);

app.get("/slidershow", slidershowPage);

app.get("/setting", settingPage);
app.get("/forgetPassword", forgetPassword);
app.get("/ChangePasswordEmp", ChangePasswordEmp);











app.listen(port, () => {

    console.log(`Retaurant server runing in port:${port}`);
})