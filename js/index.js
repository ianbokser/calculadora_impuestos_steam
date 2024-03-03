// calculadora impuestos steam argentina

let precio = Number(prompt("ingrese el precio del producto de steam"));

const provincias = ["buenos aires", "caba", "cordoba", "la pampa", "rio negro", "salta", "chaco", "catamarca", "chubut", "corrientes", "entre Rios", "formosa", "jujuy", "la rioja", "mendoza", "misiones", "neuquen", "san juan", 
    "san luis", "santa cruz", "santa fe", "santiago del estero", "tierra del fuego", "tucuman"]
const impuestoProvincia = [1.02, 1.02, 1.03, 1.01, 1.05, 1.036, 1.055, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01];
const cantProvincias = provincias.length;

if (precio > 0){
    let provincia = prompt("Indique su provincia").toLowerCase();
    let encotroProvincia = true;
    let precioConImpuesto;
    for (let i=0; i <= cantProvincias; i++){
        if(provincia === provincias[i]){
            precioConImpuesto = impuesto(precio, impuestoProvincia[i]);
            encotroProvincia = false;
        };
    };

    if (encotroProvincia){
        alert("ingrese una provincia valida");
    }else{
        console.log("el precio final es: ", precioConImpuesto);
    }
}else{
    alert("ingrese un valor valido")
}

function impuesto(precio, impuestoProvincia){
    let impuestoPais = 1.08;
    let iva = 1.21;
    let afip = 1.45;
    let precioConImpuesto = precio * impuestoProvincia * impuestoPais * iva * afip;
    return precioConImpuesto;
}
