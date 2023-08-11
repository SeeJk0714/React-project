import { Link, useParams } from "react-router-dom";

export default function Post() {
    const { id } = useParams();
    const journals = JSON.parse(localStorage.getItem("journal"));
    let journal = null;
    if (journals) {
        // use .find to find the post with the provided id
        journal = journals.find((p) => parseInt(p.id) === parseInt(id));
    }
    if (!journal) return "Post no found";

    const { title, content, date } = journal;
    return (
        <div className="container mx-auto my-5">
            <h1 className="h1 mb-4 text-center">{title}</h1>
            <p>{date}</p>
            <div dangerouslySetInnerHTML={{ __html: content }} />
            <div className="text-center mt-3">
                <Link to="/" className="btn btn-link btn-sm">
                    <i className="bi bi-arrow-left"></i> Back
                </Link>
            </div>
        </div>
    );
}
