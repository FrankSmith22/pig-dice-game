import loading from "../assets/images/loading.gif"

const Loading = ({ pxSize }) => {
    return <img width="auto" height={`${pxSize}px`} src={loading} />
}

export default Loading