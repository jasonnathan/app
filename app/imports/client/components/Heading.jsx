'use strict';

import React from 'react';
import c from 'classnames';
import { inRange } from 'mout/math';

const Heading = class Heading extends React.Component {
    render() {
        const {children} = this.props;
        let {level} = this.props;
        const props = {
            className: c('pa-Heading')
        };

        if (!inRange(level, 1, 4)) {
            level = 2;
        }

        if (level < 2) {
            return <h1 {...props}>{children}</h1>;
        } else if (level < 3) {
            return <h2 {...props}>{children}</h2>;
        } else if (level < 4) {
            return <h3 {...props}>{children}</h3>;
        } else if (level === 4) {
            return <h4 {...props}>{children}</h4>;
        }
    }
};

Heading.propTypes = {
    level: React.PropTypes.number
};

Heading.defaultProps = {
    level: 2
};

export default Heading;
