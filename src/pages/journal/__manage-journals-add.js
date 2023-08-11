import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RichTextEditor, Link as EditorLink } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";
import Highlight from "@tiptap/extension-highlight";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import { notifications } from "@mantine/notifications";

export default function ManageJournalsAdd() {
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [date, setDate] = useState("");
    const dateFormat = (date) => {
        return new Date(date).toLocaleString();
    };
    const now = new Date();
    const createDate = dateFormat(now, "dddd, mmmm dS, yyyy, h:MM:ss TT");
    const editor = useEditor({
        extensions: [StarterKit, Underline, EditorLink, Highlight, TextAlign],
        content: content,
        onUpdate: ({ editor }) => {
            setContent(editor.getHTML());
        },
    });
    // const submitForm1 = (event) => {
    //     // 1. get the existing journal from the local storage
    //     let journal = JSON.parse(localStorage.getItem("journal"));
    //     /* 2. make sure the journal is not empty
    //       if journal is empty, then assign the default array to it
    //     */
    //     if (!journal) journal = []; // assign default value to the journal array
    //     // 3. push the new item into the journal array
    //     journal.push({
    //         id: Math.floor(Math.random() * 999999), // get random id
    //         title: title, // pass in the value from the title
    //         content: content, // pass in the value from the content
    //         date: createDate, // set the status to "review" as default value
    //     });
    //     // 4. save array into local storage
    //     localStorage.setItem("journal", JSON.stringify(journal));
    //     // 5. redirect back to /manage-journal
    //     navigate("/manage-journal");
    //     // Once the form is submitted and data is saved, navigate back to the main page
    //     navigate("/");
    // };
    const submitForm = () => {
        let journal = JSON.parse(localStorage.getItem("journal"));
        if (title && content && createDate) {
            journal.push({
                id: Math.floor(Math.random() * 999999),
                title: title,
                content: content,
                date: createDate,
                item: "journal",
            });
            localStorage.setItem("journal", JSON.stringify(journal));
            notifications.show({
                title: "Create succesful ",
                message: "Thank You!",
                color: "green",
            });
            navigate("/manage-journals");
        } else {
            notifications.show({
                title: "Please insert the value",
                message: "Thank You!",
                color: "red",
            });
        }
    };
    return (
        <div>
            <div className="container mx-auto my-5">
                <div className="d-flex justify-content-between align-items-center mb-2">
                    <h1 className="h1">Add New Journal</h1>
                </div>
                <div className="card mb-2 p-4">
                    <form
                        onSubmit={(event) => {
                            event.preventDefault();
                            submitForm();
                        }}
                    >
                        <div className="mb-3">
                            <label
                                htmlFor="journal-title"
                                className="form-label"
                            >
                                Title
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="journal-title"
                                value={title}
                                onChange={(event) => {
                                    setTitle(event.target.value);
                                }}
                            />
                        </div>
                        <div className="mb-3">
                            <label
                                htmlFor="journal-content"
                                className="form-label"
                            >
                                What you want to study
                            </label>
                            <RichTextEditor editor={editor}>
                                <RichTextEditor.Toolbar
                                    sticky
                                    stickyOffset={60}
                                >
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
                            <div className="mt-2">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="date-input"
                                    value={createDate}
                                    hidden
                                />
                            </div>
                            <input
                                type="text"
                                className="form-control"
                                id="journal-date"
                                value={date}
                                onChange={(event) => {
                                    setDate(event.target.value);
                                }}
                                hidden
                            />
                        </div>
                        <div className="text-end">
                            <button type="submit" className="btn btn-primary">
                                Add
                            </button>
                        </div>
                    </form>
                </div>
                <div className="text-center">
                    <Link to="/manage-journals" className="btn btn-link btn-sm">
                        <i className="bi bi-arrow-left"></i> Back to journal
                    </Link>
                </div>
            </div>
        </div>
    );
}
