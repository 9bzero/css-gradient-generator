import{useState}from'react'
  const PRESETS=[
    {name:'Ocean',stops:['#0ea5e9','#6366f1'],type:'linear',deg:135},
    {name:'Sunset',stops:['#f59e0b','#ef4444','#7c3aed'],type:'linear',deg:45},
    {name:'Forest',stops:['#059669','#0ea5e9'],type:'linear',deg:90},
    {name:'Rose',stops:['#f43f5e','#ec4899','#a855f7'],type:'linear',deg:135},
    {name:'Radial',stops:['#38bdf8','#0f172a'],type:'radial',deg:0},
    {name:'Neon',stops:['#00ff88','#00bfff','#ff00ff'],type:'linear',deg:45},
  ]
  export default function App(){
    const[type,setType]=useState<'linear'|'radial'>('linear')
    const[deg,setDeg]=useState(135)
    const[stops,setStops]=useState(['#0ea5e9','#6366f1'])
    const[copied,setCopied]=useState(false)
    const gradient=type==='linear'?`linear-gradient(${deg}deg, ${stops.join(', ')})`:`radial-gradient(circle, ${stops.join(', ')})`
    const css=`background: ${gradient};`
    const copy=()=>{navigator.clipboard.writeText(css);setCopied(true);setTimeout(()=>setCopied(false),2000)}
    const addStop=()=>stops.length<6&&setStops([...stops,'#ffffff'])
    const removeStop=(i:number)=>stops.length>2&&setStops(stops.filter((_,idx)=>idx!==i))
    const updateStop=(i:number,c:string)=>setStops(stops.map((s,idx)=>idx===i?c:s))
    return(
      <div style={{minHeight:'100vh',background:'#0f172a',display:'flex',fontFamily:'Inter,system-ui,sans-serif',color:'#e2e8f0'}}>
        <div style={{width:340,borderRight:'1px solid #1e293b',padding:'2rem',display:'flex',flexDirection:'column',gap:'1.25rem',overflowY:'auto',flexShrink:0}}>
          <h1 style={{fontWeight:800,fontSize:'1.4rem',color:'#f8fafc'}}>🎨 Gradient Generator</h1>
          <div>
            <label style={{color:'#94a3b8',fontSize:'0.8rem',display:'block',marginBottom:'0.5rem'}}>TYPE</label>
            <div style={{display:'flex',gap:'0.5rem'}}>
              {(['linear','radial'] as const).map(t=><button key={t} onClick={()=>setType(t)} style={{flex:1,padding:'0.5rem',background:type===t?'#1e40af':'#1e293b',color:type===t?'#93c5fd':'#94a3b8',border:'none',borderRadius:6,cursor:'pointer',fontWeight:500,textTransform:'capitalize'}}>{t}</button>)}
            </div>
          </div>
          {type==='linear'&&<div>
            <div style={{display:'flex',justifyContent:'space-between',marginBottom:'0.4rem'}}>
              <label style={{color:'#94a3b8',fontSize:'0.8rem'}}>ANGLE</label>
              <span style={{color:'#38bdf8',fontFamily:'monospace',fontSize:'0.85rem'}}>{deg}°</span>
            </div>
            <input type="range" min={0} max={360} value={deg} onChange={e=>setDeg(+e.target.value)} style={{width:'100%',accentColor:'#38bdf8'}}/>
          </div>}
          <div>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'0.75rem'}}>
              <label style={{color:'#94a3b8',fontSize:'0.8rem'}}>COLOR STOPS</label>
              <button onClick={addStop} style={{background:'#1e293b',border:'1px solid #334155',color:'#38bdf8',borderRadius:4,padding:'0.2rem 0.6rem',cursor:'pointer',fontSize:'0.8rem'}}>+ Add</button>
            </div>
            {stops.map((s,i)=>(
              <div key={i} style={{display:'flex',gap:'0.5rem',alignItems:'center',marginBottom:'0.5rem'}}>
                <input type="color" value={s} onChange={e=>updateStop(i,e.target.value)} style={{width:40,height:36,border:'none',background:'none',cursor:'pointer',borderRadius:4}}/>
                <span style={{fontFamily:'monospace',color:'#94a3b8',fontSize:'0.85rem',flex:1}}>{s.toUpperCase()}</span>
                <button onClick={()=>removeStop(i)} style={{background:'none',border:'none',color:'#475569',cursor:'pointer',fontSize:'1rem',padding:'0 0.25rem'}}>×</button>
              </div>
            ))}
          </div>
          <div>
            <label style={{color:'#94a3b8',fontSize:'0.8rem',display:'block',marginBottom:'0.5rem'}}>PRESETS</label>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'0.5rem'}}>
              {PRESETS.map(p=><button key={p.name} onClick={()=>{setType(p.type as 'linear'|'radial');setStops(p.stops);setDeg(p.deg)}} style={{height:40,borderRadius:8,border:'none',cursor:'pointer',background:`${p.type==='linear'?`linear-gradient(${p.deg}deg,`:`radial-gradient(circle,`}${p.stops.join(',')})`}}>{p.name}</button>)}
            </div>
          </div>
          <div style={{background:'#111827',border:'1px solid #334155',borderRadius:8,padding:'0.75rem 1rem'}}>
            <code style={{color:'#86efac',fontSize:'0.8rem',fontFamily:'JetBrains Mono,monospace',wordBreak:'break-all'}}>{css}</code>
          </div>
          <button onClick={copy} style={{padding:'0.75rem',background:copied?'#16a34a':'linear-gradient(135deg,#0ea5e9,#6366f1)',color:'#fff',border:'none',borderRadius:8,cursor:'pointer',fontWeight:700,fontSize:'0.9rem'}}>
            {copied?'✓ Copied!':'Copy CSS'}
          </button>
        </div>
        <div style={{flex:1,background:gradient,transition:'background 0.3s',display:'flex',alignItems:'center',justifyContent:'center'}}>
          <div style={{background:'rgba(0,0,0,0.35)',backdropFilter:'blur(10px)',borderRadius:12,padding:'1.5rem 2rem',textAlign:'center',border:'1px solid rgba(255,255,255,0.1)'}}>
            <div style={{fontSize:'2rem',marginBottom:'0.5rem'}}>✨</div>
            <p style={{fontWeight:600,fontSize:'1rem'}}>Live Preview</p>
            <p style={{color:'rgba(255,255,255,0.6)',fontSize:'0.8rem',marginTop:'0.25rem'}}>{type} · {type==='linear'?deg+'°':'circle'}</p>
          </div>
        </div>
      </div>
    )
  }