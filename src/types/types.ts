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