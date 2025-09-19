# Notes UI (Angular 17+)

Basit bir not uygulamasının **frontend** kısmı.  
Login → `/notes` yönlendirme → solda not listesi, sağda başlık + (basit) WYSIWYG alanı.  
REST API ile Spring Boot backend’e bağlanır.

## Özellikler (gereksinim eşlemesi)
- ✅ **Login** (Basic Auth) ve **2 kullanıcı desteği**
- ✅ **Giriş sonrası yönlendirme** → `/notes`
- ✅ **Not listesi** (solda) + **yeni/çıkış**
- ✅ **WYSIWYG editör** (kaydet/sil/güncelle)
- ✅ **REST ile haberleşme** (`GET / POST / PUT / DELETE`)
- ✅ **Sayfa koruması**: login yoksa `/notes`’a girilemez (auth guard)


## Gereksinimler
- Node 18+  
- Angular CLI (`npm i -g @angular/cli`)  
- Çalışan backend (varsayılan: `http://localhost:8080`)

## Kurulum & Çalıştırma
```bash
npm install
ng serve --port 4200
# Uygulama: http://localhost:4200
