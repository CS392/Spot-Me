import React, {Component} from "react";

export class FriendSearch extends Component {

    render() {
        return (
            <section style={{marginTop: '0px'}}>
                <h4> Search</h4>
                <input 
                    type={"text"}
                    placeholder={"Search for a Friend"}/>
            </section>
        );
    }
}
