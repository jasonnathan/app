var EventEmitter = require('events').EventEmitter;

var async = require('async');

PEOPLE_RESULTS = {
results: [
{
user: {
gender: "female",
name: {
title: "mrs",
first: "penny",
last: "hanson"
},
location: {
street: "9916 oak ridge ln",
city: "albury",
state: "tasmania",
zip: 1188
},
email: "penny.hanson@example.com",
username: "bluewolf592",
password: "mighty",
salt: "LKCJWsua",
md5: "6bed5dbbd87d80e42f320bcc9831c177",
sha1: "27b9f9f997e338867e1377039312da9e4b65807e",
sha256: "d8b3af671efb4a27d722b373b83e74e397ae50d5f31fd2e70b68af354a997544",
registered: 920366071,
dob: 566013585,
phone: "01-1001-4496",
cell: "0418-643-831",
TFN: "276372354",
picture: {
large: "https://randomuser.me/api/portraits/women/95.jpg",
medium: "https://randomuser.me/api/portraits/med/women/95.jpg",
thumbnail: "https://randomuser.me/api/portraits/thumb/women/95.jpg"
}
}
},
{
user: {
gender: "female",
name: {
title: "ms",
first: "dawn",
last: "hunter"
},
location: {
street: "4601 w 6th st",
city: "kalgoorlie",
state: "queensland",
zip: 372
},
email: "dawn.hunter@example.com",
username: "silvercat791",
password: "werdna",
salt: "XfGJQhcQ",
md5: "4e701d792230b907297fccbe55a85ce4",
sha1: "8b4febbe4d7233229743d5ba918f43b39940fbd1",
sha256: "893ae56b87db6e40767bafb1111d07f2a4073de8ccb67b7f95732a635c90d583",
registered: 951884122,
dob: 1159897811,
phone: "07-1733-0512",
cell: "0438-011-198",
TFN: "006493102",
picture: {
large: "https://randomuser.me/api/portraits/women/91.jpg",
medium: "https://randomuser.me/api/portraits/med/women/91.jpg",
thumbnail: "https://randomuser.me/api/portraits/thumb/women/91.jpg"
}
}
},
{
user: {
gender: "female",
name: {
title: "mrs",
first: "carolyn",
last: "kelly"
},
location: {
street: "2547 edwards rd",
city: "geraldton",
state: "australian capital territory",
zip: 2643
},
email: "carolyn.kelly@example.com",
username: "beautifulmeercat695",
password: "handball",
salt: "kGQ0bLww",
md5: "fb2bf72e31c85ee4da5d8ec43bdd58f7",
sha1: "2569b0852550ff3436f02424ea5a9a5b2a272566",
sha256: "3a0d8c85d7e571ea35076748b53aeda748627f75c87a477757948aef563b342d",
registered: 1022931261,
dob: 496570591,
phone: "05-7845-5362",
cell: "0456-589-192",
TFN: "623551557",
picture: {
large: "https://randomuser.me/api/portraits/women/85.jpg",
medium: "https://randomuser.me/api/portraits/med/women/85.jpg",
thumbnail: "https://randomuser.me/api/portraits/thumb/women/85.jpg"
}
}
},
{
user: {
gender: "female",
name: {
title: "ms",
first: "terri",
last: "ferguson"
},
location: {
street: "5759 karen dr",
city: "geraldton",
state: "queensland",
zip: 1633
},
email: "terri.ferguson@example.com",
username: "lazygorilla951",
password: "sisters",
salt: "vB2bHMWB",
md5: "e5ec0cb1897a172c76b418f0160aa198",
sha1: "0e421fb67c71cb037ab296815f7b33c63544724b",
sha256: "75949abc6430706dd84a4446bc2c9afb0ade0a6a62ea3d7e8e35de4870c511ae",
registered: 1081840800,
dob: 1407752265,
phone: "05-2913-2880",
cell: "0424-478-958",
TFN: "278280142",
picture: {
large: "https://randomuser.me/api/portraits/women/95.jpg",
medium: "https://randomuser.me/api/portraits/med/women/95.jpg",
thumbnail: "https://randomuser.me/api/portraits/thumb/women/95.jpg"
}
}
},
{
user: {
gender: "male",
name: {
title: "mr",
first: "roy",
last: "mckinney"
},
location: {
street: "9697 samaritan dr",
city: "brisbane",
state: "new south wales",
zip: 7883
},
email: "roy.mckinney@example.com",
username: "blueleopard204",
password: "0069",
salt: "S7mOYBbe",
md5: "359b72db01874d5f1d98b53b97a7ef4e",
sha1: "669badf558a866edec438d762dbbd4ac5076620f",
sha256: "a9d651531d4f120a235fcc7f4f774338a556861d6a4c23786745ab7d45177c68",
registered: 999548240,
dob: 1353719776,
phone: "08-7318-9011",
cell: "0417-503-731",
TFN: "736251159",
picture: {
large: "https://randomuser.me/api/portraits/men/85.jpg",
medium: "https://randomuser.me/api/portraits/med/men/85.jpg",
thumbnail: "https://randomuser.me/api/portraits/thumb/men/85.jpg"
}
}
},
{
user: {
gender: "male",
name: {
title: "mr",
first: "marshall",
last: "harrison"
},
location: {
street: "7537 e pecan st",
city: "brisbane",
state: "victoria",
zip: 7723
},
email: "marshall.harrison@example.com",
username: "whitesnake408",
password: "love123",
salt: "EeUzgTG7",
md5: "6d6cf10bb000a3c95723953c55a28fb2",
sha1: "f39d3fba4a98153497b71e4c87611d45e372a2b2",
sha256: "693dc16bc46b86e87370a4c948d5e9a6c7b884b50e58cd45a3c1b66dbe1308c3",
registered: 1048606141,
dob: 860054302,
phone: "09-7581-7297",
cell: "0456-506-579",
TFN: "056145630",
picture: {
large: "https://randomuser.me/api/portraits/men/33.jpg",
medium: "https://randomuser.me/api/portraits/med/men/33.jpg",
thumbnail: "https://randomuser.me/api/portraits/thumb/men/33.jpg"
}
}
},
{
user: {
gender: "male",
name: {
title: "mr",
first: "jerry",
last: "horton"
},
location: {
street: "138 ash dr",
city: "hervey bay",
state: "northern territory",
zip: 3583
},
email: "jerry.horton@example.com",
username: "bigwolf446",
password: "cecile",
salt: "WHn8NuyW",
md5: "f5acc74174e09b1af484afa83acc9bee",
sha1: "c4a93a12366b774709ee84f497c5b56f20c549e0",
sha256: "b8634ddb30725ff9bb2251a289e7f80ebcb22d3dd4d0705abf8a4e8a83cc5037",
registered: 1224496262,
dob: 436052648,
phone: "08-0456-2243",
cell: "0426-825-673",
TFN: "303725215",
picture: {
large: "https://randomuser.me/api/portraits/men/25.jpg",
medium: "https://randomuser.me/api/portraits/med/men/25.jpg",
thumbnail: "https://randomuser.me/api/portraits/thumb/men/25.jpg"
}
}
},
{
user: {
gender: "female",
name: {
title: "mrs",
first: "valerie",
last: "howell"
},
location: {
street: "7690 white oak dr",
city: "tweed",
state: "new south wales",
zip: 2635
},
email: "valerie.howell@example.com",
username: "goldenleopard348",
password: "tiffany1",
salt: "HQefaV3C",
md5: "f2f43de99b8a1e509a9c14fcb7f616f6",
sha1: "1d7dc26e01082e71e5fd2cc671ae232dad5f9c83",
sha256: "2fb161148e9ce70e7189badba0b6c76c8575b20070f2611cc675c4d8347929ba",
registered: 1245748808,
dob: 870942371,
phone: "04-4522-3512",
cell: "0468-025-576",
TFN: "491511109",
picture: {
large: "https://randomuser.me/api/portraits/women/81.jpg",
medium: "https://randomuser.me/api/portraits/med/women/81.jpg",
thumbnail: "https://randomuser.me/api/portraits/thumb/women/81.jpg"
}
}
},
{
user: {
gender: "male",
name: {
title: "mr",
first: "wayne",
last: "wilson"
},
location: {
street: "132 e north st",
city: "sydney",
state: "western australia",
zip: 2404
},
email: "wayne.wilson@example.com",
username: "heavyostrich965",
password: "dawg",
salt: "cxqQFOVy",
md5: "2d02bacb22d039a52b63ee531da83690",
sha1: "762df009f2b78cb0c903b4a8908d6beb6c169908",
sha256: "450b985cddb0e6eef521d03e69e967e26a915538d6ad08a9dc1d4525fa90a13c",
registered: 1259994824,
dob: 626993144,
phone: "01-6189-6690",
cell: "0488-432-270",
TFN: "474298260",
picture: {
large: "https://randomuser.me/api/portraits/men/3.jpg",
medium: "https://randomuser.me/api/portraits/med/men/3.jpg",
thumbnail: "https://randomuser.me/api/portraits/thumb/men/3.jpg"
}
}
},
{
user: {
gender: "female",
name: {
title: "mrs",
first: "diane",
last: "bailey"
},
location: {
street: "7601 w pecan st",
city: "hervey bay",
state: "victoria",
zip: 807
},
email: "diane.bailey@example.com",
username: "silverladybug364",
password: "pooh",
salt: "QPKJ6yA3",
md5: "c43d5e2632e690ee15199e2ec2e55804",
sha1: "e10568dbd7c50122b2adbbbbcb0ccef4e0ea936e",
sha256: "838911e27120210134fa7adcbb0a795fc0400ac16431a4d0c04f3d7bd6cd036c",
registered: 1381033676,
dob: 633344279,
phone: "02-3526-2376",
cell: "0489-147-424",
TFN: "691893506",
picture: {
large: "https://randomuser.me/api/portraits/women/54.jpg",
medium: "https://randomuser.me/api/portraits/med/women/54.jpg",
thumbnail: "https://randomuser.me/api/portraits/thumb/women/54.jpg"
}
}
},
{
user: {
gender: "female",
name: {
title: "ms",
first: "kelly",
last: "chapman"
},
location: {
street: "8626 westheimer rd",
city: "melbourne",
state: "tasmania",
zip: 6086
},
email: "kelly.chapman@example.com",
username: "purplebear956",
password: "luan",
salt: "BXmb0SQV",
md5: "3925352764cfdc127e195caa0d71b7a0",
sha1: "5ef0b295a981fde2993c84c7b80f24a3f95b847b",
sha256: "177c94c49141809e8d64d5c4ede2bf78bbc4a14943e18184b00ec424252c364c",
registered: 1105391974,
dob: 391824807,
phone: "09-4779-3715",
cell: "0406-973-557",
TFN: "061870148",
picture: {
large: "https://randomuser.me/api/portraits/women/18.jpg",
medium: "https://randomuser.me/api/portraits/med/women/18.jpg",
thumbnail: "https://randomuser.me/api/portraits/thumb/women/18.jpg"
}
}
},
{
user: {
gender: "female",
name: {
title: "miss",
first: "heather",
last: "brewer"
},
location: {
street: "7427 pecan acres ln",
city: "mackay",
state: "victoria",
zip: 3403
},
email: "heather.brewer@example.com",
username: "greenmouse391",
password: "ziggy1",
salt: "fKv3la7X",
md5: "9608165eafdc2ff7c1ea57631a88ec26",
sha1: "a8492d0ac11bd00312b75fad5a3bb683795c7fa9",
sha256: "f66ede9a00118db9454aa1807ee9d8ab2c598f4b87987c8de3f155f38406480e",
registered: 1401759694,
dob: 397969669,
phone: "03-4117-8293",
cell: "0406-489-290",
TFN: "466238115",
picture: {
large: "https://randomuser.me/api/portraits/women/71.jpg",
medium: "https://randomuser.me/api/portraits/med/women/71.jpg",
thumbnail: "https://randomuser.me/api/portraits/thumb/women/71.jpg"
}
}
},
{
user: {
gender: "female",
name: {
title: "ms",
first: "bella",
last: "martinez"
},
location: {
street: "9023 rolling green rd",
city: "bathurst",
state: "australian capital territory",
zip: 3291
},
email: "bella.martinez@example.com",
username: "tinybird963",
password: "shells",
salt: "M4XTZAKX",
md5: "7c65ffb7c66d7af00dd7912207d54df0",
sha1: "512b5aa71ca9e2e7d8c9e6ecc4d9ce4d2d471c39",
sha256: "e9f4059049ff97b097a6dd2dad69d8a16fae1ea30c9fc091b1c09f5b83b55d10",
registered: 1267446987,
dob: 1241058117,
phone: "00-5611-3549",
cell: "0474-402-715",
TFN: "362723354",
picture: {
large: "https://randomuser.me/api/portraits/women/6.jpg",
medium: "https://randomuser.me/api/portraits/med/women/6.jpg",
thumbnail: "https://randomuser.me/api/portraits/thumb/women/6.jpg"
}
}
}
],
nationality: "AU",
seed: "cc1d4766ab98b33600",
version: "0.8"
};

function PeopleStore () {
    EventEmitter.call(this);

    // initialize internal cache
    var storage = this.cache = {
        people: []
    };
    var self = this;

    // Dispatchers
    this.starQueue = async.queue((data, callback) => {
        var { id, starred } = data;

        // update internal data
        self.cache.people
            .filter(person => person.id === id)
            .forEach(person => person.isStarred = starred);

        // emit events
        self.emit('people-updated', storage.people);

        callback();
    }, 1);

    this.refreshQueue = async.queue((_, callback) => {

        storage.people = PEOPLE_RESULTS.results.map(p => p.user);

        // post process new data
        storage.people.forEach((person, i) => {
            person.id = i;
            person.name.first = person.name.first[0].toUpperCase() + person.name.first.slice(1);
            person.name.last = person.name.last[0].toUpperCase() + person.name.last.slice(1);
            person.name.initials = person.name.first[0] + person.name.last[0];
            person.name.full = person.name.first + ' ' + person.name.last;
            person.category = Math.random() > 0.5 ? 'A' : 'B';
            person.github = person.name.first.toLowerCase() + person.name.last.toLowerCase();
            person.picture = person.picture.medium;
            person.twitter = '@' + person.name.first.toLowerCase() + (Math.random().toString(32).slice(2, 5));
        });

        // emit events
        self.emit('people-updated', storage.people);
        self.emit('refresh');

        callback(null, storage.people);
    }, 1);

    // refresh immediately
    this.refresh();
}

Object.assign(PeopleStore.prototype, EventEmitter.prototype);

// Intents
PeopleStore.prototype.refresh = function (callback) {
    this.refreshQueue.push(null, callback);
}

PeopleStore.prototype.star = function ({ id }, starred, callback) {
    this.starQueue.push({ id, starred }, callback);
}

// Getters
PeopleStore.prototype.getPeople = function () { return this.cache.people; };

module.exports = PeopleStore;
