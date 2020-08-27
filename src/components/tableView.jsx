import React, { useEffect, useState } from 'react';

const TableView = (props) => {
    const [tableData, setTableData] = useState([])
    const [filter, setFilterData] = useState([])

    useEffect(() => {
        // setTableData(props.data)
        const tableData = props.data.map((item, index) => {
            return {
                date: item.date,
                min: getCelcius(item.min),
                max: getCelcius(item.max)
            }
        })
        setTableData(tableData);
        const filterData = tableData.reduce((acc, item) => {
            if (acc.indexOf(item.min) < 0) {
                acc.push(item.min)
            }
            return acc;
        }, [])
        setFilterData(filterData)

    }, [props])

    let onSort = () => {
        const sortedData = tableData.sort((item1, item2) => {
            return item2.max - item1.max
        })
        setTableData([...sortedData])
    }

    let handleFilter = ({ target }) => {
        const tableData = props.data.map((item, index) => {
            return {
                date: item.date,
                min: getCelcius(item.min),
                max: getCelcius(item.max)
            }
        })
        setTableData(tableData);
        let filterValue = target.value;
        if (filterValue) {
            const filterData = tableData.filter(item => {
                console.log(item.min)
                return item.min == filterValue;
            })
            setTableData([...filterData])
        } else {
            const tableData = props.data.map((item, index) => {
                return {
                    date: item.date,
                    min: getCelcius(item.min),
                    max: getCelcius(item.max)
                }
            })
            setTableData(tableData);
        }

    }

    return (
        <div>
            <div className="form-group m-2">
                <label>Filter by mininmum temperaturet</label>
                <select onChange={handleFilter} className="form-control" id="exampleFormControlSelect1">
                    <option></option>
                    {filter.map(item => {
                        return <option key={item} value={item}>{item}</option>
                    })}
                </select>
            </div>

            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">date</th>
                        <th scope="col">Min temp</th>
                        <th scope="col" style={{ cursor: "pointer" }} onClick={onSort}><a className="sort-by">Max temp</a></th>
                    </tr>
                </thead>
                <tbody>

                    {tableData.map((item, index) => {
                        return <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{item.date}</td>
                            <td>{item.min}</td>
                            <td>{item.max}</td>
                        </tr>
                    })}


                </tbody>
            </table>
        </div>
    );
}

export default TableView;

let getCelcius = (temp) => {
    return Math.floor(temp - 273.15)
}