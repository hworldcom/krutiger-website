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
        "Der aktuelle Kursplan und die Buchungsmöglichkeiten werden später direkt über bsport eingebunden.",
    },
    prices: {
      navigationLabel: "Preise",
      eyebrow: "Preise",
      title: "Mitgliedschaften und Trainingspässe",
      description:
        "Hier werden die geprüften Mitgliedschaften, Pässe und Konditionen klar vergleichbar dargestellt.",
    },
    coaches: {
      navigationLabel: "Trainer",
      eyebrow: "Trainerteam",
      title: "Lerne die Menschen hinter dem Training kennen",
      description:
        "Diese Seite stellt Kru Tiger und das Trainerteam mit Erfahrung, Schwerpunkten und persönlichem Hintergrund vor.",
    },
    about: {
      navigationLabel: "Über uns",
      eyebrow: "Über KRUTIGER",
      title: "Thailändische Erfahrung, Berliner Gemeinschaft",
      description:
        "Hier erzählen wir die Geschichte, Haltung und Trainingsphilosophie von KRUTIGER Muay Thai Berlin.",
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
  integrations: {
    schedule: {
      heading: "Live-Kursplan folgt",
      description:
        "Der bsport-Kursplan wird hier eingebunden, sobald der Zugang verfügbar ist. Derzeit werden keine Kurszeiten oder freien Plätze angezeigt.",
    },
    pricing: {
      heading: "Geprüfte Preise und Buchungslinks folgen",
      description:
        "Preise werden erst nach Bestätigung veröffentlicht. Käufe und Mitgliedschaften werden später sicher an bsport übergeben.",
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
