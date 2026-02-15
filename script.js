// ==================== DATA STORE ====================
let users = JSON.parse(localStorage.getItem('users')) || [
    {
        id: 1,
        name: 'Admin',
        email: 'admin@gamevault.com',
        password: 'admin123',
        role: 'admin',
        saldo: 1000000,
        status: 'active',
        joinDate: new Date().toISOString()
    }
];

let products = JSON.parse(localStorage.getItem('products')) || [
    { id: 1, game: 'Mobile Legends', item: '86 Diamonds', price: 20000, category: 'mobile' },
    { id: 2, game: 'Mobile Legends', item: '172 Diamonds', price: 40000, category: 'mobile' },
    { id: 3, game: 'Mobile Legends', item: '257 Diamonds', price: 60000, category: 'mobile' },
    { id: 4, game: 'PUBG Mobile', item: '60 UC', price: 15000, category: 'pc' },
    { id: 5, game: 'PUBG Mobile', item: '180 UC', price: 45000, category: 'pc' },
    { id: 6, game: 'Free Fire', item: '70 Diamonds', price: 10000, category: 'console' },
    { id: 7, game: 'Free Fire', item: '140 Diamonds', price: 20000, category: 'console' },
    { id: 8, game: 'Free Fire', item: '355 Diamonds', price: 50000, category: 'console' }
];

let akunGames = JSON.parse(localStorage.getItem('akunGames')) || [
    { id: 1, game: 'Mobile Legends', deskripsi: 'Akun Mythic 100+ skin', harga: 500000, detail: 'Email: ml123@gmail.com\nPassword: ml123', status: 'tersedia' },
    { id: 2, game: 'PUBG Mobile', deskripsi: 'Akun Conqueror', harga: 750000, detail: 'Email: pubg123@gmail.com\nPassword: pubg123', status: 'tersedia' },
    { id: 3, game: 'Free Fire', deskripsi: 'Akun Grandmaster', harga: 300000, detail: 'Email: ff123@gmail.com\nPassword: ff123', status: 'tersedia' }
];

let ewallet = [
    { id: 1, name: 'DANA', fee: 1000, min: 10000, max: 2000000 },
    { id: 2, name: 'OVO', fee: 1000, min: 10000, max: 2000000 },
    { id: 3, name: 'GoPay', fee: 1000, min: 10000, max: 2000000 },
    { id: 4, name: 'LinkAja', fee: 1000, min: 10000, max: 2000000 }
];

let banks = [
    { id: 1, name: 'BCA', fee: 6500, min: 10000, max: 50000000 },
    { id: 2, name: 'Mandiri', fee: 6500, min: 10000, max: 50000000 },
    { id: 3, name: 'BNI', fee: 6500, min: 10000, max: 50000000 },
    { id: 4, name: 'BRI', fee: 6500, min: 10000, max: 50000000 }
];

let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
let adminNotifications = JSON.parse(localStorage.getItem('admin_notifications')) || [];
let userNotifications = JSON.parse(localStorage.getItem('user_notifications')) || [];

let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;
let currentPreviewTransaction = null;
let uploadedImages = JSON.parse(localStorage.getItem('bukti_pembayaran')) || {};

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', function() {
    loadProducts();
    loadAkun();
    loadEwallet();
    loadBank();
    updateAuthUI();
    updateTransaksiForm();
    setupEventListeners();
    checkUserNotifications();
    updateAllBadges();
    
    // Set default upload bukti tampil
    const uploadSection = document.getElementById('uploadBuktiSection');
    if (uploadSection) {
        uploadSection.style.display = 'block';
    }
    
    // Tampilkan QRIS jika metode QRIS
    const paymentMethod = document.getElementById('paymentMethod');
    if (paymentMethod) {
        paymentMethod.addEventListener('change', toggleQRIS);
    }
});

// ==================== EVENT LISTENERS ====================
function setupEventListeners() {
    // Smooth scroll for navigation
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
        } else {
            checkUserNotifications();
        }
        
        // Reset form
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
        saldo: 0,
        status: 'active',
        joinDate: new Date().toISOString()
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
}

function logout() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    updateAuthUI();
    showNotification('Anda telah logout', 'info');
    
    // Reload page to reset state
    setTimeout(() => {
        window.location.reload();
    }, 1000);
}

function updateAuthUI() {
    const navAuth = document.getElementById('navAuth');
    const navUser = document.getElementById('navUser');
    const userName = document.getElementById('userName');
    const adminPanel = document.getElementById('adminPanel');

    if (currentUser) {
        navAuth.style.display = 'none';
        navUser.style.display = 'flex';
        userName.textContent = currentUser.name;
        
        if (currentUser.role === 'admin') {
            adminPanel.style.display = 'block';
        } else {
            adminPanel.style.display = 'none';
        }
    } else {
        navAuth.style.display = 'flex';
        navUser.style.display = 'none';
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
                <i class="fas fa-gamepad"></i>
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

function loadAkun() {
    const grid = document.getElementById('akunGrid');
    if (!grid) return;
    
    grid.innerHTML = '';

    akunGames.forEach(akun => {
        if (akun.status === 'tersedia') {
            const card = document.createElement('div');
            card.className = 'product-card';
            card.innerHTML = `
                <div class="product-image">
                    <i class="fas fa-user"></i>
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

function loadBank() {
    const grid = document.getElementById('bankGrid');
    if (!grid) return;
    
    grid.innerHTML = '';

    banks.forEach(bank => {
        const card = document.createElement('div');
        card.className = 'payment-card';
        card.innerHTML = `
            <i class="fas fa-university"></i>
            <h3>${bank.name}</h3>
            <p>Min: Rp ${formatRupiah(bank.min)}</p>
            <p>Max: Rp ${formatRupiah(bank.max)}</p>
            <p class="payment-desc">Fee: Rp ${formatRupiah(bank.fee)}</p>
        `;
        card.onclick = () => selectPayment('bank', bank);
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
                <i class="fas fa-gamepad"></i>
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
                <i class="fas fa-gamepad"></i>
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

// ==================== TRANSACTION FUNCTIONS ====================
function updateTransaksiForm() {
    const type = document.getElementById('layananType').value;
    const itemSelect = document.getElementById('itemSelect');
    const userIdField = document.getElementById('userIdField');
    const serverField = document.getElementById('serverField');
    const jumlahField = document.getElementById('jumlahField');

    itemSelect.innerHTML = '';

    if (type === 'topup') {
        userIdField.style.display = 'block';
        serverField.style.display = 'block';
        jumlahField.style.display = 'block';
        document.getElementById('userId').placeholder = 'Masukkan User ID';
        products.forEach(p => {
            const option = document.createElement('option');
            option.value = p.id;
            option.textContent = `${p.game} - ${p.item} (Rp ${formatRupiah(p.price)})`;
            option.dataset.price = p.price;
            option.dataset.type = 'product';
            itemSelect.appendChild(option);
        });
    } else if (type === 'akun') {
        userIdField.style.display = 'none';
        serverField.style.display = 'none';
        jumlahField.style.display = 'none';
        document.getElementById('jumlah').value = '1';
        akunGames.forEach(a => {
            if (a.status === 'tersedia') {
                const option = document.createElement('option');
                option.value = a.id;
                option.textContent = `${a.game} - ${a.deskripsi} (Rp ${formatRupiah(a.harga)})`;
                option.dataset.price = a.harga;
                option.dataset.type = 'akun';
                itemSelect.appendChild(option);
            }
        });
    } else if (type === 'ewallet') {
        userIdField.style.display = 'block';
        serverField.style.display = 'none';
        jumlahField.style.display = 'none';
        document.getElementById('userId').placeholder = 'Nomor HP';
        ewallet.forEach(e => {
            const option = document.createElement('option');
            option.value = e.id;
            option.textContent = `${e.name} (Min: Rp ${formatRupiah(e.min)} - Max: Rp ${formatRupiah(e.max)})`;
            option.dataset.min = e.min;
            option.dataset.max = e.max;
            option.dataset.fee = e.fee;
            option.dataset.type = 'ewallet';
            itemSelect.appendChild(option);
        });
    } else if (type === 'bank') {
        userIdField.style.display = 'block';
        serverField.style.display = 'none';
        jumlahField.style.display = 'none';
        document.getElementById('userId').placeholder = 'Nomor Rekening';
        banks.forEach(b => {
            const option = document.createElement('option');
            option.value = b.id;
            option.textContent = `${b.name} (Min: Rp ${formatRupiah(b.min)} - Max: Rp ${formatRupiah(b.max)})`;
            option.dataset.min = b.min;
            option.dataset.max = b.max;
            option.dataset.fee = b.fee;
            option.dataset.type = 'bank';
            itemSelect.appendChild(option);
        });
    }

    hitungTotal();
}

function hitungTotal() {
    const type = document.getElementById('layananType').value;
    const itemSelect = document.getElementById('itemSelect');
    const jumlah = document.getElementById('jumlah').value;
    const userId = document.getElementById('userId').value;
    
    if (!itemSelect.options[itemSelect.selectedIndex]) return;
    
    const selectedOption = itemSelect.options[itemSelect.selectedIndex];
    let total = 0;

    if (type === 'topup' || type === 'akun') {
        const price = parseFloat(selectedOption.dataset.price) || 0;
        total = price * parseInt(jumlah);
    } else if (type === 'ewallet' || type === 'bank') {
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

    document.getElementById('totalHarga').textContent = 'Rp ' + formatRupiah(total);
}

function prosesTransaksi() {
    if (!currentUser) {
        showNotification('Silakan login terlebih dahulu!', 'warning');
        showLoginModal();
        return;
    }

    // Validasi upload bukti
    const buktiFile = document.getElementById('buktiFile');
    if (!buktiFile.files || buktiFile.files.length === 0) {
        showNotification('Silakan upload bukti pembayaran terlebih dahulu!', 'warning');
        document.getElementById('uploadArea').style.borderColor = '#dc3545';
        return;
    }

    const type = document.getElementById('layananType').value;
    const itemSelect = document.getElementById('itemSelect');
    const itemId = itemSelect.value;
    const jumlah = document.getElementById('jumlah').value;
    const userId = document.getElementById('userId').value;
    const server = document.getElementById('server').value;
    const paymentMethod = document.getElementById('paymentMethod').value;
    const total = parseFloat(document.getElementById('totalHarga').textContent.replace('Rp ', '').replace(/\./g, ''));
    
    if (total <= 0) {
        showNotification('Total tidak valid!', 'error');
        return;
    }

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
    } else if (type === 'ewallet') {
        const wallet = ewallet.find(e => e.id == itemId);
        itemDetail = `${wallet.name} - Top Up Rp ${formatRupiah(userId)}`;
        itemInfo = wallet;
    } else if (type === 'bank') {
        const bank = banks.find(b => b.id == itemId);
        itemDetail = `${bank.name} - Transfer Rp ${formatRupiah(userId)}`;
        itemInfo = bank;
    }

    // Generate unique ID
    const transactionId = 'TRX-' + Date.now() + '-' + Math.random().toString(36).substr(2, 5).toUpperCase();
    const buktiId = 'BUKTI-' + Date.now() + '-' + Math.random().toString(36).substr(2, 8).toUpperCase();
    
    // Simpan gambar dengan ID unik
    const file = buktiFile.files[0];
    const reader = new FileReader();
    
    reader.onload = function(e) {
        const imageData = {
            buktiId: buktiId,
            transactionId: transactionId,
            name: file.name,
            size: file.size,
            type: file.type,
            data: e.target.result,
            uploadDate: new Date().toISOString(),
            userId: currentUser.id,
            userName: currentUser.name
        };
        
        // Simpan ke penyimpanan gambar
        let allImages = JSON.parse(localStorage.getItem('bukti_pembayaran')) || {};
        allImages[buktiId] = imageData;
        localStorage.setItem('bukti_pembayaran', JSON.stringify(allImages));
        
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
            status: 'menunggu_konfirmasi',
            date: new Date().toISOString(),
            buktiInfo: {
                buktiId: buktiId,
                name: file.name,
                size: file.size,
                type: file.type,
                uploadDate: new Date().toISOString()
            },
            notes: ''
        };

        transactions.push(transaction);
        localStorage.setItem('transactions', JSON.stringify(transactions));

        // If buying akun, mark as sold
        if (type === 'akun') {
            const akun = akunGames.find(a => a.id == itemId);
            akun.status = 'terjual';
            localStorage.setItem('akunGames', JSON.stringify(akunGames));
        }

        // Kirim notifikasi ke admin
        sendNotificationToAdmin(transaction);
        
        // Kirim notifikasi ke user
        sendUserNotification(currentUser.id, 
            `Transaksi ${transactionId} berhasil dibuat. Admin akan segera mengkonfirmasi pembayaran Anda.`, 
            'success'
        );
        
        showNotification('Transaksi berhasil! Menunggu konfirmasi admin.', 'success');
        
        // Reset form
        resetForm();
    };
    
    reader.readAsDataURL(file);
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
            // Tampilkan preview
            previewImg.src = e.target.result;
            previewContainer.style.display = 'block';
            
            // Tampilkan info file
            fileInfo.innerHTML = `
                <i class="fas fa-check-circle" style="color: #28a745;"></i>
                <strong>${file.name}</strong> - ${(file.size / 1024).toFixed(2)} KB
            `;
            
            uploadStatus.style.display = 'flex';
            uploadArea.style.borderColor = '#28a745';
        }
        
        reader.readAsDataURL(file);
    }
}

function removeBukti() {
    document.getElementById('buktiFile').value = '';
    document.getElementById('previewContainer').style.display = 'none';
    document.getElementById('uploadStatus').style.display = 'none';
    document.getElementById('previewImg').src = '#';
    document.getElementById('fileInfo').innerHTML = '';
    document.getElementById('uploadArea').style.borderColor = '#ccc';
}

// ==================== QRIS FUNCTIONS ====================
function toggleQRIS() {
    const paymentMethod = document.getElementById('paymentMethod').value;
    const qrisSection = document.getElementById('qrisSection');
    
    if (paymentMethod === 'qris') {
        qrisSection.style.display = 'block';
    } else {
        qrisSection.style.display = 'none';
    }
}

function zoomQRIS() {
    document.getElementById('qrisZoomModal').style.display = 'block';
}

function closeQRISZoom() {
    document.getElementById('qrisZoomModal').style.display = 'none';
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
    updateTransaksiForm();
    setTimeout(() => {
        document.getElementById('itemSelect').value = id;
        hitungTotal();
    }, 100);
    document.getElementById('transaksi').scrollIntoView({ behavior: 'smooth' });
}

function selectAkun(id) {
    document.getElementById('layananType').value = 'akun';
    updateTransaksiForm();
    setTimeout(() => {
        document.getElementById('itemSelect').value = id;
        hitungTotal();
    }, 100);
    document.getElementById('transaksi').scrollIntoView({ behavior: 'smooth' });
}

function selectPayment(type, item) {
    document.getElementById('layananType').value = type;
    updateTransaksiForm();
    setTimeout(() => {
        document.getElementById('itemSelect').value = item.id;
        hitungTotal();
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
        message: `Pembayaran dari ${transaction.userName} - Rp ${formatRupiah(transaction.total)} menunggu konfirmasi. Klik untuk lihat bukti.`,
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
    const notification = {
        id: 'USER-NOTIF-' + Date.now() + '-' + Math.random().toString(36).substr(2, 5),
        userId: userId,
        title: type === 'success' ? 'Berhasil' : type === 'warning' ? 'Peringatan' : 'Informasi',
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

function updateAllBadges() {
    updateAdminNotificationBadge();
    updateUserNotificationBadge();
}

function checkUserNotifications() {
    if (currentUser) {
        const unreadCount = userNotifications.filter(n => n.userId === currentUser.id && n.status === 'unread').length;
        
        if (unreadCount > 0) {
            showNotification(`Anda memiliki ${unreadCount} notifikasi baru`, 'info');
        }
    }
}

function showNotifications() {
    if (!currentUser) {
        showNotification('Silakan login terlebih dahulu!', 'warning');
        return;
    }
    
    const list = document.getElementById('userNotificationsList');
    const userNotifs = userNotifications.filter(n => n.userId === currentUser.id).sort((a, b) => new Date(b.date) - new Date(a.date));
    
    list.innerHTML = '';
    
    if (userNotifs.length === 0) {
        list.innerHTML = '<p class="no-notifications">Tidak ada notifikasi</p>';
    } else {
        userNotifs.forEach(notif => {
            const notifElement = document.createElement('div');
            notifElement.className = `notification-item ${notif.status}`;
            notifElement.innerHTML = `
                <div class="notification-title">${notif.title}</div>
                <div class="notification-message">${notif.message}</div>
                <div class="notification-date">${formatDate(notif.date)}</div>
                <div class="notification-actions">
                    <button class="btn-edit" onclick="markNotificationAsRead('${notif.id}')">Tandai Dibaca</button>
                </div>
            `;
            list.appendChild(notifElement);
        });
    }
    
    document.getElementById('notificationsModal').style.display = 'block';
}

function closeNotificationsModal() {
    document.getElementById('notificationsModal').style.display = 'none';
}

function markNotificationAsRead(notificationId) {
    const notification = userNotifications.find(n => n.id === notificationId);
    if (notification) {
        notification.status = 'read';
        localStorage.setItem('user_notifications', JSON.stringify(userNotifications));
        updateUserNotificationBadge();
        showNotifications(); // Refresh list
    }
}

// ==================== ADMIN FUNCTIONS ====================
function showAdminPanel() {
    if (currentUser && currentUser.role === 'admin') {
        loadAdminData();
        document.getElementById('adminModal').style.display = 'block';
    } else {
        showNotification('Akses ditolak!', 'error');
    }
}

function closeAdminModal() {
    document.getElementById('adminModal').style.display = 'none';
}

function switchAdminTab(tab) {
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.admin-tab').forEach(tab => tab.classList.remove('active'));
    
    const btn = document.querySelector(`.tab-btn[onclick="switchAdminTab('${tab}')"]`);
    if (btn) btn.classList.add('active');
    
    const tabElement = document.getElementById(`admin${tab.charAt(0).toUpperCase() + tab.slice(1)}`);
    if (tabElement) tabElement.classList.add('active');
    
    if (tab === 'products') loadProductsTable();
    if (tab === 'akun') loadAkunTable();
    if (tab === 'users') loadUsersTable();
    if (tab === 'transactions') loadTransactionsTable();
    if (tab === 'notifications') loadAdminNotifications();
}

function loadAdminData() {
    loadProductsTable();
    loadAkunTable();
    loadUsersTable();
    loadTransactionsTable();
    loadAdminNotifications();
}

function loadProductsTable() {
    const tbody = document.getElementById('productsTableBody');
    if (!tbody) return;
    
    tbody.innerHTML = '';

    products.forEach(p => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${p.id}</td>
            <td>${p.game}</td>
            <td>${p.item}</td>
            <td>Rp ${formatRupiah(p.price)}</td>
            <td>
                <button class="btn-edit" onclick="editProduct(${p.id})">Edit</button>
                <button class="btn-delete" onclick="deleteProduct(${p.id})">Hapus</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function loadAkunTable() {
    const tbody = document.getElementById('akunTableBody');
    if (!tbody) return;
    
    tbody.innerHTML = '';

    akunGames.forEach(a => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${a.id}</td>
            <td>${a.game}</td>
            <td>${a.deskripsi}</td>
            <td>Rp ${formatRupiah(a.harga)}</td>
            <td><span class="status-${a.status}">${a.status}</span></td>
            <td>
                <button class="btn-edit" onclick="editAkun(${a.id})">Edit</button>
                <button class="btn-delete" onclick="deleteAkun(${a.id})">Hapus</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function loadUsersTable() {
    const tbody = document.getElementById('usersTableBody');
    if (!tbody) return;
    
    tbody.innerHTML = '';

    users.forEach(u => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${u.id}</td>
            <td>${u.name}</td>
            <td>${u.email}</td>
            <td>${u.role}</td>
            <td><span class="status-${u.status}">${u.status}</span></td>
            <td>
                <button class="btn-edit" onclick="editUser(${u.id})">Edit</button>
                <button class="btn-delete" onclick="deleteUser(${u.id})">Hapus</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

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
            <td>${t.paymentMethod.toUpperCase()}</td>
            <td class="bukti-cell">${buktiDisplay}</td>
            <td><span class="${statusClass}">${t.status}</span></td>
            <td>${formatDate(t.date)}</td>
            <td>
                ${t.status === 'menunggu_konfirmasi' ? `
                    <button class="btn-konfirmasi" onclick="viewBuktiDetail('${t.transactionId}')">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="btn-konfirmasi" onclick="konfirmasiCepat('${t.transactionId}')">
                        <i class="fas fa-check"></i>
                    </button>
                    <button class="btn-tolak" onclick="tolakCepat('${t.transactionId}')">
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

function viewBuktiDetail(transactionId) {
    const transaction = transactions.find(t => t.transactionId === transactionId);
    if (!transaction) return;
    
    currentPreviewTransaction = transaction;
    
    // Ambil gambar dari localStorage
    const allImages = JSON.parse(localStorage.getItem('bukti_pembayaran')) || {};
    const imageData = transaction.buktiInfo ? allImages[transaction.buktiInfo.buktiId] : null;
    
    if (!imageData) {
        showNotification('Gambar bukti tidak ditemukan!', 'error');
        return;
    }
    
    // Tampilkan gambar
    document.getElementById('detailBuktiImage').src = imageData.data;
    
    // Tampilkan info transaksi
    const detailInfo = document.getElementById('detailTransaksi');
    detailInfo.innerHTML = `
        <p><i class="fas fa-hashtag"></i> <strong>ID:</strong> ${transaction.transactionId}</p>
        <p><i class="fas fa-user"></i> <strong>User:</strong> ${transaction.userName} (${transaction.userEmail})</p>
        <p><i class="fas fa-shopping-cart"></i> <strong>Item:</strong> ${transaction.itemDetail}</p>
        <p><i class="fas fa-money-bill"></i> <strong>Total:</strong> Rp ${formatRupiah(transaction.total)}</p>
        <p><i class="fas fa-credit-card"></i> <strong>Metode:</strong> ${transaction.paymentMethod.toUpperCase()}</p>
        <p><i class="fas fa-calendar"></i> <strong>Tanggal:</strong> ${formatDate(transaction.date)}</p>
        <p><i class="fas fa-image"></i> <strong>File:</strong> ${transaction.buktiInfo.name} (${(transaction.buktiInfo.size / 1024).toFixed(2)} KB)</p>
        <p><i class="fas fa-clock"></i> <strong>Upload:</strong> ${formatDate(transaction.buktiInfo.uploadDate)}</p>
    `;
    
    // Tampilkan/sembunyikan tombol aksi
    if (transaction.status === 'menunggu_konfirmasi') {
        document.getElementById('catatanSection').style.display = 'none';
        document.getElementById('btnKonfirmasi').style.display = 'flex';
        document.getElementById('btnTolak').style.display = 'flex';
        
        // Reset tombol tolak
        document.getElementById('btnTolak').innerHTML = '<i class="fas fa-times"></i> Tolak';
        document.getElementById('btnTolak').onclick = tolakPembayaran;
    } else {
        document.getElementById('catatanSection').style.display = 'none';
        document.getElementById('btnKonfirmasi').style.display = 'none';
        document.getElementById('btnTolak').style.display = 'none';
    }
    
    document.getElementById('previewBuktiModal').style.display = 'block';
}

function closePreviewBuktiModal() {
    document.getElementById('previewBuktiModal').style.display = 'none';
    currentPreviewTransaction = null;
}

function konfirmasiPembayaran() {
    if (!currentPreviewTransaction) return;
    
    if (confirm('Konfirmasi pembayaran ini? Status akan diubah menjadi SUCCESS')) {
        const transaction = currentPreviewTransaction;
        transaction.status = 'success';
        localStorage.setItem('transactions', JSON.stringify(transactions));
        
        // Kirim notifikasi ke user
        sendUserNotification(transaction.userId, 
            `Pembayaran untuk transaksi ${transaction.transactionId} telah DIKONFIRMASI! Terima kasih.`, 
            'success'
        );
        
        closePreviewBuktiModal();
        loadTransactionsTable();
        showNotification('Pembayaran berhasil dikonfirmasi!', 'success');
    }
}

function tolakPembayaran() {
    if (!currentPreviewTransaction) return;
    
    const catatanSection = document.getElementById('catatanSection');
    catatanSection.style.display = 'block';
    
    // Ganti fungsi tombol
    document.getElementById('btnTolak').innerHTML = '<i class="fas fa-check"></i> Ya, Tolak';
    document.getElementById('btnTolak').onclick = function() {
        prosesPenolakan();
    };
}

function prosesPenolakan() {
    const catatan = document.getElementById('catatanPenolakan').value;
    
    if (!catatan) {
        showNotification('Harap isi alasan penolakan!', 'warning');
        return;
    }
    
    if (confirm('Tolak pembayaran ini? Status akan diubah menjadi FAILED')) {
        const transaction = currentPreviewTransaction;
        transaction.status = 'failed';
        transaction.notes = catatan;
        localStorage.setItem('transactions', JSON.stringify(transactions));
        
        // Kirim notifikasi ke user
        sendUserNotification(transaction.userId, 
            `Pembayaran untuk transaksi ${transaction.transactionId} DITOLAK. Alasan: ${catatan}`, 
            'error'
        );
        
        closePreviewBuktiModal();
        loadTransactionsTable();
        showNotification('Pembayaran ditolak!', 'info');
    }
}

function konfirmasiCepat(transactionId) {
    if (confirm('Konfirmasi pembayaran ini?')) {
        const transaction = transactions.find(t => t.transactionId === transactionId);
        if (transaction) {
            transaction.status = 'success';
            localStorage.setItem('transactions', JSON.stringify(transactions));
            
            sendUserNotification(transaction.userId, 
                `Pembayaran untuk transaksi ${transactionId} telah DIKONFIRMASI!`, 
                'success'
            );
            
            loadTransactionsTable();
            showNotification('Pembayaran dikonfirmasi!', 'success');
        }
    }
}

function tolakCepat(transactionId) {
    const alasan = prompt('Alasan penolakan:');
    if (alasan) {
        const transaction = transactions.find(t => t.transactionId === transactionId);
        if (transaction) {
            transaction.status = 'failed';
            transaction.notes = alasan;
            localStorage.setItem('transactions', JSON.stringify(transactions));
            
            sendUserNotification(transaction.userId, 
                `Pembayaran untuk transaksi ${transactionId} DITOLAK. Alasan: ${alasan}`, 
                'error'
            );
            
            loadTransactionsTable();
            showNotification('Pembayaran ditolak!', 'info');
        }
    }
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
    const category = document.getElementById('productCategory').value;

    const newProduct = {
        id: products.length + 1,
        game: game,
        item: item,
        price: parseFloat(price),
        category: category
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
    const detail = document.getElementById('akunDetail').value;

    const newAkun = {
        id: akunGames.length + 1,
        game: game,
        deskripsi: deskripsi,
        harga: parseFloat(harga),
        detail: detail,
        status: 'tersedia'
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

function editUser(id) {
    const user = users.find(u => u.id === id);
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

// ==================== FILTER DAN SEARCH FUNCTIONS ====================
let currentFilter = 'all';

function filterTransactions(status) {
    currentFilter = status;
    
    // Update active button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    applyFilterAndSearch();
}

function searchTransactions() {
    applyFilterAndSearch();
}

function applyFilterAndSearch() {
    const searchTerm = document.getElementById('searchTransaction').value.toLowerCase();
    const tbody = document.getElementById('transactionsTableBody');
    
    let filteredTransactions = transactions;
    
    // Apply status filter
    if (currentFilter !== 'all') {
        filteredTransactions = filteredTransactions.filter(t => t.status === currentFilter);
    }
    
    // Apply search filter
    if (searchTerm) {
        filteredTransactions = filteredTransactions.filter(t => 
            t.transactionId.toLowerCase().includes(searchTerm) ||
            t.userName.toLowerCase().includes(searchTerm) ||
            t.userEmail.toLowerCase().includes(searchTerm) ||
            t.itemDetail.toLowerCase().includes(searchTerm)
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
            <td>${t.paymentMethod.toUpperCase()}</td>
            <td class="bukti-cell">${buktiDisplay}</td>
            <td><span class="${statusClass}">${t.status}</span></td>
            <td>${formatDate(t.date)}</td>
            <td>
                ${t.status === 'menunggu_konfirmasi' ? `
                    <button class="btn-konfirmasi" onclick="viewBuktiDetail('${t.transactionId}')">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="btn-konfirmasi" onclick="konfirmasiCepat('${t.transactionId}')">
                        <i class="fas fa-check"></i>
                    </button>
                    <button class="btn-tolak" onclick="tolakCepat('${t.transactionId}')">
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

// ==================== ZOOM DAN DOWNLOAD FUNCTIONS ====================
function zoomImage() {
    const img = document.getElementById('detailBuktiImage');
    document.getElementById('zoomImage').src = img.src;
    document.getElementById('zoomImageModal').style.display = 'block';
}

function closeZoomModal() {
    document.getElementById('zoomImageModal').style.display = 'none';
}

function downloadImage() {
    const img = document.getElementById('detailBuktiImage');
    const link = document.createElement('a');
    link.href = img.src;
    link.download = 'bukti-pembayaran-' + currentPreviewTransaction.transactionId + '.jpg';
    link.click();
}

// ==================== PROFILE FUNCTIONS ====================
function showProfile() {
    if (currentUser) {
        document.getElementById('profileName').value = currentUser.name;
        document.getElementById('profileEmail').value = currentUser.email;
        document.getElementById('profileRole').value = currentUser.role;
        document.getElementById('profileSaldo').value = 'Rp ' + formatRupiah(currentUser.saldo || 0);
        document.getElementById('profileMemberSince').value = formatDate(currentUser.joinDate);
        document.getElementById('profileModal').style.display = 'block';
    }
}

function closeProfileModal() {
    document.getElementById('profileModal').style.display = 'none';
}

// ==================== HISTORY FUNCTIONS ====================
function showHistory() {
    if (currentUser) {
        const tbody = document.getElementById('historyTableBody');
        tbody.innerHTML = '';

        const userTransactions = transactions.filter(t => t.userId === currentUser.id).sort((a, b) => new Date(b.date) - new Date(a.date));

        if (userTransactions.length === 0) {
            tbody.innerHTML = '<tr><td colspan="7" style="text-align: center;">Belum ada transaksi</td></tr>';
        } else {
            userTransactions.forEach(t => {
                // Cek apakah ada bukti
                let buktiStatus = '-';
                if (t.buktiInfo) {
                    buktiStatus = '<i class="fas fa-check-circle" style="color: #28a745;"></i> Ada';
                }
                
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${t.transactionId || t.id}</td>
                    <td>${formatDate(t.date)}</td>
                    <td>${t.itemDetail}</td>
                    <td>${t.jumlah || 1}</td>
                    <td>Rp ${formatRupiah(t.total)}</td>
                    <td><span class="status-${t.status}">${t.status}</span></td>
                    <td>${buktiStatus}</td>
                `;
                tbody.appendChild(row);
            });
        }

        document.getElementById('historyModal').style.display = 'block';
    }
}

function closeHistoryModal() {
    document.getElementById('historyModal').style.display = 'none';
}

// ==================== UTILITY FUNCTIONS ====================
function formatRupiah(angka) {
    if (isNaN(angka) || angka === null) return '0';
    return new Intl.NumberFormat('id-ID').format(angka);
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification-toast ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : type === 'warning' ? 'exclamation-triangle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s';
        setTimeout(() => {
            document.body.removeChild(notification);
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

function showEwallet() {
    document.getElementById('ewallet').scrollIntoView({ behavior: 'smooth' });
}

function showBank() {
    document.getElementById('bank').scrollIntoView({ behavior: 'smooth' });
}

// ==================== CLOSE MODALS ON CLICK OUTSIDE ====================
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
    }
}
