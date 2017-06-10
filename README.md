# TouchControl.js

Simple touch interaction library 
- [Desktop Demo](https://u4bi.github.io/TouchControl.js/examples/desktop)
- [Mobile Demo](https://u4bi.github.io/TouchControl.js/examples/mobile)

## Usage

```javascript
 
    var desktop = new TouchControl.Desktop(HTMLElement);

    var mobile  = new TouchControl.Mobile(HTMLElement);

    var client_screen  = new TouchControl.Desktop(); // window
    var device_screen  = new TouchControl.Mobile();  // window

```

## Prop
 
#### Desktop
![Alt text](http://drive.google.com/uc?export=view&id=0B3XkfYbZArSfUmFzS19BX1h5NDQ)

``` 
        isTouch                 : boolean
        isMove                  : boolean

        touch.move.x            : double
        touch.move.y            : double

        touch.delta.x           : double
        touch.delta.y           : double
 
        touch.pitch             : double
        touch.yaw               : double

        touch.type              : string
        
        touch.direction.north   : boolean
        touch.direction.south   : boolean
        touch.direction.east    : boolean
        touch.direction.west    : boolean
 
```

#### Mobile
![Alt text](http://drive.google.com/uc?export=view&id=0B3XkfYbZArSfQ3RzSGtLS1Vmc2M)

```
        isTouch                 : boolean
        isMove                  : boolean
        isPinch                 : boolean

        touch.move.x            : double
        touch.move.y            : double

        touch.delta.x           : double
        touch.delta.y           : double
 
        touch.pitch             : double
        touch.yaw               : double

        touch.pinch.start       : boolean
        touch.pinch.end         : boolean
        touch.pinch.zoom        : boolean

        touch.type              : string
        
        touch.direction.north   : boolean
        touch.direction.south   : boolean
        touch.direction.east    : boolean
        touch.direction.west    : boolean

```