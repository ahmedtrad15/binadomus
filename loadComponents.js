// Fonction pour charger les composants (header et footer)
document.addEventListener("DOMContentLoaded", function () {
    fetch("header.html")
        .then(res => res.text())
        .then(data => {
            document.getElementById("header-container").innerHTML = data;
            const mobileMenuToggle = document.getElementById('mobile-toggle');
            const navMenu = document.getElementById('nav-menu');

            mobileMenuToggle.addEventListener('click', function () {
                navMenu.classList.toggle('active');
                this.querySelector('i').classList.toggle('fa-bars');
                this.querySelector('i').classList.toggle('fa-times');
            });
        });



    // Load footer
    fetch("footer.html")
        .then(res => res.text())
        .then(data => {
            document.getElementById("footer-container").innerHTML = data;
        });

});