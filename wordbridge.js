// =====================================================================
// WordBridge — 話題(TOPIC_CARDS)と単語(WORD_DB)にレベルタグを付与した版
// レベル: 1 = 初級 / 2 = 中級 / 3 = 上級
// 話題レベルと単語レベルは完全に独立して選択できる
// =====================================================================

const LEVELS = ['beginner', 'intermediate', 'advanced'];
const LEVEL_LABEL = { beginner: '初級', intermediate: '中級', advanced: '上級' };
// 単語レベルは数値(1/2/3)で管理。話題レベルの文字列と対応させるためのマップ
const LEVEL_NUM = { beginner: 1, intermediate: 2, advanced: 3 };

// ---------------------------------------------------------------------
// トピックごとの単語データベース
// 各単語に lvl: 1|2|3 を付与
// ---------------------------------------------------------------------
const WORD_DB = {
  default: [
    {w:'really',jp:'本当に',lvl:1},{w:'maybe',jp:'たぶん',lvl:1},{w:'I think',jp:'〜だと思う',lvl:1},
    {w:'me too',jp:'私も',lvl:1},{w:'interesting',jp:'面白い',lvl:1},{w:'great',jp:'いいですね',lvl:1},
    {w:'how about you?',jp:'あなたは？',lvl:1},{w:'that sounds fun',jp:'楽しそう',lvl:1},
    {w:'I see',jp:'なるほど',lvl:1},{w:'tell me more',jp:'もっと教えて',lvl:1},
    {w:'same here',jp:'私も同じ',lvl:1},{w:'I agree',jp:'同感です',lvl:2},
    {w:'no way!',jp:'まさか！',lvl:1},{w:'that\'s cool',jp:'かっこいい',lvl:1},
    {w:'I\'m not sure',jp:'よくわからない',lvl:1},{w:'actually',jp:'実は',lvl:2},
    {w:'for example',jp:'例えば',lvl:2},{w:'in my opinion',jp:'私の意見では',lvl:2},
    {w:'to be honest',jp:'正直に言うと',lvl:2},{w:'by the way',jp:'ところで',lvl:2},
    {w:'that reminds me',jp:'それで思い出した',lvl:3},{w:'come to think of it',jp:'考えてみると',lvl:3},
  ],
  hobby: [
    {w:'drawing',jp:'絵を描く',lvl:1},{w:'painting',jp:'絵画',lvl:1},{w:'sketching',jp:'スケッチ',lvl:2},
    {w:'watercolor',jp:'水彩画',lvl:2},{w:'illustration',jp:'イラスト',lvl:2},{w:'calligraphy',jp:'書道',lvl:2},
    {w:'origami',jp:'折り紙',lvl:1},{w:'pottery',jp:'陶芸',lvl:2},{w:'sculpture',jp:'彫刻',lvl:3},
    {w:'music',jp:'音楽',lvl:1},{w:'guitar',jp:'ギター',lvl:1},{w:'piano',jp:'ピアノ',lvl:1},
    {w:'violin',jp:'バイオリン',lvl:1},{w:'drums',jp:'ドラム',lvl:1},{w:'bass',jp:'ベース',lvl:2},
    {w:'reading',jp:'読書',lvl:1},{w:'novel',jp:'小説',lvl:2},{w:'manga',jp:'漫画',lvl:1},
    {w:'comic book',jp:'コミック',lvl:1},{w:'poetry',jp:'詩',lvl:2},{w:'writing',jp:'文章を書く',lvl:1},
    {w:'cooking',jp:'料理',lvl:1},{w:'baking',jp:'お菓子作り',lvl:1},{w:'gaming',jp:'ゲーム',lvl:1},
    {w:'board game',jp:'ボードゲーム',lvl:1},{w:'traveling',jp:'旅行',lvl:1},{w:'photography',jp:'写真',lvl:1},
    {w:'hiking',jp:'ハイキング',lvl:1},{w:'cycling',jp:'サイクリング',lvl:1},{w:'camping',jp:'キャンプ',lvl:1},
    {w:'dancing',jp:'ダンス',lvl:1},{w:'singing',jp:'歌う',lvl:1},{w:'crafting',jp:'工作',lvl:2},
    {w:'knitting',jp:'編み物',lvl:2},{w:'sewing',jp:'裁縫',lvl:2},{w:'gardening',jp:'ガーデニング',lvl:2},
    {w:'fishing',jp:'釣り',lvl:1},{w:'collecting',jp:'コレクション',lvl:2},{w:'yoga',jp:'ヨガ',lvl:1},
    {w:'meditation',jp:'瞑想',lvl:2},{w:'since childhood',jp:'子どもの頃から',lvl:2},
    {w:'recently started',jp:'最近始めた',lvl:2},{w:'really into',jp:'はまっている',lvl:2},
    {w:'spend time',jp:'時間を使う',lvl:2},{w:'relaxing',jp:'リラックスする',lvl:1},
    {w:'a way to unwind',jp:'息抜きの方法',lvl:3},{w:'niche interest',jp:'マニアックな趣味',lvl:3},
    {w:'therapeutic',jp:'癒しになる',lvl:3},{w:'meditative',jp:'瞑想的な',lvl:3},
    {w:'unwind',jp:'ゆっくりする',lvl:3},{w:'immersive',jp:'没頭できる',lvl:3},{w:'craftsmanship',jp:'職人技',lvl:3},{w:'niche community',jp:'マニアックなコミュニティ',lvl:3},{w:'muscle memory',jp:'体で覚えた感覚',lvl:3},{w:'flow state',jp:'集中しきった状態',lvl:3},
    {w:'skillful',jp:'熟練した',lvl:2},{w:'dedicated',jp:'熱心な',lvl:2},
    {w:'artistic expression',jp:'芸術的表現',lvl:3},{w:'creative outlet',jp:'創造的なはけ口',lvl:3},{w:'mastery',jp:'熟達',lvl:3},{w:'disciplined practice',jp:'規律ある練習',lvl:3},{w:'self-expression',jp:'自己表現',lvl:3},{w:'passion project',jp:'情熱を注ぐプロジェクト',lvl:3},{w:'skill acquisition',jp:'技術の習得',lvl:3},{w:'aesthetic sense',jp:'美的センス',lvl:3},{w:'dedicated hobbyist',jp:'熱心な愛好家',lvl:3},
  ],
  food: [
    {w:'delicious',jp:'美味しい',lvl:1},{w:'spicy',jp:'辛い',lvl:1},{w:'sweet',jp:'甘い',lvl:1},
    {w:'salty',jp:'しょっぱい',lvl:1},{w:'sour',jp:'酸っぱい',lvl:1},{w:'bitter',jp:'苦い',lvl:2},
    {w:'crispy',jp:'サクサク',lvl:2},{w:'chewy',jp:'もちもち',lvl:2},{w:'creamy',jp:'クリーミー',lvl:2},
    {w:'sushi',jp:'寿司',lvl:1},{w:'ramen',jp:'ラーメン',lvl:1},{w:'tempura',jp:'天ぷら',lvl:1},
    {w:'udon',jp:'うどん',lvl:1},{w:'soba',jp:'そば',lvl:1},{w:'onigiri',jp:'おにぎり',lvl:1},
    {w:'curry',jp:'カレー',lvl:1},{w:'pizza',jp:'ピザ',lvl:1},{w:'pasta',jp:'パスタ',lvl:1},
    {w:'burger',jp:'バーガー',lvl:1},{w:'tacos',jp:'タコス',lvl:1},{w:'kimchi',jp:'キムチ',lvl:1},
    {w:'dim sum',jp:'点心',lvl:2},{w:'croissant',jp:'クロワッサン',lvl:2},{w:'paella',jp:'パエリア',lvl:2},
    {w:'breakfast',jp:'朝食',lvl:1},{w:'lunch',jp:'昼食',lvl:1},{w:'dinner',jp:'夕食',lvl:1},
    {w:'snack',jp:'おやつ',lvl:1},{w:'dessert',jp:'デザート',lvl:1},{w:'vegetarian',jp:'菜食主義',lvl:2},
    {w:'allergy',jp:'アレルギー',lvl:2},{w:'organic',jp:'オーガニック',lvl:2},
    {w:'favorite dish',jp:'好きな料理',lvl:1},{w:'local food',jp:'郷土料理',lvl:2},
    {w:'street food',jp:'屋台料理',lvl:2},{w:'home cooking',jp:'家庭料理',lvl:2},
    {w:'recipe',jp:'レシピ',lvl:1},{w:'ingredient',jp:'食材',lvl:2},{w:'flavor',jp:'風味',lvl:2},
    {w:'restaurant',jp:'レストラン',lvl:1},{w:'café',jp:'カフェ',lvl:1},
    {w:'comfort food',jp:'ほっとする料理',lvl:3},{w:'acquired taste',jp:'慣れないと好きになれない味',lvl:3},
    {w:'umami',jp:'うま味',lvl:3},{w:'palate',jp:'味覚',lvl:3},
    {w:'fusion cuisine',jp:'フュージョン料理',lvl:3},{w:'texture',jp:'食感',lvl:3},{w:'palatable',jp:'口に合う',lvl:3},{w:'aftertaste',jp:'後味',lvl:3},{w:'gourmet',jp:'グルメの',lvl:3},{w:'culinary tradition',jp:'食文化の伝統',lvl:3},{w:'seasonal ingredient',jp:'旬の食材',lvl:3},
    {w:'well-seasoned',jp:'味付けがしっかりした',lvl:2},{w:'homestyle',jp:'家庭的な',lvl:2},{w:'nutritious',jp:'栄養のある',lvl:2},{w:'filling',jp:'お腹いっぱいになる',lvl:2},{w:'signature dish',jp:'看板料理',lvl:2},
    {w:'umami-rich',jp:'うま味豊かな',lvl:3},{w:'culinary artistry',jp:'料理の芸術性',lvl:3},{w:'food pairing',jp:'食材の組み合わせ',lvl:3},{w:'regional specialty',jp:'郷土の名物料理',lvl:3},{w:'flavor complexity',jp:'味の複雑さ',lvl:3},{w:'farm-to-table',jp:'産地直送の',lvl:3},{w:'culinary heritage',jp:'食の伝統',lvl:3},{w:'palate cleanser',jp:'口直し',lvl:3},{w:'epicurean',jp:'美食家の',lvl:3},
  ],
  school: [
    {w:'study',jp:'勉強する',lvl:1},{w:'class',jp:'授業',lvl:1},{w:'teacher',jp:'先生',lvl:1},
    {w:'professor',jp:'教授',lvl:2},{w:'exam',jp:'試験',lvl:1},{w:'quiz',jp:'小テスト',lvl:1},
    {w:'homework',jp:'宿題',lvl:1},{w:'assignment',jp:'課題',lvl:2},{w:'project',jp:'プロジェクト',lvl:1},
    {w:'club',jp:'部活',lvl:1},{w:'after school',jp:'放課後',lvl:1},{w:'field trip',jp:'遠足',lvl:1},
    {w:'subject',jp:'科目',lvl:1},{w:'math',jp:'数学',lvl:1},{w:'science',jp:'理科',lvl:1},
    {w:'history',jp:'歴史',lvl:1},{w:'literature',jp:'国語・文学',lvl:2},{w:'PE',jp:'体育',lvl:1},
    {w:'art class',jp:'美術の授業',lvl:1},{w:'music class',jp:'音楽の授業',lvl:1},
    {w:'university',jp:'大学',lvl:1},{w:'campus',jp:'キャンパス',lvl:1},{w:'lecture',jp:'講義',lvl:2},
    {w:'seminar',jp:'ゼミ',lvl:2},{w:'major',jp:'専攻',lvl:2},{w:'minor',jp:'副専攻',lvl:2},
    {w:'grade',jp:'成績',lvl:1},{w:'graduation',jp:'卒業',lvl:1},{w:'scholarship',jp:'奨学金',lvl:2},
    {w:'research',jp:'研究',lvl:2},{w:'thesis',jp:'卒業論文',lvl:3},{w:'presentation',jp:'発表',lvl:2},
    {w:'difficult',jp:'難しい',lvl:1},{w:'easy',jp:'簡単',lvl:1},{w:'interesting',jp:'面白い',lvl:1},
    {w:'boring',jp:'退屈な',lvl:1},{w:'deadline',jp:'締め切り',lvl:2},{w:'library',jp:'図書館',lvl:1},
    {w:'curriculum',jp:'カリキュラム',lvl:3},{w:'academic pressure',jp:'学業のプレッシャー',lvl:3},
    {w:'rote memorization',jp:'丸暗記',lvl:3},
    {w:'standardized testing',jp:'標準テスト',lvl:3},{w:'peer pressure',jp:'仲間からのプレッシャー',lvl:3},{w:'extracurricular',jp:'課外の',lvl:3},{w:'academic integrity',jp:'学業における誠実さ',lvl:3},{w:'cram school',jp:'塾',lvl:3},{w:'burnout',jp:'燃え尽き',lvl:3},{w:'self-directed learning',jp:'自主学習',lvl:3},
    {w:'group project',jp:'グループ課題',lvl:2},{w:'study group',jp:'勉強会',lvl:2},{w:'pop quiz',jp:'抜き打ちテスト',lvl:2},{w:'academic year',jp:'学年度',lvl:2},{w:'report card',jp:'成績表',lvl:2},{w:'tuition',jp:'学費',lvl:2},{w:'campus life',jp:'キャンパスライフ',lvl:2},{w:'study abroad program',jp:'留学プログラム',lvl:2},{w:'academic advisor',jp:'指導教員',lvl:2},
    {w:'critical analysis',jp:'批判的分析',lvl:3},{w:'academic rigor',jp:'学問的厳密さ',lvl:3},{w:'independent research',jp:'自主研究',lvl:3},{w:'scholarly article',jp:'学術論文',lvl:3},{w:'pedagogy',jp:'教育法',lvl:3},{w:'intellectual curiosity',jp:'知的好奇心',lvl:3},{w:'academic discourse',jp:'学術的な議論',lvl:3},{w:'higher education',jp:'高等教育',lvl:3},{w:'interdisciplinary study',jp:'学際的な研究',lvl:3},
  ],
  weather: [
    {w:'sunny',jp:'晴れ',lvl:1},{w:'rainy',jp:'雨',lvl:1},{w:'cloudy',jp:'曇り',lvl:1},
    {w:'foggy',jp:'霧',lvl:1},{w:'windy',jp:'風が強い',lvl:1},{w:'stormy',jp:'嵐',lvl:2},
    {w:'hot',jp:'暑い',lvl:1},{w:'warm',jp:'暖かい',lvl:1},{w:'cool',jp:'涼しい',lvl:1},
    {w:'cold',jp:'寒い',lvl:1},{w:'freezing',jp:'凍るほど寒い',lvl:1},{w:'humid',jp:'蒸し暑い',lvl:2},
    {w:'dry',jp:'乾燥している',lvl:1},{w:'muggy',jp:'ムシムシする',lvl:2},
    {w:'season',jp:'季節',lvl:1},{w:'spring',jp:'春',lvl:1},{w:'summer',jp:'夏',lvl:1},
    {w:'autumn',jp:'秋',lvl:1},{w:'winter',jp:'冬',lvl:1},{w:'rainy season',jp:'梅雨',lvl:1},
    {w:'typhoon',jp:'台風',lvl:1},{w:'earthquake',jp:'地震',lvl:1},{w:'snow',jp:'雪',lvl:1},
    {w:'hail',jp:'ひょう',lvl:2},{w:'rainbow',jp:'虹',lvl:1},{w:'sunset',jp:'夕日',lvl:1},
    {w:'cherry blossom',jp:'桜',lvl:1},{w:'autumn leaves',jp:'紅葉',lvl:1},
    {w:'fireworks',jp:'花火',lvl:1},{w:'temperature',jp:'気温',lvl:1},{w:'forecast',jp:'予報',lvl:2},
    {w:'climate change',jp:'気候変動',lvl:2},{w:'global warming',jp:'地球温暖化',lvl:2},
    {w:'unpredictable weather',jp:'変わりやすい天気',lvl:3},
    {w:'meteorologist',jp:'気象予報士',lvl:3},{w:'atmospheric pressure',jp:'気圧',lvl:3},{w:'seasonal shift',jp:'季節の移り変わり',lvl:3},
    {w:'drizzle',jp:'小雨',lvl:2},{w:'overcast',jp:'どんよりした',lvl:2},{w:'heatwave',jp:'熱波',lvl:2},{w:'cold front',jp:'寒冷前線',lvl:2},{w:'gust of wind',jp:'突風',lvl:2},{w:'weather pattern',jp:'気象パターン',lvl:2},
    {w:'unpredictable climate',jp:'予測できない気候',lvl:3},{w:'extreme weather',jp:'異常気象',lvl:3},{w:'temperature fluctuation',jp:'気温の変動',lvl:3},{w:'humidity level',jp:'湿度レベル',lvl:3},{w:'weather anomaly',jp:'気象の異常',lvl:3},{w:'barometric pressure',jp:'気圧',lvl:3},{w:'seasonal transition',jp:'季節の移行',lvl:3},
    {w:'weather warning',jp:'気象警報',lvl:2},{w:'rain shower',jp:'にわか雨',lvl:2},{w:'clear skies',jp:'快晴',lvl:2},{w:'temperature drop',jp:'気温の低下',lvl:2},{w:'weather app',jp:'天気アプリ',lvl:2},{w:'seasonal allergy',jp:'季節性アレルギー',lvl:2},{w:'weather condition',jp:'天候状態',lvl:2},
    {w:'microclimate',jp:'局地気候',lvl:3},{w:'weather disruption',jp:'天候による混乱',lvl:3},{w:'climate variability',jp:'気候の変動性',lvl:3},{w:'severe weather event',jp:'異常気象イベント',lvl:3},{w:'weather forecasting model',jp:'天気予報モデル',lvl:3},{w:'natural disaster',jp:'自然災害',lvl:3},{w:'meteorological data',jp:'気象データ',lvl:3},{w:'weather-related delay',jp:'天候による遅延',lvl:3},{w:'temperature extreme',jp:'極端な気温',lvl:3},
  ],
  family: [
    {w:'parents',jp:'両親',lvl:1},{w:'mother',jp:'お母さん',lvl:1},{w:'father',jp:'お父さん',lvl:1},
    {w:'sibling',jp:'兄弟姉妹',lvl:1},{w:'brother',jp:'兄・弟',lvl:1},{w:'sister',jp:'姉・妹',lvl:1},
    {w:'grandparents',jp:'祖父母',lvl:1},{w:'grandmother',jp:'おばあちゃん',lvl:1},
    {w:'grandfather',jp:'おじいちゃん',lvl:1},{w:'cousin',jp:'いとこ',lvl:1},
    {w:'aunt',jp:'おばさん',lvl:1},{w:'uncle',jp:'おじさん',lvl:1},
    {w:'only child',jp:'一人っ子',lvl:1},{w:'oldest',jp:'長男・長女',lvl:1},
    {w:'youngest',jp:'末っ子',lvl:1},{w:'live with',jp:'〜と住む',lvl:1},
    {w:'close',jp:'仲がいい',lvl:1},{w:'tradition',jp:'伝統',lvl:2},{w:'hometown',jp:'故郷',lvl:1},
    {w:'grow up',jp:'育つ',lvl:1},{w:'move to',jp:'〜に引っ越す',lvl:1},
    {w:'neighborhood',jp:'近所',lvl:1},{w:'house',jp:'家',lvl:1},{w:'apartment',jp:'アパート',lvl:1},
    {w:'countryside',jp:'田舎',lvl:1},{w:'city',jp:'都市',lvl:1},{w:'suburb',jp:'郊外',lvl:2},
    {w:'culture',jp:'文化',lvl:2},{w:'language',jp:'言語',lvl:1},
    {w:'extended family',jp:'親戚一同',lvl:3},{w:'generation gap',jp:'世代間ギャップ',lvl:3},
    {w:'household',jp:'世帯',lvl:2},
    {w:'nuclear family',jp:'核家族',lvl:3},{w:'family dynamics',jp:'家族間の力学',lvl:3},
    {w:'in-laws',jp:'義理の家族',lvl:2},{w:'sibling rivalry',jp:'兄弟げんか',lvl:2},{w:'family reunion',jp:'家族の集まり',lvl:2},{w:'upbringing',jp:'育てられ方',lvl:2},{w:'family bond',jp:'家族の絆',lvl:2},{w:'only child syndrome',jp:'一人っ子特有の性質',lvl:2},{w:'blended family',jp:'再婚家族',lvl:2},
    {w:'intergenerational',jp:'世代をまたぐ',lvl:3},{w:'family heritage',jp:'家系・家族の伝統',lvl:3},{w:'estranged',jp:'疎遠になった',lvl:3},{w:'close-knit',jp:'結束の固い',lvl:3},{w:'ancestral home',jp:'先祖代々の家',lvl:3},{w:'kinship',jp:'血縁関係',lvl:3},{w:'parental guidance',jp:'親の導き',lvl:3},
    {w:'family tradition',jp:'家族の伝統',lvl:2},{w:'quality time',jp:'質の高い時間',lvl:2},{w:'family value',jp:'家族の価値観',lvl:2},{w:'close relative',jp:'近親者',lvl:2},{w:'family support',jp:'家族の支え',lvl:2},{w:'family gathering',jp:'家族の集まり',lvl:2},{w:'shared responsibility',jp:'共同の責任',lvl:2},{w:'family structure',jp:'家族構成',lvl:2},{w:'caretaker',jp:'世話をする人',lvl:2},
    {w:'multigenerational household',jp:'多世代同居の世帯',lvl:3},{w:'familial obligation',jp:'家族への義務',lvl:3},{w:'emotional inheritance',jp:'感情的な継承',lvl:3},{w:'family legacy',jp:'家族の遺産',lvl:3},{w:'domestic harmony',jp:'家庭内の調和',lvl:3},{w:'parenting style',jp:'子育てのスタイル',lvl:3},{w:'sibling dynamics',jp:'兄弟間の力学',lvl:3},{w:'family cohesion',jp:'家族の結束',lvl:3},{w:'generational values',jp:'世代の価値観',lvl:3},
  ],
  travel: [
    {w:'visit',jp:'訪れる',lvl:1},{w:'trip',jp:'旅行',lvl:1},{w:'journey',jp:'旅',lvl:2},
    {w:'flight',jp:'フライト',lvl:1},{w:'train',jp:'電車',lvl:1},{w:'bus',jp:'バス',lvl:1},
    {w:'hotel',jp:'ホテル',lvl:1},{w:'hostel',jp:'ホステル',lvl:2},{w:'Airbnb',jp:'民泊',lvl:1},
    {w:'sightseeing',jp:'観光',lvl:1},{w:'souvenir',jp:'お土産',lvl:1},
    {w:'passport',jp:'パスポート',lvl:1},{w:'visa',jp:'ビザ',lvl:2},{w:'luggage',jp:'荷物',lvl:1},
    {w:'local',jp:'地元の',lvl:1},{w:'tourist spot',jp:'観光スポット',lvl:1},
    {w:'hidden gem',jp:'穴場',lvl:2},{w:'recommend',jp:'おすすめ',lvl:1},
    {w:'bucket list',jp:'やりたいことリスト',lvl:2},{w:'adventure',jp:'冒険',lvl:1},
    {w:'backpacking',jp:'バックパッキング',lvl:2},{w:'road trip',jp:'ロードトリップ',lvl:1},
    {w:'temple',jp:'お寺',lvl:1},{w:'shrine',jp:'神社',lvl:1},{w:'castle',jp:'城',lvl:1},
    {w:'museum',jp:'博物館',lvl:1},{w:'gallery',jp:'美術館',lvl:2},{w:'park',jp:'公園',lvl:1},
    {w:'beach',jp:'ビーチ',lvl:1},{w:'mountain',jp:'山',lvl:1},{w:'forest',jp:'森',lvl:1},
    {w:'island',jp:'島',lvl:1},{w:'lake',jp:'湖',lvl:1},{w:'waterfall',jp:'滝',lvl:1},
    {w:'someday',jp:'いつか',lvl:1},{w:'dream trip',jp:'夢の旅',lvl:1},
    {w:'exchange student',jp:'交換留学生',lvl:2},{w:'study abroad',jp:'留学',lvl:2},
    {w:'off the beaten path',jp:'穴場の・人が行かない',lvl:3},{w:'culture shock',jp:'カルチャーショック',lvl:3},
    {w:'wanderlust',jp:'旅への強い憧れ',lvl:3},{w:'itinerary',jp:'旅程',lvl:3},
    {w:'layover',jp:'乗り継ぎ',lvl:2},{w:'jet lag',jp:'時差ぼけ',lvl:2},{w:'travel insurance',jp:'旅行保険',lvl:2},{w:'guided tour',jp:'ガイド付きツアー',lvl:2},{w:'local cuisine',jp:'地元の料理',lvl:2},
    {w:'immersive travel',jp:'没入型の旅',lvl:3},{w:'off-season',jp:'オフシーズン',lvl:3},{w:'cultural immersion',jp:'文化への没入',lvl:3},{w:'sustainable tourism',jp:'持続可能な観光',lvl:3},{w:'travel logistics',jp:'旅の段取り',lvl:3},{w:'authentic experience',jp:'本物の体験',lvl:3},{w:'unforeseen detour',jp:'予期せぬ寄り道',lvl:3},
    {w:'travel companion',jp:'旅の道連れ',lvl:2},{w:'packing list',jp:'荷造りリスト',lvl:2},{w:'travel budget',jp:'旅行予算',lvl:2},{w:'scenic route',jp:'景色の良いルート',lvl:2},{w:'travel itinerary',jp:'旅程表',lvl:2},{w:'must-see spot',jp:'絶対見るべき場所',lvl:2},
    {w:'cultural sensitivity',jp:'文化的な配慮',lvl:3},{w:'travel fatigue',jp:'旅の疲れ',lvl:3},{w:'destination fatigue',jp:'観光地疲れ',lvl:3},{w:'slow travel',jp:'ゆっくり巡る旅',lvl:3},{w:'travel serendipity',jp:'旅の偶然の発見',lvl:3},{w:'globetrotter',jp:'世界を旅する人',lvl:3},{w:'travel philosophy',jp:'旅の哲学',lvl:3},{w:'immersive itinerary',jp:'没入型の旅程',lvl:3},{w:'exploratory mindset',jp:'探求心のある考え方',lvl:3},
  ],
  work: [
    {w:'job',jp:'仕事',lvl:1},{w:'career',jp:'キャリア',lvl:2},{w:'dream',jp:'夢',lvl:1},
    {w:'goal',jp:'目標',lvl:1},{w:'future',jp:'将来',lvl:1},{w:'ambition',jp:'野心・志',lvl:3},
    {w:'company',jp:'会社',lvl:1},{w:'startup',jp:'スタートアップ',lvl:2},{w:'entrepreneur',jp:'起業家',lvl:3},
    {w:'part-time',jp:'アルバイト',lvl:1},{w:'internship',jp:'インターンシップ',lvl:2},
    {w:'remote work',jp:'リモートワーク',lvl:2},{w:'freelance',jp:'フリーランス',lvl:2},
    {w:'salary',jp:'給料',lvl:2},{w:'promotion',jp:'昇進',lvl:2},{w:'retire',jp:'引退する',lvl:2},
    {w:'passion',jp:'情熱',lvl:2},{w:'challenge',jp:'挑戦',lvl:1},{w:'achieve',jp:'達成する',lvl:2},
    {w:'success',jp:'成功',lvl:1},{w:'failure',jp:'失敗',lvl:2},{w:'experience',jp:'経験',lvl:1},
    {w:'skill',jp:'スキル',lvl:1},{w:'talent',jp:'才能',lvl:2},{w:'effort',jp:'努力',lvl:2},
    {w:'opportunity',jp:'機会',lvl:2},{w:'teamwork',jp:'チームワーク',lvl:1},
    {w:'leadership',jp:'リーダーシップ',lvl:2},{w:'volunteer',jp:'ボランティア',lvl:1},
    {w:'work-life balance',jp:'仕事と生活のバランス',lvl:3},{w:'burnout',jp:'燃え尽き症候群',lvl:3},
    {w:'networking',jp:'人脈作り',lvl:3},{w:'career transition',jp:'キャリアの転換',lvl:3},{w:'professional growth',jp:'職業的な成長',lvl:3},{w:'workplace culture',jp:'職場の文化',lvl:3},{w:'transferable skill',jp:'応用できるスキル',lvl:3},{w:'职涯satisfaction',jp:'キャリア満足度',lvl:3},
    {w:'boss',jp:'上司',lvl:1},{w:'coworker',jp:'同僚',lvl:1},{w:'office',jp:'オフィス',lvl:1},{w:'meeting',jp:'会議',lvl:1},{w:'deadline',jp:'締め切り',lvl:1},{w:'break time',jp:'休憩時間',lvl:1},{w:'work hard',jp:'一生懸命働く',lvl:1},{w:'be busy',jp:'忙しい',lvl:1},
    {w:'job interview',jp:'就職面接',lvl:2},{w:'resume',jp:'履歴書',lvl:2},{w:'work schedule',jp:'勤務スケジュール',lvl:2},{w:'team meeting',jp:'チームミーティング',lvl:2},{w:'performance review',jp:'人事評価',lvl:2},
    {w:'career ambition',jp:'キャリアの野心',lvl:3},{w:'professional identity',jp:'職業的アイデンティティ',lvl:3},{w:'workplace dynamics',jp:'職場の力学',lvl:3},{w:'job market trend',jp:'雇用市場の動向',lvl:3},{w:'occupational fulfillment',jp:'職業上の充実感',lvl:3},{w:'career milestone',jp:'キャリアの節目',lvl:3},{w:'professional networking',jp:'仕事上の人脈作り',lvl:3},{w:'skill diversification',jp:'スキルの多様化',lvl:3},{w:'work ethic',jp:'仕事に対する姿勢',lvl:3},{w:'organizational culture',jp:'組織文化',lvl:3},
  ],
  entertainment: [
    {w:'movie',jp:'映画',lvl:1},{w:'film',jp:'映画・フィルム',lvl:1},{w:'anime',jp:'アニメ',lvl:1},
    {w:'drama',jp:'ドラマ',lvl:1},{w:'documentary',jp:'ドキュメンタリー',lvl:2},
    {w:'comedy',jp:'コメディ',lvl:1},{w:'action',jp:'アクション',lvl:1},{w:'horror',jp:'ホラー',lvl:1},
    {w:'romance',jp:'ロマンス',lvl:1},{w:'fantasy',jp:'ファンタジー',lvl:1},
    {w:'concert',jp:'コンサート',lvl:1},{w:'festival',jp:'フェスティバル',lvl:1},
    {w:'theater',jp:'劇場',lvl:1},{w:'musical',jp:'ミュージカル',lvl:2},{w:'opera',jp:'オペラ',lvl:2},
    {w:'exhibition',jp:'展覧会',lvl:2},{w:'comedian',jp:'コメディアン',lvl:2},
    {w:'recently watched',jp:'最近見た',lvl:1},{w:'favorite',jp:'お気に入り',lvl:1},
    {w:'recommend',jp:'おすすめ',lvl:1},{w:'sequel',jp:'続編',lvl:2},{w:'remake',jp:'リメイク',lvl:2},
    {w:'character',jp:'キャラクター',lvl:1},{w:'plot',jp:'ストーリー',lvl:2},{w:'ending',jp:'結末',lvl:1},
    {w:'K-pop',jp:'K-POP',lvl:1},{w:'J-pop',jp:'J-POP',lvl:1},{w:'hip-hop',jp:'ヒップホップ',lvl:1},
    {w:'classical',jp:'クラシック',lvl:1},{w:'jazz',jp:'ジャズ',lvl:1},{w:'rock',jp:'ロック',lvl:1},
    {w:'playlist',jp:'プレイリスト',lvl:1},{w:'album',jp:'アルバム',lvl:1},{w:'lyrics',jp:'歌詞',lvl:2},
    {w:'plot twist',jp:'どんでん返し',lvl:3},{w:'underrated',jp:'過小評価されている',lvl:3},
    {w:'cinematic',jp:'映画的な',lvl:3},{w:'nostalgic',jp:'懐かしい',lvl:3},
    {w:'binge-watch',jp:'一気見する',lvl:3},{w:'plot hole',jp:'物語の矛盾点',lvl:3},{w:'star-studded',jp:'豪華キャストの',lvl:3},{w:'box office hit',jp:'興行的な大ヒット',lvl:3},{w:'critically acclaimed',jp:'批評家に絶賛された',lvl:3},{w:'cult classic',jp:'カルト的人気作',lvl:3},{w:'behind the scenes',jp:'舞台裏',lvl:3},
    {w:'plotline',jp:'ストーリーライン',lvl:2},{w:'soundtrack',jp:'サウンドトラック',lvl:2},{w:'trailer',jp:'予告編',lvl:2},{w:'streaming service',jp:'配信サービス',lvl:2},{w:'season finale',jp:'シーズン最終回',lvl:2},{w:'spin-off',jp:'スピンオフ',lvl:2},{w:'award-winning',jp:'受賞歴のある',lvl:2},{w:'blockbuster',jp:'大ヒット作',lvl:2},{w:'live performance',jp:'ライブパフォーマンス',lvl:2},{w:'fan base',jp:'ファン層',lvl:2},{w:'genre-bending',jp:'ジャンルを超えた',lvl:2},
    {w:'cinematic universe',jp:'映画的世界観',lvl:3},{w:'auteur',jp:'作家性のある監督',lvl:3},{w:'narrative arc',jp:'物語の展開',lvl:3},{w:'critical reception',jp:'批評家の評価',lvl:3},{w:'thematic resonance',jp:'テーマの響き',lvl:3},{w:'genre convention',jp:'ジャンルの慣習',lvl:3},{w:'visual aesthetics',jp:'映像美',lvl:3},{w:'artistic merit',jp:'芸術的価値',lvl:3},{w:'pop culture phenomenon',jp:'ポップカルチャー現象',lvl:3},
  ],
  sports: [
    {w:'soccer',jp:'サッカー',lvl:1},{w:'football',jp:'フットボール',lvl:1},{w:'basketball',jp:'バスケ',lvl:1},
    {w:'baseball',jp:'野球',lvl:1},{w:'volleyball',jp:'バレーボール',lvl:1},{w:'tennis',jp:'テニス',lvl:1},
    {w:'badminton',jp:'バドミントン',lvl:1},{w:'table tennis',jp:'卓球',lvl:1},
    {w:'swimming',jp:'水泳',lvl:1},{w:'running',jp:'ランニング',lvl:1},{w:'marathon',jp:'マラソン',lvl:1},
    {w:'cycling',jp:'自転車',lvl:1},{w:'skiing',jp:'スキー',lvl:1},{w:'snowboarding',jp:'スノボ',lvl:1},
    {w:'surfing',jp:'サーフィン',lvl:1},{w:'martial arts',jp:'武道',lvl:2},{w:'judo',jp:'柔道',lvl:1},
    {w:'kendo',jp:'剣道',lvl:1},{w:'karate',jp:'空手',lvl:1},{w:'gymnastics',jp:'体操',lvl:1},
    {w:'team',jp:'チーム',lvl:1},{w:'match',jp:'試合',lvl:1},{w:'score',jp:'スコア',lvl:1},
    {w:'win',jp:'勝つ',lvl:1},{w:'lose',jp:'負ける',lvl:1},{w:'draw',jp:'引き分け',lvl:1},
    {w:'practice',jp:'練習',lvl:1},{w:'coach',jp:'コーチ',lvl:1},{w:'tournament',jp:'大会',lvl:2},
    {w:'stadium',jp:'スタジアム',lvl:1},{w:'gym',jp:'ジム',lvl:1},{w:'fan',jp:'ファン',lvl:1},
    {w:'support',jp:'応援する',lvl:1},{w:'champion',jp:'チャンピオン',lvl:1},{w:'record',jp:'記録',lvl:1},
    {w:'Olympics',jp:'オリンピック',lvl:1},{w:'World Cup',jp:'ワールドカップ',lvl:1},
    {w:'underdog',jp:'番狂わせを起こす側',lvl:3},
    {w:'endurance',jp:'持久力',lvl:2},{w:'technique',jp:'技術',lvl:2},
    {w:'peak performance',jp:'最高のパフォーマンス',lvl:3},{w:'sports psychology',jp:'スポーツ心理学',lvl:3},{w:'competitive edge',jp:'競争力の優位性',lvl:3},
    {w:'stamina',jp:'スタミナ',lvl:2},{w:'flexibility',jp:'柔軟性',lvl:2},{w:'warm-up',jp:'準備運動',lvl:2},{w:'referee',jp:'審判',lvl:2},{w:'injury',jp:'怪我',lvl:2},{w:'sportsmanship',jp:'スポーツマンシップ',lvl:2},{w:'home turf',jp:'ホームグラウンド',lvl:2},
    {w:'peak condition',jp:'絶好調',lvl:3},{w:'muscle fatigue',jp:'筋肉疲労',lvl:3},{w:'strategic play',jp:'戦略的なプレー',lvl:3},{w:'adrenaline rush',jp:'アドレナリンの高まり',lvl:3},{w:'mental toughness',jp:'精神的な強さ',lvl:3},{w:'record-breaking',jp:'記録を更新する',lvl:3},{w:'physical conditioning',jp:'体調管理・調整',lvl:3},
    {w:'cardio',jp:'有酸素運動',lvl:2},{w:'agility',jp:'俊敏性',lvl:2},{w:'game plan',jp:'試合の作戦',lvl:2},{w:'personal best',jp:'自己ベスト',lvl:2},{w:'training camp',jp:'合宿',lvl:2},{w:'physical fitness',jp:'体力',lvl:2},{w:'starting lineup',jp:'スタメン',lvl:2},{w:'overtime',jp:'延長戦',lvl:2},{w:'season opener',jp:'開幕戦',lvl:2},
    {w:'athletic prowess',jp:'運動能力の高さ',lvl:3},{w:'tactical formation',jp:'戦術的な布陣',lvl:3},{w:'physical resilience',jp:'身体的な回復力',lvl:3},{w:'training regimen',jp:'トレーニング計画',lvl:3},{w:'competitive spirit',jp:'競争心',lvl:3},{w:'sports analytics',jp:'スポーツ分析',lvl:3},{w:'peak physical form',jp:'絶好調の体調',lvl:3},{w:'endurance training',jp:'持久力トレーニング',lvl:3},{w:'game-changing play',jp:'試合を左右するプレー',lvl:3},
  ],
  pets: [
    {w:'dog',jp:'犬',lvl:1},{w:'cat',jp:'猫',lvl:1},{w:'rabbit',jp:'うさぎ',lvl:1},
    {w:'hamster',jp:'ハムスター',lvl:1},{w:'bird',jp:'鳥',lvl:1},{w:'fish',jp:'魚',lvl:1},
    {w:'turtle',jp:'カメ',lvl:1},{w:'snake',jp:'ヘビ',lvl:1},{w:'lizard',jp:'トカゲ',lvl:1},
    {w:'parrot',jp:'オウム',lvl:1},{w:'guinea pig',jp:'モルモット',lvl:1},
    {w:'puppy',jp:'子犬',lvl:1},{w:'kitten',jp:'子猫',lvl:1},{w:'pet',jp:'ペット',lvl:1},
    {w:'cute',jp:'かわいい',lvl:1},{w:'fluffy',jp:'ふわふわ',lvl:1},{w:'playful',jp:'遊び好きな',lvl:1},
    {w:'naughty',jp:'やんちゃな',lvl:2},{w:'gentle',jp:'おとなしい',lvl:1},{w:'smart',jp:'賢い',lvl:1},
    {w:'adopted',jp:'引き取った',lvl:2},{w:'breed',jp:'品種',lvl:2},{w:'paw',jp:'肉球',lvl:1},
    {w:'tail',jp:'しっぽ',lvl:1},{w:'fur',jp:'毛',lvl:1},{w:'veterinarian',jp:'獣医',lvl:2},
    {w:'animal shelter',jp:'動物シェルター',lvl:2},{w:'zoo',jp:'動物園',lvl:1},
    {w:'wildlife',jp:'野生動物',lvl:2},{w:'endangered',jp:'絶滅危惧種',lvl:3},
    {w:'domesticated',jp:'家畜化された',lvl:3},{w:'companionship',jp:'心の支え・仲間意識',lvl:3},{w:'temperament',jp:'気質',lvl:3},
    {w:'obedience training',jp:'しつけ訓練',lvl:2},{w:'litter box',jp:'猫用トイレ',lvl:2},{w:'grooming',jp:'毛づくろい・手入れ',lvl:2},{w:'leash',jp:'リード',lvl:2},{w:'vaccination',jp:'予防接種',lvl:2},{w:'shedding',jp:'毛が抜けること',lvl:2},
    {w:'separation anxiety',jp:'分離不安',lvl:3},{w:'instinctual behavior',jp:'本能的な行動',lvl:3},{w:'unconditional love',jp:'無条件の愛',lvl:3},{w:'pet ownership',jp:'ペットの飼育',lvl:3},{w:'bonding process',jp:'絆を築く過程',lvl:3},{w:'responsible owner',jp:'責任ある飼い主',lvl:3},{w:'species-specific care',jp:'種特有のケア',lvl:3},
    {w:'pet-friendly',jp:'ペット可の',lvl:2},{w:'animal instinct',jp:'動物の本能',lvl:2},{w:'training treat',jp:'しつけ用のご褒美',lvl:2},{w:'pet insurance',jp:'ペット保険',lvl:2},{w:'adoption fee',jp:'譲渡費用',lvl:2},{w:'microchip',jp:'マイクロチップ',lvl:2},{w:'socialized pet',jp:'社会化されたペット',lvl:2},{w:'pet care routine',jp:'ペットの世話の習慣',lvl:2},
    {w:'animal welfare',jp:'動物福祉',lvl:3},{w:'interspecies bond',jp:'種を超えた絆',lvl:3},{w:'responsible breeding',jp:'責任ある繁殖',lvl:3},{w:'behavioral conditioning',jp:'行動条件付け',lvl:3},{w:'emotional attunement',jp:'感情的な共鳴',lvl:3},{w:'pet-human bond',jp:'人とペットの絆',lvl:3},{w:'ethical ownership',jp:'倫理的な飼育',lvl:3},{w:'domestication process',jp:'家畜化の過程',lvl:3},{w:'companion animal',jp:'伴侶動物',lvl:3},
  ],
  tech: [
    {w:'app',jp:'アプリ',lvl:1},{w:'smartphone',jp:'スマートフォン',lvl:1},{w:'tablet',jp:'タブレット',lvl:1},
    {w:'laptop',jp:'ノートPC',lvl:1},{w:'headphones',jp:'ヘッドフォン',lvl:1},
    {w:'social media',jp:'SNS',lvl:1},{w:'Instagram',jp:'インスタ',lvl:1},{w:'TikTok',jp:'ティックトック',lvl:1},
    {w:'YouTube',jp:'ユーチューブ',lvl:1},{w:'Twitter',jp:'ツイッター',lvl:1},
    {w:'internet',jp:'インターネット',lvl:1},{w:'Wi-Fi',jp:'ワイファイ',lvl:1},{w:'Bluetooth',jp:'ブルートゥース',lvl:1},
    {w:'AI',jp:'AI・人工知能',lvl:1},{w:'robot',jp:'ロボット',lvl:1},{w:'programming',jp:'プログラミング',lvl:2},
    {w:'coding',jp:'コーディング',lvl:2},{w:'website',jp:'ウェブサイト',lvl:1},{w:'app development',jp:'アプリ開発',lvl:2},
    {w:'update',jp:'アップデート',lvl:1},{w:'useful',jp:'便利な',lvl:1},{w:'bug',jp:'バグ',lvl:2},
    {w:'game',jp:'ゲーム',lvl:1},{w:'game console',jp:'ゲーム機',lvl:1},{w:'streaming',jp:'ストリーミング',lvl:1},
    {w:'online shopping',jp:'オンラインショッピング',lvl:1},{w:'digital',jp:'デジタル',lvl:1},
    {w:'virtual reality',jp:'VR',lvl:2},{w:'electric car',jp:'電気自動車',lvl:2},
    {w:'algorithm',jp:'アルゴリズム',lvl:3},{w:'data privacy',jp:'データプライバシー',lvl:3},
    {w:'machine learning',jp:'機械学習',lvl:3},{w:'cybersecurity',jp:'サイバーセキュリティ',lvl:3},
    {w:'software update',jp:'ソフトウェア更新',lvl:2},{w:'user interface',jp:'ユーザーインターフェース',lvl:2},{w:'cloud storage',jp:'クラウドストレージ',lvl:2},{w:'battery life',jp:'バッテリー持続時間',lvl:2},{w:'tech-savvy',jp:'技術に精通した',lvl:2},
    {w:'digital transformation',jp:'デジタル変革',lvl:3},{w:'data-driven',jp:'データ主導の',lvl:3},{w:'automation bias',jp:'自動化への過信',lvl:3},{w:'algorithmic decision',jp:'アルゴリズムによる意思決定',lvl:3},{w:'tech dependency',jp:'技術への依存',lvl:3},{w:'digital divide',jp:'デジタル格差',lvl:3},
    {w:'app notification',jp:'アプリの通知',lvl:2},{w:'device compatibility',jp:'デバイスの互換性',lvl:2},{w:'tech gadget',jp:'ガジェット',lvl:2},{w:'firmware',jp:'ファームウェア',lvl:2},{w:'tech support',jp:'テクニカルサポート',lvl:2},{w:'user experience',jp:'ユーザー体験',lvl:2},{w:'wearable device',jp:'ウェアラブル端末',lvl:2},{w:'smart home',jp:'スマートホーム',lvl:2},{w:'tech trend',jp:'技術トレンド',lvl:2},
    {w:'technological disruption',jp:'技術による破壊的変化',lvl:3},{w:'digital ecosystem',jp:'デジタルエコシステム',lvl:3},{w:'algorithmic bias',jp:'アルゴリズムの偏り',lvl:3},{w:'data encryption',jp:'データ暗号化',lvl:3},{w:'tech-driven innovation',jp:'技術主導のイノベーション',lvl:3},{w:'digital literacy',jp:'デジタルリテラシー',lvl:3},{w:'interoperability',jp:'相互運用性',lvl:3},{w:'scalable technology',jp:'拡張性のある技術',lvl:3},{w:'emerging technology',jp:'新興技術',lvl:3},{w:'tech ethics',jp:'技術倫理',lvl:3},
  ],
  health: [
    {w:'exercise',jp:'運動',lvl:1},{w:'workout',jp:'トレーニング',lvl:1},{w:'gym',jp:'ジム',lvl:1},
    {w:'diet',jp:'食事制限・ダイエット',lvl:1},{w:'nutrition',jp:'栄養',lvl:2},{w:'sleep',jp:'睡眠',lvl:1},
    {w:'stress',jp:'ストレス',lvl:1},{w:'mental health',jp:'メンタルヘルス',lvl:2},
    {w:'healthy',jp:'健康的な',lvl:1},{w:'fit',jp:'体型が良い',lvl:1},{w:'tired',jp:'疲れた',lvl:1},
    {w:'energy',jp:'エネルギー',lvl:1},{w:'vitamin',jp:'ビタミン',lvl:1},{w:'hydrate',jp:'水分補給',lvl:2},
    {w:'jog',jp:'ジョギング',lvl:1},{w:'stretch',jp:'ストレッチ',lvl:1},{w:'balance',jp:'バランス',lvl:1},
    {w:'hospital',jp:'病院',lvl:1},{w:'medicine',jp:'薬',lvl:1},{w:'doctor',jp:'医者',lvl:1},
    {w:'well-being',jp:'心身の健康',lvl:3},{w:'self-care',jp:'セルフケア',lvl:2},
    {w:'holistic',jp:'全体論的な',lvl:3},{w:'chronic',jp:'慢性の',lvl:3},{w:'preventive care',jp:'予防医療',lvl:3},
    {w:'well-balanced diet',jp:'バランスの取れた食事',lvl:2},{w:'immune system',jp:'免疫系',lvl:2},{w:'physical checkup',jp:'健康診断',lvl:2},{w:'sleep quality',jp:'睡眠の質',lvl:2},{w:'mental clarity',jp:'頭の冴え',lvl:2},{w:'stress management',jp:'ストレス管理',lvl:2},
    {w:'holistic wellness',jp:'全体的な健康',lvl:3},{w:'preventive medicine',jp:'予防医学',lvl:3},{w:'lifestyle disease',jp:'生活習慣病',lvl:3},{w:'psychosomatic',jp:'心身相関の',lvl:3},{w:'mind-body connection',jp:'心と体のつながり',lvl:3},{w:'burnout syndrome',jp:'燃え尽き症候群',lvl:3},
    {w:'rest',jp:'休む',lvl:1},{w:'feel sick',jp:'具合が悪い',lvl:1},{w:'get better',jp:'良くなる',lvl:1},
    {w:'physical checkup',jp:'健康診断',lvl:2},{w:'balanced meal',jp:'バランスの取れた食事',lvl:2},{w:'daily exercise',jp:'毎日の運動',lvl:2},{w:'good habit',jp:'良い習慣',lvl:2},{w:'health goal',jp:'健康目標',lvl:2},{w:'medical checkup',jp:'健康診断',lvl:2},{w:'wellness routine',jp:'健康を保つ習慣',lvl:2},{w:'recovery time',jp:'回復期間',lvl:2},{w:'active lifestyle',jp:'活動的な生活',lvl:2},{w:'health awareness',jp:'健康意識',lvl:2},
    {w:'physical vitality',jp:'身体的な活力',lvl:3},{w:'wellness journey',jp:'健康を追求する道のり',lvl:3},{w:'proactive health',jp:'予防的な健康管理',lvl:3},{w:'longevity',jp:'長寿',lvl:3},{w:'nutrient balance',jp:'栄養バランス',lvl:3},{w:'health consciousness',jp:'健康意識の高さ',lvl:3},{w:'sustainable habit',jp:'持続可能な習慣',lvl:3},{w:'physical resilience',jp:'身体的な回復力',lvl:3},{w:'lifestyle optimization',jp:'生活習慣の最適化',lvl:3},{w:'wellbeing metric',jp:'幸福度の指標',lvl:3},
    {w:'stay hydrated',jp:'水分補給をする',lvl:2},
    {w:'physical vigor',jp:'身体的な活力',lvl:3},
  ],
  emotion: [
    {w:'happy',jp:'嬉しい',lvl:1},{w:'sad',jp:'悲しい',lvl:1},{w:'excited',jp:'興奮している',lvl:1},
    {w:'nervous',jp:'緊張している',lvl:1},{w:'scared',jp:'怖い',lvl:1},{w:'angry',jp:'怒っている',lvl:1},
    {w:'surprised',jp:'驚いた',lvl:1},{w:'proud',jp:'誇りに思う',lvl:2},{w:'embarrassed',jp:'恥ずかしい',lvl:2},
    {w:'lonely',jp:'孤独な',lvl:2},{w:'grateful',jp:'感謝している',lvl:2},{w:'confident',jp:'自信がある',lvl:2},
    {w:'shy',jp:'恥ずかしがり屋な',lvl:1},{w:'outgoing',jp:'外向的な',lvl:2},{w:'kind',jp:'親切な',lvl:1},
    {w:'funny',jp:'面白い',lvl:1},{w:'serious',jp:'真面目な',lvl:1},{w:'creative',jp:'創造的な',lvl:2},
    {w:'honest',jp:'正直な',lvl:1},{w:'patient',jp:'忍耐強い',lvl:2},{w:'curious',jp:'好奇心旺盛な',lvl:2},
    {w:'optimistic',jp:'楽観的な',lvl:3},{w:'pessimistic',jp:'悲観的な',lvl:3},
    {w:'overwhelmed',jp:'圧倒されている',lvl:3},{w:'conflicted',jp:'葛藤している',lvl:3},
    {w:'overwhelmed',jp:'圧倒された',lvl:3},{w:'ambivalent',jp:'相反する感情の',lvl:3},{w:'emotional intelligence',jp:'感情知能',lvl:3},{w:'introspective',jp:'内省的な',lvl:3},{w:'empathetic',jp:'共感的な',lvl:3},{w:'resilient',jp:'立ち直りが早い',lvl:3},
    {w:'feel',jp:'感じる',lvl:1},{w:'mood',jp:'気分',lvl:1},{w:'calm',jp:'落ち着いた',lvl:1},{w:'worried',jp:'心配な',lvl:1},{w:'relieved',jp:'ほっとした',lvl:1},{w:'bored',jp:'退屈な',lvl:1},{w:'jealous',jp:'嫉妬した',lvl:1},{w:'hopeful',jp:'希望に満ちた',lvl:1},
    {w:'mood swing',jp:'気分の浮き沈み',lvl:2},{w:'emotional state',jp:'感情の状態',lvl:2},{w:'express feelings',jp:'感情を表現する',lvl:2},{w:'bottle up',jp:'感情を抑え込む',lvl:2},{w:'let off steam',jp:'ストレス発散する',lvl:2},{w:'sensitive',jp:'敏感な',lvl:2},{w:'level-headed',jp:'冷静な',lvl:2},{w:'overreact',jp:'過剰反応する',lvl:2},{w:'in a good mood',jp:'機嫌がいい',lvl:2},{w:'in a bad mood',jp:'機嫌が悪い',lvl:2},{w:'compassionate',jp:'思いやりのある',lvl:2},
    {w:'emotional regulation',jp:'感情の制御',lvl:3},{w:'introspection',jp:'内省',lvl:3},{w:'emotional vulnerability',jp:'感情的な弱さ',lvl:3},{w:'self-awareness',jp:'自己認識',lvl:3},{w:'emotional nuance',jp:'感情の機微',lvl:3},{w:'psychological resilience',jp:'心理的な回復力',lvl:3},{w:'emotional depth',jp:'感情の深み',lvl:3},{w:'cognitive empathy',jp:'認知的共感',lvl:3},{w:'affective response',jp:'感情的な反応',lvl:3},{w:'emotional processing',jp:'感情の処理',lvl:3},
    {w:'heartfelt',jp:'心のこもった',lvl:3},
  ],
  intro: [
    {w:'nice to meet you',jp:'はじめまして',lvl:1},{w:'where are you from?',jp:'どこ出身ですか？',lvl:1},
    {w:'I\'m from',jp:'〜出身です',lvl:1},{w:'I live in',jp:'〜に住んでいます',lvl:1},
    {w:'my name is',jp:'名前は〜です',lvl:1},{w:'I\'m a student',jp:'学生です',lvl:1},
    {w:'I\'m years old',jp:'〜歳です',lvl:1},{w:'nice to talk to you',jp:'話せて嬉しいです',lvl:1},
    {w:'what do you do?',jp:'何をしていますか？',lvl:1},{w:'tell me about yourself',jp:'自己紹介してください',lvl:1},
    {w:'what\'s your hobby?',jp:'趣味は何ですか？',lvl:1},{w:'do you speak English?',jp:'英語話せますか？',lvl:1},
    {w:'I\'m learning English',jp:'英語を勉強中です',lvl:1},{w:'my English is not perfect',jp:'英語は得意じゃないけど',lvl:2},
    {w:'can you repeat?',jp:'もう一度言ってもらえますか？',lvl:1},{w:'I don\'t understand',jp:'わかりません',lvl:1},
    {w:'what does that mean?',jp:'どういう意味ですか？',lvl:1},{w:'how do you say',jp:'〜は英語でどう言う？',lvl:1},
    {w:'small talk',jp:'世間話',lvl:2},{w:'get to know',jp:'知り合いになる',lvl:2},{w:'first impression',jp:'第一印象',lvl:2},
    {w:'break the ice',jp:'場の緊張をほぐす',lvl:3},{w:'rapport',jp:'信頼関係',lvl:3},{w:'common ground',jp:'共通点',lvl:3},
    {w:'introduce yourself',jp:'自己紹介する',lvl:2},{w:'catch up',jp:'近況を話す',lvl:2},{w:'exchange contacts',jp:'連絡先を交換する',lvl:2},{w:'follow-up question',jp:'続けての質問',lvl:2},{w:'conversation starter',jp:'会話のきっかけ',lvl:2},{w:'awkward silence',jp:'気まずい沈黙',lvl:2},
    {w:'establish rapport',jp:'信頼関係を築く',lvl:3},{w:'social cues',jp:'社会的な合図',lvl:3},{w:'genuine curiosity',jp:'本物の好奇心',lvl:3},{w:'mutual interest',jp:'共通の興味',lvl:3},{w:'conversational flow',jp:'会話の流れ',lvl:3},{w:'active listening',jp:'積極的傾聴',lvl:3},
    {w:'shake hands',jp:'握手する',lvl:1},{w:'smile',jp:'笑顔',lvl:1},{w:'say hello',jp:'挨拶する',lvl:1},
    {w:'introduce someone',jp:'誰かを紹介する',lvl:2},{w:'exchange names',jp:'名前を交換する',lvl:2},{w:'polite greeting',jp:'丁寧な挨拶',lvl:2},{w:'casual chat',jp:'カジュアルな会話',lvl:2},{w:'friendly gesture',jp:'親しみやすい仕草',lvl:2},{w:'warm welcome',jp:'温かい歓迎',lvl:2},{w:'meet someone new',jp:'新しい人に会う',lvl:2},{w:'personal background',jp:'個人的な経歴',lvl:2},{w:'shared hobby',jp:'共通の趣味',lvl:2},{w:'light conversation',jp:'軽い会話',lvl:2},
    {w:'social etiquette',jp:'社会的なマナー',lvl:3},{w:'first encounter',jp:'初めての出会い',lvl:3},{w:'cultural greeting norm',jp:'文化的な挨拶の規範',lvl:3},{w:'interpersonal warmth',jp:'対人的な温かさ',lvl:3},{w:'conversational ease',jp:'会話のしやすさ',lvl:3},{w:'introductory small talk',jp:'導入の世間話',lvl:3},{w:'social confidence',jp:'社交的な自信',lvl:3},{w:'genuine interest',jp:'本物の興味',lvl:3},{w:'approachable demeanor',jp:'親しみやすい態度',lvl:3},{w:'connection-building',jp:'つながりを築くこと',lvl:3},{w:'first impression management',jp:'第一印象の管理',lvl:3},
  ],
  opinion: [
    {w:'I believe',jp:'〜だと信じています',lvl:2},{w:'in my view',jp:'私の見方では',lvl:2},
    {w:'I disagree',jp:'同意しません',lvl:2},{w:'on the other hand',jp:'一方で',lvl:2},
    {w:'however',jp:'しかし',lvl:2},{w:'therefore',jp:'したがって',lvl:2},
    {w:'because',jp:'なぜなら',lvl:1},{w:'the reason is',jp:'理由は〜',lvl:1},
    {w:'for instance',jp:'例えば',lvl:2},{w:'such as',jp:'〜のような',lvl:2},
    {w:'compared to',jp:'〜と比べると',lvl:2},{w:'according to',jp:'〜によると',lvl:2},
    {w:'I\'ve heard that',jp:'〜と聞いたことがあります',lvl:2},{w:'it depends',jp:'場合によります',lvl:1},
    {w:'that\'s a good point',jp:'いいポイントですね',lvl:2},{w:'I hadn\'t thought of that',jp:'考えていなかった',lvl:3},
    {w:'to some extent',jp:'ある程度は',lvl:3},{w:'I see your point, but',jp:'言いたいことはわかるけど',lvl:3},
    {w:'I like',jp:'私は好きです',lvl:1},
    {w:'playing devil\'s advocate',jp:'あえて反対意見を言う人',lvl:3},{w:'nuanced view',jp:'微妙なニュアンスを含む見解',lvl:3},{w:'counterargument',jp:'反論',lvl:3},{w:'well-founded',jp:'根拠のしっかりした',lvl:3},{w:'subjective take',jp:'主観的な見方',lvl:3},{w:'objective analysis',jp:'客観的な分析',lvl:3},
    {w:'think',jp:'思う',lvl:1},{w:'like',jp:'好き',lvl:1},{w:'don\'t like',jp:'好きではない',lvl:1},{w:'agree',jp:'賛成する',lvl:1},{w:'idea',jp:'考え',lvl:1},{w:'good idea',jp:'良い考え',lvl:1},{w:'bad idea',jp:'悪い考え',lvl:1},{w:'my opinion',jp:'私の意見',lvl:1},{w:'your opinion',jp:'あなたの意見',lvl:1},{w:'want to say',jp:'言いたい',lvl:1},{w:'true',jp:'本当の',lvl:1},{w:'not true',jp:'本当ではない',lvl:1},{w:'right',jp:'正しい',lvl:1},{w:'wrong',jp:'間違っている',lvl:1},{w:'maybe so',jp:'そうかもしれない',lvl:1},{w:'not sure',jp:'よくわからない',lvl:1},
    {w:'point of view',jp:'視点',lvl:2},{w:'change my mind',jp:'考えを変える',lvl:2},{w:'strong opinion',jp:'強い意見',lvl:2},{w:'personal view',jp:'個人的な見解',lvl:2},{w:'valid point',jp:'妥当な指摘',lvl:2},{w:'debatable',jp:'議論の余地がある',lvl:2},{w:'agree to disagree',jp:'意見の違いを認め合う',lvl:2},{w:'share an opinion',jp:'意見を共有する',lvl:2},
    {w:'discerning judgment',jp:'的確な判断力',lvl:3},{w:'intellectual humility',jp:'知的謙虚さ',lvl:3},{w:'reasoned argument',jp:'筋の通った主張',lvl:3},{w:'balanced viewpoint',jp:'バランスの取れた見解',lvl:3},{w:'confirmation bias',jp:'確証バイアス',lvl:3},{w:'open discourse',jp:'開かれた議論',lvl:3},{w:'evidence-based opinion',jp:'根拠に基づいた意見',lvl:3},{w:'rhetorical stance',jp:'修辞的な立場',lvl:3},{w:'perspective-taking',jp:'相手の視点に立つこと',lvl:3},{w:'critical evaluation',jp:'批判的な評価',lvl:3},{w:'informed opinion',jp:'情報に基づいた意見',lvl:3},
  ],
  culture: [
    {w:'tradition',jp:'伝統',lvl:2},{w:'custom',jp:'慣習',lvl:2},{w:'festival',jp:'祭り',lvl:1},
    {w:'holiday',jp:'祝日',lvl:1},{w:'religion',jp:'宗教',lvl:2},{w:'belief',jp:'信仰・考え方',lvl:2},
    {w:'language',jp:'言語',lvl:1},{w:'dialect',jp:'方言',lvl:2},{w:'accent',jp:'アクセント・なまり',lvl:2},
    {w:'multicultural',jp:'多文化な',lvl:3},{w:'diversity',jp:'多様性',lvl:2},{w:'equality',jp:'平等',lvl:2},
    {w:'stereotype',jp:'ステレオタイプ',lvl:3},{w:'prejudice',jp:'偏見',lvl:3},
    {w:'global',jp:'グローバルな',lvl:2},{w:'international',jp:'国際的な',lvl:2},
    {w:'exchange',jp:'交流・交換',lvl:2},{w:'understanding',jp:'理解',lvl:2},
    {w:'respect',jp:'尊重',lvl:2},{w:'peace',jp:'平和',lvl:1},{w:'environment',jp:'環境',lvl:2},
    {w:'cultural norms',jp:'文化的な規範',lvl:3},{w:'assimilation',jp:'同化',lvl:3},
    {w:'cultural relativism',jp:'文化相対主義',lvl:3},{w:'collectivism',jp:'集団主義',lvl:3},{w:'individualism',jp:'個人主義',lvl:3},{w:'cultural fluency',jp:'文化的な理解力',lvl:3},{w:'social fabric',jp:'社会構造',lvl:3},{w:'cross-cultural exchange',jp:'異文化交流',lvl:3},
    {w:'country',jp:'国',lvl:1},{w:'flag',jp:'国旗',lvl:1},{w:'people',jp:'人々',lvl:1},{w:'clothes',jp:'服',lvl:1},{w:'greeting',jp:'挨拶',lvl:1},{w:'song',jp:'歌',lvl:1},{w:'dance',jp:'踊り',lvl:1},{w:'food culture',jp:'食文化',lvl:1},{w:'home country',jp:'母国',lvl:1},{w:'different culture',jp:'違う文化',lvl:1},{w:'special day',jp:'特別な日',lvl:1},{w:'meet new people',jp:'新しい人に会う',lvl:1},{w:'learn about',jp:'〜について学ぶ',lvl:1},{w:'be curious',jp:'好奇心を持つ',lvl:1},{w:'be open-minded',jp:'心が広い',lvl:1},{w:'share culture',jp:'文化を共有する',lvl:1},
    {w:'cultural exchange program',jp:'文化交流プログラム',lvl:2},{w:'cultural difference',jp:'文化の違い',lvl:2},{w:'traditional value',jp:'伝統的な価値観',lvl:2},{w:'cultural background',jp:'文化的背景',lvl:2},{w:'social custom',jp:'社会的な慣習',lvl:2},{w:'foreign culture',jp:'外国の文化',lvl:2},
    {w:'cultural adaptation',jp:'文化への適応',lvl:3},{w:'ethnocentrism',jp:'自民族中心主義',lvl:3},{w:'cultural competence',jp:'異文化理解力',lvl:3},{w:'hybridization',jp:'文化の融合',lvl:3},{w:'globalized identity',jp:'グローバル化されたアイデンティティ',lvl:3},{w:'cultural nuance',jp:'文化的なニュアンス',lvl:3},{w:'intercultural dialogue',jp:'異文化間の対話',lvl:3},{w:'cultural preservation effort',jp:'文化保存の取り組み',lvl:3},{w:'shared humanity',jp:'共通の人間性',lvl:3},
  ],
  choice_mountain_sea: [
    {w:'mountain',jp:'山',lvl:1},{w:'sea',jp:'海',lvl:1},{w:'beach',jp:'ビーチ',lvl:1},
    {w:'hiking',jp:'ハイキング',lvl:1},{w:'surfing',jp:'サーフィン',lvl:1},{w:'camping',jp:'キャンプ',lvl:1},
    {w:'scenery',jp:'景色',lvl:2},{w:'fresh air',jp:'新鮮な空気',lvl:1},{w:'waves',jp:'波',lvl:1},
    {w:'peaceful',jp:'穏やか',lvl:1},{w:'exciting',jp:'わくわく',lvl:1},{w:'nature',jp:'自然',lvl:1},
    {w:'prefer',jp:'好む',lvl:1},{w:'because',jp:'なぜなら',lvl:1},{w:'both',jp:'どちらも',lvl:1},
    {w:'relaxing',jp:'リラックス',lvl:1},{w:'adventure',jp:'冒険',lvl:1},{w:'view',jp:'眺め',lvl:1},
    {w:'altitude',jp:'標高',lvl:2},{w:'coastal',jp:'沿岸の',lvl:2},{w:'landscape',jp:'風景',lvl:2},
    {w:'breathtaking',jp:'息をのむような',lvl:3},{w:'tranquility',jp:'静けさ',lvl:3},{w:'rugged terrain',jp:'険しい地形',lvl:3},
    {w:'panoramic view',jp:'パノラマの景色',lvl:2},{w:'trail',jp:'登山道',lvl:2},{w:'tide',jp:'潮',lvl:2},{w:'summit',jp:'山頂',lvl:2},{w:'shoreline',jp:'海岸線',lvl:2},{w:'wildlife spotting',jp:'野生動物観察',lvl:2},{w:'weekend getaway',jp:'週末の小旅行',lvl:2},
    {w:'untouched nature',jp:'手つかずの自然',lvl:3},{w:'secluded spot',jp:'人里離れた場所',lvl:3},{w:'awe-inspiring',jp:'畏敬の念を抱かせる',lvl:3},{w:'ecosystem',jp:'生態系',lvl:3},{w:'geological formation',jp:'地形',lvl:3},{w:'natural wonder',jp:'自然の驚異',lvl:3},{w:'immersive scenery',jp:'没入感のある景色',lvl:3},
    {w:'hill',jp:'丘',lvl:1},{w:'wave',jp:'波',lvl:1},{w:'sand',jp:'砂',lvl:1},
    {w:'hiking boots',jp:'登山靴',lvl:2},{w:'sea breeze',jp:'海風',lvl:2},{w:'mountain air',jp:'山の空気',lvl:2},{w:'boat trip',jp:'船旅',lvl:2},{w:'campsite',jp:'キャンプ場',lvl:2},{w:'snorkeling',jp:'シュノーケリング',lvl:2},{w:'rock climbing',jp:'ロッククライミング',lvl:2},{w:'beach resort',jp:'ビーチリゾート',lvl:2},{w:'peak season',jp:'最盛期',lvl:2},
    {w:'high-altitude',jp:'高地の',lvl:3},{w:'marine ecosystem',jp:'海洋生態系',lvl:3},{w:'alpine scenery',jp:'高山の風景',lvl:3},{w:'coastal biodiversity',jp:'沿岸の生物多様性',lvl:3},{w:'remote wilderness',jp:'人里離れた自然',lvl:3},{w:'seaside serenity',jp:'海辺の静けさ',lvl:3},{w:'mountain range',jp:'山脈',lvl:3},{w:'oceanic vastness',jp:'海の広大さ',lvl:3},{w:'terrain difficulty',jp:'地形の難易度',lvl:3},{w:'natural sanctuary',jp:'自然の聖域',lvl:3},
  ],
  choice_night_morning: [
    {w:'night owl',jp:'夜型',lvl:2},{w:'early bird',jp:'朝型',lvl:2},{w:'stay up late',jp:'夜更かし',lvl:1},
    {w:'wake up early',jp:'早起き',lvl:1},{w:'midnight',jp:'深夜',lvl:1},{w:'sunrise',jp:'日の出',lvl:1},
    {w:'productive',jp:'生産的な',lvl:2},{w:'quiet',jp:'静か',lvl:1},{w:'sleep',jp:'睡眠',lvl:1},
    {w:'routine',jp:'習慣',lvl:1},{w:'energy',jp:'エネルギー',lvl:1},{w:'prefer',jp:'好む',lvl:1},
    {w:'usually',jp:'たいてい',lvl:1},{w:'depends',jp:'場合による',lvl:1},{w:'lately',jp:'最近は',lvl:2},
    {w:'tired',jp:'疲れた',lvl:1},{w:'focus',jp:'集中する',lvl:1},{w:'alarm',jp:'アラーム',lvl:1},
    {w:'circadian rhythm',jp:'概日リズム',lvl:3},{w:'peak productivity',jp:'生産性が最も高い時間帯',lvl:3},{w:'sleep cycle',jp:'睡眠サイクル',lvl:3},{w:'chronotype',jp:'朝型・夜型の体質',lvl:3},
    {w:'morning routine',jp:'朝のルーティン',lvl:2},{w:'wind-down time',jp:'寝る前のリラックス時間',lvl:2},{w:'snooze button',jp:'スヌーズボタン',lvl:2},{w:'body clock',jp:'体内時計',lvl:2},{w:'nap',jp:'昼寝',lvl:2},{w:'restful sleep',jp:'ぐっすりした睡眠',lvl:2},
    {w:'sleep deprivation',jp:'睡眠不足',lvl:3},{w:'internal clock',jp:'体内時計',lvl:3},{w:'optimal alertness',jp:'最も冴えている状態',lvl:3},{w:'melatonin',jp:'メラトニン',lvl:3},{w:'sleep hygiene',jp:'睡眠衛生',lvl:3},{w:'REM cycle',jp:'レム睡眠サイクル',lvl:3},
    {w:'sleepy',jp:'眠い',lvl:1},{w:'yawn',jp:'あくび',lvl:1},{w:'get up',jp:'起きる',lvl:1},{w:'go to sleep',jp:'眠る',lvl:1},{w:'bright',jp:'明るい',lvl:1},{w:'dark',jp:'暗い',lvl:1},
    {w:'sleep in',jp:'寝坊する',lvl:2},{w:'set a bedtime',jp:'就寝時間を決める',lvl:2},{w:'morning person',jp:'朝型の人',lvl:2},{w:'stay awake',jp:'起きていられる',lvl:2},{w:'power nap',jp:'仮眠',lvl:2},{w:'wake-up call',jp:'モーニングコール',lvl:2},{w:'grogginess',jp:'ぼんやりした感覚',lvl:2},{w:'evening person',jp:'夜型の人',lvl:2},{w:'sleep schedule',jp:'睡眠スケジュール',lvl:2},{w:'get some rest',jp:'休息をとる',lvl:2},
    {w:'circadian preference',jp:'概日リズムの傾向',lvl:3},{w:'productivity window',jp:'生産性が高い時間帯',lvl:3},{w:'sleep debt',jp:'睡眠負債',lvl:3},{w:'natural wakefulness',jp:'自然な覚醒',lvl:3},{w:'late-night productivity',jp:'夜間の生産性',lvl:3},{w:'early riser advantage',jp:'早起きの利点',lvl:3},{w:'sleep inertia',jp:'睡眠慣性',lvl:3},{w:'biological rhythm',jp:'生体リズム',lvl:3},{w:'wakeful alertness',jp:'覚醒した集中力',lvl:3},{w:'restorative sleep',jp:'回復をもたらす睡眠',lvl:3},
  ],
  choice_online_offline: [
    {w:'online',jp:'オンライン',lvl:1},{w:'in-person',jp:'対面',lvl:2},{w:'face to face',jp:'直接会う',lvl:1},
    {w:'video call',jp:'ビデオ通話',lvl:1},{w:'chat',jp:'チャット',lvl:1},{w:'meeting',jp:'ミーティング',lvl:1},
    {w:'convenient',jp:'便利',lvl:1},{w:'connection',jp:'つながり',lvl:2},{w:'distance',jp:'距離',lvl:1},
    {w:'prefer',jp:'好む',lvl:1},{w:'easier',jp:'より簡単',lvl:1},{w:'better',jp:'より良い',lvl:1},
    {w:'communication',jp:'コミュニケーション',lvl:2},{w:'social',jp:'社交的',lvl:2},
    {w:'technology',jp:'テクノロジー',lvl:1},{w:'both',jp:'どちらも',lvl:1},{w:'depends',jp:'場合による',lvl:1},
    {w:'personally',jp:'個人的には',lvl:2},
    {w:'digital fatigue',jp:'デジタル疲れ',lvl:3},{w:'nonverbal cues',jp:'非言語的な合図',lvl:3},{w:'authentic connection',jp:'本物のつながり',lvl:3},
    {w:'screen fatigue',jp:'画面疲れ',lvl:2},{w:'video conferencing',jp:'ビデオ会議',lvl:2},{w:'in-person meeting',jp:'対面の会議',lvl:2},{w:'social distancing',jp:'ソーシャルディスタンス',lvl:2},{w:'digital communication',jp:'デジタルコミュニケーション',lvl:2},
    {w:'human connection',jp:'人間的なつながり',lvl:3},{w:'mediated interaction',jp:'仲介された交流',lvl:3},{w:'social presence',jp:'社会的な存在感',lvl:3},{w:'communication barrier',jp:'コミュニケーションの壁',lvl:3},{w:'physical proximity',jp:'物理的な近さ',lvl:3},{w:'digital intimacy',jp:'デジタル上の親密さ',lvl:3},
    {w:'call',jp:'電話する',lvl:1},{w:'text',jp:'メッセージを送る',lvl:1},{w:'see someone',jp:'誰かに会う',lvl:1},{w:'talk online',jp:'オンラインで話す',lvl:1},{w:'talk in person',jp:'直接話す',lvl:1},{w:'internet connection',jp:'インターネット接続',lvl:1},{w:'screen',jp:'画面',lvl:1},
    {w:'group chat',jp:'グループチャット',lvl:2},{w:'social gathering',jp:'社交的な集まり',lvl:2},{w:'virtual meetup',jp:'オンライン集まり',lvl:2},{w:'face time',jp:'対面の時間',lvl:2},{w:'online community',jp:'オンラインコミュニティ',lvl:2},{w:'digital detox',jp:'デジタルデトックス',lvl:2},{w:'in-person bonding',jp:'対面での絆づくり',lvl:2},{w:'remote friendship',jp:'遠隔の友情',lvl:2},{w:'text-based chat',jp:'文字ベースのチャット',lvl:2},{w:'live interaction',jp:'ライブでのやり取り',lvl:2},
    {w:'asynchronous communication',jp:'非同期のコミュニケーション',lvl:3},{w:'digital body language',jp:'デジタル上の身体言語',lvl:3},{w:'social capital',jp:'社会関係資本',lvl:3},{w:'interpersonal depth',jp:'対人関係の深さ',lvl:3},{w:'connectivity paradox',jp:'つながりの逆説',lvl:3},{w:'virtual empathy',jp:'バーチャルな共感',lvl:3},{w:'online disinhibition',jp:'オンラインでの抑制の弱まり',lvl:3},{w:'presence and absence',jp:'存在と不在',lvl:3},{w:'communication medium',jp:'コミュニケーション手段',lvl:3},{w:'relational quality',jp:'関係性の質',lvl:3},{w:'technological mediation',jp:'技術による仲介',lvl:3},
  ],
  choice_cats_dogs: [
    {w:'cat',jp:'猫',lvl:1},{w:'dog',jp:'犬',lvl:1},{w:'cute',jp:'かわいい',lvl:1},{w:'fluffy',jp:'ふわふわ',lvl:1},
    {w:'loyal',jp:'忠実',lvl:2},{w:'independent',jp:'独立心が強い',lvl:2},{w:'playful',jp:'遊び好き',lvl:1},
    {w:'calm',jp:'落ち着いている',lvl:1},{w:'energetic',jp:'元気',lvl:1},{w:'pet',jp:'ペット',lvl:1},
    {w:'prefer',jp:'好む',lvl:1},{w:'both',jp:'どちらも',lvl:1},{w:'have one',jp:'飼っている',lvl:1},
    {w:'want to have',jp:'飼いたい',lvl:1},{w:'allergic',jp:'アレルギーがある',lvl:2},
    {w:'walk',jp:'散歩',lvl:1},{w:'purr',jp:'ゴロゴロ',lvl:2},{w:'bark',jp:'吠える',lvl:1},
    {w:'domestication',jp:'家畜化',lvl:3},{w:'temperament',jp:'気質',lvl:3},{w:'companionship',jp:'心の支え',lvl:3},
    {w:'affectionate',jp:'愛情深い',lvl:2},{w:'low-maintenance',jp:'世話の手間が少ない',lvl:2},{w:'territorial',jp:'縄張り意識が強い',lvl:2},{w:'socialization',jp:'社会化',lvl:2},{w:'pack animal',jp:'群れで生きる動物',lvl:2},{w:'lap cat',jp:'膝の上を好む猫',lvl:2},
    {w:'behavioral trait',jp:'行動特性',lvl:3},{w:'domestic instinct',jp:'家畜化された本能',lvl:3},{w:'species disposition',jp:'種としての気質',lvl:3},{w:'emotional bond',jp:'感情的な絆',lvl:3},{w:'nurturing instinct',jp:'育む本能',lvl:3},{w:'pack mentality',jp:'群れの心理',lvl:3},
    {w:'meow',jp:'ニャー',lvl:1},{w:'woof',jp:'ワン',lvl:1},{w:'paw',jp:'足',lvl:1},{w:'tail',jp:'しっぽ',lvl:1},{w:'sleep a lot',jp:'たくさん寝る',lvl:1},{w:'run around',jp:'走り回る',lvl:1},
    {w:'lap time',jp:'膝の上で過ごす時間',lvl:2},{w:'fetch',jp:'持ってくる遊び',lvl:2},{w:'scratching post',jp:'爪とぎ',lvl:2},{w:'dog park',jp:'ドッグラン',lvl:2},{w:'cat tree',jp:'キャットタワー',lvl:2},{w:'obedient',jp:'従順な',lvl:2},{w:'aloof',jp:'よそよそしい',lvl:2},{w:'loyal companion',jp:'忠実な相棒',lvl:2},{w:'playful nature',jp:'遊び好きな性格',lvl:2},{w:'independent nature',jp:'独立した性格',lvl:2},
    {w:'canine loyalty',jp:'犬の忠誠心',lvl:3},{w:'feline independence',jp:'猫の独立心',lvl:3},{w:'pack instinct',jp:'群れの本能',lvl:3},{w:'solitary nature',jp:'単独行動を好む性質',lvl:3},{w:'trainability',jp:'訓練のしやすさ',lvl:3},{w:'low-maintenance pet',jp:'手間のかからないペット',lvl:3},{w:'high-energy breed',jp:'活発な犬種',lvl:3},{w:'affection style',jp:'愛情表現のスタイル',lvl:3},{w:'domestic temperament',jp:'家庭的な気質',lvl:3},{w:'species preference',jp:'種の好み',lvl:3},{w:'emotional companionship',jp:'感情的な寄り添い',lvl:3},
  ],
  choice_coffee_tea: [
    {w:'coffee',jp:'コーヒー',lvl:1},{w:'tea',jp:'お茶',lvl:1},{w:'green tea',jp:'緑茶',lvl:1},
    {w:'black tea',jp:'紅茶',lvl:1},{w:'latte',jp:'ラテ',lvl:1},{w:'espresso',jp:'エスプレッソ',lvl:1},
    {w:'herbal tea',jp:'ハーブティー',lvl:1},{w:'boba',jp:'タピオカ',lvl:1},{w:'sweet',jp:'甘い',lvl:1},
    {w:'bitter',jp:'苦い',lvl:1},{w:'hot',jp:'ホット',lvl:1},{w:'iced',jp:'アイス',lvl:1},
    {w:'prefer',jp:'好む',lvl:1},{w:'morning',jp:'朝',lvl:1},{w:'relax',jp:'リラックス',lvl:1},
    {w:'caffeine',jp:'カフェイン',lvl:2},{w:'favorite',jp:'お気に入り',lvl:1},{w:'drink',jp:'飲み物',lvl:1},
    {w:'brew',jp:'淹れる',lvl:2},{w:'aroma',jp:'香り',lvl:2},{w:'roast',jp:'焙煎',lvl:2},
    {w:'caffeine tolerance',jp:'カフェイン耐性',lvl:3},{w:'artisanal',jp:'職人技の',lvl:3},{w:'ritual',jp:'習慣・儀式',lvl:3},
    {w:'single-origin',jp:'シングルオリジン',lvl:2},{w:'blend',jp:'ブレンド',lvl:2},{w:'infusion',jp:'抽出',lvl:2},{w:'barista',jp:'バリスタ',lvl:2},{w:'steep',jp:'蒸らす',lvl:2},{w:'grind size',jp:'挽き目',lvl:2},
    {w:'flavor profile',jp:'風味のプロファイル',lvl:3},{w:'bean-to-cup',jp:'豆から一杯まで',lvl:3},{w:'terroir',jp:'産地の風土',lvl:3},{w:'brewing method',jp:'抽出方法',lvl:3},{w:'caffeine dependency',jp:'カフェイン依存',lvl:3},{w:'sensory experience',jp:'感覚的な体験',lvl:3},
    {w:'cup',jp:'カップ',lvl:1},{w:'warm',jp:'温かい',lvl:1},{w:'smell',jp:'香り',lvl:1},
    {w:'coffee shop',jp:'コーヒーショップ',lvl:2},{w:'tea leaves',jp:'茶葉',lvl:2},{w:'caffeine boost',jp:'カフェインによる目覚め',lvl:2},{w:'decaf',jp:'カフェイン抜き',lvl:2},{w:'sweetener',jp:'甘味料',lvl:2},{w:'refill',jp:'おかわり',lvl:2},{w:'cozy café',jp:'居心地の良いカフェ',lvl:2},{w:'tea ceremony',jp:'茶道',lvl:2},{w:'coffee break',jp:'コーヒー休憩',lvl:2},{w:'morning brew',jp:'朝のひと杯',lvl:2},
    {w:'origin story',jp:'産地の物語',lvl:3},{w:'roast profile',jp:'焙煎プロファイル',lvl:3},{w:'tea culture',jp:'お茶の文化',lvl:3},{w:'coffee connoisseur',jp:'コーヒー通',lvl:3},{w:'flavor nuance',jp:'味の微妙な違い',lvl:3},{w:'brewing ritual',jp:'淹れる儀式',lvl:3},{w:'specialty coffee',jp:'スペシャルティコーヒー',lvl:3},{w:'tea appreciation',jp:'お茶を味わうこと',lvl:3},{w:'caffeine sensitivity',jp:'カフェインへの敏感さ',lvl:3},{w:'artisan roaster',jp:'職人による焙煎業者',lvl:3},{w:'mindful sipping',jp:'味わいながら飲むこと',lvl:3},
  ],
  choice_games_sports: [
    {w:'video game',jp:'ビデオゲーム',lvl:1},{w:'sport',jp:'スポーツ',lvl:1},{w:'outdoor',jp:'アウトドア',lvl:1},
    {w:'indoor',jp:'インドア',lvl:1},{w:'team',jp:'チーム',lvl:1},{w:'solo',jp:'一人で',lvl:1},
    {w:'competitive',jp:'競争的な',lvl:2},{w:'fun',jp:'楽しい',lvl:1},{w:'exercise',jp:'運動',lvl:1},
    {w:'strategy',jp:'戦略',lvl:2},{w:'skill',jp:'スキル',lvl:1},{w:'prefer',jp:'好む',lvl:1},
    {w:'both',jp:'どちらも',lvl:1},{w:'depends on mood',jp:'気分による',lvl:2},
    {w:'lately',jp:'最近',lvl:1},{w:'play',jp:'プレイする',lvl:1},{w:'win',jp:'勝つ',lvl:1},
    {w:'tournament',jp:'大会',lvl:2},
    {w:'sedentary',jp:'座りがちな',lvl:3},{w:'hand-eye coordination',jp:'目と手の協調運動',lvl:3},{w:'competitive gaming',jp:'eスポーツ',lvl:3},
    {w:'reflexes',jp:'反射神経',lvl:2},{w:'strategy game',jp:'戦略ゲーム',lvl:2},{w:'team spirit',jp:'チームスピリット',lvl:2},{w:'leaderboard',jp:'ランキング表',lvl:2},{w:'screen time',jp:'画面を見る時間',lvl:2},{w:'physical activity',jp:'身体活動',lvl:2},
    {w:'cognitive skill',jp:'認知スキル',lvl:3},{w:'competitive drive',jp:'競争心',lvl:3},{w:'esports industry',jp:'eスポーツ業界',lvl:3},{w:'physical stamina',jp:'身体的なスタミナ',lvl:3},{w:'strategic thinking',jp:'戦略的思考',lvl:3},{w:'immersive gameplay',jp:'没入感のあるゲーム体験',lvl:3},
    {w:'ball',jp:'ボール',lvl:1},{w:'controller',jp:'コントローラー',lvl:1},{w:'score a point',jp:'得点する',lvl:1},{w:'have fun',jp:'楽しむ',lvl:1},{w:'play together',jp:'一緒に遊ぶ',lvl:1},{w:'take a break',jp:'休憩する',lvl:1},
    {w:'multiplayer',jp:'マルチプレイヤー',lvl:2},{w:'game controller',jp:'ゲームコントローラー',lvl:2},{w:'practice session',jp:'練習セッション',lvl:2},{w:'team sport',jp:'チームスポーツ',lvl:2},{w:'solo player',jp:'一人プレイヤー',lvl:2},{w:'level up',jp:'レベルアップする',lvl:2},{w:'high score',jp:'ハイスコア',lvl:2},{w:'physical game',jp:'体を動かすゲーム',lvl:2},{w:'game strategy',jp:'ゲームの戦略',lvl:2},{w:'friendly match',jp:'親善試合',lvl:2},
    {w:'gaming culture',jp:'ゲーム文化',lvl:3},{w:'sports culture',jp:'スポーツ文化',lvl:3},{w:'mental engagement',jp:'精神的な没入',lvl:3},{w:'physical exertion level',jp:'身体的負荷の度合い',lvl:3},{w:'reflex training',jp:'反射神経のトレーニング',lvl:3},{w:'strategic depth',jp:'戦略の奥深さ',lvl:3},{w:'competitive scene',jp:'競技シーン',lvl:3},{w:'skill-based game',jp:'技術重視のゲーム',lvl:3},{w:'outdoor activity level',jp:'屋外活動の度合い',lvl:3},{w:'team coordination',jp:'チーム連携',lvl:3},{w:'gamified fitness',jp:'ゲーム化されたフィットネス',lvl:3},
  ],
  choice_books_movies: [
    {w:'book',jp:'本',lvl:1},{w:'movie',jp:'映画',lvl:1},{w:'novel',jp:'小説',lvl:1},{w:'film',jp:'フィルム',lvl:1},
    {w:'read',jp:'読む',lvl:1},{w:'watch',jp:'見る',lvl:1},{w:'imagination',jp:'想像力',lvl:2},
    {w:'visual',jp:'視覚的',lvl:2},{w:'story',jp:'ストーリー',lvl:1},{w:'character',jp:'キャラクター',lvl:1},
    {w:'prefer',jp:'好む',lvl:1},{w:'both',jp:'どちらも',lvl:1},{w:'recently',jp:'最近',lvl:1},
    {w:'recommend',jp:'おすすめ',lvl:1},{w:'genre',jp:'ジャンル',lvl:2},{w:'favorite',jp:'お気に入り',lvl:1},
    {w:'ending',jp:'結末',lvl:1},{w:'page-turner',jp:'引き込まれる本',lvl:3},
    {w:'adaptation',jp:'映像化・脚色',lvl:2},
    {w:'narrative structure',jp:'物語の構成',lvl:3},{w:'character development',jp:'キャラクターの成長描写',lvl:3},{w:'suspend disbelief',jp:'現実味のなさを気にせず楽しむ',lvl:3},
    {w:'page-turner',jp:'引き込まれる本',lvl:2},{w:'cliffhanger',jp:'続きが気になる展開',lvl:2},{w:'protagonist',jp:'主人公',lvl:2},{w:'subplot',jp:'サブストーリー',lvl:2},{w:'film adaptation',jp:'映画化',lvl:2},
    {w:'literary device',jp:'文学的技法',lvl:3},{w:'thematic depth',jp:'テーマの深み',lvl:3},{w:'visual storytelling',jp:'映像による物語表現',lvl:3},{w:'narrative pacing',jp:'物語のテンポ',lvl:3},{w:'immersive world-building',jp:'没入感のある世界観構築',lvl:3},{w:'symbolism',jp:'象徴表現',lvl:3},
    {w:'story',jp:'物語',lvl:1},{w:'ending',jp:'結末',lvl:1},{w:'main character',jp:'主人公',lvl:1},{w:'exciting',jp:'わくわくする',lvl:1},{w:'sad ending',jp:'悲しい結末',lvl:1},{w:'happy ending',jp:'ハッピーエンド',lvl:1},
    {w:'plot summary',jp:'あらすじ',lvl:2},{w:'main theme',jp:'主題',lvl:2},{w:'supporting character',jp:'脇役',lvl:2},{w:'book series',jp:'本のシリーズ',lvl:2},{w:'movie franchise',jp:'映画シリーズ',lvl:2},{w:'reading experience',jp:'読書体験',lvl:2},{w:'viewing experience',jp:'鑑賞体験',lvl:2},{w:'gripping story',jp:'引き込まれる物語',lvl:2},{w:'slow-paced',jp:'テンポの遅い',lvl:2},{w:'fast-paced',jp:'テンポの速い',lvl:2},{w:'well-written',jp:'よく書かれた',lvl:2},
    {w:'literary merit',jp:'文学的価値',lvl:3},{w:'cinematic technique',jp:'映画的技法',lvl:3},{w:'character arc',jp:'キャラクターの成長過程',lvl:3},{w:'unreliable narrator',jp:'信頼できない語り手',lvl:3},{w:'genre subversion',jp:'ジャンルの意外性',lvl:3},{w:'thematic complexity',jp:'テーマの複雑さ',lvl:3},{w:'authorial intent',jp:'作者の意図',lvl:3},{w:'visual metaphor',jp:'視覚的な比喩',lvl:3},{w:'narrative ambiguity',jp:'物語の曖昧さ',lvl:3},{w:'immersive narrative',jp:'没入感のある物語',lvl:3},
    {w:'novel plot',jp:'小説のプロット',lvl:1},{w:'movie scene',jp:'映画のシーン',lvl:1},
    {w:'book cover',jp:'本の表紙',lvl:2},
  ],
  choice_city_country: [
    {w:'city',jp:'都市',lvl:1},{w:'countryside',jp:'田舎',lvl:1},{w:'urban',jp:'都会的な',lvl:2},
    {w:'rural',jp:'農村の',lvl:2},{w:'convenient',jp:'便利',lvl:1},{w:'peaceful',jp:'穏やか',lvl:1},
    {w:'busy',jp:'忙しい',lvl:1},{w:'quiet',jp:'静か',lvl:1},{w:'nature',jp:'自然',lvl:1},
    {w:'commute',jp:'通勤',lvl:2},{w:'transport',jp:'交通',lvl:1},{w:'prefer',jp:'好む',lvl:1},
    {w:'grew up in',jp:'〜で育った',lvl:1},{w:'live in',jp:'〜に住んでいる',lvl:1},
    {w:'someday',jp:'いつか',lvl:1},{w:'both',jp:'どちらも',lvl:1},{w:'lifestyle',jp:'ライフスタイル',lvl:2},
    {w:'community',jp:'コミュニティ',lvl:2},
    {w:'gentrification',jp:'ジェントリフィケーション',lvl:3},{w:'population density',jp:'人口密度',lvl:3},{w:'quality of life',jp:'生活の質',lvl:3},{w:'work commute',jp:'通勤',lvl:3},
    {w:'infrastructure',jp:'インフラ',lvl:2},{w:'public transport',jp:'公共交通機関',lvl:2},{w:'cost of living',jp:'生活費',lvl:2},{w:'community feel',jp:'コミュニティの雰囲気',lvl:2},{w:'green space',jp:'緑地',lvl:2},
    {w:'urban sprawl',jp:'都市のスプロール化',lvl:3},{w:'rural depopulation',jp:'農村の過疎化',lvl:3},{w:'sense of community',jp:'コミュニティ意識',lvl:3},{w:'urban planning',jp:'都市計画',lvl:3},{w:'lifestyle trade-off',jp:'ライフスタイルのトレードオフ',lvl:3},{w:'accessibility',jp:'利便性',lvl:3},
    {w:'crowded',jp:'混雑した',lvl:1},{w:'peaceful place',jp:'静かな場所',lvl:1},{w:'big city',jp:'大都市',lvl:1},{w:'small town',jp:'小さな町',lvl:1},{w:'noisy',jp:'うるさい',lvl:1},{w:'fresh air',jp:'新鮮な空気',lvl:1},{w:'traffic',jp:'交通',lvl:1},
    {w:'skyline',jp:'スカイライン',lvl:2},{w:'local market',jp:'地元の市場',lvl:2},{w:'suburban life',jp:'郊外の生活',lvl:2},{w:'city pace',jp:'都市のペース',lvl:2},{w:'farmland',jp:'農地',lvl:2},{w:'city amenities',jp:'都市の設備',lvl:2},{w:'small-town charm',jp:'小さな町の魅力',lvl:2},{w:'urban lifestyle',jp:'都会的な生活様式',lvl:2},{w:'neighborhood vibe',jp:'地域の雰囲気',lvl:2},{w:'housing cost',jp:'住宅費',lvl:2},
    {w:'urban-rural divide',jp:'都市と地方の格差',lvl:3},{w:'metropolitan area',jp:'大都市圏',lvl:3},{w:'quality-of-life factor',jp:'生活の質を左右する要因',lvl:3},{w:'urban density',jp:'都市の人口密度',lvl:3},{w:'rural charm',jp:'田舎の魅力',lvl:3},{w:'city infrastructure',jp:'都市インフラ',lvl:3},{w:'community intimacy',jp:'地域の親密さ',lvl:3},{w:'urban anonymity',jp:'都会の匿名性',lvl:3},{w:'pace of life',jp:'生活のペース',lvl:3},{w:'settlement pattern',jp:'居住パターン',lvl:3},
  ],
  career: [
    {w:'dream job',jp:'夢の仕事',lvl:1},{w:'career path',jp:'キャリアパス',lvl:2},{w:'major',jp:'専攻',lvl:2},
    {w:'graduate',jp:'卒業する',lvl:1},{w:'internship',jp:'インターン',lvl:2},{w:'salary',jp:'給料',lvl:2},
    {w:'passion',jp:'情熱',lvl:2},{w:'work-life balance',jp:'仕事と生活のバランス',lvl:3},
    {w:'entrepreneur',jp:'起業家',lvl:3},{w:'engineer',jp:'エンジニア',lvl:1},{w:'teacher',jp:'教師',lvl:1},
    {w:'doctor',jp:'医者',lvl:1},{w:'artist',jp:'アーティスト',lvl:1},{w:'scientist',jp:'科学者',lvl:1},
    {w:'goal',jp:'目標',lvl:1},{w:'future',jp:'将来',lvl:1},{w:'skill',jp:'スキル',lvl:1},
    {w:'challenge',jp:'挑戦',lvl:1},{w:'job security',jp:'雇用の安定',lvl:3},
    {w:'career trajectory',jp:'キャリアの軌跡',lvl:3},
    {w:'job hunting',jp:'就職活動',lvl:2},{w:'career fair',jp:'キャリアフェア',lvl:2},{w:'mentor',jp:'メンター',lvl:2},{w:'job satisfaction',jp:'仕事の満足度',lvl:2},{w:'career change',jp:'キャリアチェンジ',lvl:2},
    {w:'professional development',jp:'専門的な能力開発',lvl:3},{w:'career pivot',jp:'キャリアの方向転換',lvl:3},{w:'long-term vision',jp:'長期的なビジョン',lvl:3},{w:'skill gap',jp:'スキルの不足',lvl:3},{w:'industry disruption',jp:'業界の変革',lvl:3},{w:'work fulfillment',jp:'仕事のやりがい',lvl:3},
    {w:'job',jp:'仕事',lvl:1},{w:'work hard',jp:'一生懸命働く',lvl:1},{w:'future job',jp:'将来の仕事',lvl:1},{w:'want to be',jp:'〜になりたい',lvl:1},{w:'good at',jp:'〜が得意',lvl:1},{w:'try my best',jp:'ベストを尽くす',lvl:1},{w:'have a goal',jp:'目標を持つ',lvl:1},{w:'dream job',jp:'夢の仕事',lvl:1},{w:'get a job',jp:'仕事に就く',lvl:1},
    {w:'career goal',jp:'キャリア目標',lvl:2},{w:'work experience',jp:'職務経験',lvl:2},{w:'job opportunity',jp:'就職の機会',lvl:2},{w:'career choice',jp:'キャリアの選択',lvl:2},{w:'professional skill',jp:'専門的なスキル',lvl:2},{w:'career advice',jp:'キャリアに関するアドバイス',lvl:2},{w:'work environment',jp:'職場環境',lvl:2},{w:'career plan',jp:'キャリアプラン',lvl:2},{w:'field of interest',jp:'興味のある分野',lvl:2},{w:'career development',jp:'キャリア開発',lvl:2},
    {w:'career fulfillment',jp:'キャリアの充実感',lvl:3},{w:'professional reinvention',jp:'職業的な再出発',lvl:3},{w:'vocational calling',jp:'天職',lvl:3},{w:'career resilience',jp:'キャリアにおける回復力',lvl:3},{w:'occupational identity',jp:'職業的アイデンティティ',lvl:3},{w:'strategic career move',jp:'戦略的なキャリアの選択',lvl:3},{w:'professional aspiration',jp:'職業上の志',lvl:3},{w:'career trajectory shift',jp:'キャリアの軌道修正',lvl:3},{w:'industry expertise',jp:'業界での専門性',lvl:3},{w:'meaningful work',jp:'意義のある仕事',lvl:3},
    {w:'ideal job',jp:'理想の仕事',lvl:1},
  ],
  festivals: [
    {w:'festival',jp:'お祭り',lvl:1},{w:'holiday',jp:'祝日',lvl:1},{w:'celebrate',jp:'お祝いする',lvl:1},
    {w:'tradition',jp:'伝統',lvl:2},{w:'fireworks',jp:'花火',lvl:1},{w:'parade',jp:'パレード',lvl:1},
    {w:'costume',jp:'衣装',lvl:1},{w:'food stall',jp:'屋台',lvl:1},{w:'New Year',jp:'お正月',lvl:1},
    {w:'Christmas',jp:'クリスマス',lvl:1},{w:'Lunar New Year',jp:'旧正月',lvl:1},
    {w:'harvest festival',jp:'収穫祭',lvl:2},{w:'music festival',jp:'音楽フェス',lvl:1},
    {w:'family gathering',jp:'家族の集まり',lvl:1},{w:'gift',jp:'プレゼント',lvl:1},
    {w:'decoration',jp:'飾り',lvl:1},{w:'special food',jp:'特別な食べ物',lvl:1},{w:'fun',jp:'楽しい',lvl:1},
    {w:'ritual',jp:'儀式',lvl:2},{w:'commemorate',jp:'記念する',lvl:2},
    {w:'cultural heritage',jp:'文化遺産',lvl:3},{w:'communal celebration',jp:'共同体でのお祝い',lvl:3},{w:'age-old tradition',jp:'古くからの伝統',lvl:3},
    {w:'street performance',jp:'大道芸',lvl:2},{w:'traditional attire',jp:'伝統衣装',lvl:2},{w:'lantern',jp:'提灯',lvl:2},{w:'ceremony',jp:'儀式',lvl:2},{w:'seasonal event',jp:'季節のイベント',lvl:2},
    {w:'cultural significance',jp:'文化的な意義',lvl:3},{w:'collective memory',jp:'集合的記憶',lvl:3},{w:'rite of passage',jp:'通過儀礼',lvl:3},{w:'intangible heritage',jp:'無形文化遺産',lvl:3},{w:'festive atmosphere',jp:'祝祭の雰囲気',lvl:3},{w:'ritualistic practice',jp:'儀式的な慣習',lvl:3},
    {w:'party',jp:'パーティー',lvl:1},{w:'candle',jp:'ろうそく',lvl:1},{w:'balloon',jp:'風船',lvl:1},{w:'celebration',jp:'祝賀',lvl:1},
    {w:'street festival',jp:'路上フェスティバル',lvl:2},{w:'traditional dance',jp:'伝統舞踊',lvl:2},{w:'festive mood',jp:'祭りの雰囲気',lvl:2},{w:'annual event',jp:'年中行事',lvl:2},{w:'local celebration',jp:'地域のお祝い',lvl:2},{w:'holiday spirit',jp:'祝日の雰囲気',lvl:2},{w:'special occasion',jp:'特別な機会',lvl:2},{w:'gift-giving',jp:'贈り物をすること',lvl:2},{w:'festival crowd',jp:'祭りの人混み',lvl:2},{w:'cultural event',jp:'文化イベント',lvl:2},{w:'seasonal celebration',jp:'季節のお祝い',lvl:2},
    {w:'ceremonial tradition',jp:'儀式的な伝統',lvl:3},{w:'folklore',jp:'民間伝承',lvl:3},{w:'communal identity',jp:'共同体のアイデンティティ',lvl:3},{w:'festival economy',jp:'祭りによる経済効果',lvl:3},{w:'cultural preservation',jp:'文化の継承',lvl:3},{w:'ancestral custom',jp:'先祖代々の慣習',lvl:3},{w:'shared jubilation',jp:'共に分かち合う喜び',lvl:3},{w:'ritual significance',jp:'儀式の意義',lvl:3},{w:'festivity',jp:'お祭り騒ぎ',lvl:3},{w:'cultural continuity',jp:'文化の連続性',lvl:3},{w:'symbolic celebration',jp:'象徴的な祝い',lvl:3},
  ],
  cooking: [
    {w:'recipe',jp:'レシピ',lvl:1},{w:'ingredient',jp:'食材',lvl:1},{w:'cook',jp:'料理する',lvl:1},
    {w:'bake',jp:'焼く',lvl:1},{w:'fry',jp:'揚げる',lvl:1},{w:'boil',jp:'茹でる',lvl:1},
    {w:'chop',jp:'切る',lvl:1},{w:'season',jp:'味付けする',lvl:2},{w:'taste',jp:'味見する',lvl:1},
    {w:'delicious',jp:'美味しい',lvl:1},{w:'homemade',jp:'手作り',lvl:1},{w:'traditional',jp:'伝統的な',lvl:2},
    {w:'easy to make',jp:'簡単に作れる',lvl:1},{w:'my specialty',jp:'得意料理',lvl:2},
    {w:'local dish',jp:'郷土料理',lvl:2},{w:'spice',jp:'スパイス',lvl:1},{w:'sweet',jp:'甘い',lvl:1},
    {w:'savory',jp:'塩味の',lvl:2},
    {w:'culinary',jp:'料理の',lvl:3},{w:'umami',jp:'うま味',lvl:3},{w:'fermentation',jp:'発酵',lvl:3},{w:'from scratch',jp:'一から手作りで',lvl:3},
    {w:'marinate',jp:'漬け込む',lvl:2},{w:'simmer',jp:'煮込む',lvl:2},{w:'garnish',jp:'飾り付ける',lvl:2},{w:'seasoning blend',jp:'調味料のブレンド',lvl:2},{w:'meal prep',jp:'作り置き',lvl:2},
    {w:'flavor pairing',jp:'味の組み合わせ',lvl:3},{w:'culinary technique',jp:'調理技術',lvl:3},{w:'gastronomy',jp:'美食学',lvl:3},{w:'mise en place',jp:'下ごしらえ',lvl:3},{w:'texture contrast',jp:'食感の対比',lvl:3},{w:'artisanal cooking',jp:'職人技の調理',lvl:3},
    {w:'pan',jp:'フライパン',lvl:1},{w:'pot',jp:'鍋',lvl:1},{w:'oven',jp:'オーブン',lvl:1},{w:'stir',jp:'かき混ぜる',lvl:1},{w:'mix',jp:'混ぜる',lvl:1},{w:'peel',jp:'皮をむく',lvl:1},{w:'slice',jp:'薄く切る',lvl:1},
    {w:'preheat',jp:'予熱する',lvl:2},{w:'ingredient list',jp:'材料リスト',lvl:2},{w:'cooking time',jp:'調理時間',lvl:2},{w:'meal planning',jp:'献立作り',lvl:2},{w:'family recipe',jp:'家族に伝わるレシピ',lvl:2},{w:'signature recipe',jp:'得意のレシピ',lvl:2},{w:'cooking skill',jp:'調理スキル',lvl:2},{w:'kitchen tool',jp:'調理器具',lvl:2},{w:'well-balanced meal',jp:'バランスの取れた食事',lvl:2},{w:'homemade sauce',jp:'自家製ソース',lvl:2},
    {w:'culinary creativity',jp:'料理における創造性',lvl:3},{w:'flavor experimentation',jp:'味の実験',lvl:3},{w:'traditional technique',jp:'伝統的な技法',lvl:3},{w:'plating',jp:'盛り付け',lvl:3},{w:'cooking philosophy',jp:'料理に対する考え方',lvl:3},{w:'ingredient sourcing',jp:'食材の調達',lvl:3},{w:'kitchen mastery',jp:'調理の熟達',lvl:3},{w:'recipe adaptation',jp:'レシピのアレンジ',lvl:3},{w:'culinary tradition',jp:'料理の伝統',lvl:3},{w:'sensory cooking',jp:'五感を使った料理',lvl:3},
  ],
  routine: [
    {w:'wake up',jp:'起きる',lvl:1},{w:'breakfast',jp:'朝食',lvl:1},{w:'commute',jp:'通学・通勤',lvl:2},
    {w:'school',jp:'学校',lvl:1},{w:'lunch break',jp:'昼休み',lvl:1},{w:'after school',jp:'放課後',lvl:1},
    {w:'dinner',jp:'夕食',lvl:1},{w:'bath',jp:'お風呂',lvl:1},{w:'bedtime',jp:'就寝時間',lvl:1},
    {w:'exercise',jp:'運動',lvl:1},{w:'study',jp:'勉強',lvl:1},{w:'hobby',jp:'趣味',lvl:1},
    {w:'weekend',jp:'週末',lvl:1},{w:'busy',jp:'忙しい',lvl:1},{w:'relax',jp:'くつろぐ',lvl:1},
    {w:'usually',jp:'たいてい',lvl:1},{w:'routine',jp:'ルーティン',lvl:1},{w:'schedule',jp:'スケジュール',lvl:1},
    {w:'multitask',jp:'同時進行する',lvl:2},{w:'unwind',jp:'ゆっくりする',lvl:2},{w:'time management',jp:'時間管理',lvl:2},
    {w:'creature of habit',jp:'決まった行動をする人',lvl:3},{w:'circadian rhythm',jp:'概日リズム',lvl:3},{w:'monotonous',jp:'単調な',lvl:3},
    {w:'morning ritual',jp:'朝の習慣',lvl:2},{w:'wind down',jp:'落ち着かせる',lvl:2},{w:'procrastinate',jp:'先延ばしにする',lvl:2},{w:'productivity hack',jp:'生産性を上げる工夫',lvl:2},{w:'daily grind',jp:'毎日の忙しさ',lvl:2},{w:'downtime',jp:'休憩時間',lvl:2},{w:'sync schedule',jp:'予定を合わせる',lvl:2},
    {w:'habitual behavior',jp:'習慣的な行動',lvl:3},{w:'structured routine',jp:'構造化された日課',lvl:3},{w:'work-life integration',jp:'仕事と生活の統合',lvl:3},{w:'burnout prevention',jp:'燃え尽き防止',lvl:3},{w:'self-discipline',jp:'自己規律',lvl:3},{w:'optimal schedule',jp:'最適なスケジュール',lvl:3},{w:'life balance',jp:'生活のバランス',lvl:3},{w:'behavioral pattern',jp:'行動パターン',lvl:3},
    {w:'get dressed',jp:'着替える',lvl:1},{w:'brush teeth',jp:'歯を磨く',lvl:1},{w:'go to bed',jp:'寝る',lvl:1},
    {w:'morning stretch',jp:'朝のストレッチ',lvl:2},{w:'set an alarm',jp:'アラームをセットする',lvl:2},{w:'daily checklist',jp:'毎日のチェックリスト',lvl:2},{w:'errand',jp:'用事',lvl:2},{w:'evening wind-down',jp:'夜のリラックスタイム',lvl:2},{w:'habit tracker',jp:'習慣トラッカー',lvl:2},{w:'weekly plan',jp:'週間計画',lvl:2},{w:'chore',jp:'家事',lvl:2},{w:'consistent schedule',jp:'一定のスケジュール',lvl:2},
    {w:'ritualistic habit',jp:'儀式的な習慣',lvl:3},{w:'routine optimization',jp:'ルーティンの最適化',lvl:3},{w:'productivity system',jp:'生産性向上の仕組み',lvl:3},{w:'time-blocking',jp:'時間割による管理',lvl:3},{w:'habit formation',jp:'習慣形成',lvl:3},{w:'daily discipline',jp:'日々の規律',lvl:3},{w:'structured downtime',jp:'計画的な休息時間',lvl:3},{w:'lifestyle consistency',jp:'生活習慣の一貫性',lvl:3},{w:'self-regulation',jp:'自己管理',lvl:3},
  ],
  facts: [
    {w:'did you know?',jp:'知ってた？',lvl:1},{w:'interesting',jp:'面白い',lvl:1},{w:'surprising',jp:'驚き',lvl:2},
    {w:'actually',jp:'実は',lvl:2},{w:'research',jp:'研究',lvl:2},{w:'science',jp:'科学',lvl:1},
    {w:'history',jp:'歴史',lvl:1},{w:'culture',jp:'文化',lvl:2},{w:'world record',jp:'世界記録',lvl:2},
    {w:'unique',jp:'ユニーク',lvl:2},{w:'rare',jp:'珍しい',lvl:2},{w:'famous',jp:'有名な',lvl:1},
    {w:'believe it or not',jp:'信じられないけど',lvl:2},{w:'I learned that',jp:'〜と知った',lvl:2},
    {w:'recently heard',jp:'最近聞いた',lvl:2},{w:'fascinating',jp:'魅力的な',lvl:3},
    {w:'fact',jp:'事実',lvl:1},{w:'true story',jp:'本当の話',lvl:2},
    {w:'astonishing',jp:'驚くべき',lvl:3},{w:'empirical evidence',jp:'実証的な証拠',lvl:3},{w:'counterintuitive',jp:'直感に反する',lvl:3},
    {w:'mind-blowing',jp:'びっくりするような',lvl:3},{w:'statistically significant',jp:'統計的に有意な',lvl:3},{w:'debunked myth',jp:'否定された俗説',lvl:3},{w:'peer-reviewed',jp:'査読済みの',lvl:3},{w:'anecdotal evidence',jp:'逸話的な証拠',lvl:3},{w:'groundbreaking discovery',jp:'画期的な発見',lvl:3},
    {w:'true fact',jp:'本当の事実',lvl:1},{w:'a fact about',jp:'〜についての事実',lvl:1},{w:'guess what',jp:'ねえ知ってる？',lvl:1},{w:'that\'s amazing',jp:'すごいね',lvl:1},{w:'weird fact',jp:'変わった事実',lvl:1},{w:'never knew',jp:'知らなかった',lvl:1},{w:'I heard that',jp:'〜と聞いた',lvl:1},{w:'it\'s true',jp:'それは本当',lvl:1},{w:'strange',jp:'不思議な',lvl:1},{w:'a lot of people',jp:'たくさんの人',lvl:1},{w:'in the world',jp:'世界で',lvl:1},{w:'first time',jp:'初めて',lvl:1},{w:'record',jp:'記録',lvl:1},{w:'the biggest',jp:'一番大きい',lvl:1},
    {w:'random fact',jp:'豆知識',lvl:2},{w:'trivia',jp:'雑学',lvl:2},{w:'well-known fact',jp:'よく知られた事実',lvl:2},{w:'hidden fact',jp:'隠れた事実',lvl:2},{w:'scientific finding',jp:'科学的な発見',lvl:2},{w:'historical fact',jp:'歴史的な事実',lvl:2},{w:'according to research',jp:'研究によると',lvl:2},{w:'proven fact',jp:'証明された事実',lvl:2},{w:'common misconception',jp:'よくある誤解',lvl:2},
    {w:'empirical data',jp:'実証的データ',lvl:3},{w:'scientific consensus',jp:'科学的な合意',lvl:3},{w:'anomalous finding',jp:'異常な発見',lvl:3},{w:'statistical outlier',jp:'統計的な外れ値',lvl:3},{w:'verifiable claim',jp:'検証可能な主張',lvl:3},{w:'academic citation',jp:'学術的な引用',lvl:3},{w:'documented evidence',jp:'記録された証拠',lvl:3},{w:'reputable source',jp:'信頼できる情報源',lvl:3},{w:'unprecedented discovery',jp:'前例のない発見',lvl:3},{w:'thought-provoking fact',jp:'考えさせられる事実',lvl:3},
  ],

  // ------------------------- 新規追加話題 -------------------------
  basics: [
    {w:'red',jp:'赤',lvl:1},{w:'blue',jp:'青',lvl:1},{w:'green',jp:'緑',lvl:1},
    {w:'yellow',jp:'黄色',lvl:1},{w:'black',jp:'黒',lvl:1},{w:'white',jp:'白',lvl:1},
    {w:'one',jp:'1',lvl:1},{w:'two',jp:'2',lvl:1},{w:'ten',jp:'10',lvl:1},
    {w:'today',jp:'今日',lvl:1},{w:'tomorrow',jp:'明日',lvl:1},{w:'yesterday',jp:'昨日',lvl:1},
    {w:'morning',jp:'朝',lvl:1},{w:'afternoon',jp:'午後',lvl:1},{w:'evening',jp:'夕方',lvl:1},
    {w:'what time is it?',jp:'今何時ですか？',lvl:1},{w:'favorite color',jp:'好きな色',lvl:1},
    {w:'number',jp:'数字',lvl:1},{w:'shape',jp:'形',lvl:1},{w:'circle',jp:'丸',lvl:1},
    {w:'approximately',jp:'およそ',lvl:2},{w:'a couple of',jp:'2つほどの',lvl:2},{w:'quarter past',jp:'15分過ぎ',lvl:2},
    {w:'numerical value',jp:'数値',lvl:3},{w:'chronological order',jp:'時系列順',lvl:3},{w:'primary colors',jp:'原色',lvl:3},
    {w:'roughly',jp:'大まかに',lvl:2},{w:'exactly',jp:'ちょうど',lvl:2},{w:'half an hour',jp:'30分',lvl:2},{w:'a dozen',jp:'12個',lvl:2},{w:'in a row',jp:'連続で',lvl:2},{w:'give or take',jp:'多少前後して',lvl:2},{w:'on the dot',jp:'ちょうどその時刻に',lvl:2},
    {w:'complementary colors',jp:'補色',lvl:3},{w:'a fraction of',jp:'ほんの一部',lvl:3},{w:'time zone',jp:'タイムゾーン',lvl:3},{w:'decimal point',jp:'小数点',lvl:3},{w:'spectrum',jp:'スペクトル',lvl:3},{w:'sequential',jp:'連続した',lvl:3},{w:'approximate value',jp:'概算値',lvl:3},
    {w:'about',jp:'約',lvl:2},{w:'around',jp:'およそ',lvl:2},{w:'almost',jp:'ほとんど',lvl:2},{w:'nearly',jp:'ほぼ',lvl:2},{w:'less than',jp:'〜未満',lvl:2},{w:'more than',jp:'〜以上',lvl:2},{w:'a bit',jp:'少し',lvl:2},{w:'a little',jp:'少しの',lvl:2},{w:'fairly',jp:'かなり',lvl:2},{w:'somewhat',jp:'いくぶん',lvl:2},
    {w:'metric system',jp:'メートル法',lvl:3},{w:'measurement unit',jp:'計測単位',lvl:3},{w:'color palette',jp:'配色',lvl:3},{w:'hue',jp:'色相',lvl:3},{w:'time increment',jp:'時間の刻み',lvl:3},{w:'quantify',jp:'数値化する',lvl:3},{w:'precise figure',jp:'正確な数値',lvl:3},{w:'rounding off',jp:'四捨五入',lvl:3},{w:'temporal sequence',jp:'時間的な順序',lvl:3},{w:'gradient',jp:'グラデーション',lvl:3},
  ],
  shopping: [
    {w:'shop',jp:'店',lvl:1},{w:'buy',jp:'買う',lvl:1},{w:'price',jp:'値段',lvl:1},
    {w:'expensive',jp:'高い',lvl:1},{w:'cheap',jp:'安い',lvl:1},{w:'sale',jp:'セール',lvl:1},
    {w:'discount',jp:'割引',lvl:1},{w:'clothes',jp:'服',lvl:1},{w:'shoes',jp:'靴',lvl:1},
    {w:'try on',jp:'試着する',lvl:1},{w:'size',jp:'サイズ',lvl:1},{w:'cash',jp:'現金',lvl:1},
    {w:'credit card',jp:'クレジットカード',lvl:1},{w:'receipt',jp:'レシート',lvl:1},
    {w:'online shopping',jp:'ネットショッピング',lvl:1},{w:'return',jp:'返品する',lvl:2},
    {w:'shopping mall',jp:'ショッピングモール',lvl:1},{w:'bargain',jp:'お買い得品',lvl:2},
    {w:'compare prices',jp:'価格を比較する',lvl:2},{w:'impulse buy',jp:'衝動買い',lvl:2},
    {w:'consumer behavior',jp:'消費者行動',lvl:3},{w:'value for money',jp:'コストパフォーマンス',lvl:3},{w:'retail therapy',jp:'買い物でストレス発散すること',lvl:3},
    {w:'checkout line',jp:'レジの列',lvl:2},{w:'return policy',jp:'返品規定',lvl:2},{w:'warranty',jp:'保証',lvl:2},{w:'shopping cart',jp:'ショッピングカート',lvl:2},{w:'brand loyalty',jp:'ブランドへの忠誠心',lvl:2},{w:'seasonal sale',jp:'季節セール',lvl:2},{w:'window shopping',jp:'ウィンドウショッピング',lvl:2},
    {w:'purchasing decision',jp:'購買の意思決定',lvl:3},{w:'marketing tactic',jp:'マーケティング戦略',lvl:3},{w:'brand perception',jp:'ブランドイメージ',lvl:3},{w:'sustainable shopping',jp:'持続可能な買い物',lvl:3},{w:'buyer\'s remorse',jp:'買い物後の後悔',lvl:3},{w:'discretionary spending',jp:'裁量的な支出',lvl:3},{w:'ethical consumerism',jp:'倫理的消費',lvl:3},{w:'price elasticity',jp:'価格弾力性',lvl:3},
    {w:'basket',jp:'買い物かご',lvl:1},{w:'store',jp:'お店',lvl:1},{w:'pay',jp:'支払う',lvl:1},{w:'wallet',jp:'財布',lvl:1},
    {w:'shopping list',jp:'買い物リスト',lvl:2},{w:'coupon',jp:'クーポン',lvl:2},{w:'membership card',jp:'会員カード',lvl:2},{w:'try before you buy',jp:'買う前に試す',lvl:2},{w:'clearance sale',jp:'在庫一掃セール',lvl:2},{w:'online review',jp:'ネットのレビュー',lvl:2},{w:'delivery fee',jp:'配送料',lvl:2},{w:'gift wrap',jp:'ギフトラッピング',lvl:2},{w:'loyalty program',jp:'ポイントプログラム',lvl:2},
    {w:'impulse purchase',jp:'衝動買い',lvl:3},{w:'brand identity',jp:'ブランドの個性',lvl:3},{w:'shopping habit',jp:'買い物の習慣',lvl:3},{w:'consumer trend',jp:'消費者動向',lvl:3},{w:'mindful spending',jp:'意識的な支出',lvl:3},{w:'e-commerce platform',jp:'ECプラットフォーム',lvl:3},{w:'shopping addiction',jp:'買い物依存',lvl:3},{w:'sustainable brand',jp:'持続可能なブランド',lvl:3},{w:'price comparison',jp:'価格比較',lvl:3},
  ],
  money: [
    {w:'save money',jp:'貯金する',lvl:1},{w:'spend',jp:'使う',lvl:1},{w:'budget',jp:'予算',lvl:2},
    {w:'allowance',jp:'お小遣い',lvl:1},{w:'part-time job',jp:'アルバイト',lvl:1},
    {w:'expensive',jp:'高い',lvl:1},{w:'affordable',jp:'手頃な',lvl:2},{w:'income',jp:'収入',lvl:2},
    {w:'debt',jp:'借金',lvl:2},{w:'invest',jp:'投資する',lvl:2},{w:'currency',jp:'通貨',lvl:2},
    {w:'exchange rate',jp:'為替レート',lvl:3},{w:'inflation',jp:'インフレ',lvl:3},
    {w:'financial goal',jp:'金銭的な目標',lvl:3},{w:'worth it',jp:'それだけの価値がある',lvl:2},
    {w:'financial literacy',jp:'金融リテラシー',lvl:3},
    {w:'budgeting app',jp:'家計簿アプリ',lvl:2},{w:'emergency fund',jp:'緊急用資金',lvl:2},{w:'monthly expense',jp:'月々の支出',lvl:2},{w:'interest rate',jp:'金利',lvl:2},
    {w:'compound interest',jp:'複利',lvl:3},{w:'financial independence',jp:'経済的自立',lvl:3},{w:'asset allocation',jp:'資産配分',lvl:3},{w:'opportunity cost',jp:'機会費用',lvl:3},{w:'disposable income',jp:'可処分所得',lvl:3},{w:'wealth accumulation',jp:'資産形成',lvl:3},
    {w:'money',jp:'お金',lvl:1},{w:'coin',jp:'コイン',lvl:1},{w:'bill',jp:'紙幣',lvl:1},{w:'buy',jp:'買う',lvl:1},{w:'sell',jp:'売る',lvl:1},{w:'price tag',jp:'値札',lvl:1},{w:'cheap',jp:'安い',lvl:1},{w:'expensive item',jp:'高い物',lvl:1},{w:'wallet',jp:'財布',lvl:1},{w:'bank',jp:'銀行',lvl:1},{w:'save up',jp:'貯める',lvl:1},{w:'spend money',jp:'お金を使う',lvl:1},{w:'piggy bank',jp:'貯金箱',lvl:1},{w:'pocket money',jp:'お小遣い',lvl:1},{w:'cost',jp:'費用',lvl:1},
    {w:'bank account',jp:'銀行口座',lvl:2},{w:'paycheck',jp:'給料',lvl:2},{w:'monthly bill',jp:'月々の請求',lvl:2},{w:'saving habit',jp:'貯金の習慣',lvl:2},{w:'spending habit',jp:'お金の使い方の習慣',lvl:2},{w:'debit card',jp:'デビットカード',lvl:2},{w:'loan',jp:'ローン',lvl:2},{w:'financial goal',jp:'金銭的な目標',lvl:2},{w:'income source',jp:'収入源',lvl:2},
    {w:'personal finance',jp:'個人の家計管理',lvl:3},{w:'investment strategy',jp:'投資戦略',lvl:3},{w:'financial planning',jp:'資金計画',lvl:3},{w:'passive income',jp:'不労所得',lvl:3},{w:'money mindset',jp:'お金に対する考え方',lvl:3},{w:'economic security',jp:'経済的な安定',lvl:3},{w:'spending psychology',jp:'消費心理',lvl:3},{w:'financial resilience',jp:'金銭的な回復力',lvl:3},{w:'budget allocation',jp:'予算配分',lvl:3},{w:'monetary value',jp:'金銭的価値',lvl:3},
    {w:'set a budget',jp:'予算を立てる',lvl:2},
    {w:'financial mindset',jp:'お金に対する考え方',lvl:3},
  ],
  relationships: [
    {w:'friend',jp:'友達',lvl:1},{w:'best friend',jp:'親友',lvl:1},{w:'close friend',jp:'仲の良い友達',lvl:1},
    {w:'trust',jp:'信頼',lvl:2},{w:'support each other',jp:'支え合う',lvl:2},
    {w:'partner',jp:'パートナー',lvl:2},{w:'long-distance',jp:'遠距離',lvl:2},
    {w:'get along',jp:'仲良くやる',lvl:2},{w:'argument',jp:'口論',lvl:2},
    {w:'apologize',jp:'謝る',lvl:2},{w:'misunderstanding',jp:'誤解',lvl:2},
    {w:'stay in touch',jp:'連絡を取り合う',lvl:2},{w:'lose touch',jp:'疎遠になる',lvl:3},
    {w:'first impression',jp:'第一印象',lvl:2},{w:'bond',jp:'絆',lvl:3},
    {w:'friendly',jp:'友好的な',lvl:1},
    {w:'emotional intimacy',jp:'感情的な親密さ',lvl:3},{w:'reciprocity',jp:'相互性',lvl:3},
    {w:'vulnerable',jp:'心を開いた・弱さを見せる',lvl:3},{w:'boundary-setting',jp:'境界線を引くこと',lvl:3},{w:'attachment style',jp:'愛着スタイル',lvl:3},{w:'mutual respect',jp:'相互の尊重',lvl:3},{w:'emotional support',jp:'感情的な支え',lvl:3},{w:'communication breakdown',jp:'コミュニケーションの断絶',lvl:3},
    {w:'friend',jp:'友達',lvl:1},{w:'like someone',jp:'誰かを好きになる',lvl:1},{w:'talk to',jp:'話しかける',lvl:1},{w:'spend time together',jp:'一緒に時間を過ごす',lvl:1},{w:'help each other',jp:'助け合う',lvl:1},{w:'call a friend',jp:'友達に電話する',lvl:1},{w:'meet up',jp:'会う約束をする',lvl:1},{w:'get along well',jp:'仲良くする',lvl:1},{w:'miss someone',jp:'誰かを恋しく思う',lvl:1},{w:'care about',jp:'気にかける',lvl:1},{w:'be kind to',jp:'優しくする',lvl:1},{w:'share feelings',jp:'気持ちを分かち合う',lvl:1},{w:'say sorry',jp:'謝る',lvl:1},{w:'make up',jp:'仲直りする',lvl:1},{w:'trust someone',jp:'誰かを信頼する',lvl:1},{w:'be there for someone',jp:'誰かのそばにいる',lvl:1},
    {w:'close bond',jp:'強い絆',lvl:2},{w:'stay close',jp:'仲良くし続ける',lvl:2},{w:'friendship group',jp:'友達グループ',lvl:2},{w:'romantic relationship',jp:'恋愛関係',lvl:2},{w:'family bond',jp:'家族の絆',lvl:2},{w:'social circle',jp:'交友関係',lvl:2},{w:'quality relationship',jp:'質の高い関係',lvl:2},{w:'shared experience',jp:'共有した経験',lvl:2},{w:'supportive friend',jp:'支えになる友達',lvl:2},{w:'long-lasting friendship',jp:'長く続く友情',lvl:2},
    {w:'interpersonal trust',jp:'対人的な信頼',lvl:3},{w:'relational depth',jp:'関係性の深さ',lvl:3},{w:'conflict resolution',jp:'対立の解決',lvl:3},{w:'emotional availability',jp:'感情的な開放性',lvl:3},{w:'attachment security',jp:'愛着の安定性',lvl:3},{w:'relational maintenance',jp:'関係の維持',lvl:3},{w:'social bonding',jp:'社会的な絆づくり',lvl:3},{w:'authentic connection',jp:'本物のつながり',lvl:3},{w:'interdependence',jp:'相互依存',lvl:3},{w:'relationship dynamics',jp:'関係性の力学',lvl:3},
    {w:'close pal',jp:'仲の良い友達',lvl:1},
  ],
  environment: [
    {w:'environment',jp:'環境',lvl:2},{w:'pollution',jp:'汚染',lvl:2},{w:'recycle',jp:'リサイクルする',lvl:1},
    {w:'plastic waste',jp:'プラスチックごみ',lvl:2},{w:'renewable energy',jp:'再生可能エネルギー',lvl:3},
    {w:'sustainability',jp:'持続可能性',lvl:3},{w:'carbon footprint',jp:'二酸化炭素排出量',lvl:3},
    {w:'climate change',jp:'気候変動',lvl:2},{w:'endangered species',jp:'絶滅危惧種',lvl:3},
    {w:'deforestation',jp:'森林破壊',lvl:3},{w:'eco-friendly',jp:'環境に優しい',lvl:2},
    {w:'reduce',jp:'減らす',lvl:1},{w:'reuse',jp:'再利用する',lvl:1},{w:'global issue',jp:'地球規模の問題',lvl:3},
    {w:'nature',jp:'自然',lvl:1},
    {w:'biodiversity',jp:'生物多様性',lvl:2},{w:'conservation',jp:'保全',lvl:2},{w:'clean energy',jp:'クリーンエネルギー',lvl:2},{w:'single-use plastic',jp:'使い捨てプラスチック',lvl:2},
    {w:'ecological footprint',jp:'環境負荷の指標',lvl:3},{w:'circular economy',jp:'循環型経済',lvl:3},{w:'greenhouse effect',jp:'温室効果',lvl:3},
    {w:'trash',jp:'ゴミ',lvl:1},{w:'trees',jp:'木々',lvl:1},{w:'clean water',jp:'きれいな水',lvl:1},{w:'clean air',jp:'きれいな空気',lvl:1},{w:'protect nature',jp:'自然を守る',lvl:1},{w:'save energy',jp:'エネルギーを節約する',lvl:1},{w:'turn off the light',jp:'電気を消す',lvl:1},{w:'take care of the earth',jp:'地球を大切にする',lvl:1},{w:'plant a tree',jp:'木を植える',lvl:1},{w:'ocean',jp:'海',lvl:1},{w:'forest',jp:'森',lvl:1},{w:'animal',jp:'動物',lvl:1},{w:'global warming',jp:'地球温暖化',lvl:1},{w:'weather change',jp:'天候の変化',lvl:1},{w:'green',jp:'環境にやさしい',lvl:1},{w:'garbage',jp:'ゴミ',lvl:1},
    {w:'environmental impact',jp:'環境への影響',lvl:2},{w:'eco-conscious',jp:'環境を意識した',lvl:2},{w:'natural resource',jp:'天然資源',lvl:2},{w:'waste reduction',jp:'ゴミの削減',lvl:2},{w:'solar power',jp:'太陽光発電',lvl:2},{w:'environmental protection',jp:'環境保護',lvl:2},{w:'sustainable living',jp:'持続可能な暮らし',lvl:2},{w:'green initiative',jp:'環境への取り組み',lvl:2},{w:'air quality',jp:'空気の質',lvl:2},{w:'water conservation',jp:'水の保全',lvl:2},{w:'environmental awareness',jp:'環境意識',lvl:2},
    {w:'anthropogenic impact',jp:'人為的な影響',lvl:3},{w:'environmental degradation',jp:'環境の悪化',lvl:3},{w:'carbon neutrality',jp:'カーボンニュートラル',lvl:3},{w:'ecological balance',jp:'生態系のバランス',lvl:3},{w:'sustainable development',jp:'持続可能な発展',lvl:3},{w:'resource depletion',jp:'資源の枯渇',lvl:3},{w:'environmental policy',jp:'環境政策',lvl:3},{w:'climate resilience',jp:'気候変動への耐性',lvl:3},{w:'biosphere',jp:'生物圏',lvl:3},{w:'green technology',jp:'環境技術',lvl:3},{w:'ecological footprint reduction',jp:'環境負荷の削減',lvl:3},
  ],
  ethics: [
    {w:'right or wrong',jp:'正しいか間違っているか',lvl:2},{w:'moral',jp:'道徳的な',lvl:3},
    {w:'value',jp:'価値観',lvl:2},{w:'fairness',jp:'公平性',lvl:3},{w:'honesty',jp:'正直さ',lvl:2},
    {w:'responsibility',jp:'責任',lvl:2},{w:'dilemma',jp:'ジレンマ',lvl:3},
    {w:'consequence',jp:'結果・影響',lvl:3},{w:'principle',jp:'原則',lvl:3},
    {w:'justify',jp:'正当化する',lvl:3},{w:'controversial',jp:'議論を呼ぶ',lvl:3},
    {w:'perspective',jp:'視点',lvl:3},{w:'benefit of the doubt',jp:'疑わしきは罰せず',lvl:3},
    {w:'good',jp:'良い',lvl:1},{w:'bad',jp:'悪い',lvl:1},{w:'kind',jp:'優しい',lvl:1},{w:'fair',jp:'公平な',lvl:1},
    {w:'do the right thing',jp:'正しいことをする',lvl:2},{w:'moral choice',jp:'道徳的な選択',lvl:2},{w:'ethical dilemma',jp:'倫理的なジレンマ',lvl:2},{w:'social norm',jp:'社会規範',lvl:2},{w:'personal integrity',jp:'個人の誠実さ',lvl:2},{w:'code of conduct',jp:'行動規範',lvl:2},
    {w:'good person',jp:'良い人',lvl:1},{w:'bad person',jp:'悪い人',lvl:1},{w:'right thing',jp:'正しいこと',lvl:1},{w:'wrong thing',jp:'間違ったこと',lvl:1},{w:'tell the truth',jp:'本当のことを言う',lvl:1},{w:'tell a lie',jp:'嘘をつく',lvl:1},{w:'share',jp:'分け合う',lvl:1},{w:'be honest',jp:'正直である',lvl:1},{w:'be fair',jp:'公平である',lvl:1},{w:'follow rules',jp:'ルールに従う',lvl:1},{w:'break a rule',jp:'ルールを破る',lvl:1},{w:'help others',jp:'他人を助ける',lvl:1},{w:'treat others well',jp:'他人を大切に扱う',lvl:1},{w:'apologize',jp:'謝る',lvl:1},{w:'forgive',jp:'許す',lvl:1},{w:'do the right thing',jp:'正しいことをする',lvl:1},
    {w:'ethical behavior',jp:'倫理的な行動',lvl:2},{w:'moral standard',jp:'道徳的な基準',lvl:2},{w:'sense of duty',jp:'義務感',lvl:2},{w:'ethical decision',jp:'倫理的な決断',lvl:2},{w:'gray area',jp:'グレーゾーン',lvl:2},{w:'take responsibility',jp:'責任を取る',lvl:2},{w:'moral compass',jp:'道徳的な指針',lvl:2},{w:'trustworthy',jp:'信頼できる',lvl:2},{w:'accountable',jp:'説明責任がある',lvl:2},{w:'act with integrity',jp:'誠実に行動する',lvl:2},
    {w:'ethical framework',jp:'倫理的な枠組み',lvl:3},{w:'moral relativism',jp:'道徳的相対主義',lvl:3},{w:'utilitarian view',jp:'功利主義的な見方',lvl:3},{w:'moral obligation',jp:'道徳的義務',lvl:3},{w:'ethical ambiguity',jp:'倫理的な曖昧さ',lvl:3},{w:'virtue ethics',jp:'徳倫理学',lvl:3},{w:'moral reasoning',jp:'道徳的な推論',lvl:3},{w:'ethical accountability',jp:'倫理的な説明責任',lvl:3},{w:'societal ethics',jp:'社会的な倫理観',lvl:3},{w:'principled stance',jp:'原則に基づく立場',lvl:3},{w:'moral courage',jp:'道徳的な勇気',lvl:3},
    {w:'act responsibly',jp:'責任を持って行動する',lvl:1},
  ],
  society: [
    {w:'society',jp:'社会',lvl:2},{w:'community',jp:'コミュニティ',lvl:2},{w:'generation',jp:'世代',lvl:2},
    {w:'inequality',jp:'不平等',lvl:3},{w:'social issue',jp:'社会問題',lvl:3},
    {w:'aging society',jp:'高齢化社会',lvl:3},{w:'population',jp:'人口',lvl:2},
    {w:'urbanization',jp:'都市化',lvl:3},{w:'minority',jp:'少数派',lvl:3},
    {w:'norm',jp:'規範',lvl:3},{w:'trend',jp:'トレンド',lvl:2},{w:'public opinion',jp:'世論',lvl:3},
    {w:'policy',jp:'政策',lvl:3},{w:'awareness',jp:'意識・認識',lvl:2},
    {w:'people',jp:'人々',lvl:1},{w:'group',jp:'グループ',lvl:1},{w:'city',jp:'都市',lvl:1},{w:'together',jp:'一緒に',lvl:1},
    {w:'social mobility',jp:'社会的流動性',lvl:2},{w:'demographic shift',jp:'人口動態の変化',lvl:2},{w:'income gap',jp:'所得格差',lvl:2},{w:'civic engagement',jp:'市民参加',lvl:2},{w:'social cohesion',jp:'社会的結束',lvl:2},
    {w:'people',jp:'人々',lvl:1},{w:'city life',jp:'都市生活',lvl:1},{w:'community',jp:'コミュニティ',lvl:1},{w:'neighbor',jp:'隣人',lvl:1},{w:'help the community',jp:'地域社会を助ける',lvl:1},{w:'work together',jp:'協力する',lvl:1},{w:'live together',jp:'一緒に暮らす',lvl:1},{w:'rule',jp:'規則',lvl:1},{w:'law',jp:'法律',lvl:1},{w:'vote',jp:'投票する',lvl:1},{w:'school system',jp:'学校制度',lvl:1},{w:'young people',jp:'若い人々',lvl:1},{w:'old people',jp:'高齢者',lvl:1},{w:'poor',jp:'貧しい',lvl:1},{w:'rich',jp:'裕福な',lvl:1},{w:'safe place',jp:'安全な場所',lvl:1},
    {w:'local community',jp:'地域社会',lvl:2},{w:'social responsibility',jp:'社会的責任',lvl:2},{w:'public service',jp:'公共サービス',lvl:2},{w:'community project',jp:'地域プロジェクト',lvl:2},{w:'social issue',jp:'社会問題',lvl:2},{w:'younger generation',jp:'若い世代',lvl:2},{w:'older generation',jp:'年配の世代',lvl:2},{w:'living standard',jp:'生活水準',lvl:2},{w:'social change',jp:'社会の変化',lvl:2},
    {w:'socioeconomic status',jp:'社会経済的地位',lvl:3},{w:'social stratification',jp:'社会階層',lvl:3},{w:'civic responsibility',jp:'市民としての責任',lvl:3},{w:'social contract',jp:'社会契約',lvl:3},{w:'structural inequality',jp:'構造的な不平等',lvl:3},{w:'demographic trend',jp:'人口動態の傾向',lvl:3},{w:'societal shift',jp:'社会の変化',lvl:3},{w:'collective welfare',jp:'集団の福祉',lvl:3},{w:'marginalized group',jp:'社会的に疎外された集団',lvl:3},{w:'social integration',jp:'社会統合',lvl:3},{w:'public discourse',jp:'公共の議論',lvl:3},{w:'grassroots movement',jp:'草の根運動',lvl:3},
    {w:'residents',jp:'住民',lvl:1},{w:'shared space',jp:'共有スペース',lvl:1},
    {w:'social gathering place',jp:'人々が集まる場所',lvl:2},
  ],
  ai_future: [
    {w:'artificial intelligence',jp:'人工知能',lvl:2},{w:'automation',jp:'自動化',lvl:3},
    {w:'replace jobs',jp:'仕事を奪う',lvl:3},{w:'innovation',jp:'イノベーション',lvl:3},
    {w:'convenient',jp:'便利な',lvl:1},{w:'privacy concern',jp:'プライバシーの懸念',lvl:3},
    {w:'human touch',jp:'人間らしさ',lvl:3},{w:'efficient',jp:'効率的な',lvl:2},
    {w:'ethical concern',jp:'倫理的な懸念',lvl:3},{w:'future technology',jp:'未来の技術',lvl:2},
    {w:'depend on',jp:'〜に依存する',lvl:2},{w:'dystopia',jp:'ディストピア',lvl:3},
    {w:'computer',jp:'コンピューター',lvl:1},{w:'smart',jp:'賢い',lvl:1},{w:'helpful',jp:'役に立つ',lvl:1},
    {w:'algorithm',jp:'アルゴリズム',lvl:2},{w:'machine learning model',jp:'機械学習モデル',lvl:2},{w:'automation tool',jp:'自動化ツール',lvl:2},{w:'digital assistant',jp:'デジタルアシスタント',lvl:2},{w:'data-driven decision',jp:'データに基づく意思決定',lvl:2},
    {w:'robot',jp:'ロボット',lvl:1},{w:'computer',jp:'コンピューター',lvl:1},{w:'smart phone',jp:'スマートフォン',lvl:1},{w:'future world',jp:'未来の世界',lvl:1},{w:'new technology',jp:'新しい技術',lvl:1},{w:'AI assistant',jp:'AIアシスタント',lvl:1},{w:'self-driving car',jp:'自動運転車',lvl:1},{w:'video call',jp:'ビデオ通話',lvl:1},{w:'useful tool',jp:'便利な道具',lvl:1},{w:'easy to use',jp:'使いやすい',lvl:1},{w:'save time',jp:'時間を節約する',lvl:1},{w:'change the world',jp:'世界を変える',lvl:1},{w:'in the future',jp:'将来',lvl:1},{w:'many jobs',jp:'たくさんの仕事',lvl:1},{w:'new invention',jp:'新しい発明',lvl:1},{w:'exciting technology',jp:'ワクワクする技術',lvl:1},
    {w:'artificial intelligence tool',jp:'AIツール',lvl:2},{w:'smart device',jp:'スマートデバイス',lvl:2},{w:'automated system',jp:'自動化されたシステム',lvl:2},{w:'future prediction',jp:'未来の予測',lvl:2},{w:'technology adoption',jp:'技術の導入',lvl:2},{w:'job automation',jp:'仕事の自動化',lvl:2},{w:'AI-powered',jp:'AI搭載の',lvl:2},{w:'digital future',jp:'デジタルな未来',lvl:2},{w:'convenience factor',jp:'利便性',lvl:2},{w:'tech optimism',jp:'技術への楽観',lvl:2},{w:'tech skepticism',jp:'技術への懐疑',lvl:2},
    {w:'artificial general intelligence',jp:'汎用人工知能',lvl:3},{w:'technological singularity',jp:'技術的特異点',lvl:3},{w:'human-AI collaboration',jp:'人間とAIの協働',lvl:3},{w:'algorithmic governance',jp:'アルゴリズムによる統治',lvl:3},{w:'existential risk',jp:'存在論的リスク',lvl:3},{w:'AI regulation',jp:'AI規制',lvl:3},{w:'labor market disruption',jp:'労働市場の混乱',lvl:3},{w:'machine autonomy',jp:'機械の自律性',lvl:3},{w:'techno-utopianism',jp:'技術によるユートピア思想',lvl:3},{w:'digital sentience',jp:'デジタルな知覚',lvl:3},{w:'future workforce',jp:'未来の労働力',lvl:3},{w:'AI ethics debate',jp:'AI倫理をめぐる議論',lvl:3},{w:'speculative technology',jp:'思索的な技術',lvl:3},
    {w:'helpful robot',jp:'役に立つロボット',lvl:1},
  ],
  education: [
    {w:'education system',jp:'教育制度',lvl:3},{w:'exam-focused',jp:'試験重視の',lvl:3},
    {w:'creativity',jp:'創造性',lvl:2},{w:'critical thinking',jp:'批判的思考',lvl:3},
    {w:'memorize',jp:'暗記する',lvl:2},{w:'practical skill',jp:'実践的なスキル',lvl:3},
    {w:'online learning',jp:'オンライン学習',lvl:2},{w:'lifelong learning',jp:'生涯学習',lvl:3},
    {w:'equal opportunity',jp:'機会の平等',lvl:3},{w:'standardized test',jp:'標準化されたテスト',lvl:3},
    {w:'curriculum',jp:'カリキュラム',lvl:3},{w:'motivation',jp:'モチベーション',lvl:2},
    {w:'school',jp:'学校',lvl:1},{w:'teacher',jp:'先生',lvl:1},{w:'learn',jp:'学ぶ',lvl:1},{w:'homework',jp:'宿題',lvl:1},
    {w:'read',jp:'読む',lvl:1},{w:'write',jp:'書く',lvl:1},{w:'listen',jp:'聞く',lvl:1},{w:'study hard',jp:'一生懸命勉強する',lvl:1},{w:'go to class',jp:'授業に行く',lvl:1},
    {w:'differentiated instruction',jp:'個に応じた指導',lvl:2},{w:'assessment method',jp:'評価方法',lvl:2},{w:'active learning',jp:'能動的学習',lvl:2},{w:'peer learning',jp:'仲間との学び合い',lvl:2},{w:'formative feedback',jp:'形成的フィードバック',lvl:2},{w:'personalized learning',jp:'個別最適化された学習',lvl:2},
    {w:'lesson',jp:'授業',lvl:1},{w:'notebook',jp:'ノート',lvl:1},{w:'pencil',jp:'鉛筆',lvl:1},{w:'classroom',jp:'教室',lvl:1},{w:'test',jp:'テスト',lvl:1},{w:'answer',jp:'答え',lvl:1},{w:'question',jp:'質問',lvl:1},{w:'raise your hand',jp:'手を挙げる',lvl:1},{w:'pay attention',jp:'注意を払う',lvl:1},{w:'take notes',jp:'ノートを取る',lvl:1},{w:'pass a test',jp:'テストに合格する',lvl:1},
    {w:'learning style',jp:'学習スタイル',lvl:2},{w:'study method',jp:'勉強法',lvl:2},{w:'grading system',jp:'成績評価システム',lvl:2},{w:'group discussion',jp:'グループディスカッション',lvl:2},{w:'online course',jp:'オンライン講座',lvl:2},{w:'skill development',jp:'スキル開発',lvl:2},{w:'teaching method',jp:'指導法',lvl:2},{w:'academic support',jp:'学習支援',lvl:2},{w:'curriculum design',jp:'カリキュラム設計',lvl:2},{w:'exam preparation',jp:'試験対策',lvl:2},
    {w:'pedagogical approach',jp:'教育的アプローチ',lvl:3},{w:'educational equity',jp:'教育の公平性',lvl:3},{w:'learning outcome',jp:'学習成果',lvl:3},{w:'competency-based education',jp:'能力主義教育',lvl:3},{w:'holistic education',jp:'全人教育',lvl:3},{w:'educational reform',jp:'教育改革',lvl:3},{w:'knowledge retention',jp:'知識の定着',lvl:3},{w:'self-directed study',jp:'自主的な学習',lvl:3},{w:'educational technology',jp:'教育テクノロジー',lvl:3},{w:'metacognition',jp:'メタ認知',lvl:3},{w:'scaffolded learning',jp:'段階的な学習支援',lvl:3},{w:'inquiry-based learning',jp:'探究型学習',lvl:3},
  ],
};

// ---------------------------------------------------------------------
// 話題カードとWORD_DBキーの対応 + レベルタグ
// level: 'beginner' | 'intermediate' | 'advanced'
// ---------------------------------------------------------------------
const TOPIC_CARDS = [
  // 初級
  { en:'Colors, Numbers & Time', icon:'🔢', key:'basics', level:'beginner' },
  { en:'Hobbies & Interests', icon:'🎨', key:'hobby', level:'beginner' },
  { en:'Food & Cooking',      icon:'🍜', key:'food', level:'beginner' },
  { en:'School & Study',      icon:'📚', key:'school', level:'beginner' },
  { en:'Sports',              icon:'⚽', key:'sports', level:'beginner' },
  { en:'Music & Movies',      icon:'🎵', key:'entertainment', level:'beginner' },
  { en:'Family & Home',       icon:'🏠', key:'family', level:'beginner' },
  { en:'Pets & Animals',      icon:'🐾', key:'pets', level:'beginner' },
  { en:'Weather & Seasons',   icon:'🌸', key:'weather', level:'beginner' },
  { en:'Daily Routine',       icon:'💤', key:'routine', level:'beginner' },
  { en:'Shopping',            icon:'🛍️', key:'shopping', level:'beginner' },
  { en:'Mountains or Sea?',   icon:'🏔️', key:'choice_mountain_sea', level:'beginner' },
  { en:'Night owl or Early bird?', icon:'🌙', key:'choice_night_morning', level:'beginner' },
  { en:'Cats or Dogs?',       icon:'🐱', key:'choice_cats_dogs', level:'beginner' },
  { en:'Coffee or Tea?',      icon:'☕', key:'choice_coffee_tea', level:'beginner' },
  { en:'Games or Sports?',    icon:'🎮', key:'choice_games_sports', level:'beginner' },
  { en:'Self Introduction',   icon:'👋', key:'intro', level:'beginner' },

  // 中級
  { en:'Travel & Places',     icon:'✈️', key:'travel', level:'intermediate' },
  { en:'Future & Dreams',     icon:'🌟', key:'work', level:'intermediate' },
  { en:'Technology',          icon:'💻', key:'tech', level:'intermediate' },
  { en:'Health & Lifestyle',  icon:'💪', key:'health', level:'intermediate' },
  { en:'Feelings & Opinions', icon:'💬', key:'emotion', level:'intermediate' },
  { en:'Online or In-person?', icon:'📱', key:'choice_online_offline', level:'intermediate' },
  { en:'Books or Movies?',    icon:'📚', key:'choice_books_movies', level:'intermediate' },
  { en:'City or Countryside?', icon:'🌆', key:'choice_city_country', level:'intermediate' },
  { en:'Festivals & Holidays', icon:'🎉', key:'festivals', level:'intermediate' },
  { en:'Cooking & Recipes',   icon:'🍳', key:'cooking', level:'intermediate' },
  { en:'Money & Saving',      icon:'💰', key:'money', level:'intermediate' },
  { en:'Friends & Relationships', icon:'🤝', key:'relationships', level:'intermediate' },
  { en:'Education Systems',   icon:'🏫', key:'education', level:'intermediate' },

  // 上級
  { en:'Culture & Society',   icon:'🌍', key:'culture', level:'advanced' },
  { en:'Sharing Opinions',    icon:'🗣️', key:'opinion', level:'advanced' },
  { en:'Future Career',       icon:'🎓', key:'career', level:'advanced' },
  { en:'Interesting Facts',   icon:'🧠', key:'facts', level:'advanced' },
  { en:'Environment & Sustainability', icon:'🌱', key:'environment', level:'advanced' },
  { en:'Ethics & Values',     icon:'⚖️', key:'ethics', level:'advanced' },
  { en:'Social Issues',       icon:'🏙️', key:'society', level:'advanced' },
  { en:'AI & The Future',     icon:'🤖', key:'ai_future', level:'advanced' },
];

let currentTopicIdx = -1;
let currentWordLevel = 2; // 単語レベル（話題レベルとは独立）デフォルトは中級
let currentLevel = null; // 現在選ばれている話題レベル（再抽選ボタン用）

// 翻訳キャッシュ
const transCache = {};

async function translateWord(word, targetLang){
  if(targetLang === 'en') return null;
  const key = `${targetLang}:${word}`;
  if(transCache[key]) return transCache[key];
  try{
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(word)}&langpair=en-US|${MYMEMORY_LANG[targetLang]||'ja-JP'}`;
    const res = await fetch(url);
    const data = await res.json();
    const result = data?.responseData?.translatedText || word;
    transCache[key] = result;
    return result;
  }catch(e){
    return word;
  }
}

// トピックキー + 単語レベルから単語リストを取得
// 指定レベルの単語のみを返す（他レベルは混ぜない）。
// 全話題・全レベルで20語以上を確保済みなので、フォールバック補充は行わない。
// シャッフルして毎回違う単語が出るようにする
function getWordsByTopic(topicKey, wordLevel){
  const allWords = WORD_DB[topicKey] || WORD_DB.default;
  const lvl = wordLevel || currentWordLevel;
  const seen = new Set();

  const exact = allWords.filter(w => w.lvl === lvl);

  // Fisher-Yatesシャッフル
  for(let i = exact.length - 1; i > 0; i--){
    const j = Math.floor(Math.random() * (i + 1));
    [exact[i], exact[j]] = [exact[j], exact[i]];
  }

  return exact.filter(w => {
    if(seen.has(w.w)) return false;
    seen.add(w.w);
    return true;
  }).slice(0, 20);
}

// 単語グリッドを表示
async function renderWordGrid(topicKey, wordLevel){
  const words = getWordsByTopic(topicKey, wordLevel);
  const grid = document.getElementById('wordsGrid');
  grid.innerHTML = '';

  words.forEach((item, i) => {
    const div = document.createElement('div');
    div.className = 'word-chip animate-in';
    div.style.animationDelay = `${i * 25}ms`;
    div.id = `chip-${item.w.replace(/[\s'?!,]/g,'_')}`;
    div.tabIndex = 0;
    div.setAttribute('role', 'button');

    const textWrap = document.createElement('div');
    textWrap.className = 'chip-text';
    const enSpan = document.createElement('span');
    enSpan.className = 'en';
    enSpan.textContent = item.w;
    textWrap.appendChild(enSpan);
    if(myLang !== 'en'){
      const nativeSpan = document.createElement('span');
      nativeSpan.className = 'native';
      nativeSpan.textContent = myLang === 'ja' ? item.jp : '...';
      textWrap.appendChild(nativeSpan);
    }
    div.appendChild(textWrap);

    const check = document.createElement('div');
    check.className = 'chip-check';
    check.textContent = '✓';
    div.appendChild(check);

    // タップ/クリックで「使った単語」としてチェック（見た目のみ・練習の達成感を出す）
    const toggleUsed = () => div.classList.toggle('used');
    div.addEventListener('click', toggleUsed);
    div.addEventListener('keydown', (e) => {
      if(e.key === 'Enter' || e.key === ' '){ e.preventDefault(); toggleUsed(); }
    });

    grid.appendChild(div);
  });

  // 日本語以外はAPIで翻訳
  if(myLang !== 'ja' && myLang !== 'en'){
    words.forEach(async item => {
      const translated = await translateWord(item.w, myLang);
      const chipId = `chip-${item.w.replace(/[\s'?!,]/g,'_')}`;
      const chip = document.getElementById(chipId);
      if(chip){
        const native = chip.querySelector('.native');
        if(native) native.textContent = translated;
      }
    });
  }
}

// レベルボタンのハイライトを更新
function highlightLevelButton(level){
  const ids = { beginner: 'lvlBtnBeginner', intermediate: 'lvlBtnIntermediate', advanced: 'lvlBtnAdvanced' };
  Object.values(ids).forEach(id => {
    const btn = document.getElementById(id);
    if(btn) btn.classList.remove('active');
  });
  const activeBtn = document.getElementById(ids[level]);
  if(activeBtn) activeBtn.classList.add('active');
}

// レベルボタンを押したとき（初級/中級/上級ボタンから呼び出す）
// この時点ではまだ話題は決まらない。話題プール（候補）を用意して、
// Startボタンでルーレットを開始できる状態にするだけ。
// level: 'beginner' | 'intermediate' | 'advanced'
let spinState = { active: false, timeoutId: null, lastPick: null };

function selectTopicLevel(level){
  if(spinState.active) return; // スピン中はレベル変更不可

  currentLevel = level;
  spinState.pool = TOPIC_CARDS.map((c, idx) => ({...c, idx})).filter(c => c.level === level);

  console.log('selectTopicLevel:', level, '-> pool size', spinState.pool.length);

  highlightLevelButton(level);

  const topicCard = document.getElementById('topicCard');
  topicCard.classList.remove('pop', 'spinning');
  topicCard.innerHTML = `🎯 ${LEVEL_LABEL[level]}を選択！ ▶ Startを押してね`;

  const startBtn = document.getElementById('wbStartBtn');
  if(startBtn) startBtn.disabled = spinState.pool.length === 0;
}

// ▶ Startボタン：ルーレットのように話題を高速で切り替え、だんだん減速して自動的に止まる
// （Stopボタンは廃止。必ず自動で止まって確定する）
function startSpin(){
  if(!currentLevel || spinState.active || !spinState.pool || spinState.pool.length === 0) return;

  spinState.active = true;
  document.getElementById('wbStartBtn').disabled = true;
  setLevelButtonsDisabled(true);

  const topicCard = document.getElementById('topicCard');
  topicCard.classList.remove('pop');
  topicCard.classList.add('spinning');

  const pool = spinState.pool;
  let delay = 60;         // 最初は速く切り替える
  const maxDelay = 260;   // だんだんこの速さまで減速
  const growth = 1.09;
  const startTime = Date.now();
  const maxDuration = 2600; // この時間で必ず自動停止する

  function tick(){
    const pick = pool[Math.floor(Math.random() * pool.length)];
    spinState.lastPick = pick;
    topicCard.innerHTML = `${pick.icon} ${pick.en}`;

    const elapsed = Date.now() - startTime;
    if(elapsed >= maxDuration || delay >= maxDelay){
      finishSpin(pick);
      return;
    }
    delay = Math.min(maxDelay, delay * growth);
    spinState.timeoutId = setTimeout(tick, delay);
  }
  tick();
}

// スピン終了処理（自動停止のみ）
async function finishSpin(card){
  spinState.active = false;
  clearTimeout(spinState.timeoutId);
  document.getElementById('wbStartBtn').disabled = false;
  setLevelButtonsDisabled(false);

  const topicCard = document.getElementById('topicCard');
  topicCard.classList.remove('spinning');

  currentTopicIdx = card.idx;
  applyTopic(TOPIC_CARDS[card.idx]);
  await sbSetTopic(card.key);
}

// スピン中はレベルボタンを操作できないようにする
function setLevelButtonsDisabled(disabled){
  ['lvlBtnBeginner', 'lvlBtnIntermediate', 'lvlBtnAdvanced'].forEach(id => {
    const btn = document.getElementById(id);
    if(btn) btn.disabled = disabled;
  });
}

// 旧シャッフルボタンとの互換性維持用（全レベルからランダム）
async function shuffleTopic(){
  let newIdx;
  do {
    newIdx = Math.floor(Math.random() * TOPIC_CARDS.length);
  } while(newIdx === currentTopicIdx && TOPIC_CARDS.length > 1);
  currentTopicIdx = newIdx;
  const card = TOPIC_CARDS[currentTopicIdx];

  console.log('shuffleTopic:', card.key);

  applyTopic(card);
  await sbSetTopic(card.key);
}

// 単語レベルのトグル（話題ボタンとは独立に切り替え）
// level: 1 (初級) | 2 (中級) | 3 (上級)
function setWordLevel(level){
  currentWordLevel = level;
  const topicKey = currentTopicIdx >= 0 ? TOPIC_CARDS[currentTopicIdx].key : 'default';
  renderWordGrid(topicKey, currentWordLevel);
}

// トピックを画面に反映
function applyTopic(card){
  const topicCard = document.getElementById('topicCard');
  topicCard.innerHTML = `${card.icon} ${card.en}`;

  // ポップアニメーション（同じクラスの再付与で再生させる）
  topicCard.classList.remove('pop');
  void topicCard.offsetWidth; // reflow で再トリガー
  topicCard.classList.add('pop');

  renderWordGrid(card.key, currentWordLevel);
}

// 他の人がスピンで決めた話題を受け取ったとき（Supabaseから受信）
function onTopicReceived(topicKey){
  const idx = TOPIC_CARDS.findIndex(c => c.key === topicKey);
  if(idx >= 0){
    currentTopicIdx = idx;
    const card = TOPIC_CARDS[idx];
    currentLevel = card.level;
    spinState.pool = TOPIC_CARDS.map((c, i) => ({...c, idx: i})).filter(c => c.level === card.level);
    highlightLevelButton(card.level);
    applyTopic(card);
  }
}

// updateWordBridgeは互換性のために残す（発言テキストからは使わない）
function updateWordBridge(lastText){
  // 何もしない（話題カード方式に変更したため）
}

// join()から呼ばれる：WordBridgeは常時表示になったので「開く」動作の代わりに
// 利用計測（wbOpenCount/wbOpenTime）だけをセッション開始時に初期化する。
// drawerOpen は「今WordBridgeタブを見ているか」を表す値として引き続き使う
// （app.jsのendSession()が drawerOpen を見て集計する処理をそのまま使えるようにするため）。
function initWordBridgeTracking(){
  drawerOpen = true;
  wbOpenCount = 1;
  wbOpenTime = Date.now();
}

// WordBridge / HelpBox のパネル切り替え
// タブ切り替えのたびに、直前に見ていた方の使用時間を確定し、
// 切り替え先の使用回数・開始時刻を記録する（旧・ドロワー開閉の計測をタブ切替に置き換え）
let activeTool = 'wordbridge';
function switchTool(tool){
  if(tool === activeTool) return;
  const now = Date.now();

  if(activeTool === 'wordbridge' && wbOpenTime !== null){
    wbTotalSec += Math.round((now - wbOpenTime) / 1000);
    wbOpenTime = null;
  } else if(activeTool === 'helpbox' && typeof hbOpenTime !== 'undefined' && hbOpenTime !== null){
    hbTotalSec += Math.round((now - hbOpenTime) / 1000);
    hbOpenTime = null;
  }

  activeTool = tool;
  drawerOpen = (tool === 'wordbridge'); // endSession()の集計がこの値を見るので維持

  if(tool === 'wordbridge'){
    wbOpenCount++;
    wbOpenTime = now;
  } else if(typeof hbOpenCount !== 'undefined'){
    hbOpenCount++;
    hbOpenTime = now;
  }

  document.getElementById('toolTabWordbridge').classList.toggle('active', tool === 'wordbridge');
  document.getElementById('toolTabHelpbox').classList.toggle('active', tool === 'helpbox');
  document.getElementById('wordbridgePanel').style.display = tool === 'wordbridge' ? '' : 'none';
  document.getElementById('helpboxPanel').style.display = tool === 'helpbox' ? '' : 'none';

  if(tool === 'helpbox' && typeof onHelpBoxShown === 'function'){
    onHelpBoxShown(); // HelpBox表示のたびに会話サポートタブの内容をその時点の状況で更新
  }
}
