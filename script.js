// Update Clock and Date
function updateClockAndDate() {
    const now = new Date();
    const time = now.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
    });
    const date = now.toLocaleDateString('en-GB');
    document.getElementById('clock').textContent = time;
    document.getElementById('date').textContent = date;
}
setInterval(updateClockAndDate, 1000);
updateClockAndDate();

// Calendar Logic
const clockPanel = document.getElementById('clock-panel');
const calendarPanel = document.getElementById('calendar-panel');
const monthYear = document.getElementById('calendar-month-year');
const daysGrid = document.getElementById('calendar-days');
const prevMonthBtn = document.getElementById('prev-month');
const nextMonthBtn = document.getElementById('next-month');

let currentDate = new Date();

clockPanel.addEventListener('click', () => {
    calendarPanel.classList.toggle('hidden');
});

function renderCalendar(date) {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    monthYear.textContent = `${monthNames[month]} ${year}`;

    let days = '';
    for (let i = 0; i < firstDay; i++) days += `<div></div>`;
    for (let d = 1; d <= daysInMonth; d++) {
        const isToday = d === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear();
        days += `<div class="text-center p-1 rounded cursor-pointer ${isToday ? 'bg-blue-500 text-white' : 'hover:bg-blue-500 hover:text-white'}">${d}</div>`;
    }
    daysGrid.innerHTML = days;
}

prevMonthBtn.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar(currentDate);
});

nextMonthBtn.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar(currentDate);
});

renderCalendar(currentDate);
// Fetch and Display Weather
async function getWeather() {
    try {
        const res = await fetch('https://api.weatherapi.com/v1/current.json?key=8d084dc36b1d426b8fc83544252006&q=rewa');
        const data = await res.json();
        const temp = data.current.temp_c;
        const condition = data.current.condition.text;
        const iconURL = "https:" + data.current.condition.icon;

        document.getElementById("weather-info").innerHTML = `
            <img src="${iconURL}" alt="icon" class="w-6 h-6" />
            <div>${temp}°C <br/> <span class="text-white/50 text-xs">${condition}</span></div>
        `;
    } catch (err) {
        console.error("Weather error:", err);
        document.getElementById("weather-info").textContent = "Weather unavailable";
    }
}
getWeather();
setInterval(getWeather, 600000);

// Render Desktop Icons
function DesktopIconShow() {
    const desktopWin = document.querySelector('.desktop-win');
    const desktopIcons = [
        {
            name: "Google",
            icon: "chrome.png"
        },
        {
            name: "Resume.pdf",
            icon: "resume.png"
        },
        {
            name: "Calculator",
            icon: "calculator.png"
        },
        {
            name: "Notepad",
            icon: "notepad.png"
        },
        {
            name: "Weather",
            icon: "weather.png"
        },
        {
            name: "Camera",
            icon: "camera.png"
        }
    ];

    let sum = '';
    desktopIcons.forEach((elem) => {
        sum += `
            <div class="flex flex-col items-center text-xs hover:bg-white/10 rounded-lg p-2 w-[5rem]">
                <img src="./assets/${elem.icon}" class="w-10 h-10" />
                <span class="mt-1 text-center">${elem.name}</span>
            </div>`;
    });
    desktopWin.innerHTML = sum;
}
DesktopIconShow();

// Quick Settings Panel Control
const topControl = document.querySelector('.topControl');
const quickSettings = [{
        name: "Wi-Fi",
        icon: "ri-wifi-line",
        status: 0
    },
    {
        name: "Bluetooth",
        icon: "ri-bluetooth-line",
        status: 0
    },
    {
        name: "Airplane mode",
        icon: "ri-flight-takeoff-line",
        status: 0
    },
    {
        name: "Energy saver",
        icon: "ri-battery-saver-line",
        status: 0
    },
    {
        name: "Night light",
        icon: "ri-sun-line",
        status: 0
    },
    {
        name: "Accessibility",
        icon: "ri-wheelchair-line",
        status: 0
    }
];

function settingControle() {
    let sum = '';
    quickSettings.forEach((elem, idx) => {
        const activeClass = elem.status === 1 ? 'bg-blue-400 text-black' : 'bg-[#2f2f2f] text-white';
        sum += `
            <div id="${idx}" class="${activeClass} p-3 rounded-lg flex flex-col items-center justify-center text-center text-xs cursor-pointer">
                <i class="${elem.icon} text-xl mb-1"></i>
                <span>${elem.name}</span>
            </div>`;
    });
    topControl.innerHTML = sum;
}

settingControle();

topControl.addEventListener('click', (dets) => {
    const clickedId = +dets.target.closest('div') ?.id;
    if (isNaN(clickedId)) return;
    quickSettings[clickedId].status ^= 1;
    settingControle();
});

// Toggle Quick Panel
const wifisettings = document.querySelector('.wifisettings');
const quickPanel = document.querySelector('.quickPanel');
let quickPanelVisible = false;

wifisettings.addEventListener("click", () => {
    quickPanelVisible = !quickPanelVisible;
    quickPanel.classList.toggle('hidden', !quickPanelVisible);
});

// Toggle Start Menu
const usePanel = document.querySelector('.userPanel');
const startMenu = document.querySelector(".menu");
let startMenuVisible = false;

usePanel.addEventListener("click", () => {
    startMenuVisible = !startMenuVisible;
    startMenu.classList.toggle('hidden', !startMenuVisible);
});

// Brightness Slider
const slider = document.getElementById("brightnessSlider");
slider.addEventListener("input", (e) => {
    document.body.style.filter = `brightness(${e.target.value}%)`;
});

// Pinned Apps
const pinnedApps = [
    {
        name: "Calculator",
        icon: "./assets/calculator.png"
    },
    {
        name: "Google",
        icon: "./assets/chrome.png"
    }
];

let pinIcon = document.querySelector('.pin-icon');
let pinHTML = '';

pinnedApps.forEach((elem) => {
    pinHTML += `
        <div class="flex flex-col items-center text-xs" data-app=${elem.name} >
            <img src="${elem.icon}" class="w-10 h-10" />
            <span class="mt-1">${elem.name}</span>
        </div>`;
});

pinIcon.innerHTML = pinHTML;

// ========== Open App Window Logic ==========
const desktopWin = document.querySelector('.desktop-win');
const appContainer = document.getElementById('app-windows-container');

function activateDesktopIcons() {
    const icons = document.querySelectorAll('.desktop-win > div');
    icons.forEach(icon => {
        icon.addEventListener('click', () => {
            const name = icon.querySelector('span').textContent.trim();
            openAppWindow(name);
        });
    });
}

function isAppAlreadyOpen(appName) {
    return [...appContainer.children].some(win =>
        win.querySelector('.text-sm.font-semibold') ?.textContent === appName
    );
}

async function openAppWindow(appName) {
    const winId = `win-${Date.now()}`;
    const appContainer = document.getElementById("app-windows-container");

    const win = document.createElement("div");
    win.className = `
    absolute top-24 left-24 w-[500px] h-[550px]
    bg-[#1e1e1e]/80 backdrop-blur-lg border border-white/10
    rounded-xl shadow-2xl overflow-hidden pointer-events-auto
    resize
  `;
    win.style.zIndex = 100 + document.querySelectorAll('#app-windows-container > div').length;
    win.setAttribute("id", winId);

    let appURL = `./apps/${appName.toLowerCase()}.html`;

    win.innerHTML = `
    <div class="flex justify-between items-center px-3 py-1.5 bg-white/5 rounded-t-xl cursor-move select-none">
      <div class="flex gap-2">
        <div class="w-3 h-3 bg-red-500 rounded-full close hover:brightness-125 transition-all"></div>
        <div class="w-3 h-3 bg-yellow-400 rounded-full minimize hover:brightness-125 transition-all"></div>
        <div class="w-3 h-3 bg-green-500 rounded-full maximize hover:brightness-125 transition-all"></div>
      </div>
      <span class="text-xs text-gray-300 font-medium">${appName}</span>
      <div class="w-6"></div>
    </div>
    <iframe src="${appURL}" class="w-full h-[calc(100%-2.2rem)] border-none"></iframe>
  `;

    appContainer.appendChild(win);
    addWindowControls(win, winId); // your drag, minimize, maximize, close logic
}




function addWindowControls(win, id) {
    const closeBtn = win.querySelector('.close');
    const minBtn = win.querySelector('.minimize');
    const maxBtn = win.querySelector('.maximize');

    closeBtn.onclick = () => win.remove();
    minBtn.onclick = () => win.style.display = 'none';
    maxBtn.onclick = () => {
        if (win.classList.contains('fullscreen')) {
            // Restore to original size
            win.style.top = '20px';
            win.style.left = '20px';
            win.style.width = '400px'; // ✅ reset width
            win.style.height = '300px'; // ✅ reset height
            win.classList.remove('fullscreen');
        } else {
            // Go fullscreen
            win.style.top = '0';
            win.style.left = '0';
            win.style.width = '100%';
            win.style.height = '100%';
            win.classList.add('fullscreen');
        }
    };


    let isDragging = false,
        offsetX, offsetY;
    const header = win.querySelector('.cursor-move');
    header.addEventListener('mousedown', (e) => {
        isDragging = true;
        offsetX = e.offsetX;
        offsetY = e.offsetY;
    });
    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        win.style.top = `${e.clientY - offsetY}px`;
        win.style.left = `${e.clientX - offsetX}px`;
    });
    document.addEventListener('mouseup', () => isDragging = false);
}

// ========== Taskbar & Start Menu App Activation ==========
function activateAppLaunchers() {
    const appLaunchers = document.querySelectorAll('[data-app]');
    appLaunchers.forEach(launcher => {
        launcher.addEventListener('click', () => {
            const appName = launcher.getAttribute('data-app');
            openAppWindow(appName);
        });
    });
}
const taskbarApps = [{
        name: 'Folder',
        icon: './assets/folder.png'
    },
    {
        name: 'Google',
        icon: './assets/chrome.png'
    },

];

function renderTaskbarApps() {
    const container = document.getElementById('taskbar-apps');
    if (!container) return;

    container.innerHTML = taskbarApps.map(app => `
    <div class="hover:bg-white/10 flex items-center justify-center rounded-lg p-2 w-[3rem]" data-app="${app.name}">
      <img src="${app.icon}" class="w-[1.7rem] h-[1.7rem]" title="${app.name}" />
    </div>
  `).join('');

    attachTaskbarListeners();
}

function attachTaskbarListeners() {
    const launchers = document.querySelectorAll('#taskbar-apps [data-app]');
    launchers.forEach(item => {
        item.addEventListener('click', () => {
            const appName = item.getAttribute('data-app');
            openAppWindow(appName); // assumes openAppWindow function is already globally defined
        });
    });
}

// Call this function when the DOM is ready
renderTaskbarApps();

activateDesktopIcons();
activateAppLaunchers();

const wallpaperInput = document.getElementById('wallpaper-input');
const bgImage = document.getElementById('bg-image');

wallpaperInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
        bgImage.src = e.target.result;
    };
    reader.readAsDataURL(file);
});

// Shutdown logic
const shutdownBtn = document.querySelector('.ri-shut-down-line');
const shutdownScreen = document.getElementById('shutdown-screen');

shutdownBtn.addEventListener('click', () => {
  // Hide all open windows, panels, menus
  document.querySelectorAll('#app-windows-container > div').forEach(el => el.remove());
  document.querySelector('.quickPanel')?.classList.add('hidden');
  document.querySelector('.menu')?.classList.add('hidden');
  document.getElementById('calendar-panel')?.classList.add('hidden');

  // Show shutdown screen
  shutdownScreen.classList.remove('hidden');

  // Optional: simulate full shutdown (after 2s)
  setTimeout(() => {
    shutdownScreen.innerHTML = `<h2 class="text-xl">Windows has been shut down.</h2>`;
  }, 2000);
});
