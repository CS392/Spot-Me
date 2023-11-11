import React, {Component} from "react";
import {FriendSearch} from "../components/FriendSearch";
import '../assets/css/FriendList.css'
import {FriendStatusBlock} from "../components/FriendStatusBlock";
export class FriendList extends Component {

    render() {
        return (
            <section className={'friendList'}> 
                <FriendSearch/>
                <FriendStatusBlock 
                    header={"Suggestion"}/>
                <FriendStatusBlock
                    header={"Online"}/>
                <FriendStatusBlock
                    header={"Offline"}/>
            </section>
        );
    }
}
