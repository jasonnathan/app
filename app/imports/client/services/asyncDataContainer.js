'use strict';

import React from 'react';

import passPropsForTouchstone from './passPropsForTouchstone';

export default function asyncDataContainer(Component, options, getAsyncProps) {
    options = options || {};

    const container =  class AsyncDataContainer extends React.Component {
        constructor(props) {
            super(props);

            this.state = {
                asyncProps: {}
            };
        }

        shouldComponentUpdate(nextProps) {
            if (options.shouldComponentUpdate) {
                return options.shouldComponentUpdate(this.props, nextProps);
            }

            return true;
        }

        componentWillUnmount() {
            this.unMounted = true;
        }

        componentWillMount() {
            this.doAsyncCall(true);
        }

        componentWillReceiveProps() {
            this.doAsyncCall();
        }

        doAsyncCall(isFirstTime) {
            getAsyncProps.call(this, this.props, (props) => {
                if (!this.unMounted) {
                    this.setState({
                        asyncProps: props
                    });
                }
            }, isFirstTime);
        }

        render() {
            return <Component {...this.props} {...this.state.asyncProps} />;
        }
    };

    return passPropsForTouchstone(container, Component);
};
