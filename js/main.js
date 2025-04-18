// 初始化变量
let wishes = [];

// DOM 元素
const wishForm = document.getElementById('wish-form');
const wishInput = document.getElementById('wish-input');
const wishesContainer = document.getElementById('wishes-container');

// 从localStorage加载数据
function loadWishes() {
    const savedWishes = localStorage.getItem('jiangnanWishes');
    if (savedWishes) {
        wishes = JSON.parse(savedWishes);
    } else {
        // 首次访问，添加示例数据
        wishes = [
            {
                text: "希望能够在小区中心区域建设一个美丽的花园，种植各种花卉和树木，为居民提供一个休闲放松的绿色空间。",
                date: new Date('2023-10-15').toISOString()
            },
            {
                text: "建议每月组织一次社区读书会，大家一起分享好书，交流读书心得，丰富社区文化生活。",
                date: new Date('2023-10-20').toISOString()
            }
        ];
        saveWishes();
    }
}

// 保存愿望到localStorage
function saveWishes() {
    localStorage.setItem('jiangnanWishes', JSON.stringify(wishes));
}

// 渲染愿望
function renderWishes() {
    wishesContainer.innerHTML = '';
    
    if (wishes.length === 0) {
        wishesContainer.innerHTML = '<div class="empty-state">还没有人提交愿望，快来写下您的第一个愿望吧！</div>';
        return;
    }
    
    // 按添加日期排序，最新的先显示
    const sortedWishes = [...wishes].sort((a, b) => new Date(b.date) - new Date(a.date));
    
    sortedWishes.forEach(wish => {
        const wishElement = document.createElement('div');
        wishElement.className = 'wish fade-in';
        
        wishElement.innerHTML = `
            <div class="wish-content">${wish.text}</div>
            <div class="wish-meta">
                <span>提交时间：${formatDate(wish.date)}</span>
            </div>
        `;
        
        wishesContainer.appendChild(wishElement);
    });
}

// 添加新愿望
function addWish(text) {
    const newWish = {
        text: text,
        date: new Date().toISOString()
    };
    
    wishes.unshift(newWish);
    saveWishes();
    renderWishes();
}

// 格式化日期显示
function formatDate(dateString) {
    if (!dateString) return '未指定';
    
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

// 事件监听器
wishForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const wishText = wishInput.value.trim();
    if (wishText) {
        addWish(wishText);
        wishInput.value = '';
    }
});

// 初始化
document.addEventListener('DOMContentLoaded', function() {
    loadWishes();
    renderWishes();
}); 