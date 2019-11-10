import React from 'react';
import { withPropsAPI } from 'gg-editor';
import { Modal, Table, Card } from 'antd';
import ToolBarButton from './ToolbarButton';

const edgeRegex = /^([^\n]*)\/(.*)\n-+\n((.|\n)*)$/
const EVT = 1;
const CND = 2;
const ACT = 3;

class stateEventMatrix extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showModal: false,
            tableColumns: [],
            tableData: [],
            tableInit: ""
        }
    }

    stateFormat = label => label.toUpperCase().trim().replace(/ /g, '_')

    newColumn = (evt) => {
        return {
            title: evt,
            dataIndex: evt,
            key: evt,
            render: text => <code>{text}</code>
        }
    }

    getInitContent = (edges, nodes) => {
        let init = "";
        if (edges && nodes) {
            let firstEdge = edges.find(edge => edge.source === nodes.find(node => node.size === "30*30").id)
            init += "etat = " + this.stateFormat(nodes.find(node => node.id === firstEdge.target).label) + ";\n"
            init += this.getFromEdge(firstEdge, ACT);
        }
        return init;
    }

    getEventList = (edges) => {
        let evts = []
        let columns = [{
            title: "Etat",
            dataIndex: "state",
            key: "state",
        }]

        if (edges)
            edges.filter(edge => edge.label).forEach(edge => {
                let evt = edgeRegex.exec(edge.label)[1].trim()
                if (evt && !evts.includes(evt)) {
                    evts.push(evt)
                    columns.push(this.newColumn(evt))
                }
            });
        evts.sort()
        return { evts: evts, columns: columns }
    }

    getFromEdge = (edge, id) => {
        if (edge.label)
            return edgeRegex.exec(edge.label)[id].trim()
        return ""
    }

    buildMatrix = () => {
        const { edges, nodes } = this.props.propsAPI.save();
        let dataSource = []
        let { evts, columns } = this.getEventList(edges)
        nodes.filter(node => node.size !== "30*30").forEach(node => {
            let nodeData = {
                "key": node.id,
                "state": this.stateFormat(node.label)
            }
            evts.forEach(evt => {
                let edgesPerNodeAndEvt = edges.filter(edge => edge.source === node.id && this.getFromEdge(edge, EVT) === evt)
                let nodeString = "";
                if (edgesPerNodeAndEvt.length == 0) {
                    nodeString = "//INTERDIT"
                } else edgesPerNodeAndEvt.forEach(edge => {
                    if (this.getFromEdge(edge, CND))
                        nodeString += "if(" + this.getFromEdge(edge, CND) + "){\n"
                    nodeString += "etat = " + this.stateFormat(nodes.find(node => node.id === edge.target).label) + ";\n"
                    nodeString += this.getFromEdge(edge, ACT)
                    if (this.getFromEdge(edge, CND))
                        nodeString += "\n}\n"
                })
                nodeData[evt] = nodeString
            })
            dataSource.push(nodeData)
        })
        this.setState({ ...this.state, showModal: true, tableColumns: columns, tableData: dataSource, tableInit: this.getInitContent(edges, nodes) })
    }

    closeModal = () => {
        this.setState({ ...this.state, showModal: false })
    }

    render = () => <React.Fragment>
        <ToolBarButton onClick={this.buildMatrix} icon="table" text="State/Event Matrix" />
        <Modal width="80%" title="State/Event Matrix" visible={this.state.showModal} onCancel={this.closeModal} footer={null}>
            <Table style={{ whiteSpace: 'pre' }} columns={this.state.tableColumns} dataSource={this.state.tableData} pagination={false} />
            <Card style={{ whiteSpace: 'pre' }} bordered={false} size="small" title="Init"><code>{this.state.tableInit}</code></Card>
        </Modal>
    </React.Fragment>
}

export default withPropsAPI(stateEventMatrix)