const db = require('../models');
const { json } = require('body-parser');
const { sessions } = require('../models');

exports.getAllUsers = async (req, res) => {
    const sessions = db.mongoose.connection.db.collection('sessions', (err, collection) => {
        collection.find().toArray((err, names) => {
            let userList = [];

            let pages = [];
            let buyedItems = [];
            let cartItems = [];
            const sessionIds = [];
            const visitDates = [];
            const noSortDevices = [];
            const noSortBrowsers = [];
            const noSortLocations = [];
            const noSortReffesrs = [];

            names.forEach(name => userList.push(name.userId));
            const uniqueUsers = new Set(userList);
            userList = [...uniqueUsers];
            const newUsers = userList.forEach(user => {
                db.mongoose.connection.db.collection('sessions', (err, collection) => {
                    collection.find( {userId: user }).toArray((err, session) => {
                        session.forEach(ss => {
                            sessionIds.push(ss.sessionId);
                            visitDates.push(ss.visitDate);
                            noSortDevices.push(ss.device);
                            noSortBrowsers.push(ss.browser);
                            noSortLocations.push(ss.location);
                            noSortReffesrs.push(ss.reffer);
                            if(ss.pages !== null) {
                                if(ss.pages.length !== 0) {
                                    ss.pages.forEach(page => pages.push(page));
                                }
                            }
                            if(ss.cartItems !== null) {
                                if(ss.cartItems.length !== 0) {
                                    ss.cartItems.forEach(cartItem => cartItems.push(cartItem));
                                }
                            }
                            if(ss.buyedItems !== null) {
                                if(ss.buyedItems.length !== 0) {
                                    ss.buyedItems.forEach(buyedItem => buyedItems.push(buyedItem));
                                }
                            }
                        });
                    })
                })
            });
            setTimeout(() => {
                const visits = sessions.length;
                const devices = removeDuplicates(noSortDevices);
                const browsers = removeDuplicates(noSortBrowsers);
                const locations = removeDuplicates(noSortLocations);
                const reffers = removeDuplicates(noSortReffesrs);
            
                pages = sumTimeOnPages(pages);
                buyedItems =sumBuyedItems(buyedItems);
                res.status(200);
                res.json({
                    visits: visits,
                    sessionIds: sessionIds,
                    visitDates: visitDates,
                    devices: devices,
                    browsers: browsers,
                    locations: locations,
                    reffers: reffers,
                    pages: pages,
                    cartItems: cartItems,
                    buyedItems: buyedItems
                });
            }, 3000);
        });
    });
};

exports.getUser = (req, res) => {
    let length = 0;
    let pages = [];
    let buyedItems = [];
    let cartItems = [];
    const sessionIds = [];
    const visitDates = [];
    const noSortDevices = [];
    const noSortBrowsers = [];
    const noSortLocations = [];
    const noSortReffesrs = [];
    db.mongoose.connection.db.collection('sessions', (err, collection) => {
        collection.find( {userId: req.params.id }).toArray((err, session) => {
            length = session.length;
            const newSessions = session.forEach(ss => {
                sessionIds.push(ss.sessionId);
                visitDates.push(ss.visitDate);
                noSortDevices.push(ss.device);
                noSortBrowsers.push(ss.browser);
                noSortLocations.push(ss.location);
                noSortReffesrs.push(ss.reffer);
                if(ss.pages !== null) {
                    if(ss.pages.length !== 0) {
                        ss.pages.forEach(page => pages.push(page));
                    }
                }
                if(ss.cartItems !== null) {
                    if(ss.cartItems.length !== 0) {
                        ss.cartItems.forEach(cartItem => cartItems.push(cartItem));
                    }
                }
                if(ss.buyedItems !== null) {
                    if(ss.buyedItems.length !== 0) {
                        ss.buyedItems.forEach(buyedItem => buyedItems.push(buyedItem));
                    }
                }
            });
            const visits = length;
            const devices = removeDuplicates(noSortDevices);
            const browsers = removeDuplicates(noSortBrowsers);
            const locations = removeDuplicates(noSortLocations);
            const reffers = removeDuplicates(noSortReffesrs);
    
            pages = sumTimeOnPages(pages);
            buyedItems = sumBuyedItems(buyedItems);
            res.status(200);
            res.json({
                visits: visits,
                sessionIds: sessionIds,
                visitDates: visitDates,
                devices: devices[0],
                browsers: browsers[0],
                locations: locations[0],
                reffers: reffers[0],
                pages: pages,
                cartItems: cartItems,
                buyedItems: buyedItems
            });
        })
    })
    // setTimeout(() => {
    //     const visits = length;
    //     const devices = removeDuplicates(noSortDevices);
    //     const browsers = removeDuplicates(noSortBrowsers);
    //     const locations = removeDuplicates(noSortLocations);
    //     const reffers = removeDuplicates(noSortReffesrs);

    //     pages = sumTimeOnPages(pages);
    //     buyedItems =sumBuyedItems(buyedItems);
    //     res.status(200);
    //     res.json({
    //         visits: visits,
    //         sessionIds: sessionIds,
    //         visitDates: visitDates,
    //         devices: devices[0],
    //         browsers: browsers[0],
    //         locations: locations[0],
    //         reffers: reffers[0],
    //         pages: pages,
    //         cartItems: cartItems,
    //         buyedItems: buyedItems
    //     });
    //     }, 1000);
};

exports.getAllAverage = (req, res) => {
    let mostUsedDevices = [];
    let mostUsedBrowsers = [];
    let mostPopularLocations = [];
    let mostPopularReffers = [];
    let averageTimeOnPages = [];
    let averageCartActions = [];
    let averageItemBuys = [];
    let mostlyLogged = [];

    const sessions = db.mongoose.connection.db.collection('sessions', (err, collection) => {
        collection.find().toArray((err, names) => {
            let userList = [];
            names.forEach(name => userList.push(name.userId));
            const uniqueUsers = new Set(userList);
            userList = [...uniqueUsers];

            let ips = [];
            let devices = [];
            let browsers = [];
            let locations = [];
            let reffers = [];
            let loggeds = [];
            let timeOnPages = [];
            let cartActions = [];
            let buyedItemsCount = [];

            userList.map(userId => {
                db.mongoose.connection.db.collection('sessions', (err, collection) => {
                    collection.find( { userId: userId }).toArray((err, sessions) => {
                    sessions.map((ss) => {
                        if(ss.userIp !== undefined && ss.userIp !== null)
                            ips.push(ss.userIp);
                        if(ss.device !== undefined && ss.device !== null)
                            devices.push(ss.device);
                        if(ss.browser !== undefined && ss.browser !== null)
                            browsers.push(ss.browser);
                        if(ss.location !== undefined && ss.location !== null)
                            locations.push(ss.location);
                        if(ss.reffer !== undefined && ss.reffer !== null)
                            reffers.push(ss.reffer);
                        if(ss.pages !== null && ss.pages !== undefined) {
                            ss.pages.forEach(page => {
                                if(page !== null && page !== undefined)
                                    timeOnPages.push(page.timeOn);
                            })
                        }
                        if(ss.buyedItems !== null && ss.buyedItems !== undefined) {
                            ss.buyedItems.forEach(buyedItem => {
                                if(buyedItem !== null && buyedItem !== undefined)
                                    buyedItemsCount.push(buyedItem.itemQuantity);
                            });
                        }
                        if(ss.carItems !== null && ss.carItems !== undefined) {
                            ss.carItems.forEach(cartItem => {
                                if(cartItem !== null && cartItem !== undefined) {
                                    cartActions.push(cartItem.itemAction)
                                }
                            });
                        }
                        if(ss.didLogged !== undefined && ss.didLogged !== null)
                            loggeds.push(ss.didLogged);
                        });
                        if(devices >= 1)
                            mostUsedDevices.push(getMostPopular(devices));
                        if(browsers >= 1)
                            mostUsedBrowsers.push(getMostPopular(browsers));
                        if(locations >= 1)
                            mostPopularLocations.push(getMostPopular(locations));
                        if(reffers >= 1)
                            mostPopularReffers.push(getMostPopular(reffers));
                        if(timeOnPages >= 1)
                            averageTimeOnPages.push(getAverage(timeOnPages));
                        if(cartActions.length >= 1)
                            averageCartActions.push(getMostPopular(cartActions));
                        if(buyedItemsCount >= 1)
                            averageItemBuys.push(getAverage(buyedItemsCount));
                        if(loggeds >= 1)
                            mostlyLogged.push(getMostPopularBool(loggeds));
                    });
                });
            })
            setTimeout(() => {
                res.status(200);
                res.json(getMostOfAverage(
                    mostUsedDevices,
                    mostUsedBrowsers,
                    mostPopularLocations,
                    mostPopularReffers,
                    averageTimeOnPages,
                    averageCartActions,
                    averageItemBuys,
                    mostlyLogged
                ))
            }, 3000);
        });
    });
};

exports.getUserAverage = (req, res) => {
    db.mongoose.connection.db.collection('sessions', (err, collection) => {
        collection.find().toArray((err, names) => {
            let userList = [];
            names.forEach(name => userList.push(name.userId));
            const uniqueUsers = new Set(userList);
            userList = [...uniqueUsers];

            let ips = [];
            let devices = [];
            let browsers = [];
            let locations = [];
            let reffers = [];
            let loggeds = [];
            let timeOnPages = [];
            let cartActions = [];
            let buyedItemsCount = [];

            userList.map(userId => {
                db.mongoose.connection.db.collection('sessions', (err, collection) => {
                    collection.find( { userId: userId }).toArray((err, sessions) => {
                    sessions.forEach((ss) => {
                        if(ss.userIp !== undefined && ss.userIp !== null)
                            ips.push(ss.userIp);
                        if(ss.device !== undefined && ss.device !== null)
                            devices.push(ss.device);
                        if(ss.browser !== undefined && ss.browser !== null)
                            browsers.push(ss.browser);
                        if(ss.location !== undefined && ss.location !== null)
                            locations.push(ss.location);
                        if(ss.reffer !== undefined && ss.reffer !== null)
                            reffers.push(ss.reffer);
                        if(ss.pages !== null && ss.pages !== undefined) {
                            ss.pages.forEach(page => {
                                if(page !== null && page !== undefined)
                                    timeOnPages.push(page.timeOn);
                            })
                        }
                        if(ss.buyedItems !== null && ss.buyedItems !== undefined) {
                            ss.buyedItems.forEach(buyedItem => {
                                if(buyedItem !== null && buyedItem !== undefined)
                                    buyedItemsCount.push(buyedItem.itemQuantity);
                            });
                        }
                        if(ss.carItems !== null && ss.carItems !== undefined) {
                            ss.carItems.forEach(cartItem => {
                                if(cartItem !== null && cartItem !== undefined) {
                                    cartActions.push(cartItem.itemAction)
                                }
                            });
                        }
                        if(ss.didLogged !== undefined && ss.didLogged !== null)
                            loggeds.push(ss.didLogged);
                        });
                    });
                });
            });
            setTimeout(() => {
                res.status(200);
                res.json({
                    userId: req.params.userId,
                    userIp: getMostPopular(ips),
                    mostUsedDevice: getMostPopular(devices),
                    mostUsedBrowser: getMostPopular(browsers),
                    mostPopularLocation: getMostPopular(locations),
                    mostPopularReffer: getMostPopular(reffers),
                    averageTimeOnPages: getAverage(timeOnPages),
                    avCartAction: getMostPopular(cartActions),
                    avItemBuy: getAverage(buyedItemsCount),
                    mostlyLogged: getMostPopularBool(loggeds)
                })
            }, 1000);
        })
    })
};

function getMostOfAverage(
    mostUsedDevices = [],
    mostUsedBrowsers = [],
    mostPopularLocations = [],
    mostPopularReffers = [],
    averageTimeOnPages = [],
    avCartActions = [],
    avItemBuy = [],
    mostlyLogged = []
) {
    return {
        mostUsedDevice: getMostPopular(mostUsedDevices),
        mostUsedBrowser: getMostPopular(mostUsedBrowsers),
        mostPopularLocation: getMostPopular(mostPopularLocations),
        mostPopularReffer: getMostPopular(mostPopularReffers),
        averageTimeOnPages: getAverage(averageTimeOnPages),
        avCartAction: getMostPopular(avCartActions),
        avItemBuy: getAverage(avItemBuy),
        mostlyLogged: getMostPopularBool(mostlyLogged)
    }
}

function getAverage(array = []) { return (getSum(array) / array.length || 0 )};

function getSum(array = []) { return array.reduce((a, b) => a + b, 0)};

function getMostPopular(array) {
    const frequency = {};
    let max = 0;
    let result = [];
    array.forEach(function (a) {
        frequency[a] = (frequency[a] || 0) + 1;
            if (frequency[a] > max) {
                max = frequency[a];
                result = [a];
                return;
            }
            if (frequency[a] === max) {
                result.push(a);
            }
    });
    return result[0];
};

function getMostPopularBool(array = []) {
    const frequency = {};
    let max = 0;
    let result = [];
    array.forEach(function (value) {
        let a;
        if(value === true) a = 1;
        else a = 0;
        frequency[a] = (frequency[a] || 0) + 1;
        if (frequency[a] > max) {
            max = frequency[a];
            result = [a];
            return;
        }
        if (frequency[a] === max) {
            result.push(a);
        }
    });
    if(result[0] === 1) return true;
    else return false;
};

function sumTimeOnPages(pages) {
    let uniquePagesList = getUniquePages(pages);
    if(!(pages == null))
        pages.forEach((page) => {
            for(let i = 0; i < uniquePagesList.length; i++) {
                if(uniquePagesList[i].name === page.name)
                    uniquePagesList[i].timeOn = uniquePagesList[i].timeOn + page.timeOn;
            }
        });
    return uniquePagesList;
}

function getUniquePages(pages) {
    let uniquePagesList = [];
    let pagesWithDubs = [];
    if(!(pages == null)) {
        pages.forEach((page) => {
            pagesWithDubs.push(page.name);
        });
    };
    const uniquePages = new Set(pagesWithDubs);
    const uniquePagesArray = [...uniquePages]
        .forEach(pageName => {
            uniquePagesList.push( { name: pageName, timeOn: 0 } );
        });
        return uniquePagesList;
}

function sumBuyedItems(buyedItems) {
    let uniqueBuyedItemsList = getUniqueBuyedItems(buyedItems);
    if(!(buyedItems == null))
        buyedItems.forEach((item) => {
            for(let i = 0; i < uniqueBuyedItemsList; i++) {
                if(uniqueBuyedItemsList[i].itemName === item.itemName)
                    uniqueBuyedItemsList[i].itemQuantity = uniqueBuyedItemsList[i].itemQuantity + item.itemQuantity;
            }
        });
    return  uniqueBuyedItemsList;
}

function getUniqueBuyedItems(buyedItems) {
    let uniqueBuyedItemsList = [];
    const itemsWithDubs = [];
    if(!(buyedItems == null))
        buyedItems.forEach((item) => {
            itemsWithDubs.push(item.itemName);
        });
    const uniqueBuyedItems = new Set(itemsWithDubs);
    const uniqueBuyedItemsArr = [...uniqueBuyedItems]
        .forEach((itemName) => {
            uniqueBuyedItemsList.push({ itemName: itemName, itemQuantity: 0})
        });
    return uniqueBuyedItemsList;
}

function removeDuplicates(array) {
    let sortedArray = [];
    const uniquesArray = new Set(array);
    sortedArray = [...uniquesArray];
    return sortedArray;
}
