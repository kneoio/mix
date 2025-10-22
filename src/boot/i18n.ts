import { boot } from 'quasar/wrappers'
import { createI18n } from 'vue-i18n'

export type Locale = 'pt' | 'en' | 'uk' | 'kk' | 'de' | 'fr' | 'zh' | 'ja' | 'ka' | 'lv' | 'ru' | 'it' | 'tr' | 'ar' | 'pl' | 'hi' | 'ko' | 'fi' | 'sv' | 'no'

const LOCALE_KEY = 'mix-locale'

const messages = {
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
      dashboard: 'Painel'
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
      aiAgent: 'Agente IA'
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
      album: 'Álbum'
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
      loadFailed: 'Falha ao carregar estações. Tente novamente mais tarde.'
    },
    dashboard: {
      noData: 'Nenhum dado disponível',
      listeners: 'Ouvintes',
      start: 'Iniciar',
      stop: 'Parar',
      status: 'Status',
      livePlaylist: 'Playlist ao Vivo',
      noPlaylist: 'Nenhuma playlist disponível'
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
      dashboard: 'Dashboard'
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
      aiAgent: 'AI Agent'
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
      uploadFile: 'Upload file'
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
      loadFailed: 'Failed to load stations. Please try again later.'
    },
    dashboard: {
      noData: 'No data available',
      listeners: 'Listeners',
      start: 'Start',
      stop: 'Stop',
      status: 'Status',
      livePlaylist: 'Live Playlist',
      noPlaylist: 'No playlist available'
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
      dashboard: 'Панель'
    },
    theme: {
      switchToLight: 'Перемкнути на світлу тему',
      switchToDark: 'Перемкнути на темну тему'
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
      genres: 'Жанри'
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
      album: 'Альбом'
    },
    tabs: {
      properties: 'Властивості',
      aiAgent: 'AI агент'
    },
    profile: {
      notAuthenticated: 'Не автентифіковано.',
      preferences: 'Налаштування',
      changeLanguage: 'Змінити мову',
      clientId: 'ID клієнта',
      preferredUsername: 'Бажане імʼя користувача',
      email: 'Електронна пошта',
      logout: 'Вийти'
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
      dashboard: 'Бақылау тақтасы'
    },
    theme: {
      switchToLight: 'Жарық тақырыпқа ауыстыру',
      switchToDark: 'Қараңғы тақырыпқа ауыстыру'
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
      genres: 'Жанрлар'
    },
    profile: {
      notAuthenticated: 'Аутентификацияланбаған.',
      preferences: 'Баптаулар',
      changeLanguage: 'Тілді өзгерту',
      clientId: 'Клиент ID',
      preferredUsername: 'Таңдаулы пайдаланушы аты',
      email: 'Электрондық пошта',
      logout: 'Шығу'
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
      dashboard: 'Dashboard'
    },
    theme: {
      switchToLight: 'Zum hellen Theme wechseln',
      switchToDark: 'Zum dunklen Theme wechseln'
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
      genres: 'Genres'
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
      album: 'Album'
    },
    tabs: {
      properties: 'Eigenschaften',
      aiAgent: 'AI Agent'
    },
    profile: {
      notAuthenticated: 'Nicht authentifiziert.',
      preferences: 'Einstellungen',
      changeLanguage: 'Sprache ändern',
      clientId: 'Client-ID',
      preferredUsername: 'Bevorzugter Benutzername',
      email: 'E‑Mail',
      logout: 'Abmelden'
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
      dashboard: 'Tableau de bord'
    },
    theme: {
      switchToLight: 'Passer au thème clair',
      switchToDark: 'Passer au thème sombre'
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
      album: 'Album'
    },
    tabs: {
      properties: 'Propriétés',
      aiAgent: 'Agent IA'
    },
    profile: {
      notAuthenticated: 'Non authentifié.',
      preferences: 'Préférences',
      changeLanguage: 'Changer de langue',
      clientId: 'ID client',
      preferredUsername: 'Nom d’utilisateur préféré',
      email: 'E-mail',
      logout: 'Se déconnecter'
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
      dashboard: '仪表板'
    },
    theme: {
      switchToLight: '切换到浅色主题',
      switchToDark: '切换到深色主题'
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
      genres: '流派'
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
      album: '专辑'
    },
    tabs: {
      properties: '属性',
      aiAgent: 'AI 代理'
    },
    profile: {
      notAuthenticated: '未认证。',
      preferences: '偏好设置',
      changeLanguage: '更改语言',
      clientId: '客户端 ID',
      preferredUsername: '首选用户名',
      email: '电子邮件',
      logout: '退出登录'
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
      dashboard: 'ダッシュボード'
    },
    theme: {
      switchToLight: 'ライトテーマに切り替え',
      switchToDark: 'ダークテーマに切り替え'
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
      labels: 'ラベル'
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
      album: 'アルバム'
    },
    tabs: {
      properties: 'プロパティ',
      aiAgent: 'AI エージェント'
    },
    profile: {
      notAuthenticated: '認証されていません。',
      preferences: '設定',
      changeLanguage: '言語を変更',
      clientId: 'クライアントID',
      preferredUsername: '優先ユーザー名',
      email: 'メール',
      logout: 'ログアウト'
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
      dashboard: 'დაფა'
    },
    theme: {
      switchToLight: 'გადართვა ნათელ თემაზე',
      switchToDark: 'გადართვა ბნელ თემაზე'
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
      genres: 'ჟანრები'
    },
    fields: {
      localizedNames: 'ლოკალიზებული სახელები',
      language: 'ენა',
      name: 'სახელი',
      country: 'ქვეყანა',
      color: 'ფერი',
      timeZone: 'დროის სარტყელი',
      managedBy: 'მართავს',
      bitRate: 'ბიტრейтო',
      description: 'აღწერა',
      album: 'ალბომი'
    },
    tabs: {
      properties: 'თავისუფლები',
      aiAgent: 'AI აგენტი'
    },
    profile: {
      notAuthenticated: 'ავტორიზებული არ არის.',
      preferences: 'პარამეტრები',
      changeLanguage: 'ენის შეცვლა',
      clientId: 'კლიენტის ID',
      preferredUsername: 'სასურველი მომხმარებლის სახელი',
      email: 'ელ. ფოსტა',
      logout: 'გამოსვლა'
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
      dashboard: 'Informācijas panelis'
    },
    theme: {
      switchToLight: 'Pārslēgt uz gaišo tēmu',
      switchToDark: 'Pārslēgt uz tumšo tēmu'
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
      genres: 'Žanri'
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
      album: 'Albūms'
    },
    tabs: {
      properties: 'Īpašības',
      aiAgent: 'AI aģents'
    },
    profile: {
      notAuthenticated: 'Nav autentificēts.',
      preferences: 'Iestatījumi',
      changeLanguage: 'Mainīt valodu',
      clientId: 'Klienta ID',
      preferredUsername: 'Vēlamais lietotājvārds',
      email: 'E-pasts',
      logout: 'Izrakstīties'
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
      dashboard: 'Панель управления'
    },
    theme: {
      switchToLight: 'Переключить на светлую тему',
      switchToDark: 'Переключить на тёмную тему'
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
      genres: 'Жанры'
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
      album: 'Альбом'
    },
    tabs: {
      properties: 'Свойства',
      aiAgent: 'AI агент'
    },
    profile: {
      notAuthenticated: 'Не аутентифицирован.',
      preferences: 'Настройки',
      changeLanguage: 'Изменить язык',
      clientId: 'ID клиента',
      preferredUsername: 'Предпочитаемое имя пользователя',
      email: 'Эл. почта',
      logout: 'Выйти'
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
      dashboard: 'Dashboard'
    },
    theme: {
      switchToLight: 'Passa al tema chiaro',
      switchToDark: 'Passa al tema scuro'
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
      genres: 'Generi'
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
      album: 'Album'
    },
    tabs: {
      properties: 'Proprietà',
      aiAgent: 'Agente AI'
    },
    profile: {
      notAuthenticated: 'Non autenticato.',
      preferences: 'Preferenze',
      changeLanguage: 'Cambia lingua',
      clientId: 'ID cliente',
      preferredUsername: 'Nome utente preferito',
      email: 'E‑mail',
      logout: 'Esci'
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
      dashboard: 'Kontrol Paneli'
    },
    theme: {
      switchToLight: 'Açık temaya geç',
      switchToDark: 'Koyu temaya geç'
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
      genres: 'Türler'
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
      album: 'Albüm'
    },
    tabs: {
      properties: 'Özellikler',
      aiAgent: 'Yapay Zeka Aracı'
    },
    profile: {
      notAuthenticated: 'Kimlik doğrulanmadı.',
      preferences: 'Tercihler',
      changeLanguage: 'Dili değiştir',
      clientId: 'İstemci Kimliği',
      preferredUsername: 'Tercih edilen kullanıcı adı',
      email: 'E-posta',
      logout: 'Çıkış'
    }
  },
  ar: {
    appTitle: 'Mix',
    menu: {
      space: 'مساحة',
      radistions: 'محطات الراديو',
      login: 'تسجيل الدخول',
      account: 'الحساب',
      title: 'القائمة',
      listeners: 'المستمعون',
      soundFragments: 'مقاطع الصوت',
      dashboard: 'لوحة التحكم'
    },
    theme: {
      switchToLight: 'التبديل إلى الوضع الفاتح',
      switchToDark: 'التبديل إلى الوضع الداكن'
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
      genres: 'الأنواع'
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
      album: 'الألبوم'
    },
    tabs: {
      properties: 'الخصائص',
      aiAgent: 'وكيل الذكاء الاصطناعي'
    },
    profile: {
      notAuthenticated: 'غير مسجل الدخول.',
      preferences: 'التفضيلات',
      changeLanguage: 'تغيير اللغة',
      clientId: 'معرّف العميل',
      preferredUsername: 'اسم المستخدم المفضل',
      email: 'البريد الإلكتروني',
      logout: 'تسجيل الخروج'
    }
  },
  pl: {
    appTitle: 'Mix',
    menu: {
      space: 'Przestrzeń',
      radistions: 'Stacje radiowe',
      login: 'Zaloguj się',
      account: 'Konto',
      title: 'Menu',
      listeners: 'Słuchacze',
      soundFragments: 'Fragmenty dźwiękowe',
      dashboard: 'Panel'
    },
    theme: {
      switchToLight: 'Przełącz na jasny motyw',
      switchToDark: 'Przełącz na ciemny motyw'
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
      genres: 'Gatunki'
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
      album: 'Album'
    },
    tabs: {
      properties: 'Właściwości',
      aiAgent: 'Agent AI'
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
      dashboard: 'डैशबोर्ड'
    },
    theme: {
      switchToLight: 'हल्के थीम पर स्विच करें',
      switchToDark: 'गहरे थीम पर स्विच करें'
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
      genres: 'शैलियाँ'
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
      album: 'एल्बम'
    },
    tabs: {
      properties: 'गुण',
      aiAgent: 'AI एजेंट'
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
      dashboard: '대시보드'
    },
    theme: {
      switchToLight: '라이트 테마로 전환',
      switchToDark: '다크 테마로 전환'
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
      labels: '레이블'
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
      uploadFile: '파일 업로드'
    },
    tabs: {
      properties: '속성',
      aiAgent: 'AI 에이전트'
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
      dashboard: 'Kojelauta'
    },
    theme: {
      switchToLight: 'Vaihda vaaleaan teemaan',
      switchToDark: 'Vaihda tummaan teemaan'
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
      labels: 'Tunnisteet'
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
      uploadFile: 'Lataa tiedosto'
    },
    tabs: {
      properties: 'Ominaisuudet',
      aiAgent: 'AI-agentti'
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
      dashboard: 'Instrumentpanel'
    },
    theme: {
      switchToLight: 'Byt till ljust tema',
      switchToDark: 'Byt till mörkt tema'
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
      labels: 'Etiketter'
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
      uploadFile: 'Ladda upp fil'
    },
    tabs: {
      properties: 'Egenskaper',
      aiAgent: 'AI‑agent'
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
      dashboard: 'Dashbord'
    },
    theme: {
      switchToLight: 'Bytt til lyst tema',
      switchToDark: 'Bytt til mørkt tema'
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
      genres: 'Sjangre'
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
      album: 'Album'
    },
    tabs: {
      properties: 'Egenskaper',
      aiAgent: 'AI‑agent'
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
const rawSaved = (typeof localStorage !== 'undefined' && localStorage.getItem(LOCALE_KEY)) || 'pt'
const supportedLocales = Object.keys(messages) as Locale[]
const savedLocale: Locale = supportedLocales.includes(rawSaved as Locale) ? (rawSaved as Locale) : 'pt'

// Rely on fallbackLocale='en' for any missing keys and silence warnings globally

export const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: savedLocale,
  fallbackLocale: false,
  missingWarn: true,
  fallbackWarn: true,
  warnHtmlMessage: true,
  messages
})

export default boot(({ app }): void => {
  app.use(i18n)
})

export function setLocale (locale: Locale) {
  i18n.global.locale.value = locale
  try {
    localStorage.setItem(LOCALE_KEY, locale)
  } catch (err) {
    // ignore persistence errors (e.g., private mode)
    void err
  }
}
