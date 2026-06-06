// Converts romaji text to hiragana
const ROMAJI_MAP = [
  // Double consonants (っ)
  ['cchi', 'っち'], ['kki', 'っき'], ['kka', 'っか'], ['kku', 'っく'], ['kke', 'っけ'], ['kko', 'っこ'],
  ['sshi', 'っし'], ['ssa', 'っさ'], ['ssu', 'っす'], ['sse', 'っせ'], ['sso', 'っそ'],
  ['tta', 'った'], ['tti', 'っち'], ['ttu', 'っつ'], ['tte', 'って'], ['tto', 'っと'],
  ['ppi', 'っぴ'], ['ppa', 'っぱ'], ['ppu', 'っぷ'], ['ppe', 'っぺ'], ['ppo', 'っぽ'],

  // Multi-char combinations
  ['sha', 'しゃ'], ['shi', 'し'], ['shu', 'しゅ'], ['sho', 'しょ'],
  ['chi', 'ち'], ['cha', 'ちゃ'], ['chu', 'ちゅ'], ['cho', 'ちょ'],
  ['tsu', 'つ'],
  ['kya', 'きゃ'], ['kyu', 'きゅ'], ['kyo', 'きょ'],
  ['nya', 'にゃ'], ['nyu', 'にゅ'], ['nyo', 'にょ'],
  ['hya', 'ひゃ'], ['hyu', 'ひゅ'], ['hyo', 'ひょ'],
  ['mya', 'みゃ'], ['myu', 'みゅ'], ['myo', 'みょ'],
  ['rya', 'りゃ'], ['ryu', 'りゅ'], ['ryo', 'りょ'],
  ['gya', 'ぎゃ'], ['gyu', 'ぎゅ'], ['gyo', 'ぎょ'],
  ['bya', 'びゃ'], ['byu', 'びゅ'], ['byo', 'びょ'],
  ['pya', 'ぴゃ'], ['pyu', 'ぴゅ'], ['pyo', 'ぴょ'],
  ['ja', 'じゃ'], ['ju', 'じゅ'], ['jo', 'じょ'],

  // Two-char
  ['ka', 'か'], ['ki', 'き'], ['ku', 'く'], ['ke', 'け'], ['ko', 'こ'],
  ['sa', 'さ'], ['si', 'し'], ['su', 'す'], ['se', 'せ'], ['so', 'そ'],
  ['ta', 'た'], ['ti', 'ち'], ['tu', 'つ'], ['te', 'て'], ['to', 'と'],
  ['na', 'な'], ['ni', 'に'], ['nu', 'ぬ'], ['ne', 'ね'], ['no', 'の'],
  ['ha', 'は'], ['hi', 'ひ'], ['hu', 'ふ'], ['he', 'へ'], ['ho', 'ほ'],
  ['fu', 'ふ'],
  ['ma', 'ま'], ['mi', 'み'], ['mu', 'む'], ['me', 'め'], ['mo', 'も'],
  ['ya', 'や'], ['yu', 'ゆ'], ['yo', 'よ'],
  ['ra', 'ら'], ['ri', 'り'], ['ru', 'る'], ['re', 'れ'], ['ro', 'ろ'],
  ['wa', 'わ'], ['wi', 'ゐ'], ['we', 'ゑ'], ['wo', 'を'],
  ['ga', 'が'], ['gi', 'ぎ'], ['gu', 'ぐ'], ['ge', 'げ'], ['go', 'ご'],
  ['za', 'ざ'], ['ji', 'じ'], ['zu', 'ず'], ['ze', 'ぜ'], ['zo', 'ぞ'],
  ['da', 'だ'], ['di', 'ぢ'], ['du', 'づ'], ['de', 'で'], ['do', 'ど'],
  ['ba', 'ば'], ['bi', 'び'], ['bu', 'ぶ'], ['be', 'べ'], ['bo', 'ぼ'],
  ['pa', 'ぱ'], ['pi', 'ぴ'], ['pu', 'ぷ'], ['pe', 'ぺ'], ['po', 'ぽ'],

  // Single vowels (last)
  ['a', 'あ'], ['i', 'い'], ['u', 'う'], ['e', 'え'], ['o', 'お'],
  ['n', 'ん'],
];

export function romajiToHiragana(romaji) {
  if (!romaji) return '';

  // Take only the first reading if there are alternatives
  const primary = romaji.split('/')[0].trim().toLowerCase();
  let result = '';
  let i = 0;

  while (i < primary.length) {
    if (primary[i] === ' ') { i++; continue; }

    // Handle 'n' before consonant or end of string
    if (primary[i] === 'n' && i + 1 < primary.length) {
      const next = primary[i + 1];
      if (!'aiueoyn'.includes(next)) {
        result += 'ん';
        i++;
        continue;
      }
    }

    let matched = false;
    for (const [rom, hira] of ROMAJI_MAP) {
      if (primary.startsWith(rom, i)) {
        result += hira;
        i += rom.length;
        matched = true;
        break;
      }
    }

    if (!matched) i++; // skip unrecognized chars
  }

  return result;
}

// Check if text contains kanji (CJK Unified Ideographs)
export function containsKanji(text) {
  return /[\u4e00-\u9faf\u3400-\u4dbf]/.test(text);
}
