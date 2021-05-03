const Information = {
    Author: 'www.blackdayz.de',
    Version: '0.0.1',
    Licensce: 'OpenSource',
    Type: 'Libary'
}

export var ChangerJSData = [];
export var ChangerJSDetector = 0;
var ChangeJSOldArray = [];


    const config = [{
            ErrorMessages: 1,
            InfoMessage: 1,
            InputTypes: [
                'checkbox',
                'color',
                'data',
                'datetime-local',
                'email',
                'file',
                'month',
                'number',
                'password',
                'radio',
                'range',
                'tel',
                'text',
                'time',
                'url',
                'week'
            ]
        }];

    var Error = (message) => { if (config[0].ErrorMessages === 1) console.error(message) }

    if(config[0].InfoMessage === 1) console.log(Information)

    const randomint = (length) => {
        let chars = '0123456789';
        let str = '';
        for (let i = 0; i <= length; i++) {
            str += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return str;
    };

    $('.ChangerJSInput').each(function() {
        if (config[0].InputTypes.indexOf($(this).attr('type')) !== -1) {

            let DivID = ($(this).attr('id') === undefined) ? '' : $(this).attr('id');
            let OldValue = ($(this).val() === undefined) ? '' : $(this).val();
            let ID = randomint(10);

            let newobj = {
                ID: ID,
                DivID: DivID,
                OldValues: OldValue,
                NewValues: OldValue
            }

            let oldobj = {
                ID: ID,
                DivID: DivID,
                OldValues: OldValue,
                NewValues: OldValue
            }

            $(this).attr('data-changerjs', ID);
            ChangerJSData.push(newobj);
            ChangeJSOldArray.push(oldobj);
        }else {
            Error("Invalid Input Type: " + $(this).attr('type'))
        }
    });

    $('.ChangerJSInput').on('input', function () {
        if (config[0].InputTypes.indexOf($(this).attr('type')) !== -1) {

            let ChangerJSDataTag = $(this).attr('data-changerjs');
            let InputData = ($(this).attr('type') === 'file') ? $(this)[0].files[0] : $(this).val();

            for(let i in ChangerJSData) {
                if(ChangerJSData[i].ID === ChangerJSDataTag) ChangerJSData[i].NewValues = InputData;
            }

            if(JSON.stringify(ChangerJSData) !== JSON.stringify(ChangeJSOldArray)) ChangerJSDetector = 1;
            else ChangerJSDetector = 0

            
        } else {
            Error("Invalid Input");
        }
    });

