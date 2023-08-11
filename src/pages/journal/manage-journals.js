import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export default function ManageJournals() {
    const [journal, setJournal] = useState([]);
    const { id } = useParams();
    const [password, setPassword] = useState("");
    const [input, setInput] = useState("");
    const [visible, setVisible] = useState(false);
    const [showForm, setShowForm] = useState(true);
    const [checkedList, setCheckedList] = useState([]);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    useEffect(() => {
        // 1. get journal from local storage
        const newJour = JSON.parse(localStorage.getItem("journal"));
        // 2. dump it to journal state
        setJournal(newJour);
    }, []);
    const deleteJour = (id) => {
        // 1. use .filter to filter out the selected post
        const newJour = journal.filter((j) => parseInt(j.id) !== parseInt(id));
        // 2. update the newJour into the storage
        localStorage.setItem("journal", JSON.stringify(newJour));
        // 3. update the state
        setJournal(newJour);
    };
    const checkPassword = (journal) => {
        if (password === journal.password) {
            setVisible(true);
            setShowForm(false);
        } else {
            setVisible(false);
            setShowForm(true);
        }
    };
    const checkboxOne = (event, id) => {
        // if is checked
        if (event.target.checked) {
            // 1. clone existing checked list
            const newCheckedList = [...checkedList];
            // 2. push new id into the checked list
            newCheckedList.push(id);
            // 3. update the state
            setCheckedList(newCheckedList);
        } else {
            // 1. remove the id from the checked list
            const newCheckedList = checkedList.filter((i) => i !== id);
            // 2. update the state
            setCheckedList(newCheckedList);
        }
    };
    return (
        <div className="container mx-auto my-5" style={{ maxWidth: "700px;" }}>
            <div className="d-flex justify-content-between align-items-center mb-2">
                <h1 className="h1">Manage Journals</h1>
                <div className="text-end">
                    <Link
                        to="/manage-journals-add"
                        className="btn btn-primary btn-sm"
                    >
                        Add New Journal
                    </Link>
                </div>
            </div>
            <div className="card mb-2 p-4">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col" width="15%">
                                Create Date{" "}
                            </th>
                            <th scope="col" width="35%">
                                Title
                            </th>
                            {/* <th scope="col" width="40%">
              Content
            </th> */}
                            <th scope="col" className="text-end">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {journal
                            ? journal.map((jour) => {
                                  return (
                                      <tr key={jour.id}>
                                          <td> {jour.date}</td>
                                          <td>{jour.title}</td>
                                          {/* {jour.status === "private" ? (
                      <div>
                        {showForm ? (
                          <div>
                            <div className="mb-3">
                              <label for="post-title" className="form-label">
                                Enter the Password to read
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="post-password"
                                value={input.password}
                                onChange={(event) =>
                                  setPassword(event.target.value)
                                }
                              />
                            </div>
                            <button
                              className="btn btn-primary btn-sm"
                              onClick={(event) => checkPassword(jour)}
                            >
                              Submit
                            </button>
                          </div>
                        ) : null}
                        {visible ? (
                          <td
                            dangerouslySetInnerHTML={{ __html: jour.content }}
                          />
                        ) : null}
                      </div>
                    ) : (
                      <td dangerouslySetInnerHTML={{ __html: jour.content }} />
                    )} */}
                                          <td className="text-end me-5">
                                              <Link
                                                  to={`/post/${jour.id}`}
                                                  className="btn btn-warning btn-sm me-2"
                                              >
                                                  See All
                                              </Link>
                                              {/* <div className="buttons">
                        <Link
                          to={`/edit-journal/${jour.id}`}
                          className="btn btn-secondary btn-sm me-2"
                        >
                          <i className="bi bi-pencil"></i>
                        </Link>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => {
                            deleteJour(jour.id);
                          }}
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                      </div> */}
                                          </td>
                                      </tr>
                                  );
                              })
                            : null}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
