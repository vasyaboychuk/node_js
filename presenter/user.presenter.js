//для того щоб фільтрувати дані які хочемо віддати
    const normalize=(user)=>{
    // user=user.toJSON();//тому що тут нам вертається монгівський юзер
    //     const arr = [
    //         'password',
    //         '__v'
    //     ];
    //     arr.forEach(field=>{
    //         delete user[field];
    //     })
    //     return user
    // };
        //але быльше пишуть не те що треба вирізати а те що має бути
        return {
            name: user.name,
            email: user.email,
            age: user.age,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        };
    }
    const normalizeMany=(users)=>{
        return users.map(user=>normalize(user))

    }

module.exports={
    normalize,
    normalizeMany
}
//1.08