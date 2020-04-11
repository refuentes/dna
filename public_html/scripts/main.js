/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
 /*
      Created on : Mar 18, 2020, 2:16:34 PM
      Author     : rolando.fuentes
  */
$(document).ready(function () {

    var delay = 0;
    var colors = ["rgb(78, 91, 101)", "rgb(153, 90, 230)", "rgb(25, 118, 210)",
        "rgb(0, 131, 143)", "rgb(245, 127, 23)", "rgb(255, 112, 67)",
        "rgb(109, 76, 65)", "rgb(69, 90, 100)"];
    var elementsToHighlight = [];
    var levelsGroups = [];

    init();

    function init() {
        var indexColor = 0;
        var dna_chain = $('#dna_chain');

        for (var i = 1; i <= 30; i++) {
            addLevel(dna_chain, Math.round((delay -= 0.2 + Number.EPSILON) * 100) / 100, colors[indexColor]);
            if (i % 10 === 0) {
                indexColor++;
            }
        }
        levelsGroups = getGroups();
    }

    function getGroups() {
        var levels = $('.level');
        var groups = [];
        var group = [];
        $.each(levels, function (index, level) {
            group.push(level);
            if ((index + 1) % 5 === 0) {
                groups.push(group);
                group = [];
            }
        });
        return groups;
    }

    function addLevel(dna_chain, delay, color) {
        dna_chain.append(generate_level(delay, color));
    }

    function getLevelsWithColor(color) {
        return $('div.connection[style*="background-color: ' + color + ';"]');
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

    $(".level").hover(function () {
        var color = $(this).find(">:first-child").css("background-color");
        elementsToHighlight = getLevelsWithColor(color);
        var rgbaColor = color.replace(')', ', 0.6)').replace('rgb', 'rgba');
        var rgbaConnectionColor = color.replace(')', ', 1)').replace('rgb', 'rgba');

        elementsToHighlight.each(function () {
            $(this).css("-webkit-box-shadow", "0px 0px 0px 1px " + rgbaConnectionColor);
            $(this).css("-moz-box-shadow", "0px 0px 0px 1px " + rgbaConnectionColor);
            $(this).css("box-shadow", "0px 0px 0px 1px " + rgbaConnectionColor);

        });
    }, function () {
        elementsToHighlight.each(function () {
            $(this).css("-webkit-box-shadow", "none");
            $(this).css("-moz-box-shadow", "none");
            $(this).css("box-shadow", "none");
        });
    });

//    $("#dna_chain").hover(function () {
//        rotateColors(levelsGroups);
//    });

    function setElementColor(element, color) {
        var childrens = element.children;
        $.each(childrens, function (index, element) {
            element.style.backgroundColor = color;
        });
    }

    function rotateColors() {
        $.each(levelsGroups, function (i, group) {
            var firstLevel = group.shift();
            if (i == 0) {
                setElementColor(firstLevel, colors[levelsGroups.length - 1]);
                levelsGroups[levelsGroups.length - 1].push(firstLevel);
            } else {
                setElementColor(firstLevel, colors[i - 1]);
                levelsGroups[i - 1].push(firstLevel);
            }
        });
    }
});