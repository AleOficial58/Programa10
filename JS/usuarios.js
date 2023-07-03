const DB_USUARIOS = [
    {   id: 1,
        username: "Miguel",
        password: "1234",
        first_name: "Miguel Angel",
        last_name: "Gonzalez",
        email: "miguel@gmail.com"
    },
    
    {   id: 2,
        username: "Alan",
        password: "1234",
        first_name: "Alan",
        last_name: "Borgo",
        email: "miguel@gmail.com"
    }

]

localStorage.setItem('usuarios', JSON.stringify(DB_USUARIOS))

