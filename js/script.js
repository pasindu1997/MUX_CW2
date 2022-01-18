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
        price: 100.00
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
    if ($(`#addToFavorite${id}`).css("background-color") === "rgb(255, 255, 255)") {
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


const renderCartItems = () => {
    const cart = JSON.parse(window.localStorage.getItem("cart"));
    var cartListCol1Html = '';
    var cartListCol2Html = '';

    if (cart.length > 0) {
        for (let index = 0; index < cart.length; index++) {
            const cartItem = cart[index];

            if (index < 3) {
                cartListCol1Html = cartListCol1Html + `
                    <div class="cart-item-card">
                        <div class="row">
                            <div class="cart-div" >
                                <span class="iconify favorite-icon" data-icon="fluent:delete-24-regular" style="color: #f24e1e;"></span>
                            </div>
                            <div>
                                <img src=${cartItem.imgSrc} />
                                <div class="cart-card-content">
                                    <h5>${cartItem.name}</h5>
                                    <p>
                                        ${cartItem.description}
                                    </p>
                                    <fieldset class="row fieldset" >
                                        <div class="extra1">
                                            <input data-role="none" class="cart-card-input" type="checkbox" id="extra1" name="" value="Bike"/>
                                            <label for="extra1"> Spicy+</label>
                                        </div>
                                        <div class="extra2">
                                            <input data-role="none" class="cart-card-input" type="checkbox" id="extra2" name="extra2" value="Bike"/>
                                            <label for="extra2"> Cheese+</label>
                                        </div>
                                    </fieldset>
                                    <div class="row">

                                        <h4>
                                            LKR ${cartItem.price}
                                        </h4>
                                        <div class="number">
                                            <span class="minus" id="minus-${cartItem.id}" onclick="handleMinus(${cartItem.id})">-</span>
                                            <input " id="input-${cartItem.id}" data-role="none" type="text" value="1"/>
                                            <span class="plus" id="plus-${cartItem.id}" onclick="handlePlus(${cartItem.id})">+</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                
                `
            } else {
                cartListCol2Html + cartListCol2Html + `
                    <div class="cart-item-card">
                        <div class="row">
                            <div class="cart-div" >
                                <span class="iconify favorite-icon" data-icon="fluent:delete-24-regular" style="color: #f24e1e;"></span>
                            </div>
                            <div>
                                <img src=${cartItem.imgSrc} />
                                <div class="cart-card-content">
                                    <h5>${cartItem.name}</h5>
                                    <p>
                                        ${cartItem.description}
                                    </p>
                                    <fieldset class="row fieldset" >
                                        <div class="extra1">
                                            <input data-role="none" class="cart-card-input" type="checkbox" id="extra1" name="" value="Bike"/>
                                            <label for="extra1"> Spicy+</label>
                                        </div>
                                        <div class="extra2">
                                            <input data-role="none" class="cart-card-input" type="checkbox" id="extra2" name="extra2" value="Bike"/>
                                            <label for="extra2"> Cheese+</label>
                                        </div>
                                    </fieldset>
                                    <div class="row">

                                        <h4>
                                            LKR ${cartItem.price}
                                        </h4>
                                        <div class="number">
                                            <span class="minus">-</span>
                                            <input data-role="none" type="text" value="1"/>
                                            <a class="plus" id="plus-${cartItem.id}" onclick="handlePlus(${cartItem.id})">+</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `
            }

        }

        document.getElementById('cardItemListCol1').innerHTML = cartListCol1Html;

        document.getElementById('cardItemListCol2').innerHTML = cartListCol2Html;

    } else {
        document.getElementById('cardItemListCol1').innerHTML = '<p>Empty</p>';
    }
}


const renderFavListHome = () => {
    const favoriteList = JSON.parse(window.localStorage.getItem("favoriteList"));
    var favListHtml = '';
    var favPageHtml = '';

    if (favoriteList.length > 0) {
        favoriteList.forEach(element => {
            favListHtml = favListHtml + `
            <div class="food-item-card">
                <div class="favorite-div" id="addToFavorite${element.id}" onclick="handleFavorite(${element.id})" >
                    <span id="favoriteIcon${element.id}" class="iconify delete-icon" data-icon="fluent:delete-24-regular" style="color: #f24e1e;" data-width="20" data-height="20"></span>
                </div>
            <div>
            <img src=${element.imgSrc} />
            <h5>${element.name}</h5>
            <p>
            ${element.description}
            </p>
            <h4>
            LKR ${element.price}
            </h4>
            </div>
            </div>
            `;

            favPageHtml = favPageHtml + `
                <div class="favorite-item-card ui-block-b">
                <div class="favorite-div" id="addToFavorite${element.id}" onclick="handleFavorite(${element.id})">
                    <span id="favoriteIcon${element.id}" class="iconify delete-icon" data-icon="fluent:delete-24-regular" style="color: #f24e1e;" data-width="20" data-height="20"></span>
                </div>
                <div class="add-to-cart-div" id="addToCart${element.id}" onclick="handleAddCart(${element.id})">
                    <span  id="cartIcon${element.id}" class="iconify delete-icon" data-icon="ant-design:shopping-cart-outlined"></span>
                </div>
                <div>
                    <img src=${element.imgSrc} />
                    <h5>${element.name}</h5>
                    <p>
                         ${element.description}
                    </p>
                    <h4>
                       LKR ${element.price}
                    </h4>
                </div>
            </div>
            `;
        });

        document.getElementById('favFoodList').innerHTML = favListHtml
        document.getElementById('favFoodItemsPage').innerHTML = favPageHtml
    } else {
        document.getElementById('favFoodList').innerHTML = ' <p class="no-data-fav">Your favorite list is empty</p>';
        document.getElementById('favFoodItemsPage').innerHTML = ' <p class="no-data-fav">Your favorite list is empty</p>';
    }
}

const handleAddCart = (id) => {
    if ($(`#addToCart${id}`).css("background-color") === "rgb(255, 255, 255)") {
        $(`#addToCart${id}`).css("background-color", "green");
        $(`#cartIcon${id}`).css("color", "white");
        var cart = JSON.parse(window.localStorage.getItem("cart"));
        var selectedItems = foodItem.find(item => item.id == id);
        selectedItems.quantity = 1;
        cart.push(selectedItems);
        window.localStorage.setItem("cart", JSON.stringify(cart));
        renderCartItems()
        calculateTotal(id)

    } else {
        $(`#addToCart${id}`).css("background-color", "white");
        $(`#cartIcon${id}`).css("color", "#E84C4F");
        var cart = JSON.parse(window.localStorage.getItem("cart"));
        var newCart = cart.filter(ele => ele.id !== id);
        window.localStorage.setItem("cart", JSON.stringify(newCart))
        renderCartItems()
    }
    initialTotalCalculated();
}

const sendEmail = () => {
    if ($('#favEmailReceipt').val() !== "") {
        const payload = window.localStorage.getItem("favoriteList");
        $.ajax({
            method: "POST",
            url: "/mobile/php/email.php",
            data: { email: $('#favEmailReceipt').val(), data: payload }
        })
            .done(function (response) {
                window.location.href = '#email-confirmation'
            });
    } else {
        document.getElementById('favEmailErrorMsg').innerHTML = ' <p style="color:#f24e1e">Email is required</p>';
    }
}

const initialTotalCalculated = () => {
    var cart = JSON.parse(window.localStorage.getItem("cart"));

    var subtotal = 0;
    var totalTax = 0;
    var delievery = 50;

    cart.forEach(element => {
        var price = element.price;
        var tax = ((price * element.quantity) / 100) * 2

        subtotal = subtotal + (price * element.quantity);
        totalTax = totalTax + tax;
    })

    const total = subtotal + totalTax + delievery;

    const checkoutTotal = {
        subtotal: subtotal,
        totalTax: totalTax,
        delievery: delievery,
        total: total
    }

    window.localStorage.setItem("checkoutTotal", JSON.stringify(checkoutTotal));
    document.getElementById('subtotal').innerHTML = `LKR ${checkoutTotal.subtotal}`;
    document.getElementById('tax').innerHTML = `LKR ${checkoutTotal.totalTax}`;
    document.getElementById('total').innerHTML = `LKR ${checkoutTotal.total}`;
    document.getElementById('checkoutValue').innerHTML = `<input class="mb-0 checoutvalue-width" type="text" id="checkoutValue" placeholder="Coupon code" style="font-family:Arial, FontAwesome" disabled value="LKR ${checkoutTotal.total} - Stripe" />`;
}

const calculateTotal = (id) => {
    var cart = JSON.parse(window.localStorage.getItem("cart"));
    var item = cart.find(item => item.id === id);
    var itemRemovedCart = cart.filter(item => item.id !== id);
    var quantity = $(`#plus-${id}`).parent().find('input').val()
    item.quantity = quantity;
    itemRemovedCart.push(item);
    window.localStorage.setItem("cart", JSON.stringify(itemRemovedCart))
    initialTotalCalculated();
}

const handlePlus = (id) => {
    var $input = $(`#plus-${id}`).parent().find('input');
    $input.val(parseInt($input.val()) + 1);
    $input.change();
    calculateTotal(id);
    return false;
}

const handleMinus = (id) => {
    var $input = $(`#minus-${id}`).parent().find('input');
    var count = parseInt($input.val()) - 1;
    count = count < 1 ? 1 : count;
    $input.val(count);
    $input.change();
    calculateTotal(id);
    return false;
}

const handleRatingMessage = () => {
    alert("Thank you for rating our product")
}

const resetAllRating = () => {
    $('#star1').removeClass('checked');
    $('#star2').removeClass('checked');
    $('#star3').removeClass('checked');
    $('#star4').removeClass('checked');
    $('#star5').removeClass('checked');
}

//new one
$(document).ready(function () {
    $('#star3').on('click', function () {
        resetAllRating();
        if ($(this).attr('class') === 'fa fa-star') {
            $('#star1').addClass('checked')
            $('#star2').addClass('checked')
            $(this).addClass('checked')
        } else {
            $('#star1').removeClass('checked')
            $('#star2').removeClass('checked')
            $(this).removeClass('checked')
        }
        handleRatingMessage();
    })

    $('#star1').on('click', function () {
        resetAllRating();
        if ($(this).attr('class') === 'fa fa-star') {
            $(this).addClass('checked')
        } else {
            $(this).removeClass('checked')
        }
        handleRatingMessage();
    })

    $('#star2').on('click', function () {
        resetAllRating();
        if ($(this).attr('class') === 'fa fa-star') {
            $('#star1').addClass('checked')
            $(this).addClass('checked')
        } else {
            $('#star1').removeClass('checked')
            $(this).removeClass('checked')
        }
        handleRatingMessage();
    })

    $('#star4').on('click', function () {
        resetAllRating();
        if ($(this).attr('class') === 'fa fa-star') {
            $('#star1').addClass('checked')
            $('#star2').addClass('checked')
            $('#star3').addClass('checked')
            $(this).addClass('checked')
        } else {
            $('#star1').removeClass('checked')
            $('#star2').removeClass('checked')
            $('#star3').removeClass('checked')
            $(this).removeClass('checked')
        }
        handleRatingMessage();
    })

    $('#star5').on('click', function () {
        resetAllRating();
        if ($(this).attr('class') === 'fa fa-star') {
            $('#star1').addClass('checked')
            $('#star2').addClass('checked')
            $('#star3').addClass('checked')
            $('#star4').addClass('checked')
            $(this).addClass('checked')
        } else {
            $('#star1').removeClass('checked')
            $('#star2').removeClass('checked')
            $('#star3').removeClass('checked')
            $('#star4').removeClass('checked')
            $(this).removeClass('checked')
        }
        handleRatingMessage();
    })


    $('#addComment').on('click', function () {
        var comment = $('#commentText').val();
        $('#newCommentSection').append(`
            <div>
                <hr>
                <div class="circle5">
                    <p>K</p>
                </div>
                <div style="margin-left: 20px">
                    <p style="color: white;">Ravindu Kithmini 09/08/2021  8.56 am<br>${comment}<br></p>   
                </div>
                <br><br>
            </div> 
        `);
        $('#commentText').val('');
    })

    $('#addReview').on('click', function () {
        var review = $('#reviewText').val();
        $('#newReviewSection').append(`
            <div>
                <hr>
                <div class="circle5">
                    <p>K</p>
                </div>
                <div style="margin-left: 20px">
                    <p style="color: white;">Ravindu Kithmini 09/08/2021  8.56 am<br>${review}<br></p>   
                </div>
                <br><br>
            </div> 
        `);
        $('#reviewText').val('');
    })

    var checkoutTotal = JSON.parse(window.localStorage.getItem("checkoutTotal"));
    $('#checkoutAndPay').on('click', function () {

        var handler = StripeCheckout.configure({
            key: 'pk_test_cp21BcECf4kMMUbSlRlZlsMo',
            token: function (token) {
                if (token.id) {
                    window.location.href = "#order-confirmation";
                }
            }
        });
        handler.open({
            name: 'Food Centric',
            currency: 'lkr',
            description: 'Cart',
            amount: checkoutTotal.total * 100
        });
    });


    const favoriteList = []
    const cart = []
    renderFavListHome();
    window.localStorage.setItem("favoriteList", JSON.stringify(favoriteList))
    window.localStorage.setItem("cart", JSON.stringify(cart))

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
                        LKR ${element.price}
                    </h4>
                </div>
            </div>
        `;
    });


    document.getElementById('food-item-list').innerHTML = foodItemsHtml

    // $('.minus').click(function () {
    //     var $input = $(this).parent().find('input');
    //     var count = parseInt($input.val()) - 1;
    //     count = count < 1 ? 1 : count;
    //     $input.val(count);
    //     $input.change();
    //     return false;
    // });
    // $('.plus').click(function () {
    //     var $input = $(this).parent().find('input');
    //     $input.val(parseInt($input.val()) + 1);
    //     $input.change();
    //     return false;
    // });

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



