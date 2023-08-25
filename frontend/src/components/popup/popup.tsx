import { Box, Dialog, Paper } from "@mui/material";
import  { Fragment, ReactNode, useState } from "react"

type popupProps = {
    button: ReactNode,
    children: ReactNode
}

export const Popup = ({ button, children }: popupProps) => {
    const [toggleOpen, setToggleOpen] = useState<boolean>(false);

    const handleClickOpen = () => {
        setToggleOpen(true);
    };

    const handleClickClose = () => {
        setToggleOpen(false);
    };
    return (
        <Fragment>
            <Box onClick={handleClickOpen} sx={{ cursor: "pointer" }}>{button}</Box>
            <Dialog onClose={handleClickClose} open={toggleOpen} >
                <Paper elevation={24} >
                    <Box padding={4}>
                        {children}
                    </Box>
                </Paper>
            </Dialog>
        </Fragment>
    )
}