import React, {Component} from "react";

export default class Error extends Component {
    render() {
        return (<>
                <div style={{display: 'grid', placeItems: 'center' , height: '80vh'}}> 
                    <h1 style={{height: 'auto', fontSize: '20rem', WebkitTextStrokeColor: 'black', WebkitTextStrokeWidth: '10px', color: 'white'}}> 404 </h1>
                </div>
            </>)
    }
}