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
    const container = document.getElementById('medication-list-container');
    
    if (modal.classList.contains('hidden')) {
        // แสดงรายการยา
        container.innerHTML = allMedications.map(med => `
            <div class="medication-card-modal">
                <div class="medication-info-modal">
                    <span class="medication-name-modal">${med.name}</span>
                    <span class="medication-context-modal">วินิจฉัย: ${med.diagnosis}</span>
                </div>
                <div class="medication-date-modal">${med.date}</div>
            </div>
        `).join('');
        modal.classList.remove('hidden');
    } else {
        modal.classList.add('hidden');
    }
}

// ฟังก์ชันสำหรับเปิด/ปิดกล่องโต้ตอบการนัดหมาย
function toggleAppointmentsModal() {
    const modal = document.getElementById('appointmentsModal');
    const container = document.getElementById('appointments-list-container');
    
    if (modal.classList.contains('hidden')) {
        // แสดงรายการนัดหมาย
        container.innerHTML = allAppointments.map(appt => `
            <div class="appointment-card-modal">
                <div class="appointment-info-modal">
                    <span class="appointment-name-modal">${appt.name}</span>
                    <span class="appointment-context-modal">สถานที่: ${appt.location}</span>
                </div>
                <div class="appointment-date-modal">${appt.date}</div>
            </div>
        `).join('');
        modal.classList.remove('hidden');
    } else {
        modal.classList.add('hidden');
    }
}

// ฟังก์ชันสำหรับแสดงรายละเอียดการวินิจฉัยที่เลือก
function showDetails(diagnosisType, clickedCard) {
    const timelinePanel = document.getElementById('timeline-details');
    const detailsPanel = document.getElementById('details-panel');
    const titleSpan = document.querySelector('#' + diagnosisType + '-details .section-header span');

    // ซ่อน timeline panel และแสดง details panel
    timelinePanel.classList.add('hidden');
    detailsPanel.classList.remove('hidden');

    // ซ่อนทุกส่วนรายละเอียดการวินิจฉัย
    const detailSections = document.querySelectorAll('#details-panel .summary-section');
    detailSections.forEach(section => {
        section.classList.add('hidden');
    });

    // ลบคลาส 'active' จากการ์ดการวินิจฉัยหลักทั้งหมด
    const cards = document.querySelectorAll('.diagnosis-card');
    cards.forEach(card => {
        card.classList.remove('active');
    });

    // แสดงส่วนรายละเอียดที่เลือก
    const selectedSection = document.getElementById(diagnosisType + '-details');
    if (selectedSection) {
        selectedSection.classList.remove('hidden');
        selectedSection.classList.add('active-details');

        // เพิ่มการเลื่อนหน้าจออย่างนุ่มนวลไปยังส่วนที่เลือก
        selectedSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }

    // เพิ่มคลาส 'active' ให้กับการ์ดที่ถูกคลิก
    if (clickedCard) {
        clickedCard.classList.add('active');
    }
    
    // เก็บประเภทการวินิจฉัยที่ใช้งานอยู่ไว้ใน dataset ของ details panel
    detailsPanel.dataset.activeDiagnosis = diagnosisType;

    // ตั้งค่าโหมดการแสดงผลเริ่มต้นเป็น 'แสดงทั้งหมด' ทุกครั้งที่มีการเลือกการ์ดใหม่
    toggleDisplayMode('all');
}

// ฟังก์ชันสำหรับสลับโหมดการแสดงผล
function toggleDisplayMode(mode) {
    const detailsPanel = document.getElementById('details-panel');
    const activeDiagnosis = detailsPanel.dataset.activeDiagnosis;
    
    if (!activeDiagnosis) return; // ออกจากฟังก์ชันถ้าไม่มีการเลือกการวินิจฉัย

    const datesList = document.querySelector('#' + activeDiagnosis + '-dates-list');
    const allVisits = document.querySelectorAll('#' + activeDiagnosis + '-details .visit-details-card-container');
    
    const allModeBtn = document.getElementById('all-mode-btn');
    const byDateModeBtn = document.getElementById('by-date-mode-btn');
    const latestVisits = {
        'diabetes': 'diabetes-visit-2',
        'hypertension': 'hypertension-visit-4',
        'dyslipidemia': 'dyslipidemia-visit-3'
    };

    if (mode === 'byDate') {
        datesList.classList.remove('hidden');
        allVisits.forEach(visit => visit.classList.add('hidden'));
        byDateModeBtn.classList.add('active');
        allModeBtn.classList.remove('active');
        
        // แสดงข้อมูลวันที่ล่าสุดโดยอัตโนมัติ
        if (latestVisits[activeDiagnosis]) {
            showSingleVisit(activeDiagnosis, latestVisits[activeDiagnosis]);
        }

    } else { // mode === 'all'
        datesList.classList.add('hidden');
        allVisits.forEach(visit => visit.classList.remove('hidden'));
        allModeBtn.classList.add('active');
        byDateModeBtn.classList.remove('active');
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

    // ลบคลาส 'active' จากการ์ดการวินิจฉัยทั้งหมด
    const cards = document.querySelectorAll('.diagnosis-card');
    cards.forEach(card => {
        card.classList.remove('active');
    });
}
