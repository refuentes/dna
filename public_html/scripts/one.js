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

    init();

    function init() {
        var indexColor = 0;
        var dna_chain = $('#dna_chain_one');

        for (var i = 1; i <= 30; i++) {
            addLevel(dna_chain, Math.round((delay += 0.1 + Number.EPSILON) * 100) / 100, colors[indexColor]);
            if (i % 10 === 0) {
                indexColor++;
            }
        }
    }

    function addLevel(dna_chain, delay, color) {
        dna_chain.append(generate_level(delay, color));
    }

    function generate_level(delay, color) {
        var level = $("<div>", {"class": "level_one"});
        var nucleotide_a = $("<div>", {"class": "nucleotide_one", style: "animation-delay: " + delay + "s; background-color: " + color + ";"});
        var nucleotide_b = $("<div>", {"class": "nucleotide_one", style: "animation-delay: " + delay + "s; background-color: " + color + ";"});
        var connection = $("<div>", {"class": "connection_one", style: "animation-delay: " + delay + "s; background-color: " + color + ";"});
        level.append(nucleotide_a);
        level.append(nucleotide_b);
        level.append(connection);
        return level;
    }
});