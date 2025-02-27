/**
 * Helper utility to load Editor.md locale files
 */

export const loadEditorLocale = async (language = 'en') => {
  // First try to load from local files
  try {
    if (language === 'en') {
      const englishLocale = await import('./english-locale.js');
      if (typeof englishLocale.default === 'function') {
        englishLocale.default(window.editormd);
        return true;
      }
    }
    // Add other languages as needed
  } catch (localError) {
    console.warn(`Failed to load local ${language} locale:`, localError);
  }

  // If local loading fails, try CDN
  try {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = `https://cdn.jsdelivr.net/npm/editor.md@1.5.0/languages/${language}.js`;
      script.onload = () => {
        console.log(`Loaded ${language} locale from CDN`);
        resolve(true);
      };
      script.onerror = (err) => {
        console.error(`Failed to load ${language} locale from CDN:`, err);
        reject(err);
      };
      document.body.appendChild(script);
    });
  } catch (cdnError) {
    console.error(`Failed to load ${language} locale from CDN:`, cdnError);
    return false;
  }
};
