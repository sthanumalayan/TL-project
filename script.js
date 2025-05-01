function correctedDoubleStubMatch(r,x){
    const denominator=r*r+x*x;
    const gL=r/denominator;
    const bL=-x/denominator;
    const t=-1;
    const discriminant=(1 + t*t)*gL-(gL * t)*(gL * t);
    if (discriminant < 0) {
        console.error("Discriminant is negative, no real solution.");
        return null;
    }
    const sqrt_term=Math.sqrt(discriminant);
    const B1_1=(-bL+(1/t)+(1/t)*sqrt_term);
    const B1_2=(-bL+(1/t)-(1/t)*sqrt_term);

    const b_total_1=bL+B1_1;
    const b_total_2=bL+B1_2;

    return [Number(b_total_1.toFixed(4)),Number(b_total_2.toFixed(4))];
}
function doubleStubMatchFinal(r,x) {
    const denom=r*r+x*x;
    const gL=r/denom;                      //g=r/(r²+x²)
    const bL=-x/denom;                     //b=-x/(r²+x²)

    const t=-1;  //3λ/8 spacing (270° rotation)

    const discriminant=(1+t*t)*gL-(gL*t)**2;
    if (discriminant<0)return null; // Forbidden region check
    const sqrtTerm=Math.sqrt(discriminant);

    const B1_1=(-bL+(1/t)+(1/t)*sqrtTerm);
    const B1_2=(-bL+(1/t)-(1/t)*sqrtTerm);

    const getStub=B => {
        const isOpen=B>=0;
        const absB=Math.abs(B);
        const len=(1/(2*Math.PI))*(isOpen ? 
            Math.atan(absB) :          // Open: L = (λ/2π) arctan(B)
            Math.atan(1/absB)          // Short: L = (λ/2π) arctan(1/|B|)
        );
        return{ 
            len: len.toFixed(4)+'λ', 
            type: isOpen ? 'open' : 'short' 
        };
    };

    return [B1_1, B1_2].map(B1 => {
        const Y1_imag = bL + B1;
        const num_imag = Y1_imag + t;
        const den_real = 1 - Y1_imag*t;
        const den_imag = gL*t;
        const denMagSq = den_real**2 + den_imag**2;
        const Y2_imag = (num_imag*den_real - gL*den_imag)/denMagSq;
        const B2 = -Y2_imag;

        return {
            B1: B1.toFixed(4),
            B2: B2.toFixed(4),
            stub1: getStub(B1),
            stub2: getStub(B2)
        };
    });
}

function angle(degrees){
    if(degrees<0){
        let initial=180+degrees;
        let rem=270-initial;
        //-65 --> -180 (115 co; 155 rem)--> 25
        //-145 --> -180 (35 co; 235 rem) 180--> 0 (215 cov; 55 rem)--> -55
        if(rem<=180){
            return 180-rem;
        }
        else{
            return 180-rem;
        }
    }
    else{
        let initial=degrees;
        let rem=270-initial;
        if(rem<=180){
            return -rem;
        }
        else{
            let stillrem=rem-180;
            return 180-stillrem;
        }
    }
}
function calc(r, x) {
    let g = r / (r*r + x*x);
    let b = -x / (r*r + x*x);
    return {g, b};
}

function limitDecimals(e) {
    let text = e.target;
    let decimal = text.value;
    if(decimal.includes('.')){
        let num = decimal.split('.');
        if(num[1].length > 2){
            text.value = num[0] + '.' + num[1][0] + num[1][1];
        }
    }
}

let R_input = document.getElementById("R");
let X_input = document.getElementById("X");
R_input.addEventListener("input", limitDecimals);
X_input.addEventListener("input", limitDecimals);

let button = document.getElementById("submit");
let output = document.getElementById("output");

let g_div = document.getElementById("g");
let b_div = document.getElementById("b");
let B1_div = document.getElementById("B1");
let B2_div = document.getElementById("B2");
let reset = document.getElementById("reset");

let B1_length1_div=document.getElementById("B1_length1");
let B1_length2_div=document.getElementById("B1_length2");
let B2_length1_div=document.getElementById("B2_length1");
let B2_length2_div=document.getElementById("B2_length2");

let B1_val_div=document.getElementById("B1_val");
let B2_val_div=document.getElementById("B2_val");

let a1=document.getElementById("a1");
let a2=document.getElementById("a2");

let a1_final=document.getElementById("a1_final");
let a2_final=document.getElementById("a2_final");

let stub1=document.getElementById("stub1");
let stub2=document.getElementById("stub2");

let B1_len_container=document.getElementById("B1_length_container");
let B2_len_container=document.getElementById("B2_length_container");
let lengths_div=document.getElementById("lengths");
output.style.visibility="hidden";
B1_len_container.style.visibility="hidden";
B2_len_container.style.visibility="hidden";
lengths.style.visibility="hidden";  
button.addEventListener("click", () => {
    const itr = calc(Number(R_input.value), Number(X_input.value));
    let g = itr.g;
    let b = itr.b;

    output.style.visibility = "visible";
    g = Number(g.toFixed(2));
    b = Number(b.toFixed(2));
    g_div.innerText = g;
    b_div.innerText = b;

    const values = correctedDoubleStubMatch(Number(R_input.value),Number(X_input.value));
    B1_div.innerText = values[0];
    B2_div.innerText = values[1];


    const lengths=doubleStubMatchFinal(R_input.value,X_input.value);
    console.log(lengths);
    B1_val_div.innerText='B1: '+values[0];
    B2_val_div.innerText='B2: '+values[1];
    lengths_div.style.visibility="visible";
})


stub1.addEventListener("click",()=>{
    const lengths=doubleStubMatchFinal(R_input.value,X_input.value);
    
    B1_length1_div.innerText='L1: '+lengths[0].stub1.len+'('+lengths[0].stub1.type+')';
    B1_length2_div.innerText='L2: '+lengths[0].stub2.len+'('+lengths[0].stub2.type+')';

    let angle1=a1.value;
    a1_final.innerText='FINAL ANGLE: '+angle(Number(angle1));
    B1_len_container.style.visibility="visible";
})
stub2.addEventListener("click",()=>{
    const lengths=doubleStubMatchFinal(R_input.value,X_input.value);
    console.log(lengths);
    B2_length1_div.innerText='L1: '+lengths[1].stub1.len+'('+lengths[1].stub1.type+')';
    B2_length2_div.innerText='L2: '+lengths[1].stub2.len+'('+lengths[1].stub2.type+')';

    let angle2=a2.value;
    a2_final.innerText='FINAL ANGLE: '+angle(Number(angle2));
    B2_len_container.style.visibility="visible";
})
reset.addEventListener("click", () => {
    output.style.visibility = "hidden";
    B1_len_container.style.visibility="hidden";
    B2_len_container.style.visibility="hidden";
    lengths.style.visibility="hidden";
});
