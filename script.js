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
    { id: 3, game: 'Mobile Legends', item: '257 Diamonds', price: 60000, reseller_price: 54000, category: 'mobile', image: 'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=200' },
    { id: 4, game: 'PUBG Mobile', item: '60 UC', price: 15000, reseller_price: 13500, category: 'pubg', image: 'https://images.unsplash.com/photo-1600861194942-f883de0dfe96?w=200' },
    { id: 5, game: 'PUBG Mobile', item: '180 UC', price: 45000, reseller_price: 40500, category: 'pubg', image: 'https://images.unsplash.com/photo-1600861194942-f883de0dfe96?w=200' },
    { id: 6, game: 'Free Fire', item: '70 Diamonds', price: 10000, reseller_price: 9000, category: 'ff', image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=200' },
    { id: 7, game: 'Free Fire', item: '140 Diamonds', price: 20000, reseller_price: 18000, category: 'ff', image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=200' },
    { id: 8, game: 'Free Fire', item: '355 Diamonds', price: 50000, reseller_price: 45000, category: 'ff', image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=200' }
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
                'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400',
                'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400'
            ]
        }, 
        status: 'tersedia' 
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
                'https://images.unsplash.com/photo-1600861194942-f883de0dfe96?w=400',
                'https://images.unsplash.com/photo-1547394765-185e1e68f34e?w=400'
            ]
        }, 
        status: 'tersedia' 
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
                'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400',
                'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=400'
            ]
        }, 
        status: 'tersedia' 
    }
];

let ewallet = [
    { id: 1, name: 'DANA', fee: 1000, min: 10000, max: 2000000 },
    { id: 2, name: 'OVO', fee: 1000, min: 10000, max: 2000000 },
    { id: 3, name: 'GoPay', fee: 1000, min: 10000, max: 2000000 },
    { id: 4, name: 'LinkAja', fee: 1000, min: 10000, max: 2000000 }
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

// ==================== FIREBASE CONFIGURATION ====================
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Inisialisasi Firebase
try {
    firebase.initializeApp(firebaseConfig);
    console.log('Firebase initialized');
} catch (error) {
    console.error('Firebase initialization error:', error);
}

const messaging = firebase.messaging();

// ==================== NOTIFICATION VARIABLES ====================
let notificationPermission = localStorage.getItem('notifPermission') === 'granted';
let fcmToken = localStorage.getItem('fcmToken');

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', function() {
    loadProducts();
    loadAkun();
    loadSaldoPackages();
    loadResellerPackages();
    loadEwallet();
    updateAuthUI();
    updateTransaksiForm();
    setupEventListeners();
    checkUserNotifications();
    updateAllBadges();
    updateSaldoBadges();
    checkNotificationPermission();
    
    const uploadSection = document.getElementById('uploadBuktiSection');
    if (uploadSection) {
        uploadSection.style.display = 'block';
    }
    
    const paymentMethod = document.getElementById('paymentMethod');
    if (paymentMethod) {
        paymentMethod.addEventListener('change', toggleQRIS);
    }
    
    if (currentUser) {
        setupFirebaseMessaging();
    }
});

// ==================== EVENT LISTENERS ====================
function setupEventListeners() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

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
    const menu = document.getElementById('navMenu').querySelector('ul');
    menu.classList.toggle('show');
}

// ==================== FIREBASE MESSAGING ====================
async function setupFirebaseMessaging() {
    try {
        const permission = await Notification.requestPermission();
        
        if (permission === 'granted') {
            notificationPermission = true;
            localStorage.setItem('notifPermission', 'granted');
            updateNotificationButton();
            
            await getFCMToken();
            
            messaging.onMessage(function(payload) {
                console.log('Received foreground message:', payload);
                
                showNotification(payload.notification?.body || 'Notifikasi baru', 
                    payload.notification?.title === 'success' ? 'success' : 'info');
                
                updateAllBadges();
                
                if (payload.data?.transactionId && currentUser?.role === 'admin') {
                    loadTransactionsTable();
                }
                
                if (payload.data?.type) {
                    addInAppNotification(payload);
                }
            });
        } else {
            notificationPermission = false;
            localStorage.setItem('notifPermission', 'denied');
            updateNotificationButton();
        }
    } catch (error) {
        console.error('Error setting up Firebase messaging:', error);
    }
}

async function getFCMToken() {
    try {
        fcmToken = await messaging.getToken({
            vapidKey: 'YOUR_VAPID_KEY'
        });
        
        console.log('FCM Token:', fcmToken);
        localStorage.setItem('fcmToken', fcmToken);
        
        if (currentUser) {
            const userIndex = users.findIndex(u => u.id === currentUser.id);
            if (userIndex !== -1) {
                users[userIndex].fcmToken = fcmToken;
                localStorage.setItem('users', JSON.stringify(users));
                
                currentUser.fcmToken = fcmToken;
                localStorage.setItem('currentUser', JSON.stringify(currentUser));
            }
        }
        
        return fcmToken;
    } catch (error) {
        console.error('Error getting FCM token:', error);
    }
}

// ==================== NOTIFICATION FUNCTIONS ====================
function checkNotificationPermission() {
    if (Notification.permission === 'granted') {
        notificationPermission = true;
        localStorage.setItem('notifPermission', 'granted');
    } else if (Notification.permission === 'denied') {
        notificationPermission = false;
        localStorage.setItem('notifPermission', 'denied');
    }
    updateNotificationButton();
}

function updateNotificationButton() {
    const notifBtn = document.getElementById('notifPermissionBtn');
    if (!notifBtn) return;
    
    if (notificationPermission) {
        notifBtn.classList.add('has-permission');
        notifBtn.title = 'Notifikasi Aktif';
    } else {
        notifBtn.classList.remove('has-permission');
        notifBtn.title = 'Aktifkan Notifikasi';
    }
}

async function requestNotificationPermission() {
    await setupFirebaseMessaging();
}

function openNotificationSettings() {
    const modal = document.getElementById('notificationSettingsModal');
    if (!modal) return;
    
    const statusIndicator = document.getElementById('notifStatusIndicator');
    const activateBtn = document.getElementById('activateNotifBtn');
    
    if (notificationPermission) {
        statusIndicator.className = 'status-indicator active';
        statusIndicator.innerHTML = '<i class="fas fa-check-circle"></i><span>Notifikasi Aktif</span>';
        activateBtn.style.display = 'none';
    } else {
        statusIndicator.className = 'status-indicator inactive';
        statusIndicator.innerHTML = '<i class="fas fa-times-circle"></i><span>Notifikasi Tidak Aktif</span>';
        activateBtn.style.display = 'block';
    }
    
    if (currentUser?.notifSettings) {
        document.getElementById('notifNewTransaction').checked = currentUser.notifSettings.newTransaction;
        document.getElementById('notifPaymentConfirm').checked = currentUser.notifSettings.paymentConfirm;
        document.getElementById('notifAkunDelivery').checked = currentUser.notifSettings.akunDelivery;
        document.getElementById('notifPromo').checked = currentUser.notifSettings.promo;
    }
    
    modal.style.display = 'block';
}

function closeNotificationSettings() {
    if (currentUser) {
        const settings = {
            newTransaction: document.getElementById('notifNewTransaction').checked,
            paymentConfirm: document.getElementById('notifPaymentConfirm').checked,
            akunDelivery: document.getElementById('notifAkunDelivery').checked,
            promo: document.getElementById('notifPromo').checked
        };
        
        const userIndex = users.findIndex(u => u.id === currentUser.id);
        if (userIndex !== -1) {
            users[userIndex].notifSettings = settings;
            localStorage.setItem('users', JSON.stringify(users));
            
            currentUser.notifSettings = settings;
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
        }
    }
    
    document.getElementById('notificationSettingsModal').style.display = 'none';
}

async function testNotification() {
    if (!notificationPermission) {
        showNotification('Aktifkan notifikasi terlebih dahulu!', 'warning');
        return;
    }
    
    try {
        if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
            navigator.serviceWorker.controller.postMessage({
                type: 'TEST_NOTIFICATION',
                payload: {
                    notification: {
                        title: 'Test Notifikasi',
                        body: 'Ini adalah notifikasi test dari GameVault!',
                        icon: 'https://cdn.phototourl.com/uploads/2026-02-15-5f873800-26a4-43be-a12c-3100fc8daf52.png'
                    }
                }
            });
        }
        
        addInAppNotification({
            notification: {
                title: 'Test Berhasil!',
                body: 'Notifikasi berhasil dikirim. Cek notifikasi di HP Anda.'
            }
        });
        
        showNotification('Notifikasi test berhasil dikirim!', 'success');
    } catch (error) {
        console.error('Error sending test notification:', error);
        showNotification('Gagal mengirim notifikasi test', 'error');
    }
}

function addInAppNotification(payload) {
    const notification = {
        id: 'NOTIF-' + Date.now(),
        title: payload.notification?.title || 'Notifikasi Baru',
        message: payload.notification?.body || '',
        type: payload.data?.type || 'info',
        date: new Date().toISOString(),
        read: false
    };
    
    userNotifications.push(notification);
    localStorage.setItem('user_notifications', JSON.stringify(userNotifications));
    
    updateUserNotificationBadge();
}

async function sendNotificationToUser(userId, title, message, type = 'info', data = {}) {
    const user = users.find(u => u.id === userId);
    if (!user || !user.fcmToken) {
        console.log('User tidak memiliki FCM token');
        return;
    }
    
    if (type === 'transaction' && user.notifSettings?.newTransaction === false) return;
    if (type === 'payment' && user.notifSettings?.paymentConfirm === false) return;
    if (type === 'akun_delivered' && user.notifSettings?.akunDelivery === false) return;
    if (type === 'promo' && user.notifSettings?.promo === false) return;
    
    try {
        const response = await fetch('https://fcm.googleapis.com/fcm/send', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'key=YOUR_SERVER_KEY'
            },
            body: JSON.stringify({
                to: user.fcmToken,
                notification: {
                    title: title,
                    body: message,
                    icon: 'https://cdn.phototourl.com/uploads/2026-02-15-5f873800-26a4-43be-a12c-3100fc8daf52.png',
                    badge: 'https://cdn.phototourl.com/uploads/2026-02-15-5f873800-26a4-43be-a12c-3100fc8daf52.png',
                    sound: 'default',
                    vibrate: [200, 100, 200]
                },
                data: {
                    type: type,
                    ...data,
                    click_action: 'FLUTTER_NOTIFICATION_CLICK'
                },
                priority: 'high'
            })
        });
        
        const result = await response.json();
        console.log('Notification sent:', result);
        
        addInAppNotification({
            notification: { title, body: message },
            data: { type, ...data }
        });
        
    } catch (error) {
        console.error('Error sending notification:', error);
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
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        currentUser = user;
        localStorage.setItem('currentUser', JSON.stringify(user));
        updateAuthUI();
        closeLoginModal();
        showNotification('Login berhasil! Selamat datang ' + user.name, 'success');
        
        if (user.role === 'admin') {
            document.getElementById('adminPanel').style.display = 'block';
            updateAdminNotificationBadge();
        }
        
        if (user.isReseller) {
            document.getElementById('resellerPanel').style.display = 'block';
        }
        
        updateSaldoBadges();
        updatePaymentMethods(document.getElementById('layananType').value);
        setupFirebaseMessaging();
        
        document.getElementById('loginEmail').value = '';
        document.getElementById('loginPassword').value = '';
    } else {
        showNotification('Email atau password salah!', 'error');
    }
}

function register() {
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('registerConfirmPassword').value;
    const asReseller = document.getElementById('registerAsReseller').value === 'yes';

    if (password !== confirmPassword) {
        showNotification('Password tidak cocok!', 'error');
        return;
    }

    if (users.find(u => u.email === email)) {
        showNotification('Email sudah terdaftar!', 'error');
        return;
    }

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
    
    document.getElementById('registerName').value = '';
    document.getElementById('registerEmail').value = '';
    document.getElementById('registerPassword').value = '';
    document.getElementById('registerConfirmPassword').value = '';
    document.getElementById('registerAsReseller').value = 'no';
}

function logout() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    updateAuthUI();
    showNotification('Anda telah logout', 'info');
    
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

    if (currentUser) {
        navAuth.style.display = 'none';
        navUser.style.display = 'flex';
        userName.textContent = currentUser.name;
        
        adminPanel.style.display = currentUser.role === 'admin' ? 'block' : 'none';
        resellerPanel.style.display = currentUser.isReseller ? 'block' : 'none';
    } else {
        navAuth.style.display = 'flex';
        navUser.style.display = 'none';
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
        card.onclick = () => selectSaldoPackage(pkg.id);
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
        card.onclick = () => selectResellerPackage(pkg.id);
        card.innerHTML = `
            <div class="package-name">${pkg.name}</div>
            <div class="package-nominal">Rp ${formatRupiah(pkg.nominal)}</div>
            <div class="package-bonus">Bonus ${pkg.bonus}%</div>
            <div class="package-price">Rp ${formatRupiah(pkg.price)}</div>
        `;
        grid.appendChild(card);
    });
    
    const topupGrid = document.getElementById('resellerTopupPackages');
    if (topupGrid) {
        topupGrid.innerHTML = grid.innerHTML;
        Array.from(topupGrid.children).forEach((child, index) => {
            child.onclick = () => selectResellerPackage(resellerPackages[index].id);
        });
    }
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
    document.querySelectorAll('.package-card').forEach(card => {
        card.classList.remove('selected');
    });
    event.currentTarget.classList.add('selected');
    
    const pkg = saldoPackages.find(p => p.id === id);
    if (pkg) {
        document.getElementById('customSaldo').value = pkg.nominal;
        hitungBonusSaldo();
    }
}

function selectResellerPackage(id) {
    document.querySelectorAll('.package-card').forEach(card => {
        card.classList.remove('selected');
    });
    event.currentTarget.classList.add('selected');
    
    const pkg = resellerPackages.find(p => p.id === id);
    if (pkg) {
        document.getElementById('layananType').value = 'reseller';
        updateForm();
        setTimeout(() => {
            const select = document.getElementById('itemSelect');
            for (let i = 0; i < select.options.length; i++) {
                if (select.options[i].text.includes(pkg.name)) {
                    select.selectedIndex = i;
                    break;
           
