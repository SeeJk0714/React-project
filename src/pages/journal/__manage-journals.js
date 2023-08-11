import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
export default function Home() {
    const [journal, setJournal] = useState([]);
    const { id } = useParams();
    const [password, setPassword] = useState("");
    const [visible, setVisible] = useState(false);
    const [showForm, setShowForm] = useState(true);
    useEffect(() => {
        // 1. get journal from local storage
        const journalData = JSON.parse(localStorage.getItem("journal"));
        // 2. dump it to journal state
        setJournal(journalData);
    }, []);

    if (!journal) return "Journal no found";
    const deleteJour = (id) => {
        // 1. use .filter to filter out the selected post
        const newJour = journal.filter((j) => parseInt(j.id) !== parseInt(id));
        // 2. update the newJour into the storage
        localStorage.setItem("journal", JSON.stringify(newJour));
        // 3. update the state
        setJournal(newJour);
    };

    const journalNew = JSON.parse(localStorage.getItem("journal"));
    let journalId = null;
    if (journalNew) {
        // use .find to find the post with the provided id
        journalId = journalNew.find((p) => parseInt(p.id) === parseInt(id));
    }
    const checkPassword = () => {
        if (password === journalId.password) {
            setVisible(true);
            setShowForm(false);
        } else {
            setVisible(false);
            setShowForm(true);
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
                            <th scope="col" width="40%">
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
                                  return (
                                      <tr key={jour.id}>
                                          <td>{jour.date}</td>
                                          <td>{jour.title}</td>
                                          <td>
                                              {jour.status === "private" ? (
                                                  <div>
                                                      {showForm ? (
                                                          <div>
                                                              <div className="mb-3">
                                                                  <label
                                                                      for="post-title"
                                                                      className="form-label"
                                                                  >
                                                                      Enter the
                                                                      Password
                                                                      to read
                                                                  </label>
                                                                  <input
                                                                      type="text"
                                                                      className="form-control"
                                                                      id="post-password"
                                                                      value={
                                                                          password
                                                                      }
                                                                      onChange={(
                                                                          event
                                                                      ) =>
                                                                          setPassword(
                                                                              event
                                                                                  .target
                                                                                  .value
                                                                          )
                                                                      }
                                                                  />
                                                              </div>
                                                              <button
                                                                  className="btn btn-primary btn-sm"
                                                                  onClick={(
                                                                      event
                                                                  ) => {
                                                                      event.preventDefault();
                                                                      checkPassword();
                                                                  }}
                                                              >
                                                                  Submit
                                                              </button>
                                                          </div>
                                                      ) : null}
                                                      {visible ? (
                                                          <td
                                                              dangerouslySetInnerHTML={{
                                                                  __html: jour.content,
                                                              }}
                                                          />
                                                      ) : null}
                                                  </div>
                                              ) : (
                                                  <td
                                                      dangerouslySetInnerHTML={{
                                                          __html: jour.content,
                                                      }}
                                                  />
                                              )}
                                          </td>

                                          <td className="text-end me-5">
                                              <div className="buttons">
                                                  <Link
                                                      to={`/manage-journals-edit/${jour.id}`}
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
                                              </div>
                                          </td>
                                      </tr>
                                  );
                              })
                            : null}
                    </tbody>
                </table>
            </div>
            <Link to="/dashboard" className="btn btn-link btn-sm">
                <i className="bi bi-arrow-left"> Go to Dashboard </i>
            </Link>
        </div>
    );
}
