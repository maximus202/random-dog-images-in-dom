$(document).ready(function () {


    function validateInput() {
        $('main').on('submit', '.num-of-images-form', event => {
            console.log('validateInput() ran');
            event.preventDefault();
            const value = $('#numberOfImagesForm').val();
            if (value >= 1 && value <= 50) {
                generateDogImages(value);
            } else {
                $('form').html('Your input must be between 1 and 50.');
            };
        });
    };

    function generateForm() {
        console.log('generateForm() ran');
        return `
        <form role="form" accept-charset="UTF-8" class="num-of-images-form">
        <fieldset>
        <legend>Number of Images:</legend>
        <input id="numberOfImagesForm" type="text" name="numberOfImages" value="3" required></input>
        </fieldset>
        <input type="submit" name="Submit">
        </form>`
    };

    function displayForm() {
        //User types in the number of pictures they want (between 1-50, 3 being default if nothing is entered).
        console.log('displayForm() ran');
        $(".js-form").html(generateForm());

    };
    function generateDogImages(value) {
        //User is displayed the random dog images according to the number they entered in the console log.
        console.log('generateDogImages() ran')
        fetch(`https://dog.ceo/api/breeds/image/random/${value}`)
            .then(response => response.json())
            .then(responseJson => displayDogImages(responseJson));
    };

    function renderDogImages(responseJson) {
        for (let i = 0; i < responseJson.message.length; i++) {
            $('.js-dog-images').append(`
        <div>
            <img src="${responseJson.message[i]}">
        </div>
        `
            )
        };
    };

    function displayDogImages(responseJson) {
        $('.js-dog-images').empty();
        renderDogImages(responseJson);
    };

    validateInput();
    displayForm();
});