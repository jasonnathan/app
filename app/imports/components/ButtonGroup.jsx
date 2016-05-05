'use strict';

import React from 'react';
import c from 'classnames';

import Button from '/imports/components/Button';

const ButtonGroup = class ButtonGroup extends React.Component {
    render() {
        return (
            <div className={c('pa-ButtonGroup')}>
                {this.props.buttons.map((button, index) => (
                    <Button switch
                        switchActive={this.props.activeTab === button.key}
                        onClick={this.onClick.bind(this, button.key)}>
                        {button.label}
                    </Button>
                ))}
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
