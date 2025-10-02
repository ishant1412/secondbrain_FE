import React, { ReactElement, useState, useEffect , useRef} from "react"
import {File,Twitter,Link,Share, Delete, Trash, CrossIcon, Circle, CircleX, Notebook, Instagram, Image, Newspaper, Pencil} from "lucide-react"
import { ObjectId } from "mongoose";
import axios from "axios";


interface CardProps {

    infotype: "tweet" | "video" | "notes"|"image"|"article"|"instapost"|"document";
    title: string;
     shared:boolean|undefined
    Link:string;
    description: string;
    tags: string[];
    selection:boolean|undefined;
    id:ObjectId;
    oncheckhandler:(id:ObjectId,check:boolean)=>void|undefined;
    ondeletehandler:()=>void|undefined;
    
  }


const getYouTubeVideoId = (url) => {
  if (!url) return null;
  
  // Remove any whitespace
  url = url.trim();
  
  // Different YouTube URL patterns
  const patterns = [
    // Standard watch URL
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/,
    // Short URL
    /(?:https?:\/\/)?youtu\.be\/([a-zA-Z0-9_-]{11})/,
    // Embed URL
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/,
    // YouTube Shorts
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/,
    // Mobile URL
    /(?:https?:\/\/)?m\.youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/,
    // Just the video ID
    /^([a-zA-Z0-9_-]{11})$/
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) {
      return match[1];
    }
  }
  
  return null;
};

// YouTube Embed Component
const YouTubeEmbed = ({ 
  url, 
  width = 560, 
  height = 315, 
  autoplay = false,
  mute = false,
  loop = false,
  controls = true,
  showinfo = true,
  modestbranding = false,
  start = null,
  end = null,
  title = "YouTube video player"
}) => {
  const videoId = getYouTubeVideoId(url);
  
  if (!videoId) {
    return (
      <div className="bg-red-50 border border-red-200 rounded p-4 text-red-700">
        <p className="font-semibold">Invalid YouTube URL</p>
        <p className="text-sm">Please provide a valid YouTube URL or video ID</p>
      </div>
    );
  }
  
  // Build embed URL with parameters
  const buildEmbedUrl = () => {
    const params = new URLSearchParams();
    
    if (autoplay) params.set('autoplay', '1');
    if (mute) params.set('mute', '1');
    if (loop) params.set('loop', '1');
    if (!controls) params.set('controls', '0');
    if (!showinfo) params.set('showinfo', '0');
    if (modestbranding) params.set('modestbranding', '1');
    //@ts-ignore
    if (start) params.set('start', start.toString());
    //@ts-ignore
    if (end) params.set('end', end.toString());
    
    const queryString = params.toString();
    const baseUrl = `https://www.youtube.com/embed/${videoId}`;
    
    return queryString ? `${baseUrl}?${queryString}` : baseUrl;
  };
  
  return (
    <div className="" style={{ width: `${width}px`, height: `${height}px` }}>
      <iframe
        width={width}
        height={height}
        src={buildEmbedUrl()}
        title={title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="rounded-lg shadow-lg"
      />
    </div>
  );
};

interface InstagramEmbedProps {
  url: string;
  width?: number;
  height?: number;
  className?: string;
}

// Extend Window interface for TypeScript
declare global {
  interface Window {
    instgrm: {
      Embeds: {
        process: () => void;
      };
    };
  }
}


const InstagramEmbed: React.FC<InstagramEmbedProps> = ({ 
  url, 
  width = 500, 
  height = 140,
  className = ''
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadInstagramEmbed = async () => {
      try {
        // Validate Instagram URL
        if (!url.includes('instagram.com')) {
          setError('Invalid Instagram URL');
          setLoading(false);
          return;
        }

        // Convert URL to embed URL if needed
        const embedUrl = url.includes('/embed') ? url : `${url}embed/`;

        // Check if Instagram embed script is already loaded
        if (!window.instgrm) {
          const script = document.createElement('script');
          script.src = '//www.instagram.com/embed.js';
          script.async = true;
          
          script.onload = () => {
            if (window.instgrm && window.instgrm.Embeds) {
              createEmbed(embedUrl);
            }
          };

          document.head.appendChild(script);
        } else {
          createEmbed(embedUrl);
        }
      } catch (err) {
        setError('Failed to load Instagram embed');
        setLoading(false);
      }
    };

    const createEmbed = (embedUrl: string) => {
      if (!containerRef.current) return;

      // Clear container
      containerRef.current.innerHTML = '';

      // Create blockquote element for Instagram embed
      const blockquote = document.createElement('blockquote');
      blockquote.className = 'instagram-media';
      blockquote.setAttribute('data-instgrm-captioned', '');
      blockquote.setAttribute('data-instgrm-permalink', url);
      blockquote.setAttribute('data-instgrm-version', '14');
      blockquote.style.background = '#FFF';
      blockquote.style.border = '0';
      blockquote.style.borderRadius = '3px';
      blockquote.style.boxShadow = '0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15)';
      blockquote.style.margin = '1px';
      blockquote.style.maxWidth = '540px';
      blockquote.style.minWidth = '326px';
      blockquote.style.padding = '0';
      blockquote.style.width = '100%';

      // Create fallback link
      const link = document.createElement('a');
      link.href = url;
      link.textContent = 'View this post on Instagram';
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.style.color = '#c9c8cd';
      link.style.fontFamily = 'Arial,sans-serif';
      link.style.fontSize = '14px';
      link.style.fontStyle = 'normal';
      link.style.fontWeight = 'normal';
      link.style.lineHeight = '17px';
      link.style.textDecoration = 'none';

      blockquote.appendChild(link);
      containerRef.current.appendChild(blockquote);

      // Process Instagram embeds
      if (window.instgrm && window.instgrm.Embeds) {
        window.instgrm.Embeds.process();
        setLoading(false);
      } else {
        // Fallback timeout
        setTimeout(() => {
          setLoading(false);
        }, 3000);
      }
    };

    loadInstagramEmbed();
  }, [url]);

  return (
    <div 
      className={`instagram-embed-container overflow-hidden ${className}`}
      style={{ width: width ? `${width}px` : '100%', height: `${height}px` }}
    >
      <div className="h-full w-85  overflow-auto">
        {loading && (
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-6 w-6 border-2 border-pink-500 border-t-transparent"></div>
            <span className="ml-2 text-sm text-gray-600">Loading Instagram post...</span>
          </div>
        )}
        
        {error && (
          <div className="flex items-center justify-center h-full text-red-500 text-sm">
            <span>{error}</span>
          </div>
        )}
        
        <div 
          ref={containerRef}
          className={`${loading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
        />
      </div>
    </div>
  );
};



 interface TwitterEmbedProps {
  tweetId: string;
  width?: number;
  height?: number;
  theme?: 'light' | 'dark';
  className?: string;
}

// Extend Window interface for TypeScript
declare global {
  interface Window {
    twttr: {
      widgets: {
        load: (element?: HTMLElement) => Promise<void>;
      };
    };
  }
}

const TwitterEmbed: React.FC<TwitterEmbedProps> = ({ 
  tweetId, 
  width = 400, 
  height = 300, 
  theme = 'light',
  
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadTwitterWidget = async () => {
      try {
        // Check if Twitter widgets script is already loaded
        if (!window.twttr) {
          const script = document.createElement('script');
          script.src = 'https://platform.twitter.com/widgets.js';
          script.async = true;
          script.charset = 'utf-8';
          
          script.onload = () => {
            if (window.twttr && window.twttr.widgets) {
              embedTweet();
            }
          };

          document.head.appendChild(script);
        } else {
          embedTweet();
        }
      } catch (err) {
        setError('Failed to load Twitter widget');
        setLoading(false);
      }
    };

    const embedTweet = () => {
      if (!containerRef.current) return;

      // Clear container
      containerRef.current.innerHTML = '';

      // Create blockquote element
      const blockquote = document.createElement('blockquote');
      blockquote.className = 'twitter-tweet';
      blockquote.setAttribute('data-theme', theme);
      
      // Create tweet link
      const link = document.createElement('a');
      link.href = `https://twitter.com/user/status/${tweetId}`;
      link.textContent = 'Loading tweet...';
      
      blockquote.appendChild(link);
      containerRef.current.appendChild(blockquote);

      // Use Twitter's widget API to render the tweet
      window.twttr.widgets.load(containerRef.current).then(() => {
        setLoading(false);
      }).catch(() => {
        setError('Failed to embed tweet');
        setLoading(false);
      });
    };

    loadTwitterWidget();
    
  }, [tweetId, theme]);
return (
    <div 
      className={`twitter-embed-container overflow-scroll`}
      style={{ width: width ? `${width}px` : '100%', height: `${height}px` }}
    >
      <div className="max-h-40 max-w-85 overflow-hidden">
        {loading && (
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-6 w-6 border-2 border-blue-500 border-t-transparent"></div>
            <span className="ml-2 text-sm text-gray-600">Loading...</span>
          </div>
        )}
        
        {error && (
          <div className="flex items-center justify-center h-full text-red-500 text-sm">
            <span>{error}</span>
          </div>
        )}
        
        <div 
          ref={containerRef}
          className={`${loading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
        />
      </div>
    </div>
  );
}

  
 


  type infotype =""
  // Updated styles
  const cardDesign = " bg-white p-3 h-65 w-90 ml-6 mt-1 font-poppins   rounded-md border-2 border-gray-300 shadow-sm b transition-transform duration-300 ease-in-out transform hover:scale-110 ml-3 mb-3 justify-between";
  const topBarStyle = "flex justify-between items-center mb-2";
  const tagStyle = "inline-block rounded-lg bg-gray-100 text-gray-700 px-2 py-1 mr-2 mb-2 text-xs border-0.5 ";
  const imageStyle = "h-35 w-full object-cover rounded-md mb-2";
  const iconStyle = "pt-1  mr-2";
  const iconStyle2="size-[20px] text-gray-500 hover:bg-gray-200 transition-transform duration-300  ease-in-out  hover:scale-110 transform rounded-md"
  const textStyle = "  font-semibold text-sm flex-wrap overflow-hidden w-ful mr-2";
  
  const icon = {
    tweet: <Twitter  />,
    document: <File  />,
    video: <Link  />,
    notes:<Notebook />,
    instapost:<Instagram ></Instagram>,
    image:<Image ></Image>,
    article:<Newspaper ></Newspaper>
    
  };
  
  
  export const Card = (props: CardProps) => {
    const [viewmore ,setviewmore]=useState(false);
   const [ischecked ,setischecked]=useState(false);

type url= string|null
   function extractTweetId(url:url) {
  const parts= url?.split("/status/");
  //@ts-ignore
  if (parts.length < 2) return null;
  //@ts-ignore

  const idPart = parts[1].split(/[/?#]/)[0]; // remove any trailing params
  return idPart;
}




  
     function changehandler(e:any){
      setischecked(e.target.checked)
      props.oncheckhandler(props.id,e.target.checked);
     }


     async function deletecontent(){
   const token=   localStorage.getItem("token");
   const id = props.id;
      const response = await axios.delete(`http://localhost:3000/api/v1/deletecontent/${id}`,{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      console.log(response.data);
      if(response.status===200){
       props.ondeletehandler();
      }
     }
    return (
      <div className={cardDesign}>
        {props.selection &&   <div className="justify-end flex pr-2 pb-1"> <label className="flex items-center cursor-pointer">
  <input type="checkbox" checked={ischecked} onChange={changehandler} className="peer hidden" />
  <div className="w-4 h-4 rounded-full border-2 border-blue-300 bg-blue-100 
              peer-checked:bg-blue-400 peer-checked:border-blue-500 transition-all"></div>
 
</label>
</div>  }
        {/* Top bar */}
        <div className={topBarStyle}>
          <div className="flex w-40">

            <div className={iconStyle} > {icon[props.infotype]}</div>
            <span className={textStyle}>{props.title}</span>
          </div>
          <div className="flex items-center space-x-2 pb-2">
            {!props.shared && ( <>          
            <Trash className={iconStyle2}  onClick={deletecontent}/>
            </>
          )
  }
          </div>
        </div>
  
        {/* Image */}
        <div className="h-52">
        <div className=" flex flex-wrap ">
          
          {props.infotype==="image"  && <img src={props.Link} className={imageStyle} alt="Card Visual" />}
          {props.infotype==="video" && (<YouTubeEmbed
          url={props.Link}
          width={330}
          height={140}></YouTubeEmbed>

)}
  
  
  
    
  {props.infotype==="tweet" && (

       <>  <div className="overflow-hidden w-fit max-h-50"><TwitterEmbed 
       //@ts-ignore
        tweetId={extractTweetId(props.Link)}
        height={140}
        className="rounded-md border"
      /> </div>
             </>
          )}
          {props.infotype==="instapost" && (<>
          <InstagramEmbed url={props.Link}></InstagramEmbed> </>)}

        </div>
  
        {props.infotype!=="notes"  &&<div className= " ml-2 mt-1 text-gray-600 text-sm mb-1 ">
          {props.description}
        </div>}
        {props.infotype==="notes" && <div className= " max-h-40 min-h-37 overflow-y-auto break-words mb-3">
          {props.description}
        </div>}
        
  
        {/* Tags */}
        <div className="flex flex-wrap  ">
          {props.tags.map((tag, index) => (
            <span key={index} className={tagStyle}>
             <div> {tag} </div>
            </span>
          ))}
        </div>
        </div>
       
      </div>
    );
  };
  