import{d as b,u as v,j as p,h as d,c as t,l as n,a as o,a2 as m,a4 as E,P as h,m as g,F as y,E as R,a1 as S,o as s,t as u}from"./chunks/framework.DCcJlWuN.js";const f=S('<h1 id="the-prn-and-srn" tabindex="-1">The PRN and SRN <a class="header-anchor" href="#the-prn-and-srn" aria-label="Permalink to &quot;The PRN and SRN&quot;">​</a></h1><p>PRN and SRN are two unique IDs that are provided to you.</p><h2 id="prn" tabindex="-1">PRN <a class="header-anchor" href="#prn" aria-label="Permalink to &quot;PRN&quot;">​</a></h2><ul><li>Short for <strong>Personal Registration Number</strong></li><li>The PRN format is <code>PESxyyyyzzzzz</code>, where <code>x</code> is your campus code (1 is RR, 2 is EC), <code>yyyy</code> is the year of admission, and <code>zzzzz</code> is a unique number.</li></ul><p>Try entering your PRN here and see what it means, or use the example PRN.</p>',5),k=n("strong",null,"Enter your PRN:",-1),_={key:0},z={key:1,style:{color:"red"}},D=S('<h2 id="srn" tabindex="-1">SRN <a class="header-anchor" href="#srn" aria-label="Permalink to &quot;SRN&quot;">​</a></h2><ul><li>Short for <strong>Student Registration Number</strong></li><li>The SRN format is <code>PESxzzyyccnnn</code>, where <code>x</code> is campus code, <code>zz</code> specifies your general qualification (UG for undergraduate), <code>yy</code> for year of admission, <code>cc</code> is course code (CS, EC, EE, AM, ME etc) and <code>nn</code> is a unique number.</li></ul><p>Try entering your SRN here and see what it means, or use the example SRN.</p>',3),T=n("strong",null,"Enter your SRN:",-1),B={key:2},M={key:3,style:{color:"red"}},V=JSON.parse('{"title":"The PRN and SRN","description":"","frontmatter":{},"headers":[],"relativePath":"academics/prn-srn.md","filePath":"academics/prn-srn.md"}'),q={name:"academics/prn-srn.md"},F=b({...q,setup(w){const{isDark:c}=v(),i=p(""),l=p(""),P=d(()=>i.value.match(/PES[12][UP]G\d{2}(?:AM|CS|EE|EC|ME|BT|CV)\d{3}/)),C=d(()=>l.value.match(/PES[12]20\d{2}\d{5}/)),N=d(()=>{const e=i.value.match(/(PES)([12])([UP]G)(\d{2})(AM|CS|EE|EC|ME|BT|CV)(\d{3})/);return{pes:[e[1],"PES University"],campus:[e[2],e[2]==="1"?"RR Campus":"EC Campus"],graduate:[e[3],e[3]==="UG"?"Undergraduate":"Postgraduate"],year:[e[4],"20"+e[4]+" batch"],dept:[e[5],"Department of "+{AM:"Computer Science Engineering (Artificial Intelligence & Machine Learning)",CS:"Computer Science Engineering",EC:"Electronics and Communication Engineering",EE:"Electrical and Electronics Engineering",ME:"Mechanical Engineering",BT:"Biotechnology",CV:"Civil Engineering"}[e[5]]],id:[e[6],"Serial number"]}}),x=d(()=>{const e=l.value.match(/(PES)([12])(20\d{2})(\d{5})/);return{pes:[e[1],"PES University"],campus:[e[2],e[2]==="1"?"RR Campus":"EC Campus"],year:[e[3],e[3]+" batch"],id:[e[4],"Serial number"]}});return(e,r)=>(s(),t("div",null,[f,n("p",null,[k,o("  "),m(n("input",{style:h({backgroundColor:g(c)?"#161618":"#EBEBEF",borderRadius:"5px",padding:"2px"}),"onUpdate:modelValue":r[0]||(r[0]=a=>l.value=a)},null,4),[[E,l.value]]),o("  "),n("button",{style:{backgroundColor:"#3E63DD",borderRadius:"5px",padding:"2px 7px",color:"white"},onClick:r[1]||(r[1]=a=>l.value="PES1202101234")},"Example PRN"),o("  "),n("button",{style:{backgroundColor:"#32363F",borderRadius:"5px",padding:"2px 7px",color:"white"},onClick:r[2]||(r[2]=a=>l.value="")},"Reset"),o(" ")]),C.value?(s(),t("p",_,[(s(!0),t(y,null,R(x.value,a=>(s(),t("ul",null,[n("li",null,[n("code",null,u(a[0]),1),o(" : "+u(a[1]),1)])]))),256))])):(s(),t("span",z," Invalid PRN ")),D,n("p",null,[T,o("  "),m(n("input",{style:h({backgroundColor:g(c)?"#161618":"#EBEBEF",borderRadius:"5px",padding:"2px"}),"onUpdate:modelValue":r[3]||(r[3]=a=>i.value=a)},null,4),[[E,i.value]]),o("  "),n("button",{style:{backgroundColor:"#3E63DD",borderRadius:"5px",padding:"2px 7px",color:"white"},onClick:r[4]||(r[4]=a=>i.value="PES1UG23CS123")},"Example SRN"),o("  "),n("button",{style:{backgroundColor:"#32363F",borderRadius:"5px",padding:"2px 7px",color:"white"},onClick:r[5]||(r[5]=a=>i.value="")},"Reset"),o(" ")]),P.value?(s(),t("p",B,[(s(!0),t(y,null,R(N.value,a=>(s(),t("ul",null,[n("li",null,[n("code",null,u(a[0]),1),o(" : "+u(a[1]),1)])]))),256))])):(s(),t("span",M," Invalid SRN "))]))}});export{V as __pageData,F as default};
