import React from 'react';
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Image from "react-bootstrap/Image";
import Packages from "./Packages";

const LandingPage = () => {
    const nav = useNavigate();
    const gotoLogin = () => {
        nav("/login");
    };

    return (
        <div>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container fluid>
                    <Navbar.Brand href="#">Charika Learners</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll"/>
                    <Navbar.Collapse id="navbarScroll" className='w-full items-end justify-end'>
                        <Nav className="my-2 my-lg-20 gap-x-4" navbarScroll>
                            <Nav.Link href="#home">Home</Nav.Link>
                            <Nav.Link href="#packages">Packages</Nav.Link>
                            <Nav.Link href="#about">About Us</Nav.Link>
                            <Nav.Link href="#contact">Contact</Nav.Link>
                        </Nav>
                        <Button variant="outline-success" className='ml-4' onClick={gotoLogin}>Login</Button>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            {/* Home Section */}
            <section id="home" className="bg-gray-100 py-16">
                <Container>
                    <div className="flex flex-col md:flex-row items-center justify-around">
                        <div className="text-left md:text-left text-4xl font-semibold mb-4 md:mb-0">
                            <div className="text-green-500">12 Years of Excellence</div>
                            <div>in Driver Education</div>
                            <div>for a Safer Tomorrow</div>
                        </div>
                        <div className="flex justify-center md:justify-end">
                            <Image src="/clipart.jpeg" alt="Driving Education"
                                   className="w-80 h-full rounded-md shadow-md"/>
                        </div>
                    </div>
                    <div className="text-center mt-8">
                        <h2 className="text-2xl font-semibold mb-4">Why Choose Us?</h2>
                        <p className="text-lg text-gray-700 mb-4">At Charika Learners, we stand out as a premier driving
                            school for several reasons:</p>
                        <ul className="text-left text-gray-700 mb-4">
                            <li><strong>Experienced Instructors:</strong> Our team boasts years of experience in driver
                                education, ensuring that you receive top-notch instruction.
                            </li>
                            <li><strong>Comprehensive Curriculum:</strong> Our curriculum covers all aspects of safe
                                driving, including defensive driving techniques and road etiquette.
                            </li>
                            <li><strong>State-of-the-Art Facilities:</strong> We provide modern facilities equipped with
                                the latest technology to enhance your learning experience.
                            </li>
                            <li><strong>Flexible Scheduling:</strong> We offer flexible scheduling options to
                                accommodate your busy lifestyle, with both weekday and weekend classes available.
                            </li>
                            <li><strong>Personalized Instruction:</strong> We understand that every learner is unique,
                                which is why we tailor our instruction to suit your individual needs and learning style.
                            </li>
                        </ul>
                        <p className="text-lg text-gray-700 mb-4">Whether you're a novice driver looking to obtain your
                            learner's permit or seeking advanced training, Charika Learners is here to guide you every
                            step of the way.</p>
                    </div>

                </Container>
            </section>


            <section id="packages" className="py-16">
                <Container>
                    <h2 className="text-3xl font-semibold mb-8">Our Packages</h2>
                    <Packages />
                </Container>
            </section>

            {/* About Us Section */}
            <section id="about" className="bg-gray-100 py-16">
                <Container>
                    <h2 className="text-3xl font-semibold mb-8">About Us</h2>
                    <p className="text-lg text-gray-700 mb-4">At Charika Learners, we are passionate about equipping
                        individuals with the knowledge and skills to become safe and confident drivers. Our driving
                        school has been serving the community for over a decade, and we take pride in our commitment to
                        excellence.</p>
                    <p className="text-lg text-gray-700 mb-4">Our mission is to provide comprehensive driver education
                        programs that prioritize safety, responsibility, and professionalism. We believe that quality
                        instruction is the foundation of safe driving habits, and we strive to empower our students with
                        the knowledge and confidence they need to navigate the roads safely.</p>
                    <p className="text-lg text-gray-700 mb-4">What sets us apart is our team of experienced instructors
                        who are dedicated to ensuring that each student receives personalized attention and guidance. We
                        understand that learning to drive can be both exciting and daunting, which is why we create a
                        supportive and encouraging environment for our students to learn and grow.</p>
                    <p className="text-lg text-gray-700 mb-4">In addition to our commitment to excellence in driver
                        education, we are also deeply involved in our community. We actively participate in road safety
                        initiatives, collaborate with local organizations, and advocate for safer roads for
                        everyone.</p>
                    <p className="text-lg text-gray-700 mb-4">Whether you're a new driver embarking on your driving
                        journey or seeking to enhance your driving skills, Charika Learners is here to help you achieve
                        your goals. Join us today and experience the difference!</p>
                </Container>
            </section>


            {/* Contact Us Section */}
            <section id="contact" className="py-16">
                <Container>
                    <h2 className="text-3xl font-semibold mb-8">Contact Us</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-xl font-semibold mb-4">Visit Our Office</h3>
                            <p className="text-lg text-gray-700 mb-4">123 Main Street</p>
                            <p className="text-lg text-gray-700 mb-4">City, State ZIP Code</p>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
                            <p className="text-lg text-gray-700 mb-4">Phone: (123) 456-7890</p>
                            <p className="text-lg text-gray-700 mb-4">Email: info@charikadrivered.com</p>
                        </div>
                    </div>
                </Container>
            </section>

        </div>
    );
};

export default LandingPage;
