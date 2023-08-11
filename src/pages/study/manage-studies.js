import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ManageStudies() {
    const [plans, setPlans] = useState([]);

    useEffect(() => {
        const plans = JSON.parse(localStorage.getItem("plans"));

        setPlans(plans);
    }, []);

    const deletePlan = (id) => {
        const newPlans = plans.filter((p) => parseInt(p.id) !== parseInt(id));

        localStorage.setItem("plans", JSON.stringify(newPlans));

        setPlans(newPlans);
    };

    return (
        <div className="container mx-auto my-5">
            <div className="d-flex justify-content-between align-items-center mb-2">
                <h1 className="h1">Manage Study Planner</h1>
                <div className="text-end">
                    <Link
                        to="/manage-studies-add"
                        className="btn btn-primary btn-sm"
                    >
                        Add New Study
                    </Link>
                </div>
            </div>
            <div className="card mb-2 p-4">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Title</th>
                            <th scope="col">Content</th>
                            <th scope="col">Start Time</th>
                            <th scope="col">End Time</th>
                            <th scope="col">Date</th>
                            <th scope="col" className="text-end">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {plans
                            ? plans.map((plan) => {
                                  return (
                                      <tr key={plan.id}>
                                          <td>{plan.title}</td>
                                          <td
                                              dangerouslySetInnerHTML={{
                                                  __html: plan.content,
                                              }}
                                          />
                                          <td>{plan.startTime}</td>
                                          <td>{plan.endTime}</td>
                                          <td>{plan.date.slice(0, 10)}</td>
                                          <td className="text-end">
                                              <div className="buttons">
                                                  {/* <Link
                            to="/"
                            target="_blank"
                            className="btn btn-primary btn-sm me-2 disabled"
                          >
                            <i className="bi bi-eye"></i>
                          </Link> */}
                                                  <Link
                                                      to={`/manage-studies-edit/${plan.id}`}
                                                      className="btn btn-secondary btn-sm me-2"
                                                  >
                                                      <i className="bi bi-pencil"></i>
                                                  </Link>
                                                  <button
                                                      className="btn btn-danger btn-sm"
                                                      onClick={() => {
                                                          deletePlan(plan.id);
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
            <div className="text-center">
                <Link to="/dashboard" className="btn btn-link btn-sm">
                    <i className="bi bi-arrow-left"></i> Back to Dashboard
                </Link>
            </div>
        </div>
    );
}
