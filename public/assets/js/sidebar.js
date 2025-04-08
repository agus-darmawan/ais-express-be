document.addEventListener("DOMContentLoaded", function () {
  const toggleButton = document.getElementById("toggle-sidebar");
  const sidebar = document.getElementById("sidebar-item");
  const hamburgerIcon = document.getElementById("hamburger-icon");
  const icons = document.querySelectorAll(".icon-item");
  const currentPage = window.location.pathname;

  if (localStorage.getItem("sidebarOpen") === "true") {
    sidebar.classList.remove("hidden");
    hamburgerIcon.classList.remove("fa-grip-horizontal");
    hamburgerIcon.classList.add("fa-times");
  } else {
    sidebar.classList.add("hidden");
    hamburgerIcon.classList.remove("fa-times");
    hamburgerIcon.classList.add("fa-grip-horizontal");
  }

  toggleButton.addEventListener("click", () => {
    sidebar.classList.toggle("hidden");

    if (sidebar.classList.contains("hidden")) {
      hamburgerIcon.classList.remove("fas", "fa-times");
      hamburgerIcon.classList.add("fas", "fa-grip-horizontal");
      localStorage.setItem("sidebarOpen", "false");
    } else {
      hamburgerIcon.classList.remove("fas", "fa-grip-horizontal");
      hamburgerIcon.classList.add("fas", "fa-times");
      localStorage.setItem("sidebarOpen", "true");
    }
  });

  icons.forEach((icon) => {
    const redirectTo = icon.getAttribute("data-redirect");

    if (currentPage === redirectTo) {
      icon.classList.add("bg-gray-500");
      icon.classList.add("text-white");
    }

    // Removed hover color animations
    icon.addEventListener("click", () => {
      window.location.href = redirectTo;
    });
  });
});
