export default (props) => {
    return (
        <div className="fqaCard">
            <h1>{props.q}</h1>
            <p>
                {props.children}
            </p>
        </div>
    )
}