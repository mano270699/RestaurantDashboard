const urlDashBoard = "http://192.168.1.12:8081/";



$(document).ready(

    function() {





        /*---------------------------------Start ManageComments Page---------------------------------*/
        {


            var tableComments = $('#TableCommentsData').DataTable({
                "ordering": false,
                "ajax": {
                    "type": "GET",
                    "url": "" + urlDashBoard + "CommentsProduct/" + $("#M_Pro_ID").val() + "/AllCommentsCustomer",
                    "dataSrc": ""
                },
                "deferRender": true,
                "columnDefs": [{
                    "targets": 1,
                    "data": null,
                    "render": function(data, type, row, meta) {

                        return '<img class="avatarTable" alt="Avatar" src="' + urlDashBoard + 'images/customers/' + row.image + '"><span>' + row.Cust_Name + '</span>'
                    }
                }, {
                    "targets": 4,
                    "data": null,
                    "render": function(data, type, row, meta) {
                        var textStar = "";
                        for (var sy = 0; sy < row.Rate_Value; sy++)
                            textStar += '<span class="fas fa-star checked cursorAction "></span>';
                        for (var sg = 0; sg < 5 - row.Rate_Value; sg++)
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
                    "targets": -1,
                    "data": null,
                    "render": function(data, type, row, meta) {



                        return '<a   href="#ActionRemoveComment" title="Remove Comment"><span class="fas fa-trash fa-lg text-danger cursorAction ml-3 "></span></a>';;
                    }
                }],

                "columns": [
                    { "data": "Com_ID" },
                    { "data": "" },
                    { "data": "Com_Date" },
                    { "data": "Com_Text" },
                    { "data": "" },
                    { "data": "Rate_Value" },
                    { "data": "Cust_Name" },
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
                    url: urlDashBoard + "CommentsProduct/" + dataModelComment.Com_ID + "/deleteComment",
                    type: 'DELETE',
                    data: {
                        "Pro_ID": dataModelComment.Pro_ID,
                        "Cust_ID": dataModelComment.Cust_ID
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










        /*---------------------------------Start SliderImage Page---------------------------------*/
        {


            var tableSliderImage = $('#TableSliderImagesData').DataTable({
                "ordering": false,
                "ajax": {
                    "type": "GET",
                    "url": urlDashBoard + "SliderImage/AllImages_cPanel",
                    "dataSrc": ""
                },
                "deferRender": true,
                "columnDefs": [{
                    "targets": 2,
                    "data": null,
                    "render": function(data, type, row, meta) {

                        return '<a    ><img  class="avatarTable" alt="Product Image" src="' + urlDashBoard + 'images/products/' + row.Pro_ID + "/" + data + '"></a>'
                    }
                }, {
                    "targets": 3,
                    "data": null,
                    "render": function(data, type, row, meta) {

                        return '<a   href="#ActionPreviewSliderImage" ><img  class="avatarTable"   alt="Slider Image" src="' + urlDashBoard + 'images/SliderImages/' + data + '"></a>'
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
                        var IconActionOffers = '<a   href="#ActionRemoveSliderImage" title="Remove Slider Image"><span class="fas fa-trash fa-lg text-danger cursorAction ml-3 "></span></a>';


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
                    { "data": "Pro_ID" },
                    { "data": "Pro_Name" },
                    { "data": "image" },
                    { "data": "SliderImage" },
                    { "data": "pro_price" },
                    { "data": "" }

                ]

            });


            $("#TableSliderImagesData_wrapper .row:first").addClass("px-3");

            $("#TableSliderImagesData_wrapper .row:last").addClass("px-3");


            var dataModelSliderImage;



            $('#TableSliderImagesData tbody').on('click', '[href="#ActionRemoveSliderImage"]', function() {
                dataModelSliderImage = tableSliderImage.row($(this).parents('tr')).data();
                $("#FormRemoveSliderImage span").text(dataModelSliderImage.Pro_Name);


                $("#RemoveSliderImage_SelectProduct").val(dataModelSliderImage.Pro_ID);



                $('#ActionRemoveSliderImage').modal('show');




            });



            $('#TableSliderImagesData tbody').on('click', '[href="#ActionPreviewSliderImage"]', function() {
                dataModelSliderImage = tableSliderImage.row($(this).parents('tr')).data();

                $('#imgPreviewModel').attr('src', urlDashBoard + 'images/SliderImages/' + dataModelSliderImage.SliderImage);


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

                $.get(urlDashBoard + "SliderImage/AllImages", function(dataSliderImages, status) {


                    var indicatorsOption = "";
                    var ImagesOption = "";
                    $("#Sliderindicators").empty();
                    $("#SliderCarousel-inner").empty();
                    for (var i = 0; i < dataSliderImages.length; i++) {


                        if (i == 0) {
                            indicatorsOption += '<li data-target="#ProductImages" data-slide-to="' + i + '" class="active"></li>'
                            ImagesOption += '<div class="carousel-item active"><img src="' + urlDashBoard + 'images/SliderImages/' + dataSliderImages[i].SliderImage + '" class="d-block w-100" style="height: 250px"></div>'

                        } else {

                            indicatorsOption += '<li data-target="#ProductImages" data-slide-to="' + i + '"></li>'
                            ImagesOption += '<div class="carousel-item"><img src="' + urlDashBoard + 'images/SliderImages/' + dataSliderImages[i].SliderImage + '" class="d-block w-100" style="height: 250px"></div>'

                        }

                    }
                    $("#Sliderindicators").append(indicatorsOption);
                    $("#SliderCarousel-inner").append(ImagesOption);










                });


            });


            //btn btnAddNewImage
            $("#btnAddNewImage").on('click', function() {
                var hulla = new hullabaloo();

                $.get(urlDashBoard + "SliderImage/AllImages", function(dataSlider, status) {


                    $("#AddImage_SelectProduct").empty();

                    $.get(urlDashBoard + "Product/AllProduct", function(data, status) {
                        var ProOptions = "";

                        for (var pro = 0; pro < data.length; pro++) {
                            var flag = 0;
                            for (var proSlider = 0; proSlider < dataSlider.length; proSlider++) {
                                if (data[pro].Pro_ID == dataSlider[proSlider].Pro_ID) flag = 1;

                            }

                            if (flag != 1)
                                ProOptions += "<option value=" + data[pro].Pro_ID + " >" + data[pro].Pro_Name + "</option>";

                        }

                        $("#AddImage_SelectProduct").append(ProOptions);

                        if (!($("#AddImage_SelectProduct").html().length > 0)) {

                            hulla.send('There is no Product<br><a href="' + urlDashBoard + 'dashboard/Products/"> Add New Product</a>', 'warning');
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

                AddSliderImageForm.append("Pro_ID", offer_ProductIDSelected);
                AddSliderImageForm.append("image", fileIconCat);





                var hulla = new hullabaloo();

                $.ajax({
                    url: urlDashBoard + "SliderImage/AddNewImgSlider",
                    type: 'POST',
                    data: AddSliderImageForm,
                    processData: false,
                    contentType: false,

                    success: function(res, textStatus, xhr) {

                        $("#wait").css("display", "block");

                    },
                    complete: function(data) {

                        $("#wait").css("display", "none");
                        if (data.status == 200) {
                            hulla.send('Image has been Added  successfully', 'success');
                            $('#AddNewImage').modal('toggle');
                            tableSliderImage.ajax.reload();
                            $("#AddNewImage_SliderImage").val(null);

                            $("#AddNewImage .custom-file-label").text("Choose file");


                        } else {

                            hulla.send('Errors: ' + data.responseJSON.msg, 'danger');
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
                    url: urlDashBoard + "SliderImage/" + RemoveSliderImage_ProductIDSelected + "/deleteImgSlider",
                    type: 'Delete',
                    data: "",
                    processData: false,
                    contentType: false,

                    success: function(res, textStatus, xhr) {

                        $("#wait").css("display", "block");

                    },
                    complete: function(data) {

                        $("#wait").css("display", "none");
                        if (data.status == 200) {
                            hulla.send('Image has been removed successfully', 'success');
                            $('#ActionRemoveSliderImage').modal('toggle');
                            tableSliderImage.ajax.reload();



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

        /*---------------------------------End SliderImage Page---------------------------------*/





        //For animate progress-bar
        $('.progress-bar').each(function() {

            var valueNow = $(this).attr('aria-valuenow');

            $(this).animate({

                width: valueNow + '%',

                percent: 100

            }, {

                progress: function(a, p, n) {

                    $(this)
                        .css('width', (valueNow * p + '%'))
                        .html(Math.round(valueNow * p) + '%');

                }

            });

        });













    });