var api_url = 'http://dev.sdfcloud.net/sdf3/public/api/';
//api_url = 'http://local.sdf3.com/api/';
var api_base_url = 'http://local.sdf3.com/';

var $client = null;

var g_category_id = 0;

var today = new Date();

$(document).ready(function (e) {
  jQuery.support.cors = true;
  /*xdomain.masters({
   'http://dev.sdfcloud.net': '/sdf3/public/api/*',
   'http://local.sdf3.com': '/api/*'
   });*/

  $(document).ajaxStart(function () {
    $('#loading').show();
  });

  $(document).ajaxStop(function () {
    $('#loading').hide();
  });

  $client = new $.RestClient(api_url + "realestate/");

  $('#incfont').click(function () {


    curSize = parseInt($('.main-container').css('font-size')) + 2;

    if (curSize <= 20)
      $('.main-container').css('font-size', curSize);
  });
  $('#decfont').click(function () {
    curSize = parseInt($('.main-container').css('font-size')) - 2;
    if (curSize >= 12)
      $('.main-container').css('font-size', curSize);
  });

  //setting api
  $client.add('categories', {
    stripTrailingSlash: true
  });
  $client.add('listings', {
    stripTrailingSlash: true
  });

  $client.add('bookings', {
    stripTrailingSlash: true
  });

  $client.add('propertyTypes', {
    stripTrailingSlash: true
  });

  var cat = getUrlParameter('cat');
  var page = getCurentFileName();
  console.log(page);
  if (page == 'category-list') {
    getPropertyList();


  } else {
    //home page

    initProprtyTypes();
    getCategories(initCategoriesOptions);

    getPropertyList();
  }

  createMenu();


  //$('.collapse').collapse();

  /*Booking Calendar*/
  //Date for the calendar events (dummy data)
  var date = new Date();
  var d = date.getDate(),
    m = date.getMonth(),
    y = date.getFullYear();


  $(".refreshPropertyCode").change(function () {
    //console.log($('option:selected', this).attr('listing_id'));
    $(".property_code").val($('option:selected', this).attr('listing_id'));
  });

  $(".property_code").change(function () {
    $('.booking_calendar').fullCalendar('refetchEvents');
  });




});

var searchRealestate = function () {
  var q = jQuery("#search-q").val();
  var listing_id = jQuery("#search-listing_id").val();
  var price = jQuery("#search-price").val();
  var property_type_id = jQuery("#search-property_type_id").val();
  var category_id = jQuery("#search-category_id").val();
  if ($.trim(q).length == 0 && $.trim(listing_id).length == 0 && $.trim(price).length == 0 && $.trim(property_type_id).length == 0 && $.trim(category_id).length == 0) {
    alert("Please enter search criteria!");
  } else {
    try {
      var request = $client.listings.read({category_id: category_id, q: q, listing_id: listing_id, price: price, property_type_id: property_type_id});
      request.done(function (data) {
        //console.log(data);
        if (data.success == true) {
          renderPropertyList(data);
        }
      });
    } catch (e) {
      console.error(e.toString());
    }
  }
};

var postByJq = function (url, data, callback) {
  $.ajax({
    url: url,
    type: "POST",
    dataType: 'jsonp',
    data: data,
    processData: false,
    contentType: 'application/json',
    CrossDomain: true,
    async: false,
    success: function (data) {
      console.log(data);
      callback(data);
    },
    error: function (xhr, ajaxOptions, thrownError) {
      console.log(xhr.status);
      console.log(xhr.responseText);
    }
  });
}

var createMenu = function () {
  getCategories(buildMenu);
};

var buildMenu = function (data) {
  //console.log(data);
  if (data.success == true) {
    var mainNav = jQuery("#main_nav");
    var navContainer = jQuery('<div class="container">');
    navContainer.append('<div class="navbar-header"><button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target=".navbar-collapse"> <span class="sr-only">Toggle navigation</span> <span class="icon-bar"></span> <span class="icon-bar"></span> <span class="icon-bar"></span> </button></div>');

    var navList = jQuery('<ul class="nav navbar-nav  multi-level">');
    var navItem = jQuery('<li><a href="/" data-toggle="collapse" data-target=".navbar-collapse">Home</a></li>');
    navList.append(navItem);
    navItem = jQuery('<li><a href="/category-list" data-toggle="collapse" data-target=".navbar-collapse">Blogs</a></li>');
    navList.append(navItem);
    jQuery.each(data.items, function (index, item) {
      var navItem = '';
      if (item.children.length > 0) {
        navItem = jQuery('<li class="dropdown-submenu"> <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">' + item.name + ' </a></li>');
        navItem.append(recursiveMenuItem(item.children));
      } else {
        navItem = jQuery('<li><a href="#" onclick="getPropertyListByCat(' + item.id + ');" data-toggle="collapse" data-target=".navbar-collapse">' + item.name + '</a></li>');
      }

      navList.append(navItem);
      //console.log(item);

    });

    navContainer.append(jQuery('<div class="navbar-collapse collapse">').append(navList));

    mainNav.html('')
      .append(jQuery('<div class="navbar navbar-default" role="navigation">').append(navContainer));
  }
};

var recursiveMenuItem = function (items) {
  var navList = jQuery('<ul class="dropdown-menu" role="menu">');
  jQuery.each(items, function (index, item) {
    var navItem = '';
    if (item.children.length > 0) {
      navItem = jQuery('<li class="dropdown-submenu"> <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">' + item.name + '</a></li>');
      navItem.append(recursiveMenuItem(item.children));
    } else {
      navItem = jQuery('<li><a href="#"  onclick="getPropertyListByCat(' + item.id + ');" data-toggle="collapse" data-target=".navbar-collapse">' + item.name + '</a></li>');
    }

    navList.append(navItem);
  });

  return navList;
};

var getCategories = function (cb) {
  try {
    var request = $client.categories.read();
    request.done(function (data) {
      //console.log(data);
      if (data.success == true) {

      }
      cb(data);
    });
  } catch (e) {
    console.error(e.toString());
  }
};

var getPropertyTypes = function (cb) {
  try {
    var request = $client.propertyTypes.read();
    request.done(function (data) {
      //console.log(data);
      if (data.success == true) {
        cb(data);
      }

    });
  } catch (e) {
    console.error(e.toString());
  }
};

var initProprtyTypes = function () {
  getPropertyTypes(renderPropertyTypesOptions);
};

var renderPropertyTypesOptions = function (data) {
  if (data.success == true) {
    $('#search-property_type_id')
      .find('option')
      .remove()
      .end()
      .append('<option value="">Select Type</option>')
      //.val('whatever')
    ;
    jQuery.each(data.items, function (index, item) {
      $('#search-property_type_id').append('<option value="' + item.id + '">' + item.title + '</option>');
    });
  }

};

var initCategoriesOptions = function (data) {
  if (data.success == true) {
    $('#search-category_id')
      .find('option')
      .remove()
      .end()
      .append('<option value="">Select Category</option>')
      //.val('whatever')
    ;
    jQuery.each(data.items, function (index, item) {
      $('#search-category_id').append('<option value="' + item.id + '">' + item.name + '</option>');
      if (item.children.length > 0) {
        var space = '-';
        renderCategoriesOptions(item.children, space);
      }
    });
  }
};

var renderCategoriesOptions = function (items, space) {

  jQuery.each(items, function (index, item) {
    $('#search-category_id').append('<option value="' + item.id + '">' + space + item.name + '</option>');
    if (item.children.length > 0) {
      space += '-'
      renderCategoriesOptions(item.children, space);
    }
  });

};

var getPropertyListByCat = function (category_id) {
  g_category_id = category_id;
  try {
    var request = $client.listings.read({category_id: category_id});
    request.done(function (data) {
      //console.log(data);
      if (data.success == true) {
        renderPropertyList(data);
      }
    });
  } catch (e) {
    console.error(e.toString());
  }
};

var getPropertyList = function () {
  g_category_id = 0;
  try {
    var request = $client.listings.read();
    request.done(function (data) {
      //console.log(data);
      if (data.success == true) {
        renderPropertyList(data);
      }
    });
  } catch (e) {
    console.error(e.toString());
  }
};

var renderImages = function (item, container) {
  if (typeof item.images != 'undefined' && item.images.length > 0) {
    var imgHtmls = '<div class="col-sm-3">';
    var imgHtmls = '<div id="images_' + item.title + '_' + item.id + '" class="carousel slide" data-ride="carousel">';
    var indicators = '<ol class="carousel-indicators">';
    var images = '<div class="carousel-inner" role="listbox">';

    jQuery.each(item.images, function (imgIndex, image) {
      indicators += '<li data-target="#images_' + item.title + '_' + item.id + '" data-slide-to="' + imgIndex + '"></li>';
      images += '<div class="item">';

      images += '<img src="' + api_url + 'realestate/img/' + image.thumb_url + '" alt="' + image.caption + '">';
      images += '<div class="carousel-caption">';
      images += image.caption;
      images += '</div>';

      images += '</div>';
    });
    images += '</div>';

    images += '<a class="left carousel-control" href="#carousel-example-generic" role="button" data-slide="prev">';
    images += '<span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>';
    images += '<span class="sr-only">Previous</span>';
    images += '</a>';
    images += '<a class="right carousel-control" href="#carousel-example-generic" role="button" data-slide="next">';
    images += '<span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>';
    images += ' <span class="sr-only">Next</span>';
    images += '</a>';


    imgHtmls += indicators + images + '</div></div>';
    var itemImg = jQuery(imgHtmls);
    container.append(itemImg);
  }


};

var renderPropertyList = function (data) {
  if (data.success == true) {
    if (jQuery("#cat-listings").length == 0) {
      jQuery(".main-container").children().not('.keepdiv').remove();
      jQuery(".main-container").append(jQuery('<div class="row"><div class="col-sm-12" id="cat-listings"></div></div>')).addClass('  bg-primary');
    }
    jQuery("#cat-listings").html('');
    if (data.items.length == 0) {
      jQuery("#cat-listings").html('<div class="row"><div class="col-sm-12">No records found!</div></div>');
      return false;
    }
    jQuery.each(data.items, function (index, item) {
      //console.log(item);
      var itemRow = jQuery('<div class="row"></div>');
      var listing_id = '';
      if(item.listing_id != ''){
        listing_id = item.listing_id + " - ";
      }
      var itemTitle = jQuery('<div class="col-sm-12"><h2>' + listing_id + item.title + '</h2></div>');

      var imgHtmls = '<div class="col-sm-3">';
      if (typeof item.images != 'undefined' && item.images.length > 0) {
        /*imgHtmls += '<div id="images_' + item.title + '_' + item.id + '" class="carousel slide" data-ride="carousel">';
        var indicators = '<ol class="carousel-indicators">';
        var images = '<div class="carousel-inner" role="listbox">';

        jQuery.each(item.images, function (imgIndex, image) {
          indicators += '<li data-target="#images_' + item.title + '_' + item.id + '" data-slide-to="' + imgIndex + '"></li>';
          images += '<div class="item">';

          images += '<img src="' + api_url + 'realestate/img/' + image.thumb_url + '" alt="' + image.caption + '">';
          images += '<div class="carousel-caption">';
          images += image.caption;
          images += '</div>';

          images += '</div>';

        });
        images += '</div>';

        images += '<a class="left carousel-control" href="#images_' + item.title + '_' + item.id + '" role="button" data-slide="prev">';
        images += '<span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>';
        images += '<span class="sr-only">Previous</span>';
        images += '</a>';
        images += '<a class="right carousel-control" href="#images_' + item.title + '_' + item.id + '" role="button" data-slide="next">';
        images += '<span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>';
        images += ' <span class="sr-only">Next</span>';
        images += '</a>';

        indicators += "</ul>";
        imgHtmls += indicators + images + '</div></div>';
        console.log(imgHtmls);*/

        var first_image = '';
        var main_image = '';
        var all_images = '';
        jQuery.each(item.images, function (imgIndex, image) {
          if (imgIndex == 0) {
            first_image = '<img src="' + api_url + 'realestate/img/' + image.thumb_url + '" class="img-fluid"/>';
          }
          if (image.is_main == 1) {
            main_image = '<img src="' + api_url + 'realestate/img/' + image.thumb_url + '" class="img-fluid"/>';
          }
          all_images += '<img src="' + api_url + 'realestate/img/' + image.thumb_url + '" class="img-fluid"/>';

        });
        if (main_image != '') {
          imgHtmls += main_image;
        } else {
          imgHtmls += first_image;
        }

      } else {
        imgHtmls += '<img src="/assets/img/default-images.jpeg" class="img-fluid"/>';
      }
      imgHtmls += '</div>';

      /*
      if(typeof item.bedrooms != 'undefined' && item.bedrooms.length){
        imgHtmls += '<div>Bedrooms: ';
        var sep = '';
        jQuery.each(item.bedrooms, function(index, bedroom){
          imgHtmls += sep + bedroom.title;
          sep = ', ';
        });
        imgHtmls += '</div>';
      }*/

      var itemContent = '<ul class="list-attributes">';
      if (item.bedroomTypes.length > 0) {
        jQuery.each(item.bedroomTypes, function (key1, bedroomType) {
          if (bedroomType.studios.length > 0) {
            itemContent += '<li>' + bedroomType.title + ': ';
            var sep = '';
            jQuery.each(bedroomType.studios, function (bedroomIndex, bedroom) {
              itemContent += sep + bedroom.title;
              sep = ', ';
            });
            itemContent += '</li>';
          }

        });
      }

      itemContent += '</ul>';
      imgHtmls += itemContent;

      var itemContent = '<ul class="list-attributes">';
      if (item.bathroomTypes.length > 0) {
        jQuery.each(item.bathroomTypes, function (key1, bathroomType) {
          if (bathroomType.bathrooms.length > 0) {
            itemContent += '<li>' + bathroomType.title + ': ';
            var sep = '';
            jQuery.each(bathroomType.bathrooms, function (bathroomIndex, bathroom) {
              itemContent += sep + bathroom.title;
              sep = ', ';
            });
            itemContent += '</li>';
          }

        });
      }

      itemContent += '</ul>';
      imgHtmls += itemContent;


      var price = null;
      var priceCat = '';
      if(typeof item.categories != 'undefined'){
        jQuery.each(item.categories, function(catIndex, cat){
          //console.log(cat);
          var tmpPrice = null;
          if(typeof cat.pivot != 'undefined'){
            tmpPrice = parseFloat(cat.pivot.price).toFixed(2);
          }

          if(g_category_id != 0 && g_category_id == cat.id && typeof cat.pivot != 'undefined' && price == null && tmpPrice > 0){
            price = tmpPrice;
            priceCat = cat.name;
          } else if(typeof cat.pivot != 'undefined' && price == null && tmpPrice > 0){
            price = tmpPrice;
            priceCat = cat.name;
          }
        });
      }
      if(price != null){
        imgHtmls += '<div>'+priceCat+': $' + price + '</div>';
      } else {
        //imgHtmls += '<div>Price: $0.00</div>';
      }

      imgHtmls += '</div>';
      var itemImg = jQuery(imgHtmls);


      var itemDesc = jQuery('<div class="col-sm-4"><p>' + item.description + ' <br/> <a href="#" class="btn btn-success" style="text-decoration: none;" onclick="getPropertyListDetail(' + item.id + ' )">View Listing</a></p></div>');

      var itemSmallCalendar = jQuery('<div class="col-sm-5"></div>');
      renderSmallCalendar(item, itemSmallCalendar);

      itemRow.append(itemTitle);
      itemRow.append(itemImg);
      itemRow.append(itemSmallCalendar);
      itemRow.append(itemDesc);

      jQuery("#cat-listings").append(itemRow);
      jQuery("#cat-listings").find(".carousel").carousel({interval: 3000, cycle: true});
    });

    getSmallCalendar('.booking_calendar_small');
  }
};

var getPropertyListDetail = function (id) {
  try {
    var request = $client.listings.read(id);
    request.done(function (data) {
      //console.log(data);
      if (data.success == true) {
        jQuery("#cat-listings").html('');
        var item = data.item;
        //console.log(item);
        var listing_id = '';
        if(item.listing_id != ''){
          listing_id = item.listing_id + " - ";
        }

        var itemRow = jQuery('<div class="row"></div>');
        var itemTitle = jQuery('<div class="col-sm-12"><h2>' + listing_id + item.title + '</h2></div>');

        var imgHtmls = '<div class="col-sm-3">';
        if (typeof item.images != 'undefined' && item.images.length > 0) {

          var first_image = '';
          var main_image = '';
          var all_images = '';
          jQuery.each(item.images, function (imgIndex, image) {
            if (imgIndex == 0) {
              first_image = '<img src="' + api_url + 'realestate/img/' + image.thumb_url + '" class="img-fluid"/>';
            }
            if (image.is_main == 1) {
              main_image = '<img src="' + api_url + 'realestate/img/' + image.thumb_url + '" class="img-fluid"/>';
            }
            all_images += '<img src="' + api_url + 'realestate/img/' + image.thumb_url + '" class="img-fluid"/>';
            ;
          });
          if (main_image != '') {
            imgHtmls += main_image;
          } else {
            imgHtmls += first_image;
          }

        }
        imgHtmls += '</div>';
        imgHtmls += '<div class="col-sm-9">';

        var itemContent = '<ul class="list-attributes">';
        if (item.bedroomTypes.length > 0) {
          jQuery.each(item.bedroomTypes, function (key1, bedroomType) {
            if (bedroomType.studios.length > 0) {
              itemContent += '<li>' + bedroomType.title + ': ';
              var sep = '';
              jQuery.each(bedroomType.studios, function (bedroomIndex, bedroom) {
                itemContent += sep + bedroom.title;
                sep = ', ';
              });
              itemContent += '</li>';
            }

          });
        }

        itemContent += '</ul>';
        imgHtmls += itemContent;

        var itemContent = '<ul class="list-attributes">';
        if (item.bathroomTypes.length > 0) {
          jQuery.each(item.bathroomTypes, function (key1, bathroomType) {
            if (bathroomType.bathrooms.length > 0) {
              itemContent += '<li>' + bathroomType.title + ': ';
              var sep = '';
              jQuery.each(bathroomType.bathrooms, function (bathroomIndex, bathroom) {
                itemContent += sep + bathroom.title;
                sep = ', ';
              });
              itemContent += '</li>';
            }

          });
        }

        itemContent += '</ul>';
        imgHtmls += itemContent;


        var price = null;
        var priceCat = '';
        if(typeof item.categories != 'undefined'){
          jQuery.each(item.categories, function(catIndex, cat){
            //console.log(cat);
            var tmpPrice = null;
            if(typeof cat.pivot != 'undefined'){
              tmpPrice = parseFloat(cat.pivot.price).toFixed(2);
            }

            if(g_category_id != 0 && g_category_id == cat.id && typeof cat.pivot != 'undefined' && price == null && tmpPrice > 0){
              price = tmpPrice;
              priceCat = cat.name;
            } else if(typeof cat.pivot != 'undefined' && price == null && tmpPrice > 0){
              price = tmpPrice;
              priceCat = cat.name;
            }
          });
        }
        if(price != null){
          imgHtmls += '<div>'+priceCat+': $' + price + '</div>';
        } else {
          //imgHtmls += '<div>Price: $0.00</div>';
        }

        imgHtmls += '</div>';
        var itemImg = jQuery(imgHtmls);

        //print and pdf links
        var printAndPdfLinks = '<p><a href="#" onclick="window.print(); return false;" class="btn btn-small btn-success">Print</a>';
        if (data.rentalPdfs != 'undefined' && data.rentalPdfs.length > 0) {
          jQuery.each(data.rentalPdfs, function (pdfIndex, rentalPdf) {
            //printAndPdfLinks += ' <a href="' + api_url + 'realestate/pdf/' + rentalPdf.filename + '" title="' + rentalPdf.title + '" target="_blank" class="btn btn-small btn-success">PDF' + (pdfIndex + 1) + '</a>';
          });

        }
        printAndPdfLinks += '</p>';


        //category prices
        var pricesStr = '';
        if (typeof item.categories != 'undefined' && item.categories.length > 0) {
          var prices = '<ul>';
          jQuery.each(item.categories, function (catIndex, cat) {

            if (typeof cat.pivot != 'undefined' && cat.pivot.price != '0.00') {
              prices += '<li>'+cat.name+': $'+cat.pivot.price+' + Utilities</li>';
            }
          });
          prices += '</ul>';
          pricesStr = '<p>'+prices+'</p>';

        }

        var itemDesc = null;
        if (g_category_id > 0) {
          itemDesc = jQuery('<div class="col-sm-9">'+printAndPdfLinks+'<p>' + item.description  + pricesStr + '<br> <a href="#" onclick="getPropertyListByCat(' + g_category_id + ')">Back to List</a></p></div><div class="col-sm-12"><p></p></div>');
        } else {
          itemDesc = jQuery('<div class="col-sm-9">'+printAndPdfLinks+'<p>' + item.description + pricesStr + '<br> <a href="#" onclick="getPropertyList( )">Back to List</a></p></div><div class="col-sm-12"><p></p></div>');
        }

        itemRow.append(itemTitle);
        itemRow.append(itemImg);
        itemRow.append(itemDesc);


        jQuery("#cat-listings").append(itemRow);
        renderPropertyAttributes(item);

        renderBookingForm(item, "#cat-listings");

        renderCalendar(item, "#cat-listings");

        renderMap(item, "#cat-listings");
      }
    });
  } catch (e) {
    console.error(e.toString());
  }
};

var renderMap = function (item, container) {
  var htmlStr = '<div class="box box-primary"><div class="box-body no-padding">';
  htmlStr += '<div id="listing_map" class="map"></div>';
  htmlStr += '</div><!-- /.box-body --></div><!-- /. box -->';

  var itemRow = jQuery('<div class="row"></div>');
  var itemCol = jQuery('<div class="col-md-12">');

  itemCol.html(jQuery(htmlStr));
  itemRow.append(itemCol);
  jQuery(container).append(itemRow);
  showMap(item);
  //markAddress(item.address1, item.address2, item.city, item.zip, item.province, item.country);


};

var geocoder;
var map;
var maxZoomService;
var markersArray = [];

function initializeMap(item) {
  geocoder = new google.maps.Geocoder();
  var latlng = new google.maps.LatLng(50.9124582, -105.8068414);

  var mapOptions = {
    center: latlng,
    zoom: 12,
    mapTypeId: google.maps.MapTypeId.HYBRID,
    zoomControl: true,
    //overviewMapControl: true,
    //panControl: true,
    mapTypeControl: true,
    //scaleControl: true,
    streetViewControl: true,
    zoomControlOptions: {
      style: google.maps.ZoomControlStyle.SMALL
    }
  };
  map = new google.maps.Map(document.getElementById('listing_map'),
    mapOptions);

  clearOverlays();
  markAddress(item.address1, item.address2, item.city, item.zip, item.province, item.country);


  maxZoomService = new google.maps.MaxZoomService();

  $(".markAddress").blur(function () {

    clearOverlays();
    markAddress(item.address1, item.address2, item.city, item.zip, item.province, item.country);
  });

}
;

//google.maps.event.addDomListener(window, 'load', initializeMap);

var showMap = function (item) {
  google.maps.event.addDomListener(window, 'load', initializeMap(item));
}

var updateMapCenter = function () {

};


var clearOverlays = function () {
  for (var i = 0; i < markersArray.length; i++) {
    markersArray[i].setMap(null);
  }
  markersArray.length = 0;
}

var markAddress = function (address, address2, city, zip, province, country) {
  var final_addr = address;
  if (address2 != '') {
    final_addr += ',' + address2;
  }
  if (city != '') {
    final_addr += ',' + city;
  }
  if (province != '') {
    final_addr += ',' + province;
  }
  if (country != '') {
    final_addr += ',' + country;
  }
  if (zip != '') {
    final_addr += ',' + zip;
  }
  console.log(final_addr);

  geocoder.geocode({'address': final_addr}, function (results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      map.setCenter(results[0].geometry.location);
      map.setZoom(11);
      var marker = new google.maps.Marker({
        map: map,
        animation: google.maps.Animation.DROP,
        position: results[0].geometry.location
      });

      markersArray.push(marker);
    } else {
      console.log("Geocode was not successful for the following reason: " + status);
    }
  });
};

var renderBookingForm = function (item, container) {
  var itemRow = jQuery('<div class="row"></div>');
  var itemCol = jQuery('<div class="col-md-12">');
  itemRow.append(itemCol);
  jQuery(container).append(itemRow);

  jQuery.ajax({
    url: '/pages/booking-form',
    type: 'GET',
    complete: function () {

    },
    success: function (result) {
      var htmlStr = '<a class="btn btn-primary" href="#collapseRentalRequestForm" onclick="jQuery(\'#collapseRentalRequestForm\').toggle();">'
      htmlStr += 'Rental Request Form';
      htmlStr += '</a>';
      htmlStr += '<div id="collapseRentalRequestForm" style="display: none;">';
      htmlStr += '<div class="panel">';
      htmlStr += result;


      htmlStr += '</div>';
      htmlStr += '</div>';




      itemCol.html(jQuery(htmlStr));

      $('#id').val(item.id);
      $('#property_code').val(item.listing_id);

      /*autocomplete property code*/
      $('.property_code').typeahead({
        ajax: api_url + 'realestate/get-properties',
        displayField: 'listing_id'
      });

      $(".textarea").wysihtml5();

      $('#booking_date_range').daterangepicker(
        {
          //format: 'MM/DD/YYYY',
          minDate: today
        },
        function (start, end, label) {
          //console.log('A date range was chosen: ' + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD'));
          var gotoData = $.fullCalendar.moment(start.format('YYYY-MM-DD'));
          $('.booking_calendar').fullCalendar('gotoDate', gotoData);
          $('.booking_calendar').fullCalendar('refetchEvents');
        }
      );
    }
  });

};

var renderCalendar = function (item, container) {
  var htmlStr = '<div class="box box-primary calendar-wrapper"><div class="box-body no-padding">';
  htmlStr += '<div id="booking_calendar" class="booking_calendar"></div>';
  htmlStr += '</div><!-- /.box-body --></div><!-- /. box -->';

  var itemRow = jQuery('<div class="row"></div>');
  var itemCol = jQuery('<div class="col-md-12">');

  itemCol.html(jQuery(htmlStr));
  itemRow.append(itemCol);
  jQuery(container).append(itemRow);

  $('.booking_calendar').fullCalendar({
    header: {
      left: 'prev,next today',
      center: '',
      right: 'title'
    },
    buttonText: {
      today: 'today',
      month: 'month',
      week: 'week',
      day: 'day'
    },
    editable: false,
    droppable: false,
    //events: base_url+'/admin/realestate/bookings/json',
    eventSources: [
      {
        url: api_url + 'realestate/booking/json',
        data: function () {
          return {
            property_code: $('#property_code').val()
          };

        }
      },
      {
        url: api_url + 'realestate/calendar/json',
        data: function () {
          return {
            property_code: $('.property_code').val()
          };

        }
      }

    ],
    dayRender: function (date, cell) {
      //console.log(cell);
      cell.addClass("status-free");
    },
    eventRender: function (event, element) {
      //console.log(element);
      var color = '#DFC';
      if (event.className == "status-booked") {
        color = '#FFC0BD';
      } else if (event.className == "status-changeover") {
        color = '#FEE2A0';
      }
      var dataToFind = moment(event.start).format('YYYY-MM-DD');
      $("td[data-date='" + dataToFind + "']").removeClass('status-free');
      $("td[data-date='" + dataToFind + "']").addClass(event.className);

      $("td[data-date='" + dataToFind + "']").css('background', color);
      //console.log($("td[data-date='"+dataToFind+"']"));
    }
  });
};

var renderSmallCalendar = function (item, container) {
  var calWrapper = jQuery('<div class="box box-primary calendar-wrapper"></div>');
  var calWrapperInner = jQuery('<div class="box-body no-padding"></div>');
  var calendar = jQuery('<div id="booking_calendar_'+item.id+'" property_id="'+item.listing_id+'" class="booking_calendar_small"></div>');

  var smallCal = jQuery('<div class="smallCalendar"></div>');

  calWrapperInner.append(calendar);
  calWrapper.append(calWrapperInner);
  smallCal.append(calWrapper);
  jQuery(container).append(smallCal);


};

var postBookRequest = function (e) {
  try {
    //var bookData = $("#addBooking").serializeArray();
    var bookData = {
      _token: $("#_token").val(),
      listing_id: $("#id").val(),
      first_name: $("#first_name").val(),
      id: $("#id").val(),
      last_name: $("#last_name").val(),
      property_code: $("#property_code").val(),
      other_property_code: $("#other_property_code").val(),
      booking_date_range: $("#booking_date_range").val(),
      address: $("#address").val(),
      address2: $("#address2").val(),
      city: $("#city").val(),
      province: $("#province").val(),
      zip: $("#zip").val(),
      country: $("#country").val(),
      email: $("#email").val(),
      home_phone: $("#home_phone").val(),
      business_phone: $("#business_phone").val(),
      num_adults: $("#num_adults").val(),
      num_children: $("#num_children").val(),
      pets: $("#pets").val(),
      pets_description: $("#pets_description").val(),
      is_smoker: $("#is_smoker").val(),
      num_smokers: $("#num_smokers").val(),
      rental_price_total: $("#rental_price_total").val(),
      deposit: $("#deposit").val(),
      comments: $("#comments").val()

    };
    //var bookingUrl = api_url + 'realestate/bookings';
    //postByJq(bookingUrl, bookData, bookingDone);
    var request = $client.bookings.create({
      _token: $("#_token").val(),
      listing_id: $("#id").val(),
      first_name: $("#first_name").val(),
      id: $("#id").val(),
      last_name: $("#last_name").val(),
      property_code: $("#property_code").val(),
      other_property_code: $("#other_property_code").val(),
      booking_date_range: $("#booking_date_range").val(),
      address: $("#address").val(),
      address2: $("#address2").val(),
      city: $("#city").val(),
      province: $("#province").val(),
      zip: $("#zip").val(),
      country: $("#country").val(),
      email: $("#email").val(),
      home_phone: $("#home_phone").val(),
      business_phone: $("#business_phone").val(),
      num_adults: $("#num_adults").val(),
      num_children: $("#num_children").val(),
      pets: $("#pets").val(),
      pets_description: $("#pets_description").val(),
      is_smoker: $("#is_smoker").val(),
      num_smokers: $("#num_smokers").val(),
      rental_price_total: $("#rental_price_total").val(),
      deposit: $("#deposit").val(),
      comments: $("#comments").val()

    });

    request.done(function (data) {
      console.log(data);
      if (data.success === true) {
        //alert(data.message);
        showAlert(data.message, "success");
      } else if (data.success === false) {
        var errors = "";
        showAlert("Data not saved try again!", "error");
      } else {
        showAlert("Data not saved try after some time!", "error");
      }
    });
  } catch (e) {
    console.error(e.toString());
  }
  return false;
};

var bookingDone = function (data) {
  console.log(data);
  if (data.success === true) {
    alert(data.message);
  } else {
    alert(data.error);
  }
};

var renderBedrooms = function (item, accordion) {
  if (item.bedrooms.length > 0) {

    var panel = jQuery('<div class="panel panel-default">');
    var panelHeading = jQuery('<div class="panel-heading" role="tab" id="bedrooms">');
    var panelHeadingTitle = jQuery('<h4 class="panel-title">');
    var panelLink = jQuery('<a href="#">Bedroom Description</a>');
    panelHeadingTitle.append(panelLink);
    panelHeading.append(panelHeadingTitle);
    panel.append(panelHeading);

    var panelContainer = jQuery('<div role="tabpanel">');
    var itemContent = '<ul>';
    if (item.bedroomTypes.length > 0) {
      jQuery.each(item.bedroomTypes, function (key1, bedroomType) {
        if (bedroomType.studios.length > 0) {
          itemContent += '<li>' + bedroomType.title + ': ';
          var sep = '';
          jQuery.each(bedroomType.studios, function (bedroomIndex, bedroom) {
            itemContent += sep + bedroom.title;
            sep = ', ';
          });
          itemContent += '</li>';
        }

      });
    }
    /*jQuery.each(item.bedrooms, function(bedroomIndex, bedroom){
     itemContent += '<li>'+bedroom.title+'</li>';
     });*/
    itemContent += '</ul>';
    //console.log(itemContent);
    var panelbody = jQuery('<div class="panel-body"></div>').append(jQuery(itemContent));
    panelContainer.append(panelbody);
    panel.append(panelContainer);
    accordion.append(panel);
  }
};

var renderBathroom = function (item, accordion) {
  if (item.bedrooms.length > 0) {
    var panel = jQuery('<div class="panel panel-default">');
    var panelHeading = jQuery('<div class="panel-heading" role="tab" id="bathroom">');
    var panelHeadingTitle = jQuery('<h4 class="panel-title">');
    var panelLink = jQuery('<a href="#">Bathroom Descriptions</a>');
    panelHeadingTitle.append(panelLink);
    panelHeading.append(panelHeadingTitle);
    panel.append(panelHeading);

    var panelContainer = jQuery('<div role="tabpanel">');
    var itemContent = '<ul >';

    if (item.bathroomTypes.length > 0) {
      jQuery.each(item.bathroomTypes, function (key1, bathroomType) {
        if (bathroomType.bathrooms.length > 0) {
          itemContent += '<li>' + bathroomType.title + ': ';
          var sep = '';
          jQuery.each(bathroomType.bathrooms, function (bathroomIndex, bathroom) {
            itemContent += sep + bathroom.title;
            sep = ', ';
          });
          itemContent += '</li>';
        }

      });
    } else {
      itemContent += '<li>Ensuite 1: ' + item.bathroom_ensuite1 + '</li>';
      itemContent += '<li>Ensuite 2: ' + item.bathroom_ensuite2 + '</li>';
      itemContent += '<li>Bathroom 1: ' + item.bathroom1 + '</li>';
      itemContent += '<li>Bathroom 2: ' + item.bathroom2 + '</li>';
      itemContent += '<li>Bathroom 3: ' + item.bathroom3 + '</li>';
      itemContent += '<li>Bathroom 4: ' + item.bathroom4 + '</li>';

    }
    itemContent += '<li>Notes: ' + item.bathroom_description + '</li>';

    itemContent += '</ul>';
    //console.log(itemContent);
    var panelbody = jQuery('<div class="panel-body"></div>').append(jQuery(itemContent));
    panelContainer.append(panelbody);
    panel.append(panelContainer);
    accordion.append(panel);
  }
};

var renderAmmentities = function (item, accordion) {
  if (item.property_ammenities.length > 0) {

    var panel = jQuery('<div class="panel panel-default">');
    var panelHeading = jQuery('<div class="panel-heading" role="tab" id="ammenities">');
    var panelHeadingTitle = jQuery('<h4 class="panel-title">');
    var panelLink = jQuery('<a href="#">Rental Unit Ammenities</a>');
    panelHeadingTitle.append(panelLink);
    panelHeading.append(panelHeadingTitle);
    panel.append(panelHeading);

    var panelContainer = jQuery('<div role="tabpanel">');
    var itemContent = '<ul>';
    jQuery.each(item.property_ammenities, function (key1, ammenity) {
      itemContent += '<li>' + ammenity.title + '</li>';

    });

    itemContent += '</ul>';
    //console.log(itemContent);
    var panelbody = jQuery('<div class="panel-body"></div>').append(jQuery(itemContent));
    panelContainer.append(panelbody);
    panel.append(panelContainer);
    accordion.append(panel);
  }
};

var renderKithenIncludes = function (item, accordion) {
  if (item.kitchens.length > 0) {

    var panel = jQuery('<div class="panel panel-default">');
    var panelHeading = jQuery('<div class="panel-heading" role="tab" id="kitchens">');
    var panelHeadingTitle = jQuery('<h4 class="panel-title">');
    var panelLink = jQuery('<a href="#">Kitchen Includes</a>');
    panelHeadingTitle.append(panelLink);
    panelHeading.append(panelHeadingTitle);
    panel.append(panelHeading);

    var panelContainer = jQuery('<div role="tabpanel">');
    var itemContent = '<ul>';
    jQuery.each(item.kitchens, function (key1, kitchen) {
      itemContent += '<li>' + kitchen.title + '</li>';

    });

    itemContent += '</ul>';
    //console.log(itemContent);
    var panelbody = jQuery('<div class="panel-body"></div>').append(jQuery(itemContent));
    panelContainer.append(panelbody);
    panel.append(panelContainer);
    accordion.append(panel);
  }
};

var renderElectronicIncludes = function (item, accordion) {
  if (item.electronics.length > 0) {

    var panel = jQuery('<div class="panel panel-default">');
    var panelHeading = jQuery('<div class="panel-heading" role="tab" id="electronics">');
    var panelHeadingTitle = jQuery('<h4 class="panel-title">');
    var panelLink = jQuery('<a href="#">Electronics Includes</a>');
    panelHeadingTitle.append(panelLink);
    panelHeading.append(panelHeadingTitle);
    panel.append(panelHeading);

    var panelContainer = jQuery('<div role="tabpanel">');
    var itemContent = '<ul>';
    jQuery.each(item.electronics, function (key1, electronic) {
      itemContent += '<li>' + electronic.title + '</li>';

    });

    itemContent += '</ul>';
    //console.log(itemContent);
    var panelbody = jQuery('<div class="panel-body"></div>').append(jQuery(itemContent));
    panelContainer.append(panelbody);
    panel.append(panelContainer);
    accordion.append(panel);
  }
};

var renderRestrictions = function (item, accordion) {
  if (item.restrictions.length > 0) {

    var panel = jQuery('<div class="panel panel-default">');
    var panelHeading = jQuery('<div class="panel-heading" role="tab" id="restrictions">');
    var panelHeadingTitle = jQuery('<h4 class="panel-title">');
    var panelLink = jQuery('<a href="#">Restrictions</a>');
    panelHeadingTitle.append(panelLink);
    panelHeading.append(panelHeadingTitle);
    panel.append(panelHeading);

    var panelContainer = jQuery('<div role="tabpanel">');
    var itemContent = '<ul>';
    jQuery.each(item.restrictions, function (key1, restriction) {
      itemContent += '<li>' + restriction.title + '</li>';

    });

    itemContent += '</ul>';
    //console.log(itemContent);
    var panelbody = jQuery('<div class="panel-body"></div>').append(jQuery(itemContent));
    panelContainer.append(panelbody);
    panel.append(panelContainer);
    accordion.append(panel);
  }
};


var renderLocales = function (item, accordion) {
  if (item.locales.length > 0) {

    var panel = jQuery('<div class="panel panel-default">');
    var panelHeading = jQuery('<div class="panel-heading" role="tab" id="locales">');
    var panelHeadingTitle = jQuery('<h4 class="panel-title">');
    var panelLink = jQuery('<a href="#">Locales</a>');
    panelHeadingTitle.append(panelLink);
    panelHeading.append(panelHeadingTitle);
    panel.append(panelHeading);

    var panelContainer = jQuery('<div role="tabpanel">');
    var itemContent = '<ul>';
    jQuery.each(item.locales, function (key1, locale) {
      itemContent += '<li>' + locale.title;
      if (locale.features.length > 0) {
        itemContent +=  '<br> Features: ';
        jQuery.each(locale.features, function (key2, feature) {
          itemContent += '<p style="padding-left: 30px;">' + feature.title + '</p>';
        });
      }
      itemContent += '</li>';

    });

    itemContent += '</ul>';
    //console.log(itemContent);
    var panelbody = jQuery('<div class="panel-body"></div>').append(jQuery(itemContent));
    panelContainer.append(panelbody);
    panel.append(panelContainer);
    accordion.append(panel);
  }
};



var renderPropertyAttributes = function (item) {
  //console.log(item);
  var itemRow = jQuery('<div class="row"></div>');
  var itemCol = jQuery('<div class="col-md-12">');
  var accordion = jQuery('<div class="panel-group">');

  //Bed Types & Locations START
  renderBedrooms(item, accordion);
  //Bed Types & Locations END

  //Bathroom Descriptions START
  renderBathroom(item, accordion);
  //Bathroom Descriptions END
  //Rental Unit Ammenities
  renderAmmentities(item, accordion);

  //renderKithenIncludes
  renderKithenIncludes(item, accordion);

  renderElectronicIncludes(item, accordion);

  renderLocales(item, accordion);

  renderRestrictions(item, accordion);

  itemCol.append(accordion);
  itemRow.append(itemCol);
  jQuery("#cat-listings").append(itemRow);

};



function getUrlParameter(sParam)
{
  var sPageURL = window.location.search.substring(1);
  var sURLVariables = sPageURL.split('&');
  for (var i = 0; i < sURLVariables.length; i++)
  {
    var sParameterName = sURLVariables[i].split('=');
    if (sParameterName[0] == sParam)
    {
      return sParameterName[1];
    }
  }
};




var getCurentFileName = function () {
  var pagePathName = window.location.pathname;
  return pagePathName.substring(pagePathName.lastIndexOf("/") + 1);
};


var getSmallCalendar = function (selector) {
  jQuery(selector).each(function(index){
    var thisObj = this;
    jQuery(thisObj).fullCalendar({
      height: 'auto',
      aspectRatio: 1,
      header: {
        left: 'prev',
        center: 'title',
        right: 'next'
      },
      buttonText: {
        today: 'today',
        month: 'month',
        week: 'week',
        day: 'day'
      },
      editable: false,
      droppable: false,
      eventSources: [
        {
          url: api_url + 'realestate/booking/json',
          data: function () {
            return {
              property_code: jQuery(thisObj).attr('property_id')
            };

          }
        },
        {
          url: api_url + 'realestate/calendar/json',
          data: function () {
            return {
              property_code: jQuery(thisObj).attr('property_id')
            };

          }
        }

      ],
      dayRender: function (date, cell) {
        //console.log(cell);
        cell.addClass("status-free");
      },
      eventRender: function (event, element) {
        //console.log(element);
        var color = '#DFC';
        if (event.className == "status-booked") {
          color = '#FFC0BD';
        } else if (event.className == "status-changeover") {
          color = '#FEE2A0';
        }
        var dataToFind = moment(event.start).format('YYYY-MM-DD');
        $("td[data-date='" + dataToFind + "']").removeClass('status-free');
        $("td[data-date='" + dataToFind + "']").addClass(event.className);

        $("td[data-date='" + dataToFind + "']").css('background', color);
        //console.log($("td[data-date='"+dataToFind+"']"));
      }
    });
  });
};


var showAlert = function(msg, className){
  $(".alert").addClass("hide");
  $(".alert-"+className).html(msg);
  $(".alert-"+className).removeClass("hide");
};