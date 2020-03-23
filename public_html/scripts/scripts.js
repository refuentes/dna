/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$(document).ready(function () {

    var delay = 0;
    var colors = ["rgb(78, 91, 101)", "rgb(153, 90, 230)", "rgb(25, 118, 210)",
                "rgb(0, 131, 143)", "rgb(245, 127, 23)", "rgb(255, 112, 67)",
                "rgb(109, 76, 65)", "rgb(69, 90, 100)"];
    var elementsToHighlight = [];

    init();

    function init() {
        var indexColor = 0;
        var dna_chain = $('#dna_chain');

        for (var i = 0; i < 40; i++) {
            addLevel(dna_chain, Math.round((delay -= 0.2 + Number.EPSILON) * 100) / 100, colors[indexColor]);
            if (i % 5 == 0 && i != 0){
                indexColor ++;
            }
        }
    }

    function changeColor() {

    }

    function addLevel(dna_chain, delay, color) {
        dna_chain.append(generate_level(delay, color));
    }

    function getLevelsWithColor(color) {
        return $('div[style*="background-color: ' + color + ';"]');
    }

    function generate_level(delay, color) {
        var level = $("<div>", {"class": "level"});
        var nucleotide_a = $("<div>", {"class": "nucleotide", style: "animation-delay: " + delay + "s; background-color: " + color + ";"});
        var nucleotide_b = $("<div>", {"class": "nucleotide", style: "animation-delay: " + delay + "s; background-color: " + color + ";"});
        var connection = $("<div>", {"class": "connection", style: "animation-delay: " + delay + "s; background-color: " + color + ";"});
        level.append(nucleotide_a);
        level.append(nucleotide_b);
        level.append(connection);
        return level;
    }

    $(".level").hover(function(){
        var color = $(this).find(">:first-child").css("background-color");
        elementsToHighlight = getLevelsWithColor(color);
        var rgbaColor = color.replace(')', ', 0.6)').replace('rgb', 'rgba');
        var rgbaConnectionColor = color.replace(')', ', 1)').replace('rgb', 'rgba');

        elementsToHighlight.each(function() {
            if ($(this)[0].className === "connection") {
                $(this).css("-webkit-box-shadow", "0px 0px 0px 1px " + rgbaColor);
                $(this).css("-moz-box-shadow", "0px 0px 0px 1px " + rgbaColor);
                $(this).css("box-shadow", "0px 0px 0px 1px " + rgbaColor);
            } else {
                $(this).css("-webkit-box-shadow", "0px 0px 0px 0.8px " + rgbaColor);
                $(this).css("-moz-box-shadow", "0px 0px 0px 0.8px " + rgbaColor);
                $(this).css("box-shadow", "0px 0px 0px 0.8px " + rgbaColor);
            }

        });
    }, function(){
        elementsToHighlight.each(function() {
                    $(this).css("-webkit-box-shadow", "none");
                    $(this).css("-moz-box-shadow", "none");
                    $(this).css("box-shadow", "none");
                });
    });
});