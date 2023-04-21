import React, { useState } from 'react'
import Button from '../Button';

function Plot({ setPlot, data }) {
    const [plots, setPlots] = useState(["Outside Plot", "Inside  Plot"])

    return (
        <div className="plot">
            <p>Nest: {data}</p>
            <div className="plot-bt">
                {
                    plots.map((item, index) =>
                        <Button handleData={setPlot} value={item} key={index} />)
                }
            </div>
        </div>
    )
}

export default Plot
