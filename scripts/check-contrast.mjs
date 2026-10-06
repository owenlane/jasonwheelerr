// V3 token contrast. Reads the actual stylesheet, including dark card mixtures.
// This does not certify text over photos or overall accessibility conformance.
import fs from "node:fs";
import postcss from "postcss";
const css=postcss.parse(fs.readFileSync(new URL("../app/globals.css",import.meta.url),"utf8"));
const rules={};let theme={};
function declarations(n){return Object.fromEntries((n.nodes??[]).filter(x=>x.type==="decl").map(x=>[x.prop,x.value]));}
css.walkAtRules("theme",n=>{theme=declarations(n);});
css.walkRules(n=>{rules[n.selector]={...rules[n.selector],...declarations(n)};});
function rgb(h){return h.slice(1).match(/../g).map(n=>parseInt(n,16));}
function resolve(v,vars){
 if(!v)throw Error("Missing color");
 if(v.startsWith("var("))return resolve(vars[v.slice(4,-1)],vars);
 if(v.startsWith("color-mix(")){
  const m=v.match(/^color-mix\(in srgb,(var\([^)]+\)) (\d+)%,(var\([^)]+\))\)$/);
  if(!m)throw Error(v);const a=rgb(resolve(m[1],vars)),b=rgb(resolve(m[3],vars)),t=Number(m[2])/100;
  return "#"+a.map((n,i)=>Math.round(n*t+b[i]*(1-t)).toString(16).padStart(2,"0")).join("");
 }
 return v;
}
function lum(h){return rgb(h).map(x=>x/255).map(x=>x<=.04045?x/12.92:((x+.055)/1.055)**2.4).reduce((a,x,i)=>a+x*[.2126,.7152,.0722][i],0);}
function contrast(a,b){const x=lum(a),y=lum(b);return (Math.max(x,y)+.05)/(Math.min(x,y)+.05);}
let total=0;const failures=[];
function check(label,a,b,vars){const x=resolve(a,vars),y=resolve(b,vars),r=contrast(x,y);total++;if(r<4.5)failures.push({label,foreground:x,background:y,ratio:r.toFixed(2)});}
for(const dark of [false,true]){
 const global={...theme,...(dark?rules[':root[data-theme="dark"]']:{})};
 for(const bg of ["--color-paper","--color-paper-2"]) for(const fg of ["--color-ink","--color-ink-soft"]){
  const foreground=bg==="--color-paper-2"&&fg==="--color-ink-soft"?rules[dark?'[data-theme="dark"] .bg-surface-2':'.bg-surface-2']["--color-on-surface-2"]:global[fg];
  check((dark?"dark":"light")+" "+fg+" / "+bg,foreground,global[bg],global);
 }
 const palettes=["valley","winter","desert","night","water","park","speedway","interior","gym"];
 for(const palette of palettes){
  const v={...global,...rules[".photo-palette"],...rules[`[data-palette="${palette}"]`],...(dark?rules['[data-theme="dark"] .photo-palette']:{})};
  if(dark)Object.assign(v,rules[`[data-theme="dark"] [data-palette="${palette}"]`]??{});
  for(const fg of ["--scene-text","--scene-body","--scene-link"])check(`${dark?"dark":"light"} ${palette} ${fg}`,v[fg],v["--scene-card"],v);
  check(`${palette} button`,v["--scene-button-text"],v["--scene-button"],v);
 }
}
console.log(`${total-failures.length}/${total} V3 token pairs pass`);
if(failures.length){console.table(failures);process.exitCode=1;}
