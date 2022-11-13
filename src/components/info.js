import React from 'react';
function Info() {
    let user;
    if (localStorage.getItem('user')) {
        user = JSON.parse(localStorage.getItem('user'))
    }

    const fixFields = (field, idx) => {
        if (idx == 0) {

        } else if (idx == 4) {

        } else if (idx == 7) {

        } else {
            console.log(field, idx);
            return (<td>{field}</td>)
        }
    }
    const data = []
    for (const key in user) {
        if (key === 'address') {
            const addres = []
            for (const key1 in user.address) {
                addres.push(<div><h3>{key1}</h3><h4>{user.address[key1] + ''}</h4></div>);
            }
            data.push(addres)
        } else if (key === 'company') {
            const company = []
            for (const key1 in user.company) {
                company.push(<div><h3>{key1}</h3><h4>{user.company[key1] + ''}</h4></div>);
            }
            data.push(company)

        } else {
            data.push(<div><h1>{key}</h1><h2>{user[key] + ''}</h2></div>);
        }
    }


    function getData(obj) {
        return Object.entries(obj)
            .filter((e) => typeof e[1] === 'string')
            .map(([key, value], idx) => <h3 key={idx}>{key}: {value}<br /></h3>);
    }
    
    
    let userData = getData(user)
    let userAddress = getData(user.address)
    let userCompany = getData(user.company)
    let userGeo = getData(user.address.geo)
    console.log(userData);
    
    return (<div>
        <h2>info</h2>
        {data}
        ----
       {userData}
    </div>
    );
}

export default Info;