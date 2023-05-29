import { useFormik } from "formik"
import { db, storage, fbapp } from "../Firebase.js"
import { addDoc, collection, updateDoc, doc, getDoc } from "firebase/firestore"
import Form from 'react-bootstrap/Form';
import { useAuth } from '../Firebase';
import Navbar from "../Dashboard/Navbar.js";
import { useEffect, useState } from "react";
import { getAuth, getUsers } from "firebase/auth";

function MemberForm({ fanclubID, fanclubData }) {

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
        const fanclubRef = doc(db, 'fanclub', fanclubID)
        const fanclubSnapshot = await getDoc(fanclubRef)
        const allMembers = new Set(fanclubSnapshot.data().members)
        data.members.forEach((memberToBeRemoved) => {
            for (let memberObj of allMembers) {
                if (memberObj.uid === memberToBeRemoved.uid) {
                    allMembers.delete(memberObj)
                    break;
                }
            }

        })
        await updateDoc(fanclubRef, { members: Array.from(allMembers) })
        console.log(fanclubSnapshot.data())
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
            !user || !members ? <p>Loading...</p>
                : user && fanclubData.manager && user.uid === fanclubData.manager.uid ?
                    <div>
                        <button onClick={openModal}>Members</button>
                        {showModal && (
                            <div>
                                <div className="dm-content">
                                    <span className="close" onClick={closeModal}>
                                        &times;
                                    </span>
                                    <Form onSubmit={formik.handleSubmit}>

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
                                            Remove
                                        </button>
                                    </Form>
                                </div>
                            </div>
                        )}
                    </div>
                    :
                    <div>
                        <button onClick={openModal}>Members</button>
                        {
                            showModal &&
                            <div>
                                <div className="dm-content">
                                    <span className="close" onClick={closeModal}>
                                        &times;
                                    </span>
                                    {

                                        members.map((member) => <p>{member.displayName}</p>)
                                    }
                                </div>
                            </div>
                        }


                    </div>


        );
    };

    return (
        <div>
            {ClubForm()}
        </div>
    )
}

export default MemberForm;