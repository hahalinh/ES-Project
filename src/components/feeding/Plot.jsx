import React from 'react'
import Button from '../Button';

function Plot({ setPlot, data }) {

    return (
        <div className="plot">
            <p>Nest: {data}</p>
            <div className="plot-bt">
                <Button handleData={setPlot} value="Outside Plot" />
                <Button handleData={setPlot} value="Inside  Plot" />
            </div>
        </div>
    )
}

export default Plot
