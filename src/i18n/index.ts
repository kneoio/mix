export type Locale = 'pt' | 'en' | 'uk' | 'kk' | 'de' | 'fr' | 'zh' | 'ja' | 'ka' | 'lv' | 'ru' | 'it' | 'tr' | 'ar' | 'pl' | 'hi' | 'ko' | 'fi' | 'sv' | 'no'

export const messages = {
  pt: {
    appTitle: 'Mixpla',
    menu: {
      space: 'Espaço',
      radistions: 'Estações de rádio',
      login: 'Entrar',
      account: 'Conta',
      title: 'Menu',
      listeners: 'Ouvintes',
      soundFragments: 'Fragmentos de Som',
    },
    theme: {
      switchToLight: 'Mudar para o tema claro',
      switchToDark: 'Mudar para o tema escuro'
    },
    common: {
      back: 'Voltar',
      new: 'Novo',
      save: 'Guardar',
      delete: 'Excluir',
      search: 'Pesquisar',
      page: 'Página',
      noItemsSelected: 'Nenhum item selecionado',
      deleteNNotImplemented: 'Excluir {count} item(ns) - não implementado'
    },
    columns: {
      title: 'Título',
      country: 'País',
      status: 'Status',
      description: 'Descrição',
      artist: 'Artista',
      type: 'Tipo',
      genres: 'Gêneros',
      labels: 'Etiquetas'
    },
    tabs: {
      properties: 'Propriedades',
      aiAgent: 'Agente IA',
      profile: 'Perfil',
      contribution: 'Contribuição'
    },
    fields: {
      localizedNames: 'Nomes Localizados',
      language: 'Idioma',
      name: 'Nome',
      country: 'País',
      color: 'Cor',
      timeZone: 'Fuso horário',
      managedBy: 'Gerido por',
      bitRate: 'Taxa de bits',
      description: 'Descrição',
      album: 'Álbum',
      uploadFile: 'Carregar arquivo',
      aiAgent: 'Agente IA',
      profileName: 'Nome do Perfil',
      messagingAllowed: 'Mensagens Permitidas',
      songSubmissionAllowed: 'Envio de Músicas Permitido'
    },
    status: {
      online: 'Online',
      offline: 'Offline',
      unknown: 'Desconhecido'
    },
    radiostations: {
      confirmDelete: 'Excluir {count} estação(ões)?'
    },
    profile: {
      notAuthenticated: 'Não autenticado.',
      preferences: 'Preferências',
      changeLanguage: 'Alterar idioma',
      clientId: 'ID do Cliente',
      preferredUsername: 'Nome de usuário preferido',
      email: 'E-mail',
      logout: 'Sair'
    },
    home: {
      welcome: 'Bem-vindo',
      publicHome: 'Esta é a tela pública inicial.',
      goToFavorites: 'Ir para Favoritos'
    },
    errors: {
      notFound: 'Ops. Nada por aqui...'
    },
    actions: {
      goHome: 'Ir para Início'
    },
    space: {
      loadFailed: 'Falha ao carregar estações. Tente novamente mais tarde.',
      noOnlineStations: 'Nenhuma estação online no momento.'
    }
  },
  en: {
    appTitle: 'Mixpla',
    menu: {
      space: 'Space',
      radistions: 'Radiostations',
      login: 'Login',
      account: 'Account',
      title: 'Menu',
      listeners: 'Listeners',
      soundFragments: 'Sound Fragments',
    },
    theme: {
      switchToLight: 'Switch to light theme',
      switchToDark: 'Switch to dark theme'
    },
    common: {
      back: 'Back',
      new: 'New',
      save: 'Save',
      delete: 'Delete',
      search: 'Search',
      page: 'Page',
      noItemsSelected: 'No items selected',
      deleteNNotImplemented: 'Delete {count} item(s) - not implemented'
    },
    columns: {
      title: 'Title',
      country: 'Country',
      status: 'Status',
      description: 'Description',
      artist: 'Artist',
      type: 'Type',
      genres: 'Genres',
      labels: 'Labels',
      representedInBrands: 'Assign To'
    },
    tabs: {
      properties: 'Properties',
      aiAgent: 'AI Agent',
      profile: 'Profile',
      contribution: 'Contribution'
    },
    fields: {
      localizedNames: 'Localized Names',
      language: 'Language',
      name: 'Name',
      country: 'Country',
      color: 'Color',
      timeZone: 'Time Zone',
      managedBy: 'Managed By',
      bitRate: 'Bit Rate',
      description: 'Description',
      album: 'Album',
      uploadFile: 'Upload file',
      aiAgent: 'AI Agent',
      profileName: 'Profile Name',
      messagingAllowed: 'Messaging Allowed',
      songSubmissionAllowed: 'Song Submission Allowed'
    },
    status: {
      online: 'Online',
      offline: 'Offline',
      unknown: 'Unknown'
    },
    radiostations: {
      confirmDelete: 'Delete {count} station(s)?'
    },
    profile: {
      notAuthenticated: 'Not authenticated.',
      preferences: 'Preferences',
      changeLanguage: 'Change language',
      clientId: 'Client ID',
      preferredUsername: 'Preferred Username',
      email: 'Email',
      logout: 'Logout'
    },
    home: {
      welcome: 'Welcome',
      publicHome: 'This is the public home screen.',
      goToFavorites: 'Go to Favorites'
    },
    errors: {
      notFound: 'Oops. Nothing here...'
    },
    actions: {
      goHome: 'Go Home'
    },
    space: {
      loadFailed: 'Failed to load stations. Please try again later.',
      noOnlineStations: 'No online stations at the moment.'
    }
  },
  uk: {
    appTitle: 'Mix',
    menu: {
      space: 'Простір',
      radistions: 'Радіостанції',
      login: 'Увійти',
      account: 'Обліковий запис',
      title: 'Меню',
      listeners: 'Слухачі',
      soundFragments: 'Звукові фрагменти',
    },
    theme: {
      switchToLight: 'Перемкнути на світлу тему',
      switchToDark: 'Перемкнути на темну тему'
    },
    status: {
      online: 'Онлайн',
      offline: 'Офлайн',
      unknown: 'Невідомо'
    },
    errors: {
      notFound: 'Нічого не знайдено'
    },
    common: {
      back: 'Назад',
      new: 'Новий',
      save: 'Зберегти',
      delete: 'Видалити',
      search: 'Пошук',
      page: 'Сторінка',
      noItemsSelected: 'Нічого не вибрано',
      deleteNNotImplemented: 'Видалення {count} елемент(ів) — не реалізовано'
    },
    columns: {
      title: 'Назва',
      country: 'Країна',
      status: 'Статус',
      description: 'Опис',
      artist: 'Виконавець',
      type: 'Тип',
      genres: 'Жанри',
      labels: 'Мітки',
      representedInBrands: 'Призначити'
    },
    fields: {
      localizedNames: 'Локалізовані назви',
      language: 'Мова',
      name: 'Імʼя',
      country: 'Країна',
      color: 'Колір',
      timeZone: 'Часовий пояс',
      managedBy: 'Керується',
      bitRate: 'Бітрейт',
      description: 'Опис',
      album: 'Альбом',
      uploadFile: 'Завантажити файл',
      aiAgent: 'AI агент',
      profileName: 'Назва профілю',
      messagingAllowed: 'Повідомлення дозволені',
      songSubmissionAllowed: 'Надсилання пісень дозволено'
    },
    tabs: {
      properties: 'Властивості',
      aiAgent: 'AI агент',
      profile: 'Профіль',
      contribution: 'Внесок'
    },
    profile: {
      notAuthenticated: 'Не автентифіковано.',
      preferences: 'Налаштування',
      changeLanguage: 'Змінити мову',
      clientId: 'ID клієнта',
      preferredUsername: 'Бажане імʼя користувача',
      email: 'Електронна пошта',
      logout: 'Вийти'
    },
    radiostations: {
      confirmDelete: 'Видалити {count} станцію(ї)?'
    },
    home: {
      welcome: 'Ласкаво просимо',
      publicHome: 'Це публічний головний екран.',
      goToFavorites: 'Перейти до Вибраного'
    },
    actions: {
      goHome: 'На головну'
    },
    space: {
      loadFailed: 'Не вдалося завантажити станції. Спробуйте пізніше.',
      noOnlineStations: 'Немає онлайн станцій на даний момент.'
    }
  },
  kk: {
    appTitle: 'Mix',
    menu: {
      space: 'Кеңістік',
      radistions: 'Радиостанциялар',
      login: 'Кіру',
      account: 'Есептік жазба',
      title: 'Мәзір',
      listeners: 'Тыңдаушылар',
      soundFragments: 'Дыбыс фрагменттері',
    },
    theme: {
      switchToLight: 'Жарық тақырыпқа ауыстыру',
      switchToDark: 'Қараңғы тақырыпқа ауыстыру'
    },
    status: {
      online: 'Онлайн',
      offline: 'Оффлайн',
      unknown: 'Белгісіз'
    },
    common: {
      back: 'Артқа',
      new: 'Жаңа',
      save: 'Сақтау',
      delete: 'Жою',
      search: 'Іздеу',
      page: 'Бет',
      noItemsSelected: 'Ештеңе таңдалмады',
      deleteNNotImplemented: '{count} элементті жою — іске асырылмаған'
    },
    columns: {
      title: 'Атауы',
      country: 'Ел',
      status: 'Күйі',
      description: 'Сипаттамасы',
      artist: 'Орындаушы',
      type: 'Түрі',
      genres: 'Жанрлар',
      labels: 'Жапсырмалар',
      representedInBrands: 'Тағайындау'
    },
    profile: {
      notAuthenticated: 'Аутентификацияланбаған.',
      preferences: 'Баптаулар',
      changeLanguage: 'Тілді өзгерту',
      clientId: 'Клиент ID',
      preferredUsername: 'Таңдаулы пайдаланушы аты',
      email: 'Электрондық пошта',
      logout: 'Шығу'
    },
    radiostations: {
      confirmDelete: '{count} станцияны жою?'
    },
    home: {
      welcome: 'Қош келдіңіз',
      publicHome: 'Бұл жалпы басты экран.',
      goToFavorites: 'Таңдаулыларға өту'
    },
    actions: {
      goHome: 'Басты бетке'
    },
    space: {
      loadFailed: 'Станцияларды жүктеу сәтсіз. Кейінірек қайталап көріңіз.',
      noOnlineStations: 'Қазіргі уақытта онлайн станциялар жоқ.'
    }
  },
  de: {
    appTitle: 'Mix',
    menu: {
      space: 'Raum',
      radistions: 'Radiosender',
      login: 'Anmelden',
      account: 'Konto',
      title: 'Menü',
      listeners: 'Hörer',
      soundFragments: 'Sound‑Fragmente',
    },
    theme: {
      switchToLight: 'Zum hellen Theme wechseln',
      switchToDark: 'Zum dunklen Theme wechseln'
    },
    status: {
      online: 'Online',
      offline: 'Offline',
      unknown: 'Unbekannt'
    },
    errors: {
      notFound: 'Nichts gefunden'
    },
    common: {
      back: 'Zurück',
      new: 'Neu',
      save: 'Speichern',
      delete: 'Löschen',
      search: 'Suche',
      page: 'Seite',
      noItemsSelected: 'Keine Elemente ausgewählt',
      deleteNNotImplemented: '{count} Elemente löschen – nicht implementiert'
    },
    columns: {
      title: 'Titel',
      country: 'Land',
      status: 'Status',
      description: 'Beschreibung',
      artist: 'Künstler',
      type: 'Typ',
      genres: 'Genres',
      labels: 'Labels',
      representedInBrands: 'Zuweisen zu'
    },
    fields: {
      localizedNames: 'Lokalisierte Namen',
      language: 'Sprache',
      name: 'Name',
      country: 'Land',
      color: 'Farbe',
      timeZone: 'Zeitzone',
      managedBy: 'Verantwortlich',
      bitRate: 'Bitrate',
      description: 'Beschreibung',
      album: 'Album',
      uploadFile: 'Datei hochladen',
      aiAgent: 'AI Agent',
      profileName: 'Profilname',
      messagingAllowed: 'Nachrichten erlaubt',
      songSubmissionAllowed: 'Song-Einreichung erlaubt'
    },
    tabs: {
      properties: 'Eigenschaften',
      aiAgent: 'AI Agent',
      profile: 'Profil',
      contribution: 'Beitrag'
    },
    profile: {
      notAuthenticated: 'Nicht authentifiziert.',
      preferences: 'Einstellungen',
      changeLanguage: 'Sprache ändern',
      clientId: 'Client-ID',
      preferredUsername: 'Bevorzugter Benutzername',
      email: 'E‑Mail',
      logout: 'Abmelden'
    },
    space: {
      loadFailed: 'Fehler beim Laden der Stationen. Bitte versuchen Sie es später erneut.',
      noOnlineStations: 'Keine Online-Stationen im Moment.'
    }
  },
  fr: {
    appTitle: 'Mix',
    menu: {
      space: 'Espace',
      radistions: 'Stations de radio',
      login: 'Connexion',
      account: 'Compte',
      title: 'Menu',
      listeners: 'Auditeurs',
      soundFragments: 'Fragments sonores',
    },
    theme: {
      switchToLight: 'Passer au thème clair',
      switchToDark: 'Passer au thème sombre'
    },
    status: {
      online: 'En ligne',
      offline: 'Hors ligne',
      unknown: 'Inconnu'
    },
    errors: {
      notFound: 'Rien trouvé'
    },
    common: {
      back: 'Retour',
      new: 'Nouveau',
      save: 'Enregistrer',
      delete: 'Supprimer',
      search: 'Recherche',
      page: 'Page',
      noItemsSelected: 'Aucun élément sélectionné',
      deleteNNotImplemented: 'Supprimer {count} élément(s) — non implémenté'
    },
    columns: {
      title: 'Titre',
      country: 'Pays',
      status: 'Statut',
      description: 'Description',
      artist: 'Artiste',
      type: 'Type',
      genres: 'Genres'
    },
    fields: {
      localizedNames: 'Noms localisés',
      language: 'Langue',
      name: 'Nom',
      country: 'Pays',
      color: 'Couleur',
      timeZone: 'Fuseau horaire',
      managedBy: 'Géré par',
      bitRate: 'Débit binaire',
      description: 'Description',
      album: 'Album',
      uploadFile: 'Télécharger un fichier',
      aiAgent: 'Agent IA',
      profileName: 'Nom du profil',
      messagingAllowed: 'Messages autorisés',
      songSubmissionAllowed: 'Soumission de chansons autorisée'
    },
    tabs: {
      properties: 'Propriétés',
      aiAgent: 'Agent IA',
      profile: 'Profil',
      contribution: 'Contribution'
    },
    profile: {
      notAuthenticated: 'Non authentifié.',
      preferences: 'Préférences',
      changeLanguage: 'Changer de langue',
      clientId: 'ID client',
      preferredUsername: 'Nom d’utilisateur préféré',
      email: 'E-mail',
      logout: 'Se déconnecter'
    },
    space: {
      loadFailed: 'Erreur lors du chargement des stations. Veuillez réessayer plus tard.',
      noOnlineStations: 'Aucune station en ligne pour le moment.'
    }
  },
  zh: {
    appTitle: 'Mix',
    menu: {
      space: '空间',
      radistions: '电台',
      login: '登录',
      account: '账户',
      title: '菜单',
      listeners: '听众',
      soundFragments: '音频片段',
    },
    theme: {
      switchToLight: '切换到浅色主题',
      switchToDark: '切换到深色主题'
    },
    status: {
      online: '在线',
      offline: '离线',
      unknown: '未知'
    },
    errors: {
      notFound: '未找到内容'
    },
    common: {
      back: '返回',
      new: '新建',
      save: '保存',
      delete: '删除',
      search: '搜索',
      page: '页面',
      noItemsSelected: '未选择任何项',
      deleteNNotImplemented: '删除 {count} 个项目——未实现'
    },
    columns: {
      title: '标题',
      country: '国家',
      status: '状态',
      description: '描述',
      artist: '艺术家',
      type: '类型',
      genres: '流派',
      labels: '标签',
      representedInBrands: '分配到'
    },
    fields: {
      localizedNames: '本地化名称',
      language: '语言',
      name: '名称',
      country: '国家',
      color: '颜色',
      timeZone: '时区',
      managedBy: '管理者',
      bitRate: '比特率',
      description: '描述',
      album: '专辑',
      uploadFile: '上传文件',
      aiAgent: 'AI 代理',
      profileName: '配置文件名称',
      messagingAllowed: '允许消息',
      songSubmissionAllowed: '允许提交歌曲'
    },
    tabs: {
      properties: '属性',
      aiAgent: 'AI 代理',
      profile: '配置文件',
      contribution: '贡献'
    },
    profile: {
      notAuthenticated: '未认证。',
      preferences: '偏好设置',
      changeLanguage: '更改语言',
      clientId: '客户端 ID',
      preferredUsername: '首选用户名',
      email: '电子邮件',
      logout: '退出登录'
    },
    space: {
      loadFailed: '加载电台失败。请稍后再试。',
      noOnlineStations: '当前没有在线电台。'
    }
  },
  ja: {
    appTitle: 'Mix',
    menu: {
      space: 'スペース',
      radistions: 'ラジオ局',
      login: 'ログイン',
      account: 'アカウント',
      title: 'メニュー',
      listeners: 'リスナー',
      soundFragments: 'サウンドフラグメント',
    },
    theme: {
      switchToLight: 'ライトテーマに切り替え',
      switchToDark: 'ダークテーマに切り替え'
    },
    status: {
      online: 'オンライン',
      offline: 'オフライン',
      unknown: '不明'
    },
    errors: {
      notFound: '何も見つかりません'
    },
    common: {
      back: '戻る',
      new: '新規',
      save: '保存',
      delete: '削除',
      search: '検索',
      page: 'ページ',
      noItemsSelected: '選択された項目はありません',
      deleteNNotImplemented: '{count} 件の削除 — 未実装'
    },
    columns: {
      title: 'タイトル',
      country: '国',
      status: 'ステータス',
      description: '説明',
      artist: 'アーティスト',
      type: '種類',
      genres: 'ジャンル',
      labels: 'ラベル',
      representedInBrands: '割り当て'
    },
    fields: {
      localizedNames: 'ローカライズされた名前',
      language: '言語',
      name: '名前',
      country: '国',
      color: '色',
      timeZone: 'タイムゾーン',
      managedBy: '管理者',
      bitRate: 'ビットレート',
      description: '説明',
      album: 'アルバム',
      uploadFile: 'ファイルをアップロード',
      aiAgent: 'AI エージェント',
      profileName: 'プロファイル名',
      messagingAllowed: 'メッセージング許可',
      songSubmissionAllowed: '曲の投稿許可'
    },
    tabs: {
      properties: 'プロパティ',
      aiAgent: 'AI エージェント',
      profile: 'プロファイル',
      contribution: '貢献'
    },
    profile: {
      notAuthenticated: '認証されていません。',
      preferences: '設定',
      changeLanguage: '言語を変更',
      clientId: 'クライアントID',
      preferredUsername: '優先ユーザー名',
      email: 'メール',
      logout: 'ログアウト'
    },
    space: {
      loadFailed: '局の読み込みに失敗しました。後でもう一度お試しください。',
      noOnlineStations: '現在オンラインの局はありません。'
    }
  },
  ka: {
    appTitle: 'Mix',
    menu: {
      space: 'სივრცე',
      radistions: 'რადიოსადგურები',
      login: 'შესვლა',
      account: 'ანგარიში',
      title: 'მენიუ',
      listeners: 'მსმენელები',
      soundFragments: 'ხმის ფრაგმენტები',
    },
    theme: {
      switchToLight: 'გადართვა ნათელ თემაზე',
      switchToDark: 'გადართვა ბნელ თემაზე'
    },
    status: {
      online: 'ონლაინ',
      offline: 'ოფლაინ',
      unknown: 'უცნობი'
    },
    errors: {
      notFound: 'ვერ მოიძებნა'
    },
    common: {
      back: 'უკან',
      new: 'ახალი',
      save: 'შენახვა',
      delete: 'წაშლა',
      search: 'ძებნა',
      page: 'გვერდი',
      noItemsSelected: 'არცერთი ჩანაწერი არჩეული არაა',
      deleteNNotImplemented: '{count} ჩანაწერის წაშლა — არ არის რეალიზებული'
    },
    columns: {
      title: 'სათაური',
      country: 'ქვეყანა',
      status: 'სტატუსი',
      description: 'აღწერა',
      artist: 'შემსრულებელი',
      type: 'ტიპი',
      genres: 'ჟანრები',
      labels: 'ლეიბლები',
      representedInBrands: 'მინიჭება'
    },
    fields: {
      localizedNames: 'ლოკალიზებული სახელები',
      language: 'ენა',
      name: 'სახელი',
      country: 'ქვეყანა',
      color: 'ფერი',
      timeZone: 'დროის სარტყელი',
      managedBy: 'მართავს',
      bitRate: 'ბიტრეიტო',
      description: 'აღწერა',
      album: 'ალბომი',
      uploadFile: 'ფაილის ატვირთვა',
      aiAgent: 'AI აგენტი',
      profileName: 'პროფილის სახელი',
      messagingAllowed: 'შეტყობინებები დაშვებულია',
      songSubmissionAllowed: 'სიმღერის გაგზავნა დაშვებულია'
    },
    tabs: {
      properties: 'თავისუფლები',
      aiAgent: 'AI აგენტი',
      profile: 'პროფილი',
      contribution: 'წვლილი'
    },
    profile: {
      notAuthenticated: 'ავტორიზებული არ არის.',
      preferences: 'პარამეტრები',
      changeLanguage: 'ენის შეცვლა',
      clientId: 'კლიენტის ID',
      preferredUsername: 'სასურველი მომხმარებლის სახელი',
      email: 'ელ. ფოსტა',
      logout: 'გამოსვლა'
    },
    space: {
      loadFailed: 'სადგურების ჩატვირთვა ვერ მოხერხდა. გთხოვთ, სცადოთ მოგვიანებით.',
      noOnlineStations: 'ამჟამად ონლაინ სადგურები არ არის.'
    }
  },
  lv: {
    appTitle: 'Mix',
    menu: {
      space: 'Telpa',
      radistions: 'Radiostacijas',
      login: 'Pieteikties',
      account: 'Konts',
      title: 'Izvēlne',
      listeners: 'Klausītāji',
      soundFragments: 'Skaņas fragmenti',
    },
    theme: {
      switchToLight: 'Pārslēgt uz gaišo tēmu',
      switchToDark: 'Pārslēgt uz tumšo tēmu'
    },
    status: {
      online: 'Tiešsaistē',
      offline: 'Bezsaistē',
      unknown: 'Nezināms'
    },
    errors: {
      notFound: 'Nekas nav atrasts'
    },
    common: {
      back: 'Atpakaļ',
      new: 'Jauns',
      save: 'Saglabāt',
      delete: 'Dzēst',
      search: 'Meklēt',
      page: 'Lapa',
      noItemsSelected: 'Nav atlasītu vienību',
      deleteNNotImplemented: 'Dzēst {count} vienību — nav ieviests'
    },
    columns: {
      title: 'Nosaukums',
      country: 'Valsts',
      status: 'Statuss',
      description: 'Apraksts',
      artist: 'Izpildītājs',
      type: 'Tips',
      genres: 'Žanri',
      labels: 'Etiķetes',
      representedInBrands: 'Piesaistīt'
    },
    fields: {
      localizedNames: 'Lokalizētie nosaukumi',
      language: 'Valoda',
      name: 'Nosaukums',
      country: 'Valsts',
      color: 'Krāsa',
      timeZone: 'Laika josla',
      managedBy: 'Pārvaldītājs',
      bitRate: 'Bitātrums',
      description: 'Apraksts',
      album: 'Albūms',
      uploadFile: 'Augšupielādēt failu',
      aiAgent: 'AI aģents',
      profileName: 'Profila nosaukums',
      messagingAllowed: 'Ziņojumapmaiņa atļauta',
      songSubmissionAllowed: 'Dziesmu iesniegšana atļauta'
    },
    tabs: {
      properties: 'Īpašības',
      aiAgent: 'AI aģents',
      profile: 'Profils',
      contribution: 'Ieguldījums'
    },
    profile: {
      notAuthenticated: 'Nav autentificēts.',
      preferences: 'Iestatījumi',
      changeLanguage: 'Mainīt valodu',
      clientId: 'Klienta ID',
      preferredUsername: 'Vēlamais lietotājvārds',
      email: 'E-pasts',
      logout: 'Izrakstīties'
    },
    space: {
      loadFailed: 'Neizdevās ielādēt stacijas. Lūdzu, mēģiniet vēlāk.',
      noOnlineStations: 'Šobrīd nav tiešsaistes staciju.'
    }
  },
  ru: {
    appTitle: 'Mix',
    menu: {
      space: 'Пространство',
      radistions: 'Радиостанции',
      login: 'Войти',
      account: 'Аккаунт',
      title: 'Меню',
      listeners: 'Слушатели',
      soundFragments: 'Аудиофрагменты',
    },
    theme: {
      switchToLight: 'Переключить на светлую тему',
      switchToDark: 'Переключить на тёмную тему'
    },
    status: {
      online: 'Онлайн',
      offline: 'Оффлайн',
      unknown: 'Неизвестно'
    },
    errors: {
      notFound: 'Ничего не найдено'
    },
    common: {
      back: 'Назад',
      new: 'Новый',
      save: 'Сохранить',
      delete: 'Удалить',
      search: 'Поиск',
      page: 'Страница',
      noItemsSelected: 'Нет выбранных элементов',
      deleteNNotImplemented: 'Удалить {count} элемент(ов) — не реализовано'
    },
    columns: {
      title: 'Название',
      country: 'Страна',
      status: 'Статус',
      description: 'Описание',
      artist: 'Исполнитель',
      type: 'Тип',
      genres: 'Жанры',
      labels: 'Метки',
      representedInBrands: 'Назначить'
    },
    fields: {
      localizedNames: 'Локализованные названия',
      language: 'Язык',
      name: 'Имя',
      country: 'Страна',
      color: 'Цвет',
      timeZone: 'Часовой пояс',
      managedBy: 'Управляется',
      bitRate: 'Битрейт',
      description: 'Описание',
      album: 'Альбом',
      uploadFile: 'Загрузить файл',
      aiAgent: 'AI агент',
      profileName: 'Имя профиля',
      messagingAllowed: 'Сообщения разрешены',
      songSubmissionAllowed: 'Отправка песен разрешена'
    },
    tabs: {
      properties: 'Свойства',
      aiAgent: 'AI агент',
      profile: 'Профиль',
      contribution: 'Вклад'
    },
    profile: {
      notAuthenticated: 'Не аутентифицирован.',
      preferences: 'Настройки',
      changeLanguage: 'Изменить язык',
      clientId: 'ID клиента',
      preferredUsername: 'Предпочитаемое имя пользователя',
      email: 'Эл. почта',
      logout: 'Выйти'
    },
    space: {
      loadFailed: 'Не удалось загрузить станции. Пожалуйста, попробуйте позже.',
      noOnlineStations: 'В данный момент нет онлайн станций.'
    }
  },
  it: {
    appTitle: 'Mix',
    menu: {
      space: 'Spazio',
      radistions: 'Stazioni radio',
      login: 'Accedi',
      account: 'Account',
      title: 'Menu',
      listeners: 'Ascoltatori',
      soundFragments: 'Frammenti sonori',
    },
    theme: {
      switchToLight: 'Passa al tema chiaro',
      switchToDark: 'Passa al tema scuro'
    },
    status: {
      online: 'Online',
      offline: 'Offline',
      unknown: 'Sconosciuto'
    },
    errors: {
      notFound: 'Nessun risultato'
    },
    common: {
      back: 'Indietro',
      new: 'Nuovo',
      save: 'Salva',
      delete: 'Elimina',
      search: 'Cerca',
      page: 'Pagina',
      noItemsSelected: 'Nessun elemento selezionato',
      deleteNNotImplemented: 'Elimina {count} elemento/i — non implementato'
    },
    columns: {
      title: 'Titolo',
      country: 'Paese',
      status: 'Stato',
      description: 'Descrizione',
      artist: 'Artista',
      type: 'Tipo',
      genres: 'Generi',
      labels: 'Etichette',
      representedInBrands: 'Assegna a'
    },
    fields: {
      localizedNames: 'Nomi localizzati',
      language: 'Lingua',
      name: 'Nome',
      country: 'Paese',
      color: 'Colore',
      timeZone: 'Fuso orario',
      managedBy: 'Gestito da',
      bitRate: 'Bitrate',
      description: 'Descrizione',
      album: 'Album',
      uploadFile: 'Carica file',
      aiAgent: 'Agente AI',
      profileName: 'Nome profilo',
      messagingAllowed: 'Messaggi consentiti',
      songSubmissionAllowed: 'Invio canzoni consentito'
    },
    tabs: {
      properties: 'Proprietà',
      aiAgent: 'Agente AI',
      profile: 'Profilo',
      contribution: 'Contributo'
    },
    profile: {
      notAuthenticated: 'Non autenticato.',
      preferences: 'Preferenze',
      changeLanguage: 'Cambia lingua',
      clientId: 'ID cliente',
      preferredUsername: 'Nome utente preferito',
      email: 'E‑mail',
      logout: 'Esci'
    },
    space: {
      loadFailed: 'Errore durante il caricamento delle stazioni. Riprova più tardi.',
      noOnlineStations: 'Nessuna stazione online al momento.'
    }
  },
  tr: {
    appTitle: 'Mix',
    menu: {
      space: 'Alan',
      radistions: 'Radyo istasyonları',
      login: 'Giriş',
      account: 'Hesap',
      title: 'Menü',
      listeners: 'Dinleyiciler',
      soundFragments: 'Ses Parçaları',
    },
    theme: {
      switchToLight: 'Açık temaya geç',
      switchToDark: 'Koyu temaya geç'
    },
    status: {
      online: 'Çevrimiçi',
      offline: 'Çevrimdışı',
      unknown: 'Bilinmiyor'
    },
    errors: {
      notFound: 'Hiçbir şey bulunamadı'
    },
    common: {
      back: 'Geri',
      new: 'Yeni',
      save: 'Kaydet',
      delete: 'Sil',
      search: 'Ara',
      page: 'Sayfa',
      noItemsSelected: 'Seçili öğe yok',
      deleteNNotImplemented: '{count} öğe silme — uygulanmadı'
    },
    columns: {
      title: 'Başlık',
      country: 'Ülke',
      status: 'Durum',
      description: 'Açıklama',
      artist: 'Sanatçı',
      type: 'Tür',
      genres: 'Türler',
      labels: 'Etiketler',
      representedInBrands: 'Ata'
    },
    fields: {
      localizedNames: 'Yerelleştirilmiş adlar',
      language: 'Dil',
      name: 'Ad',
      country: 'Ülke',
      color: 'Renk',
      timeZone: 'Saat dilimi',
      managedBy: 'Yöneten',
      bitRate: 'Bit hızı',
      description: 'Açıklama',
      album: 'Albüm',
      uploadFile: 'Dosya yükle',
      aiAgent: 'Yapay Zeka Aracı',
      profileName: 'Profil adı',
      messagingAllowed: 'Mesajlaşma izni',
      songSubmissionAllowed: 'Şarkı gönderme izni'
    },
    tabs: {
      properties: 'Özellikler',
      aiAgent: 'Yapay Zeka Aracı',
      profile: 'Profil',
      contribution: 'Katkı'
    },
    profile: {
      notAuthenticated: 'Kimlik doğrulanmadı.',
      preferences: 'Tercihler',
      changeLanguage: 'Dili değiştir',
      clientId: 'İstemci Kimliği',
      preferredUsername: 'Tercih edilen kullanıcı adı',
      email: 'E‑posta',
      logout: 'Çıkış yap'
    },
    space: {
      loadFailed: 'İstasyonlar yüklenirken hata oluştu. Lütfen daha sonra tekrar deneyin.',
      noOnlineStations: 'Şu anda çevrimiçi istasyon yok.'
    }
  },
  ar: {
    appTitle: 'Mix',
    menu: {
      space: 'المساحة',
      radistions: 'محطات الراديو',
      login: 'تسجيل الدخول',
      account: 'الحساب',
      title: 'القائمة',
      listeners: 'المستمعون',
      soundFragments: 'مقاطع الصوت',
    },
    theme: {
      switchToLight: 'التبديل إلى الوضع الفاتح',
      switchToDark: 'التبديل إلى الوضع الداكن'
    },
    status: {
      online: 'متصل',
      offline: 'غير متصل',
      unknown: 'غير معروف'
    },
    errors: {
      notFound: 'لم يتم العثور على شيء'
    },
    common: {
      back: 'رجوع',
      new: 'جديد',
      save: 'حفظ',
      delete: 'حذف',
      search: 'بحث',
      page: 'صفحة',
      noItemsSelected: 'لا توجد عناصر محددة',
      deleteNNotImplemented: 'حذف {count} عنصر — غير مُنفّذ'
    },
    columns: {
      title: 'العنوان',
      country: 'البلد',
      status: 'الحالة',
      description: 'الوصف',
      artist: 'الفنان',
      type: 'النوع',
      genres: 'الأنواع',
      labels: 'الملصقات',
      representedInBrands: 'إسناد إلى'
    },
    fields: {
      localizedNames: 'أسماء محلية',
      language: 'اللغة',
      name: 'الاسم',
      country: 'البلد',
      color: 'اللون',
      timeZone: 'المنطقة الزمنية',
      managedBy: 'يُدار بواسطة',
      bitRate: 'معدل البت',
      description: 'الوصف',
      album: 'الألبوم',
      uploadFile: 'تحميل ملف',
      aiAgent: 'وكيل الذكاء الاصطناعي',
      profileName: 'اسم الملف الشخصي',
      messagingAllowed: 'المراسلة مسموحة',
      songSubmissionAllowed: 'إرسال الأغاني مسموح'
    },
    tabs: {
      properties: 'الخصائص',
      aiAgent: 'وكيل الذكاء الاصطناعي',
      profile: 'الملف الشخصي',
      contribution: 'المساهمة'
    },
    profile: {
      notAuthenticated: 'غير موثّق.',
      preferences: 'التفضيلات',
      changeLanguage: 'غيّر اللغة',
      clientId: 'معرّف العميل',
      preferredUsername: 'اسم المستخدم المفضّل',
      email: 'البريد الإلكتروني',
      logout: 'تسجيل الخروج'
    },
    space: {
      loadFailed: 'فشل تحميل المحطات. يرجى المحاولة مرة أخرى لاحقًا.',
      noOnlineStations: 'لا توجد محطات متصلة بالإنترنت في الوقت الحالي.'
    }
  },
  pl: {
    appTitle: 'Mix',
    menu: {
      space: 'Przestrzeń',
      radistions: 'Stacje radiowe',
      login: 'Zaloguj',
      account: 'Konto',
      title: 'Menu',
      listeners: 'Słuchacze',
      soundFragments: 'Fragmenty dźwiękowe',
    },
    theme: {
      switchToLight: 'Przełącz na jasny motyw',
      switchToDark: 'Przełącz na ciemny motyw'
    },
    status: {
      online: 'Online',
      offline: 'Offline',
      unknown: 'Nieznany'
    },
    errors: {
      notFound: 'Nic nie znaleziono'
    },
    common: {
      back: 'Wstecz',
      new: 'Nowy',
      save: 'Zapisz',
      delete: 'Usuń',
      search: 'Szukaj',
      page: 'Strona',
      noItemsSelected: 'Brak zaznaczonych elementów',
      deleteNNotImplemented: 'Usuwanie {count} elementów — niezaimplementowane'
    },
    columns: {
      title: 'Tytuł',
      country: 'Kraj',
      status: 'Status',
      description: 'Opis',
      artist: 'Artysta',
      type: 'Typ',
      genres: 'Gatunki',
      labels: 'Etykiety',
      representedInBrands: 'Przypisz do'
    },
    fields: {
      localizedNames: 'Zlokalizowane nazwy',
      language: 'Język',
      name: 'Nazwa',
      country: 'Kraj',
      color: 'Kolor',
      timeZone: 'Strefa czasowa',
      managedBy: 'Zarządzane przez',
      bitRate: 'Bitrate',
      description: 'Opis',
      album: 'Album',
      uploadFile: 'Prześlij plik',
      aiAgent: 'Agent AI',
      profileName: 'Nazwa profilu',
      messagingAllowed: 'Wiadomości dozwolone',
      songSubmissionAllowed: 'Przesyłanie piosenek dozwolone'
    },
    tabs: {
      properties: 'Właściwości',
      aiAgent: 'Agent AI',
      profile: 'Profil',
      contribution: 'Wkład'
    },
    profile: {
      notAuthenticated: 'Nie uwierzytelniono.',
      preferences: 'Preferencje',
      changeLanguage: 'Zmień język',
      clientId: 'ID klienta',
      preferredUsername: 'Preferowana nazwa użytkownika',
      email: 'E‑mail',
      logout: 'Wyloguj'
    }
  },
  hi: {
    appTitle: 'Mix',
    menu: {
      space: 'स्थान',
      radistions: 'रेडियो स्टेशन',
      login: 'लॉगिन',
      account: 'खाता',
      title: 'मेनू',
      listeners: 'श्रोता',
      soundFragments: 'ध्वनि खंड',
    },
    theme: {
      switchToLight: 'हल्के थीम पर स्विच करें',
      switchToDark: 'गहरे थीम पर स्विच करें'
    },
    status: {
      online: 'ऑनलाइन',
      offline: 'ऑफ़लाइन',
      unknown: 'अज्ञात'
    },
    errors: {
      notFound: 'कुछ नहीं मिला'
    },
    common: {
      back: 'वापस',
      new: 'नया',
      save: 'सहेजें',
      delete: 'हटाएँ',
      search: 'खोज',
      page: 'पृष्ठ',
      noItemsSelected: 'कोई आइटम चयनित नहीं',
      deleteNNotImplemented: '{count} आइटम हटाना — लागू नहीं'
    },
    columns: {
      title: 'शीर्षक',
      country: 'देश',
      status: 'स्थिति',
      description: 'विवरण',
      artist: 'कलाकार',
      type: 'प्रकार',
      genres: 'शैलियाँ',
      labels: 'लेबल',
      representedInBrands: 'असाइन करें'
    },
    fields: {
      localizedNames: 'स्थानीयकृत नाम',
      language: 'भाषा',
      name: 'नाम',
      country: 'देश',
      color: 'रंग',
      timeZone: 'समय क्षेत्र',
      managedBy: 'द्वारा प्रबंधित',
      bitRate: 'बिटरेट',
      description: 'विवरण',
      album: 'एल्बम',
      uploadFile: 'फ़ाइल अपलोड करें',
      aiAgent: 'AI एजेंट',
      profileName: 'प्रोफ़ाइल नाम',
      messagingAllowed: 'संदेश की अनुमति',
      songSubmissionAllowed: 'गाना सबमिशन की अनुमति'
    },
    tabs: {
      properties: 'गुण',
      aiAgent: 'AI एजेंट',
      profile: 'प्रोफ़ाइल',
      contribution: 'योगदान'
    },
    profile: {
      notAuthenticated: 'प्रमाणीकृत नहीं है.',
      preferences: 'वरीयताएँ',
      changeLanguage: 'भाषा बदलें',
      clientId: 'क्लाइंट आईडी',
      preferredUsername: 'पसंदीदा उपयोगकर्ता नाम',
      email: 'ईमेल',
      logout: 'लॉगआउट'
    }
  },
  ko: {
    appTitle: 'Mix',
    menu: {
      space: '공간',
      radistions: '라디오 방송국',
      login: '로그인',
      account: '계정',
      title: '메뉴',
      listeners: '청취자',
      soundFragments: '사운드 조각',
    },
    theme: {
      switchToLight: '라이트 테마로 전환',
      switchToDark: '다크 테마로 전환'
    },
    status: {
      online: '온라인',
      offline: '오프라인',
      unknown: '알 수 없음'
    },
    errors: {
      notFound: '아무것도 없습니다'
    },
    common: {
      back: '뒤로',
      new: '새로 만들기',
      save: '저장',
      delete: '삭제',
      search: '검색',
      page: '페이지',
      noItemsSelected: '선택된 항목이 없습니다',
      deleteNNotImplemented: '{count}개 항목 삭제 — 아직 구현되지 않음'
    },
    columns: {
      title: '제목',
      country: '국가',
      status: '상태',
      description: '설명',
      artist: '아티스트',
      type: '유형',
      genres: '장르',
      labels: '레이블',
      representedInBrands: '할당'
    },
    fields: {
      localizedNames: '현지화된 이름',
      language: '언어',
      name: '이름',
      country: '국가',
      color: '색상',
      timeZone: '시간대',
      managedBy: '관리자',
      bitRate: '비트레이트',
      description: '설명',
      album: '앨범',
      uploadFile: '파일 업로드',
      aiAgent: 'AI 에이전트',
      profileName: '프로필 이름',
      messagingAllowed: '메시지 허용',
      songSubmissionAllowed: '노래 제출 허용'
    },
    tabs: {
      properties: '속성',
      aiAgent: 'AI 에이전트',
      profile: '프로필',
      contribution: '기여'
    },
    profile: {
      notAuthenticated: '인증되지 않았습니다.',
      preferences: '환경설정',
      changeLanguage: '언어 변경',
      clientId: '클라이언트 ID',
      preferredUsername: '선호 사용자 이름',
      email: '이메일',
      logout: '로그아웃'
    }
  },
  fi: {
    appTitle: 'Mix',
    menu: {
      space: 'Tila',
      radistions: 'Radiokanavat',
      login: 'Kirjaudu',
      account: 'Tili',
      title: 'Valikko',
      listeners: 'Kuuntelijat',
      soundFragments: 'Äänileikkeet',
    },
    theme: {
      switchToLight: 'Vaihda vaaleaan teemaan',
      switchToDark: 'Vaihda tummaan teemaan'
    },
    status: {
      online: 'Online',
      offline: 'Offline',
      unknown: 'Tuntematon'
    },
    errors: {
      notFound: 'Mitään ei löytynyt'
    },
    common: {
      back: 'Takaisin',
      new: 'Uusi',
      save: 'Tallenna',
      delete: 'Poista',
      search: 'Haku',
      page: 'Sivu',
      noItemsSelected: 'Ei valittuja kohteita',
      deleteNNotImplemented: 'Poista {count} kohde(tta) — ei toteutettu'
    },
    columns: {
      title: 'Otsikko',
      country: 'Maa',
      status: 'Tila',
      description: 'Kuvaus',
      artist: 'Artisti',
      type: 'Tyyppi',
      genres: 'Genret',
      labels: 'Tunnisteet',
      representedInBrands: 'Liitä'
    },
    fields: {
      localizedNames: 'Lokalisoidut nimet',
      language: 'Kieli',
      name: 'Nimi',
      country: 'Maa',
      color: 'Väri',
      timeZone: 'Aikavyöhyke',
      managedBy: 'Hallinnoija',
      bitRate: 'Bittinopeus',
      description: 'Kuvaus',
      album: 'Albumi',
      uploadFile: 'Lataa tiedosto',
      aiAgent: 'AI-agentti',
      profileName: 'Profiilin nimi',
      messagingAllowed: 'Viestit sallittu',
      songSubmissionAllowed: 'Kappaleiden lähetys sallittu'
    },
    tabs: {
      properties: 'Ominaisuudet',
      aiAgent: 'AI-agentti',
      profile: 'Profiili',
      contribution: 'Panostus'
    },
    profile: {
      notAuthenticated: 'Ei kirjautunut.',
      preferences: 'Asetukset',
      changeLanguage: 'Vaihda kieltä',
      clientId: 'Asiakas-ID',
      preferredUsername: 'Toivottu käyttäjänimi',
      email: 'Sähköposti',
      logout: 'Kirjaudu ulos'
    }
  },
  sv: {
    appTitle: 'Mix',
    menu: {
      space: 'Utrymme',
      radistions: 'Radiostationer',
      login: 'Logga in',
      account: 'Konto',
      title: 'Meny',
      listeners: 'Lyssnare',
      soundFragments: 'Ljudfragment',
    },
    theme: {
      switchToLight: 'Byt till ljust tema',
      switchToDark: 'Byt till mörkt tema'
    },
    status: {
      online: 'Online',
      offline: 'Offline',
      unknown: 'Okänt'
    },
    errors: {
      notFound: 'Inget här...'
    },
    common: {
      back: 'Tillbaka',
      new: 'Ny',
      save: 'Spara',
      delete: 'Ta bort',
      search: 'Sök',
      page: 'Sida',
      noItemsSelected: 'Inga objekt valda',
      deleteNNotImplemented: 'Ta bort {count} objekt — ej implementerat'
    },
    columns: {
      title: 'Titel',
      country: 'Land',
      status: 'Status',
      description: 'Beskrivning',
      artist: 'Artist',
      type: 'Typ',
      genres: 'Genrer',
      labels: 'Etiketter',
      representedInBrands: 'Tilldela'
    },
    fields: {
      localizedNames: 'Lokaliserade namn',
      language: 'Språk',
      name: 'Namn',
      country: 'Land',
      color: 'Färg',
      timeZone: 'Tidszon',
      managedBy: 'Hanteras av',
      bitRate: 'Bitrate',
      description: 'Beskrivning',
      album: 'Album',
      uploadFile: 'Ladda upp fil',
      aiAgent: 'AI‑agent',
      profileName: 'Profilnamn',
      messagingAllowed: 'Meddelanden tillåtna',
      songSubmissionAllowed: 'Låtinsändning tillåten'
    },
    tabs: {
      properties: 'Egenskaper',
      aiAgent: 'AI‑agent',
      profile: 'Profil',
      contribution: 'Bidrag'
    },
    profile: {
      notAuthenticated: 'Inte autentiserad.',
      preferences: 'Inställningar',
      changeLanguage: 'Byt språk',
      clientId: 'Klient‑ID',
      preferredUsername: 'Föredraget användarnamn',
      email: 'E‑post',
      logout: 'Logga ut'
    }
  },
  no: {
    appTitle: 'Mix',
    menu: {
      space: 'Rom',
      radistions: 'Radiostasjoner',
      login: 'Logg inn',
      account: 'Konto',
      title: 'Meny',
      listeners: 'Lyttere',
      soundFragments: 'Lydfragmenter',
    },
    theme: {
      switchToLight: 'Bytt til lyst tema',
      switchToDark: 'Bytt til mørkt tema'
    },
    status: {
      online: 'Online',
      offline: 'Frakoblet',
      unknown: 'Ukjent'
    },
    errors: {
      notFound: 'Ingenting her...'
    },
    common: {
      back: 'Tilbake',
      new: 'Ny',
      save: 'Lagre',
      delete: 'Slett',
      search: 'Søk',
      page: 'Side',
      noItemsSelected: 'Ingen elementer valgt',
      deleteNNotImplemented: 'Slett {count} element(er) — ikke implementert'
    },
    columns: {
      title: 'Tittel',
      country: 'Land',
      status: 'Status',
      description: 'Beskrivelse',
      artist: 'Artist',
      type: 'Type',
      genres: 'Sjangre',
      labels: 'Etiketter',
      representedInBrands: 'Tildel'
    },
    fields: {
      localizedNames: 'Lokalisert navn',
      language: 'Språk',
      name: 'Navn',
      country: 'Land',
      color: 'Farge',
      timeZone: 'Tidssone',
      managedBy: 'Administrert av',
      bitRate: 'Bitrate',
      description: 'Beskrivelse',
      album: 'Album',
      uploadFile: 'Last opp fil',
      aiAgent: 'AI‑agent',
      profileName: 'Profilnavn',
      messagingAllowed: 'Meldinger tillatt',
      songSubmissionAllowed: 'Sanginnsending tillatt'
    },
    tabs: {
      properties: 'Egenskaper',
      aiAgent: 'AI‑agent',
      profile: 'Profil',
      contribution: 'Bidrag'
    },
    profile: {
      notAuthenticated: 'Ikke autentisert.',
      preferences: 'Innstillinger',
      changeLanguage: 'Bytt språk',
      clientId: 'Klient‑ID',
      preferredUsername: 'Foretrukket brukernavn',
      email: 'E‑post',
      logout: 'Logg ut'
    }
  }
} as const

export type Messages = typeof messages
