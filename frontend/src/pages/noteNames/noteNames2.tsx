import React, { useState } from "react"

import { useNavigate } from "react-router-dom";
import { TypeKeyboardKey } from "../../components/typeKeyboardKey/typeKeyboardKey";

type answers = 'c1' | 'd1' | 'e1' | 'f1' | 'g1' | 'a1' | 'b1' | 'c2' | 'd2' | 'e2' | 'f2' | 'g2' | 'a2' | 'b2';



export const NoteNames2 = () => {
    const [index, setIndex] = useState<number>(0)
    const navigate = useNavigate();

    const questions:answers[] = ["d2","a1","e1"]
    const nextQuestion = () => {
        if (index < questions.length - 1) {
            setIndex(index + 1)
            console.log(index)
        }
        else if (index === questions.length - 1) {
            //update backend
            navigate("/congratulations")
        }
    }
    return (
        <React.Fragment>
        <TypeKeyboardKey selectedKey={questions[index]} completedCallback={nextQuestion} />
        </React.Fragment>
    )
}