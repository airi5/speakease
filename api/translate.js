// /api/translate.js
// Vercel Serverless Function。ブラウザから直接 Azure Translator を呼ばず、ここを経由させて
// APIキーをサーバー側だけに隠す。Vercel の Environment Variables に次の2つを設定しておく:
//   AZURE_TRANSLATOR_KEY    … Azure の「キー1」
//   AZURE_TRANSLATOR_REGION … 「場所/リージョン」の値（例: japaneast）
//
// 使い方（POST, JSON）:
//   翻訳:  { text, targetLang, from? }          → { translatedText }       （fromの既定は 'en'）
//   辞書:  { mode:'lookup', text, from }        → { candidates:[{word,pos}], fallback:bool }
//          （母国語の単語 → 英単語の候補。辞書が未対応の言語は通常翻訳1語にフォールバック）

const AZURE_ENDPOINT = 'https://api.cognitive.microsofttranslator.com';

function azureHeaders(key, region){
  return {
    'Ocp-Apim-Subscription-Key': key,
    'Ocp-Apim-Subscription-Region': region,
    'Content-Type': 'application/json',
  };
}

async function azureTranslate(text, from, to, key, region){
  const url = `${AZURE_ENDPOINT}/translate?api-version=3.0&from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}`;
  const r = await fetch(url, { method:'POST', headers: azureHeaders(key, region), body: JSON.stringify([{ Text: text }]) });
  if(!r.ok){
    console.error('Azure translate error:', r.status, await r.text());
    return null;
  }
  const d = await r.json();
  return d?.[0]?.translations?.[0]?.text || null;
}

async function azureLookup(text, from, key, region){
  const url = `${AZURE_ENDPOINT}/dictionary/lookup?api-version=3.0&from=${encodeURIComponent(from)}&to=en`;
  const r = await fetch(url, { method:'POST', headers: azureHeaders(key, region), body: JSON.stringify([{ Text: text }]) });
  if(!r.ok){
    // 辞書が未対応の言語ペアは 400 などが返る。呼び出し側でフォールバックする
    console.error('Azure lookup error:', r.status, await r.text());
    return [];
  }
  const d = await r.json();
  const tr = d?.[0]?.translations || [];
  return tr.map(x => ({ word: x.displayTarget || x.normalizedTarget, pos: x.posTag || '' }));
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const { text, targetLang, from, mode } = req.body || {};
  if (!text || (mode !== 'lookup' && !targetLang) || (mode === 'lookup' && !from)) {
    res.status(400).json({ error: 'missing parameters' });
    return;
  }
  if (String(text).length > 500) {
    res.status(400).json({ error: 'text too long' });
    return;
  }

  const KEY = process.env.AZURE_TRANSLATOR_KEY;
  const REGION = process.env.AZURE_TRANSLATOR_REGION;
  if (!KEY || !REGION) {
    console.error('Missing AZURE_TRANSLATOR_KEY / AZURE_TRANSLATOR_REGION env vars');
    res.status(500).json({ error: 'Server is not configured for translation' });
    return;
  }

  try {
    if (mode === 'lookup') {
      let list = await azureLookup(text, from, KEY, REGION);
      let fallback = false;
      if (!list.length) {
        const one = await azureTranslate(text, from, 'en', KEY, REGION);
        if (one) { list = [{ word: one, pos: '' }]; fallback = true; }
      }
      // 重複（大文字小文字違い）を除いて最大6件
      const seen = new Set();
      const candidates = [];
      for (const c of list) {
        const w = String(c.word || '').trim();
        const k = w.toLowerCase();
        if (!w || seen.has(k)) continue;
        seen.add(k);
        candidates.push({ word: w, pos: c.pos });
        if (candidates.length >= 6) break;
      }
      if (!candidates.length) { res.status(502).json({ error: 'No result' }); return; }
      res.status(200).json({ candidates, fallback });
      return;
    }

    const translated = await azureTranslate(text, from || 'en', targetLang, KEY, REGION);
    if (!translated) { res.status(502).json({ error: 'No translation returned' }); return; }
    res.status(200).json({ translatedText: translated });
  } catch (err) {
    console.error('translate handler error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
