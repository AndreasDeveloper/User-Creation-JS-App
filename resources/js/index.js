// --- WEBPACK -> Mandatory --- \\
import '../sass/main.scss';

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
    }

    // All Users Array 
    const allUsers = [];

    // Exposing Methods
    return {
        addUser: (name, age, job, location, salary, id) => {
            const createUser = new User(name, age, job, location, salary, id);
            allUsers.push(createUser);
            console.log(allUsers);
            return createUser;
        },
        deleteUser: (name, age, job, location, salary) => {
            // Todo
        }
    }
})();

// --- UI Module | UI CONTROLLER | IIFE ---
const UICtrl = (() => {

    // DOM Elements
    const DOMStrings = {
        createBtn: document.querySelector('.createUs'),
        userWrap: document.querySelector('.wrapper-2'),
        iFullName: document.querySelector('.iFullName'), // i stands for input
        iAge: document.querySelector('.iAge'),
        iJob: document.querySelector('.iJob'),
        iLocation: document.querySelector('.iLocation'),
        iSalary: document.querySelector('.iSalary'),
        btnReset: document.querySelector('.btnReset'),
        userDiv: document.querySelector('.user')
    };
    const allInputs = {
        inputValue: [DOMStrings.iFullName, DOMStrings.iAge, DOMStrings.iJob, DOMStrings.iLocation, DOMStrings.iSalary]
    };

    // Exposing Methods
    return {
        // Rendering User Profile
        renderUserProfile: (user) => {
            const markup1 = `
            <div class="user-created" data-itemid=${user.id}>
                <p><span>Full Name</span>: ${user.fullName}</p>
                <p><span>Age</span>: ${user.age}</p>
                <p><span>Job</span>: ${user.job}</p>
                <p><span>Location</span>: ${user.location}</p>
                <p><span>Salary</span>: $ ${user.salary}</p>
                <button class="btnReset">Reset</button>
            </div>
            `;
            DOMStrings.userDiv.insertAdjacentHTML('afterbegin', markup1); // Renders markup
        },

        // Getting DOM Strings
        getDOMStrings: () => {
            return DOMStrings;
        },
        getAllInputs: () => {
            return allInputs;
        }
    }
})();

// --- Main Controller Module | MAIN CONTROLLER | IIFE ---
const controller = (() => {
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
            const user = userController.addUser(fullNameV, ageV, jobV, locationV, salaryV); // Creates new user object from class
            UICtrl.renderUserProfile(user); // Renders user HTML
            inputVal.inputValue.forEach(el => el.value = ''); // Resets input values to empty string
            e.preventDefault(); // Prevents default on button click
        }
    });

})();