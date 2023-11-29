//  _____   _  _             _  _     
//  / ____|  | | | |            | | (_)     
// | |   __ _| |_| |__  ___ _ __ ___  __ _| |_ _ ___ ___ 
// | |  / _` | __| '_ \ / _ \ '_ ` _ \ / _` | __| |/ __/ __|
// | |___| (_| | |_| | | | __/ | | | | | (_| | |_| | (__\__ \
//  \_____\__,_|\__|_| |_|\___|_| |_| |_|\__,_|\__|_|\___|___/
//                              
//           by Sugoi and Mario
//             Version 0.1


/**
 * 
 * @param {number} len
 * @return {number}
 */
function get_number(len) {
  var min = 0
  var max = 9

  if(len > 1)
    min = math.pow(10, len - 1)

  for(let counter = 1; counter < len; counter++)
    max += 9 * math.pow(10, counter)

  return math.randomInt(min, max)
}

/**
 * 
 * @param {number} family 
 * @return {string}
 */
function get_operator(family) {
  const operator = math.randomInt(0, 2)

  switch(family) {
    case 1:
      if(operator)
        return '+'

      return '-'

    case 2:
      if(operator)
        return '*'

      return '/'

    default:
      return '?'
  }
}

/**
 * @return {string}
 */
function build_expression(score) {
  var expression
  
  do {
    if(score <= 200) {
      do {
        expression = `${get_number(math.randomInt(1, 3))} ${get_operator(1)} ${get_number(math.randomInt(1, 2))}`

        if(eval_expression(expression) <= 3)
          expression += ` ${get_operator(1)} ${get_number(math.randomInt(1, 2))}`
      } while(eval_expression(expression) > 7)
    }

    else if(score > 200 && score <= 500) {
      do {
        expression = `${get_number(math.randomInt(1, 4))} ${get_operator(math.randomInt(1, 3))} ${get_number(math.randomInt(1, 3))}`

        if(eval_expression(expression) <= 6)
          expression += ` ${get_operator(math.randomInt(1, 3))} ${get_number(math.randomInt(1, 3))}`
      } while(eval_expression(expression) > 12)
    }

    else {
      expression = `${get_number(math.randomInt(1, 5))} ${get_operator(math.randomInt(1, 3))} ${get_number(math.randomInt(1, 5))}`

      if(eval_expression(expression) <= 12)
      expression += ` ${get_operator(math.randomInt(1, 3))} ${get_number(math.randomInt(1, 2))}`
    }
  } while(resolve_expression(expression) == math.Infinity)

  return expression
}

/**
 * 
 * @param {string} exp 
 * @return {number}
 */
function resolve_expression(exp) {
  return math.evaluate(exp)
}

/**
 * 
 * @param {string} exp
 * @return {number}
 */
function eval_expression(exp) {
  const familyTwoPattern = new RegExp('(\\d+|\\d+\\.\\d+) (\\*|\\/) (\\d+\\.\\d+|\\d+)')
  const familyOnePattern = new RegExp('(\\d+|\\d+\\.\\d+) (\\+|\\-) (\\d+\\.\\d+|\\d+)')
  const maxDigits = 5
  const families = [
    {
      operators: ['+', '-'],
      difficultyLevel: 1,
    },
    {
      operators: ['*', '/'],
      difficultyLevel: 2,
    }
  ]
  var difficulty = 0
  var pattern = ''
  var ocurrences

  const genericEvaluation = (expr) => {
    for(let digitCounter = 1; digitCounter < maxDigits + 1; digitCounter++) {
      pattern += '\\d'
      ocurrences = expr.match(new RegExp(`(^|\\D)${pattern}\\D|(^|\\D)${pattern}$`, 'g'))
  
      if(ocurrences)
        difficulty += digitCounter * ocurrences.length
    }
  
    families.forEach((family) => {
      pattern = family.operators.map((operator) => {
        return '\\' + operator
      });
  
      ocurrences = expr.match(new RegExp(`${pattern.join('|')}`, 'g'))
      if(ocurrences)
        difficulty += family.difficultyLevel * ocurrences.length
    })
  }
  
  while(familyTwoPattern.test(exp)) {
    let zeroOperationPattern = new RegExp('((\\* 0($| ))|((^| )0 \\*))|((^| )0 /)')
    let oneOperationPattern = new RegExp('((^| )1 \\*)|((\\*|\\/) 1($| ))')
    let twoOperationPattern = new RegExp('((\\* 2($| ))|((^| )2 \\*))|(\\/ 2($| ))')
    let tenOperationPattern = new RegExp('((\\* 10($| ))|((^| )10 \\*))|(\\/ 10($| ))')
    let elevenOperationPattern = new RegExp('((^| )1+ \\* \\d($| ))|(\\d( ) \\* 1+($| ))')
    let currentEquation = exp.match(familyTwoPattern)[0]
    const identicalDivision = currentEquation.match(/\d+\.*\d*/g);

    if((zeroOperationPattern.test(exp) || oneOperationPattern.test(exp))||((identicalDivision[0] == identicalDivision[1]) && new RegExp('\\/').test(currentEquation))) {
      exp = exp.replace(familyTwoPattern, resolve_expression(exp.match(familyTwoPattern)[0]))
      continue
    }

    else if(twoOperationPattern.test(exp) || tenOperationPattern.test(exp) || elevenOperationPattern.test(exp))
      difficulty++

    else {
      if(new RegExp('\\/').test(currentEquation)) {
       if(resolve_expression(currentEquation.replace(new RegExp('\\/'), '%')) != 0) {
        difficulty++

        if(identicalDivision[1] > identicalDivision[0])
          difficulty++
      }
    }

    else
      if(new RegExp('\\.').test(currentEquation))
        difficulty++

      genericEvaluation(currentEquation)
    }

    exp = exp.replace(familyTwoPattern, resolve_expression(exp.match(familyTwoPattern)[0]))
  }

  while(familyOnePattern.test(exp)) {
    let currentEquation = exp.match(familyOnePattern)[0]

    if(!new RegExp('(^| )(0|1|2)($| )').test(exp))
      genericEvaluation(currentEquation)

    exp = exp.replace(familyOnePattern, resolve_expression(exp.match(familyOnePattern)[0]))
  }

  return difficulty;
}

/**
 * 
 * @param {number} val 
 * @return {array}
 */
function build_choices(val) {
  const choices = [val, 0, 0]

  if(parseInt(val) != val) {
    let chances = [math.randomInt(0, 101), math.randomInt(0, 101)]

    chances.forEach((chance, index) => {
      do {
        if(chance < 22) {
          const floatPart = val - parseInt(val)
          choices[index + 1] = val + math.random(0.01, 0.99 - floatPart)
        }

        else if(chance >= 22 && chance < 44) {
          const floatPart = val - parseInt(val);
          choices[index + 1] = val - math.random(0.01, floatPart - 0.01)
        }

        else if(chance >= 44 && chance < 66)
          choices[index + 1] = val + math.randomInt(1, 5)

        else if(chance >= 66 && chance < 88)
          choices[index + 1] = val - math.randomInt(1, val)

        else if(chance >= 88 && chance < 96) {
          do {
            choices[index + 1] = math.randomInt(val - 3, val + 3)
          } while(choices[index + 1] == val)
        }

        else
          choices[index + 1] = math.random(0, 5) * val
      } while((parseFloat(choices[index + 1].toFixed(2)) == parseFloat(choices[index].toFixed(2)))
        || parseFloat(choices[index + 1].toFixed(2)) == parseFloat(val.toFixed(2)))
    })
  }

  else {
    do {
      choices[1] = math.randomInt(val - 3, val + 3)
    } while(choices[1].toFixed(2) == val.toFixed(2))
    
    do {
      choices[2] = math.randomInt(val - 3, val + 3)
    } while(choices[2].toFixed(2) == val.toFixed(2) || choices[2].toFixed(2) == choices[1].toFixed(2))
  }

  choices[0] = parseFloat(choices[0].toFixed(2))
  choices[1] = parseFloat(choices[1].toFixed(2))
  choices[2] = parseFloat(choices[2].toFixed(2))

  choices.sort(() => math.random() - 0.5);

  return choices
}

/**
 * 
 * @param {number} val 
 * @return {boolean}
 */
function eval_choice(val) {
  return val == vars.Result
}
