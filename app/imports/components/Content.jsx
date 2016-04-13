'use strict';

import React from 'react';
import c from 'classnames';

export default class Content extends React.Component {
    render() {
        return <div className="pa-Content">{this.props.children}</div>;
    }
}

Content.Text = class ContentText extends React.Component {
    render() {
        return <div className="pa-Content__text">{this.props.children}</div>;
    }
};

Content.Block = class ContentBlock extends React.Component {
    render() {
        return <div className="pa-Content__block">{this.props.children}</div>;
    }
};
