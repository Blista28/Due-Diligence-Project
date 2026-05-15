document.addEventListener('DOMContentLoaded', () => {
    const vendors = [
        {
            companyName: 'Starlight Corp.',
            services: 'Logistics',
            contact: 'John Doe',
            date: 'May 11, 2026'
        },
        {
            companyName: 'Nexus Tech',
            services: 'Cloud Hosting',
            contact: 'Sarah Lee',
            date: 'May 08, 2026'
        },
        {
            companyName: 'Alpha Industries',
            services: 'Cybersecurity',
            contact: 'Mark Raven',
            date: 'May 02, 2026'
        }
    ];

    const tableBody = document.querySelector('.vendor-table-body');
    const searchInput = document.querySelector('.vendor-search');
    const addVendorBtn = document.querySelector('.add-vendor-btn');

    function renderRows(list) {
        tableBody.innerHTML = list
            .map(
                (vendor) => `
                    <tr>
                        <td>${vendor.companyName}</td>
                        <td>${vendor.services}</td>
                        <td>${vendor.contact}</td>
                        <td>${vendor.date}</td>
                    </tr>
                `
            )
            .join('');
    }

    function filterVendors(query) {
        const value = query.trim().toLowerCase();

        if (!value) {
            renderRows(vendors);
            return;
        }

        const filtered = vendors.filter((vendor) =>
            vendor.companyName.toLowerCase().includes(value) ||
            vendor.services.toLowerCase().includes(value) ||
            vendor.contact.toLowerCase().includes(value) ||
            vendor.date.toLowerCase().includes(value)
        );

        renderRows(filtered);
    }

    renderRows(vendors);

    searchInput.addEventListener('input', (event) => {
        filterVendors(event.target.value);
    });

    addVendorBtn.addEventListener('click', () => {
        alert('Add vendor action placeholder.');
    });
});