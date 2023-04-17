import { Container } from "reactstrap";
import PlayerLabel from "./PlayerLabel";

const Main = () => {
    return (
        <Container>
            <PlayerLabel playerNames={["frank", "nicole"]}/>
        </Container>
    )
}

export default Main;