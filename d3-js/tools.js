function dataNumberToNice(number){
    
    numberFloor = Math.floor(number);
    
    if(numberFloor===0){
            numberFloor = Math.floor(number*10)/10;
    }
    
    if(numberFloor===0){
            numberFloor = Math.floor(number*100)/100;
    }
    
    numberFloor = numberFloor.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(numberFloor))
        numberFloor = numberFloor.replace(pattern, "$1 $2");
    
    return numberFloor;
}