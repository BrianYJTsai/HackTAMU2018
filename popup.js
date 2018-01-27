/*
$(document).click(function() {
    alert("Hello");
});*/

$("#selectedText").on("click", function() {
   var text = "";
   if (window.getSelection) {
       text = window.getSelection().toString();
   }
   alert(text);
});
