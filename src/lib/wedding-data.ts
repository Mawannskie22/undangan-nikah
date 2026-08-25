/**
 * ============================================================
 *  DATA UNDANGAN — ubah isi semua teks di sini
 * ============================================================
 *  Catatan foto:
 *  - Foto ditaruh di folder `public/images/`.
 *  - Untuk pasang foto: isi `src` di PhotoFrame dengan path
 *    seperti "/images/foto-mempelai-wanita.jpg", lalu hapus
 *    prop `placeholder` agar bingkai foto terisi.
 */

export const weddingData = {
  // Judul undangan / eyebrow
  judul: "The Wedding of",
  namaAcara: "Desni & Sutan",

  // Pria / wanita
  wanita: {
    panggilan: "Desni",
    namaLengkap: "Desni",
    orangTua: "Desni dari\nBapak Desni & Ibu Desni",
    instagram: "@_putri",
    foto: "/images/foto/MLP08858.JPG",
  },
  pria: {
    panggilan: "Sutan",
    namaLengkap: "Sutan",
    orangTua: "Sutan dari\nBapak Sutan & Ibu Sutan",
    instagram: "@_putra",
    foto: "/images/foto/MLP08876.JPG",
  },

  // Background foto/video (kosongkan array/string untuk placeholder)
  // Taruh file di public/images/, lalu isi seperti "/images/foto-1.jpg"
  bg: {
    cover: [
      "/images/foto/MLP08896.JPG",
      "/images/foto/MLP08943.JPG",
      "/images/foto/MLP08959.JPG",
      "/images/foto/MLP08999.JPG",
    ], // foto slideshow di layar pembuka (cover)
    hero: "/images/foto/MLP09063.JPG", // foto background hero (jika tidak pakai video)
    heroVideo: "", // url mp4 background hero (prioritas di atas foto)
    closing: "/images/foto/MLP09200.JPG", // foto background section penutup
    gallery: [
      "/images/foto/MLP09209.JPG",
      "/images/foto/MLP09225.JPG",
      "/images/foto/MLP09301.JPG",
      "/images/foto/MLP09329.JPG",
      "/images/foto/MLP09351.JPG",
      "/images/foto/MLP09361.JPG",
      "/images/foto/MLP09365.JPG",
      "/images/foto/MLP09369.JPG",
      "/images/foto/MLP09373.JPG",
      "/images/foto/MLP09382.JPG",
      "/images/foto/MLP09386.JPG",
      "/images/foto/MLP09390.JPG",
      "/images/foto/MLP08896.JPG",
      "/images/foto/MLP08943.JPG",
      "/images/foto/MLP08959.JPG",
      "/images/foto/MLP08999.JPG",
      "/images/foto/MLP09063.JPG",
      "/images/foto/MLP09200.JPG",
      "/images/foto/MLP08858.JPG",
    ], // foto galeri
  },

  // Tanggal acara utama (dipakai cover, hero, countdown, save the date)
  tanggalAcara: {
    hari: "Sabtu",
    tanggal: "31 Oktober 2026",
    // Untuk countdown (format ISO). Ubah sesuai tanggal acara.
    iso: "2026-10-31T08:00:00+07:00",
  },

  // Kata pembuka / penutup
  salamPembuka: "Assalamu'alaikum Wr. Wb",
  kalimatPembuka:
    "Tanpa mengurangi rasa hormat, kami bermaksud mengundang Bapak/Ibu/Saudara/i untuk hadir pada acara pernikahan kami:",
  salamPenutup: "Wassalamu'alaikum Wr. Wb",
  kalimatPenutup:
    "Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu kepada kedua mempelai.",
  yangMengundang: "Kami yang berbahagia,",

  // Waktu & tempat acara
  events: [
    {
      judul: "Akad Nikah",
      hari: "Sabtu",
      tanggal: "31 Oktober 2026",
      waktu: "Pukul 08:00 - 09:00 WIB",
      tempat: "GOR OTISTA",
      alamat: "Jl. Otista Raya No. 121, Bidara Cina - Jakarta Timur",
      maps: "https://maps.app.goo.gl/Zab5HHrBVdTMz4rRA",
    },
    {
      judul: "Resepsi Pernikahan",
      hari: "Sabtu",
      tanggal: "31 Oktober 2026",
      waktu: "Pukul 11:00 - 13:00 WIB",
      tempat: "GOR OTISTA",
      alamat: "Jl. Otista Raya No. 121, Bidara Cina - Jakarta Timur",
      maps: "https://maps.app.goo.gl/Zab5HHrBVdTMz4rRA",
    },
  ],

  // Dress code — urutkan dari warna dominan
  dressCode: [
    { warna: "Gold", hex: "#CE7E00", deskripsi: "Nuansa keemasan" },
    { warna: "Sage", hex: "#D9EAD3", deskripsi: "Nuansa hijau muda" },
    { warna: "Teal", hex: "#134F5C", deskripsi: "Nuansa hijau tua" },
  ],

  // Live streaming
  streaming: {
    aktif: true,
    url: "https://live",
    instagram: "https://www.instagram.com/",
    label: "Join Streaming",
  },

  // Galeri foto

  // Kado digital / rekening
  bank: [
    { nama: "mandiri", nomor: "11111112", atasNama: "Desni" },
    { nama: "btn", nomor: "22222223", atasNama: "Sutan" },
    { nama: "dana", nomor: "33333334", atasNama: "Desni" },
  ],

  // Musik pengiring (taruh file mp3 di public/audio/, mis. music.mp3)
  musik: "/audio/song.m4a",

  // WhatsApp admin / footer
  whatsapp: "https://api.whatsapp.com/send?phone=6285225502210",
  brand: "Acara Kita",
};

export const ayatBuka = {
  arab:
    "وَمِنْ كُلِّ شَيْءٍ خَلَقْنَا زَوْجَيْنِ لَعَلَّكُمْ تَذَكَّرُوْنَ",
  latin:
    "Dan Segala sesuatu Kami ciptakan berpasang-pasangan agar kamu mengingat (kebesaran Allah).",
  sumber: "(QS. Adz-Dzariyat · Ayat 49)",
};

export const ayatCountdown = {
  arab:
    "وَأَنكِحُوا۟ ٱلْأَيَٰمَىٰ مِنكُمْ وَٱلصَّٰلِحِينَ مِنْ عِبَادِكُمْ وَإِمَآئِكُمْ ۚ إِن يَكُونُوا۟ فُقَرَآءَ يُغْنِهِمُ ٱللَّهُ مِن فَضْلِهِۦ ۗ وَٱللَّهُ وَٰسِعٌ عَلِيمٌ",
  latin:
    "Nikahkanlah orang-orang yang masih membujang di antara kamu dan juga orang-orang yang layak (menikah) dari hamba-hamba sahayamu, baik laki-laki maupun perempuan. Jika mereka miskin, Allah akan memberi kemampuan kepada mereka dengan karunia-Nya. Allah Mahaluas (pemberian-Nya) lagi Maha Mengetahui.",
  sumber: "(QS. An-Nur Ayat · 32)",
};

export const ayatPenutup = {
  arab:
    "وَمِنْ اٰیٰتِهٖۤ اَنْ خَلَقَ لَكُمْ مِّنْ اَنْفُسِكُمْ اَزْوَاجًا لِّتَسْكُنُوْۤا اِلَيْهَا وَجَعَلَ بَيْنَكُمْ مَّوَدَّةً وَّرَحْمَةً ۗ اِنَّ فِيْ ذٰلِكَ لَاٰيٰتٍ لِّقَوْمٍ يَّتَفَكَّرُوْنَ",
  latin:
    "Di antara tanda-tanda (kebesaran)-Nya ialah bahwa Dia menciptakan pasangan-pasangan untukmu dari (jenis) dirimu sendiri agar kamu merasa tenteram kepadanya. Dia menjadikan di antaramu rasa cinta dan kasih sayang. Sesungguhnya pada yang demikian itu benar-benar terdapat tanda-tanda (kebesaran Allah) bagi kaum yang berpikir.",
  sumber: "(QS. Ar-Rum Ayat · 21)",
};

export const loveStory = [
  {
    tahun: "01. 2010 - 2020",
    judul: "Awal Kisah",
    deskripsi:
      "Sebuah kisah sederhana bermula di tahun 2010 sepasang anak remaja yang mulai saling mengenal melalui mutual friend di sekolah dan saling berkomunikasi melalui media sosial. Kami saling bercerita, mensupport, membersamai demi satu tujuan kuliah di PTN. Kesibukan masing-masing di dunia baru dalam perkuliahan menjadi landasan hilangnya kabar, hingga pada 2020 takdir kembali mempertemukan kami sebagai dua pribadi yang telah tumbuh, belajar, dan melalui perjalanan masing-masing.",
  },
  {
    tahun: "02. Februari 2026",
    judul: "Lamaran",
    deskripsi:
      "Dengan segala perjalanan masing-masing yang telah kami lewati, kami memilih untuk berjalan bersama menjadi \"kita\" kembali. Hingga pada Februari 2026, sebuah lamaran menjadi langkah nyata untuk membawa hubungan ini menuju satu tujuan yakni membangun kehidupan bersama.",
  },
  {
    tahun: "03. Oktober 2026",
    judul: "Pernikahan",
    deskripsi:
      "Kisah kami bukan lagi tentang diri masing-masing yang mempertahankan ego, melainkan menjadi satu hati dan satu tujuan untuk melangkah bersama dengan mengharapkan ridho Allah SWT.",
  },
];
