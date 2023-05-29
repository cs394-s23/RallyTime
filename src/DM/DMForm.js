import { useFormik } from "formik"
import { db, storage, fbapp } from "../Firebase.js"
import { addDoc, collection, updateDoc, doc, getDoc } from "firebase/firestore"
import Form from 'react-bootstrap/Form';
import { useAuth } from '../Firebase';
import Navbar from "../Dashboard/Navbar.js";
import { useEffect, useState } from "react";
import { getAuth, getUsers } from "firebase/auth";

function DMForm({ fanclubID, fanclubData }) {

    const [members, setMembers] = useState([])
    const [showModal, setShowModal] = useState(false);
    const user = useAuth();

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    async function submitForm(data) {
        const uid = await user.uid
        const displayName = await user.displayName
        const currUser = {
            uid: uid,
            displayName: displayName
        }
        const firstMessage = {
            content: data.messages,
            userID: uid,
            userName: displayName
        }
        data.members.push(currUser)
        data.messages = [firstMessage]
        const chatRef = await addDoc(collection(db, 'chat'), data);
        const fanclubRef = doc(db, 'fanclub', fanclubID)
        const fanclubSnapshot = await getDoc(fanclubRef)
        await updateDoc(fanclubRef, { direct_messages: [...fanclubSnapshot.data().direct_messages, chatRef.id]})
        console.log(fanclubSnapshot.data())
        // return chatRef.id;
    };

    const loadUsers = () => {
        setMembers(fanclubData.members)
    };


    useEffect(() => {
        loadUsers()
    }, [fanclubData])

    const ClubForm = () => {
        const formik = useFormik({
            initialValues: {
                members: [],
                messages: "",
            },
            onSubmit: async (values) => {
                await submitForm(values);
            },
        });

        const handleCheckboxChange = (event) => {
            const { value, checked } = event.target;

            // Get the member object associated with the checkbox
            const member = members.find((m) => m.uid === value);

            // Update the members array based on checkbox selection
            if (checked) {
                formik.setFieldValue("members", [...formik.values.members, member]);
            } else {
                formik.setFieldValue(
                    "members",
                    formik.values.members.filter((m) => m.uid !== value)
                );
            }
        };

        return (
            <div>
                <button onClick={openModal}>Create a New Chatroom!</button>
                    {showModal && (
                        <div>
                            <div className="dm-content">
                                <span className="close" onClick={closeModal}>
                                &times;
                                </span>
                                <Form onSubmit={formik.handleSubmit}>
                                <Form.Label>First Message</Form.Label>
                                    <Form.Control
                                    id="first-message"
                                    name="messages"
                                    type="text"
                                    onChange={formik.handleChange}
                                    value={formik.values.messages}
                                />
                                <Form.Label>Select Members</Form.Label>
                                {members ? (
                                    members.map((member) => {
                                        // Skip current user
                                        if (member.uid === user.uid) {
                                            return null;
                                        }

                                        return (
                                            <div key={member.uid}>
                                                <Form.Check
                                                    type="checkbox"
                                                    id={member.uid}
                                                    name="members"
                                                    label={member.displayName}
                                                    value={member.uid} // Set value to user ID only
                                                    onChange={handleCheckboxChange} // Use custom handler
                                                    checked={formik.values.members.some((m) => m.uid === member.uid)} // Check if user ID exists in members array
                                                />
                                            </div>
                                        );
                                    })
                                ) : (
                                    <p>Loading all users...</p>
                                )}

                                <button className="bttn" type="submit">
                                    Submit
                                </button>
                            </Form>
                            </div>
                        </div>
                    )}
            </div>
        );
    };

    return (
        <div>
            {ClubForm()}
        </div>
    )
}

export default DMForm;