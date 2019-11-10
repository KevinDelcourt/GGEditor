import React from 'react';
import { Input } from 'antd';

const { TextArea } = Input;

class EvtCndActInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.value == "" ? "/\n------\n" : this.props.value
        };
    }

    render = () => {
        return <TextArea {...this.props} value={this.state.value} onChange={this.handleChange} rows={4} />
    }

    handleChange = (evt) => {
        if (evt.target.value.match(/^([^\n]*)\/(.*)\n-+\n((.|\n)*)$/) != null) {
            this.setState({
                value: evt.target.value
            });
            this.props.onChange(evt);
        }
    }
}

export default EvtCndActInput