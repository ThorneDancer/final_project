
// You may change this number if you want to increase or decrease the speed of your navigation animtion
var speedOfAnimation = 0.5;
var $burger = $("#burger-icon");
var $offCanvas = $('#off-canvas-container');
var isVisible = false;
var $main = $('main');
var leftOrRight;
var $fixedItem = $("[data-fixed=fixed-item]");


//console.log($($offCanvas).width());
//console.log($($offCanvas).data("navigation-slide"));

// check for window resize to make sure the navigation stays off the view when closed
$(window).resize(function() {

    //console.log($($offCanvas).width() + "width of canvas");

    // check to see if the menu is isVisible
    if (isVisible === false) {
        // check to see if the menu should be move off to the left or right
        if ($($offCanvas).data("navigation-position") === 'left') {
            if ($($offCanvas).data("navigation-slide") === "over" || $($offCanvas).data("navigation-slide") === "push") {
                // move the off canvas off the view import
                TweenMax.set($offCanvas, {
                    x: -$($offCanvas).width()
                });
            }
            leftOrRight = "left";
        } else {
            if ($($offCanvas).data("navigation-slide") === "over" || $($offCanvas).data("navigation-slide") === "push") {
                // move the off canvas off the view import
                TweenMax.set($offCanvas, {
                    x: $($offCanvas).width()
                });
            }
            leftOrRight = "right";
        }
    } else {
        // makde sure the content offset is the same as the width of the navigation
        if ($($offCanvas).data("navigation-slide") === "over" || $($offCanvas).data("navigation-slide") === "push") {
            if($($offCanvas).data("navigation-position") === 'left'){
                TweenMax.to($main, speedOfAnimation, {
                    x: $($offCanvas).width()
                });
            }
            else{
                TweenMax.to($main, speedOfAnimation, {
                    x: -$($offCanvas).width()
                });
            }
        }
    }
});

// this is for when the page loads to make sure the menu is out of view
// check to see if the menu should be move off to the left or right
if ($($offCanvas).data("navigation-position") === 'left') {
    // chceck to see if its over or under
    if ($($offCanvas).data("navigation-slide") === "over" || $($offCanvas).data("navigation-slide") === "push") {
        // move the off canvas off the view import
        TweenMax.set($offCanvas, {
            x: -$($offCanvas).width()
        });
    }
    leftOrRight = "left";
} else {
    if ($($offCanvas).data("navigation-slide") === "over" || $($offCanvas).data("navigation-slide") === "push") {
        // move the off canvas off the view import
        TweenMax.set($offCanvas, {
            x: $($offCanvas).width()
        });
    }
    leftOrRight = "right";
}


function openCloseMenu() {
    // OPEN
    if (isVisible === false) {

        //console.log(leftOrRight);
        //check to see if its left or right
        if (leftOrRight === "left") {
            // if the navigation slide doesn't equal push slide the main tag
            if ($($offCanvas).data("navigation-slide") === "push" || $($offCanvas).data("navigation-slide") === "under") {
                //slide over the website Content
                TweenMax.to($main, speedOfAnimation, {x: $($offCanvas).width()});
                // slide over the fixed item
                TweenMax.to($fixedItem, speedOfAnimation, {x: $($offCanvas).width()});
                // fade out $burger
                TweenMax.to($burger, speedOfAnimation, {alpha:0});

            }
        } else {
            if ($($offCanvas).data("navigation-slide") === "push" || $($offCanvas).data("navigation-slide") === "under") {
                //slide over the website Content
                TweenMax.to($main, speedOfAnimation, {x: -$($offCanvas).width()});
                // slide over the fixed item
                TweenMax.to($fixedItem, speedOfAnimation, {x: -$($offCanvas).width()});
                // fade out $burger
                TweenMax.to($burger, speedOfAnimation, {alpha:0});

            }
        }

        if ($($offCanvas).data("navigation-slide") === "over" || $($offCanvas).data("navigation-slide") === "push") {
            //slide over the website Content
            TweenMax.to($offCanvas, speedOfAnimation, {x: 0});
        }

        //add the overlay
        $("#overlay").addClass("is-visible");
        isVisible = true;
    }
    // CLOSE
    else {
        //check to see if its left or right
        if (leftOrRight === "left") {
            if ($($offCanvas).data("navigation-slide") === "over" || $($offCanvas).data("navigation-slide") === "push") {
                //slide over the website Content
                TweenMax.to($offCanvas, speedOfAnimation, {x: -$($offCanvas).width()});
            }
        } else {
            if ($($offCanvas).data("navigation-slide") === "over" || $($offCanvas).data("navigation-slide") === "push") {
                //slide over the website Content
                TweenMax.to($offCanvas, speedOfAnimation, {x: $($offCanvas).width()});
            }
        }

        //slide back the website Content
        TweenMax.to($main, speedOfAnimation, {x: 0});
        // slide over the fixed item
        TweenMax.to($fixedItem, speedOfAnimation, {x: 0});
        // fade in $burger
        TweenMax.to($burger, speedOfAnimation, {alpha:1});

        //remove the overlay
        $("#overlay").removeClass("is-visible");
        isVisible = false;
    }
}
// open or close the menu with the burger is tapped / click
$burger.on("click", openCloseMenu);
// close the mobile menu when menu links are tapped / click
$("nav[data-nav='main-navigation'] a").on("click", openCloseMenu);
// close the mobile menu when the close link is tapped / click
$("#close-btn").on("click", openCloseMenu);
// close the mobile menu when the overlay link is tapped / click
$("#overlay").on("click", openCloseMenu);
