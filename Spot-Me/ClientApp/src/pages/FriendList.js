import React, {Component} from "react";
import {FriendSearch} from "../components/FriendSearch";
import '../assets/css/FriendList.css'
import {FriendStatusBlock} from "../components/FriendStatusBlock";
import { checkUserStatus } from "../assets/Util/Util";
export class FriendList extends Component {
    onComponentDidMount() {
        checkUserStatus();
    }
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
