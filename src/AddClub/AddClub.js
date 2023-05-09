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
                name: '',
                description:'',
                manager:''
            },
            onSubmit: async (values) => {
                await submitForm(values);
            }
        })

        return (
            <Form onSubmit={formik.handleSubmit}>
                <Form.Label>Name</Form.Label>
                <Form.Control
                    id="name"
                    name="name"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                />

                <Form.Label>Description</Form.Label>
                <Form.Control
                    id='description'
                    name='description'
                    type='text'
                    onChange={formik.handleChange}
                    value={formik.values.description}
                />

                <Form.Label>Manager</Form.Label>
                <Form.Control
                    id='manager'
                    name='manager'
                    type='text'
                    onChange={formik.handleChange}
                    value={formik.values.manager}
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