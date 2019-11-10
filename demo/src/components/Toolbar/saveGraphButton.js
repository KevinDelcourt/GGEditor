import React from 'react';
import ToolbarButton from './ToolbarButton';
import { withPropsAPI } from 'gg-editor';
import { save } from 'save-file'

class SaveGraphButton extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            disabled: false
        }
    }

    saveGraph(graphName, disabled, APIsave) {
        if (!disabled) {
            this.setState({ disabled: true }, async () => {
                const data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(APIsave()))
                await save(data, graphName + ".json")
                this.setState({ disabled: false })
            })
        }
    }

    save = () => this.saveGraph(this.props.graphNameAPI.get(), this.state.disabled, this.props.propsAPI.save)

    render = () => <ToolbarButton disabled={this.state.disabled} onClick={this.save} icon="save" text="Save" />
}

export default withPropsAPI(SaveGraphButton)