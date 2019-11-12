import React from 'react';
import { withPropsAPI } from 'gg-editor';
import { Modal, Table, Card } from 'antd';
import ToolBarButton from './ToolbarButton';

const edgeRegex = /^([^\n]*)\/(.*)\n-+\n((.|\n)*)$/
const EVT = 1;
const CND = 2;
const ACT = 3;

class CodeGeneration extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showModal: false,
            content: ""
        }
    }

    stateFormat = label => label.toUpperCase().trim().replace(/ /g, '_')

    getEventList = (edges) => {
        let evts = []

        if (edges)
            edges.filter(edge => edge.label).forEach(edge => {
                let evt = edgeRegex.exec(edge.label)[1].trim()
                if (evt && !evts.includes(evt)) {
                    evts.push(evt)
                }
            });
        evts.sort()
        return evts
    }

    getFromEdge = (edge, id) => {
        if (edge.label)
            return edgeRegex.exec(edge.label)[id].trim()
        return ""
    }

    separator = name => "\n============================\n" + name + "\n============================\n"

    generateEventHandlersCode = (nodes, edges) => {
        let code = ""
        let evts = this.getEventList(edges)
        evts.forEach(evt => {
            code += this.separator(evt);
            code += "switch(this.state) {\n"
            nodes.filter(node => node.size !== "30*30").forEach(node => {
                code += "case " + this.stateFormat(node.label) + ":\n"
                let edgesPerNodeAndEvt = edges.filter(edge => edge.source === node.id && this.getFromEdge(edge, EVT) === evt)

                if (edgesPerNodeAndEvt.length == 0) {
                    code += "//INTERDIT\n"
                } else edgesPerNodeAndEvt.forEach(edge => {
                    if (this.getFromEdge(edge, CND))
                        code += "if(" + this.getFromEdge(edge, CND) + "){\n"
                    code += "etat = " + this.stateFormat(nodes.find(node => node.id === edge.target).label) + ";\n"
                    code += this.getFromEdge(edge, ACT)
                    if (this.getFromEdge(edge, CND))
                        code += "\n}\n"
                })
                code += "break;\n"
            })
            code += "\n"
        })
        return code;
    }

    generateStateEnumCode = nodes => {
        let enumText = "\npublic enum State {\n"
        nodes.filter(node => node.size !== "30*30").forEach(node => {
            enumText += this.stateFormat(node.label) + ',\n'
        })
        enumText.substring(0, enumText.length - 3)
        enumText += "\n}\n"
        return enumText
    }

    generateConstructorCode = (nodes, edges) => {
        let code = "";
        if (edges && nodes) {
            let firstEdge = edges.find(edge => edge.source === nodes.find(node => node.size === "30*30").id)
            code += "etat = " + this.stateFormat(nodes.find(node => node.id === firstEdge.target).label) + ";\n"
            code += this.getFromEdge(firstEdge, ACT);
        }
        return code;
    }

    generateCode = () => {
        const { edges, nodes } = this.props.propsAPI.save();
        let content = ""
        content += this.separator("enum State.java")
        content += this.generateStateEnumCode(nodes)
        content += this.separator("constructor")
        content += this.generateConstructorCode(nodes, edges)
        content += this.generateEventHandlersCode(nodes, edges)
        this.setState({ ...this.state, showModal: true, content: content })
    }

    closeModal = () => {
        this.setState({ ...this.state, showModal: false })
    }

    render = () => <React.Fragment>
        <ToolBarButton onClick={this.generateCode} icon="code" text="Generate Code" />
        <Modal width="80%" title="Generate Code" visible={this.state.showModal} onCancel={this.closeModal} footer={null}>
            <code style={{ whiteSpace: 'pre' }}>{this.state.content}</code>
        </Modal>
    </React.Fragment>
}

export default withPropsAPI(CodeGeneration)