'use strict';

import React from 'react';
import c from 'classnames';

export default class Form extends React.Component {
    render() {
        return (
            <form className={c('pa-Form')} onSubmit={this.onSubmit.bind(this)}>
                {this.props.children}
            </form>
        );
    }

    onSubmit(event) {
        event.preventDefault();

        if (this.props.onSubmit) {
            this.props.onSubmit(event);
        }
    }
}

Form.propTypes = {
    onSubmit: React.PropTypes.func
};

Form.Footer = class FormFooter extends React.Component {
    render() {
        return <footer className="pa-Form__footer">{this.props.children}</footer>;
    }
};

Form.Footer.Submit = class FormFooterSubmit extends React.Component {
    render() {
        return <div className="pa-Form__footer__submit">{this.props.children}</div>;
    }
};

Form.Footer.Action = class FormFooterAction extends React.Component {
    render() {
        return <div className="pa-Form__footer__action">{this.props.children}</div>;
    }
};
