// calculadora impuestos steam argentina

const select = document.getElementById("provinciaSelect");
const error = document.getElementById("error");
const button = document.getElementById("button");
const price = document.getElementById("price");

const impuestoProvincia = [
    { porcentaje: 1.02, provincia: "Buenos Aires" },
    { porcentaje: 1.02, provincia: "CABA" },
    { porcentaje: 1.03, provincia: "Córdoba" },
    { porcentaje: 1.01, provincia: "La Pampa" },
    { porcentaje: 1.05, provincia: "Río Negro" },
    { porcentaje: 1.036, provincia: "Salta" },
    { porcentaje: 1.055, provincia: "Chaco" },
    { porcentaje: 1.01, provincia: "Catamarca" },
    { porcentaje: 1.01, provincia: "Chubut" },
    { porcentaje: 1.01, provincia: "Corrientes" },
    { porcentaje: 1.01, provincia: "Entre Ríos" },
    { porcentaje: 1.01, provincia: "Formosa" },
    { porcentaje: 1.01, provincia: "Jujuy" },
    { porcentaje: 1.01, provincia: "La Rioja" },
    { porcentaje: 1.01, provincia: "Mendoza" },
    { porcentaje: 1.01, provincia: "Misiones" },
    { porcentaje: 1.01, provincia: "Neuquén" },
    { porcentaje: 1.01, provincia: "San Juan" },
    { porcentaje: 1.01, provincia: "San Luis" },
    { porcentaje: 1.01, provincia: "Santa Cruz" },
    { porcentaje: 1.01, provincia: "Santa Fe" },
    { porcentaje: 1.01, provincia: "Santiago del Estero" },
    { porcentaje: 1.01, provincia: "Tierra del Fuego" },
    { porcentaje: 1.01, provincia: "Tucumán" }
];

impuestoProvincia.forEach(provincia => {
    const option = document.createElement("option");
    option.text = provincia.provincia;
    option.classList.add("provincia");
    select.appendChild(option);
});

select.addEventListener("change", function(){
    localStorage.clear();
    let provinciaSelect = this.value;
    localStorage.setItem("Provincia" , provinciaSelect)
})

window.onload = function() {
    let Provincia = localStorage.getItem('Provincia');
    if (Provincia) {
        select.value = Provincia;
    }
};

button.addEventListener("click", function(event) {
    event.preventDefault();
    error.style.display = "none";
    let provinciaSelect = document.getElementById("provinciaSelect").value;
    let amount = document.getElementById("amount").value;
    if (verificarPrecio(amount)){
        impuestoProvincia.forEach(async function(provincia){
            if(provinciaSelect === provincia.provincia){
                    precioConImpuesto = await impuesto(amount, provincia.porcentaje);
                    price.textContent = `$${precioConImpuesto} ARS`;
                };
            }
        )
    }else{
        error.style.display = "block";
    }
});

async function impuesto(precio, impuestoProvincia){
    let dolar = 0;
    const ventaDolar = await obtenerVentaDolar();
    if (ventaDolar !== null) {
        let impuestoPais = 1.08;
        let iva = 1.21;
        let ganancias = 1.3;
        dolar = ventaDolar;
        let precioConImpuesto = precio * dolar * impuestoProvincia * impuestoPais * iva * ganancias;
        return precioConImpuesto.toFixed(2).toString().split('.');
    }
}

async function obtenerVentaDolar() {
    try {
        const response = await fetch("https://dolarapi.com/v1/dolares/blue");
        const data = await response.json();
        return data.venta;
    } catch (error) {
        return null;
    }
}

function verificarProvincia(inputprovincia) {
    const provinciaEncontrada = impuestoProvincia.find(provincia => provincia.provincia.toLowerCase() === inputprovincia.toLowerCase());
    return provinciaEncontrada !== undefined;
}

function verificarPrecio(precio){
    return precio > 0 && precio < 9999;
}
