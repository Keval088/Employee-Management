function Task(data) {
    try {
        if (data < 1) return false

        while (data % 4 === 0) {
            data /= 4
        }
        return data === 1

    } catch (error) {
        console.log("Error:- ", error)
    }
}

console.log(Task(16)) // out put :- true
console.log(Task(5)) // out put :- false
console.log(Task(1)) // out put :- true
