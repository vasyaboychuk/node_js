const fs = require('node:fs');
const builder = require('./stude/createStudent');


//зчитування файлу
// fs.readFile('./text.txt', (err, data) => {
//   console.log(err, 'ERR');
//
//   console.log(data.toString());
// });
//

//додавання інфи в файл.дописує до інсуючого файлу якісь дані
// fs.appendFile('./text.txt', 'HELLO CHAT \n', (err) => {
//   console.log('ERR', err);
// })
//

//перезаписує все в файлі.Стираю всі дані які були і записує які ми йому дамо
// fs.writeFile('./text.txt', 'WRITE FILE', (err) => {
//   console.log('ERR', err)
// })
//

//тут ми скопіювали text.txt в copy.txt
// fs.readFile('./text.txt', (err, data) => {
//   fs.appendFile('./copy.txt', data, () => {})
// })
//

//тут ми створили директорію students за допомогою mkdir
// fs.mkdir('./students', (err) => {
//   console.log(err);
// })
//

//тут ми створили файл відразу в директорії students і записали інфу name:'Dima'
// fs.appendFile('./students/data.json', JSON.stringify({name: 'Dima'}), (err) => {
//   console.log(err);
// })
//

//за допомогою truncate ми можемо очищати інфу в файлі
// fs.truncate('./copy.txt', (err) => {
//   console.log(err);
// })
//

//за допомогою unlink ми можемо видаляти файли
// fs.unlink('./copy.txt', (err) => {
//   console.log(err);
// })
//

// за допомогою rmdir ми можемо видаляти директорію але тільки порожню.Щоб видалити не порожню
//потрібно використати {recursive:true} в options
// fs.rmdir('./students', { recursive: true }, err => {
//   console.log(err);
// })
//

//за допомогою rename  можна перейменовувати файли або директорії
// fs.rename('./text.txt', './users.js', (err) => {
//   console.log(err);
// })
//
//також за допомогою rename можна переносити файлі
// fs.rename('./users.js', './stude/users.json', (err) => {
//   console.log(err);
// });
//
// fs.rename('./stude/users.json', './users.json', (err) => {
//   console.log(err);
// });
//

//можна копіювати файли за допомогою copyFile
// fs.copyFile('./users.json', './copy.json', err => {
//   console.log(err);
// })
//

//також ще за допомогою appendFile можна створювати нові файли
// fs.appendFile('./dasha.txt', 'My name is Darinka', err =>  {
//   console.log(err);
// })

fs.readdir('./stude', (err, files) => {
    console.log(files);

    for (const fileName of files) {
        fs.stat(`./stude/${fileName}`, (err1, stats) => {
            console.log('___________');
            console.log(`./stude/${fileName}`);
            console.log(stats.isDirectory());

            if (stats.isFile()) {
                fs.readFile(`./stude/${fileName}`, (err2, data) => {
                    console.log(data.toString());
                });
            }
        })
    }
});

fs.readdir('./stude', { withFileTypes: true }, (err, files) => {
    console.log(files);

    for (const file of files) {
        console.log(file.isFile());
    }
});

// console.log(builder);
//
// let student1 = builder.studentBuilder('Sonya', 16);
//
// console.log(student1.age);
// console.log(student1.name);