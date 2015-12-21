// ==UserScript==
// @name        Igariooo
// @namespace   irmgrx
// @include     http://agar.io/*
// @include     https://agar.io/*
// @require     https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js
// @author      irmgrx
// @version     1
// @grant       GM_xmlhttpRequest
// ==/UserScript==

console.log("GreaseMonkey Loading");

(function(){
    var JQUERY = "https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"
    var MAINOUT = "https://googledrive.com/host/0B-pE6yLMAbwMNUtzbThqSXdLTEk";
    var CSSFILE = "https://googledrive.com/host/0B-pE6yLMAbwMX1dtRkdiM3M1WWM";
    var SOCKETIO = "https://cdnjs.cloudflare.com/ajax/libs/socket.io/1.3.7/socket.io.min.js";

    if(location.host == "agar.io" && location.pathname=="/"){
        location.href="http://agar.io/igar" + location.hash;
        return;
    }
    $("head").append('<link rel="stylesheet" href="'+ CSSFILE +'">');
    $.getScript(JQUERY, function( data, textStatus, jqxhr ) {
      $.getScript(SOCKETIO, function( data, textStatus, jqxhr ) {
        $.getScript(MAINOUT);
      });
    });
})();
