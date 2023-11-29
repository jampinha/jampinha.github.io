//    _____      _   _                          _   _          
//   / ____|    | | | |                        | | (_)         
//  | |     __ _| |_| |__   ___ _ __ ___   __ _| |_ _  ___ ___ 
//  | |    / _` | __| '_ \ / _ \ '_ ` _ \ / _` | __| |/ __/ __|
//  | |___| (_| | |_| | | |  __/ | | | | | (_| | |_| | (__\__ \
//   \_____\__,_|\__|_| |_|\___|_| |_| |_|\__,_|\__|_|\___|___/
//                                                           
//                      by Sugoi and Mario
//                         Version 0.1

var GamePlayer = function(options)
{
  // Playes Stats
  var stats = {
    health: 0,
    points: 0,
    combos: 0,
  }

  // Constructor
  this.construct = function(options){
    $.extend(stats, options)
  }

  this.reset = function(){
    stats.health = 0
    stats.points = 0
    stats.combos = 0
  }

  // Getters
  this.points = function(){ return stats.points }
  this.health = function(){ return stats.health }
  this.combos = function(){ return stats.combos }

  // Setters
  this.set_health = function(value){ stats.health = value }
  this.set_points = function(value){ stats.points = value }
  this.set_combos = function(value){ stats.combos = value }

  // Points Methods
  this.insert_points = function(value){ stats.points += value }
  this.remove_points = function(value){ stats.points -= value }

  // Health Methods
  this.alive = function(){ stats.health++ }
  this.die = function(){ stats.health-- }

  this.construct(options)
}