

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



                    // Load the new image
                    imgElement3.onload = function () {
                        // Once the image is loaded, apply the shape-outside property

                        imgElement3.style.shapeOutside = 'url("assets/images/' + filename + '")';
                        imgElement3.src = "assets/images/" + filename;
                        // You may need to update other properties or trigger functions related to image changes
                        // updateImageSizeAndPosition();
                    };



                    // Change the src of the image

                    imgElement3.src = "assets/images/" + filename;

                    imageCredits.innerHTML = '<span class="line">' + author + '</span>' + ", " + '<span class="line">' + title + '</span>' + ", " + '<span class="line">' + date + '</span>' + ", " + '<span class="line">' + photoCredits + '</span>';



                    // author + ", " + title + ", " + date + ", " + photoCredits 

                    handleClick()
                });
            });
        }
    })

    .catch(error => {
        console.error('Error loading JSON file:', error);
    });

    function changeImage(imageSrc) {
        document.querySelector('.tocImage').src = imageSrc;
        document.querySelector('.tocImage2').src = imageSrc;
        
    }
    
    




// smooth scrolling event
function smoothScroll(event) {
    event.preventDefault();

    const targetId = event.target.getAttribute("href").substring(1); // Get the target id from href
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
    }
}

