import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function SEO({ title, description, keywords }) {
  const location = useLocation();

  useEffect(() => {
    // 1. Update Title Tag
    document.title = title ? title : 'Jual Akun Premium Murah & Terpercaya';

    // 2. Update Meta Description
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', description || 'Jual akun premium murah dan bergaransi penuh. Dapatkan akun Spotify, Netflix, Canva, Youtube Premium, dll.');
    }

    // 3. Update Meta Keywords
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', keywords || 'jual akun premium, akun netflix murah, spotify premium bergaransi, canva pro murah, youtube premium murah, akun premium murah');
    }

    // 4. Update Open Graph (OG) Meta Tags (for WhatsApp/Social Media preview)
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', title || 'Jual Akun Premium Murah & Terpercaya');

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', description || 'Jual akun premium murah dan bergaransi penuh.');

    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.setAttribute('content', window.location.href);

    // 5. Update/Create Canonical Link Tag
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', window.location.href);

  }, [title, description, keywords, location]);

  return null;
}
