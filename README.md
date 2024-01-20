# Worldle-Next

A Next.Js word-guessing game 🎮

## Tech Stack 💻

Next.Js (Pages router), TypeScript, Tailwind CSS, Shadcn/ui,

## Instalation 🛠

Install the project with pnpm

```bash
  cd wordle
  pnpm install
```

## Run Locally 🏠

start the development server

```bash
  pnpm run dev
```

## Features ⭐

- Multi-Language support
- Dark / Light / System theming
- 5 world Guessing
- 5 tries to guess the secret word
- 4 different states for every word: correct, incorrect, missplaced, empty
- Fully animated by [tailwind-animated](https://www.tailwindcss-animated.com/)
- Keyboard press detection

## Development Challenges

When fetching the word from the given API endpoint, some words only exists in those specific languages, words that have special characters

```bash
  GET /mypokeapi/id
```

| LANGUAGE | WORD  | CHAR | SPECIAL |
| :------- | :---- | :--- | ------- |
| `es`     | ARAÑA | Ñ    | `true`  |
| `es`     | ARAÑA | Ñ    | `true`  |
| `es`     | ARAÑA | Ñ    | `true`  |

To overcome this issue, a function was createed to check each character from the word provided by the API endpoint, against a set of chracters.

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

The function described above checks for each character of the word comming from the API to be contained within the array of characters declared in `lettersArray` and stores a boolean into `isNotSpecialWord`, if the result of isNotSpecialWord is true, only then the state wordsArray is setted, if not the function calls itself once again, triggering another call to the API endpoint and getting another word to undergo the same validation process.

## Restart 🔄️

To be able to plain again without refreshing the website, and loose the selected language, the following events are needed.

- reset the main states
- call the `getWord()` method

## How to play 🎮

The game starts with the upper part (the board) with empty states, this is the place where the letters that the user press are going to be stored and undergo the validation after submitting.

![wordle main screen](https://i.ibb.co/LkKh3GN/wordle-main.png "Initial state after boot-up")

After loading, we are able to either start typing or clicking on the keyboard letters to fill the empty spaces from the Board, and at this point the only thing left to do is hit the INTRO key or click on the ENTER key

![wordle main screen](https://i.ibb.co/LpYx4s2/wordle-typing.png "Let's start typing")

### different game-states

In order to win, the player must guess the correct letters and also the correct order of all 5 letters, after submitting a try (a row of letters), from this point there are 3 possible outcomes for both letters and their order:

- incorrect letter (gray color)
- correct letter, but missplaced order (yellow color)
- correct letter and order (green color)
  To win the game, all 5 letters must be guessed correctly and placed in their rightful place. At this point the game logic will stop, showing a Dialog indicating that the player has won the game

![wordle main screen](https://i.ibb.co/YLVxK4m/wordle-win1.png "3 different states for letters")

### Winning example

![wordle main screen](https://i.ibb.co/JmSfvBw/wordle-win2.png "3 different states for letters")

## Funcionamiento en Detalles

#### TYPES / INTERFACES

Para asegurar la consistencia de datos a travez de la aplicación, existen distintas interfaces y tipos de TypeScript que son aplicadas a distintas estructuras de datos como objetos y/o arreglos, estas se detallan a continuacion.
types /pokemon-interfaces.ts

- _interface InitialPokemonList_: objeto con la siguiente forma name:string, url:string. Esta interfaz es usada dentro de la funcion auxiliar getAllPokemons para tipar el fetch inicial de los 151 pokemones.
- _interface SinglePokemon_: se usa en la funcion sanitizePokemons() para despojar al pokemon de las propiedades que no son de nuestro interes. Tambien es usada por los schemas de zod para tipar los inputs de las peticiones en los metodos POST y PATCH,
- _type SinglePokemon[ ]_: tipo de arreglo con forma de SinglePokemon. Este tipo es usado en la funcion auxiliar getAllPokemons()
- _enum PokemonEnums_: objeto de enums que representan el atributo TYPE que no es mutable, se utilizan estos enums en los schemas de zod para validar los parametros y el cuero de las peticiones HTTP POST y PATCH, al no pasarle un TYPE que se corresponda con al menos uno de estos enums arroja un error de zod indicando informaicon pertinente al campo.

##

## Autor

- [@Sofía Guardia Guillan](https://github.com/Sogugui)
