let pageIndex;
var HMTime;
var HMChars;
var origTime = HMTime;
var Interval;
let theRandomtoGuess = ''
var checker;
let score = 0
let hscore = 0
let tscore = 0;
let thscore = 0
var tInterval;
const selectionLetter = ['A',
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H',
    'I', 'J', 'K', 'L', 'M', 'N', 'P',
    'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X',
    'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f',
    'g', 'h', 'i', 'j', 'k', 'm', 'n',
    'o', 'p', 'q', 'r', 's', 't', 'u', 'v',
    'w', 'x', 'y', 'z', '1', '2', '3', '4',
    '5', '6', '7', '8', '9', '10', '0','0','0'];
    

var audfuse = new Audio('https://cdn.discordapp.com/attachments/903532794385432606/997243061480460368/Nfusenew.mp3');
audfuse.volume = 0.6;
var audmetronome = new Audio('https://cdn.discordapp.com/attachments/903532794385432606/997243062138982400/NmetroNome.mp3');
audmetronome.volume = 0.3;
var audcorrect = new Audio('https://cdn.discordapp.com/attachments/903532794385432606/996998799107035276/Correct.wav');
audcorrect.volume = 0.4;
var audboom = new Audio('https://cdn.discordapp.com/attachments/903532794385432606/997112007507595264/tntboom.mp3');
var aud100s = new Audio('https://cdn.discordapp.com/attachments/903532794385432606/997251042091728936/60_Seconds_Soundtrack_60_Seconds.mp3')
aud100s.volume = 0.2;
$('#easy').click(()=>{
HMTime = 10000;
HMChars = 5;
origTime = HMTime;
$('#timerV1').html(HMTime / 1000)
start();

});

$('#medium').click(()=>{
HMTime = 7000
HMChars = 6;
origTime = HMTime;
$('#timerV1').html(HMTime / 1000)
start();
});


$('#hard').click(()=>{
HMTime =  7000;
HMChars = 7;
origTime = HMTime;
$('#timerV1').html(HMTime / 1000)
start();
});

$('#veryhard').click(()=>{
HMTime = 5000;
HMChars = 8;
origTime = HMTime;
$('#timerV1').html(HMTime / 1000)
start();
});

function createRandomChar(){
    theRandomtoGuess = ''
    for(let i = 0; i < HMChars ;i++){
        theRandomtoGuess += selectionLetter[Math.floor(Math.random()*62)]
    }
    $('#trandomToGuess').html(theRandomtoGuess)
    $('#randomToGuess').html(theRandomtoGuess)

}

const userIn = document.getElementById('userInput')





function start(){
    clearInterval(Interval);
    clearInterval(checker);
    audmetronome.play();
    $('.version2').addClass('DN')
    audfuse.play();
    $('#userInput').val('').removeClass('DN')
    $('#randomToGuess').removeClass('DN');
    createRandomChar();
    $('.gamemodeContainer').addClass('DN');
    $('#imgTicking').removeClass('DN');
    $('#imgBoom').addClass('DN');
    $('.activeGameContainer').removeClass('DN');
    $('#userInput').focus();
    $('#timerV1').html(HMTime / 1000)
    HMTime -= 1000
    Interval = setInterval(()=>{
        if(HMTime == 0){ //LOSE Function
            audboom.play();
            audmetronome.pause();
            audmetronome.currentTime = 0;
            audfuse.pause()
            audfuse.currentTime = 0
            checkHighScore();
            score = 0
            $('#timerV1').html(HMTime / 1000);
            $('#imgTicking').addClass('DN')
            $('#imgBoom').removeClass('DN')
            $('#randomToGuess').addClass('DN')
            $('#userInput').val('').addClass('DN')
            clearInterval(Interval)
            setTimeout(()=>{
                $('.activeGameContainer').addClass('DN')
                $('.gamemodeContainer').removeClass('DN');
                $('.version2').removeClass('DN')
            },1500)
        };
        $('#timerV1').html(HMTime / 1000)
        HMTime -= 1000
    },1000);
    checker = setInterval(()=>{
        if($('#userInput').val() == theRandomtoGuess){
            gotIT();
            start();
        }
    },200)
}
function gotIT(){
    HMTime = origTime;
    score++
    $('#score').html(String(score))
    audcorrect.play();
    start();
}
$('#hundredSeconds').click(()=>{  // 100 seconds gamemode
    aud100s.play();
    $('#tuserInput').removeClass('DN')
    $('#trandomToGuess').removeClass('DN')
    $('.tgamemodeContainer').addClass('DN');
    $('.tactiveGameContainer').removeClass('DN')
    $('.version1').addClass('DN')
    $('#timgTicking').removeClass('DN')
    $('#timgBoom').addClass('DN')
    HMChars = 7;
    audmetronome.play();
    audfuse.play();
    createRandomChar();
    let ttimer = 60000
    $('#timerV2').html(ttimer / 1000);
    $('#tuserInput').val('').focus();
    tInterval = setInterval(()=>{
        if(ttimer == 0){ //LOSE Function 100seconds
            audboom.play();
            $('#timerV2').html(ttimer / 1000);
            clearInterval(tInterval)
            $('#timgTicking').addClass('DN')
            $('#timgBoom').removeClass('DN')
            audmetronome.pause();
            audmetronome.currentTime = 0;
            audfuse.pause()
            audfuse.currentTime = 0

            $('#tuserInput').addClass('DN')
            $('#trandomToGuess').addClass('DN')

            setTimeout(()=>{
                checkHighScore();
                tscore = 0;
                $('.tscore').html(String(tscore))
                $('.version1').removeClass('DN')
                $('.tactiveGameContainer').addClass('DN')
                $('.tgamemodeContainer').removeClass('DN');
            },1500)
        };
        $('#timerV2').html(ttimer / 1000)
        ttimer -= 1000
    },1000);
    checker = setInterval(()=>{
        if($('#tuserInput').val() == theRandomtoGuess){ //win
            $('#tuserInput').val('').focus();
            audcorrect.play();  
            createRandomChar();
            tscore++;
            $('.tscore').html(String(tscore))

        }
    },200)
});


function checkHighScore(){
    if(tscore > thscore){
        thscore = tscore
        $("#thscore").html(String(thscore))
    }
    if(score > hscore){
        hscore = score
        $("#hscore").html(String(hscore))

    }
};


$('#Play').click(()=>{ // PLay Navbar
    pageIndex = 1;
    changePage();
});
$('.how-to-play').click(()=>{
    pageIndex = 0;
    changePage();
});

$('#Tutorial-Documention').click(()=>{
    pageIndex = 0;
    changePage();
});

function changePage(){  
    if(pageIndex == 0){
        $('#Tutorial-Documention').addClass('DN');
        $('.gameContainer').addClass('DN')
        $('.documentationContainer').removeClass('DN');
        $('#Play').removeClass('DN');
        $('.xpad').addClass('DN');
        
    } else {
        $('#Tutorial-Documention').removeClass('DN');
        $('.gameContainer').removeClass('DN')
        $('.documentationContainer').addClass('DN');
        $('#Play').addClass('DN');
        $('.xpad').removeClass('DN');
        
    }
}