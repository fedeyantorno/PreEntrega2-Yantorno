// BILLETERA VIRTUAL
// Declaramos variables globales
let userSignUpList = [];
let listIncomePesos = [];
let listIncomeDollar = [];
let listSpentPesos = [];
let listSpentDollar = [];
let totalIncomePesos = 0;
let totalIncomeDollar = 0;
let totalSpentPesos = 0;
let totalSpentDollar = 0;
let availableBalancePesos = 0;
let availableBalanceDollar = 0;
const moneyPesos = "$";
const moneyDollar = "u$s";

// Creamos el constructor para registrar usuarios
class UserCreate {
    constructor (signUpName, signUpPass, signUpUserAge) {
        this.id = Date.now();
        this.signUpName = signUpName,
        this.signUpPass = signUpPass,
        this.signUpUserAge = signUpUserAge
    }
};
// Creamos el constructor para registrar ingresos
class DataIncome {
    constructor (date, description, amount) {
        this.id = Date.now();
        this.date = date;
        this.description = description;
        this.amount = amount
    }
};
// Creamos el constructor para registrar gastos
class DataSpent {
    constructor (date, description, amount) {
        this.id = Date.now();
        this.date = date;
        this.description = description;
        this.amount = amount
    }
};

// Validamos la mayoría de edad
const validationAge = () => {

    const signUpUserAge = parseFloat(prompt("Por favor ingrese su edad"));

    if (isNaN(signUpUserAge) || signUpUserAge > 99 ) {
        alert("Por favor ingrese un número válido.");
        validationAge()        
    } else if (signUpUserAge < 18 ) {
        let years = 18 - signUpUserAge;
        alert(`Sos menor de edad, lamentablemente no podés crear una cuenta. \nTe esperamos en ${years} años!`);
        validationAge()
    } else {
        alert("Es mayor de edad, puede empezar a crear su cuenta...");
        // LLamamos la función de crear usuario
        signUp(signUpUserAge)
    }

};

validationAge();

// Pedimos datos para crear usuario 
function signUp(signUpUserAge) {

    let signUpName = prompt("Crear usuario. \nPor favor ingrese un nombre de usuario");
    let signUpPass = prompt("Crear usuario. \nPor favor ingrese una contraseña");

    while (validationInputs(signUpName, signUpPass)) {
        alert(`Complete ambos campos.`);
        signUpName = prompt("Crear usuario. \nPor favor ingrese un nombre de usuario");
        signUpPass = prompt("Crear usuario. \nPor favor ingrese una contraseña");        
    }; 

    const userSignUp = new UserCreate(signUpName, signUpPass, signUpUserAge);    
    // Agregamos al array el usuario registrado
    userSignUpList.push(userSignUp);

    alert(`Bienvenido ${signUpName}. Su cuenta fue creada con éxito, vuelva a ingresar para empezar a operar. Muchas gracias!`);
    // LLamamos la función de logeo y le pasamos los 2 parámetros a comparar
    logIn(userSignUp)

};

function validationInputs(signUpName, signUpPass) {
    if (signUpName === "" || signUpPass === "") {
        return true
    } else {
        return false
    }   
};

// Solicitamos Logeo
function logIn(userSignUp) {
    // Validamos 3 veces los datos de ingreso
    for (let i = 1; i <= 3; i++) {
        const logInUserName = prompt("Ingresar. \nPor favor ingrese su nombre de usuario");
        const logInUserPass = prompt("Ingresar. \nPor favor ingrese su contraseña");

        if (logInUserName !== userSignUp.signUpName || logInUserPass !== userSignUp.signUpPass) {
            alert(`Los datos ingresados son incorrectos. Vuelva a intentarlo. Intento ${i} de 3.`);
        } else {
            alert("Bienvenido");
            // Ya estamos dentro de la billetera
            selectOperation();
            break            
        };
        if (i === 3) { alert("Sus datos fueron bloqueados. Contáctese con el soporte") };
    }
};

// Solicitamos tipo de operación
function selectOperation() {

    let operation = prompt("Elija tipo de operación:\n1 - Agregar dinero en $. \n2 - Agregar dinero en u$s. \n3- Gasto en $. \n4- Gasto en u$s. \n5- Salir.");

    while (operation !== "5") {
        switch (operation) {
            case "1":
                const incomeDate = prompt("Eligió la opción 'Agregar dinero en $'.\nIngrese la fecha");
                const incomeDescription = prompt("Ingrese una descripción breve");
                const incomeAmount = parseFloat(prompt("Ingrese el monto a agregar"));
                addIncome(moneyPesos, incomeDate, incomeDescription, incomeAmount);
                break;
            case "2":
                const incomeDateDollar = prompt("Eligió la opción 'Agregar dinero en u$s'.\nIngrese la fecha");
                const incomeDescriptionDollar = prompt("Ingrese una descripción breve");
                const incomeAmountDollar = parseFloat(prompt("Ingrese el monto a agregar"));
                addIncome(moneyDollar, incomeDateDollar, incomeDescriptionDollar, incomeAmountDollar);
                break;
            case "3":
                const spentDate = prompt("Eligió la opción 'Gasto en $'.\nIngrese la fecha");
                const spentDescription = prompt("Ingrese una descripción breve");
                const spentAmount = parseFloat(prompt("Ingrese el monto a extraer"));
                addSpent(moneyPesos, spentDate, spentDescription, spentAmount);
                break;
            case "4":
                const spentDateDollar = prompt("Eligió la opción 'Gasto en u$s'.\nIngrese la fecha");
                const spentDescriptionDollar = prompt("Ingrese una descripción breve");
                const spentAmountDollar = parseFloat(prompt("Ingrese el monto a extraer"));
                addSpent(moneyDollar, spentDateDollar, spentDescriptionDollar, spentAmountDollar);
                break;
            default:
                alert("El valor ingresado no es válido, ingrese una opción de la lista. \nGracias.");
        }
        operation = prompt("Elija tipo de operación:\n1 - Agregar dinero en $. \n2 - Agregar dinero en u$s. \n3- Gasto en $. \n4- Gasto en u$s. \n5- Salir.");
    };

    balance(totalIncomePesos, totalSpentPesos, totalIncomeDollar, totalSpentDollar);

    alert("¡Lo esperamos pronto!");
};


// Agregamos ingresos
function addIncome(money, date, description, amount) {  
    
    if (money === "$") {

        listIncomePesos.push(new DataIncome(date, description, amount));
        totalIncomePesos = listIncomePesos.reduce((acumulador, item) => acumulador + item.amount, 0);

        const listIncomePesosPack = listIncomePesos.map((element) => `\nFecha: ${element.date} - Descripción: ${element.description} - $ ${element.amount}`);
    
        alert(`Sus ingresos en $ son: ${listIncomePesosPack} \n\nTotal ingresos en $: ${totalIncomePesos}`);

    } else {

        listIncomeDollar.push(new DataIncome(date, description, amount));
        totalIncomeDollar = listIncomeDollar.reduce((acumulador, item) => acumulador + item.amount, 0);

        const listIncomeDollarPack = listIncomeDollar.map((element) => `\nFecha: ${element.date} - Descripción: ${element.description} - u$s ${element.amount}`);
    
        alert(`Sus ingresos en u$s son: ${listIncomeDollarPack} \n\nTotal ingresos en u$s: ${totalIncomeDollar}`);

    }
};

// Agregamos gastos
function addSpent(money, date, description, amount) {

    if (money === "$") {

        listSpentPesos.push(new DataSpent(date, description, amount));
        totalSpentPesos = listSpentPesos.reduce((acumulador, item) => acumulador + item.amount, 0);

        const listSpentPesosPack = listSpentPesos.map((element) => `\nFecha: ${element.date} - Descripción: ${element.description} - $ ${element.amount}`);
    
        alert(`Sus gastos en $ son: ${listSpentPesosPack} \n\nTotal gastos en $: ${totalSpentPesos}`);
        
    } else {

        listSpentDollar.push(new DataSpent(date, description, amount));
        totalSpentDollar = listSpentDollar.reduce((acumulador, item) => acumulador + item.amount, 0);

        const listSpentDollarPack = listSpentDollar.map((element) => `\nFecha: ${element.date} - Descripción: ${element.description} - u$s ${element.amount}`);
    
        alert(`Sus gastos en u$s son: ${listSpentDollarPack} \n\nTotal gastos en u$s: ${totalSpentDollar}`);
        
    }
};

// Calculamos saldos disponibles
function balance (totalIncomePesos, totalSpentPesos, totalIncomeDollar, totalSpentDollar) {

    availableBalancePesos = totalIncomePesos - totalSpentPesos;
    availableBalanceDollar = totalIncomeDollar - totalSpentDollar;
    alert(`Saldo disponible en $ ${availableBalancePesos} \n\nSaldo disponible en u$s ${availableBalanceDollar}`);
    
};