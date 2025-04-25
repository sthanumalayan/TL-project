function calc(p,q){
    g=p/(p*p+q*q);
    b=-q/(p*p+q*q);
    return {g,b};
}
function limitDecimals(e){
    let text=e.target;
    let decimal=text.value;
    if(decimal.includes('.')){
        let num=decimal.split('.');
        if(num[1].length>2){
            text.value = num[0] + '.' + num[1][0] + num[1][1];
        }
    }
}
let R_input=document.getElementById("R");
let X_input=document.getElementById("X");
R_input.addEventListener("input",limitDecimals);
X_input.addEventListener("input",limitDecimals);
let button=document.getElementById("submit");
let output=document.getElementById("output");
output.style.visibility="hidden";
let g_div=document.getElementById("g");
let b_div=document.getElementById("b");
let B1_div=document.getElementById("B1");
let B2_div=document.getElementById("B2");
let reset=document.getElementById("reset");
button.addEventListener("click",()=>{
    const itr=calc(R_input.value,X_input.value);
    let g=itr.g;
    let b=itr.b;
    // console.log({g,b});
    output.style.visibility="visible";
    g=Number(g.toFixed(2));
    b=Number(b.toFixed(2));
    g_div.innerText=g;
    b_div.innerText=b;
    let B1=-b+Math.sqrt(2*g-g*g);
    let B2=-b-Math.sqrt(2*g-g*g);
    B1 = Number(B1.toFixed(2));
    B2 = Number(B2.toFixed(2));
    B1_div.innerText=B1;
    B2_div.innerText=B2;
    //console.log({B1,B2});
})

reset.addEventListener("click",()=>{
    output.style.visibility="hidden";
});

