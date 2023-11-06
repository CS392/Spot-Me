import React, {Component} from "react";

export class ExerciseCard extends Component {
    static description;
    static imageUrl;

    constructor(props) {
        super(props);
        ExerciseCard.description = this.props.desc;
        ExerciseCard.imageUrl = this.props?.imageUrl;
    }
    
    render() {
        return (
            <div>
                {/* Change this to image HTML tag */}
                {
                    ExerciseCard.imageUrl !== undefined &&
                    <p> {ExerciseCard.imageUrl} </p>
                }
                <p> {ExerciseCard.description} </p>
            </div>
        );
    }
}
