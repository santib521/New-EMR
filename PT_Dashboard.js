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
    const medicationContainer = document.getElementById('medication-list-container');
    
    // ตรวจสอบสถานะการแสดงผล
    if (modal.classList.contains('hidden')) {
        // ถ้าซ่อนอยู่ ให้แสดงกล่องโต้ตอบ
        modal.classList.remove('hidden');

        // สร้าง HTML สำหรับรายการยาแต่ละรายการ
        medicationContainer.innerHTML = ''; // ล้างรายการเดิม
        allMedications.forEach(med => {
            const medicationHtml = `
                <div class="medication-card-modal">
                    <div class="medication-info-modal">
                        <div class="medication-name-modal">${med.name}</div>
                        <div class="medication-context-modal">สำหรับ: ${med.diagnosis}</div>
                    </div>
                    <div class="medication-date-modal">ได้รับเมื่อ: ${med.date}</div>
                </div>
            `;
            medicationContainer.innerHTML += medicationHtml;
        });

    } else {
        // ถ้าแสดงอยู่ ให้ซ่อนกล่องโต้ตอบ
        modal.classList.add('hidden');
    }
}

// ฟังก์ชันสำหรับเปิด/ปิดกล่องโต้ตอบการนัดหมาย
function toggleAppointmentsModal() {
    const modal = document.getElementById('appointmentsModal');
    const appointmentsContainer = document.getElementById('appointments-list-container');
    
    if (modal.classList.contains('hidden')) {
        modal.classList.remove('hidden');

        appointmentsContainer.innerHTML = ''; 
        allAppointments.forEach(appt => {
            const appointmentHtml = `
                <div class="appointment-card-modal">
                    <div class="appointment-info-modal">
                        <div class="appointment-name-modal">${appt.name}</div>
                        <div class="appointment-context-modal">สถานที่: ${appt.location}</div>
                    </div>
                    <div class="appointment-date-modal">วันที่: ${appt.date}</div>
                </div>
            `;
            appointmentsContainer.innerHTML += appointmentHtml;
        });
    } else {
        modal.classList.add('hidden');
    }
}

function showDetails(diagnosisType, clickedCard) {
    // ซ่อนรายการ 'ครั้งที่มาพบแพทย์'
    document.getElementById('timeline-details').classList.add('hidden');
    
    // แสดง panel รายละเอียด
    const detailsPanel = document.getElementById('details-panel');
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
}

function showAppointments() {
    // แสดงรายการ 'ครั้งที่มาพบแพทย์'
    document.getElementById('timeline-details').classList.remove('hidden');
    
    // ซ่อน panel รายละเอียด
    document.getElementById('details-panel').classList.add('hidden');

    // ลบคลาส 'active' จากการ์ดการวินิจฉัยหลักทั้งหมด
    const cards = document.querySelectorAll('.diagnosis-card');
    cards.forEach(card => {
        card.classList.remove('active');
    });
}