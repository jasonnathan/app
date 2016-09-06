View boilerplate
----------------

A View represents a 'page'-like area.

*Filename:* `<Name>`View.jsx

*Contents:*

    'use strict';

    import React from 'react';
    import { Container } from '/imports/client/touchstonejs/lib';

    export default class MyView extends React.Component {
        constructor(props) {
            super(props);

            this.state = {
                //
            };
        }

        render() {
            return (
                <Container fill scrollable>
                </Container>
            );
        }
    };

    MyView.propTypes = {
        //
    };

    MyView.defaultProps = {
        //
    };

