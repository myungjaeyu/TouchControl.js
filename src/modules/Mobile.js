export class Mobile {
    
    constructor(element){

        this.element = element || window;
        this.isTouch = false;
        this.isMove = false;        
        this.isPinch = false;
        this.isDrag  = false;
 
        this.touch = {
            delta : { 
                x : 0,
                y : 0
            },
            move  : { 
                x : 0,
                y : 0
            },
            pinch : {
                start : 0.0,
                end   : 0.0,
                zoom  : 0.0
            },
            drag :{
                pos   : {
                    start : 0.0,
                    end : 0.0
                },
                start : 0.0,
                end   : 0.0,
                delta  : 0.0
            },
            pitch : 0.0,
            yaw   : 0.0,
            type  : '',
            len   : 0,
            direction : {
                north : false,
                south : false,
                east  : false,
                west  : false
            }                      
        };

        this.touchDown = this.touchDown.bind(this);
        this.touchUp   = this.touchUp.bind(this);
        this.touchMove = this.touchMove.bind(this);
 
        this._gesture = {
            type : '',
            count : 0
        };

        this.init();        
        
    }


    init(){
        // console.log('init');
        this.element.addEventListener('touchstart', this.touchDown);

        window.addEventListener('touchend', this.touchUp);
        window.addEventListener('touchmove', this.touchMove);

        this.isTouch = false;        

    }

    touchDown(e){
        // console.log(this);
        // console.log('touch start');

        this.isTouch = true;

        if(e.touches.length > 1){

            this.touch.pinch.x = e.touches[0].pageX - e.touches[1].pageX;
            this.touch.pinch.y = e.touches[0].pageY - e.touches[1].pageY;
 
            this.touch.pinch.start = Math.sqrt(this.touch.pinch.x * this.touch.pinch.x + this.touch.pinch.y * this.touch.pinch.y);
            // console.log('pinch start' ,this.touch.pinch.start);
            this.touch.drag.pos.start = e.touches[0].pageY;
            this.touch.drag.start = this.touch.pinch.x;
            return;
        }
        

        this.touch.move.x = e.touches[0].pageX;
        this.touch.move.y = e.touches[0].pageY;
    }

    touchUp(e){ 
        // console.log('touch end');

        this.isTouch = false;
        this.isMove  = false;
        this.isPinch = false;
        this.isDrag  = false;
        this.touch.direction = {
            north : false,
            south : false,
            east  : false,
            west  : false
        };

        this._gesture = {
            type : '',
            count : 0
        };
                        
    }

    touchMove(e){
        console.log('len ' ,e.touches.length);

        if(!this.isTouch) return;   
        // console.log('touch move');

        this.touch.len = e.touches.length;

        if(e.touches.length === 2){
            
            this.touch.drag.end = e.touches[0].pageX - e.touches[1].pageX;
            
            let drag = (this.touch.drag.start - this.touch.drag.end).toFixed(1);
            this.touch.drag.start = this.touch.drag.end;
            // console.log(drag);
            
            let 
                limit = 1;

            if(drag > -limit && drag < limit){
                // console.log('drag');

                this.touch.type = 'drag';
                this.isDrag = true;

                this.touch.drag.pos.end = e.touches[0].pageY;
                this.touch.drag.delta = Math.sqrt(this.touch.drag.pos.start / this.touch.drag.pos.end);

                // console.log('drag delta', this.touch.drag.delta);
                this.touch.drag.pos.start = this.touch.drag.pos.end;

            }else{
                // console.log('pinch');

                this.touch.pinch.x = e.touches[0].pageX - e.touches[1].pageX;
                this.touch.pinch.y = e.touches[0].pageY - e.touches[1].pageY;
                // console.log('pinch ' ,this.touch.pinch);

                this.touch.pinch.end = Math.sqrt(this.touch.pinch.x * this.touch.pinch.x + this.touch.pinch.y * this.touch.pinch.y);

                this.touch.pinch.zoom = this.touch.pinch.start / this.touch.pinch.end;
                this.touch.pinch.start = this.touch.pinch.end;
                // console.log('pinch zoom', this.touch.pinch.zoom);

                this.touch.type = 'pinch';
                this.isPinch = true;
            }
            
        }

        this.isMove  = true;

        let screen = {
            width  : window.innerWidth,
            height : window.innerHeight
        };

        if(this.element !== window) screen = {
            width  : this.element.clientWidth,
            height : this.element.clientHeight
        };

        this.touch.delta = {
            x : parseInt(e.touches[0].pageX - this.touch.move.x),
            y : parseInt(e.touches[0].pageY - this.touch.move.y)
        };
 
        this.touch.delta.y > 0 ? ( () => { this.touch.direction.south = true;  this.touch.direction.north = false; } )() : ( ()=> { this.touch.direction.north = true; this.touch.direction.south = false; } )();
        this.touch.delta.x > 0 ? ( () => { this.touch.direction.east  = true;  this.touch.direction.west  = false; } )() : ( ()=> { this.touch.direction.west  = true; this.touch.direction.east  = false; } )();

        // console.log('delta ', this.touch.delta);

        let 
            typeArr = [],
            type = '';

        Object.keys(this.touch.direction).map( (item) => {
            
            if(this.touch.direction[item]) typeArr.push(item);

        });
        
        if(typeArr.length > 1) type = Math.abs(this.touch.delta.y) > Math.abs(this.touch.delta.x) ? typeArr[0] : typeArr[1];

        if(this._gesture.type === type){ 
            this._gesture.count++;
            if(this._gesture.count === 5) this.touch.type = type;

        }else this._gesture.count = 0;
        
        this._gesture.type = type;
    
        this.touch.move = {
            x : e.touches[0].pageX,
            y : e.touches[0].pageY
        };

        // console.log('move ', this.touch.move);        

        // console.log('screen ', screen);

        let 
            fov    = 45,
            aspect = screen.width / screen.height,
            radian = Math.PI/180,
            half   = Math.PI/2;

        this.touch.yaw   += this.touch.delta.x / screen.width * fov * aspect * radian;
        
        this.touch.pitch += this.touch.delta.y / screen.height * fov * radian;
        this.touch.pitch  = Math.max(-half, Math.min(half, this.touch.pitch));

        // console.log('yaw', this.touch.yaw);
        // console.log('pitch', this.touch.pitch);
    }

}

  