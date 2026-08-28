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
        "Hier stellen wir die Trainingsformate für Anfänger, Fortgeschrittene, Kinder und individuelle Einheiten vor.",
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
    coaches: {
      navigationLabel: "Team",
      eyebrow: "Trainerteam",
      title: "Lerne die Menschen hinter dem Training kennen",
      description:
        "Diese Seite stellt Kru Tiger und das Trainerteam mit Erfahrung, Schwerpunkten und persönlichem Hintergrund vor.",
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
      navigationLabel: "Mitgliederbereich",
      eyebrow: "Für Mitglieder",
      title: "Dein Mitgliederbereich",
      description:
        "Melde dich über bsport an, um deinen persönlichen Mitgliederbereich zu öffnen.",
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
      placeholderNotice:
        "Vorschau mit Beispieldaten. Live-Zeiten und Verfügbarkeiten findest du im Kursplan.",
      classes: [
        {
          time: "17:00",
          title: "Anfänger",
          details: "60 Min · Alle Levels",
        },
        {
          time: "18:30",
          title: "Muay Thai All Levels",
          details: "90 Min · Alle Levels",
        },
        {
          time: "20:00",
          title: "Sparring",
          details: "90 Min · Fortgeschrittene",
        },
      ],
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
  integrations: {
    schedule: {
      heading: "Live-Kursplan",
      description:
        "Kurse, Zeiten und verfügbare Plätze werden direkt aus bsport geladen. Buchungen werden im bsport-System fortgesetzt.",
      loading: "Der Live-Kursplan wird geladen …",
      error:
        "Der Live-Kursplan konnte gerade nicht geladen werden. Bitte versuche es später erneut.",
      stagingNotice:
        "Testintegration: Dieser Kursplan wird derzeit aus der bsport-Staging-Umgebung geladen.",
    },
    memberArea: {
      heading: "Bei bsport anmelden",
      description:
        "Die Anmeldung und dein persönliches Mitgliedskonto werden sicher von bsport bereitgestellt.",
      loading: "Die Mitgliederanmeldung wird geladen …",
      error:
        "Die Mitgliederanmeldung konnte gerade nicht geladen werden. Bitte versuche es später erneut.",
      stagingNotice:
        "Testintegration: Diese Anmeldung wird derzeit aus der bsport-Staging-Umgebung geladen.",
    },
    pricing: {
      heading: "Mitgliedschaften und Trainingspässe",
      description:
        "Aktuelle Mitgliedschaften und Trainingspässe werden direkt aus bsport geladen. Der Kauf wird sicher im bsport-System fortgesetzt.",
      loading: "Die aktuellen Preise werden geladen …",
      error:
        "Die Preise konnten gerade nicht geladen werden. Bitte versuche es später erneut.",
      stagingNotice:
        "Testintegration: Diese Preise und Kaufoptionen werden derzeit aus der bsport-Staging-Umgebung geladen.",
    },
    giftCards: {
      heading: "Gutscheinverkauf folgt",
      description:
        "Der Kauf von Gutscheinen wird später über bsport angeboten. Diese Vorschau simuliert keinen Kaufvorgang.",
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
