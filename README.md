# Worldle-Next

A Next.Js word-guessing game 🎮

## Tech Stack 

Next.Js (Pages router), TypeScript, Tailwind CSS, Shadcn/ui,

## Instalation 

Install the project with pnpm

```bash
  cd wordle
  pnpm install
```

## Run on the Web 🔥
Deployment link: [www.wordle-game.com](https://wordle-challenge-alpha.vercel.app/)

## Run Locally 

start the development server

```bash
  pnpm run dev
```

## Features 

- Multi-Language support
- Dark / Light / System theming
- 5 world Guessing
- 5 tries to guess the secret word
- 4 different states for every word: correct, incorrect, missplaced, empty
- Fully animated by [tailwind-animated](https://www.tailwindcss-animated.com/)
- Keyboard press detection

## Development Challenges 🚧

When fetching the word from the given API endpoint, some words only exist in those specific languages, including words that have special characters.

```bash
  GET /https://random-word-api.herokuapp.com/word?length=5&&lang=en
```

| LANGUAGE | WORD  | CHAR | SPECIAL |
| :------- | :---- | :--- | ------- |
| `es`     | ARAÑA | Ñ    | `true`  |
| `es`     | LÁPIZ | Á    | `true`  |
| `es`     | ÁRBOL | Á    | `true`  |
| `de`     | GLÜCK | Ü    | `true`  |
| `de`     | ÖFFNE | Ö    | `true`  |
| `fr`     | CŒUR  | Œ    | `true`  |
| `fr`     | ÉCRAN | É    | `true`  |
| `fr`     | CHÂTE | Â    | `true`  |



To overcome this issue, a function was created to check each character from the word provided by the API endpoint against a set of characters.

```typescript
// Verifies whether words in languages other than English contain special characters such as 'é', 'á', etc.
const isNotSpecialWord = wordsUpperCaseArray.every((item: string) =>
  lettersArray.includes(item),
);
if (isNotSpecialWord) {
  setwordsArray(wordsArray);
} else {
  getWord();
}
```

The function described above checks each character of the word coming from the API to determine if it is contained within the array of characters declared in lettersArray and stores a boolean in isNotSpecialWord. If the result of isNotSpecialWord is true, only then the state wordsArray is set. If not, the function calls itself once again, triggering another API endpoint call to get another word to undergo the same validation process.

## Restart 🔄️

To be able to play again without refreshing the website and losing the selected language, the following events are needed.

- reset the main states
- call the `getWord()` method

## How to play 🎮

The game begins with the upper part (the board) in an empty state. This is where the letters that the user presses will be stored and undergo validation after submitting.

![wordle main screen](https://i.ibb.co/LkKh3GN/wordle-main.png "Initial state after boot-up")

After loading, we can either start typing or click on the keyboard letters to fill the empty spaces on the board. At this point, the only thing left to do is to press the INTRO key or click on the ENTER key.

![wordle main screen](https://i.ibb.co/LpYx4s2/wordle-typing.png "Let's start typing")

### different game-states

In order to win, the player must guess both the correct letters and the correct order of all 5 letters after submitting a try (a row of letters). From this point, there are three possible outcomes for both letters and their order:

- Incorrect letter (gray color)
- Correct letter but misplaced order (yellow color)
- Correct letter and order (green color)
- To win the game, all 5 letters must be guessed correctly and placed in their rightful order. At this point, the game logic will stop, showing a dialog indicating that the player has won the game.

![wordle main screen](https://i.ibb.co/YLVxK4m/wordle-win1.png "3 different states for letters")

## Winning example

![wordle main screen](https://i.ibb.co/JmSfvBw/wordle-win2.png "3 different states for letters")

## Loosing example

After submitting 6 times without achieving the winning state, the losing state will be triggered, and a modal displaying a message indicating that the player has lost will appear. To enhance the user experience, the `secret word` is being shown.

![wordle main screen](https://i.ibb.co/J2srR0R/wordle-lost.png "loosing state =( ")

## Funcionamiento en Detalles

## Autor

- [@Sofía Guardia Guillan](https://github.com/Sogugui)
