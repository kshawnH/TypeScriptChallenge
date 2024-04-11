import _ = require('./index')

declare module './index' {
    interface ILodash {
        x():void
        y():void
        z():void

        // xxxxx
    }
}