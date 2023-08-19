import { Box, Container, Paper, styled } from "@mui/material"
import React from "react"
import Grid from '@mui/material/Unstable_Grid2';
import { Link } from "react-router-dom";
import { Login } from "@/pages/login/login";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

export const ContentsPage = () => {
    return (
        <React.Fragment>
            <Container>
                <Login />
            </Container>
            <Container>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={6}>
                    <Grid xs>
                        <Item><Link to={"/note-names"}>Note Names</Link></Item>
                    </Grid>
                    <Grid xs>
                        <Item><Link to={"/note-names-2"}>Note Names 2</Link></Item>
                    </Grid>
                </Grid>
            </Box>
            </Container>
        </React.Fragment>
        )
}