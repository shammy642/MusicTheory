import React, { useState } from "react"
import { Keyboard } from "../keyboard/keyboard"
import { Box, Button, Typography } from "@mui/material"

type answers = 'c1' | 'cs1' | 'd1' | 'ds1'| 'e1' | 'f1'| 'fs1' | 'g1' | 'gs1' | 'a1' | 'as1' | 'b1' | 'c2' | 'cs2' | 'd2' | 'ds2' | 'e2' | 'f2'| 'fs2' | 'g2' | 'gs2' | 'a2'| 'as2' | 'b2';

type SelectKeyboardKeyProps = {
    question: string,
    answer: answers[],
    completedCallback?: () => void;
}

export const SelectKeyboardKey = ({ question, answer, completedCallback }: SelectKeyboardKeyProps) => {
    const [selectedKeys, setSelectedKeys] = useState<Record<string, boolean>>({})
    const [verifyResponse, setVerifyResponse] = useState<string>()

    const handleKeyClick = (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
        const id = event.currentTarget.id;
        setSelectedKeys(prev => ({ ...prev, [id]: !prev[id] }));
    }

    const verifyAnswer = () => {
        const selectedKeysArray = Object.keys(selectedKeys).filter(key => selectedKeys[key]);
    
        if (selectedKeysArray.length === 0) {
            setVerifyResponse("Please click at least one note!")
        } else if (selectedKeysArray.sort().join() === answer.sort().join()) {
            setVerifyResponse("Correct! Well done!")
            setTimeout(() => {
                setSelectedKeys({})
                completedCallback && completedCallback()
                setVerifyResponse("")
            }, 1000);

        } else {
            setVerifyResponse("Incorrect, try again!")
            setTimeout(() => {
                setVerifyResponse("")
            }, 1000);
         }
    }

    return (
        <React.Fragment>
            <Box sx={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                <Typography variant="h3">{question}</Typography>
                <Keyboard onClick={handleKeyClick} selectedKeys={selectedKeys}></Keyboard>
                {verifyResponse || !(Object.values(selectedKeys).some(value => value === true)) ? <Typography variant="h4">{verifyResponse}</Typography> : <Button onClick={verifyAnswer}>Check</Button>}
            </Box>
        </React.Fragment>)
}