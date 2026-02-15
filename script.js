// ==================== DATA STORE ====================
let users = JSON.parse(localStorage.getItem('users')) || [
    {
        id: 1,
        name: 'Admin',
        email: 'admin@gamevault.com',
        password: 'admin123',
        role: 'admin',
        saldo_akun: 10000000,
        saldo_reseller: 0,
        status: 'active',
        isReseller: false,
        total_deposit: 0,
        komisi: 0,
        joinDate: new Date().toISOString(),
        fcmToken: null,
        notifSettings: {
            newTransaction: true,
            paymentConfirm: true,
            akunDelivery: true,
            promo: true
        }
    },
    {
        id: 2,
        name: 'Reseller Demo',
        email: 'reseller@demo.com',
        password: 'reseller123',
        role: 'user',
        saldo_akun: 500000,
        saldo_reseller: 1000000,
        status: 'active',
        isReseller: true,
        total_deposit: 2000000,
        komisi: 10,
        joinDate: new Date().toISOString(),
        fcmToken: null,
        notifSettings: {
            newTransaction: true,
            paymentConfirm: true,
            akunDelivery: true,
            promo: true
        }
    }
];

let products = JSON.parse(localStorage.getItem('products')) || [
    { id: 1, game: 'Mobile Legends', item: '86 Diamonds', price: 20000, reseller_price: 18000, category: 'mobile', image: 'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=200', stock: 999 },
    { id: 2, game: 'Mobile Legends', item: '172 Diamonds', price: 40000, reseller_price: 36000, category: 'mobile', image: 'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=200', stock: 999 },
    { id: 3, game: 'Mobile Legends', item: '257 Diamonds', price: 60000, reseller_price: 54000, category: 'mobile', image: 'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=200', stock: 999 },
    { id: 4, game: 'PUBG Mobile', item: '60 UC', price: 15000, reseller_price: 13500, category: 'pubg', image: 'https://images.unsplash.com/photo-1600861194942-f883de0dfe96?w=200', stock: 999 },
    { id: 5, game: 'PUBG Mobile', item: '180 UC', price: 45000, reseller_price: 40500, category: 'pubg', image: 'https://images.unsplash.com/photo-1600861194942-f883de0dfe96?w=200', stock: 999 },
    { id: 6, game: 'Free Fire', item: '70 Diamonds', price: 10000, reseller_price: 9000, category: 'ff', image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=200', stock: 999 },
    { id: 7, game: 'Free Fire', item: '140 Diamonds', price: 20000, reseller_price: 18000, category: 'ff', image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=200', stock: 999 },
    { id: 8, game: 'Free Fire', item: '355 Diamonds', price: 50000, reseller_price: 45000, category: 'ff', image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=200', stock: 999 }
];

let akunGames = JSON.parse(localStorage.getItem('akunGames')) || [
    { 
        id: 1, 
        game: 'Mobile Legends', 
        deskripsi: 'Akun Mythic 100+ skin', 
        harga: 500000, 
        harga_reseller: 450000,
        detail: {
            email: 'ml123@gmail.com',
            password: 'ml123',
            nickname: 'MLProPlayer',
            level: 'Mythic',
            skin_count: 120,
            hero_count: 85,
            screenshot: [
                'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400'
            ]
        }, 
        status: 'tersedia',
        terjual: 0
    },
    { 
        id: 2, 
        game: 'PUBG Mobile', 
        deskripsi: 'Akun Conqueror', 
        harga: 750000,
        harga_reseller: 680000,
        detail: {
            email: 'pubg123@gmail.com',
            password: 'pubg123',
            nickname: 'PUBGPro',
            tier: 'Conqueror',
            uc: 1200,
            skin_count: 85,
            screenshot: [
                'https://images.unsplash.com/photo-1600861194942-f883de0dfe96?w=400'
            ]
        }, 
        status: 'tersedia',
        terjual: 0
    },
    { 
        id: 3, 
        game: 'Free Fire', 
        deskripsi: 'Akun Grandmaster', 
        harga: 300000,
        harga_reseller: 270000,
        detail: {
            email: 'ff123@gmail.com',
            password: 'ff123',
            nickname: 'FFPro',
            rank: 'Grandmaster',
            diamond: 500,
            skin_count: 60,
            screenshot: [
                'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400'
            ]
        }, 
        status: 'tersedia',
        terjual: 0
    }
];

let ewallet = [
    { id: 1, name: 'DANA', fee: 1000, min: 10000, max: 2000000 },
    { id: 2, name: 'OVO', fee: 1000, min: 10000, max: 2000000 },
    { id: 3, name: 'GoPay', fee: 1000, min: 10000, max: 2000000 }
];

let saldoPackages = JSON.parse(localStorage.getItem('saldoPackages')) || [
    { id: 1, name: 'Paket Hemat', nominal: 50000, bonus: 5, price: 50000 },
    { id: 2, name: 'Paket Populer', nominal: 100000, bonus: 7, price: 100000 },
    { id: 3, name: 'Paket Spesial', nominal: 250000, bonus: 10, price: 250000 },
    { id: 4, name: 'Paket Sultan', nominal: 500000, bonus: 15, price: 500000 },
    { id: 5, name: 'Paket HOKI', nominal: 1000000, bonus: 20, price: 1000000 }
];

let resellerPackages = JSON.parse(localStorage.getItem('resellerPackages')) || [
    { id: 1, name: 'Reseller Pemula', nominal: 100000, bonus: 5, price: 100000 },
    { id: 2, name: 'Reseller Pro', nominal: 500000, bonus: 7, price: 500000 },
    { id: 3, name: 'Reseller Sultan', nominal: 1000000, bonus: 10, price: 1000000 },
    { id: 4, name: 'Reseller Legend', nominal: 5000000, bonus: 15, price: 5000000 }
];

let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
let adminNotifications = JSON.parse(localStorage.getItem('admin_notifications')) || [];
let userNotifications = JSON.parse(localStorage.getItem('user_notifications')) || [];
let broadcastHistory = JSON.parse(localStorage.getItem('broadcast_history')) || [];
let depositHistory = JSON.parse(localStorage.getItem('depositHistory')) || [];
let pembelianAkun = JSON.parse(localStorage.getItem('pembelian_akun')) || [];

let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;
let currentPreviewTransaction = null;
let uploadedImages = JSON.parse(localStorage.getItem('bukti_pembayaran')) || {};

// ==================== NOTIFICATION VARIABLES ====================
let notificationPermission = localStorage.getItem('notifPermission') === 'granted';

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded');
    
    // Load data
    loadProducts();
    loadAkun();
    loadSaldoPackages();
    loadResellerPackages();
    loadEwallet();
    
    // Update UI
    updateAuthUI();
    updateTransaksiForm();
    setupEventListeners();
    updateAllBadges();
    updateSaldoBadges();
    
    // Update admin stats jika user adalah admin
    if (currentUser && currentUser.role === 'admin') {
        updateAdminStats();
    }
    
    const uploadSection = document.getElementById('uploadBuktiSection');
    if (uploadSection) {
        uploadSection.style.display = 'block';
    }
    
    console.log('Current user:', currentUser);
});

// ==================== EVENT LISTENERS ====================
function setupEventListeners() {
    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Active nav link on scroll
    window.addEventListener('scroll', function() {
        let sections = document.querySelectorAll('section');
        let navLinks = document.querySelectorAll('.nav-menu a');
        
        sections.forEach(section => {
            let top = section.offsetTop - 100;
            let bottom = top + section.offsetHeight;
            let scroll = window.scrollY;
            
            if (scroll >= top && scroll < bottom) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + section.id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
}

function toggleMobileMenu() {
    const menu = document.querySelector('.nav-menu ul');
    if (menu) {
        menu.classList.toggle('show');
    }
}

// ==================== AUTHENTICATION FUNCTIONS ====================
function showLoginModal() {
    document.getElementById('loginModal').style.display = 'block';
}

function closeLoginModal() {
    document.getElementById('loginModal').style.display = 'none';
}

function showRegisterModal() {
    document.getElementById('registerModal').style.display = 'block';
}

function closeRegisterModal() {
    document.getElementById('registerModal').style.display = 'none';
}

function switchToRegister() {
    closeLoginModal();
    showRegisterModal();
}

function switchToLogin() {
    closeRegisterModal();
    showLoginModal();
}

function login() {
    console.log('Login function called');
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    if (!email || !password) {
        showNotification('Email dan password harus diisi!', 'warning');
        return;
    }

    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        currentUser = user;
        localStorage.setItem('currentUser', JSON.stringify(user));
        updateAuthUI();
        closeLoginModal();
        showNotification('Login berhasil! Selamat datang ' + user.name, 'success');
        
        // Update UI berdasarkan role
        const adminPanel = document.getElementById('adminPanel');
        const resellerPanel = document.getElementById('resellerPanel');
        
        console.log('User role:', user.role);
        
        if (adminPanel) {
            adminPanel.style.display = user.role === 'admin' ? 'block' : 'none';
            console.log('Admin panel display:', adminPanel.style.display);
        }
        
        if (resellerPanel) {
            resellerPanel.style.display = user.isReseller ? 'block' : 'none';
        }
        
        updateSaldoBadges();
        
        // Update admin stats jika user adalah admin
        if (user.role === 'admin') {
            updateAdminStats();
        }
        
        // Reset form
        document.getElementById('loginEmail').value = '';
        document.getElementById('loginPassword').value = '';
    } else {
        showNotification('Email atau password salah!', 'error');
    }
}

function register() {
    console.log('Register function called');
    
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('registerConfirmPassword').value;
    const asResellerSelect = document.getElementById('registerAsReseller');
    const asReseller = asResellerSelect ? asResellerSelect.value === 'yes' : false;

    // Validasi
    if (!name || !email || !password || !confirmPassword) {
        showNotification('Semua field harus diisi!', 'warning');
        return;
    }

    if (password !== confirmPassword) {
        showNotification('Password tidak cocok!', 'error');
        return;
    }

    if (password.length < 6) {
        showNotification('Password minimal 6 karakter!', 'warning');
        return;
    }

    if (!email.includes('@')) {
        showNotification('Email tidak valid!', 'warning');
        return;
    }

    // Cek email sudah terdaftar
    if (users.find(u => u.email === email)) {
        showNotification('Email sudah terdaftar!', 'error');
        return;
    }

    // Buat user baru
    const newUser = {
        id: users.length + 1,
        name: name,
        email: email,
        password: password,
        role: 'user',
        saldo_akun: 0,
        saldo_reseller: 0,
        isReseller: asReseller,
        status: 'active',
        total_deposit: 0,
        komisi: asReseller ? 5 : 0,
        joinDate: new Date().toISOString(),
        fcmToken: null,
        notifSettings: {
            newTransaction: true,
            paymentConfirm: true,
            akunDelivery: true,
            promo: true
        }
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    showNotification('Registrasi berhasil! Silakan login.', 'success');
    closeRegisterModal();
    showLoginModal();
    
    // Reset form
    document.getElementById('registerName').value = '';
    document.getElementById('registerEmail').value = '';
    document.getElementById('registerPassword').value = '';
    document.getElementById('registerConfirmPassword').value = '';
    if (asResellerSelect) {
        asResellerSelect.value = 'no';
    }
}

function logout() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    updateAuthUI();
    showNotification('Anda telah logout', 'info');
    
    // Update UI
    const adminPanel = document.getElementById('adminPanel');
    const resellerPanel = document.getElementById('resellerPanel');
    
    if (adminPanel) adminPanel.style.display = 'none';
    if (resellerPanel) resellerPanel.style.display = 'none';
    
    setTimeout(() => {
        window.location.reload();
    }, 1000);
}

function updateAuthUI() {
    const navAuth = document.getElementById('navAuth');
    const navUser = document.getElementById('navUser');
    const userName = document.getElementById('userName');
    const adminPanel = document.getElementById('adminPanel');
    const resellerPanel = document.getElementById('resellerPanel');

    console.log('Updating auth UI, currentUser:', currentUser);

    if (currentUser) {
        if (navAuth) navAuth.style.display = 'none';
        if (navUser) {
            navUser.style.display = 'flex';
            if (userName) userName.textContent = currentUser.name;
        }
        
        // Tampilkan panel berdasarkan role
        if (adminPanel) {
            adminPanel.style.display = currentUser.role === 'admin' ? 'block' : 'none';
        }
        if (resellerPanel) {
            resellerPanel.style.display = currentUser.isReseller ? 'block' : 'none';
        }
    } else {
        if (navAuth) navAuth.style.display = 'flex';
        if (navUser) navUser.style.display = 'none';
        if (adminPanel) adminPanel.style.display = 'none';
        if (resellerPanel) resellerPanel.style.display = 'none';
    }
}

function updateSaldoBadges() {
    if (currentUser) {
        const saldoAkunBadge = document.getElementById('saldoAkunBadge');
        const saldoResellerBadge = document.getElementById('saldoResellerBadge');
        
        if (saldoAkunBadge) {
            saldoAkunBadge.textContent = `Rp ${formatRupiah(currentUser.saldo_akun || 0)}`;
        }
        if (saldoResellerBadge) {
            saldoResellerBadge.textContent = `Rp ${formatRupiah(currentUser.saldo_reseller || 0)}`;
        }
    }
}

// ==================== PRODUCT FUNCTIONS ====================
function loadProducts() {
    const grid = document.getElementById('gameGrid');
    if (!grid) return;
    
    grid.innerHTML = '';

    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.game}" onerror="this.src='https://via.placeholder.com/200?text=Game'">
            </div>
            <div class="product-info">
                <h3>${product.game}</h3>
                <p>${product.item}</p>
                <div class="product-price">Rp ${formatRupiah(product.price)}</div>
                ${product.reseller_price ? `<div class="product-reseller-price">Harga Reseller: Rp ${formatRupiah(product.reseller_price)}</div>` : ''}
                <div class="product-stock">Stok: ${product.stock}</div>
                <button class="btn-beli-product" onclick="selectProduct(${product.id})">Beli</button>
            </div>
        `;
        grid.appendChild(card);
    });
}

function loadAkun() {
    const grid = document.getElementById('akunGrid');
    if (!grid) return;
    
    grid.innerHTML = '';

    akunGames.forEach(akun => {
        if (akun.status === 'tersedia') {
            const card = document.createElement('div');
            card.className = 'product-card';
            const screenshot = akun.detail.screenshot && akun.detail.screenshot.length > 0 
                ? akun.detail.screenshot[0] 
                : 'https://via.placeholder.com/200?text=Akun';
            
            card.innerHTML = `
                <div class="product-image">
                    <img src="${screenshot}" alt="${akun.game}" onerror="this.src='https://via.placeholder.com/200?text=Akun'">
                </div>
                <div class="product-info">
                    <h3>${akun.game}</h3>
                    <p>${akun.deskripsi}</p>
                    <div class="product-price">Rp ${formatRupiah(akun.harga)}</div>
                    ${akun.harga_reseller ? `<div class="product-reseller-price">Harga Reseller: Rp ${formatRupiah(akun.harga_reseller)}</div>` : ''}
                    <div class="product-stock">Terjual: ${akun.terjual}</div>
                    <button class="btn-beli-product" onclick="selectAkun(${akun.id})">Beli Akun</button>
                </div>
            `;
            grid.appendChild(card);
        }
    });
}

function loadEwallet() {
    const grid = document.getElementById('ewalletGrid');
    if (!grid) return;
    
    grid.innerHTML = '';

    ewallet.forEach(wallet => {
        const card = document.createElement('div');
        card.className = 'payment-card';
        card.innerHTML = `
            <i class="fas fa-wallet"></i>
            <h3>${wallet.name}</h3>
            <p>Min: Rp ${formatRupiah(wallet.min)}</p>
            <p>Max: Rp ${formatRupiah(wallet.max)}</p>
            <p class="payment-desc">Fee: Rp ${formatRupiah(wallet.fee)}</p>
        `;
        card.onclick = () => selectPayment('ewallet', wallet);
        grid.appendChild(card);
    });
}

function loadSaldoPackages() {
    const grid = document.getElementById('saldoPackages');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    saldoPackages.forEach(pkg => {
        const card = document.createElement('div');
        card.className = 'package-card';
        card.onclick = function() { selectSaldoPackage(pkg.id); };
        card.innerHTML = `
            <div class="package-name">${pkg.name}</div>
            <div class="package-nominal">Rp ${formatRupiah(pkg.nominal)}</div>
            <div class="package-bonus">Bonus ${pkg.bonus}%</div>
            <div class="package-price">Rp ${formatRupiah(pkg.price)}</div>
        `;
        grid.appendChild(card);
    });
}

function loadResellerPackages() {
    const grid = document.getElementById('resellerPackages');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    resellerPackages.forEach(pkg => {
        const card = document.createElement('div');
        card.className = 'package-card';
        card.onclick = function() { selectResellerPackage(pkg.id); };
        card.innerHTML = `
            <div class="package-name">${pkg.name}</div>
            <div class="package-nominal">Rp ${formatRupiah(pkg.nominal)}</div>
            <div class="package-bonus">Bonus ${pkg.bonus}%</div>
            <div class="package-price">Rp ${formatRupiah(pkg.price)}</div>
        `;
        grid.appendChild(card);
    });
}

// ==================== SEARCH AND FILTER FUNCTIONS ====================
function searchGames() {
    const searchTerm = document.getElementById('searchGame').value.toLowerCase();
    const filtered = products.filter(p => 
        p.game.toLowerCase().includes(searchTerm) || 
        p.item.toLowerCase().includes(searchTerm)
    );
    
    const grid = document.getElementById('gameGrid');
    grid.innerHTML = '';

    filtered.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.game}" onerror="this.src='https://via.placeholder.com/200?text=Game'">
            </div>
            <div class="product-info">
                <h3>${product.game}</h3>
                <p>${product.item}</p>
                <div class="product-price">Rp ${formatRupiah(product.price)}</div>
                <button class="btn-beli-product" onclick="selectProduct(${product.id})">Beli</button>
            </div>
        `;
        grid.appendChild(card);
    });
}

function filterGames() {
    const category = document.getElementById('gameCategory').value;
    const filtered = category === 'all' ? products : products.filter(p => p.category === category);
    
    const grid = document.getElementById('gameGrid');
    grid.innerHTML = '';

    filtered.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.game}" onerror="this.src='https://via.placeholder.com/200?text=Game'">
            </div>
            <div class="product-info">
                <h3>${product.game}</h3>
                <p>${product.item}</p>
                <div class="product-price">Rp ${formatRupiah(product.price)}</div>
                <button class="btn-beli-product" onclick="selectProduct(${product.id})">Beli</button>
            </div>
        `;
        grid.appendChild(card);
    });
}

function searchAkun() {
    const searchTerm = document.getElementById('searchAkun').value.toLowerCase();
    const filtered = akunGames.filter(a => 
        a.game.toLowerCase().includes(searchTerm) || 
        a.deskripsi.toLowerCase().includes(searchTerm)
    );
    
    const grid = document.getElementById('akunGrid');
    grid.innerHTML = '';

    filtered.forEach(akun => {
        if (akun.status === 'tersedia') {
            const card = document.createElement('div');
            card.className = 'product-card';
            const screenshot = akun.detail.screenshot && akun.detail.screenshot.length > 0 
                ? akun.detail.screenshot[0] 
                : 'https://via.placeholder.com/200?text=Akun';
            
            card.innerHTML = `
                <div class="product-image">
                    <img src="${screenshot}" alt="${akun.game}" onerror="this.src='https://via.placeholder.com/200?text=Akun'">
                </div>
                <div class="product-info">
                    <h3>${akun.game}</h3>
                    <p>${akun.deskripsi}</p>
                    <div class="product-price">Rp ${formatRupiah(akun.harga)}</div>
                    <button class="btn-beli-product" onclick="selectAkun(${akun.id})">Beli Akun</button>
                </div>
            `;
            grid.appendChild(card);
        }
    });
}

function filterAkun() {
    const category = document.getElementById('akunCategory').value;
    const filtered = category === 'all' ? akunGames : akunGames.filter(a => {
        if (category === 'mobile') return a.game === 'Mobile Legends';
        if (category === 'pubg') return a.game === 'PUBG Mobile';
        if (category === 'ff') return a.game === 'Free Fire';
        if (category === 'valorant') return a.game === 'Valorant';
        return true;
    });
    
    const grid = document.getElementById('akunGrid');
    grid.innerHTML = '';

    filtered.forEach(akun => {
        if (akun.status === 'tersedia') {
            const card = document.createElement('div');
            card.className = 'product-card';
            const screenshot = akun.detail.screenshot && akun.detail.screenshot.length > 0 
                ? akun.detail.screenshot[0] 
                : 'https://via.placeholder.com/200?text=Akun';
            
            card.innerHTML = `
                <div class="product-image">
                    <img src="${screenshot}" alt="${akun.game}" onerror="this.src='https://via.placeholder.com/200?text=Akun'">
                </div>
                <div class="product-info">
                    <h3>${akun.game}</h3>
                    <p>${akun.deskripsi}</p>
                    <div class="product-price">Rp ${formatRupiah(akun.harga)}</div>
                    <button class="btn-beli-product" onclick="selectAkun(${akun.id})">Beli Akun</button>
                </div>
            `;
            grid.appendChild(card);
        }
    });
}

// ==================== SALDO FUNCTIONS ====================
function selectSaldoPackage(id) {
    // Remove selected class from all cards
    document.querySelectorAll('.package-card').forEach(card => {
        card.classList.remove('selected');
    });
    
    // Add selected class to clicked card
    if (event && event.currentTarget) {
        event.currentTarget.classList.add('selected');
    }
    
    const pkg = saldoPackages.find(p => p.id === id);
    if (pkg) {
        document.getElementById('customSaldo').value = pkg.nominal;
        hitungBonusSaldo();
    }
}

function selectResellerPackage(id) {
    // Remove selected class from all cards
    document.querySelectorAll('.package-card').forEach(card => {
        card.classList.remove('selected');
    });
    
    // Add selected class to clicked card
    if (event && event.currentTarget) {
        event.currentTarget.classList.add('selected');
    }
    
    const pkg = resellerPackages.find(p => p.id === id);
    if (pkg) {
        // Set ke form transaksi
        document.getElementById('layananType').value = 'reseller';
        updateForm();
        setTimeout(() => {
            const select = document.getElementById('itemSelect');
            if (select) {
                for (let i = 0; i < select.options.length; i++) {
                    if (select.options[i].text.includes(pkg.name)) {
                        select.selectedIndex = i;
                        hitungTotal();
                        break;
                    }
                }
            }
        }, 100);
        document.getElementById('transaksi').scrollIntoView({ behavior: 'smooth' });
    }
}

function hitungBonusSaldo() {
    const nominal = parseFloat(document.getElementById('customSaldo').value);
    if (nominal < 50000) {
        showNotification('Minimal deposit Rp 50.000', 'warning');
        return;
    }
    
    let bonus = 0;
    if (nominal >= 1000000) bonus = 15;
    else if (nominal >= 500000) bonus = 10;
    else if (nominal >= 100000) bonus = 7;
    else if (nominal >= 50000) bonus = 5;
    
    const bonusAmount = nominal * bonus / 100;
    const total = nominal + bonusAmount;
    
    const bonusInfo = document.getElementById('bonusInfo');
    if (bonusInfo) {
        document.getElementById('bonusAmount').textContent = `Rp ${formatRupiah(bonusAmount)}`;
        document.getElementById('totalSaldo').textContent = `Rp ${formatRupiah(total)}`;
        bonusInfo.style.display = 'block';
    }
}

function prosesDepositSaldo() {
    if (!currentUser) {
        showNotification('Silakan login terlebih dahulu!', 'warning');
        showLoginModal();
        return;
    }
    
    const nominal = parseFloat(document.getElementById('customSaldo').value);
    if (nominal < 50000) {
        showNotification('Minimal deposit Rp 50.000', 'warning');
        return;
    }
    
    // Hitung bonus
    let bonus = 0;
    if (nominal >= 1000000) bonus = 15;
    else if (nominal >= 500000) bonus = 10;
    else if (nominal >= 100000) bonus = 7;
    else if (nominal >= 50000) bonus = 5;
    
    const bonusAmount = nominal * bonus / 100;
    const total = nominal + bonusAmount;
    
    // Buat transaksi deposit
    const transactionId = 'DEP-' + Date.now() + '-' + Math.random().toString(36).substr(2, 5).toUpperCase();
    
    const deposit = {
        id: depositHistory.length + 1,
        transactionId: transactionId,
        userId: currentUser.id,
        userName: currentUser.name,
        nominal: nominal,
        bonus: bonus,
        bonusAmount: bonusAmount,
        total: total,
        status: 'menunggu_konfirmasi',
        date: new Date().toISOString(),
        paymentMethod: 'transfer'
    };
    
    depositHistory.push(deposit);
    localStorage.setItem('depositHistory', JSON.stringify(depositHistory));
    
    // Arahkan ke form transaksi
    document.getElementById('layananType').value = 'isi_saldo';
    updateForm();
    
    // Pilih paket yang sesuai
    setTimeout(() => {
        const select = document.getElementById('itemSelect');
        if (select) {
            for (let i = 0; i < select.options.length; i++) {
                if (select.options[i].text.includes(formatRupiah(nominal))) {
                    select.selectedIndex = i;
                    break;
                }
            }
        }
        hitungTotal();
    }, 100);
    
    document.getElementById('transaksi').scrollIntoView({ behavior: 'smooth' });
    showNotification('Silakan lanjutkan transaksi di form', 'info');
}

// ==================== TRANSACTION FUNCTIONS ====================
function updateForm() {
    const type = document.getElementById('layananType').value;
    const itemSelect = document.getElementById('itemSelect');
    const userIdField = document.getElementById('userIdField');
    const serverField = document.getElementById('serverField');
    const jumlahField = document.getElementById('jumlahField');
    const akunDetailSection = document.getElementById('akunDetailSection');

    if (!itemSelect) return;
    
    itemSelect.innerHTML = '';
    
    if (akunDetailSection) {
        akunDetailSection.style.display = 'none';
    }

    if (type === 'topup') {
        if (userIdField) userIdField.style.display = 'block';
        if (serverField) serverField.style.display = 'block';
        if (jumlahField) jumlahField.style.display = 'block';
        if (document.getElementById('userId')) {
            document.getElementById('userId').placeholder = 'Masukkan User ID';
        }
        products.forEach(p => {
            const option = document.createElement('option');
            option.value = p.id;
            option.textContent = `${p.game} - ${p.item} (Rp ${formatRupiah(p.price)})`;
            option.dataset.price = p.price;
            option.dataset.resellerPrice = p.reseller_price;
            itemSelect.appendChild(option);
        });
    } else if (type === 'akun') {
        if (userIdField) userIdField.style.display = 'none';
        if (serverField) serverField.style.display = 'none';
        if (jumlahField) jumlahField.style.display = 'none';
        if (document.getElementById('jumlah')) {
            document.getElementById('jumlah').value = '1';
        }
        
        akunGames.forEach(a => {
            if (a.status === 'tersedia') {
                const option = document.createElement('option');
                option.value = a.id;
                option.textContent = `${a.game} - ${a.deskripsi} (Rp ${formatRupiah(a.harga)})`;
                option.dataset.price = a.harga;
                option.dataset.resellerPrice = a.harga_reseller;
                option.dataset.akun = JSON.stringify(a);
                itemSelect.appendChild(option);
            }
        });
        
        // Tampilkan preview saat memilih akun
        itemSelect.onchange = function() {
            const selected = itemSelect.options[itemSelect.selectedIndex];
            if (selected && selected.dataset.akun) {
                try {
                    const akun = JSON.parse(selected.dataset.akun);
                    tampilkanPreviewAkun(akun);
                } catch (e) {
                    console.error('Error parsing akun data', e);
                }
            }
        };
    } else if (type === 'isi_saldo') {
        if (userIdField) userIdField.style.display = 'none';
        if (serverField) serverField.style.display = 'none';
        if (jumlahField) jumlahField.style.display = 'none';
        if (document.getElementById('jumlah')) {
            document.getElementById('jumlah').value = '1';
        }
        saldoPackages.forEach(p => {
            const option = document.createElement('option');
            option.value = p.id;
            option.textContent = `${p.name} - Rp ${formatRupiah(p.nominal)} (Bonus ${p.bonus}%) - Bayar Rp ${formatRupiah(p.price)}`;
            option.dataset.price = p.price;
            option.dataset.nominal = p.nominal;
            option.dataset.bonus = p.bonus;
            itemSelect.appendChild(option);
        });
    } else if (type === 'reseller') {
        if (userIdField) userIdField.style.display = 'none';
        if (serverField) serverField.style.display = 'none';
        if (jumlahField) jumlahField.style.display = 'none';
        if (document.getElementById('jumlah')) {
            document.getElementById('jumlah').value = '1';
        }
        resellerPackages.forEach(p => {
            const option = document.createElement('option');
            option.value = p.id;
            option.textContent = `${p.name} - Rp ${formatRupiah(p.nominal)} (Bonus ${p.bonus}%) - Bayar Rp ${formatRupiah(p.price)}`;
            option.dataset.price = p.price;
            option.dataset.nominal = p.nominal;
            option.dataset.bonus = p.bonus;
            itemSelect.appendChild(option);
        });
    } else if (type === 'ewallet') {
        if (userIdField) userIdField.style.display = 'block';
        if (serverField) serverField.style.display = 'none';
        if (jumlahField) jumlahField.style.display = 'none';
        if (document.getElementById('userId')) {
            document.getElementById('userId').placeholder = 'Nomor HP';
        }
        ewallet.forEach(e => {
            const option = document.createElement('option');
            option.value = e.id;
            option.textContent = `${e.name} (Min: Rp ${formatRupiah(e.min)} - Max: Rp ${formatRupiah(e.max)})`;
            option.dataset.min = e.min;
            option.dataset.max = e.max;
            option.dataset.fee = e.fee;
            itemSelect.appendChild(option);
        });
    }

    updatePaymentMethods(type);
    hitungTotal();
}

function tampilkanPreviewAkun(akun) {
    const section = document.getElementById('akunDetailSection');
    const imagesDiv = document.getElementById('akunImages');
    const specsDiv = document.getElementById('akunSpecs');
    
    if (!section || !imagesDiv || !specsDiv) return;
    
    // Tampilkan gambar
    imagesDiv.innerHTML = '';
    if (akun.detail.screenshot && akun.detail.screenshot.length > 0) {
        akun.detail.screenshot.forEach(src => {
            const img = document.createElement('img');
            img.src = src;
            img.alt = 'Screenshot Akun';
            img.onclick = function() { zoomImage(src); };
            imagesDiv.appendChild(img);
        });
    }
    
    // Tampilkan spesifikasi
    specsDiv.innerHTML = `
        <p><i class="fas fa-user"></i> <strong>Nickname:</strong> ${akun.detail.nickname || '-'}</p>
        <p><i class="fas fa-trophy"></i> <strong>Level/Rank:</strong> ${akun.detail.level || akun.detail.tier || akun.detail.rank || '-'}</p>
        <p><i class="fas fa-tshirt"></i> <strong>Jumlah Skin:</strong> ${akun.detail.skin_count || 0}</p>
        ${akun.detail.hero_count ? `<p><i class="fas fa-users"></i> <strong>Hero:</strong> ${akun.detail.hero_count}</p>` : ''}
        ${akun.detail.uc ? `<p><i class="fas fa-diamond"></i> <strong>UC:</strong> ${akun.detail.uc}</p>` : ''}
        ${akun.detail.diamond ? `<p><i class="fas fa-gem"></i> <strong>Diamond:</strong> ${akun.detail.diamond}</p>` : ''}
    `;
    
    section.style.display = 'block';
}

function updatePaymentMethods(type) {
    const select = document.getElementById('paymentMethod');
    if (!select) return;
    
    select.innerHTML = '';
    
    // Tambah opsi e-wallet
    const optEwallet = document.createElement('option');
    optEwallet.value = 'ewallet';
    optEwallet.textContent = 'E-Wallet';
    select.appendChild(optEwallet);
    
    // Tambah opsi VA
    const optVA = document.createElement('option');
    optVA.value = 'va';
    optVA.textContent = 'Virtual Account';
    select.appendChild(optVA);
    
    // Tambah opsi QRIS
    const optQRIS = document.createElement('option');
    optQRIS.value = 'qris';
    optQRIS.textContent = 'QRIS';
    select.appendChild(optQRIS);
    
    // Tambah opsi saldo akun jika user punya saldo
    if (currentUser && currentUser.saldo_akun > 0) {
        const optSaldoAkun = document.createElement('option');
        optSaldoAkun.value = 'saldo_akun';
        optSaldoAkun.textContent = `Saldo Akun (Rp ${formatRupiah(currentUser.saldo_akun)})`;
        select.appendChild(optSaldoAkun);
    }
    
    // Tambah opsi saldo reseller jika user adalah reseller dan punya saldo
    if (currentUser && currentUser.isReseller && currentUser.saldo_reseller > 0) {
        const optSaldoReseller = document.createElement('option');
        optSaldoReseller.value = 'saldo_reseller';
        optSaldoReseller.textContent = `Saldo Reseller (Rp ${formatRupiah(currentUser.saldo_reseller)})`;
        select.appendChild(optSaldoReseller);
    }
}

function hitungTotal() {
    const type = document.getElementById('layananType').value;
    const itemSelect = document.getElementById('itemSelect');
    const jumlah = document.getElementById('jumlah') ? document.getElementById('jumlah').value : '1';
    const userId = document.getElementById('userId') ? document.getElementById('userId').value : '';
    
    if (!itemSelect || !itemSelect.options[itemSelect.selectedIndex]) return;
    
    const selectedOption = itemSelect.options[itemSelect.selectedIndex];
    let total = 0;

    if (type === 'topup' || type === 'akun') {
        // Cek apakah user reseller
        const price = currentUser && currentUser.isReseller && selectedOption.dataset.resellerPrice 
            ? parseFloat(selectedOption.dataset.resellerPrice) 
            : parseFloat(selectedOption.dataset.price) || 0;
        total = price * parseInt(jumlah);
    } else if (type === 'isi_saldo' || type === 'reseller') {
        total = parseFloat(selectedOption.dataset.price) || 0;
    } else if (type === 'ewallet') {
        const nominal = parseFloat(userId) || 0;
        const min = parseFloat(selectedOption.dataset.min) || 0;
        const max = parseFloat(selectedOption.dataset.max) || 0;
        const fee = parseFloat(selectedOption.dataset.fee) || 0;
        
        if (nominal < min) {
            showNotification(`Minimal Rp ${formatRupiah(min)}`, 'warning');
            total = 0;
        } else if (nominal > max) {
            showNotification(`Maksimal Rp ${formatRupiah(max)}`, 'warning');
            total = 0;
        } else {
            total = nominal + fee;
        }
    }

    const totalHarga = document.getElementById('totalHarga');
    if (totalHarga) {
        totalHarga.textContent = 'Rp ' + formatRupiah(total);
    }
    
    // Tampilkan sisa saldo
    if (currentUser) {
        const sisaSaldoAkun = document.getElementById('sisaSaldoAkun');
        const sisaSaldoReseller = document.getElementById('sisaSaldoReseller');
        
        if (sisaSaldoAkun) {
            sisaSaldoAkun.style.display = 'block';
            document.getElementById('sisaSaldoAkunValue').textContent = `Rp ${formatRupiah(currentUser.saldo_akun || 0)}`;
        }
        if (sisaSaldoReseller) {
            sisaSaldoReseller.style.display = 'block';
            document.getElementById('sisaSaldoResellerValue').textContent = `Rp ${formatRupiah(currentUser.saldo_reseller || 0)}`;
        }
    }
}

function prosesTransaksi() {
    if (!currentUser) {
        showNotification('Silakan login terlebih dahulu!', 'warning');
        showLoginModal();
        return;
    }

    const type = document.getElementById('layananType').value;
    const paymentMethod = document.getElementById('paymentMethod').value;
    const total = parseFloat(document.getElementById('totalHarga').textContent.replace('Rp ', '').replace(/\./g, ''));
    
    if (total <= 0) {
        showNotification('Total tidak valid!', 'error');
        return;
    }
    
    // Cek jika menggunakan saldo
    if (paymentMethod === 'saldo_akun') {
        if ((currentUser.saldo_akun || 0) < total) {
            showNotification('Saldo akun tidak mencukupi! Silakan isi saldo terlebih dahulu.', 'error');
            return;
        }
        
        // Kurangi saldo
        currentUser.saldo_akun -= total;
        const userIndex = users.findIndex(u => u.id === currentUser.id);
        users[userIndex].saldo_akun = currentUser.saldo_akun;
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        
        // Proses transaksi tanpa upload bukti
        prosesTransaksiSukses(type, total, paymentMethod, null);
        return;
    }
    
    if (paymentMethod === 'saldo_reseller') {
        if ((currentUser.saldo_reseller || 0) < total) {
            showNotification('Saldo reseller tidak mencukupi!', 'error');
            return;
        }
        
        currentUser.saldo_reseller -= total;
        const userIndex = users.findIndex(u => u.id === currentUser.id);
        users[userIndex].saldo_reseller = currentUser.saldo_reseller;
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        
        prosesTransaksiSukses(type, total, paymentMethod, null);
        return;
    }
    
    // Validasi upload bukti untuk metode non-saldo
    const buktiFile = document.getElementById('buktiFile');
    if (!buktiFile.files || buktiFile.files.length === 0) {
        showNotification('Silakan upload bukti pembayaran terlebih dahulu!', 'warning');
        document.getElementById('uploadArea').style.borderColor = '#dc3545';
        return;
    }
    
    // Upload bukti dan proses
    const file = buktiFile.files[0];
    const reader = new FileReader();
    
    reader.onload = function(e) {
        prosesTransaksiSukses(type, total, paymentMethod, {
            name: file.name,
            size: file.size,
            type: file.type,
            data: e.target.result
        });
    };
    
    reader.readAsDataURL(file);
}

function prosesTransaksiSukses(type, total, paymentMethod, buktiData) {
    const itemSelect = document.getElementById('itemSelect');
    const itemId = itemSelect.value;
    const jumlah = document.getElementById('jumlah').value;
    const userId = document.getElementById('userId').value;
    const server = document.getElementById('server').value;
    
    let itemDetail = '';
    let itemInfo = {};
    
    if (type === 'topup') {
        const product = products.find(p => p.id == itemId);
        itemDetail = `${product.game} - ${product.item}`;
        itemInfo = product;
    } else if (type === 'akun') {
        const akun = akunGames.find(a => a.id == itemId);
        itemDetail = `${akun.game} - ${akun.deskripsi}`;
        itemInfo = akun;
    } else if (type === 'isi_saldo') {
        const pkg = saldoPackages.find(p => p.id == itemId);
        itemDetail = `Deposit Saldo - ${pkg.name} (Rp ${formatRupiah(pkg.nominal)})`;
        itemInfo = pkg;
    } else if (type === 'reseller') {
        const pkg = resellerPackages.find(p => p.id == itemId);
        itemDetail = `Deposit Reseller - ${pkg.name} (Rp ${formatRupiah(pkg.nominal)})`;
        itemInfo = pkg;
    } else if (type === 'ewallet') {
        const wallet = ewallet.find(e => e.id == itemId);
        itemDetail = `${wallet.name} - Top Up Rp ${formatRupiah(userId)}`;
        itemInfo = wallet;
    }

    const transactionId = 'TRX-' + Date.now() + '-' + Math.random().toString(36).substr(2, 5).toUpperCase();
    const buktiId = 'BUKTI-' + Date.now() + '-' + Math.random().toString(36).substr(2, 8).toUpperCase();
    
    if (buktiData) {
        let allImages = JSON.parse(localStorage.getItem('bukti_pembayaran')) || {};
        allImages[buktiId] = {
            ...buktiData,
            buktiId: buktiId,
            transactionId: transactionId,
            uploadDate: new Date().toISOString(),
            userId: currentUser.id,
            userName: currentUser.name
        };
        localStorage.setItem('bukti_pembayaran', JSON.stringify(allImages));
    }
    
    const transaction = {
        id: transactions.length + 1,
        transactionId: transactionId,
        userId: currentUser.id,
        userName: currentUser.name,
        userEmail: currentUser.email,
        type: type,
        itemId: itemId,
        itemDetail: itemDetail,
        itemInfo: itemInfo,
        jumlah: jumlah,
        userId_input: userId,
        server: server,
        paymentMethod: paymentMethod,
        total: total,
        status: paymentMethod.includes('saldo') ? 'success' : 'menunggu_konfirmasi',
        date: new Date().toISOString(),
        buktiInfo: buktiData ? {
            buktiId: buktiId,
            name: buktiData.name,
            size: buktiData.size,
            type: buktiData.type,
            uploadDate: new Date().toISOString()
        } : null,
        notes: ''
    };

    transactions.push(transaction);
    localStorage.setItem('transactions', JSON.stringify(transactions));

    // If buying akun dengan saldo, langsung kirim data akun
    if (type === 'akun' && paymentMethod.includes('saldo')) {
        const akun = akunGames.find(a => a.id == itemId);
        if (akun) {
            kirimDataAkunKeBuyer(currentUser.id, transactionId, akun);
            akun.status = 'terjual';
            akun.terjual = (akun.terjual || 0) + 1;
            localStorage.setItem('akunGames', JSON.stringify(akunGames));
        }
    }

    // Kirim notifikasi ke admin jika perlu konfirmasi
    if (!paymentMethod.includes('saldo')) {
        sendNotificationToAdmin(transaction);
    }
    
    // Kirim notifikasi ke user
    sendUserNotification(currentUser.id, 
        paymentMethod.includes('saldo') 
            ? `✅ Transaksi ${transactionId} berhasil! ${type === 'akun' ? 'Cek menu "Akun Saya" untuk data akun.' : ''}`
            : `✅ Transaksi ${transactionId} berhasil dibuat. Admin akan segera mengkonfirmasi pembayaran Anda.`, 
        'success'
    );
    
    showNotification(paymentMethod.includes('saldo') 
        ? 'Transaksi berhasil!' 
        : 'Transaksi berhasil! Menunggu konfirmasi admin.', 
        'success'
    );
    
    resetForm();
}

function resetForm() {
    document.getElementById('userId').value = '';
    document.getElementById('server').value = '';
    document.getElementById('jumlah').value = '1';
    document.getElementById('buktiFile').value = '';
    document.getElementById('previewContainer').style.display = 'none';
    document.getElementById('uploadStatus').style.display = 'none';
    document.getElementById('previewImg').src = '#';
    document.getElementById('fileInfo').innerHTML = '';
    document.getElementById('uploadArea').style.borderColor = '#ccc';
}

// ==================== UPLOAD BUKTI FUNCTIONS ====================
function previewBukti(input) {
    const previewContainer = document.getElementById('previewContainer');
    const previewImg = document.getElementById('previewImg');
    const fileInfo = document.getElementById('fileInfo');
    const uploadStatus = document.getElementById('uploadStatus');
    const uploadArea = document.getElementById('uploadArea');
    
    if (input.files && input.files[0]) {
        const file = input.files[0];
        
        // Validasi ukuran file (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            showNotification('File terlalu besar! Maksimal 5MB', 'error');
            input.value = '';
            return;
        }
        
        // Validasi tipe file
        if (!file.type.match('image.*')) {
            showNotification('File harus berupa gambar!', 'error');
            input.value = '';
            return;
        }
        
        const reader = new FileReader();
        
        reader.onload = function(e) {
            if (previewImg) previewImg.src = e.target.result;
            if (previewContainer) previewContainer.style.display = 'block';
            
            if (fileInfo) {
                fileInfo.innerHTML = `
                    <i class="fas fa-check-circle" style="color: #28a745;"></i>
                    <strong>${file.name}</strong> - ${(file.size / 1024).toFixed(2)} KB
                `;
            }
            
            if (uploadStatus) uploadStatus.style.display = 'flex';
            if (uploadArea) uploadArea.style.borderColor = '#28a745';
        }
        
        reader.readAsDataURL(file);
    }
}

function removeBukti() {
    const buktiFile = document.getElementById('buktiFile');
    const previewContainer = document.getElementById('previewContainer');
    const uploadStatus = document.getElementById('uploadStatus');
    const previewImg = document.getElementById('previewImg');
    const fileInfo = document.getElementById('fileInfo');
    const uploadArea = document.getElementById('uploadArea');
    
    if (buktiFile) buktiFile.value = '';
    if (previewContainer) previewContainer.style.display = 'none';
    if (uploadStatus) uploadStatus.style.display = 'none';
    if (previewImg) previewImg.src = '#';
    if (fileInfo) fileInfo.innerHTML = '';
    if (uploadArea) uploadArea.style.borderColor = '#ccc';
}

// ==================== QRIS FUNCTIONS ====================
function toggleQRIS() {
    const paymentMethod = document.getElementById('paymentMethod');
    const qrisSection = document.getElementById('qrisSection');
    
    if (!paymentMethod || !qrisSection) return;
    
    if (paymentMethod.value === 'qris') {
        qrisSection.style.display = 'block';
    } else {
        qrisSection.style.display = 'none';
    }
}

function zoomQRIS() {
    const modal = document.getElementById('qrisZoomModal');
    if (modal) modal.style.display = 'block';
}

function closeQRISZoom() {
    const modal = document.getElementById('qrisZoomModal');
    if (modal) modal.style.display = 'none';
}

function copyQRIS() {
    const qrisUrl = 'https://cdn.phototourl.com/uploads/2026-02-14-fa0f1899-4605-43bb-947b-27c76ee1a1e6.jpg';
    
    // Create temporary input
    const tempInput = document.createElement('input');
    tempInput.value = qrisUrl;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
    
    showNotification('Link QRIS berhasil disalin!', 'success');
}

// ==================== SELECTION FUNCTIONS ====================
function selectProduct(id) {
    document.getElementById('layananType').value = 'topup';
    updateForm();
    setTimeout(() => {
        const select = document.getElementById('itemSelect');
        if (select) {
            select.value = id;
            hitungTotal();
        }
    }, 100);
    document.getElementById('transaksi').scrollIntoView({ behavior: 'smooth' });
}

function selectAkun(id) {
    document.getElementById('layananType').value = 'akun';
    updateForm();
    setTimeout(() => {
        const select = document.getElementById('itemSelect');
        if (select) {
            select.value = id;
            hitungTotal();
            
            // Trigger preview
            const selected = select.options[select.selectedIndex];
            if (selected && selected.dataset.akun) {
                try {
                    const akun = JSON.parse(selected.dataset.akun);
                    tampilkanPreviewAkun(akun);
                } catch (e) {
                    console.error('Error parsing akun data', e);
                }
            }
        }
    }, 100);
    document.getElementById('transaksi').scrollIntoView({ behavior: 'smooth' });
}

function selectPayment(type, item) {
    document.getElementById('layananType').value = type;
    updateForm();
    setTimeout(() => {
        const select = document.getElementById('itemSelect');
        if (select) {
            select.value = item.id;
            hitungTotal();
        }
    }, 100);
    document.getElementById('transaksi').scrollIntoView({ behavior: 'smooth' });
}

// ==================== NOTIFICATION FUNCTIONS ====================
function sendNotificationToAdmin(transaction) {
    const notification = {
        id: 'NOTIF-' + Date.now() + '-' + Math.random().toString(36).substr(2, 5),
        transactionId: transaction.transactionId,
        userId: transaction.userId,
        userName: transaction.userName,
        title: 'Pembayaran Baru Menunggu Konfirmasi',
        message: `Pembayaran dari ${transaction.userName} - Rp ${formatRupiah(transaction.total)} menunggu konfirmasi.`,
        type: 'payment',
        status: 'unread',
        date: new Date().toISOString(),
        transaction: transaction
    };
    
    adminNotifications.push(notification);
    localStorage.setItem('admin_notifications', JSON.stringify(adminNotifications));
    
    updateAdminNotificationBadge();
    
    // Tampilkan notifikasi popup jika admin sedang online
    if (currentUser && currentUser.role === 'admin') {
        showNotification(`Pembayaran baru dari ${transaction.userName}`, 'info');
    }
}

function sendUserNotification(userId, message, type = 'info') {
    const titles = {
        success: '✅ Berhasil',
        error: '❌ Gagal',
        warning: '⚠️ Peringatan',
        info: 'ℹ️ Informasi',
        payment: '💰 Pembayaran',
        transaction: '🛒 Transaksi',
        akun_delivered: '🎮 Data Akun'
    };
    
    const notification = {
        id: 'USER-NOTIF-' + Date.now() + '-' + Math.random().toString(36).substr(2, 5),
        userId: userId,
        title: titles[type] || 'Notifikasi',
        message: message,
        type: type,
        status: 'unread',
        date: new Date().toISOString()
    };
    
    userNotifications.push(notification);
    localStorage.setItem('user_notifications', JSON.stringify(userNotifications));
    
    updateUserNotificationBadge();
    showNotification(message, type);
}

function kirimDataAkunKeBuyer(userId, transactionId, akun) {
    // Format data akun untuk dikirim
    const dataAkun = {
        transactionId: transactionId,
        game: akun.game,
        deskripsi: akun.deskripsi,
        email: akun.detail.email,
        password: akun.detail.password,
        nickname: akun.detail.nickname,
        level: akun.detail.level || akun.detail.tier || akun.detail.rank,
        skin_count: akun.detail.skin_count,
        screenshot: akun.detail.screenshot,
        tanggal: new Date().toISOString()
    };
    
    // Simpan ke riwayat pembelian user
    pembelianAkun.push({
        userId: userId,
        ...dataAkun
    });
    localStorage.setItem('pembelian_akun', JSON.stringify(pembelianAkun));
    
    // Kirim notifikasi in-app dengan data akun
    const notifMessage = `🎮 Data Akun ${akun.game} untuk transaksi ${transactionId} sudah tersedia!\n\n` +
        `📋 Detail Akun:\n` +
        `Email: ${akun.detail.email}\n` +
        `Password: ${akun.detail.password}\n` +
        `Nickname: ${akun.detail.nickname}\n` +
        `Level: ${akun.detail.level || akun.detail.tier || akun.detail.rank}\n` +
        `Jumlah Skin: ${akun.detail.skin_count}\n\n` +
        `🔐 Simpan data ini baik-baik dan segera ganti password setelah login.`;
    
    sendUserNotification(userId, notifMessage, 'akun_delivered');
}

function updateAllBadges() {
    updateAdminNotificationBadge();
    updateUserNotificationBadge();
}

function updateAdminNotificationBadge() {
    const adminNotifBadge = document.getElementById('adminNotifBadge');
    if (!adminNotifBadge) return;
    
    const unreadCount = adminNotifications.filter(n => n.status === 'unread').length;
    
    if (unreadCount > 0) {
        adminNotifBadge.style.display = 'inline';
        adminNotifBadge.textContent = unreadCount;
    } else {
        adminNotifBadge.style.display = 'none';
    }
}

function updateUserNotificationBadge() {
    if (!currentUser) return;
    
    const notifBadge = document.getElementById('notifBadge');
    if (!notifBadge) return;
    
    const unreadCount = userNotifications.filter(n => n.userId === currentUser.id && n.status === 'unread').length;
    
    if (unreadCount > 0) {
        notifBadge.style.display = 'inline';
        notifBadge.textContent = unreadCount;
    } else {
        notifBadge.style.display = 'none';
    }
}

// ==================== PROFILE FUNCTIONS ====================
function showProfile() {
    if (!currentUser) {
        showNotification('Silakan login terlebih dahulu!', 'warning');
        showLoginModal();
        return;
    }
    
    const profileName = document.getElementById('profileName');
    const profileEmail = document.getElementById('profileEmail');
    const profileRole = document.getElementById('profileRole');
    const profileSaldoAkun = document.getElementById('profileSaldoAkun');
    const profileSaldoReseller = document.getElementById('profileSaldoReseller');
    const profileIsReseller = document.getElementById('profileIsReseller');
    const profileMemberSince = document.getElementById('profileMemberSince');
    
    if (profileName) profileName.textContent = currentUser.name;
    if (profileEmail) profileEmail.textContent = currentUser.email;
    if (profileRole) profileRole.textContent = currentUser.role;
    if (profileSaldoAkun) profileSaldoAkun.textContent = 'Rp ' + formatRupiah(currentUser.saldo_akun || 0);
    if (profileSaldoReseller) profileSaldoReseller.textContent = 'Rp ' + formatRupiah(currentUser.saldo_reseller || 0);
    if (profileIsReseller) profileIsReseller.textContent = currentUser.isReseller ? 'Ya' : 'Tidak';
    if (profileMemberSince) profileMemberSince.textContent = formatDate(currentUser.joinDate);
    
    const modal = document.getElementById('profileModal');
    if (modal) modal.style.display = 'block';
}

function closeProfileModal() {
    const modal = document.getElementById('profileModal');
    if (modal) modal.style.display = 'none';
}

// ==================== SALDO MODALS ====================
function showSaldoAkun() {
    if (!currentUser) {
        showNotification('Silakan login terlebih dahulu!', 'warning');
        showLoginModal();
        return;
    }
    
    const currentSaldo = document.getElementById('currentSaldoAkun');
    if (currentSaldo) {
        currentSaldo.textContent = `Rp ${formatRupiah(currentUser.saldo_akun || 0)}`;
    }
    
    // Load riwayat deposit
    const userDeposits = depositHistory.filter(d => d.userId === currentUser.id);
    const tbody = document.getElementById('saldoHistoryTable');
    
    if (tbody) {
        tbody.innerHTML = '';
        
        if (userDeposits.length === 0) {
            tbody.innerHTML = '<tr><td colspan="5" style="text-align: center;">Belum ada deposit</td></tr>';
        } else {
            userDeposits.forEach(d => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${formatDate(d.date)}</td>
                    <td>Rp ${formatRupiah(d.nominal)}</td>
                    <td>${d.bonus}% (Rp ${formatRupiah(d.bonusAmount)})</td>
                    <td>Rp ${formatRupiah(d.total)}</td>
                    <td><span class="status-${d.status}">${d.status}</span></td>
                `;
                tbody.appendChild(row);
            });
        }
    }
    
    const modal = document.getElementById('saldoAkunModal');
    if (modal) modal.style.display = 'block';
}

function closeSaldoAkunModal() {
    const modal = document.getElementById('saldoAkunModal');
    if (modal) modal.style.display = 'none';
}

function showSaldoReseller() {
    if (!currentUser) {
        showNotification('Silakan login terlebih dahulu!', 'warning');
        showLoginModal();
        return;
    }
    
    if (!currentUser.isReseller) {
        showNotification('Anda bukan reseller!', 'warning');
        return;
    }
    
    const currentSaldo = document.getElementById('currentSaldoReseller');
    if (currentSaldo) {
        currentSaldo.textContent = `Rp ${formatRupiah(currentUser.saldo_reseller || 0)}`;
    }
    
    const modal = document.getElementById('saldoResellerModal');
    if (modal) modal.style.display = 'block';
}

function closeSaldoResellerModal() {
    const modal = document.getElementById('saldoResellerModal');
    if (modal) modal.style.display = 'none';
}

// ==================== AKUN SAYA FUNCTIONS ====================
function showAkunSaya() {
    if (!currentUser) {
        showNotification('Silakan login terlebih dahulu!', 'warning');
        showLoginModal();
        return;
    }
    
    const userPurchases = pembelianAkun.filter(p => p.userId === currentUser.id);
    const grid = document.getElementById('akunSayaGrid');
    
    if (!grid) return;
    
    grid.innerHTML = '';
    
    if (userPurchases.length === 0) {
        grid.innerHTML = '<p class="no-data">Belum ada akun yang dibeli</p>';
    } else {
        userPurchases.forEach(akun => {
            const card = document.createElement('div');
            card.className = 'akun-saya-card';
            
            const images = akun.screenshot ? akun.screenshot.map(src => 
                `<img src="${src}" alt="Screenshot" onerror="this.src='https://via.placeholder.com/100?text=No+Image'">`
            ).join('') : '<p>Tidak ada screenshot</p>';
            
            card.innerHTML = `
                <div class="akun-saya-images">
                    ${images}
                </div>
                <div class="akun-saya-info">
                    <h3>${akun.game}</h3>
                    <p>${akun.deskripsi || ''}</p>
                    <div class="akun-saya-detail">
                        <p><i class="fas fa-envelope"></i> ${akun.email || '-'}</p>
                        <p><i class="fas fa-lock"></i> ${akun.password ? akun.password.replace(/./g, '*') : '-'}</p>
                        <p><i class="fas fa-user"></i> ${akun.nickname || '-'}</p>
                        <p><i class="fas fa-trophy"></i> ${akun.level || '-'}</p>
                    </div>
                    <button class="btn-lihat-akun" onclick="lihatDetailAkun('${akun.transactionId}')">
                        <i class="fas fa-eye"></i> Lihat Detail
                    </button>
                </div>
            `;
            grid.appendChild(card);
        });
    }
    
    const modal = document.getElementById('akunSayaModal');
    if (modal) modal.style.display = 'block';
}

function closeAkunSayaModal() {
    const modal = document.getElementById('akunSayaModal');
    if (modal) modal.style.display = 'none';
}

function lihatDetailAkun(transactionId) {
    const akun = pembelianAkun.find(a => a.transactionId === transactionId);
    if (!akun) return;
    
    const content = document.getElementById('detailAkunContent');
    if (!content) return;
    
    content.innerHTML = `
        <h3>${akun.game} - ${akun.deskripsi || ''}</h3>
        <p><i class="fas fa-envelope"></i> <strong>Email:</strong> ${akun.email || '-'}</p>
        <p><i class="fas fa-lock"></i> <strong>Password:</strong> ${akun.password || '-'}</p>
        <p><i class="fas fa-user"></i> <strong>Nickname:</strong> ${akun.nickname || '-'}</p>
        <p><i class="fas fa-trophy"></i> <strong>Level/Rank:</strong> ${akun.level || '-'}</p>
        <p><i class="fas fa-calendar"></i> <strong>Dibeli:</strong> ${formatDate(akun.tanggal)}</p>
    `;
    
    const modal = document.getElementById('detailAkunModal');
    if (modal) modal.style.display = 'block';
}

function closeDetailAkunModal() {
    const modal = document.getElementById('detailAkunModal');
    if (modal) modal.style.display = 'none';
}

function copyDataAkun() {
    const content = document.getElementById('detailAkunContent');
    if (!content) return;
    
    const text = content.innerText;
    navigator.clipboard.writeText(text).then(() => {
        showNotification('Data akun berhasil disalin!', 'success');
    }).catch(() => {
        showNotification('Gagal menyalin data', 'error');
    });
}

// ==================== HISTORY FUNCTIONS ====================
function showHistory() {
    if (!currentUser) {
        showNotification('Silakan login terlebih dahulu!', 'warning');
        showLoginModal();
        return;
    }
    
    const tbody = document.getElementById('historyTableBody');
    if (!tbody) return;
    
    tbody.innerHTML = '';

    const userTransactions = transactions.filter(t => t.userId === currentUser.id).sort((a, b) => new Date(b.date) - new Date(a.date));

    if (userTransactions.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" style="text-align: center;">Belum ada transaksi</td></tr>';
    } else {
        userTransactions.forEach(t => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${t.transactionId || t.id}</td>
                <td>${formatDate(t.date)}</td>
                <td>${t.itemDetail || '-'}</td>
                <td>${t.jumlah || 1}</td>
                <td>Rp ${formatRupiah(t.total)}</td>
                <td>${t.paymentMethod || '-'}</td>
                <td><span class="status-${t.status}">${t.status}</span></td>
            `;
            tbody.appendChild(row);
        });
    }

    const modal = document.getElementById('historyModal');
    if (modal) modal.style.display = 'block';
}

function closeHistoryModal() {
    const modal = document.getElementById('historyModal');
    if (modal) modal.style.display = 'none';
}

// ==================== NOTIFICATIONS MODAL ====================
function showNotifications() {
    if (!currentUser) {
        showNotification('Silakan login terlebih dahulu!', 'warning');
        return;
    }
    
    const list = document.getElementById('userNotificationsList');
    if (!list) return;
    
    const userNotifs = userNotifications.filter(n => n.userId === currentUser.id).sort((a, b) => new Date(b.date) - new Date(a.date));
    
    list.innerHTML = '';
    
    if (userNotifs.length === 0) {
        list.innerHTML = '<p class="no-notifications">Tidak ada notifikasi</p>';
    } else {
        userNotifs.forEach(notif => {
            const notifElement = document.createElement('div');
            notifElement.className = `notification-item ${notif.status}`;
            notifElement.innerHTML = `
                <div class="notification-title">${notif.title || 'Notifikasi'}</div>
                <div class="notification-message">${notif.message || ''}</div>
                <div class="notification-date">${formatDate(notif.date)}</div>
                <div class="notification-actions">
                    <button class="btn-edit" onclick="markNotificationAsRead('${notif.id}')">Tandai Dibaca</button>
                </div>
            `;
            list.appendChild(notifElement);
        });
    }
    
    const modal = document.getElementById('notificationsModal');
    if (modal) modal.style.display = 'block';
}

function closeNotificationsModal() {
    const modal = document.getElementById('notificationsModal');
    if (modal) modal.style.display = 'none';
}

function markNotificationAsRead(notificationId) {
    const notification = userNotifications.find(n => n.id === notificationId);
    if (notification) {
        notification.status = 'read';
        localStorage.setItem('user_notifications', JSON.stringify(userNotifications));
        updateUserNotificationBadge();
        showNotifications();
    }
}

// ==================== NOTIFICATION SETTINGS ====================
function openNotificationSettings() {
    const modal = document.getElementById('notificationSettingsModal');
    if (!modal) return;
    
    modal.style.display = 'block';
}

function closeNotificationSettings() {
    const modal = document.getElementById('notificationSettingsModal');
    if (modal) modal.style.display = 'none';
}

// ==================== ADMIN PANEL FUNCTIONS ====================
function showAdminPanel() {
    if (!currentUser || currentUser.role !== 'admin') {
        showNotification('Akses ditolak!', 'error');
        return;
    }
    
    loadAdminData();
    updateAdminStats();
    const modal = document.getElementById('adminModal');
    if (modal) {
        modal.style.display = 'block';
        console.log('Admin panel opened');
    }
}

function closeAdminModal() {
    const modal = document.getElementById('adminModal');
    if (modal) modal.style.display = 'none';
}

function updateAdminStats() {
    const totalUsers = document.getElementById('totalUsers');
    const totalTransactions = document.getElementById('totalTransactions');
    const pendingTransactions = document.getElementById('pendingTransactions');
    const totalResellers = document.getElementById('totalResellers');
    
    if (totalUsers) totalUsers.textContent = users.length;
    if (totalTransactions) totalTransactions.textContent = transactions.length;
    if (pendingTransactions) pendingTransactions.textContent = transactions.filter(t => t.status === 'menunggu_konfirmasi').length;
    if (totalResellers) totalResellers.textContent = users.filter(u => u.isReseller).length;
}

function switchAdminTab(tab) {
    // Update tab buttons
    document.querySelectorAll('.admin-tabs .tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    const activeBtn = document.querySelector(`.admin-tabs .tab-btn[onclick="switchAdminTab('${tab}')"]`);
    if (activeBtn) activeBtn.classList.add('active');
    
    // Update tab content
    document.querySelectorAll('.admin-tab').forEach(tabEl => {
        tabEl.classList.remove('active');
    });
    
    const activeTab = document.getElementById(`admin${tab.charAt(0).toUpperCase() + tab.slice(1)}`);
    if (activeTab) activeTab.classList.add('active');
    
    // Load data berdasarkan tab
    if (tab === 'products') loadProductsTable();
    if (tab === 'akun') loadAkunTable();
    if (tab === 'saldo') loadSaldoPackagesTable();
    if (tab === 'reseller') loadResellerPackagesTable();
    if (tab === 'users') loadUsersTable();
    if (tab === 'transactions') loadTransactionsTable();
    if (tab === 'notifications') loadAdminNotifications();
    if (tab === 'broadcast') loadBroadcastHistory();
}

function loadAdminData() {
    loadProductsTable();
    loadAkunTable();
    loadSaldoPackagesTable();
    loadResellerPackagesTable();
    loadUsersTable();
    loadTransactionsTable();
    loadAdminNotifications();
    loadBroadcastHistory();
}

// ==================== ADMIN - PRODUCTS TABLE ====================
function loadProductsTable() {
    const tbody = document.getElementById('productsTableBody');
    if (!tbody) return;
    
    tbody.innerHTML = '';

    products.forEach(p => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${p.id}</td>
            <td><img src="${p.image}" alt="${p.game}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 5px;"></td>
            <td>${p.game}</td>
            <td>${p.item}</td>
            <td>Rp ${formatRupiah(p.price)}</td>
            <td>Rp ${formatRupiah(p.reseller_price)}</td>
            <td>${p.category}</td>
            <td>${p.stock}</td>
            <td>
                <button class="btn-edit" onclick="editProduct(${p.id})">Edit</button>
                <button class="btn-delete" onclick="deleteProduct(${p.id})">Hapus</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function showAddProductForm() {
    document.getElementById('addProductModal').style.display = 'block';
}

function closeAddProductModal() {
    document.getElementById('addProductModal').style.display = 'none';
    document.getElementById('addProductForm').reset();
}

function saveProduct() {
    const game = document.getElementById('productGame').value;
    const item = document.getElementById('productItem').value;
    const price = document.getElementById('productPrice').value;
    const resellerPrice = document.getElementById('productResellerPrice').value;
    const category = document.getElementById('productCategory').value;
    const image = document.getElementById('productImage').value || 'https://via.placeholder.com/200?text=Game';
    const stock = document.getElementById('productStock') ? document.getElementById('productStock').value : 999;

    const newProduct = {
        id: products.length + 1,
        game: game,
        item: item,
        price: parseFloat(price),
        reseller_price: parseFloat(resellerPrice),
        category: category,
        image: image,
        stock: parseInt(stock)
    };

    products.push(newProduct);
    localStorage.setItem('products', JSON.stringify(products));
    
    closeAddProductModal();
    loadProductsTable();
    loadProducts();
    showNotification('Produk berhasil ditambahkan!', 'success');
}

function editProduct(id) {
    const product = products.find(p => p.id === id);
    if (!product) return;
    
    const newPrice = prompt('Edit harga untuk ' + product.game + ' - ' + product.item + ':', product.price);
    if (newPrice && !isNaN(newPrice)) {
        product.price = parseFloat(newPrice);
        localStorage.setItem('products', JSON.stringify(products));
        loadProductsTable();
        loadProducts();
        showNotification('Produk berhasil diupdate!', 'success');
    }
}

function deleteProduct(id) {
    if (confirm('Yakin ingin menghapus produk ini?')) {
        products = products.filter(p => p.id !== id);
        localStorage.setItem('products', JSON.stringify(products));
        loadProductsTable();
        loadProducts();
        showNotification('Produk berhasil dihapus!', 'success');
    }
}

// ==================== ADMIN - AKUN TABLE ====================
function loadAkunTable() {
    const tbody = document.getElementById('akunTableBody');
    if (!tbody) return;
    
    tbody.innerHTML = '';

    akunGames.forEach(a => {
        const row = document.createElement('tr');
        const screenshot = a.detail.screenshot && a.detail.screenshot.length > 0 
            ? a.detail.screenshot[0] 
            : 'https://via.placeholder.com/50?text=Akun';
        
        row.innerHTML = `
            <td>${a.id}</td>
            <td><img src="${screenshot}" alt="${a.game}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 5px;"></td>
            <td>${a.game}</td>
            <td>${a.deskripsi}</td>
            <td>Rp ${formatRupiah(a.harga)}</td>
            <td>Rp ${formatRupiah(a.harga_reseller)}</td>
            <td><span class="status-${a.status}">${a.status}</span></td>
            <td>${a.terjual || 0}</td>
            <td>
                <button class="btn-edit" onclick="editAkun(${a.id})">Edit</button>
                <button class="btn-delete" onclick="deleteAkun(${a.id})">Hapus</button>
                <button class="btn-konfirmasi" onclick="tampilkanDetailAkun(${a.id})">Detail</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function showAddAkunForm() {
    document.getElementById('addAkunModal').style.display = 'block';
}

function closeAddAkunModal() {
    document.getElementById('addAkunModal').style.display = 'none';
    document.getElementById('addAkunForm').reset();
}

function saveAkun() {
    const game = document.getElementById('akunGame').value;
    const deskripsi = document.getElementById('akunDeskripsi').value;
    const harga = document.getElementById('akunPrice').value;
    const hargaReseller = document.getElementById('akunResellerPrice').value;
    const email = document.getElementById('akunEmail').value;
    const password = document.getElementById('akunPassword').value;
    const nickname = document.getElementById('akunNickname').value;
    const level = document.getElementById('akunLevel').value;
    const skinCount = document.getElementById('akunSkinCount').value;
    const imagesText = document.getElementById('akunImages').value;
    
    const screenshot = imagesText.split(',').map(url => url.trim()).filter(url => url);

    const newAkun = {
        id: akunGames.length + 1,
        game: game,
        deskripsi: deskripsi,
        harga: parseFloat(harga),
        harga_reseller: parseFloat(hargaReseller),
        detail: {
            email: email,
            password: password,
            nickname: nickname,
            level: level,
            skin_count: parseInt(skinCount),
            screenshot: screenshot.length > 0 ? screenshot : ['https://via.placeholder.com/400?text=Akun']
        },
        status: 'tersedia',
        terjual: 0
    };

    akunGames.push(newAkun);
    localStorage.setItem('akunGames', JSON.stringify(akunGames));
    
    closeAddAkunModal();
    loadAkunTable();
    loadAkun();
    showNotification('Akun berhasil ditambahkan!', 'success');
}

function editAkun(id) {
    const akun = akunGames.find(a => a.id === id);
    if (!akun) return;
    
    const newHarga = prompt('Edit harga untuk ' + akun.game + ' - ' + akun.deskripsi + ':', akun.harga);
    if (newHarga && !isNaN(newHarga)) {
        akun.harga = parseFloat(newHarga);
        localStorage.setItem('akunGames', JSON.stringify(akunGames));
        loadAkunTable();
        loadAkun();
        showNotification('Akun berhasil diupdate!', 'success');
    }
}

function deleteAkun(id) {
    if (confirm('Yakin ingin menghapus akun ini?')) {
        akunGames = akunGames.filter(a => a.id !== id);
        localStorage.setItem('akunGames', JSON.stringify(akunGames));
        loadAkunTable();
        loadAkun();
        showNotification('Akun berhasil dihapus!', 'success');
    }
}

function tampilkanDetailAkun(id) {
    const akun = akunGames.find(a => a.id === id);
    if (!akun) return;
    
    alert(`Detail Akun:\n\nEmail: ${akun.detail.email}\nPassword: ${akun.detail.password}\nNickname: ${akun.detail.nickname}\nLevel: ${akun.detail.level}\nSkin: ${akun.detail.skin_count}`);
}

// ==================== ADMIN - SALDO PACKAGES TABLE ====================
function loadSaldoPackagesTable() {
    const tbody = document.getElementById('saldoPackagesTableBody');
    if (!tbody) return;
    
    tbody.innerHTML = '';

    saldoPackages.forEach(p => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${p.id}</td>
            <td>${p.name}</td>
            <td>Rp ${formatRupiah(p.nominal)}</td>
            <td>${p.bonus}%</td>
            <td>Rp ${formatRupiah(p.price)}</td>
            <td>
                <button class="btn-edit" onclick="editSaldoPackage(${p.id})">Edit</button>
                <button class="btn-delete" onclick="deleteSaldoPackage(${p.id})">Hapus</button>
            </td>
        `;
        tbody.appendChild(row);
    });
    
    // Load deposit history
    loadDepositHistory();
}

function loadDepositHistory() {
    const tbody = document.getElementById('depositHistoryTable');
    if (!tbody) return;
    
    tbody.innerHTML = '';

    depositHistory.sort((a, b) => new Date(b.date) - new Date(a.date)).forEach(d => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${d.transactionId || d.id}</td>
            <td>${d.userName}</td>
            <td>Rp ${formatRupiah(d.nominal)}</td>
            <td>${d.bonus}% (Rp ${formatRupiah(d.bonusAmount)})</td>
            <td>Rp ${formatRupiah(d.total)}</td>
            <td><span class="status-${d.status}">${d.status}</span></td>
            <td>${formatDate(d.date)}</td>
            <td>
                ${d.status === 'menunggu_konfirmasi' ? `
                    <button class="btn-konfirmasi" onclick="konfirmasiDeposit('${d.transactionId}')">Konfirmasi</button>
                    <button class="btn-tolak" onclick="tolakDeposit('${d.transactionId}')">Tolak</button>
                ` : '-'}
            </td>
        `;
        tbody.appendChild(row);
    });
}

function showAddSaldoPackageForm() {
    document.getElementById('addSaldoPackageModal').style.display = 'block';
}

function closeAddSaldoPackageModal() {
    document.getElementById('addSaldoPackageModal').style.display = 'none';
    document.getElementById('addSaldoPackageForm').reset();
}

function saveSaldoPackage() {
    const name = document.getElementById('saldoPackageName').value;
    const nominal = document.getElementById('saldoPackageNominal').value;
    const bonus = document.getElementById('saldoPackageBonus').value;
    const price = document.getElementById('saldoPackagePrice').value;

    const newPackage = {
        id: saldoPackages.length + 1,
        name: name,
        nominal: parseFloat(nominal),
        bonus: parseFloat(bonus),
        price: parseFloat(price)
    };

    saldoPackages.push(newPackage);
    localStorage.setItem('saldoPackages', JSON.stringify(saldoPackages));
    
    closeAddSaldoPackageModal();
    loadSaldoPackagesTable();
    loadSaldoPackages();
    showNotification('Paket deposit berhasil ditambahkan!', 'success');
}

function editSaldoPackage(id) {
    const pkg = saldoPackages.find(p => p.id === id);
    if (!pkg) return;
    
    const newPrice = prompt('Edit harga untuk ' + pkg.name + ':', pkg.price);
    if (newPrice && !isNaN(newPrice)) {
        pkg.price = parseFloat(newPrice);
        localStorage.setItem('saldoPackages', JSON.stringify(saldoPackages));
        loadSaldoPackagesTable();
        loadSaldoPackages();
        showNotification('Paket berhasil diupdate!', 'success');
    }
}

function deleteSaldoPackage(id) {
    if (confirm('Yakin ingin menghapus paket ini?')) {
        saldoPackages = saldoPackages.filter(p => p.id !== id);
        localStorage.setItem('saldoPackages', JSON.stringify(saldoPackages));
        loadSaldoPackagesTable();
        loadSaldoPackages();
        showNotification('Paket berhasil dihapus!', 'success');
    }
}

function konfirmasiDeposit(transactionId) {
    const deposit = depositHistory.find(d => d.transactionId === transactionId);
    if (!deposit) return;
    
    if (confirm('Konfirmasi deposit ini?')) {
        deposit.status = 'success';
        
        // Tambah saldo ke user
        const userIndex = users.findIndex(u => u.id === deposit.userId);
        if (userIndex !== -1) {
            users[userIndex].saldo_akun = (users[userIndex].saldo_akun || 0) + deposit.total;
            localStorage.setItem('users', JSON.stringify(users));
            
            // Kirim notifikasi
            sendUserNotification(deposit.userId, 
                `💰 Deposit Rp ${formatRupiah(deposit.total)} telah dikonfirmasi! Saldo akun Anda bertambah.`, 
                'success'
            );
        }
        
        localStorage.setItem('depositHistory', JSON.stringify(depositHistory));
        loadDepositHistory();
        showNotification('Deposit dikonfirmasi!', 'success');
    }
}

function tolakDeposit(transactionId) {
    const deposit = depositHistory.find(d => d.transactionId === transactionId);
    if (!deposit) return;
    
    const alasan = prompt('Alasan penolakan:');
    if (alasan) {
        deposit.status = 'failed';
        deposit.notes = alasan;
        localStorage.setItem('depositHistory', JSON.stringify(depositHistory));
        
        sendUserNotification(deposit.userId, 
            `❌ Deposit Rp ${formatRupiah(deposit.total)} ditolak. Alasan: ${alasan}`, 
            'error'
        );
        
        loadDepositHistory();
        showNotification('Deposit ditolak!', 'info');
    }
}

// ==================== ADMIN - RESELLER PACKAGES TABLE ====================
function loadResellerPackagesTable() {
    const tbody = document.getElementById('resellerPackagesTableBody');
    if (!tbody) return;
    
    tbody.innerHTML = '';

    resellerPackages.forEach(p => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${p.id}</td>
            <td>${p.name}</td>
            <td>Rp ${formatRupiah(p.nominal)}</td>
            <td>${p.bonus}%</td>
            <td>Rp ${formatRupiah(p.price)}</td>
            <td>
                <button class="btn-edit" onclick="editResellerPackage(${p.id})">Edit</button>
                <button class="btn-delete" onclick="deleteResellerPackage(${p.id})">Hapus</button>
            </td>
        `;
        tbody.appendChild(row);
    });
    
    // Load reseller list
    loadResellerList();
}

function loadResellerList() {
    const tbody = document.getElementById('resellerListTableBody');
    if (!tbody) return;
    
    tbody.innerHTML = '';

    const resellers = users.filter(u => u.isReseller);
    
    resellers.forEach(r => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${r.id}</td>
            <td>${r.name}</td>
            <td>${r.email}</td>
            <td>Rp ${formatRupiah(r.saldo_reseller || 0)}</td>
            <td>Rp ${formatRupiah(r.total_deposit || 0)}</td>
            <td>${r.komisi || 0}%</td>
            <td>
                <button class="btn-edit" onclick="editReseller(${r.id})">Edit</button>
                <button class="btn-konfirmasi" onclick="tambahSaldoReseller(${r.id})">Tambah Saldo</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function showAddResellerPackageForm() {
    document.getElementById('addResellerPackageModal').style.display = 'block';
}

function closeAddResellerPackageModal() {
    document.getElementById('addResellerPackageModal').style.display = 'none';
    document.getElementById('addResellerPackageForm').reset();
}

function saveResellerPackage() {
    const name = document.getElementById('resellerPackageName').value;
    const nominal = document.getElementById('resellerPackageNominal').value;
    const bonus = document.getElementById('resellerPackageBonus').value;
    const price = document.getElementById('resellerPackagePrice').value;

    const newPackage = {
        id: resellerPackages.length + 1,
        name: name,
        nominal: parseFloat(nominal),
        bonus: parseFloat(bonus),
        price: parseFloat(price)
    };

    resellerPackages.push(newPackage);
    localStorage.setItem('resellerPackages', JSON.stringify(resellerPackages));
    
    closeAddResellerPackageModal();
    loadResellerPackagesTable();
    loadResellerPackages();
    showNotification('Paket reseller berhasil ditambahkan!', 'success');
}

function editResellerPackage(id) {
    const pkg = resellerPackages.find(p => p.id === id);
    if (!pkg) return;
    
    const newPrice = prompt('Edit harga untuk ' + pkg.name + ':', pkg.price);
    if (newPrice && !isNaN(newPrice)) {
        pkg.price = parseFloat(newPrice);
        localStorage.setItem('resellerPackages', JSON.stringify(resellerPackages));
        loadResellerPackagesTable();
        loadResellerPackages();
        showNotification('Paket berhasil diupdate!', 'success');
    }
}

function deleteResellerPackage(id) {
    if (confirm('Yakin ingin menghapus paket ini?')) {
        resellerPackages = resellerPackages.filter(p => p.id !== id);
        localStorage.setItem('resellerPackages', JSON.stringify(resellerPackages));
        loadResellerPackagesTable();
        loadResellerPackages();
        showNotification('Paket berhasil dihapus!', 'success');
    }
}

function editReseller(id) {
    const reseller = users.find(u => u.id === id);
    if (!reseller) return;
    
    const newKomisi = prompt('Edit komisi untuk ' + reseller.name + ' (%):', reseller.komisi);
    if (newKomisi && !isNaN(newKomisi)) {
        reseller.komisi = parseFloat(newKomisi);
        localStorage.setItem('users', JSON.stringify(users));
        loadResellerList();
        showNotification('Komisi reseller berhasil diupdate!', 'success');
    }
}

function tambahSaldoReseller(id) {
    const reseller = users.find(u => u.id === id);
    if (!reseller) return;
    
    const jumlah = prompt('Masukkan jumlah saldo yang ditambahkan untuk ' + reseller.name + ':');
    if (jumlah && !isNaN(jumlah)) {
        reseller.saldo_reseller = (reseller.saldo_reseller || 0) + parseFloat(jumlah);
        reseller.total_deposit = (reseller.total_deposit || 0) + parseFloat(jumlah);
        localStorage.setItem('users', JSON.stringify(users));
        
        sendUserNotification(id, 
            `💰 Saldo reseller Anda bertambah Rp ${formatRupiah(jumlah)} oleh admin.`, 
            'success'
        );
        
        loadResellerList();
        showNotification('Saldo reseller berhasil ditambahkan!', 'success');
    }
}

// ==================== ADMIN - USERS TABLE ====================
function loadUsersTable() {
    const tbody = document.getElementById('usersTableBody');
    if (!tbody) return;
    
    tbody.innerHTML = '';

    users.forEach(u => {
        const row = document.createElement('tr');
        const tokenStatus = u.fcmToken ? 'active' : 'inactive';
        const tokenDisplay = u.fcmToken ? 
            `<span class="fcm-token active" title="${u.fcmToken}">✅ Aktif</span>` : 
            `<span class="fcm-token inactive">❌ Tidak Aktif</span>`;
        
        row.innerHTML = `
            <td>${u.id}</td>
            <td>${u.name}</td>
            <td>${u.email}</td>
            <td>${u.role}</td>
            <td>Rp ${formatRupiah(u.saldo_akun || 0)}</td>
            <td>Rp ${formatRupiah(u.saldo_reseller || 0)}</td>
            <td>${u.isReseller ? 'Ya' : 'Tidak'}</td>
            <td><span class="status-${u.status}">${u.status}</span></td>
            <td>${tokenDisplay}</td>
            <td>
                <button class="btn-edit" onclick="editUser(${u.id})">Edit</button>
                <button class="btn-delete" onclick="deleteUser(${u.id})">Hapus</button>
                <button class="btn-konfirmasi" onclick="topupSaldoUser(${u.id})">Top Up Saldo</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function editUser(id) {
    const user = users.find(u => u.id === id);
    if (!user) return;
    
    const newRole = prompt('Edit role (user/admin):', user.role);
    if (newRole && ['user', 'admin'].includes(newRole)) {
        user.role = newRole;
        localStorage.setItem('users', JSON.stringify(users));
        loadUsersTable();
        showNotification('User berhasil diupdate!', 'success');
    }
}

function deleteUser(id) {
    if (id === 1) {
        showNotification('Tidak dapat menghapus admin utama!', 'error');
        return;
    }
    
    if (confirm('Yakin ingin menghapus user ini?')) {
        users = users.filter(u => u.id !== id);
        localStorage.setItem('users', JSON.stringify(users));
        loadUsersTable();
        showNotification('User berhasil dihapus!', 'success');
    }
}

function topupSaldoUser(id) {
    const user = users.find(u => u.id === id);
    if (!user) return;
    
    const jumlah = prompt('Masukkan jumlah saldo yang ditambahkan untuk ' + user.name + ':');
    if (jumlah && !isNaN(jumlah)) {
        user.saldo_akun = (user.saldo_akun || 0) + parseFloat(jumlah);
        localStorage.setItem('users', JSON.stringify(users));
        
        sendUserNotification(id, 
            `💰 Saldo akun Anda bertambah Rp ${formatRupiah(jumlah)} oleh admin.`, 
            'success'
        );
        
        loadUsersTable();
        showNotification('Saldo user berhasil ditambahkan!', 'success');
    }
}

// ==================== ADMIN - TRANSACTIONS TABLE ====================
function loadTransactionsTable() {
    const tbody = document.getElementById('transactionsTableBody');
    if (!tbody) return;
    
    tbody.innerHTML = '';

    transactions.sort((a, b) => new Date(b.date) - new Date(a.date)).forEach(t => {
        const row = document.createElement('tr');
        const statusClass = t.status === 'menunggu_konfirmasi' ? 'status-menunggu_konfirmasi' : 
                           t.status === 'success' ? 'status-success' : 
                           t.status === 'failed' ? 'status-failed' : 'status-pending';
        
        // Buat thumbnail jika ada bukti
        let buktiDisplay = '-';
        if (t.buktiInfo) {
            const allImages = JSON.parse(localStorage.getItem('bukti_pembayaran')) || {};
            const imageData = allImages[t.buktiInfo.buktiId];
            
            if (imageData) {
                buktiDisplay = `<img src="${imageData.data}" class="bukti-thumbnail" onclick="viewBuktiDetail('${t.transactionId}')" title="Klik untuk lihat detail">`;
            } else {
                buktiDisplay = '<span class="no-bukti">File tidak ditemukan</span>';
            }
        }
        
        row.innerHTML = `
            <td>${t.transactionId}</td>
            <td>
                <strong>${t.userName}</strong><br>
                <small>${t.userEmail}</small>
            </td>
            <td>${t.itemDetail}</td>
            <td>Rp ${formatRupiah(t.total)}</td>
            <td>${t.paymentMethod}</td>
            <td class="bukti-cell">${buktiDisplay}</td>
            <td><span class="${statusClass}">${t.status}</span></td>
            <td>${formatDate(t.date)}</td>
            <td>
                ${t.status === 'menunggu_konfirmasi' ? `
                    <button class="btn-konfirmasi" onclick="viewBuktiDetail('${t.transactionId}')">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="btn-konfirmasi" onclick="konfirmasiTransaksi('${t.transactionId}')">
                        <i class="fas fa-check"></i>
                    </button>
                    <button class="btn-tolak" onclick="tolakTransaksi('${t.transactionId}')">
                        <i class="fas fa-times"></i>
                    </button>
                ` : `
                    <button class="btn-edit" onclick="viewBuktiDetail('${t.transactionId}')">
                        <i class="fas fa-eye"></i>
                    </button>
                `}
            </td>
        `;
        tbody.appendChild(row);
    });
}

function viewBuktiDetail(transactionId) {
    const transaction = transactions.find(t => t.transactionId === transactionId);
    if (!transaction) return;
    
    currentPreviewTransaction = transaction;
    
    // Ambil gambar dari localStorage
    const allImages = JSON.parse(localStorage.getItem('bukti_pembayaran')) || {};
    const imageData = transaction.buktiInfo ? allImages[transaction.buktiInfo.buktiId] : null;
    
    // Tampilkan gambar jika ada
    const detailImage = document.getElementById('detailBuktiImage');
    if (detailImage) {
        detailImage.src = imageData ? imageData.data : 'https://via.placeholder.com/400x300?text=Tidak+Ada+Bukti';
    }
    
    // Tampilkan info transaksi
    const detailInfo = document.getElementById('detailTransaksi');
    if (detailInfo) {
        detailInfo.innerHTML = `
            <p><i class="fas fa-hashtag"></i> <strong>ID:</strong> ${transaction.transactionId}</p>
            <p><i class="fas fa-user"></i> <strong>User:</strong> ${transaction.userName} (${transaction.userEmail})</p>
            <p><i class="fas fa-shopping-cart"></i> <strong>Item:</strong> ${transaction.itemDetail}</p>
            <p><i class="fas fa-money-bill"></i> <strong>Total:</strong> Rp ${formatRupiah(transaction.total)}</p>
            <p><i class="fas fa-credit-card"></i> <strong>Metode:</strong> ${transaction.paymentMethod}</p>
            <p><i class="fas fa-calendar"></i> <strong>Tanggal:</strong> ${formatDate(transaction.date)}</p>
            ${transaction.buktiInfo ? `
                <p><i class="fas fa-image"></i> <strong>File:</strong> ${transaction.buktiInfo.name} (${(transaction.buktiInfo.size / 1024).toFixed(2)} KB)</p>
                <p><i class="fas fa-clock"></i> <strong>Upload:</strong> ${formatDate(transaction.buktiInfo.uploadDate)}</p>
            ` : ''}
        `;
    }
    
    // Tampilkan/sembunyikan tombol aksi
    const btnKonfirmasi = document.getElementById('btnKonfirmasi');
    const btnTolak = document.getElementById('btnTolak');
    const catatanSection = document.getElementById('catatanSection');
    
    if (transaction.status === 'menunggu_konfirmasi') {
        if (catatanSection) catatanSection.style.display = 'none';
        if (btnKonfirmasi) {
            btnKonfirmasi.style.display = 'flex';
            btnKonfirmasi.onclick = function() { konfirmasiTransaksi(transactionId); };
        }
        if (btnTolak) {
            btnTolak.style.display = 'flex';
            btnTolak.onclick = function() { tolakTransaksi(transactionId); };
        }
    } else {
        if (catatanSection) catatanSection.style.display = 'none';
        if (btnKonfirmasi) btnKonfirmasi.style.display = 'none';
        if (btnTolak) btnTolak.style.display = 'none';
    }
    
    const modal = document.getElementById('previewBuktiModal');
    if (modal) modal.style.display = 'block';
}

function closePreviewBuktiModal() {
    const modal = document.getElementById('previewBuktiModal');
    if (modal) modal.style.display = 'none';
    currentPreviewTransaction = null;
}

function konfirmasiTransaksi(transactionId) {
    const transaction = transactions.find(t => t.transactionId === transactionId);
    if (!transaction) return;
    
    if (confirm('Konfirmasi pembayaran ini? Status akan diubah menjadi SUCCESS')) {
        transaction.status = 'success';
        
        // Jika transaksi adalah isi saldo, tambahkan saldo akun
        if (transaction.type === 'isi_saldo') {
            const userIndex = users.findIndex(u => u.id === transaction.userId);
            if (userIndex !== -1) {
                users[userIndex].saldo_akun = (users[userIndex].saldo_akun || 0) + transaction.total;
                localStorage.setItem('users', JSON.stringify(users));
                
                // Update currentUser jika sedang login
                if (currentUser && currentUser.id === transaction.userId) {
                    currentUser.saldo_akun = users[userIndex].saldo_akun;
                    localStorage.setItem('currentUser', JSON.stringify(currentUser));
                }
            }
        }
        
        // Jika transaksi adalah top up reseller, tambahkan saldo reseller
        if (transaction.type === 'reseller') {
            const userIndex = users.findIndex(u => u.id === transaction.userId);
            if (userIndex !== -1) {
                users[userIndex].saldo_reseller = (users[userIndex].saldo_reseller || 0) + transaction.total;
                users[userIndex].total_deposit = (users[userIndex].total_deposit || 0) + transaction.total;
                localStorage.setItem('users', JSON.stringify(users));
                
                if (currentUser && currentUser.id === transaction.userId) {
                    currentUser.saldo_reseller = users[userIndex].saldo_reseller;
                    localStorage.setItem('currentUser', JSON.stringify(currentUser));
                }
            }
        }
        
        // Jika transaksi adalah pembelian akun, kirim data akun ke buyer
        if (transaction.type === 'akun') {
            const akun = akunGames.find(a => a.id == transaction.itemId);
            if (akun) {
                kirimDataAkunKeBuyer(transaction.userId, transaction.transactionId, akun);
                akun.status = 'terjual';
                akun.terjual = (akun.terjual || 0) + 1;
                localStorage.setItem('akunGames', JSON.stringify(akunGames));
            }
        }
        
        localStorage.setItem('transactions', JSON.stringify(transactions));
        
        // Kirim notifikasi ke user
        sendUserNotification(transaction.userId, 
            `✅ Pembayaran untuk transaksi ${transaction.transactionId} telah DIKONFIRMASI! Terima kasih.`, 
            'success'
        );
        
        closePreviewBuktiModal();
        loadTransactionsTable();
        showNotification('Pembayaran berhasil dikonfirmasi!', 'success');
    }
}

function tolakTransaksi(transactionId) {
    const transaction = transactions.find(t => t.transactionId === transactionId);
    if (!transaction) return;
    
    const alasan = prompt('Alasan penolakan:');
    if (alasan) {
        transaction.status = 'failed';
        transaction.notes = alasan;
        localStorage.setItem('transactions', JSON.stringify(transactions));
        
        sendUserNotification(transaction.userId, 
            `❌ Pembayaran untuk transaksi ${transaction.transactionId} DITOLAK. Alasan: ${alasan}`, 
            'error'
        );
        
        closePreviewBuktiModal();
        loadTransactionsTable();
        showNotification('Pembayaran ditolak!', 'info');
    }
}

// ==================== ADMIN - NOTIFICATIONS ====================
function loadAdminNotifications() {
    const list = document.getElementById('adminNotificationsList');
    if (!list) return;
    
    adminNotifications.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    list.innerHTML = '';
    
    if (adminNotifications.length === 0) {
        list.innerHTML = '<p class="no-notifications">Tidak ada notifikasi</p>';
    } else {
        adminNotifications.forEach(notif => {
            const notifElement = document.createElement('div');
            notifElement.className = `notification-item ${notif.status}`;
            notifElement.innerHTML = `
                <div class="notification-title">${notif.title}</div>
                <div class="notification-message">${notif.message}</div>
                <div class="notification-date">${formatDate(notif.date)}</div>
                <div class="notification-actions">
                    <button class="btn-edit" onclick="markAdminNotificationAsRead('${notif.id}')">Tandai Dibaca</button>
                    <button class="btn-edit" onclick="viewBuktiDetail('${notif.transactionId}')">Lihat Transaksi</button>
                </div>
            `;
            list.appendChild(notifElement);
        });
    }
}

function markAdminNotificationAsRead(notificationId) {
    const notification = adminNotifications.find(n => n.id === notificationId);
    if (notification) {
        notification.status = 'read';
        localStorage.setItem('admin_notifications', JSON.stringify(adminNotifications));
        updateAdminNotificationBadge();
        loadAdminNotifications();
    }
}

// ==================== ADMIN - BROADCAST ====================
function loadBroadcastHistory() {
    const tbody = document.getElementById('broadcastHistory');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    broadcastHistory.sort((a, b) => new Date(b.date) - new Date(a.date)).forEach(b => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${formatDate(b.date)}</td>
            <td>${b.title}</td>
            <td>${b.message.substring(0, 30)}${b.message.length > 30 ? '...' : ''}</td>
            <td>${b.target}</td>
            <td><span class="status-success">${b.sentCount} terkirim</span></td>
        `;
        tbody.appendChild(row);
    });
}

function sendBroadcast() {
    const title = document.getElementById('broadcastTitle').value;
    const message = document.getElementById('broadcastMessage').value;
    const link = document.getElementById('broadcastLink').value || window.location.href;
    const target = document.getElementById('broadcastTarget').value;
    
    if (!title || !message) {
        showNotification('Judul dan pesan harus diisi!', 'warning');
        return;
    }
    
    // Filter users berdasarkan target
    let targetUsers = users;
    if (target === 'reseller') {
        targetUsers = users.filter(u => u.isReseller);
    } else if (target === 'admin') {
        targetUsers = users.filter(u => u.role === 'admin');
    }
    
    showNotification(`Broadcast dikirim ke ${targetUsers.length} user`, 'success');
    
    // Simpan ke history
    const broadcast = {
        id: 'BC-' + Date.now(),
        title: title,
        message: message,
        target: target,
        link: link,
        sentCount: targetUsers.length,
        failedCount: 0,
        date: new Date().toISOString()
    };
    
    broadcastHistory.push(broadcast);
    localStorage.setItem('broadcast_history', JSON.stringify(broadcastHistory));
    
    // Kirim notifikasi ke semua user target
    targetUsers.forEach(user => {
        sendUserNotification(user.id, `${title}\n\n${message}`, 'info');
    });
    
    showNotification(`Broadcast selesai! ${targetUsers.length} notifikasi terkirim`, 'success');
    
    // Reset form
    document.getElementById('broadcastTitle').value = '';
    document.getElementById('broadcastMessage').value = '';
    document.getElementById('broadcastLink').value = '';
    
    loadBroadcastHistory();
}

// ==================== FILTER DAN SEARCH FUNCTIONS ====================
let currentFilter = 'all';

function filterTransactions(status) {
    currentFilter = status;
    
    // Update active button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    if (event) event.target.classList.add('active');
    
    applyFilterAndSearch();
}

function searchTransactions() {
    applyFilterAndSearch();
}

function applyFilterAndSearch() {
    const searchTerm = document.getElementById('searchTransaction')?.value.toLowerCase() || '';
    const tbody = document.getElementById('transactionsTableBody');
    if (!tbody) return;
    
    let filteredTransactions = transactions;
    
    // Apply status filter
    if (currentFilter !== 'all') {
        filteredTransactions = filteredTransactions.filter(t => t.status === currentFilter);
    }
    
    // Apply search filter
    if (searchTerm) {
        filteredTransactions = filteredTransactions.filter(t => 
            (t.transactionId && t.transactionId.toLowerCase().includes(searchTerm)) ||
            (t.userName && t.userName.toLowerCase().includes(searchTerm)) ||
            (t.userEmail && t.userEmail.toLowerCase().includes(searchTerm)) ||
            (t.itemDetail && t.itemDetail.toLowerCase().includes(searchTerm))
        );
    }
    
    // Sort by date (newest first)
    filteredTransactions.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    // Re-render table
    tbody.innerHTML = '';
    
    if (filteredTransactions.length === 0) {
        tbody.innerHTML = '<tr><td colspan="9" style="text-align: center;">Tidak ada transaksi</td></tr>';
        return;
    }
    
    filteredTransactions.forEach(t => {
        const row = document.createElement('tr');
        const statusClass = t.status === 'menunggu_konfirmasi' ? 'status-menunggu_konfirmasi' : 
                           t.status === 'success' ? 'status-success' : 
                           t.status === 'failed' ? 'status-failed' : 'status-pending';
        
        let buktiDisplay = '-';
        if (t.buktiInfo) {
            const allImages = JSON.parse(localStorage.getItem('bukti_pembayaran')) || {};
            const imageData = allImages[t.buktiInfo.buktiId];
            
            if (imageData) {
                buktiDisplay = `<img src="${imageData.data}" class="bukti-thumbnail" onclick="viewBuktiDetail('${t.transactionId}')" title="Klik untuk lihat detail">`;
            } else {
                buktiDisplay = '<span class="no-bukti">File tidak ditemukan</span>';
            }
        }
        
        row.innerHTML = `
            <td>${t.transactionId}</td>
            <td>
                <strong>${t.userName}</strong><br>
                <small>${t.userEmail}</small>
            </td>
            <td>${t.itemDetail}</td>
            <td>Rp ${formatRupiah(t.total)}</td>
            <td>${t.paymentMethod}</td>
            <td class="bukti-cell">${buktiDisplay}</td>
            <td><span class="${statusClass}">${t.status}</span></td>
            <td>${formatDate(t.date)}</td>
            <td>
                ${t.status === 'menunggu_konfirmasi' ? `
                    <button class="btn-konfirmasi" onclick="viewBuktiDetail('${t.transactionId}')">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="btn-konfirmasi" onclick="konfirmasiTransaksi('${t.transactionId}')">
                        <i class="fas fa-check"></i>
                    </button>
                    <button class="btn-tolak" onclick="tolakTransaksi('${t.transactionId}')">
                        <i class="fas fa-times"></i>
                    </button>
                ` : `
                    <button class="btn-edit" onclick="viewBuktiDetail('${t.transactionId}')">
                        <i class="fas fa-eye"></i>
                    </button>
                `}
            </td>
        `;
        tbody.appendChild(row);
    });
}

// ==================== RESELLER PANEL ====================
function showResellerPanel() {
    if (!currentUser || !currentUser.isReseller) {
        showNotification('Anda bukan reseller!', 'error');
        return;
    }
    
    // Load data reseller
    const resellerSaldo = document.getElementById('resellerSaldo');
    const resellerTotalTrans = document.getElementById('resellerTotalTrans');
    const resellerKomisi = document.getElementById('resellerKomisi');
    
    if (resellerSaldo) resellerSaldo.textContent = `Rp ${formatRupiah(currentUser.saldo_reseller || 0)}`;
    
    const totalTrans = transactions.filter(t => t.userId === currentUser.id && (t.type === 'reseller' || t.paymentMethod === 'saldo_reseller')).length;
    if (resellerTotalTrans) resellerTotalTrans.textContent = totalTrans;
    if (resellerKomisi) resellerKomisi.textContent = `${currentUser.komisi || 0}%`;
    
    // Load produk untuk reseller
    loadResellerProducts();
    
    const modal = document.getElementById('resellerPanelModal');
    if (modal) modal.style.display = 'block';
}

function closeResellerPanel() {
    const modal = document.getElementById('resellerPanelModal');
    if (modal) modal.style.display = 'none';
}

function switchResellerTab(tab) {
    // Update tab buttons
    document.querySelectorAll('.reseller-tabs .tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    const activeBtn = document.querySelector(`.reseller-tabs .tab-btn[onclick="switchResellerTab('${tab}')"]`);
    if (activeBtn) activeBtn.classList.add('active');
    
    // Update tab content
    document.querySelectorAll('.reseller-tab').forEach(tabEl => {
        tabEl.classList.remove('active');
    });
    
    const activeTab = document.getElementById(`reseller${tab.charAt(0).toUpperCase() + tab.slice(1)}Tab`);
    if (activeTab) activeTab.classList.add('active');
}

function loadResellerProducts() {
    const grid = document.getElementById('resellerProductGrid');
    if (!grid) return;
    
    grid.innerHTML = '';

    // Gabungkan produk top up dan akun
    const allProducts = [
        ...products.map(p => ({ ...p, type: 'topup', harga: p.reseller_price })),
        ...akunGames.filter(a => a.status === 'tersedia').map(a => ({ 
            id: a.id, 
            game: a.game, 
            item: a.deskripsi, 
            harga: a.harga_reseller,
            image: a.detail.screenshot && a.detail.screenshot.length > 0 ? a.detail.screenshot[0] : 'https://via.placeholder.com/200?text=Akun',
            type: 'akun'
        }))
    ];
    
    allProducts.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.game}" onerror="this.src='https://via.placeholder.com/200?text=Product'">
            </div>
            <div class="product-info">
                <h3>${product.game}</h3>
                <p>${product.item}</p>
                <div class="product-price">Rp ${formatRupiah(product.harga)}</div>
                <button class="btn-beli-product" onclick="beliDenganSaldoReseller('${product.type}', ${product.id})">Beli dengan Saldo</button>
            </div>
        `;
        grid.appendChild(card);
    });
}

function beliDenganSaldoReseller(type, id) {
    if (!currentUser) return;
    
    // Arahkan ke form transaksi
    document.getElementById('layananType').value = type;
    updateForm();
    setTimeout(() => {
        const select = document.getElementById('itemSelect');
        if (select) {
            select.value = id;
            hitungTotal();
            
            // Pilih metode pembayaran saldo reseller
            const paymentSelect = document.getElementById('paymentMethod');
            for (let i = 0; i < paymentSelect.options.length; i++) {
                if (paymentSelect.options[i].value === 'saldo_reseller') {
                    paymentSelect.selectedIndex = i;
                    break;
                }
            }
        }
    }, 100);
    
    closeResellerPanel();
    document.getElementById('transaksi').scrollIntoView({ behavior: 'smooth' });
}

// ==================== ZOOM FUNCTIONS ====================
function zoomImage(src) {
    const modal = document.getElementById('zoomImageModal');
    const img = document.getElementById('zoomImage');
    if (modal && img) {
        img.src = src;
        modal.style.display = 'block';
    }
}

function closeZoomModal() {
    const modal = document.getElementById('zoomImageModal');
    if (modal) modal.style.display = 'none';
}

// ==================== UTILITY FUNCTIONS ====================
function formatRupiah(angka) {
    if (isNaN(angka) || angka === null) return '0';
    return new Intl.NumberFormat('id-ID').format(angka);
}

function formatDate(dateString) {
    if (!dateString) return '-';
    try {
        const date = new Date(dateString);
        return date.toLocaleDateString('id-ID', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    } catch (e) {
        return dateString;
    }
}

function showNotification(message, type = 'info') {
    // Cek apakah sudah ada notifikasi sebelumnya
    const existing = document.querySelector('.notification-toast');
    if (existing) {
        document.body.removeChild(existing);
    }
    
    const notification = document.createElement('div');
    notification.className = `notification-toast ${type}`;
    
    let icon = 'info-circle';
    if (type === 'success') icon = 'check-circle';
    if (type === 'error') icon = 'exclamation-circle';
    if (type === 'warning') icon = 'exclamation-triangle';
    
    notification.innerHTML = `
        <i class="fas fa-${icon}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// ==================== SECTION NAVIGATION ====================
function showTopUp() {
    document.getElementById('topup').scrollIntoView({ behavior: 'smooth' });
}

function showAkun() {
    document.getElementById('akun').scrollIntoView({ behavior: 'smooth' });
}

function showIsiSaldo() {
    document.getElementById('isi-saldo').scrollIntoView({ behavior: 'smooth' });
}

function showReseller() {
    document.getElementById('reseller').scrollIntoView({ behavior: 'smooth' });
}

function showEwallet() {
    document.getElementById('ewallet').scrollIntoView({ behavior: 'smooth' });
}

// ==================== CLOSE MODALS ON CLICK OUTSIDE ====================
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
    }
}
