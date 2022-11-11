console.log('I AM BUILDER');

function studentBuilder(name, age) {
    return {
        name,
        age,
        sleep: () => {
            console.log(`No sleep. I am student 🥵`)
        }
    }
}

module.exports = {
    studentBuilder
}
//1 варіант як можна експортувати(НАйкращий)
// module.exports.fName = studentBuilder;

//2 варіант
// module.exports.lesson = 1


//3 варіант
// module.exports = {
//   creator: (name, age) => {
//     return {
//       name,
//       age,
//       sleep: () => {
//         console.log(`No sleep. I am student 🥵`)
//       }
//     }
//   },
//
//   lesson: 'FS'
// }