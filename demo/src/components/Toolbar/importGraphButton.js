import React from 'react';
import ToolbarButton from './ToolbarButton';
import { Upload } from 'antd';
import { withPropsAPI } from 'gg-editor';

class ImportGraphButton extends React.Component {
    constructor(props) {
        super(props)
    }

    onChange = (file) => {
        const read = this.props.propsAPI.read
        const fileReader = new FileReader();
        this.props.graphNameAPI.set(file.name.split('.')[0])
        fileReader.onload = function (event) {
            read(JSON.parse(decodeURIComponent(event.target.result.split(',')[1])))
        };
        fileReader.readAsText(file);
        return false;
    }

    render = () => <Upload accept=".json" beforeUpload={this.onChange} showUploadList={false}>
        <ToolbarButton icon="folder-open" text="Import" />
    </Upload>
}

export default withPropsAPI(ImportGraphButton)