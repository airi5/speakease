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
  ],
  choice_night_morning: [
    {w:'night owl',jp:'夜型',lvl:2},{w:'early bird',jp:'朝型',lvl:2},{w:'stay up late',jp:'夜更かし',lvl:1},
    {w:'wake up early',jp:'早起き',lvl:1},{w:'midnight',jp:'深夜',lvl:1},{w:'sunrise',jp:'日の出',lvl:1},
    {w:'productive',jp:'生産的な',lvl:2},{w:'quiet',jp:'静か',lvl:1},{w:'sleep',jp:'睡眠',lvl:1},
    {w:'routine',jp:'習慣',lvl:1},{w:'energy',jp:'エネルギー',lvl:1},{w:'prefer',jp:'好む',lvl:1},
    {w:'usually',jp:'たいてい',lvl:1},{w:'depends',jp:'場合による',lvl:1},{w:'lately',jp:'最近は',lvl:2},
    {w:'tired',jp:'疲れた',lvl:1},{w:'focus',jp:'集中する',lvl:1},{w:'alarm',jp:'アラーム',lvl:1},
    {w:'circadian rhythm',jp:'概日リズム',lvl:3},{w:'peak productivity',jp:'生産性が最も高い時間帯',lvl:3},{w:'sleep cycle',jp:'睡眠サイクル',lvl:3},{w:'chronotype',jp:'朝型・夜型の体質',lvl:3},
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
  ],
  choice_cats_dogs: [
    {w:'cat',jp:'猫',lvl:1},{w:'dog',jp:'犬',lvl:1},{w:'cute',jp:'かわいい',lvl:1},{w:'fluffy',jp:'ふわふわ',lvl:1},
    {w:'loyal',jp:'忠実',lvl:2},{w:'independent',jp:'独立心が強い',lvl:2},{w:'playful',jp:'遊び好き',lvl:1},
    {w:'calm',jp:'落ち着いている',lvl:1},{w:'energetic',jp:'元気',lvl:1},{w:'pet',jp:'ペット',lvl:1},
    {w:'prefer',jp:'好む',lvl:1},{w:'both',jp:'どちらも',lvl:1},{w:'have one',jp:'飼っている',lvl:1},
    {w:'want to have',jp:'飼いたい',lvl:1},{w:'allergic',jp:'アレルギーがある',lvl:2},
    {w:'walk',jp:'散歩',lvl:1},{w:'purr',jp:'ゴロゴロ',lvl:2},{w:'bark',jp:'吠える',lvl:1},
    {w:'domestication',jp:'家畜化',lvl:3},{w:'temperament',jp:'気質',lvl:3},{w:'companionship',jp:'心の支え',lvl:3},
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
  ],
  money: [
    {w:'save money',jp:'貯金する',lvl:1},{w:'spend',jp:'使う',lvl:1},{w:'budget',jp:'予算',lvl:2},
    {w:'allowance',jp:'お小遣い',lvl:1},{w:'part-time job',jp:'アルバイト',lvl:1},
    {w:'expensive',jp:'高い',lvl:1},{w:'affordable',jp:'手頃な',lvl:2},{w:'income',jp:'収入',lvl:2},
    {w:'debt',jp:'借金',lvl:2},{w:'invest',jp:'投資する',lvl:2},{w:'currency',jp:'通貨',lvl:2},
    {w:'exchange rate',jp:'為替レート',lvl:3},{w:'inflation',jp:'インフレ',lvl:3},
    {w:'financial goal',jp:'金銭的な目標',lvl:3},{w:'worth it',jp:'それだけの価値がある',lvl:2},
    {w:'financial literacy',jp:'金融リテラシー',lvl:3},
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
  ],
  environment: [
    {w:'environment',jp:'環境',lvl:2},{w:'pollution',jp:'汚染',lvl:2},{w:'recycle',jp:'リサイクルする',lvl:1},
    {w:'plastic waste',jp:'プラスチックごみ',lvl:2},{w:'renewable energy',jp:'再生可能エネルギー',lvl:3},
    {w:'sustainability',jp:'持続可能性',lvl:3},{w:'carbon footprint',jp:'二酸化炭素排出量',lvl:3},
    {w:'climate change',jp:'気候変動',lvl:2},{w:'endangered species',jp:'絶滅危惧種',lvl:3},
    {w:'deforestation',jp:'森林破壊',lvl:3},{w:'eco-friendly',jp:'環境に優しい',lvl:2},
    {w:'reduce',jp:'減らす',lvl:1},{w:'reuse',jp:'再利用する',lvl:1},{w:'global issue',jp:'地球規模の問題',lvl:3},
    {w:'nature',jp:'自然',lvl:1},
  ],
  ethics: [
    {w:'right or wrong',jp:'正しいか間違っているか',lvl:2},{w:'moral',jp:'道徳的な',lvl:3},
    {w:'value',jp:'価値観',lvl:2},{w:'fairness',jp:'公平性',lvl:3},{w:'honesty',jp:'正直さ',lvl:2},
    {w:'responsibility',jp:'責任',lvl:2},{w:'dilemma',jp:'ジレンマ',lvl:3},
    {w:'consequence',jp:'結果・影響',lvl:3},{w:'principle',jp:'原則',lvl:3},
    {w:'justify',jp:'正当化する',lvl:3},{w:'controversial',jp:'議論を呼ぶ',lvl:3},
    {w:'perspective',jp:'視点',lvl:3},{w:'benefit of the doubt',jp:'疑わしきは罰せず',lvl:3},
    {w:'good',jp:'良い',lvl:1},{w:'bad',jp:'悪い',lvl:1},{w:'kind',jp:'優しい',lvl:1},{w:'fair',jp:'公平な',lvl:1},
  ],
  society: [
    {w:'society',jp:'社会',lvl:2},{w:'community',jp:'コミュニティ',lvl:2},{w:'generation',jp:'世代',lvl:2},
    {w:'inequality',jp:'不平等',lvl:3},{w:'social issue',jp:'社会問題',lvl:3},
    {w:'aging society',jp:'高齢化社会',lvl:3},{w:'population',jp:'人口',lvl:2},
    {w:'urbanization',jp:'都市化',lvl:3},{w:'minority',jp:'少数派',lvl:3},
    {w:'norm',jp:'規範',lvl:3},{w:'trend',jp:'トレンド',lvl:2},{w:'public opinion',jp:'世論',lvl:3},
    {w:'policy',jp:'政策',lvl:3},{w:'awareness',jp:'意識・認識',lvl:2},
    {w:'people',jp:'人々',lvl:1},{w:'group',jp:'グループ',lvl:1},{w:'city',jp:'都市',lvl:1},{w:'together',jp:'一緒に',lvl:1},
  ],
  ai_future: [
    {w:'artificial intelligence',jp:'人工知能',lvl:2},{w:'automation',jp:'自動化',lvl:3},
    {w:'replace jobs',jp:'仕事を奪う',lvl:3},{w:'innovation',jp:'イノベーション',lvl:3},
    {w:'convenient',jp:'便利な',lvl:1},{w:'privacy concern',jp:'プライバシーの懸念',lvl:3},
    {w:'human touch',jp:'人間らしさ',lvl:3},{w:'efficient',jp:'効率的な',lvl:2},
    {w:'ethical concern',jp:'倫理的な懸念',lvl:3},{w:'future technology',jp:'未来の技術',lvl:2},
    {w:'depend on',jp:'〜に依存する',lvl:2},{w:'dystopia',jp:'ディストピア',lvl:3},
    {w:'computer',jp:'コンピューター',lvl:1},{w:'smart',jp:'賢い',lvl:1},{w:'helpful',jp:'役に立つ',lvl:1},
  ],
  education: [
    {w:'education system',jp:'教育制度',lvl:3},{w:'exam-focused',jp:'試験重視の',lvl:3},
    {w:'creativity',jp:'創造性',lvl:2},{w:'critical thinking',jp:'批判的思考',lvl:3},
    {w:'memorize',jp:'暗記する',lvl:2},{w:'practical skill',jp:'実践的なスキル',lvl:3},
    {w:'online learning',jp:'オンライン学習',lvl:2},{w:'lifelong learning',jp:'生涯学習',lvl:3},
    {w:'equal opportunity',jp:'機会の平等',lvl:3},{w:'standardized test',jp:'標準化されたテスト',lvl:3},
    {w:'curriculum',jp:'カリキュラム',lvl:3},{w:'motivation',jp:'モチベーション',lvl:2},
    {w:'school',jp:'学校',lvl:1},{w:'teacher',jp:'先生',lvl:1},{w:'learn',jp:'学ぶ',lvl:1},{w:'homework',jp:'宿題',lvl:1},
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
// 単語レベルは話題のレベルと独立: 例えば話題が初級でも上級の単語を選べる
// 指定レベルの単語を優先し、足りない場合は「近いレベル」から順に補充する
// （例：上級を指定して上級語が足りない場合、初級より先に中級から補充する）
function getWordsByTopic(topicKey, wordLevel){
  const allWords = WORD_DB[topicKey] || WORD_DB.default;
  const lvl = wordLevel || currentWordLevel;
  const seen = new Set();

  const sorted = [...allWords].sort((a, b) => Math.abs(a.lvl - lvl) - Math.abs(b.lvl - lvl));

  return sorted.filter(w => {
    if(seen.has(w.w)) return false;
    seen.add(w.w);
    return true;
  }).slice(0, 18);
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
