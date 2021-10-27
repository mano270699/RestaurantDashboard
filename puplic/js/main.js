const urlDashBoard = "http://192.168.1.12:8081";
$(window).on("load", function() {



    if ($("#title").text().includes("Dashboard")) {

        $.get(urlDashBoard + "/getTotalTodayOrders", function(data, status) {

            $("#TodayOrders").text(data[0].TotalTodayOrders);

        });
        //Start get Total Orders
        $.get(urlDashBoard + "/getTotalOrders", function(data, status) {

            $("#TotalOrders").text(data[0].TotalOrders);

        });
        //End get Total Orders


        //Start get Total Accept  Orders
        $.get(urlDashBoard + "/getTotalAcceptOrders", function(data, status) {

            $("#TotalAcceptOrders").text(data[0].TotalAcceptOrders);

        });
        //End get Total Accept  Orders

        //Start get Total Today  Orders

        //End get Total Today  Orders



    } else return;












});


$(document).ready(function() {



    $('#example').DataTable();
    $('#example_wrapper').addClass("p-3 bg-light");



    $("#add_category").click(function() {
        $.get("demo_test.asp", function(data, status) {
            alert("Data: " + data + "\nStatus: " + status);
        });
    });

    /*---------------------------------Start Update Admin Info Page---------------------------------*/
    {

        $("#FormSettingInfo").submit(function(event) {

            /* Stop form from submitting normally */
            event.preventDefault();



            var SettingForm = new FormData();
            var fileIconCat = $('#file').prop('files')[0];

            SettingForm.append("admin_name", $("#FormSettingInfo_fullname").val());
            SettingForm.append("email", $("#FormSettingInfo_email").val());
            SettingForm.append("password", $("#FormSettingInfo_password").val());

            SettingForm.append("admin_image", fileIconCat);




            var hulla = new hullabaloo();

            $.ajax({
                url: urlDashBoard + "/updateadmin/2",
                type: 'PUT',
                data: SettingForm,
                enctype: 'multipart/form-data',
                processData: false,
                contentType: false,

                success: function(res, textStatus, xhr) {



                },
                complete: function(data) {

                    if (data.status == 200) {
                        hulla.send('Your Information has been Changed  successfully', 'success');
                        var delayInMilliseconds = 2000; //2 second
                        setTimeout(function() {
                            window.location.href = window.location;
                        }, delayInMilliseconds);

                    } else {

                        hulla.send('Errors: ' + data.responseJSON.msg, 'danger');



                    }
                },

                error: function(xhr, textStatus, error) {


                    hulla.send('Errors:true  in error', 'danger');




                }


            });


            return false;







        });

    }

    /*---------------------------------End Update Admin Info Page---------------------------------*/

    /*---------------------------------Start Category Page---------------------------------*/

    var tableCategory = $('#TableCategoryData').DataTable({
        "ordering": false,
        "ajax": {
            "type": "GET",
            "url": "" + urlDashBoard + "/allcategory",
            headers: {},


            "dataSrc": ""
        },
        "columnDefs": [{
            "targets": 2,
            "data": null,
            "render": function(data, type, row, meta) {

                return '<img width="50" height="50" class="rounded-circle zoom" alt="Avatar"  src="' + urlDashBoard + '/image/category_images/' + data + '">'
            }
        }, {

            "targets": -1,
            "data": null,
            "render": function(data, type, row, meta) {
                var IconActionCat = '<a id="' + row.cat_id + '"  href="#ActionEditCategory" title="Edit Category"><span class="fas fa-cog fa-sm text-primary cursorAction "></span></a>';
                IconActionCat += '<a id="' + row.cat_id + '"  href="#ActionRemoveCategory" title="Remove Category"><span class="fas fa-trash fa-sm text-danger cursorAction ml-3 "></span></a>';


                return IconActionCat;
            }


        }, {

            "targets": 0,
            "data": null,
            "render": function(data, type, row, meta) {
                var thCatID = '<b>' + row.cat_id + '</b>';


                return thCatID;
            }


        }],
        "columns": [
            { "data": "cat_id" },
            { "data": "cat_name" },
            { "data": "cat_image" },
            { "data": "" }


        ]

    });

    var dataModelCategory;
    $('#TableCategoryData tbody').on('click', '[href="#ActionEditCategory"]', function() {
        dataModelCategory = tableCategory.row($(this).parents('tr')).data();
        $("#ActionCategory_catName").val(dataModelCategory.cat_name);
        $('#ActionEditCategory').modal('show');



    });


    $('#TableCategoryData tbody').on('click', '[href="#ActionRemoveCategory"]', function() {
        dataModelCategory = tableCategory.row($(this).parents('tr')).data();
        $("#FormRemoveCategory span").text(dataModelCategory.Cat_Name);
        $('#ActionRemoveCategory').modal('show');




    });


    //Edit New Category
    $("#FormEditCategory").submit(function(e) {

        /* Stop form from submitting normally */
        e.preventDefault();

        var txtCategoryName = $("#ActionCategory_catName").val();


        var FormCatImg = new FormData();
        var fileIconCat = $("#ActionCategory_catIcon").prop("files")[0];
        FormCatImg.append("cat_name", txtCategoryName);
        FormCatImg.append("cat_image", fileIconCat);
        var hulla = new hullabaloo();

        $.ajax({
            url: urlDashBoard + "/updatecategory/" + dataModelCategory.cat_id,
            type: 'PUT',
            data: FormCatImg,
            enctype: 'multipart/form-data',
            processData: false,
            contentType: false,

            success: function(res, textStatus, xhr) {

                console.log("in success:" + res)

            },
            complete: function(data) {


                console.log("commplet:" + data.status)
                $("#ActionCategory_catIcon").val(null);
                $("#ActionEditCategory .custom-file-label").text("Choose file");


                if (data.status == 200) {
                    hulla.send('Category Updated successfully', 'success');

                    $('#ActionEditCategory').modal('toggle');

                    tableCategory.ajax.reload();


                } else {
                    hulla.send('Errors: ' + data.responseJSON.msg, 'danger');
                    tableCategory.ajax.reload();
                }

            },

            error: function(xhr, textStatus, error) {
                console.log("in error:" + xhr)


            }


        });



        tableCategory.ajax.reload();
        tableCategory.ajax.reload();

        return false;
    });

    $("#TableCategoryData_wrapper .row:first").addClass("px-3");

    $("#TableCategoryData_wrapper .row:last").addClass("px-3");


    //Add New Category

    $("#FormAddNewCategory").submit(function(event) {

        /* Stop form from submitting normally */
        event.preventDefault();
        //event.stopPropagation();
        //$(this).off(event);
        var txtCategoryName = $("#AddNewCategory_catName").val();
        var AddFormCatImg = new FormData();
        var fileIconCat = $("#AddNewCategory_catIcon").prop("files")[0];
        AddFormCatImg.append("cat_name", txtCategoryName);
        AddFormCatImg.append("cat_image", fileIconCat);
        var hulla = new hullabaloo();

        $.ajax({
            url: urlDashBoard + "/savecategory",
            type: 'POST',
            data: AddFormCatImg,
            enctype: 'multipart/form-data',
            processData: false,
            contentType: false,

            success: function(res, textStatus, xhr) {


                console.log("in if:");
                //table.ajax.reload();
            },
            complete: function(data) {


                if (data.status == 200) {
                    hulla.send('Category Added successfully', 'success');
                    $('#AddNewCategory').modal('toggle');
                    tableCategory.ajax.reload();
                    $("#AddNewCategory_catName").val(null);
                    $("#AddNewCategory_catIcon").val(null);
                    $("#AddNewCategory .custom-file-label").text("Choose file");
                } else {

                    hulla.send('Errors: ' + data.responseJSON.msg, 'danger');
                    $("#AddNewCategory .custom-file-label").text("Choose file");
                    $("#AddNewCategory_catIcon").val(null);
                }
            },

            error: function(xhr, textStatus, error) {
                hulla.send('Errors: ' + xhr.responseJSON.msg, 'danger');
                console.log("in if:");






            }


        });

        tableMeal.ajax.reload();

        return false;







    });






    //Remove Category
    $("#FormRemoveCategory").submit(function(event) {

        /* Stop form from submitting normally */
        event.preventDefault();
        //event.stopPropagation();
        //$(this).off(event);

        var hulla = new hullabaloo();

        $.ajax({
            url: urlDashBoard + "/deletecategory/" + dataModelCategory.cat_id,
            type: 'DELETE',
            data: "no data",

            success: function(res, textStatus, xhr) {


                console.log("in if:");
                //table.ajax.reload();
            },
            complete: function(data) {


                if (data.status == 200) {
                    hulla.send('Category Deleted successfully', 'success');
                    $('#ActionRemoveCategory').modal('toggle');
                    tableCategory.ajax.reload();

                } else {

                    hulla.send('Errors: ' + data.responseJSON.msg, 'danger');

                }
            },

            error: function(xhr, textStatus, error) {
                // hulla.send('Errors: ' + xhr.responseJSON.msg, 'danger');
                console.log("in if:");






            }


        });



        return false;







    });

    /*---------------------------------End Category Page---------------------------------*/

    /*---------------------------------Start Meal Prodect Page---------------------------------*/

    var tableMeal = $('#TableMealData').DataTable({
        "ordering": false,
        "ajax": {
            "type": "GET",
            "url": "" + urlDashBoard + "/allmealProdect",
            "dataSrc": ""
        },
        "columnDefs": [{
            "targets": 3,
            "data": null,
            "render": function(data, type, row, meta) {

                return '<img width="50" height="50" class="rounded-circle zoom" alt="Avatar"  src="' + urlDashBoard + '/image/Meal_images/' + data + '">'
            }
        }, {

            "targets": -1,
            "data": null,
            "render": function(data, type, row, meta) {
                var IconActionMeal = '<a id="' + row.meal_id + '"  href="#ActionEditMeal" title="Edit Meal"><span class="fas fa-cog fa-sm text-primary cursorAction "></span></a>';
                IconActionMeal += '<a id="' + row.meal_id + '"  href="#ActionRemoveMeal" title="Remove Meal"><span class="fas fa-trash fa-sm text-danger cursorAction ml-2 "></span></a>';
                IconActionMeal += '<a id="' + row.meal_id + '"  href="' + urlDashBoard + '/manageComments/' + row.meal_id + '" title="Comments Meal"><span class="fas fa-comments text-primary fa-sm  cursorAction ml-2 "></span></a>';


                return IconActionMeal;
            }


        }, {

            "targets": 0,
            "data": null,
            "render": function(data, type, row, meta) {
                var thmealID = '<b>' + row.meal_id + '</b>';


                return thmealID;
            }


        }],
        "columns": [
            { "data": "meal_id" },
            { "data": "meal_name" },
            { "data": "meal_price" },
            { "data": "meal_image" },
            { "data": "description" },
            { "data": "" }


        ]

    });

    var dataModelMeal;
    $('#TableMealData tbody').on('click', '[href="#ActionEditMeal"]', function() {
        dataModelMeal = tableMeal.row($(this).parents('tr')).data();
        $("#EditMeal_mealName").val(dataModelMeal.meal_name);
        $("#EditMeal_price").val(dataModelMeal.meal_price)
        $("#EditMeal_Desc").val(dataModelMeal.description)

        $('#ActionEditMeal').modal('show');
        $("#Edit_SelectCategory").empty();
        $.get(urlDashBoard + "/allcategory", function(data, status) {
            var catOptions = "";
            for (var cat = 0; cat < data.length; cat++) {
                if (data[cat].cat_id == dataModelMeal.cat_id)
                    catOptions += "<option value=" + data[cat].cat_id + " selected='selected' > " + data[cat].cat_name + "</option>";
                else
                    catOptions += "<option value=" + data[cat].cat_id + " >" + data[cat].cat_name + "</option>";
            }

            $("#Edit_SelectCategory").append(catOptions);



        });



    });


    $('#TableMealData tbody').on('click', '[href="#ActionRemoveMeal"]', function() {
        dataModelMeal = tableMeal.row($(this).parents('tr')).data();
        $("#FormRemoveMeal span").text(dataModelMeal.meal_name);
        $('#ActionRemoveMeal').modal('show');

    });
    $('#TableMealData tbody').on('click', '[href="#ActionMangeCommentsMeal"]', function() {
        dataModelMeal = tableMeal.row($(this).parents('tr')).data();
        $('#ActionMangeCommentsMeal').modal('show');

    });


    //btn btnAdd new meal
    $("#btnAddNewMeal").on('click', function() {
        $("#Add_SelectCategory").empty();
        $.get(urlDashBoard + "/allcategory", function(data, status) {
            var catOptions = "";
            for (var cat = 0; cat < data.length; cat++) {
                if (cat == 0)
                    catOptions += "<option value=" + data[cat].cat_id + " selected='selected' > " + data[cat].cat_name + "</option>";
                else
                    catOptions += "<option value=" + data[cat].cat_id + " >" + data[cat].cat_name + "</option>";
            }

            $("#Add_SelectCategory").append(catOptions);



        });
    });

    $("#TableMealData_wrapper .row:first").addClass("px-3");

    $("#TableMealData_wrapper .row:last").addClass("px-3");

    //Add New Meal
    $("#FormAddNewMeal").submit(function(event) {

        /* Stop form from submitting normally */
        event.preventDefault();
        //event.stopPropagation();
        //$(this).off(event);
        var AddCategoryIDSelected = $("#Add_SelectCategory").children("option:selected").val();



        var txtMealName = $("#AddNewMeal_MealName").val();
        var txtMealprice = $("#AddNewMeal_price").val();
        var txtMealdesc = $("#AddNewMeal_desc").val();



        var AddFormMeal = new FormData();
        var fileIconMeal = $("#AddNewMeal_MealIcon").prop("files")[0];
        AddFormMeal.append("meal_name", txtMealName);
        AddFormMeal.append("meal_price", txtMealprice);
        AddFormMeal.append("description", txtMealdesc);
        AddFormMeal.append("cat_id", AddCategoryIDSelected);
        AddFormMeal.append("meal_image", fileIconMeal);
        var hulla = new hullabaloo();

        $.ajax({
            url: urlDashBoard + "/addmealProdect",
            type: 'POST',
            data: AddFormMeal,
            enctype: 'multipart/form-data',
            processData: false,
            contentType: false,

            success: function(res, textStatus, xhr) {


                console.log("in if:");
                //table.ajax.reload();
            },
            complete: function(data) {


                if (data.status == 200) {
                    hulla.send('Meal Added successfully', 'success');
                    $('#AddNewMeal').modal('toggle');
                    tableMeal.ajax.reload();
                    $("#AddNewMeal_MealName").val(null);
                    $("#AddNewMeal_price").val(null);
                    $("#AddNewMeal_desc").val(null);
                    $("#AddNewMeal_MealIcon").val(null);
                    $("#AddNewMeal_MealIcon .custom-file-label").text("Choose file");
                } else {

                    hulla.send('Errors: ' + data.responseJSON.msg, 'danger');
                    $("#AddNewMeal_MealIcon .custom-file-label").text("Choose file");
                    $("#AddNewMeal_MealIcon").val(null);
                }
            },

            error: function(xhr, textStatus, error) {
                // hulla.send('Errors: ' + xhr.responseJSON.msg, 'danger');
                console.log("in if:");






            }


        });

        tableMeal.ajax.reload();

        return false;







    });



    //Edit Meal
    $("#FormEditMeal").submit(function(event) {

        /* Stop form from submitting normally */
        event.preventDefault();
        //event.stopPropagation();
        //$(this).off(event);
        var AddCategoryIDSelected = $("#Edit_SelectCategory").children("option:selected").val();



        var txtMealName = $("#EditMeal_mealName").val();
        var txtMealprice = $("#EditMeal_price").val();
        var txtMealdesc = $("#EditMeal_Desc").val();
        console.log(txtMealName);
        console.log(txtMealprice);
        console.log(txtMealdesc);
        console.log(AddCategoryIDSelected);


        var EditFormMeal = new FormData();
        var fileIconMeal = $("#EditMeal_MealIcon").prop("files")[0];
        EditFormMeal.append("meal_name", txtMealName);
        EditFormMeal.append("meal_price", txtMealprice);
        EditFormMeal.append("description", txtMealdesc);
        EditFormMeal.append("cat_id", AddCategoryIDSelected);
        EditFormMeal.append("meal_image", fileIconMeal);
        var hulla = new hullabaloo();

        $.ajax({
            url: urlDashBoard + "/updatemealProdect/" + dataModelMeal.meal_id,
            type: 'PUT',
            data: EditFormMeal,
            enctype: 'multipart/form-data',
            processData: false,
            contentType: false,

            success: function(res, textStatus, xhr) {


                console.log("in if:");
                //table.ajax.reload();
            },
            complete: function(data) {


                if (data.status == 200) {
                    hulla.send('Meal updated successfully', 'success');
                    $('#ActionEditMeal').modal('toggle');
                    tableMeal.ajax.reload();
                    $("#EditMeal_mealName").val(null);
                    $("#EditMeal_price").val(null);
                    $("#EditMeal_desc").val(null);
                    $("#EditMeal_MealIcon").val(null);
                    $("#EditMeal_MealIcon .custom-file-label").text("Choose file");
                } else {

                    hulla.send('Errors: ' + data.responseJSON.msg, 'danger');
                    $("#EditMeal_MealIcon .custom-file-label").text("Choose file");
                    $("#EditMeal_MealIcon").val(null);
                }
            },

            error: function(xhr, textStatus, error) {
                // hulla.send('Errors: ' + xhr.responseJSON.msg, 'danger');
                console.log("in if:");






            }


        });


        tableMeal.ajax.reload();
        return false;







    });
    //Remove Meal
    $("#FormRemoveMeal").submit(function(event) {

            /* Stop form from submitting normally */
            event.preventDefault();
            //event.stopPropagation();
            //$(this).off(event);

            var hulla = new hullabaloo();

            $.ajax({
                url: urlDashBoard + "/deletemealProdect/" + dataModelMeal.meal_id,
                type: 'DELETE',
                data: "no data",

                success: function(res, textStatus, xhr) {


                    console.log("in if:");
                    //table.ajax.reload();
                },
                complete: function(data) {


                    if (data.status == 200) {
                        hulla.send('Meal Deleted successfully', 'success');
                        $('#ActionRemoveMeal').modal('toggle');
                        tableMeal.ajax.reload();

                    } else {

                        hulla.send('Errors: ' + data.responseJSON.msg, 'danger');

                    }
                },

                error: function(xhr, textStatus, error) {
                    // hulla.send('Errors: ' + xhr.responseJSON.msg, 'danger');
                    console.log("in if:");






                }


            });

            tableMeal.ajax.reload();

            return false;
        })
        /*--------------------------------End meal page------------------------*/
        /*---------------------------------Start Offer Page---------------------------------*/

    var tableoffer = $('#TableofferData').DataTable({
        "ordering": false,
        "ajax": {
            "type": "GET",
            "url": "" + urlDashBoard + "/alloffers",
            "dataSrc": ""
        },
        "columnDefs": [{
            "targets": 2,
            "data": null,
            "render": function(data, type, row, meta) {

                return '<img width="50" height="50" class="rounded-circle zoom" alt="Avatar"  src="' + urlDashBoard + '/image/Meal_images/' + data + '">'
            }
        }, {

            "targets": -1,
            "data": null,
            "render": function(data, type, row, meta) {
                var IconActionoffer = '<a id="' + row.offer_id + '"  href="#ActionEditOffer" title="Edit Offre"><span class="fas fa-cog fa-sm text-primary cursorAction "></span></a>';
                IconActionoffer += '<a id="' + row.offer_id + '"  href="#ActionRemoveOffer" title="Remove Offer"><span class="fas fa-trash fa-sm text-danger cursorAction ml-3 "></span></a>';


                return IconActionoffer;
            }


        }, {

            "targets": 0,
            "data": null,
            "render": function(data, type, row, meta) {
                var thCatID = '<b>' + row.meal_id + '</b>';


                return thCatID;
            }


        }],
        "columns": [
            { "data": "meal_id" },
            { "data": "meal_name" },
            { "data": "meal_image" },
            { "data": "old_price" },
            { "data": "meal_price" },
            { "data": "" }


        ]

    });


    $("#TableofferData_wrapper .row:first").addClass("px-3");

    $("#TableofferData_wrapper .row:last").addClass("px-3");



    var dataModelOffer;
    $('#TableofferData tbody').on('click', '[href="#ActionEditOffer"]', function() {
        dataModelOffer = tableoffer.row($(this).parents('tr')).data();
        $("#EditPro_ProName").val(dataModelOffer.meal_name);
        $("#Edit_Selecte_Offer_Category").empty();
        $.get(urlDashBoard + "/allcategory", function(data, status) {
            var catOptions = "";
            for (var cat = 0; cat < data.length; cat++)
                if (data[cat].cat_id == dataModelOffer.cat_id)
                    catOptions += "<option value=" + data[cat].cat_id + " selected='selected' > " + data[cat].cat_name + "</option>";
                else
                    catOptions += "<option value=" + data[cat].cat_id + " > " + data[cat].cat_name + "</option>";

            $("#Edit_Selecte_Offer_Category").append(catOptions);
        });


        $("#EditPro_txtPrice").val(dataModelOffer.old_price);
        $("#EditOffer_txtPriceAfterDiscount").val(dataModelOffer.meal_price);
        var PriceAfterDiscount = $("#EditOffer_txtPriceAfterDiscount").val();
        var Price = $("#EditPro_txtPrice").val();
        console.log(Price)
        var Discount = Number(((Price - PriceAfterDiscount) * 100) / Price).toFixed(2);

        $("#EditOffer_txtDiscount").val(Discount);


        $('#ActionEditOffer').modal('show');
        $("#EditPro_SelectCategory").empty();



    });


    $('#TableofferData tbody').on('click', '[href="#ActionRemoveOffer"]', function() {

        dataModelOffer = tableoffer.row($(this).parents('tr')).data();
        $('#ActionRemoveOffer').modal('show');




    });

    //Edit Product
    $("#FormEditOffer").submit(function(event) {

        /* Stop form from submitting normally */
        event.preventDefault();
        //event.stopPropagation();
        //$(this).off(event);

        var PriceAfterDiscount = $("#EditOffer_txtPriceAfterDiscount").val();
        var old_price = $("#EditPro_txtPrice").val();
        console.log("PriceAfterDiscount:" + PriceAfterDiscount)
        console.log("old_price:" + old_price)





        var EditFormOffer = new FormData();


        EditFormOffer.append("meal_id", dataModelOffer.meal_id);
        EditFormOffer.append("meal_price", PriceAfterDiscount);
        EditFormOffer.append("old_price", old_price);


        var hulla = new hullabaloo();

        $.ajax({
            url: urlDashBoard + "/addOffer",
            type: 'POST',
            data: EditFormOffer,
            enctype: 'multipart/form-data',
            processData: false,
            contentType: false,

            success: function(res, textStatus, xhr) {



            },
            complete: function(data) {


                if (data.status == 200) {
                    hulla.send('Offer Updated successfully', 'success');
                    $('#ActionEditOffer').modal('toggle');
                    tableoffer.ajax.reload();
                } else {

                    hulla.send('Errors: ' + data.responseJSON.msg, 'danger');

                }
            },

            error: function(xhr, textStatus, error) {







            }


        });

        tableoffer.ajax.reload();

        return false;


    });

    //btn add offer
    $("#btnAddNewOffer").on('click', function() {

        $("#Add_Offer_SelectCategory").empty();
        $.get(urlDashBoard + "/allcategory", function(data, status) {
            var catOptions = "";
            for (var cat = 0; cat < data.length; cat++) {
                if (cat == 0)
                    catOptions += "<option value=" + data[cat].cat_id + " selected='selected' > " + data[cat].cat_name + "</option>";
                else
                    catOptions += "<option value=" + data[cat].cat_id + " >" + data[cat].cat_name + "</option>";
            }

            $("#Add_Offer_SelectCategory").append(catOptions);
            $("#AddOffer_SelectMeal").empty();
            var proSelectedCategory = $("#Add_Offer_SelectCategory").children("option:selected").val();
            $.get(urlDashBoard + "/allMealin_Category/" + proSelectedCategory, function(data, status) {
                var hulla = new hullabaloo();
                var mealOptions = "";
                for (var meal = 0; meal < data.length; meal++) {
                    if (meal == 0)
                        mealOptions += "<option value=" + data[meal].meal_id + " selected='selected' > " + data[meal].meal_name + "</option>";
                    else
                        mealOptions += "<option value=" + data[meal].meal_id + " >" + data[meal].meal_name + "</option>";
                }
                $("#AddOffer_SelectMeal").append(mealOptions);
                if (!($("#AddOffer_SelectMeal").html().length > 0)) {
                    hulla.send('There is no Meal on this category<br><a href="' + urlDashBoard + '/meal_prodect"> Add New Meal</a>', 'warning');
                    $("#AddPro_txtPrice").val('');

                }


            });



        });
    });
    //meal select
    $("#Add_Offer_SelectCategory").on('change', function() {

        $("#AddOffer_SelectMeal").empty();
        var proSelectedCategory = $("#Add_Offer_SelectCategory").children("option:selected").val();
        $.get(urlDashBoard + "/allMealin_Category/" + proSelectedCategory, function(data, status) {
            var hulla = new hullabaloo();
            var mealOptions = "";
            for (var meal = 0; meal < data.length; meal++) {
                if (meal == 0)
                    mealOptions += "<option value=" + data[meal].meal_id + " selected='selected' > " + data[meal].meal_name + "</option>";
                else
                    mealOptions += "<option value=" + data[meal].meal_id + " >" + data[meal].meal_name + "</option>";
            }
            $("#AddOffer_SelectMeal").append(mealOptions);
            if (!($("#AddOffer_SelectMeal").html().length > 0)) {
                hulla.send('There is no Meal on this category<br><a href="' + urlDashBoard + '/meal_prodect"> Add New Meal</a>', 'warning');
                $("#AddPro_txtPrice").val('');

            }


        });
    });

    $("#AddOffer_SelectMeal").on('change', function() {

        var offerSelectedMeal = $("#AddOffer_SelectMeal").children("option:selected").val();
        $.get(urlDashBoard + "/mealProdectbyID/" + offerSelectedMeal, function(data, status) {

            $("#AddPro_txtPrice").val(data[0].meal_price);

        });

    });
    //Add offer Product
    $("#FormAddNewOffer").submit(function(event) {

        /* Stop form from submitting normally */
        event.preventDefault();
        //event.stopPropagation();
        //$(this).off(event);
        var proSelectedMeal = $("#AddOffer_SelectMeal").children("option:selected").val();
        var PriceAfterDiscount = $("#AddOffer_txtPriceAfterDiscount").val();
        var old_price = $("#AddPro_txtPrice").val();

        console.log("PriceAfterDiscount:" + PriceAfterDiscount)
        console.log("old_price:" + old_price)





        var AddFormOffer = new FormData();


        AddFormOffer.append("meal_id", proSelectedMeal);
        AddFormOffer.append("meal_price", PriceAfterDiscount);
        AddFormOffer.append("old_price", old_price);


        var hulla = new hullabaloo();

        $.ajax({
            url: urlDashBoard + "/addOffer",
            type: 'POST',
            data: AddFormOffer,
            enctype: 'multipart/form-data',
            processData: false,
            contentType: false,

            success: function(res, textStatus, xhr) {



            },
            complete: function(data) {


                if (data.status == 200) {
                    hulla.send('Offer added successfully', 'success');
                    $('#AddNewOffer').modal('toggle');
                    tableoffer.ajax.reload();
                } else {

                    hulla.send('Errors: ' + data.responseJSON.msg, 'danger');

                }
            },

            error: function(xhr, textStatus, error) {







            }


        });

        tableoffer.ajax.reload();

        return false;


    });
    //Remove Product offer
    $("#FormRemoveOffer").submit(function(event) {

        /* Stop form from submitting normally */
        event.preventDefault();
        //event.stopPropagation();
        //$(this).off(event);


        var formofferDelete = new FormData();
        formofferDelete.append("meal_id", dataModelOffer.meal_id);
        formofferDelete.append("meal_price", dataModelOffer.old_price);




        var hulla = new hullabaloo();

        $.ajax({
            url: urlDashBoard + "/deleteoffer",
            type: 'PUT',
            data: formofferDelete,
            processData: false,
            contentType: false,

            success: function(res, textStatus, xhr) {


                console.log("in if:");
                //table.ajax.reload();
            },
            complete: function(data) {


                if (data.status == 200) {
                    hulla.send('Offer Deleted successfully', 'success');
                    $('#ActionRemoveOffer').modal('toggle');
                    tableoffer.ajax.reload();

                } else {

                    hulla.send('Errors: ' + data.responseJSON.msg, 'danger');

                }
            },

            error: function(xhr, textStatus, error) {
                // hulla.send('Errors: ' + xhr.responseJSON.msg, 'danger');
                console.log("in if:");






            }


        });



        return false;







    });


    /*---------------------------------End offer Page---------------------------------*/

    /*---------------------------------Start App User Page---------------------------------*/


    var tableAppUser = $('#TableAppUserData').DataTable({
        "ordering": false,
        "ajax": {
            "type": "GET",
            "url": "" + urlDashBoard + "/allusers",
            "dataSrc": ""
        },
        "columnDefs": [

            {

                "targets": 1,
                "data": null,
                "render": function(data, type, row, meta) {
                    var customerNameImg = '<img width="50" height="50" class="rounded-circle zoom" alt="Avatar" src="' + urlDashBoard + '/image/customer/' + row.image + '">' + ' <span >' + row.full_name + '</span></a>';



                    return customerNameImg;
                }


            },




            {

                "targets": -1,
                "data": null,
                "render": function(data, type, row, meta) {
                    var IconActionuserblock;
                    if (row.Blocked == 1)
                        IconActionuserblock = '<a id="' + row.customer_id + '"  href="#ActionunBlockUser" title="block user">  <span class="fas fa-user-lock text-danger cursorAction "></span>   </a>';
                    else
                        IconActionuserblock = '<a id="' + row.customer_id + '"  href="#ActionBlockUser" title="Active user (unblocked)">  <span class="fas fa-user text-success cursorAction "></span>   </a>';


                    /* if (data[user].cat_id == dataModelMeal.cat_id)
                              catOptions += "<option value=" + data[user].cat_id + " selected='selected' > " + data[cat].cat_name + "</option>";
                          else
                              catOptions += "<option value=" + data[user].cat_id + " >" + data[cat].cat_name + "</option>";*/


                    return IconActionuserblock;
                }


            }, {


                "targets": 2,
                "data": null,
                "render": function(data, type, row, meta) {
                    var IconActionLocation = '<span class="fas fa-map-marker-alt text-dark cursorAction ">&nbsp &nbsp</span>' + row.address;
                    //IconActionMeal += '<a id="' + row.meal_id + '"  href="#ActionRemoveMeal" title="Remove Meal"><span class="fas fa-trash fa-sm text-danger cursorAction ml-2 "></span></a>';


                    return IconActionLocation;
                }


            }, {}, {


                "targets": 3,
                "data": null,
                "render": function(data, type, row, meta) {
                    var IconActionButtonMoreDetal = '<a id="' + row.customer_id + '"  href="#ActionAppUserDetails" class="btn btn-info btn-sm" title="AppUser Details"><span style= "color: #FFFFFF;" ">More Details</span></a>';
                    //IconActionMeal += '<a id="' + row.meal_id + '"  href="#ActionRemoveMeal" title="Remove Meal"><span class="fas fa-trash fa-sm text-danger cursorAction ml-2 "></span></a>';


                    return IconActionButtonMoreDetal;
                }


            }, {

                "targets": 0,
                "data": null,
                "render": function(data, type, row, meta) {
                    var thcustID = '<b>' + row.customer_id + '</b>';


                    return thcustID;
                }


            }
        ],
        "columns": [
            { "data": "customer_id" },
            { "data": "full_name" },
            { "data": "address" },
            { "data": "" },
            { "data": "" }


        ]

    });
    $("#TableAppUserData_wrapper .row:first").addClass("px-3");

    $("#TableAppUserData_wrapper .row:last").addClass("px-3");
    var dataModelAppUser;
    $('#TableAppUserData tbody').on('click', '[href="#ActionunBlockUser"]', function() {

        dataModelAppUser = tableAppUser.row($(this).parents('tr')).data();
        $('#ActionunBlockUser').modal('show');




    });
    $('#TableAppUserData tbody').on('click', '[href="#ActionBlockUser"]', function() {

        dataModelAppUser = tableAppUser.row($(this).parents('tr')).data();
        $('#ActionBlockUser').modal('show');




    });
    //first table
    var tableAppuserOrderDetails = "";
    $('#TableAppUserData tbody').on('click', '[href="#ActionAppUserDetails"]', function() {

        dataModelAppUser = tableAppUser.row($(this).parents('tr')).data();

        $('#customerName').text("Name: " + dataModelAppUser.full_name);
        $('#customerPhone').text("Phone: " + dataModelAppUser.phone);
        $('#customerAddress').text("address: " + dataModelAppUser.address);
        $('#customerEmail').text("Email: " + dataModelAppUser.email);

        //table in more details in App User
        tableAppuserOrderDetails = $('#TableDetailsOrder').DataTable({
            "ordering": false,
            "ajax": {
                "type": "GET",
                "url": "" + urlDashBoard + "/allorderforCustomer/" + dataModelAppUser.customer_id,
                "dataSrc": ""
            },
            "columnDefs": [



                {

                    "targets": -1,
                    "data": null,
                    "render": function(data, type, row, meta) {


                        return row.status;
                    }


                }, {


                    "targets": 2,
                    "data": null,
                    "render": function(data, type, row, meta) {
                        var date = row.date;
                        var time = row.time;
                        var date_time = date + " " + time;

                        return date_time;
                    }


                }, {}, {


                    "targets": 3,
                    "data": null,
                    "render": function(data, type, row, meta) {
                        var IconActionButtonMoreDetal = '<a id="' + row.order_id + '"  href="#ActionCustomerOrderDetails" class="btn btn-info btn-sm" title="Details order"><span style= "color: #FFFFFF;" ">Order Details</span></a>';
                        //IconActionMeal += '<a id="' + row.meal_id + '"  href="#ActionRemoveMeal" title="Remove Meal"><span class="fas fa-trash fa-sm text-danger cursorAction ml-2 "></span></a>';


                        return IconActionButtonMoreDetal;
                    }


                }, {

                    "targets": 0,
                    "data": null,
                    "render": function(data, type, row, meta) {
                        var thcustID = '<b>' + data + '</b>';


                        return thcustID;
                    }


                }
            ],
            "columns": [
                { "data": "order_id" },
                { "data": "total_price" },
                { "data": "date_time" },
                { "data": "" },
                { "data": "status" }


            ]

        });

        tableAppuserOrderDetails.ajax.reload();

        $('#ActionAppUserDetails').modal('show');





    });

    $("#ActionAppUserDetails").on("hide.bs.modal", function() {

        //Destroy Table so can install Again.
        tableAppuserOrderDetails.destroy();

    });


    //all order second in model
    $('#TableDetailsOrder tbody').on('click', '[href="#ActionCustomerOrderDetails"]', function() {
        console.log("ActionCustomerOrderDetails");



        var dataModelallcustomerorder;
        dataModelallcustomerorder = tableAppuserOrderDetails.row($(this).parents('tr')).data();

        $('#Appuserordre_number').text(dataModelallcustomerorder.order_id);
        $('#AppuserOrdercustomerName').text("Name: " + dataModelAppUser.full_name);
        $('#AppuserOrdercustomerPhone').text("Phone: " + dataModelAppUser.phone);
        $('#AppuserOrdercustomerAddress').text("address: " + dataModelAppUser.address);

        $('#AppuserOrdercustomerPayment').text("Payment Method: " + dataModelallcustomerorder.payment_method);
        $('#AppuserOrdercustomerDelivary').text("Delivery Method: " + dataModelallcustomerorder.delivery_method);
        $('#mealOrderdetails').empty();
        $.get(urlDashBoard + "/orderInOrderInfo/" + dataModelallcustomerorder.order_id, function(dataCartDetails, status) {

            for (var pro = 0; pro < dataCartDetails.length; pro++) {
                var ProID = dataCartDetails[pro].meal_id;
                var ProName = dataCartDetails[pro].meal_name;
                var ProPrice = dataCartDetails[pro].meal_price;
                var ProQty = dataCartDetails[pro].quantity;
                var TotalPriceForOneProduct = dataCartDetails[pro].total_price;
                var ProImg = dataCartDetails[pro].meal_image;
                // alert("ProID:" + ProID + "\nTotalPriceForOneProduct:" + TotalPriceForOneProduct);


                var orderItemsText = " <tr><th scope='row'>" + (pro + 1) + "</th>";
                orderItemsText += "<td><img src='" + urlDashBoard + "/image/Meal_images/" + ProImg + "' width='50' height='50' class='rounded-circle zoom' alt='Avatar'><span>" + ProName + "</span> </td>";
                orderItemsText += "<td>  $" + ProPrice + "</td> <td>  " + ProQty + "</td><td> $" + Number(TotalPriceForOneProduct).toFixed(2) + "</td></tr>";
                console.log("Order Details>>!" + orderItemsText)
                $("#mealOrderdetails").append(orderItemsText);

            }



        });










        $('#ActionAppUserDetails').modal('hide');
        $('#ActionCustomerOrderDetails').modal('show');

    });



    $("#TableAppUserData_wrapper .row:first").addClass("px-3");

    $("#TableAppUserData_wrapper .row:last").addClass("px-3");

    $("#FormUnBlockUser").submit(function(event) {

        /* Stop form from submitting normally */
        event.preventDefault();
        //event.stopPropagation();
        //$(this).off(event);

        var hulla = new hullabaloo();

        $.ajax({
            url: urlDashBoard + "/unblockuser/" + dataModelAppUser.customer_id,
            type: 'PUT',
            data: "no data",

            success: function(res, textStatus, xhr) {


                console.log("in if:");
                //table.ajax.reload();
            },
            complete: function(data) {


                if (data.status == 200) {
                    hulla.send('this User UnBlocked now', 'success');
                    $('#ActionunBlockUser').modal('toggle');
                    tableAppUser.ajax.reload();

                } else {

                    hulla.send('Errors: ' + data.responseJSON.msg, 'danger');

                }
            },

            error: function(xhr, textStatus, error) {
                // hulla.send('Errors: ' + xhr.responseJSON.msg, 'danger');
                console.log("in if:");






            }


        });

        tableAppUser.ajax.reload();

        return false;
    })
    $("#FormBlockUser").submit(function(event) {

        /* Stop form from submitting normally */
        event.preventDefault();
        //event.stopPropagation();
        //$(this).off(event);

        var hulla = new hullabaloo();

        $.ajax({
            url: urlDashBoard + "/blockuser/" + dataModelAppUser.customer_id,
            type: 'PUT',
            data: "no data",

            success: function(res, textStatus, xhr) {


                console.log("in if:");
                //table.ajax.reload();
            },
            complete: function(data) {


                if (data.status == 200) {
                    hulla.send('this User Blocked now', 'danger');
                    $('#ActionBlockUser').modal('toggle');
                    tableAppUser.ajax.reload();

                } else {

                    hulla.send('Errors: ' + data.responseJSON.msg, 'danger');

                }
            },

            error: function(xhr, textStatus, error) {
                // hulla.send('Errors: ' + xhr.responseJSON.msg, 'danger');
                console.log("in if:");






            }


        });

        tableAppUser.ajax.reload();

        return false;
    })



    /*---------------------------------Start Dashboard Page---------------------------------*/



    var tableDashboard = $('#TableDashboardData').DataTable({
        "ordering": false,
        "ajax": {
            "type": "GET",
            "url": "" + urlDashBoard + "/orderInDashboard",
            "dataSrc": ""
        },
        "columnDefs": [

            {

                "targets": 1,
                "data": null,
                "render": function(data, type, row, meta) {
                    var customerNameImg = '<img width="50" height="50" class="rounded-circle zoom" alt="Avatar" src="' + urlDashBoard + '/image/customer/' + row.image + '">' + ' <span >' + row.full_name + '</span></a>';



                    return customerNameImg;
                }


            },




            {

                "targets": -1,
                "data": null,
                "render": function(data, type, row, meta) {
                    var IconActionorder = '<a id="' + row.order_id + '"  href="#ActionEditOrderStatus" title="Status order"><span class="fas fa-cog fa-lg text-warning cursorAction "></span></a>';

                    return IconActionorder;
                }


            }, {


                "targets": 2,
                "data": null,
                "render": function(data, type, row, meta) {
                    var IconActionLocation = '<span class="fas fa-map-marker-alt text-primary cursorAction ">&nbsp &nbsp</span>' + row.address;
                    //IconActionMeal += '<a id="' + row.meal_id + '"  href="#ActionRemoveMeal" title="Remove Meal"><span class="fas fa-trash fa-sm text-danger cursorAction ml-2 "></span></a>';


                    return IconActionLocation;
                }


            }, {}, {


                "targets": 4,
                "data": null,
                "render": function(data, type, row, meta) {
                    //var IconActionButtonMoreDetal = '<a href="#" type="button" data-toggle="modal" data-target=".bd-example-modal-lg" class="btn btn-info btn-sm">More Details</button>';
                    var IconActionButtonMoreDetal = '<a id="' + row.order_id + '"  href="#ActionorderDetails" class="btn btn-info btn-sm" title="Details order"><span style= "color: #FFFFFF;" ">Order Details</span></a>';

                    //IconActionMeal += '<a id="' + row.meal_id + '"  href="#ActionRemoveMeal" title="Remove Meal"><span class="fas fa-trash fa-sm text-danger cursorAction ml-2 "></span></a>';


                    return IconActionButtonMoreDetal;
                }


            },
            {


                "targets": 5,
                "data": null,
                "render": function(data, type, row, meta) {
                    var date = row.date;
                    var time = row.time;


                    date = date + '<br>' + time;

                    return date;
                }


            }


            ,
            {


                "targets": 3,
                "data": null,
                "render": function(data, type, row, meta) {
                    var status = row.status;
                    var IconActionStatus;
                    switch (status) {
                        case "New_Order":
                            IconActionStatus = '<i class="fas fa-circle fa-sm text-info"></i> ' + row.status;
                            break;

                        case "Cancel":
                            IconActionStatus = '<i class="fas fa-circle fa-sm text-danger"></i> ' + row.status;
                            break;
                        case "Preparing":
                            IconActionStatus = '<i class="fas fa-circle fa-sm text-primary"></i> ' + row.status;

                            break;
                        case "Dispatched":
                            IconActionStatus = '<i class="fas fa-circle fa-sm text-warning"></i> ' + row.status;

                            break;
                        case "Delivered":
                            IconActionStatus = '<i class="fas fa-circle fa-sm text-success"></i> ' + row.status;

                            break;
                    }








                    return IconActionStatus;
                }


            },



            {

                "targets": 0,
                "data": null,
                "render": function(data, type, row, meta) {
                    var thcustID = '<b>' + row.order_id + '</b>';


                    return thcustID;
                }


            }
        ],
        "columns": [
            { "data": "order_id" },
            { "data": "full_name" },
            { "data": "address" },
            { "data": "status" },
            { "data": "" },
            { "data": "date" },
            { "data": "" }


        ]

    });

    $("#TableDashboardData_wrapper .row:first").addClass("px-3");

    $("#TableDashboardData_wrapper .row:last").addClass("px-3");
    var dataModeldashboard;
    $('#TableDashboardData tbody').on('click', '[href="#ActionEditOrderStatus"]', function() {

        dataModeldashboard = tableDashboard.row($(this).parents('tr')).data();
        console.log("in ststatus:" + dataModeldashboard.status)

        $("#Select_Update_Status").empty();



        var select_status_Option = "";
        var data = ["New_Order", "Preparing", "Dispatched", "Delivered", "Cancel"];
        for (var order = 0; order < data.length; order++) {

            if (data[order] == dataModeldashboard.status)
                select_status_Option += "<option selected value=" + data[order] + " >" + data[order] + "</option>";
            else
                select_status_Option += "<option value=" + data[order] + " >" + data[order] + "</option>";

        }
        $("#Select_Update_Status").append(select_status_Option);



        $('#ActionEditOrderStatus').modal('show');




    });
    $('#TableDashboardData tbody').on('click', '[href="#ActionorderDetails"]', function() {
        var dataModeldashboard;
        dataModeldashboard = tableDashboard.row($(this).parents('tr')).data();

        $('#ordre_number').text(dataModeldashboard.order_id);
        $('#customerName').text("Name: " + dataModeldashboard.full_name);
        $('#customerPhone').text("Phone: " + dataModeldashboard.phone);
        $('#customerAddress').text("address: " + dataModeldashboard.address);
        $('#customerPayment').text("Payment Method: " + dataModeldashboard.payment_method);
        $('#customerDelivary').text("Delivery Method: " + dataModeldashboard.delivery_method);
        $('#myOrderItems').empty();
        $.get(urlDashBoard + "/orderInOrderInfo/" + dataModeldashboard.order_id, function(dataCartDetails, status) {

            for (var pro = 0; pro < dataCartDetails.length; pro++) {
                var ProID = dataCartDetails[pro].meal_id;
                var ProName = dataCartDetails[pro].meal_name;
                var ProPrice = dataCartDetails[pro].meal_price;
                var ProQty = dataCartDetails[pro].quantity;
                var TotalPriceForOneProduct = dataCartDetails[pro].total_price;
                var ProImg = dataCartDetails[pro].meal_image;
                // alert("ProID:" + ProID + "\nTotalPriceForOneProduct:" + TotalPriceForOneProduct);


                var orderItemsText = " <tr><th scope='row'>" + (pro + 1) + "</th>";
                orderItemsText += "<td><img src='" + urlDashBoard + "/image/Meal_images/" + ProImg + "' width='50' height='50' class='rounded-circle zoom' alt='Avatar'><span>" + ProName + "</span> </td>";
                orderItemsText += "<td>  $" + ProPrice + "</td> <td> " + ProQty + "</td><td> $" + Number(TotalPriceForOneProduct).toFixed(2) + "</td></tr>";

                $("#myOrderItems").append(orderItemsText);

            }



        });





        $('#ActionorderDetails').modal('show');




    });

    $("#FormUpdateOrderStatus").submit(function(event) {

        /* Stop form from submitting normally */
        event.preventDefault();
        var Select_Update_Status_Selected = $("#Select_Update_Status").children("option:selected").val();

        var orderID = dataModeldashboard.order_id;

        console.log("order_id:" + orderID);
        var FrmUpdateOrderStatus = new FormData();
        FrmUpdateOrderStatus.append("orderID", orderID);
        FrmUpdateOrderStatus.append("status", Select_Update_Status_Selected);
        var hulla = new hullabaloo();

        $.ajax({
            url: urlDashBoard + "/updateOrderStatus",
            data: FrmUpdateOrderStatus,
            type: "PUT",
            processData: false,
            contentType: false,

            success: function(res, textStatus, xhr) {



            },
            complete: function(data) {


                if (data.status == 200) {
                    hulla.send('OrderStatus has been Updated successfully', 'success');
                    $('#ActionEditOrderStatus').modal('toggle');



                    tableDashboard.ajax.reload();

                    // location.reload(true);
                } else {

                    //hulla.send('Errors: ' + data.responseJSON.msg, 'danger');
                    hulla.send('there is an erroe for updated ', 'danger');




                }
            },

            error: function(xhr, textStatus, error) {







            }


        });


        tableDashboard.ajax.reload();


        return false;







    });

    /*---------------------------------Start SliderImage Page---------------------------------*/
    {


        var tableSliderImage = $('#TableSliderImagesData').DataTable({
            "ordering": false,
            "ajax": {
                "type": "GET",
                "url": urlDashBoard + "/allSlider",
                "dataSrc": ""
            },
            "deferRender": true,
            "columnDefs": [{
                "targets": 2,
                "data": null,
                "render": function(data, type, row, meta) {

                    return '<a    ><img  class="avatarTable" alt="Product Image" src="' + urlDashBoard + '/image/Meal_images/' + row.meal_image + '"></a>'
                }
            }, {
                "targets": 3,
                "data": null,
                "render": function(data, type, row, meta) {

                    return '<a   href="#ActionPreviewSliderImage" ><img  class="avatarTable"   alt="Slider Image" src="' + urlDashBoard + '/image/Slider/' + data + '"></a>'
                }
            }, {

                "targets": 4,
                "data": null,
                "render": function(data, type, row, meta) {


                    return '$ ' + Number(data).toFixed(2) + '';
                }


            }, {

                "targets": 1,
                "data": null,
                "render": function(data, type, row, meta) {


                    return '<span class="d-inline-block text-truncate" style="max-width:250px;">' + data + '</span>';
                }


            }, {

                "targets": -1,
                "data": null,

                "render": function(data, type, row, meta) {
                    var IconActionOffers = '<a   href="#ActionRemoveSliderImage" title="Remove Slider Image"><span class="fas fa-trash fa-sm  text-danger cursorAction ml-3 "></span></a>';


                    return IconActionOffers;
                }


            }, {

                "targets": 0,
                "data": null,
                "render": function(data, type, row, meta) {



                    return '<b>' + data + '</b>';
                }



            }],
            "columns": [
                { "data": "slide_id" },
                { "data": "meal_name" },
                { "data": "meal_image" },
                { "data": "image" },
                { "data": "meal_price" },
                { "data": "" }

            ]

        });


        $("#TableSliderImagesData_wrapper .row:first").addClass("px-3");

        $("#TableSliderImagesData_wrapper .row:last").addClass("px-3");


        var dataModelSliderImage;



        $('#TableSliderImagesData tbody').on('click', '[href="#ActionRemoveSliderImage"]', function() {
            dataModelSliderImage = tableSliderImage.row($(this).parents('tr')).data();
            $("#FormRemoveSliderImage span").text(dataModelSliderImage.meal_name);


            $("#RemoveSliderImage_SelectProduct").val(dataModelSliderImage.meal_id);



            $('#ActionRemoveSliderImage').modal('show');




        });



        $('#TableSliderImagesData tbody').on('click', '[href="#ActionPreviewSliderImage"]', function() {
            dataModelSliderImage = tableSliderImage.row($(this).parents('tr')).data();

            $('#imgPreviewModel').attr('src', urlDashBoard + '/allSlider');


            $('#myPreviewImageModal').modal('show');




        });




        $('.SliderImageModelClose').on('click', function() {
            $('#myPreviewImageModal').modal('hide');


        });

        $('#PreviewNewSliderImages .SliderImageModelClose').on('click', function() {
            $('#PreviewNewSliderImages').modal('hide');


        });




        //btn btnPreviewImages
        $("#btnPreviewImages").on('click', function() {
            var hulla = new hullabaloo();

            $.get(urlDashBoard + "/allSlider", function(dataSliderImages, status) {


                var indicatorsOption = "";
                var ImagesOption = "";
                $("#Sliderindicators").empty();
                $("#SliderCarousel-inner").empty();
                for (var i = 0; i < dataSliderImages.length; i++) {


                    if (i == 0) {
                        indicatorsOption += '<li data-target="#ProductImages" data-slide-to="' + i + '" class="active"></li>'
                        ImagesOption += '<div class="carousel-item active"><img src="' + urlDashBoard + '/image/Slider/' + dataSliderImages[i].image + '" class="d-block w-100" style="height: 250px"></div>'

                    } else {

                        indicatorsOption += '<li data-target="#ProductImages" data-slide-to="' + i + '"></li>'
                        ImagesOption += '<div class="carousel-item"><img src="' + urlDashBoard + '/image/Slider/' + dataSliderImages[i].image + '" class="d-block w-100" style="height: 250px"></div>'

                    }

                }
                $("#Sliderindicators").append(indicatorsOption);
                $("#SliderCarousel-inner").append(ImagesOption);










            });


        });


        //btn btnAddNewImage
        $("#btnAddNewImage").on('click', function() {
            var hulla = new hullabaloo();

            $.get(urlDashBoard + "/allSlider", function(dataSlider, status) {


                $("#AddImage_SelectProduct").empty();

                $.get(urlDashBoard + "/allmealProdect", function(data, status) {
                    var ProOptions = "";

                    for (var pro = 0; pro < data.length; pro++) {
                        var flag = 0;
                        for (var proSlider = 0; proSlider < dataSlider.length; proSlider++) {
                            if (data[pro].meal_id == dataSlider[proSlider].meal_id) flag = 1;

                        }

                        if (flag != 1)
                            ProOptions += "<option value=" + data[pro].meal_id + " >" + data[pro].meal_name + "</option>";

                    }

                    $("#AddImage_SelectProduct").append(ProOptions);

                    if (!($("#AddImage_SelectProduct").html().length > 0)) {

                        hulla.send('There is no Product<br><a href="' + urlDashBoard + '/addmealProdect"> Add New Product</a>', 'warning');
                    }


                });

            });


        });









        //Add New SliderImage Form

        $("#FormAddNewImage").submit(function(event) {

            /* Stop form from submitting normally */
            event.preventDefault();

            var offer_ProductIDSelected = $("#AddImage_SelectProduct").children("option:selected").val();




            var AddSliderImageForm = new FormData();
            var fileIconCat = $("#AddNewImage_SliderImage").prop("files")[0];

            AddSliderImageForm.append("meal_id", offer_ProductIDSelected);
            AddSliderImageForm.append("image", fileIconCat);





            var hulla = new hullabaloo();

            $.ajax({
                url: urlDashBoard + "/addSlider",
                type: 'POST',
                data: AddSliderImageForm,
                processData: false,
                contentType: false,

                success: function(res, textStatus, xhr) {



                },
                complete: function(data) {


                    if (data.status == 200) {
                        hulla.send('Image has been Added  successfully', 'success');
                        $('#AddNewImage').modal('toggle');
                        tableSliderImage.ajax.reload();
                        $("#AddNewImage_SliderImage").val(null);

                        $("#AddNewImage .custom-file-label").text("Choose file");


                    } else {

                        // hulla.send('Errors: ' + data.responseJSON.msg, 'danger');
                        $("#AddNewImage_SliderImage").val(null);

                        $("#AddNewImage .custom-file-label").text("Choose file");


                    }
                },

                error: function(xhr, textStatus, error) {







                }


            });


            return false;







        });









        //Remove Offer
        $("#FormRemoveSliderImage").submit(function(event) {

            /* Stop form from submitting normally */
            event.preventDefault();


            var RemoveSliderImage_ProductIDSelected = $("#RemoveSliderImage_SelectProduct").val();



            var hulla = new hullabaloo();

            $.ajax({
                url: urlDashBoard + "/deleteSlider/" + dataModelSliderImage.slide_id,
                type: 'Delete',
                data: "",
                processData: false,
                contentType: false,

                success: function(res, textStatus, xhr) {



                },
                complete: function(data) {


                    if (data.status == 200) {
                        hulla.send('Image has been removed successfully', 'success');
                        $('#ActionRemoveSliderImage').modal('toggle');
                        tableSliderImage.ajax.reload();



                    } else {

                        //hulla.send('Errors: ' + data.responseJSON.msg, 'danger');
                        hulla.send('there is an erroe for removing ', 'danger');




                    }
                },

                error: function(xhr, textStatus, error) {







                }


            });





            return false;







        });



    }

    /*---------------------------------End SliderImage Page---------------------------------*/


    /*---------------------------------Start ManageComments Page---------------------------------*/
    {


        var tableComments = $('#TableCommentsData').DataTable({
            "ordering": false,
            "ajax": {
                "type": "GET",
                "url": "" + urlDashBoard + "/allCustomerComments/" + $("#meal_id").val(),
                "dataSrc": ""
            },
            "deferRender": true,
            "columnDefs": [{
                    "targets": 1,
                    "data": null,
                    "render": function(data, type, row, meta) {
                        //require view ?
                        return '<img class="avatarTable" alt="Avatar" src="' + urlDashBoard + '/image/customer/' + row.image + '"><span>' + row.full_name + '</span>'
                    }
                }, {
                    "targets": 4,
                    "data": null,
                    "render": function(data, type, row, meta) {
                        var textStar = "";
                        for (var sy = 0; sy < row.rate; sy++)
                            textStar += '<span class="fas fa-star checked cursorAction "></span>';
                        for (var sg = 0; sg < 5 - row.rate; sg++)
                            textStar += '<span class="fas fa-star  "></span>';

                        return textStar;
                    }
                }, {

                    "targets": [5, 6, 7],
                    "data": null,
                    "visible": false,
                    "searchable": false,
                    "render": function(data, type, row, meta) {


                        return data;
                    }


                }, {


                    "targets": 2,
                    "data": null,
                    "render": function(data, type, row, meta) {
                        var date = row.date_time;
                        var time = date.split('T')[1];
                        time = time.split('.')[0];

                        date = date.split('T')[0] + '<br>' + time;

                        return date;
                    }


                },




                {
                    "targets": -1,
                    "data": null,
                    "render": function(data, type, row, meta) {



                        return '<a   href="#ActionRemoveComment" title="Remove Comment"><span class="fas fa-trash fa-lg text-danger cursorAction ml-3 "></span></a>';;
                    }
                }
            ],

            "columns": [
                { "data": "com_id" },
                { "data": "" },
                { "data": "date_time" },
                { "data": "comment" },
                { "data": "" },
                { "data": "rate" },
                { "data": "full_name" },
                { "data": "image" },
                { "data": "" }




            ]

        });

        $("#TableCommentsData_wrapper .row:first").addClass("px-3");

        $("#TableCommentsData_wrapper .row:last").addClass("px-3");


        var dataModelComment;
        $('#TableCommentsData tbody').on('click', '[href="#ActionRemoveComment"]', function() {
            dataModelComment = tableComments.row($(this).parents('tr')).data();
            $("#FormRemoveComment span").text(dataModelComment.Com_Text);
            $('#ActionRemoveComment').modal('show');




        });

        //Remove Comment
        $("#FormRemoveComment").submit(function(event) {

            /* Stop form from submitting normally */
            event.preventDefault();








            var hulla = new hullabaloo();

            $.ajax({
                url: urlDashBoard + "/deleteComment/" + dataModelComment.com_id,
                type: 'DELETE',
                data: {
                    "Pro_ID": dataModelComment.meal_id,
                    "Cust_ID": dataModelComment.customer_id
                },

                success: function(res, textStatus, xhr) {



                },
                complete: function(data) {


                    if (data.status == 200) {
                        hulla.send('Comment Deleted successfully', 'success');
                        $('#ActionRemoveComment').modal('toggle');
                        tableComments.ajax.reload();


                    } else {

                        hulla.send('Errors: ' + data.responseJSON.msg, 'danger');

                    }
                },

                error: function(xhr, textStatus, error) {







                }


            });



            return false;







        });

    }
    /*---------------------------------End ManageComments Page---------------------------------*/


    /*---------------------------------Start Booking Table Page---------------------------------*/


    var BookingTable = $('#BookingTableIUser').DataTable({
        "ordering": false,
        "ajax": {
            "type": "GET",
            "url": "" + urlDashBoard + "/getCustomerBookTable",
            "dataSrc": ""
        },
        "columnDefs": [

            {

                "targets": 1,
                "data": null,
                "render": function(data, type, row, meta) {
                    var customerNameImg = '<img width="50" height="50" class="rounded-circle zoom" alt="Avatar" src="' + urlDashBoard + '/image/customer/' + row.image + '">';

                    customerNameImg += ' <span >' + row.full_name + '</span></a>';

                    return customerNameImg;
                }


            },




            {

                "targets": 2,
                "data": null,
                "render": function(data, type, row, meta) {
                    var IconActionButtonMoreDetal = '<a id="' + row.order_id + '"  href="#ActionBookingDetails" class="btn btn-info btn-sm" title="Booking Details"><span style= "color: #FFFFFF;" ">More Details</span></a>';


                    return IconActionButtonMoreDetal;
                }


            },

            {

                "targets": 0,
                "data": null,
                "render": function(data, type, row, meta) {
                    var thcustID = '<b>' + row.customer_id + '</b>';


                    return thcustID;
                }


            }
        ],
        "columns": [
            { "data": "customer_id" },
            { "data": "full_name" },
            { "data": "" },
            { "data": "date" }



        ]

    });
    $("#BookingTableData_wrapper .row:first").addClass("px-3");

    $("#BookingTableData_wrapper .row:last").addClass("px-3");


    //all order second in model
    $('#BookingTableIUser tbody').on('click', '[href="#ActionBookingDetails"]', function() {
        console.log("ActionBookingDetails");



        var dataModelallcustomerorder;
        dataModelallcustomerorder = BookingTable.row($(this).parents('tr')).data();

        $('#BookTableordre_number').text(dataModelallcustomerorder.order_id);
        $('#BookTablecustomerName').text("Name: " + dataModelallcustomerorder.full_name);
        $('#BookTablecustomerPhone').text("Phone: " + dataModelallcustomerorder.phone);
        $('#BookTablecustomerAddress').text("address: " + dataModelallcustomerorder.address);

        $('#BookTablecustomerPayment').text("Payment Method: " + dataModelallcustomerorder.payment_method);
        $('#BookTablecustomerDelivary').text("Delivery Method: " + dataModelallcustomerorder.delivery_method);

        $('#BookTableTadleId').text("Table ID: " + dataModelallcustomerorder.table_id);
        $('#BookTableNumPeople').text("Number People: " + dataModelallcustomerorder.num_of_people);
        $('#BookTableTadledate').text("Book Date: " + dataModelallcustomerorder.date);
        $('#BookTableTadletime').text("Book Time: " + dataModelallcustomerorder.time);
        $('#BookTableTadlenote').text("Note: " + dataModelallcustomerorder.note);
        $('#mealOrderdetails').empty();

        $('#ActionCustomerDetailsBookingTable').modal('hide');
        $('#BookingTableOrderDetails').modal('show');
        $.get(urlDashBoard + "/orderInOrderInfo/" + dataModelallcustomerorder.order_id, function(dataCartDetails, status) {

            for (var pro = 0; pro < dataCartDetails.length; pro++) {
                var ProID = dataCartDetails[pro].meal_id;
                var ProName = dataCartDetails[pro].meal_name;
                var ProPrice = dataCartDetails[pro].meal_price;
                var ProQty = dataCartDetails[pro].quantity;
                var TotalPriceForOneProduct = dataCartDetails[pro].total_price;
                var ProImg = dataCartDetails[pro].meal_image;
                // alert("ProID:" + ProID + "\nTotalPriceForOneProduct:" + TotalPriceForOneProduct);


                var orderItemsText = " <tr><th scope='row'>" + (pro + 1) + "</th>";
                orderItemsText += "<td><img src='" + urlDashBoard + "/image/Meal_images/" + ProImg + "' width='50' height='50' class='rounded-circle zoom' alt='Avatar'><span>" + ProName + "</span> </td>";
                orderItemsText += "<td>  $" + ProPrice + "</td> <td>  " + ProQty + "</td><td> $" + Number(TotalPriceForOneProduct).toFixed(2) + "</td></tr>";

                $("#mealOrderdetails").append(orderItemsText);

            }



        });











    });






























    /*---------------------------------start Admin resetPassword Page---------------------------------*/
    //Change Password
    $("#formEmp_ChangePassword").submit(function(event) {

        /* Stop form from submitting normally */
        event.preventDefault();

        var EmpForm = new FormData();

        EmpForm.append("newPassEmp", $("#Emp_Change_InputPassword").val());

        EmpForm.append("token", $("#Emp_token").val());




        var newHtmlChangePasswordEmp = `<div class="row">

<div class="col-lg-2 col-md-4 col-sm-12"></div>

<div class="col-lg-8 col-md-4 col-sm-12">

<!-- Start Form-->

<form id="form_ChangePassword" class="form-conatiner px-3" method="post" action="">
<h3 class="text-center display-4 mb-3" style="font-size: 2.5rem;">Your Password has been Changed.</h3>
<p class="text-center">Please use new password to access your account</p>
<br>
<div class="text-center">
<a href="/" class="text-primary">Back to login</a>
</div>

</form>

<!-- End Form-->

</div>

<div class="col-lg-2 col-md-4 col-sm-12"></div>

</div>`;

        var hulla = new hullabaloo();

        $.ajax({
            url: urlDashBoard + "/setNewPasswordEmp",
            type: 'PUT',
            data: EmpForm,
            processData: false,
            contentType: false,

            success: function(res, textStatus, xhr) {


            },
            complete: function(data) {

                if (data.status == 200) {
                    hulla.send('Password has been Changed  successfully', 'success');
                    $(".container-fluid").empty();
                    $(".container-fluid").append(newHtmlChangePasswordEmp);




                } else {

                    hulla.send('Errors: ' + data.responseJSON.msg, 'danger');



                }
            },

            error: function(xhr, textStatus, error) {

                //$("#wait").css("display", "block");


                hulla.send('Errors: danger');



            }


        });


        return false;







    });




    //Change Password for user
    $("#formUser_ChangePassword").submit(function(event) {

        /* Stop form from submitting normally */
        event.preventDefault();



        var UserForm = new FormData();

        UserForm.append("newPassEmp", $("#User_Change_InputPassword").val());

        UserForm.append("token", $("#User_token").val());




        var newHtmlChangePasswordUser = `<div class="row">

<div class="col-lg-2 col-md-4 col-sm-12"></div>

<div class="col-lg-8 col-md-4 col-sm-12">

<!-- Start Form-->

<form id="form_ChangePassword" class="form-conatiner px-3" method="post" action="">
<h3 class="text-center display-4 mb-3" style="font-size: 2.5rem;">Your Password has been Changed.</h3>
<p class="text-center">Please use new password to access your account</p>
<br>
<div class="text-center">
<a href="/" class="text-primary">Back to login</a>
</div>










</form>

<!-- End Form-->

</div>

<div class="col-lg-2 col-md-4 col-sm-12"></div>

</div>`;

        var hulla = new hullabaloo();

        $.ajax({
            url: urlDashBoard + "/setNewPasswordUser",
            type: 'PUT',
            data: UserForm,
            processData: false,
            contentType: false,

            success: function(res, textStatus, xhr) {


            },
            complete: function(data) {

                if (data.status == 200) {
                    hulla.send('Password has been Changed  successfully', 'success');
                    $(".container-fluid").empty();
                    $(".container-fluid").append(newHtmlChangePasswordUser);




                } else {

                    hulla.send('Errors: ' + data.responseJSON.msg, 'danger');



                }
            },

            error: function(xhr, textStatus, error) {

                //$("#wait").css("display", "block");


                hulla.send('Errors: danger');



            }


        });


        return false;







    });



























    //Function to Calc Price After Discount in Model New Offer
    $("#AddOffer_txtDiscount").on({
        keyup: function() {
            var Discount = $(this).val();
            var Price = $("#AddPro_txtPrice").val();
            var PriceAfterDiscount = Number(Price - (Price * (Discount / 100))).toFixed(2);

            $("#AddOffer_txtPriceAfterDiscount").val(PriceAfterDiscount);
        },

        focus: function() {
            var Discount = $(this).val();
            var Price = $("#AddPro_txtPrice").val();
            var PriceAfterDiscount = Number(Price - (Price * (Discount / 100))).toFixed(2);

            $("#AddOffer_txtPriceAfterDiscount").val(PriceAfterDiscount);
        }



    });


    //Function to Calc Price After Discount in Model Edit Offer

    $("#EditOffer_txtDiscount").on({
        keyup: function() {
            var Discount = $(this).val();
            var Price = $("#EditPro_txtPrice").val();
            var PriceAfterDiscount = Number(Price - (Price * (Discount / 100))).toFixed(2);

            $("#EditOffer_txtPriceAfterDiscount").val(PriceAfterDiscount);
        },

        focus: function() {
            var Discount = $(this).val();
            var Price = $("#EditPro_txtPrice").val();
            var PriceAfterDiscount = Number(Price - (Price * (Discount / 100))).toFixed(2);

            $("#EditOffer_txtPriceAfterDiscount").val(PriceAfterDiscount);
        }



    });


    //Function to Calc Discount in Model New Offer

    $("#AddOffer_txtPriceAfterDiscount").on(

        {
            keyup: function() {
                var PriceAfterDiscount = $(this).val();
                var Price = $("#AddPro_txtPrice").val();
                var Discount = Number(((Price - PriceAfterDiscount) * 100) / Price).toFixed(2);

                $("#AddOffer_txtDiscount").val(Discount);
            },
            focus: function() {
                var PriceAfterDiscount = $(this).val();
                var Price = $("#AddPro_txtPrice").val();
                var Discount = Number(((Price - PriceAfterDiscount) * 100) / Price).toFixed(2);

                $("#AddOffer_txtDiscount").val(Discount);
            }



        });

    //Function to Calc Discount in Model Edit Offer

    $("#EditOffer_txtPriceAfterDiscount").on(

        {
            keyup: function() {
                var PriceAfterDiscount = $(this).val();
                var Price = $("#EditPro_txtPrice").val();
                var Discount = Number(((Price - PriceAfterDiscount) * 100) / Price).toFixed(2);

                $("#EditOffer_txtDiscount").val(Discount);
            },
            focus: function() {
                var PriceAfterDiscount = $(this).val();
                var Price = $("#EditPro_txtPrice").val();
                var Discount = Number(((Price - PriceAfterDiscount) * 100) / Price).toFixed(2);

                $("#EditOffer_txtDiscount").val(Discount);
            }



        });













});