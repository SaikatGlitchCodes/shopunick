const themeBtn = document.getElementById('themebtn');

themeBtn.addEventListener('click', () => {
    const currentTheme = localStorage.getItem('theme') || 'light';
    if (currentTheme === 'dark') {
        localStorage.setItem('theme', 'light');
        themeBtn.classList.remove('fi-rs-moon');
        themeBtn.classList.add('fi-rs-brightness');
        document.body.classList.remove('bg-black', 'text-white');
    } else {
        localStorage.setItem('theme', 'dark');
        themeBtn.classList.remove('fi-rs-brightness');
        themeBtn.classList.add('fi-rs-moon');
        document.body.classList.add('bg-black', 'text-white');
    }
});

const currentTheme = localStorage.getItem('theme') || 'light';
if (currentTheme === 'dark') {
    themeBtn.classList.remove('fi-rs-brightness');
    themeBtn.classList.add('fi-rs-moon');
    document.body.classList.add('bg-black', 'text-white');
}
else {
    themeBtn.classList.remove('fi-rs-moon');
    themeBtn.classList.add('fi-rs-brightness');
    document.body.classList.remove('bg-black', 'text-white');
}