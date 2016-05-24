'use strict';

import check from 'powercheck';
import mergeDocuments from '/imports/services/mergeDocuments';

export default class HttpPagination {
    constructor(opts, getPromise) {
        check(opts, {
            start: Number,
            increase: Number,
            loadFirst: check.optional(Boolean)
        });

        check(getPromise, Function);

        this._start = opts.start;
        this._increase = opts.increase;
        this._promise = getPromise;
        this._data = [];
        this._loading = false;
        this._endReached = false;

        if (opts.loadFirst) {
            this.loadFirst().then(opts.loadFirst);
        }
    }

    _load(skip, limit) {
        this._loading = true;

        const dataAmount = this._data.length;
        return this._promise(skip, limit).then((data) => {
            this._loading = false;
            mergeDocuments(this._data, data);

            if (dataAmount === this._data.length) {
                this._endReached = true;
            }
        });
    }

    loadFirst() {
        if (this._loading || this._endReached) {
            return;
        }

        if (this._data.length) {
            throw 'Pagination.loadFirst() can only be called once';
        }

        return this._load(0, this._start);
    }

    loadMore() {
        if (this._loading || this._endReached) {
            return;
        }

        if (!this._data.length) {
            throw 'Please call Pagination.loadFirst() before calling Pagination.loadMore()';
        }

        return this._load(this._data.length, this._increase);
    }

    getData() {
        return this._data.slice();
    }

    isLoading() {
        return this._loading;
    }

    isEndReached() {
        return this._endReached;
    }
};
