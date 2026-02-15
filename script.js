// Data Store (In production, this would be in database)
let users = JSON.parse(localStorage.getItem('users')) || [
    {
        id: 1,
        name: 'Admin',
        email: 'admin@gamevault.com',
        password: 'admin123',
        role: 'admin',
        saldo: 1000000,
        status: 'active'
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
    { id: 1, game: 'Mobile Legends', deskripsi: 'Akun Mythic 100+ skin', harga: 500000, detail: 'Email: ml123@gmail.com Password: ml123', status: 'tersedia' },
    { id: 2, game: 'PUBG Mobile', deskripsi: 'Akun Conqueror', harga: 750000, detail: 'Email: pubg123@gmail.com Password: pubg123', status: 'tersedia' },
    { id: 3, game: 'Free Fire', deskripsi: 'Akun Grandmaster', harga: 300000, detail: 'Email: ff123@gmail.com Password: ff123', status: 'tersedia' }
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

let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    loadProducts();
    loadAkun();
    loadEwallet();
    loadBank();
    updateAuthUI();
    updateTransaksiForm();
    setupEventListeners();
});

// Setup Event Listeners
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

// Authentication Functions
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
        }
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
        status: 'active'
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    showNotification('Registrasi berhasil! Silakan login.', 'success');
    closeRegisterModal();
    showLoginModal();
}

function logout() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    updateAuthUI();
    showNotification('Anda telah logout', 'info');
    window.location.reload();
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

// Product Functions
function loadProducts() {
    const grid = document.getElementById('gameGrid');
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

// Search and Filter Functions
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

// Transaksi Functions
function updateTransaksiForm() {
    const type = document.getElementById('layananType').value;
    const itemSelect = document.getElementById('itemSelect');
    const userIdField = document.getElementById('userIdField');
    const serverField = document.getElementById('serverField');

    itemSelect.innerHTML = '';

    if (type === 'topup') {
        userIdField.style.display = 'block';
        serverField.style.display = 'block';
        products.forEach(p => {
            const option = document.createElement('option');
            option.value = p.id;
            option.textContent = `${p.game} - ${p.item} (Rp ${formatRupiah(p.price)})`;
            option.dataset.price = p.price;
            itemSelect.appendChild(option);
        });
    } else if (type === 'akun') {
        userIdField.style.display = 'none';
        serverField.style.display = 'none';
        akunGames.forEach(a => {
            if (a.status === 'tersedia') {
                const option = document.createElement('option');
                option.value = a.id;
                option.textContent = `${a.game} - ${a.deskripsi} (Rp ${formatRupiah(a.harga)})`;
                option.dataset.price = a.harga;
                itemSelect.appendChild(option);
            }
        });
    } else if (type === 'ewallet') {
        userIdField.style.display = 'block';
        serverField.style.display = 'none';
        document.getElementById('userId').placeholder = 'Nomor HP';
        ewallet.forEach(e => {
            const option = document.createElement('option');
            option.value = e.id;
            option.textContent = `${e.name} (Min: Rp ${formatRupiah(e.min)} - Max: Rp ${formatRupiah(e.max)})`;
            option.dataset.min = e.min;
            option.dataset.max = e.max;
            option.dataset.fee = e.fee;
            itemSelect.appendChild(option);
        });
    } else if (type === 'bank') {
        userIdField.style.display = 'block';
        serverField.style.display = 'none';
        document.getElementById('userId').placeholder = 'Nomor Rekening';
        banks.forEach(b => {
            const option = document.createElement('option');
            option.value = b.id;
            option.textContent = `${b.name} (Min: Rp ${formatRupiah(b.min)} - Max: Rp ${formatRupiah(b.max)})`;
            option.dataset.min = b.min;
            option.dataset.max = b.max;
            option.dataset.fee = b.fee;
            itemSelect.appendChild(option);
        });
    }

    hitungTotal();
}

function hitungTotal() {
    const type = document.getElementById('layananType').value;
    const itemSelect = document.getElementById('itemSelect');
    const jumlah = document.getElementById('jumlah').value;
    const selectedOption = itemSelect.options[itemSelect.selectedIndex];
    
    let total = 0;

    if (type === 'topup' || type === 'akun') {
        const price = parseFloat(selectedOption.dataset.price) || 0;
        total = price * jumlah;
    } else if (type === 'ewallet' || type === 'bank') {
        const nominal = document.getElementById('userId').value;
        const fee = parseFloat(selectedOption.dataset.fee) || 0;
        total = (parseFloat(nominal) || 0) + fee;
    }

    document.getElementById('totalHarga').textContent = 'Rp ' + formatRupiah(total);
}

function prosesTransaksi() {
    if (!currentUser) {
        showNotification('Silakan login terlebih dahulu!', 'warning');
        showLoginModal();
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

    let itemDetail = '';
    if (type === 'topup') {
        const product = products.find(p => p.id == itemId);
        itemDetail = `${product.game} - ${product.item}`;
    } else if (type === 'akun') {
        const akun = akunGames.find(a => a.id == itemId);
        itemDetail = `${akun.game} - ${akun.deskripsi}`;
    } else if (type === 'ewallet') {
        const wallet = ewallet.find(e => e.id == itemId);
        itemDetail = `${wallet.name} - Top Up Rp ${formatRupiah(userId)}`;
    } else if (type === 'bank') {
        const bank = banks.find(b => b.id == itemId);
        itemDetail = `${bank.name} - Transfer Rp ${formatRupiah(userId)}`;
    }

    const transaction = {
        id: transactions.length + 1,
        userId: currentUser.id,
        userName: currentUser.name,
        type: type,
        itemId: itemId,
        itemDetail: itemDetail,
        jumlah: jumlah,
        userId_input: userId,
        server: server,
        paymentMethod: paymentMethod,
        total: total,
        status: 'pending',
        date: new Date().toISOString()
    };

    transactions.push(transaction);
    localStorage.setItem('transactions', JSON.stringify(transactions));

    // If buying akun, mark as sold
    if (type === 'akun') {
        const akun = akunGames.find(a => a.id == itemId);
        akun.status = 'terjual';
        localStorage.setItem('akunGames', JSON.stringify(akunGames));
    }

    showNotification('Transaksi berhasil diproses!', 'success');
    
    // Reset form
    document.getElementById('userId').value = '';
    document.getElementById('server').value = '';
    document.getElementById('jumlah').value = '1';
    
    // Show payment instructions
    showPaymentInstructions(transaction);
}

function showPaymentInstructions(transaction) {
    const paymentMethod = transaction.paymentMethod;
    let instructions = '';

    if (paymentMethod === 'ewallet') {
        instructions = `
            <h3>Instruksi Pembayaran via E-Wallet</h3>
            <p>1. Buka aplikasi e-wallet Anda</p>
            <p>2. Pilih menu transfer</p>
            <p>3. Transfer ke nomor: 081234567890 (GameVault)</p>
            <p>4. Masukkan nominal Rp ${formatRupiah(transaction.total)}</p>
            <p>5. Konfirmasi pembayaran ke admin</p>
        `;
    } else if (paymentMethod === 'bank') {
        instructions = `
            <h3>Instruksi Pembayaran via Transfer Bank</h3>
            <p>1. Buka aplikasi mobile banking/ATM</p>
            <p>2. Pilih menu transfer</p>
            <p>3. Transfer ke rekening:</p>
            <p>BCA: 1234567890 a.n GameVault</p>
            <p>Mandiri: 1234567890 a.n GameVault</p>
            <p>4. Masukkan nominal Rp ${formatRupiah(transaction.total)}</p>
            <p>5. Konfirmasi pembayaran ke admin</p>
        `;
    } else if (paymentMethod === 'va') {
        instructions = `
            <h3>Instruksi Pembayaran via Virtual Account</h3>
            <p>Virtual Account: 888${transaction.id}</p>
            <p>Bank: BCA Virtual Account</p>
            <p>Total: Rp ${formatRupiah(transaction.total)}</p>
            <p>Bayar melalui ATM atau mobile banking</p>
        `;
    }

    alert('Instruksi Pembayaran:\n\n' + instructions.replace(/<[^>]*>/g, '\n'));
}

// Selection Functions
function selectProduct(id) {
    document.getElementById('layananType').value = 'topup';
    updateTransaksiForm();
    document.getElementById('itemSelect').value = id;
    hitungTotal();
    document.getElementById('transaksi').scrollIntoView({ behavior: 'smooth' });
}

function selectAkun(id) {
    document.getElementById('layananType').value = 'akun';
    updateTransaksiForm();
    document.getElementById('itemSelect').value = id;
    hitungTotal();
    document.getElementById('transaksi').scrollIntoView({ behavior: 'smooth' });
}

function selectPayment(type, item) {
    document.getElementById('layananType').value = type;
    updateTransaksiForm();
    document.getElementById('itemSelect').value = item.id;
    hitungTotal();
    document.getElementById('transaksi').scrollIntoView({ behavior: 'smooth' });
}

// Admin Functions
function showAdminPanel() {
    if (currentUser && currentUser.role === 'admin') {
        loadAdminData();
        document.getElementById('adminModal').style.display = 'block';
    }
}

function closeAdminModal() {
    document.getElementById('adminModal').style.display = 'none';
}

function switchAdminTab(tab) {
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.admin-tab').forEach(tab => tab.classList.remove('active'));
    
    document.querySelector(`.tab-btn[onclick="switchAdminTab('${tab}')"]`).classList.add('active');
    document.getElementById(`admin${tab.charAt(0).toUpperCase() + tab.slice(1)}`).classList.add('active');
    
    if (tab === 'products') loadProductsTable();
    if (tab === 'akun') loadAkunTable();
    if (tab === 'users') loadUsersTable();
    if (tab === 'transactions') loadTransactionsTable();
}

function loadAdminData() {
    loadProductsTable();
    loadAkunTable();
    loadUsersTable();
    loadTransactionsTable();
}

function loadProductsTable() {
    const tbody = document.getElementById('productsTableBody');
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
    tbody.innerHTML = '';

    transactions.forEach(t => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${t.id}</td>
            <td>${t.userName}</td>
            <td>${t.itemDetail}</td>
            <td>Rp ${formatRupiah(t.total)}</td>
            <td><span class="status-${t.status}">${t.status}</span></td>
            <td>${new Date(t.date).toLocaleDateString('id-ID')}</td>
            <td>
                <button class="btn-edit" onclick="updateTransactionStatus(${t.id})">Update</button>
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
    // Implement edit functionality
    alert('Edit product: ' + product.game);
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
    // Implement edit functionality
    alert('Edit akun: ' + akun.game);
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
    // Implement edit functionality
    alert('Edit user: ' + user.name);
}

function deleteUser(id) {
    if (confirm('Yakin ingin menghapus user ini?')) {
        users = users.filter(u => u.id !== id);
        localStorage.setItem('users', JSON.stringify(users));
        loadUsersTable();
        showNotification('User berhasil dihapus!', 'success');
    }
}

function updateTransactionStatus(id) {
    const transaction = transactions.find(t => t.id === id);
    const newStatus = prompt('Update status (pending/success/failed):', transaction.status);
    
    if (newStatus && ['pending', 'success', 'failed'].includes(newStatus)) {
        transaction.status = newStatus;
        localStorage.setItem('transactions', JSON.stringify(transactions));
        loadTransactionsTable();
        showNotification('Status transaksi berhasil diupdate!', 'success');
    }
}

// Profile Functions
function showProfile() {
    if (currentUser) {
        document.getElementById('profileName').value = currentUser.name;
        document.getElementById('profileEmail').value = currentUser.email;
        document.getElementById('profileRole').value = currentUser.role;
        document.getElementById('profileSaldo').value = 'Rp ' + formatRupiah(currentUser.saldo || 0);
        document.getElementById('profileModal').style.display = 'block';
    }
}

function closeProfileModal() {
    document.getElementById('profileModal').style.display = 'none';
}

// History Functions
function showHistory() {
    if (currentUser) {
        const tbody = document.getElementById('historyTableBody');
        tbody.innerHTML = '';

        const userTransactions = transactions.filter(t => t.userId === currentUser.id);

        userTransactions.forEach(t => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${new Date(t.date).toLocaleDateString('id-ID')}</td>
                <td>${t.itemDetail}</td>
                <td>${t.jumlah}</td>
                <td>Rp ${formatRupiah(t.total)}</td>
                <td><span class="status-${t.status}">${t.status}</span></td>
            `;
            tbody.appendChild(row);
        });

        document.getElementById('historyModal').style.display = 'block';
    }
}

function closeHistoryModal() {
    document.getElementById('historyModal').style.display = 'none';
}

// Utility Functions
function formatRupiah(angka) {
    return new Intl.NumberFormat('id-ID').format(angka);
}

function showNotification(message, type) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    
    // Style notification
    notification.style.position = 'fixed';
    notification.style.top = '20px';
    notification.style.right = '20px';
    notification.style.padding = '1rem 2rem';
    notification.style.background = type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#17a2b8';
    notification.style.color = 'white';
    notification.style.borderRadius = '5px';
    notification.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    notification.style.zIndex = '3000';
    notification.style.display = 'flex';
    notification.style.alignItems = 'center';
    notification.style.gap = '10px';
    notification.style.animation = 'slideIn 0.3s';
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Close modals when clicking outside
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
    }
}

// Section navigation functions
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

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .status-tersedia {
        color: #28a745;
        font-weight: 600;
    }
    
    .status-terjual {
        color: #dc3545;
        font-weight: 600;
    }
    
    .status-active {
        color: #28a745;
        font-weight: 600;
    }
    
    .status-inactive {
        color: #dc3545;
        font-weight: 600;
    }
    
    .status-success {
        color: #28a745;
        font-weight: 600;
    }
    
    .status-pending {
        color: #ffc107;
        font-weight: 600;
    }
    
    .status-failed {
        color: #dc3545;
        font-weight: 600;
    }
`;

document.head.appendChild(style);
