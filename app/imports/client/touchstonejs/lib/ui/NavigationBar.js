'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactAddonsCssTransitionGroup = require('react-addons-css-transition-group');

var _reactAddonsCssTransitionGroup2 = _interopRequireDefault(_reactAddonsCssTransitionGroup);

var _reactTappable = require('react-tappable');

var _reactTappable2 = _interopRequireDefault(_reactTappable);

var DIRECTIONS = {
	'reveal-from-right': -1,
	'show-from-left': -1,
	'show-from-right': 1,
	'reveal-from-left': 1
};

var defaultControllerState = {
	direction: 0,
	fade: false,
	leftArrow: false,
	leftButtonDisabled: false,
	leftIcon: '',
	leftLabel: '',
	leftAction: null,
	rightArrow: false,
	rightButtonDisabled: false,
	rightIcon: '',
	rightLabel: '',
	rightAction: null,
	title: ''
};

function newState(from) {
	var ns = _extends({}, defaultControllerState);
	if (from) _extends(ns, from);
	delete ns.name; // may leak from props
	return ns;
}

var NavigationBar = _react2['default'].createClass({
	displayName: 'NavigationBar',

	contextTypes: {
		app: _react2['default'].PropTypes.object
	},

	propTypes: {
		name: _react2['default'].PropTypes.string,
		className: _react2['default'].PropTypes.string
	},

	getInitialState: function getInitialState() {
		return newState(this.props);
	},

	componentDidMount: function componentDidMount() {
		if (this.props.name) {
			this.context.app.navigationBars[this.props.name] = this;
		}
	},

	componentWillUnmount: function componentWillUnmount() {
		if (this.props.name) {
			delete this.context.app.navigationBars[this.props.name];
		}
	},

	componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
		if (nextProps.name !== this.props.name) {
			this.setState(newState(nextProps));
			if (nextProps.name) {
				this.context.app.navigationBars[nextProps.name] = this;
			}
			if (this.props.name) {
				delete this.context.app.navigationBars[this.props.name];
			}
		}
	},

	update: function update(state) {
		// FIXME: what is happening here
		state = newState(state);
		this.setState(newState(state));
	},

	updateWithTransition: function updateWithTransition(state, transition) {
		state = newState(state);
		state.direction = DIRECTIONS[transition] || 0;

		if (transition === 'fade' || transition === 'fade-contract' || transition === 'fade-expand') {
			state.fade = true;
		}

		this.setState(state);
	},

	renderLeftButton: function renderLeftButton() {
		var className = (0, _classnames2['default'])('NavigationBarLeftButton', {
			'has-arrow': this.state.leftArrow
		});

		return _react2['default'].createElement(
			_reactTappable2['default'],
			{ onTap: this.state.leftAction, className: className, disabled: this.state.leftButtonDisabled, component: 'button' },
			this.renderLeftArrow(),
			this.renderLeftLabel()
		);
	},

	renderLeftArrow: function renderLeftArrow() {
		var transitionName = 'NavigationBarTransition-Instant';
		if (this.state.fade || this.state.direction) {
			transitionName = 'NavigationBarTransition-Fade';
		}
		var transitionDuration = transitionName === 'NavigationBarTransition-Instant' ? 50 : 500;

		var arrow = this.state.leftArrow ? _react2['default'].createElement('span', { className: 'NavigationBarLeftArrow' }) : null;

		return _react2['default'].createElement(
			_reactAddonsCssTransitionGroup2['default'],
			{ transitionName: transitionName, transitionEnterTimeout: transitionDuration, transitionLeaveTimeout: transitionDuration },
			arrow
		);
	},

	renderLeftLabel: function renderLeftLabel() {
		var transitionName = 'NavigationBarTransition-Instant';
		if (this.state.fade) {
			transitionName = 'NavigationBarTransition-Fade';
		} else if (this.state.direction > 0) {
			transitionName = 'NavigationBarTransition-Forwards';
		} else if (this.state.direction < 0) {
			transitionName = 'NavigationBarTransition-Backwards';
		}
		var transitionDuration = transitionName === 'NavigationBarTransition-Instant' ? 50 : 500;

		return _react2['default'].createElement(
			_reactAddonsCssTransitionGroup2['default'],
			{ transitionName: transitionName, transitionEnterTimeout: transitionDuration, transitionLeaveTimeout: transitionDuration },
			_react2['default'].createElement(
				'span',
				{ key: Date.now(), className: 'NavigationBarLeftLabel' },
				this.state.leftLabel
			)
		);
	},

	renderTitle: function renderTitle() {
		var title = this.state.title ? _react2['default'].createElement(
			'span',
			{ key: Date.now(), className: 'NavigationBarTitle' },
			this.state.title
		) : null;
		var transitionName = 'NavigationBarTransition-Instant';
		if (this.state.fade) {
			transitionName = 'NavigationBarTransition-Fade';
		} else if (this.state.direction > 0) {
			transitionName = 'NavigationBarTransition-Forwards';
		} else if (this.state.direction < 0) {
			transitionName = 'NavigationBarTransition-Backwards';
		}
		var transitionDuration = transitionName === 'NavigationBarTransition-Instant' ? 50 : 500;

		return _react2['default'].createElement(
			_reactAddonsCssTransitionGroup2['default'],
			{ transitionName: transitionName, transitionEnterTimeout: transitionDuration, transitionLeaveTimeout: transitionDuration },
			title
		);
	},

	renderRightButton: function renderRightButton() {
		var transitionName = 'NavigationBarTransition-Instant';
		if (this.state.fade || this.state.direction) {
			transitionName = 'NavigationBarTransition-Fade';
		}
		var transitionDuration = transitionName === 'NavigationBarTransition-Instant' ? 50 : 500;

		var button = this.state.rightIcon || this.state.rightLabel ? _react2['default'].createElement(
			_reactTappable2['default'],
			{ key: Date.now(), onTap: this.state.rightAction, className: 'NavigationBarRightButton', disabled: this.state.rightButtonDisabled, component: 'button' },
			this.renderRightLabel(),
			this.renderRightIcon()
		) : null;
		return _react2['default'].createElement(
			_reactAddonsCssTransitionGroup2['default'],
			{ transitionName: transitionName, transitionEnterTimeout: transitionDuration, transitionLeaveTimeout: transitionDuration },
			button
		);
	},

	renderRightIcon: function renderRightIcon() {
		if (!this.state.rightIcon) return null;

		var className = (0, _classnames2['default'])('NavigationBarRightIcon', this.state.rightIcon);

		return _react2['default'].createElement('span', { className: className });
	},

	renderRightLabel: function renderRightLabel() {
		return this.state.rightLabel ? _react2['default'].createElement(
			'span',
			{ key: Date.now(), className: 'NavigationBarRightLabel' },
			this.state.rightLabel
		) : null;
	},

	render: function render() {
		return _react2['default'].createElement(
			'div',
			{ className: (0, _classnames2['default'])('NavigationBar', this.props.className) },
			this.renderLeftButton(),
			this.renderTitle(),
			this.renderRightButton()
		);
	}
});

exports['default'] = NavigationBar;
module.exports = exports['default'];
