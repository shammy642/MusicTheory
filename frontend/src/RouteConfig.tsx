import { Route, Routes } from "react-router-dom"
import { NoteNames } from "./pages/noteNames/noteNames"
import { ContentsPage } from "./pages/contentsPage/contentsPage"
import { NoteNames2 } from "./pages/noteNames/noteNames2"
import { MainLayoutWithContext } from "./layouts/mainLayoutWithContext"



export const RouteConfig = () => {
    return (
        <Routes>
            <Route path="/" element={<MainLayoutWithContext />}>
                <Route path="/contents-page" element={<ContentsPage />} />
                <Route path="/note-names" element={<NoteNames />} />
                <Route path="/note-names-2" element={<NoteNames2 />} />
            </Route>
        </Routes>
    )
}