// ==================== VARIABEL GLOBAL UNTUK FOTO ====================
let currentPreviewTransaction = null;
let uploadedImages = {}; // Menyimpan gambar yang diupload (base64)

// ==================== FUNGSI UPLOAD BUKTI ====================
function toggleUploadBukti() {
    // Selalu tampilkan upload bukti untuk semua metode
    document.getElementById('uploadBuktiSection').style.display = 'block';
}

function previewBukti(input) {
    const previewContainer = document.getElementById('previewContainer');
    const previewImg = document.getElementById('previewImg');
    const fileInfo = document.getElementById('fileInfo');
    const uploadStatus = document.getElementById('uploadStatus');
    
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
            
            // Simpan image data untuk dikirim
            uploadedImages['current'] = {
                name: file.name,
                size: file.size,
                type: file.type,
                data: e.target.result,
                uploadDate: new Date().toISOString()
            };
            
            // Tampilkan info file
            fileInfo.innerHTML = `
                <i class="fas fa-check-circle" style="color: #28a745;"></i>
                <strong>${file.name}</strong> - ${(file.size / 1024).toFixed(2)} KB
            `;
            
            uploadStatus.style.display = 'flex';
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
    delete uploadedImages['current'];
}

// ==================== UPDATE FUNGSI PROSES TRANSAKSI ====================
function prosesTransaksi() {
    if (!currentUser) {
        showNotification('Silakan login terlebih dahulu!', 'warning');
        showLoginModal();
        return;
    }

    // Validasi upload bukti
    if (!uploadedImages['current']) {
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
    const imageData = uploadedImages['current'];
    imageData.buktiId = buktiId;
    imageData.transactionId = transactionId;
    
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
        status: 'menunggu_konfirmasi', // Langsung menunggu konfirmasi
        date: new Date().toISOString(),
        buktiInfo: {
            buktiId: buktiId,
            name: imageData.name,
            size: imageData.size,
            type: imageData.type,
            uploadDate: imageData.uploadDate
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
    
    // Hapus gambar yang sudah diupload
    removeBukti();
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
    delete uploadedImages['current'];
}

// ==================== FUNGSI ADMIN UNTUK LIHAT BUKTI ====================
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
                        <i class="fas fa-eye"></i> Lihat
                    </button>
                    <button class="btn-konfirmasi" onclick="konfirmasiCepat('${t.transactionId}')">
                        <i class="fas fa-check"></i>
                    </button>
                    <button class="btn-tolak" onclick="tolakCepat('${t.transactionId}')">
                        <i class="fas fa-times"></i>
                    </button>
                ` : `
                    <button class="btn-edit" onclick="viewBuktiDetail('${t.transactionId}')">
                        <i class="fas fa-eye"></i> Detail
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
    `;
    
    // Tampilkan/sembunyikan catatan
    if (transaction.status === 'menunggu_konfirmasi') {
        document.getElementById('catatanSection').style.display = 'none';
        document.getElementById('btnKonfirmasi').style.display = 'flex';
        document.getElementById('btnTolak').style.display = 'flex';
    } else {
        document.getElementById('catatanSection').style.display = 'none';
        document.getElementById('btnKonfirmasi').style.display = 'none';
        document.getElementById('btnTolak').style.display = 'none';
        
        // Tambahkan info status
        const statusMsg = document.createElement('div');
        statusMsg.className = `status-${transaction.status}`;
        statusMsg.innerHTML = `
            <p><i class="fas fa-info-circle"></i> Status: ${transaction.status}</p>
            ${transaction.notes ? `<p><i class="fas fa-comment"></i> Catatan: ${transaction.notes}</p>` : ''}
        `;
        detailInfo.appendChild(statusMsg);
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

// ==================== FUNGSI ZOOM DAN DOWNLOAD ====================
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

// ==================== FUNGSI FILTER DAN SEARCH ====================
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

// ==================== UPDATE FUNGSI NOTIFIKASI ====================
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

// ==================== INITIALIZATION UPDATE ====================
// Panggil fungsi ini di DOMContentLoaded
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
    document.getElementById('uploadBuktiSection').style.display = 'block';
});
