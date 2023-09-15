export type quizProps = {
    id: number;
    section: string;
}

export type quizesState = {
    quizes: quizProps[]
}

export type quizesAction =
    { type: 'SET_ALL_QUIZES'; quizes: quizProps[]}