import{_ as c,g as Fe,s as We,t as Ne,q as Pe,a as Re,b as Ve,c as ft,d as St,aD as ze,aE as He,aF as Ue,e as Be,S as Ge,aG as Xe,aH as F,l as nt,aI as qe,aJ as ae,aK as ne,aL as Ze,aM as Ke,aN as Qe,aO as je,aP as Je,aQ as ts,aR as es,aS as oe,aT as ce,aU as le,aV as ue,aW as de,aX as ss,k as rs,j as is,A as as,u as ns}from"./theme.BN6s3dbG.js";import"./framework.DwTAjf8F.js";var pe=60,Te=pe*60,xe=Te*24,os=xe*7,ot=1e3,Rt=pe*ot,Vt=Te*ot,It=xe*ot,cs=os*ot,Wt="day",ls="week",us="year",ds="YYYY-MM-DDTHH:mm:ssZ",fs=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,hs="isoweek";const ms=(function(t,e,s){var r=function(k,x){var v=(x?s.utc:s)().year(k).startOf(us),E=4-v.isoWeekday();return v.isoWeekday()>4&&(E+=7),v.add(E,Wt)},a=function(k){return k.add(4-k.isoWeekday(),Wt)},o=e.prototype;o.isoWeekYear=function(){var m=a(this);return m.year()},o.isoWeek=function(m){if(!this.$utils().u(m))return this.add((m-this.isoWeek())*7,Wt);var k=a(this),x=r(this.isoWeekYear(),this.$u);return k.diff(x,ls)+1},o.isoWeekday=function(m){return this.$utils().u(m)?this.day()||7:this.day(this.day()%7?m:m-7)};var l=o.startOf;o.startOf=function(m,k){var x=this.$utils(),v=x.u(k)?!0:k,E=x.p(m);return E===hs?v?this.date(this.date()-(this.isoWeekday()-1)).startOf("day"):this.date(this.date()-1-(this.isoWeekday()-1)+7).endOf("day"):l.bind(this)(m,k)}});var ks=function(e){return e.replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g,function(s,r,a){return r||a.slice(1)})},vs={LTS:"h:mm:ss A",LT:"h:mm A",L:"MM/DD/YYYY",LL:"MMMM D, YYYY",LLL:"MMMM D, YYYY h:mm A",LLLL:"dddd, MMMM D, YYYY h:mm A"},ys=function(e,s){return e.replace(/(\[[^\]]+])|(LTS?|l{1,4}|L{1,4})/g,function(r,a,o){var l=o&&o.toUpperCase();return a||s[o]||vs[o]||ks(s[l])})},gs=/(\[[^[]*\])|([-_:/.,()\s]+)|(A|a|Q|YYYY|YY?|ww?|MM?M?M?|Do|DD?|hh?|HH?|mm?|ss?|S{1,3}|z|ZZ?)/g,fe=/\d/,vt=/\d\d/,ps=/\d{3}/,Ts=/\d{4}/,U=/\d\d?/,xs=/[+-]?\d+/,bs=/[+-]\d\d:?(\d\d)?|Z/,yt=/\d*[^-_:/,()\s\d]+/,rt={},be=function(e){return e=+e,e+(e>68?1900:2e3)};function ws(t){if(!t||t==="Z")return 0;var e=t.match(/([+-]|\d\d)/g),s=+(e[1]*60)+(+e[2]||0);return s===0?0:e[0]==="+"?-s:s}var N=function(e){return function(s){this[e]=+s}},he=[bs,function(t){var e=this.zone||(this.zone={});e.offset=ws(t)}],Nt=function(e){var s=rt[e];return s&&(s.indexOf?s:s.s.concat(s.f))},me=function(e,s){var r,a=rt,o=a.meridiem;if(!o)r=e===(s?"pm":"PM");else for(var l=1;l<=24;l+=1)if(e.indexOf(o(l,0,s))>-1){r=l>12;break}return r},_s={A:[yt,function(t){this.afternoon=me(t,!1)}],a:[yt,function(t){this.afternoon=me(t,!0)}],Q:[fe,function(t){this.month=(t-1)*3+1}],S:[fe,function(t){this.milliseconds=+t*100}],SS:[vt,function(t){this.milliseconds=+t*10}],SSS:[ps,function(t){this.milliseconds=+t}],s:[U,N("seconds")],ss:[U,N("seconds")],m:[U,N("minutes")],mm:[U,N("minutes")],H:[U,N("hours")],h:[U,N("hours")],HH:[U,N("hours")],hh:[U,N("hours")],D:[U,N("day")],DD:[vt,N("day")],Do:[yt,function(t){var e=rt,s=e.ordinal,r=t.match(/\d+/);if(this.day=r[0],!!s)for(var a=1;a<=31;a+=1)s(a).replace(/\[|\]/g,"")===t&&(this.day=a)}],w:[U,N("week")],ww:[vt,N("week")],M:[U,N("month")],MM:[vt,N("month")],MMM:[yt,function(t){var e=Nt("months"),s=Nt("monthsShort"),r=(s||e.map(function(a){return a.slice(0,3)})).indexOf(t)+1;if(r<1)throw new Error;this.month=r%12||r}],MMMM:[yt,function(t){var e=Nt("months"),s=e.indexOf(t)+1;if(s<1)throw new Error;this.month=s%12||s}],Y:[xs,N("year")],YY:[vt,function(t){this.year=be(t)}],YYYY:[Ts,N("year")],Z:he,ZZ:he};function Ds(t){var e=t.afternoon;if(e!==void 0){var s=t.hours;e?s<12&&(t.hours+=12):s===12&&(t.hours=0),delete t.afternoon}}function Ss(t){t=ys(t,rt&&rt.formats);for(var e=t.match(gs),s=e.length,r=0;r<s;r+=1){var a=e[r],o=_s[a],l=o&&o[0],m=o&&o[1];m?e[r]={regex:l,parser:m}:e[r]=a.replace(/^\[|\]$/g,"")}return function(k){for(var x={},v=0,E=0;v<s;v+=1){var O=e[v];if(typeof O=="string")E+=O.length;else{var L=O.regex,A=O.parser,b=k.slice(E),P=L.exec(b),z=P[0];A.call(x,z),k=k.replace(z,"")}}return Ds(x),x}}var Ms=function(e,s,r,a){try{if(["x","X"].indexOf(s)>-1)return new Date((s==="X"?1e3:1)*e);var o=Ss(s),l=o(e),m=l.year,k=l.month,x=l.day,v=l.hours,E=l.minutes,O=l.seconds,L=l.milliseconds,A=l.zone,b=l.week,P=new Date,z=x||(!m&&!k?P.getDate():1),K=m||P.getFullYear(),B=0;m&&!k||(B=k>0?k-1:P.getMonth());var G=v||0,Q=E||0,j=O||0,J=L||0;if(A)return new Date(Date.UTC(K,B,z,G,Q,j,J+A.offset*60*1e3));if(r)return new Date(Date.UTC(K,B,z,G,Q,j,J));var X;return X=new Date(K,B,z,G,Q,j,J),b&&(X=a(X).week(b).toDate()),X}catch{return new Date("")}};const Cs=(function(t,e,s){s.p.customParseFormat=!0,t&&t.parseTwoDigitYear&&(be=t.parseTwoDigitYear);var r=e.prototype,a=r.parse;r.parse=function(o){var l=o.date,m=o.utc,k=o.args;this.$u=m;var x=k[1];if(typeof x=="string"){var v=k[2]===!0,E=k[3]===!0,O=v||E,L=k[2];E&&(L=k[2]),rt=this.$locale(),!v&&L&&(rt=s.Ls[L]),this.$d=Ms(l,x,m,s),this.init(),L&&L!==!0&&(this.$L=this.locale(L).$L),O&&l!=this.format(x)&&(this.$d=new Date("")),rt={}}else if(x instanceof Array)for(var A=x.length,b=1;b<=A;b+=1){k[1]=x[b-1];var P=s.apply(this,k);if(P.isValid()){this.$d=P.$d,this.$L=P.$L,this.init();break}b===A&&(this.$d=new Date(""))}else a.call(this,o)}}),Es=(function(t,e){var s=e.prototype,r=s.format;s.format=function(a){var o=this,l=this.$locale();if(!this.isValid())return r.bind(this)(a);var m=this.$utils(),k=a||ds,x=k.replace(/\[([^\]]+)]|Q|wo|ww|w|WW|W|zzz|z|gggg|GGGG|Do|X|x|k{1,2}|S/g,function(v){switch(v){case"Q":return Math.ceil((o.$M+1)/3);case"Do":return l.ordinal(o.$D);case"gggg":return o.weekYear();case"GGGG":return o.isoWeekYear();case"wo":return l.ordinal(o.week(),"W");case"w":case"ww":return m.s(o.week(),v==="w"?1:2,"0");case"W":case"WW":return m.s(o.isoWeek(),v==="W"?1:2,"0");case"k":case"kk":return m.s(String(o.$H===0?24:o.$H),v==="k"?1:2,"0");case"X":return Math.floor(o.$d.getTime()/1e3);case"x":return o.$d.getTime();case"z":return"["+o.offsetName()+"]";case"zzz":return"["+o.offsetName("long")+"]";default:return v}});return r.bind(this)(x)}});var Lt=It*365,zt=Lt/12,Is=/^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/,gt={years:Lt,months:zt,days:It,hours:Vt,minutes:Rt,seconds:ot,milliseconds:1,weeks:cs},Mt=function(e){return e instanceof De},we,q,Tt=function(e,s,r){return new De(e,r,s.$l)},pt=function(e){return q.p(e)+"s"},_e=function(e){return e<0},at=function(e){return _e(e)?Math.ceil(e):Math.floor(e)},Ls=function(e){return Math.abs(e)},ut=function(e,s){return e?_e(e)?{negative:!0,format:""+Ls(e)+s}:{negative:!1,format:""+e+s}:{negative:!1,format:""}},De=(function(){function t(s,r,a){var o=this;if(this.$d={},this.$l=a,s===void 0&&(this.$ms=0,this.parseFromMilliseconds()),r)return Tt(s*gt[pt(r)],this);if(typeof s=="number")return this.$ms=s,this.parseFromMilliseconds(),this;if(typeof s=="object")return Object.keys(s).forEach(function(x){o.$d[pt(x)]=s[x]}),this.calMilliseconds(),this;if(typeof s=="string"){var l=s.match(Is);if(l){var m=l.slice(2),k=m.map(function(x){return x!=null?Number(x):0});return this.$d.years=k[0],this.$d.months=k[1],this.$d.weeks=k[2],this.$d.days=k[3],this.$d.hours=k[4],this.$d.minutes=k[5],this.$d.seconds=k[6],this.calMilliseconds(),this}}return this}var e=t.prototype;return e.calMilliseconds=function(){var r=this;this.$ms=Object.keys(this.$d).reduce(function(a,o){return a+(r.$d[o]||0)*gt[o]},0)},e.parseFromMilliseconds=function(){var r=this.$ms;this.$d.years=at(r/Lt),r%=Lt,this.$d.months=at(r/zt),r%=zt,this.$d.days=at(r/It),r%=It,this.$d.hours=at(r/Vt),r%=Vt,this.$d.minutes=at(r/Rt),r%=Rt,this.$d.seconds=at(r/ot),r%=ot,this.$d.milliseconds=r},e.toISOString=function(){var r=ut(this.$d.years,"Y"),a=ut(this.$d.months,"M"),o=+this.$d.days||0;this.$d.weeks&&(o+=this.$d.weeks*7);var l=ut(o,"D"),m=ut(this.$d.hours,"H"),k=ut(this.$d.minutes,"M"),x=this.$d.seconds||0;this.$d.milliseconds&&(x+=this.$d.milliseconds/1e3,x=Math.round(x*1e3)/1e3);var v=ut(x,"S"),E=r.negative||a.negative||l.negative||m.negative||k.negative||v.negative,O=m.format||k.format||v.format?"T":"",L=E?"-":"",A=L+"P"+r.format+a.format+l.format+O+m.format+k.format+v.format;return A==="P"||A==="-P"?"P0D":A},e.toJSON=function(){return this.toISOString()},e.format=function(r){var a=r||"YYYY-MM-DDTHH:mm:ss",o={Y:this.$d.years,YY:q.s(this.$d.years,2,"0"),YYYY:q.s(this.$d.years,4,"0"),M:this.$d.months,MM:q.s(this.$d.months,2,"0"),D:this.$d.days,DD:q.s(this.$d.days,2,"0"),H:this.$d.hours,HH:q.s(this.$d.hours,2,"0"),m:this.$d.minutes,mm:q.s(this.$d.minutes,2,"0"),s:this.$d.seconds,ss:q.s(this.$d.seconds,2,"0"),SSS:q.s(this.$d.milliseconds,3,"0")};return a.replace(fs,function(l,m){return m||String(o[l])})},e.as=function(r){return this.$ms/gt[pt(r)]},e.get=function(r){var a=this.$ms,o=pt(r);return o==="milliseconds"?a%=1e3:o==="weeks"?a=at(a/gt[o]):a=this.$d[o],a||0},e.add=function(r,a,o){var l;return a?l=r*gt[pt(a)]:Mt(r)?l=r.$ms:l=Tt(r,this).$ms,Tt(this.$ms+l*(o?-1:1),this)},e.subtract=function(r,a){return this.add(r,a,!0)},e.locale=function(r){var a=this.clone();return a.$l=r,a},e.clone=function(){return Tt(this.$ms,this)},e.humanize=function(r){return we().add(this.$ms,"ms").locale(this.$l).fromNow(!r)},e.valueOf=function(){return this.asMilliseconds()},e.milliseconds=function(){return this.get("milliseconds")},e.asMilliseconds=function(){return this.as("milliseconds")},e.seconds=function(){return this.get("seconds")},e.asSeconds=function(){return this.as("seconds")},e.minutes=function(){return this.get("minutes")},e.asMinutes=function(){return this.as("minutes")},e.hours=function(){return this.get("hours")},e.asHours=function(){return this.as("hours")},e.days=function(){return this.get("days")},e.asDays=function(){return this.as("days")},e.weeks=function(){return this.get("weeks")},e.asWeeks=function(){return this.as("weeks")},e.months=function(){return this.get("months")},e.asMonths=function(){return this.as("months")},e.years=function(){return this.get("years")},e.asYears=function(){return this.as("years")},t})(),ke=function(e,s,r){return e.add(s.years()*r,"y").add(s.months()*r,"M").add(s.days()*r,"d").add(s.hours()*r,"h").add(s.minutes()*r,"m").add(s.seconds()*r,"s").add(s.milliseconds()*r,"ms")};const As=(function(t,e,s){we=s,q=s().$utils(),s.duration=function(o,l){var m=s.locale();return Tt(o,{$l:m},l)},s.isDuration=Mt;var r=e.prototype.add,a=e.prototype.subtract;e.prototype.add=function(o,l){return Mt(o)?ke(this,o,1):r.bind(this)(o,l)},e.prototype.subtract=function(o,l){return Mt(o)?ke(this,o,-1):a.bind(this)(o,l)}});var Ht=(function(){var t=c(function(g,u,d,h){for(d=d||{},h=g.length;h--;d[g[h]]=u);return d},"o"),e=[6,8,10,12,13,14,15,16,17,18,20,21,22,23,24,25,26,27,28,29,30,31,33,35,36,38,40],s=[1,26],r=[1,27],a=[1,28],o=[1,29],l=[1,30],m=[1,31],k=[1,32],x=[1,33],v=[1,34],E=[1,9],O=[1,10],L=[1,11],A=[1,12],b=[1,13],P=[1,14],z=[1,15],K=[1,16],B=[1,19],G=[1,20],Q=[1,21],j=[1,22],J=[1,23],X=[1,25],p=[1,35],D={trace:c(function(){},"trace"),yy:{},symbols_:{error:2,start:3,gantt:4,document:5,EOF:6,line:7,SPACE:8,statement:9,NL:10,weekday:11,weekday_monday:12,weekday_tuesday:13,weekday_wednesday:14,weekday_thursday:15,weekday_friday:16,weekday_saturday:17,weekday_sunday:18,weekend:19,weekend_friday:20,weekend_saturday:21,dateFormat:22,inclusiveEndDates:23,topAxis:24,axisFormat:25,tickInterval:26,excludes:27,includes:28,todayMarker:29,title:30,acc_title:31,acc_title_value:32,acc_descr:33,acc_descr_value:34,acc_descr_multiline_value:35,section:36,clickStatement:37,taskTxt:38,taskData:39,click:40,callbackname:41,callbackargs:42,href:43,clickStatementDebug:44,$accept:0,$end:1},terminals_:{2:"error",4:"gantt",6:"EOF",8:"SPACE",10:"NL",12:"weekday_monday",13:"weekday_tuesday",14:"weekday_wednesday",15:"weekday_thursday",16:"weekday_friday",17:"weekday_saturday",18:"weekday_sunday",20:"weekend_friday",21:"weekend_saturday",22:"dateFormat",23:"inclusiveEndDates",24:"topAxis",25:"axisFormat",26:"tickInterval",27:"excludes",28:"includes",29:"todayMarker",30:"title",31:"acc_title",32:"acc_title_value",33:"acc_descr",34:"acc_descr_value",35:"acc_descr_multiline_value",36:"section",38:"taskTxt",39:"taskData",40:"click",41:"callbackname",42:"callbackargs",43:"href"},productions_:[0,[3,3],[5,0],[5,2],[7,2],[7,1],[7,1],[7,1],[11,1],[11,1],[11,1],[11,1],[11,1],[11,1],[11,1],[19,1],[19,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,2],[9,2],[9,1],[9,1],[9,1],[9,2],[37,2],[37,3],[37,3],[37,4],[37,3],[37,4],[37,2],[44,2],[44,3],[44,3],[44,4],[44,3],[44,4],[44,2]],performAction:c(function(u,d,h,f,T,n,Y){var i=n.length-1;switch(T){case 1:return n[i-1];case 2:this.$=[];break;case 3:n[i-1].push(n[i]),this.$=n[i-1];break;case 4:case 5:this.$=n[i];break;case 6:case 7:this.$=[];break;case 8:f.setWeekday("monday");break;case 9:f.setWeekday("tuesday");break;case 10:f.setWeekday("wednesday");break;case 11:f.setWeekday("thursday");break;case 12:f.setWeekday("friday");break;case 13:f.setWeekday("saturday");break;case 14:f.setWeekday("sunday");break;case 15:f.setWeekend("friday");break;case 16:f.setWeekend("saturday");break;case 17:f.setDateFormat(n[i].substr(11)),this.$=n[i].substr(11);break;case 18:f.enableInclusiveEndDates(),this.$=n[i].substr(18);break;case 19:f.TopAxis(),this.$=n[i].substr(8);break;case 20:f.setAxisFormat(n[i].substr(11)),this.$=n[i].substr(11);break;case 21:f.setTickInterval(n[i].substr(13)),this.$=n[i].substr(13);break;case 22:f.setExcludes(n[i].substr(9)),this.$=n[i].substr(9);break;case 23:f.setIncludes(n[i].substr(9)),this.$=n[i].substr(9);break;case 24:f.setTodayMarker(n[i].substr(12)),this.$=n[i].substr(12);break;case 27:f.setDiagramTitle(n[i].substr(6)),this.$=n[i].substr(6);break;case 28:this.$=n[i].trim(),f.setAccTitle(this.$);break;case 29:case 30:this.$=n[i].trim(),f.setAccDescription(this.$);break;case 31:f.addSection(n[i].substr(8)),this.$=n[i].substr(8);break;case 33:f.addTask(n[i-1],n[i]),this.$="task";break;case 34:this.$=n[i-1],f.setClickEvent(n[i-1],n[i],null);break;case 35:this.$=n[i-2],f.setClickEvent(n[i-2],n[i-1],n[i]);break;case 36:this.$=n[i-2],f.setClickEvent(n[i-2],n[i-1],null),f.setLink(n[i-2],n[i]);break;case 37:this.$=n[i-3],f.setClickEvent(n[i-3],n[i-2],n[i-1]),f.setLink(n[i-3],n[i]);break;case 38:this.$=n[i-2],f.setClickEvent(n[i-2],n[i],null),f.setLink(n[i-2],n[i-1]);break;case 39:this.$=n[i-3],f.setClickEvent(n[i-3],n[i-1],n[i]),f.setLink(n[i-3],n[i-2]);break;case 40:this.$=n[i-1],f.setLink(n[i-1],n[i]);break;case 41:case 47:this.$=n[i-1]+" "+n[i];break;case 42:case 43:case 45:this.$=n[i-2]+" "+n[i-1]+" "+n[i];break;case 44:case 46:this.$=n[i-3]+" "+n[i-2]+" "+n[i-1]+" "+n[i];break}},"anonymous"),table:[{3:1,4:[1,2]},{1:[3]},t(e,[2,2],{5:3}),{6:[1,4],7:5,8:[1,6],9:7,10:[1,8],11:17,12:s,13:r,14:a,15:o,16:l,17:m,18:k,19:18,20:x,21:v,22:E,23:O,24:L,25:A,26:b,27:P,28:z,29:K,30:B,31:G,33:Q,35:j,36:J,37:24,38:X,40:p},t(e,[2,7],{1:[2,1]}),t(e,[2,3]),{9:36,11:17,12:s,13:r,14:a,15:o,16:l,17:m,18:k,19:18,20:x,21:v,22:E,23:O,24:L,25:A,26:b,27:P,28:z,29:K,30:B,31:G,33:Q,35:j,36:J,37:24,38:X,40:p},t(e,[2,5]),t(e,[2,6]),t(e,[2,17]),t(e,[2,18]),t(e,[2,19]),t(e,[2,20]),t(e,[2,21]),t(e,[2,22]),t(e,[2,23]),t(e,[2,24]),t(e,[2,25]),t(e,[2,26]),t(e,[2,27]),{32:[1,37]},{34:[1,38]},t(e,[2,30]),t(e,[2,31]),t(e,[2,32]),{39:[1,39]},t(e,[2,8]),t(e,[2,9]),t(e,[2,10]),t(e,[2,11]),t(e,[2,12]),t(e,[2,13]),t(e,[2,14]),t(e,[2,15]),t(e,[2,16]),{41:[1,40],43:[1,41]},t(e,[2,4]),t(e,[2,28]),t(e,[2,29]),t(e,[2,33]),t(e,[2,34],{42:[1,42],43:[1,43]}),t(e,[2,40],{41:[1,44]}),t(e,[2,35],{43:[1,45]}),t(e,[2,36]),t(e,[2,38],{42:[1,46]}),t(e,[2,37]),t(e,[2,39])],defaultActions:{},parseError:c(function(u,d){if(d.recoverable)this.trace(u);else{var h=new Error(u);throw h.hash=d,h}},"parseError"),parse:c(function(u){var d=this,h=[0],f=[],T=[null],n=[],Y=this.table,i="",y=0,I=0,C=2,M=1,W=n.slice.call(arguments,1),_=Object.create(this.lexer),tt={yy:{}};for(var kt in this.yy)Object.prototype.hasOwnProperty.call(this.yy,kt)&&(tt.yy[kt]=this.yy[kt]);_.setInput(u,tt.yy),tt.yy.lexer=_,tt.yy.parser=this,typeof _.yylloc>"u"&&(_.yylloc={});var Ot=_.yylloc;n.push(Ot);var Oe=_.options&&_.options.ranges;typeof tt.yy.parseError=="function"?this.parseError=tt.yy.parseError:this.parseError=Object.getPrototypeOf(this).parseError;function $e(V){h.length=h.length-2*V,T.length=T.length-V,n.length=n.length-V}c($e,"popStack");function re(){var V;return V=f.pop()||_.lex()||M,typeof V!="number"&&(V instanceof Array&&(f=V,V=f.pop()),V=d.symbols_[V]||V),V}c(re,"lex");for(var R,it,H,$t,lt={},_t,et,ie,Dt;;){if(it=h[h.length-1],this.defaultActions[it]?H=this.defaultActions[it]:((R===null||typeof R>"u")&&(R=re()),H=Y[it]&&Y[it][R]),typeof H>"u"||!H.length||!H[0]){var Ft="";Dt=[];for(_t in Y[it])this.terminals_[_t]&&_t>C&&Dt.push("'"+this.terminals_[_t]+"'");_.showPosition?Ft="Parse error on line "+(y+1)+`:
`+_.showPosition()+`
Expecting `+Dt.join(", ")+", got '"+(this.terminals_[R]||R)+"'":Ft="Parse error on line "+(y+1)+": Unexpected "+(R==M?"end of input":"'"+(this.terminals_[R]||R)+"'"),this.parseError(Ft,{text:_.match,token:this.terminals_[R]||R,line:_.yylineno,loc:Ot,expected:Dt})}if(H[0]instanceof Array&&H.length>1)throw new Error("Parse Error: multiple actions possible at state: "+it+", token: "+R);switch(H[0]){case 1:h.push(R),T.push(_.yytext),n.push(_.yylloc),h.push(H[1]),R=null,I=_.yyleng,i=_.yytext,y=_.yylineno,Ot=_.yylloc;break;case 2:if(et=this.productions_[H[1]][1],lt.$=T[T.length-et],lt._$={first_line:n[n.length-(et||1)].first_line,last_line:n[n.length-1].last_line,first_column:n[n.length-(et||1)].first_column,last_column:n[n.length-1].last_column},Oe&&(lt._$.range=[n[n.length-(et||1)].range[0],n[n.length-1].range[1]]),$t=this.performAction.apply(lt,[i,I,y,tt.yy,H[1],T,n].concat(W)),typeof $t<"u")return $t;et&&(h=h.slice(0,-1*et*2),T=T.slice(0,-1*et),n=n.slice(0,-1*et)),h.push(this.productions_[H[1]][0]),T.push(lt.$),n.push(lt._$),ie=Y[h[h.length-2]][h[h.length-1]],h.push(ie);break;case 3:return!0}}return!0},"parse")},S=(function(){var g={EOF:1,parseError:c(function(d,h){if(this.yy.parser)this.yy.parser.parseError(d,h);else throw new Error(d)},"parseError"),setInput:c(function(u,d){return this.yy=d||this.yy||{},this._input=u,this._more=this._backtrack=this.done=!1,this.yylineno=this.yyleng=0,this.yytext=this.matched=this.match="",this.conditionStack=["INITIAL"],this.yylloc={first_line:1,first_column:0,last_line:1,last_column:0},this.options.ranges&&(this.yylloc.range=[0,0]),this.offset=0,this},"setInput"),input:c(function(){var u=this._input[0];this.yytext+=u,this.yyleng++,this.offset++,this.match+=u,this.matched+=u;var d=u.match(/(?:\r\n?|\n).*/g);return d?(this.yylineno++,this.yylloc.last_line++):this.yylloc.last_column++,this.options.ranges&&this.yylloc.range[1]++,this._input=this._input.slice(1),u},"input"),unput:c(function(u){var d=u.length,h=u.split(/(?:\r\n?|\n)/g);this._input=u+this._input,this.yytext=this.yytext.substr(0,this.yytext.length-d),this.offset-=d;var f=this.match.split(/(?:\r\n?|\n)/g);this.match=this.match.substr(0,this.match.length-1),this.matched=this.matched.substr(0,this.matched.length-1),h.length-1&&(this.yylineno-=h.length-1);var T=this.yylloc.range;return this.yylloc={first_line:this.yylloc.first_line,last_line:this.yylineno+1,first_column:this.yylloc.first_column,last_column:h?(h.length===f.length?this.yylloc.first_column:0)+f[f.length-h.length].length-h[0].length:this.yylloc.first_column-d},this.options.ranges&&(this.yylloc.range=[T[0],T[0]+this.yyleng-d]),this.yyleng=this.yytext.length,this},"unput"),more:c(function(){return this._more=!0,this},"more"),reject:c(function(){if(this.options.backtrack_lexer)this._backtrack=!0;else return this.parseError("Lexical error on line "+(this.yylineno+1)+`. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).
`+this.showPosition(),{text:"",token:null,line:this.yylineno});return this},"reject"),less:c(function(u){this.unput(this.match.slice(u))},"less"),pastInput:c(function(){var u=this.matched.substr(0,this.matched.length-this.match.length);return(u.length>20?"...":"")+u.substr(-20).replace(/\n/g,"")},"pastInput"),upcomingInput:c(function(){var u=this.match;return u.length<20&&(u+=this._input.substr(0,20-u.length)),(u.substr(0,20)+(u.length>20?"...":"")).replace(/\n/g,"")},"upcomingInput"),showPosition:c(function(){var u=this.pastInput(),d=new Array(u.length+1).join("-");return u+this.upcomingInput()+`
`+d+"^"},"showPosition"),test_match:c(function(u,d){var h,f,T;if(this.options.backtrack_lexer&&(T={yylineno:this.yylineno,yylloc:{first_line:this.yylloc.first_line,last_line:this.last_line,first_column:this.yylloc.first_column,last_column:this.yylloc.last_column},yytext:this.yytext,match:this.match,matches:this.matches,matched:this.matched,yyleng:this.yyleng,offset:this.offset,_more:this._more,_input:this._input,yy:this.yy,conditionStack:this.conditionStack.slice(0),done:this.done},this.options.ranges&&(T.yylloc.range=this.yylloc.range.slice(0))),f=u[0].match(/(?:\r\n?|\n).*/g),f&&(this.yylineno+=f.length),this.yylloc={first_line:this.yylloc.last_line,last_line:this.yylineno+1,first_column:this.yylloc.last_column,last_column:f?f[f.length-1].length-f[f.length-1].match(/\r?\n?/)[0].length:this.yylloc.last_column+u[0].length},this.yytext+=u[0],this.match+=u[0],this.matches=u,this.yyleng=this.yytext.length,this.options.ranges&&(this.yylloc.range=[this.offset,this.offset+=this.yyleng]),this._more=!1,this._backtrack=!1,this._input=this._input.slice(u[0].length),this.matched+=u[0],h=this.performAction.call(this,this.yy,this,d,this.conditionStack[this.conditionStack.length-1]),this.done&&this._input&&(this.done=!1),h)return h;if(this._backtrack){for(var n in T)this[n]=T[n];return!1}return!1},"test_match"),next:c(function(){if(this.done)return this.EOF;this._input||(this.done=!0);var u,d,h,f;this._more||(this.yytext="",this.match="");for(var T=this._currentRules(),n=0;n<T.length;n++)if(h=this._input.match(this.rules[T[n]]),h&&(!d||h[0].length>d[0].length)){if(d=h,f=n,this.options.backtrack_lexer){if(u=this.test_match(h,T[n]),u!==!1)return u;if(this._backtrack){d=!1;continue}else return!1}else if(!this.options.flex)break}return d?(u=this.test_match(d,T[f]),u!==!1?u:!1):this._input===""?this.EOF:this.parseError("Lexical error on line "+(this.yylineno+1)+`. Unrecognized text.
`+this.showPosition(),{text:"",token:null,line:this.yylineno})},"next"),lex:c(function(){var d=this.next();return d||this.lex()},"lex"),begin:c(function(d){this.conditionStack.push(d)},"begin"),popState:c(function(){var d=this.conditionStack.length-1;return d>0?this.conditionStack.pop():this.conditionStack[0]},"popState"),_currentRules:c(function(){return this.conditionStack.length&&this.conditionStack[this.conditionStack.length-1]?this.conditions[this.conditionStack[this.conditionStack.length-1]].rules:this.conditions.INITIAL.rules},"_currentRules"),topState:c(function(d){return d=this.conditionStack.length-1-Math.abs(d||0),d>=0?this.conditionStack[d]:"INITIAL"},"topState"),pushState:c(function(d){this.begin(d)},"pushState"),stateStackSize:c(function(){return this.conditionStack.length},"stateStackSize"),options:{"case-insensitive":!0},performAction:c(function(d,h,f,T){switch(f){case 0:return this.begin("open_directive"),"open_directive";case 1:return this.begin("acc_title"),31;case 2:return this.popState(),"acc_title_value";case 3:return this.begin("acc_descr"),33;case 4:return this.popState(),"acc_descr_value";case 5:this.begin("acc_descr_multiline");break;case 6:this.popState();break;case 7:return"acc_descr_multiline_value";case 8:break;case 9:break;case 10:break;case 11:return 10;case 12:break;case 13:break;case 14:this.begin("href");break;case 15:this.popState();break;case 16:return 43;case 17:this.begin("callbackname");break;case 18:this.popState();break;case 19:this.popState(),this.begin("callbackargs");break;case 20:return 41;case 21:this.popState();break;case 22:return 42;case 23:this.begin("click");break;case 24:this.popState();break;case 25:return 40;case 26:return 4;case 27:return 22;case 28:return 23;case 29:return 24;case 30:return 25;case 31:return 26;case 32:return 28;case 33:return 27;case 34:return 29;case 35:return 12;case 36:return 13;case 37:return 14;case 38:return 15;case 39:return 16;case 40:return 17;case 41:return 18;case 42:return 20;case 43:return 21;case 44:return"date";case 45:return 30;case 46:return"accDescription";case 47:return 36;case 48:return 38;case 49:return 39;case 50:return":";case 51:return 6;case 52:return"INVALID"}},"anonymous"),rules:[/^(?:%%\{)/i,/^(?:accTitle\s*:\s*)/i,/^(?:(?!\n||)*[^\n]*)/i,/^(?:accDescr\s*:\s*)/i,/^(?:(?!\n||)*[^\n]*)/i,/^(?:accDescr\s*\{\s*)/i,/^(?:[\}])/i,/^(?:[^\}]*)/i,/^(?:%%(?!\{)*[^\n]*)/i,/^(?:[^\}]%%*[^\n]*)/i,/^(?:%%*[^\n]*[\n]*)/i,/^(?:[\n]+)/i,/^(?:\s+)/i,/^(?:%[^\n]*)/i,/^(?:href[\s]+["])/i,/^(?:["])/i,/^(?:[^"]*)/i,/^(?:call[\s]+)/i,/^(?:\([\s]*\))/i,/^(?:\()/i,/^(?:[^(]*)/i,/^(?:\))/i,/^(?:[^)]*)/i,/^(?:click[\s]+)/i,/^(?:[\s\n])/i,/^(?:[^\s\n]*)/i,/^(?:gantt\b)/i,/^(?:dateFormat\s[^#\n;]+)/i,/^(?:inclusiveEndDates\b)/i,/^(?:topAxis\b)/i,/^(?:axisFormat\s[^#\n;]+)/i,/^(?:tickInterval\s[^#\n;]+)/i,/^(?:includes\s[^#\n;]+)/i,/^(?:excludes\s[^#\n;]+)/i,/^(?:todayMarker\s[^\n;]+)/i,/^(?:weekday\s+monday\b)/i,/^(?:weekday\s+tuesday\b)/i,/^(?:weekday\s+wednesday\b)/i,/^(?:weekday\s+thursday\b)/i,/^(?:weekday\s+friday\b)/i,/^(?:weekday\s+saturday\b)/i,/^(?:weekday\s+sunday\b)/i,/^(?:weekend\s+friday\b)/i,/^(?:weekend\s+saturday\b)/i,/^(?:\d\d\d\d-\d\d-\d\d\b)/i,/^(?:title\s[^\n]+)/i,/^(?:accDescription\s[^#\n;]+)/i,/^(?:section\s[^\n]+)/i,/^(?:[^:\n]+)/i,/^(?::[^#\n;]+)/i,/^(?::)/i,/^(?:$)/i,/^(?:.)/i],conditions:{acc_descr_multiline:{rules:[6,7],inclusive:!1},acc_descr:{rules:[4],inclusive:!1},acc_title:{rules:[2],inclusive:!1},callbackargs:{rules:[21,22],inclusive:!1},callbackname:{rules:[18,19,20],inclusive:!1},href:{rules:[15,16],inclusive:!1},click:{rules:[24,25],inclusive:!1},INITIAL:{rules:[0,1,3,5,8,9,10,11,12,13,14,17,23,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52],inclusive:!0}}};return g})();D.lexer=S;function w(){this.yy={}}return c(w,"Parser"),w.prototype=D,D.Parser=w,new w})();Ht.parser=Ht;var Ys=Ht;F.extend(ms);F.extend(Cs);F.extend(Es);var ve={friday:5,saturday:6},Z="",Xt="",qt=void 0,Zt="",xt=[],bt=[],Kt=new Map,Qt=[],At=[],mt="",jt="",Se=["active","done","crit","milestone","vert"],Jt=[],dt="",wt=!1,te=!1,ee="sunday",Yt="saturday",Ut=0,Os=c(function(){Qt=[],At=[],mt="",Jt=[],Ct=0,Gt=void 0,Et=void 0,$=[],Z="",Xt="",jt="",qt=void 0,Zt="",xt=[],bt=[],wt=!1,te=!1,Ut=0,Kt=new Map,dt="",as(),ee="sunday",Yt="saturday"},"clear"),$s=c(function(t){dt=t},"setDiagramId"),Fs=c(function(t){Xt=t},"setAxisFormat"),Ws=c(function(){return Xt},"getAxisFormat"),Ns=c(function(t){qt=t},"setTickInterval"),Ps=c(function(){return qt},"getTickInterval"),Rs=c(function(t){Zt=t},"setTodayMarker"),Vs=c(function(){return Zt},"getTodayMarker"),zs=c(function(t){Z=t},"setDateFormat"),Hs=c(function(){wt=!0},"enableInclusiveEndDates"),Us=c(function(){return wt},"endDatesAreInclusive"),Bs=c(function(){te=!0},"enableTopAxis"),Gs=c(function(){return te},"topAxisEnabled"),Xs=c(function(t){jt=t},"setDisplayMode"),qs=c(function(){return jt},"getDisplayMode"),Zs=c(function(){return Z},"getDateFormat"),Ks=c(function(t){xt=t.toLowerCase().split(/[\s,]+/)},"setIncludes"),Qs=c(function(){return xt},"getIncludes"),js=c(function(t){bt=t.toLowerCase().split(/[\s,]+/)},"setExcludes"),Js=c(function(){return bt},"getExcludes"),tr=c(function(){return Kt},"getLinks"),er=c(function(t){mt=t,Qt.push(t)},"addSection"),sr=c(function(){return Qt},"getSections"),rr=c(function(){let t=ye();const e=10;let s=0;for(;!t&&s<e;)t=ye(),s++;return At=$,At},"getTasks"),Me=c(function(t,e,s,r){const a=t.format(e.trim()),o=t.format("YYYY-MM-DD");return r.includes(a)||r.includes(o)?!1:s.includes("weekends")&&(t.isoWeekday()===ve[Yt]||t.isoWeekday()===ve[Yt]+1)||s.includes(t.format("dddd").toLowerCase())?!0:s.includes(a)||s.includes(o)},"isInvalidDate"),ir=c(function(t){ee=t},"setWeekday"),ar=c(function(){return ee},"getWeekday"),nr=c(function(t){Yt=t},"setWeekend"),Ce=c(function(t,e,s,r){if(!s.length||t.manualEndTime)return;let a;t.startTime instanceof Date?a=F(t.startTime):a=F(t.startTime,e,!0),a=a.add(1,"d");let o;t.endTime instanceof Date?o=F(t.endTime):o=F(t.endTime,e,!0);const[l,m]=or(a,o,e,s,r);t.endTime=l.toDate(),t.renderEndTime=m},"checkTaskDates"),or=c(function(t,e,s,r,a){let o=!1,l=null;for(;t<=e;)o||(l=e.toDate()),o=Me(t,s,r,a),o&&(e=e.add(1,"d")),t=t.add(1,"d");return[e,l]},"fixTaskDates"),Bt=c(function(t,e,s){if(s=s.trim(),c(m=>{const k=m.trim();return k==="x"||k==="X"},"isTimestampFormat")(e)&&/^\d+$/.test(s))return new Date(Number(s));const o=/^after\s+(?<ids>[\d\w- ]+)/.exec(s);if(o!==null){let m=null;for(const x of o.groups.ids.split(" ")){let v=ct(x);v!==void 0&&(!m||v.endTime>m.endTime)&&(m=v)}if(m)return m.endTime;const k=new Date;return k.setHours(0,0,0,0),k}let l=F(s,e.trim(),!0);if(l.isValid())return l.toDate();{nt.debug("Invalid date:"+s),nt.debug("With date format:"+e.trim());const m=new Date(s);if(m===void 0||isNaN(m.getTime())||m.getFullYear()<-1e4||m.getFullYear()>1e4)throw new Error("Invalid date:"+s);return m}},"getStartDate"),Ee=c(function(t){const e=/^(\d+(?:\.\d+)?)([Mdhmswy]|ms)$/.exec(t.trim());return e!==null?[Number.parseFloat(e[1]),e[2]]:[NaN,"ms"]},"parseDuration"),Ie=c(function(t,e,s,r=!1){s=s.trim();const o=/^until\s+(?<ids>[\d\w- ]+)/.exec(s);if(o!==null){let v=null;for(const O of o.groups.ids.split(" ")){let L=ct(O);L!==void 0&&(!v||L.startTime<v.startTime)&&(v=L)}if(v)return v.startTime;const E=new Date;return E.setHours(0,0,0,0),E}let l=F(s,e.trim(),!0);if(l.isValid())return r&&(l=l.add(1,"d")),l.toDate();let m=F(t);const[k,x]=Ee(s);if(!Number.isNaN(k)){const v=m.add(k,x);v.isValid()&&(m=v)}return m.toDate()},"getEndDate"),Ct=0,ht=c(function(t){return t===void 0?(Ct=Ct+1,"task"+Ct):t},"parseId"),cr=c(function(t,e){let s;e.substr(0,1)===":"?s=e.substr(1,e.length):s=e;const r=s.split(","),a={};se(r,a,Se);for(let l=0;l<r.length;l++)r[l]=r[l].trim();let o="";switch(r.length){case 1:a.id=ht(),a.startTime=t.endTime,o=r[0];break;case 2:a.id=ht(),a.startTime=Bt(void 0,Z,r[0]),o=r[1];break;case 3:a.id=ht(r[0]),a.startTime=Bt(void 0,Z,r[1]),o=r[2];break}return o&&(a.endTime=Ie(a.startTime,Z,o,wt),a.manualEndTime=F(o,"YYYY-MM-DD",!0).isValid(),Ce(a,Z,bt,xt)),a},"compileData"),lr=c(function(t,e){let s;e.substr(0,1)===":"?s=e.substr(1,e.length):s=e;const r=s.split(","),a={};se(r,a,Se);for(let o=0;o<r.length;o++)r[o]=r[o].trim();switch(r.length){case 1:a.id=ht(),a.startTime={type:"prevTaskEnd",id:t},a.endTime={data:r[0]};break;case 2:a.id=ht(),a.startTime={type:"getStartDate",startData:r[0]},a.endTime={data:r[1]};break;case 3:a.id=ht(r[0]),a.startTime={type:"getStartDate",startData:r[1]},a.endTime={data:r[2]};break}return a},"parseData"),Gt,Et,$=[],Le={},ur=c(function(t,e){const s={section:mt,type:mt,processed:!1,manualEndTime:!1,renderEndTime:null,raw:{data:e},task:t,classes:[]},r=lr(Et,e);s.raw.startTime=r.startTime,s.raw.endTime=r.endTime,s.id=r.id,s.prevTaskId=Et,s.active=r.active,s.done=r.done,s.crit=r.crit,s.milestone=r.milestone,s.vert=r.vert,s.order=Ut,Ut++;const a=$.push(s);Et=s.id,Le[s.id]=a-1},"addTask"),ct=c(function(t){const e=Le[t];return $[e]},"findTaskById"),dr=c(function(t,e){const s={section:mt,type:mt,description:t,task:t,classes:[]},r=cr(Gt,e);s.startTime=r.startTime,s.endTime=r.endTime,s.id=r.id,s.active=r.active,s.done=r.done,s.crit=r.crit,s.milestone=r.milestone,s.vert=r.vert,Gt=s,At.push(s)},"addTaskOrg"),ye=c(function(){const t=c(function(s){const r=$[s];let a="";switch($[s].raw.startTime.type){case"prevTaskEnd":{const o=ct(r.prevTaskId);r.startTime=o.endTime;break}case"getStartDate":a=Bt(void 0,Z,$[s].raw.startTime.startData),a&&($[s].startTime=a);break}return $[s].startTime&&($[s].endTime=Ie($[s].startTime,Z,$[s].raw.endTime.data,wt),$[s].endTime&&($[s].processed=!0,$[s].manualEndTime=F($[s].raw.endTime.data,"YYYY-MM-DD",!0).isValid(),Ce($[s],Z,bt,xt))),$[s].processed},"compileTask");let e=!0;for(const[s,r]of $.entries())t(s),e=e&&r.processed;return e},"compileTasks"),fr=c(function(t,e){let s=e;ft().securityLevel!=="loose"&&(s=is.sanitizeUrl(e)),t.split(",").forEach(function(r){ct(r)!==void 0&&(Ye(r,()=>{window.open(s,"_self")}),Kt.set(r,s))}),Ae(t,"clickable")},"setLink"),Ae=c(function(t,e){t.split(",").forEach(function(s){let r=ct(s);r!==void 0&&r.classes.push(e)})},"setClass"),hr=c(function(t,e,s){if(ft().securityLevel!=="loose"||e===void 0)return;let r=[];if(typeof s=="string"){r=s.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);for(let o=0;o<r.length;o++){let l=r[o].trim();l.startsWith('"')&&l.endsWith('"')&&(l=l.substr(1,l.length-2)),r[o]=l}}r.length===0&&r.push(t),ct(t)!==void 0&&Ye(t,()=>{ns.runFunc(e,...r)})},"setClickFun"),Ye=c(function(t,e){Jt.push(function(){const s=dt?`${dt}-${t}`:t,r=document.querySelector(`[id="${s}"]`);r!==null&&r.addEventListener("click",function(){e()})},function(){const s=dt?`${dt}-${t}`:t,r=document.querySelector(`[id="${s}-text"]`);r!==null&&r.addEventListener("click",function(){e()})})},"pushFun"),mr=c(function(t,e,s){t.split(",").forEach(function(r){hr(r,e,s)}),Ae(t,"clickable")},"setClickEvent"),kr=c(function(t){Jt.forEach(function(e){e(t)})},"bindFunctions"),vr={getConfig:c(()=>ft().gantt,"getConfig"),clear:Os,setDateFormat:zs,getDateFormat:Zs,enableInclusiveEndDates:Hs,endDatesAreInclusive:Us,enableTopAxis:Bs,topAxisEnabled:Gs,setAxisFormat:Fs,getAxisFormat:Ws,setTickInterval:Ns,getTickInterval:Ps,setTodayMarker:Rs,getTodayMarker:Vs,setAccTitle:Ve,getAccTitle:Re,setDiagramTitle:Pe,getDiagramTitle:Ne,setDiagramId:$s,setDisplayMode:Xs,getDisplayMode:qs,setAccDescription:We,getAccDescription:Fe,addSection:er,getSections:sr,getTasks:rr,addTask:ur,findTaskById:ct,addTaskOrg:dr,setIncludes:Ks,getIncludes:Qs,setExcludes:js,getExcludes:Js,setClickEvent:mr,setLink:fr,getLinks:tr,bindFunctions:kr,parseDuration:Ee,isInvalidDate:Me,setWeekday:ir,getWeekday:ar,setWeekend:nr};function se(t,e,s){let r=!0;for(;r;)r=!1,s.forEach(function(a){const o="^\\s*"+a+"\\s*$",l=new RegExp(o);t[0].match(l)&&(e[a]=!0,t.shift(1),r=!0)})}c(se,"getTaskTags");F.extend(As);var yr=c(function(){nt.debug("Something is calling, setConf, remove the call")},"setConf"),ge={monday:es,tuesday:ts,wednesday:Je,thursday:je,friday:Qe,saturday:Ke,sunday:Ze},gr=c((t,e)=>{let s=[...t].map(()=>-1/0),r=[...t].sort((o,l)=>o.startTime-l.startTime||o.order-l.order),a=0;for(const o of r)for(let l=0;l<s.length;l++)if(o.startTime>=s[l]){s[l]=o.endTime,o.order=l+e,l>a&&(a=l);break}return a},"getMaxIntersections"),st,Pt=1e4,pr=c(function(t,e,s,r){const a=ft().gantt;r.db.setDiagramId(e);const o=ft().securityLevel;let l;o==="sandbox"&&(l=St("#i"+e));const m=o==="sandbox"?St(l.nodes()[0].contentDocument.body):St("body"),k=o==="sandbox"?l.nodes()[0].contentDocument:document,x=k.getElementById(e);st=x.parentElement.offsetWidth,st===void 0&&(st=1200),a.useWidth!==void 0&&(st=a.useWidth);const v=r.db.getTasks();let E=[];for(const p of v)E.push(p.type);E=X(E);const O={};let L=2*a.topPadding;if(r.db.getDisplayMode()==="compact"||a.displayMode==="compact"){const p={};for(const S of v)p[S.section]===void 0?p[S.section]=[S]:p[S.section].push(S);let D=0;for(const S of Object.keys(p)){const w=gr(p[S],D)+1;D+=w,L+=w*(a.barHeight+a.barGap),O[S]=w}}else{L+=v.length*(a.barHeight+a.barGap);for(const p of E)O[p]=v.filter(D=>D.type===p).length}x.setAttribute("viewBox","0 0 "+st+" "+L);const A=m.select(`[id="${e}"]`),b=ze().domain([He(v,function(p){return p.startTime}),Ue(v,function(p){return p.endTime})]).rangeRound([0,st-a.leftPadding-a.rightPadding]);function P(p,D){const S=p.startTime,w=D.startTime;let g=0;return S>w?g=1:S<w&&(g=-1),g}c(P,"taskCompare"),v.sort(P),z(v,st,L),Be(A,L,st,a.useMaxWidth),A.append("text").text(r.db.getDiagramTitle()).attr("x",st/2).attr("y",a.titleTopMargin).attr("class","titleText");function z(p,D,S){const w=a.barHeight,g=w+a.barGap,u=a.topPadding,d=a.leftPadding,h=Ge().domain([0,E.length]).range(["#00B9FA","#F95002"]).interpolate(Xe);B(g,u,d,D,S,p,r.db.getExcludes(),r.db.getIncludes()),Q(d,u,D,S),K(p,g,u,d,w,h,D),j(g,u),J(d,u,D,S)}c(z,"makeGantt");function K(p,D,S,w,g,u,d){p.sort((i,y)=>i.vert===y.vert?0:i.vert?1:-1);const f=[...new Set(p.map(i=>i.order))].map(i=>p.find(y=>y.order===i));A.append("g").selectAll("rect").data(f).enter().append("rect").attr("x",0).attr("y",function(i,y){return y=i.order,y*D+S-2}).attr("width",function(){return d-a.rightPadding/2}).attr("height",D).attr("class",function(i){for(const[y,I]of E.entries())if(i.type===I)return"section section"+y%a.numberSectionStyles;return"section section0"}).enter();const T=A.append("g").selectAll("rect").data(p).enter(),n=r.db.getLinks();if(T.append("rect").attr("id",function(i){return e+"-"+i.id}).attr("rx",3).attr("ry",3).attr("x",function(i){return i.milestone?b(i.startTime)+w+.5*(b(i.endTime)-b(i.startTime))-.5*g:b(i.startTime)+w}).attr("y",function(i,y){return y=i.order,i.vert?a.gridLineStartPadding:y*D+S}).attr("width",function(i){return i.milestone?g:i.vert?.08*g:b(i.renderEndTime||i.endTime)-b(i.startTime)}).attr("height",function(i){return i.vert?v.length*(a.barHeight+a.barGap)+a.barHeight*2:g}).attr("transform-origin",function(i,y){return y=i.order,(b(i.startTime)+w+.5*(b(i.endTime)-b(i.startTime))).toString()+"px "+(y*D+S+.5*g).toString()+"px"}).attr("class",function(i){const y="task";let I="";i.classes.length>0&&(I=i.classes.join(" "));let C=0;for(const[W,_]of E.entries())i.type===_&&(C=W%a.numberSectionStyles);let M="";return i.active?i.crit?M+=" activeCrit":M=" active":i.done?i.crit?M=" doneCrit":M=" done":i.crit&&(M+=" crit"),M.length===0&&(M=" task"),i.milestone&&(M=" milestone "+M),i.vert&&(M=" vert "+M),M+=C,M+=" "+I,y+M}),T.append("text").attr("id",function(i){return e+"-"+i.id+"-text"}).text(function(i){return i.task}).attr("font-size",a.fontSize).attr("x",function(i){let y=b(i.startTime),I=b(i.renderEndTime||i.endTime);if(i.milestone&&(y+=.5*(b(i.endTime)-b(i.startTime))-.5*g,I=y+g),i.vert)return b(i.startTime)+w;const C=this.getBBox().width;return C>I-y?I+C+1.5*a.leftPadding>d?y+w-5:I+w+5:(I-y)/2+y+w}).attr("y",function(i,y){return i.vert?a.gridLineStartPadding+v.length*(a.barHeight+a.barGap)+60:(y=i.order,y*D+a.barHeight/2+(a.fontSize/2-2)+S)}).attr("text-height",g).attr("class",function(i){const y=b(i.startTime);let I=b(i.endTime);i.milestone&&(I=y+g);const C=this.getBBox().width;let M="";i.classes.length>0&&(M=i.classes.join(" "));let W=0;for(const[tt,kt]of E.entries())i.type===kt&&(W=tt%a.numberSectionStyles);let _="";return i.active&&(i.crit?_="activeCritText"+W:_="activeText"+W),i.done?i.crit?_=_+" doneCritText"+W:_=_+" doneText"+W:i.crit&&(_=_+" critText"+W),i.milestone&&(_+=" milestoneText"),i.vert&&(_+=" vertText"),C>I-y?I+C+1.5*a.leftPadding>d?M+" taskTextOutsideLeft taskTextOutside"+W+" "+_:M+" taskTextOutsideRight taskTextOutside"+W+" "+_+" width-"+C:M+" taskText taskText"+W+" "+_+" width-"+C}),ft().securityLevel==="sandbox"){let i;i=St("#i"+e);const y=i.nodes()[0].contentDocument;T.filter(function(I){return n.has(I.id)}).each(function(I){var C=y.querySelector("#"+CSS.escape(e+"-"+I.id)),M=y.querySelector("#"+CSS.escape(e+"-"+I.id+"-text"));const W=C.parentNode;var _=y.createElement("a");_.setAttribute("xlink:href",n.get(I.id)),_.setAttribute("target","_top"),W.appendChild(_),_.appendChild(C),_.appendChild(M)})}}c(K,"drawRects");function B(p,D,S,w,g,u,d,h){if(d.length===0&&h.length===0)return;let f,T;for(const{startTime:C,endTime:M}of u)(f===void 0||C<f)&&(f=C),(T===void 0||M>T)&&(T=M);if(!f||!T)return;if(F(T).diff(F(f),"year")>5){nt.warn("The difference between the min and max time is more than 5 years. This will cause performance issues. Skipping drawing exclude days.");return}const n=r.db.getDateFormat(),Y=[];let i=null,y=F(f);for(;y.valueOf()<=T;)r.db.isInvalidDate(y,n,d,h)?i?i.end=y:i={start:y,end:y}:i&&(Y.push(i),i=null),y=y.add(1,"d");A.append("g").selectAll("rect").data(Y).enter().append("rect").attr("id",C=>e+"-exclude-"+C.start.format("YYYY-MM-DD")).attr("x",C=>b(C.start.startOf("day"))+S).attr("y",a.gridLineStartPadding).attr("width",C=>b(C.end.endOf("day"))-b(C.start.startOf("day"))).attr("height",g-D-a.gridLineStartPadding).attr("transform-origin",function(C,M){return(b(C.start)+S+.5*(b(C.end)-b(C.start))).toString()+"px "+(M*p+.5*g).toString()+"px"}).attr("class","exclude-range")}c(B,"drawExcludeDays");function G(p,D,S,w){if(S<=0||p>D)return 1/0;const g=D-p,u=F.duration({[w??"day"]:S}).asMilliseconds();return u<=0?1/0:Math.ceil(g/u)}c(G,"getEstimatedTickCount");function Q(p,D,S,w){const g=r.db.getDateFormat(),u=r.db.getAxisFormat();let d;u?d=u:g==="D"?d="%d":d=a.axisFormat??"%Y-%m-%d";let h=qe(b).tickSize(-w+D+a.gridLineStartPadding).tickFormat(ae(d));const T=/^([1-9]\d*)(millisecond|second|minute|hour|day|week|month)$/.exec(r.db.getTickInterval()||a.tickInterval);if(T!==null){const n=parseInt(T[1],10);if(isNaN(n)||n<=0)nt.warn(`Invalid tick interval value: "${T[1]}". Skipping custom tick interval.`);else{const Y=T[2],i=r.db.getWeekday()||a.weekday,y=b.domain(),I=y[0],C=y[1],M=G(I,C,n,Y);if(M>Pt)nt.warn(`The tick interval "${n}${Y}" would generate ${M} ticks, which exceeds the maximum allowed (${Pt}). This may indicate an invalid date or time range. Skipping custom tick interval.`);else switch(Y){case"millisecond":h.ticks(de.every(n));break;case"second":h.ticks(ue.every(n));break;case"minute":h.ticks(le.every(n));break;case"hour":h.ticks(ce.every(n));break;case"day":h.ticks(oe.every(n));break;case"week":h.ticks(ge[i].every(n));break;case"month":h.ticks(ne.every(n));break}}}if(A.append("g").attr("class","grid").attr("transform","translate("+p+", "+(w-50)+")").call(h).selectAll("text").style("text-anchor","middle").attr("fill","#000").attr("stroke","none").attr("font-size",10).attr("dy","1em"),r.db.topAxisEnabled()||a.topAxis){let n=ss(b).tickSize(-w+D+a.gridLineStartPadding).tickFormat(ae(d));if(T!==null){const Y=parseInt(T[1],10);if(isNaN(Y)||Y<=0)nt.warn(`Invalid tick interval value: "${T[1]}". Skipping custom tick interval.`);else{const i=T[2],y=r.db.getWeekday()||a.weekday,I=b.domain(),C=I[0],M=I[1];if(G(C,M,Y,i)<=Pt)switch(i){case"millisecond":n.ticks(de.every(Y));break;case"second":n.ticks(ue.every(Y));break;case"minute":n.ticks(le.every(Y));break;case"hour":n.ticks(ce.every(Y));break;case"day":n.ticks(oe.every(Y));break;case"week":n.ticks(ge[y].every(Y));break;case"month":n.ticks(ne.every(Y));break}}}A.append("g").attr("class","grid").attr("transform","translate("+p+", "+D+")").call(n).selectAll("text").style("text-anchor","middle").attr("fill","#000").attr("stroke","none").attr("font-size",10)}}c(Q,"makeGrid");function j(p,D){let S=0;const w=Object.keys(O).map(g=>[g,O[g]]);A.append("g").selectAll("text").data(w).enter().append(function(g){const u=g[0].split(rs.lineBreakRegex),d=-(u.length-1)/2,h=k.createElementNS("http://www.w3.org/2000/svg","text");h.setAttribute("dy",d+"em");for(const[f,T]of u.entries()){const n=k.createElementNS("http://www.w3.org/2000/svg","tspan");n.setAttribute("alignment-baseline","central"),n.setAttribute("x","10"),f>0&&n.setAttribute("dy","1em"),n.textContent=T,h.appendChild(n)}return h}).attr("x",10).attr("y",function(g,u){if(u>0)for(let d=0;d<u;d++)return S+=w[u-1][1],g[1]*p/2+S*p+D;else return g[1]*p/2+D}).attr("font-size",a.sectionFontSize).attr("class",function(g){for(const[u,d]of E.entries())if(g[0]===d)return"sectionTitle sectionTitle"+u%a.numberSectionStyles;return"sectionTitle"})}c(j,"vertLabels");function J(p,D,S,w){const g=r.db.getTodayMarker();if(g==="off")return;const u=A.append("g").attr("class","today"),d=new Date,h=u.append("line");h.attr("x1",b(d)+p).attr("x2",b(d)+p).attr("y1",a.titleTopMargin).attr("y2",w-a.titleTopMargin).attr("class","today"),g!==""&&h.attr("style",g.replace(/,/g,";"))}c(J,"drawToday");function X(p){const D={},S=[];for(let w=0,g=p.length;w<g;++w)Object.prototype.hasOwnProperty.call(D,p[w])||(D[p[w]]=!0,S.push(p[w]));return S}c(X,"checkUnique")},"draw"),Tr={setConf:yr,draw:pr},xr=c(t=>`
  .mermaid-main-font {
        font-family: ${t.fontFamily};
  }

  .exclude-range {
    fill: ${t.excludeBkgColor};
  }

  .section {
    stroke: none;
    opacity: 0.2;
  }

  .section0 {
    fill: ${t.sectionBkgColor};
  }

  .section2 {
    fill: ${t.sectionBkgColor2};
  }

  .section1,
  .section3 {
    fill: ${t.altSectionBkgColor};
    opacity: 0.2;
  }

  .sectionTitle0 {
    fill: ${t.titleColor};
  }

  .sectionTitle1 {
    fill: ${t.titleColor};
  }

  .sectionTitle2 {
    fill: ${t.titleColor};
  }

  .sectionTitle3 {
    fill: ${t.titleColor};
  }

  .sectionTitle {
    text-anchor: start;
    font-family: ${t.fontFamily};
  }


  /* Grid and axis */

  .grid .tick {
    stroke: ${t.gridColor};
    opacity: 0.8;
    shape-rendering: crispEdges;
  }

  .grid .tick text {
    font-family: ${t.fontFamily};
    fill: ${t.textColor};
  }

  .grid path {
    stroke-width: 0;
  }


  /* Today line */

  .today {
    fill: none;
    stroke: ${t.todayLineColor};
    stroke-width: 2px;
  }


  /* Task styling */

  /* Default task */

  .task {
    stroke-width: 2;
  }

  .taskText {
    text-anchor: middle;
    font-family: ${t.fontFamily};
  }

  .taskTextOutsideRight {
    fill: ${t.taskTextDarkColor};
    text-anchor: start;
    font-family: ${t.fontFamily};
  }

  .taskTextOutsideLeft {
    fill: ${t.taskTextDarkColor};
    text-anchor: end;
  }


  /* Special case clickable */

  .task.clickable {
    cursor: pointer;
  }

  .taskText.clickable {
    cursor: pointer;
    fill: ${t.taskTextClickableColor} !important;
    font-weight: bold;
  }

  .taskTextOutsideLeft.clickable {
    cursor: pointer;
    fill: ${t.taskTextClickableColor} !important;
    font-weight: bold;
  }

  .taskTextOutsideRight.clickable {
    cursor: pointer;
    fill: ${t.taskTextClickableColor} !important;
    font-weight: bold;
  }


  /* Specific task settings for the sections*/

  .taskText0,
  .taskText1,
  .taskText2,
  .taskText3 {
    fill: ${t.taskTextColor};
  }

  .task0,
  .task1,
  .task2,
  .task3 {
    fill: ${t.taskBkgColor};
    stroke: ${t.taskBorderColor};
  }

  .taskTextOutside0,
  .taskTextOutside2
  {
    fill: ${t.taskTextOutsideColor};
  }

  .taskTextOutside1,
  .taskTextOutside3 {
    fill: ${t.taskTextOutsideColor};
  }


  /* Active task */

  .active0,
  .active1,
  .active2,
  .active3 {
    fill: ${t.activeTaskBkgColor};
    stroke: ${t.activeTaskBorderColor};
  }

  .activeText0,
  .activeText1,
  .activeText2,
  .activeText3 {
    fill: ${t.taskTextDarkColor} !important;
  }


  /* Completed task */

  .done0,
  .done1,
  .done2,
  .done3 {
    stroke: ${t.doneTaskBorderColor};
    fill: ${t.doneTaskBkgColor};
    stroke-width: 2;
  }

  .doneText0,
  .doneText1,
  .doneText2,
  .doneText3 {
    fill: ${t.taskTextDarkColor} !important;
  }

  /* Done task text displayed outside the bar sits against the diagram background,
     not against the done-task bar, so it must use the outside/contrast color. */
  .doneText0.taskTextOutsideLeft,
  .doneText0.taskTextOutsideRight,
  .doneText1.taskTextOutsideLeft,
  .doneText1.taskTextOutsideRight,
  .doneText2.taskTextOutsideLeft,
  .doneText2.taskTextOutsideRight,
  .doneText3.taskTextOutsideLeft,
  .doneText3.taskTextOutsideRight {
    fill: ${t.taskTextOutsideColor} !important;
  }


  /* Tasks on the critical line */

  .crit0,
  .crit1,
  .crit2,
  .crit3 {
    stroke: ${t.critBorderColor};
    fill: ${t.critBkgColor};
    stroke-width: 2;
  }

  .activeCrit0,
  .activeCrit1,
  .activeCrit2,
  .activeCrit3 {
    stroke: ${t.critBorderColor};
    fill: ${t.activeTaskBkgColor};
    stroke-width: 2;
  }

  .doneCrit0,
  .doneCrit1,
  .doneCrit2,
  .doneCrit3 {
    stroke: ${t.critBorderColor};
    fill: ${t.doneTaskBkgColor};
    stroke-width: 2;
    cursor: pointer;
    shape-rendering: crispEdges;
  }

  .milestone {
    transform: rotate(45deg) scale(0.8,0.8);
  }

  .milestoneText {
    font-style: italic;
  }
  .doneCritText0,
  .doneCritText1,
  .doneCritText2,
  .doneCritText3 {
    fill: ${t.taskTextDarkColor} !important;
  }

  /* Done-crit task text outside the bar — same reasoning as doneText above. */
  .doneCritText0.taskTextOutsideLeft,
  .doneCritText0.taskTextOutsideRight,
  .doneCritText1.taskTextOutsideLeft,
  .doneCritText1.taskTextOutsideRight,
  .doneCritText2.taskTextOutsideLeft,
  .doneCritText2.taskTextOutsideRight,
  .doneCritText3.taskTextOutsideLeft,
  .doneCritText3.taskTextOutsideRight {
    fill: ${t.taskTextOutsideColor} !important;
  }

  .vert {
    stroke: ${t.vertLineColor};
  }

  .vertText {
    font-size: 15px;
    text-anchor: middle;
    fill: ${t.vertLineColor} !important;
  }

  .activeCritText0,
  .activeCritText1,
  .activeCritText2,
  .activeCritText3 {
    fill: ${t.taskTextDarkColor} !important;
  }

  .titleText {
    text-anchor: middle;
    font-size: 18px;
    fill: ${t.titleColor||t.textColor};
    font-family: ${t.fontFamily};
  }
`,"getStyles"),br=xr,Dr={parser:Ys,db:vr,renderer:Tr,styles:br};export{Dr as diagram};
