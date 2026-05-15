document.addEventListener('DOMContentLoaded', () => {
    const sidebarContainer = document.getElementById('sidebar-container');

    // Reusable Sidebar Loading via Fetch
    fetch('sidebar.html')
        .then(response => response.text())
        .then(data => {
            sidebarContainer.innerHTML = data;
            initSidebarLogic();
        });

    function initSidebarLogic() {
        const dropdowns = document.querySelectorAll('.nav-dropdown');
        
        dropdowns.forEach(dropdown => {
            const toggle = dropdown.querySelector('.dropdown-toggle');
            toggle.addEventListener('click', () => {
                // Toggle current dropdown
                dropdown.classList.toggle('open');
            });
        });

        const navItems = document.querySelectorAll('.nav-item');
        const dropdownLinks = document.querySelectorAll('.dropdown-content a');

        // Highlight the current nav item / dropdown subitem on page load based on the URL.
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';

        navItems.forEach(item => item.classList.remove('active'));
        dropdownLinks.forEach(link => link.classList.remove('active'));

        navItems.forEach(item => {
            if (item.getAttribute('href') === currentPage ||
                (item.getAttribute('href') === 'index.html' && currentPage === '')) {
                item.classList.add('active');
            }
        });

        dropdownLinks.forEach(link => {
            if (link.getAttribute('href') === currentPage) {
                link.classList.add('active');
                const parentDropdown = link.closest('.nav-dropdown');
                if (parentDropdown) {
                    parentDropdown.classList.add('open');
                }
            }
        });

        // Navigation Active State Handler for clicks.
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                navItems.forEach(i => i.classList.remove('active'));
                item.classList.add('active');
            });
        });

        dropdownLinks.forEach(link => {
            link.addEventListener('click', () => {
                dropdownLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            });
        });
    }
});