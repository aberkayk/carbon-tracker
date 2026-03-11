# Senior Frontend Developer Aday Beklentileri (TR)

## 1. Amaç
Bu doküman, BRD’de tanımlanan frontend ürününün geliştirilmesi için aday beklentilerini tanımlar.

Beklenti, prototip değil, üretim kalitesine yakın bir implementasyondur.

## 2. Referanslar
- BRD: `SR_FE_DEV_BRD_TR.md`
- Figma dosyası (ana link): `https://www.figma.com/design/ttptKCMGMKDnVtU0Yo2J7f/CW---Case-Study`

## 3. Zorunlu Teknoloji Gereksinimleri
- React zorunludur.
- TypeScript zorunludur.
- Sıkı tip güvenliği beklenir; `any` kullanımı minimum ve gerekçeli olmalıdır.
- Responsive geliştirme zorunludur: desktop, tablet, mobile.

## 4. Zorunlu Fonksiyonel Kapsam
- Adayın `SR_FE_DEV_BRD_TR.md` içinde tanımlanan tüm fonksiyonel gereksinimleri, iş kurallarını ve kabul kriterlerini eksiksiz implement etmesi beklenir.
- Aday, BRD gereksinimlerini geliştirirken Figma’daki etkileşim davranışı ve UI niyetini takip etmelidir.
- Belirsiz kalan bir nokta varsa aday bunu `README` içinde açıkça varsayım olarak dokümante etmelidir.

## 5. Veri Katmanı ve Kalıcılık Beklentisi
### 5.1 Minimum Kabul
- Local state + `localStorage` kalıcılığı

### 5.2 Plus
- Mock API katmanı (örnek: `json-server`, `MSW`, hafif Node servis)
- Veri erişim katmanının UI’dan ayrıştırılması

## 6. Mühendislik Kalitesi Beklentileri
### 6.1 Zorunlu
- Modüler ve sürdürülebilir bileşen mimarisi
- Özellikle hesaplama mantığının UI katmanından ayrıştırılması
- Sağlam form validasyonu ve açık hata yönetimi
- Kod kalitesi temel beklentileri:
  - Lint ve format altyapısı
  - Tutarlı klasör yapısı
  - Tekrar kullanılabilir UI pattern’leri

### 6.2 Opsiyonel (Plus)
- Boş/yükleniyor/hata durumlarının açıkça ele alınması

## 7. Test Beklentileri
### 7.1 Minimum Zorunlu
- Hesaplama mantığı için unit test
- Kritik bir kullanıcı akışı için en az bir integration test

### 7.2 Güçlü Tavsiye
- Add/Edit/Download akışları için ek integration testleri

### 7.3 Plus
- E2E testleri (örnek: Playwright/Cypress)

## 8. Teslimat ve Geliştirici Deneyimi Beklentileri
### 8.1 Zorunlu
- Net bir `README`:
  - Kurulum adımları
  - Çalıştırma adımları
  - Build adımları
  - Test adımları
  - Varsayımlar
  - Trade-off kararları
- Proje standart Node package manager komutlarıyla ayağa kalkmalıdır.

### 8.2 Plus
- Dockerize kurulum (`Dockerfile`, opsiyonel `docker-compose`)
- Lint/test/build için CI pipeline
- Deploy edilmiş preview linki

## 9. Değerlendirme Kriterleri
- BRD’ye karşı fonksiyonel kapsam tamlığı
- Etkileşim kurallarının doğruluğu
- UI sadakati ve responsive davranış
- Hesaplama mantığının doğruluğu ve tutarlılığı
- Kod kalitesi ve mimari kararlar
- Test kapsamı ve güvenilirlik
- Dokümantasyon ve geliştirici deneyimi

### 9.1 Ek Puan (Plus)
- Mock API mimarisi kalitesi
- Dockerization kalitesi
- E2E test kalitesi
- Üretim seviyesine yakın hata yönetimi ve gözlemlenebilirlik yaklaşımı
- Lorem/placeholder metinlerin aday tarafından anlamlı ürün metinleri ve tutarlı mikro metinlerle doldurulması

## 10. Teslim Checklist
- Kaynak kod repository
- BRD ve Figma ile uyumlu çalışan uygulama
- Kurulum/çalıştırma/build/test adımlarını içeren README
- Kısa mimari karar notu
- Test çalışma bilgisi ve sonuçları
