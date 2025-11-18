class person{
    name = "aaa"

    set_name = (name) =>{
        this.name = name
    }
}

class student{
    std = new person()
    // std.set_name("bbb")
}

console.log(new person().name)