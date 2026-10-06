"use client";
import { useEffect,useState } from "react";
export default function ThemeToggle() {
  const [dark,setDark]=useState(false);
  useEffect(()=>{setDark(document.documentElement.dataset.theme==="dark");},[]);
  return <button type="button" className="theme-toggle" aria-label={dark?"Use light theme":"Use dark theme"} onClick={()=>{
    const next=!dark;setDark(next);document.documentElement.dataset.theme=next?"dark":"light";
    try {localStorage.setItem("jw-theme",next?"dark":"light");} catch {}
  }}><svg aria-hidden="true" viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" strokeWidth="1.5">{dark?<><circle cx="12" cy="12" r="4"/><path d="M12 1v3m0 16v3M1 12h3m16 0h3M4 4l2 2m12 12 2 2M4 20l2-2M18 6l2-2"/></>:<path d="M20 15A8.5 8.5 0 0 1 9 4a8.5 8.5 0 1 0 11 11Z"/>}</svg></button>;
}
