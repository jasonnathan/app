Here's what changed in our version of TouchstoneJS
==================================================

lib/ui/NavigationBar.js in the `componentWillReceiveProps()` function
---

Old:

    86. this.setState(newState(nextProps));
    87. if (nextProps.name !== this.props.name) {

New:

    86. if (nextProps.name !== this.props.name) {
    87.    this.setState(newState(nextProps));
