var OkCorgiApp = function() {

  function createCorgiThumbnail() {
    // Create new thumbnail list item from active corgi
    var corgiEl = $("li.corgi.active");
    var img = corgiEl.find("img").attr("src");
    var name = corgiEl.find("h3").text();

    var newEl = $("<li class=\"corgi\"><h4>" + name + "</h4><img src=\"" + img + "\" class=\"pic\" /></li>");

    return newEl;
  }

  function showNextCorgi() {
    var currentCorgiEl = $("li.corgi.active");

    if (currentCorgiEl.next().length > 0) {
      // Remove the class of hidden from the next corgi
      currentCorgiEl.next().removeClass("hidden").addClass("active");
    }
    else {
      alert("No more Corgis!");
    }

    // Remove active corgi from candidates
    currentCorgiEl.remove();
  }

  // When paw right is clicked
  $(".choose-corgi").on("click", function() {
    var elId = $(this).attr("id");
    var containerSelector = "";
    var matchVar = false;

    if (elId === "paw-left") {
      containerSelector = "#misses";
    }
    else {
      containerSelector = "#matches";
      matchVar = true;
    }

    // Append thumbnail list item to the #matches list
    $(containerSelector + " ul").append(createCorgiThumbnail());

    self = $("li.corgi.active")

    $.ajax({
        url: "/corgis/" + self.attr("data-id"),
        type: "PUT",
        dataType: "json",
        data: {corgi: {match: matchVar} },
        success: function(data){
          console.log("it worked " + data);
        }
    });


    showNextCorgi();
  });

  $("a").on('click', function(event){
    event.preventDefault();
  })

}


$(document).ready(function() {

  OkCorgiApp();

});
