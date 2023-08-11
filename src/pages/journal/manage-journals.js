import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { AiFillLock } from "react-icons/ai";

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
                            <th scope="col" width="30%">
                                Create Date{" "}
                            </th>
                            <th scope="col" width="20%">
                                Title
                            </th>
                            <th scope="col" width="35%">
                                Content
                            </th>
                            <th scope="col" className="text-end">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {journal
                            ? journal.map((jour) => {
                                  const {
                                      id,
                                      title,
                                      content,
                                      createDate,
                                      status,
                                  } = jour;
                                  return (
                                      <tr key={id}>
                                          <td> {createDate}</td>
                                          <td>{title}</td>
                                          {status === "private" ? (
                                              <td>
                                                  <h3>
                                                      <AiFillLock />
                                                  </h3>
                                              </td>
                                          ) : (
                                              <>
                                                  {content.length > 15 ? (
                                                      <td
                                                          dangerouslySetInnerHTML={{
                                                              __html:
                                                                  content.slice(
                                                                      0,
                                                                      15
                                                                  ) + "...",
                                                          }}
                                                      />
                                                  ) : (
                                                      <td
                                                          dangerouslySetInnerHTML={{
                                                              __html: content,
                                                          }}
                                                      />
                                                  )}
                                              </>
                                          )}
                                          <td className="text-end me-5">
                                              <Link
                                                  to={`/journalpost/${id}`}
                                                  className="btn btn-warning btn-sm me-2"
                                              >
                                                  See All
                                              </Link>
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
