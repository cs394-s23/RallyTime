import { useFormik } from "formik"
import { db, storage, fbapp } from "../Firebase.js"
import { addDoc, collection } from "firebase/firestore"
import Form from 'react-bootstrap/Form';
import { useAuth } from '../Firebase';
import Navbar from "../Dashboard/Navbar.js";
import { useEffect, useState } from "react";
import { getAuth, getUsers } from "firebase/auth";

function DMForm({ fanclubData }) {
    
    const [users, setUsers] = useState([])
    const user = useAuth();

    async function submitForm(data) {
        const uid = await user.uid
        const displayName = await user.displayName
        const currUser = {
            uid: uid,
            displayName: displayName
        }
        data.members.push(currUser)
        let docRef = await addDoc(collection(db, 'chat'), data);
        return docRef.id;
    };
      
    const loadUsers = () => {
        // console.log(fanclubData)
        // Check if fanclubData.members exists and is an array
        if (fanclubData.members && Array.isArray(fanclubData.members)) {
            const userData = fanclubData.members.map((member) => {
                return { uid: member };
            });
            getAuth()
                .getUsers(userData)
                    .then(() => console.log('hi'))
                    .then((getUsersResult) => {
                        console.log('Successfully fetched user data:');
                        console.log(getUsersResult)
        
                        // console.log('Unable to find users corresponding to these identifiers:');
                        // getUsersResult.notFound.forEach((userIdentifier) => {
                        //     console.log(userIdentifier);
                        // });
                    })
                    .catch((error) => {
                        console.log('Error fetching user data:', error);
                    });
            }
    };
    

    useEffect(() => {
        loadUsers()
    }, [])
    
    const ClubForm = () => {
        const formik = useFormik({
            initialValues: {
                members: [],
                messages: []
            },
            onSubmit: async (values) => {
                await submitForm(values);
            }
        })

        return (
            <div id="wholeform">
                <h1>Create a New Chat!</h1>
                <Form onSubmit={formik.handleSubmit}>        
                    <Form.Label>First Message</Form.Label>
                    <Form.Control
                        id='first-message'
                        name='first-message'
                        type='text'
                        onChange={formik.handleChange}
                        value={formik.values.messages}
                    />

                    
                    <button className="bttn" type="submit">Submit</button>
                </Form>
            </div>
        )
    }

    return (
        <>
        <Navbar />
        <div>
            {ClubForm()}
        </div>
        </>
    )
}

export default DMForm;