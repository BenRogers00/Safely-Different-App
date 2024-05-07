

function ExpertCards(props){

    return(
        <div className="border-4 border-purple-400 text-white my-2 mx-2 py-3 px-2 w-[250px] h-auto">
        <div style={{ display: 'flex', justifyContent: 'center' }}> {/* Centering the image */}
            <img src={props.images} alt="expert photos" style={{ width: '100px', height: 'auto' }} />
        </div>
        <h2>{props.name}</h2>
        <p className="overflow-hidden">{props.description}</p>
    </div>
    )
}

export default ExpertCards