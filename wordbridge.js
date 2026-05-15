// トピックごとの単語データベース
const WORD_DB = {
  default: [
    {w:'really',jp:'本当に'},{w:'maybe',jp:'たぶん'},{w:'I think',jp:'〜だと思う'},
    {w:'me too',jp:'私も'},{w:'interesting',jp:'面白い'},{w:'great',jp:'いいですね'},
    {w:'how about you?',jp:'あなたは？'},{w:'that sounds fun',jp:'楽しそう'},
    {w:'I see',jp:'なるほど'},{w:'tell me more',jp:'もっと教えて'},
    {w:'same here',jp:'私も同じ'},{w:'I agree',jp:'同感です'},
    {w:'no way!',jp:'まさか！'},{w:'that\'s cool',jp:'かっこいい'},
    {w:'I\'m not sure',jp:'よくわからない'},{w:'actually',jp:'実は'},
    {w:'for example',jp:'例えば'},{w:'in my opinion',jp:'私の意見では'},
    {w:'to be honest',jp:'正直に言うと'},{w:'by the way',jp:'ところで'},
  ],
  hobby: [
    {w:'drawing',jp:'絵を描く'},{w:'painting',jp:'絵画'},{w:'sketching',jp:'スケッチ'},
    {w:'watercolor',jp:'水彩画'},{w:'illustration',jp:'イラスト'},{w:'calligraphy',jp:'書道'},
    {w:'origami',jp:'折り紙'},{w:'pottery',jp:'陶芸'},{w:'sculpture',jp:'彫刻'},
    {w:'music',jp:'音楽'},{w:'guitar',jp:'ギター'},{w:'piano',jp:'ピアノ'},
    {w:'violin',jp:'バイオリン'},{w:'drums',jp:'ドラム'},{w:'bass',jp:'ベース'},
    {w:'reading',jp:'読書'},{w:'novel',jp:'小説'},{w:'manga',jp:'漫画'},
    {w:'comic book',jp:'コミック'},{w:'poetry',jp:'詩'},{w:'writing',jp:'文章を書く'},
    {w:'cooking',jp:'料理'},{w:'baking',jp:'お菓子作り'},{w:'gaming',jp:'ゲーム'},
    {w:'board game',jp:'ボードゲーム'},{w:'traveling',jp:'旅行'},{w:'photography',jp:'写真'},
    {w:'hiking',jp:'ハイキング'},{w:'cycling',jp:'サイクリング'},{w:'camping',jp:'キャンプ'},
    {w:'dancing',jp:'ダンス'},{w:'singing',jp:'歌う'},{w:'crafting',jp:'工作'},
    {w:'knitting',jp:'編み物'},{w:'sewing',jp:'裁縫'},{w:'gardening',jp:'ガーデニング'},
    {w:'fishing',jp:'釣り'},{w:'collecting',jp:'コレクション'},{w:'yoga',jp:'ヨガ'},
    {w:'meditation',jp:'瞑想'},{w:'since childhood',jp:'子どもの頃から'},
    {w:'recently started',jp:'最近始めた'},{w:'really into',jp:'はまっている'},
    {w:'spend time',jp:'時間を使う'},{w:'relaxing',jp:'リラックスする'},
  ],
  food: [
    {w:'delicious',jp:'美味しい'},{w:'spicy',jp:'辛い'},{w:'sweet',jp:'甘い'},
    {w:'salty',jp:'しょっぱい'},{w:'sour',jp:'酸っぱい'},{w:'bitter',jp:'苦い'},
    {w:'crispy',jp:'サクサク'},{w:'chewy',jp:'もちもち'},{w:'creamy',jp:'クリーミー'},
    {w:'sushi',jp:'寿司'},{w:'ramen',jp:'ラーメン'},{w:'tempura',jp:'天ぷら'},
    {w:'udon',jp:'うどん'},{w:'soba',jp:'そば'},{w:'onigiri',jp:'おにぎり'},
    {w:'curry',jp:'カレー'},{w:'pizza',jp:'ピザ'},{w:'pasta',jp:'パスタ'},
    {w:'burger',jp:'バーガー'},{w:'tacos',jp:'タコス'},{w:'kimchi',jp:'キムチ'},
    {w:'dim sum',jp:'点心'},{w:'croissant',jp:'クロワッサン'},{w:'paella',jp:'パエリア'},
    {w:'breakfast',jp:'朝食'},{w:'lunch',jp:'昼食'},{w:'dinner',jp:'夕食'},
    {w:'snack',jp:'おやつ'},{w:'dessert',jp:'デザート'},{w:'vegetarian',jp:'菜食主義'},
    {w:'allergy',jp:'アレルギー'},{w:'organic',jp:'オーガニック'},
    {w:'favorite dish',jp:'好きな料理'},{w:'local food',jp:'郷土料理'},
    {w:'street food',jp:'屋台料理'},{w:'home cooking',jp:'家庭料理'},
    {w:'recipe',jp:'レシピ'},{w:'ingredient',jp:'食材'},{w:'flavor',jp:'風味'},
    {w:'restaurant',jp:'レストラン'},{w:'café',jp:'カフェ'},
  ],
  school: [
    {w:'study',jp:'勉強する'},{w:'class',jp:'授業'},{w:'teacher',jp:'先生'},
    {w:'professor',jp:'教授'},{w:'exam',jp:'試験'},{w:'quiz',jp:'小テスト'},
    {w:'homework',jp:'宿題'},{w:'assignment',jp:'課題'},{w:'project',jp:'プロジェクト'},
    {w:'club',jp:'部活'},{w:'after school',jp:'放課後'},{w:'field trip',jp:'遠足'},
    {w:'subject',jp:'科目'},{w:'math',jp:'数学'},{w:'science',jp:'理科'},
    {w:'history',jp:'歴史'},{w:'literature',jp:'国語・文学'},{w:'PE',jp:'体育'},
    {w:'art class',jp:'美術の授業'},{w:'music class',jp:'音楽の授業'},
    {w:'university',jp:'大学'},{w:'campus',jp:'キャンパス'},{w:'lecture',jp:'講義'},
    {w:'seminar',jp:'ゼミ'},{w:'major',jp:'専攻'},{w:'minor',jp:'副専攻'},
    {w:'grade',jp:'成績'},{w:'graduation',jp:'卒業'},{w:'scholarship',jp:'奨学金'},
    {w:'research',jp:'研究'},{w:'thesis',jp:'卒業論文'},{w:'presentation',jp:'発表'},
    {w:'difficult',jp:'難しい'},{w:'easy',jp:'簡単'},{w:'interesting',jp:'面白い'},
    {w:'boring',jp:'退屈な'},{w:'deadline',jp:'締め切り'},{w:'library',jp:'図書館'},
  ],
  weather: [
    {w:'sunny',jp:'晴れ'},{w:'rainy',jp:'雨'},{w:'cloudy',jp:'曇り'},
    {w:'foggy',jp:'霧'},{w:'windy',jp:'風が強い'},{w:'stormy',jp:'嵐'},
    {w:'hot',jp:'暑い'},{w:'warm',jp:'暖かい'},{w:'cool',jp:'涼しい'},
    {w:'cold',jp:'寒い'},{w:'freezing',jp:'凍るほど寒い'},{w:'humid',jp:'蒸し暑い'},
    {w:'dry',jp:'乾燥している'},{w:'muggy',jp:'ムシムシする'},
    {w:'season',jp:'季節'},{w:'spring',jp:'春'},{w:'summer',jp:'夏'},
    {w:'autumn',jp:'秋'},{w:'winter',jp:'冬'},{w:'rainy season',jp:'梅雨'},
    {w:'typhoon',jp:'台風'},{w:'earthquake',jp:'地震'},{w:'snow',jp:'雪'},
    {w:'hail',jp:'ひょう'},{w:'rainbow',jp:'虹'},{w:'sunset',jp:'夕日'},
    {w:'cherry blossom',jp:'桜'},{w:'autumn leaves',jp:'紅葉'},
    {w:'fireworks',jp:'花火'},{w:'temperature',jp:'気温'},{w:'forecast',jp:'予報'},
    {w:'climate change',jp:'気候変動'},{w:'global warming',jp:'地球温暖化'},
  ],
  family: [
    {w:'parents',jp:'両親'},{w:'mother',jp:'お母さん'},{w:'father',jp:'お父さん'},
    {w:'sibling',jp:'兄弟姉妹'},{w:'brother',jp:'兄・弟'},{w:'sister',jp:'姉・妹'},
    {w:'grandparents',jp:'祖父母'},{w:'grandmother',jp:'おばあちゃん'},
    {w:'grandfather',jp:'おじいちゃん'},{w:'cousin',jp:'いとこ'},
    {w:'aunt',jp:'おばさん'},{w:'uncle',jp:'おじさん'},
    {w:'only child',jp:'一人っ子'},{w:'oldest',jp:'長男・長女'},
    {w:'youngest',jp:'末っ子'},{w:'live with',jp:'〜と住む'},
    {w:'close',jp:'仲がいい'},{w:'tradition',jp:'伝統'},{w:'hometown',jp:'故郷'},
    {w:'grow up',jp:'育つ'},{w:'move to',jp:'〜に引っ越す'},
    {w:'neighborhood',jp:'近所'},{w:'house',jp:'家'},{w:'apartment',jp:'アパート'},
    {w:'countryside',jp:'田舎'},{w:'city',jp:'都市'},{w:'suburb',jp:'郊外'},
    {w:'culture',jp:'文化'},{w:'language',jp:'言語'},
  ],
  travel: [
    {w:'visit',jp:'訪れる'},{w:'trip',jp:'旅行'},{w:'journey',jp:'旅'},
    {w:'flight',jp:'フライト'},{w:'train',jp:'電車'},{w:'bus',jp:'バス'},
    {w:'hotel',jp:'ホテル'},{w:'hostel',jp:'ホステル'},{w:'Airbnb',jp:'民泊'},
    {w:'sightseeing',jp:'観光'},{w:'souvenir',jp:'お土産'},
    {w:'passport',jp:'パスポート'},{w:'visa',jp:'ビザ'},{w:'luggage',jp:'荷物'},
    {w:'local',jp:'地元の'},{w:'tourist spot',jp:'観光スポット'},
    {w:'hidden gem',jp:'穴場'},{w:'recommend',jp:'おすすめ'},
    {w:'bucket list',jp:'やりたいことリスト'},{w:'adventure',jp:'冒険'},
    {w:'backpacking',jp:'バックパッキング'},{w:'road trip',jp:'ロードトリップ'},
    {w:'temple',jp:'お寺'},{w:'shrine',jp:'神社'},{w:'castle',jp:'城'},
    {w:'museum',jp:'博物館'},{w:'gallery',jp:'美術館'},{w:'park',jp:'公園'},
    {w:'beach',jp:'ビーチ'},{w:'mountain',jp:'山'},{w:'forest',jp:'森'},
    {w:'island',jp:'島'},{w:'lake',jp:'湖'},{w:'waterfall',jp:'滝'},
    {w:'someday',jp:'いつか'},{w:'dream trip',jp:'夢の旅'},
    {w:'exchange student',jp:'交換留学生'},{w:'study abroad',jp:'留学'},
  ],
  work: [
    {w:'job',jp:'仕事'},{w:'career',jp:'キャリア'},{w:'dream',jp:'夢'},
    {w:'goal',jp:'目標'},{w:'future',jp:'将来'},{w:'ambition',jp:'野心・志'},
    {w:'company',jp:'会社'},{w:'startup',jp:'スタートアップ'},{w:'entrepreneur',jp:'起業家'},
    {w:'part-time',jp:'アルバイト'},{w:'internship',jp:'インターンシップ'},
    {w:'remote work',jp:'リモートワーク'},{w:'freelance',jp:'フリーランス'},
    {w:'salary',jp:'給料'},{w:'promotion',jp:'昇進'},{w:'retire',jp:'引退する'},
    {w:'passion',jp:'情熱'},{w:'challenge',jp:'挑戦'},{w:'achieve',jp:'達成する'},
    {w:'success',jp:'成功'},{w:'failure',jp:'失敗'},{w:'experience',jp:'経験'},
    {w:'skill',jp:'スキル'},{w:'talent',jp:'才能'},{w:'effort',jp:'努力'},
    {w:'opportunity',jp:'機会'},{w:'teamwork',jp:'チームワーク'},
    {w:'leadership',jp:'リーダーシップ'},{w:'volunteer',jp:'ボランティア'},
  ],
  entertainment: [
    {w:'movie',jp:'映画'},{w:'film',jp:'映画・フィルム'},{w:'anime',jp:'アニメ'},
    {w:'drama',jp:'ドラマ'},{w:'documentary',jp:'ドキュメンタリー'},
    {w:'comedy',jp:'コメディ'},{w:'action',jp:'アクション'},{w:'horror',jp:'ホラー'},
    {w:'romance',jp:'ロマンス'},{w:'fantasy',jp:'ファンタジー'},
    {w:'concert',jp:'コンサート'},{w:'festival',jp:'フェスティバル'},
    {w:'theater',jp:'劇場'},{w:'musical',jp:'ミュージカル'},{w:'opera',jp:'オペラ'},
    {w:'exhibition',jp:'展覧会'},{w:'comedian',jp:'コメディアン'},
    {w:'recently watched',jp:'最近見た'},{w:'favorite',jp:'お気に入り'},
    {w:'recommend',jp:'おすすめ'},{w:'sequel',jp:'続編'},{w:'remake',jp:'リメイク'},
    {w:'character',jp:'キャラクター'},{w:'plot',jp:'ストーリー'},{w:'ending',jp:'結末'},
    {w:'K-pop',jp:'K-POP'},{w:'J-pop',jp:'J-POP'},{w:'hip-hop',jp:'ヒップホップ'},
    {w:'classical',jp:'クラシック'},{w:'jazz',jp:'ジャズ'},{w:'rock',jp:'ロック'},
    {w:'playlist',jp:'プレイリスト'},{w:'album',jp:'アルバム'},{w:'lyrics',jp:'歌詞'},
  ],
  sports: [
    {w:'soccer',jp:'サッカー'},{w:'football',jp:'フットボール'},{w:'basketball',jp:'バスケ'},
    {w:'baseball',jp:'野球'},{w:'volleyball',jp:'バレーボール'},{w:'tennis',jp:'テニス'},
    {w:'badminton',jp:'バドミントン'},{w:'table tennis',jp:'卓球'},
    {w:'swimming',jp:'水泳'},{w:'running',jp:'ランニング'},{w:'marathon',jp:'マラソン'},
    {w:'cycling',jp:'自転車'},{w:'skiing',jp:'スキー'},{w:'snowboarding',jp:'スノボ'},
    {w:'surfing',jp:'サーフィン'},{w:'martial arts',jp:'武道'},{w:'judo',jp:'柔道'},
    {w:'kendo',jp:'剣道'},{w:'karate',jp:'空手'},{w:'gymnastics',jp:'体操'},
    {w:'team',jp:'チーム'},{w:'match',jp:'試合'},{w:'score',jp:'スコア'},
    {w:'win',jp:'勝つ'},{w:'lose',jp:'負ける'},{w:'draw',jp:'引き分け'},
    {w:'practice',jp:'練習'},{w:'coach',jp:'コーチ'},{w:'tournament',jp:'大会'},
    {w:'stadium',jp:'スタジアム'},{w:'gym',jp:'ジム'},{w:'fan',jp:'ファン'},
    {w:'support',jp:'応援する'},{w:'champion',jp:'チャンピオン'},{w:'record',jp:'記録'},
    {w:'Olympics',jp:'オリンピック'},{w:'World Cup',jp:'ワールドカップ'},
  ],
  pets: [
    {w:'dog',jp:'犬'},{w:'cat',jp:'猫'},{w:'rabbit',jp:'うさぎ'},
    {w:'hamster',jp:'ハムスター'},{w:'bird',jp:'鳥'},{w:'fish',jp:'魚'},
    {w:'turtle',jp:'カメ'},{w:'snake',jp:'ヘビ'},{w:'lizard',jp:'トカゲ'},
    {w:'parrot',jp:'オウム'},{w:'guinea pig',jp:'モルモット'},
    {w:'puppy',jp:'子犬'},{w:'kitten',jp:'子猫'},{w:'pet',jp:'ペット'},
    {w:'cute',jp:'かわいい'},{w:'fluffy',jp:'ふわふわ'},{w:'playful',jp:'遊び好きな'},
    {w:'naughty',jp:'やんちゃな'},{w:'gentle',jp:'おとなしい'},{w:'smart',jp:'賢い'},
    {w:'adopted',jp:'引き取った'},{w:'breed',jp:'品種'},{w:'paw',jp:'肉球'},
    {w:'tail',jp:'しっぽ'},{w:'fur',jp:'毛'},{w:'veterinarian',jp:'獣医'},
    {w:'animal shelter',jp:'動物シェルター'},{w:'zoo',jp:'動物園'},
    {w:'wildlife',jp:'野生動物'},{w:'endangered',jp:'絶滅危惧種'},
  ],
  tech: [
    {w:'app',jp:'アプリ'},{w:'smartphone',jp:'スマートフォン'},{w:'tablet',jp:'タブレット'},
    {w:'laptop',jp:'ノートPC'},{w:'headphones',jp:'ヘッドフォン'},
    {w:'social media',jp:'SNS'},{w:'Instagram',jp:'インスタ'},{w:'TikTok',jp:'ティックトック'},
    {w:'YouTube',jp:'ユーチューブ'},{w:'Twitter',jp:'ツイッター'},
    {w:'internet',jp:'インターネット'},{w:'Wi-Fi',jp:'ワイファイ'},{w:'Bluetooth',jp:'ブルートゥース'},
    {w:'AI',jp:'AI・人工知能'},{w:'robot',jp:'ロボット'},{w:'programming',jp:'プログラミング'},
    {w:'coding',jp:'コーディング'},{w:'website',jp:'ウェブサイト'},{w:'app development',jp:'アプリ開発'},
    {w:'update',jp:'アップデート'},{w:'useful',jp:'便利な'},{w:'bug',jp:'バグ'},
    {w:'game',jp:'ゲーム'},{w:'game console',jp:'ゲーム機'},{w:'streaming',jp:'ストリーミング'},
    {w:'online shopping',jp:'オンラインショッピング'},{w:'digital',jp:'デジタル'},
    {w:'virtual reality',jp:'VR'},{w:'electric car',jp:'電気自動車'},
  ],
  health: [
    {w:'exercise',jp:'運動'},{w:'workout',jp:'トレーニング'},{w:'gym',jp:'ジム'},
    {w:'diet',jp:'食事制限・ダイエット'},{w:'nutrition',jp:'栄養'},{w:'sleep',jp:'睡眠'},
    {w:'stress',jp:'ストレス'},{w:'mental health',jp:'メンタルヘルス'},
    {w:'healthy',jp:'健康的な'},{w:'fit',jp:'体型が良い'},{w:'tired',jp:'疲れた'},
    {w:'energy',jp:'エネルギー'},{w:'vitamin',jp:'ビタミン'},{w:'hydrate',jp:'水分補給'},
    {w:'jog',jp:'ジョギング'},{w:'stretch',jp:'ストレッチ'},{w:'balance',jp:'バランス'},
    {w:'hospital',jp:'病院'},{w:'medicine',jp:'薬'},{w:'doctor',jp:'医者'},
  ],
  emotion: [
    {w:'happy',jp:'嬉しい'},{w:'sad',jp:'悲しい'},{w:'excited',jp:'興奮している'},
    {w:'nervous',jp:'緊張している'},{w:'scared',jp:'怖い'},{w:'angry',jp:'怒っている'},
    {w:'surprised',jp:'驚いた'},{w:'proud',jp:'誇りに思う'},{w:'embarrassed',jp:'恥ずかしい'},
    {w:'lonely',jp:'孤独な'},{w:'grateful',jp:'感謝している'},{w:'confident',jp:'自信がある'},
    {w:'shy',jp:'恥ずかしがり屋な'},{w:'outgoing',jp:'外向的な'},{w:'kind',jp:'親切な'},
    {w:'funny',jp:'面白い'},{w:'serious',jp:'真面目な'},{w:'creative',jp:'創造的な'},
    {w:'honest',jp:'正直な'},{w:'patient',jp:'忍耐強い'},{w:'curious',jp:'好奇心旺盛な'},
    {w:'optimistic',jp:'楽観的な'},{w:'pessimistic',jp:'悲観的な'},
  ],
  intro: [
    {w:'nice to meet you',jp:'はじめまして'},{w:'where are you from?',jp:'どこ出身ですか？'},
    {w:'I\'m from',jp:'〜出身です'},{w:'I live in',jp:'〜に住んでいます'},
    {w:'my name is',jp:'名前は〜です'},{w:'I\'m a student',jp:'学生です'},
    {w:'I\'m years old',jp:'〜歳です'},{w:'nice to talk to you',jp:'話せて嬉しいです'},
    {w:'what do you do?',jp:'何をしていますか？'},{w:'tell me about yourself',jp:'自己紹介してください'},
    {w:'what\'s your hobby?',jp:'趣味は何ですか？'},{w:'do you speak English?',jp:'英語話せますか？'},
    {w:'I\'m learning English',jp:'英語を勉強中です'},{w:'my English is not perfect',jp:'英語は得意じゃないけど'},
    {w:'can you repeat?',jp:'もう一度言ってもらえますか？'},{w:'I don\'t understand',jp:'わかりません'},
    {w:'what does that mean?',jp:'どういう意味ですか？'},{w:'how do you say',jp:'〜は英語でどう言う？'},
  ],
  opinion: [
    {w:'I believe',jp:'〜だと信じています'},{w:'in my view',jp:'私の見方では'},
    {w:'I disagree',jp:'同意しません'},{w:'on the other hand',jp:'一方で'},
    {w:'however',jp:'しかし'},{w:'therefore',jp:'したがって'},
    {w:'because',jp:'なぜなら'},{w:'the reason is',jp:'理由は〜'},
    {w:'for instance',jp:'例えば'},{w:'such as',jp:'〜のような'},
    {w:'compared to',jp:'〜と比べると'},{w:'according to',jp:'〜によると'},
    {w:'I\'ve heard that',jp:'〜と聞いたことがあります'},{w:'it depends',jp:'場合によります'},
    {w:'that\'s a good point',jp:'いいポイントですね'},{w:'I hadn\'t thought of that',jp:'考えていなかった'},
  ],
  culture: [
    {w:'tradition',jp:'伝統'},{w:'custom',jp:'慣習'},{w:'festival',jp:'祭り'},
    {w:'holiday',jp:'祝日'},{w:'religion',jp:'宗教'},{w:'belief',jp:'信仰・考え方'},
    {w:'language',jp:'言語'},{w:'dialect',jp:'方言'},{w:'accent',jp:'アクセント・なまり'},
    {w:'multicultural',jp:'多文化な'},{w:'diversity',jp:'多様性'},{w:'equality',jp:'平等'},
    {w:'stereotype',jp:'ステレオタイプ'},{w:'prejudice',jp:'偏見'},
    {w:'global',jp:'グローバルな'},{w:'international',jp:'国際的な'},
    {w:'exchange',jp:'交流・交換'},{w:'understanding',jp:'理解'},
    {w:'respect',jp:'尊重'},{w:'peace',jp:'平和'},{w:'environment',jp:'環境'},
  ],
};

// 話題提案カードのトピック一覧
const TOPIC_CARDS = [
  { en:'Hobbies & Interests', icon:'🎨' },
  { en:'Food & Cooking',      icon:'🍜' },
  { en:'School & Study',      icon:'📚' },
  { en:'Sports',              icon:'⚽' },
  { en:'Music & Movies',      icon:'🎵' },
  { en:'Travel & Places',     icon:'✈️' },
  { en:'Family & Home',       icon:'🏠' },
  { en:'Future & Dreams',     icon:'🌟' },
  { en:'Technology',          icon:'💻' },
  { en:'Pets & Animals',      icon:'🐾' },
  { en:'Culture & Society',   icon:'🌍' },
  { en:'Health & Lifestyle',  icon:'💪' },
  { en:'Weather & Seasons',   icon:'🌸' },
  { en:'Feelings & Opinions', icon:'💬' },
];

let currentTopicIdx = -1;

function shuffleTopic(){
  let newIdx;
  do {
    newIdx = Math.floor(Math.random() * TOPIC_CARDS.length);
  } while(newIdx === currentTopicIdx && TOPIC_CARDS.length > 1);
  currentTopicIdx = newIdx;
  const card = TOPIC_CARDS[currentTopicIdx];
  document.getElementById('topicCard').textContent = `${card.icon} ${card.en}`;
}

// 発言テキストからトピックを判定するマップ
const TOPIC_MAP = [
  { topic:'intro',         regex:/hello|hi|meet|name|where.*from|from|live|introduce|years old|speak|english|repeat|understand|mean/ },
  { topic:'hobby',         regex:/draw|paint|sketch|art|picture|music|guitar|piano|violin|drum|read|novel|manga|cook|bak|game|photo|hike|camp|danc|sing|craft|knit|sew|garden|fish|collect|yoga|hobby|like|enjoy|interest|passionate|into|spend time/ },
  { topic:'food',          regex:/food|eat|cook|bak|dish|meal|breakfast|lunch|dinner|snack|dessert|restaurant|cafe|delicious|spicy|sweet|salty|sour|bitter|crispy|sushi|ramen|curry|pizza|pasta|burger|taco|kimchi|recipe|ingredient|flavor|taste|hungry|vegetarian|allerg/ },
  { topic:'school',        regex:/school|study|class|teacher|professor|exam|quiz|homework|assignment|project|club|subject|math|science|history|literature|pe|university|college|campus|major|grade|graduation|research|thesis|presentation|seminar|deadline|library/ },
  { topic:'weather',       regex:/weather|rain|sun|cloud|fog|wind|storm|hot|warm|cool|cold|freez|humid|dry|season|spring|summer|autumn|fall|winter|typhoon|earthquake|snow|hail|rainbow|sunset|cherry blossom|forecast|climate/ },
  { topic:'family',        regex:/family|parent|mother|father|mom|dad|brother|sister|sibling|grandp|cousin|aunt|uncle|only child|oldest|youngest|live with|hometown|grow up|move|neighbor|house|apartment|countryside|city/ },
  { topic:'travel',        regex:/travel|trip|journey|visit|flight|train|bus|hotel|hostel|sightseeing|souvenir|passport|visa|luggage|tourist|hidden gem|backpack|road trip|temple|shrine|castle|museum|gallery|beach|mountain|forest|island|lake|waterfall|abroad|exchange|study abroad/ },
  { topic:'work',          regex:/work|job|career|office|company|startup|entrepreneur|part.time|internship|remote|freelance|salary|promot|retire|passion|challenge|achieve|success|failure|skill|talent|volunteer|leadership/ },
  { topic:'entertainment', regex:/movie|film|anime|drama|documentary|comedy|action|horror|romance|fantasy|concert|festival|theater|musical|exhibition|recommend|sequel|remake|character|plot|ending|k.pop|j.pop|hip.hop|classical|jazz|rock|playlist|album|lyric|watch|listen|series/ },
  { topic:'sports',        regex:/soccer|football|basketball|baseball|volleyball|tennis|badminton|table tennis|swim|run|marathon|cycling|ski|snowboard|surf|martial|judo|karate|gymnas|team|match|score|win|lose|practice|tournament|stadium|gym|fan|champion|olympics|world cup/ },
  { topic:'pets',          regex:/dog|cat|rabbit|hamster|bird|fish|turtle|snake|parrot|puppy|kitten|pet|cute|fluffy|playful|naughty|gentle|smart|adopt|breed|paw|tail|fur|vet|zoo|wildlife/ },
  { topic:'tech',          regex:/app|smartphone|tablet|laptop|headphone|social media|instagram|tiktok|youtube|twitter|internet|wi.fi|bluetooth|ai|robot|program|code|website|game|console|streaming|online|digital|vr|electric car/ },
  { topic:'health',        regex:/exercise|workout|gym|diet|nutrition|sleep|stress|mental|health|healthy|fit|tired|energy|vitamin|jog|stretch|hospital|medicine|doctor/ },
  { topic:'emotion',       regex:/happy|sad|excit|nervous|scared|angry|surpris|proud|embarrass|lonely|grateful|confident|shy|outgoing|kind|funny|serious|creative|honest|patient|curious|optimistic|pessimistic|feel|feeling|emotion/ },
  { topic:'opinion',       regex:/think|believe|opinion|view|agree|disagree|however|therefore|because|reason|example|such as|compare|according|heard|depends|point/ },
  { topic:'culture',       regex:/tradition|custom|festival|holiday|religion|belief|language|dialect|accent|multicultural|diversity|equality|stereotype|prejudice|global|international|exchange|respect|peace|environment/ },
];

function getWords(text) {
  const t = text.toLowerCase();
  const matched = new Set();
  TOPIC_MAP.forEach(({ topic, regex }) => {
    if (regex.test(t)) matched.add(topic);
  });
  let words = [...WORD_DB.default];
  matched.forEach(topic => {
    if (WORD_DB[topic]) words = [...WORD_DB[topic], ...words];
  });
  const seen = new Set();
  return words.filter(w => {
    if (seen.has(w.w)) return false;
    seen.add(w.w);
    return true;
  }).slice(0, 18);
}

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

async function updateWordBridge(lastText){
  const words = getWords(lastText);
  const grid = document.getElementById('wordsGrid');
  grid.innerHTML = '';

  words.forEach(item => {
    const div = document.createElement('div');
    div.className = 'word-chip';
    div.id = `chip-${item.w.replace(/[\s'?!,]/g,'_')}`;
    const enSpan = document.createElement('span');
    enSpan.className = 'en';
    enSpan.textContent = item.w;
    div.appendChild(enSpan);
    if(myLang !== 'en'){
      const nativeSpan = document.createElement('span');
      nativeSpan.className = 'native';
      nativeSpan.textContent = myLang === 'ja' ? item.jp : '...';
      div.appendChild(nativeSpan);
    }
    grid.appendChild(div);
  });

  // 日本語以外・英語以外の場合はAPIで翻訳して更新
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

function toggleDrawer(){
  drawerOpen = !drawerOpen;
  document.getElementById('wbDrawer').className = 'wb-drawer' + (drawerOpen ? ' open' : '');
  document.getElementById('wbBtn').className = 'wb-open-btn' + (drawerOpen ? ' active' : '');

  if(drawerOpen){
    wbOpenCount++;
    wbOpenTime = Date.now();
    const grid = document.getElementById('wordsGrid');
    if(!grid.querySelector('.word-chip')) updateWordBridge('');
  } else {
    if(wbOpenTime !== null){
      wbTotalSec += Math.round((Date.now() - wbOpenTime) / 1000);
      wbOpenTime = null;
    }
  }
}
