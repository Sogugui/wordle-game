
export type Language = 'en' | 'es'; // Add other languages as needed

export type DictionaryType = {
    [key in keyof typeof Dictionary]: Record<string, string>;
}

export const Dictionary = {
    HowToPlayTitle: {
        en: "How to play",
        es: "Cómo jugar",
        fr: "Comment jouer",
        de: "Wie man spielt",
    },
    HowToPlayInformation: {
        en: "Wordle is a fun and enjoyable word puzzle that anyone can play. Instructions:\n ",
        es: "Wordle es un rompecabezas de palabras divertido y entretenido que cualquiera puede jugar. Instrucciones:",
        fr: "Wordle est un puzzle de mots amusant et agréable que tout le monde peut jouer. Instructions :\n",
        de: "Wordle ist ein unterhaltsames und spaßiges Worträtsel, das jeder spielen kann. Anleitung :\n",
    },
    HowToPlayObjectiveSpan: {
        en: "Objective: ",
        es: "Objetivo: ",
        fr: "Objectif: ",
        de: "Ziel: ",
    },
    HowToPlayObjective: {
        en: "The goal of Wordle is to guess a hidden five-letter word",
        es: "El objetivo de Wordle es adivinar una palabra oculta de cinco letras",
        fr: "Le but de Wordle est de deviner un mot caché de cinq lettres",
        de: "Das Ziel von Wordle ist es, ein verstecktes fünf Buchstaben Wort zu erraten",
    },
    HowToPlayGuessingSpan: {
        en: "Guessing: ",
        es: "Adivinar: ",
        fr: "Devinez: ",
        de: "Raten: ",
    },
    HowToPlayGuessing: {
        en: "You have six attempts to guess the correct word. ",
        es: "Tienes seis intentos para adivinar la palabra correcta. ",
        fr: "Vous avez six tentatives pour deviner le mot correct. ",
        de: "Du hast sechs Versuche, das richtige Wort zu erraten. ",
    },
    HowToPlayMakingGuessesSpan: {
        en: "Making Guesses: ",
        es: "Haciendo adivinanzas: ",
        fr: "Faire des suppositions:  ",
        de: "Tippabgabe: ",
    },
    HowToPlayMakingGuesses: {
        en: "Submit a five-letter word as your guess. Type it in and hit enter.",
        es: "Envía una palabra de cinco letras como tu suposición. Escríbela y presiona enter. ",
        fr: "Soumettez un mot de cinq lettres comme votre supposition. Tapez-le et appuyez sur Entrée. ",
        de: "Übermittle ein fünf Buchstaben Wort als deinen Tipp. Tippe es ein und drücke Enter. ",
    },
    HowToPlayFeedbackSpan: {
        en: "Feedback: ",
        es: "Retorno: ",
        fr: "Retour d'information: ",
        de: "Rückmeldung: ",
    },
    HowToPlayFeedback: {
        en: "After each guess, Wordle gives you feedback: ",
        es: "Después de cada suposición, Wordle te da retroalimentación: ",
        fr: "Après chaque supposition, Wordle vous donne un retour d'information : ",
        de: "Nach jedem Tipp gibt dir Wordle Rückmeldung : ",
    },
    HowToPlayAdjustingStrategySpan: {
        en: "Adjusting Strategy: ",
        es: "Ajustando Estrategia: ",
        fr: "Ajuster la stratégie: ",
        de: "Strategie anpassen: ",
    },
    HowToPlayAdjustingStrategy: {
        en: "Use the feedback to adjust your strategy and get closer to the correct word",
        es: "Utiliza la retroalimentación para ajustar tu estrategia y acercarte a la palabra correcta",
        fr: "Utilisez le retour d'information pour ajuster votre stratégie et vous rapprocher du mot correct",
        de: "Nutze die Rückmeldung, um deine Strategie anzupassen und näher an das richtige Wort zu kommen",
    },
    HowToPlayWinningSpan: {
        en: "Winning: ",
        es: "Ganar: ",
        fr: "Gagner: ",
        de: "Gewinnen: ",
    },
    HowToPlayWinning: {
        en: "If you guess the word within six attempts, you win! Otherwise, Wordle reveals the correct word",
        es: "Si adivinas la palabra en seis intentos, ¡ganas! De lo contrario, Wordle revela la palabra correcta",
        fr: "Si vous devinez le mot en six tentatives, vous gagnez ! Sinon, Wordle révèle le mot correct",
        de: "Wenn du das Wort innerhalb von sechs Versuchen errätst, gewinnst du ! Andernfalls zeigt Wordle das richtige Wort an",
    },
    HowToPlayCorrectAnswers: {
        en: "Correct letters in the correct position are marked in: ",
        es: "Las letras correctas en la posición correcta se marcan en: ",
        fr: "Les lettres correctes à la bonne position sont marquées en: ",
        de: "Die richtigen Buchstaben an der richtigen Position sind markiert in: ",
    },
    HowToPlayCorrectAnswersColor: {
        en: " green",
        es: " verde",
        fr: " vert",
        de: " grün",
    },
    HowToPlayMissplacedAnswers: {
        en: "Correct letters in the wrong position are marked in: ",
        es: "Las letras correctas en la posición incorrecta se marcan en: ",
        fr: "Les lettres correctes à la mauvaise position sont marquées en: ",
        de: "Die richtigen Buchstaben an der falschen Position sind markiert in: ",
    },
    HowToPlayMissplacedAnswersColor: {
        en: " yellow",
        es: " amarillo",
        fr: " jaune",
        de: " gelb",
    },
    HowToPlayIncorrectAnswers: {
        en: "Incorrect letters are marked in: ",
        es: "Las letras incorrectas se marcan en: ",
        fr: "Les lettres incorrectes sont marquées en: ",
        de: "Falsche Buchstaben sind markiert in: ",
    },
    HowToPlayIncorrectAnswersColor: {
        en: "gray",
        es: "gris",
        fr: "gris",
        de: "grau",
    },
    UserWinner: {
        en: "You won!",
        es: "¡Ganaste!",
        fr: "Vous avez gagné !",
        de: "Du hast gewonnen !",
    },
    UserNotWinner: {
        en: "You Lost!",
        es: "¡Perdiste!",
        fr: "Vous avez perdu!",
        de: "Du hast verloren!",
    },
    ResetButton: {
        en: "Reset",
        es: "Reiniciar",
        fr: "Réinitialiser",
        de: "Zurücksetzen",
    },
    TryAgainButton: {
        en: "New Game",
        es: "Jugar otra vez",
        fr: "Jouer à nouveau",
        de: "Nochmal spielen",
    },
    RevealCorrectAswer: {
        en: "The answer was:",
        es: 'La respuesta era:',
        fr: "La réponse était:",
        de: "Die Antwort war"
    }
}

export function getTranslation<T extends keyof DictionaryType>(
    key: T,
    language: keyof DictionaryType[T]
): string {
    return Dictionary[key][language] as string;
}