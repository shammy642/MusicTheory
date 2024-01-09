import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { NoteSelect } from "@/components/exercises/noteSelect";
import { NoteIdentify } from "@/components/exercises/noteIdentify";
import { useUserProgressServices } from "@/services/userProgressServices";

type ExerciseProps = {
    type: "noteSelect" | "noteIdentify" | "";
    data: any;
}

export const QuizPage = () => {
    const { quizId } = useParams();
    const [index, setIndex] = useState<number>(0)
    const [exercisesState, setExercisesState] = useState<ExerciseProps[]>([])
    const { postCompletedQuiz } = useUserProgressServices();
    const navigate = useNavigate();

    const getExercises = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_DATABASEURL}/quizQuestions?quizId=${quizId}`, {
                method: "GET",
                headers: {
                    "Content-type": "application/json",
                },
            });
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const data = await response.json()
            setExercisesState(data.quizQuestions)
        }
        catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getExercises()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    const nextQuestion = () => {
        
        if (exercisesState) {
            if (index < exercisesState.length - 1) {
                setIndex(index + 1)
            }
            else if (index === exercisesState.length - 1) {
                if (quizId) {
                    (async () => {
                        const hasGainedStar = await postCompletedQuiz(+quizId);
                        navigate(`/congratulations/${hasGainedStar}`);
                    })();
                }
            }
        }
    }

    const ProcessExercise = ({ type, data }: ExerciseProps) => {
        switch (type) {
            case "noteSelect":
                return <NoteSelect {...data} completedCallback={() => nextQuestion()} />
            case "noteIdentify":
                return <NoteIdentify {...data} completedCallback={() => nextQuestion()} />
            default:
                return <>"Whoops, something's gone wrong!"</>;
        }

    }
    return (
        <React.Fragment>
            {exercisesState.length > 0 && <ProcessExercise type={exercisesState[index].type} data={exercisesState[index]} />}
        </React.Fragment>
    )
}

