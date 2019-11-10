import React from 'react';
import { Tooltip, Icon } from 'antd';
import { Command } from 'gg-editor';
import styles from './index.less';

const ToolbarCommand = () => {
    return (
        <Command name="clear">
            <Tooltip
                title="Clear"
                placement="bottom"
                overlayClassName={styles.tooltip}
            >
                <Icon type="fire" />
            </Tooltip>
        </Command>
    );
};

export default ToolbarCommand;
