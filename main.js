jQuery(document).ready(()=>{
    /* setup vars */ 
    // route to images : 
    var imagesLink = '/app/images/icons/';
    // msg raw : 
    var senderClass,senderType,msgContent;
    var msg = `
    <div class="msgClass" id="msgId">
        <div class="chat">
        <div class="user-photo"><img/></div>
            <p class="chat-message">msgContent</p>
        </div>
    </div>
    `;

    const chatlog = $('.chatlogs');
    console.log(chatlog)
    
    /** setting up points and gender: */
    var points = 0, gender=undefined, age = undefined, name = undefined, height= undefined, weight= undefined, activeness=undefined, disease = undefined;

    // incremental msg ID:
    var msgId = 0;

    // style msgs function
    function styleMsg(id,sender){
        if (sender == 'system'){
            senderClass = 'bot';
            senderType = 'system';
        }else if(sender === 'user'){
            senderClass = 'user';
            senderType = 'user';
        }
        $('.msgClass#' + id).find('.chat').addClass(senderClass);
        $('.msgClass#' + id).find('.user-photo img').attr('src', imagesLink+senderType+'.png');
    }


    function addReply(reply){
        msgId +=1;
        msgContent = reply;
        console.log('user reply : ', reply)
        chatlog.append(msg.replace('msgContent', msgContent).replace('msgId', msgId));
        styleMsg(msgId,'user');
    }
    function clearReply(){
        $('.reply').val('');
    }

    // greeting function : 
    function greeting(){
        msgId +=1;
        msgContent = 'Welcome! My name is Mero, I will guide you to the better you in the the right way!';
        chatlog.append(msg.replace('msgContent', msgContent).replace('msgId', msgId));
        styleMsg(msgId,'system');
    }greeting();
    

    // reasons:
    var reasons = ['name', 'age', 'gender', 'height', 'weight', 'activeness','disease']


    // asking function
    function ask(question, reason){
        msgId +=1;
        msgContent = question;
        chatlog.append(msg.replace('msgContent', msgContent).replace('msgId', msgId));
        styleMsg(msgId,'system');
        // add reason attribute to the reply
        $('.reply').attr('data-reason', reason)
    }

    // responding function : 
    function respond(response) {
        msgId +=1;
        msgContent = response;
        chatlog.append(msg.replace('msgContent', msgContent).replace('msgId', msgId));
        styleMsg(msgId,'system');
    }

    // start with the user name : 
    ask('May I have your name please ? ', reasons[0])
    

    // conversation : 
    jQuery('form').submit(function( event ) {
        event.preventDefault();

        // edit rpely : 
        reply = $('.reply').val();
        currReason = $('.reply').attr('data-reason');
        /** deal with reply and responese based on reply  */
                
        // add user reply to the screen: 
        addReply(reply);
        // clear reply form : 
        clearReply()      
        // first deal with reply : 
        if(currReason == 'name'){
            name = reply;
            // second response : 
            respond('Great, got it! ');
            // ask :
            ask('How old are you, ' + name + ' ?', reasons[1])
        }
        else if (currReason == 'age'){
            age = reply;
            respond('gotch, ' + name + '!')
            ask('May I know, are you a male or female ? ', reasons[2])
        }
        // scroll : 
        
    })
    


})