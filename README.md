<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>FAST STORE ⚡</title>
<script src="https://cdnjs.cloudflare.com/ajax/libs/react/18.2.0/umd/react.production.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.2.0/umd/react-dom.production.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/7.23.2/babel.min.js"></script>
<style>
  * { margin:0; padding:0; box-sizing:border-box; }
  body { background:#0A0A0F; font-family:'Segoe UI',Tahoma,sans-serif; direction:rtl; }
  ::-webkit-scrollbar { width:4px; }
  ::-webkit-scrollbar-track { background:#0A0A0F; }
  ::-webkit-scrollbar-thumb { background:#FF6B0040; border-radius:2px; }
  input,button,select { font-family:'Segoe UI',Tahoma,sans-serif; }
  @keyframes spin    { to{transform:rotate(360deg)} }
  @keyframes fadeIn  { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
  @keyframes pulse   { 0%,100%{opacity:1} 50%{opacity:.5} }
  @keyframes glow    { 0%,100%{box-shadow:0 0 20px #FF6B0040} 50%{box-shadow:0 0 50px #FF6B0080} }
  @keyframes slideUp { from{transform:translateY(100%)} to{transform:translateY(0)} }
  @keyframes toastIn { from{opacity:0;transform:translateX(-50%) translateY(-20px)} to{opacity:1;transform:translateX(-50%) translateY(0)} }
  @keyframes float   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-7px)} }
  @keyframes shake   { 0%,100%{transform:translateX(0)} 25%{transform:translateX(-8px)} 75%{transform:translateX(8px)} }
  @keyframes progress { 0%{width:0%} 100%{width:100%} }
</style>
</head>
<body>
<div id="root"></div>
<script type="text/babel">
const { useState, useEffect } = React;

// ⚙️ رابط السيرفر - غيّره بعد رفع المشروع على Netlify
const API_URL = "https://your-site.netlify.app";

const NEON   = "#00D4FF";
const PURPLE = "#A855F7";
const ORANGE = "#FF6B00";
const ORANGE2= "#FF9500";
const BG     = "#0A0A0F";
const CARD   = "#12121A";
const CARD2  = "#1A1A2E";

const PLANS = [
  { dh:5,  label:"5 درهم",   balance:500,  popular:false },
  { dh:10, label:"10 درهم",  balance:1000, popular:true  },
  { dh:20, label:"20 درهم",  balance:2000, popular:false },
  { dh:50, label:"50 درهم",  balance:5000, popular:false },
];

const services = [
  { id:1, category:"PUBG Mobile", icon:"🎮", items:[
    { id:11, name:"حساب PUBG Gold",    price:150,  desc:"حساب ذهبي مع سكينات نادرة" },
    { id:12, name:"حساب PUBG Diamond", price:350,  desc:"حساب ألماسي + ملابس حصرية" },
    { id:13, name:"شحن UC × 60",       price:25,   desc:"60 UC مباشرة للحساب" },
    { id:14, name:"شحن UC × 325",      price:120,  desc:"325 UC بأفضل سعر" },
  ]},
  { id:2, category:"Free Fire", icon:"🔥", items:[
    { id:21, name:"حساب FF Bronze",   price:80,   desc:"حساب برونزي مع شخصيات" },
    { id:22, name:"حساب FF Elite",    price:450,  desc:"حساب نخبة + جميع الشخصيات" },
    { id:23, name:"شحن جواهر × 100", price:30,   desc:"100 جوهرة فري فاير" },
    { id:24, name:"شحن جواهر × 520", price:140,  desc:"520 جوهرة بسعر خاص" },
  ]},
  { id:3, category:"Instagram", icon:"📸", items:[
    { id:31, name:"متابعين × 1000",        price:50,  desc:"متابعين حقيقيين وآمنين" },
    { id:32, name:"لايكات × 500",          price:20,  desc:"لايكات سريعة لأي منشور" },
    { id:33, name:"مشاهدات ستوري × 1000", price:15,  desc:"مشاهدات ستوري فورية" },
    { id:34, name:"تعليقات × 50",          price:35,  desc:"تعليقات عربية طبيعية" },
  ]},
];

// ==================== COUNTER ====================
function Counter({ value }) {
  const [d, setD] = useState(0);
  useEffect(() => {
    let c = 0;
    const step = Math.max(1, Math.ceil(value / 50));
    const t = setInterval(() => {
      c += step;
      if (c >= value) { setD(value); clearInterval(t); }
      else setD(c);
    }, 25);
    return () => clearInterval(t);
  }, [value]);
  return d.toLocaleString('ar');
}

// ==================== SPLASH ====================
function Splash({ onDone }) {
  const [prog, setProg] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setProg(p => {
      if (p >= 100) { clearInterval(t); setTimeout(onDone, 400); return 100; }
      return p + 2;
    }), 30);
    return () => clearInterval(t);
  }, []);
  return (
    <div style={{position:"fixed",inset:0,background:BG,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",zIndex:9999}}>
      {[...Array(4)].map((_,i)=>(
        <div key={i} style={{position:"absolute",width:130+i*100,height:130+i*100,borderRadius:"50%",border:`1px solid ${i%2===0?ORANGE:ORANGE2}15`,top:"50%",left:"50%",transform:"translate(-50%,-50%)",animation:`pulse ${2+i*0.4}s ease-in-out infinite`}}/>
      ))}
      <div style={{width:110,height:110,borderRadius:"50%",background:`conic-gradient(${ORANGE},${ORANGE2},${ORANGE})`,display:"flex",alignItems:"center",justifyContent:"center",animation:"spin 3s linear infinite",boxShadow:`0 0 50px ${ORANGE}60`,marginBottom:32}}>
        <div style={{width:90,height:90,borderRadius:"50%",background:BG,display:"flex",alignItems:"center",justifyContent:"center",fontSize:42}}>⚡</div>
      </div>
      <div style={{fontSize:38,fontWeight:900,letterSpacing:5,background:`linear-gradient(135deg,${ORANGE},${ORANGE2})`,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",animation:"float 3s ease-in-out infinite"}}>FAST STORE</div>
      <div style={{color:"#ffffff50",fontSize:14,marginTop:8,letterSpacing:3}}>متجر الخدمات الرقمية #1</div>
      <div style={{width:240,marginTop:48}}>
        <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}>
          <span style={{color:"#ffffff40",fontSize:12}}>جاري التحميل...</span>
          <span style={{color:ORANGE,fontSize:12,fontWeight:700}}>{prog}%</span>
        </div>
        <div style={{height:5,background:"#ffffff10",borderRadius:10,overflow:"hidden"}}>
          <div style={{height:"100%",borderRadius:10,background:`linear-gradient(90deg,${ORANGE},${ORANGE2})`,width:`${prog}%`,transition:"width 0.1s",boxShadow:`0 0 10px ${ORANGE}`}}/>
        </div>
      </div>
    </div>
  );
}

// ==================== HOME TAB ====================
function HomeTab({ balance, onBuy, setTab }) {
  const featured = [services[0].items[0], services[1].items[2], services[2].items[0]];
  const [timeLeft, setTimeLeft] = useState(82800);
  useEffect(() => {
    const t = setInterval(() => setTimeLeft(s => s>0?s-1:0), 1000);
    return () => clearInterval(t);
  }, []);
  const fmt = s => `${String(Math.floor(s/3600)).padStart(2,"0")}:${String(Math.floor((s%3600)/60)).padStart(2,"0")}:${String(s%60).padStart(2,"0")}`;

  return (
    <div style={{padding:"0 16px 16px",animation:"fadeIn 0.4s ease"}}>

      {/* Balance Card */}
      <div style={{background:`linear-gradient(135deg,#1A1200,#2A1A00)`,border:`1px solid ${ORANGE}30`,borderRadius:22,padding:24,marginBottom:16,position:"relative",overflow:"hidden",boxShadow:`0 0 40px ${ORANGE}15`}}>
        <div style={{position:"absolute",top:-40,right:-40,width:160,height:160,borderRadius:"50%",background:`${ORANGE}10`,filter:"blur(40px)"}}/>
        <div style={{position:"absolute",bottom:-30,left:-30,width:120,height:120,borderRadius:"50%",background:`${ORANGE2}08`,filter:"blur(30px)"}}/>
        <div style={{color:"#ffffff50",fontSize:12,marginBottom:6}}>💳 رصيدك الحالي</div>
        <div style={{fontSize:38,fontWeight:900,background:`linear-gradient(90deg,${ORANGE},${ORANGE2})`,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",lineHeight:1.2}}>
          <Counter value={balance}/> <span style={{fontSize:18,WebkitTextFillColor:"#ffffff50"}}>DH</span>
        </div>
        <div style={{display:"flex",gap:16,marginTop:16}}>
          <button onClick={()=>setTab("orange")} style={{background:`linear-gradient(90deg,${ORANGE},${ORANGE2})`,border:"none",borderRadius:12,padding:"10px 20px",color:"#fff",fontWeight:700,cursor:"pointer",fontSize:13,boxShadow:`0 4px 15px ${ORANGE}40`}}>
            🟠 شحن Orange
          </button>
          <div style={{display:"flex",alignItems:"center",gap:8}}>
            <div style={{color:"#ffffff40",fontSize:12}}>طلباتي</div>
            <div style={{color:ORANGE,fontWeight:800,fontSize:18}}>3 📦</div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10,marginBottom:16}}>
        {[
          {l:"إجمالي الطلبات",v:3,icon:"📦",c:ORANGE},
          {l:"مكتملة",v:1,icon:"✅",c:"#22C55E"},
          {l:"ملغية",v:1,icon:"❌",c:"#EF4444"},
        ].map((s,i)=>(
          <div key={i} style={{background:CARD,borderRadius:16,padding:"16px 10px",textAlign:"center",border:`1px solid #ffffff0A`}}>
            <div style={{fontSize:24}}>{s.icon}</div>
            <div style={{color:s.c,fontWeight:900,fontSize:22,marginTop:4}}>{s.v}</div>
            <div style={{color:"#ffffff40",fontSize:10,marginTop:2}}>{s.l}</div>
          </div>
        ))}
      </div>

      {/* Orange Banner */}
      <div onClick={()=>setTab("orange")} style={{
        background:`linear-gradient(135deg,${ORANGE}25,${ORANGE2}15)`,
        border:`1px solid ${ORANGE}40`,borderRadius:18,padding:18,marginBottom:16,cursor:"pointer",
        display:"flex",alignItems:"center",gap:16
      }}>
        <div style={{fontSize:44}}>🟠</div>
        <div style={{flex:1}}>
          <div style={{color:ORANGE,fontWeight:800,fontSize:16}}>شحن رصيد بـ Orange Money</div>
          <div style={{color:"#ffffff60",fontSize:13,marginTop:4}}>أدخل كود التعبئة واحصل على رصيدك فوراً</div>
        </div>
        <div style={{color:ORANGE,fontSize:24}}>‹</div>
      </div>

      {/* Featured */}
      <div style={{color:"#fff",fontWeight:700,fontSize:16,marginBottom:12}}>🔥 خدمات مميزة</div>
      {featured.map((item,i)=>(
        <div key={item.id} style={{background:CARD,borderRadius:18,padding:16,marginBottom:10,border:`1px solid #ffffff0A`,display:"flex",alignItems:"center",gap:14,animation:`fadeIn 0.4s ease ${i*0.1}s both`}}>
          <div style={{width:52,height:52,borderRadius:14,fontSize:26,background:`${ORANGE}10`,display:"flex",alignItems:"center",justifyContent:"center",border:`1px solid ${ORANGE}20`,flexShrink:0}}>
            {services.find(s=>s.items.some(it=>it.id===item.id))?.icon}
          </div>
          <div style={{flex:1,minWidth:0}}>
            <div style={{color:"#fff",fontWeight:600,fontSize:14,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{item.name}</div>
            <div style={{color:"#ffffff50",fontSize:12,marginTop:2}}>{item.desc}</div>
          </div>
          <button onClick={()=>onBuy(item)} style={{background:`linear-gradient(135deg,${ORANGE},${ORANGE2})`,border:"none",borderRadius:12,padding:"9px 16px",color:"#fff",fontWeight:700,cursor:"pointer",fontSize:13,whiteSpace:"nowrap",flexShrink:0,boxShadow:`0 4px 12px ${ORANGE}30`}}>
            {item.price} DH
          </button>
        </div>
      ))}

      {/* Promo */}
      <div style={{background:`${ORANGE}10`,border:`1px solid ${ORANGE}30`,borderRadius:18,padding:18}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div>
            <div style={{color:ORANGE,fontWeight:800,fontSize:15}}>🎉 عرض اليوم!</div>
            <div style={{color:"#fff",fontSize:13,marginTop:6,lineHeight:1.6}}>
              اشحن 50 DH واحصل على<br/>
              <span style={{color:ORANGE2,fontWeight:700}}>5 DH هدية مجاناً</span>
            </div>
          </div>
          <div style={{textAlign:"center"}}>
            <div style={{color:"#ffffff50",fontSize:11}}>ينتهي في</div>
            <div style={{color:ORANGE,fontWeight:900,fontSize:22}}>{fmt(timeLeft)}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==================== SERVICES TAB ====================
function ServicesTab({ onBuy }) {
  const [sel, setSel] = useState(0);
  return (
    <div style={{padding:"0 16px 16px",animation:"fadeIn 0.4s ease"}}>
      <div style={{color:"#fff",fontWeight:700,fontSize:18,marginBottom:14}}>🛒 الخدمات</div>
      <div style={{display:"flex",gap:8,marginBottom:16,overflowX:"auto",paddingBottom:4}}>
        {services.map((s,i)=>(
          <button key={s.id} onClick={()=>setSel(i)} style={{background:sel===i?`linear-gradient(135deg,${ORANGE},${ORANGE2})`:CARD,border:sel===i?"none":`1px solid #ffffff12`,borderRadius:22,padding:"9px 18px",color:"#fff",fontWeight:600,cursor:"pointer",whiteSpace:"nowrap",fontSize:13,boxShadow:sel===i?`0 4px 15px ${ORANGE}30`:"none"}}>
            {s.icon} {s.category}
          </button>
        ))}
      </div>
      {services[sel].items.map((item,i)=>(
        <div key={item.id} style={{background:CARD,borderRadius:18,padding:18,marginBottom:10,border:`1px solid #ffffff0A`,animation:`fadeIn 0.3s ease ${i*0.08}s both`}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",gap:12}}>
            <div style={{flex:1}}>
              <div style={{color:"#fff",fontWeight:700,fontSize:15}}>{item.name}</div>
              <div style={{color:"#ffffff50",fontSize:12,marginTop:4}}>{item.desc}</div>
              <div style={{marginTop:10}}>
                <span style={{background:`${ORANGE}15`,color:ORANGE,borderRadius:10,padding:"5px 14px",fontSize:13,fontWeight:700,border:`1px solid ${ORANGE}25`}}>{item.price} DH</span>
              </div>
            </div>
            <button onClick={()=>onBuy(item)} style={{background:`linear-gradient(135deg,${ORANGE},${ORANGE2})`,border:"none",borderRadius:14,padding:"12px 22px",color:"#fff",fontWeight:700,cursor:"pointer",fontSize:14,flexShrink:0,boxShadow:`0 4px 15px ${ORANGE}30`}}>
              شراء
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

// ==================== ORANGE TAB ====================
function OrangeTab({ balance, setBalance, showToast }) {
  const [step, setStep]   = useState(1);
  const [plan, setPlan]   = useState(null);
  const [code, setCode]   = useState("");
  const [errMsg, setErr]  = useState("");
  const [shake, setShake] = useState(false);

  const fmtCode = v => {
    const d = v.replace(/\D/g,"").slice(0,14);
    return [d.slice(0,4),d.slice(4,8),d.slice(8,12),d.slice(12,14)].filter(Boolean).join(" ");
  };

  const reset = () => { setStep(1); setPlan(null); setCode(""); setErr(""); };

  const handleSubmit = async () => {
    const raw = code.replace(/\s/g,"");
    if (raw.length !== 14) {
      setErr("❌ الكود يجب أن يكون 14 رقم");
      setShake(true); setTimeout(()=>setShake(false),500);
      return;
    }
    setStep(3);
    try {
      const res = await fetch(`${API_URL}/api/recharge`, {
        method:"POST", headers:{"Content-Type":"application/json"},
        body: JSON.stringify({ code: raw, plan_dh: plan.dh })
      });
      const data = await res.json();
      if (data.success) {
        setBalance(b => b + plan.dh);
        setStep(4);
      } else {
        setErr(data.message || "الكود غير صحيح أو مستخدم");
        setStep(5);
      }
    } catch {
      // وضع DEMO بدون سيرفر
      setBalance(b => b + plan.dh);
      setStep(4);
    }
  };

  return (
    <div style={{padding:"0 16px 16px",animation:"fadeIn 0.4s ease"}}>
      <div style={{color:"#fff",fontWeight:700,fontSize:18,marginBottom:4}}>🟠 شحن Orange Money</div>
      <div style={{color:"#ffffff50",fontSize:13,marginBottom:20}}>أدخل كود التعبئة واحصل على رصيدك فوراً</div>

      {/* رصيد حالي */}
      <div style={{background:`linear-gradient(135deg,#1A1200,#2A1A00)`,border:`1px solid ${ORANGE}30`,borderRadius:18,padding:18,marginBottom:20,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div>
          <div style={{color:"#ffffff50",fontSize:12}}>رصيدك الحالي</div>
          <div style={{fontSize:28,fontWeight:900,background:`linear-gradient(90deg,${ORANGE},${ORANGE2})`,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",marginTop:4}}>
            <Counter value={balance}/> <span style={{fontSize:16,WebkitTextFillColor:"#ffffff50"}}>DH</span>
          </div>
        </div>
        <div style={{fontSize:48}}>💰</div>
      </div>

      {/* STEP 1: اختر الباقة */}
      {step === 1 && (
        <>
          <div style={{color:"#ffffff80",fontWeight:600,fontSize:14,marginBottom:12}}>اختر قيمة البطاقة</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:20}}>
            {PLANS.map(p=>(
              <div key={p.dh} onClick={()=>{setPlan(p);setStep(2);}} style={{
                background:p.popular?`linear-gradient(135deg,${ORANGE}20,${ORANGE2}10)`:CARD,
                border:`2px solid ${p.popular?ORANGE+"60":"#ffffff12"}`,
                borderRadius:18,padding:20,cursor:"pointer",textAlign:"center",
                position:"relative",transition:"all 0.2s",
                boxShadow:p.popular?`0 0 20px ${ORANGE}20`:"none"
              }}>
                {p.popular && (
                  <div style={{position:"absolute",top:-12,left:"50%",transform:"translateX(-50%)",background:`linear-gradient(90deg,${ORANGE},${ORANGE2})`,color:"#fff",fontSize:10,fontWeight:700,borderRadius:10,padding:"3px 12px",whiteSpace:"nowrap"}}>
                    ⭐ الأكثر شيوعاً
                  </div>
                )}
                <div style={{color:p.popular?ORANGE:"#fff",fontWeight:900,fontSize:28,marginTop:p.popular?8:0}}>{p.dh}</div>
                <div style={{color:p.popular?ORANGE2:"#ffffff60",fontSize:14,fontWeight:600}}>درهم</div>
                <div style={{color:"#ffffff40",fontSize:11,marginTop:6}}>= {p.balance} دج</div>
              </div>
            ))}
          </div>

          {/* كيف يعمل */}
          <div style={{background:`${ORANGE}08`,border:`1px solid ${ORANGE}20`,borderRadius:16,padding:16}}>
            <div style={{color:ORANGE,fontWeight:700,fontSize:13,marginBottom:10}}>📋 كيف يعمل الشحن؟</div>
            {[
              "اشترِ بطاقة Orange من أي محل أو بقالة",
              "اختر قيمة البطاقة من الأعلى",
              "أدخل الكود المكون من 14 رقم",
              "يُضاف رصيدك تلقائياً ✅"
            ].map((s,i)=>(
              <div key={i} style={{display:"flex",gap:10,alignItems:"flex-start",marginBottom:8}}>
                <div style={{width:22,height:22,borderRadius:"50%",background:`linear-gradient(135deg,${ORANGE},${ORANGE2})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700,color:"#fff",flexShrink:0}}>{i+1}</div>
                <div style={{color:"#ffffff60",fontSize:13,lineHeight:1.4}}>{s}</div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* STEP 2: أدخل الكود */}
      {step === 2 && (
        <>
          <button onClick={()=>setStep(1)} style={{background:"#ffffff10",border:"none",borderRadius:12,padding:"8px 16px",color:"#fff",cursor:"pointer",fontSize:13,marginBottom:20,display:"flex",alignItems:"center",gap:6}}>
            → رجوع
          </button>

          {/* ملخص الباقة */}
          <div style={{background:`linear-gradient(135deg,${ORANGE}20,${ORANGE2}10)`,border:`1px solid ${ORANGE}40`,borderRadius:16,padding:16,marginBottom:20,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div>
              <div style={{color:"#ffffff60",fontSize:12}}>الباقة المختارة</div>
              <div style={{color:ORANGE,fontWeight:900,fontSize:26,marginTop:2}}>{plan.dh} DH</div>
            </div>
            <div style={{textAlign:"right"}}>
              <div style={{color:"#ffffff40",fontSize:12}}>يضاف لرصيدك</div>
              <div style={{color:ORANGE2,fontWeight:700,fontSize:18,marginTop:2}}>{plan.balance} دج</div>
            </div>
          </div>

          {/* إدخال الكود */}
          <div style={{marginBottom:8}}>
            <div style={{color:"#ffffff60",fontSize:13,marginBottom:10}}>🔢 أدخل كود التعبئة</div>
            <input
              value={code}
              onChange={e=>{setCode(fmtCode(e.target.value));setErr("");}}
              placeholder="XXXX  XXXX  XXXX  XX"
              maxLength={17}
              style={{
                width:"100%", background:"#ffffff08",
                border:`2px solid ${errMsg?"#EF4444":code.replace(/\s/g,"").length===14?ORANGE:"#ffffff15"}`,
                borderRadius:16, padding:"18px", color:"#fff",
                fontSize:24, outline:"none", boxSizing:"border-box",
                textAlign:"center", letterSpacing:6, fontWeight:700,
                transition:"border-color 0.2s",
                animation:shake?"shake 0.4s ease":"none"
              }}
            />
            {errMsg
              ? <div style={{color:"#EF4444",fontSize:12,marginTop:8,textAlign:"center"}}>{errMsg}</div>
              : <div style={{color:"#ffffff25",fontSize:12,marginTop:8,textAlign:"center"}}>🔒 كودك يُرسل بأمان ولا يُخزَّن</div>
            }
          </div>

          {/* عداد الأرقام */}
          <div style={{display:"flex",justifyContent:"center",gap:4,marginBottom:20}}>
            {[...Array(14)].map((_,i)=>(
              <div key={i} style={{width:16,height:4,borderRadius:2,background:i < code.replace(/\s/g,"").length ? ORANGE : "#ffffff15",transition:"background 0.15s"}}/>
            ))}
          </div>

          <button onClick={handleSubmit} style={{
            width:"100%",
            background:code.replace(/\s/g,"").length===14?`linear-gradient(135deg,${ORANGE},${ORANGE2})`:"#ffffff10",
            border:"none",borderRadius:18,padding:"18px",
            color:code.replace(/\s/g,"").length===14?"#fff":"#ffffff30",
            fontWeight:800,fontSize:17,
            cursor:code.replace(/\s/g,"").length===14?"pointer":"default",
            boxShadow:code.replace(/\s/g,"").length===14?`0 6px 25px ${ORANGE}40`:"none",
            transition:"all 0.3s"
          }}>
            ✅ إرسال الكود
          </button>
        </>
      )}

      {/* STEP 3: جاري التحقق */}
      {step === 3 && (
        <div style={{textAlign:"center",padding:"50px 0"}}>
          <div style={{width:80,height:80,borderRadius:"50%",background:`conic-gradient(${ORANGE},transparent)`,margin:"0 auto 24px",animation:"spin 1s linear infinite",display:"flex",alignItems:"center",justifyContent:"center"}}>
            <div style={{width:62,height:62,borderRadius:"50%",background:BG,display:"flex",alignItems:"center",justifyContent:"center",fontSize:30}}>🟠</div>
          </div>
          <div style={{color:"#fff",fontWeight:700,fontSize:20}}>جاري التحقق...</div>
          <div style={{color:"#ffffff50",fontSize:14,marginTop:8}}>يتم التحقق من الكود</div>
          <div style={{display:"flex",gap:8,justifyContent:"center",marginTop:24}}>
            {[0,1,2].map(i=>(
              <div key={i} style={{width:10,height:10,borderRadius:"50%",background:ORANGE,animation:`pulse 1s ease-in-out ${i*0.2}s infinite`}}/>
            ))}
          </div>
        </div>
      )}

      {/* STEP 4: نجاح */}
      {step === 4 && (
        <div style={{textAlign:"center",padding:"40px 0"}}>
          <div style={{fontSize:80,animation:"float 1s ease"}}>✅</div>
          <div style={{color:"#22C55E",fontWeight:800,fontSize:24,marginTop:16}}>تم الشحن بنجاح!</div>
          <div style={{background:`${ORANGE}15`,border:`1px solid ${ORANGE}30`,borderRadius:16,padding:16,marginTop:20}}>
            <div style={{color:"#ffffff60",fontSize:13}}>تمت إضافة</div>
            <div style={{color:ORANGE,fontWeight:900,fontSize:32,marginTop:4}}>{plan?.dh} DH</div>
            <div style={{color:"#ffffff50",fontSize:13,marginTop:4}}>= {plan?.balance} دج لرصيدك</div>
          </div>
          <button onClick={reset} style={{marginTop:24,background:`linear-gradient(135deg,${ORANGE},${ORANGE2})`,border:"none",borderRadius:14,padding:"12px 40px",color:"#fff",fontWeight:700,cursor:"pointer",fontSize:15}}>
            شحن مرة أخرى
          </button>
        </div>
      )}

      {/* STEP 5: خطأ */}
      {step === 5 && (
        <div style={{textAlign:"center",padding:"40px 0"}}>
          <div style={{fontSize:70}}>❌</div>
          <div style={{color:"#EF4444",fontWeight:800,fontSize:20,marginTop:16}}>فشل التحقق</div>
          <div style={{color:"#ffffff50",fontSize:14,marginTop:8,padding:"0 20px"}}>{errMsg}</div>
          <div style={{display:"flex",gap:10,justifyContent:"center",marginTop:24}}>
            <button onClick={()=>{setStep(2);setErr("");}} style={{background:`linear-gradient(135deg,${ORANGE},${ORANGE2})`,border:"none",borderRadius:14,padding:"12px 28px",color:"#fff",fontWeight:700,cursor:"pointer",fontSize:14}}>
              حاول مجدداً
            </button>
            <button onClick={reset} style={{background:"#ffffff10",border:"none",borderRadius:14,padding:"12px 28px",color:"#fff",fontWeight:700,cursor:"pointer",fontSize:14}}>
              تغيير الباقة
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ==================== ORDERS TAB ====================
function OrdersTab({ orders }) {
  const SC = {completed:"#22C55E",pending:ORANGE,cancelled:"#EF4444"};
  const SL = {completed:"مكتمل ✅",pending:"قيد التنفيذ ⏳",cancelled:"ملغي ❌"};
  return (
    <div style={{padding:"0 16px 16px",animation:"fadeIn 0.4s ease"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
        <div style={{color:"#fff",fontWeight:700,fontSize:18}}>📦 طلباتي</div>
        <div style={{background:`${ORANGE}15`,color:ORANGE,borderRadius:10,padding:"4px 14px",fontSize:12,fontWeight:700}}>{orders.length} طلب</div>
      </div>
      {orders.length===0?(
        <div style={{textAlign:"center",color:"#ffffff30",padding:"80px 0"}}>
          <div style={{fontSize:60}}>📭</div>
          <div style={{marginTop:16,fontSize:16}}>لا توجد طلبات بعد</div>
        </div>
      ):orders.map((o,i)=>(
        <div key={o.id} style={{background:CARD,borderRadius:18,padding:18,marginBottom:10,border:`1px solid #ffffff0A`,animation:`fadeIn 0.3s ease ${i*0.1}s both`}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
            <div style={{flex:1}}>
              <div style={{color:ORANGE,fontWeight:700,fontSize:11,marginBottom:4}}>{o.id}</div>
              <div style={{color:"#fff",fontWeight:600,fontSize:15}}>{o.service}</div>
              <div style={{color:"#ffffff40",fontSize:12,marginTop:4}}>📅 {o.date}</div>
            </div>
            <div style={{textAlign:"right",flexShrink:0,marginRight:8}}>
              <div style={{background:`${SC[o.status]}15`,color:SC[o.status],borderRadius:10,padding:"5px 12px",fontSize:11,fontWeight:700,border:`1px solid ${SC[o.status]}25`}}>{SL[o.status]}</div>
              <div style={{color:"#ffffff60",fontSize:14,marginTop:8,fontWeight:700}}>{o.price} DH</div>
            </div>
          </div>
          {o.status==="pending"&&(
            <div style={{marginTop:14}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
                <span style={{color:"#ffffff50",fontSize:12}}>تقدم الطلب</span>
                <span style={{color:ORANGE,fontSize:12,fontWeight:700}}>60%</span>
              </div>
              <div style={{background:"#ffffff0A",borderRadius:6,height:6,overflow:"hidden"}}>
                <div style={{width:"60%",height:"100%",borderRadius:6,background:`linear-gradient(90deg,${ORANGE},${ORANGE2})`,animation:"pulse 1.5s ease-in-out infinite",boxShadow:`0 0 8px ${ORANGE}`}}/>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ==================== PROFILE TAB ====================
function ProfileTab({ balance, setTab }) {
  const menu = [
    {icon:"🟠",l:"شحن عبر Orange Money",d:"تعبئة رصيدك بكود Orange",action:()=>setTab("orange"),highlight:true},
    {icon:"🔔",l:"الإشعارات",d:"إدارة الإشعارات"},
    {icon:"🛡️",l:"الأمان",d:"كلمة المرور والخصوصية"},
    {icon:"💬",l:"الدعم الفني",d:"تواصل مع فريق الدعم 24/7"},
    {icon:"📋",l:"الشروط والسياسة",d:"اقرأ شروط الخدمة"},
    {icon:"🚪",l:"تسجيل الخروج",d:"الخروج من الحساب",danger:true},
  ];
  return (
    <div style={{padding:"0 16px 16px",animation:"fadeIn 0.4s ease"}}>
      <div style={{textAlign:"center",padding:"24px 0 28px"}}>
        <div style={{width:90,height:90,borderRadius:"50%",margin:"0 auto 14px",background:`linear-gradient(135deg,${ORANGE},${ORANGE2})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:40,boxShadow:`0 0 30px ${ORANGE}50`,animation:"glow 3s ease-in-out infinite"}}>👤</div>
        <div style={{color:"#fff",fontWeight:800,fontSize:20}}>Mohamed Ali</div>
        <div style={{color:"#ffffff50",fontSize:13,marginTop:4}}>mo.ali@example.com</div>
        <div style={{display:"inline-flex",gap:0,marginTop:20,background:CARD,borderRadius:18,padding:"16px 30px",border:`1px solid #ffffff0A`}}>
          <div style={{textAlign:"center",paddingLeft:20,borderLeft:`1px solid #ffffff10`}}>
            <div style={{color:ORANGE,fontWeight:900,fontSize:20}}><Counter value={balance}/></div>
            <div style={{color:"#ffffff40",fontSize:11,marginTop:3}}>رصيد (DH)</div>
          </div>
          <div style={{textAlign:"center",padding:"0 20px"}}>
            <div style={{color:"#22C55E",fontWeight:900,fontSize:20}}>3</div>
            <div style={{color:"#ffffff40",fontSize:11,marginTop:3}}>الطلبات</div>
          </div>
        </div>
      </div>
      {menu.map((m,i)=>(
        <div key={i} onClick={m.action||undefined} style={{background:m.highlight?`${ORANGE}10`:CARD,borderRadius:16,padding:"15px 16px",marginBottom:8,border:`1px solid ${m.danger?"#EF444420":m.highlight?ORANGE+"30":"#ffffff08"}`,display:"flex",alignItems:"center",gap:14,cursor:"pointer",animation:`fadeIn 0.3s ease ${i*0.06}s both`}}>
          <div style={{width:44,height:44,borderRadius:12,fontSize:22,background:m.danger?"#EF444415":m.highlight?`${ORANGE}20`:`#ffffff08`,display:"flex",alignItems:"center",justifyContent:"center",border:`1px solid ${m.danger?"#EF444425":m.highlight?ORANGE+"30":"#ffffff08"}`,flexShrink:0}}>{m.icon}</div>
          <div style={{flex:1}}>
            <div style={{color:m.danger?"#EF4444":m.highlight?ORANGE:"#fff",fontWeight:600,fontSize:14}}>{m.l}</div>
            <div style={{color:"#ffffff35",fontSize:12,marginTop:2}}>{m.d}</div>
          </div>
          <div style={{color:"#ffffff25",fontSize:20}}>‹</div>
        </div>
      ))}
    </div>
  );
}

// ==================== BUY MODAL ====================
function BuyModal({ item, onClose, onConfirm }) {
  const [user, setUser]   = useState("");
  const [load, setLoad]   = useState(false);
  const [succ, setSucc]   = useState(false);
  const handle = () => {
    if (!user) return;
    setLoad(true);
    setTimeout(()=>{ setLoad(false); setSucc(true); setTimeout(onConfirm, 1200); }, 2000);
  };
  return (
    <div style={{position:"fixed",inset:0,background:"#000000CC",display:"flex",alignItems:"flex-end",justifyContent:"center",zIndex:1000,backdropFilter:"blur(6px)"}} onClick={onClose}>
      <div onClick={e=>e.stopPropagation()} style={{background:CARD2,borderRadius:"26px 26px 0 0",padding:28,width:"100%",maxWidth:480,border:`1px solid #ffffff12`,borderBottom:"none",animation:"slideUp 0.35s ease"}}>
        <div style={{width:40,height:4,background:"#ffffff20",borderRadius:2,margin:"0 auto 24px"}}/>
        {succ ? (
          <div style={{textAlign:"center",padding:"30px 0"}}>
            <div style={{fontSize:60,animation:"float 1s ease"}}>✅</div>
            <div style={{color:"#22C55E",fontWeight:800,fontSize:20,marginTop:16}}>تم إرسال الطلب!</div>
            <div style={{color:"#ffffff50",fontSize:13,marginTop:8}}>سيتم معالجة طلبك قريباً</div>
          </div>
        ):(
          <>
            <div style={{textAlign:"center",marginBottom:24}}>
              <div style={{width:60,height:60,borderRadius:16,fontSize:28,background:`${ORANGE}15`,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 12px",border:`1px solid ${ORANGE}25`}}>
                {services.find(s=>s.items.some(it=>it.id===item.id))?.icon}
              </div>
              <div style={{color:"#fff",fontWeight:800,fontSize:18}}>{item.name}</div>
              <div style={{color:"#ffffff50",fontSize:13,marginTop:4}}>{item.desc}</div>
            </div>
            <div style={{background:"#ffffff06",borderRadius:14,padding:16,marginBottom:20}}>
              <div style={{display:"flex",justifyContent:"space-between"}}>
                <span style={{color:"#ffffff60"}}>السعر</span>
                <span style={{color:ORANGE,fontWeight:700,fontSize:18}}>{item.price} DH</span>
              </div>
            </div>
            <div style={{marginBottom:20}}>
              <div style={{color:"#ffffff60",fontSize:13,marginBottom:8}}>اسم المستخدم / ID الحساب</div>
              <input value={user} onChange={e=>setUser(e.target.value)} placeholder="أدخل اسم المستخدم أو ID..." style={{width:"100%",background:"#ffffff08",border:`1px solid ${user?ORANGE+"40":"#ffffff15"}`,borderRadius:14,padding:"14px 16px",color:"#fff",fontSize:14,outline:"none",boxSizing:"border-box",transition:"border-color 0.2s"}}/>
            </div>
            <button onClick={handle} disabled={!user||load} style={{width:"100%",background:!user?"#ffffff10":`linear-gradient(135deg,${ORANGE},${ORANGE2})`,border:"none",borderRadius:18,padding:"17px",color:!user?"#ffffff30":"#fff",fontWeight:800,fontSize:16,cursor:!user?"default":"pointer",boxShadow:user?`0 6px 20px ${ORANGE}30`:"none",transition:"all 0.3s"}}>
              {load?"⏳ جاري المعالجة...":"✅ تأكيد الطلب"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

// ==================== MAIN APP ====================
function App() {
  const [splash, setSplash]   = useState(true);
  const [tab, setTab]         = useState("home");
  const [balance, setBalance] = useState(10);
  const [orders, setOrders]   = useState([
    {id:"ORD-001",service:"متابعين × 1000",status:"completed",date:"2025-02-18",price:50},
    {id:"ORD-002",service:"شحن جواهر × 520",status:"pending",date:"2025-02-20",price:140},
    {id:"ORD-003",service:"حساب PUBG Gold",status:"cancelled",date:"2025-02-15",price:150},
  ]);
  const [buyItem, setBuyItem] = useState(null);
  const [toast, setToast]     = useState(null);

  const showToast = (msg) => { setToast(msg); setTimeout(()=>setToast(null),3500); };

  const handleConfirmBuy = () => {
    setOrders(o=>[{id:`ORD-00${o.length+1}`,service:buyItem.name,status:"pending",date:new Date().toISOString().split("T")[0],price:buyItem.price},...o]);
    setBalance(b=>b-buyItem.price);
    setBuyItem(null);
    showToast("✅ تم إرسال طلبك بنجاح!");
    setTimeout(()=>setTab("orders"),500);
  };

  const tabs = [
    {id:"home",    icon:"🏠", label:"الرئيسية"},
    {id:"services",icon:"🛒", label:"الخدمات"},
    {id:"orange",  icon:"🟠", label:"Orange"},
    {id:"orders",  icon:"📦", label:"طلباتي"},
    {id:"profile", icon:"👤", label:"حسابي"},
  ];

  if (splash) return <Splash onDone={()=>setSplash(false)}/>;

  return (
    <div style={{background:BG,minHeight:"100vh",maxWidth:480,margin:"0 auto",position:"relative",paddingBottom:85}}>

      {/* Header */}
      <div style={{background:`${BG}F0`,backdropFilter:"blur(16px)",padding:"16px 20px 12px",position:"sticky",top:0,zIndex:100,borderBottom:`1px solid #ffffff08`}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div style={{fontWeight:900,fontSize:22,letterSpacing:3,background:`linear-gradient(90deg,${ORANGE},${ORANGE2})`,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>⚡ FAST STORE</div>
          <div style={{display:"flex",gap:10,alignItems:"center"}}>
            <div style={{background:`${ORANGE}15`,border:`1px solid ${ORANGE}30`,borderRadius:22,padding:"5px 14px",color:ORANGE,fontSize:13,fontWeight:700}}>
              🟠 <Counter value={balance}/> DH
            </div>
            <div style={{width:36,height:36,borderRadius:10,background:CARD,border:`1px solid #ffffff0A`,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",fontSize:18}}>🔔</div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{paddingTop:16}}>
        {tab==="home"     && <HomeTab balance={balance} onBuy={setBuyItem} setTab={setTab}/>}
        {tab==="services" && <ServicesTab onBuy={setBuyItem}/>}
        {tab==="orange"   && <OrangeTab balance={balance} setBalance={setBalance} showToast={showToast}/>}
        {tab==="orders"   && <OrdersTab orders={orders}/>}
        {tab==="profile"  && <ProfileTab balance={balance} setTab={setTab}/>}
      </div>

      {/* Bottom Nav */}
      <div style={{position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:480,background:`${CARD2}F5`,backdropFilter:"blur(20px)",borderTop:`1px solid #ffffff0A`,padding:"10px 8px 18px",zIndex:200}}>
        <div style={{display:"flex",justifyContent:"space-around"}}>
          {tabs.map(t=>{
            const active=tab===t.id;
            return (
              <button key={t.id} onClick={()=>setTab(t.id)} style={{background:"none",border:"none",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:4,padding:"0 6px"}}>
                <div style={{width:44,height:44,borderRadius:13,background:active?`${ORANGE}20`:"transparent",border:active?`1px solid ${ORANGE}40`:"1px solid transparent",display:"flex",alignItems:"center",justifyContent:"center",fontSize:active&&t.id==="orange"?26:20,transition:"all 0.25s",boxShadow:active?`0 0 15px ${ORANGE}30`:"none",transform:active?"scale(1.1)":"scale(1)"}}>
                  {t.icon}
                </div>
                <div style={{fontSize:10,fontWeight:active?700:400,color:active?ORANGE:"#ffffff35",transition:"all 0.25s"}}>{t.label}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Buy Modal */}
      {buyItem && <BuyModal item={buyItem} onClose={()=>setBuyItem(null)} onConfirm={handleConfirmBuy}/>}

      {/* Toast */}
      {toast && (
        <div style={{position:"fixed",top:80,left:"50%",transform:"translateX(-50%)",background:`linear-gradient(135deg,${ORANGE},${ORANGE2})`,color:"#fff",borderRadius:18,padding:"13px 26px",fontWeight:700,fontSize:14,zIndex:999,whiteSpace:"nowrap",boxShadow:`0 8px 30px ${ORANGE}40`,animation:"toastIn 0.3s ease"}}>
          {toast}
        </div>
      )}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App/>);
</script>
</body>
</html>
