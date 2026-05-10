const SB_URL = 'https://afetbwtnyheysfezrgns.supabase.co';
const SB_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFmZXRid3RueWhleXNmZXpyZ25zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY3NTExNTUsImV4cCI6MjA5MjMyNzE1NX0.yGary4tOciBQl4AGWVNKVKaBt4rQI7BH7ZZrwDlZHIo';
const SB_HEADERS = {
  'Content-Type':  'application/json',
  'apikey':        SB_KEY,
  'Authorization': `Bearer ${SB_KEY}`,
};

// HTMLエスケープ（XSS対策）
function esc(s){
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
}

// MyMemory翻訳APIの言語コード対応表
const MYMEMORY_LANG = {
  ja:'ja-JP', ko:'ko-KR', zh:'zh-CN', ar:'ar-SA', hi:'hi-IN', th:'th-TH',
  vi:'vi-VN', id:'id-ID', ms:'ms-MY',
  es:'es-ES', pt:'pt-BR', fr:'fr-FR', de:'de-DE', it:'it-IT', nl:'nl-NL',
  ru:'ru-RU', uk:'uk-UA', pl:'pl-PL', tr:'tr-TR', el:'el-GR', sv:'sv-SE',
};
