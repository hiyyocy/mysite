/*---------------------------------------
スムーススクロール
---------------------------------------*/

const interval_ms = 10;
const move_division = 10.0;
const y_shift = -50;
const y_threhold = 1;
var y_diff;
var y;
var y_target;
var count;
var selectedTarget;
var previousTarget;
var isMoving = false;
const aTags = document.querySelectorAll("a");
aTags.forEach(aTag => {
    aTag.onclick = function() {
        document.querySelector("html").style.scrollBehavior = "auto";
        var hrefTarget = aTag.getAttribute("href");
        if (hrefTarget != null) {
            var firstCharactor = hrefTarget.substr(0, 1);
            if (firstCharactor == "#") {
                var targetName = hrefTarget.substr(1);
                // console.log(previousTarget == targetName);
                if ((previousTarget == targetName && isMoving == false) || (previousTarget != targetName)) {
                    isMoving = true;
                    selectedTarget = targetName;
                    aTag.removeAttribute("href");
                    count = 0;
                    console.log(" click:", targetName);
                    scroll_start(targetName, aTag);
                    previousTarget = targetName;
                } else {
                    console.log("moving:", targetName);
                    aTag.removeAttribute("href");
                }
            }
        }
    }
});

function scroll(p_target, aTag) {
    if (p_target == selectedTarget) {
        // console.log("OK:", p_target, selectedTarget);
        count += 1;
        var y_move = y_diff / move_division;
        y += y_move;
        scrollTo(0, y);
        y_diff = y_target - y;

        if ((y_diff < 0 && y_target < y) || (0 < y_diff && y < y_target)) {
            if (Math.abs(y_diff) >= y_threhold) {
                setTimeout(function() { scroll(p_target, aTag); }, interval_ms);
                // console.log("[1-1]", p_target, aTag, count);
            } else {
                scrollTo(0, y_target);
                document.querySelector("html").style.scrollBehavior = "smooth";
                // window.location.href = "#"+p_target;
                isMoving = false;
                // console.log("[1-2]", p_target, aTag, count, isMoving);
                console.log("   end:", p_target);
            }

            if (count >= 2) {
                // console.log("Tag is backed [1]");
                aTag.setAttribute("href", "#" + p_target);
            }
        } else {
            if (count == 1) {
                setTimeout(function() { scroll(p_target, aTag); }, interval_ms);
                // console.log("[2-1]", p_target, aTag, count);
            } else {
                // console.log("Tag is backed [2]");
                aTag.setAttribute("href", "#" + p_target);
                document.querySelector("html").style.scrollBehavior = "smooth";
                // window.location.href = "#"+p_target;
                isMoving = false;
                // console.log("[2-2]", p_target, aTag, count, isMoving);
                console.log("   end:", p_target);
            }
        }
    } else {
        // console.log("NG:", p_target, selectedTarget);
        // console.log("Tag is backed [3]");
        aTag.setAttribute("href", "#" + p_target);
        console.log("cancel:", p_target);
    }
}

function scroll_start(p_target, aTag) {
    // scroll position from top of a page to top of a current view area
    y = window.pageYOffset;
    // scroll position from top of a current view area to top of a target element
    y_diff = parseInt(document.getElementById(p_target).getBoundingClientRect().top);
    // calculate top position of target
    y_target = y_diff + y + y_shift;
    scroll(p_target, aTag);
}