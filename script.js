document.addEventListener('DOMContentLoaded', () => {
    // Sample data with accurate location names
    const visitsData = [
        { id: '001-25-00299', date: '01 Jul 2025 11:50:51', location: 'Surgery Dept', doctor: 'Dr. A', diagnosis: 'Diagnosis X' },
        { id: '001-25-00299', date: '04 Jul 2025 11:27:37', location: 'Surgery Dept', doctor: 'Dr. B', diagnosis: 'Diagnosis X' },
        { id: '001-25-00241', date: '23 Jun 2025 09:27:47', location: 'Health Department', doctor: 'Dr. C', diagnosis: 'Diagnosis Y' },
        { id: '001-25-00299', date: '28 Mar 2025 15:50:17', location: 'Surgery Dept', doctor: 'Dr. A', diagnosis: 'Diagnosis Z' },
        { id: '001-25-00199', date: '28 Mar 2025 11:47:02', location: 'ER', doctor: 'Dr. C', diagnosis: 'Diagnosis Y' },
        { id: '001-25-00176', date: '17 Mar 2025', location: 'Check-up Clinic', doctor: 'Dr. B', diagnosis: 'Diagnosis X' },
        { id: '001-25-00169', date: '11 Mar 2025 08:42:09', location: 'Surgery Dept', doctor: 'Dr. A', diagnosis: 'Diagnosis Z' },
    ];

    const visitList = document.getElementById('visitList');
    const filterBtn = document.getElementById('showFilterBtn');
    const filterIcon = document.getElementById('filterIcon');
    const farRightMenu = document.getElementById('farRightMenu');
    const expandMenuBtn = document.getElementById('expandMenuBtn');

    // Function to render the visit cards
    function renderVisits(data) {
        visitList.innerHTML = '';
        if (data.length === 0) {
            visitList.innerHTML = '<p style="text-align: center; color: #888;">No visits found matching your criteria.</p>';
            return;
        }

        data.forEach((visit, index) => {
            const card = document.createElement('div');
            card.className = 'visit-card';
            if (index === 0) {
                card.classList.add('active');
            }
            card.innerHTML = `
                <p class="visit-card-title">${visit.id} (${(index + 1)})</p>
                <p class="visit-card-date">${visit.date}</p>
                <p class="visit-card-location">${visit.location}</p>
            `;
            visitList.appendChild(card);
        });
    }

    // Initial render of all visits
    renderVisits(visitsData);

    // Filter Modal Logic
    const closeFilterBtn = document.getElementById('closeFilterBtn');
    const filterModal = document.getElementById('filterModal');
    const menuItems = document.querySelectorAll('.filter-menu .menu-item');
    const filterOptions = document.querySelectorAll('.filter-options');
    const applyFilterBtn = document.getElementById('applyFilterBtn');
    const clearFilterBtn = document.getElementById('clearFilterBtn');
    
    // Show/Hide Modal
    filterBtn.addEventListener('click', () => {
        filterModal.style.display = 'flex';
    });

    closeFilterBtn.addEventListener('click', () => {
        filterModal.style.display = 'none';
    });

    // Check if any filter is active and change button color
    function updateFilterButtonState() {
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        const isFiltered = Array.from(checkboxes).some(cb => cb.checked);
        if (isFiltered) {
            filterBtn.classList.add('active');
            filterIcon.src = "https://img.icons8.com/material-rounded/24/e74c3c/filter--v1.png";
        } else {
            filterBtn.classList.remove('active');
            filterIcon.src = "https://img.icons8.com/material-outlined/24/FFFFFF/filter--v1.png";
        }
    }

    // Switch between filter categories and reset other selections
    menuItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            
            menuItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');

            filterOptions.forEach(option => {
                option.classList.remove('active');
                const checkboxes = option.querySelectorAll('input[type="checkbox"]');
                checkboxes.forEach(checkbox => {
                    checkbox.checked = false;
                });
            });

            const targetId = item.getAttribute('data-target');
            document.getElementById(targetId).classList.add('active');
        });
    });

    // Apply Filter Logic
    applyFilterBtn.addEventListener('click', () => {
        const selectedDoctors = Array.from(document.querySelectorAll('#doctor-options input:checked')).map(checkbox => checkbox.value);
        const selectedLocations = Array.from(document.querySelectorAll('#location-options input:checked')).map(checkbox => checkbox.value);
        const selectedDiagnoses = Array.from(document.querySelectorAll('#diagnosis-options input:checked')).map(checkbox => checkbox.value);

        const filteredData = visitsData.filter(visit => {
            const matchDoctor = (selectedDoctors.length === 0 || selectedDoctors.includes(visit.doctor));
            const matchLocation = (selectedLocations.length === 0 || selectedLocations.includes(visit.location));
            const matchDiagnosis = (selectedDiagnoses.length === 0 || selectedDiagnoses.includes(visit.diagnosis));
            
            return matchDoctor && matchLocation && matchDiagnosis;
        });

        renderVisits(filteredData);
        updateFilterButtonState();
        filterModal.style.display = 'none';
    });

    // Clear Filter Logic
    clearFilterBtn.addEventListener('click', () => {
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            checkbox.checked = false;
        });

        renderVisits(visitsData);
        updateFilterButtonState();
        filterModal.style.display = 'none';
    });

    // Scrolling logic for visit list
    document.querySelector('.left-arrow').addEventListener('click', () => {
        visitList.scrollBy({
            left: -220,
            behavior: 'smooth'
        });
    });

    document.querySelector('.right-arrow').addEventListener('click', () => {
        visitList.scrollBy({
            left: 220,
            behavior: 'smooth'
        });
    });

    // Far-right Menu expand/collapse logic
    expandMenuBtn.addEventListener('click', () => {
        farRightMenu.classList.toggle('expanded');
    });

    // New: Reports Dialog Logic (using fetch() to load content)
    const reportsLink = document.getElementById('reportsLink');
    const reportsDialog = document.getElementById('reportsDialog');
    const closeReportsBtn = document.getElementById('closeReportsBtn');
    const reportsDialogBody = document.getElementById('reportsDialogBody');

    // Function to load content from PT_Dashboard.html
    function loadReportsContent() {
        fetch('PT_Dashboard.html')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text();
            })
            .then(html => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');
                const content = doc.querySelector('.dashboard-container').innerHTML;
                reportsDialogBody.innerHTML = content;
                reportsDialog.style.display = 'flex';
            })
            .catch(error => {
                console.error('Error loading reports:', error);
                reportsDialogBody.innerHTML = '<p>Failed to load reports. Please check your files and try again.</p>';
                reportsDialog.style.display = 'flex';
            });
    }

    // Event listener for the Reports link
    reportsLink.addEventListener('click', (e) => {
        e.preventDefault();
        loadReportsContent();
    });

    // Event listener to close the dialog
    closeReportsBtn.addEventListener('click', () => {
        reportsDialog.style.display = 'none';
    });
});
