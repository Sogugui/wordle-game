// Index page
export type LetterState =
    | "correct"
    | "misplaced"
    | "incorrect"
    | "empty"
    | "unchecked";

export type Guess = {
    letter: string;
    state: LetterState;
};

export type HomeProps = {
    locale: any;
};

// Keyboard component
export interface KeyboardButtonProps {
    letter: string;
    state: LetterState | string;
    onClickLetter: (letter: string) => void;
    wordsArray: string[];
}
export interface KeyboardProps {
    letterStates: Record<string, string>;
    onClickLetter: (letter: string) => void;
    wordsArray: string[];
}

// Key component
export interface BoardProps {
    guesses: Guess[][];
}