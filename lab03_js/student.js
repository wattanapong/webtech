let student = {
    'titleEn': 'Mr.',
    'fnameEn': 'KORAWIT',
    'lnameEn': 'PORNPHANTHIWA',
    'titleTh': 'นาย',
    'fnameTh': 'กรวิชญ์',
    'lnameTh': 'พรพรรณทิวา',
    'code': '65021284',
    'grade': 'A'
}

// console.log(student)
// console.log('%s%s %s (%s%s %s) %s', student.titleEn, student.fnameEn, student.lnameEn,
// student.titleTh, student.fnameTh, student.lnameTh, student.code)

let students = [
    {
        'titleEn': 'Miss',
        'fnameEn': 'KAMONAPAR',
        'lnameEn': 'NGAOPAN',
        'titleTh': 'นางสาว',
        'fnameTh': 'กมลณภา',
        'lnameTh': 'หง้าพันธ',
        'code': '65021273',
        'grade': 'A'
    },
    {
        'titleEn': 'Mr.',
        'fnameEn': 'KORAWIT',
        'lnameEn': 'PORNPHANTHIWA',
        'titleTh': 'นาย',
        'fnameTh': 'กรวิชญ์',
        'lnameTh': 'พรพรรณทิวา',
        'code': '65021284',
        'grade': 'B+'
    }
]

for (std of students) {
    console.log('%s%s %s (%s%s %s) %s', std.titleEn, std.fnameEn, std.lnameEn,
        std.titleTh, std.fnameTh, std.lnameTh, std.code)
}
console.log('+'.repeat(30))

for (std of students) {
    student_info = ''
    for (key in std){
        student_info += std[key] + " "
    }
    console.log(student_info)
    console.log('-'.repeat(30))
}