import React from 'react';

function MoreInfo(props) {
    return <div>
        <button className="btn btn-secondary btn-sm ml-2" style={{ display: "block", left: 0 }} onClick={() => {
            window.location.reload()
        }}>Back</button>
        <div style={{ display: "flex", flexDirection: "column" }}>
            <div>
                Wind Speed: <span className="badge badge-primary">{props.wind.speed}</span>
                Wind Deg: <span className="badge badge-primary">{props.wind.deg}</span>
            </div>
            <diV>
                pressure :  <span className="badge badge-secondary">{props.pressure}</span>
            </diV>

            <div>
                Humidity :  <span className="badge badge-success">{props.humidity}</span>
            </div>


        </div>
    </div>
}
export default MoreInfo;