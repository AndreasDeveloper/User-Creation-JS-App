// --- WEBPACK -> Mandatory --- \\
import '../sass/main.scss';
// --- Importing Libraries --- \\
import uniqid from 'uniqid'; // Unique ID

// -- Creating Users System -- \\
// --- Users Module | USER CONTROLLER | IIFE ---
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

// --- UI Module | UI CONTROLLER | IIFE ---
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
        userDiv: document.querySelector('.user')
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
        // Getting DOM Strings
        getDOMStrings: () => {
            return DOMStrings;
        },
        getAllInputs: () => {
            return allInputs;
        }
    };
})();

// --- Main Controller Module | MAIN CONTROLLER | IIFE ---
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
        // Checks whether input fields are empty or not
        if (DOM.iFullName.value === '' || DOM.iAge.value === '' || DOM.iJob.value === '' || DOM.iLocation.value === '' || DOM.iSalary.value === '') {
            // Error handling
            inputVal.inputValue.forEach(el => {
                if (el.value === '') {
                    console.log(`${el.placeholder} field is empty.`);
                } else {
                    null;
                }
            });
        } else {
            const user = userCtrl.addUser(fullNameV, ageV, jobV, locationV, salaryV, uniqid()); // Creates new user object from class
            UICtrl.renderUserProfile(user); // Renders user HTML
            inputVal.inputValue.forEach(el => el.value = ''); // Resets input values to empty string
            e.preventDefault(); // Prevents default on button click
        }
    });

    // - EVENT LISTENER - | Deletes User on click
    DOM.userDiv.addEventListener('click', e => {
        const id = e.target.closest('.user-created').dataset.itemid; // Gets id from the user div

        // Deletes user from data and ui
        if (e.target.matches('.btnReset, .btnReset *')) {
            userCtrl.deleteUser(id);
            UICtrl.deleteUserProfile(id);
        }
    });

})(userController, UIController);