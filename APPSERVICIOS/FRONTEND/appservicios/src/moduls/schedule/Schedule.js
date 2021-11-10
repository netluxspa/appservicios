import React from "react";
import FinderDisponibilidad from "../../models/disponibilidad/FinderDisponibilidad";
import ShowFinderParams from "../../models/disponibilidad/ShowFinderParams";
import ListDisponibilidad from "../../models/disponibilidad/ListDisponibilidad";



const Schedule = ({data, sendQueryParams, queryParams, clickHour, clickDisponibilidad}) => {

    return (
        <div>
            {
                queryParams && queryParams.oferente
                ?
                    <ShowFinderParams queryParams={queryParams} sendQueryParams={p=>sendQueryParams(p)} />
                :
                <div>
                    <FinderDisponibilidad queryParams={queryParams} sendQueryParams={o=>sendQueryParams(o)} />
                </div>
            }
            {
                data ?
                <div>
                    <hr />
                    <ListDisponibilidad data={data} clickHour={h=>clickHour(h)} clickDisponibilidad={d=>clickDisponibilidad(d)} />
                </div>
                :
                ''
            }
           
           
        </div>
    )
}

export default Schedule;