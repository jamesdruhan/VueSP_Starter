// ----------------------------------
// ****** User Module for Vuex ******
// ----------------------------------
// This manages the users information.
// -----------------------------------

// Collection of values to store.
const state =
{
	user :
	{
		firstName     : '',
		lastName      : '',
		accountName   : '',
		employeeID    : '',
		department    : '',
		office        : '',
		preferredName : '',
		pictureURL    : '',
		workEmail     : '',
		workPhone     : '',
        manager       : ''
	},

	manager :
	{
		firstName     : '',
		lastName      : '',
		accountName   : '',
		employeeID    : '',
		department    : '',
		office        : '',
		preferredName : '',
		pictureURL    : '',
		workEmail     : '',
		workPhone     : '',
        manager       : ''
	}
};

// Getter functions for the collection of values in the store.
const getters =
{
    // Returns the first name of the passed who (user or manager).
    firstName : ( state ) => ( who ) =>
    {
        if (who === 'user' || who === 'manager')
        {
            return state[who].firstName;
        }

        return null;
    },

    // Returns the last name of the passed who (user or manager).
    lastName : ( state ) => ( who ) =>
    {
        if (who === 'user' || who === 'manager')
        {
            return state[who].lastName;
        }

        return null;
    },

    // Returns the account name of the passed who (user or manager).
    accountName : ( state ) => ( who ) =>
    {
        if (who === 'user' || who === 'manager')
        {
            return state[who].accountName;
        }

        return null;
    },

    // Returns the employee ID of the passed who (user or manager).
    employeeID : ( state ) => ( who ) =>
    {
        if (who === 'user' || who === 'manager')
        {
            return state[who].employeeID;
        }

        return null;
    },

    // Returns the department of the passed who (user or manager).
    department : ( state ) => ( who ) =>
    {
        if (who === 'user' || who === 'manager')
        {
            return state[who].department;
        }

        return null;
    },

    // Returns the office of the passed who (user or manager).
    office : ( state ) => ( who ) =>
    {
        if (who === 'user' || who === 'manager')
        {
            return state[who].office;
        }

        return null;
    },

    // Returns the preferred name of the passed who (user or manager).
    preferredName : ( state ) => ( who ) =>
    {
        if (who === 'user' || who === 'manager')
        {
            return state[who].preferredName;
        }

        return null;
    },

    // Returns the SharePoint picture URL of the passed who (user or manager).
    pictureURL : ( state ) => ( who ) =>
    {
        if (who === 'user' || who === 'manager')
        {
            return state[who].pictureURL;
        }

        return null;
    },

    // Returns the work email of the passed who (user or manager).
    workEmail : ( state ) => ( who ) =>
    {
        if (who === 'user' || who === 'manager')
        {
            return state[who].workEmail;
        }

        return null;
    },

    // Returns the work phone of the passed who (user or manager).
    workPhone : ( state ) => ( who ) =>
    {
        if (who === 'user' || who === 'manager')
        {
            return state[who].workPhone;
        }

        return null;
    },

    // Returns the manager of the passed who (user or manager).
    manager : ( state ) => ( who ) =>
    {
        if (who === 'user' || who === 'manager')
        {
            return state[who].manager;
        }

        return null;
    },
};

// Mutation functions for the collection of values in the store.
const mutations =
{
    // Sets the first name. Data should be an object { who: 'user'||'manager', value : 'dataHere' }
    setFirstName ( state, data )
    {
        state[data.who].firstName = data.value;
    },

    // Sets the last name. Data should be an object { who: 'user'||'manager', value : 'dataHere' }
    setLastName ( state, data )
    {
        state[data.who].lastName = data.value;
    },

    // Sets the account name. Data should be an object { who: 'user'||'manager', value : 'dataHere' }
    setAccountName ( state, data )
    {
        state[data.who].accountName = data.value;
    },

    // Sets the employee ID. Data should be an object { who: 'user'||'manager', value : 'dataHere' }
    setEmployeeID ( state, data )
    {
        state[data.who].employeeID = data.value;
    },

    // Sets the department. Data should be an object { who: 'user'||'manager', value : 'dataHere' }
    setDepartment ( state, data )
    {
        state[data.who].department = data.value;
    },

    // Sets the office. Data should be an object { who: 'user'||'manager', value : 'dataHere' }
    setOffice ( state, data )
    {
        state[data.who].office = data.value;
    },

    // Sets the preferred name. Data should be an object { who: 'user'||'manager', value : 'dataHere' }
    setPreferredName ( state, data )
    {
        state[data.who].preferredName = data.value;
    },

    // Sets the picture URL. Data should be an object { who: 'user'||'manager', value : 'dataHere' }
    setPictureURL ( state, data )
    {
        state[data.who].pictureURL = data.value;
    },

    // Sets the work email. Data should be an object { who: 'user'||'manager', value : 'dataHere' }
    setWorkEmail ( state, data )
    {
        state[data.who].workEmail = data.value;
    },

    // Sets the work phone. Data should be an object { who: 'user'||'manager', value : 'dataHere' }
    setWorkPhone ( state, data )
    {
        state[data.who].workPhone = data.value;
    },

    // Sets the manager. Data should be an object { who: 'user'||'manager', value : 'dataHere' }
    setManager ( state, data )
    {
        state[data.who].manager = data.value;
    }
};

// NPM Export
export default
{
    namespaced : true,
    state,
    getters,
    mutations
}
