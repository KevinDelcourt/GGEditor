import React from 'react';
import { Tooltip, Icon } from 'antd';
import styles from './index.less';

const ToolbarButton = (props) => {
    const { onClick, icon, text } = props;
    if (!props.disabled)
        return (
            <div className="toolbarButton" onClick={onClick}>
                <Tooltip
                    title={text}
                    placement="bottom"
                    overlayClassName={styles.tooltip}
                >
                    <Icon type={icon} />
                </Tooltip>
            </div>
        )
    else
        return (
            <div className="toolbarButton">
                <Icon type="loading" />
            </div>
        )
};

export default ToolbarButton;