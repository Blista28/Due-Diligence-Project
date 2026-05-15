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

        // Navigation Active State Handler
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                navItems.forEach(i => i.classList.remove('active'));
                item.classList.add('active');
            });
        });
    }
});