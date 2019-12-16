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
        // transition of showing msg : 
        $('.msgClass#' + id).hide().fadeIn(1000);
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
    var reasons = ['name', 'age', 'gender', 'height', 'weight', 'activeness','disease', 'pregnancy','confirmation']
    var activenessList = ['very lazy', 'somehow active', 'very active'];
    var diseaseList = ["don't have", 'heart or hight blood pressure', 'diabetes', 'joints', 'kideny']

    // activities :
    var activities = activenessList.map((e,i)=>{
        return '[' + i + '] : ' + e + '<br> ';
    });

    // diseases :
    var diseases = diseaseList.map((e,i)=>{
        return '[' + i + '] : ' + e + '<br> ';
    });

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
        clearReply();

        // first deal with reply : 
        if(currReason == 'name'){
            name = reply.charAt(0).toUpperCase() + reply.slice(1);
            // second response : 
            respond('Great, got it! ');
            // ask :
            ask('How old are you, ' + name + ' ?', reasons[1])
        }
        else if (currReason == 'age'){
            age = parseInt(reply);
            respond('gotcha, ' + name + '!')
            ask('May I know, are you a male or female ? ', reasons[2])
        }
        else if (currReason == 'gender'){
            reply = reply.toLowerCase().trim();
            if(reply == "male" || reply == "m"){
                gender = 'Male'
                respond('gotcha, ' + name + '!')
                ask('what is your height in centimeters ? ', reasons[3])
            }
            else if(reply == "female" || reply == "f"){
                gender = 'Female'
                respond('gotcha, ' + name + '!')
                ask('hmmm, are you pregnant, '+ name + '? <br> - Yes <br> - No ', reasons[7])
                
            }
            else {
                ask("I couldn't get your gender, May I know, are you a male or female ? ", reasons[2])
            }
        }
        else if (currReason == 'pregnancy'){
            pregnancy = reply.toLowerCase().trim();
            if(pregnancy == "yes" || pregnancy == "y" || pregnancy == "true" || pregnancy == "I'm" || pregnancy == "I am pregnant"){
                respond('oh! congratulations in advanced.')
                ask('how tall are you in centimeters ? ', reasons[3])
            }
            else if (pregnancy == "no" || pregnancy == "n" || pregnancy == "no I'm not") {
                respond("ok " + name + " I get it")
                ask('how tall are you in centimeters ? ', reasons[3])
            }else {
                respond('I am very sorry, ' + name + '!')
                ask('I could not get it, are you pregnant, '+ name + '? <br> - Yes <br> - No <br> please reply with either yes or no', reasons[7])
            }
        }
        else if (currReason == 'height'){
            height = parseInt(reply);
            if(Number.isInteger(weight)){
                if(height >= 100 ){
                    respond("That's great, " + name + '!')
                    ask('you are doing good so far '+ name + '! May I know how much do you weight in kilograms ? ', reasons[4])
                }else {
                    ask("you can't be shorter than 100cm, may I know how tall are you in centimeters ? ", reasons[3])
                }
            }
            else {
                ask('I am sorry, '+ name + '! may I know how tall are you in centimeters ? ', reasons[3])
            }
        }
        else if (currReason == 'weight'){
            weight = parseInt(reply);
            if(Number.isInteger(weight)){
                respond("Great " + name + '!')
                ask('you are doing good so far '+ name + '! Can you tell me how active are you during the day : <br>' + activities.join('') , reasons[5])
            }else {
                ask('I am sorry, '+ name + '! May I know how much do you weight in kilograms ? ', reasons[4])
            }
        }
        else if (currReason == 'activeness'){
            activeness = parseInt(reply);
            if(Number.isInteger(activeness) && activeness > -1 && activeness <= activenessList.length){
                respond("me too! I'm " + activenessList[activeness] + '!')
                ask('Do you have any of the following diseases : <br> '+  diseases.join('') , reasons[6])
            }
            else {
                respond("I'm sorry " + name + " I couldn't get it")
                ask('Can you tell me how active are you during the day : <br> '+  activities.join('') + ' You can reply me with either 1, or 2, or 3 ...', reasons[5])
            }
        }
        else if (currReason == 'disease'){
            disease = parseInt(reply);
            if(Number.isInteger(disease) && disease > -1 && disease <= diseaseList.length){
                respond("got it !");
                respond('ok ' + name + ', now I have a great idea of your profile, can you please confirm if these information is correct :')
                respond('you are ' + age + ' years old '+ gender+ ', and your height is : '+ height + 'cm, you weight about ' + weight + 'kg, you are '+ activenessList[activeness] + ' through the day!')
                ask('is that correct ?  : <br> [0] : Yes <br> [1] : No', reasons[8])
            }
            else {
                respond("I'm sorry " + name + " I couldn't get it")
                ask('Can you tell me if you have any of the following diseases : <br> '+  diseases.join('') + ' You can reply me with either 1, or 2, or 3 ...', reasons[6])
            }
        }
        else if (currReason == 'confirmation'){
            confirmation = reply.toLowerCase().trim();
            if(confirmation == "yes" || confirmation == "y" || confirmation == "0" || confirmation == "true" || confirmation == "correct" ){
                respond("Nice!");
                respond('ok ' + name + ', here are some important information for you :')
                respond('your BMI is : [] and you need to burn about [] calories per day')
                respond('here is a list of the exceresizes best for you :')
            }
            else if(confirmation == "no" || confirmation == "n" || confirmation == "1" || confirmation == "false" || confirmation == "not" ){
                respond("I'm very sorry " + name + ", we have to start over")
                respond("I will referesh the page in 3 seconds and start again")
            }
        }

        // always scroll : 
        chatlog.scrollTop(chatlog.prop('scrollHeight'));
        
        // auto activate reply area : 
        $('.reply').focus()
        
    })
    


})