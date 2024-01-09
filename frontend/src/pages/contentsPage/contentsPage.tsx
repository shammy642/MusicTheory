import { Box, Container, Typography, } from "@mui/material"
import React from "react"
import Grid from '@mui/material/Unstable_Grid2';
import { useNavigate } from "react-router-dom";
import { useQuizes } from "@/stateManagement/quizes/useQuizes";
import { useUserProgress } from "@/stateManagement/userProgress/useUserProgress";
import { Star } from "@/components/star/star";

export const ContentsPage = () => {
    const [quizesState] = useQuizes();
    const quizes = quizesState.quizes;
    const [userProgressState] = useUserProgress();
    const navigate = useNavigate();

    const displayQuizesBySection = (sectionName: string) => {
        const filteredQuizes = quizes.filter((quizes) => quizes.section === sectionName)
        return (
            <React.Fragment>
                {filteredQuizes.map((quizes, index) =>
                    <Grid xs key={quizes.id}>
                        {(userProgressState.completedQuizes.includes(quizes.id)) ?
                            <Box onClick={() => navigate("/quiz/" + quizes.id)} margin={5} sx={{ cursor: "pointer" }}><Star color="gold">{index + 1}</Star></Box>
                            :
                            <Box onClick={() => navigate("/quiz/" + quizes.id)} margin={4} sx={{ cursor: "pointer" }}><Star color="#8b8b8b9a">{index + 1}</Star></Box>}
                    </Grid>
                )}
            </React.Fragment>)
    }

    return (
        <React.Fragment>
            <Container>
                <Box sx={{ flexGrow: 1 }}>
                    <Container>
                        <Box display="flex" justifyContent="center" margin={2}>
                            <Typography variant="h3" color={"#ff0095"}>Letter Names</Typography>
                        </Box>
                    </Container>
                    <Grid container spacing={6}>
                        {displayQuizesBySection("letter_names")}
                    </Grid>
                </Box>
            </Container>
        </React.Fragment>
    )
}

