import * as React from "react";
import 'antd/dist/antd.css';
import {Table} from 'antd';

export class MLSQLQueryDisplay extends React.Component {
    constructor(props) {
        super(props)
        this.state = {columns: [], rows: []}
    }

    setRender = (keyColumn, data) => {
        const value = data[0][keyColumn.key]
        console.log(typeof  value)
        if ((typeof value) === 'object') {
            keyColumn["render"] = value => <span>{JSON.stringify(value).substring(0, 300)}</span>
        }
        if ((typeof value) === 'array') {
            keyColumn["render"] = value => <span>{value.join(",").substring(0, 300)}</span>
        }
        if ((typeof value) === 'boolean') {
            keyColumn["render"] = value => <span>{value.toString()}</span>
        }
    }

    update = (data) => {
        // e.g. [{"a":1}]

        let keys = []
        let basket = {}
        let rows = []
        const self = this
        //collect all keys
        data.forEach(function (item) {
            for (let key in item) {
                if (!basket[key]) {
                    const keyColumn = {
                        title: key,
                        dataIndex: key,
                        key: key,
                    }
                    self.setRender(keyColumn, data)
                    keys.push(keyColumn)
                    basket[key] = true
                }
            }
        })

        // collect data
        data.forEach(function (item, index) {
            let new_item = {}
            keys.forEach(function (key) {
                new_item[key.key] = item[key.key]
            })
            new_item["key"] = index
            rows.push(new_item)
        })

        this.setState({columns: keys, data: rows})
    }

    render() {
        return (<div>
            <Table columns={this.state.columns} dataSource={this.state.data}/>
        </div>)
    }

}