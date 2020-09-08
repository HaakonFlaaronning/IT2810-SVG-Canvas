// Listen for document fully loaded
document.addEventListener("DOMContentLoaded", domloaded, false);

function domloaded() {
  // Eventlisteners
  let parent = document.getElementById("parent");
  parent.addEventListener("click", beginAnimation);

  /**
   * Set parameters to animationTransform element
   * @param obj trans
   * @param obj obj
   * @param int dur
   * @param int from
   * @param int to
   *
   * @return void
   */
  function setParameters(trans, obj, dur, from, to) {
    trans.setAttribute("dur", dur + "s");
    trans.setAttribute("from", from + "," + obj.x.baseVal.value + "," + obj.y.baseVal.value);
    trans.setAttribute("to", to + "," + obj.x.baseVal.value + "," + obj.y.baseVal.value);
    return;
  }

  /**
   * Start the bicep-curl animation
   */
  function beginAnimation() {
    // Animation elements left arm
    let lat = document.getElementById("left-arm-trans");
    let la = document.getElementById("left-arm");
    let latd = document.getElementById("left-arm-transd");
    let lat2 = document.getElementById("left-arm2-trans");
    let lat2d = document.getElementById("left-arm2-transd");
    let la2 = document.getElementById("left-arm2");
    let lw = document.getElementById("left-weight");
    let lwt = document.getElementById("left-weight-trans");
    let lwtd = document.getElementById("left-weight-transd");

    // Animation elements right arm
    let rat = document.getElementById("right-arm-trans");
    let ratd = document.getElementById("right-arm-transd");
    let ra = document.getElementById("right-arm");
    let rat2 = document.getElementById("right-arm2-trans");
    let ra2 = document.getElementById("right-arm2");
    let rat2d = document.getElementById("right-arm2-transd");
    let rw = document.getElementById("right-weight");
    let rwt = document.getElementById("right-weight-trans");
    let rwtd = document.getElementById("right-weight-transd");

    // Animate left arm
    setParameters(lat, la, 1, 0, 10);
    setParameters(latd, la, 1, 10, 0);
    setParameters(lat2, la2, 1, 0, 45);
    setParameters(lat2d, la2, 1, 45, 0);
    setParameters(lwt, lw, 1, 0, 45);
    setParameters(lwtd, lw, 1, 45, 0);

    // Animate right arm
    setParameters(rat, ra, 1, 0, 10);
    setParameters(ratd, ra, 1, 10, 0);
    setParameters(rat2, ra2, 1, 0, 45);
    setParameters(rat2d, ra2, 1, 45, 0);
    setParameters(rwt, rw, 1, 0, 45);
    setParameters(rwtd, rw, 1, 45, 0);

    // Begin animations
    lat.beginElement();
    lat2.beginElement();
    rat.beginElement();
    rat2.beginElement();
    lwt.beginElement();
    rwt.beginElement();
  }
}
