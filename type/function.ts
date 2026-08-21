function mutiplicar (n1: number, n2: number) : number{
    return n1 * n2;
}

//console.log(mutiplicar(2, 1));

let mutiplicar2 = function (n1: number, n2: number): number{
    return n1 * n2;
}

//console.log(mutiplicar2(2, 1));

let mutiplicar3 = (n1: number, n2: number) => n1*n2;

//console.log(mutiplicar3(2, 1));

let materiais = [ "hidrogênio", "helio", "litio", "berilio"];

//materiais.forEach( material => console.log(material));

function map(f: (x:number) => number, arr: number[]){
    let result = [];
    let i;

    for (i = 0; i < arr.length; i++){
        result[i] = f(arr[i]);
    }

    return result;
}

console.log(map((x:number) => x*x*x, [0,1,2,5,10]));