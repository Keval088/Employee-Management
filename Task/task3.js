function Task(...data) {
    try {
        return [].concat(...data)
    } catch (error) {
        console.log("Error:- ", error)
    }
}

const arr1 = [[1, 5], [44, 67, 3], [2, 5], [7], [4], [3, 7], [6]]
console.log(Task(...arr1)) // out put :- [1, 5, 44, 67, 3, 2, 5, 7, 4, 3, 7, 6]

const arr2 = [[4, 4, 4, 4, 4]]
console.log(Task(...arr2)) // out put :- [4,4,4,4,4]

const arr3 = [[1], [2], [6], [9], [7]]
console.log(Task(...arr3)) // out put :- [1,2,6,9,7]