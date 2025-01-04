
import { Container, Row, Col, Button, Image } from 'react-bootstrap';

const Home = () => {

    return (
        <div className="bg-light text-center py-5">
            <Container>
                <Row className="align-items-center">
                    <Col md={6}>
                        <h1 className="display-4">Fast & Secure Online Payments</h1>
                        <p className="lead">
                            Experience seamless transactions with PayEase. Whether you're a small business 
                            or an enterprise, our platform offers the tools you need to manage payments effortlessly.
                        </p>
                        <ul className="list-unstyled">
                            <li> -Easy integration with your website or app</li>
                            <li> -Accept payments globally in multiple currencies</li>
                            <li> -Real-time transaction monitoring and analytics</li>
                        </ul>



                    </Col>
                    <Col md={6}>
                        <Image src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fm.economictimes.com%2Findustry%2Fbanking%2Ffinance%2Fbanking%2Flarge-corporates-will-never-be-allowed-to-open-a-bank-in-india-n-vaghul%2Farticleshow%2F99905781.cms&psig=AOvVaw1Th9-eumXqUDqJK6ICOSe-&ust=1736072303443000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCMjwkr7r24oDFQAAAAAdAAAAABAE" alt="Online payment illustration" fluid />
                    </Col>
                </Row>
            </Container>
        </div>
    );
    };
export default Home;