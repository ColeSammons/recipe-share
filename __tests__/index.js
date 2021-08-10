//makes tab usable in text area
document.getElementById("myInput");
if (myInput.addEventListener) {
    myInput.addEventListener('keydown', this.keyHandler, false);
} else if (myInput.attachEvent) {
    myInput.attachEvent('onkeydown', this.keyHandler);
}

function keyHandler(e) {
    var TABKEY = 9;
    if (e.keyCode == TABKEY) {
        this.value += "\t";
        if (e.preventDefault) {
            e.preventDefault();
        }
        return false;
    }
}

let input_area = $("#myInput");
let err = $(".err");

function processText() {
    
    let curr_input = input_area[0].value;
    let curr_input_array = curr_input.split('');
    // console.log(curr_input_array);
    let code = ` hello `;
    let code_array = code.split('');
    // console.log(code_array);
    // console.log(code.trim(), code.trim().length)
    let errors = 0;

    code_array.forEach((char, index) => {
        let typedChar = curr_input_array[index];
        if (typedChar == null) {
            char.classList.remove('correct_char');
            char.classList.remove('incorrect_char');
      
            // correct characters
          } else if (typedChar === char.innerText) {
            char.classList.add('correct_char');
            char.classList.remove('incorrect_char');
      
            // incorrect characters
          } else {
            char.classList.add('incorrect_char');
            char.classList.remove('correct_char');
      
            // increment number of errors
            errors++;
          }

    })
  }