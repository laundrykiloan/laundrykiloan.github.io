/**
 * DATA WEBSITE
 * Semangat Laundry
 *
 * File ini digunakan oleh:
 * 1. Website
 * 2. Sitemap Generator
 *
 * sitemap: true  = masuk sitemap
 * sitemap: false = tidak masuk sitemap
 */

const SITE_CONFIG = {
  siteUrl: "https://laundrykiloan.github.io",
  modulePath: "/semangatlaundry",
  siteName: "Semangat Laundry",
  maxUrlsPerSitemap: 45000
};


/* =========================================================
   DATA JASA
   ========================================================= */

const jasa = [

  {
    slug: "laundry-kiloan-reguler",
    nama: "Laundry Kiloan Reguler",
    kategori: "Laundry Kiloan",
    sitemap: true
  },

  {
    slug: "laundry-kiloan-express",
    nama: "Laundry Kiloan Express",
    kategori: "Laundry Kiloan",
    sitemap: true
  },

  {
    slug: "laundry-satuan",
    nama: "Laundry Satuan",
    kategori: "Laundry Satuan",
    sitemap: true
  },

  {
    slug: "laundry-selimut",
    nama: "Laundry Selimut",
    kategori: "Laundry Rumah Tangga",
    sitemap: true
  },

  {
    slug: "laundry-bed-cover",
    nama: "Laundry Bed Cover",
    kategori: "Laundry Rumah Tangga",
    sitemap: true
  },

  {
    slug: "laundry-karpet",
    nama: "Laundry Karpet",
    kategori: "Laundry Rumah Tangga",
    sitemap: true
  },

  {
    slug: "laundry-sepatu",
    nama: "Laundry Sepatu",
    kategori: "Laundry Fashion",
    sitemap: true
  },

  {
    slug: "laundry-tas",
    nama: "Laundry Tas",
    kategori: "Laundry Fashion",
    sitemap: true
  },

  {
    slug: "cuci-sofa",
    nama: "Cuci Sofa",
    kategori: "Cleaning Service",
    sitemap: true
  },

  {
    slug: "cuci-kasur",
    nama: "Cuci Kasur",
    kategori: "Cleaning Service",
    sitemap: true
  },

  {
    slug: "cuci-gorden",
    nama: "Cuci Gorden",
    kategori: "Laundry Rumah Tangga",
    sitemap: true
  }

];


/* =========================================================
   DATA WILAYAH
   ========================================================= */

const wilayah = [

  {
    provinsi: "jawa-tengah",
    kabupaten: "kabupaten-banyumas",
    kecamatan: "kalibagor",
    desa: "pekaja",
    sitemap: true
  },

  {
    provinsi: "jawa-tengah",
    kabupaten: "kabupaten-banyumas",
    kecamatan: "kalibagor",
    desa: "kalibagor",
    sitemap: true
  },

  {
    provinsi: "jawa-tengah",
    kabupaten: "kabupaten-banyumas",
    kecamatan: "kalibagor",
    desa: "karangdadap",
    sitemap: true
  },

  {
    provinsi: "jawa-tengah",
    kabupaten: "kabupaten-banyumas",
    kecamatan: "kalibagor",
    desa: "srowot",
    sitemap: true
  },

  {
    provinsi: "jawa-tengah",
    kabupaten: "kabupaten-banyumas",
    kecamatan: "sokaraja",
    desa: "sokaraja-kulon",
    sitemap: true
  },

  {
    provinsi: "jawa-tengah",
    kabupaten: "kabupaten-banyumas",
    kecamatan: "sokaraja",
    desa: "sokaraja-wetan",
    sitemap: true
  },

  {
    provinsi: "jawa-tengah",
    kabupaten: "kabupaten-banyumas",
    kecamatan: "sokaraja",
    desa: "kalikidang",
    sitemap: true
  },

  {
    provinsi: "jawa-tengah",
    kabupaten: "kabupaten-banyumas",
    kecamatan: "purwokerto-selatan",
    desa: "karangklesem",
    sitemap: true
  },

  {
    provinsi: "jawa-tengah",
    kabupaten: "kabupaten-banyumas",
    kecamatan: "purwokerto-selatan",
    desa: "teluk",
    sitemap: true
  },

  {
    provinsi: "jawa-tengah",
    kabupaten: "kabupaten-banyumas",
    kecamatan: "purwokerto-utara",
    desa: "bancarkembar",
    sitemap: true
  }

];


/* =========================================================
   EXPORT
   ========================================================= */

if (typeof module !== "undefined") {
  module.exports = {
    SITE_CONFIG,
    jasa,
    wilayah
  };
}
