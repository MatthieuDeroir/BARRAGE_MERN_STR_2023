import React from "react";

export default function PanelSelector(props) {
    // must return two checkboxes that return the panel number, 1 or 2 or 1 and 2
    // also if the checkbox is checked, it triggers the function in the parent component to update the state
    // the checkboxes must be aligned horizontally

    return (
        <div>
            <input type="checkbox" name="panel1" value="1" onChange={props.onChange} />
            <label htmlFor="panel1">Panneau 1</label>
            <input type="checkbox" name="panel2" value="2" onChange={props.onChange} />
            <label htmlFor="panel2">Panneau 2</label>
        </div>
    );
}