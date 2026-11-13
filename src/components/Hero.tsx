import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { SplitText } from "gsap/all"
import { useRef } from "react"
import { useMediaQuery } from "react-responsive"



export default function Hero(){
    const videoRef = useRef<HTMLVideoElement | null>(null)

    const isMobile = useMediaQuery({maxWidth:767})

    useGSAP(()=>{
        const heroSplit= new SplitText('.title',{type:'chars, words'})
        const paraSplit= new SplitText('.subtitle',{type:'lines'})

        heroSplit.chars.forEach((char)=>char.classList.add('text-gradient'))
        gsap.from(heroSplit.chars,{
            yPercent:100,
            duration:1.8,
            ease:'expo.out',
            stagger:0.06
        })
        gsap.from(paraSplit.lines,{
            opacity:0,
            yPercent:100,
            duration:1.8,
            ease:'expo.out',
            stagger:0.06,
            delay:1
        })

        const heroScrollTrigger = gsap.timeline({
            scrollTrigger:{
                trigger:'#hero',
                start:'top top',
                end:'bottom top',
                scrub:true
            }
        })

        heroScrollTrigger.to('.right-leaf',{y: 200},0)
        heroScrollTrigger.to('.left-leaf',{y: -200},-0)

        const startValue = isMobile ? 'top 50%' : 'center 58%'
        const endValue = isMobile ? '120% top' : 'bottom top'

        const videoTimelineRef = gsap.timeline(
            {scrollTrigger:{
                trigger:'video',
                start:startValue,
                end:endValue,
                scrub:true, //play as scroll
                pin:true, //stop video as scroll stop
                //onEnter: ()=> videoRef.current?.play(),
                //onEnterBack: ()=> videoRef.current?.play(),
                //onLeave: ()=> videoRef.current?.pause(),
                //onLeaveBack: ()=> videoRef.current?.pause()
            }}
        )
        
        const video = videoRef.current
        if (video) {
            video.onloadedmetadata = () => {
               videoTimelineRef.to(video, {
                   currentTime: video.duration
                })
           }
       }
        
    },[])



    return(
        <>
        <section id="hero" className="noisy">
            <h1 className="title">MOJITO</h1>
            <img
                src="/images/hero-left-leaf.png"
                alt="left-leaf"
                className="left-leaf"
            />
            <img
                src="/images/hero-right-leaf.png"
                alt="right-leaf"
                className="right-leaf"
            />
            <div className="body">
                <div className="content">
                    <div className="space-y-5 hidden md:block">
                        <p>cool. crisp. clasic.</p>
                        <p className="subtitle">
                            Sip the Spirit <br/> of summer
                        </p>
                    </div>
                    <div className="view-cocktails">
                        <p className="subtitle">
                            Every cocktail on our menu is a blend of premium ingredients, creative flair, and timeless recipes 
                            — designed to delight your senses. 
                        </p>
                        <a href="#cocktails">View Cocktails</a>
                    </div>
                </div>
            </div>
        </section>
        
        <div className="video absolute inset-0">
            <video ref={videoRef} src="/videos/output.mp4" muted playsInline preload="auto"/>
        </div>
        </>
    )
}