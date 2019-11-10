import React from 'react';
import { Row, Col } from 'antd';
import GGEditor, { Flow } from 'gg-editor';
import EditorMinimap from '../components/Minimap';
import ContextMenu from '../components/ContextMenu';
import Toolbar from '../components/Toolbar';
import ItemPanel from '../components/ItemPanel';
import DetailPanel from '../components/DetailPanel';
import styles from './index.less';

const FlowPage = () => {
    return (
        <GGEditor className={styles.editor}>
            <Row type="flex" className={styles.editorHd}>
                <Col span={24}>
                    <Toolbar />
                </Col>
            </Row>
            <Row type="flex" className={styles.editorBd}>
                <Col span={4} className={styles.editorSidebar}>
                    <ItemPanel />
                </Col>
                <Col span={16} className={styles.editorContent}>
                    <Flow className={styles.flow} />
                </Col>
                <Col span={4} className={styles.editorSidebar}>
                    <DetailPanel />
                    <EditorMinimap />
                </Col>
            </Row>
            <ContextMenu />
        </GGEditor>
    );
};

export default FlowPage;
