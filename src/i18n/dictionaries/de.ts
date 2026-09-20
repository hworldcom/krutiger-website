import type { Dictionary } from "./types";

const de = {
  metadata: {
    title: "KRUTIGER Muay Thai Berlin",
    description:
      "Authentisches Muay-Thai-Training in Berlin für Anfänger, Fortgeschrittene und Wettkämpfer.",
  },
  locale: {
    currentLanguage: "Deutsch",
    currentLanguageLabel: "Aktuelle Sprache",
    navigationLabel: "Sprachauswahl",
    languageNames: {
      de: "Deutsch",
      en: "Englisch",
    },
    switchTo: {
      de: "Zur deutschen Version wechseln",
      en: "Zur englischen Version wechseln",
    },
  },
  shell: {
    skipToContent: "Zum Hauptinhalt springen",
    header: {
      homeLinkLabel: "Zur KRUTIGER Startseite",
      primaryNavigationLabel: "Hauptnavigation",
      secondaryNavigationLabel: "Weitere Seiten",
      menuTitle: "Menü",
      openMenu: "Menü öffnen",
      closeMenu: "Menü schließen",
      currentPage: "Aktuelle Seite",
      trialClassAction: "Probetraining anfragen",
    },
    footer: {
      brandStatement:
        "Authentisches Muay Thai mit thailändischen Wurzeln, klarer Anleitung und einer offenen Berliner Trainingsgemeinschaft.",
      primaryNavigationLabel: "Training und Angebot",
      secondaryNavigationLabel: "Informationen",
      contactHeading: "Kontakt und Besuch",
      addressLabel: "Adresse",
      mapAction: "Auf der Karte ansehen",
      emailLabel: "E-Mail",
      phoneLabel: "Telefon",
      openingHoursLabel: "Öffnungszeiten",
      socialHeading: "Folge KRUTIGER",
      instagramLinkLabel: "KRUTIGER auf Instagram öffnen",
      legalNavigationLabel: "Rechtliche Hinweise",
      placeholderDataLabel: "Entwicklungsdaten",
      placeholderDataDescription:
        "Adresse, Kontakt und Öffnungszeiten sind Beispieldaten und noch nicht für einen Besuch oder eine Kontaktaufnahme freigegeben.",
      rightsStatement: "Alle Rechte vorbehalten.",
    },
  },
  routes: {
    home: {
      navigationLabel: "Startseite",
      eyebrow: "KRUTIGER Muay Thai Berlin",
      title: "Authentisches Muay Thai in Berlin",
      description:
        "Training mit thailändischen Wurzeln, klarer Anleitung und einer offenen Gemeinschaft in Berlin.",
    },
    training: {
      navigationLabel: "Training",
      eyebrow: "Trainingsangebote",
      title: "Finde das passende Muay-Thai-Training",
      description:
        "Von sauberen Grundlagen bis zu anspruchsvoller Technik: Wähle das Training, das zu deiner Erfahrung passt, und entwickle dich Schritt für Schritt weiter.",
    },
    privateTraining: {
      navigationLabel: "Private Classes",
      eyebrow: "Individuelles Training",
      title: "Private Classes",
      description:
        "Individuelles Training mit voller Aufmerksamkeit. Wähle dein Angebot und buche einen verfügbaren Termin direkt über bSport.",
    },
    schedule: {
      navigationLabel: "Kursplan",
      eyebrow: "Kursplan",
      title: "Plane dein nächstes Training",
      description:
        "Sieh dir den aktuellen Kursplan an und starte deine Buchung direkt über bsport.",
    },
    prices: {
      navigationLabel: "Preise",
      eyebrow: "Preise",
      title: "Mitgliedschaften und Trainingspässe",
      description:
        "Hier werden die geprüften Mitgliedschaften, Pässe und Konditionen klar vergleichbar dargestellt.",
    },
    shop: {
      navigationLabel: "Shop",
      eyebrow: "KRUTIGER Shop",
      title: "Ausrüstung und KRUTIGER Artikel",
      description:
        "Entdecke die aktuell verfügbaren Produkte und bestelle sie direkt über bsport.",
    },
    coaches: {
      navigationLabel: "Team",
      eyebrow: "Trainerteam",
      title: "Lerne die Menschen hinter dem Training kennen",
      description:
        "Lerne die Menschen kennen, die bei KRUTIGER traditionelles Muay Thai mit Erfahrung, Klarheit und Respekt weitergeben.",
    },
    about: {
      navigationLabel: "Über uns",
      eyebrow: "Über KRUTIGER",
      title: "Echtes Muay Thai. Echte Wurzeln.",
      description:
        "Kru Tiger steht für traditionelles Muay Thai, geprägt durch jahrelange Erfahrung in Thailand und heute weitergegeben in Berlin.",
    },
    faq: {
      navigationLabel: "FAQ",
      eyebrow: "Häufige Fragen",
      title: "Gut vorbereitet ins erste Training",
      description:
        "Diese Seite beantwortet praktische Fragen zu Einstieg, Ausrüstung, Training und Ablauf.",
    },
    contact: {
      navigationLabel: "Kontakt",
      eyebrow: "Kontakt",
      title: "Nimm Kontakt mit KRUTIGER auf",
      description:
        "Hier werden geprüfte Kontaktmöglichkeiten, Adresse und Hinweise zur Anfahrt bereitgestellt.",
    },
    memberArea: {
      navigationLabel: "Mitglied werden",
      eyebrow: "Dein Start bei KRUTIGER",
      title: "Mitglied werden",
      description:
        "Wähle das passende Angebot, richte dein bSport-Konto beim Kauf ein und buche anschließend dein erstes Training.",
    },
    giftCards: {
      navigationLabel: "Gutscheine",
      eyebrow: "Gutscheine",
      title: "Muay Thai Training verschenken",
      description:
        "Die verfügbaren Gutscheine und der Kaufprozess werden später über bsport angebunden.",
    },
    imprint: {
      navigationLabel: "Impressum",
      eyebrow: "Rechtliches",
      title: "Impressum",
      description:
        "Diese Seite ist für die aktuellen, rechtlich geprüften Anbieterangaben vorgesehen. Die endgültigen Angaben folgen vor der Veröffentlichung.",
    },
    privacy: {
      navigationLabel: "Datenschutz",
      eyebrow: "Rechtliches",
      title: "Datenschutzerklärung",
      description:
        "Diese Seite ist für die aktuelle, rechtlich geprüfte Datenschutzerklärung vorgesehen. Der endgültige Text folgt vor der Veröffentlichung.",
    },
  },
  homePage: {
    hero: {
      eyebrow: "Traditionelles Muay Thai · Berlin",
      titleLines: ["Authentisches", "Muay Thai", "in Berlin"],
      introduction:
        "Echtes Muay Thai in einer offenen und respektvollen Atmosphäre. Disziplin, Respekt und Zusammenhalt – Werte, die wir im Training und darüber hinaus leben.",
      imageAlt:
        "Kru Tiger steht mit erhobenem Daumen in einem Muay-Thai-Gym in Thailand.",
      trialAction: "Probetraining anfragen",
      scheduleAction: "Kursplan ansehen",
    },
    schedule: {
      title: "Heute bei Kru Tiger",
      action: "Kursplan ansehen",
      loading: "Die heutigen Kurse werden geladen …",
      error:
        "Die heutigen Kurse konnten gerade nicht geladen werden. Öffne den Kursplan für alle aktuellen Zeiten.",
      empty: "Heute finden keine Kurse statt. Nächste verfügbare Kurse:",
      nextLoading: "Die nächsten Kurse werden geladen …",
      nextUnavailable:
        "Aktuell konnten keine weiteren Kurse gefunden werden. Öffne den Kursplan für alle Termine.",
      allLevels: "Alle Levels",
      location: {
        district: "Kreuzberg",
        addressLineOne: "Melechstr. 11",
        addressLineTwo: "10961 Berlin",
      },
    },
    values: {
      eyebrow: "Warum Kru Tiger?",
      titlePrimary: "Mehr als nur Training.",
      titleAccent: "Eine Kultur.",
      introduction:
        "Bei uns lernst du authentisches Muay Thai in einer offenen und respektvollen Atmosphäre. Ob Anfänger oder Profi – hier findest du ein Team, das dich begleitet.",
      items: [
        {
          title: "Authentisch",
          description: "Traditionelles Muay Thai nach thailändischer Linie.",
        },
        {
          title: "Für alle Levels",
          description:
            "Vom Anfänger bis zum Wettkämpfer – wir fördern dich individuell.",
        },
        {
          title: "Community",
          description: "Respekt, Disziplin und Zusammenhalt im Team.",
        },
        {
          title: "Erfahrene Trainer",
          description: "Lerne von erfahrenen Kru und Kämpfern.",
        },
      ],
    },
  },
  aboutPage: {
    hero: {
      eyebrow: "Die Geschichte von KRUTIGER",
      titlePrimary: "Echtes Muay Thai.",
      titleSecondary: "Echte Wurzeln.",
      introduction:
        "Kru Tiger steht für traditionelles Muay Thai, geprägt durch jahrelange Erfahrung in Thailand und heute weitergegeben in Berlin.",
      imageAlt:
        "Kru Tiger sitzt mit Meisterschaftsgürteln und Medaillen in einem Muay-Thai-Ring in Thailand.",
    },
    storyHeading: "Die Geschichte von Kru Tiger",
    chapters: [
      {
        number: "01",
        title: "Kru Tiger",
        description:
          "Muay Thai ist für Kru Tiger nicht einfach ein Sport. Es ist ein Weg, der ihn seit seiner Jugend begleitet – als Kämpfer, Trainer und Kru.",
        accent: "Kämpfer · Trainer · Kru",
        imageAlt:
          "Historischer Zeitungsausschnitt mit zwei Muay-Thai-Kämpfern im Ring.",
      },
      {
        number: "02",
        title: "Wurzeln in Thailand",
        description:
          "Jahre im Ring, Training in Thailand und Erfahrung aus einer Zeit, in der Muay Thai den Alltag bestimmte.",
        accent: "Thailand · Training · Alltag",
        imageAlt:
          "Historisches Gruppenfoto eines jungen Muay-Thai-Kämpfers mit seinem Team.",
      },
      {
        number: "03",
        title: "Erfahrung im Ring",
        description:
          "Technik lernt man im Training. Ruhe, Timing und Kampfverständnis entstehen durch Erfahrung.",
        accent: "Technik · Timing · Ruhe",
        imageAlt: "Historische Farbfotografie eines Muay-Thai-Kampfes im Ring.",
      },
      {
        number: "04",
        title: "Von Thailand nach Berlin",
        description:
          "Was im Ring in Thailand gelernt wurde, wird heute in Berlin weitergegeben – Technik, Disziplin, Respekt und die Kultur des Muay Thai.",
        accent: "Heute in Berlin",
        imageAlt:
          "Thailändischer Zeitungsbericht mit dem Porträt eines Muay-Thai-Kämpfers.",
        secondaryImageAlt:
          "Historisches Gruppenfoto von Kru Tiger mit Kämpfern und Begleitern nach einem Wettkampf.",
      },
    ],
    philosophy: {
      number: "05",
      title: "Unsere Philosophie",
      values: [
        {
          title: "Technik",
          description: "Saubere Grundlagen vor unnötiger Komplexität.",
        },
        {
          title: "Disziplin",
          description: "Konstanz und Aufmerksamkeit im Training.",
        },
        {
          title: "Respekt",
          description:
            "Gegenseitiger Respekt – gegenüber Trainern, Trainingspartnern und der Tradition.",
        },
        {
          title: "Gemeinschaft",
          description: "Gemeinsam besser werden, unabhängig vom Level.",
        },
      ],
    },
  },
  teamPage: {
    sectionHeading: "Das Team",
    specialtiesLabel: "Schwerpunkte",
    socialLinkAction: "Profil ansehen",
    socialLinkLabel: "Social-Media-Profil von {name} öffnen",
  },
  trainingPage: {
    sectionHeading: "Unsere Kurse",
    sectionIntroduction:
      "Vier Formate schaffen einen klaren Einstieg und Raum für Entwicklung. Wenn du dein Level nicht sicher einschätzen kannst, sprich vor dem Training mit unserem Trainerteam.",
    levelLabels: {
      beginners: "Basic",
      intermediate: "Intermediate",
      advanced: "Advanced",
      allLevels: "Alle Levels",
    },
    duration: "Typisch {minutes} Min.",
    audienceLabel: "Für wen?",
    equipmentLabel: "Empfohlene Ausrüstung",
    scheduleActionLabel: "Kursplan für {name} öffnen",
    scheduleNotice:
      "Die Karten beschreiben unsere Trainingsformate. Aktuelle Termine, Trainer und verfügbare Plätze findest du immer im Live-Kursplan.",
  },
  memberAreaPage: {
    pricingAction: "Angebote vergleichen",
    existingMemberAction: "Zum Mitglieder-Login",
    choices: {
      eyebrow: "Dein Angebot",
      title: "Was passt zu deinem Training?",
      description:
        "Regelmäßig trainieren, flexibel bleiben oder erst einmal ausprobieren: Wähle den Einstieg, der zu dir passt.",
      membership: {
        title: "Mitgliedschaft",
        description:
          "Für regelmäßiges Training mit 3, 6 oder 12 Monaten Laufzeit und bis zu unbegrenzten Teilnahmen.",
        action: "Mitgliedschaften ansehen",
      },
      passes: {
        title: "Trainingspass",
        description:
          "Für flexible Besuche ohne Mitgliedschaft – vom einzelnen Drop-in bis zum 50er-Pass.",
        action: "Trainingspässe ansehen",
      },
      trial: {
        title: "Probetraining",
        description:
          "Du bist neu bei KRUTIGER? Buche zuerst dein Probetraining und lerne uns im Training kennen.",
        action: "Probetraining buchen",
      },
    },
    steps: {
      eyebrow: "So funktioniert es",
      title: "In vier Schritten ins Training",
      description:
        "Die Auswahl, Zahlung und Buchung laufen über bSport. Dein Konto verbindet alle Schritte an einem Ort.",
      items: [
        {
          title: "Passendes Angebot wählen",
          description:
            "Wähle eine Mitgliedschaft für regelmäßiges Training, einen flexiblen Trainingspass oder den Probetrainingspass für deinen Einstieg.",
        },
        {
          title: "bSport-Konto erstellen oder anmelden",
          description:
            "Beim Kauf wirst du zu bSport weitergeleitet. Dort erstellst du dein Konto oder meldest dich mit einem bestehenden Konto an.",
        },
        {
          title: "Buchung sicher abschließen",
          description:
            "Prüfe Laufzeit, Gültigkeit und Preis und schließe die Zahlung sicher über bSport ab.",
        },
        {
          title: "Erstes Training buchen",
          description:
            "Öffne anschließend den Kursplan, wähle einen passenden Kurs und reserviere deinen Platz.",
        },
      ],
      scheduleAction: "Kursplan öffnen",
    },
  },
  privateTrainingPage: {
    eyebrow: "Direkt buchen",
    title: "So buchst du deine Private Class",
    description:
      "Die verfügbaren Termine werden live aus bSport geladen. In drei Schritten reservierst du dein individuelles Training.",
    steps: [
      {
        title: "Einheit und Trainer wählen",
        description:
          "Wähle die 60-minütige Einheit und auf Wunsch einen bestimmten Trainer. Mit „Alle Lehrkräfte“ siehst du die größte Auswahl.",
      },
      {
        title: "Termin auswählen",
        description:
          "Wechsle bei Bedarf die Woche und wähle einen verfügbaren Termin im Kalender.",
      },
      {
        title: "Buchung bestätigen",
        description:
          "Melde dich bei bSport an oder erstelle ein Konto und schließe deine Buchung ab.",
      },
    ],
  },
  integrations: {
    schedule: {
      heading: "Live-Kursplan",
      description:
        "Kurse, Zeiten und verfügbare Plätze werden direkt aus bsport geladen. Buchungen werden im bsport-System fortgesetzt.",
      loading: "Der Live-Kursplan wird geladen …",
      error:
        "Der Live-Kursplan konnte gerade nicht geladen werden. Bitte versuche es später erneut.",
    },
    privateTraining: {
      heading: "Private Classes",
      description:
        "Individuelles Training mit voller Aufmerksamkeit. Wähle dein Angebot und buche einen verfügbaren Termin direkt über bSport.",
      loading: "Verfügbare Termine werden geladen …",
      error:
        "Die Termine für Privattraining konnten gerade nicht geladen werden. Bitte versuche es später erneut.",
    },
    memberArea: {
      heading: "Bei bsport anmelden",
      description:
        "Die Anmeldung und dein persönliches Mitgliedskonto werden sicher von bsport bereitgestellt.",
      loading: "Die Mitgliederanmeldung wird geladen …",
      error:
        "Die Mitgliederanmeldung konnte gerade nicht geladen werden. Bitte versuche es später erneut.",
    },
    pricing: {
      heading: "Mitgliedschaften",
      description:
        "Wähle die Laufzeit und Mitgliedschaft, die zu deinem Training passt.",
      secureCheckoutNotice:
        "Zahlung und Abschluss aller Mitgliedschaften und Pässe werden sicher über bSport abgewickelt.",
      offerSelectorLabel: "Preisangebot wählen",
      membershipTab: "Mitgliedschaften",
      passesTab: "Pässe",
      termsLabel: "Gilt für alle Mitgliedschaften",
      loading: "Die aktuellen Preise werden geladen …",
      error:
        "Die Preise konnten gerade nicht geladen werden. Bitte versuche es später erneut.",
      durationSelectorLabel: "Mitgliedschaftslaufzeit wählen",
      durationLabels: {
        12: "12 Monate",
        6: "6 Monate",
        3: "3 Monate",
      },
      membershipLabel: "Mitgliedschaft",
      perMonth: "/ Monat",
      billingDay: "Zahlung jeweils am {day}. des Monats",
      joiningFee: "Aufnahmegebühr",
      autoRenewal:
        "Deine Mitgliedschaft verlängert sich nach Ablauf der gewählten Vertragslaufzeit automatisch, sofern sie nicht fristgerecht gekündigt wird.",
      monthlyAccess: "{count} Teilnahmen im Monat an:",
      unlimitedAccess: "Unbegrenzter Zugang zu:",
      benefits: {
        muayThai: "Allen Muay-Thai-Kursen",
        openGym: "Open Gym",
        yoga: "Yoga-Kursen",
        strengthConditioning: "Strength and Conditioning",
        mobility: "Mobility-Kursen",
      },
      bookAction: "Jetzt buchen",
      unavailableHeading: "Tarife folgen",
      unavailableDescription:
        "Die Mitgliedschaften für diese Laufzeit werden ergänzt, sobald die bestätigten Konditionen und Buchungslinks vorliegen.",
      monthlyPasses: {
        heading: "Trainingspässe",
        description:
          "Trainiere flexibel ohne laufende Mitgliedschaft. Wähle die Anzahl der Einheiten, die zu deinem Trainingsrhythmus passt.",
        validityLabel: "Gültigkeit",
        validityOne: "Gültig für {count} Monat",
        validityMany: "Gültig für {count} Monate",
        passLabel: "Trainingspass",
        singleSession: "1 Teilnahme",
        sessions: "{count} Teilnahmen",
        unlimitedSessions: "Unbegrenzte Teilnahmen",
        buyAction: "Pass kaufen",
      },
    },
    shop: {
      heading: "Shop bei bsport",
      description:
        "Die verfügbaren Artikel werden direkt aus bsport geladen. Deine Bestellung wird sicher im bsport-System fortgesetzt.",
      loading: "Der Shop wird geladen …",
      error:
        "Der Shop konnte gerade nicht geladen werden. Bitte versuche es später erneut.",
    },
    giftCards: {
      heading: "Gutscheine",
      description:
        "Wähle einen festen Betrag oder erstelle einen Gutschein mit individuellem Wert. Kauf und Zahlung werden sicher über bsport abgewickelt.",
      loading: "Die Gutscheine werden geladen …",
      error:
        "Die Gutscheine konnten gerade nicht geladen werden. Bitte versuche es später erneut.",
    },
  },
  notFound: {
    eyebrow: "Fehler 404",
    title: "Diese Seite wurde nicht gefunden",
    description:
      "Die Adresse ist möglicherweise nicht mehr gültig oder wurde falsch eingegeben.",
    homeAction: "Zur Startseite",
  },
  error: {
    eyebrow: "Technischer Fehler",
    title: "Etwas ist schiefgelaufen",
    description:
      "Die Seite konnte gerade nicht geladen werden. Bitte versuche es noch einmal.",
    retryAction: "Erneut versuchen",
  },
  draftMode: {
    landmarkLabel: "Entwurfsvorschau",
    status:
      "Entwurfsvorschau ist aktiv. Du siehst unveröffentlichte Sanity-Inhalte.",
    exitAction: "Vorschau beenden",
    incompleteContent:
      "Dieser Entwurf ist für die gewählte Sprache noch unvollständig oder ungültig. Bis die markierten Felder korrigiert sind, zeigt die Seite ihre lokale Ersatzfassung.",
    missingContent:
      "Für diese Vorschau ist noch kein Sanity-Inhalt vorhanden. Die lokale Ausgangsversion wird angezeigt.",
    unavailableContent:
      "Sanity konnte für diese Vorschau nicht geladen werden. Die lokale Ausgangsversion wird angezeigt.",
  },
  preview: {
    eyebrow: "Markengrundlage · Meilenstein 1",
    heading: "Authentisches Muay Thai in Berlin",
    introduction:
      "Eine klare, kraftvolle Grundlage für Kru Tigers Erfahrung, thailändische Muay-Thai-Kultur und eine offene Trainingsgemeinschaft.",
    typographyAction: "Typografie ansehen",
    paletteAction: "Farbsystem ansehen",
    logoAlt:
      "Rundes KRUTIGER Muay Thai Berlin Abzeichen mit illustriertem Tiger und thailändischer Schrift",
    typography: {
      displayLabel: "Displayschrift",
      displayDescription:
        "Kompakt und direkt – für Überschriften, Handlungsaufforderungen, Beschriftungen und starke Zahlen.",
      bodyLabel: "Leseschrift",
      bodyDescription:
        "Klar und gut lesbar für längere Texte: Anfänger, Fortgeschrittene, Kämpfer und alle, die Muay Thai kennenlernen möchten.",
    },
    palette: {
      label: "Farbsystem",
      heading: "Energie mit Disziplin",
      introduction:
        "Orange führt durch die wichtigsten Aktionen. Schwarz, warmes Elfenbein und gezielt eingesetztes Rot halten die Identität klar und wiedererkennbar.",
      swatches: {
        brand: "Markenfarbe",
        signal: "Signalfarbe",
        copy: "Textfarbe",
        warmCanvas: "Warmer Hintergrund",
      },
      darkSurfaceHeading: "Dunkle Grundfläche",
      darkSurfaceDescription:
        "Starker Kontrast unterstützt Navigation, Kursplan, Preise und klare Handlungsaufforderungen.",
      lightSurfaceHeading: "Warme redaktionelle Fläche",
      lightSurfaceDescription:
        "Helle Bereiche schaffen Rhythmus für Biografien, Trainingserklärungen und praktische Informationen.",
    },
  },
} satisfies Dictionary;

export default de;
