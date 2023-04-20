import dieFaces from "../assets/die_faces.png";
import { Row, Col } from 'reactstrap';

const DieFace = ({ faceNum }) => {

    const availablefaces = [ 1, 2, 3, 4, 5, 6 ]

    if(!(faceNum in availablefaces)){
        console.log("Invalid face number")
    }

    return (
        <Row className="text-center">
            <Col xs="3" className="mx-auto">
                <img
                src={dieFaces}
                height="150px"
                width="150px"
                style={{objectPosition: "left top", objectFit: "none"}}
                />
            </Col>
        </Row>
    )
}

export default DieFace;