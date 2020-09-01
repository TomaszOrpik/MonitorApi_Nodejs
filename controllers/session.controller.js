const db = require('../models');

exports.insertSession = (req, res) => {
    db.mongoose.connection.db.collection('sessions', (err, collection) => {
        const session = req.body;
        db.mongoose.connection.db.collection('sessions', (err, subCollection) => {
            subCollection.findOne( { userIp: session.userIp }, (err, subSession) => {
                let userId;
                console.log(subSession == null);
                if (subSession == null) userId = '_' + Math.random().toString(36).substr(2, 9);
                else userId = subSession.userId;
                db.mongoose.connection.db.collection('sessions', (err, secondSubCollection) => {
                    secondSubCollection.find( { userIp: session.userIp }).toArray((err, subSessions) => {
                        const newSession = {
                            userId: userId,
                            sessionId: session.sessionId,
                            userIp: session.userIp,
                            visitCounter: subSessions.length + 1,
                            visitDate: session.visitDate,
                            device: session.device,
                            browser: session.browser,
                            location: session.location,
                            reffer: session.reffer,
                            pages: [],
                            cartItems: [],
                            buyedItems: [],
                            didLogged: false,
                            didContacted: false,
                            sessionScrap: []
                        };
                        collection.insertOne(newSession);
                        res.status(200);
                        res.json(newSession.sessionId);
                    });
                });
            });
        });
    });
};

exports.getAllSessions = (req, res) => {
    db.mongoose.connection.db.collection('sessions', (err, collection) => {
        collection.find().toArray((err, names) => {
            res.status(200);
            res.json(names);
        })
    });
};

exports.getSingleSession = (req, res) => {
    db.mongoose.connection.db.collection('sessions', (err, collection) => {
        collection.findOne( {sessionId: req.params.id }, (err, result) => {
            if( result.length === 0) {
                res.status(404);
                res.json('Session id not found');
            } else {
                res.status(200);
                res.json(result);
            }
        });
    });
};

exports.getAllUsersSessions = (req, res) => {
    db.mongoose.connection.db.collection('sessions', (err, collection) => {
        collection.find( { userId: req.params.id }).toArray((err, result) => {
            if (result.length === 0) {
                res.status(404);
                res.json('User id not found');
            } else {
                res.status(200);
                res.json(result);
            }
        })
    })
};

exports.updateSession = (req, res) => {
    db.mongoose.connection.db.collection('sessions', (err, collection) => {
        if(err) {
            res.status(404);
            res.json('Session id not found');
        };
        const id = { sessionId: req.params.id };

        if(req.body.userId !== undefined) {
            if(typeof req.body.userId !== 'string') {
                res.status(400);
                res.json('Incorrect user id format');
            } else {
                collection.findOneAndUpdate( id, { $set: { userId: req.body.userId}});
            }
        };
        if(req.body.userIp !== undefined) {
            if(typeof req.body.userId !== 'string') {
                res.status(400);
                res.json('Incorrect user ip format');
            } else {
                collection.findOneAndUpdate( id, { $set: { userIp: req.body.userIp}});};
            }
        if(req.body.visitCounter !== undefined) {
            if(typeof req.body.visitCounter !== 'number') {
                res.status(400);
                res.json('Incorrect visit counter format');
            } else {
                collection.findOneAndUpdate( id, { $set: { visitCounter: req.body.visitCounter}});};
            }
        if(req.body.visitDate !== undefined) {
            if(typeof req.body.visitData !== 'string') {
                res.status(400);
                res.json('Incorrect visit date format');
            } else {
                collection.findOneAndUpdate( id, { $set: { visitDate: req.body.visitDate}});};
            }
        if(req.body.device !== undefined) {
            if(typeof req.body.device !== 'string') {
                req.status(400);
                res.json('Incorrect device format');
            } else {
                collection.findOneAndUpdate( id, { $set: { device: req.body.device}});};
            }
        if(req.body.browser !== undefined) {
                if(typeof req.body.browser !== 'string') {
                    res.status(400);
                    res.json('Incorrect browser format');
                } else {
                    collection.findOneAndUpdate( id, { $set: { browser: req.body.browser}});};
                }
        if(req.body.location !== undefined) {
            if(typeof req.body.location !== 'string') {
                res.body.status(400);
                res.json('incorrect location format');
            } else {
                collection.findOneAndUpdate( id, { $set: { location: req.body.location}});};
            }
        if(req.body.reffer !== undefined) {
            if(typeof req.body.reffer !== 'string') {
                res.body.status(400);
                res.json('Incorrect reffer format');
            } else {
                collection.findOneAndUpdate( id, { $set: { reffer: req.body.reffer}});
            }
        };
        if(req.body.pages !== undefined) {
            if(typeof req.body.pages.timeOn !== 'number') {
                res.status(400);
                res.json('Incorrect time on page format');
            }
            else if(typeof req.body.pages.name !== 'string') {
                res.status(400);
                res.json('Incorrect page name format');
            } else {
                collection.findOneAndUpdate( id, { $set: { pages: req.body.pages}});
            }
        };
        if(req.body.cartItems !== undefined) {
            if(typeof req.body.cartItems.itemName !== 'string') {
                res.status(400);
                res.json('Incorrect cart item name format');
            } else if(typeof req.body.cartItems.itemAction !== 'string') {
                res.status(400);
                res.json('Incorrect cart item action format');
            } else {
                collection.findOneAndUpdate( id, { $set: { cartItems: req.body.cartItems}});
            }
        };
        if(req.body.buyedItems !== undefined) {
            if(typeof req.body.buyedItems.itemName !== 'string') {
                res.status(400);
                res.json('Incorrect buyed item name format');
            } else if (typeof req.body.buyedItems.itemQuantity !== 'number') {
                res.status(400);
                res.json('Incorrect buyed item quantity format');
            } else {
                collection.findOneAndUpdate( id, { $set: { buyedItems: req.body.buyedItems}});
            }
        };
        if(req.body.didLogged !== undefined) {
            if(typeof req.body.didLogged !== 'boolean') {
                res.status(400);
                res.json('Incorrect did logged format');
            } else {
                collection.findOneAndUpdate( id, { $set: { didLogged: req.body.didLogged}});
            }
        };
        if(req.body.didContacted !== undefined) {
            if(typeof req.body.didContacted !== 'boolean') {
                res.status(400);
                res.json('Incorrect did contacted format');
            } else {
                collection.findOneAndUpdate( id, { $set: { didContacted: req.body.didContacted}});
            }
        };
        if(req.body.sessionScrap !== undefined) {
            if (req.body.sessionScrap.mouseX < 0) {
                res.status(400);
                res.json('Mouse position cant be negative');
            }
            else if (req.body.sessionScrap.mouseY < 0) {
                res.status(400);
                res.json('Mouse position cant be negative');
            }
            else if (req.body.sessionScrap.windowWidth <= 0) {
                res.status(400);
                res.json('Window width must be higher than 0');
            }
            else if (req.body.sessionScrap.windowHeigth <= 0) {
                res.status(400);
                res.json('Window height must be higher than 0');
            }
            else if (req.body.sessionScrap.scrollTopPosition < 0) {
                res.status(400);
                res.json('Scroll position cant be negative');
            }
            else if (typeof req.body.sessionScrap.windowWidth !== 'number') {
                res.status(400);
                res.json('Window width incorrect format');
            }
            else if (typeof req.body.sessionScrap.windowHeigth !== 'number') {
                res.status(400);
                res.json('Window height incorrect format');
            }
            else if (typeof req.body.sessionScrap.currentPage !== 'string') {
                res.status(400);
                res.json('Incorrect current page format');
            }
            else if (typeof req.body.sessionScrap.scrollTopPosition !== 'number') {
                res.status(400);
                res.json('Incorrect scroll top position format');
            }
            else if (typeof req.body.sessionScrap.mouseX !== 'number') {
                res.status(400);
                res.json('Mouse X position incorrect format');
            }
            else if (typeof req.body.sessionScrap.mouseY !== 'number') {
                res.status(400);
                res.json('Mouse Y position incorrect format');
            }
            else if (typeof req.body.sessionScrap.clickedItemId !== 'string') {
                res.status(400);
                res.json('Clicked Item Id incorrect format');
            } else {
                collection.findOneAndUpdate( id, { $set: { sessionScrap: req.body.sessionScrap}});};
            }

        res.status(200);
        res.json('Session updated');
    })
};

exports.addSessionPages = (req, res) => {
    if(req.body.timeOn < 0) {
        res.status(400);
        res.json('Time on page must be higher than 0');
    }
    if(typeof req.body.timeOn !== 'number') {
     res.status(400);
        res.json('Time on page incorrect format');
    }
    if(typeof req.body.name !== 'string') {
        res.status(400);
        res.json('Incorrect page name format');
    }
    db.mongoose.connection.db.collection('sessions', (err, collection) => {
        collection.findOneAndUpdate( { sessionId: req.params.id }, { $push: { pages: req.body } },
            (err, result) => {
                if(result.value === null) {
                    res.status(404);
                    res.json("Session id not found");
                } else{
                    res.status(200);
                    res.json('Page added');
                }
            })
    })
};

exports.addSessionCartItems = (req, res) => {
    if (typeof req.body.itemAction !== 'string') {
        res.status(400);
        res.json('Bad item action format');
    }
    if (req.body.itemAction !== 'Dodaj' && req.body.itemAction !== 'Usuń') {
        res.status(400);
        res.json('Item action must be "Dodaj" or "Usuń');
    }
    if (typeof req.body.itemName !== 'string') {
        res.status(400);
        res.json('Incorrect item name format');
    }
    db.mongoose.connection.db.collection('sessions', (err, collection) => {
        collection.findOneAndUpdate( { sessionId: req.params.id }, { $push: { cartItems: req.body } },
            (err, result) => {
                if(result.value === null) {
                    res.status(404);
                    res.json('Session id not found');
                }  else {
                    res.status(200);
                    res.json('Cart Item Added');
                } 
                    
            })
    })
};

exports.addSessionBuyedItem = (req, res) => {
    if (req.body.itemQuantity <= 0) {
        res.status(400);
        res.json('Item quantity must be higher than 0');
    }
    if (typeof req.body.itemQuantity !== 'number') {
        res.status(400);
        res.json('Item quantity incorrect format');
    }
    if (typeof req.body.itemName !== 'string') {
        res.status(400);
        res.json('Incorrect item name format');
    } 
    db.mongoose.connection.db.collection('sessions', (err, collection) => {
        collection.findOneAndUpdate( { sessionId: req.params.id }, { $push: { buyedItems: req.body } },
            (err, result) => {
                if(result.value === null) {
                    res.status(404);
                    res.json('Session id not found');
                } else {
                    res.status(200);
                    res.json('Buyed Item Added');
                }
            })
    })
};

exports.addSessionScrap = (req, res) => {
    if (req.body.mouseX < 0) {
        res.status(400);
        res.json('Mouse position cant be negative');
    }
    if (req.body.mouseY < 0) {
        res.status(400);
        res.json('Mouse position cant be negative');
    }
    if (req.body.windowWidth <= 0) {
        res.status(400);
        res.json('Window width must be higher than 0');
    }
    if (req.body.windowHeigth <= 0) {
        res.status(400);
        res.json('Window height must be higher than 0');
    }
    if (req.body.scrollTopPosition < 0) {
        res.status(400);
        res.json('Scroll position cant be negative');
    }
    // if (typeof req.body.windowWidth !== 'number') {
    //     res.status(400);
    //     res.json('Window width incorrect format');
    // }
    // if (typeof req.body.windowHeigth !== 'number') {
    //     res.status(400);
    //     res.json('Window height incorrect format');
    // }
    // if (typeof req.body.currentPage !== 'string') {
    //     res.status(400);
    //     res.json('Incorrect current page format');
    // }
    // if (typeof req.body.scrollTopPosition !== 'number') {
    //     res.status(400);
    //     res.json('Incorrect scroll top position format');
    // }
    // if (typeof req.body.mouseX !== 'number') {
    //     res.status(400);
    //     res.json('Mouse X position incorrect format');
    // }
    // if (typeof req.body.mouseY !== 'number') {
    //     res.status(400);
    //     res.json('Mouse Y position incorrect format');
    // }
    // if (typeof req.body.clickedItemId !== 'string') {
    //     res.status(400);
    //     res.json('Clicked Item Id incorrect format');
    // };
    // if (typeof req.body.inputId !== 'string') {
    //     res.status(400);
    //     res.json('Input Id incorrect format')
    // };
    // if (typeof req.body.inputKey !== 'string') {
    //     res.status(400);
    //     res.json('Input Key incorrect format');
    // }
    db.mongoose.connection.db.collection('sessions', (err, collection) => {
        collection.findOneAndUpdate( { sessionId: req.params.id }, { $push: { sessionScrap: req.body } }, (err, result) => {
            if(result.value === null) {
                res.status(404);
                res.json('Session Id not found');
            } else {
                res.status(200);
                res.json('Session Scrap added');
            }
        })
    })
};

exports.updateSessionLogged = (req, res) => {
    if (typeof req.body.didLogged !== 'boolean') {
        res.status(400);
        res.json('Incorrect status format');
    }
    db.mongoose.connection.db.collection('sessions', (err, collection) => {
        collection.findOneAndUpdate( { sessionId: req.params.id }, { $set: { didLogged: req.body.didLogged}}, (err, result) => {
            if (result.value === null) {
                res.status(404);
                res.json('Session id not found');
            } else {
                res.status(200);
                res.json('Session did logged status updated');
            }
        })
    })
};

exports.updateSessionContacted = (req, res) => {
    if (typeof req.body.didContacted !== 'boolean') {
        res.status(400);
        res.json('Incorrect format');
    }
    db.mongoose.connection.db.collection('sessions', (err, collection) => {
        collection.findOneAndUpdate( { sessionId: req.params.id }, { $set: { didContacted: req.body.didContacted }}, (err, result) => {
            if (result.value === null) {
                res.status(404);
                res.json('Session id not found');
            } else {
                res.status(200);
                res.json('Session did contacted status updated');
            }  
        })
    })
};

exports.deleteSession = (req, res) => {
    db.mongoose.connection.db.collection('sessions', (err, collection) => {
        collection.deleteOne( { sessionId: req.params.id }, (err, result) => {
            if(err) {
                res.status(404);
                res.json('Session Id not found');
            } else {
                res.status(200);
                res.json('Session deleted');
            } 
            
        })
    })
};

exports.deleteAllSessions = (req, res) => {
    db.mongoose.connection.db.collection('sessions', (err, collection) => {
        collection.drop( (err, result) => {
            if(err) {
                res.status(404);
                res.json(err);
            } else {
                res.status(200);
                res.json('Database dropped');
            } 
        })
    })
}

