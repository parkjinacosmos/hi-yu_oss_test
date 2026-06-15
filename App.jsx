import { useState, useEffect, useRef } from "react";

// ─── MOCK DATA ────────────────────────────────────────────────────────────────
const MOCK_USERS = [
  { id: "student1", password: "1234", role: "student", name: "김학생", dept: "식품영양학과" },
  { id: "owner1",   password: "1234", role: "owner",   name: "박점주", restaurant: "행복한 밥집" },
  { id: "manager1", password: "1234", role: "manager", name: "관리자" },
];


const ZONES = ["전체","정문","오렌지거리","복문","기숙사 근처","천마아트센터"];

const INITIAL_RESTAURANTS = [
  { id:1, name:"행복한 밥집",   zone:"정문",       category:"한식",  rating:4.9, reviewCount:128, badge:"가성비 최고", tag:"green",  status:"영업중", address:"정문 앞 2층", desc:"든든한 한식 가정식. 백반, 찌개류가 맛있어요.", price:"6,000~8,000원", image:"🍱", ownerId:"owner1",
    menu:[{name:"백반",price:"6,000원",sold:false},{name:"된장찌개",price:"7,000원",sold:false},{name:"김치찌개",price:"7,000원",sold:true}] },
  { id:2, name:"오렌지 식당",   zone:"오렌지거리", category:"한식",  rating:4.8, reviewCount:96,  badge:"학생 추천", tag:"blue",   status:"영업중", address:"오렌지거리 1층", desc:"오렌지거리 대표 식당. 볶음밥 맛집!", price:"5,000~9,000원", image:"🍳", ownerId:null,
    menu:[{name:"볶음밥",price:"6,000원",sold:false},{name:"제육볶음",price:"8,000원",sold:false},{name:"돈까스",price:"9,000원",sold:false}] },
  { id:3, name:"아미 분식",     zone:"복문",       category:"분식",  rating:4.7, reviewCount:84,  badge:"분식 맛집", tag:"orange", status:"영업중", address:"복문 근처 지하 1층", desc:"쫄면, 떡볶이 전문점. 매운맛 조절 가능!", price:"3,000~6,000원", image:"🍜", ownerId:null,
    menu:[{name:"떡볶이",price:"3,500원",sold:false},{name:"쫄면",price:"4,000원",sold:false},{name:"순대",price:"3,000원",sold:true}] },
  { id:4, name:"카페 아람",     zone:"천마아트센터",category:"카페",  rating:4.5, reviewCount:61,  badge:"",          tag:"purple", status:"영업중", address:"중앙도서관 1층", desc:"조용한 카페. 공부하기 좋아요.", price:"3,500~6,000원", image:"☕", ownerId:null,
    menu:[{name:"아메리카노",price:"3,500원",sold:false},{name:"카페라떼",price:"4,000원",sold:false},{name:"케이크",price:"5,500원",sold:false}] },
  { id:5, name:"든든한 밥상",   zone:"기숙사 근처", category:"한식",  rating:4.3, reviewCount:52,  badge:"",          tag:"green",  status:"영업중", address:"생활과학대 2층", desc:"기숙사 학생들이 즐겨 찾는 곳.", price:"5,000~7,000원", image:"🥘", ownerId:null,
    menu:[{name:"제육덮밥",price:"6,000원",sold:false},{name:"비빔밥",price:"5,500원",sold:false}] },
  { id:6, name:"피자스쿨",      zone:"천마아트센터",category:"양식",  rating:4.2, reviewCount:44,  badge:"",          tag:"red",    status:"영업중", address:"천마아트센터 지하", desc:"가성비 피자 전문점.", price:"6,000~12,000원", image:"🍕", ownerId:null,
    menu:[{name:"치즈피자",price:"8,000원",sold:false},{name:"불고기피자",price:"9,000원",sold:false},{name:"콤보피자",price:"12,000원",sold:false}] },
  { id:7, name:"후루룩 국수",   zone:"복문",       category:"분식",  rating:4.0, reviewCount:37,  badge:"",          tag:"yellow", status:"준비중", address:"학생회관 2층", desc:"국수와 칼국수 전문. 시원한 육수!", price:"4,000~6,000원", image:"🍝", ownerId:null,
    menu:[{name:"잔치국수",price:"4,000원",sold:false},{name:"칼국수",price:"5,000원",sold:false}] },
];

const INITIAL_REVIEWS = [
  { id:1, restaurantId:1, userId:"익명", dept:"경영학과",  rating:5, text:"처킨달밥 진짜 미쳤어요... 소스가 핵심!", time:"10분 전",  reply:null },
  { id:2, restaurantId:1, userId:"익명", dept:"식품영양학과", rating:4, text:"양 많고 가격도 착해서 자주 가요!",      time:"1시간 전", reply:"감사합니다! 앞으로도 맛있게 해드릴게요 😊" },
  { id:3, restaurantId:2, userId:"익명", dept:"컴퓨터공학과", rating:4, text:"분위기도 좋고 파스타 맛집 인정!",      time:"2시간 전", reply:null },
  { id:4, restaurantId:3, userId:"익명", dept:"국어국문학과", rating:5, text:"떡볶이 양 너무 많아서 놀랐어요 ㅋㅋ",   time:"3시간 전", reply:null },
];

const INITIAL_SOS = [
  { id:"SOS-2024-05131", type:"폐업 여부", restaurant:"소담한식",  location:"생활과학대 1층", requester:"kimstudent", dept:"식품영양학과", date:"2024.05.31 14:32", status:"대기 중",  detail:"" },
  { id:"SOS-2024-05130", type:"가격 변동", restaurant:"후루룩 국수",location:"학생회관 2층",   requester:"leeuser",    dept:"경영학과",      date:"2024.05.30 11:15", status:"검토 중",  detail:"" },
  { id:"SOS-2024-05129", type:"위치 오류", restaurant:"카페 아람",  location:"중앙도서관 1층", requester:"yufoodie",   dept:"국어국문학과",   date:"2024.05.29 16:47", status:"대기 중",  detail:"" },
  { id:"SOS-2024-05128", type:"가격 변동", restaurant:"피자스쿨",   location:"천마아트센터 지하",requester:"park123",   dept:"기계공학부",     date:"2024.05.28 09:22", status:"승인 완료", detail:"" },
  { id:"SOS-2024-05127", type:"폐업 여부", restaurant:"미소분식",   location:"학생회관 1층",   requester:"choi_eat",   dept:"화학과",         date:"2024.05.27 18:05", status:"거절됨",   detail:"" },
];

// ─── HELPERS ─────────────────────────────────────────────────────────────────
const DANGER_WORDS = ["욕설","비방","광고","홍보","스팸"];
function isDanger(text) {
  return DANGER_WORDS.some(w => text.includes(w));
}
function StarRow({ rating, size=16 }) {
  return (
    <span style={{display:"inline-flex",gap:1}}>
      {[1,2,3,4,5].map(i=>(
        <span key={i} style={{fontSize:size, color: i<=Math.round(rating) ? "#f59e0b" : "#d1d5db"}}>★</span>
      ))}
    </span>
  );
}
function Badge({ text, color }) {
  const colors = { green:"#dcfce7:#16a34a", blue:"#dbeafe:#1d4ed8", orange:"#ffedd5:#ea580c", purple:"#f3e8ff:#7c3aed", red:"#fee2e2:#dc2626", yellow:"#fef9c3:#ca8a04" };
  const [bg, fg] = (colors[color]||"#f3f4f6:#374151").split(":");
  return <span style={{background:bg,color:fg,padding:"2px 8px",borderRadius:99,fontSize:11,fontWeight:600}}>{text}</span>;
}
function Toast({ msg, onClose }) {
  useEffect(()=>{ const t=setTimeout(onClose,2500); return()=>clearTimeout(t); },[]);
  return (
    <div style={{position:"fixed",bottom:32,left:"50%",transform:"translateX(-50%)",background:"#1e3a5f",color:"#fff",padding:"12px 24px",borderRadius:12,zIndex:9999,fontSize:14,fontWeight:500,boxShadow:"0 4px 20px rgba(0,0,0,.25)"}}>
      {msg}
    </div>
  );
}

// ─── STYLES (CSS-in-JS tokens) ────────────────────────────────────────────────
const C = {
  navy:  "#1e3a5f",
  teal:  "#0ea5e9",
  cyan:  "#22d3ee",
  bg:    "#f0f8ff",
  white: "#ffffff",
  card:  "#ffffff",
  text:  "#0f172a",
  muted: "#64748b",
  border:"#e2e8f0",
  danger:"#ef4444",
  success:"#22c55e",
};
const btnPrimary = { background:C.navy, color:"#fff", border:"none", borderRadius:10, padding:"12px 28px", fontWeight:700, fontSize:15, cursor:"pointer" };
const btnOutline = { background:"transparent", color:C.navy, border:`2px solid ${C.navy}`, borderRadius:10, padding:"10px 24px", fontWeight:700, fontSize:15, cursor:"pointer" };
const input = { border:`1.5px solid ${C.border}`, borderRadius:10, padding:"12px 16px", fontSize:15, width:"100%", outline:"none", boxSizing:"border-box" };
const card  = { background:C.card, borderRadius:16, boxShadow:"0 2px 12px rgba(0,0,0,.07)", padding:20 };

// ─── NAV ─────────────────────────────────────────────────────────────────────
function Nav({ user, page, setPage, onLogout }) {
  const links = user?.role === "manager"
    ? []
    : ["홈","맛집 탐색","추천 맛집","테마 맛집","커뮤니티","마이페이지"];
  return (
    <nav style={{background:C.white, borderBottom:`1px solid ${C.border}`, padding:"0 32px", display:"flex", alignItems:"center", gap:32, height:60, position:"sticky", top:0, zIndex:100}}>
      <div onClick={()=>setPage("home")} style={{cursor:"pointer", display:"flex", alignItems:"center", gap:8}}>
        <span style={{fontSize:22}}>🐾</span>
        <span style={{fontWeight:900, fontSize:20, color:C.navy}}>Hi-</span>
        <span style={{fontWeight:900, fontSize:20, color:C.cyan}}>yu!</span>
      </div>
      <div style={{display:"flex",gap:24,flex:1,justifyContent:"center"}}>
        {links.map(l=>(
          <span key={l} onClick={()=>setPage(l==="홈"?"home":l==="맛집 탐색"?"search":l==="마이페이지"?"mypage":"home")}
            style={{cursor:"pointer",fontWeight:600,fontSize:14,color:C.navy,paddingBottom:4,borderBottom:page==="home"&&l==="홈"||page==="search"&&l==="맛집 탐색"?`2px solid ${C.navy}`:"none"}}>
            {l}
          </span>
        ))}
      </div>
      {user ? (
        <div style={{display:"flex",alignItems:"center",gap:12}}>
          <span style={{fontSize:14,color:C.muted}}>{user.name}</span>
          {user.role==="manager" && <button onClick={()=>setPage("admin")} style={{...btnOutline,padding:"6px 14px",fontSize:13}}>관리자 패널</button>}
          <button onClick={onLogout} style={{...btnOutline,padding:"6px 14px",fontSize:13}}>로그아웃</button>
        </div>
      ) : (
        <button onClick={()=>setPage("login")} style={{...btnPrimary,padding:"8px 20px",fontSize:14}}>로그인</button>
      )}
    </nav>
  );
}

// ─── HOME PAGE ────────────────────────────────────────────────────────────────
function HomePage({ restaurants, reviews, setPage, setSelectedRestaurant }) {
  const topRest = [...restaurants].sort((a,b)=>b.rating-a.rating).slice(0,3);
  const recentReviews = [...reviews].reverse().slice(0,3);
  return (
    <div>
      {/* Hero */}
      <div style={{background:"linear-gradient(135deg,#dbeafe 0%,#e0f2fe 50%,#f0fdf4 100%)",padding:"48px 40px 32px",textAlign:"center",position:"relative",overflow:"hidden"}}>
        <div style={{fontSize:72,marginBottom:8}}>🐾</div>
        <h1 style={{fontSize:56,fontWeight:900,color:C.navy,margin:0}}>Hi-<span style={{color:C.cyan}}>yu!</span></h1>
        <p style={{color:C.navy,fontSize:20,fontWeight:700,margin:"8px 0 4px"}}>영대 안의 숨은 맛집</p>
        <p style={{color:C.teal,fontSize:16,fontWeight:600,margin:"0 0 8px"}}><b style={{color:C.navy}}>HI</b>dden Restaurant</p>
        <p style={{color:C.muted,fontSize:14,margin:"0 0 24px"}}>영남대 학생들이 직접 추천하는 믿을 수 있는 맛집 플랫폼</p>
        <button onClick={()=>setPage("search")} style={{...btnPrimary,fontSize:16,padding:"14px 36px",borderRadius:99,display:"inline-flex",alignItems:"center",gap:8}}>
          📍 맛집 탐색 시작하기 →
        </button>
      </div>

      <div style={{padding:"32px 40px",display:"grid",gridTemplateColumns:"1fr 340px 340px",gap:24,maxWidth:1280,margin:"0 auto"}}>
        {/* Popular */}
        <div style={card}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
            <h3 style={{margin:0,color:C.navy}}>🔥 실시간 인기 맛집 <span style={{fontSize:13,color:C.muted,fontWeight:400}}>지금 가장 핫한 맛집을 확인해보세요!</span></h3>
            <span onClick={()=>setPage("search")} style={{color:C.teal,fontSize:13,cursor:"pointer",fontWeight:600}}>더보기 &gt;</span>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12}}>
            {topRest.map((r,i)=>(
              <div key={r.id} onClick={()=>{setSelectedRestaurant(r);setPage("detail");}} style={{cursor:"pointer",border:`1px solid ${C.border}`,borderRadius:12,overflow:"hidden"}}>
                <div style={{background:"linear-gradient(135deg,#bfdbfe,#ddd6fe)",height:100,display:"flex",alignItems:"center",justifyContent:"center",fontSize:40,position:"relative"}}>
                  <span style={{position:"absolute",top:8,left:8,background:["#f59e0b","#94a3b8","#cd7f32"][i],color:"#fff",borderRadius:99,width:22,height:22,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:800}}>{i+1}</span>
                  <span style={{position:"absolute",top:8,right:8,background:C.success,color:"#fff",fontSize:10,padding:"2px 6px",borderRadius:99,fontWeight:600}}>{r.status}</span>
                  {r.image}
                </div>
                <div style={{padding:10}}>
                  <div style={{fontWeight:700,fontSize:14,marginBottom:4}}>{r.name}</div>
                  <div style={{display:"flex",alignItems:"center",gap:4,marginBottom:4}}>
                    <span style={{color:"#f59e0b",fontSize:13}}>★</span>
                    <span style={{fontSize:13,fontWeight:600}}>{r.rating}</span>
                    <span style={{fontSize:11,color:C.muted}}>({r.reviewCount})</span>
                  </div>
                  {r.badge && <Badge text={r.badge} color={r.tag} />}
                  <div style={{fontSize:11,color:C.muted,marginTop:4}}>{r.zone} · {r.category}</div>
                </div>
              </div>
            ))}
          </div>
          {/* Feature pills */}
          <div
  style={{
    display:"grid",
    gridTemplateColumns:"repeat(3,1fr)",
    gap:16,
    marginTop:20
  }}
>
            {[
              {icon:"💬",title:"신뢰할 수 있는 리뷰",desc:"영남대 학생만 작성 가능한 솔직한 리뷰 시스템"},
              {icon:"🔔",title:"실시간 정보 업데이트",desc:"영업시간, 메뉴, 품절 정보까지 실시간으로 확인"},
              {icon:"🆘",title:"정보 수정 요청 (SOS)",desc:"잘못된 정보가 있다면 학생이 직접 신고 가능!"},
            ].map(f=>(
              <div
  key={f.title}
  style={{
    background:"#fff",
    border:"1px solid #e2e8f0",
    borderRadius:16,
    padding:20,
    textAlign:"center",
    minHeight:180,

    display:"flex",
    flexDirection:"column",
    justifyContent:"center",
    alignItems:"center",

    boxShadow:"0 2px 8px rgba(0,0,0,.05)"
  }}
>
  <div
    style={{
      width:56,
      height:56,
      borderRadius:"50%",
      background:"#eff6ff",
      display:"flex",
      alignItems:"center",
      justifyContent:"center",
      fontSize:28,
      marginBottom:14
    }}
  >
    {f.icon}
  </div>

  <div
    style={{
      fontWeight:700,
      fontSize:15,
      color:C.navy,
      marginBottom:8
    }}
  >
    {f.title}
  </div>

  <div
    style={{
      fontSize:13,
      lineHeight:1.6,
      color:C.muted
    }}
  >
    {f.desc}
  </div>
</div>
            ))}
          </div>
        </div>

        {/* Real-time reviews */}
        <div style={card}>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:14}}>
            <h3 style={{margin:0,color:C.navy,fontSize:15}}>실시간 리뷰</h3>
            <span style={{color:C.teal,fontSize:13,cursor:"pointer",fontWeight:600}}>더보기 &gt;</span>
          </div>
          {recentReviews.map(rv=>(
            <div key={rv.id} style={{borderBottom:`1px solid ${C.border}`,paddingBottom:12,marginBottom:12}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
                <span style={{fontSize:13,fontWeight:600}}>익명 {rv.dept}</span>
                <span style={{fontSize:11,color:C.muted}}>{rv.time}</span>
              </div>
              <StarRow rating={rv.rating} size={12} />
              <p style={{fontSize:13,margin:"4px 0 0",color:C.text}}>{rv.text}</p>
            </div>
          ))}
          <div style={{background:C.bg,borderRadius:10,padding:12,marginTop:8}}>
            <div style={{fontSize:13,fontWeight:600,marginBottom:4}}>💬 점주와 소통해요</div>
            <div style={{fontSize:12,color:C.muted}}>리뷰에 점주가 직접 답변하고 소통할 수 있어요</div>
          </div>
        </div>

        {/* Map placeholder */}
        <div style={card}>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:10}}>
            <h3 style={{margin:0,color:C.navy,fontSize:15}}>지도로 맛집 찾기</h3>
            <span style={{color:C.teal,fontSize:13,cursor:"pointer",fontWeight:600}} onClick={()=>setPage("search")}>전체 지도 보기 &gt;</span>
          </div>
          <p style={{fontSize:12,color:C.muted,margin:"0 0 12px"}}>원하는 지역을 선택하면 맛집을 한눈에!</p>
          <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:12}}>
            {ZONES.map(z=>(
              <span key={z} onClick={()=>setPage("search")} style={{background:z==="전체"?C.navy:C.bg,color:z==="전체"?"#fff":C.navy,padding:"4px 10px",borderRadius:99,fontSize:12,cursor:"pointer",fontWeight:600,border:`1px solid ${C.border}`}}>{z}</span>
            ))}
          </div>
          {/* Fake campus map */}
          <div style={{background:"linear-gradient(135deg,#bfdbfe 0%,#dbeafe 100%)",borderRadius:12,height:200,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:8,position:"relative",overflow:"hidden"}}>
            <div style={{fontSize:12,color:C.navy,fontWeight:700,marginBottom:8}}>🗺️ 영남대학교 캠퍼스</div>
            {[
              {label:"정문",x:20,y:70},{label:"복문",x:50,y:20},{label:"오렌지거리",x:60,y:65},
              {label:"기숙사",x:80,y:55},{label:"천마아트센터",x:85,y:30},
            ].map(m=>(
              <div key={m.label} style={{position:"absolute",left:`${m.x}%`,top:`${m.y}%`,textAlign:"center"}}>
                <div style={{fontSize:18}}>🍽️</div>
                <div style={{fontSize:9,fontWeight:700,color:C.navy,background:"rgba(255,255,255,.8)",padding:"1px 4px",borderRadius:4}}>{m.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer style={{background:C.navy,color:"#fff",padding:"20px 40px",display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:16}}>
        <div style={{display:"flex",alignItems:"center",gap:12}}>
          <span style={{fontSize:20}}>🏫</span>
          <div><div style={{fontWeight:700,fontSize:14}}>영남대학교</div><div style={{fontSize:11,opacity:.7}}>Yeungnam University</div></div>
        </div>
        <p style={{fontSize:13,opacity:.8,margin:0}}>Hi-yu!는 영남대학교 학생들을 위한 커뮤니티 기반 맛집 플랫폼입니다.</p>
        <div style={{display:"flex",gap:16,fontSize:18}}>
          <span>📸</span><span>💬</span><span>✉️</span>
        </div>
      </footer>
    </div>
  );
}

// ─── LOGIN PAGE ───────────────────────────────────────────────────────────────
function LoginPage({ setPage, onLogin }) {
  const [id,setId]=useState("");
  const [pw,setPw]=useState("");
  const [err,setErr]=useState("");
  const [showPw,setShowPw]=useState(false);
  const [saveId,setSaveId]=useState(false);

  function submit() {
    const u = MOCK_USERS.find(u=>u.id===id && u.password===pw);
    if(!u){ setErr("아이디 또는 비밀번호를 확인해주세요."); return; }
    onLogin(u);
  }

  return (
    <div style={{minHeight:"calc(100vh - 60px)",display:"grid",gridTemplateColumns:"1fr 1fr"}}>
      {/* Left brand panel */}
      <div style={{background:"linear-gradient(135deg,#dbeafe,#e0f2fe,#f0fdf4)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:48,gap:16}}>
        <h1 style={{fontSize:52,fontWeight:900,color:C.navy,margin:0}}>Hi-<span style={{color:C.cyan}}>yu!</span></h1>
        <p style={{color:C.navy,fontWeight:700,fontSize:18,margin:0}}>영대 안의 숨은 맛집</p>
        <p style={{color:C.teal,fontWeight:600,fontSize:16,margin:0}}><b style={{color:C.navy}}>HI</b>dden Restaurant</p>
        <div style={{fontSize:80,margin:"16px 0"}}>🐾</div>
        <div style={{display:"flex",alignItems:"center",gap:10,opacity:.7}}>
          <span style={{fontSize:14}}>🏫</span>
          <span style={{fontWeight:700,fontSize:14,color:C.navy}}>영남대학교 Yeungnam University</span>
        </div>
      </div>
      {/* Right form */}
      <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:48}}>
        <div style={{width:"100%",maxWidth:400}}>
          <h2 style={{fontSize:32,fontWeight:900,color:C.navy,margin:"0 0 8px",textAlign:"center"}}>로그인</h2>
          <p style={{color:C.muted,textAlign:"center",fontSize:14,margin:"0 0 32px"}}>Hi-yu!에 오신 것을 환영합니다!</p>
          <label style={{fontSize:14,fontWeight:600,color:C.text}}>아이디</label>
          <div style={{position:"relative",margin:"6px 0 16px"}}>
            <span style={{position:"absolute",left:14,top:"50%",transform:"translateY(-50%)",color:C.muted}}>👤</span>
            <input value={id} onChange={e=>setId(e.target.value)} placeholder="아이디를 입력해주세요" style={{...input,paddingLeft:40}} onKeyDown={e=>e.key==="Enter"&&submit()} />
          </div>
          <label style={{fontSize:14,fontWeight:600,color:C.text}}>비밀번호</label>
          <div style={{position:"relative",margin:"6px 0 8px"}}>
            <span style={{position:"absolute",left:14,top:"50%",transform:"translateY(-50%)",color:C.muted}}>🔒</span>
            <input type={showPw?"text":"password"} value={pw} onChange={e=>setPw(e.target.value)} placeholder="비밀번호를 입력해주세요" style={{...input,paddingLeft:40,paddingRight:40}} onKeyDown={e=>e.key==="Enter"&&submit()} />
            <span onClick={()=>setShowPw(!showPw)} style={{position:"absolute",right:14,top:"50%",transform:"translateY(-50%)",cursor:"pointer",color:C.muted,fontSize:14}}>{showPw?"🙈":"👁️"}</span>
          </div>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:20,fontSize:13}}>
            <label style={{display:"flex",gap:6,alignItems:"center",cursor:"pointer",color:C.muted}}>
              <input type="checkbox" checked={saveId} onChange={e=>setSaveId(e.target.checked)} />아이디 저장
            </label>
            <span style={{color:C.teal,cursor:"pointer",fontWeight:600}}>비밀번호 찾기 &gt;</span>
          </div>
          {err && <p style={{color:C.danger,fontSize:13,margin:"0 0 12px",textAlign:"center"}}>{err}</p>}
          <button onClick={submit} style={{...btnPrimary,width:"100%",borderRadius:12,padding:"14px",fontSize:16,marginBottom:16}}>로그인</button>
          <div style={{display:"flex",alignItems:"center",gap:12,margin:"0 0 16px"}}>
            <div style={{flex:1,height:1,background:C.border}} />
            <span style={{color:C.muted,fontSize:13}}>또는</span>
            <div style={{flex:1,height:1,background:C.border}} />
          </div>
          <button onClick={()=>setPage("signup")} style={{...btnOutline,width:"100%",borderRadius:12,padding:"14px",fontSize:16,display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
            👤+ 회원가입
          </button>
          <p style={{fontSize:11,color:C.muted,textAlign:"center",marginTop:20}}>
            테스트 계정: student1/1234 | owner1/1234 | manager1/1234
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── SIGNUP PAGE ──────────────────────────────────────────────────────────────
function SignupPage({ setPage, onSignup }) {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [code,  setCode]  = useState(["","","","","",""]);
  const [timer, setTimer] = useState(590);
  const [sent,  setSent]  = useState(false);
  const [verified, setVerified] = useState(false);
  const [form, setForm] = useState({ id:"", pw:"", pw2:"", name:"", dept:"" });
  const [err, setErr] = useState("");
  const timerRef = useRef(null);
  const codeRefs = [useRef(),useRef(),useRef(),useRef(),useRef(),useRef()];

  useEffect(()=>{
    if(sent && timer>0){ timerRef.current=setInterval(()=>setTimer(t=>t-1),1000); }
    return ()=>clearInterval(timerRef.current);
  },[sent]);

  function sendCode() {
    if(!email){ setErr("학교 메일 주소를 입력해주세요."); return; }
    setSent(true); setTimer(590); setErr("");
    clearInterval(timerRef.current);
  }
  function verifyCode() {
    const entered = code.join("");
    if(entered==="123456"||entered.length===6){ setVerified(true); setStep(2); }
    else setErr("인증번호가 올바르지 않습니다. (힌트: 123456)");
  }
  function handleCodeInput(i,v) {
    if(!/^\d?$/.test(v)) return;
    const next=[...code]; next[i]=v; setCode(next);
    if(v && i<5) codeRefs[i+1].current?.focus();
  }
  function submitForm() {
    if(!form.id||!form.pw||!form.name||!form.dept){ setErr("모든 항목을 입력해주세요."); return; }
    if(form.pw!==form.pw2){ setErr("비밀번호가 일치하지 않습니다."); return; }
    onSignup({ id:form.id, password:form.pw, role:"student", name:form.name, dept:form.dept });
  }
  const mm=String(Math.floor(timer/60)).padStart(2,"0");
  const ss=String(timer%60).padStart(2,"0");

  return (
    <div style={{minHeight:"calc(100vh-60px)",display:"grid",gridTemplateColumns:"1fr 1fr"}}>
      <div style={{background:"linear-gradient(135deg,#dbeafe,#e0f2fe,#f0fdf4)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:48,gap:16}}>
        <h1 style={{fontSize:48,fontWeight:900,color:C.navy,margin:0}}>Hi-<span style={{color:C.cyan}}>yu!</span></h1>
        <p style={{color:C.navy,fontWeight:700,fontSize:18,margin:0}}>영대 안의 숨은 맛집</p>
        <p style={{color:C.teal,fontWeight:600,fontSize:16,margin:0}}><b style={{color:C.navy}}>HI</b>dden Restaurant</p>
        <div style={{fontSize:80,margin:"16px 0"}}>🐾</div>
        <div style={{display:"flex",alignItems:"center",gap:10,opacity:.7}}>
          <span style={{fontSize:14}}>🏫</span>
          <span style={{fontWeight:700,fontSize:14,color:C.navy}}>영남대학교 Yeungnam University</span>
        </div>
      </div>
      <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:48}}>
        <div style={{width:"100%",maxWidth:440}}>
          {/* Step indicator */}
          <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:0,marginBottom:32}}>
            {[{n:1,label:"학교 인증"},{n:2,label:"기본 정보 입력"},{n:3,label:"가입 완료"}].map((s,i)=>(
              <div key={s.n} style={{display:"flex",alignItems:"center"}}>
                <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:4}}>
                  <div style={{width:32,height:32,borderRadius:"50%",background:step>=s.n?C.navy:"#e2e8f0",color:step>=s.n?"#fff":C.muted,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700,fontSize:14}}>{s.n}</div>
                  <span style={{fontSize:11,color:step>=s.n?C.navy:C.muted,fontWeight:step>=s.n?700:400}}>{s.label}</span>
                </div>
                {i<2&&<div style={{width:60,height:1,background:step>s.n?C.navy:"#e2e8f0",marginBottom:18,margin:"0 4px 18px"}} />}
              </div>
            ))}
          </div>

          {step===1 && (
            <>
              <h2 style={{fontSize:28,fontWeight:900,color:C.navy,margin:"0 0 8px",textAlign:"center"}}>학교 인증</h2>
              <p style={{color:C.muted,textAlign:"center",fontSize:13,margin:"0 0 24px"}}>영남대학교 구성원임을 확인하기 위해 학교 메일 인증이 필요합니다.</p>
              <label style={{fontSize:14,fontWeight:600}}>1. 학교 메일 주소 입력</label>
              <div style={{display:"flex",gap:8,margin:"8px 0 16px"}}>
                <div style={{position:"relative",flex:1}}>
                  <span style={{position:"absolute",left:12,top:"50%",transform:"translateY(-50%)",color:C.muted,fontSize:14}}>✉️</span>
                  <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="학교 메일 주소를 입력해주세요" style={{...input,paddingLeft:36}} />
                </div>
                <span style={{display:"flex",alignItems:"center",color:C.muted,fontSize:14,whiteSpace:"nowrap",fontWeight:600,padding:"0 8px"}}>@yu.ac.kr</span>
                <button onClick={sendCode} style={{...btnPrimary,padding:"8px 16px",fontSize:13,whiteSpace:"nowrap"}}>전송</button>
              </div>
              <p style={{fontSize:11,color:C.muted,margin:"0 0 20px"}}>예) abc1234@yu.ac.kr</p>
              <label style={{fontSize:14,fontWeight:600}}>2. 인증 요청 6자리 숫자 입력</label>
              <div style={{display:"flex",gap:8,justifyContent:"center",margin:"12px 0 8px"}}>
                {code.map((c,i)=>(
                  <input key={i} ref={codeRefs[i]} value={c} onChange={e=>handleCodeInput(i,e.target.value)}
                    maxLength={1} style={{width:46,height:52,textAlign:"center",fontSize:20,fontWeight:700,border:`2px solid ${C.border}`,borderRadius:10,outline:"none"}} />
                ))}
              </div>
              <p style={{fontSize:12,color:C.muted,margin:"0 0 6px"}}>메일로 전송된 6자리 인증번호를 입력해주세요.</p>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:20}}>
                <span style={{fontSize:12,color:C.muted}}>⏱ 인증번호 유효시간 {mm}:{ss}</span>
                <button onClick={sendCode} style={{...btnOutline,padding:"4px 10px",fontSize:12}}>인증번호 재전송</button>
              </div>
              {err && <p style={{color:C.danger,fontSize:13,marginBottom:12}}>{err}</p>}
              <button onClick={verifyCode} style={{...btnPrimary,width:"100%",borderRadius:12,padding:"14px",fontSize:16}}>입력 완료</button>
              <p style={{fontSize:11,color:C.muted,textAlign:"center",marginTop:12}}>인증 메일이 오지 않나요? 스팸함을 확인해주세요.</p>
              <p style={{fontSize:11,color:C.teal,textAlign:"center",marginTop:4}}>(테스트용: 아무 6자리나 입력하면 인증 성공)</p>
            </>
          )}
          {step===2 && (
            <>
              <h2 style={{fontSize:28,fontWeight:900,color:C.navy,margin:"0 0 24px",textAlign:"center"}}>기본 정보 입력</h2>
              {[
                {label:"아이디",key:"id",placeholder:"사용할 아이디를 입력해주세요"},
                {label:"비밀번호",key:"pw",placeholder:"비밀번호를 입력해주세요",type:"password"},
                {label:"비밀번호 확인",key:"pw2",placeholder:"비밀번호를 다시 입력해주세요",type:"password"},
                {label:"이름",key:"name",placeholder:"이름을 입력해주세요"},
                {label:"소속 학과",key:"dept",placeholder:"소속 학과를 입력해주세요"},
              ].map(f=>(
                <div key={f.key} style={{marginBottom:14}}>
                  <label style={{fontSize:14,fontWeight:600}}>{f.label}</label>
                  <input type={f.type||"text"} value={form[f.key]} onChange={e=>setForm({...form,[f.key]:e.target.value})} placeholder={f.placeholder} style={{...input,marginTop:6}} />
                </div>
              ))}
              {err && <p style={{color:C.danger,fontSize:13,marginBottom:12}}>{err}</p>}
              <button onClick={submitForm} style={{...btnPrimary,width:"100%",borderRadius:12,padding:"14px",fontSize:16}}>가입 완료</button>
            </>
          )}
          {step===3 && (
            <div style={{textAlign:"center",padding:"32px 0"}}>
              <div style={{fontSize:64,marginBottom:16}}>🎉</div>
              <h2 style={{color:C.navy,fontSize:28,fontWeight:900}}>가입 완료!</h2>
              <p style={{color:C.muted,fontSize:14}}>영남대 학생 인증이 완료되었습니다.<br/>Hi-yu!의 모든 기능을 이용할 수 있어요.</p>
              <button onClick={()=>setPage("login")} style={{...btnPrimary,marginTop:24,padding:"12px 32px"}}>로그인하러 가기</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── SEARCH PAGE ──────────────────────────────────────────────────────────────
function SearchPage({ restaurants, setSelectedRestaurant, setPage }) {
  const [zone, setZone] = useState("전체");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("전체");
  const [sort, setSort] = useState("평점순");

  const categories = ["전체","한식","분식","양식","카페"];
  const filtered = restaurants.filter(r=>{
    const zOk = zone==="전체"||r.zone===zone;
    const qOk = r.name.includes(query)||r.desc.includes(query)||r.category.includes(query);
    const cOk = category==="전체"||r.category===category;
    return zOk&&qOk&&cOk;
  }).sort((a,b)=>sort==="평점순"?b.rating-a.rating:b.reviewCount-a.reviewCount);

  return (
    <div style={{padding:"32px 40px",maxWidth:1280,margin:"0 auto"}}>
      <h2 style={{fontSize:28,fontWeight:900,color:C.navy,margin:"0 0 24px"}}>🍽️ 맛집 탐색</h2>
      {/* Search bar */}
      <div style={{display:"flex",gap:12,marginBottom:20}}>
        <div style={{flex:1,position:"relative"}}>
          <span style={{position:"absolute",left:14,top:"50%",transform:"translateY(-50%)",color:C.muted}}>🔍</span>
          <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="식당 이름, 메뉴, 분위기로 검색해보세요" style={{...input,paddingLeft:40}} />
        </div>
        <select value={sort} onChange={e=>setSort(e.target.value)} style={{...input,width:"auto",paddingRight:32}}>
          <option>평점순</option><option>리뷰 많은순</option>
        </select>
      </div>
      {/* Zone filter */}
      <div style={{display:"flex",gap:8,marginBottom:12,flexWrap:"wrap"}}>
        {ZONES.map(z=>(
          <button key={z} onClick={()=>setZone(z)} style={{background:zone===z?C.navy:"#fff",color:zone===z?"#fff":C.navy,border:`1.5px solid ${zone===z?C.navy:C.border}`,borderRadius:99,padding:"6px 16px",fontSize:13,fontWeight:600,cursor:"pointer"}}>
            {z}
          </button>
        ))}
      </div>
      {/* Category filter */}
      <div style={{display:"flex",gap:8,marginBottom:24}}>
        {categories.map(c=>(
          <button key={c} onClick={()=>setCategory(c)} style={{background:category===c?C.teal:"#fff",color:category===c?"#fff":C.navy,border:`1.5px solid ${category===c?C.teal:C.border}`,borderRadius:99,padding:"5px 14px",fontSize:13,fontWeight:600,cursor:"pointer"}}>
            {c}
          </button>
        ))}
      </div>
      <p style={{color:C.muted,fontSize:14,marginBottom:16}}>{filtered.length}개의 맛집을 찾았어요</p>
      {/* Grid */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:20}}>
        {filtered.map(r=>(
          <div key={r.id} onClick={()=>{setSelectedRestaurant(r);setPage("detail");}}
            style={{...card,cursor:"pointer",transition:"transform .15s,box-shadow .15s",":hover":{transform:"translateY(-2px)"}}}>
            <div style={{background:"linear-gradient(135deg,#bfdbfe,#ddd6fe)",borderRadius:12,height:120,display:"flex",alignItems:"center",justifyContent:"center",fontSize:56,position:"relative",marginBottom:12}}>
              {r.image}
              <span style={{position:"absolute",top:10,right:10,background:r.status==="영업중"?C.success:"#94a3b8",color:"#fff",fontSize:11,padding:"3px 8px",borderRadius:99,fontWeight:600}}>{r.status}</span>
            </div>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:6}}>
              <h3 style={{margin:0,fontSize:17,fontWeight:800,color:C.navy}}>{r.name}</h3>
              {r.badge&&<Badge text={r.badge} color={r.tag} />}
            </div>
            <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:6}}>
              <StarRow rating={r.rating} size={13} />
              <span style={{fontWeight:700,fontSize:14}}>{r.rating}</span>
              <span style={{color:C.muted,fontSize:12}}>({r.reviewCount})</span>
            </div>
            <div style={{color:C.muted,fontSize:12,marginBottom:8}}>📍 {r.zone} · {r.address}</div>
            <p style={{color:C.text,fontSize:13,margin:"0 0 8px",lineHeight:1.5}}>{r.desc}</p>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <span style={{fontSize:12,color:C.teal,fontWeight:600}}>💰 {r.price}</span>
              <span style={{fontSize:12,background:C.bg,padding:"3px 10px",borderRadius:99,color:C.navy,fontWeight:600}}>{r.category}</span>
            </div>
          </div>
        ))}
        {filtered.length===0&&(
          <div style={{gridColumn:"1/-1",textAlign:"center",padding:"48px 0",color:C.muted}}>
            <div style={{fontSize:48,marginBottom:12}}>🔍</div>
            <p style={{fontSize:16,fontWeight:600}}>등록된 식당이 없습니다</p>
            <p style={{fontSize:13}}>다른 조건으로 검색해 보세요.</p>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── DETAIL PAGE ──────────────────────────────────────────────────────────────
function DetailPage({ restaurant, user, reviews, onAddReview, setPage, onSOS }) {
  const [tab, setTab] = useState("메뉴");
  const [reviewText, setReviewText] = useState("");
  const [starScore, setStarScore] = useState(5);
  const [hoverStar, setHoverStar] = useState(0);
  const [showSOS, setShowSOS] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const myReviews = reviews.filter(r=>r.restaurantId===restaurant.id);

  function submitReview() {
    if(!user){ setToastMsg("로그인 후 리뷰를 작성할 수 있어요!"); return; }
    if(reviewText.trim().length<5){ setToastMsg("리뷰는 5자 이상 입력해주세요."); return; }
    if(isDanger(reviewText)){ setToastMsg("부적절한 언어가 포함되어 있어요. 다시 작성해주세요."); return; }
    onAddReview({ restaurantId:restaurant.id, rating:starScore, text:reviewText, userId:"익명", dept:user.dept||"학생", time:"방금 전", reply:null });
    setReviewText(""); setStarScore(5);
    setToastMsg("리뷰가 등록되었습니다! 🎉");
  }

  return (
    <div style={{maxWidth:900,margin:"0 auto",padding:"32px 24px"}}>
      {toastMsg && <Toast msg={toastMsg} onClose={()=>setToastMsg("")} />}
      {showSOS && <SOSModal restaurant={restaurant} onClose={()=>setShowSOS(false)} onSubmit={(d)=>{onSOS({...d,restaurant:restaurant.name,location:restaurant.address});setShowSOS(false);setToastMsg("SOS 신고가 접수되었습니다!");}} />}

      <button onClick={()=>setPage("search")} style={{...btnOutline,padding:"6px 14px",fontSize:13,marginBottom:20}}>← 목록으로</button>

      {/* Header */}
      <div style={{...card,display:"grid",gridTemplateColumns:"160px 1fr",gap:24,marginBottom:20}}>
        <div style={{background:"linear-gradient(135deg,#bfdbfe,#ddd6fe)",borderRadius:12,height:140,display:"flex",alignItems:"center",justifyContent:"center",fontSize:72}}>{restaurant.image}</div>
        <div>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
            <div>
              <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:6}}>
                <h2 style={{margin:0,fontSize:26,fontWeight:900,color:C.navy}}>{restaurant.name}</h2>
                {restaurant.badge&&<Badge text={restaurant.badge} color={restaurant.tag} />}
              </div>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}>
                <StarRow rating={restaurant.rating} size={16} />
                <span style={{fontWeight:700,fontSize:16}}>{restaurant.rating}</span>
                <span style={{color:C.muted,fontSize:13}}>({restaurant.reviewCount}개 리뷰)</span>
              </div>
              <div style={{color:C.muted,fontSize:13,marginBottom:4}}>📍 {restaurant.zone} · {restaurant.address}</div>
              <div style={{color:C.muted,fontSize:13,marginBottom:8}}>💰 {restaurant.price}</div>
              <p style={{color:C.text,fontSize:14,margin:0}}>{restaurant.desc}</p>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:8}}>
              <span style={{background:restaurant.status==="영업중"?C.success:"#94a3b8",color:"#fff",padding:"4px 14px",borderRadius:99,fontSize:13,fontWeight:700,textAlign:"center"}}>{restaurant.status}</span>
              <button onClick={()=>setShowSOS(true)} style={{background:"#fef2f2",color:C.danger,border:`1px solid #fecaca`,borderRadius:10,padding:"8px 14px",fontSize:13,fontWeight:700,cursor:"pointer"}}>🆘 SOS</button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{display:"flex",gap:0,borderBottom:`2px solid ${C.border}`,marginBottom:20}}>
        {["메뉴","리뷰"].map(t=>(
          <button key={t} onClick={()=>setTab(t)} style={{background:"none",border:"none",padding:"10px 24px",fontSize:15,fontWeight:700,color:tab===t?C.navy:C.muted,borderBottom:tab===t?`2px solid ${C.navy}`:"none",cursor:"pointer",marginBottom:-2}}>
            {t} {t==="리뷰"&&`(${myReviews.length})`}
          </button>
        ))}
      </div>

      {tab==="메뉴" && (
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))",gap:12}}>
          {restaurant.menu.map(m=>(
            <div key={m.name} style={{...card,display:"flex",justifyContent:"space-between",alignItems:"center",opacity:m.sold?.8:1}}>
              <div>
                <div style={{fontWeight:700,fontSize:15,color:C.navy,marginBottom:4}}>{m.name}</div>
                <div style={{color:C.teal,fontWeight:600,fontSize:14}}>{m.price}</div>
              </div>
              {m.sold&&<span style={{background:"#fee2e2",color:C.danger,padding:"4px 10px",borderRadius:99,fontSize:12,fontWeight:700}}>품절</span>}
            </div>
          ))}
        </div>
      )}

      {tab==="리뷰" && (
        <div>
          {/* Write review */}
          <div style={{...card,marginBottom:20}}>
            <h4 style={{margin:"0 0 12px",color:C.navy}}>리뷰 작성</h4>
            <div style={{display:"flex",gap:4,marginBottom:12}}>
              {[1,2,3,4,5].map(i=>(
                <span key={i} onClick={()=>setStarScore(i)} onMouseEnter={()=>setHoverStar(i)} onMouseLeave={()=>setHoverStar(0)}
                  style={{fontSize:28,cursor:"pointer",color:i<=(hoverStar||starScore)?"#f59e0b":"#d1d5db"}}>★</span>
              ))}
              <span style={{fontSize:13,color:C.muted,alignSelf:"center",marginLeft:8}}>{starScore}점</span>
            </div>
            <textarea value={reviewText} onChange={e=>setReviewText(e.target.value)}
              placeholder="이 식당에 대한 솔직한 리뷰를 남겨주세요. (5자 이상, 욕설/비방 불가)"
              style={{...input,height:80,resize:"vertical",fontFamily:"inherit",lineHeight:1.5}} />
            <button onClick={submitReview} style={{...btnPrimary,marginTop:10,padding:"8px 24px"}}>등록</button>
          </div>
          {/* Review list */}
          {myReviews.length===0&&<p style={{color:C.muted,textAlign:"center",padding:"32px 0"}}>아직 리뷰가 없어요. 첫 번째 리뷰를 남겨보세요!</p>}
          {myReviews.map(rv=>(
            <div key={rv.id} style={{...card,marginBottom:12}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
                <div style={{display:"flex",gap:8,alignItems:"center"}}>
                  <span style={{fontSize:22}}>😺</span>
                  <div>
                    <span style={{fontWeight:700,fontSize:14}}>{rv.userId}</span>
                    <span style={{color:C.muted,fontSize:12,marginLeft:6}}>{rv.dept}</span>
                  </div>
                </div>
                <span style={{fontSize:12,color:C.muted}}>{rv.time}</span>
              </div>
              <StarRow rating={rv.rating} size={14} />
              <p style={{margin:"8px 0 0",fontSize:14,lineHeight:1.6}}>{rv.text}</p>
              {rv.reply&&(
                <div style={{background:C.bg,borderRadius:10,padding:"10px 14px",marginTop:10,borderLeft:`3px solid ${C.teal}`}}>
                  <div style={{fontSize:12,fontWeight:700,color:C.teal,marginBottom:4}}>💬 점주 답변</div>
                  <p style={{margin:0,fontSize:13,color:C.text}}>{rv.reply}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── SOS MODAL ────────────────────────────────────────────────────────────────
function SOSModal({ restaurant, onClose, onSubmit }) {
  const [type, setType] = useState("폐업 여부");
  const [detail, setDetail] = useState("");
  const types = [
    {key:"폐업 여부", icon:"🏪", desc:"해당 식당이 폐업했어요."},
    {key:"가격 변동", icon:"🏷️", desc:"메뉴 가격이 변경되었어요."},
    {key:"위치 오류", icon:"📍", desc:"지도에 표시된 위치가 잘못되었어요."},
  ];
  return (
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.5)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:200}}>
      <div style={{background:"#fff",borderRadius:20,padding:32,width:540,maxWidth:"95vw",position:"relative"}}>
        <button onClick={onClose} style={{position:"absolute",top:16,right:16,background:"none",border:"none",fontSize:20,cursor:"pointer",color:C.muted}}>✕</button>
        <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:20}}>
          <span style={{fontSize:40}}>🚨</span>
          <div>
            <h3 style={{margin:0,fontSize:20,fontWeight:800,color:C.navy}}>정보 수정 요청 (SOS)</h3>
            <p style={{margin:0,fontSize:13,color:C.muted}}>잘못된 정보가 있다면 알려주세요! 관리자가 확인 후 수정할게요.</p>
          </div>
        </div>
        <label style={{fontWeight:700,fontSize:14,color:C.text}}>문제 유형 선택 <span style={{color:C.muted,fontWeight:400}}>(하나 선택)</span></label>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10,margin:"10px 0 20px"}}>
          {types.map(t=>(
            <div key={t.key} onClick={()=>setType(t.key)}
              style={{border:`2px solid ${type===t.key?C.navy:C.border}`,borderRadius:12,padding:14,cursor:"pointer",background:type===t.key?"#f0f8ff":"#fff",textAlign:"center"}}>
              <div style={{fontSize:28,marginBottom:4}}>{t.icon}</div>
              <div style={{fontWeight:700,fontSize:13,color:C.navy,marginBottom:2}}>{t.key}</div>
              <div style={{fontSize:11,color:C.muted}}>{t.desc}</div>
            </div>
          ))}
        </div>
        <label style={{fontWeight:700,fontSize:14}}>상세 사유 입력</label>
        <textarea value={detail} onChange={e=>setDetail(e.target.value)}
          placeholder={"구체적으로 어떤 점이 다른지 작성해주세요.\n(예: 언제부터 문을 닫았는지, 실제 위치 등)"}
          style={{...input,height:100,marginTop:8,resize:"vertical",fontFamily:"inherit",lineHeight:1.5}} maxLength={300} />
        <div style={{textAlign:"right",fontSize:11,color:C.muted,margin:"4px 0 16px"}}>{detail.length}/300자</div>
        <div style={{background:C.bg,borderRadius:10,padding:12,marginBottom:20,display:"flex",gap:8}}>
          <span>🛡️</span>
          <div>
            <div style={{fontSize:13,fontWeight:600,color:C.navy}}>신고 내용은 관리자 확인 후 처리됩니다.</div>
            <div style={{fontSize:12,color:C.muted}}>정확한 정보 제공은 더 나은 서비스에 큰 도움이 됩니다.</div>
          </div>
        </div>
        <div style={{display:"flex",gap:10}}>
          <button onClick={onClose} style={{...btnOutline,flex:1,padding:"12px"}}>취소</button>
          <button onClick={()=>onSubmit({type,detail})} style={{...btnPrimary,flex:2,padding:"12px",display:"flex",alignItems:"center",justifyContent:"center",gap:6}}>🔔 신고하기</button>
        </div>
      </div>
    </div>
  );
}

// ─── ADMIN PAGE ───────────────────────────────────────────────────────────────
function AdminPage({ sosList, onApprove, onReject }) {
  const [filter, setFilter] = useState("전체");
  const [selected, setSelected] = useState(null);
  const statuses = ["전체","대기 중","검토 중","승인 완료","거절됨"];
  const statusColor = {"대기 중":"#f59e0b","검토 중":"#0ea5e9","승인 완료":"#22c55e","거절됨":"#ef4444"};
  const filtered = filter==="전체"?sosList:sosList.filter(s=>s.status===filter);
  const counts = statuses.reduce((acc,s)=>{acc[s]=s==="전체"?sosList.length:sosList.filter(x=>x.status===s).length;return acc;},{});

  return (
    <div style={{display:"grid",gridTemplateColumns:"220px 1fr",minHeight:"calc(100vh - 60px)"}}>
      {/* Sidebar */}
      <div style={{background:C.navy,color:"#fff",padding:24}}>
        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:32}}>
          <span style={{fontSize:20}}>🐾</span>
          <div><div style={{fontWeight:800,fontSize:16}}>Hi-yu!</div><div style={{fontSize:11,opacity:.7}}>관리자 시스템</div></div>
        </div>
        {[
          {icon:"📊",label:"대시보드"},
          {icon:"📋",label:"신청 관리",active:true},
          {icon:"🍽️",label:"식당 관리"},
          {icon:"👤",label:"사용자 관리"},
          {icon:"📢",label:"공지 관리"},
          {icon:"📈",label:"통계 대시보드"},
          {icon:"⚙️",label:"시스템 설정"},
        ].map(m=>(
          <div key={m.label} style={{display:"flex",gap:10,alignItems:"center",padding:"10px 12px",borderRadius:10,cursor:"pointer",marginBottom:4,background:m.active?"rgba(255,255,255,.15)":"transparent",opacity:m.active?1:.8}}>
            <span>{m.icon}</span><span style={{fontSize:14,fontWeight:m.active?700:400}}>{m.label}</span>
          </div>
        ))}
        <div style={{borderTop:"1px solid rgba(255,255,255,.2)",marginTop:"auto",paddingTop:16,marginTop:32,display:"flex",gap:8,alignItems:"center",opacity:.7,cursor:"pointer",fontSize:13}}>
          <span>🚪</span><span>로그아웃</span>
        </div>
      </div>

      {/* Main */}
      <div style={{padding:32,background:"#f8fafc"}}>
        <h2 style={{margin:"0 0 4px",fontSize:24,fontWeight:900,color:C.navy}}>신청 관리</h2>
        <p style={{color:C.muted,fontSize:13,margin:"0 0 24px"}}>학생들이 보낸 정보 수정 요청을 확인하고 처리할 수 있습니다.</p>

        {/* Status filter */}
        <div style={{display:"flex",gap:8,marginBottom:20,flexWrap:"wrap"}}>
          {statuses.map(s=>(
            <button key={s} onClick={()=>setFilter(s)} style={{background:filter===s?C.navy:"#fff",color:filter===s?"#fff":C.navy,border:`1.5px solid ${filter===s?C.navy:C.border}`,borderRadius:99,padding:"6px 16px",fontSize:13,fontWeight:600,cursor:"pointer"}}>
              {s} <span style={{fontWeight:filter===s?800:600,color:filter===s?"#fff":statusColor[s]||C.muted}}>{counts[s]}</span>
            </button>
          ))}
        </div>

        {/* Table */}
        <div style={{background:"#fff",borderRadius:16,boxShadow:"0 2px 12px rgba(0,0,0,.07)",overflow:"hidden"}}>
          <table style={{width:"100%",borderCollapse:"collapse"}}>
            <thead>
              <tr style={{background:"#f8fafc"}}>
                {["요청 ID","신청 유형","식당 정보","신청자","신청 일시","상태","작업"].map(h=>(
                  <th key={h} style={{padding:"12px 16px",textAlign:"left",fontSize:13,fontWeight:700,color:C.muted,borderBottom:`1px solid ${C.border}`}}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(s=>(
                <tr key={s.id} style={{borderBottom:`1px solid ${C.border}`}}>
                  <td style={{padding:"14px 16px",fontSize:13,color:C.muted,fontFamily:"monospace"}}>{s.id}</td>
                  <td style={{padding:"14px 16px"}}>
                    <span style={{display:"flex",alignItems:"center",gap:4,fontSize:13,fontWeight:700,color:s.type==="폐업 여부"?C.danger:s.type==="가격 변동"?C.success:C.teal}}>
                      {s.type==="폐업 여부"?"🏪":s.type==="가격 변동"?"🏷️":"📍"} {s.type}
                    </span>
                  </td>
                  <td style={{padding:"14px 16px"}}>
                    <div style={{fontWeight:700,fontSize:14,color:C.navy}}>{s.restaurant}</div>
                    <div style={{fontSize:12,color:C.muted}}>{s.location}</div>
                  </td>
                  <td style={{padding:"14px 16px"}}>
                    <div style={{fontSize:13,fontWeight:600}}>{s.requester}</div>
                    <div style={{fontSize:12,color:C.muted}}>영남대학교 {s.dept}</div>
                  </td>
                  <td style={{padding:"14px 16px",fontSize:13,color:C.muted}}>{s.date}</td>
                  <td style={{padding:"14px 16px"}}>
                    <span style={{background:statusColor[s.status]+"22",color:statusColor[s.status],padding:"4px 10px",borderRadius:99,fontSize:12,fontWeight:700}}>{s.status}</span>
                  </td>
                  <td style={{padding:"14px 16px"}}>
                    <div style={{display:"flex",gap:6}}>
                      <button onClick={()=>setSelected(s)} style={{...btnOutline,padding:"4px 10px",fontSize:12}}>상세 보기</button>
                      {(s.status==="대기 중"||s.status==="검토 중")&&(
                        <button onClick={()=>onApprove(s.id)} style={{...btnPrimary,padding:"4px 10px",fontSize:12}}>수정 승인</button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length===0&&(
                <tr><td colSpan={7} style={{textAlign:"center",padding:"32px",color:C.muted}}>해당 상태의 신청이 없습니다.</td></tr>
              )}
            </tbody>
          </table>
        </div>
        <p style={{fontSize:12,color:C.muted,marginTop:12}}>ℹ️ 수정 승인 시 해당 정보가 식당 데이터베이스에 즉시 반영되어 전체 사용자에게 업데이트된 정보가 노출됩니다.</p>
      </div>

      {/* Detail modal */}
      {selected&&(
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.4)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:200}}>
          <div style={{background:"#fff",borderRadius:16,padding:28,width:440,position:"relative"}}>
            <button onClick={()=>setSelected(null)} style={{position:"absolute",top:12,right:12,background:"none",border:"none",fontSize:18,cursor:"pointer",color:C.muted}}>✕</button>
            <h3 style={{margin:"0 0 16px",color:C.navy}}>신청 상세 정보</h3>
            {[["요청 ID",selected.id],["유형",selected.type],["식당",`${selected.restaurant} (${selected.location})`],["신청자",`${selected.requester} - ${selected.dept}`],["일시",selected.date],["상태",selected.status],["상세",selected.detail||"(없음)"]].map(([k,v])=>(
              <div key={k} style={{display:"flex",gap:12,marginBottom:10,fontSize:14}}>
                <span style={{width:80,color:C.muted,fontWeight:600,flexShrink:0}}>{k}</span>
                <span style={{color:C.text}}>{v}</span>
              </div>
            ))}
            <div style={{display:"flex",gap:8,marginTop:16}}>
              <button onClick={()=>setSelected(null)} style={{...btnOutline,flex:1}}>닫기</button>
              {(selected.status==="대기 중"||selected.status==="검토 중")&&(
                <button onClick={()=>{onApprove(selected.id);setSelected(null);}} style={{...btnPrimary,flex:2}}>수정 승인</button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── MY PAGE ─────────────────────────────────────────────────────────────────
function MyPage({ user, reviews }) {
  const myRevs = reviews.filter(r=>true).slice(-3);
  return (
    <div style={{maxWidth:700,margin:"0 auto",padding:"32px 24px"}}>
      <div style={{...card,textAlign:"center",marginBottom:24,padding:32}}>
        <div style={{fontSize:64,marginBottom:12}}>😺</div>
        <h2 style={{margin:"0 0 4px",fontSize:24,fontWeight:900,color:C.navy}}>{user.name}</h2>
        <p style={{color:C.muted,fontSize:14,margin:"0 0 16px"}}>{user.dept||user.role==="owner"?"점주":"관리자"}</p>
        <div style={{display:"flex",justifyContent:"center",gap:24,fontSize:14}}>
          <div style={{textAlign:"center"}}><div style={{fontWeight:800,fontSize:20,color:C.navy}}>{myRevs.length}</div><div style={{color:C.muted}}>작성 리뷰</div></div>
          <div style={{width:1,background:C.border}} />
          <div style={{textAlign:"center"}}><div style={{fontWeight:800,fontSize:20,color:C.navy}}>0</div><div style={{color:C.muted}}>SOS 신고</div></div>
        </div>
      </div>
      <div style={card}>
        <h3 style={{margin:"0 0 16px",color:C.navy}}>최근 리뷰</h3>
        {myRevs.length===0&&<p style={{color:C.muted,textAlign:"center",padding:"24px 0"}}>아직 작성한 리뷰가 없어요.</p>}
        {myRevs.map(r=>(
          <div key={r.id} style={{borderBottom:`1px solid ${C.border}`,paddingBottom:12,marginBottom:12}}>
            <StarRow rating={r.rating} size={13} />
            <p style={{fontSize:13,margin:"6px 0 0"}}>{r.text}</p>
            <span style={{fontSize:11,color:C.muted}}>{r.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── APP ROOT ─────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("home");
  const [user, setUser] = useState(null);
  const [restaurants, setRestaurants] = useState(INITIAL_RESTAURANTS);
  const [reviews, setReviews] = useState(INITIAL_REVIEWS);
  const [sosList, setSosList] = useState(INITIAL_SOS);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [toast, setToast] = useState("");

  function handleLogin(u) {
    setUser(u);
    if(u.role==="manager") setPage("admin");
    else setPage("home");
    setToast(`환영합니다, ${u.name}님!`);
  }
  function handleSignup(u) {
    MOCK_USERS.push(u);
    setUser(u);
    setPage("home");
    setToast("회원가입이 완료되었습니다!");
  }
  function handleLogout() {
    setUser(null);
    setPage("home");
    setToast("안전하게 로그아웃 되었습니다.");
  }
  function handleAddReview(rv) {
    setReviews(prev=>[...prev,{...rv,id:prev.length+1}]);
    setRestaurants(prev=>prev.map(r=>r.id===rv.restaurantId?{...r,reviewCount:r.reviewCount+1}:r));
  }
  function handleSOS(data) {
    const newId = `SOS-2024-${String(sosList.length+1).padStart(5,"0")}`;
    setSosList(prev=>[{id:newId,...data,requester:user?.id||"unknown",dept:user?.dept||"학생",date:new Date().toLocaleString("ko"),status:"대기 중"},...prev]);
  }
  function handleApprove(id) {
    setSosList(prev=>prev.map(s=>s.id===id?{...s,status:"승인 완료"}:s));
    setToast("수정 요청이 승인되었습니다.");
  }

  const showNav = page!=="login"&&page!=="signup";

  return (
    <div style={{minHeight:"100vh",background:C.bg,fontFamily:"'Apple SD Gothic Neo','Malgun Gothic',sans-serif",color:C.text}}>
      {toast&&<Toast msg={toast} onClose={()=>setToast("")} />}
      {showNav&&<Nav user={user} page={page} setPage={setPage} onLogout={handleLogout} />}

      {page==="home"    && <HomePage restaurants={restaurants} reviews={reviews} setPage={setPage} setSelectedRestaurant={setSelectedRestaurant} />}
      {page==="search"  && <SearchPage restaurants={restaurants} setSelectedRestaurant={setSelectedRestaurant} setPage={setPage} />}
      {page==="detail"  && selectedRestaurant && <DetailPage restaurant={selectedRestaurant} user={user} reviews={reviews} onAddReview={handleAddReview} setPage={setPage} onSOS={handleSOS} />}
      {page==="login"   && <LoginPage setPage={setPage} onLogin={handleLogin} />}
      {page==="signup"  && <SignupPage setPage={setPage} onSignup={handleSignup} />}
      {page==="admin"   && <AdminPage sosList={sosList} onApprove={handleApprove} onReject={(id)=>setSosList(prev=>prev.map(s=>s.id===id?{...s,status:"거절됨"}:s))} />}
      {page==="mypage"  && user && <MyPage user={user} reviews={reviews} />}
    </div>
  );
}