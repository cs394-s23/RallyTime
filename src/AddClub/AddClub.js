import {useFormik} from "formik"
import { db, storage, fbapp } from "../Firebase.js"
import { addDoc, collection } from "firebase/firestore"
import Form from 'react-bootstrap/Form';



function AddClub() {
    // const user = useAuth()


    async function submitForm(data) {

        let docRef = await addDoc(collection(db, 'fanclub'), data);
        return docRef.id;
    };
    
    const ClubForm = () => {
        const formik = useFormik({
            initialValues: {
                athlete: '',
                manager:'',
                description:'',
                group_messages: [],
                direct_messages: [],
                members: []
            },
            onSubmit: async (values) => {
                await submitForm(values);
            }
        })

        return (
            <Form onSubmit={formik.handleSubmit}>
                <Form.Label>Athlete</Form.Label>
                <Form.Control
                    id="athlete"
                    name="athlete"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.athlete}
                />

                <Form.Label>Manager</Form.Label>
                <Form.Control
                    id='manager'
                    name='manager'
                    type='text'
                    onChange={formik.handleChange}
                    value={formik.values.manager}
                />          

                <Form.Label>Description</Form.Label>
                <Form.Control
                    id='description'
                    name='description'
                    type='text'
                    onChange={formik.handleChange}
                    value={formik.values.description}
                />

                
                <button className="bttn" type="submit">Submit</button>
            </Form>
        )
    }

    return (
        <div>
            {ClubForm()}
        </div>
    )
}

export default AddClub;