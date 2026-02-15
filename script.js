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
    { id: 1, game: 'Mobile Legends', item: '86 Diamonds', price: 20000, reseller_price: 18000, category: 'mobile', image: 'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=200' },
    { id: 2, game: 'Mobile Legends', item: '172 Diamonds', price: 40000, reseller_price: 36000, category: 'mobile', image: 'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=200' },
    { id: 3, game: 'Mobile Legends', item: '257 Diamonds', price: 60000, reseller_price: 54000, category: 'mobile', image: 'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=200' }
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
        status: 'tersedia' 
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
    { id: 3, name: 'Paket Spesial', nominal: 250000, bonus: 10, price: 250000 }
];

let resellerPackages = JSON.parse(localStorage.getItem('resellerPackages')) || [
    { id: 1, name: 'Reseller Pemula', nominal: 100000, bonus: 5, price: 100000 },
    { id: 2, name: 'Reseller Pro', nominal: 500000, bonus: 7, price: 500000 }
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
    loadProducts();
    loadAkun();
    loadSaldoPackages();
    loadResellerPackages();
    loadEwallet();
    updateAuthUI();
    updateTransaksiForm();
    setupEventListeners();
    updateAllBadges();
    updateSaldoBadges();
    
    const uploadSection = document.getElementById('uploadBuktiSection');
    if (uploadSection) {
        uploadSection.style.display = 'block';
    }
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
        
        if (adminPanel) {
            adminPanel.style.display = user.role === 'admin' ? 'block' : 'none';
        }
        if (resellerPanel) {
            resellerPanel.style.display = user.isReseller ? 'block' : 'none';
        }
        
        updateSaldoBadges();
        
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

    if (currentUser) {
        if (navAuth) navAuth.style.display = 'none';
        if (navUser) {
            navUser.style.display = 'flex';
            if (userName) userName.textContent = currentUser.name;
        }
    } else {
        if (navAuth) navAuth.style.display = 'flex';
        if (navUser) navUser.style.display = 'none';
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
    
    // Arahkan ke form transaksi
    document.getElementById('layananType').value = 'isi_saldo';
    updateForm();
    
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
    
    showNotification('Fitur transaksi sedang dalam pengembangan', 'info');
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

// ==================== ADMIN FUNCTIONS ====================
function showAdminPanel() {
    if (currentUser && currentUser.role === 'admin') {
        const modal = document.getElementById('adminModal');
        if (modal) modal.style.display = 'block';
    } else {
        showNotification('Akses ditolak!', 'error');
    }
}

function closeAdminModal() {
    const modal = document.getElementById('adminModal');
    if (modal) modal.style.display = 'none';
}

function switchAdminTab(tab) {
    // This is a simplified version
    showNotification('Fitur admin panel sedang dalam pengembangan', 'info');
}

// ==================== RESELLER PANEL ====================
function showResellerPanel() {
    if (currentUser && currentUser.isReseller) {
        const modal = document.getElementById('resellerPanelModal');
        if (modal) modal.style.display = 'block';
    } else {
        showNotification('Anda bukan reseller!', 'error');
    }
}

function closeResellerPanel() {
    const modal = document.getElementById('resellerPanelModal');
    if (modal) modal.style.display = 'none';
}

function switchResellerTab(tab) {
    // This is a simplified version
    showNotification('Fitur panel reseller sedang dalam pengembangan', 'info');
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
