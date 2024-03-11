document.addEventListener('DOMContentLoaded', function () {

    function isChrome() {
        // Check if Chrome
        return /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
    }


    //makes variables for viewport width and height
    var vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
    var vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)


    const throttle = (fn, delay) => {
        // Capture the current time 
        let time = Date.now();
        return () => {
            if ((time + delay - Date.now()) <= 0) {
                fn();
                time = Date.now();
            }
        }
    }

    function runOnResize() {  //// this is the throttled resize function
        // console.log('resized');
        //update the viewport width/height variables on resize
        vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
        vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)

        console.log("isDesktop = " + isDesktop());
        // changeColor()
        checkIfChromeAndWindowSize()
    }

    window.addEventListener('resize', throttle(runOnResize, 30));

    function isDesktop() {
        if (vw > 800) {
            return true;
        } else {
            return false;
        }
    }

    

    const centerImageDesktop = document.getElementById('myImgID_3');
    const centerImageMobile = document.getElementById('myImgID_4');
    const imageCredits = document.getElementById('credits');
    const tempBar = document.getElementById('tempBar')

    var button = document.querySelector('.menuToggle');
    var menu = document.querySelector('.menuBar');


    // Add click event listener to the button
    button.addEventListener('click', function () {
        // Toggle the classes of the menu element
        menu.classList.toggle('menuHide');
        menu.classList.toggle('menuShow');
    });
});