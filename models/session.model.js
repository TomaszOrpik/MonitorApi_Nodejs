const { mongoose } = require(".")

module.exports = mongoose => {
    const session = mongoose.model(
        "Session",
        mongoose.Schema(
            {
                userId: String,
                sessionId: String,
                userIp: String,
                visitCounter: Number,
                visitDate: String,
                device: String,
                browser: String,
                location: String,
                reffer: String,
                pages: [
                    {
                        page: String,
                        timeOn: Number
                    }
                ],
                cartItems: [
                    {
                        itemName: String,
                        itemAction: String
                    }
                ],
                buyedItems: [
                    {
                        itemName: String,
                        itemQuantity: Number
                    }
                ],
                didLogged: Boolean,
                didContacted: Boolean,
                sessionScrap: [
                    {
                        windowWidth: Number,
                        windowHeight: Number,
                        currentPage: String,
                        scrollTopPosition: Number,
                        mouseX: Number,
                        mouseY: Number,
                        clickedItemId: String
                    }
                ]
            }
        )
    )
}
