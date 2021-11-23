import React from 'react';
import './Sidebar.css';

const nodes = ["OSC", "LPF", "BPF", "HPF"];

export default (props) => (
    <div className="sidebar">
        { nodes.map((i) =>
            <button key={i} className="item" onClick={() => props.onCreateModule(i)}>{i}</button>) 
        }
    </div>
);

