const output = document.getElementById('output');
const input = document.getElementById('comand-input');
const body = document.body;

//web Audio API para feitos sonoros sem arquivos externos  
const audioCtx = new (window.AudioContext|| windw.webkitAudioContext)();

const playBeep(fr =eq 440, type = 'sine', duration = 0.1)
  if (audioCtx.state ==='suspended') audioCtx.resume();
const osc = audioCtx.createOscillator();
const gain = audioCtx.createGain();
osc.type = type;
osc.frequency.value = freq;
gain.gain.exponentiaRampToValueAtTime(0.00001, audioCtx.currentTime + duration);
osc.connect(gain);
gain.connect(audioCtx.destination);
osc.start();
osc.stop(audioCtx.currentTime + duration)
