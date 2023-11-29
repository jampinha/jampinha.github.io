//    _____      _   _                          _   _          
//   / ____|    | | | |                        | | (_)         
//  | |     __ _| |_| |__   ___ _ __ ___   __ _| |_ _  ___ ___ 
//  | |    / _` | __| '_ \ / _ \ '_ ` _ \ / _` | __| |/ __/ __|
//  | |___| (_| | |_| | | |  __/ | | | | | (_| | |_| | (__\__ \
//   \_____\__,_|\__|_| |_|\___|_| |_| |_|\__,_|\__|_|\___|___/
//                                                           
//                      by Sugoi and Mario
//                         Version 0.1

var Game = function(options)
{
  // Game Vars
  var vars = {
    GameOver: false,
    Puzzle: null, // current puzzle string
    Result: null, // puzzle correct answer
    Stage: 0, // current stage number
    Combo: 0, // 
    Choices: [],
  }

  // Classes
  var UI = new GameInterface()
  var Player = new GamePlayer()
  
  // Constructor
  this.construct = function(options){
    game_start()
    // game_loop()
    // game_over()
    // new_puzzle()
    new_puzzle()
  }

  var game_start = function(){
    Player.set_health(5)
    Player.set_points(0)
    Player.set_combos(0)
  }

  var game_loop = function(){
    do {
      new_puzzle()
      setInterval(function() {
        new_puzzle()
      }, 5000);
    } while (!vars.GameOver);
  }

  var game_over = function(){
    console.log("GameOver")
    alert("GameOver")
    
    Player.construct()
    UI.construct()
  }

  var game_check = function(){
    if(Player.health() == 0)
      game_over()
  }

  var new_puzzle = function(){
    // Generate Puzzle
    vars.Puzzle = build_expression(UI.$points.text())
    vars.Result = parseFloat(resolve_expression(vars.Puzzle).toFixed(2))
    vars.Choices = build_choices(vars.Result)
    vars.Combo = eval_expression(vars.Puzzle)
    // Show Puzzle
    UI.display_puzzle(vars.Puzzle)
    UI.display_choices(vars.Choices)
  }

  var correct_answer = function(){
    Player.insert_points(vars.Combo)
    UI.update_stage(++vars.Stage)
    UI.update_score(Player.points())
  }

  var wrong_answer = function(){
    Player.die()
    UI.kill_heart(Player.health())
    UI.update_stage(vars.Stage)
    UI.update_score(Player.points())
  }

  this.construct(options)

  // GAME EVENTS

  UI.$choices.children().on('click', function(e){
    // game_check()
    var answer = Number(e.target.textContent)

    if(answer === vars.Result) correct_answer()
    else if (Player.health() !== 0) wrong_answer()
    else game_over()

    new_puzzle()
  })
}
