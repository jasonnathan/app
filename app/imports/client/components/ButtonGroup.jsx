'use strict';

import React from 'react';
import c from 'classnames';
import { findIndex } from 'mout/array';

import Button from '/imports/client/components/Button';

const ButtonGroup = class ButtonGroup extends React.Component {
    render() {
        const {buttons, activeTab} = this.props;

        const activeButtonIndex = findIndex(buttons, (button) => button.key === activeTab);
        const buttonWidth = `${100 / buttons.length}%`;
        const activeStateTransform = `translate3d(${activeButtonIndex * 100}%, 0, 0)`;

        return (
            <div className={c('pa-ButtonGroup')}>
                {buttons.map((button, index) => (
                    <Button key={index}
                        switch
                        switchActive={activeButtonIndex === index}
                        onClick={this.onClick.bind(this, button.key)}
                        style={{'width': buttonWidth}}>
                        {button.label}
                    </Button>
                ))}

                {activeButtonIndex > -1 &&
                    <span className="pa-ButtonGroup__active-state" style={{
                        width: buttonWidth,
                        WebkitTransform: activeStateTransform,
                        transform: activeStateTransform
                    }}></span>
                }
            </div>
        );
    }

    onClick(key) {
        this.props.onClick(key);
    }
};

ButtonGroup.propTypes = {
    buttons: React.PropTypes.array.isRequired,
    activeTab: React.PropTypes.string.isRequired,
    onClick: React.PropTypes.func.isRequired
};

export default ButtonGroup;
