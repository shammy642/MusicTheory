import React, { useState } from "react"
import { Keyboard } from "@/components/keyboard/keyboard";
import { Box, Button, TextField, Typography } from "@mui/material"


type TypeKeyboardKeyProps = {
    selectedKey: 'c1' | 'cs1' | 'd1' | 'ds1' | 'e1' | 'f1' | 'fs1' | 'g1' | 'gs1' | 'a1' | 'as1' | 'b1' | 'c2' | 'cs2' | 'd2' | 'ds2' | 'e2' | 'f2' | 'fs2' | 'g2' | 'gs2' | 'a2' | 'as2' | 'b2',
    completedCallback?: () => void;
}

export const TypeKeyboardKey = ({ selectedKey, completedCallback }: TypeKeyboardKeyProps) => {
    const [verifyResponse, setVerifyResponse] = useState<string>()
    const [inputValue, setInputValue] = useState<string>()

    const handleClick = () => {
        const answer = selectedKey[0].slice(0, 1);

        if (inputValue === answer) {
            setVerifyResponse("Correct! Well done!")
            setTimeout(() => {
                setVerifyResponse("")
                setInputValue("")
                completedCallback && completedCallback()
            }, 1000);
        }
        else {
            setVerifyResponse("Incorrect, try again!")
            setTimeout(() => {
                setVerifyResponse("")
                setInputValue("")
            }, 1000);
        }
    }
    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const val = event.target.value;
        if ((/^[A-Ga-g]+$/.test(val)) && val.length < 2) {
            setInputValue(val.toLowerCase())
        }
    }

    return (
        <React.Fragment>
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <Typography variant="h3">What is this note?</Typography>
                <Keyboard selectedKeys={{ [selectedKey]: true }}></Keyboard>
                <TextField id="note-input" variant="outlined" value={inputValue} onChange={handleChange} onKeyDown={(event => (event.key === "Backspace") && setInputValue(""))}/>
                {verifyResponse || !inputValue ? <Typography variant="h4">{verifyResponse}</Typography> : <Button onClick={handleClick}>Check</Button>}

            </Box>
        </React.Fragment>)
}