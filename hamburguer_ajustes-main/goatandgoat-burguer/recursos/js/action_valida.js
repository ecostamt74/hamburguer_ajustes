function valida(){
    const nome = document.querySelector("#nome")
    const cpf  = document.querySelector("#cpf")
    const telefone = document.querySelector("#telefone")
    const email = document.querySelector("#email")

    
     if(nome.value == '' ){
        window.alert("O nome deve ser informado")
        
    } 
    if(nome.value.length < 3 ){
        window.alert("O nome deve ter mais que três caracteres")
    }
    if(cpf.value == ''){

    }
    if(cpf.value.length != 11){
        alert("O cpf deve ser informado é invalido")
    }
    if(telefone.value == ''){
        alert("O telefone deve ser informado")
    }
    if(telefone.value.length < 8){
        alert("O telefone informado é invalido")
    }
    if(email.value == ''){

    }


    
}