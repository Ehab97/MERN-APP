"use strict";(self.webpackChunkreact_setup=self.webpackChunkreact_setup||[]).push([[360],{7360:function(e,t,r){r.r(t),r.d(t,{default:function(){return k}});var a=r(2791),n=r(3092),s=r(1413),i=r(5861),l=r(885),o=r(7757),u=r.n(o),d=r(429),c=r(3349),p=r(9389),v=r(9892),x=r(2801),f=r(1743),m=r(3041),h=r(6413),g=r(6871),j=r(4159),b=r(184),I=function(){var e=(0,x.x)(),t=e.isLoading,r=e.error,n=e.sendRequest,o=e.clearError,I=(0,a.useContext)(f.V),k=(0,g.s0)(),Z=(0,v.c)({title:{value:"",isValid:!1},description:{value:"",isValid:!1},address:{value:"",isValid:!1},image:{value:null,isValid:!1}},!1),C=(0,l.Z)(Z,2),T=C[0],V=C[1],w=function(){var e=(0,i.Z)(u().mark((function e(t){var r,a,s,i,l,o,d;return u().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),console.log("formState",T,I),r=T.inputs.title.value,a=T.inputs.address.value,s=T.inputs.description.value,i=T.inputs.image.value,l=new FormData,o=I.userId,l.append("title",r),l.append("address",a),l.append("description",s),l.append("image",i),l.append("creator",o),console.log(r,a,s,i,o,l,I),e.prev=14,e.next=17,n("places","POST",l,{Authorization:"Bearer ".concat(I.token)});case 17:d=e.sent,console.log(d),k("/"),e.next=25;break;case 22:e.prev=22,e.t0=e.catch(14),console.log(e.t0);case 25:case"end":return e.stop()}}),e,null,[[14,22]])})));return function(t){return e.apply(this,arguments)}}(),A={error:r,onClear:o};return(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)(h.Z,(0,s.Z)({},A)),t&&(0,b.jsx)(m.Z,{asOverlay:!0}),(0,b.jsxs)("form",{className:"place-form",onSubmit:w,children:[(0,b.jsx)(d.I,{label:"Title",element:"input",id:"title",onInput:V,errorText:"please enter valid text",validators:[(0,c.hg)()]}),(0,b.jsx)(d.I,{label:"Address",element:"input",id:"address",onInput:V,errorText:"please enter a valid address",validators:[(0,c.hg)()]}),(0,b.jsx)(d.I,{label:"Description",element:"textarea",id:"description",onInput:V,errorText:"please enter at least five characters text",validators:[(0,c.CP)(5)]}),(0,b.jsx)(j.U,{id:"image",center:!1,onInput:V,errorText:"please Enter An image"}),(0,b.jsx)(p.Z,{type:"submit",disabled:!T.isValid,children:"ADD PLACE"})]})]})},k=function(){return(0,b.jsx)(n.Z,{children:(0,b.jsx)(I,{})})}}}]);
//# sourceMappingURL=360.291dc5d5.chunk.js.map