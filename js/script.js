const foodItem = [
    {
        id: 1,
        imgSrc: "./images/food-images/randc.png",
        name: "Rice and Curry",
        description: " Dictum tortor nunc nibh egestas",
        price: 250.00
    },
    {
        id: 2,
        imgSrc: "./images/food-images/sea-food.png",
        name: "Sea food",
        description: " Dictum tortor nunc nibh egestas",
        price: 600.00
    },
    {
        id: 3,
        imgSrc: "./images/food-images/Mixed-food.png",
        name: "Mixed food",
        description: " Dictum tortor nunc nibh egestas",
        price: 1000.00
    },
    {
        id: 4,
        imgSrc: "./images/food-images/randc.png",
        name: "Chopsy rice",
        description: " Dictum tortor nunc nibh egestas",
        price: 450.00
    }
]


// Get the button that opens the modal
var btn = document.getElementById("myBtn");
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

const handleSendEmail = () => {
    var modal = document.getElementById("myModal");
    modal.style.display = "block";
}
// // When the user clicks on the button, open the modal
// btn.onclick = function() {

// }

const handleCloseSpan = () => {
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
}
// When the user clicks on <span> (x), close the modal
// span.onclick = function() {
// }

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    var modal = document.getElementById("myModal");
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

const handleFavorite = (id) => {
    console.log($(`#addToFavorite${id}`).css("background-color"))
    if ($(`#addToFavorite${id}`).css("background-color") === "rgb(255, 255, 255)") {
        console.log("hellow")
        $(`#addToFavorite${id}`).css("background-color", "#E84C4F");
        $(`#favoriteIcon${id}`).css("color", "white");
        var favoriteList = JSON.parse(window.localStorage.getItem("favoriteList"));
        var selectedItems = foodItem.find(item => item.id == id);
        favoriteList.push(selectedItems);
        window.localStorage.setItem("favoriteList", JSON.stringify(favoriteList))
        renderFavListHome();

    } else {
        $(`#addToFavorite${id}`).css("background-color", "white");
        $(`#favoriteIcon${id}`).css("color", "#E84C4F");
        var favoriteList = JSON.parse(window.localStorage.getItem("favoriteList"));
        var newFavoriteList = favoriteList.filter(ele => ele.id !== id);
        window.localStorage.setItem("favoriteList", JSON.stringify(newFavoriteList))
        renderFavListHome();
    }
}

const renderFavListHome = () => {
    const favoriteList = JSON.parse(window.localStorage.getItem("favoriteList"));
    var favListHtml = '';

    if (favoriteList.length > 0) {
        favoriteList.forEach(element => {
            favListHtml = favListHtml + `
            <div class="food-item-card">
            <div class="favorite-div" id="addToFavorite${element.id}" onclick="handleFavorite(${element.id})" >
            <span id="favoriteIcon${element.id}" class="iconify favorite-icon" data-icon="grommet-icons:favorite" style="color: #e84c4f;"></span>
            </div>
            <div>
            <img src=${element.imgSrc} />
            <h5>${element.name}</h5>
            <p>
            ${element.description}
            </p>
            <h4>
            Rs. ${element.price}
            </h4>
            </div>
            </div>
            `
        });

        document.getElementById('favFoodList').innerHTML = favListHtml
    } else {
        document.getElementById('favFoodList').innerHTML = ' <p class="no-data-fav">Your favorite list is empty</p>'
    }
}

//new one
$(document).ready(function () {
    const favoriteList = []
    renderFavListHome();
    window.localStorage.setItem("favoriteList", JSON.stringify(favoriteList))

    var foodItemsHtml = '';

    foodItem.forEach(element => {
        foodItemsHtml = foodItemsHtml + `
            <div class="food-item-card">
                <div class="favorite-div" id="addToFavorite${element.id}" onclick="handleFavorite(${element.id})" >
                    <span id="favoriteIcon${element.id}" class="iconify favorite-icon" data-icon="grommet-icons:favorite" style="color: #e84c4f;"></span>
                </div>
                <div>
                    <img src=${element.imgSrc} />
                    <h5>${element.name}</h5>
                    <p>
                        ${element.description}
                    </p>
                    <h4>
                        Rs. ${element.price}
                    </h4>
                </div>
            </div>
        `;
    });


    document.getElementById('food-item-list').innerHTML = foodItemsHtml

    $('.minus').click(function () {
        var $input = $(this).parent().find('input');
        var count = parseInt($input.val()) - 1;
        count = count < 1 ? 1 : count;
        $input.val(count);
        $input.change();
        return false;
    });
    $('.plus').click(function () {
        var $input = $(this).parent().find('input');
        $input.val(parseInt($input.val()) + 1);
        $input.change();
        return false;
    });

    $('#login-button').click(function () {
        var userName = $('#login-username-input').val();
        var password = $('#login-password-input').val();
        if (userName === 'pasindu' && password === 'password') {
            window.location.href = "#introductory";
        } else {
            document.getElementById('error-message-div').innerHTML = " <p>Password or Username Invalid</p>";
        }
    })
});



