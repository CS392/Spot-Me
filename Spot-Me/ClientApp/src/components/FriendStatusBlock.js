import React, {Component} from "react";

export class FriendStatusBlock extends Component {
    blockHeader = this.props.header;
    render() {
        return (
            <section>
                <div className={'blockHeader'}>
                    <h4> {this.blockHeader} </h4>
                    <h4> 0 </h4>
                </div>
                <hr/>
            </section>
        )
    }
}
