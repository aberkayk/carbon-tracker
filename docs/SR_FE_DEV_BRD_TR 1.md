# Climateware Carbon Travel Tracker - İş Gereksinimleri Dokümanı (BRD)

## 1. Doküman Kontrolü
- Ürün Adı: Climateware Carbon Travel Tracker
- Doküman Türü: Business Requirements Document (BRD)
- Versiyon: 2.0
- Tarih: 2026-02-11
- UI ve etkileşim doğruluk kaynağı: Figma dosyası `ttptKCMGMKDnVtU0Yo2J7f`

## 2. Yönetici Özeti
Climateware Carbon Travel Tracker, kullanıcıların uçuş bazlı taşıma verilerini kaydetmesini, bu verilerden karbon emisyonu ve parasal offset tutarlarını hesaplamasını, sonuçları özet ve detay seviyesinde incelemesini, gerekirse JSON formatında dışa aktarmasını sağlayan bir web ürünüdür.

Ürün; kimlik doğrulama, profil tercihleri, veri girişi, hesaplama, raporlama ve export süreçlerini tek akışta birleştirir. Deneyim masaüstü, tablet ve mobilde tutarlı olmak zorundadır.

## 3. İş Bağlamı
Kurumlar ve bireysel kullanıcılar seyahat kaynaklı karbon etkisini hızlı ve standart bir yöntemle ölçmek istemektedir. Manuel yöntemler hataya açıktır, izlenebilirlik düşüktür ve tekrar kullanılabilir çıktı üretmez.

Bu ürün şu iş problemlerini çözer:
- seyahat/emisyon verisinin standart formatta toplanması,
- hesaplamanın şeffaf ve tekrarlanabilir hale getirilmesi,
- özet ve detay görünümle karar desteği sağlanması,
- rapor çıktısının JSON ile paylaşılabilir hale gelmesi.

## 4. İş Hedefleri
- H-1: Kullanıcının güvenli şekilde kayıt, giriş ve hesap tercihi yönetimi yapabilmesi.
- H-2: Uçuş grupları için doğru ve izlenebilir emisyon/offset hesaplaması sağlanması.
- H-3: Otomatik özet ve export ile manuel raporlama süresinin düşürülmesi.
- H-4: Onaylı tasarım ile uyumlu, çoklu cihazda tutarlı bir deneyim sunulması.

## 5. Başarı Göstergeleri (Canlıya Alım Sonrası)
- BG-1: Oluşturulan uçuş gruplarının en az %90’ında veri girişinin eksiksiz olması.
- BG-2: Hesaplama kaynaklı kritik hata oranının %2’nin altında kalması.
- BG-3: Aktif kullanıcıların ilk 30 günde en az %40’ının JSON export kullanması.
- BG-4: Responsive uyumsuzluk nedeniyle açılan kritik defect sayısının release başına 5’in altında kalması.

## 6. Kapsam Tanımı

### 6.1 Kapsam Dahili
- Kayıt olma ve giriş yapma akışları.
- UI seviyesinde opsiyonel sosyal giriş butonları.
- Kilitli/kilitsiz profil düzenleme akışı.
- Dil seçimi ve profil aksiyon menüleri.
- Dinamik satır yapısıyla transportation grubu oluşturma.
- Konfigürasyon tabanlı emisyon ve tutar hesaplama.
- Amount kartı açılır alanında toplam kgCO2e'den türetilen eşdeğer etki metriklerinin hesaplanması.
- Dashboard özet kartları, geçmiş listesi, Details aksiyonundan açılan edit modalı, chevron aksiyonundan açılan detay overlay/paneli ve JSON export.
- Responsive davranış: desktop (`1920`), tablet (`1024`), mobile (`320`).

### 6.2 Kapsam Dışı
- Ödeme alma/checkout altyapısı.
- Zorunlu prod OAuth entegrasyonu.
- Regülasyon onaylı karbon sertifikasyon süreçleri.
- Çok kiracılı (multi-tenant) admin paneli.

## 7. Kullanıcılar ve Persona
- Birincil Persona: Sürdürülebilirlik analisti; seyahat emisyon verisini girer, kontrol eder, raporlar.
- İkincil Persona: Operasyon kullanıcısı; kayıt doğruluğunu takip eder, çıktı üretir.

## 8. Uçtan Uca Kullanıcı Akışı
1. Kullanıcı kayıt olur veya giriş yapar.
2. Dashboard’da güncel özet kartlarını görür.
3. Add Transportation modalını açar.
4. Grup adı ve bir veya birden fazla satır girer.
5. Sistem validasyon yapar ve kaydı oluşturur.
6. Sistem özet kartları ve satır toplamlarını yeniden hesaplar.
7. Kullanıcı Details aksiyonuna basar ve seçili grup için edit modalını açar.
8. Kullanıcı satırdaki chevron aksiyonuna basar ve detay overlay/panelini açar.
9. Kullanıcı Download ile JSON dışa aktarım alır.
10. Kullanıcı profil ekranında para birimi, dil ve bildirim tercihlerini yönetir.

## 9. Fonksiyonel Gereksinimler

## 9.1 Kimlik Doğrulama ve Oturum
- `FR-AUTH-01`: Sistem, First Name, Last Name, Email, Password, Terms alanlarıyla Sign Up formu sunmalıdır.
- `FR-AUTH-02`: Terms onayı olmadan kayıt tamamlanmamalıdır.
- `FR-AUTH-03`: Sistem, Email ve Password alanlarıyla Login formu sunmalıdır.
- `FR-AUTH-04`: Şifre alanlarında görünür/gizle davranışı bulunmalıdır.
- `FR-AUTH-05`: Auth ekranlarında Google ve Facebook aksiyon butonları görünür olmalıdır.
- `FR-AUTH-06`: Başarılı login sonrası kullanıcı Dashboard’a yönlendirilmelidir.
- `FR-AUTH-07`: Zorunlu alan ve e-posta format validasyonu uygulanmalıdır.
- `FR-AUTH-08`: Hatalar kullanıcıya net ve anlaşılır metinle gösterilmelidir.

## 9.2 Profil Yönetimi
- `FR-PROF-01`: Profil ekranı varsayılan olarak kilitli modda açılmalıdır.
- `FR-PROF-02`: Kilitli modda `Edit` aksiyonu ve kilit ikonu görünmelidir.
- `FR-PROF-03`: Edit aksiyonu `Edit Account?` modalını açmalı ve şifre doğrulaması istemelidir.
- `FR-PROF-04`: Doğrulama başarılıysa ekran kilitsiz moda geçmelidir.
- `FR-PROF-05`: Kilitsiz modda `Save` aksiyonu ve açık kilit ikonu görünmelidir.
- `FR-PROF-06`: Düzenlenebilir alanlar: first name, last name, email, password, currency.
- `FR-PROF-07`: Currency değişikliği dashboard’daki tüm parasal değerleri etkilemelidir.
- `FR-PROF-08`: Notification checkbox durumu kalıcı olarak saklanmalıdır.
- `FR-PROF-09`: Social connect/disconnect aksiyonları kullanıcı bağlantı durumunu güncellemelidir.
- `FR-PROF-10`: Header profil menüsü `Profile`, `Dashboard`, `Logout` öğelerini içermelidir.

## 9.3 Dashboard ve Geçmiş Listesi
- `FR-DASH-01`: Dashboard’da welcome başlığı ve açıklama metni bulunmalıdır.
- `FR-DASH-02`: `Share Statistics` aksiyonu bulunmalıdır.
- `FR-DASH-03`: Dashboard’da dört özet metrik görünmelidir: Amount, Distance, Total Transportation, Payment.
- `FR-DASH-04`: Amount kartında açılır/kapanır bilgi dropdown davranışı desteklenmelidir.
- `FR-DASH-05`: Geçmiş bölümünde grup bazlı satırlar amount/distance/weight ile listelenmelidir.
- `FR-DASH-06`: Her satırda `Download` ve `Details` aksiyonları bulunmalıdır.
- `FR-DASH-07`: Her satırdaki chevron aksiyonu detay overlay/panelini açıp kapatmalıdır.
- `FR-DASH-08`: Detay overlay/panelinde Date, From, To, Flight No, Distance, Weight alanları leg bazında görünmelidir.
- `FR-DASH-09`: Sayfalama (pagination) uygulanmalıdır.
- `FR-DASH-10`: `Add` aksiyonu Add Transportation modalını açmalıdır.
- `FR-DASH-11`: Amount dropdown, toplam emisyon (`totalEmissionKgCO2e`) üzerinden hesaplanan eşdeğer etki metriklerini göstermelidir.
- `FR-DASH-12`: Gösterilecek zorunlu eşdeğer metrik seti:
  - `equivalentKmDriven` => UI: `km driven`, birim: `km`
  - `equivalentSeaIceM3` => UI: `sea ice melt`, birim: `m3`
  - `equivalentLightbulbDays` => UI: `lightbulb usage`, birim: `days`
  - `equivalentBeefKg` => UI: `beef consumption`, birim: `kg`
- `FR-DASH-13`: Eşdeğer metrikler, toplam emisyon değiştiğinde anlık olarak yeniden hesaplanmalı ve güncellenmelidir.
- `FR-DASH-14`: Eşdeğer metrikler toplam kgCO2e değerinden algoritmik olarak üretilmelidir; sabit/placeholder değer kullanımı kabul edilmez.
- `FR-DASH-15`: Özet kart metrik eşlemesi aşağıdaki gibi olmalıdır:
  - `Amount = totalEmissionKgCO2e` (birim: `kgCO2e`)
  - `Distance = totalDistanceKm` (birim: `km`)
  - `Total Transportation = totalLegCount` (birim: `count`)
  - `Payment = totalPaymentInSelectedCurrency` (birim: seçili para birimi)
- `FR-DASH-16`: Geçmiş satır metrik eşlemesi aşağıdaki gibi olmalıdır:
  - `Distance = groupDistanceKm` (birim: `km`)
  - `Weight = groupWeightKg` (birim: `kg`)
  - `Amount = groupPaymentInSelectedCurrency` (birim: seçili para birimi)
- `FR-DASH-17`: UI tarafında metrik birimleri tutarlı gösterilmelidir (`kgCO2e`, `km`, `kg`, para birimi sembolü).

## 9.4 Add Transportation Data Modalı
- `FR-MOD-01`: Modal başlığı `Add Transportation Data` olmalıdır.
- `FR-MOD-02`: Grup seviyesinde `Name` alanı bulunmalıdır.
- `FR-MOD-03`: Satır alanları: From, To, Flight No, Date, Weight, Distance.
- `FR-MOD-04`: Date alanı date input/picker davranışı sunmalıdır.
- `FR-MOD-05`: Plus ile yeni satır ekleme desteklenmelidir.
- `FR-MOD-06`: Cross ile satır silme desteklenmelidir.
- `FR-MOD-07`: Grup başına en fazla 15 satır kuralı uygulanmalıdır.
- `FR-MOD-08`: 15 üstü ekleme engellenmeli ve kullanıcıya bilgilendirici uyarı verilmelidir.
- `FR-MOD-09`: Cancel modalı kaydetmeden kapatmalıdır.
- `FR-MOD-10`: Add, validasyon sonrası grup ve satırları kalıcı hale getirmelidir.

## 9.5 Edit Modal, Detay Overlay ve Export
- `FR-DET-01`: Details aksiyonu seçili grup için edit modalı açmalıdır.
- `FR-DET-02`: Edit modalı mevcut grup ve leg verisini doldurulmuş olarak açmalı ve güncellemeye izin vermelidir.
- `FR-DET-03`: Edit modalından kaydetme sonrası toplamlar yeniden hesaplanmalı ve dashboard değerleri güncellenmelidir.
- `FR-OVR-01`: Chevron aksiyonu seçili grup için detay overlay/paneli açmalıdır.
- `FR-OVR-02`: Overlay her satır için from/to/date/flightNo/distance/weight alanlarını göstermelidir.
- `FR-OVR-03`: Overlay açıkça kapatılabilir/daraltılabilir olmalıdır.
- `FR-EXP-01`: Download aksiyonu seçili veriyi JSON olarak dışa aktarmalıdır.
- `FR-EXP-02`: Export payload’ı grup meta bilgisi, satır listesi, toplamlar, para birimi ve zaman bilgisini içermelidir.

## 9.6 Navigasyon ve Dil
- `FR-NAV-01`: Dil seçici en az English ve Turkish desteklemelidir.
- `FR-NAV-02`: Aktif dil görsel olarak ayrıştırılmalıdır.
- `FR-NAV-03`: Mobil menü WEB/TABLET/MOBILE bağlantıları ve profil aksiyonlarını göstermelidir.
- `FR-NAV-04`: Header menüleri fare ve klavye ile kullanılabilir olmalıdır.

## 10. İş Kuralları

## 10.1 Veri Giriş Kuralları
- `BR-01`: Grup adı zorunludur.
- `BR-02`: Tüm satır alanları zorunludur.
- `BR-03`: Distance ve weight sayısal ve sıfırdan büyük olmalıdır.
- `BR-04`: Date geçerli tarih olmalıdır.
- `BR-05`: Flight number alfanümerik olabilir.

## 10.2 Hesaplama Kuralları
Hesaplama deterministik ve konfigürasyon odaklı olmalıdır.

- `itemEmissionKg = distanceKm * weightKg * emissionFactor`
- `itemAmountBaseCurrency = itemEmissionKg * basePricePerKg`
- `itemAmountInCurrency = itemAmountBaseCurrency * fxRate(baseCurrency, selectedCurrency)`
- `totalEmissionKgCO2e = sum(itemEmissionKg)`
- `totalDistanceKm = sum(distanceKm)`
- `totalLegCount = count(allLegs)`
- `totalPaymentInSelectedCurrency = sum(itemAmountInCurrency)`
- `groupDistanceKm = sum(groupLeg.distanceKm)`
- `groupWeightKg = sum(groupLeg.weightKg)`
- `groupPaymentInSelectedCurrency = sum(groupLeg.itemAmountInCurrency)`

Amount kartı eşdeğer etki formülleri (toplam emisyon bazlı):
- `equivalentKmDriven = totalEmissionKgCO2e * kmDrivenPerKgCo2e`
- `equivalentSeaIceM3 = totalEmissionKgCO2e * seaIceM3PerKgCo2e`
- `equivalentLightbulbDays = totalEmissionKgCO2e * lightbulbDaysPerKgCo2e`
- `equivalentBeefKg = totalEmissionKgCO2e * beefKgPerKgCo2e`

Varsayılanlar:
- `baseCurrency = EUR`
- `basePricePerKg = 0.50` (`baseCurrency` cinsinden, yani `0.50 EUR` / kgCO2e)
- `emissionFactor = 0.000012` (birim: `kgCO2e / (kg * km)`)
- `fxRate = baseCurrency'den hedef para birimine dönüşüm sağlayan konfigüre edilebilir kur tablosu`
- `kmDrivenPerKgCo2e = 0.12823`
- `seaIceM3PerKgCo2e = 0.00008985`
- `lightbulbDaysPerKgCo2e = 0.10724`
- `beefKgPerKgCo2e = 0.00089883`

Toplama kuralları:
- Grup toplamı, grup içi satır toplamıdır.
- Dashboard toplamı, tüm grupların toplamıdır.

Format kuralları:
- Amount değerleri 2 ondalık gösterilir.
- Distance ve weight normalize ondalık formatta gösterilir.
- Para birimi sembolü ve sayı ayracı seçili locale/currency ile uyumlu olmalıdır.
- Amount kartı (`totalEmissionKgCO2e`) `kgCO2e` birimiyle gösterilmelidir.
- Payment değerleri seçili para birimi sembolü/kodu ile gösterilmelidir.
- Eşdeğer etki metrikleri için yuvarlama/gösterim kuralları:
  - `km driven`: `0` ondalık (birim: `km`)
  - `sea ice melt`: `2` ondalık (birim: `m3`)
  - `lightbulb usage`: `0` ondalık (birim: `days`)
  - `beef consumption`: `2` ondalık (birim: `kg`)

## 11. Veri Modeli Gereksinimleri

```ts
interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  passwordMasked: string;
  currency: string;
  language: string;
  notificationOptIn: boolean;
  social: {
    googleConnected: boolean;
    facebookConnected: boolean;
  };
}

interface TripLeg {
  id: string;
  groupId: string;
  from: string;
  to: string;
  flightNo: string;
  date: string;
  weightKg: number;
  distanceKm: number;
  emissionKg: number;
  amount: number;
}

interface TripGroup {
  id: string;
  name: string;
  legs: TripLeg[];
  totals: {
    distanceKm: number;
    weightKg: number;
    emissionKg: number;
    amount: number;
  };
  createdAt: string;
  updatedAt: string;
}

interface CalculationConfig {
  baseCurrency: string;
  basePricePerKg: number;
  emissionFactor: number;
  fxRates: Record<string, number>;
  equivalencyFactors: {
    kmDrivenPerKgCo2e: number;
    seaIceM3PerKgCo2e: number;
    lightbulbDaysPerKgCo2e: number;
    beefKgPerKgCo2e: number;
  };
}
```

## 12. Fonksiyonel Olmayan Gereksinimler

## 12.1 Performans
- `NFR-P-01`: Add/Edit modal açma, chevron ile overlay görüntüleme ve sayfalama gibi temel etkileşimlerde algılanabilir gecikme olmamalıdır.
- `NFR-P-02`: Kayıt sonrası yeniden hesaplama kullanıcı etkileşimini bloklamayacak sürede tamamlanmalıdır.

## 12.2 Güvenilirlik
- `NFR-R-01`: Geçersiz veri kalıcı kayda dönüşmemelidir.
- `NFR-R-02`: Hesaplama hatasında açık hata durumu gösterilmeli, bozuk toplamlar sunulmamalıdır.

## 12.3 Kullanılabilirlik ve Erişilebilirlik
- `NFR-UX-01`: Form kontrollerinde label ve net validasyon mesajı bulunmalıdır.
- `NFR-UX-02`: İkon bazlı kontroller erişilebilir isim taşımalıdır.
- `NFR-UX-03`: Modal odak yönetimi ve klavye navigasyonu sağlanmalıdır.

## 12.4 Bakım Kolaylığı
- `NFR-M-01`: Hesaplama mantığı UI katmanından ayrıştırılmalıdır.
- `NFR-M-02`: State geçişleri öngörülebilir ve testlenebilir olmalıdır.

## 13. Responsive Deneyim Gereksinimleri

### Desktop (1920)
- Tablo ağırlıklı dashboard listesi.
- Chevron ile açılan detay overlay/panel gösterimi.
- Tam header navigasyonu ve hesap aksiyonları.

### Tablet (1024)
- Kart bazlı geçmiş listesi, fonksiyonel parity korunarak.
- Özet kart hiyerarşisi korunur.
- Alan boşlukları ve tipografi breakpoint’e göre optimize edilir.

### Mobile (320)
- Auth/profil/dashboard akışları tek kolon stacked düzende.
- Geçmiş kartları kompakt aksiyonlarla sunulur.
- PREV/NEXT tabanlı sayfalama uygulanır.
- Menü ve dil seçimi overlay yapısında çalışır.

## 14. Dış Arayüzler ve Export Kontratı
JSON export minimum yapısı:

```json
{
  "groupId": "string",
  "groupName": "string",
  "baseCurrency": "EUR",
  "currency": "EUR",
  "totals": {
    "distanceKm": 0,
    "weightKg": 0,
    "emissionKg": 0,
    "amount": 0
  },
  "equivalents": {
    "kmDriven": 0,
    "seaIceM3": 0,
    "lightbulbDays": 0,
    "beefKg": 0
  },
  "legs": [
    {
      "id": "string",
      "from": "string",
      "to": "string",
      "flightNo": "string",
      "date": "2026-02-11",
      "distanceKm": 0,
      "weightKg": 0,
      "emissionKg": 0,
      "amount": 0
    }
  ],
  "exportedAt": "2026-02-11T12:00:00.000Z"
}
```

## 15. Kabul Kriterleri
- KK-1: Kullanıcı kayıt ve giriş akışlarını validasyonla tamamlayabilmelidir.
- KK-2: Kullanıcı grup oluşturup grup başına en fazla 15 satır ekleyebilmelidir.
- KK-3: Emisyon ve tutar değerleri hem satır hem özet seviyesinde doğru görünmelidir.
- KK-4: Details aksiyonu edit modalını dolu veriyle açmalıdır.
- KK-5: Edit modalından kaydetme sonrası dashboard toplamları yeniden hesaplanmalıdır.
- KK-6: Chevron aksiyonu seçili grup için leg detay overlay/panelini açmalıdır.
- KK-7: Download aksiyonu geçerli JSON payload üretmelidir.
- KK-8: Currency değişimi tüm parasal alanları yeniden hesaplamalıdır.
- KK-9: Profile lock/unlock akışı doğrulama adımını zorunlu tutmalıdır.
- KK-10: Ürün davranışı desktop, tablet, mobile’da fonksiyonel olarak tutarlı olmalıdır.
- KK-11: Amount dropdown, toplam kgCO2e değerinden eşdeğer etki metriklerini tanımlı çarpanlar ve format kurallarıyla üretmelidir.
- KK-12: Amount dropdown değerleri hesaplama mantığıyla üretilmeli, statik placeholder metin olmamalıdır.

## 16. Riskler ve Azaltım Planı
- RSK-1: Formül yorum farklılığı nedeniyle tutarsız sonuçlar.
- Azaltım: Formül, sabitler ve kurallar tek konfigürasyon kaynağında merkezileştirilir.
- RSK-2: Locale/currency format farklılıkları.
- Azaltım: Locale-aware formatlama utility’leri ve test matrisi uygulanır.
- RSK-3: Responsive tasarım sapmaları.
- Azaltım: Breakpoint bazlı QA checklist Figma frame’leriyle yürütülür.

## 17. Varsayımlar ve Bağımlılıklar
- VAR-1: Figma ekranları ürün için onaylı görsel/etkileşim referansıdır.
- VAR-2: `baseCurrency`, `basePricePerKg`, `emissionFactor`, `fxRates`, `equivalencyFactors` runtime’da sağlanır.
- VAR-3: Sosyal login entegrasyonu için harici kimlik bilgileri verilmezse UI-level davranış yeterlidir.

## 18. Yayına Hazırlık Kontrol Listesi
- YH-1: Tüm fonksiyonel gereksinimler kabul testinden geçti.
- YH-2: Cihaz kırılımları için responsive QA tamamlandı.
- YH-3: JSON export şema uyumluluğu doğrulandı.
- YH-4: Hata, boş ve yükleme durumları test edildi.
- YH-5: Erişilebilirlik smoke kontrolleri tamamlandı.
