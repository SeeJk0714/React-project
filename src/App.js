import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";

import "./app.css";

import { AiOutlineFileSearch } from "react-icons/ai";

import Home from "./pages/home";
import Dashboard from "./pages/dashboard";
import JournalPost from "./pages/journalpost";
// import StudyPost from "./pages/studypost";
import Search from "./pages/search";
import ManageJournals from "./pages/journal/manage-journals";
import ManageJournalsAdd from "./pages/journal/manage-journals-add";
import ManageJournalsEdit from "./pages/journal/manage-journals-edit";
import ManageStudies from "./pages/study/manage-studies";
import ManageStudiesAdd from "./pages/study/manage-studies-add";
import ManageStudiesEdit from "./pages/study/manage-studies-edit";
import Study from "./pages/study";
import Journal from "./pages/journal";

function App() {
    return (
        <Router>
            <div style={({ height: "100vh" }, { display: "flex" })}>
                <Sidebar style={{ height: "100vh" }}>
                    <Menu>
                        <MenuItem style={{ textAlign: "center" }}>
                            {" "}
                            <h2>SJKC</h2>
                        </MenuItem>

                        <MenuItem component={<Link to="/" />}>Home</MenuItem>
                        <MenuItem component={<Link to="/study" />}>
                            Study
                        </MenuItem>
                        <MenuItem component={<Link to="/journal" />}>
                            Journal
                        </MenuItem>
                        <MenuItem component={<Link to="/dashboard" />}>
                            Dashboard
                        </MenuItem>
                    </Menu>
                </Sidebar>
                <div className="container">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/search" element={<Search />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route
                            path="/journalpost/:id"
                            element={<JournalPost />}
                        />
                        {/* <Route path="/studypost/:id" element={<StudyPost />} /> */}
                        <Route
                            path="/manage-journals"
                            element={<ManageJournals />}
                        />
                        <Route
                            path="/manage-journals-add"
                            element={<ManageJournalsAdd />}
                        />
                        <Route
                            path="/manage-journals-edit/:id"
                            element={<ManageJournalsEdit />}
                        />
                        <Route
                            path="/manage-studies"
                            element={<ManageStudies />}
                        />
                        <Route
                            path="/manage-studies-add"
                            element={<ManageStudiesAdd />}
                        />
                        <Route
                            path="/manage-studies-edit/:id"
                            element={<ManageStudiesEdit />}
                        />
                        <Route path="/study" element={<Study />} />
                        <Route path="/journal" element={<Journal />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
