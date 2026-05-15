document.addEventListener('DOMContentLoaded', () => {
    // Load both stats and the table when the page opens
    loadDashboardData();
});

async function loadDashboardData() {
    try {
        // 1. Fetch Stats (Requires the endpoint discussed in the previous step)
        const statsRes = await fetch('/api/dashboard-stats');
        if (statsRes.ok) {
            const stats = await statsRes.json();
            document.getElementById('stat-total').innerText = stats.total || 0;
            document.getElementById('stat-drafted').innerText = stats.drafted || 0;
            document.getElementById('stat-submitted').innerText = stats.submitted || 0;
            document.getElementById('stat-reviewed').innerText = stats.reviewed || 0;
        }

        // 2. Fetch Recent Assessments for the table
        const tableRes = await fetch('/assessments');
        
        if (tableRes.status === 401) {
            console.error("Not logged in. Redirecting...");
            window.location.href = 'login.html';
            return;
        }

        if (tableRes.ok) {
            const assessments = await tableRes.json();
            renderRecentAssessments(assessments);
        }
    } catch (error) {
        console.error("Error connecting to server:", error);
    }
}

function renderRecentAssessments(data) {
    const tbody = document.querySelector('.assessment-table tbody');
    tbody.innerHTML = ''; // Remove the static placeholder rows

    // Show the 5 most recent assessments to keep the dashboard clean
    const recentData = data.slice(0, 5);

    if (recentData.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" style="text-align:center; padding: 20px;">No assessments found.</td></tr>';
        return;
    }

    recentData.forEach(item => {
        const row = document.createElement('tr');
        
        // Formatting the date from the database TIMESTAMP
        const dateModified = new Date(item.created_at).toLocaleDateString('en-US', {
            month: 'short',
            day: '2-digit',
            year: 'numeric'
        });

        row.innerHTML = `
            <td class="assessment-name">${item.purpose || 'General Assessment'}</td>
            <td>${item.company_name}</td> 
            <td>${dateModified}</td>
            <td>
                <span class="status-pill status-${item.status.toLowerCase()}">
                    ${item.status}
                </span>
            </td>
            <td>
                <button class="action-btn" onclick="handleAction(${item.assessment_id}, '${item.status}')">
                    ${item.status === 'Draft' ? 'Resume' : 'View'}
                </button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function handleAction(id, status) {
    if (status === 'Draft') {
        window.location.href = `assessment-form.html?id=${id}`;
    } else {
        window.location.href = `view-details.html?id=${id}`;
    }
}