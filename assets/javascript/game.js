
var game =
    {
        wordLibrary: ["theatre", "mansion", "house","skyscraper","building","shack","hovel"],
        theWord: "",
        usedL: [],
        guess: 14,
        win: 0,
        loss: 0,
        userWord: "",
        chooseWord: function () {
            var randomNum = Math.floor(Math.random() * this.wordLibrary.length);
            return this.wordLibrary[randomNum];
        },
        reset: function () {
            this.guess = 14;
            this.theWord = this.chooseWord();
            this.userWord = "";
            for (i = 0; i < this.theWord.length; i++) {
                this.userWord += "_";
            }
            this.usedL = [];
            this.updateStats();
            console.log("yo")
        },
        isValid: function (input) {
            if (this.theWord.includes(input)) {
                return true;
            }
            return false;
        },
        // isDupe:function(input)
        // {
        // },
        updateStats: function () {
            document.getElementById("used").textContent = this.usedL.toString();
            document.getElementById("guesses").textContent = this.guess;
            document.getElementById("wins").textContent = this.win;
            document.getElementById("losses").textContent = this.loss;
            document.getElementById("word").textContent = this.userWord;
        },
        success: function (input) {
            this.usedL.push(input);
            //var indexes=[];
            for (i = 0; i < this.theWord.length; i++) {
                if (this.theWord.charAt(i) == input) {
                    //indexes.push(i);
                    console.log(this.theWord.charAt(i));
                    this.userWord = this.userWord.substring(0, i) + input + this.userWord.substring(i + 1, this.userWord.length);
                }
            }
            //this.guess--;
            this.updateStats();
            document.getElementById("message").textContent ="Yay!";
            if (this.userWord == this.theWord) {
                this.win++;
                this.reset();
                document.getElementById("message").textContent = "You win! Play Again?";
            }
        },
        failure: function (input) {
            this.guess--;
            this.usedL.push(input);
            document.getElementById("message").textContent ="Ow!"
            if (game.guess == 0) {
                this.loss++;
                this.reset();
                document.getElementById("message").textContent ="You lost! Try Again?"
            }
            this.updateStats();
        }
    };
function weirdInput(input)
{
    var lets=["q","w","e","r","t","y","u","i","o","p","a","s","d","f","g","h","j","k","l","z","x","c","v","b","n","m"];
    for(i=0;i<lets.length;i++)
    {
        if(lets[i]==input)
        {
            return false;
        }
    }
    return true;
}

window.onload = function start() {
    game.reset();
}
document.onkeyup = function (event) {
    var input = event.key;
    console.log(input);
    console.log(game.theWord);
    if (game.usedL.includes(input)) {
        game.guess--;
        game.updateStats();
        document.getElementById("message").textContent = "You already tried that! Please choose again";
    }
    else if (input.length>1||weirdInput(input))
    {
        game.guess--;
        game.updateStats();
        document.getElementById("message").textContent = "Please only use letters";
    }
    else if (game.isValid(input)) {
        game.success(input);
    }
    else {
        game.failure(input);
    }
}