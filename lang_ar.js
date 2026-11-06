// lang_ar.js  — アラビア語（ar）追加ファイル。lang_extra.js の「後」に読み込む。
// ※ 翻訳は機械的な下訳です。本番前にアラビア語話者に目を通してもらってください。
(function(){
  UI_TEXT.ar = {
    waiting:"في الانتظار", recording:"جارٍ التسجيل", participants:"المشاركون", you:"(أنت)",
    waitingUser:"في انتظار الآخرين...", times:"مرات", seeTranslation:"عرض الترجمة", close:"إغلاق",
    translating:"جارٍ الترجمة...", transError:"فشلت الترجمة", transFail:"الترجمة غير متاحة",
    speakHint:"اضغط مع الاستمرار على الزر للتحدث (يعمل مفتاح المسافة أيضًا)",
    listening:"أستمع... تحدّث الآن", micOff:"الميكروفون متوقف. اضغط على الزر لتشغيله",
    logTitle:"TalkBoard", otherCount:"الآخرون", endBtn:"إنهاء", langLabel:"لغة الترجمة",
    wordBridge:"ابحث عن الكلمات (WordBridge)", wordHint:"ستظهر الكلمات عندما تبدأ بالتحدث",
    wbPickHint:"اختر مستوى الموضوع لعرض الكلمات", wbTapHint:"اضغط على الكلمة عندما تستخدمها",
    topicLevelPicked:"تم اختيار: {level}! اضغط ▶ ابدأ",
    levelBeginner:"مبتدئ", levelIntermediate:"متوسط", levelAdvanced:"متقدم",
    helpTabBasic:"عبارات أساسية", helpTabConvo:"دعم المحادثة", helpLevelLbl:"مستوى العبارات",
    tierStarting:"بدء المحادثة", tierKeepGoing:"مواصلة المحادثة", tierGoingDeeper:"تعميق المحادثة",
    tierHintSuffix:"(يتغير تلقائيًا بحسب مقدار حديثك)",
    understandingHint:"اضغط لإظهار مدى استيعابك — يراه الجميع",
    understandingHappy:"فهمت!", understandingNeutral:"أفهم معظم الكلام", understandingConfused:"لا أفهم جيدًا",
    dashTitle:"تقرير الجلسة", dashClose:"إغلاق", greatJob:"أحسنت! 🎉", dashSub:"عمل رائع! هذا سجلّك.",
    statSpeaks:"مرات التحدث", statWords:"إجمالي الكلمات", statTrans:"الترجمات المستخدمة", statWB:"الكلمات المحددة", statTime:"المدة",
    statTopWords:"أكثر الكلمات التي استخدمتها", noData:"لا توجد بيانات",
    surveyTitle:"استبيان (حوالي 3 دقائق)", surveySection1:"عن محادثة اليوم",
    surveySection2:"عن اللغة الإنجليزية والتواصل الدولي",
    surveyWTCNote:"1 = لا أوافق بشدة 〜 6 = أوافق بشدة",
    surveyFree:"ملاحظات إضافية (انطباعات، اقتراحات، إلخ)", surveyFreePH:"اكتب ما تشاء هنا",
    surveySubmit:"إرسال", surveyDone:"✅ تم الإرسال! شكرًا لك!", surveyError:"تعذر الإرسال. يرجى المحاولة مرة أخرى.",
    qa1q:"ما مدى رضاك عن هذه المحادثة بشكل عام؟", qa1lo:"غير راضٍ", qa1hi:"راضٍ",
    qa2q:"ما مدى نشاطك في التحدث هذه المرة؟", qa2lo:"إطلاقًا", qa2hi:"بنشاط كبير",
    qa3q:"هل كان استخدام SpeakEase سهلًا؟", qa3lo:"صعب", qa3hi:"سهل",
    qa4q:"هل كان WordBridge (اقتراح الكلمات) مفيدًا؟", qa4lo:"غير مفيد", qa4hi:"مفيد جدًا",
    qa5q:"هل كان TalkBoard (النص المباشر للحديث) مفيدًا؟", qa5lo:"غير مفيد", qa5hi:"مفيد جدًا",
    qa6q:"هل تود استخدام هذا النظام مرة أخرى في التواصل الدولي؟", qa6lo:"لا", qa6hi:"نعم",
    qa7q:"هل كان HelpBox (مساعدة العبارات) مفيدًا؟", qa7lo:"غير مفيد", qa7hi:"مفيد جدًا",
    qa8q:"هل ساعدك زر GotIt! على إظهار مدى فهمك؟", qa8lo:"غير مفيد", qa8hi:"مفيد جدًا",
    qaIntlq:"أهتم بالتواصل مع أشخاص من دول أخرى.", qaIntllo:"لا أوافق", qaIntlhi:"أوافق",
    qaCultq:"أرغب في التعرف على ثقافات الدول الأخرى.", qaCultlo:"لا أوافق", qaCulthi:"أوافق",
    qaWbTopicq:"هل كانت اقتراحات المواضيع في WordBridge مفيدة؟", qaWbTopiclo:"غير مفيدة", qaWbTopichi:"مفيدة جدًا",
    surveySectionA:"عن هذا التبادل الدولي", surveySectionB:"عن SpeakEase",
    wbSearchPH:"اكتب كلمة بلغتك", wbSearching:"جارٍ البحث…", wbSearchNone:"لا توجد نتائج. جرّب كلمة أخرى.", wbSpeak:"استمع",
    wtc:[
      "أشعر بالتوتر من رأي الآخرين فيّ عندما أتحدث بالإنجليزية.",
      "أقلق من ارتكاب أخطاء نحوية عندما أتحدث بالإنجليزية.",
      "أعتقد أنه سيكون من الصعب عليّ التحدث بالإنجليزية لأكثر من ساعة.",
      "أستطيع بدء محادثة بالإنجليزية بنفسي.",
      "بعد المحادثة، أندم على أنني لم أتحدث بشكل أفضل.",
      "أستمتع بالوقت الذي أستخدم فيه الإنجليزية.",
      "أريد دراسة الإنجليزية أكثر في المستقبل.",
    ],
    qaWbSearchq:"هل كان البحث عن الكلمات (إيجاد كلمات إنجليزية بلغتك) مفيدًا؟", qaWbSearchlo:"غير مفيد", qaWbSearchhi:"مفيد جدًا",
    mtTitle:"اختبار الميكروفون", mtMsg:"قل شيئًا بالإنجليزية", mtSkip:"المتابعة على أي حال",
    mtNoTitle:"لم يتم اكتشاف ميكروفون",
    mtNoMsg:"لم يتم اكتشاف صوتك.<br><br>・استخدم <b>Chrome</b> أو <b>Edge</b> (متصفح Safari غير مدعوم)<br>・اسمح بالوصول إلى الميكروفون<br>・أعد تحميل الصفحة",
    mtOkTitle:"الميكروفون يعمل!", mtOkMsg:"جارٍ بدء الجلسة...", mtMeterHint:"يتحرك الشريط عندما يسمعك الميكروفون.",
    mtErrDenied:"تم حظر الوصول إلى الميكروفون. اضغط على أيقونة 🔒 بجانب شريط العنوان، واسمح بالميكروفون، ثم أعد تحميل الصفحة.",
    mtErrNoMic:"لم يتم العثور على ميكروفون. وصّل ميكروفونًا أو سماعة رأس ثم أعد تحميل الصفحة.",
    mtErrBusy:"الميكروفون مستخدم من تطبيق آخر (مثل Zoom). أغلقه وحاول مرة أخرى.",
    mtErrUnsupported:"هذا المتصفح غير مدعوم. استخدم Chrome أو Edge على الكمبيوتر.",
    mtErrNet:"تعذر الاتصال بخدمة التعرف على الكلام. تحقق من اتصالك بالإنترنت (بعض شبكات المدارس أو الشركات تحجبها).",
    mtErrSilent:"لا يصل أي صوت من الميكروفون. تحقق من أنه غير مكتوم وأنك اخترت الميكروفون الصحيح.",
    loRoom:"الغرفة", loTitle:"جارٍ التسجيل",
    loSub:"يمكنك تصغير هذا التبويب والتحدث على Zoom كالمعتاد. يتم تسجيل محادثتك لأغراض البحث.",
    loSigned:"تم تسجيل الدخول باسم", loFinish:"إنهاء الجلسة",
    loHint:"عند انتهاء الجلسة، عد إلى هذا التبويب واضغط «إنهاء الجلسة» للإجابة عن استبيان قصير.",
    endConfirm:"هل تريد إنهاء المحادثة وعرض التحليل؟",
    thanksClose:"شكرًا لمشاركتك. يمكنك إغلاق هذه الصفحة.",
  };
  // 右から左表示時の崩れ対策：英文（吹き出し・認識途中の文）は左から右のまま表示し、句読点が文頭に飛ぶのを防ぐ
  const st = document.createElement('style');
  st.textContent = '[dir="rtl"] .b-en{direction:ltr;text-align:left;unicode-bidi:plaintext}'
                 + '[dir="rtl"] #ctrlHint{unicode-bidi:plaintext}'
                 + '[dir="rtl"] .understanding-lbl,[dir="rtl"] #topicCard,[dir="rtl"] .wb-spin-btn{direction:ltr}'
                 + '[dir="rtl"] #mtHeard{unicode-bidi:plaintext}'
                 + '[dir="rtl"] .help-phrase-item .en{unicode-bidi:plaintext;text-align:right}'
                 + '[dir="rtl"] .room-pill{direction:ltr}';
  document.head.appendChild(st);
  // 右から左（RTL）切替：入室時に app.js から呼ぶ
  window.applyLangDir = function(lang){
    const rtl = (lang === 'ar');
    document.documentElement.lang = lang;
    document.body.dir = rtl ? 'rtl' : 'ltr';
  };
})();
