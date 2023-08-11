import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { CgDanger } from "react-icons/cg";
export default function StudyPost() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [password, setPassword] = useState("");
    const [visible, setVisible] = useState(false);
    const [showForm, setShowForm] = useState(true);
    const [journal, setJournal] = useState([]);

    useEffect(() => {
        const journal = JSON.parse(localStorage.getItem("journal"));

        setJournal(journal);
    }, []);
    // 1. load all the journals from the local storage
    const journals = JSON.parse(localStorage.getItem("journal"));
    // 2. find the single journal with the provided id inside the journals array
    // method 1
    let jour = null;
    if (journals) {
        // use .find to find the journal with the provided id
        jour = journals.find((p) => parseInt(p.id) === parseInt(id));
    }
    // method 2
    // const journal = journals
    //   ? journals.find((p) => parseInt(p.id) === parseInt(id))
    //   : null;
    // if journal is either undefined or null, return "journal not found" message
    if (!jour)
        return (
            <div
                style={{
                    fontSize: "50px",
                    display: "flex",
                    justifyContent: "center",
                    margin: "300px",
                    color: "grey",
                    opacity: "30%",
                }}
            >
                <h1>
                    Not Found
                    <CgDanger />
                </h1>
            </div>
        );
    const {
        title = "",
        content = "",
        createDate = "",
        status,
        updateDate = "",
    } = jour;
    const checkPassword = () => {
        if (password === jour.password) {
            setVisible(true);
            setShowForm(false);
        } else {
            setVisible(false);
            setShowForm(true);
        }
    };
    const deleteJour = (id) => {
        // 1. use .filter to filter out the selected post
        const newJour = journal.filter((j) => parseInt(j.id) !== parseInt(id));
        // 2. update the newJour into the storage
        localStorage.setItem("journal", JSON.stringify(newJour));
        // 3. update the state
        setJournal(newJour);
        navigate("/");
    };
    return (
        <div className="container mx-auto my-5">
            {status === "private" ? (
                <div>
                    {showForm ? (
                        <div className="text-end justify-content-center d-flex">
                            <div className="mb-2 text-center mt-5">
                                <label
                                    for="journal-title"
                                    className="form-label"
                                >
                                    Enter the Password to read the journal
                                </label>
                                <input
                                    type="password"
                                    className="form-control text-center mb-3 "
                                    id="journal-password"
                                    value={password}
                                    onChange={(event) =>
                                        setPassword(event.target.value)
                                    }
                                />{" "}
                                <button
                                    className="btn btn-primary btn-sm"
                                    onClick={(event) => {
                                        event.preventDefault();
                                        checkPassword();
                                    }}
                                >
                                    Submit Password
                                </button>
                            </div>
                        </div>
                    ) : null}
                    {visible ? (
                        <div>
                            <div className="buttons text-end mb-5">
                                Actions: <></>
                                <Link
                                    to={`/manage-journals-edit/${id}`}
                                    className="btn btn-secondary btn-sm me-2"
                                >
                                    <i className="bi bi-pencil"></i>
                                </Link>
                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => {
                                        deleteJour(id);
                                    }}
                                >
                                    <i className="bi bi-trash"></i>
                                </button>
                            </div>
                            <h1 className="h1 text-start">{title}</h1>
                            <hr></hr>
                            <div
                                dangerouslySetInnerHTML={{ __html: content }}
                            />
                            <p className="mt-5 pt-5 text-muted">
                                Create Date: {createDate}
                            </p>
                            <p className="mt-0  pt-0 text-muted">
                                Edit at: {updateDate === "" ? "-" : updateDate}
                            </p>
                        </div>
                    ) : null}
                </div>
            ) : (
                <div>
                    <div className="buttons text-end mb-3">
                        Actions: <></>
                        <Link
                            to={`/manage-journals-edit/${id}`}
                            className="btn btn-secondary btn-sm me-2"
                        >
                            <i className="bi bi-pencil"></i>
                        </Link>
                        <button
                            className="btn btn-danger btn-sm"
                            onClick={() => {
                                deleteJour(id);
                            }}
                        >
                            <i className="bi bi-trash"></i>
                        </button>
                    </div>
                    <h1 className="h1 text-start">{title}</h1>
                    <hr></hr>
                    <div dangerouslySetInnerHTML={{ __html: content }} />
                    <p className="mt-5 text-muted">Create Date: {createDate}</p>
                    <p className=" text-muted">
                        Edit at: {updateDate === "" ? "-" : updateDate}
                    </p>
                </div>
            )}
            <div className="text-center mt-5 ">
                <Link to="/" className="btn btn-link btn-sm">
                    <i className="bi bi-arrow-left"></i> Home
                </Link>
                <Link to="/manage-journals" className="btn btn-link btn-sm">
                    Manage Journal<i className="bi bi-arrow-right"></i>
                </Link>
            </div>
        </div>
    );
}
