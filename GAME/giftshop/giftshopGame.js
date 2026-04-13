// document.addEventListener('DOMContentLoaded', () => {

// const trolley = document.getElementById('trolley');
// const cable = document.querySelector('.cable');
// const claw = document.getElementById('claw');
// const prizeContainer = document.getElementById('prize-container');

// const leftBtn = document.getElementById('move-left');
// const rightBtn = document.getElementById('move-right');
// const dropBtn = document.getElementById('drop-claw');

// let pos = 130;
// let busy = false;
// let grabbedPrize = null;

// /* CREATE TOYS */
// const colors=["#ff4d6d","#ffd93d","#6bcB77","#4d96ff","#ff8fab"];
// for(let i=0;i<14;i++){
//   const toy=document.createElement("div");
//   toy.className="prize";
//   toy.style.background=colors[Math.floor(Math.random()*colors.length)];
//   toy.style.left=Math.random()*240+"px";
//   toy.style.bottom=Math.random()*70+"px";
//   prizeContainer.appendChild(toy);
// }

// /* MOVE */
// leftBtn.onclick=()=>{ if(!busy && pos>10){ pos-=40; trolley.style.left=pos+"px"; }};
// rightBtn.onclick=()=>{ if(!busy && pos<250){ pos+=40; trolley.style.left=pos+"px"; }};

// dropBtn.onclick = async ()=>{
//  if(busy) return;
//  busy=true;

//  await dropClaw();
//  grabCheck();
//  await liftClaw();
//  await returnHome();

//  busy=false;
// };

// function wait(t){ return new Promise(r=>setTimeout(r,t)); }

// async function dropClaw(){
//  cable.style.height="220px";
//  claw.style.top="240px";
//  await wait(1000);
//  claw.classList.add("closing");
//  await wait(500);
// }

// async function liftClaw(){
//  cable.style.height="40px";
//  claw.style.top="60px";
//  await wait(1000);
//  claw.classList.remove("closing");
// }

// async function returnHome(){
//  trolley.style.left="130px";
//  pos=130;
//  await wait(1000);

//  if(grabbedPrize){
//    grabbedPrize.remove();
//    grabbedPrize=null;
//    alert("You won a prize! 🎉");
//  }
// }

// function grabCheck(){
//  const clawRect=claw.getBoundingClientRect();
//  document.querySelectorAll(".prize").forEach(toy=>{
//    const rect=toy.getBoundingClientRect();

//    const hit=
//      rect.left < clawRect.right &&
//      rect.right > clawRect.left &&
//      rect.top < clawRect.bottom &&
//      rect.bottom > clawRect.top;

//    if(hit && !grabbedPrize){
//      grabbedPrize=toy;
//      toy.style.transition="all 1s";
//      toy.style.bottom="230px";
//      toy.style.left=pos+"px";
//    }
//  });

// }

// });