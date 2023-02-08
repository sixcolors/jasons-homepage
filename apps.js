// Get all external links
const externalLinks = document.querySelectorAll("a[href^='http']:not([href*='" + window.location.host + "'])");
const confirmModal = new bootstrap.Modal(document.getElementById("confirmNavigationModal"), {});
const confirmNavigationDestSpan = document.querySelector("span#confirmNavigationDest");
let href = '';
// Add click event listener to the confirm button
document.querySelector("#confirmNavigationModalLink").addEventListener("click", function () {
    window.open(href);
    confirmModal.hide();
});

// Add click event listener to each external link
externalLinks.forEach(link => {
    link.addEventListener("click", function (e) {
        e.preventDefault();

        // Get the href value of the link
        href = this.getAttribute("href");

        // Show the href value on link in modal body
        confirmNavigationDestSpan.textContent = href;

        // Show the confirmation modal
        confirmModal.show();
    });
});