import loading from "../assets/images/loading.gif"

const Loading = ({ pxSize }) => {
    return <img width="auto" height={`${pxSize}px`} src={loading} alt="loading" />
}

export default Loading