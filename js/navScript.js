var list = document.querySelector('#sidenav .tabList');
var navBtn = document.getElementById('openNavBtn');

var pageElements = document.querySelectorAll('*');

pageElements.forEach(function(elements){
    elements.addEventListener('click', closeNav);
});

navBtn.addEventListener('click', openNav);

function openNav(event) {
    list.classList.add('On');
    navBtn.style.display = "none"
    event.stopPropagation();
};

list.addEventListener('click', (event) => {
    event.stopPropagation();
});

function closeNav() {
    list.classList.remove('On');
    navBtn.style.display = "block"
};

// Theme menu

var themeBtn = document.getElementById('themeBtn');

themeBtn.addEventListener('click', (event) => {
    event.stopPropagation();
    themeBtn.classList.toggle('active');
});

document.addEventListener('click', (event) => {
    if (!themeBtn.contains(event.target)) {
        themeBtn.classList.remove('active');
    }
});

// Themes

const currentTheme = localStorage.getItem('theme');

Theme(currentTheme);

function Theme(themeName) {
    const root = document.querySelector(':root');

    switch (themeName) {
        case 'lightRed':
            root.style.setProperty('--baseColor', '#ffd5de');
            root.style.setProperty('--navTextColor', '#ffd5de');
            root.style.setProperty('--baseTextColor', '#801');
            root.style.setProperty('--baseOverColor', '#c02');
            root.style.setProperty('--baseOv2Color', '#801');
            root.style.setProperty('--baseOppColor', '#160004');
            root.style.setProperty('--navOverlay', '#00000040');
            root.style.setProperty('--baseBorderColor', '#410008');
            root.style.setProperty('--footerTextColor', '#ffd5de');
            break;

        case 'lightGreen':
            root.style.setProperty('--baseColor', '#d5ffd8');
            root.style.setProperty('--navTextColor', '#d5ffd8');
            root.style.setProperty('--baseTextColor', '#160');
            root.style.setProperty('--baseOverColor', '#392');
            root.style.setProperty('--baseOv2Color', '#160');
            root.style.setProperty('--baseOppColor', '#051600');
            root.style.setProperty('--navOverlay', '#00000040');
            root.style.setProperty('--baseBorderColor', '#104100');
            root.style.setProperty('--footerTextColor', '#d5ffd8');
            break;

        case 'lightBlue':
            root.style.setProperty('--baseColor', '#d5d7ff');
            root.style.setProperty('--navTextColor', '#d5d7ff');
            root.style.setProperty('--baseTextColor', '#291e7c');
            root.style.setProperty('--baseOverColor', '#3e2fac');
            root.style.setProperty('--baseOv2Color', '#291e7c');
            root.style.setProperty('--baseOppColor', '#000316');
            root.style.setProperty('--navOverlay', '#00000040');
            root.style.setProperty('--baseBorderColor', '#100b35');
            root.style.setProperty('--footerTextColor', '#d5d7ff');
            break;

        case 'darkRed':
            root.style.setProperty('--baseColor', '#410008');
            root.style.setProperty('--navTextColor', '#410008');
            root.style.setProperty('--baseTextColor', '#db4254');
            root.style.setProperty('--baseOverColor', '#c02');
            root.style.setProperty('--baseOv2Color', '#801');
            root.style.setProperty('--baseOppColor', '#ffd5de');
            root.style.setProperty('--navOverlay', '#ffffff40');
            root.style.setProperty('--baseBorderColor', '#410008');
            root.style.setProperty('--footerTextColor', '#ffd5de');
            break;

        case 'darkGreen':
            root.style.setProperty('--baseColor', '#104100');
            root.style.setProperty('--navTextColor', '#104100');
            root.style.setProperty('--baseTextColor', '#42db44');
            root.style.setProperty('--baseOverColor', '#392');
            root.style.setProperty('--baseOv2Color', '#160');
            root.style.setProperty('--baseOppColor', '#d5ffd8');
            root.style.setProperty('--navOverlay', '#ffffff40');
            root.style.setProperty('--baseBorderColor', '#104100');
            root.style.setProperty('--footerTextColor', '#d5ffd8');
            break;

        case 'darkBlue':
            root.style.setProperty('--baseColor', '#100b35');
            root.style.setProperty('--navTextColor', '#100b35');
            root.style.setProperty('--baseTextColor', '#4254db');
            root.style.setProperty('--baseOverColor', '#3e2fac');
            root.style.setProperty('--baseOv2Color', '#291e7c');
            root.style.setProperty('--baseOppColor', '#d5d7ff');
            root.style.setProperty('--navOverlay', '#ffffff40');
            root.style.setProperty('--baseBorderColor', '#100b35');
            root.style.setProperty('--footerTextColor', '#d5d7ff');
        break;

        default:
            root.style.setProperty('--baseColor', '#ffd5de');
            root.style.setProperty('--navTextColor', '#ffd5de');
            root.style.setProperty('--baseTextColor', '#801');
            root.style.setProperty('--baseOverColor', '#c02');
            root.style.setProperty('--baseOv2Color', '#801');
            root.style.setProperty('--baseOppColor', '#160004');
            root.style.setProperty('--navOverlay', '#00000040');
            root.style.setProperty('--baseBorderColor', '#410008');
            root.style.setProperty('--footerTextColor', '#ffd5de');
            return;
    }

    localStorage.setItem('theme', themeName);
}