let currentSpread = [];
let drawnCards = [];
let deckState = []; // Mảng chứa 22 ID lá bài đã xáo trộn

function startReading(spreadType) {
    // 1. Lấy dữ liệu kiểu trải bài
    currentSpread = spreads[spreadType];
    drawnCards = [];
    
    // 2. Xáo bài (Tạo mảng từ 0-21 và xáo ngẫu nhiên)
    deckState = Array.from({length: 22}, (_, i) => i);
    deckState.sort(() => Math.random() - 0.5);

    // 3. Ẩn Step 1, Hiện Step 2
    document.getElementById('step-1-selection').style.display = 'none';
    document.getElementById('step-2-draw').style.display = 'block';
    
    updateDrawInstruction();
    renderDeck();
}

function updateDrawInstruction() {
    let positionText = currentSpread[drawnCards.length].title;
    document.getElementById('current-position').innerText = positionText;
    document.getElementById('cards-left').innerText = currentSpread.length - drawnCards.length;
}

function renderDeck() {
    const deckContainer = document.getElementById('deck-container');
    deckContainer.innerHTML = ''; // Xóa bài cũ

    // In ra 22 lá bài úp
    deckState.forEach((cardId, index) => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('tarot-card', 'face-down');
        // Thêm index để xác định lá nào bị click
        cardElement.dataset.index = index; 
        cardElement.dataset.id = cardId;
        
        // CSS thiết kế mặt sau lá bài
        cardElement.innerHTML = `
            <div class="card-inner">
                <div class="card-back">✦</div>
                <div class="card-front"></div>
            </div>
        `;
        
        cardElement.addEventListener('click', onCardClick);
        deckContainer.appendChild(cardElement);
    });
}

function onCardClick(e) {
    const cardEl = e.currentTarget;
    
    // Nếu lá này đã được rút rồi thì bỏ qua
    if(cardEl.classList.contains('drawn')) return;
    
    cardEl.classList.add('drawn'); // Đánh dấu đã rút
    
    // Xác định lá bài và chiều (xuôi/ngược)
    const cardId = parseInt(cardEl.dataset.id);
    const isReversed = Math.random() > 0.7; // 30% cơ hội ra bài ngược
    
    const cardData = tarotDeck.find(c => c.id === cardId);
    const positionTitle = currentSpread[drawnCards.length].title;

    // Lưu vào mảng kết quả
    drawnCards.push({
        position: positionTitle,
        card: cardData,
        isReversed: isReversed
    });

    // Nếu đã rút đủ bài
    if (drawnCards.length >= currentSpread.length) {
        setTimeout(showResults, 800); // Đợi 1 chút rồi chuyển màn hình
    } else {
        updateDrawInstruction();
    }
}

function showResults() {
    document.getElementById('step-2-draw').style.display = 'none';
    document.getElementById('step-3-result').style.display = 'block';
    
    const resultContainer = document.getElementById('reading-result');
    resultContainer.innerHTML = '';

    drawnCards.forEach(item => {
        const meaningText = item.isReversed ? item.card.reversed : item.card.meaning;
        const stateText = item.isReversed ? "(Ngược)" : "(Xuôi)";
        
        const html = `
            <div class="result-card-box">
                <h4 class="position-title">${item.position}</h4>
                <div class="result-card-visual ${item.isReversed ? 'is-reversed' : ''}">
                    <div class="card-name">${item.card.name}</div>
                    <div class="card-name-vn">${item.card.nameVN}</div>
                </div>
                <h5 class="card-title-text">${item.card.nameVN} ${stateText}</h5>
                <p class="card-meaning-text">${meaningText}</p>
            </div>
        `;
        resultContainer.innerHTML += html;
    });
}

function resetReading() {
    document.getElementById('step-3-result').style.display = 'none';
    document.getElementById('step-1-selection').style.display = 'block';
}
