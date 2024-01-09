import { Route, Routes } from "react-router-dom"
import { ContentsPage } from "./pages/contentsPage/contentsPage"
import { MainLayoutWithContext } from "./layouts/mainLayoutWithContext"
import { Congratulations } from "./pages/congratulations/congratulations"
import { QuizPage } from "./pages/quizPage/quizPage"


export const RouteConfig = () => {
    return (
        <Routes>
            <Route path="/" element={<MainLayoutWithContext />}>
                <Route index element={<ContentsPage />} />
                <Route path="/quiz/:quizId" element={<QuizPage />} />
                <Route path="/congratulations/:hasGainedStar" element={<Congratulations />} />
            </Route>
        </Routes>
    )
}