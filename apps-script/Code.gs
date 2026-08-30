/**
 * undanganDigital — Apps Script (Doa & Ucapan + Konfirmasi Kehadiran)
 * =================================================================
 * Cara pakai:
 *   1. Buka Google Spreadsheet baru (lo yang mau dipake buat daftar tamu).
 *   2. Menu Extensions -> Apps Script -> hapus semua kode default.
 *   3. Paste seluruh isi file ini, lalu simpan (Ctrl+S).
 *   4. Deploy -> New deployment -> pilih type: Web app
 *        - Execute as : Me
 *        - Who has access : Anyone
 *      Klik Deploy, izinkan permission akun Google lo, salin URL Web app-nya.
 *   5. Isi URL itu di .env.local sebagai APPS_SCRIPT_URL.
 *
 * Sheet yang dipakai otomatis: tab "Daftar" dengan kolom:
 *   Nama | Kehadiran | Jml Tamu | Ucapan | Link | Kirim | Tanggal
 * (Nama persis sama dengan yang dipakai di link ?to=, biar nyambung ke baris yang sama.)
 */
var CONFIG = {
  sheetName: 'Daftar',
  // Indeks kolom: 0=Nama, 1=Kehadiran, 2=Jml Tamu, 3=Ucapan, 4=Link, 5=Kirim, 6=Tanggal
};

function getSheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sh = ss.getSheetByName(CONFIG.sheetName);
  if (!sh) {
    sh = ss.insertSheet(CONFIG.sheetName);
    sh.getRange(1, 1, 1, 7).setValues([['Nama', 'Kehadiran', 'Jml Tamu', 'Ucapan', 'Link', 'Kirim', 'Tanggal']]);
    sh.setFrozenRows(1);
    sh.getRange('C:C').setNumberFormat('0');
    sh.getRange('F:F').setDataValidation(SpreadsheetApp.newDataValidation().requireValueInList(['TRUE', 'FALSE'], true).build());
    sh.getRange('B:B').setDataValidation(SpreadsheetApp.newDataValidation().requireValueInList(['hadir', 'tidak', 'ragu'], true).build());
  }
  return sh;
}

function normalize_(s) {
  return String(s || '').trim().toLowerCase();
}

function findRow_(sh, nama) {
  var data = sh.getDataRange().getValues();
  var key = normalize_(nama);
  for (var i = 1; i < data.length; i++) {
    if (normalize_(data[i][0]) === key) return { row: i + 1, values: data[i] };
  }
  return null;
}

function now_(sh) {
  return Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyy-MM-dd HH:mm:ss');
}

function json_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

function listUcapan_() {
  var sh = getSheet_();
  var data = sh.getDataRange().getValues();
  var out = [];
  for (var i = 1; i < data.length; i++) {
    var nama = String(data[i][0] || '').trim();
    var ucapan = String(data[i][3] || '').trim();
    var tgl = String(data[i][6] || '').trim();
    if (nama && ucapan) out.push({ nama: nama, ucapan: ucapan, created_at: tgl });
  }
  out.reverse(); // terbaru paling atas
  return out;
}

function doGet(e) {
  var action = (e && e.parameter && e.parameter.action) || 'list';
  if (action === 'list') {
    return json_({ v: 2, messages: listUcapan_() });
  }
  if (action === 'links') {
    var sh = getSheet_();
    var data = sh.getDataRange().getValues();
    var out = [];
    for (var i = 1; i < data.length; i++) {
      var nama = String(data[i][0] || '').trim();
      if (nama) out.push({ nama: nama, link: String(data[i][4] || '').trim() });
    }
    return json_({ links: out });
  }
  return json_({ error: 'Action tidak dikenal' });
}

function doPost(e) {
  try {
    var body = {};
    if (e && e.postData && e.postData.contents) {
      try { body = JSON.parse(e.postData.contents); } catch (er) { }
    }

    if (body.action === 'setlinks') {
      return setlinks_(String(body.domain || '').trim());
    }

    var nama = String(body.nama || '').trim();
    var ucapan = String(body.ucapan || '').trim();

    if (!nama || nama.length > 50 || /[<>]/.test(nama)) {
      return json_({ error: 'Nama harus diisi (maks. 50 karakter).' });
    }
    if (ucapan.length < 2) {
      return json_({ error: 'Ucapan minimal 2 karakter.' });
    }

    var kehadiran = String(body.kehadiran || '').trim();
    var jumlah = body.jumlah_tamu !== null && body.jumlah_tamu !== undefined && body.jumlah_tamu !== ''
      ? Number(body.jumlah_tamu) : null;
    var domain = String(body.domain || '').trim();
    var ts = now_();

    var sh = getSheet_();
    var found = findRow_(sh, nama);

    var link = (found && found.values[4]) ? String(found.values[4]).trim() : '';
    if (!link && domain) {
      link = domain.replace(/\/+$/, '') + '/?to=' + encodeURIComponent(nama);
    }

    if (found) {
      var values = found.values.slice();
      if (kehadiran) values[1] = kehadiran;
      if (jumlah !== null) values[2] = jumlah;
      values[3] = ucapan;
      values[6] = ts;
      sh.getRange(found.row, 1, 1, values.length).setValues([values]);
    } else {
      sh.appendRow([nama, kehadiran, jumlah, ucapan, link, false, ts]);
    }

    return json_({ success: true, nama: nama, ucapan: ucapan, created_at: ts });
  } catch (err) {
    return json_({ error: 'Gagal menyimpan: ' + err.message });
  }
}

function setlinks_(dom) {
  var sh = getSheet_();
  var data = sh.getDataRange().getValues();
  var n2 = 0;
  for (var j = 1; j < data.length; j++) {
    var nm = String(data[j][0] || '').trim();
    var lk = String(data[j][4] || '').trim();
    if (nm && !lk && dom) {
      sh.getRange(j + 1, 5).setValue(dom.replace(/\/+$/, '') + '/?to=' + encodeURIComponent(nm));
      n2++;
    }
  }
  return json_({ success: true, updated: n2 });
}