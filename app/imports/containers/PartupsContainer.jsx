'use strict';

import { createContainer } from 'meteor/react-meteor-data';
import Api from '../Api';
import PartupModel from '../models/PartupModel';
import Partups from '../components/Partups';

export default createContainer((props) => {
    const {} = props;

    const partupsHandle = Api.subscribe('partups.list');
    const partupsLoading = !partupsHandle.ready();
    const partups = PartupModel.query()
        .search({})
        .findAndFetch();

    return {
        partups,
        partupsLoading
    };
}, Partups);
