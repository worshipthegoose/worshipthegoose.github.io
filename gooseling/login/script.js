const usernames = ["thenumberonegooseling", "thegoose", "testaccount", "agooseworshipper"];
const crypt = ["omwozixpgbwbpmowwam", "bpmpwtgaiqvblcks", "bmabikkwcvb", "xtmiamkpivombpqaowwam"];
const passwords = crypt.map(item => superShift(item, false));

function superShift(str, type) {
    let shiftBy = type ? 8 : -8;
    const normalizedShift = ((shiftBy % 26) + 26) % 26;
    return str.split('').map(char => {
        const code = char.charCodeAt(0);
        if (code >= 65 && code <= 90) {
            return String.fromCharCode(((code - 65 + normalizedShift) % 26) + 65);
        }
        if (code >= 97 && code <= 122) {
            return String.fromCharCode(((code - 97 + normalizedShift) % 26) + 97);
        }
        return char;
    }).join('');
}

function getCookie(name) {
    let match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    if (match) return match;
    return null;
}

document.addEventListener("DOMContentLoaded", function(){
    const usernameInput = document.querySelector("#username");
    const passcodeInput = document.querySelector("#passcode");
    const errorMessage = document.querySelector("#auth p");
    const authForm = document.querySelector("#auth");
    
    if (getCookie('is-developer') === 'true') {
        window.location.replace('/gooseling');
    }

    const eye1 = document.querySelector('#eye-1');
    const eye2 = document.querySelector('#eye-2');

    if (eye1 && usernameInput) {
        eye1.addEventListener('click', () => {
            if (usernameInput.type === 'password') {
                usernameInput.type = 'text';
                eye1.src = '/pages/welcome/icons/eye-close-up.png';
            } else {
                usernameInput.type = 'password';
                eye1.src = '/pages/welcome/icons/eyebrow.png';
            }
        });
    }

    if (eye2 && passcodeInput) {
        eye2.addEventListener('click', () => {
            if (passcodeInput.type === 'password') {
                passcodeInput.type = 'text';
                eye2.src = '/pages/welcome/icons/eye-close-up.png';
            } else {
                passcodeInput.type = 'password';
                eye2.src = '/pages/welcome/icons/eyebrow.png';
            }
        });
    }

    [usernameInput, passcodeInput].forEach(input => {
        if (!input) return;
        
        input.addEventListener('input', () => {
            input.value = input.value.replace(/[^a-zA-Z]/g, '');
        });
    });

    if (authForm) {
        authForm.addEventListener('submit', (event) => {
            event.preventDefault();
            validateCredentials();
        });
    }

    function validateCredentials() {
        const enteredUser = usernameInput.value;
        const enteredPass = passcodeInput.value;
        const userIndex = usernames.indexOf(enteredUser);

        if (userIndex !== -1 && passwords[userIndex] === enteredPass) {
            document.cookie = `is-developer=true; path=/`;
            document.cookie = `dev-username=${encodeURIComponent(usernames[userIndex])}; path=/`;
            window.location.replace('/gooseling');
        } else {
            if (errorMessage) {
                errorMessage.textContent = "Incorrect username or password";
            }
        }
    }
});
