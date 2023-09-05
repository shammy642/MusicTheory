export type exercisesProps = {
    exerciseId: number;
    exerciseName: string;
}

export type exercisesState = {
    exercises: exercisesProps[]
}

export type exercisesAction =
    { type: 'SET_ALL_EXERCISES'; exercises: exercisesProps[]}