<!DOCTYPE html>
<html lang="en">
<head>
    <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
    <meta content="IE=edge" http-equiv="X-UA-Compatible" />
    <meta content='width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no' name='viewport'>
    <title>Tri-W Realty Inc - Collingwood Real Estate Blue Mountain Real Estate</title>
    <meta content="" name="description" />
    <meta content="" name="keywords" />
    <link href="//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" rel="stylesheet">
    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
    <script src="//oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
    <script src="//oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
    <link href="{{ asset('/vendor/bootstrap/css/bootstrap.min.css')}}" rel="stylesheet" />
    <link href="{{ asset('/assets/css/style.css')}}" rel="stylesheet" />
    <!-- Date Picker -->
    <link href="{{ asset('/vendor/plugins/datepicker/datepicker3.css')}}" rel="stylesheet" type="text/css"/>
    <!-- Daterange picker -->
    <link href="{{ asset('/vendor/plugins/daterangepicker/daterangepicker-bs3.css')}}" rel="stylesheet" type="text/css"/>
    <!-- bootstrap wysihtml5 - text editor -->
    <link href="{{ asset('/vendor/plugins/bootstrap-wysihtml5/bootstrap3-wysihtml5.min.css')}}" rel="stylesheet"
          type="text/css"/>

    <!-- fullCalendar 2.2.5-->
    <link href="{{ asset('/vendor/plugins/fullcalendar/fullcalendar.min.css')}}" rel="stylesheet" type="text/css" />
    <link href="{{ asset('/vendor/plugins/fullcalendar/fullcalendar.print.css')}}" rel="stylesheet" type="text/css" media='print' />

    <link href="{{ asset('/assets/css/custom.css')}}" rel="stylesheet" />
</head>
<body>
<div id="loading" style="display:none;"><img id="loading-image" src="{{ asset('/assets/img/ajax-loader.gif')}}" alt="waiting..." /></div>
<header>
    <div class="container">
        <div class="row bg-primary">
            <div class="col-sm-4"> <img src="{{ asset('/assets/img/logo_trinity.jpg')}}"/> </div>
            <div class="col-sm-4 text-center"> <img src="{{ asset('/assets/img/slogan.jpg')}}" class="HideOnMobile"/> </div>
            <div class="col-sm-4 text-right"> <img src="{{ asset('/assets/img/logo_carriage.jpg')}}"/> </div>
        </div>
        <div class="row">
            <div class="col-sm-12 bg-warning"> <img src="{{ asset('/assets/img/slider_placeholder.jpg')}}" class="img-fluid"/> </div>
        </div>
        <div class="row bg-info">
            <div class="col-sm-2">
                <h3>Collingwood</h3>
                <p>705.444.1420</p>
            </div>
            <div class="col-sm-2">
                <h3>Blue Mountains</h3>
                <p>705.445.7799</p>
            </div>
            <div class="col-sm-2">
                <h3>Stayner</h3>
                <p>705.428.3349</p>
            </div>
            <div class="col-sm-2">
                <h3>Wasaga Beach</h3>
                <p>705.429.4800</p>
            </div>
            <div class="col-sm-4 alert">
                <img src="{{ asset('/assets/img/icon_fb.jpg')}}"/>
                <img src="{{ asset('/assets/img/icon_googleplus.jpg')}}"/>
                <img src="{{ asset('/assets/img/icon_linkedin.jpg')}}"/>
                <img src="{{ asset('/assets/img/icon_twitter.jpg')}}"/>
                <img src="{{ asset('/assets/img/icon_youtube.jpg')}}"/>
                <img src="{{ asset('/assets/img/icon_pintrest.jpg')}}"/>
            </div>
        </div>
        <div class="row" id="main_nav">
            <div class="navbar navbar-default" role="navigation">
                <div class="container">
                    <div class="navbar-header">
                        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target=".navbar-collapse"> <span class="sr-only">Toggle navigation</span> <span class="icon-bar"></span> <span class="icon-bar"></span> <span class="icon-bar"></span> </button>
                    </div>
                    <div class="navbar-collapse collapse">
                        <ul class="nav navbar-nav">
                            <li class="" ><a href="/" data-toggle="collapse" data-target=".navbar-collapse">Home</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</header>
<div class="container main-container  bg-primary" id="main-container">

    <div class="row">
        <div class="alert alert-success hide"></div>
        <div class="alert alert-error hide"></div>
        <div class="col-sm-9"  id="cat-listings">
            @yield('content')
        </div>
        <div class="col-sm-3">


        </div>
    </div>


</div>
<footer>
    <div class="container bg-primary">
        <div class="row">
            <div class="col-sm-12">
                <p>Independently owned and operated</p>
                <p>The areas we serve include: Collingwood, Blue Mountains (formerly Town of the Blue Mountains) including Thornbury, Clarksburg, Craigleith; Wasaga Beach; Clearview Township including Creemore, New Lowell, Nottawa, Nottawasaga, Stayner & Sunnidale; Essa Township; Grey Highlands including Artemesia, Euphrasia, Flesherton, Markdale, Osprey; Municipality of Meaford including St Vincent, Sydenham; Mulmur Township; Springwater Township including Elmvale; Tiny Township including Balm Beach.</p>
                <p>© 2015 - Royal LePage Trinity Realty Inc, Brokerage - Website Design by Pinpoint Media Design using Site.DFiner <a href="#">Log in</a></p>
            </div>
        </div>
    </div>
</footer>


<script type="text/javascript"  src="{{ asset('vendor/jquery/jquery.min.js')}}"></script>
<script type="text/javascript"  src="{{ asset('vendor/bootstrap/js/bootstrap.min.js')}}"></script>


<!-- daterangepicker -->
<script src="{{ asset('/vendor/plugins/daterangepicker/daterangepicker.js')}}" type="text/javascript"></script>

<!--script type="text/javascript"  src="{{ asset('/vendor/rest-api/xdomain.min.js')}}"></script-->
<script type="text/javascript"  src="{{ asset('/vendor/rest-api/jquery.rest.min.js')}}"></script>

<script type="text/javascript"  src="{{ asset('/vendor/plugins/typeahead/bootstrap-typeahead.min.js')}}"></script>
<!-- daterangepicker -->
<script src="{{ asset('/vendor/plugins/daterangepicker/daterangepicker.js')}}" type="text/javascript"></script>
<!-- datepicker -->
<script src="{{ asset('/vendor/plugins/datepicker/bootstrap-datepicker.js')}}" type="text/javascript"></script>
<!-- Bootstrap WYSIHTML5 -->
<script src="{{ asset('/vendor/plugins/bootstrap-wysihtml5/bootstrap3-wysihtml5.all.min.js')}}"
        type="text/javascript"></script>
<!-- fullCalendar 2.2.5 -->
<script src="//cdnjs.cloudflare.com/ajax/libs/moment.js/2.7.0/moment.min.js" type="text/javascript"></script>
<script src="{{ asset('/vendor/plugins/fullcalendar/fullcalendar.min.js')}}" type="text/javascript"></script>

<script type="text/javascript" src="//maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyAN6uOtSc22g0MesTxxfh92fI3rbe7VlKc&region=CA"></script>

<!-- Javascript Validation -->
<script type="text/javascript" src="{{ asset('/vendor/plugins/validator/validator.min.js')}}"></script>
<script type="text/javascript"  src="{{ asset('/assets/js/map.js')}}"></script>
<script type="text/javascript"  src="{{ asset('/assets/js/custom.js')}}"></script>
<script type="text/javascript">
    //var $ = jQuery.noConflict(); //mootools is using $ on CREA listings for map modal
    jQuery(document).ready(function () {
        jQuery('#myCarousel').carousel({interval: 3000, cycle: true});
    });
</script>

<script language="JavaScript" type="text/javascript">
    function changeFontSize(inc)
    {
        var p = document.getElementsByTagName('p');
        for (n = 0; n < p.length; n++) {
            if (p[n].style.fontSize) {
                var size = parseInt(p[n].style.fontSize.replace("px", ""));
            } else {
                var size = 14;
            }
            p[n].style.fontSize = size + inc + 'px';
        }
    }
</script>
</body>
</html>