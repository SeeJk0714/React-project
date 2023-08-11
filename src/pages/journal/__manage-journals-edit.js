import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { RichTextEditor, Link as EditorLink } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";
import Highlight from "@tiptap/extension-highlight";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
export default function ManagejournalsEdit() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [date, setDate] = useState("");
    const [status, setStatus] = useState("publish");
    const [password, setPassword] = useState("");
    // this will be called once when the page is loaded
    useEffect(() => {
        // 1. load all the journals from the local storage
        const journal = JSON.parse(localStorage.getItem("journal"));
        // 2. find the single journal with the provided id inside the journals array
        const journals = journal
            ? journal.find((j) => parseInt(j.id) === parseInt(id))
            : null;
        if (journals) {
            setTitle(journals.title);
            setContent(journals.content);
            setStatus(journals.status);
            setPassword(journals.password);
        }
    }, []); // empty array so that only trigger once when page is loaded
    const editor = useEditor(
        {
            extensions: [
                StarterKit,
                Underline,
                EditorLink,
                Highlight,
                TextAlign,
            ],
            content: content,
            onUpdate: ({ editor }) => {
                setContent(editor.getHTML());
            },
        },
        [content]
    );
    const editJournal = () => {
        // 1. load the journals from local storage
        const journal = JSON.parse(localStorage.getItem("journal"));
        // 2. use .map to modify the array
        const newJournal = journal.map((p) => {
            if (parseInt(p.id) === parseInt(id)) {
                p.title = title;
                p.content = content;
                p.status = status;
                p.password = password;
            }
            return p;
        });
        // 3. save the newjournals into the local storage
        localStorage.setItem("journal", JSON.stringify(newJournal));
        // 4. redirect back to /manage-journals
        navigate("/");
    };
    return (
        <div className="container mx-auto my-5">
            <div className="d-flex justify-content-between align-items-center mb-2">
                <h1 className="h1">Edit journals</h1>
            </div>
            <div className="card mb-2 p-4">
                <form
                    onSubmit={(event) => {
                        event.preventDefault();
                        editJournal();
                    }}
                >
                    <div className="mb-3">
                        <label for="journals-title" className="form-label">
                            Title
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="journals-title"
                            value={title}
                            onChange={(event) => setTitle(event.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label for="journals-content" className="form-label">
                            Content
                        </label>
                        <RichTextEditor editor={editor}>
                            <RichTextEditor.Toolbar sticky stickyOffset={60}>
                                <RichTextEditor.ControlsGroup>
                                    <RichTextEditor.Bold />
                                    <RichTextEditor.Italic />
                                    <RichTextEditor.Underline />
                                    <RichTextEditor.Strikethrough />
                                    <RichTextEditor.ClearFormatting />
                                    <RichTextEditor.Highlight />
                                    <RichTextEditor.Code />
                                    <RichTextEditor.H1 />
                                    <RichTextEditor.H2 />
                                    <RichTextEditor.H3 />
                                    <RichTextEditor.H4 />
                                    <RichTextEditor.Blockquote />
                                    <RichTextEditor.Hr />
                                    <RichTextEditor.BulletList />
                                    <RichTextEditor.OrderedList />
                                    <RichTextEditor.Link />
                                    <RichTextEditor.Unlink />
                                </RichTextEditor.ControlsGroup>
                            </RichTextEditor.Toolbar>
                            <RichTextEditor.Content />
                        </RichTextEditor>
                    </div>
                    <div className="mb-3">
                        <label for="journals-content" className="form-label">
                            Status
                        </label>
                        <select
                            className="form-control"
                            id="journals-status"
                            value={status}
                            onChange={(event) => {
                                setStatus(event.target.value);
                            }}
                        >
                            <option value="publish">Publish</option>
                            <option value="private">Private</option>
                        </select>
                    </div>
                    {status === "private" ? (
                        <div className="mb-3">
                            <label for="journals-title" className="form-label">
                                Password
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="journals-password"
                                value={password}
                                onChange={(event) =>
                                    setPassword(event.target.value)
                                }
                            />
                        </div>
                    ) : null}
                    <div className="text-end">
                        <button type="submit" className="btn btn-primary">
                            Edit
                        </button>
                    </div>
                </form>
            </div>
            <div className="text-center">
                <Link to="/manage-journals" className="btn btn-link btn-sm">
                    <i className="bi bi-arrow-left"></i> Back to journalss
                </Link>
            </div>
        </div>
    );
}
