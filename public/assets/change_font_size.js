function fontElementLoop(p,inc) {
   for(n=0; n<p.length; n++) { 
      if(p[n].style.fontSize) { 
         var size = parseInt(p[n].style.fontSize.replace("px", "")); 
      } else { 
         var size = 14; 
      } 
      if (size == 7) { 
         size = 8; 
      } else if (size == 20) { 
         size = 19; 
      } 
      p[n].style.fontSize = size+inc + 'px'; 
   } 
}

function changeFontSize(inc) { 
   var p = document.getElementsByTagName('p'); 
   fontElementLoop(p,inc);
   var li = document.getElementsByTagName('li'); 
   fontElementLoop(li,inc);
   //var a = document.getElementsByClassName('le'); 
   //fontElementLoop(a,inc);
}

/*
* Copyright 2010 by Glam Thumbs Team.
*
* How To Use The Script:
* add to your page this code between inside head tags
* <script type="text/javascript" src="BookmarkApp.js"></script> 
* add anchor with void href like this: 
* <a href="javascript:void(0)" onClick="return BookmarkApp.addBookmark(this)">bookmark us</a> 
* 
*/


ATBookmarkApp = function () {
    var isIEmac = false; /*@cc_on @if(@_jscript&&!(@_win32||@_win16)&& 
(@_jscript_version<5.5)) isIEmac=true; @end @*/
    var isMSIE = (-[1,]) ? false : true;
    var cjTitle = "Trinity Realty";
    var cjHref = location.href;

    function hotKeys() {
        var ua = navigator.userAgent.toLowerCase();
        var str = '';
        var isWebkit = (ua.indexOf('webkit') != - 1);
        var isMac = (ua.indexOf('mac') != - 1);

        if (ua.indexOf('konqueror') != - 1) {
            str = 'CTRL + B'; // Konqueror
        } else if (window.home || isWebkit || isIEmac || isMac) {
            str = (isMac ? 'Command/Cmd' : 'CTRL') + ' + D'; // Netscape, Safari, iCab, IE5/Mac
        }
        return ((str) ? 'Press ' + str + ' to bookmark this page.' : str);
    }

    function isIE8() {
        var rv = -1;
        if (navigator.appName == 'Microsoft Internet Explorer') {
            var ua = navigator.userAgent;
            var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
            if (re.exec(ua) != null) {
                rv = parseFloat(RegExp.$1);
            }
        }
        if (rv > - 1) {
            if (rv >= 8.0) {
                return true;
            }
        }
        return false;
    }

    function addBookmark(a) {
        try {
            if (typeof a == "object" && a.tagName.toLowerCase() == "a") {
                a.style.cursor = 'pointer';
                if ((typeof window.sidebar == "object") && (typeof window.sidebar.addPanel == "function")) {
                    window.sidebar.addPanel(cjTitle, cjHref, ""); // Gecko
                    return false;   
                } else if (isMSIE && typeof window.external == "object") {
                    if (isIE8()) {
                        window.external.AddToFavoritesBar(cjHref, cjTitle); // IE 8                    
                    } else {
                        window.external.AddFavorite(cjHref, cjTitle); // IE <=7
                    }
                    return false;
                } else if (window.opera) {
                    a.href = cjHref;
                    a.title = cjTitle;
                    a.rel = 'sidebar'; // Opera 7+
                    return true;
                } else {
                    alert(hotKeys());
                }
            } else {
                throw "Error occured.\r\nNote, only A tagname is allowed!";
            }
        } catch (err) {
            alert(err);
        }
        
    }
    
    return {
        addBookmark : addBookmark
    }
}();
