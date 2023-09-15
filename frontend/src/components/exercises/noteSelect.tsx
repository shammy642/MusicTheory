import React, { useState } from "react"
import { Keyboard } from "@/components/keyboard/keyboard"
import { Box, Button, Typography } from "@mui/material"

type NoteSelectProps = {
    question: string,
    answer: string,
    completedCallback: () => void;
}

export const NoteSelect = ({ question, answer, completedCallback }: NoteSelectProps) => {
    const [selectedKeys, setSelectedKeys] = useState<Record<string, boolean>>({})
    const [verifyResponse, setVerifyResponse] = useState<string>()

    const handleKeyClick = (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
        const id = event.currentTarget.id;
        setSelectedKeys(prev => ({ ...prev, [id]: !prev[id] }));
    }

    const verifyAnswer = () => {
        const selectedKeysArray = Object.keys(selectedKeys).filter(key => selectedKeys[key]);
        const answerArray = answer.split(',')

        if (selectedKeysArray.length === 0) {
            setVerifyResponse("Please click at least one note!")
        } else if (selectedKeysArray.sort().join() === answerArray.sort().join()) {
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