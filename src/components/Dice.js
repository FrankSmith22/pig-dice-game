const Dice = ({ side }) => {

    let rotation = ""
    switch(side){
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

    return(
        <div className="dice mx-auto" style={ rotation ? {transform: rotation} : {}}>
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