// --- WEBPACK -> Mandatory --- \\
import '../sass/main.scss';
// --- Importing Libraries --- \\
import uniqid from 'uniqid'; // Unique ID

// -- Creating Users System -- \\

/* -------------------------------------------------------------- */
/*        --- Users Module | USER CONTROLLER | IIFE ---     
/* -------------------------------------------------------------- */
const userController = (() => {
    // User Class
    class User {
        constructor(fullName, age, job, location, salary, id) { // 'Safe' way of creating Class and its instances
            if (this instanceof User) {
                this.fullName = fullName;
                this.age = age;
                this.job = job;
                this.location = location;
                this.salary = salary;
                this.id = id;
            } else { 
                return new User(fullName, age, job, location, salary, id);
            }
        }
    };

    // All Users Array | - Stores Objects of users
    const allUsers = [];
    // Exposing Methods
    return {
        // Adding user to data
        addUser: (name, age, job, location, salary, id) => {
            const createUser = new User(name, age, job, location, salary, id);
            allUsers.push(createUser);
            console.log(allUsers); //temp
            return createUser;
        },
        // Deleting user from data
        deleteUser: id => {
            const index = allUsers.findIndex(el => el.id === id);
            allUsers.splice(index, 1);
            console.log(allUsers);
        }
    };
})();

/* -------------------------------------------------------------- */
/*             --- UI Module | UI CONTROLLER | IIFE ---
/* -------------------------------------------------------------- */
const UIController = (() => {

    // DOM Elements
    const DOMStrings = {
        createBtn: document.querySelector('.createUs'),
        userWrap: document.querySelector('.wrapper-2'),
        iFullName: document.querySelector('.iFullName'), // i stands for input
        iAge: document.querySelector('.iAge'),
        iJob: document.querySelector('.iJob'),
        iLocation: document.querySelector('.iLocation'),
        iSalary: document.querySelector('.iSalary'),
        userDiv: document.querySelector('.user'),
        star: document.querySelector('.icon ion-ios-star-outline star')
    };
    const allInputs = {
        inputValue: [DOMStrings.iFullName, DOMStrings.iAge, DOMStrings.iJob, DOMStrings.iLocation, DOMStrings.iSalary]
    };

    // Exposing Methods
    return {
        // Rendering User Profile
        renderUserProfile: user => {
            const markup1 = `
            <div class="user-created" data-itemid=${user.id}>
                <i class="icon ion-ios-star-outline star"></i>
                <p><span>Full Name</span>: ${user.fullName}</p>
                <p><span>Age</span>: ${user.age}</p>
                <p><span>Job</span>: ${user.job}</p>
                <p><span>Location</span>: ${user.location}</p>
                <p><span>Salary</span>: $ ${user.salary}</p>
                <button class="btnReset btn">
                    <span class="btn__visible">Delete</span>
                    <span class="btn__invisible">Now</span>
                </button>
            </div>
            `;
            DOMStrings.userDiv.insertAdjacentHTML('afterbegin', markup1); // Renders markup
        },
        // Deletes user profile from UI
        deleteUserProfile: id => {
            const user = document.querySelector(`[data-itemid="${id}"]`);
            user.parentElement.removeChild(user);
        },
        errorClass: domEl => {
            domEl.classList.remove('inputNormal');
            domEl.classList.remove('inputSuccess');
            domEl.classList.add('inputError');
        },
        successClass: domEl => {
            domEl.classList.remove('inputError');
            domEl.classList.remove('inputNormal');
            domEl.classList.add('inputSuccess');
        },
        // Getting DOM Strings
        getDOMStrings: () => {
            return DOMStrings;
        },
        getAllInputs: () => {
            return allInputs;
        }
    };
})();

/* -------------------------------------------------------------- */
/*    --- Main Controller Module | MAIN CONTROLLER | IIFE ---
/* -------------------------------------------------------------- */
const mainController = ((userCtrl, UICtrl) => {
    //import uniqid from 'uniqid'; // Unique ID

    // Getting DOM Strings from UI Controller
    const DOM = UICtrl.getDOMStrings();
    const inputVal = UICtrl.getAllInputs();

    // - EVENT LISTENER - | Creates new user object and renders it on click
    DOM.createBtn.addEventListener('click', (e) => {
        // Values of inputs
        const fullNameV = DOM.iFullName.value,
              ageV = DOM.iAge.value,
              jobV = DOM.iJob.value,
              locationV = DOM.iLocation.value,
              salaryV = DOM.iSalary.value;

        // Checks if fullName is empty string or number
        if (fullNameV === '' || fullNameV === ' ' || !isNaN(fullNameV)) {
            UICtrl.errorClass(DOM.iFullName);
            e.preventDefault();
            return null;
        } else {
            UICtrl.successClass(DOM.iFullName);
        }
        // Checks if age is less than 18 or greater than 110
        if (ageV < 18 || ageV > 110) {
            UICtrl.errorClass(DOM.iAge);
            e.preventDefault();
            return null;
        } else {
            UICtrl.successClass(DOM.iAge);
        }
        // Checks if job field is number or not
        if (!isNaN(jobV)) {
            UICtrl.errorClass(DOM.iJob);
            e.preventDefault();
            return null;
        } else {
            UICtrl.successClass(DOM.iJob);
        }
        // Checks if location field is number or not
        if (!isNaN(locationV)) {
            UICtrl.errorClass(DOM.iLocation);
            e.preventDefault();
            return null;
        } else {
            UICtrl.successClass(DOM.iLocation);
        }
        // Checks if salary field is number, empty, or negative
        if (salaryV === '' || salaryV === ' ' || isNaN(salaryV) || salaryV < 0) {
            UICtrl.errorClass(DOM.iSalary);
            e.preventDefault();
            return null;
        } else {
            UICtrl.successClass(DOM.iSalary);
        }

        // Checks whether input fields are empty or not
        if (fullNameV === '' || ageV === '' || jobV === '' || locationV === '' || salaryV === '') {
            return null;
        } else {
            const user = userCtrl.addUser(fullNameV, ageV, jobV, locationV, salaryV, uniqid()); // Creates new user object from class
            UICtrl.renderUserProfile(user); // Renders user HTML
            // Resets each element 
            inputVal.inputValue.forEach(el => {
                el.value = '';
                el.classList.remove('inputError');
                el.classList.remove('inputSuccess');
                el.classList.add('inputNormal');
            }); 
            DOM.iAge.value = '18'; // Resets default value
            e.preventDefault(); // Prevents default on button click
        }
    });

    // - EVENT LISTENER - | Deletes User on click
    DOM.userDiv.addEventListener('click', e => {
        const id = e.target.closest('.user-created').dataset.itemid; // Gets id from the user div
        // Deletes user from data and ui
        if (e.target.matches('.btnReset, .btnReset *')) { // Checks where is user clicking (button and all of it children)
            userCtrl.deleteUser(id);
            UICtrl.deleteUserProfile(id);
        }
    });
    
    // - EVENT LISTENER - | Adds star to user's block
    DOM.userDiv.addEventListener('click', e => {
        const starU = e.target.closest('i');
        const starClass = e.target.className;
        if (starClass === 'icon ion-ios-star-outline star') {
            starU.classList.remove('icon', 'ion-ios-star-outline', 'star');
            starU.classList.add('icon', 'ion-ios-star', 'star' ,'star__full');  
        } else if (starClass === 'icon ion-ios-star star star__full') {
            starU.classList.remove('icon', 'ion-ios-star', 'star', 'star__full');
            starU.classList.add('icon', 'ion-ios-star-outline', 'star');
        }
    });

})(userController, UIController);