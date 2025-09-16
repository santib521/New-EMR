// ข้อมูลยาประจำทั้งหมด
const allMedications = [
    { name: "Atorvastatin 40mg", date: "15 ก.พ. 2567", diagnosis: "ไขมันในเลือดสูง" },
    { name: "Amlodipine 5mg", date: "22 ก.พ. 2567", diagnosis: "ความดันโลหิตสูง" },
    { name: "Losartan 50mg", date: "15 มี.ค. 2567", diagnosis: "ความดันโลหิตสูง" },
    { name: "Metformin 500mg", date: "15 มี.ค. 2567", diagnosis: "เบาหวานชนิดที่ 2" },
    { name: "Insulin Glargine", date: "10 เม.ย. 2567", diagnosis: "เบาหวานชนิดที่ 2" }
];

// ข้อมูลการนัดหมายทั้งหมด
const allAppointments = [
    { name: "นัดติดตามผลเบาหวาน", date: "15 พ.ย. 2567", location: "ห้องตรวจอายุรกรรม" },
    { name: "ตรวจสุขภาพประจำปี", date: "12 ธ.ค. 2567", location: "แผนกตรวจสุขภาพ" },
    { name: "นัดเจาะเลือด", date: "10 ม.ค. 2568", location: "ห้อง Lab" }
];


// ฟังก์ชันสำหรับเปิด/ปิดกล่องโต้ตอบรายการยา
function toggleMedicationModal() {
    const modal = document.getElementById('medicationModal');
    modal.classList.toggle('hidden');
    if (!modal.classList.contains('hidden')) {
        renderMedicationList();
    }
}

// ฟังก์ชันสำหรับเปิด/ปิดกล่องโต้ตอบการนัดหมาย
function toggleAppointmentsModal() {
    const modal = document.getElementById('appointmentsModal');
    modal.classList.toggle('hidden');
    if (!modal.classList.contains('hidden')) {
        renderAppointmentsList();
    }
}

// ฟังก์ชันสำหรับแสดงรายการยา
function renderMedicationList() {
    const container = document.getElementById('medication-list-container');
    container.innerHTML = '';
    allMedications.forEach(medication => {
        const medicationCard = `
            <div class="medication-card-modal">
                <div class="medication-info-modal">
                    <div class="medication-name-modal">${medication.name}</div>
                    <div class="medication-context-modal">วินิจฉัย: ${medication.diagnosis}</div>
                </div>
                <div class="medication-date-modal">${medication.date}</div>
            </div>
        `;
        container.innerHTML += medicationCard;
    });
}

// ฟังก์ชันสำหรับแสดงรายการนัดหมาย
function renderAppointmentsList() {
    const container = document.getElementById('appointments-list-container');
    container.innerHTML = '';
    allAppointments.forEach(appointment => {
        const appointmentCard = `
            <div class="appointment-card-modal">
                <div class="appointment-info-modal">
                    <div class="appointment-name-modal">${appointment.name}</div>
                    <div class="appointment-context-modal">สถานที่: ${appointment.location}</div>
                </div>
                <div class="appointment-date-modal">${appointment.date}</div>
            </div>
        `;
        container.innerHTML += appointmentCard;
    });
}

// ฟังก์ชันสำหรับแสดงรายละเอียดของอาการ
function showDetails(diagnosisType, clickedCard) {
    
    // หากประเภทการวินิจฉัยคือ 'main-symptoms' ให้เปลี่ยนเส้นทางไปยังหน้า infographic.html
    if (diagnosisType === 'main-symptoms') {
        window.location.href = 'infographic.html';
        return; // สิ้นสุดการทำงานของฟังก์ชันที่นี่ เพื่อป้องกันไม่ให้โค้ดอื่นทำงาน
    }
    
    const timelinePanel = document.getElementById('timeline-details');
    const detailsPanel = document.getElementById('details-panel');
    const titleSpan = document.querySelector('#' + diagnosisType + '-details .section-header span');

    // ซ่อน timeline panel และแสดง details panel
    timelinePanel.classList.add('hidden');
    detailsPanel.classList.remove('hidden');

    // ซ่อนส่วนรายละเอียดทั้งหมด
    const detailSections = document.querySelectorAll('#details-panel .summary-section');
    detailSections.forEach(section => {
        section.classList.add('hidden');
    });

    // ลบคลาส 'active' ออกจาก card หลักทั้งหมด
    const cards = document.querySelectorAll('.diagnosis-card');
    cards.forEach(card => {
        card.classList.remove('active');
    });

    // แสดงส่วนรายละเอียดที่เลือก
    const selectedSection = document.getElementById(diagnosisType + '-details');
    if (selectedSection) {
        selectedSection.classList.remove('hidden');
        selectedSection.classList.add('active-details');

        // เลื่อนหน้าจอไปยังส่วนที่เลือก
        selectedSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }

    // เพิ่มคลาส 'active' ให้กับ card ที่ถูกคลิก
    if (clickedCard) {
        clickedCard.classList.add('active');
    }
    
    // เก็บประเภทการวินิจฉัยที่ใช้งานอยู่ไว้ใน dataset ของ details panel
    detailsPanel.dataset.activeDiagnosis = diagnosisType;

    // ตั้งค่าโหมดการแสดงผลเริ่มต้นเป็น 'all' เมื่อเลือก card ใหม่
    toggleDisplayMode('all');
}


// ฟังก์ชันสำหรับกลับไปที่หน้าหลัก
function goBack() {
    const timelinePanel = document.getElementById('timeline-details');
    const detailsPanel = document.getElementById('details-panel');

    // แสดง timeline panel และซ่อน details panel
    timelinePanel.classList.remove('hidden');
    detailsPanel.classList.add('hidden');

    // ลบคลาส 'active' ออกจาก card หลักทั้งหมด
    const cards = document.querySelectorAll('.diagnosis-card');
    cards.forEach(card => {
        card.classList.remove('active');
    });

    // เลื่อนหน้าจอไปยังด้านบนสุด
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// ฟังก์ชันสำหรับสลับโหมดการแสดงผล (ทั้งหมด/ตามวันที่)
function toggleDisplayMode(mode) {
    const detailsPanel = document.getElementById('details-panel');
    const activeDiagnosis = detailsPanel.dataset.activeDiagnosis;
    
    if (!activeDiagnosis) return;

    const allVisits = document.querySelectorAll('#' + activeDiagnosis + '-details .visit-details-card-container');
    const allDates = document.querySelectorAll('#' + activeDiagnosis + '-dates-list .date-button');
    const allDateModeBtn = document.getElementById(activeDiagnosis + '-all-dates-btn');
    const byDateModeBtn = document.getElementById(activeDiagnosis + '-by-date-btn');

    if (mode === 'all') {
        // แสดง visit ทั้งหมด
        allVisits.forEach(visit => {
            visit.classList.remove('hidden');
        });

        // ซ่อนปุ่มวันที่ทั้งหมด
        allDates.forEach(dateBtn => {
            dateBtn.classList.add('hidden');
            dateBtn.classList.remove('active');
        });
        
        // อัปเดตสถานะของปุ่ม
        allDateModeBtn.classList.add('active');
        byDateModeBtn.classList.remove('active');
    } else if (mode === 'by-date') {
        // ซ่อน visit ทั้งหมด
        allVisits.forEach(visit => {
            visit.classList.add('hidden');
        });

        // แสดงปุ่มวันที่ทั้งหมด
        allDates.forEach(dateBtn => {
            dateBtn.classList.remove('hidden');
        });
        
        // อัปเดตสถานะของปุ่ม
        allDateModeBtn.classList.remove('active');
        byDateModeBtn.classList.add('active');
    }
}

// ฟังก์ชันสำหรับแสดงรายละเอียดของ visit เดียว
function showSingleVisit(diagnosisType, visitId) {
    const allVisits = document.querySelectorAll('#' + diagnosisType + '-details .visit-details-card-container');
    const dateButtons = document.querySelectorAll('#' + diagnosisType + '-dates-list .date-button');

    // ซ่อน visit ทั้งหมด
    allVisits.forEach(visit => {
        visit.classList.add('hidden');
    });

    // แสดงเฉพาะ visit ที่เลือก
    const selectedVisit = document.getElementById(visitId);
    if (selectedVisit) {
        selectedVisit.classList.remove('hidden');
    }

    // ลบคลาส active จากปุ่มวันที่ทั้งหมด
    dateButtons.forEach(button => {
        button.classList.remove('active');
    });

    // เพิ่มคลาส active ให้กับปุ่มที่ถูกคลิก
    const clickedButton = document.querySelector(`[onclick="showSingleVisit('${diagnosisType}', '${visitId}')"]`);
    if (clickedButton) {
        clickedButton.classList.add('active');
    }
}

function showAppointments() {
    // แสดงรายการ 'ครั้งที่มาพบแพทย์'
    document.getElementById('timeline-details').classList.remove('hidden');
    
    // ซ่อน panel รายละเอียด
    document.getElementById('details-panel').classList.add('hidden');

    // ลบคลาส 'active' จาก card หลักทั้งหมด
    const cards = document.querySelectorAll('.diagnosis-card');
    cards.forEach(card => {
        card.classList.remove('active');
    });
}