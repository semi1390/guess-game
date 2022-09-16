const content = document.querySelector('.content');
const container = document.querySelector('.container');
const card = document.querySelector('.card');
const guessInput = document.querySelector('#guess-input');
const guessBtn = document.querySelector('#guess-btn');
const msg1 = document.querySelector('.guess');
const msg2 = document.querySelector('.number-of-guesses');
const msg3 = document.querySelector('.guessed-numbers');

let min = 1,
    max = 100,
    numberOfGuesses = 0,
    guesses = [],
    winningGuess = winningGuessed(min, max);

    // Play again
    content.addEventListener('mousedown', function(e){
        if (e.target.className === 'play-again'){
            window.location.reload();
        }
    })

    // Listen for guess
    guessBtn.addEventListener('click', function(){
        let guess = parseInt(guessInput.value);

        if(guess < min || guess > max || isNaN(guess)){
            showError('Please input a number less than 100 or greater than 1');
        }

        // Check if won
        if(guess === winningGuess){
            numberOfGuesses += 1;
            guessInput.disabled = true;
            msg1.textContent = `YIPPE, YOU WIN!`;
            msg2.innerHTML = `The number was ${winningGuess}`;
            msg3.innerHTML = `You guessed it in ${numberOfGuesses} guesses!`;
            msg1.style.color = 'green';
            guessBtn.value = 'PLAY AGAIN';
            guessBtn.className += 'play-again';
        } else{
            guesses.push(guess);
            numberOfGuesses += 1;
            if(guess < winningGuess){
                msg1.textContent = 'Your guess is to low.'
                msg2.innerHTML = `No. of guesses: ${numberOfGuesses}`;
                msg3.innerHTML = `Guessed numbers are: ${guesses}`
                guessInput.value = '';
            } else if(guess > winningGuess){
                msg1.textContent = 'Your guess is to high.'
                msg2.innerHTML = `No. of guesses none: ${numberOfGuesses}`;
                msg3.innerHTML = `Guessed numbers are: ${guesses}`
                guessInput.value = '';
            }
        }
    });

    // Show error message
    function showError(message){
        const div = document.createElement('div');
        div.className = 'alert-card';
        div.appendChild(document.createTextNode(message));
        container.insertBefore(div, card);
        setTimeout(clearError, 3000);
    }
    
    // Clear error message
    function clearError(){
        document.querySelector('.alert-card').remove();
    }

    // Winning guess
    function winningGuessed(min, max){
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    console.log(guesses);
