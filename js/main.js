// 初始化示例愿望数据
let wishes = [
    {
        id: 1,
        category: "环境改善",
        title: "小区花园改造",
        description: "希望能够在小区中心区域建设一个美丽的花园，种植各种花卉和树木，为居民提供一个休闲放松的绿色空间。",
        userName: "李明",
        userContact: "",
        expectedDate: "2023-12-31",
        contribution: "我可以组织志愿者参与植树活动，并提供一些植物种子。",
        dateAdded: "2023-06-15"
    },
    {
        id: 2,
        category: "文化活动",
        title: "社区读书会",
        description: "建议每月组织一次社区读书会，大家一起分享好书，交流读书心得，丰富社区文化生活。",
        userName: "张华",
        userContact: "",
        expectedDate: "2023-09-30",
        contribution: "我愿意担任读书会组织者，提供场地和茶点。",
        dateAdded: "2023-06-18"
    },
    {
        id: 3,
        category: "便民设施",
        title: "智能快递柜",
        description: "建议在小区门口安装智能快递柜，方便居民随时取件，减少快递员进入小区的次数，提高安全性。",
        userName: "王强",
        userContact: "",
        expectedDate: "2023-10-15",
        contribution: "我可以联系快递公司进行沟通和协调。",
        dateAdded: "2023-06-20"
    },
    {
        id: 4,
        category: "邻里互助",
        title: "技能交换平台",
        description: "创建一个邻里技能交换平台，比如有人会修电脑可以帮助不会的邻居，而不会的邻居可以用其他技能回馈，促进邻里互助。",
        userName: "赵敏",
        userContact: "",
        expectedDate: "2023-11-30",
        contribution: "我愿意开发一个简单的微信小程序来实现这个功能。",
        dateAdded: "2023-06-25"
    },
    {
        id: 5,
        category: "环境改善",
        title: "节能路灯更换",
        description: "建议将小区内的普通路灯更换为太阳能LED节能灯，既环保又能降低物业费用。",
        userName: "刘伟",
        userContact: "",
        expectedDate: "2023-12-15",
        contribution: "我可以提供一些关于节能灯具的专业建议，并协助联系供应商。",
        dateAdded: "2023-07-01"
    }
];

// 从localStorage加载数据
function loadWishes() {
    const savedWishes = localStorage.getItem('jiangnanWishes');
    if (savedWishes) {
        wishes = JSON.parse(savedWishes);
    } else {
        // 首次访问，保存示例数据
        saveWishes();
    }
}

// 保存数据到localStorage
function saveWishes() {
    localStorage.setItem('jiangnanWishes', JSON.stringify(wishes));
}

// 渲染愿望卡片
function renderWishes() {
    const container = document.getElementById('wishes-container');
    container.innerHTML = '';
    
    // 按添加日期排序，最新的先显示
    const sortedWishes = [...wishes].sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
    
    sortedWishes.forEach(wish => {
        const card = document.createElement('div');
        card.className = 'col-md-4 mb-4 fade-in';
        
        card.innerHTML = `
            <div class="card wish-card">
                <div class="card-header d-flex justify-content-between align-items-center">
                    <h5 class="card-title mb-0">${wish.title}</h5>
                    <span class="badge category-badge">${wish.category}</span>
                </div>
                <div class="card-body">
                    <p class="card-text">${wish.description}</p>
                    <p class="text-muted"><small>期望实现日期: ${formatDate(wish.expectedDate)}</small></p>
                    <p class="card-text"><strong>我的贡献:</strong> ${wish.contribution}</p>
                </div>
                <div class="card-footer text-muted">
                    <div class="d-flex justify-content-between">
                        <span>来自: ${wish.userName || '匿名'}</span>
                        <span>${formatDate(wish.dateAdded)}</span>
                    </div>
                </div>
            </div>
        `;
        
        container.appendChild(card);
    });
}

// 初始化分类统计图表
function initChart() {
    const ctx = document.getElementById('wishChart').getContext('2d');
    
    // 统计各类别的数量
    const categories = {};
    wishes.forEach(wish => {
        categories[wish.category] = (categories[wish.category] || 0) + 1;
    });
    
    const categoryLabels = Object.keys(categories);
    const categoryData = Object.values(categories);
    const categoryColors = [
        '#4e7a51', // --primary-color
        '#8cc084', // --secondary-color
        '#b5c9a1', // --accent-color
        '#2c3e50', // --dark-color
        '#6e9e6a'  // 额外颜色
    ];
    
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: categoryLabels,
            datasets: [{
                data: categoryData,
                backgroundColor: categoryColors.slice(0, categoryLabels.length),
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.raw;
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = Math.round((value / total) * 100);
                            return `${label}: ${value} (${percentage}%)`;
                        }
                    }
                }
            }
        }
    });
}

// 表单提交处理
function setupFormSubmission() {
    document.getElementById('submitWish').addEventListener('click', function() {
        const form = document.getElementById('wishForm');
        
        // 简单表单验证
        const category = document.getElementById('wishCategory').value;
        const title = document.getElementById('wishTitle').value;
        const description = document.getElementById('wishDescription').value;
        
        if (!category || !title || !description) {
            alert('请填写必填字段：愿望类别、标题和描述');
            return;
        }
        
        // 收集表单数据
        const newWish = {
            id: wishes.length > 0 ? Math.max(...wishes.map(w => w.id)) + 1 : 1,
            category: category,
            title: title,
            description: description,
            userName: document.getElementById('userName').value || '匿名',
            userContact: document.getElementById('userContact').value,
            expectedDate: document.getElementById('expectedDate').value,
            contribution: document.getElementById('contribution').value,
            dateAdded: new Date().toISOString().split('T')[0]
        };
        
        // 添加到数组并保存
        wishes.push(newWish);
        saveWishes();
        
        // 刷新显示
        renderWishes();
        
        // 重新初始化图表
        initChart();
        
        // 关闭模态框并重置表单
        const modal = bootstrap.Modal.getInstance(document.getElementById('wishModal'));
        modal.hide();
        form.reset();
    });
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

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    loadWishes();
    renderWishes();
    initChart();
    setupFormSubmission();
    
    // 在模态框关闭时重置表单
    document.getElementById('wishModal').addEventListener('hidden.bs.modal', function() {
        document.getElementById('wishForm').reset();
    });
}); 