import React, { Component } from 'react';
import './Graph.css';
import Module from './Module.js';

const throttle = (func, limit) => {
    let lastFunc;
    let lastRan;
    return function() {
        const context = this;
        const args = arguments;
        if (!lastRan) {
            func.apply(context, args)
            lastRan = Date.now();
        } else {
            clearTimeout(lastFunc);
            lastFunc = setTimeout(function() {
                if ((Date.now() - lastRan) >= limit) {
                    func.apply(context, args);
                    lastRan = Date.now();
                }
            }, limit - (Date.now() - lastRan));
        }
    }
}

class Graph extends Component {

    constructor() {
        super();
        this.state = {};
        this.graphRef = React.createRef();

        this.updateDimensions = throttle(this.updateDimensions.bind(this), 100);
    }

    updateModulePosition(m, newPos) {
        const { x,y } = newPos;
        m.x = x;
        m.y = y;

        this.forceUpdate();
    }

    updateDimensions() {
        this.setState({ 
            width: this.graphRef.current.offsetWidth,
            height: this.graphRef.current.offsetHeight
        });
    }

    componentDidMount() {
        this.updateDimensions();
        window.addEventListener('resize', this.updateDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateDimensions);
    }

    render() {
        const props = this.props;
        return (
            <div className="graph" ref={this.graphRef}>
                <div style={{position:"absolute", opacity:0.1, userSelect:"none"}}>{this.state.width} x {this.state.height}</div>
                <svg className="links">
                    { props.modules.map(m =>
                        m.links.map(l => 
                            <line key={m.id + "_linkid"} x1={m.cx()} y1={m.cy()} x2={l.cx()} y2={l.cy()} style={{ strokeWidth:"2px", stroke: "maroon" }} />
                        )
                    ) }
                </svg>
                { props.modules.map(m =>
                    <Module
                        key={ m.id }
                        module={ m }
                        updatePosition={ (newPos) => this.updateModulePosition(m, newPos) } />
                ) }
            </div>
        );
    }
}

export default Graph;