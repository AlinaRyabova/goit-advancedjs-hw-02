import"./modulepreload-polyfill-ec808ebb.js";/* empty css               */import{i as m}from"./iziToast.min-d3ed333a.js";const c=document.querySelector('input[name ="delay"]'),i=document.querySelector('input[name="step"]'),a=document.querySelector('input[name="amount"]'),u=document.querySelector(".form");u.addEventListener("submit",s=>{s.preventDefault();const t=parseInt(c.value,10),o=parseInt(i.value,10),e=parseInt(a.value,10);l(e,t,o),u.reset()});function l(s,t,o){for(let e=0;e<s;e+=1)p(e+1,t+e*o).then(({position:n,delay:r})=>{m.success({title:"Fulfilled Promise",message:`Promise ${n} resolved in ${r}ms`})}).catch(({position:n,delay:r})=>{m.error({title:"Rejected Promise",message:`Promise ${n} rejected in ${r}ms`})})}function p(s,t){return new Promise((o,e)=>{const n=Math.random()>.3;setTimeout(()=>{n?o({position:s,delay:t}):e({position:s,delay:t})},t)})}
