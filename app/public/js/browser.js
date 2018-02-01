$('document').ready(function(){

    var myjson = JSON.stringify(mydata);

    var axis_track = tnt.board.track()
        .height(20)
        .color("white")
        .display(tnt.board.track.feature.axis()
            .orientation("top")
        );

    var chrdata = [];

    var minPosition = 0;
    var maxPosition = 0;
    var maxBrowserLength = 2000;
    var currentLength = Object.keys(mydata).length;
    var browserId = 1;
    var dataStart = parseInt(mydata[0].pos);
    var counter = 0;
    var lastPos = parseInt(mydata[0].pos);

    console.log(mydata);

    for (var chr in mydata) {
        var pos = parseInt(mydata[chr].pos);
        console.log("counter: " + counter);
        console.log("br id: " + browserId);
        console.log("pos: " + pos);
        console.log("counter: " + counter);

        counter += pos - lastPos;

        console.log("pos: " + pos);
        if( counter >= maxBrowserLength) {
            console.log("counter " + counter + "maxb" + maxBrowserLength);
            var browser_div = '<div id=browser_div_' + browserId + '></div></br></br>';
            $('#browsers').append(browser_div);
            console.log("Min in browser " + browserId + ":" + minPosition);
            console.log("Max in browser " + browserId + ":" + maxPosition);

            var pin_track = tnt.board.track()
                .id("Annotations")
                .height(60)
                .color("white")
                .display(tnt.board.track.feature.pin()
                    .domain([0.3, 1.2])
                    .color("red")
                )
                .data(tnt.board.track.data.sync()
                    .retriever(function () {
                        return chrdata;
                    })
                );

            var myBoard = tnt.board().from(minPosition).to(maxPosition).max(maxPosition);
            myBoard(document.getElementById("browser_div_" + browserId));
            myBoard
                .add_track(axis_track)
                .add_track(pin_track);
            myBoard.start();

            if (browserId > 2)
                break;
            browserId++;
            counter = 0;
            chrdata = [];
            var element = {};
            element.pos = parseInt(pos);
            element.val = parseInt(mydata[chr].qual);
            element.label = JSON.stringify(mydata[chr].ref);
            chrdata.push(element);
            minPosition = pos;
            maxPosition = pos;

        } else {
            var element = {};
            element.pos = parseInt(pos);
            element.val = parseInt(mydata[chr].qual);
            element.label = JSON.stringify(mydata[chr].attributes.refseq);
            chrdata.push(element);
            if (minPosition == 0)
                minPosition = pos;
            minPosition = (pos < minPosition) ? pos : minPosition;
            maxPosition = (pos > maxPosition) ? pos : maxPosition;

        }
    }

});