# Cache Solution untuk Portfolio Website

## Masalah yang Diperbaiki

Website mengalami masalah caching yang sangat agresif, sehingga perubahan tidak terlihat setelah reload.

## Solusi yang Diterapkan

### 1. Service Worker Update

- **Versioning**: Cache name diubah dari `portfolio-v1` ke `portfolio-v2.0.1`
- **Network First Strategy**: HTML files menggunakan network-first strategy
- **Cache Invalidation**: Automatic cache clearing untuk old versions
- **Skip Waiting**: Force activation untuk service worker baru

### 2. Cache Control Headers

- **HTML Meta Tags**: Added no-cache headers untuk HTML
- **Versioned Assets**: CSS dan JS files dengan versioning (`?v=2.0.1`)
- **Server Headers**: `.htaccess` file untuk Apache server

### 3. Development Tools

- **Cache Clear Button**: Button untuk clear cache di localhost
- **Auto Update Detection**: Automatic detection untuk service worker updates
- **Console Logging**: Better logging untuk debugging

## Cara Menggunakan

### Untuk Development:

1. Buka website di browser
2. Jika di localhost, akan ada tombol "Clear Cache" di pojok kanan atas
3. Klik tombol tersebut untuk force clear cache

### Untuk Production:

1. Deploy website dengan file-file yang sudah diupdate
2. Browser akan otomatis detect service worker update
3. Page akan otomatis reload tanpa notifikasi mengganggu

### Manual Cache Clear:

```javascript
// Di browser console
if ("serviceWorker" in navigator) {
	navigator.serviceWorker.getRegistrations().then((registrations) => {
		registrations.forEach((registration) => {
			registration.unregister();
		});
	});
}

// Clear browser cache
if ("caches" in window) {
	caches.keys().then((names) => {
		names.forEach((name) => {
			caches.delete(name);
		});
	});
}
```

## File yang Dimodifikasi

- `sw.js` - Service Worker dengan improved caching strategy
- `index.html` - Added cache control meta tags dan versioning
- `.htaccess` - Server-side cache control
- `manifest.json` - PWA manifest untuk better caching

## Testing

1. Deploy website
2. Buka di browser
3. Lakukan perubahan pada HTML/CSS/JS
4. Reload page - perubahan harus terlihat
5. Jika masih cached, gunakan hard refresh (Ctrl+F5 / Cmd+Shift+R)

## Troubleshooting

Jika masih ada masalah caching:

1. Check browser developer tools > Application > Service Workers
2. Unregister service worker
3. Clear browser cache
4. Reload page
