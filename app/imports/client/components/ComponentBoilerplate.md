Component boilerplate
---------------------

Simple React component.

*Filename:* `<Name>`.jsx

*Contents:*

    'use strict';

    import React from 'react';

    const MyComponent = class MyComponent extends React.Component {
        render() {
            return <p></p>;
        }
    }

    MyComponent.propTypes = {
        //
    };

    MyComponent.defaultProps = {
        //
    };

    export default MyComponent;
