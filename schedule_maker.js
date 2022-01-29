const fs = require('fs')


var timeStamp = ()=>{
    var dateInstance = new Date()
    var date1 = dateInstance.getDate()
    var month= dateInstance.getMonth() + 1
    var year = dateInstance.getFullYear()
    var amOrPm = 'AM'
    var day
    switch(dateInstance.getDay()){
        case 0: day = 'Sunday';
        break;
        case 1: day = 'Monday';
        break;
        case 2: day = 'Tuesday';
        break;
        case 3: day = 'Wednesday';
        break;
        case 4: day = 'Thursday';
        break;
        case 5: day = 'Friday';
        break;
        case 6: day = 'Satuday';
        break;
        
    }
    var date = date1 + ' / ' + month + ' / ' + year; // Date in format DD / MM / YYYY
    var hour = dateInstance.getHours() 
    if (hour > 12){
        hour = hour%12;
        amOrPm = 'PM'
    } 
    var timeStamp = hour + ' : ' + dateInstance.getMinutes() + ' ' + amOrPm;
    return {day, date, timeStamp}
}

var parseTime = ()=>{

}

var writeDiary = ()=>{
    var time = timeStamp() // Get current time stamp
    // console.log(time)

    var content = fs.readFileSync('write_diary.txt').toString()
    // console.log(content)

    var data = {
        time: time,
        content: content
    } // JSON structure with javaScript Objects

    var JSONdata = JSON.stringify(data)
    // console.log(JSONdata)
    var earlierData = fs.readFileSync('diary.txt').toString() // Reading data from diary 
    if(earlierData.length > 0){
        earlierData = earlierData + ',' // Adding comma if not first document of the json
    }
    fs.writeFileSync('diary.txt', earlierData  + JSONdata); // Entering data in diary
}

// writeDiary()

var readDiary = (requiredDate)=>{
    var content = fs.readFileSync('diary.txt').toString() // Buffer data TO String
    var contentJSON = JSON.parse('[' + content + ']') // String to JavaScript Object
    // console.log(contentJSON)

    var diaries = []

    for(var i in contentJSON){
        var date = contentJSON[i].time.date
        if(date==requiredDate){
            diaries.push(contentJSON[i])
            // console.log(contentJSON[i])
        }
    }

    var diaryContents = []
    content = '';
    for(var i in diaries){
        var diary = diaries[i];
        var time = diary.time;
        var diaryTime = time.date + '\n' + time.day + ',  ' + time.timeStamp + '\n\n';
        var content = content + diaryTime + diary.content + '\n\n\n\n';
        diaryContents.push(content)

        // DD / MM / YYYY
        // SUNDAY,  10 : 25 PM

        // CONTENT
        // CONTENT
    }
    fs.writeFileSync('display_diary.txt', content);

}

readDiary('29 / 1 / 2022')