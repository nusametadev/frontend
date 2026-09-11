# Nagara Web — Design Token Export

Untuk dipetakan ke Chakra UI v3. Semua nilai di bawah ditelusuri sampai literal
hex/rgba. Tidak ada nilai yang ditebak — yang tidak punya dasar ditulis
**TIDAK ADA**.

---

## Sumber theme

**Tailwind CSS v4** (`tailwindcss: ^4`, `@tailwindcss/postcss: ^4` di
[package.json](package.json)). **Tidak ada `tailwind.config.js/ts`** di repo —
v4 memindahkan theme ke CSS.

Sumber kebenaran, berurut prioritas:

| # | File | Isi |
|---|------|-----|
| 1 | [src/app/globals.css](src/app/globals.css) | **Satu-satunya** definisi token. Blok `@theme inline` (baris 8–33) + `:root` (baris 3–6) |
| 2 | [src/fonts/Fonts.ts](src/fonts/Fonts.ts) | Semua font family (next/font) |
| 3 | [src/app/layout.tsx](src/app/layout.tsx) | Font mana yang dipasang ke `<body>`, dan latar halaman |
| 4 | [src/components/molecules/InfoSection.molecule.tsx:139-142](src/components/molecules/InfoSection.molecule.tsx#L139-L142) | Warna chart, di-hardcode karena atribut SVG tidak bisa membaca utility Tailwind |

`postcss.config.mjs` hanya memuat plugin, tidak ada theme di sana.

**Catatan penting soal cakupan:** `@theme inline` hanya mendefinisikan
`neutral-100..900`, `tertiary-*`, dan `primaryRed-200..500`. Semua warna lain
yang dipakai di komponen (`gray-*`, `blue-*`, `red-*`, `amber-*`, `slate-*`,
`orange-500`, `neutral-50`) **jatuh ke palet default Tailwind v4**, bukan ke
theme proyek. Nilai default v4 itu ditulis dalam `oklch()`; saya konversi ke hex
di tabel terpisah di bawah.

---

## Palet mentah

### A. Token yang benar-benar didefinisikan proyek

Sumber: [globals.css:8-33](src/app/globals.css#L8-L33). Semua sudah literal hex
di file — tidak ada `oklch()`/`hsl()`/`color-mix()` sama sekali di theme ini.

| Nama token | Light (hex) | Dark (hex) | Dipakai di mana |
|---|---|---|---|
| `--color-neutral-100` | `#F7F7F8` | TIDAK ADA | Latar `<body>` ([layout.tsx:36](src/app/layout.tsx#L36)); latar slide-over mobile ([Header:49](src/components/organisms/Header.organism.tsx#L49)); teks ikon di atas chip gelap ([ConnectWalletBtn:107](src/components/molecules/ConnectWalletBtn.molecule.tsx#L107)) |
| `--color-neutral-200` | `#EBECED` | TIDAK ADA | Border kartu/divider ([InfoSection:337](src/components/molecules/InfoSection.molecule.tsx#L337), [:403](src/components/molecules/InfoSection.molecule.tsx#L403)); border dropdown ([ConnectWalletBtn:114](src/components/molecules/ConnectWalletBtn.molecule.tsx#L114)); grid chart ([InfoSection:141](src/components/molecules/InfoSection.molecule.tsx#L141)); hover item submenu ([DropdownNavHeader:113](src/components/molecules/DropdownNavHeader.molecule.tsx#L113)) |
| `--color-neutral-300` | `#D9DADD` | TIDAK ADA | Border input search ([Homepage:46](src/components/organisms/Homepage.organism.tsx#L46)); border NetworkSwitcher ([NetworkSwitcher:33](src/components/molecules/NetworkSwitcher.molecule.tsx#L33)); border tombol pagination aktif ([Pagination:37](src/components/molecules/Pagination.molecule.tsx#L37)) |
| `--color-neutral-400` | `#AFB2B7` | TIDAK ADA | Em-dash placeholder ([InfoSection:132](src/components/molecules/InfoSection.molecule.tsx#L132)); garis chart saat *idle* ([InfoSection:140](src/components/molecules/InfoSection.molecule.tsx#L140)); teks tombol pagination disabled ([Pagination:38](src/components/molecules/Pagination.molecule.tsx#L38)); border Badge ([Badge.atom](src/components/atoms/Badge.atom.tsx)) |
| `--color-neutral-500` | `#797D86` | TIDAK ADA | Teks muted/note & caption ([InfoSection:50](src/components/molecules/InfoSection.molecule.tsx#L50), [:86](src/components/molecules/InfoSection.molecule.tsx#L86)); tick axis chart ([InfoSection:142](src/components/molecules/InfoSection.molecule.tsx#L142)); stroke ikon list ([LatestBlocks:47](src/components/molecules/LatestBlocks.molecule.tsx#L47)) |
| `--color-neutral-600` | `#3D3F44` | TIDAK ADA | Teks & ikon nav mobile ([Header:72](src/components/organisms/Header.organism.tsx#L72), [:75](src/components/organisms/Header.organism.tsx#L75)); segmen NetworkSwitcher tidak aktif ([NetworkSwitcher:59](src/components/molecules/NetworkSwitcher.molecule.tsx#L59)); teks Badge |
| `--color-neutral-700` | `#313236` | TIDAK ADA | Teks submenu dropdown ([Header:37](src/components/organisms/Header.organism.tsx#L37)); alamat mono di tabel token ([Tokens:41](src/components/organisms/Tokens.organism.tsx#L41)); teks tombol pagination ([Pagination:37](src/components/molecules/Pagination.molecule.tsx#L37)) |
| `--color-neutral-800` | `#262729` | TIDAK ADA | Teks isi announcement banner ([AnnouncementBanner:18](src/components/molecules/AnnouncementBanner.molecule.tsx#L18)); latar footer mode gelap ([Footer:61](src/components/organisms/Footer.organism.tsx#L61)) |
| `--color-neutral-900` | `#1D1D1F` | TIDAK ADA | Teks utama/angka ([InfoSection:51-52](src/components/molecules/InfoSection.molecule.tsx#L51-L52)); border & chip tombol wallet ([ConnectWalletBtn:88](src/components/molecules/ConnectWalletBtn.molecule.tsx#L88), [:106](src/components/molecules/ConnectWalletBtn.molecule.tsx#L106)); border footer ([Footer:61](src/components/organisms/Footer.organism.tsx#L61)) |
| `--color-primaryRed-200` | `#F9D2D4` | TIDAK ADA | **Tidak dipakai** di `src/` |
| `--color-primaryRed-300` | `#F28F93` | TIDAK ADA | Dipakai 2× sebagai `bg-primaryRed-300` (dekorasi) |
| `--color-primaryRed-400` | `#EC6267` | TIDAK ADA | **Tidak dipakai** di `src/` |
| `--color-primaryRed-500` | `#E31E26` | TIDAK ADA | **Warna brand.** Link, garis chart, underline nav aktif, segmen aktif, border kartu, teks error. Lihat bagian *Peran semantik* |
| `--color-tertiary-orange` | `#E63E00` | TIDAK ADA | Label & border announcement banner ([AnnouncementBanner:7](src/components/molecules/AnnouncementBanner.molecule.tsx#L7), [:13](src/components/molecules/AnnouncementBanner.molecule.tsx#L13)) |
| `--color-tertiary-pink` | `#F8BBCA` | TIDAK ADA | **Tidak dipakai** di `src/` |
| `--color-tertiary-burgundy` | `#9B2710` | TIDAK ADA | **Tidak dipakai** di `src/` |
| `--background` | `#ffffff` | TIDAK ADA | [globals.css:4](src/app/globals.css#L4). Di-*override* — lihat catatan |
| `--foreground` | `#171717` | TIDAK ADA | [globals.css:5](src/app/globals.css#L5). Di-*override* — lihat catatan |

### B. Warna literal yang di-hardcode di komponen (bukan token)

| Nilai | Dipakai di mana |
|---|---|
| `#F8F4F0` | Band hero homepage ([Homepage:33](src/components/organisms/Homepage.organism.tsx#L33)) |
| `#fbeee4` | Latar announcement banner ([AnnouncementBanner:7](src/components/molecules/AnnouncementBanner.molecule.tsx#L7)) |
| `#B2B2B2` | Border kartu "Latest Block"/"Latest Transactions" — 6× ([LatestBlocks:20,32,43,85](src/components/molecules/LatestBlocks.molecule.tsx#L43), [LatestTransactions:80,92,103,155](src/components/molecules/LatestTransactions.molecule.tsx#L103)). **Tidak ada di theme** |
| `#62B816` | Badge sukses/verified ([BlockDetail:63](src/components/organisms/BlockDetail.organism.tsx#L63), [ContractTokens:219,276](src/components/organisms/ContractTokens.organism.tsx#L219)) |
| `#fff` | Stroke `activeDot` chart ([InfoSection:241](src/components/molecules/InfoSection.molecule.tsx#L241)) |
| `rgba(0,0,0,0.05)` (`bg-black/5`) | Latar header ([Header:151](src/components/organisms/Header.organism.tsx#L151)) & strip footer ([Footer:253](src/components/organisms/Footer.organism.tsx#L253)) |
| `rgba(0,0,0,0.5)` (`bg-black/50`) | Overlay modal |
| `rgba(0,0,0,0.1)` (`ring-black/10`) | Ring modal ([Modal:139](src/components/molecules/Modal.molecule.tsx#L139)) |
| `#C9FC5F`, `#7D6BF3`, `#0B2545`, `#1D1D1F`, `#E31E26` | Warna hover per-brand tombol "Featured Product" di footer ([Footer:158,172,187,202,218](src/components/organisms/Footer.organism.tsx#L158-L218)) |
| `#33CCFF` | Internal logo Twitter |

### C. Palet default Tailwind v4 yang terpakai (dikonversi dari `oklch()`)

Warna-warna ini **tidak** ada di `@theme` proyek. Nilai `oklch()` diambil dari
`node_modules/tailwindcss/dist/colors.js` dan dikonversi ke sRGB hex.
Validasi konversi: `gray-100` → `#F3F4F6`, cocok dengan nilai resmi Tailwind.

| Class | Nilai asli (oklch) | Hex | Dipakai di mana |
|---|---|---|---|
| `gray-100` | `oklch(96.7% 0.003 264.542)` | `#F3F4F6` | Latar `<th>` & hover baris tabel ([TableParts:9,19](src/components/atoms/TableParts.atom.tsx#L9-L19)) |
| `gray-200` | `oklch(92.8% 0.006 264.531)` | `#E5E7EB` | Border sel tabel ([TableParts:19,31](src/components/atoms/TableParts.atom.tsx#L31)) |
| `gray-400` | `oklch(70.7% 0.022 261.325)` | `#99A1AF` | Teks placeholder (7×) |
| `gray-500` | `oklch(55.1% 0.027 264.364)` | `#6A7282` | Teks state loading/empty (16×) |
| `gray-600` | `oklch(44.6% 0.03 256.802)` | `#4A5565` | Border input mode gelap ([SearchBar:90](src/components/molecules/SearchBar.molecule.tsx#L90)) |
| `gray-700` | `oklch(37.3% 0.034 259.733)` | `#364153` | Teks sekunder (8×) |
| `gray-800` | `oklch(27.8% 0.033 256.848)` | `#1E2939` | Teks header tabel ([TableParts:19](src/components/atoms/TableParts.atom.tsx#L19)) |
| `neutral-50` | `oklch(98.5% 0 none)` | `#FAFAFA` | Panel dalam dropdown wallet ([ConnectWalletBtn:262,269](src/components/molecules/ConnectWalletBtn.molecule.tsx#L262)) — **bukan** token proyek, karena `@theme` mulai dari `neutral-100` |
| `blue-500` | `oklch(62.3% 0.214 259.815)` | `#2B7FFF` | Ring focus ([Button.atom:30](src/components/atoms/Button.atom.tsx#L30), [SearchBar:110](src/components/molecules/SearchBar.molecule.tsx#L110)) |
| `blue-600` | `oklch(54.6% 0.245 262.881)` | `#155DFC` | Link "MetaMask"/"Rabby" ([ConnectWalletBtn:165,173](src/components/molecules/ConnectWalletBtn.molecule.tsx#L165)); `Button.atom` (tidak terpakai) |
| `blue-700` | `oklch(48.8% 0.243 264.376)` | `#1447E6` | Hover link di atas |
| `red-50` | `oklch(97.1% 0.013 17.38)` | `#FEF2F2` | Latar kotak error ([ConnectWalletBtn:143](src/components/molecules/ConnectWalletBtn.molecule.tsx#L143)) |
| `red-200` | `oklch(88.5% 0.062 18.334)` | `#FFC9C9` | Border kotak error |
| `red-600` | `oklch(57.7% 0.245 27.325)` | `#E7000B` | Tombol "Disconnect" ([ConnectWalletBtn:234](src/components/molecules/ConnectWalletBtn.molecule.tsx#L234)) |
| `red-700` | `oklch(50.5% 0.213 27.518)` | `#C10007` | Hover "Disconnect" |
| `amber-50` | `oklch(98.7% 0.022 95.277)` | `#FFFBEB` | Panel peringatan "wrong network" ([ConnectWalletBtn:245](src/components/molecules/ConnectWalletBtn.molecule.tsx#L245)) |
| `amber-100` | `oklch(96.2% 0.059 95.617)` | `#FEF3C6` | Pill "Wrong network" ([ConnectWalletBtn:196](src/components/molecules/ConnectWalletBtn.molecule.tsx#L196)) |
| `amber-200` | `oklch(92.4% 0.12 95.746)` | `#FEE685` | Border panel peringatan |
| `amber-600` | `oklch(66.6% 0.179 58.318)` | `#E17100` | Tombol "Switch network" ([ConnectWalletBtn:253](src/components/molecules/ConnectWalletBtn.molecule.tsx#L253)) |
| `amber-700` | `oklch(55.5% 0.163 48.998)` | `#BB4D00` | Hover tombol di atas |
| `amber-800` | `oklch(47.3% 0.137 46.201)` | `#973C00` | Teks peringatan |
| `orange-500` | `oklch(70.5% 0.213 47.604)` | `#FF6900` | Hanya di `Button.atom` (**tidak terpakai**) |
| `slate-300` | `oklch(86.9% 0.022 252.894)` | `#CAD5E2` | Teks modal mode gelap ([Modal:152](src/components/molecules/Modal.molecule.tsx#L152)) |
| `slate-600` | `oklch(44.6% 0.043 257.281)` | `#45556C` | Teks modal mode terang |
| `slate-800` | `oklch(27.9% 0.041 260.031)` | `#1D293D` | Latar modal mode gelap ([Modal:139](src/components/molecules/Modal.molecule.tsx#L139)) |
| `indigo-500` | `oklch(58.5% 0.233 277.117)` | `#615FFF` | Ring focus (1×) |

`bg-white` → `#FFFFFF`, `text-black`/`bg-black` → `#000000`.

---

## Peran semantik

Kolom **Dark** hampir seluruhnya `TIDAK ADA`; alasannya di bagian
[Mode terang & gelap](#mode-terang--gelap).

| Peran | Light (hex) | Dark (hex) | Bukti (file:baris) |
|---|---|---|---|
| **Latar halaman utama** | `#F7F7F8` (`neutral-100`) | TIDAK ADA | [src/app/layout.tsx:36](src/app/layout.tsx#L36) — `bg-neutral-100` di `<body>`. Menang atas `body{background:var(--background)}` di [globals.css:50](src/app/globals.css#L50) karena selector class > selector elemen, jadi `#ffffff` **tidak** dipakai |
| ↳ band hero homepage | `#F8F4F0` | TIDAK ADA | [Homepage.organism.tsx:33](src/components/organisms/Homepage.organism.tsx#L33) |
| **Teks utama (body)** | `#1D1D1F` (`neutral-900`) | TIDAK ADA | [InfoSection.molecule.tsx:51-52](src/components/molecules/InfoSection.molecule.tsx#L51-L52) `FIGURE`/`HEADLINE`; [ConnectWalletBtn:264,271](src/components/molecules/ConnectWalletBtn.molecule.tsx#L264). `--foreground: #171717` didefinisikan tapi tidak pernah dipakai (`text-foreground` nol kemunculan) |
| ↳ teks isi paragraf | `#262729` (`neutral-800`) | `#F7F7F8` | [AnnouncementBanner.molecule.tsx:18](src/components/molecules/AnnouncementBanner.molecule.tsx#L18); dark: [Footer:61](src/components/organisms/Footer.organism.tsx#L61) `dark:text-neutral-100` |
| **Teks sekunder / muted** | `#797D86` (`neutral-500`) | TIDAK ADA | [InfoSection.molecule.tsx:50](src/components/molecules/InfoSection.molecule.tsx#L50) `NOTE`; [:86](src/components/molecules/InfoSection.molecule.tsx#L86), [:120](src/components/molecules/InfoSection.molecule.tsx#L120) caption; [Pagination:67](src/components/molecules/Pagination.molecule.tsx#L67) |
| ↳ muted alternatif (jalur kedua) | `#6A7282` (`gray-500`) | TIDAK ADA | [LatestBlocks:39](src/components/molecules/LatestBlocks.molecule.tsx#L39), [LatestTransactions:105](src/components/molecules/LatestTransactions.molecule.tsx#L105) — 16× `text-gray-500`. Dua skala abu berjalan berdampingan |
| **Warna brand utama** | `#E31E26` (`primaryRed-500`) | TIDAK ADA | [globals.css:31](src/app/globals.css#L31); dipakai sebagai isian tombol di [NetworkSwitcher:58](src/components/molecules/NetworkSwitcher.molecule.tsx#L58) dan disc logo [InfoSection:65](src/components/molecules/InfoSection.molecule.tsx#L65) |
| **Teks di atas tombol primary** | `#FFFFFF` | TIDAK ADA | [NetworkSwitcher.molecule.tsx:58](src/components/molecules/NetworkSwitcher.molecule.tsx#L58) — `bg-primaryRed-500 text-white` |
| ↳ varian di atas isian merah | `#F7F7F8` (`neutral-100`) | TIDAK ADA | [InfoSection.molecule.tsx:65](src/components/molecules/InfoSection.molecule.tsx#L65) — `bg-primaryRed-500 text-neutral-100`. Tidak konsisten dengan baris di atas |
| **Warna link** | `#E31E26` (`primaryRed-500`) | TIDAK ADA | [Blocks.organism.tsx:24](src/components/organisms/Blocks.organism.tsx#L24) `text-primaryRed-500 hover:underline`; [Transactions:126](src/components/organisms/Transactions.organism.tsx#L126); [TokenDetail:223,374](src/components/organisms/TokenDetail.organism.tsx#L223); [Footer:135](src/components/organisms/Footer.organism.tsx#L135) |
| ↳ link keluar (eksternal) | `#155DFC` (`blue-600`) | TIDAK ADA | [ConnectWalletBtn:165,173](src/components/molecules/ConnectWalletBtn.molecule.tsx#L165-L173) — satu-satunya tempat link biru |
| **Hover elemen interaktif** | `#E31E26` (teks) | TIDAK ADA | [Tokens.organism.tsx:41](src/components/organisms/Tokens.organism.tsx#L41) `hover:text-primaryRed-500`; [DropdownNavHeader:89](src/components/molecules/DropdownNavHeader.molecule.tsx#L89) |
| ↳ hover latar (baris tabel) | `#F3F4F6` (`gray-100`) | TIDAK ADA | [TableParts.atom.tsx:9](src/components/atoms/TableParts.atom.tsx#L9) |
| ↳ hover latar (tombol/menu) | `#F7F7F8` (`neutral-100`) | TIDAK ADA | [Pagination:37](src/components/molecules/Pagination.molecule.tsx#L37), [ConnectWalletBtn:123](src/components/molecules/ConnectWalletBtn.molecule.tsx#L123) |
| ↳ hover latar (item submenu) | `#EBECED` (`neutral-200`) | TIDAK ADA | [DropdownNavHeader:113](src/components/molecules/DropdownNavHeader.molecule.tsx#L113) |
| ↳ hover latar (tombol wallet) | `rgba(29,29,31,0.05)` (`neutral-900/5`) | TIDAK ADA | [ConnectWalletBtn:88,188](src/components/molecules/ConnectWalletBtn.molecule.tsx#L88) |
| **Latar item navigasi aktif** | **TIDAK ADA** | TIDAK ADA | Nav aktif tidak memakai latar sama sekali. Penandanya garis bawah 4px: [Header.organism.tsx:31](src/components/organisms/Header.organism.tsx#L31) `after:h-[4px] after:bg-primaryRed-500` |
| ↳ teks navigasi aktif | `#E31E26` (`primaryRed-500`) | TIDAK ADA | [Header.organism.tsx:31](src/components/organisms/Header.organism.tsx#L31) — `text-primaryRed-500` di konstanta `ACTIVE_NAV` |
| ↳ latar segmen aktif (NetworkSwitcher) | `#E31E26` | TIDAK ADA | [NetworkSwitcher.molecule.tsx:58](src/components/molecules/NetworkSwitcher.molecule.tsx#L58) — ini satu-satunya kontrol dengan latar aktif berisi |
| **Latar kartu / panel / surface** | `#FFFFFF` | TIDAK ADA | [InfoSection:319](src/components/molecules/InfoSection.molecule.tsx#L319) `bg-white` + `border-primaryRed-500`; [BlockDetail:122,170](src/components/organisms/BlockDetail.organism.tsx#L122); [TokenDetail:386,475](src/components/organisms/TokenDetail.organism.tsx#L386); [ContractTokens:144,182,241](src/components/organisms/ContractTokens.organism.tsx#L144) |
| ↳ border kartu (statistik) | `#E31E26` | TIDAK ADA | [InfoSection:319](src/components/molecules/InfoSection.molecule.tsx#L319) |
| ↳ border kartu (list beranda) | `#B2B2B2` (hardcode) | TIDAK ADA | [LatestBlocks:43](src/components/molecules/LatestBlocks.molecule.tsx#L43), [LatestTransactions:103](src/components/molecules/LatestTransactions.molecule.tsx#L103) |
| ↳ latar panel bersarang | `#FAFAFA` (`neutral-50`, default TW) | TIDAK ADA | [ConnectWalletBtn:262,269,285](src/components/molecules/ConnectWalletBtn.molecule.tsx#L262) |
| **Latar header / topbar** | `rgba(0,0,0,0.05)` + `backdrop-blur-sm` | TIDAK ADA | [Header.organism.tsx:151](src/components/organisms/Header.organism.tsx#L151) — `bg-black/5`. Semi-transparan, bukan warna solid; di atas `#F7F7F8` hasil komposit ≈ `#EBEBEC` |
| ↳ latar announcement bar (di atas header) | `#fbeee4` | TIDAK ADA | [AnnouncementBanner.molecule.tsx:7](src/components/molecules/AnnouncementBanner.molecule.tsx#L7) |
| **Warna garis chart** | `#E31E26` | TIDAK ADA | [InfoSection.molecule.tsx:139](src/components/molecules/InfoSection.molecule.tsx#L139) `CHART_LINE`, dipakai di [:237](src/components/molecules/InfoSection.molecule.tsx#L237) |
| ↳ garis chart saat idle | `#AFB2B7` | TIDAK ADA | [InfoSection.molecule.tsx:140](src/components/molecules/InfoSection.molecule.tsx#L140) `CHART_LINE_IDLE` |
| ↳ grid chart | `#EBECED` | TIDAK ADA | [InfoSection.molecule.tsx:141](src/components/molecules/InfoSection.molecule.tsx#L141) |
| ↳ tick axis chart | `#797D86` | TIDAK ADA | [InfoSection.molecule.tsx:142](src/components/molecules/InfoSection.molecule.tsx#L142) |
| ↳ stroke `activeDot` | `#FFFFFF` | TIDAK ADA | [InfoSection.molecule.tsx:241](src/components/molecules/InfoSection.molecule.tsx#L241) |
| **Gradien area chart** | **TIDAK ADA** | TIDAK ADA | Chart-nya `LineChart` + `Line`, tanpa `<Area>`/`AreaChart`/`<linearGradient>`. Grep `gradient` di luar file ikon/logo: nol hasil. Tidak ada satu pun utility `bg-gradient-*`/`from-*`/`to-*` di `src/` |
| **Teks tab aktif** | `#FFFFFF` | TIDAK ADA | Tidak ada komponen Tab. Padanan terdekat = segmented control: [NetworkSwitcher.molecule.tsx:58](src/components/molecules/NetworkSwitcher.molecule.tsx#L58) `text-white` di atas `bg-primaryRed-500`. Padanan kedua = nav aktif `#E31E26` ([Header:31](src/components/organisms/Header.organism.tsx#L31)) |
| **Warna ikon utama** | `currentColor` → `#3D3F44` (`neutral-600`) | TIDAK ADA | Semua ikon SVG pakai `fill="currentColor"` ([NusametaLogo.icon.tsx](src/components/atoms/icons/NusametaLogo.icon.tsx)), jadi ikut warna teks. Pemakaian eksplisit: [Header:59,75](src/components/organisms/Header.organism.tsx#L59) `text-neutral-600` |
| ↳ ikon di atas chip gelap | `#F7F7F8` (`neutral-100`) | TIDAK ADA | [ConnectWalletBtn:107,210](src/components/molecules/ConnectWalletBtn.molecule.tsx#L107) |
| **Warna ikon sekunder** | fill `#EBECED` / stroke `#797D86` | TIDAK ADA | Ikon list punya prop warna sendiri: [LatestBlocks:47](src/components/molecules/LatestBlocks.molecule.tsx#L47) `<CubicIcon bgColor="#EBECED" strokeColor="#797D86" />`; [LatestTransactions:111](src/components/molecules/LatestTransactions.molecule.tsx#L111) `<ReceiptIcon bgColor="#EBECED" fillColor="#797D86" />` |

---

## Mode terang & gelap

**Proyek ini efektif hanya punya mode terang.** Bukti:

1. Blok dark di [globals.css:35-40](src/app/globals.css#L35-L40) **seluruhnya
   dikomentari** — `--background`/`--foreground` tidak pernah berubah:
   ```css
   @media (prefers-color-scheme: dark) {
     :root {
       /* --background: #0a0a0a;
       --foreground: #ededed; */
     }
   }
   ```
   Blok `prefers-color-scheme: light` di [baris 42-47](src/app/globals.css#L42-L47)
   juga kosong/dikomentari.

2. Tidak ada mekanisme pengalih tema: nol kemunculan `data-theme`, `darkMode`,
   `next-themes`, atau `useTheme` di seluruh `src/`.

3. Latar & teks halaman dikunci lewat utility statis
   (`bg-neutral-100` di [layout.tsx:36](src/app/layout.tsx#L36)), yang tidak
   punya pasangan `dark:`.

**Tapi ada sisa dark mode yang parsial dan tidak disengaja.** Ada **27**
kemunculan varian `dark:` di 5 file. Di Tailwind v4 varian `dark:` default
memetakan ke `@media (prefers-color-scheme: dark)`, jadi class-class ini
**tetap aktif** kalau OS pengguna disetel gelap — padahal latar halaman tetap
terang. Hasilnya kombinasi yang rusak, bukan mode gelap yang utuh.

File yang terdampak, dan satu-satunya nilai dark yang benar-benar ada dasarnya:

| Peran | Light | Dark | Bukti |
|---|---|---|---|
| Latar footer | transparan | `#262729` (`neutral-800`) | [Footer:61](src/components/organisms/Footer.organism.tsx#L61) |
| Teks footer | `#1D1D1F` | `#F7F7F8` (`neutral-100`) | [Footer:61](src/components/organisms/Footer.organism.tsx#L61) |
| Border footer | `#1D1D1F` | `#AFB2B7` (`neutral-400`) | [Footer:61](src/components/organisms/Footer.organism.tsx#L61) |
| Latar modal | `#FFFFFF` | `#1D293D` (`slate-800`) | [Modal:139](src/components/molecules/Modal.molecule.tsx#L139) |
| Teks modal sekunder | `#45556C` (`slate-600`) | `#CAD5E2` (`slate-300`) | [Modal:152](src/components/molecules/Modal.molecule.tsx#L152) |
| Input search | border `#FFFFFF` | bg `#364153` (`gray-700`), teks `#FFFFFF`, border `#4A5565` (`gray-600`) | [SearchBar:90](src/components/molecules/SearchBar.molecule.tsx#L90) |
| Teks InputMailTo | `#1D1D1F` | `#F7F7F8` | [InputMailTo:24,38](src/components/molecules/InputMailTo.molecule.tsx#L24) |

**Rekomendasi untuk migrasi Chakra v3:** perlakukan proyek ini sebagai
**single-mode (light)**. Tabel di atas bukan design system mode gelap — hanya
tempelan di 5 komponen, dan tiga di antaranya (`slate-*`, `gray-*`) memakai
palet yang sama sekali di luar theme proyek. Jangan jadikan dasar
`_dark` recipe.

---

## Tipografi

### Font family

| Peran | Family | Bukti |
|---|---|---|
| **Body** (default seluruh app) | **Nunito Sans** | [layout.tsx:35](src/app/layout.tsx#L35) — `Nunito.className` di `<body>`; [Fonts.ts:21](src/fonts/Fonts.ts#L21) `Nunito_Sans({ subsets: ["latin"] })` |
| **Heading / display** | **Aventa** (self-host) | Dipakai eksplisit per-elemen, bukan lewat utility heading. `AventaBlack` 19×: nav ([Header:163,180](src/components/organisms/Header.organism.tsx#L163)), trigger dropdown ([DropdownNavHeader:88](src/components/molecules/DropdownNavHeader.molecule.tsx#L88)), tombol wallet ([ConnectWalletBtn:103](src/components/molecules/ConnectWalletBtn.molecule.tsx#L103)). `AventaBold` 6× ([AnnouncementBanner:12](src/components/molecules/AnnouncementBanner.molecule.tsx#L12)), `AventaMedium` 4× ([Badge.atom](src/components/atoms/Badge.atom.tsx)), `AventaSemiBold` 2× |
| **Mono** | **Geist Mono** | [globals.css:12](src/app/globals.css#L12) `--font-mono: var(--font-geist-mono)`; variabel dipasang di [layout.tsx:16-19,36](src/app/layout.tsx#L16-L19). `font-mono` dipakai 12× (mis. [ConnectWalletBtn:264](src/components/molecules/ConnectWalletBtn.molecule.tsx#L264)) |
| Sans token (`--font-sans`) | Geist | [globals.css:11](src/app/globals.css#L11) → `--font-geist-sans` ([layout.tsx:11-14](src/app/layout.tsx#L11-L14)). **Terdaftar tapi tidak efektif** — utility `font-sans` nol kemunculan, dan `Nunito.className` menimpanya di `<body>` |

**Catatan:** [globals.css:52](src/app/globals.css#L52) menyetel
`body { font-family: Arial, Helvetica, sans-serif; }`. Aturan ini **mati** —
`Nunito.className` adalah selector class, jadi menang atas selector elemen.
Arial tidak pernah muncul.

### Cara dimuat

| Family | Metode | Sumber |
|---|---|---|
| Nunito Sans | `next/font/google` | [Fonts.ts:3,21](src/fonts/Fonts.ts#L21). Di-self-host otomatis oleh Next saat build — tidak ada request ke Google di runtime |
| Geist + Geist Mono | `next/font/google` | [layout.tsx:2,11-19](src/app/layout.tsx#L11-L19). Idem |
| Aventa | `next/font/local` (**self-host**) | [Fonts.ts:2,6-11](src/fonts/Fonts.ts#L6-L11). File di [src/fonts/](src/fonts/) |

**Tidak ada `<link>` ke Google Fonts** dan tidak ada `@font-face` manual di CSS.
**URL sumber: TIDAK ADA** — Aventa adalah font berlisensi yang di-commit ke repo,
bukan dari CDN publik. Nunito Sans/Geist secara nominal berasal dari Google Fonts
(`https://fonts.google.com/specimen/Nunito+Sans`,
`https://fonts.google.com/specimen/Geist`) tapi diambil pada saat build,
bukan dimuat dari URL saat runtime.

### File Aventa di repo

| File | Format | Diimpor? | Dipakai di komponen? |
|---|---|---|---|
| `Aventa_Black.ttf` | TTF | ✅ `AventaBlack` | ✅ 19× |
| `Aventa-Medium.woff2` | WOFF2 | ✅ `AventaMedium` | ✅ 4× |
| `Aventa_Semi_Bold.ttf` | TTF | ✅ `AventaSemiBold` | ✅ 2× |
| `Aventa_Bold.ttf` | TTF | ✅ `AventaBold` | ✅ 6× |
| `Aventa_Extra_Bold.ttf` | TTF | ✅ `AventaExtraBold` | ❌ tidak dipakai |
| `Aventa_Regular.ttf` | TTF | ✅ `AventaRegular` | ❌ tidak dipakai |
| `Aventa-Black.woff2` | WOFF2 | ❌ | ❌ (duplikat TTF) |
| `Aventa_Bold_Italic.ttf` | TTF | ❌ | ❌ |
| `Aventa_Extra_Bold_Italic.ttf` | TTF | ❌ | ❌ |
| `Aventa_Semi_Bold_Italic.ttf` | TTF | ❌ | ❌ |

### Bobot yang benar-benar dipakai

**Nunito Sans / Geist:** dimuat sebagai **variable font** — `Nunito_Sans()` dan
`Geist()` dipanggil **tanpa** opsi `weight` ([Fonts.ts:21](src/fonts/Fonts.ts#L21),
[layout.tsx:11-19](src/app/layout.tsx#L11-L19)), sehingga seluruh sumbu bobot
tersedia. Bobot yang dipakai lewat utility:

| Utility | Bobot CSS | Jumlah pemakaian |
|---|---|---|
| `font-bold` | 700 | 41 |
| `font-medium` | 500 | 28 |
| `font-semibold` | 600 | 8 |
| `font-black` | 900 | 5 |
| `font-extrabold` | 800 | 2 |
| `font-normal` | 400 | 1 |

**Aventa:** setiap berkas dimuat sebagai family terpisah lewat `localFont()`
**tanpa** deklarasi `weight`, jadi masing-masing terdaftar sebagai
`font-weight: normal` dan bobotnya melekat pada berkasnya. Bobot nominal yang
dipakai lewat pemilihan berkas: **Black (900), Bold (700), SemiBold (600),
Medium (500)**.

### Font yang diekspor tapi tidak dipakai

`OpenSans` (Open Sans) dan `ManropeFont` (Manrope) diimpor & diekspor di
[Fonts.ts:13-20](src/fonts/Fonts.ts#L13-L20) tapi **nol** pemakaian di komponen.
Keduanya masih ikut di-*bundle*. Jangan bawa ke Chakra.

---

## Border radius

Tailwind v4 tidak punya `borderRadius` kustom di proyek ini — `@theme` tidak
menyentuhnya sama sekali, jadi seluruh skala berasal dari default
`node_modules/tailwindcss/theme.css`:

| Token | rem | px |
|---|---|---|
| `rounded-xs` | 0.125rem | 2px |
| `rounded-sm` | 0.25rem | 4px |
| `rounded-md` | 0.375rem | 6px |
| `rounded-lg` | 0.5rem | 8px |
| `rounded-xl` | 0.75rem | 12px |
| `rounded-2xl` | 1rem | 16px |
| `rounded-3xl` | 1.5rem | 24px |
| `rounded-4xl` | 2rem | 32px |
| `rounded-full` | — | 9999px |

### Nilai default per komponen

| Komponen | Nilai | Bukti |
|---|---|---|
| **Tombol** — CTA header (wallet) | **8px** (`rounded-[8px]`) | [ConnectWalletBtn:88,106,188,209](src/components/molecules/ConnectWalletBtn.molecule.tsx#L88) |
| **Tombol** — segmented (NetworkSwitcher) | **9999px** (`rounded-full`) | [NetworkSwitcher:33,56](src/components/molecules/NetworkSwitcher.molecule.tsx#L33) |
| **Tombol** — pagination | **8px** (`rounded-lg`) | [Pagination:34](src/components/molecules/Pagination.molecule.tsx#L34) |
| **Tombol** — item dalam menu | **6px** (`rounded-md`) | [ConnectWalletBtn:123](src/components/molecules/ConnectWalletBtn.molecule.tsx#L123) |
| **Tombol** — `Button.atom` | 9999px (`rounded-full`) | [Button.atom:30,44](src/components/atoms/Button.atom.tsx#L30). ⚠️ komponen ini **tidak dipakai** di mana pun |
| **Tombol** — `RectangleButton` | **0px** (tanpa `rounded-*`) | [RectangleButton:32](src/components/atoms/RectangleButton.atom.tsx#L32). Sengaja bersudut tajam, hanya di footer |
| **Input** — search bar (bagian dalam) | **9999px** (`rounded-full`) | [SearchBar:90](src/components/molecules/SearchBar.molecule.tsx#L90) |
| **Input** — search bar (wrapper beranda) | **16px** (`rounded-2xl`) | [Homepage:46](src/components/organisms/Homepage.organism.tsx#L46) |
| **Input** — panel saran | **12px** (`rounded-[12px]`) | [SearchBar:117](src/components/molecules/SearchBar.molecule.tsx#L117) |
| **Kartu** — panel statistik | **32px** (`rounded-4xl`) | [InfoSection:319](src/components/molecules/InfoSection.molecule.tsx#L319) |
| **Kartu** — list beranda | **24px** (`rounded-3xl`) | [LatestBlocks:43](src/components/molecules/LatestBlocks.molecule.tsx#L43), [LatestTransactions:103](src/components/molecules/LatestTransactions.molecule.tsx#L103) |
| **Kartu** — panel detail | **4px** (`rounded`, = `rounded-sm`) | [BlockDetail:122,170](src/components/organisms/BlockDetail.organism.tsx#L122), [TokenDetail:386,475](src/components/organisms/TokenDetail.organism.tsx#L386), [ContractTokens:144,182,241](src/components/organisms/ContractTokens.organism.tsx#L144) |
| **Kartu** — dropdown / popover | **8px** (`rounded-lg`) | [ConnectWalletBtn:114,143,150,216](src/components/molecules/ConnectWalletBtn.molecule.tsx#L114) |
| **Kartu** — modal | **16px** (`rounded-2xl`) | [Modal:139](src/components/molecules/Modal.molecule.tsx#L139) |
| **Kartu** — Badge | **12px** (`rounded-xl`) | [Badge.atom](src/components/atoms/Badge.atom.tsx) |
| **Tooltip chart** | **12px** (`rounded-xl`) | [InfoSection:157](src/components/molecules/InfoSection.molecule.tsx#L157) |

Frekuensi keseluruhan: `rounded-full` 26×, `rounded-2xl` 10×, `rounded-md` 8×,
`rounded-lg` 8×, `rounded-3xl` 6×, `rounded-sm` 3×, `rounded-xl` 2×,
`rounded-4xl` 1×, `rounded-t` 1×.

**Tidak ada satu nilai radius default yang konsisten** untuk kartu — rentangnya
4px sampai 32px tergantung komponen. Kalau butuh satu angka untuk recipe Chakra:
**tombol 8px**, **input 9999px (pill)**, **kartu 24px** (paling sering pada
permukaan utama yang terlihat pengguna).

---

## Aset brand

### Logo sebagai komponen React (inline SVG) — jalur utama

Semua logo utama adalah komponen SVG inline dengan `fill="currentColor"`, jadi
**warnanya ikut warna teks induknya** dan tidak ada varian berkas terpisah untuk
mode terang/gelap.

| Komponen | File | viewBox | Dimensi render | Format |
|---|---|---|---|---|
| `NusametaLogo` | [src/components/atoms/icons/NusametaLogo.icon.tsx](src/components/atoms/icons/NusametaLogo.icon.tsx) | `0 0 32 32` | `width="1em" height="1em"` — diukur lewat `font-size`. Header: **32×32px** (`text-[32px]`, [Header:155](src/components/organisms/Header.organism.tsx#L155)); nav mobile: **24×24px** ([Header:59](src/components/organisms/Header.organism.tsx#L59)); footer: **16–20px** ([Footer:161,175](src/components/organisms/Footer.organism.tsx#L161)); disc di InfoSection: **20×20px** (`h-5 w-5`, [InfoSection:66](src/components/molecules/InfoSection.molecule.tsx#L66)) | SVG inline |
| `NagaraLogo` | [src/components/atoms/logos/nagara.logo.tsx](src/components/atoms/logos/nagara.logo.tsx) | `0 0 101 22` | `width`/`height` **wajib** sebagai prop (bukan `1em`). Dipakai di [Footer:176](src/components/organisms/Footer.organism.tsx#L176) | SVG inline |
| `NusametaTextLogo` | [src/components/atoms/logos/nusameta-text.logo.tsx](src/components/atoms/logos/nusameta-text.logo.tsx) | — | — | SVG inline |

Logo mode gelap ditangani lewat `currentColor` + varian utility, bukan berkas
kedua — mis. [Footer:161,165,175,179](src/components/organisms/Footer.organism.tsx#L161-L179)
`dark:text-neutral-100`.

Direktori [src/components/atoms/logos/](src/components/atoms/logos/) juga berisi
~18 logo pihak ketiga (Apple, Google, Facebook, Dana, Photoshop, Midjourney,
After Effects, Entri, NusaMarket, Nusa Studio, dan 6 logo media sosial). Bukan
aset brand Nagara — jangan dibawa ke design system.

### Aset raster & berkas statis

| File | Dimensi | Format | Ukuran | Peran | Varian light/dark |
|---|---|---|---|---|---|
| [public/art-home.png](public/art-home.png) | **491×345** | PNG | 230 KB | Ilustrasi hero beranda, di atas band `#F8F4F0` ([Homepage:33-39](src/components/organisms/Homepage.organism.tsx#L33-L39)) | TIDAK ADA — satu berkas |
| [public/img/nusameta-star.png](public/img/nusameta-star.png) | **32×32** | PNG | 2.0 KB | Dipakai di [CertificateDetails:151](src/components/organisms/CertificateDetails.organism.tsx#L151) | TIDAK ADA |
| [public/img/list.svg](public/img/list.svg) | **24×24** (`viewBox="0 0 24 24"`) | SVG | 909 B | Bullet list lewat CSS `before:bg-[url(...)]` ([CertificateDetails:228,231,234](src/components/organisms/CertificateDetails.organism.tsx#L228)) | TIDAK ADA |
| [src/app/favicon.ico](src/app/favicon.ico) | **32×32** | ⚠️ **PNG** (magic byte `89504E47`), meski berekstensi `.ico` | 922 B | Favicon (konvensi App Router Next.js) | TIDAK ADA |

### Aset boilerplate Next.js — bisa dihapus

Berkas berikut adalah sisa `create-next-app` dan **nol pemakaian** di `src/`:
[public/next.svg](public/next.svg) (1.4 KB),
[public/vercel.svg](public/vercel.svg) (128 B),
[public/file.svg](public/file.svg) (391 B),
[public/globe.svg](public/globe.svg) (1.0 KB),
[public/window.svg](public/window.svg) (385 B).

**Favicon-nya juga masih favicon default Next.js**, bukan ikon brand Nagara.

---

## Catatan & ketidakpastian

### Peran yang TIDAK ADA padanannya di proyek ini

| Peran | Status | Alasan |
|---|---|---|
| **Gradien area chart** | **TIDAK ADA** | Chart-nya `LineChart`+`Line`, tanpa `<Area>` atau `<linearGradient>`. Nol utility `bg-gradient-*`/`from-*`/`via-*`/`to-*` di seluruh `src/`. Satu-satunya `<linearGradient>` di repo ada di dalam logo Instagram |
| **Latar item navigasi aktif** | **TIDAK ADA** | Nav aktif ditandai garis bawah 4px merah + teks merah, tanpa latar ([Header:31](src/components/organisms/Header.organism.tsx#L31)) |
| **Komponen Tab** | **TIDAK ADA** | Tidak ada Tabs/TabList/TabPanel di codebase. Nilai di tabel diambil dari segmented control NetworkSwitcher sebagai padanan terdekat, dan saya tandai demikian |
| **Warna semantik: success / warning / error / info** | **TIDAK ADA sebagai token** | Tidak ada di `@theme`. Yang ada hanya hardcode & palet default TW: sukses `#62B816` (hardcode 3×), peringatan `amber-*` (default TW), error `#E31E26` atau `red-600` (dua jalur berbeda) |
| **Skala spacing kustom** | **TIDAK ADA** | `@theme` tidak menyentuh spacing — seluruhnya default Tailwind |
| **Skala shadow kustom** | **TIDAK ADA** | Default Tailwind. Dipakai: `shadow` 7×, `shadow-lg` 4×, `shadow-xl` 1×, `shadow-sm` 1×, `shadow-2xl` 1× |
| **Skala font-size kustom** | **TIDAK ADA** | Default Tailwind + banyak nilai arbitrer (`text-[11px]`, `text-[13px]`, `text-[14px]`, `text-[16px]`, `text-[32px]`, `text-[40px]`) |
| **Mode gelap yang utuh** | **TIDAK ADA** | Lihat bagian [Mode terang & gelap](#mode-terang--gelap) |
| **URL sumber font** | **TIDAK ADA** | Aventa self-host & berlisensi; Nunito Sans/Geist diambil saat build oleh `next/font`, bukan dari URL runtime |
| **Varian logo light/dark** | **TIDAK ADA** | Semua logo inline SVG `currentColor` — satu berkas, warna ikut teks |
| **Favicon brand** | **TIDAK ADA** | Masih favicon default Next.js |

### Peran yang saya tandai karena buktinya lemah atau bercabang

1. **Teks di atas tombol primary — dua nilai berbeda.** `text-white` (`#FFFFFF`)
   di [NetworkSwitcher:58](src/components/molecules/NetworkSwitcher.molecule.tsx#L58)
   vs `text-neutral-100` (`#F7F7F8`) di
   [InfoSection:65](src/components/molecules/InfoSection.molecule.tsx#L65).
   Keduanya di atas `bg-primaryRed-500`. Saya **tidak memilih** salah satu.
   Untuk Chakra, `#FFFFFF` lebih aman (kontras lebih tinggi, dan itu satu-satunya
   yang dipakai pada elemen yang benar-benar bisa diklik).

2. **"Tombol primary" tidak punya definisi tunggal.**
   [Button.atom.tsx](src/components/atoms/Button.atom.tsx) terlihat seperti tombol
   primary kanonik, tapi **nol pemakaian** di seluruh `src/` — dan isinya sudah
   tidak koheren: warna hover mengacu `orange-500` dan
   `primaryNeutral-600` (token yang tidak ada), sementara baris
   [44](src/components/atoms/Button.atom.tsx#L44) tanpa syarat menimpa semua
   varian dengan gaya biru. **Jangan pakai file ini sebagai sumber.** Yang
   benar-benar tampil ke pengguna: CTA header
   ([ConnectWalletBtn:88](src/components/molecules/ConnectWalletBtn.molecule.tsx#L88),
   outline `neutral-900`, radius 8px) dan segmen aktif merah di NetworkSwitcher.

3. **"Latar header" bukan warna solid.** `bg-black/5` =
   `rgba(0,0,0,0.05)` + `backdrop-blur-sm`
   ([Header:151](src/components/organisms/Header.organism.tsx#L151)). Nilai
   komposit `≈ #EBEBEC` yang saya sebutkan adalah **hasil hitungan saya** di atas
   `#F7F7F8`, bukan nilai yang tertulis di kode. Kalau Chakra butuh warna solid,
   pakai `#EBEBEC`; kalau bisa menjaga transparansi, pertahankan `rgba` +
   `backdrop-filter`.

4. **Warna ikon "utama" adalah kesimpulan, bukan token.** Setiap ikon memakai
   `fill="currentColor"`, jadi tidak ada warna ikon yang berdiri sendiri.
   `#3D3F44` (`neutral-600`) saya ambil karena itu warna yang paling sering
   di-set eksplisit pada pembungkus ikon
   ([Header:59,75,85,95,107](src/components/organisms/Header.organism.tsx#L59)).
   Bukan deklarasi desain.

5. **Teks utama: dua kandidat.** `--foreground: #171717` didefinisikan di
   [globals.css:5](src/app/globals.css#L5) tapi **tidak pernah dipakai** —
   `text-foreground` nol kemunculan. Warna teks yang nyata adalah
   `neutral-900` = `#1D1D1F`. Saya pakai yang nyata. `#171717` hanya
   nilai yatim.

6. **Latar halaman: `#F7F7F8`, bukan `#ffffff`.** Ini kesimpulan dari kaskade
   CSS, bukan dari satu baris eksplisit: `body{background:var(--background)}`
   ([globals.css:50](src/app/globals.css#L50)) menyetel `#ffffff`, tapi
   `bg-neutral-100` ([layout.tsx:36](src/app/layout.tsx#L36)) adalah selector
   class dengan spesifisitas lebih tinggi dan menang. **Saya tidak memverifikasi
   ini di browser** — kalau ada keraguan, cek warna komputasi `<body>` di devtools.

7. **Dua skala abu berjalan paralel.** Teks muted memakai `neutral-500`
   (`#797D86`, token proyek, 32×) **dan** `gray-500`
   (`#6A7282`, default Tailwind, 16×) untuk peran yang sama. Sama juga di
   permukaan tabel: [TableParts.atom.tsx](src/components/atoms/TableParts.atom.tsx)
   seluruhnya memakai `gray-*` default, sementara sisa app memakai `neutral-*`
   proyek. Saat memetakan ke Chakra, keduanya perlu dipilih jadi satu — dan itu
   **keputusan desain, bukan ekstraksi**.

8. **`neutral-50` bukan token proyek.** `@theme` mendefinisikan `neutral-100`
   sampai `neutral-900`; `bg-neutral-50` di
   [ConnectWalletBtn:262,269,285](src/components/molecules/ConnectWalletBtn.molecule.tsx#L262)
   diam-diam jatuh ke default Tailwind (`#FAFAFA`), bukan ke skala kustom.
   Kalau skala Chakra Anda mulai dari 50, jangan asumsikan ia sewarna keluarga
   `neutral` proyek ini.

### Class yang mengacu token yang tidak ada (dead class — jangan dipetakan)

Class-class ini muncul di komponen tapi **tidak terdefinisi** di
[globals.css](src/app/globals.css) (diverifikasi: nol kemunculan di file theme),
jadi Tailwind tidak menghasilkan CSS apa pun untuknya. Semua ini **tidak
berefek** dan tidak boleh dibawa ke Chakra:

| Class | Lokasi |
|---|---|
| `bg-primaryBlue-100` (5×), `text-primaryBlue-400`, `text-primaryBlue-100` | [Header:126](src/components/organisms/Header.organism.tsx#L126), [SearchBar:117](src/components/molecules/SearchBar.molecule.tsx#L117) |
| `hover:text-primaryNeutral-600` (2×), `bg-primaryNeutral-600` | [Button.atom:37,39](src/components/atoms/Button.atom.tsx#L37) |
| `ring-primary-500`, `border-primary-500`, `dark:focus:ring-primary-500` | [SearchBar:90](src/components/molecules/SearchBar.molecule.tsx#L90) |
| `border-main`, `focus:border-main` | [SearchBar:90](src/components/molecules/SearchBar.molecule.tsx#L90) |
| `text-blueGrey-500` | 1× |
| `border-secondaryGrey-500` | 1× |
| `max-w-page` | [Header:152](src/components/organisms/Header.organism.tsx#L152), [AnnouncementBanner:8](src/components/molecules/AnnouncementBanner.molecule.tsx#L8) — **utility layout yang rusak**: pembungkus header & banner tidak punya `max-width` sama sekali |

`max-w-page` bukan soal warna, tapi konsekuensinya nyata: lebar maksimum
container header/banner tidak pernah diterapkan. Layak diperbaiki terlepas dari
migrasi ini.

### Utang teknis yang relevan untuk migrasi

- **`Button.atom.tsx` tidak dipakai dan rusak.** Jangan jadikan basis recipe
  Button Chakra.
- **`#B2B2B2` dipakai 6×** sebagai border kartu di beranda, tapi tidak ada di
  theme. Nilai terdekat di theme adalah `neutral-400` = `#AFB2B7` (selisih ~1%,
  praktis tidak terlihat). Kandidat kuat untuk dikonsolidasi.
- **Warna chart sengaja diduplikasi** dari theme
  ([InfoSection:136-142](src/components/molecules/InfoSection.molecule.tsx#L136-L142)),
  dengan komentar eksplisit bahwa atribut SVG tidak bisa membaca utility
  Tailwind. Di Chakra v3, baca nilainya lewat `token()` supaya duplikasi ini
  hilang.
- **`--font-sans` (Geist) terdaftar tapi mati**, dan Open Sans + Manrope
  diekspor tanpa dipakai namun tetap ikut ter-*bundle*.
