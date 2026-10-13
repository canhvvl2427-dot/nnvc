// Tính năng mở/đóng menu trên điện thoại
document.addEventListener('DOMContentLoaded', () => {
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const navMenu = document.getElementById('nav-menu');

    if(mobileBtn && navMenu) {
        mobileBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            
            // Hiệu ứng đổi màu icon menu khi bấm
            const spans = mobileBtn.querySelectorAll('span');
            spans.forEach(span => {
                if (navMenu.classList.contains('active')) {
                    span.style.backgroundColor = '#F5EBDD'; // Đổi sang màu ngà
                } else {
                    span.style.backgroundColor = '#D5B779'; // Trả về màu vàng
                }
            });
        });
    }
});
