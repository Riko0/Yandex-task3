function listenEvent(element, eventType, handler, context){
    var eventHandler = function(evt){
        handler.call(context, evt);
    };
    if (element.addEventListener){
        element.addEventListener(eventType, eventHandler);
    }
    else{
        element.attachEvent('on'+eventType, eventHandler);
    }
}