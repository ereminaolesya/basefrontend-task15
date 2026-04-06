document.addEventListener('DOMContentLoaded', () => {
    const selectYear = document.querySelector('[data-test-id="select-year"]')

    const btnPrev = document.querySelector('[data-test-id="btn-prev-month"]');
    const btnNext = document.querySelector('[data-test-id="btn-next-month"]');
    const monthLabel = document.querySelector('[data-test-id="month-label"]');
    const containerDays = document.querySelector('[data-test-id="container-calendar-days"]');

    const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];


    const urlParams = new URLSearchParams(window.location.search);
    const nowParam = urlParams.get('now');
    let currentDate = new Date();
    if (nowParam) {
        const [dd, mm, yyyy] = nowParam.split('.').map(Number);

        if ([dd, mm, yyyy].length === 3) {
            const dateTest = new Date(yyyy, mm - 1, dd);
            if (!Number.isNaN(dateTest.getTime()) && dateTest.getDate() === dd && dateTest.getMonth() === mm - 1 && dateTest.getFullYear() === yyyy) {
                currentDate = dateTest;
            }
        }
    }

    let currYear = currentDate.getFullYear();
    let currMonth = currentDate.getMonth();

    function renderCalendar() {
        monthLabel.textContent = months[currMonth];
        const firstDay = new Date(currYear, currMonth, 1).getDay();
        const lastDate = new Date(currYear, currMonth + 1, 0).getDate();
        let lastDayOfLastMonth = 0;
        if(currMonth === 0) {
            lastDayOfLastMonth = new Date(currYear-1, 11, 31).getDate()
        } else{
            lastDayOfLastMonth = new Date(currYear, currMonth, 0).getDate();
        }

        containerDays.innerHTML = '';

        for (let i = 0; i < 42; i++) {
            const dayDiv = document.createElement('div');
            dayDiv.classList.add('day');

            const dayNum = i - firstDay+1;
            if (dayNum < 1) {
                dayDiv.textContent = lastDayOfLastMonth + dayNum;
                dayDiv.classList.add('other-month');
            } else if (dayNum > lastDate) {
                dayDiv.textContent = dayNum - lastDate;
                dayDiv.classList.add('other-month');
            } else {
                dayDiv.textContent = dayNum;
                if (currYear === currentDate.getFullYear() && currMonth === currentDate.getMonth() && dayNum === currentDate.getDate()) {
                    dayDiv.classList.add('today');
                }
            }
            containerDays.appendChild(dayDiv);
        }
    }

    btnPrev.addEventListener('click', () => {
        if (currMonth === 0) {
            currMonth = 11;
            currYear--;
            populateYears();
        } else {
            currMonth--;
        }
        renderCalendar();
    });
    btnNext.addEventListener('click', () => {
        if (currMonth === 11) {
            currMonth = 0;
            currYear++;
            populateYears();
        } else {
            currMonth++;
        }
        renderCalendar();
    });

    function populateYears() {
        selectYear.innerHTML = '';
        const startYear = currYear - 20;
        const endYear = currYear + 20;
        for (let y = startYear; y <= endYear; y++) {
            const option = document.createElement('option');
            option.value = y;
            option.textContent = y;

            if (y === currYear) {
                option.selected = true;
            }

            selectYear.appendChild(option);
        }
    }

    selectYear.addEventListener('change', (e) => {
        currYear = Number(e.target.value);
        populateYears();
        renderCalendar();
    });


    populateYears();
    renderCalendar();
});