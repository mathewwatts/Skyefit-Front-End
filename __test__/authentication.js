const axios = require('axios')

const url = 'http://localhost:5000'

const headersAppJson = {
    headers: {
        'content-type': 'application/json'
    }
}

const headers = {
    headers: {
        'content-type': 'application/json',
        'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWQiOiI1YzQ2Njk3OGQ1NTJiYzA5YzVjN2VkY2MiLCJpYXQiOjE1NDk1MDA3NDQsImV4cCI6MTU0OTU4NzE0NH0.gYbvIDZjdr5_25SfL9gtcLXcH63Ed_kqKhe-EtdVRlQ'
    }
}

const badToken = {
    headers: { 
        'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWQiOiI1YzQ2Njk3OGQ1NTJiYzA5YzVjN2VkY2MiLCJpYXQiOjE1NDk1MDA3NDQsImV4cCI6MTU0OTU4NzE0NH0.gYbvIDZjdr5_25SfL9gtcLXcH63Ed_kqKhe-EtdVRl'
    }
}

const adminLogin = {
    'username': 'admin',
    'password': 'password'
}

const adminLoginFail = {
    'username': 'admin',
    'password': 'passwor'
}

const newUser = {
    "user": {
        "username": "johndoe",
        "password": "password",
        "contact": {
            "email": "johndoe@gmail.com",
            "contactNumber": "0412 345 678"
        },
        "personalAttribute": {
            "firstName": "John",
            "lastName": "Doe",
            "dob": "1990-01-01",
            "gender": "Male",
            "height": 175,
            "weight": [55],
            "bodyFat": [15],
            "fatMass": [],
            "leanMass": [],
            "goalWeight": 75,
            "goalBodyFat": 11,
            "goal": "Gain weight"
        },
        "notes": "N/A",
        "transactionalHistory": [],
        "remainingSessions": 0,
        "sessions": [],
        "diertaryRequirements": [],
        "mealPlans": []
    }
}

const editUser = {
    "user": {
        "username": "johndoe",
        "password": "password",
        "contact": {
            "email": "new johndoe@gmail.com",
            "contactNumber": "0412 345 678"
        },
        "personalAttribute": {
            "firstName": "John",
            "lastName": "Doe",
            "dob": "1990-01-01",
            "gender": "Male",
            "height": 175,
            "weight": [10],
            "bodyFat": [10],
            "fatMass": [10],
            "leanMass": [10],
            "goalWeight": 10,
            "goalBodyFat": 10,
            "weightLog": [10],
            "bodyFatLog": [10],
            "goal": "new Gain weight"
        },
        "_id": "5c5b897928c3d63cd565b890",
        "notes": "new Notes",
        "transactionalHistory": [],
        "remainingSessions": 0,
        "sessions": [],
        "diertaryRequirements": [],
        "mealPlans": []
    }
}

const malePinches = {
    "chest": "3",
    "abdomen": "3",
    "thigh": "3",
    "dob": "2000-01-01",
    "weight": "70"
}

const femalePinches = {
    "tricep": "3",
    "suprailiac": "3",
    "thigh": "3",
    "dob": "2000-01-01",
    "weight": "70"
}

const testAdminLogin = () => {
    axios.post(`${url}/login/admin`, adminLogin, headersAppJson)
        .then(resp => {
            if(resp.status === 200) {
                console.log('Admin login: Passed')
            } else {
                console.log('Admin login: Failed')
            }
        })
        .catch(err => console.log('Admin login: Failed'))
}

const testAdminLoginFail = () => {
    axios.post(`${url}/login/admin`, adminLoginFail, headersAppJson)
        .then(resp => {
            if(resp.status === 200) {
                console.log('Admin login fail: Failed')
            } else {
                console.log('Admin login fail: Passed')
            }
        })
        .catch(err => console.log('Admin login fail: Passed'))
}

const testAdminInfo = () => {
    axios.get(`${url}/admin/admin`, headers)
        .then(resp => {
            if(resp.status === 200) {
                console.log('Acquired admin details: Passed')
            } else {
                console.log('Acquired admin details: Failed')
            }
        })
        .catch(err => console.log('Acquired admin details: Failed'))
}

const testAdminInfoFail = () => {
    axios.get(`${url}/admin/admin`, badToken)
        .then(resp => {
            if(resp.status === 200) {
                console.log('Acquired admin details fail: Failed')
            } else {
                console.log('Acquired admin details fail: Passed')
            }
        })
        .catch(err => console.log('Acquired admin details fail: Passed'))
}

const testAdminUsers = () => {
    axios.get(`${url}/admin/users`, headers)
        .then(resp => {
            if(resp.status === 200) {
                console.log('Acquired all users as admin: Passed')
            } else {
                console.log('Acquired all users as admin: Failed')
            }
        })
        .catch(err => console.log('Acquired all users as admin: Failed'))
}

const testAdminUsersFail = () => {
    axios.get(`${url}/admin/users`, badToken)
        .then(resp => {
            if(resp.status === 200) {
                console.log('Acquired all users as admin fail: Failed')
            } else {
                console.log('Acquired all users as admin fail: Passed')
            }
        })
        .catch(err => console.log('Acquired all users as admin fail: Passed'))
}

const testAdminUser = () => {
    axios.get(`${url}/admin/users/5c45259d757c6e34eb703a75`, headers)
        .then(resp => {
            if(resp.status === 200) {
                console.log('Acquired user details as admin: Passed')
            } else {
                console.log('Acquired user details as admin: Failed')
            }
        })
        .catch(err => console.log('Acquired user details as admin: Failed'))
}

const testAdminUserFail = () => {
    axios.get(`${url}/admin/users/5c45259d757c6e34eb703a75`, badToken)
        .then(resp => {
            if(resp.status === 200) {
                console.log('Acquired user details as admin fail: Failed')
            } else {
                console.log('Acquired user details as admin fail: Passed')
            }
        })
        .catch(err => console.log('Acquired user details as admin fail: Passed'))
}

const testAdminCreateUser = () => {
    axios.post(`${url}/admin/users/new`, newUser, headers)
        .then(resp => {
            if(resp.status === 200) {
                console.log('Created new user as admin: Passed')
            } else {
                console.log('Created new user as admin: Failed')
            }
        })
        .catch(err => {
            console.log('Created new user as admin: Failed', err.response.data)
        })
}

const testAdminCreateUserFail = () => {
    axios.post(`${url}/admin/users/new`, newUser, headers)
        .then(resp => {
            if(resp.status === 200) {
                console.log('Created new user as admin fail: Failed')
            } else {
                console.log('Created new user as admin fail: Passed')
            }
        })
        .catch(err => console.log('Created new user as admin fail: Passed'))
}

const testAdminEditUser = () => {
    axios.put(`${url}/admin/users/edit`, editUser, headers)
        .then(resp => {
            if(resp.status === 200) {
                console.log('Edited user as admin: Passed')
            } else {
                console.log('Edited user as admin: Failed')
            }
        })
        .catch(err => console.log('Edited user as admin: Failed'))
}

const testAdminEditUserFail = () => {
    axios.put(`${url}/admin/users/edit`, editUser, badToken)
        .then(resp => {
            if(resp.status === 200) {
                console.log('Edited user as admin fail: Failed')
            } else {
                console.log('Edited user as admin fail: Passed')
            }
        })
        .catch(err => console.log('Edited user as admin fail: Passed'))
}

const testAdminDeleteUser = () => {
    axios.delete(`${url}/admin/users/delete`, {
        headers: {
            'content-type': 'application/json',
            'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWQiOiI1YzQ2Njk3OGQ1NTJiYzA5YzVjN2VkY2MiLCJpYXQiOjE1NDk1MDA3NDQsImV4cCI6MTU0OTU4NzE0NH0.gYbvIDZjdr5_25SfL9gtcLXcH63Ed_kqKhe-EtdVRlQ'
        }, 
        "id": "5c5b897928c3d63cd565b890"
    })
        .then(resp => {
            if(resp.status === 200) {
                console.log('Deleted user as admin: Passed')
            } else {
                console.log('Deleted user as admin: Failed')
            }
        })
        .catch(err => console.log('Delete user as admin: Failed 1'))
}

const testAdminDeleteUserFail = () => {
    axios.delete(`${url}/admin/users/delete`, {
        headers: {
            'content-type': 'application/json',
            'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWQiOiI1YzQ2Njk3OGQ1NTJiYzA5YzVjN2VkY2MiLCJpYXQiOjE1NDk1MDA3NDQsImV4cCI6MTU0OTU4NzE0NH0.gYbvIDZjdr5_25SfL9gtcLXcH63Ed_kqKhe-EtdVRl'
        }, 
        "id": "5c5b897928c3d63cd565b890"
    })
        .then(resp => {
            if(resp.status === 200) {
                console.log('Deleted user as admin fail: Failed')
            } else {
                console.log('Deleted user as admin fail: Passed')
            }
        })
        .catch(err => console.log('Delete user as admin fail: Passed'))
}

const testAdminMalePinches = () => {
    axios.post(`${url}/admin/pinches/male`, malePinches, headers)
        .then(resp => {
            if(resp.status === 200) {
                console.log('Acquired male pinches measurements: Passed')
            } else {
                console.log('Acquired male pinches measurements: Failed')
            }
        })
        .catch(err => console.log('Acquired male pinches measurements: Failed'))
}

const testAdminMalePinchesFail = () => {
    axios.post(`${url}/admin/pinches/male`, malePinches, badToken)
        .then(resp => {
            if(resp.status === 200) {
                console.log('Acquired male pinches measurements fail: Failed')
            } else {
                console.log('Acquired male pinches measurements fail: Passed')
            }
        })
        .catch(err => console.log('Acquired male pinches measurements fail: Passed'))
}

const testAdminFemalePinches = () => {
    axios.post(`${url}/admin/pinches/female`, femalePinches, headers)
        .then(resp => {
            if(resp.status === 200) {
                console.log('Acquired male pinches measurements: Passed')
            } else {
                console.log('Acquired male pinches measurements: Failed')
            }
        })
        .catch(err => console.log('Acquired male pinches measurements: Failed'))
}

const testAdminFemalePinchesFail = () => {
    axios.post(`${url}/admin/pinches/female`, femalePinches, badToken)
        .then(resp => {
            if(resp.status === 200) {
                console.log('Acquired male pinches measurements fail: Failed')
            } else {
                console.log('Acquired male pinches measurements fail: Passed')
            }
        })
        .catch(err => console.log('Acquired male pinches measurements fail: Passed'))
}

const testAdminEditMealplan = () => {
    axios.put(`${url}/admin/users/editmealplan`, {
        headers: {
            'content-type': 'application/json',
            'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWQiOiI1YzQ2Njk3OGQ1NTJiYzA5YzVjN2VkY2MiLCJpYXQiOjE1NDk1MDA3NDQsImV4cCI6MTU0OTU4NzE0NH0.gYbvIDZjdr5_25SfL9gtcLXcH63Ed_kqKhe-EtdVRlQ',
            "id": "5c5b897928c3d63cd565b890",
            "mealPlan":
                {
                    "food_name": "chicken",
                    "nf_calories": 200,
                    "nf_total_fat": 15
                }
        }})
        .then(resp => {
            if(resp.status === 200) {
                console.log('Mealplan edited by admin: Passed')
            } else {
                console.log('Mealplan edited by admin: Failed')
            }
        })
        .catch(err => console.log('Mealplan edited by admin: Failed'))
}

const testAdminEditMealplanFail = () => {
    axios.put(`${url}/admin/users/editmealplan`, badToken)
        .then(resp => {
            if(resp.status === 200) {
                console.log('Mealplan edited by admin fail: Failed')
            } else {
                console.log('Mealplan edited by admin fail: Passed')
            }
        })
        .catch(err => console.log('Mealplan edited by admin fail: Passed'))
}

const testAdminViewSession = () => {
    axios.get(`${url}/admin/sessions`, headers)
        .then(resp => {
            if(resp.status === 200) {
                console.log('View sessions as admin: Passed')
            } else {
                console.log('View sessions as admin: Failed')
            }
        })
        .catch(err => console.log('View sessions as admin: Failed'))
}

const testAdminViewSessionFail = () => {
    axios.get(`${url}/admin/sessions`, badToken)
        .then(resp => {
            if(resp.status === 200) {
                console.log('View sessions as admin: Failed')
            } else {
                console.log('View sessions as admin: Passed')
            }
        })
        .catch(err => console.log('View sessions as admin: Passed'))
}

testAdminLogin()
testAdminLoginFail()
testAdminInfo()
testAdminInfoFail()
testAdminUsers()
testAdminUsersFail()
testAdminUser()
testAdminUserFail()
testAdminCreateUser()
testAdminCreateUserFail()
testAdminEditUser()
testAdminEditUserFail()
testAdminDeleteUser()
testAdminDeleteUserFail()
testAdminMalePinches()
testAdminMalePinchesFail()
testAdminFemalePinches()
testAdminFemalePinchesFail()
testAdminEditMealplan()
testAdminEditMealplanFail()
testAdminViewSession()
testAdminViewSessionFail()