export function getLocalStorageKeywords() {
   const keywords = localStorage.getItem('keywords');

   return keywords || '';
}
