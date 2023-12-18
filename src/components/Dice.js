import { useSelector } from "react-redux";
import { getLatestRoll } from "../features/game/gameSlice";

const Dice = ({ rollSameAsPrev, isGameActive }) => {

    const latestRoll = useSelector(getLatestRoll)

    let rotation = ""
    switch(latestRoll){
        case 1: rotation = 'rotateX(0deg) rotateY(0deg) rotateZ(0deg)'
                break;
        case 2: rotation = 'rotateX(0deg) rotateY(90deg) rotateZ(0deg)'
                break;
        case 3: rotation = 'rotateX(90deg) rotateY(0deg) rotateZ(0deg)'
                break;
        case 4: rotation = 'rotateX(-90deg) rotateY(0deg) rotateZ(0deg)'
                break;
        case 5: rotation = 'rotateX(90deg) rotateY(90deg) rotateZ(90deg)'
                break;
        case 6: rotation = 'rotateX(0deg) rotateY(180deg) rotateZ(0deg)'
                break;
        default: rotation = ''
                break;
    }
    
    const diceStyle = !!rollSameAsPrev ? {transform: rotation, animation: "bounce 0.5s cubic-bezier(0, 0.6, 0.58, 1)"}
        : !!rotation ? {transform: rotation}
        : !isGameActive ? {animation: "rotate 5s linear infinite"}
        : {animation: "settle 0.5s linear"}

    return(
        <div className="dice mx-auto" style={{...diceStyle}}>
            <div className="side one"/>
            <div className="side two"/>
            <div className="side three"/>
            <div className="side four"/>
            <div className="side five"/>
            <div className="side six"/>
        </div>
    )
}

/* Rotation CSS:
side 1: rotateX(0deg) rotateY(0deg) rotateZ(0deg)
side 2: rotateX(0deg) rotateY(90deg) rotateZ(0deg)
side 3: rotateX(90deg) rotateY(0deg) rotateZ(0deg)
side 4: rotateX(-90deg) rotateY(0deg) rotateZ(0deg)
side 5: rotateX(90deg) rotateY(90deg) rotateZ(90deg)
side 6: rotateX(0deg) rotateY(180deg) rotateZ(0deg)
*/
export default Dice