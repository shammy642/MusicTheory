import { Route, Routes } from "react-router-dom"
import { NoteNames } from "./components/exerciseTypes/noteNames"
import { ContentsPage } from "./pages/contentsPage/contentsPage"
import { NoteNames2 } from "./components/exerciseTypes/noteNames2"
import { MainLayoutWithContext } from "./layouts/mainLayoutWithContext"
import { Congratulations } from "./pages/congratulations/congratulations"


export const RouteConfig = () => {
    console.log("RouteConfig rerendered")
    return (
        <Routes>
            <Route path="/" element={<MainLayoutWithContext />}>
                <Route path="/contents-page" element={<ContentsPage />} />
                <Route path="/note-names" element={<NoteNames />} />
                <Route path="/note-names-2" element={<NoteNames2 />} />
                <Route path="/congratulations" element={<Congratulations />} />
            </Route>
        </Routes>
    )
}