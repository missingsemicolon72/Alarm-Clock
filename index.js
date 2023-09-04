const submit = document.getElementById('submit');
const form = document.getElementById('timeForm');
const timeInput = document.getElementById('datetime');
const regex = /^[0-9]{4}-[0-9]{2}-[0-9]{2}\s[0-9]{2}:[0-9]{2}:[0-9]{2}$/;

form.reset();
submit.addEventListener('click', setAlarm);

function setAlarm(e) {
    e.preventDefault();
    timeInput.disabled = true;
    submit.disabled = true;
    let display = document.getElementById('display');
    const valid = regex.test(timeInput.value);
    if(timeInput.value == "" || valid == false){
        display.style.backgroundColor = 'transparent';
        display.innerHTML = `<h2 class="text-danger fw-bold">Please enter valid time!</h2>
                            <button class="btn btn-secondary my-3 w-25" onclick="location.reload(true)">Reset</button>`;
    }else{
        let time = new Date(timeInput.value);
        let now = new Date();
        if(time - now <= 0){
            setTimeout(() => {
                display.style.backgroundColor = 'red';
                display.innerHTML = `<h2 class="text-white fw-bold">TIME'S UP !</h2>
                                    <button class="btn btn-secondary my-3 w-25" onclick="location.reload(true)">Stop Alarm</button>`;
                ringAlarm();
            }, time - now);
        }else{
            display.style.backgroundColor = 'transparent';
            display.innerHTML = `<h2 class="text-black fw-bold">Alarm will ring in ${time - now > 1000 && time - now <= 60000 ? (((time - now) / 1000)).toFixed(2) + ' seconds' : (((time - now) / 60000)).toFixed(2) + ' minutes'}</h2>
            <button class="btn btn-secondary my-3 w-25" onclick="location.reload(true)">Cancel Alarm</button>`;
            setTimeout(() => {
                display.style.backgroundColor = 'red';
                display.innerHTML = `<h2 class="text-center text-white fw-bold">TIME'S UP !</h2>
                                    <button class="btn btn-secondary my-3 w-25" onclick="location.reload(true)">Stop Alarm</button>`;
                ringAlarm();
            }, time - now);
        }
    }
}

function ringAlarm() {
    let audio = new Audio('https://cdn.pixabay.com/download/audio/2022/11/20/audio_662f2ae340.mp3?filename=ringtone-126505.mp3');
    audio.play();
}