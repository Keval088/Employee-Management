const Task = function (s) {
    try {
        let letters = s.split('').filter(c => c.charCodeAt(0) >= 33 && c.charCodeAt(0) <= 122 && c !== '\\' && c !== '\"')
        let currentPosition = 0
        let stringLength = letters.length - 1
        s = s.split('')
        while (currentPosition < stringLength) {
            if (!('a' <= s[currentPosition] && s[currentPosition] <= 'z' || 'A' <= s[currentPosition] && s[currentPosition] <= 'Z')) {
                currentPosition++
            } else if (!('a' <= s[stringLength] && s[stringLength] <= 'z' || 'A' <= s[stringLength] && s[stringLength] <= 'Z')) {
                stringLength--
            }
            else {
                [s[currentPosition], s[stringLength]] = [s[stringLength], s[currentPosition]]
                currentPosition++
                stringLength--
            }
        }
        return s.filter(c => c.charCodeAt(0) >= 33 && c.charCodeAt(0) <= 122 && c !== '\\' && c !== '\"').join('')
    } catch (error) {
        console.log("Error:- ", error)
    }
};

console.log(Task('ab-cd')) // out put :- dc-ba 

console.log(Task('a-bC-dEf-ghIj')) // out put :- j-Ih-gfE-dCba