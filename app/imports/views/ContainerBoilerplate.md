Container boilerplate
---------------------

Create a container for every view you create. For example, **ProfileView.jsx** is coupled with **ProfileContainer.jsx**. The object you return in the function (2nd arg) represents the view (1th arg) properties.

*Filename:* `<Name>`Container.jsx

*Contents:*

    'use strict';

    import { Meteor } from 'meteor/meteor';
    import meteorDataContainer from '../../../../services/meteorDataContainer';

    import MyView from './MyView';

    export default meteorDataContainer(MyView, (props) => {
        const {} = props;

        //

        return {
            //
        };
    });
