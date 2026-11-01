// Shared front-end interactions and demo data. No backend/API is connected.
const demoUsers = {
  player: {name:"Alex Morgan", email:"player@gccarena.com", password:"arena123"},
  coach: {name:"Daniel Reed", email:"coach@gccarena.com", password:"arena123"},
  admin: {name:"Arena Admin", email:"admin@gccarena.com", password:"arena123"}
};
function toast(message){let el=document.querySelector('.toast');if(!el){el=document.createElement('div');el.className='toast';document.body.appendChild(el)}el.textContent=message;el.classList.add('show');setTimeout(()=>el.classList.remove('show'),2600)}
function logout(){localStorage.removeItem('gccSession');location.href='index.html'}
function getSession(){try{return JSON.parse(localStorage.getItem('gccSession'))}catch(e){return null}}
function login(role,email,password){const user=demoUsers[role];if(email===user.email&&password===user.password){localStorage.setItem('gccSession',JSON.stringify({role,name:user.name,email:user.email}));location.href=`${role}-dashboard.html`;return true}return false}
document.addEventListener('DOMContentLoaded',()=>{
  document.querySelectorAll('[data-toggle-password]').forEach(btn=>btn.addEventListener('click',()=>{const input=document.getElementById(btn.dataset.togglePassword);input.type=input.type==='password'?'text':'password';btn.textContent=input.type==='password'?'SHOW':'HIDE'}));
  const form=document.querySelector('[data-login-form]');
  if(form)form.addEventListener('submit',e=>{e.preventDefault();const role=form.dataset.role;const email=form.querySelector('[name=email]').value.trim();const password=form.querySelector('[name=password]').value;const error=form.querySelector('.auth-error');if(!login(role,email,password)){error.textContent='The email or password is incorrect. Use the demo credentials shown below.';error.classList.add('show')}});
  document.querySelectorAll('[data-logout]').forEach(b=>b.addEventListener('click',logout));
  document.querySelectorAll('[data-toast]').forEach(b=>b.addEventListener('click',()=>toast(b.dataset.toast)));
  document.querySelectorAll('[data-session-name]').forEach(el=>{const s=getSession();if(s)el.textContent=s.name});
  document.querySelectorAll('[data-session-role]').forEach(el=>{const s=getSession();if(s)el.textContent=s.role.toUpperCase()});
  document.querySelectorAll('[data-search-table]').forEach(input=>input.addEventListener('input',()=>{const table=document.getElementById(input.dataset.searchTable);const q=input.value.toLowerCase();table.querySelectorAll('tbody tr').forEach(row=>row.style.display=row.innerText.toLowerCase().includes(q)?'':'none')}));
});
