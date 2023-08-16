import { Route, Routes } from "react-router-dom"
import { NoteNames } from "./pages/noteNames/noteNames"
import { ContentsPage } from "./pages/contentsPage/contentsPage"
import { NoteNames2 } from "./pages/noteNames/noteNames2"



export const RouteConfig = () => {
    return (
        <Routes>
            <Route path="/" element={<ContentsPage/>}></Route>
            <Route path="/home"></Route>
            <Route path="/note-names" element={<NoteNames/>} />
            <Route path="/note-names-2" element={<NoteNames2/>} />
        </Routes>
    ) 
}