/* ================= THEME ================= */
const PRIMARY = "#00bcd4";   // AQUA
const DARK = "#0f172a";

/* ================= BODY ================= */
Object.assign(document.body.style,{
  margin:"0",
  fontFamily:"Segoe UI, Tahoma",
  background:"#e0f7fa",
  display:"flex",
  flexDirection:"column",
  minHeight:"100vh"
});

/* ================= STYLE ================= */
const style=document.createElement("style");
style.textContent=`
.nav-link{color:white;padding:15px 20px;cursor:pointer;text-decoration:none}
.nav-link:hover{background:rgba(255,255,255,.2)}

#sidebar{position:fixed;left:-260px;top:0;width:250px;height:100%;
background:${DARK};color:white;transition:.3s;z-index:1001;padding-top:60px}
#sidebar a{display:block;color:#ccc;padding:15px 25px;text-decoration:none}

#overlay{position:fixed;top:0;left:0;width:100%;height:100%;
background:rgba(0,0,0,.5);display:none;z-index:1000}

.chapter-btn{
  display:flex;align-items:center;justify-content:space-between;
  background:white;border-radius:50px;padding:25px;margin-bottom:20px;
  cursor:pointer;border:3px solid ${PRIMARY}
}
.chapter-btn:hover{transform:scale(1.03)}

.circle{
  width:90px;height:90px;border-radius:50%;
  background:${PRIMARY};color:white;
  display:flex;align-items:center;justify-content:center;
  font-weight:bold;font-size:18px
}

.example{
  background:white;border-radius:50%;
  width:320px;height:320px;
  padding:25px;margin:20px auto;
  border:5px solid ${PRIMARY};
  display:flex;flex-direction:column;
  justify-content:space-between;
  text-align:center
}

pre{background:#012;padding:10px;color:#9ff;border-radius:10px;font-size:13px}
button{background:${PRIMARY};color:white;border:none;
padding:8px 15px;border-radius:20px;cursor:pointer}

.profile-card {
    background: white;
    padding: 30px;
    border-radius: 20px;
    box-shadow: 0 4px 15px rgba(0,0,0,0.1);
    text-align: center;
}
#profile-img-display {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    object-fit: cover;
    border: 4px solid ${PRIMARY};
    margin-bottom: 15px;
}
.info-row {
    text-align: left;
    margin: 10px 0;
    font-size: 18px;
    border-bottom: 1px solid #eee;
    padding-bottom: 5px;
}
`;
document.head.appendChild(style);

/* ================= SIDEBAR ================= */
const sidebar=document.createElement("div");
sidebar.id="sidebar";
sidebar.innerHTML="<h3 style='text-align:center;color:"+PRIMARY+"'>MENU</h3>";
document.body.appendChild(sidebar);

const overlay=document.createElement("div");
overlay.id="overlay";
document.body.appendChild(overlay);

const menuBtn=document.createElement("button");
menuBtn.textContent="☰";
Object.assign(menuBtn.style,{
  position:"fixed",top:"12px",left:"12px",
  background:PRIMARY,color:"white",
  border:"none",padding:"8px 12px",zIndex:1002
});
document.body.appendChild(menuBtn);

function toggleMenu(){
  const o=sidebar.style.left==="0px";
  sidebar.style.left=o?"-260px":"0px";
  overlay.style.display=o?"none":"block";
}
menuBtn.onclick=toggleMenu;
overlay.onclick=toggleMenu;

/* ================= HEADER & NAV ================= */
const header=document.createElement("header");
header.textContent="Shaafici Axmed Ibraahim";
Object.assign(header.style,{
  background:PRIMARY,color:"white",
  padding:"18px",textAlign:"center",
  fontWeight:"bold",fontSize:"20px"
});
document.body.appendChild(header);

const nav=document.createElement("nav");
Object.assign(nav.style,{
  background:"#020617",display:"flex",justifyContent:"center"
});
document.body.appendChild(nav);

const main=document.createElement("main");
Object.assign(main.style,{
  flex:"1",padding:"30px",maxWidth:"900px",margin:"auto",width:"100%"
});
document.body.appendChild(main);

["home","about","contact"].forEach(p=>{
  const a=document.createElement("a");
  a.className="nav-link";
  a.textContent=p.toUpperCase();
  a.onclick=()=>loadPage(p);
  nav.appendChild(a);

  const s=document.createElement("a");
  s.textContent=p.toUpperCase();
  s.href="#";
  s.onclick=e=>{e.preventDefault();loadPage(p);toggleMenu();}
  sidebar.appendChild(s);
});

/* ================= DATA ================= */
function gen(n,fn){return Array.from({length:n},(_,i)=>fn(i+1));}

const chapters={
chapter7:{title:"Objects",examples:gen(20,i=>({
 title:"Object "+i,
 code:`const o={n:${i}}; return o.n;`
}))},

chapter8:{title:"DOM",examples:gen(20,i=>({
 title:"DOM "+i,
 html:`<div id="d${i}">Item ${i}</div>`,
 code:`document.getElementById("d${i}").style.color="blue";`
}))},

chapter9:{title:"Events",examples:gen(20,i=>({
 title:"Event "+i,
 html:`<button id="e${i}">Click ${i}</button>`,
 init:()=>document.getElementById("e"+i).onclick=
   ()=>alert("Event "+i)
}))}
};

/* ================= ROUTING ================= */
function loadPage(p){
  main.innerHTML="";
  if(p==="home"){
    Object.keys(chapters).forEach(id=>{
      const b=document.createElement("div");
      b.className="chapter-btn";
      b.innerHTML=`
        <div class="circle">${id.toUpperCase()}</div>
        <h2>${chapters[id].title}</h2>
      `;
      b.onclick=()=>openChapter(id);
      main.appendChild(b);
    });
  }
  
  if(p==="about"){
    main.innerHTML = `
      
        
        <img id="profile-img-display" src="2.jpeg" alt="Profile" onerror="this.src='https://via.placeholder.com/150?text=Sawirka+Lama+Helin'">
        <br>
        <input type="file" id="image-input" accept="image/*" style="margin-bottom:20px">
        
        <div class="info-row"><strong>Magaca:</strong> Shaafici Abdulhai Kulane</div>
        <div class="info-row"><strong>ID-ga:</strong> C5240083</div>
        <div class="info-row"><strong>Maaddada:</strong> JavaScript</div>
        <div class="info-row"><strong>Macallinka:</strong> Jamiila</div>
      </div>
    `;

    const input = document.getElementById('');
    const display = document.getElementById('');
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          display.src = event.target.result;
        };
        reader.readAsDataURL(file);
      }
    };
  }

  if(p==="contact"){
    main.innerHTML=`
      
        <h2>La</h2>
        <div class="info-row"><strong>Tel:</strong> 615215934</div>
        <div class="info-row"><strong>Email:</strong> shaafici@example.com</div>
      </div>
    `;
  }
}

function openChapter(id){
  main.innerHTML="";
  chapters[id].examples.forEach(ex=>{
    const d=document.createElement("div");
    d.className="example";
    d.innerHTML="<h3>"+ex.title+"</h3>";
    if(ex.html){d.innerHTML+=ex.html; if(ex.init)setTimeout(ex.init,0);}
    if(ex.code){
      const pre=document.createElement("pre");
      pre.textContent=ex.code;
      d.appendChild(pre);
      const btn=document.createElement("button");
      btn.textContent="RUN";
      btn.onclick=()=>new Function(ex.code)();
      d.appendChild(btn);
    }
    main.appendChild(d);
  });
}

/* ================= FOOTER ================= */
const footer=document.createElement("footer");
footer.innerHTML="&copy; shafici abdullahi";
Object.assign(footer.style,{
  background:PRIMARY,color:"white",
  textAlign:"center",padding:"15px"
});
document.body.appendChild(footer);

loadPage("home");