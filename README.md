For polish version [click here](https://github.com/TomaszOrpik/MonitorApi_Nodejs/blob/master/READMEPL.md)

# MonitorApi_Nodejs
Monitor Api rewritten to node + express js

# Introduction
It was created to track users activity of [Vegetarian Shop](https://vegeshop-714fb.firebaseapp.com/). Api collects such information about user as location, track users cart, device and much more into mongoDB database. Such data can be easy access in formatted form, as users data, average data for user, or global values in total and average form. It is easy to implement with different shops, so users data can be displayed with applications, that can't read it from google analytics as [Xamarin App](https://github.com/TomaszOrpik/VeganFoodShopMonitorApp).

# Setup
To make api work:
1. run `npm install`
2. Set root of MongoDB database in db.config.js
3. Run: `nodemon server.js`

# Resource routes
List of API routes:


| resource      | requirements        |result        |
|:--------------|:--------------------|:-------------|
| Get `/users` | None | Returns from database full data of all users and all sessions of them |
| Get `/users/:id` | User id | Returns from database data of all sessions of selected user as one Json object|
| Get `/users_average` | None | Returns from database average data of all sessions |
| Get `/users_average/:id` | User id | Returns from database average data of sessions of the user with selected id |
| Post `/sessions` | User id, User ip, Date of visit, Device, Browser, Location, reffer | Post into database the information about new session |
| Get `/sessions` | None | Returns the full data of sessions on website |
| Get `/sessions/:id` | Sesson id | Returns the data of session with selected id |
| Get `/sessions_user/:id` | User id | Returns data of all sessions of user with selected id |
| Patch `/sessions/:id` | Session id, User Id, User ip, Number of visit, Date of visit, Device, Browser, Location, Reffer, Visited pages, Items in cart, Buyed items, Was user logged?, Did user contacted service desk? | Updates all data of session with selected id |
| Put `/sessions_pages/:id` | Session id, Page name, Time spend on page(sec) | Puts data of visited page into session with selected id |
| Put `/sessions_cartItems/:id` | Session id, Item name, Action on item | Puts into database data of cart interaction of session with selected id |
| Put `/sessions_buyedItems/:id` | Session id, Item name, Item quantity | Puts data of buyed items with quantity of them into session with selected id |
| Put `/sessions_scrap/:id` | Session id, Mouse X, Mouse Y, Window Width, Window Heigth, ScrollTopPosition, Current Page, Clicked Item Id, Input Id, Input Key | Puts data of current user activity on page |
| Patch `/sessions_logged/:id` | Session id, Did logged? | Change status of logged bool for session with selected id |
| Patch `/sessions_contacted/:id` | Session id, Did contacted? | Change status of contacted bool for session with selected id |
| Delete `/sessions/:id` | Session id | Delete session with selected id from database |


# Others
### Report Bug and improves

You can report encountered bugs or send ideas for improvement [here](https://github.com/TomaszOrpik/MonitorApi_Nodejs/issues)

### License

Application was uploaded under GENERAL PUBLIC LICENSE for more information [check license file](https://github.com/TomaszOrpik/MonitorApi_Nodejs/blob/master/LICENSE) link to license

### Contact

Feel free to [Contact me!](https://github.com/TomaszOrpik)
