$(document).ready(function () {
  // Change color when hovering over SVG body
  $("#body").hover(
    function () {
      $(this).css({ fill: "blue" });
    },
    function () {
      $(this).css({ fill: "grey" });
    }
  );

  // Change color when clicking the robot's antenna
  $("#light").click(function () {
    if ($(this).css("fill") == "rgb(255, 0, 0)") {
      $(this).css({ fill: "yellow" });
    } else {
      $(this).css({ fill: "red" });
    }
    if ($("#pole").css("fill") == "rgb(0, 0, 255)") {
      $("#pole").css({ fill: "white" });
    } else {
      $("#pole").css({ fill: "blue" });
    }
  });

  // Hide/show the documenation section
  $("#hideshow").on("click", function () {
    $("#docu-box").toggle("slow");
  });

  // Resize the robot upon resizing the screen
  $(window).resize(function () {
    resizeRobot();
  });
  resizeRobot();
});

/**
 * Resize the SVG robot
 */
function resizeRobot() {
  let cw = $("#parent").width();
  $("#parent").css({
    height: 0.8 * cw + "px",
  });
}
