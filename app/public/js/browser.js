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
    for (var chr in mydata) {
            var pos = parseInt(mydata[chr].pos) / 1000;
            if (minPosition == 0)
                minPosition = pos;
            minPosition = (pos < minPosition) ? pos : minPosition;
            maxPosition = (pos > maxPosition) ? pos : maxPosition;
            var element = {};
            element.pos = parseInt(pos);
            element.val = parseInt(mydata[chr].qual);
            element.label = JSON.stringify(mydata[chr].varinfo);
            chrdata.push(element);
    }
    console.log("Min " + minPosition);
    console.log("Max " + maxPosition);

    var pin_track = tnt.board.track()
        .id("Annotations")
        .height(60)
        .color("white")
        .display (tnt.board.track.feature.pin()
            .domain([0.3, 1.2])
            .color("red")
        )
        .data (tnt.board.track.data.sync()
            .retriever (function () {
                return chrdata;
            })
        );

    console.log(chrdata);
    var myBoard = tnt.board().from(minPosition).to(maxPosition).max(maxPosition);
    myBoard(document.getElementById("mydiv"));
    myBoard
        .add_track(axis_track)
        .add_track(pin_track);
    myBoard.start();

});