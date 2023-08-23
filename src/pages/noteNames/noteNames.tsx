import React, { useState } from "react"

import { useNavigate } from "react-router-dom";
import { SelectKeyboardKey } from "@/components/selectKeyboardKey/selectKeyboardKey";



type answers = 'c1' | 'cs1' | 'd1' | 'ds1' | 'e1' | 'f1' | 'fs1' | 'g1' | 'gs1' | 'a1' | 'as1' | 'b1' | 'c2' | 'cs2' | 'd2' | 'ds2' | 'e2' | 'f2' | 'fs2' | 'g2' | 'gs2' | 'a2' | 'as2' | 'b2';

type Question = {
    q: string;
    a: answers[];
  };
    

export const NoteNames = () => {
    const [index, setIndex] = useState<number>(0)
    const navigate = useNavigate();

    const questions:Question[] = [
        { q: "Click on all of the C's", a: ['c1', 'c2']},
        { q: "Click the lowest F", a: ['f1'] },
        { q: "Click the highest A", a: ['a2']},
        { q: "Click the lowest D", a: ['d1']},
        { q: "Click the highest B", a: ['b2']},
        { q: "Click the highest E", a: ['e2']},
        { q: "Click the groups of 2 black notes", a: ['cs1','ds1','cs2','ds2']}
    ]
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
            <SelectKeyboardKey question={questions[index].q} answer={questions[index].a} completedCallback={nextQuestion} />
        </React.Fragment>
    )
}