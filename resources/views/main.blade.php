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
    <!--div class="row bg-primary">
        <div class="col-sm-8">
            <div id="myCarousel" class="carousel slide" data-ride="carousel">
                <ol class="carousel-indicators">
                    <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
                    <li data-target="#myCarousel" data-slide-to="1"></li>
                </ol>
                <div class="carousel-inner">
                    <div class="item active"> <img src="{{ asset('/assets/img/slider2_placeholder1.png')}}" class="img-fluid" alt=""/> </div>
                    <div class="item"> <img src="{{ asset('/assets/img/slider2_placeholder2.png')}}" class="img-fluid"  alt=""/> </div>
                </div>
            </div>

        </div>
        <div class="col-sm-4">
            <iframe width="100%" height="300" src="//www.youtube.com/embed/IC7KjtgxmJs?list=PLOKoTy8yPzZYbAzBmJZhkDb4TedrrS6HT" frameborder="0" allowfullscreen=""></iframe>
        </div>
    </div-->
    <div class="row">
        <div class="alert alert-success hide"></div>
        <div class="alert alert-error hide"></div>
        <div class="col-sm-12"  id="cat-listings">
            @yield('content')
        </div>
    </div>
    <div class="row bg-danger">
        <div class="col-sm-12">
            <h2>Read Our Latest Blog Post</h2>
            <h4>Before You Buy a Home, Make Sure You Get a Professional Inspection Done</h4>
            <p>Once you decide to buy a home, you may feel a little bit overwhelmed by all of the research involved prior to actually committing
                to purchase the home. If you have placed an offer on the home you want to buy, a detailed home inspection is critical.
                General home inspections analyse the structural components and mechanical systems of a
                home and are meant to alert buyers to any existing or potential problem with the property.</p>
            <a href="#">Read more..</a>
        </div>
    </div>

    <div class="row bg-primary">

        <div class="col-sm-2">
            <img src="{{ asset('/assets/img/copy_prev_1425506158.jpg')}}" class="img-fluid"/>

        </div>
        <div class="col-sm-10">
            <h2>Announcement</h2>
            <p> Dale and Victoria Tkatch and Jane and Steve Moysey are pleased to announce that TRI-W Realty Inc., Brokerage has been acquired and merged with Royal LePage Trinity Realty, Brokerage.  TRI-W Realty's operation and team shall remain at their current location at 209820 Hwy 26 W, Craigleith, and will continue to offer their array of real estate and rental services to their existing and new clientele. The TRI-W team is looking forward to being part of Royal LePage Trinity Realty, a well established real estate firm, with offices serving Collingwood, Wasaga Beach, Stayner and now The Blue Mountains.  The TRI-W team is also very pleased to be part of Royal LePage Canada and to offer the networking, marketing and brand power of Canada's largest real estate conglomerate to their customers.

                More Info.. </p>

        </div>



    </div>
    <div class="row bg-primary">

        <div class="col-sm-12">
            <h2>Real Estate in Collingwood, Blue Mountains, Wasaga Beach and Stayner</h2>
            <p>Welcome to Collingwood, Blue Mountains, Wasaga Beach, Stayner and the Southern Georgian Bay area in Ontario, Canada. Royal LePage Trinity Realty and our team of dedicated real estate agents are looking forward to assisting you with all your real estate needs. As professional REALTORS® we strive hard to help you find the right property and don't rest until you are satisfied with the results. </p>

        </div>



    </div>

    <div class="row bg-primary">

        <div class="col-sm-12">
            <h2>The Royal LePage Brand</h2>
            <p>Helping you is what we do. Royal LePage’s commitment to quality service and innovation is embodied in this, our value proposition to consumers, to sales representatives, and to brokers.</p>
            <p>Royal LePage has a proud history of delivering quality service and innovation, dating back to 1913. Our founder, A.E. LePage, introduced many firsts to the Canadian real estate industry, including property showings by automobile, detailed property descriptions in newspaper advertising, and the use of film to showcase homes.</p>
            <p>Today, Royal LePage has grown to become one of the strongest and most trusted brands in Canadian residential real estate. With more than 13,500 sales representatives in over 600 offices coast–to–coast, we have doubled our size and tripled our market share over the last ten years.</p>
            <p>We continue to grow by developing our founder’s tradition of quality service and innovation. Only Royal LePage offers an industry-leading suite of propriety tools, products and services to help our consumers, our sales representatives, and our brokers become more successful in their real estate endeavors.
            </p>

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





