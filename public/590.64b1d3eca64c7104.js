"use strict";(self.webpackChunknewschecker=self.webpackChunknewschecker||[]).push([[590],{7590:(f,u,t)=>{t.r(u),t.d(u,{AuthModule:()=>i});var l=t(6895),o=t(1571),e=t(4006),p=t(3535),m=t(3599);class r{constructor(n,a,d){this.fb=n,this.authService=a,this.router=d,this.signinForm=this.fb.group({email:[""],password:[""]})}ngOnInit(){this.authService.isLoggedIn&&this.router.navigateByUrl("/feed")}loginUser(){this.authService.signIn(this.signinForm.value)}}r.\u0275fac=function(n){return new(n||r)(o.Y36(e.qu),o.Y36(p.e),o.Y36(m.F0))},r.\u0275cmp=o.Xpm({type:r,selectors:[["app-login"]],decls:31,vars:2,consts:[[1,"row"],[1,"container-xxl"],[1,"authentication-wrapper","authentication-basic","container-p-y"],[1,"authentication-inner","py-4"],[1,"card",2,"max-width","40%","margin-left","200px"],[1,"card-body"],[1,"mb-1","pt-2","text-center"],[1,"app-brand","justify-content-center","mb-4","mt-2"],["href","index.html",1,"app-brand-link","gap-2"],[1,"app-brand-logo"],["width","150","src","assets/logo.png"],["id","formAuthentication",1,"mb-3",3,"formGroup","ngSubmit"],[1,"mb-3"],["for","email",1,"form-label"],["type","text","formControlName","email","id","email","name","email-username","placeholder","Enter your email ","autofocus","",1,"form-control"],[1,"mb-3","form-password-toggle"],[1,"d-flex","justify-content-between"],["for","password",1,"form-label"],["href","auth-forgot-password-basic.html"],[1,"input-group","input-group-merge"],["type","password","id","password","name","password","formControlName","password","placeholder","\xb7\xb7\xb7\xb7\xb7\xb7\xb7\xb7\xb7\xb7\xb7\xb7","aria-describedby","password",1,"form-control"],[1,"input-group-text","cursor-pointer"],[1,"ti","ti-eye-off"],["type","submit",1,"btn","btn-primary","d-grid","w-100",3,"disabled"]],template:function(n,a){1&n&&(o.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"div",3)(4,"div",4)(5,"div",5)(6,"h4",6),o._uU(7,"Login Here"),o.qZA(),o.TgZ(8,"div",7)(9,"a",8)(10,"span",9),o._UZ(11,"img",10),o.qZA()()(),o.TgZ(12,"form",11),o.NdJ("ngSubmit",function(){return a.loginUser()}),o.TgZ(13,"div",12)(14,"label",13),o._uU(15,"Email "),o.qZA(),o._UZ(16,"input",14),o.qZA(),o.TgZ(17,"div",15)(18,"div",16)(19,"label",17),o._uU(20,"Password"),o.qZA(),o.TgZ(21,"a",18)(22,"small"),o._uU(23,"Forgot Password?"),o.qZA()()(),o.TgZ(24,"div",19),o._UZ(25,"input",20),o.TgZ(26,"span",21),o._UZ(27,"i",22),o.qZA()()(),o.TgZ(28,"div",12)(29,"button",23),o._uU(30,"Sign in"),o.qZA()()()()()()()()()),2&n&&(o.xp6(12),o.Q6J("formGroup",a.signinForm),o.xp6(17),o.Q6J("disabled",a.signinForm.invalid))},dependencies:[e._Y,e.Fj,e.JJ,e.JL,e.sg,e.u]});var g=t(5791);const c=[{path:"",redirectTo:"login",pathMatch:"full"},{path:"login",component:r}];class i{}i.\u0275fac=function(n){return new(n||i)},i.\u0275mod=o.oAB({type:i}),i.\u0275inj=o.cJS({imports:[l.ez,g.m,m.Bz.forChild(c)]})}}]);