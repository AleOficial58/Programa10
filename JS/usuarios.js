const DB_USUARIOS = [
    {   id: 1,
        username: "Miguel",
        password: "JUAN316",
        first_name: "Miguel Angel",
        last_name: "Borgo",
        email: ""
    },
    
    {   id: 2,
        username: "Alan",
        password: "SALMOS234",
        first_name: "Alan",
        last_name: "Benjamin Borgo",
        email: "miguel@gmail.com"
    }

]

localStorage.setItem('usuarios', JSON.stringify(DB_USUARIOS))

