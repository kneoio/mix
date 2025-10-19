import { boot } from 'quasar/wrappers'
import { createI18n } from 'vue-i18n'

export type Locale = 'pt' | 'en' | 'uk' | 'kk' | 'de' | 'fr' | 'zh' | 'ja' | 'ka' | 'lv' | 'ru' | 'it' | 'tr' | 'ar' | 'pl' | 'hi'

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
      soundFragments: 'Fragmentos de Som'
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
      soundFragments: 'Sound Fragments'
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
      labels: 'Labels'
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
      album: 'Album'
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
      soundFragments: 'Звукові фрагменти'
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
      soundFragments: 'Дыбыс фрагменттері'
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
      soundFragments: 'Sound‑Fragmente'
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
      soundFragments: 'Fragments sonores'
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
      soundFragments: '音频片段'
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
    }
  },
  ja: {
    appTitle: 'Mix',
    menu: {
      space: 'スペース',
      radistions: 'ラジオ局',
      login: 'ログイン',
      account: 'アカウント',
      title: 'Menu',
      listeners: 'Listeners',
      soundFragments: 'Sound Fragments'
    },
    theme: {
      switchToLight: 'ライトテーマに切り替え',
      switchToDark: 'ダークテーマに切り替え'
    },
    errors: {
      notFound: 'Oops. Nothing here...'
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
      genres: 'Genres'
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
      album: 'Album'
    },
    tabs: {
      properties: 'Properties',
      aiAgent: 'AI Agent'
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
      soundFragments: 'ხმის ფრაგმენტები'
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
      soundFragments: 'Skaņas fragmenti'
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
      soundFragments: 'Аудиофрагменты'
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
      soundFragments: 'Frammenti sonori'
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
      soundFragments: 'Ses Parçaları'
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
      soundFragments: 'مقاطع الصوت'
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
      soundFragments: 'Fragmenty dźwiękowe'
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
      soundFragments: 'ध्वनि खंड'
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
