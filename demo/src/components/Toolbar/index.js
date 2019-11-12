import React from 'react';
import { Divider } from 'antd';
import { Toolbar } from 'gg-editor';
import ToolbarCommand from './ToolbarCommand';
import StateEventMatrix from './stateEventMatrix';
import CodeGeneration from './codeGeneration';
import SaveGraphButton from './saveGraphButton';
import ImportGraphButton from './importGraphButton';
import ClearButton from './clearButton';
import styles from './index.less';

class FlowToolbar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            disabled: false
        }
    }

    render = () => <Toolbar className={styles.toolbar}>
        <ImportGraphButton graphNameAPI={this.props.graphNameAPI} />
        <SaveGraphButton graphNameAPI={this.props.graphNameAPI} />
        <Divider type="vertical" />
        <ToolbarCommand command="undo" />
        <ToolbarCommand command="redo" />
        <Divider type="vertical" />
        <ToolbarCommand command="copy" />
        <ToolbarCommand command="paste" />
        <ToolbarCommand command="delete" />
        <ClearButton />
        <Divider type="vertical" />
        <ToolbarCommand command="zoomIn" icon="zoom-in" text="Zoom In" />
        <ToolbarCommand command="zoomOut" icon="zoom-out" text="Zoom Out" />
        <ToolbarCommand command="autoZoom" icon="fit-map" text="Fit Map" />
        <ToolbarCommand command="resetZoom" icon="actual-size" text="Actual Size" />
        <Divider type="vertical" />
        <ToolbarCommand command="toBack" icon="to-back" text="To Back" />
        <ToolbarCommand command="toFront" icon="to-front" text="To Front" />
        <Divider type="vertical" />
        <ToolbarCommand command="multiSelect" icon="multi-select" text="Multi Select" />
        <ToolbarCommand command="addGroup" icon="group" text="Add Group" />
        <ToolbarCommand command="unGroup" icon="ungroup" text="Ungroup" />
        <Divider type="vertical" />
        <StateEventMatrix />
        <CodeGeneration />
    </Toolbar>
}

export default FlowToolbar;

