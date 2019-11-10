import React from 'react';
import { Row, Col, Input, Card } from 'antd';
import GGEditor, { Flow } from 'gg-editor';
import ContextMenu from '../components/ContextMenu';
import Toolbar from '../components/Toolbar';
import ItemPanel from '../components/ItemPanel';
import DetailPanel from '../components/DetailPanel';
import styles from './index.less';

class FlowPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "MyGraph"
        }
    }

    graphNameAPI = {
        set: name => this.setState({ ...this.state, name: name }),
        get: () => this.state.name
    }

    render = () => <GGEditor className={styles.editor}>
        <Row type="flex" className={styles.editorHd}>
            <Col span={24}>
                <Toolbar graphNameAPI={this.graphNameAPI} />
            </Col>
        </Row>
        <Row type="flex" className={styles.editorBd}>
            <Col span={6} className={styles.editorSidebar}>
                <Card bordered={false} size="small">
                    <Input addonBefore="Name" value={this.state.name} onChange={(evt) => { this.graphNameAPI.set(evt.target.value) }} />
                </Card>
                <ItemPanel />
                <DetailPanel />
            </Col>
            <Col span={18} className={styles.editorContent}>
                <Flow className={styles.flow} />
            </Col>
        </Row>
        <ContextMenu />
    </GGEditor>
}

export default FlowPage;
