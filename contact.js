// DÁN URL VÀ KEY CỦA BẠN TỪ SUPABASE VÀO 2 DÒNG NÀY
const SUPABASE_URL = 'https://abcxyz.supabase.co'; 
const SUPABASE_ANON_KEY = 'eyJhbGciOiJI...'; 

// Khởi tạo Supabase client
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('booking-form');
    const statusDiv = document.getElementById('form-status');

    if(form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault(); // Chặn hành vi tải lại trang
            
            // Đổi text nút bấm
            const btn = form.querySelector('button');
            btn.innerText = 'Đang gửi thông điệp... ☾';
            btn.disabled = true;
            statusDiv.innerHTML = '';

            // Lấy dữ liệu
            const name = document.getElementById('name').value;
            const contact_info = document.getElementById('contact_info').value;
            const service = document.getElementById('service').value;
            const message = document.getElementById('message').value;

            try {
                // Gửi dữ liệu lên bảng 'bookings' trong Supabase
                const { data, error } = await supabase
                    .from('bookings')
                    .insert([
                        { name: name, contact_info: contact_info, service: service, message: message }
                    ]);

                if (error) throw error;

                // Báo thành công
                statusDiv.innerHTML = '<span class="status-success">Thông điệp của bạn đã được gửi đi. Tôi sẽ liên hệ sớm nhé! ✦</span>';
                form.reset();
            } catch (error) {
                console.error('Lỗi Supabase:', error);
                statusDiv.innerHTML = '<span class="status-error">Có lỗi xảy ra khi gửi. Bạn vui lòng liên hệ qua Facebook nhé!</span>';
            } finally {
                btn.innerText = 'Gửi thông điệp ✦';
                btn.disabled = false;
            }
        });
    }
});
