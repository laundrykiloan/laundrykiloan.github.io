const fs = require("fs");
const path = require("path");

const {
  SITE_CONFIG,
  jasa,
  wilayah
} = require("./data.js");


/* =========================================================
   KONFIGURASI
   ========================================================= */

const ROOT_DIR = __dirname;

const SITE_URL = SITE_CONFIG.siteUrl.replace(/\/+$/, "");

const MAX_URLS =
  Number(SITE_CONFIG.maxUrlsPerSitemap) || 45000;

const SITEMAP_FILE =
  path.join(ROOT_DIR, "sitemap.xml");

const ROBOTS_FILE =
  path.join(ROOT_DIR, "robots.txt");


/* =========================================================
   UTILITAS
   ========================================================= */

function cleanSlug(value) {

  return String(value || "")
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

}


function escapeXml(value) {

  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

}


/* =========================================================
   MEMBUAT URL
   ========================================================= */

function createProductRegionUrl(product, region) {

  const productSlug =
    cleanSlug(product.slug);

  const province =
    cleanSlug(region.provinsi);

  const regency =
    cleanSlug(region.kabupaten);

  const district =
    cleanSlug(region.kecamatan);

  const village =
    cleanSlug(region.desa);


  if (
    !productSlug ||
    !province ||
    !regency ||
    !district ||
    !village
  ) {

    return null;

  }


  return [
    SITE_URL,
    productSlug,
    province,
    regency,
    district,
    village
  ].join("/");

}


/* =========================================================
   MEMBUAT DAFTAR URL
   ========================================================= */

const urlSet = new Set();


/*
 * Homepage
 */

urlSet.add(`${SITE_URL}/`);


/*
 * Halaman jasa
 *
 * Contoh:
 * /laundry-kiloan-reguler
 */

for (const product of jasa) {

  if (product.sitemap === false) {
    continue;
  }

  const slug =
    cleanSlug(product.slug);

  if (!slug) {
    continue;
  }

  urlSet.add(
    `${SITE_URL}/${slug}`
  );

}


/*
 * Halaman jasa + wilayah
 *
 * Contoh:
 *
 * /laundry-kiloan-reguler/
 * jawa-tengah/
 * kabupaten-banyumas/
 * kalibagor/
 * pekaja
 */

for (const product of jasa) {

  if (product.sitemap === false) {
    continue;
  }


  for (const region of wilayah) {

    if (region.sitemap === false) {
      continue;
    }


    const url =
      createProductRegionUrl(
        product,
        region
      );


    if (url) {
      urlSet.add(url);
    }

  }

}


const urls =
  Array.from(urlSet).sort();


/* =========================================================
   MEMBAGI URL MENJADI CHUNK
   ========================================================= */

function chunkArray(array, size) {

  const chunks = [];

  for (
    let i = 0;
    i < array.length;
    i += size
  ) {

    chunks.push(
      array.slice(i, i + size)
    );

  }

  return chunks;

}


const chunks =
  chunkArray(
    urls,
    MAX_URLS
  );


/* =========================================================
   MEMBUAT XML SITEMAP
   ========================================================= */

function createSitemapXml(urlList) {

  const body = urlList
    .map(url => {

      return [
        "  <url>",
        `    <loc>${escapeXml(url)}</loc>`,
        "  </url>"
      ].join("\n");

    })
    .join("\n");


  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    body,
    "</urlset>"
  ].join("\n");

}


/* =========================================================
   HAPUS SITEMAP LAMA
   ========================================================= */

function removeOldGeneratedSitemaps() {

  const files =
    fs.readdirSync(ROOT_DIR);

  for (const file of files) {

    if (
      /^sitemap-\d+\.xml$/i.test(file)
    ) {

      fs.unlinkSync(
        path.join(ROOT_DIR, file)
      );

    }

  }

}


/* =========================================================
   GENERATE SITEMAP
   ========================================================= */

removeOldGeneratedSitemaps();


if (chunks.length === 1) {

  /*
   * Jika URL masih di bawah batas,
   * gunakan sitemap.xml biasa.
   */

  const xml =
    createSitemapXml(
      chunks[0]
    );

  fs.writeFileSync(
    SITEMAP_FILE,
    xml,
    "utf8"
  );

}
else {

  /*
   * Jika URL banyak,
   * buat:
   *
   * sitemap.xml
   * sitemap-1.xml
   * sitemap-2.xml
   * dst.
   */

  const sitemapFiles = [];


  chunks.forEach(
    (chunk, index) => {

      const fileName =
        `sitemap-${index + 1}.xml`;

      const filePath =
        path.join(
          ROOT_DIR,
          fileName
        );


      const xml =
        createSitemapXml(
          chunk
        );


      fs.writeFileSync(
        filePath,
        xml,
        "utf8"
      );


      sitemapFiles.push(
        `${SITE_URL}/${fileName}`
      );

    }
  );


  const body =
    sitemapFiles
      .map(url => {

        return [
          "  <sitemap>",
          `    <loc>${escapeXml(url)}</loc>`,
          "  </sitemap>"
        ].join("\n");

      })
      .join("\n");


  const indexXml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    body,
    "</sitemapindex>"
  ].join("\n");


  fs.writeFileSync(
    SITEMAP_FILE,
    indexXml,
    "utf8"
  );

}


/* =========================================================
   ROBOTS.TXT
   ========================================================= */

const robots = [
  "User-agent: *",
  "Allow: /",
  "",
  `Sitemap: ${SITE_URL}/sitemap.xml`,
  ""
].join("\n");


fs.writeFileSync(
  ROBOTS_FILE,
  robots,
  "utf8"
);


/* =========================================================
   HASIL
   ========================================================= */

const activeJasa =
  jasa.filter(
    item => item.sitemap !== false
  ).length;

const activeWilayah =
  wilayah.filter(
    item => item.sitemap !== false
  ).length;


console.log("");
console.log("==============================================");
console.log(" SEMANGAT LAUNDRY - SITEMAP GENERATOR V1");
console.log("==============================================");
console.log("");

console.log(
  `Site URL       : ${SITE_URL}`
);

console.log(
  `Total jasa     : ${jasa.length}`
);

console.log(
  `Jasa sitemap   : ${activeJasa}`
);

console.log(
  `Total wilayah  : ${wilayah.length}`
);

console.log(
  `Wilayah sitemap: ${activeWilayah}`
);

console.log(
  `Total URL      : ${urls.length}`
);

console.log(
  `Sitemap files  : ${chunks.length}`
);

console.log("");

console.log("Generated:");

console.log(
  " - sitemap.xml"
);

if (chunks.length > 1) {

  chunks.forEach(
    (_, index) => {

      console.log(
        ` - sitemap-${index + 1}.xml`
      );

    }
  );

}

console.log(
  " - robots.txt"
);

console.log("");

console.log("Sitemap generation completed.");

console.log("");
