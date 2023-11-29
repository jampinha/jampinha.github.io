//    _____      _   _                          _   _          
//   / ____|    | | | |                        | | (_)         
//  | |     __ _| |_| |__   ___ _ __ ___   __ _| |_ _  ___ ___ 
//  | |    / _` | __| '_ \ / _ \ '_ ` _ \ / _` | __| |/ __/ __|
//  | |___| (_| | |_| | | |  __/ | | | | | (_| | |_| | (__\__ \
//   \_____\__,_|\__|_| |_|\___|_| |_| |_|\__,_|\__|_|\___|___/
//                                                           
//                      by Sugoi and Mario
//                         Version 0.1

var GameInterface = function(options)
{
  // UI elements
  this.$hearts = $('#hearts')
  this.$level = $('#level')
  this.$stage = $('#stage')
  this.$puzzle = $('#puzzle')
  this.$choices = $('#choices')
  this.$points = $('#points')
  this.$combos = $('#combos')

  // Local Variables
  var vars = {
    points: 0,
    combos: 0,
    stage: 0,
    level: 'NORMAL',
  }

  // Constructor
  this.construct = function(options){
    $.extend(vars, options)

    this.$hearts.children().removeClass('dead')
    this.$hearts.children().addClass('full')
    this.$choices.children().text('0')

    this.$points.text(vars.points)
    this.$combos.text(vars.combos)
    this.$stage.text(vars.stage)
    this.$level.children().text(vars.level)
  }
  
  /**
   * @param {number} index of target heart
   */
  this.alive_heart = function(index){
    this.$hearts.children().eq(index).addClass('full')
  }

  /**
   * @param {number} index of target heart
   */
  this.kill_heart = function(index){
    this.$hearts.children().eq(index).addClass('dead')
  }

  /**
   * @param {number} value of the current stage number
   */
  this.update_stage = function(value){
    this.$stage.text(value)
  }

  /**
   * @param {number} value of the current stage number
   */
  this.update_score = function(value){
    this.$points.text(value)
  }

  this.display_puzzle = function(puzzle){
    this.$puzzle.text(puzzle)
  }

  this.display_choices = function(choices){
    this.$choices.children().eq(0).text(choices[0])
    this.$choices.children().eq(1).text(choices[1])
    this.$choices.children().eq(2).text(choices[2])
  }

  this.construct(options)
}