import type { CSSProperties, ReactNode } from "react";
import { group, srcSet, fallbackSrc, type GroupKey } from "@/lib/images";
import { Cta, Display, Shell } from "./primitives";

export type PhotoRef = { group: GroupKey; index: number };
const palettes: Record<GroupKey, string> = { strip:"night",charleston:"winter",calico:"desert",water:"water",arena:"night",park:"park",speedway:"speedway" };

/** Colors follow the actual source: daylight, evening, water, rock or snow. */
export function photoPalette(photo: PhotoRef) {
  if (photo.group === "arena" && photo.index === 0) return "valley";
  if (photo.group === "arena" && photo.index === 3) return "interior";
  if (photo.group === "water" && photo.index === 1) return "desert";
  return palettes[photo.group];
}
export function photoColors(photo: PhotoRef): CSSProperties {
  const variations: Partial<Record<GroupKey, string[][]>> = {
    strip:[["#ff2d8a","#f5c542","#00e5ff"],["#00a8c6","#f3d9a4","#4fae5b"],["#f5c542","#ff8a00","#3b82f6"],["#5ec4e0","#e8b84a","#3f6b2d"]],
    charleston:[["#c5d0dc","#5ec4e0","#7b6bb0"],["#8a9aab","#c9b8f0","#1c4e7a"],["#5ec4e0","#c5d0dc","#3ee0d2"]],
    calico:[["#3f6b2d","#e8b84a","#c45c26"],["#c45c26","#7ec8f0","#1e3b1a"],["#b8431a","#d9a066","#2f6f4e"]],
    arena:[["#2bb3c7","#e6c38a","#4fae5b"],["#ff2d8a","#f5c542","#6b2d8b"],["#3b82f6","#f5c542","#00e5ff"],["#b07a43","#f2d5a0","#7a2e3a"]],
    park:[["#4fae5b","#c45c26","#7ec8f0"],["#2bb3c7","#e8b84a","#c45c26"]],
    water:[["#5c6568","#7ec8f0","#2f6f4e"],["#c45c26","#e8b84a","#0e6e7a"],["#00a8c6","#e6c38a","#1c4e7a"]],
  };
  const values = variations[photo.group]?.[photo.index];
  return values ? { "--primary":values[0],"--secondary":values[1],"--supporting":values[2] } as CSSProperties : {};
}
export function Photo({ photo, className="", priority=false }: {photo:PhotoRef;className?:string;priority?:boolean}) {
  const g = group(photo.group); const f = g.frames[photo.index];
  return <picture className={className}>
    <source type="image/avif" srcSet={srcSet(g.dir,f.base,"avif")} sizes="(max-width:767px) 100vw, 70vw" />
    <source type="image/webp" srcSet={srcSet(g.dir,f.base,"webp")} sizes="(max-width:767px) 100vw, 70vw" />
    <img src={fallbackSrc(g.dir,f.base)} alt={f.alt} width={1920} height={1080} loading={priority?"eager":"lazy"} decoding="async" style={{objectPosition:f.focal}} />
  </picture>;
}
export function PhotoFigure({photo}:{photo:PhotoRef}) {
  const f=group(photo.group).frames[photo.index];
  return <figure className="photo-palette photo-frame" data-palette={photoPalette(photo)} style={photoColors(photo)}>
    <Photo photo={photo} />
    <figcaption className="photo-caption">{f.caption}</figcaption>
  </figure>;
}
export function PhotoStory({photo,label,heading,children,reverse=false,href}:{photo:PhotoRef;label:string;heading:string;children:ReactNode;reverse?:boolean;href?:string}) {
  return <section className={`photo-palette photo-story ${reverse?"reverse":""}`} data-palette={photoPalette(photo)} style={photoColors(photo)}>
    <Shell><div className="photo-story-grid">
      <PhotoFigure photo={photo} />
      <div className="photo-story-copy"><p className="microlabel">{label}</p><Display>{heading}</Display>{children}{href&&<Cta href={href} className="mt-7">Get in touch with me</Cta>}</div>
    </div></Shell>
  </section>;
}
export function PhotoBand({photo,label,heading,children,href}:{photo:PhotoRef;label:string;heading:string;children:ReactNode;href?:string}) {
  return <section className="photo-palette photo-band" data-palette={photoPalette(photo)} style={photoColors(photo)}>
    <Photo photo={photo}/><Shell><div className="band-copy"><p className="microlabel">{label}</p><Display>{heading}</Display>{children}{href&&<Cta href={href}>Get in touch with me</Cta>}</div></Shell>
  </section>;
}
export function PhotoDuo({photos}:{photos:[PhotoRef,PhotoRef]}) {
  return <Shell><div className="photo-duo">{photos.map(p=><PhotoFigure key={`${p.group}-${p.index}`} photo={p}/>)}</div></Shell>;
}
export function PageIntro({label,heading,description,children,intent}:{label:string;heading:string;description:string;children?:ReactNode;intent?:string}) {
  return <section><Shell><div className="page-intro"><p className="microlabel quiet">{label}</p><Display level={1}>{heading}</Display><p className="measure mt-6 text-lg quiet">{description}</p>{children}{intent&&<Cta className="mt-8" href={`/contact?intent=${intent}`}>Get in touch with me</Cta>}</div></Shell></section>;
}
