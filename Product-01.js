function changeImage(element) {
        var mainImage = document.getElementById('mainImage');
        mainImage.src = element.src;

        // Change the background image for the zoom effect
        var zoomer = document.querySelector('.zoom');
        zoomer.style.backgroundImage = 'url(' + element.src + ')';
    }

    function zoom(e) {
        var zoomer = e.currentTarget;
        var offsetX = e.offsetX || e.touches[0].pageX;
        var offsetY = e.offsetY || e.touches[0].pageY;
        var x = offsetX / zoomer.offsetWidth * 100;
        var y = offsetY / zoomer.offsetHeight * 100;
        zoomer.style.backgroundPosition = x + '% ' + y + '%';
    }

    document.getElementById('decreaseQuantity').addEventListener('click', function () {
        var quantityInput = document.getElementById('quantity');
        var currentValue = parseInt(quantityInput.value);
        if (currentValue > 1) {
            quantityInput.value = currentValue - 1;
        }
    });

    document.getElementById('increaseQuantity').addEventListener('click', function () {
        var quantityInput = document.getElementById('quantity');
        quantityInput.value = parseInt(quantityInput.value) + 1;
    });

    document.addEventListener("DOMContentLoaded", function () {
        let currentRating = 0;
    
        document.querySelectorAll('.star-rating .fa').forEach(function(star, index) {
            star.addEventListener('mouseover', function() {
                // On mouse over, highlight the stars up to the hovered one
                document.querySelectorAll('.star-rating .fa').forEach(function(s, i) {
                    if (i <= index) {
                        s.classList.remove('fa-star-o');
                        s.classList.add('fa-star');
                    } else {
                        s.classList.remove('fa-star');
                        s.classList.add('fa-star-o');
                    }
                });
            });
    
            star.addEventListener('mouseout', function() {
                // On mouse out, revert to the currently selected rating
                document.querySelectorAll('.star-rating .fa').forEach(function(s, i) {
                    if (i < currentRating) {
                        s.classList.remove('fa-star-o');
                        s.classList.add('fa-star');
                    } else {
                        s.classList.remove('fa-star');
                        s.classList.add('fa-star-o');
                    }
                });
            });
    
            star.addEventListener('click', function() {
                // On click, set the current rating
                currentRating = index + 1; // Rating starts from 1, so we add 1 to index
                console.log("Rating selected:", currentRating);
            });
        });
    });
    
    

let stickyContainer = document.querySelector('.sticky-container');

        window.addEventListener('scroll', function () {
            // Add the "sticky" class as soon as scrolling starts
            if (window.scrollY > 0) {
                stickyContainer.classList.add('sticky');
            } else {
                stickyContainer.classList.remove('sticky');
            }
        });











// Get the elements
document.getElementById('addToCartBtn').addEventListener('click', function() {
    var notification = document.getElementById('cartNotification');
    notification.style.display = 'block';
    setTimeout(function() {
      notification.style.display = 'none';
    }, 5000); // Hide after 3 seconds
  });






































document.getElementById('reviewForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent the default form submission

    let isValid = true;
    const ratingError = document.getElementById('ratingError');
    const reviewError = document.getElementById('reviewError');
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    
    // Get form field values
    const review = document.getElementById('review').value.trim();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();

    // Rating Validation
    let ratingSelected = false;
    const stars = document.querySelectorAll('.star-rating i');
    
    // Check if any star has the 'selected' class
    stars.forEach(star => {
        if (star.classList.contains('fa-star')) {
            ratingSelected = true;
        }
    });

    if (!ratingSelected) {
        ratingError.style.display = 'block';
        isValid = false;
    } else {
        ratingError.style.display = 'none';
    }

    // Review Validation
    if (review === '') {
        reviewError.style.display = 'block';
        isValid = false;
    } else {
        reviewError.style.display = 'none';
    }

    // Name Validation
    if (name === '') {
        nameError.style.display = 'block';
        isValid = false;
    } else {
        nameError.style.display = 'none';
    }

    // Email Validation (basic check for @ symbol)
    if (email === '' || !email.includes('@')) {
        emailError.style.display = 'block';
        isValid = false;
    } else {
        emailError.style.display = 'none';
    }

    // If all fields are valid, submit the form
    if (isValid) {
        alert('Review submitted successfully!');
        this.submit(); // Submit form after validation
    }
});

// Add event listener for stars
const starElements = document.querySelectorAll('.star-rating i');
starElements.forEach(star => {
    star.addEventListener('click', function () {
        const value = this.getAttribute('data-value');
        
        // Reset all stars
        starElements.forEach(star => {
            star.classList.remove('fa-star');
            star.classList.add('fa-star-o');
        });

        // Mark stars up to the clicked one as selected
        for (let i = 0; i < value; i++) {
            starElements[i].classList.remove('fa-star-o');
            starElements[i].classList.add('fa-star');
        }
    });
});