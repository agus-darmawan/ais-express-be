document.addEventListener("DOMContentLoaded", function () {
  const toggleButton = document.getElementById("toggle-sidebar");
  const sidebar = document.getElementById("sidebar-item");
  const hamburgerIcon = document.getElementById("hamburger-icon");
  const icons = document.querySelectorAll(".icon-item");
  const currentPage = window.location.pathname;

  toggleButton.addEventListener("click", () => {
    // Toggle sidebar visibility
    sidebar.classList.toggle("hidden");

    // Toggle the hamburger icon and the X icon
    if (sidebar.classList.contains("hidden")) {
      hamburgerIcon.classList.remove("fas", "fa-times");
      hamburgerIcon.classList.add("fas", "fa-grip-horizontal");
    } else {
      hamburgerIcon.classList.remove("fas", "fa-grip-horizontal");
      hamburgerIcon.classList.add("fas", "fa-times");
    }
  });

  icons.forEach((icon) => {
    const redirectTo = icon.getAttribute("data-redirect");

    if (currentPage === redirectTo) {
      icon.classList.add("bg-gray-500");
      icon.classList.add("text-white");
    }

    icon.addEventListener("mouseover", () => {
      icon.classList.add("text-yellow-500", "cursor-pointer");
    });

    icon.addEventListener("mouseout", () => {
      icon.classList.remove("text-yellow-500", "cursor-pointer");
    });

    icon.addEventListener("click", () => {
      // Redirect logic
      window.location.href = redirectTo;
    });
  });
});
