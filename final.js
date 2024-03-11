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

    checkIfChromeAndWindowSize()

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

    function checkIfChromeAndWindowSize() {
        if (isChrome() && isDesktop() == true) {
            //THIS IS THE START OF THE CODE FOR CHROME DESKTOP///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            document.querySelector('.chromeDesktop').style.display = 'block'
            document.querySelector('.nonChromeDesktop').style.display = 'none'

            console.log("You are using Chrome.");
            // document.body.style.backgroundColor = 'red';

            var r = document.querySelector(':root');

            var imageWidth;
            var imageHeight;

            var image1 = document.getElementById('myImgID_1');
            var image2 = document.getElementById('myImgID_2');

            function updateImageSizeAndPosition() {
                // Get all images with the class 'myIMG'
                var images = document.querySelectorAll('.myIMG');

                // Loop through each image
                images.forEach(function (image) {
                    // Create a new Image object for each image
                    var img = new Image();

                    // Set the src attribute to the image's current src
                    img.src = image.src;

                    // Add a load event listener to the Image object
                    img.addEventListener('load', function () {
                        // Inside the load event handler, you can access the naturalWidth and naturalHeight properties
                        if (img.naturalWidth / img.naturalHeight > 1) {
                            var maxSize = vw * 0.2;
                            image.style.width = `${maxSize}px`;
                            image.style.height = `${(img.naturalHeight / img.naturalWidth) * maxSize}px`;
                        } else {
                            var maxSize = vh * 0.3;
                            image.style.height = `${maxSize}px`;
                            image.style.width = `${(img.naturalWidth / img.naturalHeight) * maxSize}px`;
                        }

                        // Keep the image centered (adds scroll position to the top margin)
                        var imageHeight = image.style.height;

                        // Update the size in the root
                        var imageWidth = image.style.width;
                        r.style.setProperty('--imageWidth', imageWidth);

                    });
                });
            }

            updateImageSizeAndPosition()

            function runOnScroll() {   //// this is the throttled scroll function

                //this positions the image in the center and lets it stay there when scrolling.
                var images = document.querySelectorAll('.myIMG');
                images.forEach(function (image) {
                    imageHeight = image.style.height;
                    image.style.marginTop = `${(vh / 2 - parseInt(imageHeight) / 2) + (window.scrollY)}px`;

                })

            }

            window.addEventListener('scroll', throttle(runOnScroll, 5));

            fetch('assets/json/image_credits.json')
                .then(response => response.json())
                .then(data => {

                    for (let i = 0; i < data.length; i++) {
                        const item = data[i];
                        const figClassTarget = item["0 Fig class target"];

                        const filename = item["1 filename"];
                        const author = item["2 Author"];
                        const title = item["3 Title"];
                        const date = item["4 Date"];
                        const photoCredits = item["5 Photo credits"];

                        document.querySelectorAll(".clickMe." + figClassTarget).forEach(function (fig) {
                            fig.addEventListener("click", function () {
                                const imgElement1 = document.getElementById("myImgID_1");
                                const imgElement2 = document.getElementById("myImgID_2");

                                // Function to handle image loading and other tasks
                                function handleImageLoad() {
                                    // Load the new image
                                    imgElement1.onload = function () {
                                        // Once the image is loaded, apply the shape-outside property
                                        imgElement1.style.shapeOutside = 'url("assets/images/' + filename + '")';
                                        imgElement2.style.shapeOutside = 'url("assets/images/' + filename + '")';

                                        // You may need to update other properties or trigger functions related to image changes
                                        // updateImageSizeAndPosition();
                                    };

                                    document.getElementById('credits').innerHTML = "(fig. " + (i + 1) + ") " + '<span class="line">' + author + '</span>' + ", " + '<span class="line">' + title + '</span>' + ", " + '<span class="line">' + date + '</span>' + ", " + '<span class="line">' + photoCredits + '</span>';

                                    // Change the src of the image
                                    imgElement1.src = "assets/images/" + filename;
                                    imgElement2.src = "assets/images/" + filename;
                                    updateImageSizeAndPosition();
                                }

                                // Call handleImageLoad function on click
                                handleImageLoad();
                            });

                            // Add a touch event listener to the figure element
                            fig.addEventListener("touchstart", function () {
                                // Call the same function as for click event
                                handleImageLoad();
                            });

                        });
                    }
                })

                .catch(error => {
                    console.error('Error loading JSON file:', error);
                });


            function documentContainsId(id) {
                // Try to find the element with the specified ID
                var element = document.getElementById(id);

                // If the element is found, return true; otherwise, return false
                return !!element;
            }


            var desiredId = "myImgID_1";
            if (documentContainsId(desiredId)) {
                document.getElementById('myImgID_1').addEventListener('mouseover', function () {
                    document.getElementById('tempBar').classList.add('showBar');
                });

                document.getElementById('myImgID_1').addEventListener('mouseout', function () {
                    document.getElementById('tempBar').classList.remove('showBar');
                });

            }




















































































































            //THIS IS THE END OF THE CODE FOR CHROME DESKTOP //////////////////////////////////////////////////////////////////////////////////////////////////////
        } else {

            //THIS IS THE START OF THE CODE FOR NON CHROME DESKTOP///////////////////////////////////////////////////////////////////////////////////////////
            document.querySelector('.chromeDesktop').style.display = 'none'
            document.querySelector('.nonChromeDesktop').style.display = 'block'

            console.log("You are not using Chrome.");
            // document.body.style.backgroundColor = 'blue';


            // Get the button element




            let counter = 0; // Initialize the counter
            const intervalDuration = 1000; // Interval duration in milliseconds (1 second in this case)

            // Function to increment the counter and handle class toggling
            function handleClick() {

                centerImageMobile.classList.add('showImage'); // Initially add the class
                centerImageDesktop.classList.add('showImage'); // Initially add the class
                tempBar.classList.add('showBar'); // Initially add the class
                counter = 10; // Reset the counter to 3 seconds
                initialScrollPosition = window.scrollY;
                const intervalId = setInterval(() => {
                    counter--; // Decrement the counter
                    if (counter === 0) {
                        centerImageMobile.classList.remove('showImage'); // Remove the class when the counter reaches 0
                        centerImageDesktop.classList.remove('showImage'); // Remove the class when the counter reaches 0
                        tempBar.classList.remove('showBar'); // Remove the class when the counter reaches 0
                        clearInterval(intervalId); // Stop the interval
                    }
                }, intervalDuration);
            }

            fetch('assets/json/image_credits.json')
                .then(response => response.json())
                .then(data => {

                    for (let i = 0; i < data.length; i++) {
                        const item = data[i];
                        const figClassTarget = item["0 Fig class target"];

                        const filename = item["1 filename"];
                        const author = item["2 Author"];
                        const title = item["3 Title"];
                        const date = item["4 Date"];
                        const photoCredits = item["5 Photo credits"];


                        document.querySelectorAll(".clickMe." + figClassTarget).forEach(function (fig) {
                            fig.addEventListener("click", function () {
                                const imgElement3 = document.getElementById("myImgID_3");
                                const imgElement4 = document.getElementById("myImgID_4");
                            
                                // Function to handle image loading and other tasks
                                function handleImageLoad() {
                                    // Load the new image
                                    imgElement3.onload = function () {
                                        // Once the image is loaded, apply the shape-outside property
                                        imgElement3.style.shapeOutside = 'url("assets/images/' + filename + '")';
                                        imgElement3.src = "assets/images/" + filename;
                                        imgElement4.style.shapeOutside = 'url("assets/images/' + filename + '")';
                                        imgElement4.src = "assets/images/" + filename;
                                        // You may need to update other properties or trigger functions related to image changes
                                        // updateImageSizeAndPosition();
                                    };
                            
                                    // Change the src of the image
                                    imgElement3.src = "assets/images/" + filename;
                                    imgElement4.src = "assets/images/" + filename;
                            
                                    imageCredits.innerHTML = "(fig. " + (i + 1) + ") " + '<span class="line">' + author + '</span>' + ", " + '<span class="line">' + title + '</span>' + ", " + '<span class="line">' + date + '</span>' + ", " + '<span class="line">' + photoCredits + '</span>';
                            
                                    // Call any other functions related to handling click/touch event
                                    // handleClick();
                                }
                            
                                // Call handleImageLoad function on click
                                handleImageLoad();
                            });
                            
                            // Add a touch event listener to the figure element
                            fig.addEventListener("touchstart", function () {
                                // Call the same function as for click event
                                handleImageLoad();
                            });
                            imageCredits.innerHTML = "(fig. " + (i + 1) + ") " + '<span class="line">' + author + '</span>' + ", " + '<span class="line">' + title + '</span>' + ", " + '<span class="line">' + date + '</span>' + ", " + '<span class="line">' + photoCredits + '</span>';
                        });
                    }
                })

                .catch(error => {
                    console.error('Error loading JSON file:', error);
                });


            window.addEventListener('scroll', () => {
                if (document.getElementById('myImgID_3').classList.contains('showImage') &&
                    Math.abs(window.scrollY - initialScrollPosition) > 20) {
                    document.getElementById('myImgID_3').classList.remove('showImage');
                    tempBar.classList.remove('showBar');
                }

                if (document.getElementById('myImgID_4').classList.contains('showImage') &&
                    Math.abs(window.scrollY - initialScrollPosition) > 20) {
                    document.getElementById('myImgID_4').classList.remove('showImage');
                    tempBar.classList.remove('showBar');
                }
            });



            //THIS IS THE END OF THE CODE FOR NON CHROME DESKTOP ///////////////////////////////////////////////////////////////////////////////////////////
        }
    }

});
