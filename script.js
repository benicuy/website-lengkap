// ==================== DATA STORE UPDATE ====================
let users = JSON.parse(localStorage.getItem('users')) || [
    {
        id: 1,
        name: 'Admin',
        email: 'admin@gamevault.com',
        password: 'admin123',
        role: 'admin',
        saldo_akun: 10000000, // Saldo akun untuk transaksi
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

let depositHistory = JSON.parse(localStorage.getItem('depositHistory')) || [];
let pembelianAkun = JSON.parse(localStorage.getItem('pembelian_akun')) || [];

// ==================== FUNGSI ISI SALDO ====================
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
    
    document.getElementById('bonusAmount').textContent = `Rp ${formatRupiah(bonusAmount)}`;
    document.getElementById('totalSaldo').textContent = `Rp ${formatRupiah(total)}`;
    document.getElementById('bonusInfo').style.display = 'block';
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
        for (let i = 0; i < select.options.length; i++) {
            if (select.options[i].text.includes(formatRupiah(nominal))) {
                select.selectedIndex = i;
                break;
            }
        }
        hitungTotal();
    }, 100);
    
    document.getElementById('transaksi').scrollIntoView({ behavior: 'smooth' });
}

// ==================== UPDATE FUNGSI KONFIRMASI PEMBAYARAN ====================
function konfirmasiPembayaran() {
    if (!currentPreviewTransaction) return;
    
    if (confirm('Konfirmasi pembayaran ini? Status akan diubah menjadi SUCCESS')) {
        const transaction = currentPreviewTransaction;
        transaction.status = 'success';
        
        // Jika transaksi adalah isi saldo, tambahkan saldo akun
        if (transaction.type === 'isi_saldo') {
            tambahSaldoAkun(transaction.userId, transaction.total, transaction.transactionId);
        }
        
        // Jika transaksi adalah top up reseller, tambahkan saldo reseller
        if (transaction.type === 'reseller') {
            tambahSaldoReseller(transaction.userId, transaction.total, transaction.transactionId);
        }
        
        // Jika transaksi adalah pembelian akun, kirim data akun ke buyer
        if (transaction.type === 'akun') {
            const akun = akunGames.find(a => a.id == transaction.itemId);
            if (akun) {
                kirimDataAkunKeBuyer(transaction.userId, transaction.transactionId, akun);
                akun.status = 'terjual';
                localStorage.setItem('akunGames', JSON.stringify(akunGames));
            }
        }
        
        localStorage.setItem('transactions', JSON.stringify(transactions));
        
        // Kirim notifikasi ke user
        sendUserNotification(transaction.userId, 
            `✅ Pembayaran untuk transaksi ${transaction.transactionId} telah DIKONFIRMASI! Terima kasih.`, 
            'success'
        );
        
        // Kirim notifikasi push ke user
        sendNotificationToUser(transaction.userId,
            '✅ Pembayaran Dikonfirmasi',
            `Transaksi ${transaction.transactionId} telah berhasil. Terima kasih!`,
            'success',
            { transactionId: transaction.transactionId, type: 'payment_confirm' }
        );
        
        closePreviewBuktiModal();
        loadTransactionsTable();
        showNotification('Pembayaran berhasil dikonfirmasi!', 'success');
    }
}

function tambahSaldoAkun(userId, jumlah, transactionId) {
    const userIndex = users.findIndex(u => u.id === userId);
    if (userIndex !== -1) {
        users[userIndex].saldo_akun = (users[userIndex].saldo_akun || 0) + jumlah;
        localStorage.setItem('users', JSON.stringify(users));
        
        // Update currentUser jika sedang login
        if (currentUser && currentUser.id === userId) {
            currentUser.saldo_akun = users[userIndex].saldo_akun;
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
        }
        
        // Kirim notifikasi khusus
        sendUserNotification(userId,
            `💰 Saldo akun Anda bertambah Rp ${formatRupiah(jumlah)} dari deposit ${transactionId}`,
            'success'
        );
    }
}

function tambahSaldoReseller(userId, jumlah, transactionId) {
    const userIndex = users.findIndex(u => u.id === userId);
    if (userIndex !== -1) {
        users[userIndex].saldo_reseller = (users[userIndex].saldo_reseller || 0) + jumlah;
        localStorage.setItem('users', JSON.stringify(users));
        
        if (currentUser && currentUser.id === userId) {
            currentUser.saldo_reseller = users[userIndex].saldo_reseller;
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
        }
        
        sendUserNotification(userId,
            `💰 Saldo reseller Anda bertambah Rp ${formatRupiah(jumlah)} dari deposit ${transactionId}`,
            'success'
        );
    }
}

// ==================== FUNGSI KIRIM DATA AKUN KE BUYER ====================
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
    
    sendUserNotification(userId, notifMessage, 'success');
    
    // Kirim notifikasi push ke HP dengan data akun
    sendNotificationToUser(userId,
        `🎮 Data Akun ${akun.game} Tersedia`,
        `Klik untuk melihat detail akun yang Anda beli.`,
        'akun_delivered',
        { 
            transactionId: transactionId, 
            type: 'akun_delivered',
            akunId: akun.id
        }
    );
}

// ==================== FUNGSI MELIHAT AKUN SAYA ====================
function showAkunSaya() {
    if (!currentUser) {
        showNotification('Silakan login terlebih dahulu!', 'warning');
        showLoginModal();
        return;
    }
    
    const userPurchases = pembelianAkun.filter(p => p.userId === currentUser.id);
    const grid = document.getElementById('akunSayaGrid');
    
    grid.innerHTML = '';
    
    if (userPurchases.length === 0) {
        grid.innerHTML = '<p class="no-data">Belum ada akun yang dibeli</p>';
    } else {
        userPurchases.forEach(akun => {
            const card = document.createElement('div');
            card.className = 'akun-saya-card';
            
            const images = akun.screenshot ? akun.screenshot.map(src => 
                `<img src="${src}" alt="Screenshot">`
            ).join('') : '<p>Tidak ada screenshot</p>';
            
            card.innerHTML = `
                <div class="akun-saya-images">
                    ${images}
                </div>
                <div class="akun-saya-info">
                    <h3>${akun.game}</h3>
                    <p>${akun.deskripsi}</p>
                    <div class="akun-saya-detail">
                        <p><i class="fas fa-envelope"></i> ${akun.email}</p>
                        <p><i class="fas fa-lock"></i> ${akun.password.replace(/./g, '*')}</p>
                        <p><i class="fas fa-user"></i> ${akun.nickname}</p>
                        <p><i class="fas fa-trophy"></i> ${akun.level}</p>
                        <p><i class="fas fa-tshirt"></i> ${akun.skin_count} Skin</p>
                    </div>
                    <button class="btn-lihat-akun" onclick="lihatDetailAkun('${akun.transactionId}')">
                        <i class="fas fa-eye"></i> Lihat Detail
                    </button>
                </div>
            `;
            grid.appendChild(card);
        });
    }
    
    document.getElementById('akunSayaModal').style.display = 'block';
}

function lihatDetailAkun(transactionId) {
    const akun = pembelianAkun.find(a => a.transactionId === transactionId);
    if (!akun) return;
    
    const content = document.getElementById('detailAkunContent');
    content.innerHTML = `
        <h3>${akun.game} - ${akun.deskripsi}</h3>
        <p><i class="fas fa-envelope"></i> <strong>Email:</strong> ${akun.email}</p>
        <p><i class="fas fa-lock"></i> <strong>Password:</strong> ${akun.password}</p>
        <p><i class="fas fa-user"></i> <strong>Nickname:</strong> ${akun.nickname}</p>
        <p><i class="fas fa-trophy"></i> <strong>Level/Rank:</strong> ${akun.level}</p>
        <p><i class="fas fa-tshirt"></i> <strong>Jumlah Skin:</strong> ${akun.skin_count}</p>
        <p><i class="fas fa-calendar"></i> <strong>Dibeli:</strong> ${formatDate(akun.tanggal)}</p>
    `;
    
    document.getElementById('detailAkunModal').style.display = 'block';
}

function copyDataAkun() {
    const content = document.getElementById('detailAkunContent').innerText;
    navigator.clipboard.writeText(content).then(() => {
        showNotification('Data akun berhasil disalin!', 'success');
    });
}

function closeDetailAkunModal() {
    document.getElementById('detailAkunModal').style.display = 'none';
}

function closeAkunSayaModal() {
    document.getElementById('akunSayaModal').style.display = 'none';
}

// ==================== FUNGSI MELIHAT SALDO AKUN ====================
function showSaldoAkun() {
    if (!currentUser) {
        showNotification('Silakan login terlebih dahulu!', 'warning');
        showLoginModal();
        return;
    }
    
    document.getElementById('currentSaldoAkun').textContent = `Rp ${formatRupiah(currentUser.saldo_akun || 0)}`;
    
    // Load riwayat deposit
    const userDeposits = depositHistory.filter(d => d.userId === currentUser.id);
    const tbody = document.getElementById('saldoHistoryTable');
    
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
    
    document.getElementById('saldoAkunModal').style.display = 'block';
}

function closeSaldoAkunModal() {
    document.getElementById('saldoAkunModal').style.display = 'none';
}

// ==================== UPDATE FUNGSI PROSES TRANSAKSI ====================
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
            showIsiSaldo();
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

// ==================== UPDATE FUNGSI LOAD TRANSAKSI ====================
function loadTransactionsTable() {
    const tbody = document.getElementById('transactionsTableBody');
    if (!tbody) return;
    
    tbody.innerHTML = '';

    transactions.sort((a, b) => new Date(b.date) - new Date(a.date)).forEach(t => {
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

// ==================== UPDATE FUNGSI VIEW BUKTI DETAIL ====================
function viewBuktiDetail(transactionId) {
    const transaction = transactions.find(t => t.transactionId === transactionId);
    if (!transaction) return;
    
    currentPreviewTransaction = transaction;
    
    // Ambil gambar dari localStorage
    const allImages = JSON.parse(localStorage.getItem('bukti_pembayaran')) || {};
    const imageData = transaction.buktiInfo ? allImages[transaction.buktiInfo.buktiId] : null;
    
    if (!imageData && transaction.status === 'menunggu_konfirmasi') {
        showNotification('Gambar bukti tidak ditemukan!', 'error');
        return;
    }
    
    // Tampilkan gambar jika ada
    if (imageData) {
        document.getElementById('detailBuktiImage').src = imageData.data;
    } else {
        document.getElementById('detailBuktiImage').src = 'https://via.placeholder.com/400x300?text=Tidak+Ada+Bukti';
    }
    
    // Tampilkan info transaksi
    const detailInfo = document.getElementById('detailTransaksi');
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
    
    // Tampilkan/sembunyikan tombol aksi
    if (transaction.status === 'menunggu_konfirmasi') {
        document.getElementById('catatanSection').style.display = 'none';
        document.getElementById('btnKonfirmasi').style.display = 'flex';
        document.getElementById('btnTolak').style.display = 'flex';
        
        document.getElementById('btnTolak').innerHTML = '<i class="fas fa-times"></i> Tolak';
        document.getElementById('btnTolak').onclick = tolakPembayaran;
    } else {
        document.getElementById('catatanSection').style.display = 'none';
        document.getElementById('btnKonfirmasi').style.display = 'none';
        document.getElementById('btnTolak').style.display = 'none';
    }
    
    document.getElementById('previewBuktiModal').style.display = 'block';
}

// ==================== UPDATE FUNGSI UPDATE FORM ====================
function updateForm() {
    const type = document.getElementById('layananType').value;
    const itemSelect = document.getElementById('itemSelect');
    const userIdField = document.getElementById('userIdField');
    const serverField = document.getElementById('serverField');
    const jumlahField = document.getElementById('jumlahField');
    const akunDetailSection = document.getElementById('akunDetailSection');
    const produkSection = document.getElementById('produkSection');
    const paymentMethod = document.getElementById('paymentMethod');

    itemSelect.innerHTML = '';
    akunDetailSection.style.display = 'none';
    produkSection.style.display = 'block';

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
            option.dataset.resellerPrice = p.reseller_price;
            option.dataset.type = 'product';
            option.dataset.image = p.image;
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
                option.dataset.resellerPrice = a.harga_reseller;
                option.dataset.type = 'akun';
                option.dataset.akun = JSON.stringify(a);
                itemSelect.appendChild(option);
            }
        });
        
        // Tampilkan preview saat memilih akun
        itemSelect.onchange = function() {
            const selected = itemSelect.options[itemSelect.selectedIndex];
            if (selected && selected.dataset.akun) {
                const akun = JSON.parse(selected.dataset.akun);
                tampilkanPreviewAkun(akun);
            }
        };
    } else if (type === 'isi_saldo') {
        userIdField.style.display = 'none';
        serverField.style.display = 'none';
        jumlahField.style.display = 'none';
        document.getElementById('jumlah').value = '1';
        saldoPackages.forEach(p => {
            const option = document.createElement('option');
            option.value = p.id;
            option.textContent = `${p.name} - Rp ${formatRupiah(p.nominal)} (Bonus ${p.bonus}%) - Bayar Rp ${formatRupiah(p.price)}`;
            option.dataset.price = p.price;
            option.dataset.nominal = p.nominal;
            option.dataset.bonus = p.bonus;
            option.dataset.type = 'saldo';
            itemSelect.appendChild(option);
        });
    } else if (type === 'reseller') {
        userIdField.style.display = 'none';
        serverField.style.display = 'none';
        jumlahField.style.display = 'none';
        document.getElementById('jumlah').value = '1';
        resellerPackages.forEach(p => {
            const option = document.createElement('option');
            option.value = p.id;
            option.textContent = `${p.name} - Rp ${formatRupiah(p.nominal)} (Bonus ${p.bonus}%) - Bayar Rp ${formatRupiah(p.price)}`;
            option.dataset.price = p.price;
            option.dataset.nominal = p.nominal;
            option.dataset.bonus = p.bonus;
            option.dataset.type = 'reseller';
            itemSelect.appendChild(option);
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
    }

    // Update payment method options
    updatePaymentMethods(type);
    
    hitungTotal();
}

function tampilkanPreviewAkun(akun) {
    const section = document.getElementById('akunDetailSection');
    const imagesDiv = document.getElementById('akunImages');
    const specsDiv = document.getElementById('akunSpecs');
    
    // Tampilkan gambar
    imagesDiv.innerHTML = '';
    if (akun.detail.screenshot && akun.detail.screenshot.length > 0) {
        akun.detail.screenshot.forEach(src => {
            const img = document.createElement('img');
            img.src = src;
            img.alt = 'Screenshot Akun';
            img.onclick = () => zoomImage(src);
            imagesDiv.appendChild(img);
        });
    }
    
    // Tampilkan spesifikasi
    specsDiv.innerHTML = `
        <p><i class="fas fa-user"></i> <strong>Nickname:</strong> ${akun.detail.nickname}</p>
        <p><i class="fas fa-trophy"></i> <strong>Level/Rank:</strong> ${akun.detail.level || akun.detail.tier || akun.detail.rank}</p>
        <p><i class="fas fa-tshirt"></i> <strong>Jumlah Skin:</strong> ${akun.detail.skin_count}</p>
        ${akun.detail.hero_count ? `<p><i class="fas fa-users"></i> <strong>Hero:</strong> ${akun.detail.hero_count}</p>` : ''}
        ${akun.detail.uc ? `<p><i class="fas fa-diamond"></i> <strong>UC:</strong> ${akun.detail.uc}</p>` : ''}
        ${akun.detail.diamond ? `<p><i class="fas fa-gem"></i> <strong>Diamond:</strong> ${akun.detail.diamond}</p>` : ''}
    `;
    
    section.style.display = 'block';
}

function updatePaymentMethods(type) {
    const select = document.getElementById('paymentMethod');
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
    
    // Tambah opsi saldo reseller jika user adalah reseller
    if (currentUser && currentUser.isReseller && currentUser.saldo_reseller > 0) {
        const optSaldoReseller = document.createElement('option');
        optSaldoReseller.value = 'saldo_reseller';
        optSaldoReseller.textContent = `Saldo Reseller (Rp ${formatRupiah(currentUser.saldo_reseller)})`;
        select.appendChild(optSaldoReseller);
    }
}

// ==================== UPDATE FUNGSI HITUNG TOTAL ====================
function hitungTotal() {
    const type = document.getElementById('layananType').value;
    const itemSelect = document.getElementById('itemSelect');
    const jumlah = document.getElementById('jumlah').value;
    const userId = document.getElementById('userId').value;
    
    if (!itemSelect.options[itemSelect.selectedIndex]) return;
    
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

    document.getElementById('totalHarga').textContent = 'Rp ' + formatRupiah(total);
    
    // Tampilkan sisa saldo
    if (currentUser) {
        if (document.getElementById('sisaSaldoAkun')) {
            document.getElementById('sisaSaldoAkunValue').textContent = `Rp ${formatRupiah(currentUser.saldo_akun || 0)}`;
        }
        if (document.getElementById('sisaSaldoReseller')) {
            document.getElementById('sisaSaldoResellerValue').textContent = `Rp ${formatRupiah(currentUser.saldo_reseller || 0)}`;
        }
    }
}

// ==================== UPDATE FUNGSI LOGIN ====================
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
        
        // Update badge saldo
        updateSaldoBadges();
        
        // Update payment methods
        updatePaymentMethods(document.getElementById('layananType').value);
        
        // Reset form
        document.getElementById('loginEmail').value = '';
        document.getElementById('loginPassword').value = '';
    } else {
        showNotification('Email atau password salah!', 'error');
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
    
    // Reset form
    document.getElementById('registerName').value = '';
    document.getElementById('registerEmail').value = '';
    document.getElementById('registerPassword').value = '';
    document.getElementById('registerConfirmPassword').value = '';
    document.getElementById('registerAsReseller').value = 'no';
}

// ==================== SECTION NAVIGATION ====================
function showIsiSaldo() {
    loadSaldoPackages();
    document.getElementById('isi-saldo').scrollIntoView({ behavior: 'smooth' });
}

// ==================== INISIALISASI ====================
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
    
    // Setup Firebase messaging jika sudah login
    if (currentUser) {
        setupFirebaseMessaging();
    }
});
