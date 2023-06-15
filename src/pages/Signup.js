import React, { useState } from 'react';
import { Col, Container, Row, Button, Form } from 'react-bootstrap';
import { useSignupUserMutation } from "../services/appApi"
import { Link, useNavigate } from 'react-router-dom';
import "./Signup.css";
import ProfileIcon from "../images/profile_icon.png";



export default function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState("");
    const navigate = useNavigate();
    const [signupUser, isLoading, error] = useSignupUserMutation();

    // image upload
    const [img, setImg] = useState(null);
    const [uploadingImg, setUploadingImg] = useState(false);
    const [imgPreview, setImgPreview] = useState(null);

    
    function validateImg(e) {
        const file = e.target.files[0];
        if (file.size >= 1048576) {
            return alert("Max file size is 1mb");
        } else {
            setImg(file);
            setImgPreview(URL.createObjectURL(file));
        }

    }

    async function uploadImage() {
        const data = new FormData();
        data.append("file", img)
        data.append("upload_preset","chatmania");
        try {
            setUploadingImg(true);
            let res = await fetch('http://api.cloudinary.com/v1_1/illwill/image/upload', {
                method: 'post',
                body: data
            })
            const urlData = await res.json();
            setUploadingImg(false);
            return urlData.url
        } catch (error) {
            setUploadingImg(false);
            console.log(error);
        }
    }

    async function handleSignup(e) {
        e.preventDefault();
        if(!img) return alert("Please upload your profile picture!");
        const url = await uploadImage(img);
        console.log(url);
        // signup the user
        signupUser({name, email, password, picture: url}).then(({ data }) => {
            if (data) {
                console.log(data);
                navigate("/chat");
            }
        })

        

    }

  return (
    <Container>
        <Row>
             <Col md ={7} className = "login_bg2">
                <Form style={{width: "80%", maxWidth: 500}} onSubmit ={handleSignup}>
                    <h1 className ="text-center">Create account</h1>
                    <div className = "signup_profile_pic_container">
                        <img src={imgPreview || ProfileIcon} className="signup_profile_pic" />
                        <label htmlFor ="image-upload" className = "image_upload_label">
                            <i className = "fas fa-plus-circle add_picture_icon"></i>
                        </label>
                        <input type = "file" id ="image-upload" hidden accept = "image/png, image/jpeg, image/jpg" onChange={validateImg} />
                    </div>
                     <Form.Group className="mb-3" controlId="formBasicName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter name" onChange= {(e) => setName(e.target.value)} value={name} />
                        <Form.Text className="text-muted">
                
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" onChange= {(e) => setEmail(e.target.value)} value={email} />
                        <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" onChange= {(e) => setPassword(e.target.value)} value={password} />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                       {uploadingImg ? "Signing you up..." : "Signup"}
                    </Button>
                    <div className='py_4'>
                        <p className='text-center'>
                            Already have an account? <Link to="/login">Login</Link>
                        </p>
                    </div>
                </Form>
            </Col>
            <Col md ={5} className = "signup_bg"></Col>
        </Row>
    </Container>
  )
}
