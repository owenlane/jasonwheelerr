"use client";
import { useEffect,useRef,useState } from "react";
import { fallbackSrc,srcSet,type Frame } from "@/lib/images";
import { photoColors } from "./PhotoSections";

/** Homepage background only. No carousel UI, keyboard commands or slide navigation. */
export default function CinematicSequence({frames,dir}:{frames:Frame[];dir:string}) {
  const [index,setIndex]=useState(0);
  const [reduced,setReduced]=useState(true);
  const [visible,setVisible]=useState(false);
  const [tabVisible,setTabVisible]=useState(true);
  const root=useRef<HTMLDivElement>(null);
  const ready=useRef(new Set<number>());
  useEffect(()=>{
    const mq=matchMedia("(prefers-reduced-motion: reduce)");
    const update=()=>setReduced(mq.matches);update();mq.addEventListener("change",update);
    const vis=()=>setTabVisible(!document.hidden);vis();document.addEventListener("visibilitychange",vis);
    const observer=new IntersectionObserver(([e])=>setVisible(e.isIntersecting),{threshold:.1});
    if(root.current)observer.observe(root.current);
    return ()=>{mq.removeEventListener("change",update);document.removeEventListener("visibilitychange",vis);observer.disconnect();};
  },[]);
  useEffect(()=>{
    if(reduced||!visible||!tabVisible)return;
    const timer=setInterval(()=>setIndex(i=>{const next=(i+1)%frames.length;return ready.current.has(next)?next:i;}),8000);
    return ()=>clearInterval(timer);
  },[reduced,visible,tabVisible,frames.length]);
  return <div ref={root} className="photo-palette cinematic-backdrop relative isolate overflow-hidden" data-palette="night" data-cinematic="strip" style={{...photoColors({group:"strip",index:reduced?0:index}),borderBottom:"6px solid var(--primary)"}}>
    {frames.map((f,i)=><div key={f.base} aria-hidden={i!==(reduced?0:index)} className="absolute inset-0" style={{opacity:i===(reduced?0:index)?1:0,transition:reduced?"none":"opacity 1600ms ease-in-out"}}>
      <picture>
        <source type="image/avif" srcSet={srcSet(dir,f.base,"avif")} sizes="100vw"/>
        <source type="image/webp" srcSet={srcSet(dir,f.base,"webp")} sizes="100vw"/>
        <img src={fallbackSrc(dir,f.base)} alt={f.alt} width={1920} height={1080} fetchPriority={i===0?"high":"low"} loading={i===0?"eager":"lazy"} onLoad={()=>ready.current.add(i)} className="h-full w-full object-cover" style={{objectPosition:f.focal,transform:!reduced&&i===index?"scale(1.06)":"scale(1)",transition:reduced?"none":"transform 9600ms linear"}}/>
      </picture>
    </div>)}
    <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-24" style={{background:"linear-gradient(transparent, color-mix(in srgb,var(--supporting) 40%,#0a0614))"}}/>
  </div>;
}
