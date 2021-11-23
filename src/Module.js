import React, { Component } from 'react';
import './Module.css';

class Module extends Component {

    constructor() {
        super();
        
        this.state = {};

        this.startDrag = this.startDrag.bind(this);
        this.endDrag = this.endDrag.bind(this);
        this.drag = this.drag.bind(this);
    }

    componentDidMount() {
        window.addEventListener("mousemove", this.drag);
        window.addEventListener("mouseup", this.endDrag);
    }

    componentWillUnmount() {
        window.removeEventListener("mousemove", this.drag);
        window.removeEventListener("mouseup", this.endDrag);
    }

    startDrag(e) {
        if (e.shiftKey === false) {
            this.setState({
                lastDragX: e.clientX,
                lastDragY: e.clientY,
                dragging: true
            });
        }
    }

    endDrag() {
        this.setState({ 
            lastDragX: null,
            lastDragY: null,
            dragging: false
        })
    }

    drag(e) {
        if (this.state.dragging) {
            const dx = e.clientX - this.state.lastDragX;
            const dy = e.clientY - this.state.lastDragY;

            const x = this.props.module.x + dx;
            const y = this.props.module.y + dy;
            
            this.setState({
                lastDragX: e.clientX,
                lastDragY: e.clientY
            })

            this.props.updatePosition( {x, y} )
        }
    }

    render () {
        const props = this.props;
        const classes = ["module"]
        if (this.state.dragging) {
            classes.push("isDragging");
        }
        return (
            <div
                className={classes.join(' ')}
                title={ `id ${props.module.id}` }
                onMouseDown={this.startDrag}
                style={{
                    left: props.module.x + "px",
                    top:  props.module.y + "px"
                }}
                >
                {props.module.type}
            </div>
        );
    }
}

export default Module;