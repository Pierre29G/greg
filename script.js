/*	
                                   ___---___
                             ___---___---___---___
                       ___---___---    *    ---___---___
                 ___---___---    o/ 0_/  @  o ^   ---___---___
           ___---___--- @  i_e J-U /|  -+D O|-| (o) /   ---___---___
     ___---___---    __/|  //\  /|  |\  /\  |\|  |_  __--oj   ---___---___
__---___---_________________________________________________________---___---__
===============================================================================
 ||||                                                                     ||||
 |---------------------------------------------------------------------------|
 |___-----___-----___-----___-----___-----___-----___-----___-----___-----___|
 / _ \===/ _ \   / _ \===/ _ \   / _ \===/ _ \   / _ \===/ _ \   / _ \===/ _ \
( (.\ oOo /.) ) ( (.\ oOo /.) ) ( (.\ oOo /.) ) ( (.\ oOo /.) ) ( (.\ oOo /.) )
 \__/=====\__/   \__/=====\__/   \__/=====\__/   \__/=====\__/   \__/=====\__/
    |||||||         |||||||         |||||||         |||||||         |||||||
    |||||||         |||||||         |||||||         |||||||         |||||||
    |||||||         |||||||         |||||||         |||||||         |||||||
    |||||||         |||||||         |||||||         |||||||         |||||||
    |||||||         |||||||         |||||||         |||||||         |||||||
    |||||||         |||||||         |||||||         |||||||         |||||||
    |||||||         |||||||         |||||||         |||||||         |||||||
    |||||||         |||||||         |||||||         |||||||         |||||||
    (oOoOo)         (oOoOo)         (oOoOo)         (oOoOo)         (oOoOo)
    J%%%%%L         J%%%%%L         J%%%%%L         J%%%%%L         J%%%%%L
   ZZZZZZZZZ       ZZZZZZZZZ       ZZZZZZZZZ       ZZZZZZZZZ       ZZZZZZZZZ
  ===========================================================================
__|_________________________________________________________________________|__
_|___________________________________________________________________________|_
|_____________________________________________________________________________|
_______________________________________________________________________________
*/


document.addEventListener('DOMContentLoaded', function () {

    var deckid = null;
    var yourhand = new Array();
    var greghand = new Array();
    var rows = ['a', 'b', 'c', 'd'];

    var myHeaders = new Headers();

    var myInit = {
        method: 'GET',
        headers: myHeaders,
        mode: 'cors',
        cache: 'default'
    };

    placeHand();
    go();

    document.getElementById('retry').addEventListener('click', function (event) {
        location.reload();
    });

    fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1', myInit)
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
        })
        .then(function (response) {
            deckid = response.deck_id;
            console.log(deckid);
            night();
        });

    //__________________________________________________________________________________________

    function night() {
        const url = "https://deckofcardsapi.com/api/deck/" + deckid + "/draw/?count=2";

        fetch(url, myInit)
            .then(function (response) {
                if (response.ok) {
                    return response.json();
                }
            })
            .then(function (response) {
                console.log(response);
                yourhand = [];
                yourhand.push(response.cards[0]);
                yourhand.push(response.cards[1]);
                refreshHand();

            });
    }

    //__________________________________________________________________________________________

    function refreshHand() {
        for (let i = 0; i < yourhand.length; i++) {
            const html = "<div class='card'><img class='handcard " + yourhand[i].value + "' src='" + yourhand[i].image + "'></div>";
            document.getElementById('hand').innerHTML += html;
        }
    }


    //__________________________________________________________________________________________

    function placeHand() {
        document.addEventListener('click', function (event) {


            if (event.target.classList.contains('handcard')) {
                var cards = document.getElementsByClassName("handcard");
                for (var i = 0; i < cards.length; i++) {
                    cards[i].classList.remove("active");
                }


                event.target.classList.add("active");
            }
        });

        let places = document.querySelectorAll(".place");
        for (let place of places) {
            if (!place.classList.contains('full')) {
                place.classList.add("active");
                place.addEventListener('click', function (event) {
                    var img = document.querySelector(".handcard.active");
                    if (img) {
                        moveCard(img)
                    }
                });
            }
        }
    }

    //__________________________________________________________________________________________

    function moveCard(target) {
        let parent = target.parentNode;
        event.target.appendChild(target);
        event.target.classList.add("yourcase");
        parent.remove();
        event.target.querySelector(".handcard.active").classList.remove("active", "handcard");
        event.target.classList.remove("active");
        event.target.classList.add("full");
    }

    //__________________________________________________________________________________________

    function go() {
        document.getElementById('GO').addEventListener('click', function (event) {
            event.target.classList.remove("active");
            document.getElementById('interface').classList.add("deactivate");
            day();
            event.target.classList.add("active");
            document.getElementById('interface').classList.remove("deactivate");
            night();
        });
    }

    //__________________________________________________________________________________________

    function day() {
        gregnight();
    }

    //__________________________________________________________________________________________

    function gregnight() {
        const url = "https://deckofcardsapi.com/api/deck/" + deckid + "/draw/?count=2";

        fetch(url, myInit)
            .then(function (response) {
                if (response.ok) {
                    return response.json();
                }
            })
            .then(function (response) {
                greghand = [];
                greghand.push(response.cards[0]);
                greghand.push(response.cards[1]);

            });

        setTimeout(gregplace, 2000);

    }

    //__________________________________________________________________________________________

    function gregplace() {

        for (let i = 0; i < 2; i++) {

            var cartposition = Math.floor(Math.random() * 4);

            const greghtml = "<img class='" + greghand[i].value + "' src='" + greghand[i].image + "'>";

            let loop = ['a', 'b', 'c', 'd', 'a'];

            for (let j = 0; j < 4; j++) {

                var position = "g" + loop[j] + "3";

                if (cartposition == j) {
                    if (!(document.getElementById(position).innerHTML == "")) {
                        var position = "g" + loop[j + 1] + "3";
                    }
                    document.getElementById(position).innerHTML += greghtml;
                    document.getElementById(position).classList.add("gregcase");
                }
            }
        }

        setTimeout(calculate(), 2000);
    }

    //__________________________________________________________________________________________

    function calculate() {

        rows.forEach((item, index) => {

            let yourtotal = 0;
            let gregtotal = 0;
            let cost = 0;
            let element;
            let j;
            let side = ['y', 'g'];

            side.forEach((s, index) => {
                for (i = 1; i < 4; i++) {
                    j = i;
                    var variable = s + item + i;
                    if (document.getElementById(variable).classList.contains("yourcase")) {
                        element = document.getElementById(variable).innerHTML;
                        cost = cardcost(element);
                        yourtotal += cost;
                        if (cost == 999) {
                            document.getElementById(variable).innerHTML = '';
                            document.getElementById(variable).classList.remove("yourcase");
                        }
                    }

                    if (document.getElementById(variable).classList.contains("gregcase")) {
                        element = document.getElementById(variable).innerHTML;
                        cost = cardcost(element);
                        gregtotal += cost;
                        if (cost == 999) {
                            document.getElementById(variable).innerHTML = '';
                            document.getElementById(variable).classList.remove("gregcase");
                        }
                    }
                    i = j;
                }

            });

            if (yourtotal != 0 && gregtotal != 0) {
                console.log("destroy checking...");
                checkdestroy(yourtotal, gregtotal, item);
            }
        });

        setTimeout(gregmove(), 1000);
    }

    //__________________________________________________________________________________________

    function checkdestroy(yourtotal, gregtotal, line) {
        let destroyed = 0;

        if (yourtotal > gregtotal) {
            console.log("destroy greg");

            for (i = 2; i < 4; i++) {
                var variable = "y" + line + i;
                destroyed = destroy(variable, "gregcase");
            }

            for (i = 1; i < 4; i++) {
                var variable = "g" + line + i;
                destroyed = destroy(variable, "gregcase");

            }

        } else if (yourtotal < gregtotal) {
            console.log("destroy your");

            for (i = 2; i > 0; i--) {
                var variable = "g" + line + i;
                destroyed = destroy(variable, "yourcase");
            }

            for (i = 3; i > 0; i--) {
                var variable = "y" + line + i;
                destroyed = destroy(variable, "yourcase");

            }
        }
    }

    //__________________________________________________________________________________________

    function destroy(cardpos, side) {
        let done = 0;
        console.log(document.getElementById(cardpos).innerHTML != "");
        console.log(document.getElementById(cardpos).classList.contains(side));

        if (document.getElementById(cardpos).innerHTML != "" && document.getElementById(cardpos).classList.contains(side)) {
            document.getElementById(cardpos).innerHTML = "";
            document.getElementById(cardpos).classList.remove(side);
            done = 1;
        }
        return done;
    }

    //__________________________________________________________________________________________

    function cardcost(classimg) {
        classimg = classimg.substring(12, 16);
        classimg = classimg.replace('" s', '');
        classimg = classimg.replace('"', '');

        let cost;
        switch (true) {
            case (classimg == 'ACE'):
                cost = 999;
                break;
            case (classimg == 'JACK'):
                cost = 20;
                break;
            case (classimg == 'QUEE'):
                cost = 30;
                break;
            case (classimg == 'KING'):
                cost = 40;
                break;
        }

        classimg = parseInt(classimg);
        for (i = 2; i <= 10; i++) {
            if (classimg == i) {
                cost = i;
            }
        }

        return cost;
    }

    //__________________________________________________________________________________________

    function gregmove() {

        rows.forEach((item, index) => {

            for (i = 1; i < 4; i++) {
                var variable = "y" + item + i;

                var nextvariable = "y" + item + (i + 1);

                if (i == 3) {
                    nextvariable = "g" + item + "1";
                }

                if (document.getElementById(variable).innerHTML == "" && document.getElementById(nextvariable).classList.contains("gregcase")) {
                    document.getElementById(variable).innerHTML = document.getElementById(nextvariable).innerHTML;
                    document.getElementById(nextvariable).classList.remove("gregcase");
                    document.getElementById(variable).classList.add("gregcase");
                    document.getElementById(nextvariable).innerHTML = "";
                }
            }

            for (i = 1; i < 3; i++) {
                var variable = "g" + item + i;
                var nextvariable = "g" + item + (i + 1);

                if (document.getElementById(variable).innerHTML == "" && document.getElementById(nextvariable).classList.contains("gregcase")) {
                    document.getElementById(variable).innerHTML = document.getElementById(nextvariable).innerHTML;
                    document.getElementById(nextvariable).classList.remove("gregcase");
                    document.getElementById(variable).classList.add("gregcase");
                    document.getElementById(nextvariable).innerHTML = "";
                }
            }
        });

        move();
    }

    //__________________________________________________________________________________________

    function move() {

        rows.forEach((item, index) => {

            for (i = 3; i > 0; i--) {
                var variable = "g" + item + i;
                var nextvariable = "g" + item + (i - 1);
                if (i == 1) {
                    nextvariable = "y" + item + "3";
                }

                if (document.getElementById(variable).innerHTML == "" && document.getElementById(nextvariable).classList.contains("yourcase")) {
                    document.getElementById(variable).innerHTML = document.getElementById(nextvariable).innerHTML;
                    document.getElementById(nextvariable).classList.remove("yourcase");
                    document.getElementById(variable).classList.add("yourcase");
                    document.getElementById(nextvariable).innerHTML = "";
                }
            }

            for (i = 3; i > 0; i--) {
                var variable = "y" + item + i;
                var nextvariable = "y" + item + (i - 1);

                if (!(i == 1)) {
                    if (document.getElementById(variable).innerHTML == "" && document.getElementById(nextvariable).classList.contains("yourcase")) {
                        document.getElementById(variable).innerHTML = document.getElementById(nextvariable).innerHTML;
                        document.getElementById(nextvariable).classList.remove("yourcase");
                        document.getElementById(variable).classList.add("yourcase");
                        document.getElementById(nextvariable).innerHTML = "";
                    }
                } else {
                    document.getElementById(variable).classList.remove("full");
                    document.getElementById(variable).classList.add("active");
                }
            }
        });

        checkwin();
    }

    //__________________________________________________________________________________________

    function checkwin() {
        if (document.getElementById("ga3").classList.contains("yourcase") || document.getElementById("gb3").classList.contains("yourcase") || document.getElementById("gc3").classList.contains("yourcase") || document.getElementById("gd3").classList.contains("yourcase")) {
            
            document.getElementById("win").classList.remove("nodisplay");
            document.getElementById("overlay").classList.remove("ghost");
            document.getElementById('overlay').addEventListener('click', function (event) {
        location.reload();
    });
            
        }else if(document.getElementById("ya1").classList.contains("gregcase") || document.getElementById("yb1").classList.contains("gregcase") || document.getElementById("yc1").classList.contains("gregcase") || document.getElementById("yd1").classList.contains("gregcase")){
            
            document.getElementById("lost").classList.remove("nodisplay");
            document.getElementById("overlay").classList.remove("ghost");
            document.getElementById('overlay').addEventListener('click', function (event) {
        location.reload();
    });
            
        }
    }

    //__________________________________________________________________________________________
});